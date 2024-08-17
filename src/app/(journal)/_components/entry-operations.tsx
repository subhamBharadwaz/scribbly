"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  deleteJournalEntry,
  updateBookmarkStatus,
} from "@/server/actions/journal"
import { JournalEntry } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BookmarkIcon, FilePenLine, Pencil, Trash } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface EntryOperationsProps {
  entry: Pick<JournalEntry, "id" | "title" | "createdAt">
  initialBookmarked: boolean
}

export function EntryOperations({
  entry,
  initialBookmarked,
}: EntryOperationsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [bookmarked, setBookmarked] = React.useState(initialBookmarked)
  const [isTransitionPending, startTransition] = React.useTransition()
  const queryClient = useQueryClient()

  React.useEffect(() => {
    console.log({ stateBookmarked: bookmarked })
  }, [bookmarked])

  async function deleteEntry(entryId: string) {
    const response = await deleteJournalEntry({ params: { entryId } })

    if (response?.error) {
      setBookmarked
      toast({
        title: "Something went wrong.",
        description: "Your Entry was not deleted. Please try again.",
        variant: "destructive",
      })
    }

    return true
  }

  const { mutate, variables } = useMutation({
    mutationFn: async ({
      entryId,
      isBookmarked,
    }: {
      entryId: string
      isBookmarked: boolean
    }) => {
      const updatedEntry = await updateBookmarkStatus({ entryId, isBookmarked })
      return updatedEntry
    },
    onMutate: async ({ entryId, isBookmarked }) => {
      await queryClient.cancelQueries({ queryKey: ["entries"] })
      await queryClient.cancelQueries({ queryKey: ["bookmarkedEntries"] })

      const previousEntries = queryClient.getQueryData<JournalEntry[]>([
        "entries",
      ])
      const previousBookmarkedEntries = queryClient.getQueryData<
        JournalEntry[]
      >(["bookmarkedEntries"])

      queryClient.setQueryData<JournalEntry[]>(["entries"], (old) => {
        return old?.map((entry) =>
          entry.id === entryId ? { ...entry, isBookmarked } : entry
        )
      })

      if (isBookmarked) {
        queryClient.setQueryData<JournalEntry[]>(
          ["bookmarkedEntries"],
          (old) => {
            const existingEntry = previousEntries?.find((e) => e.id === entryId)
            if (existingEntry) {
              return [...(old || []), { ...existingEntry, isBookmarked }]
            }
            return old
          }
        )
      } else {
        queryClient.setQueryData<JournalEntry[]>(["bookmarkedEntries"], (old) =>
          old?.filter((entry) => entry.id !== entryId)
        )
      }

      return { previousEntries, previousBookmarkedEntries }
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["entries"], context.previousEntries)
      queryClient.setQueryData(
        ["bookmarkedEntries"],
        context.previousBookmarkedEntries
      )
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["entries", "bookmarkedEntries"],
      })
    },
    onSuccess: () => {
      setBookmarked(variables.isBookmarked)
    },
    mutationKey: ["updateBookmark"],
  })

  const handleBookmarkToggle = () => {
    startTransition(() => {
      mutate({ entryId: entry?.id, isBookmarked: !initialBookmarked })
    })
  }
  return (
    <>
      <div className="flex flex-row-reverse items-center gap-x-5">
        <Link
          href={`/editor/${entry.id}`}
          className={cn(
            buttonVariants({
              size: "icon",
              className:
                "rounded-full duration-300 transition-all hover:-translate-y-0.5",
            })
          )}
        >
          <Pencil className="size-4" />
        </Link>
        <Button
          size="icon"
          onClick={() => setShowDeleteAlert(true)}
          className="rounded-full opacity-100 transition-all duration-300 hover:-translate-y-0.5 group-hover:opacity-100 md:opacity-0"
        >
          <Trash className="size-4" />
        </Button>
        <Button
          size="icon"
          onClick={handleBookmarkToggle}
          disabled={isTransitionPending}
          className="rounded-full opacity-100 transition-all duration-300 hover:-translate-y-0.5 group-hover:opacity-100 md:opacity-0"
        >
          <BookmarkIcon
            className={cn(
              "size-4",
              initialBookmarked ? "fill-background" : "fill-transparent"
            )}
          />
        </Button>
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this entry?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteEntry(entry.id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 size-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
