import { NextResponse } from "next/server"
import { z } from "zod"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { reminderFormSchema } from "@/lib/validations/reminder"

export async function GET(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const user = await getUserByClerkId()
    if (!user) {
      return new Response(null, { status: 403 })
    }

    // Update the reminder.
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

    return NextResponse.json(reminder)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    // Validate the route context.

    // Ensure user is authentication and has access to this user.
    const user = await getUserByClerkId()
    if (!user) {
      return new Response(null, { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user?.id)
    // If user is on a free plan.
    // Check if user has reached limit of 3 entries.
    if (!subscriptionPlan?.isPro) {
      throw new RequiresProPlanError()
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

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
