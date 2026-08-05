"use server";

import { UserSubscriptionPlan } from "@/types";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { freePlan, proPlan } from "@/config/subscriptions";
import { getCurrentUser } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/server/db";
import { user as userTable } from "@/server/db/schema";

const billingUrl = absoluteUrl("/journal/billing");

export async function getUserSubscriptionPlan(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const user = await db.query.user.findFirst({
    columns: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
    where: eq(userTable.id, userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  };
}

export async function stripeSubscription() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.email) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await getStripe().billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });
      return {
        url: stripeSession.url,
      };
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await getStripe().checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return {
      url: stripeSession.url,
    };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      };
    }
    return {
      error,
      code: 500,
    };
  }
}
