import type { InferSelectModel } from "drizzle-orm";

import type { journalEntry } from "@/server/db/schema/journal-entry";
import type { reminder } from "@/server/db/schema/reminder";
import type { user } from "@/server/db/schema/user";

export type User = InferSelectModel<typeof user>;
export type JournalEntry = InferSelectModel<typeof journalEntry>;
export type Reminder = InferSelectModel<typeof reminder>;
