import { ArrowLeftIcon, MapIcon } from "lucide-react";
import { BsGlobe } from "react-icons/bs";
import { SlClock } from "react-icons/sl";
function Section2() {
    return (
        <section className="w-full flex justify-center items-center px-20 py-[70px]">

            {/* Centered Align Container  */}
            <div className="flex flex-col gap-6 w-full">
                {/* Row 1  */}
                <div className="w-full flex flex-col gap-4">
                    <div>
                        <button className="w-[270px] h-[54px] rounded-[5px] border-[1px] border-[#C99237] flex justify-center items-center gap-3 cursor-pointer">
                            <ArrowLeftIcon className="w-[15px] h-[15px] text-[#C99237]" />
                            <p className="font-[700] text-[15px] text-[#C99237]">Back to Newspapers</p>
                        </button>
                    </div>


                    <div className="w-full rounded-5px bg-[#F7F7F7] flex justify-start items-start">

                        {/* Left Side Image Container  */}
                        <div className="h-[320px] bg-white rounded-[20px] overflow-hidden flex justify-center items-center px-10">
                            <img className="w-[234px] h-auto object-cover" src="/news/the-economic-times.png" alt="Print Advertising" />
                        </div>


                        {/* Right Side Container  */}
                        <div className="h-full flex flex-col justify-between">
                            {/* Row 1  */}
                              <div className="flex flex-col gap-3">
                                <h2 className="font-[700] text-[26px]">The Economics Times</h2>
                                <div className="flex gap-6">
                                    <div className="flex gap-2">
                                        <BsGlobe className="w-[27px] h-[27px] font-[400]" />
                                        <p className="font-[400] text-[16px]">English</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <SlClock className="w-[27px] h-[27px] font-[400]" />
                                        <p className="font-[400] text-[16px]"> Monday - Friday       </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <SlClock className="w-[27px] h-[27px] font-[400]" />
                                        <p className="font-[400] text-[16px]">Monday - Friday</p>
                                    </div>
                                </div>
                              </div>
                        </div>
                    </div>
                </div>



                {/* Row 2  */}
                <div></div>
            </div>
        </section>
    )
}

export default Section2;