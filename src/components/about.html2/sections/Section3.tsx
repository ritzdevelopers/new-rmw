import styles from "./page.module.css";
function Section3() {
    const data = [
        {
            title: "Brand Identity",
            description: "As a leading creative digital marketing agency and a top branding agency in Delhi NCR, we design visual systems that strengthen brand recognition and long lasting growth. Branding advancements given by us help businesses to compete efficiently in Delhi NCR and pan India level.",
            image: "/new-about-imgs/s3/abt-s3-img1.jpg",
            link: "https://ritzmediaworld.com/services/creative-services/branding-and-identity-development"
        },
        {
            title: "Advertising Design",
            description: "Among the top PPC Company in Delhi and Noida, and the best advertising agencies in India, our print advertising services are managed with perfection and are aligned with the newspaper ad cost planning which includes TOI newspaper ad cost and Dainik Jagran newspaper ad cost. We maximize visibility, budgets and ROI thanks to expert knowledge.",
            image: "/new-about-imgs/s3/abt-s3-img2.jpg",
            link: "https://ritzmediaworld.com/services/print-advertising/advertisement-designing"
        },
        {
            title: "Content Marketing",
            description: "As a creative digital marketing agency and one of Delhi NCR’s best advertising agencies, we provide strategic content marketing designed for enhanced visibility and better search ranking. The SEO optimized content, creatives focused on performance, and brand storytelling help businesses generate high intent audiences. ",
            image: "/new-about-imgs/s3/abt-s3-img3.jpg",
            link: "https://ritzmediaworld.com/services/contents-marketing"
        },
        {
            title: "Digital Marketing",
            description: "We offer a range of digital marketing services with always maximum ROI. From paid advertising and performance marketing to social media marketing and search engine marketing, our digital marketing solutions are geared for a competitive marketplace.",
            image: "/new-about-imgs/s3/abt-s3-4.jpg",
            link: "https://ritzmediaworld.com/services/digital-marketing"
        },
    ]
    return (
        <section className="w-full py-[40px] xl:py-[70px] flex justify-center items-center">
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col gap-22 ${styles.containerWidth}`}>
                {
                    data.map((item, idx) => {
                        return (
                            <div className={`w-full flex justify-between ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                {/* Left Side Div  */}
                                <div className={`flex flex-col mt-4 gap-2 relative w-[calc(100%-477px)]`}>

                                    {/* Abs Div  */}
                                    <div className="w-full absolute inset-0 h-[40px] border-b border-[#0F1640]"></div>


                                    {/* Row 1  */}
                                    <div className={`w-full flex gap-4 items-end pl-1 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                        <p className={`font-[700] text-[36px] text-[#0F1640] ${styles.fontmontserrat}`}>
                                            <span className={"font-[500] text-[16px] mr-4"}>0{idx + 1}.</span>
                                            {item.title}</p>
                                    </div>
                                    {/* Row 2  */}
                                    <div className={` flex gap-4 ml-9 flex-col ${idx % 2 === 0 ? "items-start text-start" : "items-end text-end"}`}>
                                        <p className={`font-[400] text-[16px] max-w-[640px] ${styles.fontpoppins}`}>
                                            {item.description}
                                        </p>
                                        <a href={item.link} target="_blank" className="w-[40px] cursor-pointer h-[40px] rounded-full bg-[#C99237] flex justify-center items-center">
                                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                                <rect x="2.19672" y="16.7171" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19672 16.7171)" fill="white" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Right Side Div  */}
                                <div className="w-[477px] h-auto">
                                    <img src={`${item.image}`} alt="about" className="w-full h-auto" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Section3;