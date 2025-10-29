"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Optimized dynamic imports for better code splitting and LCP
const ServiceThirdMainPage = dynamic(() => import("@/allPages/serviceThirdPage/ServiceThirdMainPage"), {
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

const ServiceThirdMainPage2 = dynamic(() => import("@/allPages/serviceThirdPage/ServiceThirdMainPage2"), {
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

const Page = async ({
  params,
}: {
  params: Promise<{ secondPage: string; thirdPage: string }>;
}) => {
  const { secondPage, thirdPage } = await params;

  return (
    <>
      {/* Preload critical resources for better LCP */}
      <link rel="preload" href="/service-images/services-third-banner.jpg" as="image" />
      
      <div>
        {thirdPage === "newspaper-ad-rates" ? (
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
            <ServiceThirdMainPage2 />
          </Suspense>
        ) : (
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
            <ServiceThirdMainPage />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Page;