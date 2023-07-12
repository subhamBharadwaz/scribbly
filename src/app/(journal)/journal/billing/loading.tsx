import { CardSkeleton } from "@/components/card-skeleton"
import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

export default function JournalBillingLoading() {
  return (
    <Shell>
      <Header
        title="Billing"
        description="Manage billing and your subscription plan."
        size="sm"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </Shell>
  )
}
