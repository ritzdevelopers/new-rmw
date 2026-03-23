import Banner from "@/components/content-marketing/Banner";
import Section2 from "@/components/content-marketing/Section2";
import Section3 from "@/components/content-marketing/Section3";
import Section4 from "@/components/content-marketing/Section4";
import Section5 from "@/components/content-marketing/Section5";
import Section6 from "@/components/content-marketing/Section6";
import Section7 from "@/components/content-marketing/Section7";
import Section8 from "@/components/content-marketing/Section8";
import S6 from "@/components/home-v3/S6";
import S7 from "@/components/home-v3/S7";

function Page() {
    return (
        <>
            <Banner></Banner>
            <Section2></Section2>
            <Section3></Section3>
            <Section4></Section4>
            <Section5></Section5>
            <Section6></Section6>
            <Section7 text="Ready to Transform Your Website from Ordinary to Unforgettable?"></Section7>
            <S6 padding="lg:px-0 md:px-6" padding2="lg:px-0 md:px-6"></S6>
            <S7></S7>
            <Section8></Section8>
        </>
    )
}

export default Page;