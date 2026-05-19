import styles from "./page.module.css";


function Section2() {
    return (
        <section className="w-full py-[40px] xl:py-[70px] flex justify-center items-center">
            {/* Center Align Container  */}
            <div className={`w-full ${styles.containerWidth} flex flex-col justify-center items-center`}>
                <p className="font-[700] text-[36px]">Our Clients</p>
                <p className="font-[500] text-[24px] text-center">Brands That Trust Our Creativity</p>
                <p className="font-[400] text-[16px] max-w-[712px] text-center">
                    We collaborate with ambitious brands, startups, and enterprises to craft meaningful digital experiences. Our clients trust us to deliver creative solutions that drive growth, engagement, and long-term success.
                </p>
            </div>
        </section>
    )
}

export default Section2;
