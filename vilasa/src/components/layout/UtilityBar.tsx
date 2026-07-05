'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pageNames: Record<string, string> = {
  '/palace': 'THE PALACE',
  '/suites': 'SUITES & VILLAS',
  '/experiences': 'EXPERIENCES',
  '/celebrations': 'CELEBRATIONS',
  '/journal': 'JOURNAL',
  '/reserve': 'RESERVE',
};

export function UtilityBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [currency, setCurrency] = useState('₹');
  const isHomePage = pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      // Show after 10% scroll or arbitrary pixel value (e.g., past hero 100vh)
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY > vh * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === '₹' ? '$' : prev === '$' ? '€' : '₹'));
  };

  const pageName = pageNames[pathname] || '';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-8 py-4 bg-glass-light backdrop-blur-[20px] border-b border-gold/20"
        >
          {/* Monogram */}
          <Link href="/">
            <div className="w-8 h-10 jharokha-mask bg-gold flex items-center justify-center">
              <span className="text-ink font-serif text-lg font-bold">V</span>
            </div>
          </Link>

          {/* Current Page Name */}
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory">
            {pageName}
          </span>

          {/* Right side: Currency & Reserve */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleCurrency}
              className="text-ivory font-sans text-sm w-6 h-6 flex items-center justify-center hover:text-gold transition-colors"
            >
              {currency}
            </button>
            <Link
              href="/reserve"
              className="bg-glass-dark border border-gold text-ivory font-sans text-[11px] uppercase tracking-[0.18em] px-6 py-2 rounded-full hover:bg-gold hover:text-ink transition-colors duration-500"
            >
              Reserve
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
