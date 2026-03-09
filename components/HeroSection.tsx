'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../src/lib/clients/firebase";

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      if (!db) {
        throw new Error("Firebase not initialized.");
      }
      
      const signupData = {
        email,
        timestamp: new Date().toISOString(),
        source: "hero_pre_enrollment"
      };
      
      // Save to course_pre_enrollments collection
      await setDoc(doc(db, "course_pre_enrollments", email), signupData);
      
      alert(`Thank you! We'll notify you at ${email} when enrollment opens.`);
      setEmail('');
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
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

        {/* Pre-Enrollment Form */}
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onSubmit={handleSubmit}
          className="mt-16 flex flex-col gap-4 md:flex-row md:items-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@gmail.com"
            required
            className="border border-white bg-black/30 px-6 py-4 text-sm text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white transition duration-300 md:w-80"
          />
          <motion.button 
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            className={`border border-white bg-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-black transition duration-300 backdrop-blur-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/90'}`}
          >
            {isLoading ? "Submitting..." : "Pre-Enroll Now"}
          </motion.button>
        </motion.form>

      </div>
    </section>
  );
}

