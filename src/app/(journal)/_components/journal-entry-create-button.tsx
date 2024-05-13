"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createJournalEntry } from "@/server/actions/journal"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface JournalEntryCreateButtonProps extends ButtonProps {}

const JournalEntryCreateButton: React.FC<JournalEntryCreateButtonProps> = ({
  className,
  variant,
  ...props
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const entry = await createJournalEntry({ title: "Untitled Entry" })

    setIsLoading(false)

    if ("error" in entry) {
      if (entry.code === 402) {
        return toast({
          title: "Limit of 3 entries reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your entry was not created. Please try again.",
        variant: "destructive",
      })
    }

    if (entry) {
      router.push(`/editor/${entry.id}`)
    }
  }

  return (
    <Button
      onClick={onClick}
      className={cn(
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 size-4" />
      )}
      New Entry
    </Button>
  )
}

export default JournalEntryCreateButton
