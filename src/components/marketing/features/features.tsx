"use client"

import { FC, useEffect } from "react"
import { stagger, useAnimate, useInView } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"

interface FeaturesProps {}

const features = [
  {
    id: "editor",
    title: `Intuitive and Modern Journal Editor`,
    description: `Create journal entries with our sleek and intuitive editor, offering rich formatting options and a visually captivating experience.`,
    thumbnail: "/images/features/editor.webp",
    demo: "https://res.cloudinary.com/dogdzaavf/video/upload/v1689155252/editor-dark_gfnig8.mp4",
  },
  {
    id: "reminder",
    title: `Personalized Entry Reminders`,
    description: ` Set personalized reminders to ensure consistent journaling and
        never miss an opportunity to reflect and record your thoughts.`,
    thumbnail: "/images/features/reminder.webp",
    demo: "https://res.cloudinary.com/dogdzaavf/video/upload/v1689155238/reminder-dark_elaitc.mp4",
  },
]

const Features: FC<FeaturesProps> = () => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  useEffect(() => {
    if (isInView) {
      animate(
        "#reveal-anim",
        { opacity: [0, 1], y: [25, 0] },
        { duration: 0.5, ease: "easeIn", delay: stagger(0.3) }
      )
    }
  }, [animate, isInView])
  return (
    <div ref={scope} className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2">
      {features.map((feature) => (
        <Card className="overflow-hidden" key={feature.id} id="reveal-anim">
          <CardContent className="space-y-10 p-0">
            <div className="space-y-5 px-6 py-8">
              <h3 className="text-center font-heading text-2xl  leading-normal tracking-tight text-foreground lg:text-3xl">
                {feature.title}
              </h3>
              <p className="text-center text-muted-foreground lg:text-lg">
                {feature.description}
              </p>
            </div>
            <div className="relative ">
              <div className="absolute inset-0 -top-1 left-9 z-0 rounded-md bg-primary-gradient" />
              <video
                autoPlay
                loop
                muted
                width={800}
                height={600}
                poster={feature.thumbnail}
                className="relative z-10 ml-10 rounded-md object-cover"
              >
                <source src={feature.demo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Features
