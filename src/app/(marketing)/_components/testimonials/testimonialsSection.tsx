import { FC } from "react"

import FadeIn from "@/components/fade-in"

import Testimonials from "./testimonials"

const TestimonialsSection: FC = () => {
  return (
    <section id="testimonials" className="mt-[10vh]">
      <FadeIn delay={0.3}>
        <h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
          Stories from the{" "}
          <span className="bg-secondary-gradient-2 bg-clip-text text-transparent">
            heart
          </span>
        </h2>
      </FadeIn>

      <Testimonials className="py-16" />
    </section>
  )
}

export default TestimonialsSection
