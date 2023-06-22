"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { UserSubscriptionPlan } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  reminderFormSchema,
  ReminderFormValues,
} from "@/lib/validations/reminder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "./ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Switch } from "./ui/switch"

// This can come from your database or API.
const defaultValues: Partial<ReminderFormValues> = {
  frequency: "DAILY",
  active: false,
}

interface ReminderFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan
}

export function ReminderForm({
  subscriptionPlan,
  className,
  ...props
}: ReminderFormProps) {
  const router = useRouter()
  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues,
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: ReminderFormValues) {
    setIsSaving(true)

    const response = await fetch(`/api/reminder`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        frequency: data.frequency,
        active: data.active,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your name has been updated.",
    })

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
                  disabled={!subscriptionPlan?.isPro}
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
                defaultValue={field.value}
                disabled={!subscriptionPlan?.isPro}
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
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Update Reminder</span>
        </Button>
      </form>
    </Form>
  )
}
