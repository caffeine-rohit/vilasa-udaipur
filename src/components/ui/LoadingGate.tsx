'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function LoadingGate() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('vilasa-entered-v2');
    if (hasSeen) {
      setShow(false);
    } else {
      // Auto dismiss after 3s
      const t = setTimeout(() => {
        handleEnter();
      }, 3000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem('vilasa-entered-v2', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="gate"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleEnter}
        >
          <div className="flex flex-col items-center justify-center text-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-serif text-5xl md:text-7xl text-gold tracking-[0.2em] mb-6 drop-shadow-lg">VILASA</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-ivory/60">Udaipur</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
