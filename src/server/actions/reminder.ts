"use server"

import { revalidatePath } from "next/cache"
import { getUserSubscriptionPlan } from "@/server/actions/stripe"
import { z } from "zod"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { reminderFormSchema } from "@/lib/validations/reminder"

export async function updateReminder(
  rawInput: z.infer<typeof reminderFormSchema>
) {
  try {
    const user = await getUserByClerkId()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user?.id)
    if (!subscriptionPlan?.isPro) {
      throw new RequiresProPlanError()
    }

    const payload = reminderFormSchema.parse(rawInput)

    const reminder = await db.reminder.upsert({
      where: {
        userId: user.id,
      },
      update: {
        frequency: payload.frequency,
        active: payload.active,
      },
      create: {
        frequency: payload.frequency,
        active: payload.active,
        userId: user?.id,
      },
    })

    revalidatePath("/journal/settings")
    return reminder
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      }
    }
    if (error instanceof RequiresProPlanError) {
      return {
        error: error.message,
        code: 402,
      }
    }
    return {
      error,
      code: 500,
    }
  }
}
