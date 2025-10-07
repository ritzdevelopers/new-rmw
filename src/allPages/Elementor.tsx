import Home from "./Homepage/Home";
import Service from "./Homepage/Service";
import Footer from "@/components/footer/Footer";
import SwiperHome from "./Homepage/SwiperHome";
import Work from "./Homepage/Work";
import Projects from "./Homepage/Projects";
import ProjectSwiper from "./Homepage/ProjectSwiper";
import Awards from "./Homepage/Awards";
import Experience from "./Homepage/Experience";
import Feedback from "./Homepage/Feedback";
import IntersectionObserverClient from "./Homepage/IntersectionObserverClient";

export default function Elementor() {
  const data = [
    {
      title: "Digital Marketing",
      description:
        "Turning browsers into buyers isn’t magic. It’s precise digital persuasion...",
      link: "/services/digital-marketing",
    },
    {
      title: "Content Marketing",
      description:
        "Content without action is merely decoration...",
      link: "/services/contents-marketing",
    },
    {
      title: "(PPC) Advertising",
      description:
        "Why chase customers when you can strategically appear...",
      link: "/services/digital-marketing/ppc-google-ads-agency",
    },
    {
      title: "Web Designing & Development",
      description:
        "Your website is your digital handshake...",
      link: "/services/web-designing-and-development",
    },
  ];

  return (
    <div data-elementor-type="wp-page" data-elementor-id="17" className="elementor elementor-17">
      <IntersectionObserverClient />
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
}
export const dynamic = "force-static";