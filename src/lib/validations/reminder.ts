import * as z from "zod";

export const reminderFormSchema = z.object({
  frequency: z.enum(["DAILY", "WEEKLY"]),
  active: z.boolean().default(false).optional(),
});

export type ReminderFormValues = z.infer<typeof reminderFormSchema>;
