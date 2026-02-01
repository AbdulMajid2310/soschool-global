"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiUser, FiShield, FiBriefcase, FiBookOpen, FiArrowRight, FiArrowUp } from 'react-icons/fi';
import Hero from '@/components/homeSection/heroSection';
import StatsSection from '@/components/homeSection/statsSection';
import SolutionSection from '@/components/homeSection/solutionSection';
import FeaturesSection from '@/components/homeSection/featuresSection';
import Navbar from '@/components/homeSection/navbarHomeSection';
import PricingSection from '@/components/homeSection/pricingSection';
import LMSSection from '@/components/homeSection/LMSSection';
import Footer from '@/components/homeSection/footerSection';
import NewLetterSection from '@/components/homeSection/newsLetterSection';
import { useFullscreen } from '@/hooks/AutoScreen';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useFullscreen();

  useEffect(() => {
    const toggleVisibility = () => {
      // Muncul setelah scroll 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-blue-600 text-white shadow-2xl shadow-blue-500/40 
        transition-all duration-500 transform 
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'}
        hover:bg-black hover:-translate-y-2 active:scale-90`}
      aria-label="Scroll to top"
    >
      <FiArrowUp size={24} strokeWidth={3} />
    </button>
  );
};



// --- MAIN HOME COMPONENT ---
const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar/>
      {/* Container Wrapper */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full  max-w-7xl mx-auto ">

          {/* Hero Section - Fade In & Slide Up */}
          <section className="relative overflow-hidden pt-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Hero />
          </section>

          {/* Stats Section - Staggered look (Simulated by delay) */}
          <section className=" animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
            <StatsSection />
          </section>

          {/* Solutions Section */}
          <section id="solutions" className=" animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
            <SolutionSection />
          </section>

          {/* Features Section */}
          <section id="features" className="animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
            <FeaturesSection />
          </section>

          {/* Princing Section */}
          {/* <section id="" className="animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
            <PricingSection />
          </section> */}

           {/* Princing Section */}
          <section id="" className="animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
            <LMSSection />
          </section>

 <section id="" className="animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
            <NewLetterSection/>
          </section>
        </div>
        <div>
          <Footer/>
        </div>
      </div>

      {/* Floating Action Button */}
      <ScrollToTop />
      
      {/* Custom Styles for SoSchool premium feel */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        /* Custom Scrollbar for Majid */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 20px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Home;

// Note: Pastikan Majid sudah membuat sub-component (Hero, StatsSection, dll) 
// yang menggunakan class v4 seperti "rounded-4xl", "shadow-blue-500/20", dsb.