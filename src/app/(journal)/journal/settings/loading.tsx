import { CardSkeleton } from "@/components/card-skeleton"
import { JournalHeader } from "@/components/header"
import { JournalShell } from "@/components/shell"

export default function JournalBillingLoading() {
  return (
    <JournalShell>
      <JournalHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </JournalShell>
  )
}
