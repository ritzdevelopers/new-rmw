import React from 'react';
import styles from './Section1.module.css';
function Section1() {
    return (
        <section className='w-full h-[550px] md:h-[300px] md:min-h-[300px] lg:h-[400px] lg:min-h-[400px] xl:h-auto xl:min-h-[615px] bg-[url("/varun/influencer-marketing/influencer-marketing-banner.png")] md:bg-[url("/service-v3/influencer-marketing-agency-in-india/banner/bg-influencer.jpg")] bg-cover bg-no-repeat bg-center flex md:items-stretch lg:items-end pb-8 sm:pb-12 md:pb-3 lg:pb-10 xl:pb-26 px-4 sm:px-6 md:px-0 overflow-visible
        justify-center items-center md:justify-start
        '>

            {/* Bottom Center Text Container  */}
            <div className='flex flex-col md:gap-2 lg:gap-3 xl:gap-6 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-none text-center md:text-left md:h-full md:justify-end lg:h-auto lg:justify-start -translate-y-14 sm:-translate-y-16 md:translate-y-0 lg:translate-y-3 xl:translate-y-0'>
                {/* Row 1  Yellow ReactAngle */}
                <div className="hidden lg:block lg:w-[182px] lg:h-[30px] xl:h-[37px] relative">
                    <img src="/home-v3/service-imgs/s1/yellow-reactangle.png" alt="" className='w-full h-full' />
                    <p className={`font-[700] uppercase text-[16px] text-white absolute top-[50%] transform translate-y-[-50%] right-8 ${styles.fontmontserrat}`}>Services</p>
                </div>

                {/* Row 2  */}
                <div className='pl-0 sm:pl-4 md:pl-8 lg:pl-16'>
                    <h1 className="text-white leading-[1.1] sm:leading-[1.15] md:leading-tight lg:leading-snug xl:leading-16 mt-1 sm:mt-2 md:mt-0 lg:mt-2 xl:mt-3 lg:py-0 xl:py-0">
                        <span className="max-md:inline-block max-md:whitespace-nowrap md:contents lg:inline-block lg:whitespace-nowrap lg:translate-y-2 xl:translate-y-0 xl:contents">
                          <span
                            className={`${styles.bannerHeadlineSm} font-[800] md:text-[26px] lg:text-[30px] lg:font-[600] xl:text-[55px] xl:font-[800]`}
                            style={{ fontFamily: "MontserratExtraBold" }}
                          >
                            Influencer Marketing{' '}
                          </span>
                          <br className="hidden md:block lg:hidden xl:block" />
                          <span
                            className={`${styles.bannerHeadlineSm} font-[500] md:text-[26px] lg:text-[30px] lg:font-[600] xl:text-[65px] xl:font-[500] ${styles.bannerServicesMatchLg}`}
                            style={{ fontFamily: "MontserratMedium" }}
                          >
                            Services
                          </span>
                        </span>
                        <p className={`font-[500] mt-2 lg:mt-5 xl:mt-2 text-[14px] sm:text-[16px] md:text-[13px] lg:text-[15px] lg:font-[400] xl:text-[21px] xl:font-[500] text-white leading-tight sm:leading-snug md:leading-snug md:max-w-[300px] lg:max-w-[350px] xl:max-w-none md:mb-2 lg:mb-3 xl:mb-[20px] mb-[20px]`} style={{ fontFamily: "MontserratMedium" }}>Maximize Engagement & Conversions With Result-driven Influencer Campaigns</p>
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default Section1;