'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/clients/firebase';
import { toast } from 'sonner';
import { collectUserData } from '@/lib/utils/user-data';
import { Check } from 'lucide-react';

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pageLoadTime] = useState(new Date().toISOString());

  // Track time on page
  useEffect(() => {
    if (isSubmitted) {
      const timeOnPage = Math.round(
        (new Date().getTime() - new Date(pageLoadTime).getTime()) / 1000
      );
      sessionStorage.setItem("timeOnPage", timeOnPage.toString());
    }
  }, [isSubmitted, pageLoadTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Check if Firebase is initialized
      if (!db) {
        throw new Error("Firebase not initialized. Check your .env.local file and restart the server.");
      }

      // Collect comprehensive user data
      const userData = await collectUserData(email, "course_preenrollment");
      
      // Calculate time on page
      const timeOnPage = Math.round(
        (new Date().getTime() - new Date(pageLoadTime).getTime()) / 1000
      );
      
      // Add time on page to user data
      const finalUserData = {
        ...userData,
        session: {
          ...userData.session,
          timeOnPage,
        },
      };

      // Remove undefined values (Firestore doesn't like them)
      // But keep null values and empty objects for location
      const cleanData = JSON.parse(JSON.stringify(finalUserData, (key, value) => {
        // Keep location even if it's an empty object or has some null values
        if (key === 'location' && value && typeof value === 'object') {
          // Remove only completely undefined fields, keep nulls
          const cleaned: any = {};
          Object.keys(value).forEach(k => {
            if (value[k] !== undefined) {
              cleaned[k] = value[k];
            }
          });
          return Object.keys(cleaned).length > 0 ? cleaned : undefined;
        }
        return value === undefined ? undefined : value;
      }));
      
      // Log what we're saving to Firebase
      console.log("Saving to Firebase - course_preenrollment:", {
        email: cleanData.email,
        hasLocation: !!cleanData.location,
        location: cleanData.location,
        source: cleanData.source,
      });

      // Save to Firestore (using email as document ID)
      await setDoc(doc(db, "course_preenrollment", email), cleanData);
      
      setIsSubmitted(true);
      setEmail('');
      toast.success("Successfully pre-enrolled! We'll notify you when enrollment opens.");
    } catch (error) {
      console.error("Error pre-enrolling:", error);
      
      // Show detailed error in console
      const firebaseError = error as { code?: string; message?: string };
      if (firebaseError.code) {
        console.error("Firebase error code:", firebaseError.code);
        console.error("Firebase error message:", firebaseError.message);
      }
      
      // User-friendly error message
      let errorMessage = "Failed to pre-enroll. Please try again.";
      if (firebaseError.code === "permission-denied") {
        errorMessage = "Permission denied. Check Firestore rules.";
      } else if (firebaseError.code === "unavailable") {
        errorMessage = "Service unavailable. Check your internet connection.";
      } else if (firebaseError.message?.includes("Firebase not initialized")) {
        errorMessage = "Firebase not configured. Check .env.local file.";
      }
      
      toast.error(errorMessage);
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
        {!isSubmitted ? (
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
              disabled={isLoading}
              className="border border-white bg-black/30 px-6 py-4 text-sm text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white transition duration-300 md:w-80 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <motion.button 
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
              className="border border-white bg-white px-10 py-4 text-sm font-bold uppercase tracking-widest text-black hover:bg-white/90 transition duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                "Pre-Enroll Now"
              )}
            </motion.button>
          </motion.form>
        ) : (
          /* Success state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-neon-cyan" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">You&apos;re pre-enrolled!</p>
                <p className="text-white/50 text-sm">
                  We&apos;ll notify you when enrollment opens
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}

