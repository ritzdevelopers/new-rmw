import React from 'react';
import styles from './webDevelopment.module.css';

function Section1() {
    return (
        <section
            className={`w-full h-[450px] md:h-[300px] md:min-h-[300px] lg:h-[462px] lg:min-h-[462px] xl:h-[510px] xl:min-h-[510px] xxl:h-auto xxl:min-h-[615px] 
             bg-[url("/webDevelopment/tab-web-devlopment-.jpg")] md:bg-[url("/webDevelopment/banner.jpg")] bg-cover bg-no-repeat bg-center flex md:items-stretch lg:items-end pb-8 sm:pb-12 md:pb-3 lg:pb-10 xl:pb-26 px-4 sm:px-6 md:px-0 overflow-visible justify-center items-center md:justify-start  `}>

            {/* Bottom Center Text Container  */}
            <div className='flex flex-col md:gap-2 lg:gap-3 xl:gap-4 w-full max-lg:max-w-none lg:max-w-none text-left md:text-left md:h-full justify-start md:justify-end lg:h-auto lg:justify-end -translate-y-13 md:translate-y-0 lg:translate-y-3 xl:translate-y-17'>
                {/* Row 1  Yellow ReactAngle */}
                <div className="hidden md:block md:w-[160px] xl:w-[170px]  md:h-[30px] xl:h-[37px] relative">
                    <img src="/home-v3/service-imgs/s1/yellow-reactangle.png" 
                    alt="Ritz Media World – influencer marketing" title="Ritz Media World – influencer marketing" className='w-full h-full' />
                    <p className={`font-[700] uppercase text-[16px] text-white absolute top-[50%] transform translate-y-[-50%] right-8 leading-tight ${styles.montserrat} `}>Services</p>
                </div>

                {/* Row 2  */}
                <div className={`px-0 sm:px-4 md:px-[40px] lg:px-[45px] xl:px-[48px] gap-2 md:gap-3 lg:gap-4`}>

                    <h1 className={`text-white leading-[45px]  md:leading-[40px] lg:leading-[45px] xl:leading-[45px] mt-1 sm:mt-2 md:mt-0  xl:mt-6 lg:py-0 xl:py-0 text-center md:text-left`}>
                        <span className="max-md:inline-block max-md:whitespace-nowrap md:contents lg:inline-block lg:whitespace-nowrap lg:translate-y-2 xl:translate-y-0 xl:contents">
                            <span
                                className={`text-[28px] md:text-[28px] lg:text-[35px] xl:text-[55px] leading-tight lg:leading-[10px] ${styles.montserratExtraBold}`}
                            >
                                Web Development{" "}
                            </span>



                        </span></h1>
                    <h2 className={` text-center md:text-left text-[15px] md:text-[14px] lg:text-[15px] xl:text-[21px] xxl:text-[21px]  text-white leading-[24px] md:leading-snug w-full max-md:max-w-none md:max-w-[320px] lg:max-w-[350px] xl:max-w-[690px] xxl:max-w-[750px] md:mb-2 lg:mb-0 xl:mb-[0] mb-[4px] ${styles.montserratMedium}`} >Custom, responsive and conversion focused website development for your brand</h2>


                </div>
            </div>
        </section>
    )
}

export default Section1;