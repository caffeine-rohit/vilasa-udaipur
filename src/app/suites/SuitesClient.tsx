'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useReserve } from '@/store/ReserveContext';

type SuiteData = {
  id: string;
  name: string;
  category: 'Palace Suites' | 'Lake Villas';
  price: number;
  image: string;
  gallery: string[];
  size: string;
  occupancy: string;
  bed: string;
  amenities: string[];
};

const suites: SuiteData[] = [
  {
    id: 'haveli-suite',
    name: 'Haveli Suite',
    category: 'Palace Suites',
    price: 35000,
    image: '/media/images/suites-page/haveli_suite_bedroom.jpeg',
    gallery: [
      '/media/images/suites-page/haveli_suite_bedroom.jpeg',
      '/media/images/suites-page/haveli_suite_bathroom.jpeg'
    ],
    size: '65 sq m / 700 sq ft',
    occupancy: '2 Adults',
    bed: '1 King Bed',
    amenities: ['Lake View', 'Freestanding Bathtub', 'Private Balcony', 'Butler Service']
  },
  {
    id: 'royal-terrace-suite',
    name: 'Royal Terrace Suite',
    category: 'Palace Suites',
    price: 60000,
    image: '/media/images/suites-page/royal_terrace_suite.jpeg',
    gallery: [
      '/media/images/suites-page/royal_terrace_suite.jpeg',
    ],
    size: '90 sq m / 968 sq ft',
    occupancy: '2 Adults',
    bed: '1 King Bed',
    amenities: ['Private Rooftop Terrace', 'Outdoor Daybed', 'Lake View', 'Butler Service']
  },
  {
    id: 'lake-view-palace-suite',
    name: 'Lake View Palace Suite',
    category: 'Palace Suites',
    price: 45000,
    image: '/media/images/suites-page/lake_view_palace_suite.jpeg',
    gallery: [
      '/media/images/suites-page/lake_view_palace_suite.jpeg',
    ],
    size: '75 sq m / 807 sq ft',
    occupancy: '2 Adults',
    bed: '1 King Bed',
    amenities: ['Panoramic Lake View', 'Writing Desk', 'Marble Bath', 'Butler Service']
  },
  {
    id: 'private-lake-villa',
    name: 'Private Lake Villa',
    category: 'Lake Villas',
    price: 120000,
    image: '/media/images/suites-page/private_lake_villa.jpeg',
    gallery: [
      '/media/images/suites-page/private_lake_villa.jpeg',
      '/media/images/suites-page/private_lake_villa_outdoor.jpeg'
    ],
    size: '150 sq m / 1614 sq ft',
    occupancy: '2 Adults, 2 Children',
    bed: '1 King Bed, 2 Twin Beds',
    amenities: ['Private Plunge Pool', 'Lakeside Garden', 'Outdoor Shower', 'Dedicated Villa Host', 'In-Villa Dining']
  },
];

export function SuitesClient() {
  const [filter, setFilter] = useState<'All' | 'Palace Suites' | 'Lake Villas'>('All');
  const [selectedSuite, setSelectedSuite] = useState<SuiteData | null>(null);
  const { addItem, selectedItems } = useReserve();
  const router = useRouter();

  const filteredSuites = suites.filter(s => filter === 'All' || s.category === filter);

  const handleAdd = (suite: SuiteData) => {
    addItem({ id: suite.id, name: suite.name, price: suite.price, type: 'suite' });
    router.push('/reserve');
  };

  return (
    <div className="pb-32 px-4 md:px-12 max-w-7xl mx-auto">
      
      {/* Filters */}
      <div className="flex gap-4 mb-16 overflow-x-auto hide-scrollbar">
        {['All', 'Palace Suites', 'Lake Villas'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-8 py-3 rounded-full font-sans text-[11px] uppercase tracking-[0.18em] border border-gold/30 transition-colors whitespace-nowrap
              ${filter === f ? 'bg-gold text-ink' : 'bg-transparent text-ink hover:border-gold'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {filteredSuites.map((suite) => (
          <motion.div
            layoutId={`suite-${suite.id}`}
            key={suite.id}
            className="cursor-pointer group"
            onClick={() => setSelectedSuite(suite)}
          >
            <motion.div layoutId={`image-${suite.id}`} className="relative aspect-[4/3] overflow-hidden mb-6">
              <Image src={suite.image} alt={suite.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            </motion.div>
            <motion.h3 layoutId={`title-${suite.id}`} className="font-serif text-3xl text-ink mb-2">
              {suite.name}
            </motion.h3>
            <div className="flex justify-between items-end border-b border-gold/30 pb-2 relative">
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/60">from ₹{suite.price.toLocaleString('en-IN')} / night</p>
              <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-vilasa"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedSuite && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col md:flex-row bg-ink/70 backdrop-blur-3xl text-ivory overflow-y-auto md:overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Global Fixed Close Button */}
            <button 
              onClick={() => setSelectedSuite(null)}
              className="fixed top-6 right-6 md:top-12 md:right-12 z-[60] w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-ivory border border-white/20 transition-all hover:scale-110"
            >
              ✕
            </button>

            {/* Left: Gallery - Panoramic Horizontal Scroll */}
            <motion.div layoutId={`image-${selectedSuite.id}`} className="w-full md:w-3/5 h-[50vh] md:h-screen relative flex-none cursor-ew-resize">
              <div className="flex overflow-x-auto h-full snap-x snap-mandatory hide-scrollbar">
                {selectedSuite.gallery.map((img, i) => (
                  <div key={i} className="h-full w-[150vw] md:w-[120vw] flex-none snap-start relative">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Details */}
            <div className="w-full md:w-2/5 p-8 pt-24 md:p-16 md:pt-24 flex flex-col overflow-y-auto pb-32 md:pb-16">
              <motion.h2 layoutId={`title-${selectedSuite.id}`} className="font-serif text-4xl md:text-6xl text-ivory mb-12">
                {selectedSuite.name}
              </motion.h2>

              <div className="space-y-6 mb-16">
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60">Size</span>
                  <span className="font-serif text-lg text-ivory">{selectedSuite.size}</span>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60">Occupancy</span>
                  <span className="font-serif text-lg text-ivory">{selectedSuite.occupancy}</span>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60">Bed</span>
                  <span className="font-serif text-lg text-ivory">{selectedSuite.bed}</span>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60">Price</span>
                  <span className="font-serif text-lg text-ivory">₹{selectedSuite.price.toLocaleString('en-IN')} / night</span>
                </div>
              </div>

              <div className="mb-16">
                <h4 className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60 mb-6">Amenities</h4>
                <ul className="space-y-4">
                  {selectedSuite.amenities.map(a => (
                    <li key={a} className="font-serif text-lg text-ivory border-b border-ivory/5 pb-2">{a}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleAdd(selectedSuite)}
                className="mt-auto w-full py-4 bg-ivory text-ink font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-gold hover:text-ivory transition-colors"
              >
                {selectedItems.some(i => i.id === selectedSuite.id) ? 'Added - View Reservation' : 'Add to Reservation'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
