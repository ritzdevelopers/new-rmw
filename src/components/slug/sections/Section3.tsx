import styles from "./page.module.css";

function Section3() {
    const data = [
        {
            title: "Creative Services",
            link: "https://ritzmediaworld.com/services/creative-services",
            alt: "Creative Services",
        },
        {
            title: "Content Marketing",
            link: "https://ritzmediaworld.com/services/contents-marketing",
            alt: "Content Marketing",
        },
        {
            title: "Digital Marketing",
            link: "https://ritzmediaworld.com/services/digital-marketing",
            alt: "Digital Marketing",
        },
        {
            title: "Advertising Design",
            link: "https://ritzmediaworld.com/services/print-advertising",
            alt: "Advertising Design",
        },
        {
            title: "Print Advertising",
            link: "https://ritzmediaworld.com/services/print-advertising",
            alt: "Print Advertising",
        },
        {
            title: "Email Marketing",
            link: "https://ritzmediaworld.com/services/email-marketing",
            alt: "Email Marketing",
        },
        {
            title: "Content Writing",
            link: "https://ritzmediaworld.com/services/content-writing",
            alt: "Content Writing",
        },
        {
            title: "Content Strategy",
            link: "https://ritzmediaworld.com/services/content-strategy",
            alt: "Content Strategy",
        },
        {
            title: "Content Optimization",
            link: "https://ritzmediaworld.com/services/content-optimization",
            alt: "Content Optimization",
        },
        {
            title: "Web Development",
            link: "https://ritzmediaworld.com/services/web-designing-and-development",
            alt: "Web Development",
        }
    ]
    const renderItems = () =>
        data.map((itm, idx) => (
            <h2 key={idx} className="font-[700] text-[100px] flex gap-4">
                {itm.title.split(" ").map((word, i) => (
                    <span key={i} className={i === 0 ? styles.combined : ""}>{word}</span>
                ))}
                .
            </h2>
        ));

    return (
        <section className="w-full py-4 flex justify-center items-center bg-[#F7F7F7]">
            {/* Centered Align Container  */}
            <div className="w-full flex justify-center items-center overflow-hidden">
                {/* Slides left to right infinitely  */}
                <div className={`flex justify-center items-center w-full ${styles.s3SlideTrack}`}>
                    <div className="flex justify-center items-center gap-4">{renderItems()}</div>
                    <div className="flex justify-center items-center gap-4">{renderItems()}</div>
                </div>
            </div>
        </section>
    )
}

export default Section3;