import {
  getMyBookmarkedJournalEntries,
  getMyJournalEntries,
} from "@/server/actions/journal"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

import EntryList from "../_components/entry-list"
import JournalEntryCreateButton from "../_components/journal-entry-create-button"

export const metadata = {
  title: "Journal",
}

export default async function JournalPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["entries"],
    queryFn: getMyJournalEntries,
  })

  await queryClient.prefetchQuery({
    queryKey: ["bookmarkedEntries"],
    queryFn: getMyBookmarkedJournalEntries,
  })

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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <EntryList />
      </HydrationBoundary>
    </Shell>
  )
}
