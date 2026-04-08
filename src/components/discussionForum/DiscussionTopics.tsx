"use client";
import Image from "next/image";

export default function DiscussionTopics() {
    const cardBackgrounds = [
        "#FDFDFD",
        "#F9F9F9",
        "#FDFDFD",
        "#F9F9F9"
    ];

    return (
        <section className="w-full py-16 px-5">
            <div className="mx-auto">

                {/* Title */}
                <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                    Discussion Topics
                </h2>

                {/* EXACT GRID */}
                <div className="px-8
  grid gap-4

  grid-cols-1                          /* mobile */

  md:grid-cols-2                       /* 768px */

  lg:grid-cols-3                       /* 1024px */

  xl:grid-cols-[512px_repeat(4,146px)] /* 1240px → 3 cols (1 big + 4 small) */

  2xl:grid-cols-[537px_repeat(4,178px)] /* 1366px+ → full layout */
">

                    {/* LEFT BIG CARD */}
                    <div className="bg-white border border-[#E6E6E6] h-[512px] p-6 flex flex-col">
                        <h3 className="text-2xl font-bold mb-6">
                            Digital Marketing & SEO
                        </h3>

                        {/* Image */}
                        <div className="relative w-full h-[200px] mb-6">
                            <Image
                                src="/discussion-forum/discussiontopic.png"
                                alt="seo"
                                fill
                                className="object-cover rounded-3xl"
                            />
                        </div>

                        {/* Bullet List */}
                        <ul className="space-y-4 text-gray-800 text-[14px]">
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
                            className="
                h-[512px] p-4
                flex flex-col 
                justify-between
               
              "
                        >
                            <h4 className="font-semibold text-[15px] leading-snug">
                                {card.title}
                            </h4>

                            <p className="text-gray-700 text-[14px] leading-relaxed mt-auto">
                                {card.text}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}