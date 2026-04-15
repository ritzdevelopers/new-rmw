import styles from "./page.module.css";
import s4 from "./Section4.module.css";

function Section4() {
    return (
        <section className={`w-full py-[40px] xl:py-[70px] border-t border-b border-[#D9D9D9] ${s4.root}`}>
            <div className={`w-full flex flex-col gap-8 justify-center items-center ${styles.containerWidth} ${s4.container}`}>
                <div className="w-full flex flex-col  text-center justify-cennter items-center">
                    <p className={`font-[600] text-[16px] uppercase text-[#C99237] ${styles.fontpoppins} ${s4.eyebrow}`}>Proven Results</p>
                    <p className={`font-[700] mb-4 text-[36px] ${styles.fontmontserrat} ${s4.headline}`}>Our Work is Our <span className="text-[#C99237]">Reward</span></p>
                    <p className={`font-[400] text-[16px] max-w-[769px] ${styles.fontpoppins} ${s4.intro}`}>We take pride in challenges that agencies tend to avoid. It is what drives us to do things never done before. That is what brings us our recognition and some awards along the way.</p>
                </div>

                <div className="flex justify-center items-center w-full">
                    <div className={`w-[272px] h-[272px] rounded-full ml-[-20px] border border-[#EBEBEB] flex flex-col justify-center items-center gap-3 ${s4.circle} ${s4.circleOverlap}`}>
                        <div className="relative">
                            <p className={`font-[600] text-[50px]  ${styles.fontmontserrat} ${s4.statNum}`}>350</p>
                            <p className={`font-[500] text-[40px] absolute -top-2 -right-5 ${styles.fontmontserrat} ${s4.statPlus} ${s4.plusTop} ${s4.plusR5}`}>+</p>
                        </div>
                        <p className={`font-[600] text-[18px] ${styles.fontmontserrat} ${s4.statLabel}`}>Satisfied Clients</p>
                        <p className={`font-[400] text-[15px] text-center max-w-[178px] ${styles.fontopensans} ${s4.statSub}`}>Brands we've helped grow and succeed</p>
                    </div>
                    <div className={`w-[272px] h-[272px] rounded-full ml-[-20px] border border-[#EBEBEB] flex flex-col justify-center items-center gap-3 ${s4.circle} ${s4.circleOverlap}`}>
                        <div className="relative">
                            <p className={`font-[600] text-[50px]  ${styles.fontmontserrat} ${s4.statNum}`}>35</p>
                            <p className={`font-[500] text-[40px] absolute -top-2 -right-6 ${styles.fontmontserrat} ${s4.statPlus} ${s4.plusTop} ${s4.plusR6}`}>+</p>
                        </div>
                        <p className={`font-[600] text-[18px] ${styles.fontmontserrat} ${s4.statLabel}`}>Awards</p>
                        <p className={`font-[400] text-[15px] text-center max-w-[178px] ${styles.fontopensans} ${s4.statSub}`}>Passion, Obsession, and Persistence always pay off</p>
                    </div>
                    <div className={`w-[272px] h-[272px] rounded-full ml-[-20px] border border-[#EBEBEB] flex flex-col justify-center items-center gap-3 ${s4.circle} ${s4.circleOverlap}`}>
                        <div className="relative">
                                <p className={`font-[600] text-[50px]  ${styles.fontmontserrat} ${s4.statNum}`}>40</p>
                            <p className={`font-[500] text-[40px] absolute -top-2 -right-6 ${styles.fontmontserrat} ${s4.statPlus} ${s4.plusTop} ${s4.plusR6}`}>+</p>
                        </div>
                        <p className={`font-[600] text-[18px] ${styles.fontmontserrat} ${s4.statLabel}`}>Service Categories</p>
                        <p className={`font-[400] text-[15px] text-center max-w-[178px] ${styles.fontopensans} ${s4.statSub}`}>Designed to suit your growth needs at every stage</p>
                    </div>
                    <div className={`w-[272px] h-[272px] rounded-full border border-[#EBEBEB] flex flex-col justify-center items-center gap-3 ${s4.circle}`}>
                        <div className="relative">
                                <p className={`font-[600] text-[50px]  ${styles.fontmontserrat} ${s4.statNum}`}>17</p>
                            <p className={`font-[500] text-[40px] absolute -top-2 -right-6 ${styles.fontmontserrat} ${s4.statPlus} ${s4.plusTop} ${s4.plusR6}`}>+</p>
                        </div>
                        <p className={`font-[600] text-[18px] ${styles.fontmontserrat} ${s4.statLabel}`}>Glorious Years</p>
                        <p className={`font-[400] text-[15px] text-center max-w-[178px] ${styles.fontopensans} ${s4.statSub}`}>grueling hours that have led to remarkable branding success</p>
                    </div>
                </div>

                <div className={`text-center max-w-[631px] ${s4.footerWrap}`}>
                    <p className={`font-[400] text-[16px] ${styles.fontpoppins} ${s4.footerText}`}>Our Mad Men are obsessed with building stories. Like a moth to a flame, they're just obsessed with any branding problem that may need a solution.</p>
                </div>
            </div>
        </section >
    )
}


export default Section4;