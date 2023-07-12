import { Header } from "@/components/header"
import { JournalEntryItem } from "@/components/journal/journal-entry"
import JournalEntryCreateButton from "@/components/journal/journal-entry-create-button"
import { Shell } from "@/components/shell"

export default function JournalLoading() {
  return (
    <Shell>
      <Header
        title="Entries"
        description="Create and manage journal entries."
        size="sm"
      >
        <JournalEntryCreateButton />
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
      </div>
    </Shell>
  )
}
