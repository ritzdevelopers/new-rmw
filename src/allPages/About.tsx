// import Choose from "./aboutPage/Choose";
import Experts from "./aboutPage/Experts";
import Work from "./Homepage/Work";
import Stratagies from "./aboutPage/Stratagies";
import AboutFirst from "./aboutPage/AboutFirst";
import AboutAward from "./aboutPage/AboutAward"
import Footer from "@/components/footer/Footer";
import Swiper1 from "./aboutPage/Swiper1";
import Swiper2 from "./aboutPage/Swiper2";
import Experience from "./Homepage/Experience";

const About = () => {
    
    return(
        <>
        <AboutFirst/>
        <Stratagies/>
        <AboutAward/>
        <Swiper1/>
        <Swiper2/>
        <Experts/>
        <Work/>
        <Experience/>
        <Footer/>
        </>
    )
}

export default About;