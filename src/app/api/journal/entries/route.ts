import * as z from "zod"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const entryCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const user = await getUserByClerkId()

    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const entries = await db.journalEntry.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
      where: {
        userId: user?.id,
      },
    })

    return new Response(JSON.stringify(entries))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUserByClerkId()

    if (!user) {
      return new Response("Unauthorized", { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user?.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 entries.
    if (!subscriptionPlan?.isPro) {
      const count = await db.journalEntry.count({
        where: {
          userId: user?.id,
        },
      })

      if (count >= 3) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()
    const body = entryCreateSchema.parse(json)

    const entry = await db.journalEntry.create({
      data: {
        title: body.title,
        content: body.content,
        userId: user?.id,
      },
    })

    return new Response(JSON.stringify(entry))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }
    console.log({ error })
    return new Response(null, { status: 500 })
  }
}
