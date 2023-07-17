"use client"

import { FC, useEffect } from "react"
import { stagger, useAnimate, useInView } from "framer-motion"

import Testimonials from "./testimonials"

const TestimonialsSection: FC = () => {
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
    <section ref={scope} className="mt-[10vh] min-h-[90vh]">
      <h2
        id="reveal-anim"
        className="bg-heading-gradient bg-clip-text  text-center font-heading  text-3xl leading-tight tracking-tight text-transparent md:text-5xl md:leading-snug"
      >
        Stories from the{" "}
        <span className="bg-secondary-gradient-2 bg-clip-text text-transparent">
          heart
        </span>
      </h2>
      <Testimonials className="py-16" />
    </section>
  )
}

export default TestimonialsSection
