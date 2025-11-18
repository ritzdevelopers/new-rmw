"use client";

import Link from "next/link";
import React, { useRef } from "react";
import ScrollSlider, { CardData } from "../components/ScrollSlider";

// Card data array with dynamic backgrounds
const cardsData: CardData[] = [
  {
    id: 1,
    title: "Digital Marketing",
    description:
      "Cut through the noise with conversion-led performance campaigns crafted for premium audiences.",
    icon: "/new-page/icns/build-icn-2.png",
    iconAlt: "Digital Marketing",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "/services/digital-marketing",
    linkText: "Explore Digital Marketing",
    bg: "#FC5D19", // Solid color
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#D4A574",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#c2925d]",
  },
  {
    id: 2,
    title: "Brand & Communication",
    description:
      "Build an iconic brand voice with insight-backed storytelling that scales across every channel.",
    icon: "/new-page/icns/stars-icn.png",
    iconAlt: "Brand & Communication",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "/services/brand-communication",
    linkText: "Explore Brand Communication",
    bg: "linear-gradient(to bottom, #103FCB, #081F65)", // Gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#c2925d] hover:text-white",
  },
  {
    id: 1,
    title: "Digital Marketing",
    description:
      "Cut through the noise with conversion-led performance campaigns crafted for premium audiences.",
    icon: "/new-page/icns/build-icn-2.png",
    iconAlt: "Digital Marketing",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "/services/digital-marketing",
    linkText: "Explore Digital Marketing",
    bg: "#FC5D19", // Solid color
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#D4A574",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#c2925d]",
  },
  {
    id: 2,
    title: "Brand & Communication",
    description:
      "Build an iconic brand voice with insight-backed storytelling that scales across every channel.",
    icon: "/new-page/icns/stars-icn.png",
    iconAlt: "Brand & Communication",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "/services/brand-communication",
    linkText: "Explore Brand Communication",
    bg: "linear-gradient(to bottom, #103FCB, #081F65)", // Gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#c2925d] hover:text-white",
  },  {
    id: 1,
    title: "Digital Marketing",
    description:
      "Cut through the noise with conversion-led performance campaigns crafted for premium audiences.",
    icon: "/new-page/icns/build-icn-2.png",
    iconAlt: "Digital Marketing",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "/services/digital-marketing",
    linkText: "Explore Digital Marketing",
    bg: "#FC5D19", // Solid color
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#D4A574",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#c2925d]",
  },
  {
    id: 2,
    title: "Brand & Communication",
    description:
      "Build an iconic brand voice with insight-backed storytelling that scales across every channel.",
    icon: "/new-page/icns/stars-icn.png",
    iconAlt: "Brand & Communication",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "/services/brand-communication",
    linkText: "Explore Brand Communication",
    bg: "linear-gradient(to bottom, #103FCB, #081F65)", // Gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#c2925d] hover:text-white",
  },
  // Add more cards here as needed
];

function S3() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full justify-center overflow-hidden bg-[#FFFFFF] py-16 sm:py-2 md:pb-8 lg:py-0"
    >
      <div className="flex w-full max-w-[95%] flex-col gap-12 px-4 sm:px-6 lg:px-8">
        {/* Row 1 */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.1] md:flex">
            Choose Your{" "}
            <span className="text-[#D4A574] md:block transform -translate-y-[4px]">
              Brand Journey
            </span>
          </h2>
          <p className="max-w-2xl text-[16px] text-[#4A5565] sm:text-lg">
            Tailored growth programmes engineered for the industries and
            audiences most.
          </p>
        </div>

        {/* Row 2 - Slider */}
        <ScrollSlider cards={cardsData} sectionRef={sectionRef} />

        {/* Row 3 */}
        <div className="flex justify-center text-center">
          <p className="max-w-xl text-sm text-[#4A5565] sm:text-[16px]">
            Not sure which path fits your brand?{" "}
            <Link href="/contact" className="text-[#4A5565] underline">
              Let's discuss your unique needs
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default S3;
