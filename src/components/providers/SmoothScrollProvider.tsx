'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Completely disable smooth scroll on mobile to guarantee raw 60fps native performance
    if (window.innerWidth < 768) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.08, // Buttery smooth continuous interpolation
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly faster wheel for better responsiveness
      syncTouch: false,
    });

    // Synchronize GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    // Disable GSAP's lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
