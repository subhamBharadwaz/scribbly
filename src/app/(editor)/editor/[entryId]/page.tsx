import { notFound, redirect } from "next/navigation";
import { getMyEntry } from "@/server/queries/editor";

import { getCurrentUser } from "@/lib/auth";
import Editor from "@/app/(journal)/_components/editor";

interface EditorPageProps {
  params: Promise<{ entryId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { entryId } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const entry = await getMyEntry(entryId, user.id);

  if (!entry) {
    notFound();
  }

  return (
    <Editor
      entry={{
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
      }}
    />
  );
}
