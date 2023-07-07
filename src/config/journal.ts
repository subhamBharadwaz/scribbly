import { JournalConfig } from "@/types"

export const journalConfig: JournalConfig = {
  sidebarNav: [
    {
      title: "Entries",
      href: "/journal",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/journal/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/journal/settings",
      icon: "settings",
    },
  ],
}
