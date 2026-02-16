import { BsArrowUpRight } from "react-icons/bs";

function Layer1Card() {
    return (
        <div className="w-[390px] flex flex-col justify-between gap-4">
            {/* Row 1  */}
            <div className="flex w-full justify-center border-b-[1px] border-b-[#D9D9D9] pb-4"></div>


            {/* Row 2  */}
            <div className="w-full flex flex-col justify-between gap-3 border-r-[1px] border-r-[#D9D9D9] pr-4">
                {/* Content Container  */}
                <div className="flex flex-col w-full gap-2">
                    <p className="font-[700] text-[18px] text-[#000000]">SEO (Search Engine Optimization)</p>
                    <p className="font-[400] text-[14px] text-[#000000]">For us, SEO is more than mere ranking, it's about relevance and long-term authority. As a reliable SEO agency in India, we offer the best SEO services and ensure your business appears at the top of search results and stays there with content that engages and converts your audience.</p>
                </div>

                {/* Button Container  */}
                <div className="w-full">
                    <button className="w-[154px] h-[46px] flex justify-between items-center gap-2 bg-transparent border-none cursor-point">
                        <p className="font-[500] text-[18px]">More</p>
                        <div className="bg-[#C99237] h-[36px] w-[36px] sm:h-[38px] sm:w-[38px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-white">
                            <BsArrowUpRight className="text-white text-[16px] sm:text-[17px] lg:text-[18px]" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Row 3  */}
            <div></div>
        </div>
    )
}

export default Layer1Card;