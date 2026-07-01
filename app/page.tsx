import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Features from '@/components/Features';
import LiveDemo from '@/components/LiveDemo';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import EarlyAccess from '@/components/EarlyAccess';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <Features />
        <LiveDemo />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <EarlyAccess />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
