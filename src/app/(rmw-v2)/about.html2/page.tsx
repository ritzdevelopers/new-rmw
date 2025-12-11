"use client";
import React, { useRef } from "react";
import SubHero from "../layout/SubHero";
import Section2 from "@/allPages/new-about/Section2";
import Section3 from "@/allPages/new-about/Section3";
import Section4 from "@/allPages/new-about/Section4";
import Section5 from "@/allPages/new-about/Section5";
import S51 from "../new-home/sections/S51";
import NewMasterMinds from "@/allPages/new-about/NewMasterMinds";
import Section7 from "@/allPages/new-about/Section7";
import Section8 from "@/allPages/new-about/Section8";
import NewBlogSection from "../new-home/sections/NewBlogSection";
import ASI from "../new-home/components/ASI";
import FacebookIcon from "../new-home/components/FacebookIcon";
import InstagramIcon from "../new-home/components/InstagramIcon";
import YouTubeIcon from "../new-home/components/YouTubeIcon";
import LinkedInIcon from "../new-home/components/LinkedInIcon";
import XIcon from "../new-home/components/XIcon";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GSAPService from "@/allPages/new-about/GSAPService";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const debounce = (fn: Function, d: number) => {
  let t: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), d);
  };
};

function page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Wait for DOM to be fully rendered
      const initAnimations = () => {
        const sections = containerRef.current?.querySelectorAll("section");

        if (!sections || sections.length === 0) {
          setTimeout(initAnimations, 100);
          return;
        }

        // Section3 - Image cards animation
        const section3 = sections[2];
        if (section3) {
          const imageCards = section3.querySelectorAll('[class*="relative"]');
          if (imageCards.length > 0) {
            gsap.fromTo(
              imageCards,
              {
                opacity: 0,
                scale: 0.9,
                y: 60,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                stagger: 0.15,
                ease: "back.out(1.4)",
                scrollTrigger: {
                  trigger: section3,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }

        // Section4 - Stat cards animation
        const section4 = sections[3];
        if (section4) {
          const statCards = section4.querySelectorAll('[class*="shadow"]');
          const heading = section4.querySelector("h2");
          const paragraphs = section4.querySelectorAll("p");

          if (heading) {
            gsap.fromTo(
              heading,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section4,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (statCards.length > 0) {
            gsap.fromTo(
              statCards,
              {
                opacity: 0,
                scale: 0.8,
                y: 50,
                rotation: -5,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 1,
                stagger: 0.12,
                ease: "elastic.out(1, 0.6)",
                scrollTrigger: {
                  trigger: section4,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }

        // Section5 - Parallax text effect
        const section5 = sections[4];
        if (section5) {
          const heading = section5.querySelector("h2");
          if (heading) {
            gsap.fromTo(
              heading,
              {
                opacity: 0,
                scale: 0.8,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section5,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            // Parallax effect
            gsap.to(heading, {
              y: -40,
              scrollTrigger: {
                trigger: section5,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          }
        }

        // S51 - Stagger animation
        const sectionS51 = sections[5];
        if (sectionS51) {
          const content = sectionS51.querySelectorAll(
            "h2, p, div[class*='flex']"
          );
          if (content.length > 0) {
            gsap.fromTo(
              content,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: sectionS51,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }

        // NewMasterMinds - Cards slide in animation
        const masterMinds = sections[6];
        if (masterMinds) {
          const masterCards = masterMinds.querySelectorAll(
            '[class*="relative"]'
          );
          const heading = masterMinds.querySelector("h2");
          const paragraph = masterMinds.querySelector("p");

          if (heading) {
            gsap.fromTo(
              heading,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: masterMinds,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (paragraph) {
            gsap.fromTo(
              paragraph,
              {
                opacity: 0,
                y: 20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: masterMinds,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (masterCards.length > 0) {
            gsap.fromTo(
              masterCards,
              {
                opacity: 0,
                x: (index) => (index % 2 === 0 ? -80 : 80),
                y: 60,
                scale: 0.9,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: masterMinds,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }

        // Section7 - Gallery stagger animation
        const section7 = sections[7];
        if (section7) {
          const heading = section7.querySelector("h2");
          const paragraph = section7.querySelector("p");
          const galleryItems = section7.querySelectorAll('[class*="relative"]');

          if (heading) {
            gsap.fromTo(
              heading,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section7,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (paragraph) {
            gsap.fromTo(
              paragraph,
              {
                opacity: 0,
                y: 20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section7,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (galleryItems.length > 0) {
            gsap.fromTo(
              galleryItems,
              {
                opacity: 0,
                scale: 0.85,
                y: 50,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "back.out(1.3)",
                scrollTrigger: {
                  trigger: section7,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Button animation
          const button = section7.querySelector("button");
          if (button) {
            gsap.fromTo(
              button,
              {
                opacity: 0,
                scale: 0.8,
                y: 20,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                delay: 0.5,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                  trigger: section7,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }

        // Section8 - Stats and content animation
        const section8 = sections[8];
        if (section8) {
          const heading = section8.querySelector("h2");
          const paragraphs = section8.querySelectorAll("p");
          const statsItems = section8.querySelectorAll('[class*="border-t"]');
          const glassCard = section8.querySelector('[class*="glassCard"]');

          if (heading) {
            gsap.fromTo(
              heading,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section8,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (paragraphs.length > 0) {
            gsap.fromTo(
              paragraphs,
              {
                opacity: 0,
                y: 20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section8,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (statsItems.length > 0) {
            gsap.fromTo(
              statsItems,
              {
                opacity: 0,
                x: -40,
                scale: 0.95,
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section8,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (glassCard) {
            gsap.fromTo(
              glassCard,
              {
                opacity: 0,
                scale: 0.9,
                y: 30,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: section8,
                  start: "top 70%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }

        // NewBlogSection - Stagger animation
        const blogSection = sections[9];
        if (blogSection) {
          const blogItems = blogSection.querySelectorAll(
            '[class*="relative"], [class*="flex"]'
          );
          if (blogItems.length > 0) {
            gsap.fromTo(
              blogItems,
              {
                opacity: 0,
                y: 50,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: blogSection,
                  start: "top 95%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }
      };

      // Initialize animations after DOM is ready
      const timeoutId = setTimeout(initAnimations, 150);

      // Refresh ScrollTrigger on resize
      const handleResize = debounce(() => {
        ScrollTrigger.refresh();
      }, 100);

      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <SubHero></SubHero>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <Section5></Section5>
      {/* <GSAPService /> */}
      <S51></S51>
      <NewMasterMinds></NewMasterMinds>
      <Section7></Section7>
      <Section8></Section8>
      <NewBlogSection></NewBlogSection>
      <ASI
        icn={<FacebookIcon />}
        py="top-[245px]"
        px="right-[0px]"
        bgType="facebook"
      ></ASI>
      <ASI
        icn={<InstagramIcon />}
        py="top-[295px]"
        px="right-[0px]"
        bgType="instagram"
      ></ASI>
      <ASI
        icn={<YouTubeIcon />}
        py="top-[345px]"
        px="right-[0px]"
        bgType="youtube"
      ></ASI>
      <ASI
        icn={<LinkedInIcon />}
        py="top-[395px]"
        px="right-[0px]"
        bgType="linkedin"
      ></ASI>
      <ASI icn={<XIcon />} py="top-[444px]" px="right-[0px]" bgType="x"></ASI>
    </div>
  );
}

export default page;
