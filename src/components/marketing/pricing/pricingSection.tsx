"use client"

import { FC, useEffect } from "react"
import { stagger, useAnimate, useInView } from "framer-motion"

import Pricing from "./pricing"

const PricingSection: FC = () => {
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
  }, [animate, isInView])

  return (
    <section ref={scope} id="pricing" className="mt-[10vh]">
      <h2
        id="reveal-anim"
        className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl tracking-tight text-transparent md:text-5xl md:leading-snug"
      >
        Ready to get{" "}
        <span className="bg-secondary-gradient-3 bg-clip-text text-transparent">
          started?
        </span>
      </h2>
      <Pricing />
    </section>
  )
}

export default PricingSection
