import FeatureShowcase from "@/components/FeatureShowcase";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-mystic-mint bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <span className="font-heading text-xl font-bold text-nocturnal-expedition">
            Logo
          </span>
          <div className="flex gap-6">
            <a href="#hero" className="text-sm font-medium text-oceanic-noir/70 transition-colors hover:text-nocturnal-expedition">
              Home
            </a>
            <a href="#features" className="text-sm font-medium text-oceanic-noir/70 transition-colors hover:text-nocturnal-expedition">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-oceanic-noir/70 transition-colors hover:text-nocturnal-expedition">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-oceanic-noir/70 transition-colors hover:text-nocturnal-expedition">
              FAQ
            </a>
          </div>
        </nav>
      </header>

      <HeroSection />

      <SocialProof />

      <FeatureShowcase />

      <PricingSection />

      <section
        id="faq"
        className="bg-arctic-powder px-4 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl font-semibold text-nocturnal-expedition">
            FAQ
          </h2>
          {/* FAQ placeholder */}
        </div>
      </section>

      <footer className="border-t border-mystic-mint bg-oceanic-noir px-4 py-12 text-center text-sm text-arctic-powder/70">
        <p>&copy; {new Date().getFullYear()} Frontend App. All rights reserved.</p>
      </footer>
    </main>
  );
}
