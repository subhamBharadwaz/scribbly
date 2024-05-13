import "server-only"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"

export async function getMyJournalEntries() {
  const user = await getUserByClerkId()

  if (!user) {
    throw new Error("Unauthorized")
  }

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
  return entries
}
