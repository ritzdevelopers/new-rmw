import { BsArrowUpRight } from "react-icons/bs";
import styles from './page.module.css';
function Section2() {
    return (
        <section className={`w-full flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-[70px]`}>
            {/* Centered Align Container   */}
            <div className={`w-full text-center flex flex-col gap-3 sm:gap-4 items-center justify-center max-w-[1175px] ${styles.containerWidth}`}>
                <h2 className={`font-[700] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-tight sm:leading-snug md:leading-normal px-2 sm:px-0 ${styles.fontmontserrat}`}>
                    The digital landscape is, unfortunately, noisier than a crowded fish market. Convention marketing practices are necessary, but are barely effective on their own.
                </h2>
                <p className={`font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] max-w-full sm:max-w-[996px] leading-relaxed px-2 sm:px-0 ${styles.fontopensans}`}>
                    Ritz Media World is a digital marketing agency that specializes in crafting such strategies. We build campaigns persuasive campaigns that are designed to target the customer's psychology through compelling content. These digital campaigns don't just deliver results, they dominate. To reap the benefits of digital marketing, our team provides and executes on multiple fronts, including but not limited to SEO, PPC, and Social Media.
                </p>
                <button className="w-[140px] sm:w-[150px] lg:w-[154px] h-[42px] sm:h-[44px] lg:h-[46px] flex justify-between items-center gap-2 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
                    <p className={`font-[500] text-[14px] sm:text-[15px] lg:text-[16px] ${styles.fontmontserrat}`}>Contact us</p>
                    <div className="bg-[#C99237] h-[34px] w-[34px] sm:h-[36px] sm:w-[36px] md:h-[38px] md:w-[38px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-white">
                        <BsArrowUpRight className="text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px]" />
                    </div>
                </button>
            </div>
        </section>
    )
}

export default Section2;