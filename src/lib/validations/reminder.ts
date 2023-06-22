import * as z from "zod"

export const reminderFormSchema = z.object({
  frequency: z.enum(["DAILY", "WEEKLY"], {
    required_error: "Please select a reminder frequency.",
  }),
  active: z.boolean().default(false).optional(),
})

export type ReminderFormValues = z.infer<typeof reminderFormSchema>
