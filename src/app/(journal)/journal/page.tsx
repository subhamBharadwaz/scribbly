import { redirect } from "next/navigation"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { JournalHeader } from "@/components/header"
import { JournalEntryItem } from "@/components/journal/journal-entry"
import JournalEntryCreateButton from "@/components/journal/journal-entry-create-button"
import { JournalShell } from "@/components/shell"

export const metadata = {
  title: "Journal",
}

export default async function JournalPage() {
  const user = await getUserByClerkId()

  const entries = await db.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <JournalShell>
      <JournalHeader
        heading="Entries"
        text="Create and manage journal entries."
      >
        <JournalEntryCreateButton />
      </JournalHeader>
      <div>
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
    </JournalShell>
  )
}
