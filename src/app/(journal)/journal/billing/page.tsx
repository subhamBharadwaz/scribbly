import { redirect } from "next/navigation"

import { getUserByClerkId } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { BillingForm } from "@/components/billing-form"
import { JournalHeader } from "@/components/header"
import { JournalShell } from "@/components/shell"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

export default async function BillingPage() {
  const user = await getUserByClerkId()

  if (!user) {
    redirect("/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return (
    <JournalShell>
      <JournalHeader
        heading="Billing"
        text="Manage your billing and subscription plan."
      />
      <div className="grid gap-8">
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </JournalShell>
  )
}
