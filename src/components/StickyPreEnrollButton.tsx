'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StickyPreEnrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log('Pre-enrollment email:', email);
    // You can add API call or other logic here
    alert(`Thank you! We'll notify you at ${email} when enrollment opens.`);
    setEmail('');
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white bg-white px-8 md:px-10 py-3 md:py-4 text-sm font-bold uppercase tracking-widest text-black hover:bg-white/90 transition duration-300 backdrop-blur-sm whitespace-nowrap"
            >
              Pre-Enroll Now
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

