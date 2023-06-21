import { JournalHeader } from "@/components/header"
import { JournalEntryItem } from "@/components/journal/journal-entry"
import JournalEntryCreateButton from "@/components/journal/journal-entry-create-button"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <JournalHeader
        heading="Entries"
        text="Create and manage journal entries."
      >
        <JournalEntryCreateButton />
      </JournalHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
