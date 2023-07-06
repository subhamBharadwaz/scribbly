import { FC } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Icons } from "./icons"

interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

const SiteFooter: FC<SiteFooterProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        "min-h-[30vh] w-full space-y-20 bg-slate-100 p-10 text-slate-800",
        className
      )}
    >
      <div className="space-y-10">
        <h3 className="text-center text-2xl font-bold">Scribbly</h3>
        <div className="flex flex-col gap-x-5 sm:flex-row sm:items-center sm:justify-center">
          <Link href="/#overview" className="inline-block font-semibold">
            Features
          </Link>
          <Link href="/journal" className="inline-block font-semibold">
            Journal
          </Link>
          <Link href="/#pricing" className="inline-block font-semibold">
            Pricing
          </Link>
          <Link href="/" className="inline-block font-semibold">
            Help
          </Link>
          <Link href="/privacy" className="inline-block font-semibold">
            Privacy
          </Link>
          <Link href="/terms" className="inline-block font-semibold">
            Terms
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-y-5 md:flex-row">
        <div className="flex items-center gap-x-5">
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Icons.gitHub className="h-6 w-6" />
          </a>
          <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <Icons.twitter className="h-6 w-6" />
          </a>
          <Icons.linkedIn className="h-6 w-6" />
        </div>
        <p>&copy; 2023 Scribbly.vercel.com</p>
      </div>
    </footer>
  )
}

export default SiteFooter
