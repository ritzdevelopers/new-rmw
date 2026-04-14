import styles from "./page.module.css";
function Section2() {
    return (
        <section className="w-full py-[40px] xl:py-[70px]">
            {/* Centered Align Container  */}
            <div className={`w-full ${styles.containerWidth} border-t border-[#D9D9D9]`}>
                <div className="w-full flex">
                    {/* Left Side Container  */}
                    <div className="flex justify-between gap-4">
                        {/* Left Side Col  */}
                        <div className="flex flex-col justify-between gap-4">
                            <div className="w-full">
                                <p className="font-[600] text-[14px] uppercase">who are we ?</p>
                            </div>

                            <div className="w-full flex flex-col justify-end items-end text-end">
                                <div className="relative flex justify-end items-end">
                                    <p className="font-[600] text-[60px]">35</p>
                                    <p className="absolute top-0 right-0 font-[500] text-[30px]">+</p>
                                </div>
                                <p className="font-[600] text-[20px]">Awards</p>
                                <p className="font-[400] text-[16px]">Passion, Obsession, and Persistence always pay off.</p>
                            </div>
                        </div>

                        {/* Right Side Column  */}
                        <div></div>
                    </div>

                    {/* Right Side Container  */}
                    <div></div>
                </div>
            </div>
        </section>
    )
}

export default Section2;