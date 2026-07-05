'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { RevealImage } from '@/components/ui/RevealImage';

export default function PalacePage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !scrollContainerRef.current) return;

    const sections = gsap.utils.toArray('.timeline-marker');
    
    // Calculate total width to scroll
    // Using a simpler horizontal scroll technique: animate x percentage
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: timelineRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollContainerRef.current!.offsetWidth
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="bg-ivory min-h-screen text-ink">
      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/media/images/Resort_at_dusk_reflecting_lake_202607041810.jpeg" 
            alt="The Palace Heritage" 
            fill 
            className="object-cover sepia-[0.3]"
          />
          <div className="absolute inset-0 bg-ink/50"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-5xl md:text-8xl text-ivory mb-6">
            Three Centuries.<br />One Silence.
          </h1>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="h-screen w-full bg-ink text-ivory overflow-hidden flex items-center">
        <div ref={scrollContainerRef} className="flex h-[70vh] items-center px-12 md:px-32 w-[400vw] md:w-[250vw]">
          
          <div className="timeline-marker flex-none w-[80vw] md:w-[50vw] px-8 border-l border-gold/30 h-full flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-6xl text-gold mb-8">1749</h2>
            <p className="font-sans text-ivory/80 text-lg leading-relaxed mb-12 max-w-md">
              A private summer retreat commissioned by the royal family, intended not for statecraft, but for solitude. The original haveli was constructed with sandstone carried across the lake.
            </p>
            <div className="relative aspect-video w-full max-w-md jharokha-mask overflow-hidden border border-gold/20">
              <RevealImage 
                src="/media/images/palace-page/The_Origins.jpeg" 
                alt="1749 Origins" 
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="timeline-marker flex-none w-[80vw] md:w-[50vw] px-8 border-l border-gold/30 h-full flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-6xl text-gold mb-8">1880 — 1950</h2>
            <p className="font-sans text-ivory/80 text-lg leading-relaxed mb-12 max-w-md">
              The forgotten decades. The royal family moved their primary residence, and the lake palace slowly slipped into myth. Only the caretakers remained, keeping the lamps lit at dusk.
            </p>
            <div className="relative aspect-video w-full max-w-md overflow-hidden border border-gold/20">
              <RevealImage 
                src="/media/images/palace-page/The_Forgotten_Decades.jpeg" 
                alt="Forgotten Decades" 
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="timeline-marker flex-none w-[80vw] md:w-[50vw] px-8 border-l border-gold/30 h-full flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-6xl text-gold mb-8">1998</h2>
            <p className="font-sans text-ivory/80 text-lg leading-relaxed mb-12 max-w-md">
              The restoration begins. Master artisans from across Rajasthan were summoned to repair the hand-carved jaali screens and restore the original lime plaster without compromising the architectural soul.
            </p>
            <div className="relative aspect-[4/3] w-full max-w-md jharokha-mask overflow-hidden border border-gold/20">
              <RevealImage 
                src="/media/images/palace-page/The_Restoration.jpeg" 
                alt="The Restoration" 
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="timeline-marker flex-none w-[80vw] md:w-[50vw] px-8 border-l border-gold/30 h-full flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-6xl text-gold mb-8">Present Day</h2>
            <p className="font-sans text-ivory/80 text-lg leading-relaxed mb-12 max-w-md">
              Reborn as Vilasa. A sanctuary that offers a glimpse into a rarefied world, where modern luxury bows respectfully to centuries of heritage.
            </p>
            <div className="relative aspect-video w-full max-w-md">
              <RevealImage 
                src="/media/images/Resort_at_dusk_reflecting_lake_202607041810.jpeg" 
                alt="Present Day" 
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Architecture Detail Grid */}
      <section className="py-32 md:py-56 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-6xl text-ink mb-16 text-center">In the Details</h2>
        
        {/* Irregular Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 auto-rows-[300px]">
          {/* Tile 1: Carved Jaali */}
          <div className="md:col-span-5 md:row-span-2 relative group">
            <div className="w-full h-full relative overflow-hidden bg-dusk/10 border border-gold/20 cursor-none">
               <RevealImage src="/media/images/palace-page/Carved_Jaali.jpeg" alt="Carved jaali lattice" className="w-full h-full transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/60 mt-4">Carved jaali lattice</p>
          </div>
          
          {/* Tile 2: Brass door handle */}
          <div className="md:col-span-4 md:row-span-1 relative group mt-12">
            <div className="w-full h-full relative overflow-hidden jharokha-mask cursor-none">
              <RevealImage 
                src="/media/images/Brass_door_handle_carved_wood_202607041816.jpeg" 
                alt="The Threshold" 
                className="w-full h-full transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/60 mt-4">The Threshold</p>
          </div>

          {/* Tile 3: Courtyard fountain */}
          <div className="md:col-span-7 md:row-span-1 relative group">
            <div className="w-full h-full relative overflow-hidden bg-dusk/5 border border-gold/20 cursor-none">
               <RevealImage src="/media/images/palace-page/Courtyard.jpeg" alt="Courtyard fountain" className="w-full h-full transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/60 mt-4">Courtyard fountain</p>
          </div>

          {/* Tile 4: Fresco corridor */}
          <div className="md:col-span-4 md:col-start-9 md:row-start-2 md:row-span-2 relative group -mt-24">
            <div className="w-full h-full relative overflow-hidden jharokha-mask cursor-none">
               <RevealImage src="/media/images/palace-page/Palace_corridor.jpeg" alt="Hand-painted fresco corridor" className="w-full h-full transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/60 mt-4">Hand-painted fresco corridor</p>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-ink py-48 px-4 text-center border-t border-gold relative">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-3xl md:text-5xl text-ivory leading-tight mb-16 text-balance">
            The lake has kept its silence for three centuries. Now, it waits for you.
          </p>
          <Link href="/suites" className="inline-block border-b border-gold text-gold hover:text-ivory font-sans text-sm tracking-[0.18em] uppercase pb-2 transition-colors duration-500">
            Discover Suites & Villas
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
