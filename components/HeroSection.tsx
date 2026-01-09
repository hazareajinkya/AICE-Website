'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      
      {/* 1. BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="h-full w-full object-cover opacity-60"
        >
          <source src="/video/intro.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
      </div>

      {/* 2. NAVBAR (Absolute Position) */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="text-2xl font-heading font-bold tracking-tighter">AICE</div>
        <button className="rounded-full bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-md transition hover:bg-white/20">
          Menu ●
        </button>
      </nav>

      {/* 3. CENTER CONTENT (Responsive) */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        
        {/* Animated Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-heading text-5xl font-bold uppercase tracking-widest text-white md:text-7xl lg:text-8xl leading-none"
        >
          COMMAND THE <br className="md:hidden" />
          <span className="text-white">
            UNSEEN
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 max-w-lg text-sm font-light tracking-[0.2em] text-gray-300 md:text-base"
        >
          A MULTI-AI COURSE FOR BUSINESS LEADERS <span className="text-gray-500 mx-2">BY</span> AICE
        </motion.p>

        {/* Level/Module Indicators (Like the reference) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex gap-8"
        >
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xs transition group-hover:bg-neon-cyan group-hover:border-neon-cyan group-hover:text-black">
              01
            </div>
            <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition">Vision</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xs transition group-hover:bg-neon-cyan group-hover:border-neon-cyan group-hover:text-black">
              02
            </div>
            <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition">Scale</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xs transition group-hover:bg-neon-cyan group-hover:border-neon-cyan group-hover:text-black">
              03
            </div>
            <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition">Legacy</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-16 border border-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition duration-300 backdrop-blur-sm"
        >
          Enroll Now - ₹39,999
        </motion.button>

      </div>
    </section>
  );
}

