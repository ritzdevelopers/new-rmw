
import styles from './page.module.css';
function Section2() {
    return (
        <section className={`w-full flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-[70px]`}>
            {/* Centered Align Container   */}
            <div className={`w-full text-center flex flex-col gap-3 sm:gap-4 items-center justify-center max-w-[1075px] ${styles.containerWidth}`}>
                <h2 className={`font-[400] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-tight sm:leading-snug md:leading-normal px-2 sm:px-0 ${styles.fontmontserrat}`}>
                    Content without strategy is mere decoration, pleasant but ineffective. At Ritz Media World, one of India’s leading <span className="font-[700]">digital marketing agencies</span>, we develop content marketing strategies that not only inform but also persuade, inspire, and convert.
                </h2>
                <p className={`font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] max-w-full sm:max-w-[896px] leading-relaxed px-2 sm:px-0 ${styles.fontopensans}`}>
                    Our strategy includes <span className="font-[700]">SEO content, social media content, email marketing, video content, infographics</span>, and <span className="font-[700]">promotional activities</span> to capture attention, build credibility, and drive measurable business results. Each piece of content is designed for <span className="font-[700]">high engagement, lead generation</span>, and <span className="font-[700]">brand building</span>.
                </p>
            </div>
        </section>
    )
}

export default Section2;