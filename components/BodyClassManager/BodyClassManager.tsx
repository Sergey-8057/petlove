'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function BodyClassManager() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    if (pathname === '/') {
      body.classList.add('home-page');
      body.classList.remove('other-page');
    } else {
      body.classList.add('other-page');
      body.classList.remove('home-page');
    }
  }, [pathname]);

  return null;
}
