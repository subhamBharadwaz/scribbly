import { notFound } from "next/navigation"

import { journalConfig } from "@/config/journal"
import { getUserByClerkId } from "@/lib/auth"
import { MainNav } from "@/components/main-nav"
import { JournalNav } from "@/components/nav"
import SiteFooter from "@/components/site-footer"
// import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface JournalLayoutProps {
  children?: React.ReactNode
}

export default async function JournalLayout({ children }: JournalLayoutProps) {
  const user = await getUserByClerkId()

  return (
    <div className="flex min-h-screen flex-col">
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
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6 lg:py-8">
            <JournalNav items={journalConfig.sidebarNav} />
          </div>
        </aside>
        <main className="mb-10 flex min-h-[95vh] w-full flex-col overflow-hidden py-2 lg:py-6">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
