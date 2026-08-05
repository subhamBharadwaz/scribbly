import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { type ErrorResponse } from "resend";

import { env } from "@/env";
import { getResend } from "@/lib/resend";
import { db } from "@/server/db";
import { reminder, user } from "@/server/db/schema";
import ReminderEmail from "@/components/emails/reminder-email";

export async function GET(req: NextRequest) {
  try {
    const users = await db
      .select({
        email: user.email,
        name: user.name,
      })
      .from(user)
      .innerJoin(reminder, eq(reminder.userId, user.id))
      .where(eq(reminder.active, true));

    const subject =
      "📝 Daily Journal Reminder - Stay Committed to Your Journey! 🌟";

    // TODO: Send reminder based on frequency

    for (const user of users) {
      await getResend().emails.send({
        from: env.EMAIL_FROM_ADDRESS,
        to: user.email,
        subject,
        react: ReminderEmail({
          firstName: user.name.split(" ")[0],
          fromEmail: env.EMAIL_FROM_ADDRESS,
        }),
      });
    }
    return NextResponse.json("Successfully sent", { status: 200 });
  } catch (error) {
    console.error(error);

    const resendError = error as ErrorResponse;

    if (resendError?.message) {
      return NextResponse.json(resendError.message, { status: 429 });
    }

    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }

    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
