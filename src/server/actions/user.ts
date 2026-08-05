"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { userNameSchema } from "@/lib/validations/user";
import { db } from "@/server/db";
import { user as userTable } from "@/server/db/schema";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function updateUserName(
  rawInput: z.infer<typeof routeContextSchema>,
  input: z.infer<typeof userNameSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(rawInput);

    const user = await getCurrentUser();
    if (!user || params.userId !== user.id) {
      throw new Error("Unauthorized");
    }

    const payload = userNameSchema.parse(input);

    await db
      .update(userTable)
      .set({
        name: payload.name,
        updatedAt: new Date(),
      })
      .where(eq(userTable.id, user.id));

    revalidatePath("/journal/settings");
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
