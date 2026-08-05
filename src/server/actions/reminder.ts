"use server";

import { revalidatePath } from "next/cache";
import { getUserSubscriptionPlan } from "@/server/actions/stripe";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { RequiresProPlanError } from "@/lib/exceptions";
import { reminderFormSchema } from "@/lib/validations/reminder";
import { db } from "@/server/db";
import { reminder as reminderTable } from "@/server/db/schema";

export async function updateReminder(
  rawInput: z.infer<typeof reminderFormSchema>,
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user?.id);
    if (!subscriptionPlan?.isPro) {
      throw new RequiresProPlanError();
    }

    const payload = reminderFormSchema.parse(rawInput);

    const [reminder] = await db
      .insert(reminderTable)
      .values({
        frequency: payload.frequency,
        active: payload.active,
        userId: user.id,
      })
      .onConflictDoUpdate({
        target: reminderTable.userId,
        set: {
          frequency: payload.frequency,
          active: payload.active,
        },
      })
      .returning();

    revalidatePath("/journal/settings");
    return reminder;
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
