'use client'

import { LandingNavbar } from '@/components/landing/landing-navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { StatsBar } from '@/components/landing/stats-bar'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { FeatureDetails } from '@/components/landing/feature-details'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { FaqSection } from '@/components/landing/faq-section'
import { CtaSection } from '@/components/landing/cta-section'
import { LandingFooter } from '@/components/landing/landing-footer'

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
