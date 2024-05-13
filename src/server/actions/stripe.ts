"use server"

import { UserSubscriptionPlan } from "@/types"
import { z } from "zod"

import { freePlan, proPlan } from "@/config/subscriptions"
import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"

const billingUrl = absoluteUrl("/journal/billing")

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  }
}

export async function stripeSubscription() {
  try {
    const user = await getUserByClerkId()
    if (!user || !user.email) {
      throw new Error("Unauthorized")
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      })
      return {
        url: stripeSession.url,
      }
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
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
    })

    return {
      url: stripeSession.url,
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      }
    }
    return {
      error,
      code: 500,
    }
  }
}
