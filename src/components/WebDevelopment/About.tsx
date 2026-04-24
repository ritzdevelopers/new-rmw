import Image from "next/image";
import Link from "next/link";
import styles from './webDevelopment.module.css';

const EXPLORE_ARROW_IMAGE =
    "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section2() {
    return (
        <section className="w-full flex items-center justify-center py-[35px] lg:py-[50px] bg-white">
            <div className="w-[100%] md:w-[100%] lg:w-[100%] xl:w-[80%] text-center mx-auto px-4 md:px-[40px] lg:px-[50px] min-[1370px]:!w-[1300px] min-[1370px]:!max-w-[1300px] min-[1370px]:mx-auto">
                <p
                    className={`text-black  text-[20px] sm:text-[20px] md:text-[20px] lg:text-[24px]xl:text-[30px]  leading-[30px]   md:leading-[28px] lg:leading-[28px] xl:leading-[34px] mx-auto ${styles.montserrat}  `}

                >
                    <span className="font-normal">In digital marketing, your website isn’t merely a collection of pages, it’s your brand’s</span><br className="hidden lg:block" /><span className="font-normal">most persuasive spokesperson.</span> <span className="text-black font-bold">Ritz Media World, </span><span className="font-normal">
                        websites with a purpose, through<br className="hidden lg:block" />our unique combination of custom web development, responsive design and website <br className="hidden lg:block" /> performance optimization we create websites that deliver real results for your business.
                    </span>
                </p>

                <div
                    className={`${styles.fontopensans} mt-2 md:mt-3 lg:mt-4 xl:mt-5 text-black text-[14px]  md:text-[15px] leading-[23px] md:leading-[25px] lg:text-[16px] w-full  mx-auto text-center space-y-3 md:space-y-4`}
                >
                    <p>
                        Recognised as a trustworthy web development company in India, a go-to option for any  business looking for a web   <br className="hidden lg:block" /> development company near me, we provide web developmentand web designing services in Delhi NCR as well.  <br className="hidden lg:block" />We provide excellent web designing services in Noida, Greater Noida and Delhi, creating all websites to have <br className="hidden lg:block" /> a high ranking, faster loading speeds, and better conversion rates.

                    </p>
                    <p>Be it a custom made website, a CMS powered platform such as WordPress, or an e-commerce solution built to convert  <br className="hidden lg:block" /> visitors into customers with secure payment gateways, API integrations and detailed tracking, we build all the  elements  <br className="hidden lg:block" />  to perform better. Our landing pages are developed with A/B testing, CRO (Conversion Rate Optimization),  lead generation  <br className="hidden lg:block" /> funnels, turning traffic into concrete results.</p>
                </div>

                <div className={`w-full flex justify-center items-center ${styles.montserrat}`}>
                    <Link href="/contact.html" target="_blank" aria-label="Let's Talk Today" className="mt-4 lg:mt-5 flex  items-center justify-center gap-4 letsTalkToday p-0 xl:p-3 rounded-[5px] letsTalkToday">
                        <span
                            className="text-[18px]   md:text-[20px] font-[500]"

                        >
                            Let&apos;s Talk Today
                        </span>
                        <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors letsTalkTodayIcon">
                            <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" className="text-white text-[16px]" />
                        </span>
                    </Link></div>

            </div>
        </section>
    );
}
