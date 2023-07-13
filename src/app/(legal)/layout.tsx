import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { getUserByClerkId } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import SiteFooter from "@/components/site-footer"

interface LegalLayoutProps {
  children: React.ReactNode
}

export default async function LegalLayout({ children }: LegalLayoutProps) {
  const user = await getUserByClerkId()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur-lg">
        <div className="container flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href={user?.clerkId ? "/journal" : "/sign-in"}
              className={cn(
                buttonVariants({ size: "lg", variant: "cta" }),
                "rounded-full px-4"
              )}
            >
              {user && user?.clerkId ? "Go to your journal" : "Sign in"}
            </Link>
          </nav>
        </div>
      </header>
      <main className="container flex-1">{children}</main>
      <SiteFooter className="mt-[20vh]" />
    </div>
  )
}
