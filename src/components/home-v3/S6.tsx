"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import './S6.css'
import { Pagination } from 'swiper/modules'

function S6() {

    const data = [
        {
            client: "Madhusudan Ghee",
            para: "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand’s sustenance but have also got me a great number of quality leads.",
            role: "Managing Director"
        },
        {
            client: "Madhusudan Ghee",
            para: "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
            role: "Managing Director"
        },
        {
            client: "Eldeco Group",
            para: "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
            role: "Managing Director"
        },
        {
            client: "Madhusudan Ghee",
            para: "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand’s sustenance but have also got me a great number of quality leads.",
            role: "Managing Director"
        },
        {
            client: "Madhusudan Ghee",
            para: "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
            role: "Managing Director"
        },
        {
            client: "Eldeco Group",
            para: "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
            role: "Managing Director"
        },
    ]
    return (
        <section className='w-full flex justify-center items-center py-16'>
            {/* Center Align Container  */}
            <div className='w-[90%] flex flex-col'>
                {/* Top Row  */}
                <div className='flex flex-col gap-2'>
                    <p className='font-[600] text-[16px] uppercase text-[#C99237]'>Clients Testimonials</p>
                    <div className="flex gap-8 items-end">
                        <h2 className='font-[700] text-[36px]'>What Our Clients Say</h2>
                        <p className='font-[400] text-[16px]'>Don't just take our word for it – hear from the brands we've helped transform.</p>
                    </div>
                    <div className='flex gap-2'>
                        <button className='w-[146px] h-[37px] rounded-[5px] bg-[#C99237] cursor-pointer text-white font-[600] text-[16px]'>Text Tutorial</button>
                        <button className='w-[146px] h-[37px] rounded-[5px] bg-[#ffffff] cursor-pointer text-black font-[600] text-[16px]'>Video Tutorial</button>
                    </div>
                </div>

                {/* Testimonial Slider Container  */}
                <div className='mt-8'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="testimonialSwiper"
                    >
                        {
                            data.map((ob, idx) => {
                                return (
                                    <SwiperSlide>
                                        <div className='w-[393px] h-[331px] bg-white rounded-lg shadow-[0_2px_15px_0_rgba(208,208,208,0.25)] flex flex-col  gap-10 p-8 '>
                                            <p className='font-[400] text-[16px] text-[#060606]'>{ob.para}</p>

                                            <div>
                                                <p className='text-[18px]'><b>{ob.client}</b></p>
                                                <p className='font-[400] text-[14px] text-[#282828]'>{ob.role}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default S6