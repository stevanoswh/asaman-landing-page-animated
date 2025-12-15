import { Navbar } from "@/components/layout/navbar";
import { FaqSection } from "./_components/faq";
import { Features } from "./_components/features";
import { FindYourSchoolSection } from "./_components/find-your-school";
import { GlobalImpactSection } from "./_components/global-impact";
import { GlobalSchoolsSection } from "./_components/global-school";
import { HomeHero } from "./_components/home-hero";
import { OperationalIntelligenceSection } from "./_components/operational-inteligence";
import { TrustedSchoolsStrip } from "./_components/trusted-schools";
import { WhyAsamanSection } from "./_components/why-asaman";

export default function Home() {
  return (
    <div>
      <Navbar />

      <section id="top" className="scroll-mt-24">
        <HomeHero />
      </section>

      <section id="why-asaman" className="scroll-mt-24">
        <WhyAsamanSection />
      </section>

      {/* Innovations (contoh aku arahkan ke GlobalImpact) */}
      <section id="innovations" className="scroll-mt-24">
        <GlobalImpactSection />
      </section>

      <section id="features" className="scroll-mt-24">
        <Features />
      </section>

      <section id="find-your-school" className="scroll-mt-24">
        <FindYourSchoolSection />
      </section>

      <section id="operational-intelligence" className="scroll-mt-24">
        <OperationalIntelligenceSection />
      </section>

      <section id="global-schools" className="scroll-mt-24">
        <GlobalSchoolsSection />
      </section>

      <section id="trusted-schools" className="scroll-mt-24">
        <TrustedSchoolsStrip />
      </section>

      {/* Help Guides (contoh aku arahkan ke FAQ) */}
      <section id="help-guides" className="scroll-mt-24">
        <FaqSection />
      </section>
    </div>
  );
}
