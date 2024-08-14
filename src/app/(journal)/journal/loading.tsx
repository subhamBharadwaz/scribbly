import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

import { JournalEntryItem } from "../_components/journal-entry"
import JournalEntryCreateButton from "../_components/journal-entry-create-button"

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
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2  xl:grid-cols-3">
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
        <JournalEntryItem.Skeleton />
      </div>
    </Shell>
  )
}
