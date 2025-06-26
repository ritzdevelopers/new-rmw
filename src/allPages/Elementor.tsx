"use client"
import { useEffect } from "react";
import Footer from "@/components/footer/Footer";
import Awards from "./Homepage/Awards";
import Experience from "./Homepage/Experience";
import Feedback from "./Homepage/Feedback";
import Home from "./Homepage/Home";
import Projects from "./Homepage/Projects";
import ProjectSwiper from "./Homepage/ProjectSwiper";
import SwiperHome from "./Homepage/SwiperHome";
// import Team from "./Homepage/Team";
import Work from "./Homepage/Work";
import Service from "./Homepage/Service";

const Elementor = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".tp-section-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  const data = [
    {
      title: "Digital Marketing",
   
      description:
        "Turning browsers into buyers isn’t magic. It’s precise digital persuasion. Our strategically obsessive digital campaigns boost visibility, amplify engagement, and reliably convert attention into measurable profits. Predictably brilliant.",
        link: "/services/best-digital-marketing-agency",
    },
    {
      title: "Content Marketing",
      description:
        "Content without action is merely decoration. Our stories don’t just attract eyes, they move hearts and minds, persuading customers to act, buy, and loyally champion your brand. Charmingly effective.",
        link: "/services/leading-content-marketing-agency",
    },
    {
      title: "(PPC) Advertising",
      description:
        "Why chase customers when you can strategically appear exactly where they’re searching? Our PPC approach delivers instant leads, measurable returns, and satisfaction so swiftly that you’ll swear it’s cheating (it’s not).",
        link: "#",
    },
    {
      title: "Web Designing & Development",
      description:
        "Your website is your digital handshake, so let’s make sure that it’s firm and welcoming. We design intuitive and visually delightful digital experiences that charm visitors into becoming loyal patrons.",
        link: "/services/best-website-designing-company",
    },
  ]

  return (
    <>
      <div
        data-elementor-type="wp-page"
        data-elementor-id="17"
        className="elementor elementor-17"
      >
        <Home/>

        {/* ======== Section 2 ========  */}

        <SwiperHome />

        {/* ======== Section 3 ========  */}

        <Service data={data}/>

        {/* ======== Section 4 ========  */}

        <Work />

        {/* ======== Section 5 ========  */}

        <Projects />

        {/* ======== Section 6 ========  */}

       <ProjectSwiper />

        {/* ======== Section 7 ========  */}

        <Awards />

        {/* ======== Section 8 ========  */}

        <Experience />

        {/* ======== Section 9 ========  */}

        {/* <Team /> */}

        {/* ======== Section 10 ========  */}

        <Feedback />

        {/* ======== Footer ========  */}
        
        <Footer />

      </div>
    </>
  );
};

export default Elementor;
