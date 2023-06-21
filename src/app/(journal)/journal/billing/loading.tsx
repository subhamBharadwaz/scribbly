import { CardSkeleton } from "@/components/card-skeleton"
import { JournalHeader } from "@/components/header"
import { JournalShell } from "@/components/shell"

export default function JournalBillingLoading() {
  return (
    <JournalShell>
      <JournalHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </JournalShell>
  )
}
