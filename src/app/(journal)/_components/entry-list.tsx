"use client"

import React from "react"
import {
  getMyBookmarkedJournalEntries,
  getMyJournalEntries,
} from "@/server/actions/journal"
import { useMutationState, useQuery } from "@tanstack/react-query"

import { EmptyPlaceholder } from "@/components/empty-placeholder"

import { JournalEntryItem } from "../_components/journal-entry"
import JournalEntryCreateButton from "./journal-entry-create-button"

const EntryList = () => {
  const { data: entries } = useQuery({
    queryKey: ["entries"],
    queryFn: getMyJournalEntries,
  })

  const { data: bookmarkedEntries } = useQuery({
    queryKey: ["bookmarkedEntries"],
    queryFn: getMyBookmarkedJournalEntries,
  })

  type Variables = {
    entryId: string
    isBookmarked: boolean
  }

  const variables = useMutationState<Variables>({
    filters: { mutationKey: ["updateBookmark"], status: "pending" },
    select: (mutation) => mutation.state.variables as Variables,
  })

  const updatedBookmarkedEntries = React.useMemo(() => {
    if (variables.length > 0) {
      const pendingBookmark = variables[0]
      const entryData = entries?.find((e) => e.id === pendingBookmark.entryId)

      if (pendingBookmark.isBookmarked) {
        return [
          ...(bookmarkedEntries || []).filter(
            (entry) => entry.id !== pendingBookmark.entryId
          ),
          {
            ...entryData,
            isBookmarked: pendingBookmark.isBookmarked,
          },
        ]
      } else {
        return (bookmarkedEntries || []).filter(
          (entry) => entry.id !== pendingBookmark.entryId
        )
      }
    }
    return bookmarkedEntries
  }, [bookmarkedEntries, variables, entries])

  return (
    <div className="w-full space-y-16">
      {updatedBookmarkedEntries?.length ? (
        <div className="space-y-5">
          <div className="flex items-center gap-x-4">
            <h2 className="text-md font-semibold lg:text-lg">
              Bookmarked Entries
            </h2>{" "}
            <span className="text-sm text-muted-foreground">
              {updatedBookmarkedEntries?.length}{" "}
              {`Entr${updatedBookmarkedEntries?.length === 1 ? "y" : "ies"}`}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2  xl:grid-cols-3">
            {updatedBookmarkedEntries?.map((entry) => (
              <JournalEntryItem
                key={entry?.id}
                entry={entry}
                userBookmarks={
                  updatedBookmarkedEntries &&
                  updatedBookmarkedEntries?.map((entry) => entry?.id)
                }
              />
            ))}
          </div>
        </div>
      ) : null}

      {entries?.length ? (
        <div className="space-y-5">
          <div className="flex items-center gap-x-4">
            <h2 className="text-md font-semibold lg:text-lg">All Entries</h2>{" "}
            <span className="text-sm text-muted-foreground">
              {entries?.length} {`Entr${entries?.length === 1 ? "y" : "ies"}`}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2  xl:grid-cols-3">
            {entries?.map((entry) => (
              <JournalEntryItem
                key={entry?.id}
                entry={entry}
                userBookmarks={
                  updatedBookmarkedEntries &&
                  updatedBookmarkedEntries?.map((entry) => entry?.id)
                }
              />
            ))}
          </div>
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
  )
}

export default EntryList
