"use client"
import Image from 'next/image'
import React from 'react'

function S4() {
    return (
        <section className='w-full min-h-screen bg-white flex justify-center items-center flex-col gap-20 py-20'>
            {/* Center Align Container 1 */}
            <div className='w-[90%] h-[95%] flex flex-col gap-6'>
                {/* Top Row  */}
                <div className="w-full flex items-center justify-between">
                    {/* Left Side Container  */}
                    <div>
                        <p className='font-[600] text-[16px] text-[#C99237] uppercase'>PRoven result</p>
                        <h2 className='font-[700] text-[36px]'>Success Stories That Inspire</h2>
                        <p className='font-[400] text-[16px]'>Real challenges. Creative solutions. Measurable results</p>
                    </div>

                    <div className="flex gap-2">
                        <img src="/home-v3/s3/lftb.png" alt="RMW" className='w-[27px] h-[27px] cursor-pointer' />
                        <img src="/home-v3/s3/rhgt.png" alt="RMW" className='w-[27px] h-[27px] cursor-pointer' />
                    </div>
                </div>

                {/* Bottom Row  */}
                <div className='w-full h-[395px]'>
                    {/* Slider Wrapper  */}
                    <div className="w-full h-full flex justify-start gap-16">
                        <div className='h-full w-[590px] relative'>
                            <Image src={"/home-v3/s3/v2s3i1.png"} alt='RMW' fill></Image>
                        </div>

                        <div className='w-[604px] flex flex-col gap-5'>
                            <p className='font-[600] text-[18px] text-[#C99237]'>Luxury Real Estate</p>
                            <h2 className='font-[600] text-[26px]'>Digital Advertising</h2>
                            <p>Our digital advertising case studies showcase how smart targeting, compelling creatives, and data-driven optimisation translate into real business outcomes. Explore how brands across sectors achieved higher visibility, stronger engagement, and measurable conversions through strategic, performance-focused campaigns.</p>

                            <div className='w-full flex justify-between items-center gap-4'>
                                <div className='flex flex-col justify-center items-center gap-1'>
                                    <img src="/home-v3/s4/arrow.png" alt="RMW" className='w-[28px] h-[28px]' />
                                    <h2 className='font-[700] text-[44px]'>250%</h2>
                                    <p className='font-[600] text-[15px]'>Increase in qualified leads</p>
                                </div>

                                <div className='flex flex-col justify-center px-8 items-center gap-1 border-l-[1px] border-r-[1px] border-l-[#D8D8D8] border-r-[#D8D8D8]'>
                                    <img src="/home-v3/s4/arrow.png" alt="RMW" className='w-[28px] h-[28px]' />
                                    <h2 className='font-[700] text-[44px]'>85%</h2>
                                    <p className='font-[600] text-[15px]'>Target audience reach</p>
                                </div>

                                <div className='flex flex-col justify-center items-center gap-1'>
                                    <img src="/home-v3/s4/arrow.png" alt="RMW" className='w-[28px] h-[28px]' />
                                    <h2 className='font-[700] text-[44px]'>40%</h2>
                                    <p className='font-[600] text-[15px]'>Conversion rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Center Align Container 2  */}
            <div className='w-[90%] h-[426px] flex justify-center items-center relative'>

                <Image src={"/home-v3/s2/team-bg3.png"} alt='' fill></Image>

                <div className="flex absolute top-[50%] right-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer w-[54px] h-[54px] rounded-full justify-center items-center bg-[#FFFFFF] z-10">

                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z" fill="black" />
                    </svg>

                </div>

                {/* Overlay  */}
                <div className="absolute inset-0 bg-[#00000051] w-full h-full z-0"></div>
            </div>
        </section>
    )
}

export default S4