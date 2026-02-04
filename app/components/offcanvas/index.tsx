'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { OffcanvasBody } from './body';
import { OffcanvasToggle } from './toggle';
import { OffcanvasProvider, useOffcanvas } from './context';

function OffcanvasMenu() {
  const { isOpen, setIsOpen } = useOffcanvas();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && <OffcanvasBody />}
      </AnimatePresence>
      <OffcanvasToggle />
    </>
  );
}

export function Offcanvas() {
  return <OffcanvasMenu />;
}

export { useOffcanvas, OffcanvasProvider } from './context';
