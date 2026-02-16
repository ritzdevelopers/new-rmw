import { BsArrowUpRight } from "react-icons/bs";

function Section2() {
    return (
        <section className="w-full flex justify-center items-center py-[70px] px-20">
            {/* Centered Align Container   */}
            <div className="w-full text-center flex flex-col gap-4 items-center justify-center max-w-[1075px]">
                <h2 className="font-[700] text-[30px]">
                    The digital landscape is, unfortunately, noisier than a crowded fish market. Convention marketing practices are necessary, but are barely effective on their own.
                </h2>
                <p className="font-[400] text-[16px] max-w-[936px]">
                    Ritz Media World is a digital marketing agency that specializes in crafting such strategies. We build campaigns persuasive campaigns that are designed to target the customer’s psychology through compelling content. These digital campaigns don’t just deliver results, they dominate. To reap the benefits of digital marketing, our team provides and executes on multiple fronts, including but not limited to SEO, PPC, and Social Media.
                </p>
                <button className="w-[154px] h-[46px] flex justify-between items-center gap-2 bg-transparent border-none cursor-point">
                    <p className="font-[500] text-[16px]">Contact us</p>
                    <div className="bg-[#C99237] h-[36px] w-[36px] sm:h-[38px] sm:w-[38px] lg:h-[40px] lg:w-[40px] rounded-[50px] flex justify-center items-center text-white">
                        <BsArrowUpRight className="text-white text-[16px] sm:text-[17px] lg:text-[18px]" />
                    </div>
                </button>
            </div>
        </section>
    )
}

export default Section2;