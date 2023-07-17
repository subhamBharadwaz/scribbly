"use client"

/* eslint-disable tailwindcss/no-contradicting-classname */
import { FC, useEffect } from "react"
import Link from "next/link"
import { stagger, useAnimate } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
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
    <section className="relative min-h-[90vh] py-16">
      <div className="after:absolute after:top-0 after:z-[-1] after:h-full after:w-full after:bg-[url('../../public/grid.svg')] after:opacity-[.4] after:invert-[1]" />
      <div
        ref={scope}
        className="relative flex flex-col items-center justify-center space-y-20"
      >
        <div className="flex flex-col items-center justify-center">
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
              "mt-8 flex h-12 items-center justify-center space-x-5 p-[.25rem_.3rem_.25rem_1.3rem] text-base"
            )}
          >
            <span className="text-white">Get started </span>
            <span className="right-0 inline-block rounded-full bg-white/50  p-[0.5rem]">
              <Icons.chevronRight className="h-6 w-6 text-black/60" />
            </span>
          </Link>
        </div>
        <HeroImage />
      </div>
    </section>
  )
}

export default HeroSection
