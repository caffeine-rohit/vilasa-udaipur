'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

const IMAGES = [
  '/media/hero-stills/Resort_at_dusk_reflecting_lake_202607041810.jpeg',
  '/media/hero-stills/Resort_entrance_courtyard_sandst._2K_202607050003.jpeg',
  '/media/hero-stills/Hand-carved_pillars_with_mirror-._2K_202607050004.jpeg',
  '/media/hero-stills/Royal_palace_lobby_vaulted_ceilings_202607050005.jpeg',
  '/media/hero-stills/Suite_overlooking_tranquil_lake_2K_202607050006.jpeg',
  '/media/hero-stills/Silver_tray_with_chai_cups_202607050007 (1).jpeg',
  '/media/hero-stills/Spa_sanctuary_candlelight_rose_p._202607050009.jpeg',
  '/media/hero-stills/Courtyard_with_reflection_pool_2K_202607050009.jpeg',
  '/media/hero-stills/Infinity_pool_blending_into_lake_202607050010.jpeg',
  '/media/hero-stills/Crystal_cocktail_glass_pool_edge_202607050010.jpeg',
  '/media/hero-stills/Dining_terrace_overlooking_lake_2K_202607050012.jpeg',
  '/media/hero-stills/Indian_fine_dining_plated_silver._202607050013.jpeg',
  '/media/hero-stills/Sunset_illuminating_palace_lanterns_2K_202607050013.jpeg',
  '/media/hero-stills/Royal_boat_gliding_across_lake_202607050014.jpeg',
  '/media/hero-stills/Palace_resort_under_starry_sky_202607050014.jpeg',
];

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    // Split text for intro animation
    const text = new SplitType(titleRef.current, { types: 'lines' });

    // Initial text intro animation (unaffected by scroll initially)
    gsap.fromTo(
      text.lines,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2.5,
        stagger: 0.15,
        ease: 'expo.out',
        delay: 0.8,
      }
    );

    // Create the main scroll timeline
    // Much shorter scroll distance for a faster, less boring sequence
    const scrollDuration = 500; // 500% viewport height for all 15 images

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollDuration}%`,
        scrub: 1.5, // slightly more smoothing for the faster scroll
        pin: true,
      }
    });

    // We distribute the crossfades evenly across the timeline
    // Each image has a "duration" in the timeline. Since there are IMAGES.length - 1 transitions,
    // we give each transition a fixed duration unit.
    const staggerTime = 1; 

    // Animate through the images
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      
      // Alternate animation styles to make it dynamic and NOT boring
      // 0 = zoom out, 1 = pan left, 2 = zoom in, 3 = pan right
      const animType = i % 4;
      
      let startState = {};
      let endState = {};
      
      switch (animType) {
        case 0: // Zoom out
          startState = { scale: 1.15, x: 0, y: 0 };
          endState = { scale: 1, ease: 'none' };
          break;
        case 1: // Pan Left
          startState = { scale: 1.1, x: '2%', y: 0 };
          endState = { x: '-2%', ease: 'none' };
          break;
        case 2: // Zoom in
          startState = { scale: 1, x: 0, y: 0 };
          endState = { scale: 1.15, ease: 'none' };
          break;
        case 3: // Pan Right
          startState = { scale: 1.1, x: '-2%', y: 0 };
          endState = { x: '2%', ease: 'none' };
          break;
      }

      if (i === 0) {
        // First image is already visible
        gsap.set(img, startState);
        tl.to(img, { ...endState, duration: staggerTime * 2 }, 0);
      } else {
        // Subsequent images
        const startTime = (i - 0.7) * staggerTime; // overlap by 0.7 to create smooth crossfades
        const fadeDuration = staggerTime * 0.8;
        
        // Ensure starting state (invisible + scaled/translated)
        gsap.set(img, { opacity: 0, ...startState });
        
        // Fade in
        tl.to(img, {
          opacity: 1,
          ease: 'power2.inOut',
          duration: fadeDuration,
        }, startTime);

        // Move/Scale (runs slightly longer than the fade)
        tl.to(img, {
          ...endState,
          duration: fadeDuration * 2.5,
        }, startTime);
      }
    });

    // Optionally fade out the text and chevron near the end of the scroll
    tl.to([overlayRef.current, '.scroll-chevron'], {
      opacity: 0,
      ease: 'power2.inOut',
      duration: staggerTime,
    }, (IMAGES.length - 2) * staggerTime); 

    return () => {
      if (text) text.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-ink overflow-hidden">
      
      {/* Image Sequence Layer */}
      {IMAGES.map((src, idx) => (
        <img
          key={idx}
          ref={(el) => {
            imagesRef.current[idx] = el;
          }}
          src={src}
          alt={`Vilasa Udaipur Scene ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover will-change-transform will-change-opacity"
          style={{ opacity: idx === 0 ? 1 : 0, zIndex: idx }}
          loading={idx === 0 ? 'eager' : 'lazy'} // Eager load the first one
        />
      ))}

      {/* Overlay content */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-gradient-to-t from-ink/40 via-ink/20 to-ink/10"
        style={{ zIndex: IMAGES.length + 10 }}
      >
        <div className="text-center mt-32">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold mb-8 opacity-100 font-medium drop-shadow-md">
            VILASA · UDAIPUR
          </p>
          <h1
            ref={titleRef}
            className="font-serif text-5xl md:text-7xl lg:text-[110px] leading-[1.1] text-ivory max-w-5xl mx-auto px-4 drop-shadow-xl"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            Where the Lake Remembers Kings.
          </h1>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="scroll-chevron absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70" style={{ zIndex: IMAGES.length + 10 }}>
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-ivory">Scroll</span>
        <div className="w-[1px] h-16 bg-gold/30 overflow-hidden relative">
          <div className="w-full h-full bg-gold absolute top-0 animate-[scroll-down_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

    </div>
  );
}
