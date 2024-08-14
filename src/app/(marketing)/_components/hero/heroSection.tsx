"use client"

/* eslint-disable tailwindcss/no-contradicting-classname */
import { FC, useEffect } from "react"
import Link from "next/link"
import { stagger, useAnimate } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import AnimatedGradientText from "@/components/animated-gradient-text"
import { Icons } from "@/components/icons"

import { HeroImage } from "./heroImage"

const HeroSection: FC = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      "#transform-anim",
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.5, ease: "easeIn", delay: stagger(0.3) }
    )
  })

  return (
    <section className="mt-[10vh]">
      <div
        ref={scope}
        className="relative flex flex-col items-center justify-center gap-y-24"
      >
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className="mb-3">
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Introducing Bookmark Feature
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </Link>
          <h1
            id="transform-anim"
            className="bg-heading-gradient bg-clip-text  text-center font-heading  text-4xl tracking-tight text-transparent md:text-6xl md:leading-snug"
          >
            Journaling Made Simple
            <br className="md:block" />
            With{" "}
            <span className="bg-primary-gradient bg-clip-text text-transparent">
              Scribbly
            </span>
          </h1>
          <p
            id="transform-anim"
            className="my-4 max-w-md text-center text-muted-foreground lg:max-w-xl lg:text-lg 2xl:text-xl"
          >
            Seamlessly Document and Preserve the Vibrant Moments of Your Life
            with Our Feature-Rich Digital Journal.
          </p>

          <Link
            id="transform-anim"
            href="/journal"
            className={cn(
              buttonVariants({ variant: "cta" }),
              "group mt-8 flex h-12 items-center justify-center space-x-5 overflow-hidden p-[.25rem_.5rem_.25rem_1.3rem] text-base"
            )}
          >
            <span className="text-white">Get started </span>
            <span className="right-0 inline-block translate-x-0 rounded-full bg-white/50 p-2 transition-all duration-300  group-hover:translate-x-2">
              <Icons.chevronRight className="size-6 text-black/60 " />
            </span>
          </Link>
        </div>
        <HeroImage />
      </div>
    </section>
  )
}

export default HeroSection
