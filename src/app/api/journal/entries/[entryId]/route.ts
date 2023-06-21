import * as z from "zod"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import { entryPatchSchema } from "@/lib/validations/entry"

const routeContextSchema = z.object({
  params: z.object({
    entryId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this Entry.
    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the entry.
    await db.journalEntry.delete({
      where: {
        id: params.entryId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this entry.
    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = entryPatchSchema.parse(json)

    // Update the entry.
    // TODO: Implement sanitization for content.
    await db.journalEntry.update({
      where: {
        id: params.entryId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToEntry(entryId: string) {
  const user = await getUserByClerkId()
  const count = await db.journalEntry.count({
    where: {
      id: entryId,
      userId: user?.id,
    },
  })

  return count > 0
}
