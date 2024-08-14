"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { updateReminder } from "@/server/actions/reminder"
import { UserSubscriptionPlan } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Reminder } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { ZodIssue } from "zod"

import { cn } from "@/lib/utils"
import {
  reminderFormSchema,
  ReminderFormValues,
} from "@/lib/validations/reminder"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { Switch } from "../../../../components/ui/switch"

type ReminderError = {
  error: ZodIssue[]
  code: number
}
interface ReminderFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan
  reminderSettings: Reminder
}

export function ReminderForm({
  subscriptionPlan,
  className,
  reminderSettings,
  ...props
}: ReminderFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      active: reminderSettings?.active,
      frequency: reminderSettings?.frequency,
    },
  })

  const updateReminderHandler = async (data: ReminderFormValues) => {
    const reminder = await updateReminder({
      active: data.active,
      frequency: data.frequency,
    })
    return reminder
  }

  const updateReminderMutation = useMutation({
    mutationFn: updateReminderHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminder"] }),
        toast({
          description: "Reminder settings updated successfully.",
        }),
        setIsSaving(false)
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        description:
          "Your reminder settings were not updated. Please try again.",
        variant: "destructive",
      })
    },
  })

  async function onSubmit(data: ReminderFormValues) {
    if (subscriptionPlan?.isPro) {
      setIsSaving(true)
      updateReminderMutation.mutate(data)
    }
    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        className={cn(className, "space-y-8")}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="max-w-xl flex-row items-center justify-between md:flex">
              <div className="space-y-0.5">
                <FormLabel className="font-semibold">Active Reminder</FormLabel>
                <FormDescription>
                  Control reminder active status by clicking the switch
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!subscriptionPlan?.isPro || isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem className="max-w-xl">
              <FormLabel className="font-semibold">Frequency</FormLabel>

              <Select
                onValueChange={field.onChange}
                disabled={!subscriptionPlan?.isPro || isLoading}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reminder frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={cn(className)}
          disabled={isSaving || !subscriptionPlan?.isPro}
        >
          {isSaving && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          <span>Update Reminder</span>
        </Button>
      </form>
    </Form>
  )
}
