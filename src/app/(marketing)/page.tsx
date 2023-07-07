import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import LottieAnim from "@/components/lottie-anim"
import TestimonialSwiper from "@/components/testimonials"

export default function Home() {
  return (
    <>
      <section className="h-[90vh] py-16">
        <div className="relative flex flex-col items-center justify-between md:flex-row">
          <div className="space-y-5 lg:space-y-10">
            <h1 className="font-heading text-4xl  tracking-wide text-foreground md:text-6xl lg:leading-normal xl:text-8xl">
              The <span className="relative inline-block">Ultimate</span>{" "}
              <br className="hidden md:block" />
              Digital <span className="text-indigo-600">Journal</span>
            </h1>
            <p className="max-w-md  text-muted-foreground lg:max-w-xl lg:text-lg 2xl:text-xl">
              Unleash the Power of Journaling: Seamlessly Document and Preserve
              the Vibrant Moments of Your Life with Our Feature-Rich Digital
              Journal.
            </p>
            <Button
              size="lg"
              className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 hover:text-slate-950 md:h-14 md:text-lg"
            >
              Get started
            </Button>
          </div>
          <LottieAnim />
        </div>
      </section>
      <section id="features" className="mt-[10vh] min-h-[90vh]">
        <h2 className="text-center font-heading text-3xl  leading-normal tracking-wide text-foreground md:text-4xl xl:text-6xl">
          An app where you&apos; find <br />a peace of mind
        </h2>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardContent className="space-y-10 p-0">
              <div className="space-y-5 px-6 py-8">
                <h3 className="text-center font-heading text-2xl  leading-normal tracking-wide text-foreground lg:text-3xl">
                  Intuitive and Modern
                  <br /> Journal Editor
                </h3>
                <p className="text-center text-muted-foreground lg:text-lg">
                  Create journal entries with our sleek and intuitive editor,
                  offering rich formatting options and a visually captivating
                  experience.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 -top-1 left-9 z-0 rounded-md bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 ml-10 rounded-md object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/dogdzaavf/video/upload/v1687945519/editor_qmb1gl.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="space-y-10 p-0">
              <div className="space-y-5 px-6 py-8">
                <h3 className="text-center font-heading text-2xl  leading-normal tracking-wide text-foreground lg:text-3xl">
                  Personalized Entry
                  <br /> Reminders
                </h3>
                <p className="text-center text-muted-foreground lg:text-lg">
                  Set personalized reminders to ensure consistent journaling and
                  never miss an opportunity to reflect and record your thoughts.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 -top-1 left-9 z-0 rounded-md bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 ml-10 rounded-md object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/dogdzaavf/video/upload/v1687953190/reminder_s9hqww.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-[10vh] min-h-[90vh]">
        <h2 className="text-center font-heading text-3xl  leading-normal tracking-wide text-foreground md:text-4xl xl:text-6xl">
          Captivating Experiences and <br />
          Rave Reviews
        </h2>
        <TestimonialSwiper className="py-16" />
      </section>

      <section id="pricing" className="mt-[10vh] min-h-[90vh]">
        <h2 className="text-center font-heading text-3xl  leading-normal tracking-wide text-foreground md:text-4xl xl:text-6xl">
          Ready to get started?
        </h2>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold md:text-3xl lg:text-4xl">
                Starter
              </CardTitle>
              <CardDescription>
                Experience the joy of journaling for free with Scribbly&apos;s
                essential features and intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <h3 className="lg:text-5x text-2xl font-bold md:text-3xl">
                0₹{" "}
                <span className="inline-block align-baseline text-base font-normal text-muted-foreground">
                  per month{" "}
                  <span className="ml-2 inline-block rounded-lg border p-1 text-base">
                    Free
                  </span>
                </span>
              </h3>
              <Link
                className={cn(buttonVariants({ variant: "blue", size: "lg" }))}
                href="/journal"
              >
                Get Started
              </Link>
              <div className="space-y-5">
                <p className="text-lg">Includes</p>
                <div className="flex items-center gap-x-5">
                  <Icons.check className="text-blue-400" />
                  <p className="text-muted-foreground">3 Entries</p>
                </div>
                <div className="flex items-center gap-x-5">
                  <Icons.check className="text-blue-400" />
                  <p className="text-muted-foreground">24*7 Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold md:text-3xl lg:text-4xl">
                Pro
              </CardTitle>
              <CardDescription>
                Upgrade to Scribbly Pro for an enhanced journaling experience
                with advanced features and exclusive benefits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <h3 className="text-2xl font-bold md:text-3xl lg:text-5xl">
                400₹{" "}
                <span className="inline-block align-baseline text-base font-normal text-muted-foreground">
                  per month{" "}
                  <span className="ml-2 inline-block rounded-lg border  p-1 text-base">
                    Pro
                  </span>
                </span>
              </h3>
              <Link
                className={cn(buttonVariants({ variant: "blue", size: "lg" }))}
                href="/journal/billing"
              >
                Get Started
              </Link>

              <div className="space-y-5">
                <p className="text-lg">Includes</p>
                <div className="flex items-center gap-x-5">
                  <Icons.check className="text-blue-400" />
                  <p className="text-muted-foreground">Unlimited Entries</p>
                </div>
                <div className="flex items-center gap-x-5">
                  <Icons.check className="text-blue-400" />
                  <p className="text-muted-foreground">Set Reminders</p>
                </div>
                <div className="flex items-center gap-x-5">
                  <Icons.check className="text-blue-400" />
                  <p className="text-muted-foreground">24*7 Support</p>
                </div>
                <div className="flex items-center gap-x-5">
                  <Icons.check className="text-blue-400" />
                  <p className="text-muted-foreground">Discord Channel</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="mt-[10vh] min-h-[30vh]">
        <div className="flex flex-col items-center justify-center space-y-8 py-10">
          <h2 className="font-heading text-3xl  leading-normal tracking-wide text-foreground md:text-4xl xl:text-6xl">
            Proudly open source
          </h2>
          <p className="max-w-xl text-center text-lg leading-relaxed text-muted-foreground">
            Our source code is available on GitHub - feel free to read, review,
            or contribute to it however you want!
          </p>
          <a
            href="https://github.com/subhamBharadwaz/scribbly"
            className={cn(
              buttonVariants({ size: "lg" }),
              "cursor-pointer gap-x-3"
            )}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.gitHub className="h-5 w-5 text-background" /> Github
          </a>
        </div>
      </section>
    </>
  )
}
