"use client"

import { FC } from "react"
import { useLottie } from "lottie-react"

import { cn } from "@/lib/utils"

import girlWritingAnim from "../../public/lottie/GIRL STUDYING ON LAPTOP.json"

interface LottieAnimProps {
  className?: string
}

const LottieAnim: FC<LottieAnimProps> = ({ className }) => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: girlWritingAnim,
  }

  const { View } = useLottie(options)
  return <div className={cn("max-w-2xl lg:w-[40rem]", className)}>{View}</div>
}

export default LottieAnim
