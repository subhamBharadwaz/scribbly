"use server";

import { revalidatePath } from "next/cache";
import { getUserSubscriptionPlan } from "@/server/actions/stripe";
import { and, count, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { RequiresProPlanError } from "@/lib/exceptions";
import { entryPatchSchema } from "@/lib/validations/entry";
import { verifyCurrentUserHasAccessToEntry } from "@/lib/verify-current-user-has-access-to-entry";
import { db } from "@/server/db";
import { journalEntry } from "@/server/db/schema";

const entryCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  mood: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function createJournalEntry(
  rawInput: z.infer<typeof entryCreateSchema>,
) {
  try {
    const input = entryCreateSchema.parse(rawInput);
    const user = await getCurrentUser();

    if (!user) {
      return {
        error: "Unauthorized",
        code: 403,
      };
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user?.id);
    if (!subscriptionPlan?.isPro) {
      const [entryCount] = await db
        .select({ value: count() })
        .from(journalEntry)
        .where(eq(journalEntry.userId, user.id));

      if ((entryCount?.value ?? 0) >= 3) {
        throw new RequiresProPlanError();
      }
    }

    const [entry] = await db
      .insert(journalEntry)
      .values({
        title: input.title,
        content: input.content,
        mood: input.mood,
        tags: input.tags,
        userId: user.id,
      })
      .returning();
    revalidatePath("/journal");
    return entry;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      };
    }
    if (error instanceof RequiresProPlanError) {
      return {
        error: error.message,
        code: 402,
      };
    }
    return {
      error,
      code: 500,
    };
  }
}

const routeContextSchema = z.object({
  params: z.object({
    entryId: z.string(),
  }),
});

export async function deleteJournalEntry(
  rawInput: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(rawInput);

    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      throw new Error("You don't have any access to this entry");
    }

    await db.delete(journalEntry).where(eq(journalEntry.id, params.entryId));
    revalidatePath("/journal");
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      };
    }
    return {
      error,
      code: 500,
    };
  }
}

export async function editJournalEntry(
  rawInput: z.infer<typeof routeContextSchema>,
  data: z.infer<typeof entryPatchSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(rawInput);

    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      throw new Error("You don't have any access to this entry");
    }

    const input = entryPatchSchema.parse(data);

    await db
      .update(journalEntry)
      .set({
        title: input.title,
        content: input.content,
        mood: input.mood,
        tags: input.tags,
        updatedAt: new Date(),
      })
      .where(eq(journalEntry.id, params.entryId));

    revalidatePath(`/editor/${params.entryId}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      };
    }
    return {
      error,
      code: 500,
    };
  }
}

const UpdateBookmarkStatusSchema = z.object({
  entryId: z.string(),
  isBookmarked: z.boolean(),
});

export async function updateBookmarkStatus(
  rawInput: z.infer<typeof UpdateBookmarkStatusSchema>,
) {
  try {
    const { entryId, isBookmarked } =
      UpdateBookmarkStatusSchema.parse(rawInput);

    if (!(await verifyCurrentUserHasAccessToEntry(entryId))) {
      throw new Error("You don't have any access to this entry");
    }

    const [bookmarkedEntry] = await db
      .update(journalEntry)
      .set({
        isBookmarked,
        updatedAt: new Date(),
      })
      .where(eq(journalEntry.id, entryId))
      .returning();
    revalidatePath(`/journal`);
    return bookmarkedEntry;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.issues,
        code: 422,
      };
    }
    return {
      error,
      code: 500,
    };
  }
}

export async function getMyBookmarkedJournalEntries() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const entries = await db
    .select({
      id: journalEntry.id,
      title: journalEntry.title,
      createdAt: journalEntry.createdAt,
      content: journalEntry.content,
      mood: journalEntry.mood,
      tags: journalEntry.tags,
      isBookmarked: journalEntry.isBookmarked,
    })
    .from(journalEntry)
    .where(
      and(
        eq(journalEntry.userId, user.id),
        eq(journalEntry.isBookmarked, true),
      ),
    )
    .orderBy(desc(journalEntry.updatedAt));
  revalidatePath("/journal");
  return entries;
}

export async function getMyJournalEntries() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const entries = await db
    .select({
      id: journalEntry.id,
      content: journalEntry.content,
      mood: journalEntry.mood,
      tags: journalEntry.tags,
      title: journalEntry.title,
      createdAt: journalEntry.createdAt,
      isBookmarked: journalEntry.isBookmarked,
    })
    .from(journalEntry)
    .where(eq(journalEntry.userId, user.id))
    .orderBy(desc(journalEntry.updatedAt));
  return entries;
}
