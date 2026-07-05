'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';

const articles = [
  {
    id: 1,
    title: 'The silence of the reflection pool',
    image: '/media/hero-stills/Courtyard_with_reflection_pool_2K_202607050009.jpeg',
    aspect: 'aspect-video',
    excerpt: 'Water is the oldest architect. In our central courtyards, the geometric reflection pools serve not merely as ornamentation, but as a mirror to the Rajasthani sky. The stillness of the water creates a profound cooling microclimate, a centuries-old passive architectural technique that brings silence to the soul.'
  },
  {
    id: 2,
    title: 'The ritual of the brass bath',
    image: '/media/images/suites-page/haveli_suite_bathroom.jpeg',
    aspect: 'aspect-[3/4]',
    excerpt: 'Bathing was considered a sacred art by the royals of Rajasthan. Inspired by this heritage, our open-plan marble sanctuaries feature deep, freestanding brass bathtubs hammered by local artisans. Scented with wild rose petals and sandalwood oil, it is a space designed for complete surrender and restoration.'
  },
  {
    id: 3,
    title: 'The lighting of the lanterns',
    image: '/media/hero-stills/Sunset_illuminating_palace_lanterns_2K_202607050013.jpeg',
    aspect: 'aspect-square',
    excerpt: 'As the sun dips below the Aravalli hills, the palace undergoes its daily transformation. Hundreds of brass lanterns are lit by hand, their warm, flickering glow casting long shadows across the sandstone corridors. This transition from day to night is a celebrated ritual, honoring the spirits of the lake.'
  },
  {
    id: 4,
    title: 'A journey across silent waters',
    image: '/media/hero-stills/Royal_boat_gliding_across_lake_202607050014.jpeg',
    aspect: 'aspect-[4/5]',
    excerpt: 'To arrive at Vilasa is to leave the world behind. The journey begins on a traditional wooden shikara, gliding silently across the vast expanse of Lake Pichola. The water, calm as glass, reflects the bruised purple and liquid gold of the sky. It is in this suspended moment that one finally remembers how to breathe.'
  }
];

export default function JournalPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % articles.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + articles.length) % articles.length);
    }
  };

  return (
    <main className="bg-ivory min-h-screen text-ink">
      <div className="pt-32 pb-16 px-4 md:px-12 max-w-7xl mx-auto">
        <h1 className="font-serif text-5xl md:text-8xl text-ink mb-6">
          Journal
        </h1>
        <p className="font-sans text-ink/70 max-w-2xl text-lg leading-relaxed mb-16">
          Reflections on lake ecology, Rajasthani craft, and the restoration process.
        </p>
      </div>

      {/* Masonry Layout */}
      <div className="px-4 md:px-12 pb-32 max-w-7xl mx-auto">
        {/* On mobile: horizontal drag. On desktop: columns */}
        <div className="flex md:block overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none hide-scrollbar md:columns-2 gap-8 lg:gap-12">
          {articles.map((article, i) => (
            <div 
              key={article.id} 
              className="flex-none w-[85vw] md:w-auto snap-center mb-8 md:break-inside-avoid cursor-pointer group"
              onClick={() => setLightboxIndex(i)}
            >
              <div className={`relative w-full ${article.aspect} overflow-hidden mb-6 bg-dusk/10`}>
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 sepia-[0.1]"
                />
              </div>
              <h3 className="font-serif text-2xl text-ink mb-4">{article.title}</h3>
              <p className="font-sans text-ink/70 leading-relaxed text-sm">
                {article.excerpt}
              </p>
              <div className="mt-6 flex justify-between items-center border-t border-gold/30 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">View Gallery</span>
                <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/40">{(i + 1).toString().padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-glass-dark bg-ink/90 backdrop-blur-[20px] flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div className="absolute top-6 left-6 right-6 md:top-12 md:left-12 md:right-12 z-50 flex justify-between items-center pointer-events-none">
              <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory">
                {(lightboxIndex + 1).toString().padStart(2, '0')} / {articles.length.toString().padStart(2, '0')}
              </span>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-ivory border border-white/20 transition-all hover:scale-110"
              >
                ✕
              </button>
            </div>

            {/* Navigation Areas */}
            <div className="absolute inset-y-0 left-0 w-1/4 cursor-w-resize z-40" onClick={handlePrev} />
            <div className="absolute inset-y-0 right-0 w-1/4 cursor-e-resize z-40" onClick={handleNext} />

            {/* Image Container */}
            <motion.div 
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[90vw] h-[80vh] md:w-[70vw] md:h-[80vh]"
            >
              <Image 
                src={articles[lightboxIndex].image}
                alt={articles[lightboxIndex].title}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
