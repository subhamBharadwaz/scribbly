import { JournalEntry } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"

import { JournalEntryCard } from "./journal-entry-card"

interface JournalEntryProps {
  entry: Pick<
    JournalEntry,
    "id" | "title" | "createdAt" | "isBookmarked" | "content"
  >
  userBookmarks: string[]
  className?: string
}

export function JournalEntryItem({
  entry,
  userBookmarks,
  className,
}: JournalEntryProps) {
  const isBookmarked = userBookmarks?.includes(entry?.id)

  return (
    <JournalEntryCard
      entry={entry}
      isBookmarked={isBookmarked}
      className={className}
    />
  )
}

JournalEntryItem.Skeleton = function JournalEntrySkeleton() {
  return (
    <div className="relative min-h-28  space-y-5 rounded-lg border border-blue-50 bg-muted/30 p-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-40" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-2 w-10" />
        <Skeleton className="size-8 rounded-full" />
      </div>
    </div>
  )
}
