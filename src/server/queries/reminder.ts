import "server-only"

import { z } from "zod"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"

export async function getMyReminderSettings() {
  try {
    const user = await getUserByClerkId()

    if (!user) {
      throw new Error("Unauthorized")
    }

    const reminder = await db.reminder.findFirst({
      select: {
        id: true,
        frequency: true,
        time: true,
        active: true,
      },
      where: {
        userId: user.id,
      },
    })
    return reminder
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      }
    }
    throw new Error("Server error", error)
  }
}
