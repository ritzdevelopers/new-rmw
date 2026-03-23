import Image from "next/image";
import styles from "./page.module.css"

function Section4() {
    return (
        <section className="w-full py-[70px] flex justify-center items-center">
            {/* Centered Align Container  */}
            <div className={`w-full flex justify-between items-stretch gap-4 ${styles.containerWidth}`}>
                {/* Left Side Container  */}
                <div className="w-[603px] h-[566px] shrink-0 relative">
                    <Image src={'/slug/s3/seo-s3-img1.jpg'} fill alt="SEO"></Image>
                </div>

                {/* Right Side Container — stretches to row height (matches tallest sibling) */}
                <div className="flex min-h-0 flex-1 flex-col justify-between self-stretch max-w-[593px] w-full">
                    {/* Row 1  */}
                    <div>
                        <h2 className={`font-[700] text-[36px] ${styles.fontmontserrat}`}>We’re Award-Winning
                            Development Agencies</h2>
                        <p className={`font-[400] text-[16px] ${styles.fontpoppins}`}>
                            We’ve held hands with budding brands that have shattered sealings of convention. With us behind them, they have achieved great feats in their industry and went on to dominate their competition.
                        </p>
                    </div>

                    {/* Row 2  */}
                    <div className="flex justify-between gap-2">
                        <div>  <img src="/services-v3-slug/s4/17_plus.png" alt="" className="w-[429px] h-auto" /></div>

                        <div className="flex flex-col gap-2 justify-center items-center">
                            <h4 className={`font-[600] text-[50px] ${styles.fontmontserrat}`}>300+</h4>
                            <p className={`font-[400] text-[14px] ${styles.fontopensans}`}>Success Projects</p></div>
                    </div>

                    {/* Row 3  */}
                    <div className="w-full flex flex-col gap-4 justify-between">
                        <ul className={`font-[400] text-[14px] list-none md:list-disc pl-4 flex flex-col gap-2 sm:gap-3  text-center md:text-left mb-4 md:mb-0 [&>li::marker]:text-[20px] ${styles.fontpoppins}`}>
                            <li>Your site will be more accessible & visible with creative optimization</li>
                            <li>Optimize your web pages to boost brand rankings</li>
                            <li>Increase your sales with high-quality SEO customized services</li>
                        </ul>
                        <div>
                            <button className="flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
                                <p className={`font-[500] text-[18px] ${styles.fontmontserrat}`}>More about us</p>
                                <div className="w-[40px] h-[40px] bg-[#C99237] rounded-full flex justify-center items-center">

                                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.4276 2.92383L17.1346 9.08052L12.9492 4.01635L19.4276 2.92383Z" fill="white" />
                                        <rect x="2.19672" y="16.7173" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19672 16.7173)" fill="white" />
                                    </svg>

                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Section4;