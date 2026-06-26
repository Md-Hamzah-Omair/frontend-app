import FAQ from "@/components/FAQ";
import FeatureShowcase from "@/components/FeatureShowcase";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <HeroSection />

      <SocialProof />

      <FeatureShowcase />

      <PricingSection />

      <FAQ />

      <Footer />
    </main>
  );
}
