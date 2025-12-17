"use client"
import Image from 'next/image'
import React from 'react'

function S7() {
    return (
        <section className='w-full min-h-[647px] bg-[url(/home-v3/s6/s6bg2.png)] bg-cover bg-no-repeat bg-center bg-black flex justify-center items-center'>

            {/* Center Align Container  */}
            <div className='w-[90%] flex flex-col gap-6'>
                {/* Top Row  */}
                <div className="w-full flex items-center justify-between">
                    {/* Left Side Container  */}
                    <div>
                        <p className='font-[600] text-[16px] text-[#C99237] uppercase'>Achievement Awards</p>
                        <h2 className='font-[700] text-[36px] text-white'>Awards & Company Recognitions</h2>
                    </div>

                    <div className="flex gap-2">
                        <img src="/home-v3/rghtw.png" alt="RMW" className='w-[27px] h-[27px] cursor-pointer' />
                        <img src="/home-v3/lftbw.png" alt="RMW" className='w-[27px] h-[27px] cursor-pointer' />
                    </div>
                </div>

                {/* Bottom Main Container  */}
                <div className="w-full flex justify-between">
                    {
                        [
                            {
                                img: "/home-v3/s7/v3aw3.png",
                                para: "Best Creative Agency (Real Estate) in Delhi/NCR By Big FM",
                                highlite: "Excellence"
                            },
                            {
                                img: "/home-v3/s7/v3aw2.png",
                                para: "Best Real Estate Podcast In India - HT Smartcast Podmasters Awards 2025",
                                highlite: "Excellence"
                            },
                            {
                                img: "/home-v3/s7/v3aw1.png",
                                para: "Most Trusted Advertising Agency in Delhi/NCR – The Economic Times (2024)",
                                highlite: "Excellence"
                            },
                        ].map((ob, idx) => {
                            return (
                                <div className='w-[401px]'>
                                    <div className="w-full h-[326px] border-1 border-[#C9923780] relative flex justify-center items-center">
                                        <div className="w-[90%] h-[90%] flex justify-center items-center relative">
                                            <Image src={ob.img} alt={ob.highlite} fill></Image>
                                        </div>

                                        {/* Absolute Position BTN  */}
                                        <div className='w-[125px] h-[36px] rounded-[50px] bg-[#ffffff] text-[#F59612] flex justify-center items-center gap-1 absolute top-2 -left-3 z-10'>
                                            <img src="/home-v3/s7/star2.png" alt="RMW" className='w-[24px] h-[24px]' />
                                            <p className='font-[600] text-[14px]'>Excellence</p>
                                        </div>
                                    </div>

                                    <div className='w-full min-h-[51px] bg-[#C992372E] text-white p-4'>
                                        <p>
                                            {ob.para}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </section>
    )
}

export default S7