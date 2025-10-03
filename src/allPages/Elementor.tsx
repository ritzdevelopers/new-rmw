"use client";
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Home from "./Homepage/Home";
import Service from "./Homepage/Service";
import Footer from "@/components/footer/Footer";
import SwiperHome from "./Homepage/SwiperHome";
import Work from "./Homepage/Work";

const Projects = dynamic(() => import("./Homepage/Projects"), { ssr: false });
const ProjectSwiper = dynamic(() => import("./Homepage/ProjectSwiper"), {
  ssr: false,
});
const Awards = dynamic(() => import("./Homepage/Awards"), { ssr: false });
const Experience = dynamic(() => import("./Homepage/Experience"), {
  ssr: false,
});
const Feedback = dynamic(() => import("./Homepage/Feedback"), { ssr: false });

const Elementor = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      });
    });

    const hiddenElements = document.querySelectorAll(".tp-section-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const data = useMemo(
    () => [
      {
        title: "Digital Marketing",
        description:
          "Turning browsers into buyers isn’t magic. It’s precise digital persuasion. Our strategically obsessive digital campaigns boost visibility, amplify engagement, and reliably convert attention into measurable profits. Predictably brilliant.",
        link: "/services/digital-marketing",
      },
      {
        title: "Content Marketing",
        description:
          "Content without action is merely decoration. Our stories don’t just attract eyes, they move hearts and minds, persuading customers to act, buy, and loyally champion your brand. Charmingly effective.",
        link: "/services/contents-marketing",
      },
      {
        title: "(PPC) Advertising",
        description:
          "Why chase customers when you can strategically appear exactly where they’re searching? Our PPC approach delivers instant leads, measurable returns, and satisfaction so swiftly that you’ll swear it’s cheating (it’s not).",
        link: "/services/digital-marketing/ppc-google-ads-agency",
      },
      {
        title: "Web Designing & Development",
        description:
          "Your website is your digital handshake, so let’s make sure that it’s firm and welcoming. We design intuitive and visually delightful digital experiences that charm visitors into becoming loyal patrons.",
        link: "/services/web-designing-and-development",
      },
    ],
    []
  );

  return (
    <div
      data-elementor-type="wp-page"
      data-elementor-id="17"
      className="elementor elementor-17"
    >
      <Home />
      <SwiperHome />
      <Service data={data} />
      <Work />
      <Projects />
      <ProjectSwiper />
      <Awards />
      <Experience />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Elementor;