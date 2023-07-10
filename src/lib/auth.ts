import { auth } from "@clerk/nextjs"

import { db } from "./db"

export const getUserByClerkId = async () => {
  const { userId } = auth()
  console.log({ userId })
  if (userId) {
    try {
      const user = await db.user.findUniqueOrThrow({
        where: {
          clerkId: userId as string,
        },
      })

      console.log({ user })

      return user
    } catch (error) {
      console.error(error)
      if (error.code === "P2025") {
        // Network error, retry the function call
        return await getUserByClerkId()
      } else if (error.code === "P2016") {
        // Record not found, wait and retry the function call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return await getUserByClerkId()
      } else {
        throw new Error("User not found")
      }
    }
  }
}
