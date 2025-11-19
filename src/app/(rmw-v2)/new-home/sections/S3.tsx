"use client";

import Link from "next/link";
import React, { useRef } from "react";
import ScrollSlider, { CardData } from "../components/ScrollSlider";

// Card data array with dynamic backgrounds
const cardsData: CardData[] = [
  {
    id: 1,
    title: "Content Marketing",
    description:
      "Content is more than posts; it’s your brand’s ongoing conversation. As the best advertising agency in Delhi NCR, we build content ecosystems that attract, educate and gently sell. Combining the strategy of a performance-led digital marketing agency with the storytelling flair of a creative agency, we turn blogs, videos and social content into lasting recall, trust and qualified leads.",
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
    bg: "linear-gradient(to bottom, #6B46C1, #4C1D95)", // Purple to dark purple gradient
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#D4A574",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#c2925d]",
  },
  {
    id: 2,
    title: "PPC Advertising",
    description:
      "PPC is more than buying clicks; it’s buying intent. As the best advertising agency in Delhi NCR, we design tightly targeted campaigns that put your brand in front of high-intent customers at the perfect moment. Blending the precision of a performance-led digital marketing agency with the ideas of a creative agency, we turn every ad impression into a smarter opportunity for leads, sales and measurable ROI.",
    icon: "/new-page/icns/stars-icn.png",
    iconAlt: "PPC Advertising",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "/services/brand-communication",
    linkText: "Explore Brand Communication",
    bg: "linear-gradient(to bottom, #103FCB, #081F65)", // Blue gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#c2925d] hover:text-white",
  },
  {
    id: 3,
    title: "Web Designing & Development",
    description:
      "Your website is more than a brochure; it’s your most visible salesperson. As the best advertising agency in Delhi NCR, we design and develop websites that look stunning and sell. Blending UX thinking from a performance-led digital marketing agency with the aesthetics of a creative agency, we build fast, responsive, conversion-focused sites that turn visits into enquiries, and clicks into customers.",
    icon: "/new-page/icns/build-icn-2.png",
    iconAlt: "Web Designing & Development",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "/services/digital-marketing",
    linkText: "Explore Digital Marketing",
    bg: "linear-gradient(to bottom, #059669, #047857)", // Green to dark green gradient
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#D4A574",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#c2925d]",
  },
  {
    id: 4,
    title: "Branding & Identity Development",
    description:
      "Your brand is more than a logo, it’s a promise. As the best advertising agency in Delhi NCR, we craft identities that resonate, impress and persuade customers long-term. Combining sharp positioning with the creativity of a leading digital marketing agency and creative agency, we make your brand memorable, authentic and loyalty-worthy in crowded markets.",
    icon: "/new-page/icns/stars-icn.png",
    iconAlt: "Branding & Identity Development",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "/services/brand-communication",
    linkText: "Explore Brand Communication",
    bg: "linear-gradient(to bottom, #DC2626, #991B1B)", // Red to dark red gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#c2925d] hover:text-white",
  }, {
    id: 5,
    title: "Graphic Design",
    description:
      "Great graphic design isn’t just eye candy; it’s visual persuasion. As the best Creative agency in Delhi NCR, our creative agency and digital marketing agency team creates stunning visuals crafted to communicate clearly, resonate emotionally, and convert effectively. Whether digital or print, our graphics don’t just attract, they convince, captivate, and drive decisive action.",
    icon: "/new-page/icns/build-icn-2.png",
    iconAlt: "Graphic Design",
    features: [
      "Hyper-targeted media planning & buying",
      "Persona-driven communication frameworks",
      "Always-on analytics & optimisation",
      "Automated lead nurturing journeys",
    ],
    link: "/services/digital-marketing",
    linkText: "Explore Digital Marketing",
    bg: "linear-gradient(to bottom, #EA580C, #C2410C)", // Orange to dark orange gradient
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#D4A574",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#c2925d]",
  },
  {
    id: 6,
    title: "Logo Design",
    description:
      "Your logo is your brand’s handshake; make it unforgettable. As the best Design agency in Delhi NCR, our creative agency and digital marketing agency design distinctive, instantly recognisable logos that capture your brand essence, build instant credibility and turn casual glances into lasting loyalty and advocacy.",
    icon: "/new-page/icns/stars-icn.png",
    iconAlt: "Logo Design",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "/services/brand-communication",
    linkText: "Explore Brand Communication",
    bg: "linear-gradient(to bottom, #7C3AED, #5B21B6)", // Purple to dark purple gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#c2925d] hover:text-white",
  },

  {
    id: 7,
    title: "Print Advertising Design",
    description:
      "Print demands attention; average doesn’t cut it. As one of the top advertising agencies in Delhi NCR, our creative agency crafts high-impact print ads engineered to cut through clutter and stay top-of-mind. Every layout is strategic, every visual is persuasive, and every message is optimised by our digital marketing agency mindset to drive enquiries. Turning paper into profit, that’s smart print advertising.",
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
    bg: "linear-gradient(to bottom, #6B46C1, #4C1D95)", // Purple to dark purple gradient
    ellipseImage: "/new-page/elip.png",
    featureDotColor: "#D4A574",
    buttonBg: "bg-[#FFFFFF]",
    buttonTextColor: "text-black",
    buttonHoverBg: "hover:bg-[#c2925d]",
  },
  {
    id: 8,
    title: "Packaging Design",
    description:
      "Packaging is not just a container; it is your product’s silent salesperson. As the best design agency in Delhi NCR, our creative agency and digital marketing agency craft shelf-ready packaging that stands out, strengthens brand perception and drives impulse purchases. With Ritz packaging, casual interest turns into confident buying decisions.",
    icon: "/new-page/icns/stars-icn.png",
    iconAlt: "Packaging Design",
    features: [
      "Brand workshops & positioning blueprints",
      "Integrated creative campaign systems",
      "Experience-first content architectures",
      "ATL / BTL orchestration for launches",
    ],
    link: "/services/brand-communication",
    linkText: "Explore Brand Communication",
    bg: "linear-gradient(to bottom, #103FCB, #081F65)", // Blue gradient
    ellipseImage: "/new-page/elip2.png",
    featureDotColor: "#D1D5DC",
    buttonBg: "bg-[#ffffff]",
    buttonTextColor: "text-[#000000]",
    buttonHoverBg: "hover:bg-[#c2925d] hover:text-white",
  },

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
