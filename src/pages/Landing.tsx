import { useEffect } from 'react'
import LandingNav from '@/components/landing/LandingNav'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import PricingSection from '@/components/landing/PricingSection'
import FaqSection from '@/components/landing/FaqSection'
import ContactSection from '@/components/landing/ContactSection'
import LandingFooter from '@/components/landing/LandingFooter'

export default function Landing() {
  useEffect(() => {
    document.title = 'Admin Template — O template admin que acelera seu produto'
  }, [])

  return (
    <div className="tx-lp-page">
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <LandingFooter />
    </div>
  )
}
