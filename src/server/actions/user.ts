"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { userNameSchema } from "@/lib/validations/user"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function updateUserName(
  rawInput: z.infer<typeof routeContextSchema>,
  input: z.infer<typeof userNameSchema>
) {
  try {
    const { params } = routeContextSchema.parse(rawInput)

    const user = await getUserByClerkId()
    if (!user || params.userId !== user.id) {
      throw new Error("Unauthorized")
    }

    const payload = userNameSchema.parse(input)

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: payload.name,
      },
    })

    revalidatePath("/journal/settings")
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
