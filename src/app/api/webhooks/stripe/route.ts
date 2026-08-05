import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

import { env } from "@/env";
import { getStripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Invalid signature";
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await getStripe().subscriptions.retrieve(
      session.subscription as string,
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    if (!session?.metadata?.userId) {
      return new Response("Missing user id", { status: 400 });
    }

    await db
      .update(user)
      .set({
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.items.data[0]?.current_period_end * 1000,
        ),
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.metadata.userId));
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await getStripe().subscriptions.retrieve(
      session.subscription as string,
    );

    // Update the price id and set the new period end.
    await db
      .update(user)
      .set({
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.items.data[0]?.current_period_end * 1000,
        ),
        updatedAt: new Date(),
      })
      .where(eq(user.stripeSubscriptionId, subscription.id));
  }

  return new Response(null, { status: 200 });
}
