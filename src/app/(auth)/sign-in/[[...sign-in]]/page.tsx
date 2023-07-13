import { Metadata } from "next"
import { SignIn } from "@clerk/nextjs"

import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account",
}

export default function LoginPage() {
  return (
    <Shell className="flex max-w-lg flex-col items-center justify-center">
      <SignIn
        appearance={{
          layout: {
            socialButtonsVariant: "blockButton",
          },
        }}
      />
    </Shell>
  )
}
