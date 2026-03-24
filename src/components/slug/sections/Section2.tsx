import S2Card from "./cards/S2Card";
import styles from "./page.module.css";
function Section2() {
    return (
        <section className="w-full flex justify-center items-center py-[70px] ">
            {/* Centered Align Container  */}
            <div className={`flex flex-col lg:gap-8 gap-12 w-full  ${styles.containerWidth2}`}>
               {[0,1,2,3,4,5,].map((idx)=>{
                return (
                    <S2Card index={idx} key={idx} />
                )
               })}
            </div>
        </section>
    )
}

export default Section2;