'use client';

import Header from '@/components/Header';
import SoundToggle from '@/components/SoundToggle';
import SmoothScroll from '@/components/SmoothScroll';
import HeroCanvas from '@/components/HeroCanvas';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <SoundToggle />

      <main id="smooth-content">
        {/* Core Hero Scroll-Scrubbed Hat Throw */}
        <HeroCanvas />

        {/* 01 // Manifesto */}
        <About />

        {/* 02 // Capabilities & Craft */}
        <Services />

        {/* 03 // Selected Archive & Modal */}
        <Portfolio />

        {/* 04 // Critical Acclaim */}
        <Testimonials />

        {/* 05 // Commission Dialogue */}
        <Contact />

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
