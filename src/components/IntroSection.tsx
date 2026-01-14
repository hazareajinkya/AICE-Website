'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroSection() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the hero section (approximately 100vh)
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsSticky(scrollPosition > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Regular section - shown initially */}
      <section className="bg-black min-h-[80vh] md:min-h-[85vh] flex items-center px-6 md:px-12 lg:px-16 py-20 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto w-full"
        >
          {/* THE DISCLAIMER Label */}
          <div className="mb-6 md:mb-8">
            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">
              THE DISCLAIMER
            </span>
          </div>

          {/* Main Paragraph - Left Aligned */}
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-white font-normal text-left mb-10 md:mb-12">
            This isn&apos;t a software tutorial—it is a masterclass in <span className="italic">Executive Direction.</span> Learn to execute your vision, building high-impact AI strategies without writing a single line of code.
          </h2>
          
          {/* Bottom Labels */}
          <div className="flex flex-col gap-0 text-left">
            <span className="text-sm md:text-base font-sans uppercase tracking-wider text-white font-medium py-3 md:py-4 border-b border-gray-600">
              HINDI AUDIO
            </span>
            <span className="text-sm md:text-base font-sans uppercase tracking-wider text-white font-medium py-3 md:py-4 border-b border-gray-600">
              ENGLISH SUBTITLES
            </span>
            <span className="text-sm md:text-base font-sans uppercase tracking-wider text-white font-medium py-3 md:py-4 border-b border-gray-600">
              LIFETIME VALIDITY
            </span>
            <span className="text-sm md:text-base font-sans uppercase tracking-wider text-white font-medium py-3 md:py-4 border-b border-gray-600">
              ALL DEVICE ACCESS
            </span>
            <span className="text-sm md:text-base font-sans uppercase tracking-wider text-white font-medium py-3 md:py-4 border-b border-gray-600">
              30 EPISODES
            </span>
            <span className="text-sm md:text-base font-sans uppercase tracking-wider text-white font-medium py-3 md:py-4 border-b border-gray-600">
              COMMUNITY MEMBERSHIP
            </span>
            <span className="text-sm md:text-base font-sans uppercase tracking-wider text-white font-medium py-3 md:py-4 border-b border-gray-600">
              CERTIFICATE OF COMPLETION
            </span>
          </div>
        </motion.div>
      </section>

      {/* Sticky disclaimer - appears after scrolling past hero */}
      <div
        className={`fixed top-0 left-0 right-0 bg-black z-50 px-6 md:px-12 lg:px-16 py-4 md:py-6 transition-all duration-300 ${
          isSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* THE DISCLAIMER Label */}
            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
              THE DISCLAIMER
            </span>

            {/* Main Paragraph - Condensed */}
            <h2 className="font-serif text-sm md:text-base leading-relaxed text-white font-normal text-left hidden md:block">
              This isn&apos;t a software tutorial—it is a masterclass in <span className="italic">Executive Direction.</span> Learn to execute your vision, building high-impact AI strategies without writing a single line of code.
            </h2>
          </div>
          
          {/* Bottom Labels */}
          <div className="flex items-center gap-4 text-left">
            <span className="text-xs font-sans uppercase tracking-wider text-white font-medium whitespace-nowrap">
              HINDI AUDIO
            </span>
            <span className="text-xs font-sans uppercase tracking-wider text-white font-medium whitespace-nowrap border-l border-gray-600 pl-4">
              ENGLISH SUBTITLES
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

