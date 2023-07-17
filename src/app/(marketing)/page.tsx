import FeaturesSection from "@/components/marketing/features/featuresSection"
import HeroSection from "@/components/marketing/hero/heroSection"
import OpenSourceSection from "@/components/marketing/openSource/openSourceSection"
import PricingSection from "@/components/marketing/pricing/pricingSection"
import TestimonialsSection from "@/components/marketing/testimonials/testimonialsSection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <OpenSourceSection />
    </>
  )
}
