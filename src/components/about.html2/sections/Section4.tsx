import styles from "./page.module.css";

function Section4() {
    return (
        <section className="w-full py-[40px] xl:py-[70px] border-t border-b border-[#D9D9D9]">
            <div className={`w-full flex flex-col gap-8 justify-center items-center ${styles.containerWidth}`}>
                <div className="w-full flex flex-col gap-4 text-center justify-cennter items-center">
                    <p className="font-[600] text-[16px]">Proven Results</p>
                    <p className="font-[700] text-[36px]">Our Work is Our <span className="text-[#C99237]">Reward</span></p>
                    <p className="font-[400] text-[16px] max-w-[769px]">We take pride in challenges that agencies tend to avoid. It is what drives us to do things never done before. That is what brings us our recognition and some awards along the way.</p>
                </div>

                <div className="flex justify-center items-center w-full">
                    <div className="w-[272px] h-[272px] rounded-full border border-[#EBEBEB] flex flex-col justify-center items-center gap-3">
                        <div className="relative">
                            <p className="font-[600] text-[50px]">350</p>
                            <p className="font-[500] text-[28px] absolute -top-3 -right-6">+</p>
                        </div>
                        <p className="font-[600] text-[18px]">Satisfied Clients</p>
                        <p className="font-[400] text-[15px] text-center max-w-[178px]">Brands we've helped grow and succeed</p>
                    </div>
                    <div className="w-[272px] h-[272px] rounded-full border border-[#EBEBEB] flex flex-col justify-center items-center gap-3">
                        <div className="relative">
                            <p className="font-[600] text-[50px]">350</p>
                            <p className="font-[500] text-[28px] absolute -top-3 -right-6">+</p>
                        </div>
                        <p className="font-[600] text-[18px]">Satisfied Clients</p>
                        <p className="font-[400] text-[15px] text-center max-w-[178px]">Brands we've helped grow and succeed</p>
                    </div>
                    <div className="w-[272px] h-[272px] rounded-full border border-[#EBEBEB] flex flex-col justify-center items-center gap-3">
                        <div className="relative">
                            <p className="font-[600] text-[50px]">350</p>
                            <p className="font-[500] text-[28px] absolute -top-3 -right-6">+</p>
                        </div>
                        <p className="font-[600] text-[18px]">Satisfied Clients</p>
                        <p className="font-[400] text-[15px] text-center max-w-[178px]">Brands we've helped grow and succeed</p>
                    </div>
                    <div className="w-[272px] h-[272px] rounded-full border border-[#EBEBEB] flex flex-col justify-center items-center gap-3">
                        <div className="relative">
                            <p className="font-[600] text-[50px]">350</p>
                            <p className="font-[500] text-[28px] absolute -top-3 -right-6">+</p>
                        </div>
                        <p className="font-[600] text-[18px]">Satisfied Clients</p>
                        <p className="font-[400] text-[15px] text-center max-w-[178px]">Brands we've helped grow and succeed</p>
                    </div>
                </div>

                <div className="text-center max-w-[621px]">
                    <p className="font-[400] text-[16px]">Our Mad Men are obsessed with building stories. Like a moth to a flame, they're just obsessed with any branding problem that may need a solution. Our Mad Men are obsessed with building stories. Like a moth.</p>
                </div>
            </div>
        </section >
    )
}


export default Section4;