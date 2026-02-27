import React from 'react';

function Section1() {
    return (
        <section className='w-full h-[460px] md:min-h-[500px] lg:min-h-[515px] bg-[url("/home-v3/service-imgs/s1/rmw-service-banner4.jpg")] bg-cover bg-no-repeat bg-center flex md:items-end pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-14 px-4 sm:px-6 md:px-8 lg:px-0
        justify-center items-center md:justify-start
        '>

            {/* Bottom Center Text Container  */}
            <div className='flex flex-col md:gap-5 lg:gap-6 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-none text-center md:text-left'>
                {/* Row 1  Yellow ReactAngle */}
                <div className="md:w-[155px] lg:w-[165px] md:h-[35px] lg:h-[37px] relative text-center md:text-left">
                    <img src="/home-v3/service-imgs/s1/yellow-reactangle.png" alt="" className='w-full h-full object-contain hidden md:block' />
                    <p className="font-[700] uppercase text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-white md:absolute top-[50%] transform translate-y-[-50%] right-4 sm:right-5 md:right-6 lg:right-8">Services</p>
                </div>

                {/* Row 2  */}
                <div className='pl-0 sm:pl-4 md:pl-8 lg:pl-16'>
                    <p className="font-[500] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] xl:text-[21px] text-white leading-tight sm:leading-snug md:leading-normal">Services Tailored to Transform Your Brand from</p>
                    <h1 className="font-[800] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[58px] xl:text-[65px] text-white leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-18 mt-1 sm:mt-2 md:mt-3">
                        "Just Another" <br />
                        to "The one<span className='text-[#C99237]'>.</span>"
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default Section1;