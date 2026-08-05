import { Resend } from "resend";

import { env } from "@/env";

let resendClient: Resend | null = null;

export function getResend() {
  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }

  return resendClient;
}
