'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Magnetic } from '@/components/ui/Magnetic';

const menuItems = [
  { name: 'THE LAKE', path: '/', image: '/media/hero-stills/Resort_at_dusk_reflecting_lake_202607041810.jpeg' },
  { name: 'THE PALACE', path: '/palace', image: '/media/hero-stills/Royal_palace_lobby_vaulted_ceilings_202607050005.jpeg' },
  { name: 'SUITES & VILLAS', path: '/suites', image: '/media/images/suites-page/lake_view_palace_suite.jpeg' },
  { name: 'EXPERIENCES', path: '/experiences', image: '/media/hero-stills/Spa_sanctuary_candlelight_rose_p._202607050009.jpeg' },
  { name: 'CELEBRATIONS', path: '/celebrations', image: '/media/hero-stills/Dining_terrace_overlooking_lake_2K_202607050012.jpeg' },
  { name: 'JOURNAL', path: '/journal', image: '/media/hero-stills/Silver_tray_with_chai_cups_202607050007 (1).jpeg' },
  { name: 'RESERVE', path: '/reserve', image: '/media/hero-stills/Crystal_cocktail_glass_pool_edge_202607050010.jpeg' },
];

export function MenuOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const pathname = usePathname();
  const isLightMode = pathname === '/journal' || pathname === '/suites';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:px-12 md:py-8 pointer-events-none transition-all duration-700 bg-transparent`}
      >
        {/* Left: Monogram */}
        <Link href="/" className="pointer-events-auto flex items-center gap-6 group">
          {/* Custom VILASA Monogram using Jharokha motif */}
          <div className="w-10 h-14 md:w-12 md:h-16 jharokha-mask bg-gold flex items-center justify-center transition-transform duration-700 group-hover:scale-105 shadow-xl shadow-gold/20">
            <span className="text-ink font-serif text-xl md:text-2xl font-bold">V</span>
          </div>
          {/* Subtle branding text that fades in on scroll or hover to make navbar look less empty */}
          <div className={`hidden md:flex flex-col overflow-hidden transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <span className={`font-serif text-lg tracking-wide ${isLightMode ? 'text-ink' : 'text-ivory'}`}>Vilasa</span>
            <span className={`font-sans text-[9px] uppercase tracking-[0.3em] ${isLightMode ? 'text-ink/60' : 'text-gold'}`}>Udaipur</span>
          </div>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-8 pointer-events-auto">

          <Magnetic intensity={0.2}>
            <Link
              href="/reserve"
              className={`hidden md:block border px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-500 cursor-none
                ${isLightMode
                  ? 'border-ink text-ink hover:bg-ink hover:text-ivory'
                  : 'border-gold/50 text-ivory hover:bg-gold hover:text-ink'}`}
            >
              Reserve
            </Link>
          </Magnetic>

          {/* Menu Toggle Glyph */}
          <Magnetic intensity={0.3}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex flex-col justify-center items-center gap-1.5 z-50 transition-transform duration-500 cursor-none"
            >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className={`w-8 h-px block shadow-sm ${isLightMode && !isOpen ? 'bg-ink shadow-ink/20' : 'bg-gold shadow-gold/50'}`}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-8 h-px block shadow-sm ${isLightMode && !isOpen ? 'bg-ink shadow-ink/20' : 'bg-gold shadow-gold/50'}`}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`w-8 h-px block shadow-sm ${isLightMode && !isOpen ? 'bg-ink shadow-ink/20' : 'bg-gold shadow-gold/50'}`}
            />
            </button>
          </Magnetic>
        </div>
      </motion.div>

      {/* Full-screen Glass Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ink/90 backdrop-blur-[30px] flex items-center justify-end pr-12 md:pr-32"
          >
            {/* The background immersive preview image */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-30 mix-blend-screen transition-all duration-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredImage || 'default'}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${hoveredImage || '/media/images/Resort_at_dusk_reflecting_lake_202607041810.jpeg'}')` }}
                />
              </AnimatePresence>
            </div>

            <nav className="flex flex-col items-end gap-6 md:gap-8">
              {menuItems.map((item, i) => (
                <div key={item.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setHoveredImage(item.image)}
                      onMouseLeave={() => setHoveredImage(null)}
                      className="text-4xl md:text-6xl lg:text-7xl font-serif text-ivory hover:text-gold transition-colors duration-500 block text-right hover:-translate-x-4 transform-gpu cursor-none"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Additional info footer in menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute bottom-12 left-12 md:left-24 font-sans text-[10px] uppercase tracking-[0.2em] text-gold/60 space-y-2 hidden md:block"
            >
              <p>Vilasa Palace</p>
              <p>Lake Pichola, Udaipur 313001</p>
              <p>Rajasthan, India</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
