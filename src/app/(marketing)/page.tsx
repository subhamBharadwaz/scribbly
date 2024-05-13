import FeaturesSection from "./_components/features/featuresSection"
import HeroSection from "./_components/hero/heroSection"
import OpenSourceSection from "./_components/openSource/openSourceSection"
import PricingSection from "./_components/pricing/pricingSection"
import TestimonialsSection from "./_components/testimonials/testimonialsSection"

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
