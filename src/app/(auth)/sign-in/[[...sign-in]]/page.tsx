import { Metadata } from "next";

import { Shell } from "@/components/shell";
import { AuthForm } from "../../_components/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <Shell className="flex max-w-lg flex-col items-center justify-center">
      <AuthForm mode="sign-in" />
    </Shell>
  );
}
