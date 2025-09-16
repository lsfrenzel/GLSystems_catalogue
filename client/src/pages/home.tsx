import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SystemsShowcase from "@/components/SystemsShowcase";
import Benefits from "@/components/Benefits";
import VideoSection from "@/components/VideoSection";
import Comparison from "@/components/Comparison";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";

export default function Home() {
  useEffect(() => {
    // Get all fade-in elements
    const els = Array.from(document.querySelectorAll('.fade-in')) as HTMLElement[];
    
    // If IntersectionObserver is not available, show all elements
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    els.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SystemsShowcase />
        
        {/* Custom Systems Message */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6">
            <CustomSystemsMessage variant="banner" className="mx-auto" />
          </div>
        </section>
        
        <Benefits />
        <VideoSection />
        <Comparison />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
