"use server"

import { revalidatePath } from "next/cache"
import { getUserSubscriptionPlan } from "@/server/actions/stripe"
import { z } from "zod"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { entryPatchSchema } from "@/lib/validations/entry"
import { verifyCurrentUserHasAccessToEntry } from "@/lib/verify-current-user-has-access-to-entry"

const entryCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function createJournalEntry(
  rawInput: z.infer<typeof entryCreateSchema>
) {
  try {
    const input = entryCreateSchema.parse(rawInput)
    const user = await getUserByClerkId()

    if (!user) {
      return {
        error: "Unauthorized",
        code: 403,
      }
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user?.id)
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

    const entry = await db.journalEntry.create({
      data: {
        title: input.title,
        content: input.content,
        userId: user?.id,
      },
    })
    revalidatePath("/journal")
    return entry
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

const routeContextSchema = z.object({
  params: z.object({
    entryId: z.string(),
  }),
})

export async function deleteJournalEntry(
  rawInput: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(rawInput)

    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      throw new Error("You don't have any access to this entry")
    }

    await db.journalEntry.delete({
      where: {
        id: params.entryId,
      },
    })
    revalidatePath("/journal")
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      }
    }
    return {
      error,
      code: 500,
    }
  }
}

export async function editJournalEntry(
  rawInput: z.infer<typeof routeContextSchema>,
  data: z.infer<typeof entryPatchSchema>
) {
  try {
    const { params } = routeContextSchema.parse(rawInput)

    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      throw new Error("You don't have any access to this entry")
    }

    const input = entryPatchSchema.parse(data)

    await db.journalEntry.update({
      where: {
        id: params.entryId,
      },
      data: {
        title: input.title,
        content: input.content,
      },
    })

    revalidatePath(`/editor/${params.entryId}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      }
    }
    return {
      error,
      code: 500,
    }
  }
}

const UpdateBookmarkStatusSchema = z.object({
  entryId: z.string(),
  isBookmarked: z.boolean(),
})

export async function updateBookmarkStatus(
  rawInput: z.infer<typeof UpdateBookmarkStatusSchema>
) {
  try {
    const { entryId, isBookmarked } = UpdateBookmarkStatusSchema.parse(rawInput)

    if (!(await verifyCurrentUserHasAccessToEntry(entryId))) {
      throw new Error("You don't have any access to this entry")
    }

    const bookmarkedEntry = await db.journalEntry.update({
      where: {
        id: entryId,
      },
      data: {
        isBookmarked,
      },
    })
    revalidatePath(`/journal`)
    return bookmarkedEntry
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      }
    }
    return {
      error,
      code: 500,
    }
  }
}

export async function getMyBookmarkedJournalEntries() {
  const user = await getUserByClerkId()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const entries = await db.journalEntry.findMany({
    where: {
      userId: user?.id,
      isBookmarked: true,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      content: true,
      isBookmarked: true,
    },
    orderBy: { updatedAt: "desc" },
  })
  revalidatePath("/journal")
  return entries
}

export async function getMyJournalEntries() {
  const user = await getUserByClerkId()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const entries = await db.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      content: true,
      title: true,
      createdAt: true,
      isBookmarked: true,
    },
    orderBy: { updatedAt: "desc" },
  })
  return entries
}
