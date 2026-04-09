"use client";
import Image from "next/image";
import styles from './discussion.module.css';

export default function DiscussionTopics() {
    const cardBackgrounds = [
        "#FDFDFD",
        "#F9F9F9",
        "#FDFDFD",
        "#F9F9F9"
    ];

    return (
        <section className="w-full py-16 px-4 md:px-4 lg:px-5 xl:px-5">
            <div className="mx-auto">

                <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                    Discussion Topics
                </h2>

                <div className={`px-1 md:px-6 lg:px-8 xl:px-8 grid gap-4
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-[310px_repeat(4,146px)]
                    xl:grid-cols-[512px_repeat(4,146px)]
                    2xl:grid-cols-[537px_repeat(4,178px)]
                    items-start ${styles.container}`}>
                
                    {/* LEFT BIG CARD */}
                    <div className="bg-white border border-[#E6E6E6] h-[512px] p-6 flex flex-col  md:col-span-2 lg:col-span-1">
                        <h3 className="text-2xl font-bold mb-6">
                            Digital Marketing & SEO
                        </h3>

                        <div className="relative w-full h-[200px] mb-6">
                            <Image
                                src="/discussion-forum/discussiontopic.png"
                                alt="seo"
                                fill
                                className="object-cover rounded-3xl"
                            />
                        </div>

                        <ul className="space-y-4 text-gray-800 text-[16px]">
                            {[
                                "How to choose the right SEO company in Noida?",
                                "SEO vs Paid Ads – what works better for your business?",
                                "How do top SEO companies in Noida rank websites?",
                                "AI in digital marketing: Opportunity or threat?"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-black rounded-full mt-2"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT SIDE COLUMNS */}
                    {[
                        {
                            title: "Branding & Creative Strategy",
                            text: "How to choose the best digital marketing agencies for branding?"
                        },
                        {
                            title: "Social Media & Content Marketing",
                            text: "Best strategies used by a social media marketing agency"
                        },
                        {
                            title: "Advertising (Print, Radio & Media)",
                            text: "How effective are print advertising services in Delhi?"
                        },
                        {
                            title: "Industry-Specific Marketing (Schools & Real Estate)",
                            text: "Best digital marketing services for school in Delhi"
                        }

                    ].map((card, i) => (
                        <div
                            key={i}
                            style={{ backgroundColor: cardBackgrounds[i] }}
                            className={`
        flex flex-col justify-between

        min-h-[140px] sm:min-h-[160px] md:min-h-[200px]
        lg:h-[512px]

        p-4 sm:p-5 md:p-6
        ${i === 3 ? 'lg:py-6' : ''}
    `}
                        >
                            <h4 className="
        font-semibold 
        text-[14px] leading-snug
        sm:text-[14px]
        md:text-[14px]
         lg:text-[16px]
        min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem]
    ">
                                {card.title}
                            </h4>

                            <p className={`
                                        text-gray-700 
                                        text-[13px] leading-relaxed
                                        sm:text-[14px]
                                        ${i === 3 ? 'px-2 md:px-3 lg:px-4 xl:px-4' : ''}
                                    `}>
                                {card.text}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}