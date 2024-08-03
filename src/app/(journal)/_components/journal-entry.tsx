import Link from "next/link"
import { JournalEntry } from "@prisma/client"
import { BookmarkIcon } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

import { EntryOperations } from "../_components/entry-operations"

interface JournalEntryProps {
  entry: Pick<JournalEntry, "id" | "title" | "createdAt" | "isBookmarked">
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
    <div
      className={cn(
        "group relative min-h-28  space-y-5 rounded-lg border border-blue-50 bg-muted/30 p-4",
        className
      )}
    >
      <Link
        href={`/editor/${entry.id}`}
        className="text-lg font-semibold hover:underline lg:text-xl"
      >
        {" "}
        {entry.title}
      </Link>
      {isBookmarked && (
        <div className="absolute right-4 top-0 rounded-full bg-muted p-2">
          <BookmarkIcon className="size-4 fill-foreground text-foreground" />
        </div>
      )}
      <p className="text-sm text-muted-foreground lg:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa deleniti
        et expedita temporibus ad quae corrupti voluptatum, numquam repellendus
        ullam!
      </p>
      <div className="flex items-center justify-between transition-all duration-300  group-hover:block">
        <p className="block text-sm text-muted-foreground transition-all duration-300 group-hover:hidden">
          {formatDate(entry.createdAt?.toDateString())}
        </p>
        <EntryOperations
          entry={{
            id: entry.id,
            title: entry.title,
            createdAt: entry?.createdAt,
          }}
          initialBookmarked={isBookmarked}
        />
      </div>
    </div>
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
