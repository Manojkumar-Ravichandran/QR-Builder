import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import FeaturesSection from '@/components/ui/landingpage/FeaturesSection'
import HeroSection from '@/components/ui/landingpage/HeroSection'
import PricingSection from '@/components/ui/landingpage/PricingSection'
import { BarChart3, Check, Shield, Zap } from 'lucide-react'

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection
        badgeText="New: AI-Generated Art QR Codes"
        title="Create"
        highlight=" Smart QR Codes"
        subtitle="Trackable, customizable, and forever scalable."
        primaryCta={{
          label: "Start Generating Free",
          href: "/login",
        }}
        secondaryCta={{
          label: "View Demo",
          href: "/demo",
        }}
        imageSrc="https://picsum.photos/1200/600"
        imageAlt="Dashboard Preview"
      />

      <FeaturesSection
        heading="Everything you need to scale"
        subheading="Powerful features built for modern marketing teams."
        features={[
          {
            icon: BarChart3,
            title: "Advanced Analytics",
            description: "Track scans by location, device, and time in real-time.",
          },
          {
            icon: Zap,
            title: "Dynamic QR Codes",
            description: "Update destination URLs anytime without reprinting.",
          },
          {
            icon: Shield,
            title: "Enterprise Security",
            description: "SSO, custom domains, and GDPR compliance built-in.",
          },
        ]}
      />

      {/* <PricingSection
        heading="Simple, transparent pricing"
        plans={[
          {
            name: "Starter",
            price: "$0",
            features: [
              "5 Static QR Codes",
              "Basic Analytics",
              "Standard Support",
            ],
          },
          {
            name: "Pro",
            price: "$29",
            features: [
              "50 Dynamic QR Codes",
              "Advanced Analytics",
              "Custom Branding",
              "Bulk Creation",
            ],
            popular: true,
          },
          {
            name: "Business",
            price: "$99",
            features: [
              "Unlimited QR Codes",
              "API Access",
              "Team Members",
              "Dedicated Support",
            ],
          },
        ]}
      /> */}
      <Footer />
    </div>
  )
}

export default page