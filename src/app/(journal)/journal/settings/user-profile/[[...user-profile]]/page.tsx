import type { Metadata } from "next";

import { env } from "@/env";
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { UserNameForm } from "@/app/(journal)/_components/settings/user-name-form";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
};

const UserProfilePage = async () => {
  const user = await getCurrentUser();

  return (
    <Shell variant="sidebar">
      <Header title="Account" description="Manage your profile" size="sm" />
      {user && <UserNameForm user={{ id: user.id, name: user.name }} />}
    </Shell>
  );
};

export default UserProfilePage;
