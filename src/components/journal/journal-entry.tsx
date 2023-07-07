import { FC } from "react"
import Link from "next/link"
import { JournalEntry } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { EntryOperations } from "@/components/entry-operations"

interface JournalEntryProps {
  entry: Pick<JournalEntry, "id" | "title" | "createdAt">
}

export function JournalEntryItem({ entry }: JournalEntryProps) {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="grid gap-1">
        <Link
          href={`/editor/${entry.id}`}
          className="font-semibold hover:underline"
        >
          {entry.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(entry.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <EntryOperations entry={{ id: entry.id, title: entry.title }} />
    </div>
  )
}

JournalEntryItem.Skeleton = function JournalEntrySkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
