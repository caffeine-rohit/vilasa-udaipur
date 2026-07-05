'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function PersistentReserve() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Visible after 10% scroll of viewport height
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY > vh * 0.1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on the reserve page itself
  if (pathname === '/reserve') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Link
            href="/reserve"
            className="block bg-glass-dark border border-gold backdrop-blur-[20px] text-ivory font-sans text-[11px] uppercase tracking-[0.18em] px-8 py-4 rounded-full hover:bg-gold hover:text-ink transition-colors duration-500 shadow-[0_0_20px_rgba(11,10,8,0.5)]"
          >
            Reserve
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
