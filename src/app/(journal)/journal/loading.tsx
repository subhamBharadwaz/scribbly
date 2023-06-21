import { JournalHeader } from "@/components/header"
import { JournalEntryItem } from "@/components/journal/journal-entry"
import JournalEntryCreateButton from "@/components/journal/journal-entry-create-button"
import { JournalShell } from "@/components/shell"

export default function JournalLoading() {
  return (
    <JournalShell>
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
    </JournalShell>
  )
}
