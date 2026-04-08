import S6 from "@/components/home-v3/S6";
import Banner from "@/components/radio-advertising-services/Banner";
import Section2 from "@/components/radio-advertising-services/Section2";
import Section3 from "@/components/radio-advertising-services/Section3";
import Section4 from "@/components/radio-advertising-services/Section4";
import Section4Mobile from "@/components/radio-advertising-services/Section4Mobile";
import Section5 from "@/components/radio-advertising-services/Section5";
import Section6 from "@/components/radio-advertising-services/Section6";
import Section7 from "@/components/radio-advertising-services/Section7"; 
import S7 from "@/components/home-v3/S7";
import Section9 from "@/components/print-advertising/Section9";
function Page() {
    return (
        <>
           <Banner />
           <Section2 />
           <Section3 />
           <Section4 />
           <Section4Mobile />
           <Section5 />
           <Section6 imgPath="/radio-advertising-page/radio-graphics.png"/>
           <Section7 />
           <S6 padding="lg:px-0 md:px-6" padding2="lg:px-0 md:px-6"></S6>
           <S7></S7>
           <Section9 />
        </>
    )
}

export default Page;