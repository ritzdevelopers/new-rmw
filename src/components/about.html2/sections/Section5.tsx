import styles from "./page.module.css";
function Section5() {
    return (
        <section className="w-full py-[40px] xl:py-[70px] flex justify-center items-center">
            {/* Centered Align Container  */}
            <div className={`w-full ${styles.containerWidth}`}>
                <div className="w-full relative flex justify-between items-end gap-3">

                    {/* Absolute container */}
                    <div className="w-full max-w-[558px] h-auto absolute inset-0 flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <p className="font-[600] text-[16px] text-[#C99237]">Our Journey</p>
                            <p className="font-[700] text-[36px]">17 Years of Brand Excellence</p>
                        </div>
                        <p className="font-[400] text-[16px]">From pioneering print innovations to 360° digital mastery, our journey reflects our commitment to excellence.</p>
                    </div>

                    {/* Card 1  */}
                    <div className="flex flex-col gap-3 w-[234px]">
                        <div className="flex justify-between">
                            <p className="font-[700] text-[30px]">2008</p>
                            <p className="font-[400] text-[18px]">Foundation</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img1.jpg" alt="2008" title="2008" className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    {/* Card 1  */}
                    <div className="flex flex-col gap-3 w-[234px]">
                        <div className="flex justify-between">
                            <p className="font-[700] text-[30px]">2012</p>
                            <p className="font-[400] text-[18px] text-end">Innovation <br />
                                Leadership</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img2.jpg" alt="2008" title="2008" className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    {/* Card 1  */}
                    <div className="flex flex-col gap-3 w-[234px]">
                        <div className="flex justify-between">
                            <p className="font-[700] text-[30px]">2016</p>
                            <p className="font-[400] text-[18px] text-end">Digital <br />
                                Expansion</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img3.jpg" alt="2008" title="2008" className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    {/* Card 1  */}
                    <div className="flex flex-col gap-3 w-[234px]">
                        <div className="flex justify-between">
                            <p className="font-[700] text-[30px]">2020</p>
                            <p className="font-[400] text-[18px] text-end">Premium <br />
                                Positioning</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img4.jpg" alt="2008" title="2008" className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    {/* Card 1  */}
                    <div className="flex flex-col gap-3 w-[234px]">
                        <div className="flex justify-between">
                            <p className="font-[700] text-[30px]">2026</p>
                            <p className="font-[400] text-[18px] text-end">Today</p>
                        </div>
                        <div className="w-full h-auto">
                            <img src="/new-about-imgs/s4/abt-s4-img5.jpg" alt="2008" title="2008" className="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section5;