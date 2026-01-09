import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ModulesGrid from "@/components/ModulesGrid";
import CurriculumSection from "@/components/CurriculumSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-neon-cyan selection:text-black">
      <HeroSection />
      <IntroSection />
      <ModulesGrid />
      <CurriculumSection />
      <Footer />
    </main>
  );
}
