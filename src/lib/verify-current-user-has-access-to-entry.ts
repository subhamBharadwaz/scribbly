import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"

export async function verifyCurrentUserHasAccessToEntry(entryId: string) {
  const user = await getUserByClerkId()
  const count = await db.journalEntry.count({
    where: {
      id: entryId,
      userId: user?.id,
    },
  })

  return count > 0
}
