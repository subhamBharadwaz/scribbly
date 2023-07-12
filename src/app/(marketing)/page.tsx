/* eslint-disable tailwindcss/no-contradicting-classname */
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Testimonials from "@/components/testimonials"

export default function Home() {
  return (
    <>
      <section className="relative min-h-[90vh] py-16">
        <div className="after:absolute after:top-0 after:z-[-1] after:h-full after:w-full after:bg-[url('../../public/grid.svg')] after:opacity-[.4] after:invert-[1]" />
        <div className="relative flex flex-col items-center justify-center space-y-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="bg-heading-gradient bg-clip-text  text-center font-heading  text-4xl tracking-tight text-transparent md:text-6xl md:leading-snug">
              Journaling Made Simple
              <br className="md:block" />
              With{" "}
              <span className="bg-primary-gradient bg-clip-text text-transparent">
                Scribbly
              </span>
            </h1>
            <p className="my-4 max-w-md text-center text-muted-foreground lg:max-w-xl lg:text-lg 2xl:text-xl">
              Seamlessly Document and Preserve the Vibrant Moments of Your Life
              with Our Feature-Rich Digital Journal.
            </p>

            <Link
              href="/journal"
              className={cn(
                buttonVariants({ variant: "cta" }),
                "mt-8 flex h-12 items-center justify-center space-x-5 p-[.25rem_.3rem_.25rem_1.3rem] text-base"
              )}
            >
              <span className="text-white">Get started </span>
              <span className="right-0 inline-block rounded-full bg-white/50  p-[0.5rem]">
                <Icons.chevronRight className="h-6 w-6 text-black/60" />
              </span>
            </Link>
          </div>
          <div className="w-full max-w-5xl rounded-lg bg-primary-gradient p-1 shadow-[0px_4px_15px]  shadow-[rgb(247_176_253_/_50%)] md:w-4/5 lg:w-3/4">
            <AspectRatio ratio={4 / 3}>
              <Image
                src="/images/hero-dark.png"
                fill
                alt="hero"
                className="rounded-lg object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </section>
      <section id="features" className="mt-[10vh] min-h-[100vh]">
        <h2 className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl tracking-tight text-transparent md:text-5xl md:leading-snug">
          An app where you&apos;ll find <br />a{" "}
          <span className="bg-secondary-gradient bg-clip-text text-transparent">
            peace{" "}
          </span>
          of{" "}
          <span className="bg-secondary-gradient-2 bg-clip-text text-transparent">
            mind
          </span>
        </h2>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardContent className="space-y-10 p-0">
              <div className="space-y-5 px-6 py-8">
                <h3 className="text-center font-heading text-2xl  leading-normal tracking-tight text-foreground lg:text-3xl">
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
                <div className="absolute inset-0 -top-1 left-9 z-0 rounded-md bg-primary-gradient" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 ml-10 rounded-md object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/dogdzaavf/video/upload/v1689155252/editor-dark_gfnig8.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="space-y-10 p-0">
              <div className="space-y-5 px-6 py-8">
                <h3 className="text-center font-heading text-2xl  leading-normal tracking-tight text-foreground lg:text-3xl">
                  Personalized Entry
                  <br /> Reminders
                </h3>
                <p className="text-center text-muted-foreground lg:text-lg">
                  Set personalized reminders to ensure consistent journaling and
                  never miss an opportunity to reflect and record your thoughts.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 -top-1 left-9 z-0 rounded-md bg-primary-gradient" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 ml-10 rounded-md object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/dogdzaavf/video/upload/v1689155238/reminder-dark_elaitc.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-[10vh] min-h-[90vh]">
        <h2 className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl tracking-tight text-transparent md:text-5xl md:leading-snug">
          Captivating{" "}
          <span className="bg-secondary-gradient-3 bg-clip-text text-transparent">
            Experiences
          </span>{" "}
          and <br />
          Rave Reviews
        </h2>
        <Testimonials className="py-16" />
      </section>

      <section id="pricing" className="mt-[10vh] min-h-[90vh]">
        <h2 className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl tracking-tight text-transparent md:text-5xl md:leading-snug">
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
      <section className="relative mt-[10vh] min-h-[30vh]">
        <div className="after:absolute after:top-0 after:z-[-1] after:h-full after:w-full after:bg-[url('../../public/grid.svg')] after:opacity-[.4] after:invert-[1]" />
        <div className="flex flex-col items-center justify-center space-y-8 py-10">
          <h2 className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl tracking-tight text-transparent md:text-5xl md:leading-snug">
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
