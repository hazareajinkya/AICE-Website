'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/clients/firebase';
import { toast } from 'sonner';
import { collectUserData } from '@/lib/utils/user-data';

export default function StickyPreEnrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pageLoadTime] = useState(new Date().toISOString());

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the hero section button
      // The hero section is full height, so we check if scrolled past viewport height
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      // Show button once we've scrolled past the hero section
      setIsVisible(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track time on page
  useEffect(() => {
    if (isSubmitted) {
      const timeOnPage = Math.round(
        (new Date().getTime() - new Date(pageLoadTime).getTime()) / 1000
      );
      // Store time on page in sessionStorage for later use
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

      // Collect comprehensive user data (including location)
      const userData = await collectUserData(email, "sticky_button");
      
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
      const cleanData = JSON.parse(JSON.stringify(finalUserData));

      // Save to Firestore (using email as document ID)
      await setDoc(doc(db, "course_preenrollment", email), cleanData);
      
      setIsSubmitted(true);
      toast.success("Thank you! We'll notify you when enrollment opens.");
      setEmail('');
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
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-black border-t border-white/10 px-6 py-4 md:px-12 md:py-5">
        <div className="max-w-7xl mx-auto">
          <motion.form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@gmail.com"
              required
              className="border border-white bg-black/30 px-6 py-3 md:py-4 text-sm text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white transition duration-300 md:w-80"
            />
            <motion.button 
              type="submit"
              disabled={isLoading || isSubmitted}
              whileHover={!isLoading && !isSubmitted ? { scale: 1.05 } : {}}
              whileTap={!isLoading && !isSubmitted ? { scale: 0.95 } : {}}
              className="border border-white bg-white px-8 md:px-10 py-3 md:py-4 text-sm font-bold uppercase tracking-widest text-black hover:bg-white/90 transition duration-300 backdrop-blur-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 inline-block mr-2"
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
                  Submitting...
                </>
              ) : isSubmitted ? (
                "Thank You!"
              ) : (
                "Pre-Enroll Now"
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

