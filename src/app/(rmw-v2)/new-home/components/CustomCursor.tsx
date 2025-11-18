"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const magnifierTextRef = useRef<HTMLDivElement>(null);
  const [isHoveringHeading, setIsHoveringHeading] = useState(false);
  const [headingText, setHeadingText] = useState("");
  const [headingElement, setHeadingElement] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Use refs to access latest state in event handlers
  const isHoveringRef = useRef(false);
  const headingTextRef = useRef("");
  const headingElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);

    // Only enable on desktop (not touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentHeading: HTMLElement | null = null;
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;
    let handleMouseEnter: ((e: MouseEvent) => void) | null = null;
    let handleMouseLeave: ((e: MouseEvent) => void) | null = null;

    // Wait for portal to render and refs to be available
    const initCursor = () => {
      const cursor = cursorRef.current;
      const cursorFollower = cursorFollowerRef.current;

      if (!cursor || !cursorFollower) {
        // Retry after a short delay if refs are not ready
        setTimeout(initCursor, 50);
        return;
      }

      // Hide default cursor only on new-home page
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.cursor = "none";
      }

      // Get magnified text at cursor position - only the portion under cursor
      const getMagnifiedText = (x: number, y: number, heading: HTMLElement): string => {
        const text = heading.textContent || "";
        if (!text) return "";
        
        try {
          // Create a range to find character position
          const range = document.caretRangeFromPoint?.(x, y) || 
                        (document as any).caretPositionFromPoint?.(x, y);
          
          if (range) {
            // Get the text node and offset
            const textNode = range.startContainer;
            let charIndex = 0;
            
            if (textNode.nodeType === Node.TEXT_NODE) {
              // Find the position of this text node in the heading
              const headingTextNodes: Text[] = [];
              const walker = document.createTreeWalker(
                heading,
                NodeFilter.SHOW_TEXT,
                null
              );
              
              let node;
              while (node = walker.nextNode()) {
                headingTextNodes.push(node as Text);
                if (node === textNode) {
                  charIndex = range.startOffset;
                  // Add lengths of previous text nodes
                  for (let i = 0; i < headingTextNodes.length - 1; i++) {
                    charIndex += headingTextNodes[i].textContent?.length || 0;
                  }
                  break;
                }
              }
            } else {
              // Fallback: calculate based on position
              const headingRect = heading.getBoundingClientRect();
              const relativeX = x - headingRect.left;
              const style = window.getComputedStyle(heading);
              const fontSize = parseFloat(style.fontSize);
              const fontFamily = style.fontFamily;
              
              // Approximate character position based on width
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              if (context) {
                context.font = `${fontSize}px ${fontFamily}`;
                let estimatedIndex = 0;
                let currentWidth = 0;
                
                for (let i = 0; i < text.length; i++) {
                  const charWidth = context.measureText(text[i]).width;
                  if (currentWidth + charWidth / 2 > relativeX) {
                    estimatedIndex = i;
                    break;
                  }
                  currentWidth += charWidth;
                  estimatedIndex = i;
                }
                charIndex = estimatedIndex;
              }
            }
            
            // Extract portion around cursor (6-8 characters for better visibility)
            const charsToShow = 7;
            const start = Math.max(0, charIndex - Math.floor(charsToShow / 2));
            const end = Math.min(text.length, start + charsToShow);
            const extracted = text.substring(start, end);
            
            // Add ellipsis if not showing full text
            let displayText = extracted;
            if (start > 0) displayText = "…" + displayText;
            if (end < text.length) displayText = displayText + "…";
            
            return displayText;
          }
        } catch (e) {
          // Fallback: calculate based on position
          const headingRect = heading.getBoundingClientRect();
          const relativeX = x - headingRect.left;
          const style = window.getComputedStyle(heading);
          const fontSize = parseFloat(style.fontSize);
          const fontFamily = style.fontFamily;
          
          // Approximate character position
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (context) {
            context.font = `${fontSize}px ${fontFamily}`;
            let estimatedIndex = 0;
            let currentWidth = 0;
            
            for (let i = 0; i < text.length; i++) {
              const charWidth = context.measureText(text[i]).width;
              if (currentWidth + charWidth / 2 > relativeX) {
                estimatedIndex = i;
                break;
              }
              currentWidth += charWidth;
              estimatedIndex = i;
            }
            
            const charsToShow = 7;
            const start = Math.max(0, estimatedIndex - Math.floor(charsToShow / 2));
            const end = Math.min(text.length, start + charsToShow);
            const extracted = text.substring(start, end);
            
            let displayText = extracted;
            if (start > 0) displayText = "…" + displayText;
            if (end < text.length) displayText = displayText + "…";
            
            return displayText;
          }
        }
        
        // Final fallback: show middle portion
        const mid = Math.floor(text.length / 2);
        return text.substring(Math.max(0, mid - 3), Math.min(text.length, mid + 3));
      };

      // Mouse move handler
      handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update cursor position immediately
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0,
        });

        // Update follower with smooth animation
        gsap.to(cursorFollower, {
          x: mouseX,
          y: mouseY,
          duration: 0.3,
          ease: "power2.out",
        });

        // Update magnified text if hovering heading
        if (isHoveringRef.current && currentHeading) {
          const magnifiedText = getMagnifiedText(mouseX, mouseY, currentHeading);
          headingTextRef.current = magnifiedText;
          setHeadingText(magnifiedText);
        }
      };

      // Check if element is h1, h2, or h3
      const isHeading = (element: HTMLElement | null): boolean => {
        if (!element) return false;
        const tagName = element.tagName.toLowerCase();
        return tagName === "h1" || tagName === "h2" || tagName === "h3";
      };

      // Get heading element from event
      const getHeadingElement = (target: HTMLElement): HTMLElement | null => {
        if (isHeading(target)) return target;
        return target.closest("h1, h2, h3") as HTMLElement | null;
      };

      // Mouse enter handler for headings
      handleMouseEnter = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const heading = getHeadingElement(target);
        
        if (heading && heading !== currentHeading) {
          currentHeading = heading;
          isHoveringRef.current = true;
          headingElementRef.current = heading;
          setIsHoveringHeading(true);
          setHeadingElement(heading);
          
          // Get initial text at cursor position
          const initialText = getMagnifiedText(mouseX, mouseY, heading);
          headingTextRef.current = initialText;
          setHeadingText(initialText);
          
          // Transform cursor into magnifying glass (large clear circle)
          gsap.to(cursor, {
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "4px solid rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            mixBlendMode: "normal",
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              if (cursor) {
                cursor.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.3)";
              }
            },
          });
          
          gsap.to(cursorFollower, {
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "3px solid rgba(0, 0, 0, 0.4)",
            opacity: 0.6,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      // Mouse leave handler for headings
      handleMouseLeave = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const heading = getHeadingElement(target);
        
        if (heading && heading === currentHeading) {
          currentHeading = null;
          isHoveringRef.current = false;
          headingTextRef.current = "";
          headingElementRef.current = null;
          setIsHoveringHeading(false);
          setHeadingText("");
          setHeadingElement(null);
          
          // Transform cursor back to small dot
          gsap.to(cursor, {
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#000000",
            border: "none",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            mixBlendMode: "difference",
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              if (cursor) {
                cursor.style.boxShadow = "none";
              }
            },
          });
          
          gsap.to(cursorFollower, {
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#000000",
            border: "none",
            opacity: 0.3,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      // Initial position and visibility
      gsap.set(cursor, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 1,
      });
      gsap.set(cursorFollower, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity: 0.3,
      });

      // Add event listeners
      if (handleMouseMove) {
        document.addEventListener("mousemove", handleMouseMove);
      }
      if (handleMouseEnter) {
        document.addEventListener("mouseover", handleMouseEnter, true);
      }
      if (handleMouseLeave) {
        document.addEventListener("mouseout", handleMouseLeave, true);
      }
    };

    // Initialize after a short delay to ensure portal has rendered
    const timer = setTimeout(initCursor, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (handleMouseMove) {
        document.removeEventListener("mousemove", handleMouseMove);
      }
      if (handleMouseEnter) {
        document.removeEventListener("mouseover", handleMouseEnter, true);
      }
      if (handleMouseLeave) {
        document.removeEventListener("mouseout", handleMouseLeave, true);
      }

      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.cursor = "auto";
      }
    };
  }, [mounted]);

  const cursorContent = (
    <>
      {/* Main cursor - transforms into magnifying glass */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none mix-blend-difference"
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#000000",
          transform: "translate(-50%, -50%)",
          willChange: "transform, width, height, background-color, border",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 2147483647, // Maximum z-index value
          top: 0,
          left: 0,
        }}
      >
        {/* Magnified text inside cursor */}
        {isHoveringHeading && headingText && headingElement && (
          <div
            ref={magnifierTextRef}
            className="text-center"
            style={{
              fontSize: "clamp(40px, 5vw, 80px)",
              fontWeight: "800",
              color: "#000000",
              lineHeight: "1.1",
              padding: "30px",
              whiteSpace: "nowrap",
              textShadow: "0 2px 8px rgba(0,0,0,0.15)",
              letterSpacing: "-0.02em",
            }}
          >
            {headingText}
          </div>
        )}
      </div>
      
      {/* Follower cursor (smooth trailing effect) */}
      <div
        ref={cursorFollowerRef}
        className="fixed pointer-events-none mix-blend-difference"
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#000000",
          opacity: 0.3,
          transform: "translate(-50%, -50%)",
          willChange: "transform, width, height",
          transition: "opacity 0.3s ease",
          zIndex: 2147483646, // Just below main cursor
          top: 0,
          left: 0,
        }}
      />
    </>
  );

  if (!mounted) return null;

  // Render cursor using portal to document.body to ensure it's above everything
  return typeof window !== "undefined" && document.body
    ? createPortal(cursorContent, document.body)
    : null;
}

export default CustomCursor;

