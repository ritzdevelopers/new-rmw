"use client";
import Image from "next/image";
import styles from './page.module.css';

function Section5() {
    return (
        <section className="w-full flex justify-center items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-[70px] pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-[70px]">

            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-10 ${styles.containerWidth}`}>

                {/* Top Container  */}
                <div className="w-full flex flex-col text-center justify-center items-center gap-2 sm:gap-3 px-4 sm:px-0">
                    <p className="font-[600] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-[#C99237] uppercase">Excellence</p>
                    <h2 className="font-[700] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] text-[#000000] leading-tight sm:leading-snug px-2 sm:px-0">Why Leading Brands Choose Our IT Solutions</h2>
                    <p className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-[#000000]">Built for Innovation. Chosen for Results.</p>
                </div>

                {/* Bottom Container   */}
                <div className="w-full flex flex-col gap-3 sm:gap-4">
                    {/* Row 1  */}
                    <div className="flex flex-col lg:flex-row w-full justify-between gap-3 sm:gap-4">
                        {/* Left Side Container  */}
                        <div className="w-full lg:w-[827px] h-[200px] sm:h-[250px] md:h-[280px] lg:h-[319px] relative">
                            <Image src="/service-v3/layer1/s5/s5-team-img.jpg" alt="Why Leading Brands Choose Our IT Solutions" fill className="object-cover" />


                            <div className="absolute left-0 bottom-0 bg-white max-w-full lg:max-w-[417px] py-3 sm:py-4 lg:py-5 px-3 sm:px-4 lg:px-5">
                                <p className="font-[600] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] max-w-[95%] lg:max-w-[90%] leading-tight sm:leading-normal">A Skilled Team Delivering Reliable Technology Solutions That Drive Business Growth</p>
                            </div>
                        </div>

                        {/* Right Side Container  */}
                        <div className="flex flex-col justify-between gap-3 sm:gap-4 w-full lg:w-[397px] h-auto sm:h-[250px] md:h-[280px] lg:h-[319px] bg-[#0F1640] py-4 sm:py-5 lg:py-4 px-4 sm:px-5 lg:px-6">
                            {/* Top Row  */}
                            <div>
                                <p className="font-[400] text-[14px] sm:text-[15px] lg:text-[16px] text-white">Facts & Numbers</p>
                            </div>

                            {/* Bottom Row  */}
                            <div>
                                <h3 className="font-[600] text-[50px] sm:text-[60px] md:text-[70px] lg:text-[80px] text-white leading-none">89<span className="text-[30px] sm:text-[38px] md:text-[45px] lg:text-[50px]">%</span></h3>
                                <p className="font-[400] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-white leading-tight sm:leading-normal mt-2 sm:mt-3">to customers recommend <br />
                                    <span className="font-[800] ">RITZ MEDIA WORLD </span>
                                    services </p>
                            </div>
                        </div>
                    </div>

                    {/* Row 2  */}
                    <div className="flex flex-col lg:flex-row w-full justify-between gap-3 sm:gap-4">
                        <div className="w-full lg:w-[397px] h-auto sm:h-[280px] lg:h-[319px] flex flex-col justify-between gap-3 sm:gap-4 bg-[#FFF2DD] py-4 sm:py-5 lg:py-4 px-4 sm:px-5 lg:px-6">
                            {/* Row 1  */}
                            <div className="flex w-full justify-between gap-2 sm:gap-4">
                                <div className="flex flex-col gap-1 sm:gap-2">
                                    <p className="font-[500] text-[32px] sm:text-[40px] md:text-[45px] lg:text-[50px] leading-none">1B+</p>
                                    <h4 className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">Creatives Published</h4>
                                </div>
                                <div className="flex flex-col gap-1 sm:gap-2">
                                    <p className="font-[500] text-[32px] sm:text-[40px] md:text-[45px] lg:text-[50px] leading-none">500+</p>
                                    <h4 className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">Success Stories</h4>
                                </div>
                            </div>

                            {/* Row 2  */}
                            <div className="w-full sm:w-[220px] lg:w-[269px] h-[80px] sm:h-[95px] lg:h-[111px] relative mx-auto sm:mx-0">
                                <Image src="/home-v3/clients/reviews-black.png" alt="Why Leading Brands Choose Our IT Solutions" fill className="object-contain" />
                            </div>
                        </div>

                        <div className="w-full lg:w-[827px] h-auto sm:h-[350px] md:h-[380px] lg:h-[319px] relative bg-[#F7F7F7] flex flex-col justify-between gap-3 sm:gap-4 py-4 sm:py-5 lg:py-4 px-4 sm:px-5 lg:px-6">
                            {/* Top Static Row  */}
                            <div className="w-full flex justify-between items-center">
                                <p className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] uppercase">reviews</p>
                                <div className="flex gap-3 sm:gap-4">
                                    <button className="cursor-pointer hover:opacity-80 transition-opacity">
                                        <img src="/lft.svg" alt="" className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]" />
                                    </button>
                                    <button className="cursor-pointer hover:opacity-80 transition-opacity">
                                        <img src="/rght.svg" alt="" className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]" />
                                    </button>
                                </div>
                            </div>
                            {/* Bottom Dynamic Slider Container */}
                            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 max-w-full lg:max-w-[90%]">
                                <p className="font-[400] text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed">
                                    "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand's sustenance but have also got me a great number of quality leads."
                                </p>

                                <div className="flex flex-col gap-1 sm:gap-2">
                                    <p className="font-[700] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]">Madhusudan Ghee</p>
                                    <p className="font-[400] text-[12px] sm:text-[13px] lg:text-[14px]">Managing Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section5;