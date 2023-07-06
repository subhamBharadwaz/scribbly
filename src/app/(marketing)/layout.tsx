import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import SiteFooter from "@/components/site-footer"

// import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ size: "lg" }), "px-4")}
            >
              Sign-up
            </Link>
          </nav>
        </div>
      </header>
      <main className="container flex-1">{children}</main>
      <SiteFooter className="mt-[20vh]" />
    </div>
  )
}
