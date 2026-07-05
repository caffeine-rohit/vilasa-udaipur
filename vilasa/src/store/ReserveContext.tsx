'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type ReserveItemType = 'suite' | 'experience' | 'addon';

export type ReserveItem = {
  id: string;
  name: string;
  price: number;
  type: ReserveItemType;
};

export type DateRange = {
  start: Date | null;
  end: Date | null;
};

type ReserveState = {
  selectedItems: ReserveItem[];
  addItem: (item: ReserveItem) => void;
  removeItem: (id: string) => void;
  clearReservation: () => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  adults: number;
  setAdults: (count: number) => void;
};

const ReserveContext = createContext<ReserveState | undefined>(undefined);

export function ReserveProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<ReserveItem[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [adults, setAdults] = useState<number>(2);

  const addItem = (item: ReserveItem) => {
    setSelectedItems((prev) => {
      // Prevent duplicates by ID
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearReservation = () => {
    setSelectedItems([]);
    setDateRange({ start: null, end: null });
    setAdults(2);
  };

  return (
    <ReserveContext.Provider value={{ 
      selectedItems, addItem, removeItem, clearReservation,
      dateRange, setDateRange,
      adults, setAdults 
    }}>
      {children}
    </ReserveContext.Provider>
  );
}

export function useReserve() {
  const context = useContext(ReserveContext);
  if (context === undefined) {
    throw new Error('useReserve must be used within a ReserveProvider');
  }
  return context;
}
