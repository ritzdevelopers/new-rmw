"use client";

import Image from "next/image";
import styles from './discussion.module.css';

export default function WhyJoin() {

    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";
    return (
        <section className="w-full  py-3 px-4 md:px-4 lg:px-12">
            <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 ">

                {/* LEFT SECTION */}
                <div className="flex flex-col gap-6 justify-end h-full">

                    {/* Circle + Heading */}
                    <div className="relative w-[249px] h-[270px]">

                        {/* Circle Image */}
                        <img
                            src="/discussion-forum/circle.png"
                            alt="Why Join"
                            className="w-full h-full object-contain"
                        />

                        {/* Text on top of image */}
                        <h2 className={`absolute inset-0 flex items-center  text-left px-8 text-[24px] font-bold leading-snug text-black ${styles.montserratBold}`}>
                            Why Join Our <br /> Discussion <br />Forum?
                        </h2>

                    </div>

                    {/* Paragraph */}
                    <p className={`text-gray-700 leading-relaxed max-w-md ${styles.fontopensans}`}>
                        At <span className="font-semibold">Ritz Media World</span>, we believe that the best ideas come from collaboration and conversation. With 17+ years of experience as a top marketing agency in India and a top ad agency in Noida, we bring real-world insights into every discussion.
                    </p>

                    {/* CTA */}
                    <div className={`flex items-center gap-4 ${styles.montserrat}`}>
                        <span className="text-lg font-medium">Let’s Talk Today</span>
                        <div className="cursor-pointer w-12 h-12 bg-[#C99237] rounded-full flex items-center justify-center">
                            <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" className="text-white text-[16px]" />
                        </div>
                    </div>
                </div>

                {/* MIDDLE IMAGE */}
                <div className="w-full flex justify-center pl-6 items-end h-full">
                    <div className="relative w-[300px] md:w-[350px] lg:w-[400px] h-[400px]">
                        <Image
                            src="/discussion-forum/whyjoin.png" // 👈 replace with your image
                            alt="discussion"
                            fill
                            className="object-cover "
                        />
                    </div>
                </div>

                {/* RIGHT LIST */}
                <div className="bg-[#F7F7F7] p-6 ">
                    <div className={`flex flex-col gap-6 justify-end h-full ${styles.fontopensans}`}>
                        {[
                            "Ask questions about digital marketing agencies and strategies",
                            "Discuss trends with a social media marketing agency in India",
                            "Get expert advice from a content marketing agency in Noida",
                            "Connect with professionals looking for the best marketing agency in India",
                            "Learn strategies used by the top digital marketing company in Noida"
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4">

                                {/* Icon */}
                                <img
                                    src="/discussion-forum/check.png" // 👈 your existing image
                                    alt="Why Join"
                                    className="w-[17px] h-[17px] mt-2"
                                />

                                {/* Text */}
                                <p className="text-gray-800 text-[16px] leading-relaxed">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}