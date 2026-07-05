'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomeHero } from "@/components/home/HomeHero";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // 3D Parallax effect on bento grid and images
      const elements3D = gsap.utils.toArray<HTMLElement>('.parallax-3d');
      
      elements3D.forEach((el) => {
        gsap.fromTo(el,
          { 
            y: 100, 
            rotationX: 10,
            scale: 0.95,
            opacity: 0.8
          },
          {
            y: 0,
            rotationX: 0,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=10%",
              end: "center center",
              scrub: 1,
            }
          }
        );
      });

      // Subtler parallax for text and floating elements
      const elementsFloat = gsap.utils.toArray<HTMLElement>('.parallax-float');
      
      elementsFloat.forEach((el) => {
        gsap.fromTo(el,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            }
          }
        );
      });

      // Horizontal scroll for Sanctuaries (Desktop Only)
      const sanctuariesSection = document.querySelector('.sanctuaries-section');
      const sanctuariesScroll = document.querySelector('.sanctuaries-scroll');
      if (sanctuariesSection && sanctuariesScroll) {
        // The distance to translate: total width of cards minus the visible width of the right column
        const scrollDistance = sanctuariesScroll.scrollWidth - (window.innerWidth * 0.666) + 100; // 100px padding
        
        gsap.to(sanctuariesScroll, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sanctuariesSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smoothly link to scroll
            // Removed pin: true! Using CSS sticky instead for massive performance boost.
          }
        });
      }
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-ink min-h-screen">
      <HomeHero />
      
      {/* 2. The Arrival - Merged Image & Quote */}
      <section className="py-24 md:py-40 px-4 md:px-12 flex flex-col items-center max-w-7xl mx-auto">
        <div className="parallax-3d w-full relative h-[60vh] md:h-[80vh] jharokha-mask shadow-2xl shadow-gold/5 overflow-hidden flex items-center justify-center group">
          <Image
            src="/media/images/Figure_looking_at_lake_sunset_202607041812.jpeg"
            alt="The Arrival"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Overlay to ensure text legibility */}
          <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/50 transition-colors duration-700"></div>
          
          <div className="parallax-float relative z-10 w-full max-w-5xl text-center px-6 md:px-12">
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-ivory leading-relaxed text-balance drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              “To arrive at Vilasa is to step out of time, across the water, and into a memory kept alive by stone.”
            </p>
          </div>
        </div>
      </section>

      {/* 3. Suites & Villas - Premium Horizontal Scroll */}
      <section className="sanctuaries-section relative h-auto md:h-[250vh]">
        {/* Sticky container that stays on screen while we scroll the 250vh track */}
        <div className="relative md:sticky top-0 h-auto md:h-screen overflow-hidden flex flex-col justify-center bg-ink border-y border-gold/20 py-24 md:py-0">
          {/* Luxurious Golden Blend Background */}
          <div className="absolute inset-0 bg-ink"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gold-deep/20 via-ink to-ink"></div>
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_60%)] opacity-10 blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto w-full">
            {/* Left: Sticky Heading Area (1/3 width) */}
            <div className="md:w-1/3 px-6 md:px-12 md:pl-20 mb-12 md:mb-0 relative z-20 flex flex-col justify-center shrink-0 border-r border-gold/10">
              <div className="pr-8">
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory tracking-tight mb-6 drop-shadow-md">
                  Sanctuaries
                </h2>
                <p className="font-sans text-ivory/80 text-lg mb-8 max-w-sm drop-shadow-sm">
                  Thirty exquisite keys. Each suite a private haven of hand-carved marble, antique silver, and uninterrupted views of the lake.
                </p>
                <Link href="/suites" className="hidden md:inline-flex font-sans text-[11px] uppercase tracking-[0.2em] text-gold border-b border-gold/30 pb-1 hover:border-gold transition-colors w-fit">
                  Explore All Suites
                </Link>
              </div>
            </div>
            
            {/* Right: Horizontal Scrolling Gallery (2/3 width) */}
            {/* The outer bounded container that clips the images so they NEVER overlap the left text column */}
            <div className="md:w-2/3 overflow-hidden relative z-10 flex items-center">
              {/* The inner track that translates horizontally */}
              <div className="sanctuaries-scroll flex gap-8 px-6 md:px-12 pb-12 w-full md:w-max overflow-x-auto snap-x snap-mandatory md:overflow-visible hide-scrollbar">
                {[
              { name: "Lake View Palace Suite", img: "/media/images/suites-page/lake_view_palace_suite.jpeg", price: "45,000" },
              { name: "Haveli Suite", img: "/media/images/suites-page/haveli_suite_bedroom.jpeg", price: "35,000" },
              { name: "Royal Terrace Suite", img: "/media/images/suites-page/royal_terrace_suite.jpeg", price: "60,000" },
              { name: "Private Lake Villa", img: "/media/images/suites-page/private_lake_villa.jpeg", price: "1,20,000" },
            ].map((suite) => (
              <Link href={`/suites#${suite.name.replace(/\s+/g, '-').toLowerCase()}`} key={suite.name} className="flex-none w-[85vw] md:w-[35vw] group snap-center cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden border border-gold/10 bg-glass-dark">
                  <Image 
                    src={suite.img} 
                    alt={suite.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(11,10,8,0.8)] pointer-events-none"></div>
                </div>
                
                {/* Typography details */}
                <div className="flex flex-col border-b border-gold/20 pb-4 relative">
                  <h3 className="font-serif text-3xl text-ivory mb-3 group-hover:text-gold transition-colors duration-500">{suite.name}</h3>
                  <div className="flex justify-between items-baseline">
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/50">from ₹{suite.price} / night</p>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                      Discover →
                    </span>
                  </div>
                  {/* Animated Gold Underline */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-in-out"></div>
                </div>
              </Link>
            ))}
              </div>
            </div>
          </div>
          
          <div className="md:hidden px-6 mt-8">
            <Link href="/suites" className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold border-b border-gold/30 pb-1 hover:border-gold transition-colors">
              Explore All Suites
            </Link>
          </div>
        </div>
      </section>

      {/* 4. The Lake at Dusk Parallax */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 parallax-float bg-ink">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 scale-110"
          >
            <source src="/media/Drone_shoot_video_of_resort_202607050248.mp4" type="video/mp4" />
          </video>
          {/* Subtle overlay to ensure the text remains legible over the drone footage */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10"></div>
        </div>
        <div className="parallax-3d relative z-10 max-w-3xl text-center px-4">
          <p className="font-serif text-3xl md:text-5xl lg:text-7xl text-ivory leading-tight text-balance drop-shadow-2xl">
            Thirty keys. One reserve. A lake that has kept its silence since 1749.
          </p>
        </div>
      </section>

      {/* 5. Signature Experiences - Staggered Editorial Layout */}
      <section className="py-32 md:py-48 bg-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-24 md:mb-40 flex flex-col items-center text-center">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory mb-6 tracking-tight drop-shadow-lg">Signature Experiences</h2>
            <div className="w-px h-16 bg-gold/50 mb-8 parallax-float"></div>
            <Link href="/experiences" className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold border-b border-gold/30 pb-1 hover:border-gold transition-colors">
              Discover All Experiences
            </Link>
          </div>

          <div className="flex flex-col gap-32 md:gap-48">
            {/* Experience 1: Left Aligned */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
              <div className="w-full md:w-3/5 parallax-3d overflow-hidden border border-gold/10 relative bg-glass-dark">
                {/* Natural aspect ratio preservation */}
                <div className="relative aspect-video w-full">
                  <Image 
                    src="/media/hero-stills/Dining_terrace_overlooking_lake_2K_202607050012.jpeg" 
                    alt="Private Dining" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
              </div>
              <div className="w-full md:w-2/5 parallax-float flex flex-col items-start text-left">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-4">01 // Gastronomy</span>
                <h3 className="font-serif text-4xl md:text-5xl text-ivory mb-6">Private Dining</h3>
                <p className="font-sans text-ivory/70 leading-relaxed mb-8">
                  A table for two at the water's edge, lit only by silver lanterns and the moon reflecting off Lake Pichola. A bespoke menu crafted by our master chefs.
                </p>
                <button className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory hover:text-gold transition-colors flex items-center gap-3 group/btn">
                  Explore <span className="w-8 h-px bg-gold/50 group-hover/btn:w-12 transition-all"></span>
                </button>
              </div>
            </div>

            {/* Experience 2: Right Aligned */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 group">
              <div className="w-full md:w-3/5 parallax-3d overflow-hidden border border-gold/10 relative bg-glass-dark">
                <div className="relative aspect-[4/3] w-full">
                  <Image 
                    src="/media/hero-stills/Spa_sanctuary_candlelight.jpeg" 
                    alt="Spa Rituals" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
              </div>
              <div className="w-full md:w-2/5 parallax-float flex flex-col items-start md:items-end text-left md:text-right">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-4">02 // Wellness</span>
                <h3 className="font-serif text-4xl md:text-5xl text-ivory mb-6">Spa Rituals</h3>
                <p className="font-sans text-ivory/70 leading-relaxed mb-8">
                  Surrender to ancient Ayurvedic healing in our candlelit marble sanctuaries. The scent of wild rose and sandalwood restores balance to body and spirit.
                </p>
                <button className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory hover:text-gold transition-colors flex items-center gap-3 group/btn">
                  <span className="w-8 h-px bg-gold/50 group-hover/btn:w-12 transition-all hidden md:block"></span> Explore <span className="w-8 h-px bg-gold/50 group-hover/btn:w-12 transition-all md:hidden"></span>
                </button>
              </div>
            </div>

            {/* Experience 3: Left Aligned */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
              <div className="w-full md:w-3/5 parallax-3d overflow-hidden border border-gold/10 relative bg-glass-dark">
                <div className="relative aspect-video w-full">
                  <Image 
                    src="/media/hero-stills/Royal_boat_gliding_across_lake_202607050014.jpeg" 
                    alt="Sunset Cruise" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
              </div>
              <div className="w-full md:w-2/5 parallax-float flex flex-col items-start text-left">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-4">03 // Discovery</span>
                <h3 className="font-serif text-4xl md:text-5xl text-ivory mb-6">Sunset Cruise</h3>
                <p className="font-sans text-ivory/70 leading-relaxed mb-8">
                  Drift across the silent waters in a traditional wooden shikara as the sun paints the sky in shades of bruised purple and liquid gold.
                </p>
                <button className="font-sans text-[11px] uppercase tracking-[0.2em] text-ivory hover:text-gold transition-colors flex items-center gap-3 group/btn">
                  Explore <span className="w-8 h-px bg-gold/50 group-hover/btn:w-12 transition-all"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Guest Reflections */}
      <section className="py-24 md:py-40 bg-ink border-y border-gold/10 relative overflow-hidden">
        <div className="parallax-float absolute inset-0 bg-[url('/media/images/Brass_door_handle_carved_wood_202607041816.jpeg')] bg-cover bg-center opacity-5 sepia-[0.5]"></div>
        <div className="parallax-3d max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="font-serif text-2xl md:text-4xl text-ivory/80 leading-relaxed italic mb-8 drop-shadow-lg">
            "A stillness so profound you can hear the centuries echoing across the water. We arrived as guests and left feeling entirely transformed."
          </p>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold drop-shadow-md">
            — A Guest, London
          </p>
        </div>
      </section>

      {/* 7. The Story Teaser */}
      <section className="py-24 md:py-40 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 perspective-1000">
        <div className="parallax-3d w-full md:w-1/2 relative aspect-[3/4] p-2 border border-gold/20 bg-glass-dark shadow-2xl">
          <div className="relative w-full h-full jharokha-mask overflow-hidden group">
            <Image 
              src="/media/images/Brass_door_handle_carved_wood_202607041816.jpeg" 
              alt="Archival Architecture" 
              fill 
              className="object-cover sepia-[0.3] group-hover:scale-110 transition-transform duration-1000"
            />
          </div>
        </div>
        <div className="parallax-float w-full md:w-1/2">
          <h2 className="font-serif text-4xl md:text-6xl text-ivory mb-8 drop-shadow-md">The Legacy</h2>
          <p className="font-sans text-ivory/80 leading-relaxed mb-8 text-lg drop-shadow-sm">
            Built as a summer retreat for royalty, the haveli lay forgotten for decades before being painstakingly restored. Every stone, every carved jaali screen, and every fresco tells a story of a bygone era, meticulously preserved for the modern traveler.
          </p>
          <Link href="/palace" className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold hover:text-ivory transition-colors group flex items-center gap-2 w-fit">
            Read the Palace's Story 
            <span className="transform transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
