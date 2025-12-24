"use client";
import React, { useEffect, useRef, useState } from "react";

// ============================================================================
// EASING FUNCTIONS - Ultra-smooth, luxurious animation curves
// ============================================================================
const easingFunctions = {
  // Ultra-smooth ease-in-out quartic (more refined than cubic)
  easeInOutQuart: (t: number): number => {
    return t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;
  },
  
  // Smooth ease-in-out cubic (luxurious feel)
  easeInOutCubic: (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  
  // Smooth ease-out quintic (very elegant deceleration)
  easeOutQuint: (t: number): number => {
    return 1 - Math.pow(1 - t, 5);
  },
  
  // Smooth ease-in-out with slight back (premium feel)
  easeInOutBack: (t: number): number => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
};

// ============================================================================
// COMPONENT PROPS INTERFACE
// ============================================================================
interface CanvasTransitionProps {
  width: number;        // Width of the canvas
  height: number;       // Height of the canvas
  oldImage: string;     // URL of the old image (currently visible)
  newImage: string;     // URL of the new image (to transition to)
  onComplete?: () => void;  // Callback when transition finishes
}

// ============================================================================
// CANVAS TRANSITION COMPONENT - Ultra-smooth luxurious animation
// ============================================================================
const CanvasTransition: React.FC<CanvasTransitionProps> = ({
  width,
  height,
  oldImage,
  newImage,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const oldImgRef = useRef<HTMLImageElement | null>(null);
  const newImgRef = useRef<HTMLImageElement | null>(null);
  const imagesLoadedRef = useRef(0);
  const completionCalledRef = useRef(false);

  // Animation parameters - tuned for ultra-smooth luxurious feel
  const DURATION = 1400; // 1.4 seconds - smooth and luxurious
  const SCALE_MIN = 0.96; // More pronounced scale down (elegant zoom out)
  const SCALE_MAX = 1.04; // More pronounced scale up (elegant zoom in)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Reset state
    setIsAnimating(true);
    startTimeRef.current = null;
    imagesLoadedRef.current = 0;
    completionCalledRef.current = false;

    // Create image objects
    const oldImg = new Image();
    const newImg = new Image();

    oldImg.crossOrigin = "anonymous";
    newImg.crossOrigin = "anonymous";

    oldImgRef.current = oldImg;
    newImgRef.current = newImg;

    // ========================================================================
    // ANIMATION FUNCTION - Ultra-smooth crossfade with multiple effects
    // ========================================================================
    function animate(currentTime: number) {
      if (!ctx || !oldImgRef.current || !newImgRef.current) return;

      // Initialize start time on first frame
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1); // 0 to 1

      // Use ultra-smooth easing function
      const easedProgress = easingFunctions.easeInOutQuart(progress);

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate smooth transition values with multiple curves
      // Scale for old image (elegant zoom out)
      const oldScale = 1 + (1 - easedProgress) * (SCALE_MIN - 1);
      
      // Scale for new image (elegant zoom in)
      const newScale = SCALE_MIN + easedProgress * (SCALE_MAX - SCALE_MIN);

      // Multi-layered opacity for ultra-smooth fade
      // Old image: fade out with smooth curve
      const oldOpacity = Math.pow(1 - easedProgress, 1.5);
      
      // New image: fade in with different curve for natural feel
      const newOpacity = Math.pow(easedProgress, 0.7);

      // Calculate transition progress for effects (peaks in middle)
      const blurProgress = Math.sin(easedProgress * Math.PI);

      // Calculate subtle brightness/contrast adjustments for depth
      const brightnessAdjust = 1 - (blurProgress * 0.08); // Slight darkening during transition
      const contrastAdjust = 1 + (blurProgress * 0.05); // Slight contrast boost

      // Calculate center point for scaling
      const centerX = width / 2;
      const centerY = height / 2;

      // ======================================================================
      // DRAW OLD IMAGE (fading out with multiple effects)
      // ======================================================================
      if (oldOpacity > 0.01) {
        ctx.save();

        // Apply smooth opacity fade
        ctx.globalAlpha = oldOpacity;

        // Apply brightness adjustment
        ctx.filter = `brightness(${brightnessAdjust}) contrast(${contrastAdjust})`;

        // Apply elegant zoom-out transformation
        ctx.translate(centerX, centerY);
        ctx.scale(oldScale, oldScale);
        ctx.translate(-centerX, -centerY);

        // Draw old image
        ctx.drawImage(oldImgRef.current!, 0, 0, width, height);

        ctx.restore();
      }

      // ======================================================================
      // DRAW NEW IMAGE (fading in with multiple effects)
      // ======================================================================
      if (newOpacity > 0.01) {
        ctx.save();

        // Apply smooth opacity fade
        ctx.globalAlpha = newOpacity;

        // Apply brightness adjustment (slightly brighter as it comes in)
        const newBrightness = 1 - (blurProgress * 0.04);
        ctx.filter = `brightness(${newBrightness}) contrast(${contrastAdjust})`;

        // Apply elegant zoom-in transformation
        ctx.translate(centerX, centerY);
        ctx.scale(newScale, newScale);
        ctx.translate(-centerX, -centerY);

        // Draw new image
        ctx.drawImage(newImgRef.current!, 0, 0, width, height);

        ctx.restore();
      }

      // ======================================================================
      // ADD SUBTLE OVERLAY GRADIENT FOR DEPTH
      // ======================================================================
      if (progress > 0.2 && progress < 0.8) {
        ctx.save();
        
        // Create subtle gradient overlay for depth effect
        const gradientOpacity = Math.sin(progress * Math.PI) * 0.15;
        ctx.globalAlpha = gradientOpacity;
        
        // Create radial gradient from center
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, Math.max(width, height) * 0.8
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.1)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.2)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        ctx.restore();
      }

      // ======================================================================
      // COMPLETION CHECK
      // ======================================================================
      if (progress >= 1 && !completionCalledRef.current) {
        completionCalledRef.current = true;
        setIsAnimating(false);

        // Small delay to ensure final frame is rendered
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 50);
        return;
      }

      // Continue animation
      if (isAnimating && progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }

    // ========================================================================
    // IMAGE LOADING HANDLERS
    // ========================================================================
    const handleImageLoad = () => {
      imagesLoadedRef.current++;
      if (imagesLoadedRef.current === 2) {
        // Both images loaded, start animation
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const handleImageError = (img: HTMLImageElement, isOld: boolean) => {
      // Create a subtle gradient placeholder if image fails to load
      const placeholder = document.createElement("canvas");
      placeholder.width = width;
      placeholder.height = height;
      const placeholderCtx = placeholder.getContext("2d");
      if (placeholderCtx) {
        // Create gradient background
        const gradient = placeholderCtx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#f5f5f5");
        gradient.addColorStop(1, "#e0e0e0");
        placeholderCtx.fillStyle = gradient;
        placeholderCtx.fillRect(0, 0, width, height);
        
        placeholderCtx.fillStyle = "#999";
        placeholderCtx.font = "16px Arial";
        placeholderCtx.textAlign = "center";
        placeholderCtx.textBaseline = "middle";
        placeholderCtx.fillText("Image", width / 2, height / 2 - 10);
        placeholderCtx.fillText("Loading...", width / 2, height / 2 + 10);
      }

      // Replace the failed image with placeholder
      if (isOld) {
        oldImgRef.current = placeholder as any;
      } else {
        newImgRef.current = placeholder as any;
      }

      handleImageLoad();
    };

    // Set up image load handlers
    oldImg.onload = handleImageLoad;
    oldImg.onerror = () => handleImageError(oldImg, true);

    newImg.onload = handleImageLoad;
    newImg.onerror = () => handleImageError(newImg, false);

    // Start loading images
    oldImg.src = oldImage;
    newImg.src = newImage;

    // ========================================================================
    // CLEANUP
    // ========================================================================
    return () => {
      setIsAnimating(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldImage, newImage, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default CanvasTransition;
