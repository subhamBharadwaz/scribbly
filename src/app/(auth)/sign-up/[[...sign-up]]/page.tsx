import Link from "next/link"
import { SignUp } from "@clerk/nextjs"

import { Shell } from "@/components/shell"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  return (
    <Shell className="flex max-w-lg flex-col items-center justify-center">
      <SignUp
        appearance={{
          layout: {
            privacyPageUrl: "/privacy",
            showOptionalFields: true,
            termsPageUrl: "/terms",
          },
        }}
      />
    </Shell>
  )
}
