"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Optimized dynamic imports for better code splitting and LCP
const Contact = dynamic(() => import("@/allPages/Contact"), {
  loading: () => (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  ),
  ssr: false
});

const page = () => {
  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" href="/contact-images/contact-banner.jpg" as="image" />
      
      <Suspense fallback={
        <div 
          className="d-flex justify-content-center align-items-center" 
          style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        >
          <style jsx>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
      }>
        <Contact />
      </Suspense>
    </>
  );
};

export default page;
