import { CardSkeleton } from "@/components/card-skeleton"
import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

export default function JournalBillingLoading() {
  return (
    <Shell>
      <Header
        title="Settings"
        description="Manage account and website settings."
        size="sm"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </Shell>
  )
}
