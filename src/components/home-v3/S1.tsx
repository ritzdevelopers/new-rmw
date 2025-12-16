"use client"
import React from 'react'

function S1() {
    return (
        <section className='flex items-center  bg-[#000000] text-white min-h-[648px] w-full relative bg-[url(/home-v3/s1/slider1.jpg)] bg-center bg-cover bg-no-repeat pl-10'>

            <div className='max-w-[549px] flex flex-col gap-20 mt-20'>
                {/* Top Row  */}
                <div className='font-[500] text-[14px] flex flex-col gap-6'>
                   <div>
                   <p>We craft brands, websites, & campaigns that move your business closer to its vision.</p>
                    <h1 className='font-[800] text-[52px]'>Beyond your typical
                        Advertising agency</h1>
                   </div>
                    <div className='flex items-end'>
                        {/* Left Side Container  */}
                        <div className=''>
                            <img src="/home-v3/s1/v2-s1-i2.png" alt="" className=' h-[118px]' />
                        </div>

                        {/* Right Side Container  */}
                        <div className='flex items-end -ml-[23px]'>
                            <h2 className='font-[600] text-[19px]'>Award-Winning Agency </h2>
                            <div className="flex items-end">
                                <img src="/home-v3/star.png" alt="" className='w-[55px] h-[49px]' />

                                <p className='font-[500] text-[19px]'>Since 2008</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row  */}
                <div className='flex gap-8'>
                    <button className='w-[199px] h-[54px] bg-[#C99237] rounded-[5px] shadow-[0_4px_4px_0_rgba(0, 0, 0, 0.25)] text-[15px] font-[700] cursor-pointer'>
                        Free Consulting
                    </button>

                    <button className='min-w-[191px] h-[54px] text-[15px] font-[700] cursor-pointer flex justify-center gap-4 items-center'>

                        <div className="flex cursor-pointer w-[54px] h-[54px] rounded-full justify-center items-center bg-[#FFFFFF]">

                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 4.46558C9.66667 4.85048 9.66667 5.81273 9 6.19763L1.5 10.5278C0.833332 10.9127 -5.28905e-07 10.4315 -4.95256e-07 9.66173L-1.16704e-07 1.00148C-8.30548e-08 0.231676 0.833333 -0.249449 1.5 0.135451L9 4.46558Z" fill="black" />
                            </svg>

                        </div>
                        <p>Watch Our Story</p>
                    </button>
                </div>
            </div>

        </section>
    )
}

export default S1;