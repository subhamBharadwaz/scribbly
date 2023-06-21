import * as React from "react"

import { cn } from "@/lib/utils"

interface JournalShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function JournalShell({
  children,
  className,
  ...props
}: JournalShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}
