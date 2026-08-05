import { Shell } from "@/components/shell";
import { AuthForm } from "../../_components/auth-form";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  return (
    <Shell className="flex max-w-lg flex-col items-center justify-center">
      <AuthForm mode="sign-up" />
    </Shell>
  );
}
