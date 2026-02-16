import React from 'react';

function ServiceCard({ service, index }: { service: any, index: number }) {
    const { title, image, link, subServices, description, margin } = service;
    return (
        <div className="w-full flex flex-col justify-center lg:flex-row lg:justify-between gap-4 sm:gap-6 lg:gap-4 py-6 sm:py-8 md:py-10 lg:py-[50px] border-b-[1px] border-b-[#D9D9D9]">

            {/* Left Side Container  */}
            <div className="w-full lg:w-[55%]  xl:w-auto h-[200px] sm:h-[250px] md:h-[300px] lg:h-[377px] relative overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-contain xl:object-cover" />

                {/* Absolute Positioned Container  */}
                <div className="absolute  top-[50%] translate-y-[-50%] w-full h-full flex flex-col justify-center items-end gap-1 sm:gap-2 pr-2 sm:pr-3 md:pr-4">
                  <div className={`flex flex-col gap-1 sm:gap-2 ${margin || ""}`}>
                    <p className="font-[400] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">{String(index + 1).padStart(2, '0')}</p>
                    <h2 className="font-[500] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
                        {title?.split(/<br\s*\/?>/i).map((line: string, index: number, array: string[]) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < array.length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>
                    <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[54px] md:h-[54px] lg:w-[58px] lg:h-[58px] bg-[#C99237] rounded-full flex items-center justify-center">
                        <svg className="w-[20px] h-[18px] sm:w-[24px] sm:h-[22px] md:w-[28px] md:h-[26px] lg:w-[32px] lg:h-[29px]" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.1701 4.23947L24.8452 13.1667L18.7764 5.82364L28.1701 4.23947Z" fill="white" />
                            <rect x="3.1853" y="24.2397" width="24" height="1" transform="rotate(-39.5724 3.1853 24.2397)" fill="white" />
                        </svg>
                    </div>
                  </div>
                </div>
            </div>

            {/* Right Side Container  */}
            <div className='w-full lg:w-[40%] xl:max-w-[480px] flex flex-col gap-3 sm:gap-4'>
                <p className='font-[400] text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-center lg:text-left'>
                    {description?.split(/<br\s*\/?>/i).map((line: string, index: number, array: string[]) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < array.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>
                <div className="grid  grid-cols-3 gap-x-2 sm:gap-x-3 gap-y-2 sm:gap-y-3">
                    {subServices.map((subService: any) => (
                        <div key={subService.title} className='bg-[#F2F2F2] lg:pl-2
                          rounded-[2px] px-2 lg:px-0 lg:py-3 min-h-[70px] sm:min-h-[80px] lg:h-[88px] flex justify-center lg:justify-start items-center text-center lg:text-left'>
                            <p className='font-[400] text-[13px] sm:text-[14px] md:text-[15px] leading-snug'>{subService.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default ServiceCard;