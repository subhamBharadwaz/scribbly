import { notFound, redirect } from "next/navigation"
import { getMyEntry } from "@/server/queries/editor"

import { getUserByClerkId } from "@/lib/auth"
import Editor from "@/app/(journal)/_components/editor"

interface EditorPageProps {
  params: { entryId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getUserByClerkId()

  if (!user) {
    redirect("/sign-in")
  }

  const entry = await getMyEntry(params.entryId, user.id)

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
