"use client";
import React, { useEffect, useRef, useState } from "react";

// ============================================================================
// TRANSITION CLASS - Handles smooth animation with easing functions
// ============================================================================
class Transition {
  start: number;        // Starting value of the animation (e.g., 0 for scale)
  end: number;         // Ending value of the animation (e.g., 1 for scale)
  currentVal: number;  // Current interpolated value during animation
  duration: number;    // How long the animation takes (in seconds)
  delay: number;       // Delay before animation starts (in seconds)
  type: string;        // Easing function type (linear, easeOutBack, etc.)
  done: boolean;       // Whether the animation has completed
  startTime: number;   // Timestamp when animation started

  constructor(
    startValue: number,   // Initial value (e.g., 0)
    endValue: number,     // Target value (e.g., 1)
    type: string = "linear",  // Easing type, defaults to linear
    duration: number,     // Animation duration in seconds
    delay: number = 0     // Delay before starting, defaults to 0
  ) {
    this.start = startValue;      // Set the starting value
    this.end = endValue;           // Set the ending value
    this.currentVal = startValue;  // Initialize current value to start
    this.duration = duration;      // Store animation duration
    this.delay = delay;            // Store delay time
    this.type = type;              // Store easing function type
    this.done = false;             // Mark animation as not complete yet
    this.startTime = Date.now();   // Record current time as start time
  }

  // Reset and update animation values (used when reversing animation)
  setValue(start: number, end: number, t = this.type, dur = this.duration, del = this.delay) {
    this.start = start;            // Update starting value
    this.end = end;                // Update ending value
    this.currentVal = start;       // Reset current value to new start
    this.duration = dur;           // Update duration
    this.delay = del;              // Update delay
    this.type = t;                 // Update easing type
    this.done = false;             // Mark as not complete
    this.startTime = Date.now();   // Reset start time to now
  }

  // Get current timestamp in milliseconds
  getCurrentTime() {
    return Date.now();  // Return current time
  }

  // Calculate how much time has passed since animation started
  getElapsedTime() {
    return (this.getCurrentTime() - this.startTime) / 1000;  // Convert to seconds
  }

  // Calculate and return the current animated value based on easing function
  giveValue() {
    const delta = this.end - this.start;  // Total change needed (e.g., 1 - 0 = 1)
    // Calculate progress: (elapsed time - delay) / duration
    // This gives us a value from 0 to 1 representing animation progress
    const elapsed = (this.getElapsedTime() - this.delay) / this.duration;
    let timeFunction: number;  // Will hold the easing function result

    // Apply different easing functions based on type
    // Easing functions make animations feel more natural
    switch (this.type) {
      case "linear":
        // Linear: constant speed throughout (no easing)
        timeFunction = elapsed;
        break;
      case "easeIn":
        // Ease In: starts slow, speeds up (power of 4 for strong effect)
        timeFunction = elapsed ** 4;
        break;
      case "easeOut":
        // Ease Out: starts fast, slows down (inverse of easeIn)
        timeFunction = 1 - (1 - elapsed) ** 4;
        break;
      case "easeInOut":
        // Ease In Out: slow start, fast middle, slow end
        timeFunction =
          elapsed < 0.5
            ? ((elapsed * 2) ** 4) / 2      // First half: ease in
            : (2 - ((1 - elapsed) * 2) ** 4) / 2;  // Second half: ease out
        break;
      case "easeInBack":
        // Ease In Back: starts by going backwards slightly, then forward
        const j1 = 0.45;  // Back amount (how much it goes back)
        timeFunction =
          (-2 * elapsed ** 3 + 3 * j1 * elapsed ** 2) / (3 * j1 - 2);
        break;
      case "easeOutBack":
        // Ease Out Back: overshoots the end, then settles (bouncy effect)
        const j2 = 0.45;  // Back amount
        timeFunction =
          1 -
          (-2 * (1 - elapsed) ** 3 + 3 * j2 * (1 - elapsed) ** 2) /
            (3 * j2 - 2);
        break;
      case "easeInOutBack":
        // Ease In Out Back: combines both back effects
        const j3 = 0.45;
        timeFunction =
          elapsed < 0.5
            ? ((-2 * (elapsed * 2) ** 3 + 3 * j3 * (elapsed * 2) ** 2) /
                (3 * j3 - 2)) /
              2
            : (2 -
                (-2 * ((1 - elapsed) * 2) ** 3 +
                  3 * j3 * ((1 - elapsed) * 2) ** 2) /
                  (3 * j3 - 2)) /
              2;
        break;
      case "easeOutElastic":
        // Elastic: bounces like a spring at the end
        timeFunction =
          Math.pow(2, -10 * elapsed) *  // Exponential decay
            Math.sin((elapsed * 10 - 0.75) * (2 * Math.PI) / 3) +  // Sine wave for bounce
          1;
        break;
      default:
        // Fallback to linear if type is unknown
        timeFunction = elapsed;
    }

    // Check if animation is complete (elapsed >= 1 means 100% done)
    if (elapsed >= 1) {
      if (!this.done) this.done = true;  // Mark as done (only once)
      return this.end;  // Return final value
    } else if (elapsed <= 0) {
      // Animation hasn't started yet (still in delay period)
      return this.start;  // Return starting value
    }

    // Calculate current value: start + (change * easing function result)
    // This interpolates between start and end based on easing
    this.currentVal = this.start + delta * timeFunction;
    return this.currentVal;  // Return the current animated value
  }
}

// ============================================================================
// PETAL CLASS - Represents one animated piece of the image
// ============================================================================
class Petal {
  x: number;           // X position of the petal on canvas
  y: number;           // Y position of the petal on canvas
  width: number;       // Width of this petal piece
  l: number;           // Height (length) of this petal piece
  scale: Transition;    // Transition object controlling scale animation

  constructor(x: number, y: number, width: number, l: number, delay: number) {
    this.x = Math.floor(x);      // Round down X position to whole pixel
    this.y = Math.round(y);       // Round Y position to nearest pixel
    this.width = width;          // Store petal width
    this.l = l;                   // Store petal height
    // Create scale transition: starts at 0 (invisible), ends at 1 (full size)
    // Uses easeOutBack for bouncy effect, 0.8s duration, with individual delay
    this.scale = new Transition(0, 1, "easeOutBack", 0.8, delay);
  }

  // Update and draw this petal on the canvas
  upd(
    ctx: CanvasRenderingContext2D,  // Canvas drawing context
    offscreen: HTMLCanvasElement,   // Offscreen canvas with images
    messageCoord: number             // Y coordinate of which image to show
  ) {
    // Calculate half width for centering the petal
    const w = Math.ceil(this.width / 2) + 1;
    
    // Save current canvas state (transformations, styles, etc.)
    ctx.save();
    
    // Move canvas origin to petal's position (for rotation/scaling around this point)
    ctx.translate(this.x, this.y);
    
    // Get current scale value from transition (0 to 1)
    const scaleVal = this.scale.giveValue();
    
    // Apply scale transformation (makes petal grow from 0 to full size)
    ctx.scale(scaleVal, scaleVal);
    
    // Rotate petal: starts at 90 degrees (PI/2), rotates to 0 as it scales
    // This creates a "flip" effect as the petal appears
    ctx.rotate((1 - scaleVal) * Math.PI / 2);
    
    // Draw the petal piece from offscreen canvas
    // This copies a portion of the image and draws it with transformations applied
    ctx.drawImage(
      offscreen,           // Source: offscreen canvas with images
      this.x - w,         // Source X: where to read from offscreen (left edge)
      messageCoord,        // Source Y: which image layer (old or new)
      this.width,         // Source width: how much to read
      this.l,             // Source height: how much to read
      -w,                 // Destination X: where to draw (centered)
      0,                  // Destination Y: where to draw
      this.width,         // Destination width: how big to draw
      this.l              // Destination height: how big to draw
    );
    
    // Restore canvas state (undo transformations)
    ctx.restore();
  }
}

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
// CANVAS TRANSITION COMPONENT - Main component that handles the animation
// ============================================================================
const CanvasTransition: React.FC<CanvasTransitionProps> = ({
  width,        // Canvas width from props
  height,       // Canvas height from props
  oldImage,     // Old image URL from props
  newImage,     // New image URL from props
  onComplete,   // Completion callback from props
}) => {
  // Reference to the visible canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State to track if animation is currently running
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Reference to offscreen canvas (where we prepare images)
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  
  // Array of all petal objects (each represents one piece of the image)
  const petalsRef = useRef<Petal[]>([]);
  
  // Index tracking which background image to show (0 = old, 1 = new)
  const backRef = useRef(0);
  
  // Index tracking which foreground image to show in petals
  const frontRef = useRef(1);
  
  // Y coordinates for where each image is stored in offscreen canvas
  // [0, height] means old image at y=0, new image at y=height
  const messageCoordRef = useRef<number[]>([0, height]);
  
  // Reference to animation frame ID (for canceling animation)
  const animationFrameRef = useRef<number | null>(null);
  
  // Flag to track if the swap animation has started
  const swapTriggeredRef = useRef<boolean>(false);

  // Main effect: runs when component mounts or images change
  useEffect(() => {
    const canvas = canvasRef.current;  // Get canvas element
    if (!canvas) return;  // Exit if canvas doesn't exist

    const ctx = canvas.getContext("2d");  // Get 2D drawing context
    if (!ctx) return;  // Exit if context can't be created

    // ========================================================================
    // INITIALIZATION: Reset all animation state
    // ========================================================================
    setIsAnimating(true);           // Mark animation as running
    swapTriggeredRef.current = false;  // Reset swap flag
    backRef.current = 0;           // Start with old image as background
    frontRef.current = 1;          // Start with new image in petals
    messageCoordRef.current = [0, height];  // Reset image coordinates
    petalsRef.current = [];        // Clear petal array

    // Set canvas dimensions to match props
    canvas.width = width;
    canvas.height = height;

    // ========================================================================
    // CREATE OFFSCREEN CANVAS: Where we prepare images before drawing
    // ========================================================================
    // Create a hidden canvas 3x the size (to store multiple images stacked)
    const offscreen = document.createElement("canvas");
    offscreen.width = width * 3;   // 3x width for multiple images
    offscreen.height = height * 3; // 3x height for multiple images
    const offctx = offscreen.getContext("2d");  // Get offscreen context
    if (!offctx) return;  // Exit if context can't be created

    offscreenRef.current = offscreen;  // Store reference for later use

    // ========================================================================
    // LOAD IMAGES: Create image objects for old and new images
    // ========================================================================
    const oldImg = new Image();  // Image object for old image
    const newImg = new Image();  // Image object for new image

    // Allow cross-origin images (for external images)
    oldImg.crossOrigin = "anonymous";
    newImg.crossOrigin = "anonymous";

    let imagesLoaded = 0;  // Counter to track how many images loaded

    // ========================================================================
    // DRAW MESSAGE FUNCTION: Draws an image onto offscreen canvas
    // ========================================================================
    function drawMessage(
      offctx: CanvasRenderingContext2D,  // Offscreen canvas context
      img: HTMLImageElement,              // Image to draw
      yOffset: number                     // Y position in offscreen canvas
    ) {
      // Fill background with white (in case image has transparency)
      offctx.fillStyle = "white";
      offctx.fillRect(0, yOffset, width, height);
      
      // Draw the image at the specified Y offset
      // This stacks images vertically in the offscreen canvas
      offctx.drawImage(img, 0, yOffset, width, height);
    }

    // ========================================================================
    // SETUP FUNCTION: Creates all the petal pieces
    // ========================================================================
    function setup() {
      const rows = 20;   // Number of rows of petals (vertical)
      const cols = 20;   // Number of columns of petals (horizontal)
      
      // Calculate size of each petal piece
      const petalWidth = Math.ceil(width / (cols - 1));   // Width per petal
      const petalHeight = Math.ceil(height / rows);      // Height per petal
      
      // Gap for staggered rows (alternating rows are offset)
      const gap = width / (2 * (cols - 1)) + 2;

      petalsRef.current = [];  // Initialize empty petal array

      // Create grid of petals
      for (let i = 0; i < rows; i++) {        // Loop through rows
        for (let j = 0; j < cols; j++) {      // Loop through columns
          let x: number;  // X position of this petal
          const y = i * petalHeight;  // Y position (row * height)
          
          // Calculate delay based on position (creates wave effect)
          // sin creates smooth variation, j*0.05 adds horizontal delay
          const delay = Math.sin(i * 0.1) + j * 0.05;

          // Alternate rows for staggered effect
          if (i % 2 === 0) {
            // Even rows: evenly spaced
            x = (j / (cols - 1)) * width;
            // Create petal and add to array
            petalsRef.current.push(
              new Petal(x, y, petalWidth, petalHeight, delay)
            );
          } else {
            // Odd rows: skip last column and add gap for stagger
            if (j === cols - 1) continue;  // Skip last column
            x = (j / (cols - 1)) * width + gap;  // Add gap offset
            // Create petal and add to array
            petalsRef.current.push(
              new Petal(x, y, petalWidth, petalHeight, delay)
            );
          }
        }
      }

      // Wait 200ms before starting the swap animation
      // This gives time for initial setup
      setTimeout(() => {
        swap();  // Start the transition
      }, 200);
    }

    // ========================================================================
    // SWAP FUNCTION: Reverses petal animations to reveal new image
    // ========================================================================
    function swap() {
      swapTriggeredRef.current = true;  // Mark that swap has started
      
      // Loop through all petals
      for (let i = 0; i < petalsRef.current.length; i++) {
        const petal = petalsRef.current[i];  // Get current petal
        const currentEnd = petal.scale.end;  // Get current end value
        
        // Reverse the animation: if it was going 0->1, now go 1->0
        // This makes petals flip to reveal the new image underneath
        petal.scale.setValue(currentEnd, 1 - currentEnd);
      }

      // Update which image layers to show
      if (petalsRef.current[0]?.scale.start === 1) {
        // If starting from 1, show old image in background
        backRef.current += 2;  // Move to old image layer
      } else if (petalsRef.current[0]?.scale.start === 0) {
        // If starting from 0, show new image in background
        frontRef.current += 2;  // Move to new image layer
      }
    }

    // ========================================================================
    // ANIMATION FUNCTION: Main loop that draws each frame
    // ========================================================================
    let completionChecked = false;  // Flag to ensure onComplete only called once

    function anim() {
      // Exit if context or offscreen canvas not available
      if (!ctx || !offscreenRef.current) return;

      // Clear the entire canvas (remove previous frame)
      ctx.clearRect(0, 0, width, height);

      // ======================================================================
      // DRAW BACKGROUND: Show the base image (old or new)
      // ======================================================================
      // Calculate which image coordinate to use (0 or height)
      const backIndex = backRef.current % messageCoordRef.current.length;
      const backCoord = messageCoordRef.current[backIndex];

      // Draw the background image from offscreen canvas
      // This shows the image that's NOT being revealed by petals
      ctx.drawImage(
        offscreenRef.current,  // Source: offscreen canvas
        0,                     // Source X: start from left
        backCoord,              // Source Y: which image layer (old or new)
        width,                 // Source width: full width
        height,                 // Source height: full height
        0,                      // Destination X: draw at left
        0,                      // Destination Y: draw at top
        width,                  // Destination width: full width
        height                  // Destination height: full height
      );

      // ======================================================================
      // DRAW PETALS: Animate each petal piece
      // ======================================================================
      let allPetalsDone = true;  // Track if all petals finished animating
      
      // Loop through all petals
      for (let i = 0; i < petalsRef.current.length; i++) {
        // Calculate which image to show in petals (old or new)
        const frontIndex = frontRef.current % messageCoordRef.current.length;
        const frontCoord = messageCoordRef.current[frontIndex];
        
        // Update and draw this petal (with scale/rotation animation)
        petalsRef.current[i].upd(ctx, offscreenRef.current, frontCoord);
        
        // ====================================================================
        // CHECK COMPLETION: See if this petal's animation is done
        // ====================================================================
        // Only check after swap has been triggered (animation has started)
        if (swapTriggeredRef.current) {
          const petal = petalsRef.current[i];  // Get current petal
          
          // Calculate animation progress: (elapsed - delay) / duration
          // This gives 0 to 1, where 1 means 100% complete
          const elapsed = (petal.scale.getElapsedTime() - petal.scale.delay) / petal.scale.duration;
          
          // If elapsed < 1, this petal is still animating
          if (elapsed < 1) {
            allPetalsDone = false;  // Mark that not all are done
          }
        } else {
          // Swap hasn't started yet, so animation isn't done
          allPetalsDone = false;
        }
      }

      // ======================================================================
      // COMPLETION CHECK: If all petals done, finish transition
      // ======================================================================
      // Check if all conditions are met for completion
      if (allPetalsDone && isAnimating && swapTriggeredRef.current && !completionChecked) {
        completionChecked = true;  // Mark as checked (prevent multiple calls)
        setIsAnimating(false);      // Stop animation loop
        
        // Small delay to ensure last frame is fully rendered
        // setTimeout(() => {
          if (onComplete) {
            onComplete();  // Call completion callback
          }
        // }, 0);
      }

      // ======================================================================
      // CONTINUE ANIMATION: Request next frame if still animating
      // ======================================================================
      if (isAnimating) {
        // Request browser to call this function again on next frame
        // This creates the animation loop (typically 60fps)
        animationFrameRef.current = requestAnimationFrame(anim);
      }
    }

    // ========================================================================
    // IMAGE LOADING: Handle when old image loads
    // ========================================================================
    oldImg.onload = () => {
      // Draw old image at y=0 in offscreen canvas
      drawMessage(offctx, oldImg, 0);
      imagesLoaded++;  // Increment counter
      
      // If both images loaded, start the animation
      if (imagesLoaded === 2) {
        setup();  // Create petals
        anim();   // Start animation loop
      }
    };

    // ========================================================================
    // IMAGE ERROR HANDLING: If old image fails to load
    // ========================================================================
    oldImg.onerror = () => {
      // Draw white background if image fails to load
      offctx.fillStyle = "white";
      offctx.fillRect(0, 0, width, height);
      imagesLoaded++;  // Count as loaded (even though it failed)
      
      // If both images "loaded" (or failed), start animation
      if (imagesLoaded === 2) {
        setup();  // Create petals
        anim();   // Start animation loop
      }
    };

    // ========================================================================
    // IMAGE LOADING: Handle when new image loads
    // ========================================================================
    newImg.onload = () => {
      // Draw new image at y=height in offscreen canvas (below old image)
      drawMessage(offctx, newImg, height);
      imagesLoaded++;  // Increment counter
      
      // If both images loaded, start the animation
      if (imagesLoaded === 2) {
        setup();  // Create petals
        anim();   // Start animation loop
      }
    };

    // ========================================================================
    // IMAGE ERROR HANDLING: If new image fails to load
    // ========================================================================
    newImg.onerror = () => {
      // Draw white background if image fails to load
      offctx.fillStyle = "white";
      offctx.fillRect(0, height, width, height);  // At new image position
      imagesLoaded++;  // Count as loaded (even though it failed)
      
      // If both images "loaded" (or failed), start animation
      if (imagesLoaded === 2) {
        setup();  // Create petals
        anim();   // Start animation loop
      }
    };

    // ========================================================================
    // START LOADING: Begin loading both images
    // ========================================================================
    oldImg.src = oldImage;  // Start loading old image (triggers onload)
    newImg.src = newImage;  // Start loading new image (triggers onload)

    // ========================================================================
    // CLEANUP: Run when component unmounts or images change
    // ========================================================================
    return () => {
      setIsAnimating(false);  // Stop animation
      
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // Only re-run when oldImage or newImage changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldImage, newImage]);

  // ========================================================================
  // RENDER: Return the canvas element
  // ========================================================================
  return (
    <canvas
      ref={canvasRef}  // Attach ref so we can access the element
      style={{
        position: "absolute",  // Position over the image
        top: 0,                // Align to top
        left: 0,               // Align to left
        width: "100%",         // Full width of container
        height: "100%",        // Full height of container
        pointerEvents: "none", // Don't block mouse events
        zIndex: 10,            // Draw above the image
      }}
    />
  );
};

export default CanvasTransition;
