import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/server/db";
import { journalEntry } from "@/server/db/schema";
import type { JournalEntry, User } from "@/server/db/types";

export async function getMyEntry(
  entryId: JournalEntry["id"],
  userId: User["id"],
) {
  return db.query.journalEntry.findFirst({
    where: and(eq(journalEntry.id, entryId), eq(journalEntry.userId, userId)),
  });
}
