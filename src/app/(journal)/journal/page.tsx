import { getMyJournalEntries } from "@/server/queries/journal"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

import { JournalEntryItem } from "../_components/journal-entry"
import JournalEntryCreateButton from "../_components/journal-entry-create-button"

export const metadata = {
  title: "Journal",
}

export default async function JournalPage() {
  const entries = await getMyJournalEntries()
  return (
    <Shell>
      <Header
        title="Entries"
        description="Create and manage journal entries."
        size="sm"
        className="items-center justify-between lg:flex"
      >
        <JournalEntryCreateButton />
      </Header>

      <div className="w-full">
        {entries?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {entries.map((entry) => (
              <JournalEntryItem key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No entires created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any entry yet. Start creating content.
            </EmptyPlaceholder.Description>
            <JournalEntryCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </Shell>
  )
}
