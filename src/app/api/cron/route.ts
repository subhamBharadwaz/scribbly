import { NextResponse } from "next/server"
import { type ErrorResponse } from "resend"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"
import { resend } from "@/lib/resend"
import ReminderEmail from "@/components/emails/reminder-email"

export async function GET() {
  try {
    const users = await db.user.findMany({
      where: {
        reminder: {
          active: true,
        },
      },
    })

    const subject =
      "📝 Daily Journal Reminder - Stay Committed to Your Journey! 🌟"

    // TODO: Send reminder based on frequency

    for (const user of users) {
      await resend.emails.send({
        from: env.EMAIL_FROM_ADDRESS,
        to: user.email,
        subject,
        react: ReminderEmail({
          firstName: user.name.split(" ")[0],
          fromEmail: env.EMAIL_FROM_ADDRESS,
        }),
      })
    }
  } catch (error) {
    console.error(error)

    const resendError = error as ErrorResponse

    if (resendError?.error?.message) {
      return NextResponse.json(resendError.error.message, { status: 429 })
    }

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 })
    }

    return NextResponse.json("Something went wrong", { status: 500 })
  }
}
