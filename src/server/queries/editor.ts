import "server-only"

import { JournalEntry, User } from "@prisma/client"

import { db } from "@/lib/db"

export async function getMyEntry(
  entryId: JournalEntry["id"],
  userId: User["id"]
) {
  return await db.journalEntry.findFirst({
    where: {
      id: entryId,
      userId: userId,
    },
  })
}
