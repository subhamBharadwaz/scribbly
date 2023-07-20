import { redirect } from "next/navigation"

import { getUserByClerkId } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CopyButton } from "@/components/copy-button"
import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import { BillingForm } from "@/components/journal/billing/billing-form"
import { Shell } from "@/components/shell"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

const testCardsInfo = [
  {
    brand: "Visa",
    number: "4242 4242 4242 4242",
    cvc: "Any 3 digits",
    date: "Any future date",
  },
  {
    brand: "Visa(debit)",
    number: "4000 0566 5566 5566",
    cvc: "Any 3 digits",
    date: "Any future date",
  },
  {
    brand: "Mastercard",
    number: "5555 5555 5555 4444",
    cvc: "Any 3 digits",
    date: "Any future date",
  },
]

export default async function BillingPage() {
  const user = await getUserByClerkId()

  if (!user) {
    redirect("/sign-in")
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
    <Shell>
      <Header
        title="Billing"
        description="Manage your billing and subscription plan."
        size="sm"
      />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This won&apos;t cost you real money.</AlertTitle>
          <AlertDescription className="space-y-5">
            <p>
              {" "}
              Scribbly is a demo app; it won&apos;t cost you real money. You can
              find a list of test card numbers on the{" "}
              <a
                href="https://stripe.com/docs/testing#cards"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Stripe docs
              </a>
              .
            </p>
            <AlertDialog>
              <p>
                Too lazy?{" "}
                <AlertDialogTrigger asChild>
                  <span className="cursor-pointer font-medium underline underline-offset-4">
                    Click here{" "}
                  </span>
                </AlertDialogTrigger>{" "}
                to view test cards info.
              </p>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Test cards info</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">BRAND</TableHead>
                          <TableHead>NUMBER</TableHead>
                          <TableHead>CVC</TableHead>
                          <TableHead className="text-right">DATE</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="w-full">
                        {testCardsInfo.map((card) => (
                          <TableRow key={card.brand}>
                            <TableCell className="font-medium">
                              {card.brand}
                            </TableCell>
                            <TableCell>
                              {card.number} <CopyButton value={card.number} />
                            </TableCell>
                            <TableCell>{card.cvc}</TableCell>
                            <TableCell className="text-right">
                              {card.date}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Done</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </AlertDescription>
        </Alert>
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </Shell>
  )
}
