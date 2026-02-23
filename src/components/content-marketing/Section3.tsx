"use client";
import { useState } from "react";
import S3SliderCard from "./cards/S3SliderCard";
import styles from "./page.module.css";
function Section3() {
    const [activeCard, setActiveCard] = useState(0);
    const cardsData = [
        {
            image: "/service-v3/content-marketing/s3/Customized-content-strategy.jpg",
            title: "Customized content strategy",
            desc: "Generic content yields generic results. At Ritz Media World, we develop personalized content marketing campaigns that suit your brand, audience, and goals. Our content marketing strategy is a result of expert insights, search engine optimization, and creative storytelling that ensures every word counts and every word drives readers to act and convert.",

        },
        {
            image: "/service-v3/content-marketing/s3/ctm-s3-i1.png",
            title: "Email and Newsletter Marketing",
            desc: "Boost your business to the next level with our email marketing and newsletters solutions. We design customized email marketing campaigns that not only engage your subscribers but also help you generate high conversions. From automated campaigns or a promotional newsletter, our approach ensures that every email gives you a measurable return on investment (ROI).",

        },
        {
            image: "/service-v3/content-marketing/s3/Asset-Creation-Infographics.jpg",
            title: "Asset Creation and Infographics",
            desc: "Use our content asset creation and infographics services to bring your brand to life. We create visual content, infographics, and digital assets that make complex information simple, increase engagement, and boost social media reach. Our graphic content strategies will help your business communicate ideas effectively and make your brand more visible on the internet.",

        },
        {
            image: "/service-v3/content-marketing/s3/Customized-content-strategy.jpg",
            title: "Content Promotion and Optimization",
            desc: "Undiscovered great content means wasted opportunity. At Ritz Media World, we maximize the reach and conversion potential of your content by promoting and optimizing it across all platforms. Through the strategic application of SEO, social media marketing, and paid advertising, we ensure that the right people are reached, and our results are constantly refined for maximum ROI.",

        },
    ]
    return (
        <section className="w-full pt-[70px] flex justify-center gap-10 items-center flex-col border-t border-[#D9D9D9]">
            {/* Heading Container  */}
            <div className="w-full flex flex-col gap-2 items-center justify-center ">
                <p className={`font-[600] text-[16px] uppercase text-[#C99237] ${styles.fontpoppins}`}>Services</p>
                <h2 className={`font-[700] text-[36px] ${styles.fontmontserrat}`}>What We Provide</h2>
                <p className={`font-[400] text-[16px] ${styles.fontopensans}`}>Is more than what you’ll ever need</p>
            </div>

            {/* Bottom Cinntainer Animated Slider */}
            <div className="w-full bg-[#0F1640] flex justify-between h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[631px] overflow-x-hidden">

                {/* Centered Align Container  */}
                <div className={`w-full h-full flex overflow-x-hidden ${styles.containerWidth2}`}>
                    {
                        cardsData.map((item: any, index: number) => {
                            return (
                                <S3SliderCard 
                                    key={index} 
                                    index={index} 
                                    image={item.image}
                                    title={item.title} 
                                    desc={item.desc} 
                                    activeCard={activeCard}
                                    setActiveCard={setActiveCard}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Section3;