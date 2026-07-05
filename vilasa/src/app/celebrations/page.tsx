'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';

const backgrounds = [
  '/media/hero-stills/Courtyard_with_reflection_pool_2K_202607050009.jpeg',
  '/media/hero-stills/Royal_boat_gliding_across_lake_202607050014.jpeg',
  '/media/hero-stills/Sunset_illuminating_palace_lanterns_2K_202607050013.jpeg'
];

const storytellingText = [
  "Udaipur is India's premier wedding destination.",
  "At Vilasa, we do not host weddings.",
  "We curate legacies.",
  "A mandap at dusk. An aisle lit by floating lamps.",
  "The entire reserve, exclusively yours."
];

export default function CelebrationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Qualifier Form State
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;

    const bgs = gsap.utils.toArray<HTMLElement>('.bg-layer');
    const texts = gsap.utils.toArray<HTMLElement>('.story-text');

    // Create a timeline for the entire pinned section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
      }
    });

    // We have 5 text blocks and 3 backgrounds
    // Let's divide the timeline into 5 segments
    
    texts.forEach((text, i) => {
      // Background crossfades
      if (i === 2 && bgs[1]) {
        tl.to(bgs[0], { opacity: 0, duration: 1 }, `label${i}`);
        tl.to(bgs[1], { opacity: 1, duration: 1 }, `label${i}`);
      }
      if (i === 4 && bgs[2]) {
        tl.to(bgs[1], { opacity: 0, duration: 1 }, `label${i}`);
        tl.to(bgs[2], { opacity: 1, duration: 1 }, `label${i}`);
      }

      // Text fading
      tl.to(text, { opacity: 1, y: 0, duration: 0.5 }, `label${i}`);
      tl.to(text, { opacity: 0, y: -20, duration: 0.5 }, `label${i}+=1`);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleComplete = () => {
    setStep(4);
  };

  return (
    <main className="bg-ink min-h-screen text-ivory">
      {/* Storytelling Scroll */}
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          {backgrounds.map((bg, i) => (
            <div 
              key={i} 
              className="bg-layer absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image src={bg} alt="" fill priority={i === 0} className="object-cover sepia-[0.2]" />
              <div className="absolute inset-0 bg-ink/50"></div>
            </div>
          ))}
        </div>

        {/* Text Layers */}
        <div className="relative z-10 text-center px-4 w-full h-full flex items-center justify-center pointer-events-none">
          {storytellingText.map((text, i) => (
            <h2 
              key={i} 
              className="story-text absolute font-serif text-4xl md:text-6xl max-w-3xl leading-relaxed text-balance"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              {text}
            </h2>
          ))}
        </div>
      </section>

      {/* Qualifier Form */}
      <section className="py-24 md:py-40 px-4 max-w-4xl mx-auto min-h-screen flex flex-col justify-center">
        {step < 4 ? (
          <>
            <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Plan Your Celebration</h2>
            <div className="bg-glass-dark border border-gold/20 p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold/10">
                <div className="h-full bg-gold transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold mb-8 text-center">What is the occasion?</h3>
                  {['Wedding', 'Anniversary', 'Milestone Birthday', 'Corporate Retreat'].map(type => (
                    <button 
                      key={type}
                      onClick={() => { setEventType(type); setStep(2); }}
                      className="w-full p-6 text-left border border-gold/30 hover:bg-gold/10 font-serif text-2xl transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold mb-8 text-center">Approximate Guest Count?</h3>
                  {['Intimate (Under 20)', 'Gathering (20 - 50)', 'Grand (50 - 100)', 'Exclusive (Entire Reserve)'].map(count => (
                    <button 
                      key={count}
                      onClick={() => { setGuestCount(count); setStep(3); }}
                      className="w-full p-6 text-left border border-gold/30 hover:bg-gold/10 font-serif text-2xl transition-colors"
                    >
                      {count}
                    </button>
                  ))}
                  <button onClick={() => setStep(1)} className="mt-4 font-sans text-sm text-ivory/60 hover:text-ivory">← Back</button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold mb-8 text-center">Anticipated Month?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map(m => (
                      <button 
                        key={m}
                        onClick={() => { setMonth(m); handleComplete(); }}
                        className="p-6 text-center border border-gold/30 hover:bg-gold/10 font-serif text-xl transition-colors"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} className="mt-4 font-sans text-sm text-ivory/60 hover:text-ivory">← Back</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center bg-glass-dark border border-gold/20 p-16">
            <h2 className="font-serif text-4xl text-gold mb-6">Request Received</h2>
            <p className="font-sans text-lg text-ivory/80 leading-relaxed max-w-md mx-auto">
              Thank you. A Celebrations Specialist will call within 4 hours to discuss your {eventType.toLowerCase()} for {guestCount.toLowerCase()} guests in {month}.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
