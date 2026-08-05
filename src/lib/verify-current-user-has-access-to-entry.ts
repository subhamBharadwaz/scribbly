import { and, count, eq } from "drizzle-orm";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { journalEntry } from "@/server/db/schema";

export async function verifyCurrentUserHasAccessToEntry(entryId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const [result] = await db
    .select({ value: count() })
    .from(journalEntry)
    .where(and(eq(journalEntry.id, entryId), eq(journalEntry.userId, user.id)));

  return (result?.value ?? 0) > 0;
}
