import styles from "./page.module.css";

function Section4() {
    return (
        <section className="w-full py-[40px] xl:py-[70px] flex justify-center items-center">
            {/* Center Align Container  */}
            <div className={`w-full ${styles.containerWidth} bg-[#AE7414] rounded-[5px] py-10 relative flex justify-between items-center`}>

            {/* Absolute Position Div  */}
            <div className="w-full h-full absolute inset-0">
                <img src="/clients-page/bg.png" alt="" className="w-full h-full"/>
            </div>

                {/* Left Side Container  */}
                <div className="flex flex-col gap-4">
                    <p className="font-[700] text-[36px] text-white">Let’s Build Something Great Together</p>

                    <p className="font-[400] text-[19px] text-white">Join our growing list of happy clients and start your creative journey with us today.</p>
                </div>

                {/* Right Side Container  */}
                <div>
                    <button className="flex justify-center items-center gap-3">
                        <p className="font-[500] text-[18px] text-white">
                            Start Your Project
                        </p>
                        <div className="w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center">

                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.4276 2.92383L17.1346 9.08052L12.9493 4.01635L19.4276 2.92383Z" fill="#C99237" />
                                <rect x="2.19678" y="16.7172" width="16.5517" height="0.689655" transform="rotate(-39.5724 2.19678 16.7172)" fill="#C99237" />
                            </svg>

                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Section4;