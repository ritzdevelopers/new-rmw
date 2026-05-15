import styles from "./page.module.css";
import s3 from "./Section3.module.css";

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
        <section className={`w-full py-[40px] xl:py-[70px] flex justify-center items-center ${s3.root}`}>
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col gap-10 md:gap-22 ${styles.containerWidth} ${s3.container}`}>
                {
                    data.map((item, idx) => {
                        return (
                            <div
                                key={item.title}
                                className={`flex w-full flex-col-reverse items-center justify-between gap-0 md:items-stretch ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} ${s3.row}`}
                            >
                                {/* Text column (first in DOM; stacks under image below md via flex-col-reverse) */}
                                <div className={`relative mt-4 flex w-full flex-col gap-2 items-center text-center md:mt-4 md:w-[calc(100%-477px)] ${idx % 2 === 0 ? "md:items-start md:text-start" : "md:items-end md:text-end"} ${s3.leftCol}`}>

                                    {/* Top rule — desktop / tablet only */}
                                    <div
                                        className={`hidden h-[40px] w-full border-b border-[#0F1640] md:absolute md:inset-0 md:block ${s3.absLine}`}
                                        aria-hidden
                                    />

                                    {/* Row 1  */}
                                    <div
                                        className={`w-full flex gap-4 items-center justify-center pl-0 md:items-end md:pl-1 ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"} ${s3.titleRow}`}
                                    >
                                        <p className={`flex flex-col md:flex-row font-[700] md:text-[36px] text-[24px] text-[#0F1640] ${styles.fontmontserrat} ${s3.title}`}>
                                            <span className={`font-[500] md:text-[16px] text-[13px] mr-4 ${s3.idx}`}>0{idx + 1}.</span>
                                            {item.title}</p>
                                    </div>
                                    {/* Row 2  */}
                                    <div
                                        className={`ml-0 flex flex-col gap-4 items-center text-center md:ml-9 ${idx % 2 === 0 ? "md:items-start md:text-start" : "md:items-end md:text-end"} ${s3.bodyRow}`}
                                    >
                                        <p className={`mx-auto font-[400] text-[14px] max-w-[640px] md:mx-0 md:text-[16px] ${styles.fontpoppins} ${s3.desc}`}>
                                            {item.description}
                                        </p>
                                        <a href={item.link} target="_blank" className={`w-[40px] cursor-pointer h-[40px] rounded-full bg-[#C99237] hover:bg-[#0F1640] flex justify-center items-center ${s3.cta}`}>
                                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                                <rect x="2.19672" y="16.7171" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19672 16.7171)" fill="white" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Image column (second in DOM; appears first below md via flex-col-reverse) */}
                                <div className={`h-auto w-full shrink-0 md:w-[477px] ${s3.imgCol}`}>
                                    <img src={`${item.image}`} alt={item.title} className="h-auto w-full" />
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