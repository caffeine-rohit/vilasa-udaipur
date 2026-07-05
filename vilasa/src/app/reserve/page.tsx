'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useReserve, ReserveItem, DateRange } from '@/store/ReserveContext';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const guestSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Valid phone number required'),
  occasion: z.string().optional(),
});

type GuestFormValues = z.infer<typeof guestSchema>;

const AVAILABLE_SUITES: ReserveItem[] = [
  { id: 'haveli', name: 'Haveli Suite', price: 35000, type: 'suite' },
  { id: 'lake-view', name: 'Lake View Palace Suite', price: 45000, type: 'suite' },
  { id: 'royal-terrace', name: 'Royal Terrace Suite', price: 60000, type: 'suite' },
  { id: 'private-villa', name: 'Private Lake Villa', price: 120000, type: 'suite' },
];

const ENHANCEMENTS: ReserveItem[] = [
  { id: 'airport-transfer', name: 'Private Airport Transfer (Mercedes Maybach)', price: 15000, type: 'addon' },
  { id: 'spa-ritual', name: 'Royal Rajputana Spa Ritual (90 Min)', price: 25000, type: 'experience' },
  { id: 'private-dining', name: 'Private Lakeside Dining Experience', price: 30000, type: 'experience' },
  { id: 'brass-bath', name: 'Rose & Sandalwood Brass Bath Preparation', price: 5000, type: 'addon' },
];

function CustomCalendar({ dateRange, setDateRange }: { dateRange: DateRange, setDateRange: (range: DateRange) => void }) {
  const days = Array.from({length: 31}, (_, i) => i + 1);
  
  const handleSelect = (day: number) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: new Date(2026, 6, day), end: null });
    } else {
      if (day > dateRange.start.getDate()) {
        setDateRange({ start: dateRange.start, end: new Date(2026, 6, day) });
      } else {
        setDateRange({ start: new Date(2026, 6, day), end: null });
      }
    }
  };

  const isSelected = (day: number) => {
    if (dateRange.start?.getDate() === day) return true;
    if (dateRange.end?.getDate() === day) return true;
    if (dateRange.start && dateRange.end && day > dateRange.start.getDate() && day < dateRange.end.getDate()) return true;
    return false;
  };
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 border-b border-gold/20 pb-4">
        <button className="text-gold hover:text-ivory">←</button>
        <span className="font-serif text-xl tracking-wide">July 2026</span>
        <button className="text-gold hover:text-ivory">→</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} className="text-center font-sans text-xs uppercase text-gold mb-2">{d}</div>)}
        <div /><div /><div /> {/* Padding for Wed start */}
        {days.map(d => (
          <button 
            key={d}
            onClick={() => handleSelect(d)}
            className={`h-10 w-full flex items-center justify-center font-sans text-sm transition-colors ${isSelected(d) ? 'bg-gold text-ink' : 'text-ivory hover:border hover:border-gold/50 bg-ivory/5'}`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReservePage() {
  const { selectedItems, addItem, removeItem, dateRange, setDateRange, adults, setAdults, clearReservation } = useReserve();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [reference, setReference] = useState('');

  const { control, trigger, formState: { errors } } = useForm<GuestFormValues>({
    resolver: zodResolver(guestSchema)
  });

  const handleConfirm = () => {
    setReference(`VLS-${Math.floor(100000 + Math.random() * 900000)}`);
    setConfirmed(true);
    clearReservation(); // Empties cart after successful booking
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Compute stay duration if dates exist
  const nights = (dateRange.start && dateRange.end) ? (dateRange.end.getDate() - dateRange.start.getDate()) : 1;

  // Compute totals
  const suiteTotal = selectedItems.filter(i => i.type === 'suite').reduce((acc, curr) => acc + (curr.price * nights), 0);
  const otherTotal = selectedItems.filter(i => i.type !== 'suite').reduce((acc, curr) => acc + curr.price, 0);
  const total = suiteTotal + otherTotal;
  const taxes = total * 0.12;
  const finalTotal = total + taxes;

  if (confirmed) {
    return (
      <main className="bg-ink min-h-screen text-ivory flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/media/hero-stills/Resort_at_dusk_reflecting_lake_202607041810.jpeg" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center max-w-xl p-12 bg-glass-dark border border-gold/30 backdrop-blur-[20px]">
          <h1 className="font-serif text-5xl text-gold mb-6">Reservation Confirmed</h1>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60 mb-8">Ref: {reference}</p>
          <p className="font-sans text-ivory/80 leading-relaxed mb-12">
            A member of our concierge team will contact you shortly to personalize your stay. No payment is required today. We look forward to welcoming you to Vilasa.
          </p>
          <a href="/" className="inline-block border border-gold px-8 py-4 bg-gold text-ink font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-transparent hover:text-gold transition-colors">
            Return to The Lake
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-ink min-h-screen text-ivory pt-32 pb-16 px-4 md:px-12 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
      
      {/* Left: Form Area */}
      <div className="w-full md:w-2/3">
        {/* Progress */}
        <div className="flex gap-2 mb-16">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${s <= step ? 'bg-gold' : 'bg-ivory/10'}`}></div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-serif text-4xl mb-8">Dates & Party</h2>
              
              <div className="border border-gold/30 mb-8 bg-glass-dark overflow-hidden">
                <CustomCalendar dateRange={dateRange} setDateRange={setDateRange} />
                
                <div className="flex justify-between items-center border-t border-ivory/10 p-8 bg-ink/30">
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60">Adults</span>
                  <div className="flex items-center gap-6">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full border border-gold text-gold hover:bg-gold hover:text-ink transition-colors">-</button>
                    <span className="font-serif text-xl">{adults}</span>
                    <button onClick={() => setAdults(Math.min(6, adults + 1))} className="w-10 h-10 rounded-full border border-gold text-gold hover:bg-gold hover:text-ink transition-colors">+</button>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={nextStep} 
                disabled={!dateRange.start || !dateRange.end}
                className="w-full py-4 bg-gold text-ink font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-ivory transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!dateRange.start || !dateRange.end ? 'Select Check-in & Check-out Dates' : 'Continue'}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-serif text-4xl mb-8">Choose Sanctuaries</h2>
              <p className="text-ivory/60 mb-8 leading-relaxed">Select from our available sanctuaries for your chosen dates.</p>
              
              <div className="grid gap-6 mb-8">
                {AVAILABLE_SUITES.map(suite => {
                  const isSelected = selectedItems.some(i => i.id === suite.id);
                  return (
                    <div key={suite.id} className={`flex flex-col md:flex-row border transition-colors p-6 bg-glass-dark items-start md:items-center justify-between gap-4 ${isSelected ? 'border-gold' : 'border-gold/20'}`}>
                      <div>
                        <h4 className="font-serif text-2xl text-ivory mb-2">{suite.name}</h4>
                        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">₹{suite.price.toLocaleString('en-IN')} / night</p>
                      </div>
                      {isSelected ? (
                        <button onClick={() => removeItem(suite.id)} className="w-full md:w-auto text-ink bg-gold px-8 py-3 text-[11px] uppercase tracking-[0.18em] hover:bg-ivory transition-colors">Added</button>
                      ) : (
                        <button onClick={() => addItem(suite)} className="w-full md:w-auto text-gold border border-gold px-8 py-3 text-[11px] uppercase tracking-[0.18em] hover:bg-gold hover:text-ink transition-colors">Select</button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <button onClick={prevStep} className="w-1/3 py-4 border border-gold text-gold font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-gold/10 transition-colors">
                  Back
                </button>
                <button 
                  onClick={nextStep} 
                  disabled={!selectedItems.some(i => i.type === 'suite')}
                  className="w-2/3 py-4 bg-gold text-ink font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-ivory transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedItems.some(i => i.type === 'suite') ? 'Continue' : 'Select a Suite to Continue'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-serif text-4xl mb-8">Enhance the Stay</h2>
              <div className="space-y-4 mb-8">
                {ENHANCEMENTS.map(addon => {
                  const isSelected = selectedItems.some(i => i.id === addon.id);
                  return (
                    <div key={addon.id} onClick={() => isSelected ? removeItem(addon.id) : addItem(addon)} className={`flex items-center justify-between p-6 border bg-glass-dark cursor-pointer transition-colors ${isSelected ? 'border-gold' : 'border-gold/20 hover:border-gold/50'}`}>
                      <div className="flex items-center gap-6">
                        <div className={`w-5 h-5 flex items-center justify-center border transition-colors ${isSelected ? 'border-gold bg-gold text-ink' : 'border-gold/50 bg-transparent'}`}>
                          {isSelected && <span className="text-[10px]">✓</span>}
                        </div>
                        <span className="font-serif text-xl">{addon.name}</span>
                      </div>
                      <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60">+ ₹{addon.price.toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4">
                <button onClick={prevStep} className="w-1/3 py-4 border border-gold text-gold font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-gold/10 transition-colors">
                  Back
                </button>
                <button onClick={nextStep} className="w-2/3 py-4 bg-gold text-ink font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-ivory transition-colors">
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-serif text-4xl mb-8">Guest Details</h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Controller name="firstName" control={control} render={({ field }) => (
                      <input {...field} placeholder="First Name *" className={`w-full bg-transparent border-b ${errors.firstName ? 'border-ember text-ember' : 'border-gold/30'} py-4 outline-none font-sans text-lg focus:border-gold transition-colors`} />
                    )} />
                    {errors.firstName && <span className="text-ember text-xs mt-2 block">{errors.firstName.message}</span>}
                  </div>
                  <div>
                    <Controller name="lastName" control={control} render={({ field }) => (
                      <input {...field} placeholder="Last Name *" className={`w-full bg-transparent border-b ${errors.lastName ? 'border-ember text-ember' : 'border-gold/30'} py-4 outline-none font-sans text-lg focus:border-gold transition-colors`} />
                    )} />
                    {errors.lastName && <span className="text-ember text-xs mt-2 block">{errors.lastName.message}</span>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Controller name="email" control={control} render={({ field }) => (
                      <input {...field} placeholder="Email Address *" type="email" className={`w-full bg-transparent border-b ${errors.email ? 'border-ember text-ember' : 'border-gold/30'} py-4 outline-none font-sans text-lg focus:border-gold transition-colors`} />
                    )} />
                    {errors.email && <span className="text-ember text-xs mt-2 block">{errors.email.message}</span>}
                  </div>
                  <div>
                    <Controller name="phone" control={control} render={({ field }) => (
                      <input {...field} placeholder="Phone Number *" type="tel" className={`w-full bg-transparent border-b ${errors.phone ? 'border-ember text-ember' : 'border-gold/30'} py-4 outline-none font-sans text-lg focus:border-gold transition-colors`} />
                    )} />
                    {errors.phone && <span className="text-ember text-xs mt-2 block">{errors.phone.message}</span>}
                  </div>
                </div>

                <Controller name="occasion" control={control} render={({ field }) => (
                  <select {...field} className="w-full bg-ink border-b border-gold/30 py-4 outline-none font-sans text-lg focus:border-gold text-ivory/80 appearance-none rounded-none">
                    <option value="">Special Occasion (Optional)</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Birthday">Birthday</option>
                  </select>
                )} />

                <div className="flex gap-4 pt-8">
                  <button type="button" onClick={prevStep} className="w-1/3 py-4 border border-gold text-gold font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-gold/10 transition-colors">
                    Back
                  </button>
                  <button type="button" onClick={async () => {
                    const isValid = await trigger(); 
                    if (isValid) {
                      nextStep();
                    }
                  }} className="w-2/3 py-4 bg-gold text-ink font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-ivory transition-colors">
                    Review Details
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="font-serif text-4xl mb-8">Review & Confirm</h2>
              <div className="bg-glass-dark border border-gold/30 p-8 mb-8">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/60 mb-6">Terms of Reservation</p>
                <p className="font-sans text-ivory/80 leading-relaxed text-sm">
                  This request will be personally reviewed by our Concierge Director. No payment is processed at this stage. Upon confirmation of availability, a secure deposit link will be sent directly to your email.
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={prevStep} className="w-1/3 py-4 border border-gold text-gold font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-gold/10 transition-colors">
                  Back
                </button>
                <button onClick={handleConfirm} type="button" className="w-2/3 py-4 bg-gold text-ink font-sans text-[11px] uppercase tracking-[0.18em] hover:bg-ivory transition-colors">
                  Confirm Request
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Sticky Summary */}
      <div className="w-full md:w-1/3 relative mt-16 md:mt-0">
        <div className="sticky top-32 bg-glass-dark border border-gold/20 p-8 backdrop-blur-[20px]">
          <h3 className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold mb-8 pb-4 border-b border-gold/20">Reservation Summary</h3>
          
          <div className="mb-8 space-y-2">
            <p className="font-sans text-sm flex justify-between">
              <span className="text-ivory/60">Dates:</span> 
              <span>
                {dateRange.start ? dateRange.start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Select'} 
                {' - '}
                {dateRange.end ? dateRange.end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Select'}
              </span>
            </p>
            <p className="font-sans text-sm flex justify-between">
              <span className="text-ivory/60">Guests:</span> 
              <span>{adults} Adults</span>
            </p>
            {nights > 1 && (
              <p className="font-sans text-sm flex justify-between text-gold pt-2">
                <span>Duration:</span> 
                <span>{nights} Nights</span>
              </p>
            )}
          </div>

          {selectedItems.length > 0 ? (
            <div className="space-y-6 mb-8 border-t border-ivory/10 pt-6">
              {selectedItems.map(item => (
                <div key={item.id} className="flex justify-between items-start group">
                  <div>
                    <h4 className="font-serif text-lg leading-tight mb-1">{item.name}</h4>
                    <button onClick={() => removeItem(item.id)} className="font-sans text-[10px] uppercase tracking-wider text-ivory/40 hover:text-ember transition-colors">Remove</button>
                  </div>
                  <span className="font-sans text-sm whitespace-nowrap ml-4">
                    ₹{item.type === 'suite' ? (item.price * nights).toLocaleString('en-IN') : item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-t border-ivory/10 pt-6 mb-8">
              <p className="font-sans text-sm text-ivory/40 italic">No sanctuaries or experiences selected.</p>
            </div>
          )}

          <div className="border-t border-gold/20 pt-6 space-y-4">
            <div className="flex justify-between text-sm text-ivory/60">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-ivory/60">
              <span>Taxes & Estate Fees (12%)</span>
              <span>₹{taxes.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xl font-serif text-gold pt-6 border-t border-gold/20 mt-2">
              <span>Total Request</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
