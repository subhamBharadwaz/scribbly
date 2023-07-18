"use client"

import { FC, useEffect } from "react"
import { stagger, useAnimate, useInView } from "framer-motion"

import Features from "./features"

const FeaturesSection: FC = () => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  useEffect(() => {
    if (isInView) {
      animate(
        "#reveal-anim",
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, ease: "easeIn", delay: stagger(0.3) }
      )
    }
  }, [isInView])

  return (
    <section ref={scope} id="features" className="mt-[10vh]">
      <h2
        id="reveal-anim"
        className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl tracking-tight text-transparent md:text-5xl md:leading-snug"
      >
        An app where you&apos;ll find <br />a{" "}
        <span className="bg-secondary-gradient bg-clip-text text-transparent">
          peace of mind
        </span>
      </h2>

      <div id="reveal-anim">
        <Features />
      </div>
    </section>
  )
}

export default FeaturesSection
