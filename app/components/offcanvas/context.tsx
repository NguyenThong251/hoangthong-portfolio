'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface OffcanvasContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const OffcanvasContext = createContext<OffcanvasContextType | undefined>(
  undefined
);

export function OffcanvasProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <OffcanvasContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </OffcanvasContext.Provider>
  );
}

export function useOffcanvas() {
  const context = useContext(OffcanvasContext);
  if (!context) {
    throw new Error('useOffcanvas must be used within OffcanvasProvider');
  }
  return context;
}
