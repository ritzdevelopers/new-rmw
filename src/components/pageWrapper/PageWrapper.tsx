'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '../loader/Loader';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // ✅ First Page Load pe Loader Dikhana
  useEffect(() => {
    setLoading(false);
  }, []);

  // ✅ Route Change pe Loader Dikhana
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default PageWrapper;
