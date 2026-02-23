import Image from "next/image";
import styles from "./page.module.css";
function Section5() {
    return (
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-[70px] flex justify-center items-center border-b border-[#D9D9D9]">
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col ${styles.containerWidth} gap-6 sm:gap-8 md:gap-9 lg:gap-10 xl:gap-10`}>
                {/* Row 1  */}
                <div className="w-full">
                    {/* Top Row  */}
                    <div className="w-full flex flex-col md:flex-row lg:flex-nowrap xl:flex-nowrap xl:h-[252px] gap-0">
                        <div className="w-full md:flex-1 lg:flex-none lg:w-[300px] xl:w-[415px] flex justify-center items-center text-center py-6 sm:py-8 md:py-10 bg-[#F1F1F1]">
                            <h3 className="font-[700] text-[24px] sm:text-[28px]  xl:text-[36px]">Why Content <br /> Marketing Matters</h3>
                        </div>
                        <div className="w-full md:flex-1 lg:flex-none lg:w-[300px] xl:w-[415px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-col gap-2 sm:gap-3 pt-4 sm:pt-5 md:pt-6 xl:pt-6">
                            <h6 className="font-[700] text-[16px] sm:text-[18px] md:text-[19px] xl:text-[20px]">Increase Organic Traffic</h6>
                            <p className="font-[400] text-[14px] sm:text-[15px] xl:text-[16px] max-w-full xl:max-w-[313px]">SEO is a key factor for your website to get ranked in the search engines and if that happens, more people looking for answers will be able to find your page.
                            </p>
                        </div>
                        <div className="w-full md:flex-1 lg:flex-none lg:w-[300px] xl:w-[415px] xl:h-[252px]">
                            <img src="/service-v3/content-marketing/s5/s5-i1.jpg" alt="Why Content Marketing Matters" className="w-full h-auto xl:h-full object-cover" />
                        </div>
                    </div>

                    {/* Bottom Row  */}
                    <div className="w-full flex flex-col md:flex-row lg:flex-nowrap xl:flex-nowrap xl:h-[202px] gap-0">
                        <div className="w-full md:flex-1 lg:flex-none lg:w-[300px] xl:w-[415px] flex flex-col gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10 pt-4 sm:pt-5 md:pt-6 xl:pt-6">
                            <h6 className="font-[700] text-[16px] sm:text-[18px] md:text-[19px] xl:text-[20px]">Build Trust & Authority</h6>
                            <p className="font-[400] text-[14px] sm:text-[15px] xl:text-[16px] max-w-full xl:max-w-[313px]">Producing informative content can be a key factor in your company gaining the status of an authority figure in the market.

                            </p>
                        </div>
                        <div className="w-full md:flex-1 lg:flex-none lg:w-[300px] xl:w-[415px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10 border border-[#DFDDDD] flex flex-col gap-2 sm:gap-3 pt-4 sm:pt-5 md:pt-6 xl:pt-6">
                            <h6 className="font-[700] text-[16px] sm:text-[18px] md:text-[19px] xl:text-[20px]">Encourage Engagement & <br className="hidden xl:block" /> Conversation</h6>
                            <p className="font-[400] text-[14px] sm:text-[15px] xl:text-[16px] max-w-full xl:max-w-[313px]">Creating content for your audience that resonates will lead to engagement, sharing, and conversions.
                            </p>
                        </div>
                        <div className="w-full md:flex-1 lg:flex-none lg:w-[300px] xl:w-[415px] flex flex-col gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10 pt-4 sm:pt-5 md:pt-6 xl:pt-6">
                            <h6 className="font-[700] text-[16px] sm:text-[18px] md:text-[19px] xl:text-[20px]">Increase Sales & Lead <br className="hidden xl:block" /> Generation</h6>
                            <p className="font-[400] text-[14px] sm:text-[15px] xl:text-[16px] max-w-full xl:max-w-[313px]">Content is a major driver behind sales from signing up to newsletters to purchasing. </p>
                        </div>
                    </div>
                </div>

                {/* Row 2  */}
                <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 xl:gap-0">
                    {/* Left Side Container  */}
                    <div className="w-full xl:flex-[2] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[430px] relative">
                        <Image src="/service-v3/content-marketing/s5/s5-i2.jpg" alt="Why Content Marketing Matters" fill className="object-cover" />
                    </div>

                    {/* Right Side Container  */}
                    <div className="w-full px-8 xl:flex-1 h-auto xl:h-[430px] relative flex flex-col justify-between ">
                        {/* Top Row  */}
                        <div className="flex flex-col w-full ">

                            {/* Years Of Working Image  */}
                            <img src="/service-v3/content-marketing/s5/17-yow.png" alt="Why Content Marketing Matters" className="w-full h-auto object-cover" />

                            {/* Google Reviews Image  */}
                            <img src="/service-v3/content-marketing/s5/google-reviews.png" alt="Why Content Marketing Matters" className="w-full sm:w-[271px] h-auto object-cover" />
                        </div>

                        {/* Bottom Row  */}
                        <div className="w-full border-t border-[#D9D9D9] pt-3 sm:pt-4 xl:pt-3 flex justify-between gap-4 sm:gap-6 xl:gap-0">
                            {/* Left Side Container  */}
                            <div className="flex flex-col gap-1 sm:gap-2">
                                <h6 className="font-[700] text-[32px] sm:text-[40px] md:text-[45px] xl:text-[50px] text-[#0F1640]">1M+</h6>
                                <p className="font-600 text-[12px] sm:text-[14px] xl:text-[16px] text-[#0F1640]">Creatives Published</p>
                            </div>

                            {/* Right Side Container  */}
                            <div className="flex flex-col gap-1 sm:gap-2">
                                <h6 className="font-[700] text-[32px] sm:text-[40px] md:text-[45px] xl:text-[50px] text-[#0F1640]">500+</h6>
                                <p className="font-600 text-[12px] sm:text-[14px] xl:text-[16px] text-[#0F1640]">Success Stories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section5;