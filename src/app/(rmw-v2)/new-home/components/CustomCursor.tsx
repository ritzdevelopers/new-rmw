"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const enlargedImageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHoveringTarget, setIsHoveringTarget] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [targetType, setTargetType] = useState<"heading" | "image" | null>(null);
  const [magnifiedText, setMagnifiedText] = useState("");
  const [enlargedImageSrc, setEnlargedImageSrc] = useState<string>("");

  // Refs for animation loop
  const containerRectRef = useRef<DOMRect | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const glassRef = useRef({ x: 0, y: 0 });
  const enlargedImagePosRef = useRef({ x: 0, y: 0 });
  const runMovementRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const targetElementRef = useRef<HTMLElement | null>(null);
  const targetTypeRef = useRef<"heading" | "image" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);

    // Only enable on desktop (pointer devices)
    const deviceHasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!deviceHasPointer) return;

    const magnifier = magnifierRef.current;
    const enlargedImage = enlargedImageRef.current;
    const container = document.querySelector("main") || document.body;

    if (!magnifier || !enlargedImage || !container) return;

    // Hide default cursor
    if (container) {
      (container as HTMLElement).style.cursor = "none";
    }

    // Lerp function for smooth animation
    const lerp = (a: number, b: number, n: number): number => {
      return (1 - n) * a + n * b;
    };

    // Get magnified text at cursor position
    const getMagnifiedText = (x: number, y: number, heading: HTMLElement): string => {
      const text = heading.textContent || "";
      if (!text) return "";

      try {
        const range =
          (document as any).caretRangeFromPoint?.(x, y) ||
          (document as any).caretPositionFromPoint?.(x, y);

        if (range) {
          const textNode = range.startContainer;
          let charIndex = 0;

          if (textNode.nodeType === Node.TEXT_NODE) {
            const headingTextNodes: Text[] = [];
            const walker = document.createTreeWalker(
              heading,
              NodeFilter.SHOW_TEXT,
              null
            );

            let node;
            while ((node = walker.nextNode())) {
              headingTextNodes.push(node as Text);
              if (node === textNode) {
                charIndex = range.startOffset;
                for (let i = 0; i < headingTextNodes.length - 1; i++) {
                  charIndex += headingTextNodes[i].textContent?.length || 0;
                }
                break;
              }
            }
          } else {
            const headingRect = heading.getBoundingClientRect();
            const relativeX = x - headingRect.left;
            const style = window.getComputedStyle(heading);
            const fontSize = parseFloat(style.fontSize);
            const fontFamily = style.fontFamily;

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
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

          const charsToShow = 7;
          const start = Math.max(0, charIndex - Math.floor(charsToShow / 2));
          const end = Math.min(text.length, start + charsToShow);
          const extracted = text.substring(start, end);

          let displayText = extracted;
          if (start > 0) displayText = "…" + displayText;
          if (end < text.length) displayText = displayText + "…";

          return displayText;
        }
      } catch (e) {
        // Fallback
        const headingRect = heading.getBoundingClientRect();
        const relativeX = x - headingRect.left;
        const style = window.getComputedStyle(heading);
        const fontSize = parseFloat(style.fontSize);
        const fontFamily = style.fontFamily;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
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

      const mid = Math.floor(text.length / 2);
      return text.substring(Math.max(0, mid - 3), Math.min(text.length, mid + 3));
    };

    // Animation loop for smooth magnifier movement
    const moveGlass = () => {
      const speed = 0.2;
      const containerRect = containerRectRef.current;
      if (!containerRect || !runMovementRef.current) return;

      // Calculate smooth mouse movement
      glassRef.current.x = lerp(glassRef.current.x, mouseRef.current.x, speed);
      glassRef.current.y = lerp(glassRef.current.y, mouseRef.current.y, speed);

      // Calculate enlarged image position based on mouse position relative to container
      if (containerRect) {
        enlargedImagePosRef.current.x =
          ((glassRef.current.x - containerRect.left) / containerRect.width) * -100;
        enlargedImagePosRef.current.y =
          ((glassRef.current.y - containerRect.top) / containerRect.height) * -100;
      }

      // Set style positions
      magnifier.style.transform = `translate(calc(${glassRef.current.x}px - 50%), calc(${glassRef.current.y}px - 50%))`;
      enlargedImage.style.transform = `translate(${enlargedImagePosRef.current.x}%, ${enlargedImagePosRef.current.y}%)`;

      // Update magnified text for headings
      if (targetTypeRef.current === "heading" && targetElementRef.current) {
        const text = getMagnifiedText(mouseRef.current.x, mouseRef.current.y, targetElementRef.current);
        setMagnifiedText(text);
      }

      if (runMovementRef.current) {
        animationFrameRef.current = requestAnimationFrame(moveGlass);
      }
    };

    // Check if element is heading or image
    const isHeading = (element: HTMLElement | null): boolean => {
      if (!element) return false;
      const tagName = element.tagName.toLowerCase();
      return tagName === "h1" || tagName === "h2" || tagName === "h3";
    };

    const isImage = (element: HTMLElement | null): boolean => {
      if (!element) return false;
      return element.tagName.toLowerCase() === "img";
    };

    const getTargetElement = (target: HTMLElement): {
      element: HTMLElement | null;
      type: "heading" | "image" | null;
    } => {
      if (isHeading(target)) {
        return { element: target, type: "heading" };
      }
      if (isImage(target)) {
        return { element: target, type: "image" };
      }

      const heading = target.closest("h1, h2, h3") as HTMLElement | null;
      if (heading) {
        return { element: heading, type: "heading" };
      }

      const img = target.closest("img") as HTMLImageElement | null;
      if (img) {
        return { element: img, type: "image" };
      }

      return { element: null, type: null };
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    // Show magnifying glass
    const showGlass = (element: HTMLElement, type: "heading" | "image") => {
      const rect = element.getBoundingClientRect();
      containerRectRef.current = rect;
      runMovementRef.current = true;
      setIsHoveringTarget(true);
      setTargetElement(element);
      setTargetType(type);
      targetElementRef.current = element;
      targetTypeRef.current = type;

      // Set initial glass position
      glassRef.current.x = mouseRef.current.x;
      glassRef.current.y = mouseRef.current.y;

      // For images, set up the enlarged image
      if (type === "image") {
        const img = element as HTMLImageElement;
        // Try to get higher resolution version or use current src
        let imgSrc = img.src || img.getAttribute("src") || "";
        
        // If image has data-src or srcset, try to get higher res version
        const dataSrc = img.getAttribute("data-src");
        if (dataSrc) imgSrc = dataSrc;
        
        // Set image source in state (React will handle rendering)
        setEnlargedImageSrc(imgSrc);
      } else if (type === "heading") {
        // Clear image content for headings
        setEnlargedImageSrc("");
      }

      magnifier.style.opacity = "1";
      moveGlass();
    };

    // Hide magnifying glass
    const hideGlass = () => {
      setIsHoveringTarget(false);
      setTargetElement(null);
      setTargetType(null);
      setMagnifiedText("");
      setEnlargedImageSrc("");
      targetElementRef.current = null;
      targetTypeRef.current = null;
      magnifier.style.opacity = "0";
      setTimeout(() => {
        runMovementRef.current = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }, 250);
    };

    // Mouse enter handler
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const { element, type } = getTargetElement(target);

      if (element && type && element !== targetElementRef.current) {
        showGlass(element, type);
      }
    };

    // Mouse leave handler
    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const { element } = getTargetElement(target);

      if (element && element === targetElementRef.current) {
        hideGlass();
      }
    };

    // Initialize
    const init = () => {
      if (deviceHasPointer) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseEnter, true);
        document.addEventListener("mouseout", handleMouseLeave, true);
      }
    };

    init();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter, true);
      document.removeEventListener("mouseout", handleMouseLeave, true);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (container) {
        (container as HTMLElement).style.cursor = "auto";
      }
    };
  }, [mounted]);

  const cursorContent = (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none"
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#000000",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          zIndex: 2147483647,
          top: 0,
          left: 0,
          mixBlendMode: "difference",
        }}
      />

      {/* Magnifying glass */}
      <div
        ref={magnifierRef}
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: 0,
          zIndex: 1,
          overflow: "hidden",
          width: "15vw",
          maxWidth: "10rem",
          height: "15vw",
          maxHeight: "10rem",
          border: "5px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "50%",
          backgroundColor: "transparent",
          opacity: 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          ref={enlargedImageRef}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: "100vw",
          }}
        >
          {/* For images, show enlarged image */}
          {targetType === "image" && enlargedImageSrc && (
            <img
              src={enlargedImageSrc}
              alt=""
              className="magnifying-glass__img"
              draggable={false}
              style={{
                width: "100vw",
                height: "auto",
                display: "block",
              }}
            />
          )}
          {/* For headings, show magnified text */}
          {targetType === "heading" && magnifiedText && (
            <div
              style={{
                fontSize: "clamp(40px, 5vw, 80px)",
                fontWeight: "800",
                color: "#000000",
                lineHeight: "1.1",
                padding: "30px",
                whiteSpace: "nowrap",
                textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                letterSpacing: "-0.02em",
                textAlign: "center",
                width: "100%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {magnifiedText}
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (!mounted) return null;

  return typeof window !== "undefined" && document.body
    ? createPortal(cursorContent, document.body)
    : null;
}

export default CustomCursor;
