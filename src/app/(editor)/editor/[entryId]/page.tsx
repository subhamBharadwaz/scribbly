import { notFound, redirect } from "next/navigation"
import { JournalEntry, User } from "@prisma/client"

import { getUserByClerkId } from "@/lib/auth"
import { db } from "@/lib/db"
import Editor from "@/components/editor"

async function getPostForUser(entryId: JournalEntry["id"], userId: User["id"]) {
  return await db.journalEntry.findFirst({
    where: {
      id: entryId,
      userId: userId,
    },
  })
}

interface EditorPageProps {
  params: { entryId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getUserByClerkId()

  if (!user) {
    redirect("/login")
  }

  const entry = await getPostForUser(params.entryId, user.id)

  if (!entry) {
    notFound()
  }

  return (
    <Editor
      entry={{
        id: entry.id,
        title: entry.title,
        content: entry.content,
      }}
    />
  )
}
