import { NextResponse } from "next/server"
import { z } from "zod"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { reminderFormSchema } from "@/lib/validations/reminder"

export async function PATCH(req: Request) {
  try {
    // Validate the route context.

    // Ensure user is authentication and has access to this user.
    const user = await getUserByClerkId()
    if (!user) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = reminderFormSchema.parse(body)

    // Update the reminder.
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

    return NextResponse.json(reminder)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
