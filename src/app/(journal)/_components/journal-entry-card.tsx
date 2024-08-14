"use client"

import { useEffect } from "react"
import Link from "next/link"
import { JournalEntry } from "@prisma/client"
import { AnimatePresence, motion, useAnimate, usePresence } from "framer-motion"
import { BookmarkIcon } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"

import { EntryOperations } from "./entry-operations"

interface JournalEntryProps {
  entry: Pick<
    JournalEntry,
    "id" | "title" | "createdAt" | "isBookmarked" | "content"
  >
  isBookmarked: boolean
  className?: string
}

export function JournalEntryCard({
  entry,
  isBookmarked,
  className,
}: JournalEntryProps) {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          {
            opacity: 0,
            x: isBookmarked ? 24 : -24,
          },
          {
            duration: 0.125,
            ease: "easeIn",
          }
        )
        safeToRemove()
      }
      exitAnimation()
    }
  }, [isPresent])
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.125, ease: "easeIn" },
      }}
      ref={scope}
      layout
      className={cn(
        "group relative flex  h-44 flex-col space-y-5 rounded-lg border border-blue-50 bg-muted/30 p-4",
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
        {entry.content?.blocks[0]?.data.text}
      </p>

      <div className="absolute bottom-5 right-4 flex items-center  justify-between transition-all duration-300 group-hover:block">
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
    </motion.div>
  )
}
