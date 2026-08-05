import {
  pgTable,
  text,
  boolean,
  pgEnum,
  time,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

export const reminderType = pgEnum("reminder_type", ["DAILY", "WEEKLY"]);

export const reminder = pgTable("reminder", {
  id: uuid("id").primaryKey().defaultRandom(),
  frequency: reminderType("frequency").default("DAILY"),
  time: time("time", { precision: 0 }).default("09:00:00"),
  active: boolean("active").default(false),

  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const reminderRelations = relations(reminder, ({ one }) => ({
  user: one(user, {
    fields: [reminder.userId],
    references: [user.id],
  }),
}));
