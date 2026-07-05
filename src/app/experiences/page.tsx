'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '@/components/layout/Footer';
import { useReserve } from '@/store/ReserveContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const themes = [
  {
    id: 'wellness',
    name: 'Spa & Wellness',
    image: '/media/images/Resort_at_dusk_reflecting_lake_202607041810.jpeg',
    experiences: [
      { id: 'exp-1', name: 'Signature Sound Bath', duration: '90 Min', price: 12000 },
      { id: 'exp-2', name: 'Ayurvedic Journey', duration: '120 Min', price: 18000 },
    ]
  },
  {
    id: 'dining',
    name: 'Dining',
    image: '/media/images/Luxury_bedroom_with_four-poster_bed_202607041825.jpeg', // Fallback image
    experiences: [
      { id: 'exp-3', name: 'Private Lakeside Dinner', duration: 'Evening', price: 25000 },
      { id: 'exp-4', name: 'Bespoke Chef Tasting', duration: '3 Hours', price: null }, // Bespoke -> Enquire
    ]
  },
  {
    id: 'water',
    name: 'On the Water',
    image: '/media/images/Figure_looking_at_lake_sunset_202607041812.jpeg',
    experiences: [
      { id: 'exp-5', name: 'Sunset Boat Cruise', duration: '60 Min', price: 8000 },
    ]
  }
];

export default function ExperiencesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem, selectedItems } = useReserve();
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray<HTMLElement>('.theme-section');

    sections.forEach((section) => {
      const cards = Array.from(section.querySelectorAll('.exp-card'));
      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${100 * cards.length}%`,
          pin: true,
          scrub: 0.5,
        }
      });

      cards.forEach((card, i) => {
        if (i > 0) {
          // Fade out previous
          tl.to(cards[i - 1], { opacity: 0, y: -50, duration: 1 }, `+=${i}`);
        }
        // Fade in current
        tl.fromTo(card, 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration: 1 }, 
          i > 0 ? `<` : undefined
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleAction = (exp: any) => {
    if (exp.price) {
      addItem({ id: exp.id, name: exp.name, price: exp.price, type: 'experience' });
      router.push('/reserve');
    } else {
      router.push('/contact');
    }
  };

  return (
    <main className="bg-ink min-h-screen">
      <div className="pt-32 pb-16 px-4 md:px-12 max-w-7xl mx-auto text-center">
        <h1 className="font-serif text-5xl md:text-8xl text-ivory mb-6">
          Experiences
        </h1>
        <p className="font-sans text-ivory/70 max-w-2xl mx-auto text-lg leading-relaxed mb-16">
          Curated moments designed to deepen your connection to the lake, the culture, and yourself.
        </p>
      </div>

      <div ref={containerRef}>
        {themes.map((theme) => (
          <section key={theme.id} className="theme-section relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={theme.image} 
                alt={theme.name} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ink/60"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between h-[60vh]">
              <div className="w-full md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
                <h2 className="font-serif text-5xl md:text-7xl text-ivory">{theme.name}</h2>
              </div>

              <div className="w-full md:w-1/2 relative h-[300px]">
                {theme.experiences.map((exp, i) => (
                  <div 
                    key={exp.id}
                    className="exp-card absolute inset-0 flex flex-col justify-center p-8 md:p-12 bg-glass-dark border border-gold/30 backdrop-blur-[20px] rounded-sm"
                    style={{ opacity: i === 0 ? 1 : 0 }} // Intial CSS state before GSAP
                  >
                    <h3 className="font-serif text-3xl md:text-4xl text-ivory mb-4">{exp.name}</h3>
                    <div className="flex justify-between border-b border-gold/20 pb-4 mb-8">
                      <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60">{exp.duration}</span>
                      <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory">
                        {exp.price ? `₹${exp.price.toLocaleString('en-IN')}` : 'Enquire'}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleAction(exp)}
                      className="w-full py-4 bg-transparent border border-gold text-ivory font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-gold hover:text-ink transition-colors"
                    >
                      {exp.price ? (selectedItems.some(i => i.id === exp.id) ? 'Added - View Reservation' : 'Add to Reservation') : 'Enquire'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </main>
  );
}
