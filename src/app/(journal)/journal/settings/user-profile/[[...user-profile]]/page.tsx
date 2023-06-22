import { UserProfile } from "@clerk/nextjs"

import { JournalHeader } from "@/components/header"
import { JournalShell } from "@/components/shell"

const UserProfilePage = () => (
  <JournalShell>
    <JournalHeader heading="Manage Your Profile" />

    <UserProfile path="/journal/settings/user-profile" routing="path" />
  </JournalShell>
)

export default UserProfilePage
