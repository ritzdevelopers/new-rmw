import Clients from "../influencer-marketing-agency-in-india/Clients"; 
import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import Section2M from "./sections/Section2M";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";
import Section5M from "./sections/Section5M";
import Section6 from "./sections/Section6";
import Section7 from "./sections/Section7";
import Section8 from "./sections/Section8";
import Section9 from "./sections/Section9";
import Section9M from "./sections/Section9M";
import Section11 from "./sections/Section11";
import Section12 from "./sections/Section12";
function About() {
    return (
        <>
            <Banner />
            <div className="block md:hidden">
                <Section2M />
            </div>
            <div className="hidden md:block">
                <Section2 />
            </div>
            <Section3 />
            <Section4 />
            <div className="block md:hidden">
                <Section5M />
            </div>
            <div className="hidden md:block">
                <Section5 />
            </div>
            <Section6 />
            <Section7 />
            <Section8 />
            <div className="block md:hidden">
                <Section9M />
            </div>
            <div className="hidden md:block">
                <Section9 />
            </div>
            <Clients pd="pt-[35px] lg:pt-[70px]" />
            <Section11 />
            <Section12 />
        </>
    )
}

export default About;