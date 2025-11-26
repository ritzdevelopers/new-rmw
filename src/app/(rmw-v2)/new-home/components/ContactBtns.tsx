"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Phone, X, Bot } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function ContactBtns() {
  const [isOpen, setIsOpen] = useState(false);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappButtonRef = useRef<HTMLButtonElement>(null);
  const chatbotButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Calculate responsive distances based on screen size and button sizes
    const getDistance = () => {
      if (typeof window === "undefined")
        return { phone: -88, whatsapp: -176, chatbot: -264 };
      const width = window.innerWidth;

      // Calculate based on main button height + button height + spacing (1rem = 16px)
      // Order: Main (bottom), Phone, WhatsApp, Chatbot (top)
      if (width >= 1024) {
        // Main: 5rem (80px), Button: 4rem (64px), spacing: 1rem (16px)
        // Phone: 80 + 64 + 16 = 160px
        // WhatsApp: 160 + 64 + 16 = 240px
        // Chatbot: 240 + 64 + 16 = 320px
        return { phone: -110, whatsapp: -190, chatbot: -270 };
      }
      if (width >= 768) {
        // Main: 4.5rem (72px), Button: 4rem (64px)
        return { phone: -152, whatsapp: -228, chatbot: -304 };
      }
      if (width >= 640) {
        // Main: 4rem (64px), Button: 3.5rem (56px)
        return { phone: -136, whatsapp: -208, chatbot: -280 };
      }
      // Main: 3.5rem (56px), Button: 3rem (48px)
      return { phone: -120, whatsapp: -184, chatbot: -256 };
    };

    const distances = getDistance();

    if (isOpen) {
      // Opening animation
      const tl = gsap.timeline();

      // Animate phone button
      if (phoneButtonRef.current) {
        tl.to(
          phoneButtonRef.current,
          {
            y: distances.phone,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      // Animate WhatsApp button
      if (whatsappButtonRef.current) {
        tl.to(
          whatsappButtonRef.current,
          {
            y: distances.whatsapp,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0.1
        );
      }

      // Animate Chatbot button
      if (chatbotButtonRef.current) {
        tl.to(
          chatbotButtonRef.current,
          {
            y: distances.chatbot,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0.2
        );
      }

      // Rotate main button icon
      if (mainButtonRef.current) {
        gsap.to(mainButtonRef.current.querySelectorAll(".main-icon"), {
          rotation: 180,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    } else {
      // Closing animation
      const tl = gsap.timeline();

      // Animate phone button
      if (phoneButtonRef.current) {
        tl.to(
          phoneButtonRef.current,
          {
            y: 0,
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        );
      }

      // Animate WhatsApp button
      if (whatsappButtonRef.current) {
        tl.to(
          whatsappButtonRef.current,
          {
            y: 0,
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        );
      }

      // Animate Chatbot button
      if (chatbotButtonRef.current) {
        tl.to(
          chatbotButtonRef.current,
          {
            y: 0,
            opacity: 0,
            scale: 0.5,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        );
      }

      // Rotate main button icon back
      if (mainButtonRef.current) {
        gsap.to(mainButtonRef.current.querySelectorAll(".main-icon"), {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [isOpen]);

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = "tel:+919220516777";
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open("https://wa.me/919220516777", "_blank");
  };

  const handleChatbotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add your chatbot functionality here
    // For example: open chatbot widget, navigate to chat page, etc.
    console.log("Chatbot clicked");
    // You can replace this with your chatbot implementation
    // window.open("/chat", "_blank");
    // or trigger chatbot widget: window.chatbotWidget?.open();
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-2 z-[9999] flex flex-col items-center justify-end"
      style={{ position: "fixed", bottom: "1rem", right: "0.5rem" }}
    >
      {/* Chatbot Button - Top button */}
      <button
        ref={chatbotButtonRef}
        onClick={handleChatbotClick}
        className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 active:scale-95 z-20"
        aria-label="Chat with bot"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          bottom: 0,
          opacity: 0,
          transform: "translateY(0) scale(0.5)",
        }}
      >
        <IoChatbubbleEllipsesOutline
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#D4A574]"
          strokeWidth={2}
        />
      </button>

      {/* WhatsApp Button */}
      <button
        ref={whatsappButtonRef}
        onClick={handleWhatsAppClick}
        className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 active:scale-95 z-20"
        aria-label="WhatsApp us"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          bottom: 0,
          opacity: 0,
          transform: "translateY(0) scale(0.5)",
        }}
      >
        <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#D4A574]" />
      </button>

      {/* Phone Button - Middle button */}
      <button
        ref={phoneButtonRef}
        onClick={handlePhoneClick}
        className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 active:scale-95 z-20"
        aria-label="Call us"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          bottom: 0,
          opacity: 0,
          transform: "translateY(0) scale(0.5)",
        }}
      >
        <Phone
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#D4A574]"
          strokeWidth={2}
        />
      </button>

      {/* Main Toggle Button - Always visible at bottom */}
      <button
        ref={mainButtonRef}
        onClick={toggleMenu}
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-[4.5rem] md:h-[4.5rem] lg:w-18 lg:h-18 bg-white rounded-full shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 relative z-30"
        style={{ position: "relative" }}
        aria-label={isOpen ? "Close menu" : "Open contact menu"}
      >
        {/* Chat Icon (shown when closed) */}
        <MessageCircle
          className={`main-icon absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-[#D4A574] transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
          strokeWidth={2}
        />

        {/* Close Icon (shown when open) */}
        <X
          className={`main-icon absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-[#D4A574] transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
}

export default ContactBtns;
