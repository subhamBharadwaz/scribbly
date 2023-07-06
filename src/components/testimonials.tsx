import { FC } from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

import { Icons } from "./icons"

const testimonialData = [
  {
    id: 1,
    name: "Sara D.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    testimonial:
      "Scribbly has completely transformed my journaling experience! The user-friendly interface and customizable features make it a joy to use. I love being able to access my thoughts and memories from anywhere. Highly recommended!",
  },
  {
    id: 2,
    name: "John M.",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    testimonial:
      "I've tried numerous journaling apps, but none compare to Scribbly. The sleek design and seamless synchronization across devices make it a standout. Plus, the prompts and reminders keep me motivated to write every day. It's truly a game-changer!!",
  },
  {
    id: 3,
    name: "Emily R.",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    testimonial:
      "As an artist, Scribbly has become my go-to app for combining my sketches and thoughts in one place. The ability to add multimedia elements to my entries adds a whole new dimension to my journaling. Scribbly has become an essential tool in my creative process.",
  },
  {
    id: 4,
    name: "Mark T.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    testimonial:
      "I'm not usually one to write in a journal, but Scribbly has made it incredibly easy and fun. The variety of beautiful templates and fonts make each entry visually appealing, and the tagging system helps me organize my thoughts effortlessly. It's a fantastic app for both beginners and seasoned journalers!",
  },
  {
    id: 5,
    name: "Lisa K.",
    avatar:
      "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
    testimonial:
      "Scribbly has revolutionized the way I reflect on my daily life. The app's insightful analytics and mood tracking feature provide valuable insights into my emotions and patterns over time. I'm grateful to Scribbly for helping me gain a deeper understanding of myself.",
  },
  {
    id: 6,
    name: "Alex S.",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    testimonial:
      "I've always struggled with consistency when it comes to journaling, but Scribbly's daily reminders and motivational quotes have kept me engaged. The app's seamless integration with other productivity tools makes it a perfect companion for anyone looking to improve their mental well-being.",
  },
]

interface TestimonialsProps {
  className?: string
}

const Testimonials: FC<TestimonialsProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {testimonialData.map((testimonial) => (
        <Card>
          <CardContent className="py-6">
            <p className="leading-relaxed text-slate-600">
              {testimonial.testimonial}
            </p>
          </CardContent>
          <CardFooter className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  className="object-cover"
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
      ))}
    </div>
  )
}

export default Testimonials
