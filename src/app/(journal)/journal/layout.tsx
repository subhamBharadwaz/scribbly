import { notFound } from "next/navigation"

import { journalConfig } from "@/config/journal"
import { getUserByClerkId } from "@/lib/auth"
import { MainNav } from "@/components/main-nav"
import { JournalNav } from "@/components/nav"
// import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface JournalLayoutProps {
  children?: React.ReactNode
}

export default async function JournalLayout({ children }: JournalLayoutProps) {
  const user = await getUserByClerkId()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={journalConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user?.name,
              image: user?.image as string,
              email: user?.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <JournalNav items={journalConfig.sidebarNav} />
        </aside>
        <main className="mb-10 flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  )
}
