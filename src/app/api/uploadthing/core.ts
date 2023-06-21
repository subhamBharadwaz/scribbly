import { createUploadthing, type FileRouter } from "uploadthing/next"

import { getUserByClerkId } from "@/lib/auth"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "1MB" } })
    .middleware(async (req) => {
      const user = await getUserByClerkId()

      if (!user) throw new Error("Unauthorized")

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
