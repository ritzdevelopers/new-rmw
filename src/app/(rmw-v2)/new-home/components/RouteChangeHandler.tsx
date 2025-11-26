"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Cleanup existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars && trigger.vars.id) {
        // Only kill triggers that don't have important IDs
        if (!trigger.vars.id.includes("persistent")) {
          trigger.kill();
        }
      }
    });

    // Small delay to ensure DOM is fully rendered after route change
    const refreshTimeout = setTimeout(() => {
      // Force a reflow to ensure styles are applied
      if (document.body) {
        const height = document.body.offsetHeight; // Force reflow
        void height; // Prevent unused variable warning
      }

      // Refresh all ScrollTrigger instances
      ScrollTrigger.refresh();
      
      // Ensure fonts are loaded
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      // Refresh ScrollTrigger again after a slight delay to catch any late-loading content
      setTimeout(() => {
        ScrollTrigger.refresh();
        
        // Force style recalculation without hiding elements
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, 300);
    }, 200);

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [pathname]);

  return null;
}

export default RouteChangeHandler;

