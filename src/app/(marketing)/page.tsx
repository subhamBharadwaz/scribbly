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
import Features from "@/components/marketing/features"
import Pricing from "@/components/marketing/pricing"
import Testimonials from "@/components/marketing/testimonials"

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
          <div className="w-full max-w-5xl rounded-lg bg-primary-gradient p-1 shadow-[0px_4px_15px] shadow-[rgb(247_176_253_/_50%)] transition-shadow  duration-300 md:w-4/5 lg:w-3/4">
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
            peace of mind
          </span>
        </h2>

        <Features />
      </section>

      <section className="mt-[10vh] min-h-[90vh]">
        <h2 className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl leading-tight tracking-tight text-transparent md:text-5xl md:leading-snug">
          Stories from the{" "}
          <span className="bg-secondary-gradient-2 bg-clip-text text-transparent">
            heart
          </span>
        </h2>
        <Testimonials className="py-16" />
      </section>

      <section id="pricing" className="mt-[10vh] min-h-[90vh]">
        <h2 className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl tracking-tight text-transparent md:text-5xl md:leading-snug">
          Ready to get{" "}
          <span className="bg-secondary-gradient-3 bg-clip-text text-transparent">
            started?
          </span>
        </h2>
        <Pricing />
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
              "text- cursor-pointer gap-x-3 bg-secondary-gradient-4 text-white transition-shadow duration-300  hover:shadow-[0px_4px_30px] hover:shadow-[rgb(55_65_81_/_50%)]"
            )}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.gitHub className="h-5 w-5 text-background text-white" />{" "}
            Github
          </a>
        </div>
      </section>
    </>
  )
}
