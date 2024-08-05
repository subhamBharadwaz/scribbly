import { FC } from "react"

import { cn } from "@/lib/utils"
import FadeIn from "@/components/fade-in"
import Marquee from "@/components/marquee"
import TweetCard from "@/components/tweet-card"

const tweets = [
  "https://x.com/zsumair/status/1687064952702652416",
  "https://x.com/sanjay_4O4/status/1688527071616884736",
  "https://x.com/codewithmarcin/status/1687341476647403520",
  "https://x.com/CodeHagen/status/1687211559553224706",
  "https://x.com/pratikk_tiwari/status/1687471534934220801",
  "https://x.com/hemantwasthere/status/1687162068448018432",
  "https://x.com/johnkat_Mj/status/1687216212193824769",
  "https://x.com/xrehpicx/status/1687325756660301824",
  "https://x.com/arrogantcoder/status/1687080522617438208",
  "https://x.com/j14wei/status/1687087602573492224",
  "https://x.com/jotagep_dev/status/1687063370585841665",
].map((t) => t.split("/").slice(-1)[0])

interface TestimonialsProps {
  className?: string
}

const Testimonials: FC<TestimonialsProps> = ({ className }) => {
  const firstRow = tweets.slice(0, tweets.length / 2)
  const secondRow = tweets.slice(tweets.length / 2)

  return (
    <div className={cn("relative flex flex-col", className)}>
      <Marquee className="max-w-screen [--duration:120s]" pauseOnHover>
        {firstRow.map((id, idx) => (
          <FadeIn delay={0.06 + idx * 0.04} key={idx}>
            <TweetCard id={id} className="max-h-48 w-72 min-w-72" />
          </FadeIn>
        ))}
      </Marquee>
      <Marquee className="max-w-screen [--duration:120s]" reverse pauseOnHover>
        {secondRow.map((id, idx) => (
          <FadeIn delay={0.06 + 0.04 * (secondRow.length - idx)} key={idx}>
            <TweetCard id={id} className="max-h-48 w-72 min-w-72" />
          </FadeIn>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  )
}

export default Testimonials
