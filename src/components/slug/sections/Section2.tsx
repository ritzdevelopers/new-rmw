import S2Card from "./cards/S2Card";
import styles from "./page.module.css";
function Section2({ data }: { data: any }) {
    return (
        <section className="w-full flex justify-center items-center py-[70px] ">
            {/* Centered Align Container  */}
            <div className={`flex flex-col lg:gap-8 gap-12 w-full  ${styles.containerWidth2}`}>
                {data && data.length > 0 ? data.map((idx: any, index: number) => {
                    return (
                        <S2Card index={index} key={index} data={idx} />
                    )
                }) : <div>No data found</div>}
            </div>
        </section>
    )
}

export default Section2;