"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { UserSubscriptionPlan } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Reminder } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
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

interface ReminderFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan
}

export function ReminderForm({
  subscriptionPlan,
  className,
  ...props
}: ReminderFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const { data: reminder, isLoading } = useQuery<Reminder>({
    queryKey: ["reminder"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/reminder`
      )
      return await res.data
    },
  })

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/reminder`
      )
      const data = await res.data
      return {
        active: data?.active,
        frequency: data?.frequency,
      }
    },
  })

  const updateReminderHandler = async (data: ReminderFormValues) => {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/reminder`,
      data
    )
    return await res.data
  }

  const updateReminderMutation = useMutation({
    mutationFn: updateReminderHandler,
    onSuccess: () => {
      queryClient.invalidateQueries(["reminder"]),
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
