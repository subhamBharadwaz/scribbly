import { JournalConfig } from "@/types"

export const journalConfig: JournalConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
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
