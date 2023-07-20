"use client"

import { FC, useEffect } from "react"
import { stagger, useAnimate, useInView } from "framer-motion"
import Tilt from "react-parallax-tilt"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const testimonialData = [
  {
    id: 1,
    name: "Sara D.",
    avatar: "/images/testimonials/sara.webp",
    testimonial:
      "Scribbly has completely transformed my journaling experience! The user-friendly interface and customizable features make it a joy to use. I love being able to access my thoughts and memories from anywhere. Highly recommended!",
  },
  {
    id: 2,
    name: "John M.",
    avatar: "/images/testimonials/john.webp",
    testimonial:
      "I've tried numerous journaling apps, but none compare to Scribbly. The sleek design and seamless synchronization across devices make it a standout. Plus, the prompts and reminders keep me motivated to write every day. It's truly a game-changer!!",
  },
  {
    id: 3,
    name: "Emily R.",
    avatar: "/images/testimonials/emily.webp",
    testimonial:
      "As an artist, Scribbly has become my go-to app for combining my sketches and thoughts in one place. The ability to add multimedia elements to my entries adds a whole new dimension to my journaling. Scribbly has become an essential tool in my creative process.",
  },
  {
    id: 4,
    name: "Mark T.",
    avatar: "/images/testimonials/mark.webp",
    testimonial:
      "I'm not usually one to write in a journal, but Scribbly has made it incredibly easy and fun. The variety of beautiful templates and fonts make each entry visually appealing, and the tagging system helps me organize my thoughts effortlessly. It's a fantastic app for both beginners and seasoned journalers!",
  },
  {
    id: 5,
    name: "Lisa K.",
    avatar: "/images/testimonials/lisa.webp",
    testimonial:
      "Scribbly has revolutionized the way I reflect on my daily life. The app's insightful analytics and mood tracking feature provide valuable insights into my emotions and patterns over time. I'm grateful to Scribbly for helping me gain a deeper understanding of myself. Hope to see new features soon!",
  },
  {
    id: 6,
    name: "Alex S.",
    avatar: "/images/testimonials/alex.webp",
    testimonial:
      "I've always struggled with consistency when it comes to journaling, but Scribbly's daily reminders and motivational quotes have kept me engaged. The app's seamless integration with other productivity tools makes it a perfect companion for anyone looking to improve their mental well-being.",
  },
]

interface TestimonialsProps {
  className?: string
}

const Testimonials: FC<TestimonialsProps> = ({ className }) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  useEffect(() => {
    if (isInView) {
      animate(
        "#reveal-anim",
        { opacity: [0, 1], y: [15, 0] },
        { duration: 0.5, ease: "easeIn", delay: stagger(0.2) }
      )
    }
  }, [animate, isInView])
  return (
    <div
      ref={scope}
      className={cn(
        "grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {testimonialData.map((testimonial) => (
        <div key={testimonial.id} id="reveal-anim">
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.3}
            glareColor="#ffffff"
            glarePosition="all"
            glareBorderRadius="8px"
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
          >
            <Card className="bg-transparent">
              <CardContent className="py-6">
                <p className="leading-relaxed text-muted-foreground">
                  {testimonial.testimonial}
                </p>
              </CardContent>
              <CardFooter className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      alt={testimonial.name}
                      src={testimonial.avatar}
                    />
                    <AvatarFallback>{testimonial.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
                <Icons.quote className="w-5" />
              </CardFooter>
            </Card>
          </Tilt>
        </div>
      ))}
    </div>
  )
}

export default Testimonials
