import "server-only";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { reminder as reminderTable } from "@/server/db/schema";

export async function getMyReminderSettings() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const reminder = await db.query.reminder.findFirst({
      columns: {
        id: true,
        frequency: true,
        time: true,
        active: true,
      },
      where: eq(reminderTable.userId, user.id),
    });
    return reminder;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      };
    }
    throw new Error("Server error", { cause: error });
  }
}
