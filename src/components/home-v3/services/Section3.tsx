"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import styles from "../page.module.css";
import S6 from "../S6";
import S7 from "../S7";

import styles2 from "./page.module.css";
import { BsArrowUpRight } from "react-icons/bs";

interface ServiceSubItem {
    service_id: number;
    [key: string]: any;
}

interface ServiceItem {
    id: number;
    sub?: ServiceSubItem[];
    [key: string]: any;
}

interface Section3Props {
    servicesData: ServiceItem[] | null | undefined;
}

function Section3({ servicesData }: Section3Props) {
    const [loader, setLoader] = useState<boolean>(true);
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    const [modal, setModal] = useState<{
        open: boolean;
        status: "success" | "error";
        message: string;
    }>({
        open: false,
        status: "success",
        message: "",
    });

    const validatePhone = (phoneNumber: string): string => {
        const digitsOnly = phoneNumber.replace(/\D/g, "");

        if (!phoneNumber.trim()) {
            return "Phone number is required";
        }

        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(phoneNumber)) {
            return "Phone number can only contain digits, spaces, +, -, and ()";
        }

        if (digitsOnly.length < 10) {
            return "Phone number must have at least 10 digits";
        }

        if (digitsOnly.length > 13) {
            return "Phone number cannot exceed 13 digits";
        }

        if (digitsOnly.length === 10) {
            if (!/^[6-9]/.test(digitsOnly)) {
                return "Indian mobile numbers should start with 6, 7, 8, or 9";
            }
        } else if (digitsOnly.length === 11) {
            if (!/^0[6-9]/.test(digitsOnly)) {
                return "Invalid phone number format";
            }
        } else if (digitsOnly.length === 12 || digitsOnly.length === 13) {
            if (!/^91[6-9]/.test(digitsOnly)) {
                return "Invalid country code. Use +91 for India";
            }
        }

        return "";
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);

        if (phoneError) {
            setPhoneError("");
        }
    };

    const handlePhoneBlur = () => {
        const error = validatePhone(phone);
        setPhoneError(error);
    };

    const downloadPDF = () => {
        const link = document.createElement("a");
        link.href = "/RMWCaseStudies_250327_081936.pdf";
        link.download = "RMWCaseStudies_250327_081936.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneValidationError = validatePhone(phone);
        if (phoneValidationError) {
            setPhoneError(phoneValidationError);
            setModal({
                open: true,
                status: "error",
                message: phoneValidationError,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const enquiryData = {
                etype: "HomePageDownload",
                name: "Home Page Visitor",
                email: "homepage@ritzmediaworld.com",
                phone: phone.trim(),
                message: "Enquiry from Home Page - 2025 Brand Impact Report Download Request",
                category: "Brand Impact Report Download",
            };

            const response = await fetch("/api/system-settings/contact-enquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(enquiryData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setModal({
                    open: true,
                    status: "success",
                    message: "Thank you! Your enquiry has been submitted successfully. The PDF will download shortly.",
                });

                setPhone("");
                setPhoneError("");

                setTimeout(() => {
                    downloadPDF();
                }, 500);
            } else {
                setModal({
                    open: true,
                    status: "error",
                    message: result.error || "Failed to submit enquiry. Please try again.",
                });
            }
        } catch (error) {
            console.error("Enquiry submission error:", error);
            setModal({
                open: true,
                status: "error",
                message: "Due to internal server errors your enquiry couldn't be sent. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (servicesData && servicesData?.length > 0) {
            setLoader(false);
            console.log(servicesData);

        }
    }, [servicesData]);

    useEffect(() => {
        if (modal.open && modal.status === "success") {
            const timer = setTimeout(() => {
                setModal({ ...modal, open: false });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [modal.open, modal.status]);




    return (
        <section className="flex justify-center items-center py-[70px]">
            {/* Center Align Container  */}
            <div className="flex flex-col w-full">

                {/* Row 1 For Heading  */}
                <div className={`flex items-end px-20 ${styles2.containerWidth}`}>
                    <p className="font-[700] text-[36px]">What we d</p>
                    <img src="/home-v3/service-imgs/s3/do-txt.png" alt="arrow-right" className="h-[17px] mb-[11px]" />
                </div>

                {/* Row 2 For Services Cards  */}
                <div className={`flex flex-col gap-3 ${styles2.containerWidth}`}>
                    {/* Cards   */}
                    {
                        [
                            {
                                img1: "/home-v3/service-imgs/s3/s1.png",
                                img2: "/home-v3/service-imgs/s3/s1-c.png",
                                lft: "-right-[15%]  xl:-right-[50%]",
                                copyHeight: "h-auto",
                                copyWidth: "w-[305px]",
                                mainHeight: "lg:h-[377px]",
                                txtLft: "left-14",
                                paddingTop: "pt-[0px]",
                                paddingLeft: "pl-[0px]",
                                mainWidth: "w-[377px]"
                            },
                            {
                                img1: "/home-v3/service-imgs/s3/s2.png",
                                img2: "/home-v3/service-imgs/s3/s2-c.png",
                                lft: "-right-[23%]  xl:-right-[50%]",
                                copyHeight: "h-auto",
                                copyWidth: "w-[305px]",
                                mainHeight: "h-[377px]",
                                txtLft: "left-14",
                                paddingTop: "pt-[0px]",
                                paddingLeft: "pl-[0px]",
                                mainWidth: "w-[344px]"
                            },
                            {
                                img1: "/home-v3/service-imgs/s3/s3.png",
                                img2: "/home-v3/service-imgs/s3/s3-c.png",
                                lft: "-right-[23%]  xl:-right-[80%]",
                                copyHeight: "h-auto",
                                copyWidth: "w-[305px]",
                                mainHeight: "h-[373px]",
                                txtLft: "left-14",
                                paddingTop: "pt-[0px]",
                                paddingLeft: "pl-[0px]",
                                mainWidth: "w-[335px]"
                            },
                            {
                                img1: "/home-v3/service-imgs/s3/s4.png",
                                img2: "/home-v3/service-imgs/s3/s4-c.png",
                                lft: "-right-[23%]  xl:-right-[2%]",
                                copyHeight: "h-[280px]",
                                copyWidth: "w-[280px]",
                                mainHeight: "h-[386px]",
                                txtLft: "left-24",
                                paddingTop: "pt-[50px]",
                                paddingLeft: "pl-[10px]",
                                mainWidth: "w-[386px]"
                            },
                            {
                                img1: "/home-v3/service-imgs/s3/s5.png",
                                img2: "/home-v3/service-imgs/s3/s5-c.png",
                                lft: "-right-[18%]  xl:-right-[50%]",
                                copyHeight: "h-auto",
                                copyWidth: "w-[305px]",
                                mainHeight: "h-[373px]",
                                txtLft: "left-14",
                                paddingTop: "pt-[0px]",
                                paddingLeft: "pl-[0px]",
                                mainWidth: "w-[373px]"
                            },
                            {
                                img1: "/home-v3/service-imgs/s3/s6.png",
                                img2: "/home-v3/service-imgs/s3/s6-c.png",
                                lft: "-right-[18%]  xl:-right-[50%]",
                                copyHeight: "h-auto",
                                copyWidth: "w-[305px]",
                                mainHeight: "h-[372px]",
                                txtLft: "left-14",
                                paddingTop: "pt-[0px]",
                                paddingLeft: "pl-[40px]",
                                mainWidth: "w-[372px]"
                            },
                            {
                                img1: "/home-v3/service-imgs/s3/s8.png",
                                img2: "/home-v3/service-imgs/s3/s8-c.png",
                                lft: "-right-[18%]  xl:-right-[35%]",
                                copyHeight: "h-auto",
                                copyWidth: "w-[305px]",
                                mainHeight: "h-[373px]",
                                txtLft: "left-14",
                                paddingTop: "pt-[0px]",
                                paddingLeft: "pl-[70px]",
                                mainWidth: "w-[373px]"
                            },
                            {
                                img1: "/home-v3/service-imgs/s3/s9.png",
                                img2: "/home-v3/service-imgs/s3/s9-c.png",
                                lft: "-right-[10%]  xl:-right-[18%]",
                                copyHeight: "h-[255px]",
                                copyWidth: "w-[255px]",
                                mainHeight: "h-[414px]",
                                txtLft: "left-18",
                                paddingTop: "pt-[0px]",
                                paddingLeft: "pl-[40px]",
                                mainWidth: "w-[414px]"
                            },
                        ].map((idx, i) => {
                            const service = servicesData?.[i];
                            return (
                                <div key={service?.id || i} className="flex justify-between items-center py-10 border-b border-[#D9D9D9] relative px-8 xl:px-20 ">

                                    {/* ABS Div  */}
                                    <div className="w-[283px] h-[125px] absolute top-1/2 left-0 -translate-y-1/2 bg-[#F7F7F7]"></div>

                                    {/* Left Side Container  */}
                                    <div className="relative ">
                                        {/* Image Container  */}
                                        <div className={`relative `}>
                                            <img src={idx.img1} alt="RMW" className={`${idx.mainWidth} ${idx.mainHeight}`}></img>


                                            {/* Absolute Positioned Copy img  */}
                                            <div className={` ${i === 3 ? "pt-[30px]" : "pt-0"}  absolute ${idx.lft} top-1/2 -translate-y-1/2 `}>
                                                <div className="w-full h-full relative">
                                                    <img src={idx.img2} alt=""
                                                        className={`${idx.copyWidth} ${idx.copyHeight} `}></img>

                                                    {/* Absolute Positioned Copy Text  */}
                                                    <div className={`absolute top-1/2 ${idx.txtLft} -translate-y-1/2 flex flex-col ${idx.paddingTop} ${idx.paddingLeft}`}>
                                                        <p className="font-[400] text-[15px] text-black pl-[4px]">0{i + 1}</p>
                                                        <h3 className="font-[500] mb-6 text-[36px]">{service?.title || "Digital Marketing"}</h3>
                                                        <div className="w-[50px] h-[50px] bg-[#C99237] rounded-full relative">
                                                            <BsArrowUpRight className='text-white text-[16px] sm:text-[17px] lg:text-[25px]
                                                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                                        ' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side Container  */}
                                    <div className="w-[496px] h-full  flex flex-col justify-between gap-8">

                                        {/* Row 1 For Text  */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-[400] text-[16px]">{service?.description || ""}</p>
                                        </div>

                                        {/* Div Row 2  */}
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ">
                                            {service?.sub && service.sub.length > 0 ? (
                                                service.sub.map((subItem: any, subIdx: number) => (
                                                    <div key={subItem.id || subIdx} className="w-[161px] h-[78px] bg-[#F2F2F2] flex items-center px-3">
                                                        <p className="font-[400] text-[14px] text-black">{subItem.s3heading1 || subItem.title || ""}</p>
                                                    </div>
                                                ))
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>


                {/* Row 3  */}
                <div className={`flex flex-col gap-6 sm:gap-8 px-4 sm:px-8 md:px-12 lg:px-20 lg:py-[70px] ${styles2.containerWidth}`}>

                    {/* Row 1  */}
                    <div className="flex flex-col">
                        <p className="font-[600] text-[12px] sm:text-[14px] md:text-[16px] uppercase text-[#C99237]">
                            Legendary Stories
                        </p>
                        <h3 className="font-[700] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-black">
                            We tell stories that lead to LEGENDS
                        </h3>
                        <p className="font-[400] text-[14px] sm:text-[15px] md:text-[16px]">
                            Crafting Stories That Build Timeless Legends
                        </p>
                    </div>

                    {/* Row 2  */}
                    <div className="w-full flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-0">
                        <div className="w-full lg:w-[456px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[424px] relative">
                            <Image src={"/home-v3/service-imgs/s3/s3-group.png"} alt="Ritz Media World" fill className="w-full h-full object-cover"></Image>
                        </div>



                        <div className="w-full lg:w-[456px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[424px] relative">
                            <Image src={"/home-v3/service-imgs/s3/s3-increase.png"} alt="Ritz Media World" fill className="w-full h-full object-cover"></Image>

                            {/* Absolute Position Text Container  */}
                            <div className="absolute inset-0 w-full h-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
                                <p className="font-[400] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-white">
                                    We command growth with millions of hours in collective experience. At this point, It's not a matter of 'if', it becomes a matter of 'when' you will attain the tipping point that will drive your.
                                </p>
                                <h4 className="font-[300] text-[28px] sm:text-[36px] md:text-[42px] xl:text-[50px] text-white mt-2 sm:mt-4">
                                    PERPETUAL <br />
                                    <span className="font-[800]">GROWTH</span>
                                </h4>
                            </div>
                        </div>


                        <div className="hidden lg:flex flex-col lg:pl-8 gap-4 sm:gap-6 lg:gap-8 justify-start lg:justify-end w-full lg:w-auto">

                            <div className="flex flex-row lg:flex-col gap-6 sm:gap-8 lg:gap-4">
                                <div>
                                    <p className="font-[700] text-[40px] sm:text-[50px] md:text-[41px] xl:text-[60px] text-[#0F1640]">
                                        1B+
                                    </p>
                                    <p className="font-[600] text-[14px] sm:text-[15px] md:text-[16px]">
                                        Creatives Published
                                    </p>
                                </div>

                                <div>
                                    <p className="font-[700] text-[40px] sm:text-[50px] md:text-[41px] xl:text-[60px] text-[#0F1640]">
                                        500+
                                    </p>
                                    <p className="font-[600] text-[14px] sm:text-[15px] md:text-[16px]">
                                        Success Stories
                                    </p>
                                </div>
                            </div>

                            <div className="google-reviews w-full sm:w-[220px] md:w-[172px] xl:w-[269px] pt-2 border-t border-t-[#AFAFAF]">
                                <img src="/home-v3/service-imgs/s3/google-reviews2.png" alt="google review" className="w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Row 3  */}
                    <div className="w-full flex flex-col md:flex-row justify-between pt-8 sm:pt-12 md:pt-16 lg:pt-[30px] gap-4 sm:gap-6 lg:gap-4">
                        <div className="w-full md:w-[48%] lg:w-[615px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[505px] relative">
                            <Image fill src={"/home-v3/service-imgs/s3/profitable-product.png"} alt="" className="w-full h-full object-cover"></Image>

                            
                            {/* Absolute Positioned Button  */}
                            <div className="w-full absolute left-0 top-[60%] pl-10 z-10">
                                <button className="w-[219px] cursor-pointer h-[54px] rounded-[5px] text-black font-[600] bg-[#ffffff]">
                                More About Us
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-[48%] lg:w-[615px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[505px] relative">
                            <Image fill src={"/home-v3/service-imgs/s3/company-mission.png"} alt="" className="w-full h-full object-cover"></Image>
                        </div>
                    </div>

                </div>

                {/* Copy Components  */}
                <div className={`flex flex-col px-20 ${styles2.containerWidth}`}>
                    {/* Copy Row 1  */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                        {/* Left Side Container  */}
                        <div className="relative w-full sm:w-[194px] h-auto sm:h-[156px] border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-r-[#D9D9D9] flex items-center justify-center sm:justify-start pb-4 sm:pb-0">
                            <p className="font-[700] text-[20px] sm:text-[22px] lg:text-[24px]" style={{
                                fontFamily: 'MontserratBold',
                            }}>Brands That Trust Us</p>

                            <p className="absolute top-[50%] transform -translate-y-[50%] -right-3 hidden sm:block">
                                <svg
                                    width="12"
                                    height="13"
                                    viewBox="0 0 12 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.25 6.49512L-6.11749e-07 12.9903L-4.39216e-08 -7.39247e-05L11.25 6.49512Z"
                                        fill="#D9D9D9"
                                    />
                                </svg>
                            </p>
                        </div>

                        {/* Right Side Container  */}
                        <div className="flex w-full md:pl-[47px] sm:w-[calc(100%-194px)] overflow-x-hidden">
                            {/* Slider Container  */}
                            <div className="w-full overflow-hidden">
                                <div className={`flex gap-4 sm:gap-6 lg:gap-8 w-max ${styles.clientSlider}`}>
                                    {[
                                        "/new-page/logos/prm-9.jpg",
                                        "/new-page/logos/prm-22.jpg",
                                        "/new-page/logos/mpf-bl.png",
                                        "/new-page/logos/rdx-lg.avif",
                                        "/new-page/logos/prm-9.jpg",
                                        "/new-page/logos/prm-2.png",
                                        // duplicate set 1
                                        "/new-page/logos/prm-3.png",
                                        "/new-page/logos/prm-4.png",
                                        "/new-page/logos/prm-5.png",
                                        "/new-page/logos/prm-6.png",
                                        "/new-page/logos/prm-9.jpg",
                                        "/new-page/logos/prm-7.png",
                                        // duplicate set 2 for seamless loop
                                        "/new-page/logos/prm-8.jpg",
                                        "/new-page/logos/prm-10.png",
                                        "/new-page/logos/prm-11.jpg",
                                        "/new-page/logos/prm-12.png",
                                        "/new-page/logos/exotica-logo.png",
                                        "/new-page/logos/prm-14.png",
                                        "/new-page/logos/prm-16.png",
                                        "/new-page/logos/prm-17.jpg",
                                        "/new-page/logos/prm-18.png",
                                        "/new-page/logos/prm-19.png",
                                        "/new-page/logos/prm-20.jpg",
                                        "/new-page/logos/scnd-3.jpg",
                                        "/new-page/logos/scnd-4.jpg",
                                        "/new-page/logos/scnd-5.jpg",
                                        "/new-page/logos/scnd-6.jpg",
                                        "/new-page/logos/scnd-7.jpg",
                                        "/new-page/logos/scnd-8.jpg",
                                        "/new-page/logos/scnd-9.jpg",
                                        "/new-page/logos/scnd-10.jpg",
                                        "/new-page/logos/scnd-11.jpg",
                                        "/new-page/logos/scnd-12.jpg",
                                        "/new-page/logos/scnd-13.jpg",
                                        "/new-page/logos/scnd-14.jpg",
                                        "/new-page/logos/scnd-15.jpg",
                                        "/new-page/logos/scnd-16.jpg",
                                        "/new-page/logos/scnd-17.jpg",
                                        "/new-page/logos/scnd-18.jpg",
                                    ].map((url, idx) => (
                                        <div
                                            key={idx}
                                            className="w-[100px] h-[56px] sm:w-[120px] sm:h-[67px] lg:w-[146px] lg:h-[81px] relative shrink-0"
                                        >
                                            <Image src={url} fill alt="RMW" className="object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* View More Container  */}
                            <div className="w-[100px] sm:w-[120px] lg:w-[146px] h-[56px] sm:h-[67px] lg:h-[81px] flex justify-center items-center flex-shrink-0">
                                <Link
                                    href={"https://ritzmediaworld.com/about.html"}
                                    target="_blank"
                                    className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] cursor-pointer border-b"
                                >
                                    Show more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Components  */}
                <div className="w-full">
                    {/* Row 2  */}
                    <div className="w-full min-h-[180px] xs:min-h-[190px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[247px] bg-[#F7F7F7] flex justify-center items-center py-5 xs:py-6 sm:py-8 md:py-10 lg:py-0">
                        {/* Center Align Cards Container  */}
                        <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-3 xs:gap-4 sm:gap-6 md:gap-10 lg:gap-16 w-full px-3 xs:px-4 sm:px-6 md:px-8 lg:px-0 max-w-[1920px] mx-auto">
                            {
                                [
                                    {
                                        ttl: "1B+",
                                        desc: "Words Written",

                                    },
                                    {
                                        ttl: "1M+",
                                        desc: "Creatives Published",

                                    },
                                    {
                                        ttl: "1K+",
                                        desc: "Campaigns Executed",

                                    },
                                    {
                                        ttl: "500+",
                                        desc: "Success Stories",

                                    },

                                ].map((ob, idx) => {
                                    return (
                                        <div key={idx} className={`flex flex-col justify-center items-center text-center
                                         px-3 xs:px-4 sm:px-5 md:px-8 lg:px-14 
                                         py-2.5 xs:py-3 sm:py-3.5 md:py-4
                                         w-[calc(50%-6px)] xs:w-[calc(50%-8px)] sm:w-auto
                                         ${idx < 3 ? "border-b-[1px] border-b-[#C9C9C9] pb-3 xs:pb-3.5 sm:pb-0 sm:border-b-0 sm:border-r-[1px] sm:border-r-[#C9C9C9]" : "pb-0 sm:border-r-0"}`}>
                                            <h5 className="font-[700] text-[28px] xs:text-[32px] sm:text-[36px] md:text-[45px] lg:text-[60px] text-[#000000] leading-tight">{ob.ttl}</h5>
                                            <p className="font-[400] text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-[#000000] mt-1 xs:mt-1.5 sm:mt-2">{ob.desc}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                {/* Copy Components  */}
                <div className={`${styles2.containerWidth}`}>
                    <S6 />
                </div>

                {/* Copy Components  */}
                <S7 />

                {/* Copy Components  */}
                {/* Row 2  */}
                <div className={`w-full flex flex-col lg:flex-row justify-between gap-6 px-10 lg:gap-6  lg:py-[70px] py-10  ${styles2.containerWidth}`}>
                    {/* Left Side Container  */}
                    <div className="w-full lg:w-[48%] xl:w-[603px] min-h-[500px] lg:h-[526px] bg-[#F7F7F7] flex flex-col justify-around px-1 lg:px-8 py-6 sm:py-7 lg:py-8 md:px-6">
                        <div className="text-center md:text-left mb-2 md:mb-0">
                            <p
                                className="uppercase font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-[#C99237]"
                                style={{
                                    fontFamily: "OpenSansSemiBold",
                                }}
                            >
                                Free Resource
                            </p>
                            <h2
                                className="font-[700] text-[21px]  lg:text-[36px]"
                                style={{
                                    fontFamily: "MontserratBold",
                                }}
                            >
                                2025 Brand Impact Report
                            </h2>
                        </div>
                        <p className="font-[700] text-[16px] lg:text-[24px] text-center md:text-left mb-2 md:mb-0">
                            Download Our
                        </p>

                        <p
                            className="font-[400] text-[13px]  lg:text-[16px] text-center md:text-left mb-2 md:mb-0"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            Get exclusive insights into real estate and lifestyle brand marketing trends, strategies, and ROI benchmarks for 2025.
                        </p>

                        <ul
                            className="font-[400] text-[13px] md:text-[15px] lg:text-[16px] list-none md:list-disc pl-4 flex flex-col gap-2 sm:gap-3 text-center md:text-left mb-4 md:mb-0"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            <li>Industry benchmarks for real estate marketing ROI</li>
                            <li>Proven strategies for UHNI audience targeting</li>
                            <li> 2025 digital and print advertising trends</li>
                            <li>Case studies with measurable results</li>
                        </ul>

                        <form onSubmit={handleDownload} className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        onBlur={handlePhoneBlur}
                                        placeholder="Enter your phone (e.g., +91 9220516777)"
                                        required
                                        className={`w-full sm:w-[319px] h-[48px] sm:h-[50px] border-1 rounded-[4px] bg-white px-4 placeholder:text-[#000000] placeholder:font-[400] placeholder:text-[13px] sm:placeholder:text-[14px] ${phoneError
                                                ? "border-[#EF4444]"
                                                : "border-[#DAD4D4]"
                                            }`}
                                    />
                                    {phoneError && (
                                        <p className="absolute top-full left-0 mt-1 text-[12px] text-[#EF4444] font-[400]">
                                            {phoneError}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-[209px] h-[48px] sm:h-[50px] bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] flex justify-center items-center gap-2 rounded-[5px] hover:bg-[#B8822F] transition-colors s1-btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        fontFamily: "PoppinsRegular",
                                    }}
                                >
                                    <p className="text-white">{isSubmitting ? "Submitting..." : "Free Download"}</p>
                                    <Download className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px]" />
                                </button>
                            </div>
                            <p
                                className="font-[400] text-[13px] sm:text-[14px] text-[#6E6E6E] text-center md:text-left"
                                style={{
                                    fontFamily: "PoppinsRegular",
                                }}
                            >
                                No spam, unsubscribe anytime. We respect your privacy.
                            </p>
                        </form>
                    </div>

                    {/* Right Side Container  */}
                    <div className="w-full lg:w-[48%] xl:w-[603px] lg:h-[526px] border-1 border-[#D4D4D4] lg:bg-[url('/home-v3/s8/s8img.png')] bg-cover bg-center px-6 sm:px-7 lg:px-8 py-6 sm:py-7 lg:py-8 flex flex-col gap-3 sm:gap-4">
                        <h2
                            className="font-[700] text-[24px] sm:text-[28px] lg:text-[36px] text-center md:text-left"
                            style={{
                                fontFamily: "MontserratBold",
                            }}
                        >
                            Or Get a Free <span className="text-[#C99237]">Brand Audit</span>{" "}
                        </h2>

                        <p
                            className="font-[400] text-[14px] md:text-[15px] lg:text-[16px] text-center md:text-left"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            Let our experts analyze your current brand positioning and provide
                            actionable recommendations.
                        </p>

                        <ul
                            className="list-none md:list-disc pl-4 flex flex-col gap-2 sm:gap-3 font-[400] text-[13px] md:text-[15px] lg:text-[16px] text-center md:text-left"
                            style={{
                                fontFamily: "PoppinsRegular",
                            }}
                        >
                            <li>Comprehensive brand analysis</li>
                            <li>Competitor positioning review</li>
                            <li>Growth opportunity identification</li>
                            <li>Customized strategy roadmap</li>
                        </ul>

                        <div className="flex border-b-1 border-b-black items-center justify-between cursor-pointer pb-2 w-full sm:w-[224px] lg:mt-5 text-center md:text-left">
                            <Link
                                href={"https://ritzmediaworld.com/contact.html"}
                                target="_blank"
                                className="font-[600] text-[14px] sm:text-[15px] lg:text-[16px] text-black"
                                style={{
                                    fontFamily: "MontserratSemiBold",
                                }}
                            >
                                Request A Free Audit
                            </Link>
                            <img
                                src="/home-v3/s3/rhgt.png"
                                alt="RMW"
                                className="w-[24px] h-[24px] sm:w-[25px] sm:h-[25px] lg:w-[27px] lg:h-[27px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 3  */}
                <div className={`w-full flex justify-center px-10 items-center ${styles2.containerWidth}`}>
                    {/* Center Align Container  */}
                    <div className="flex flex-col gap-2 sm:gap-3 justify-center text-center items-center bg-[#F5F5F5] min-h-[200px] sm:min-h-[240px] lg:min-h-[279px] w-full px-4 sm:px-6 lg:px-0 py-8 sm:py-10 lg:py-0">
                        <h2
                            className="font-[800] text-[19px] md:text-[28px] lg:text-[36px]"
                            style={{
                                fontFamily: "MontserratExtraBold",
                            }}
                        >
                            Ready to Elevate Your Brand?
                        </h2>
                        <p
                            className="font-[400] text-[16px] md:text-[24px] lg:text-[30px]"
                            style={{
                                fontFamily: "OpenSansRegular",
                            }}
                        >
                            Let's discuss your next brand-elevating campaign
                        </p>
                        <button
                            onClick={() => window.open("https://ritzmediaworld.com/contact.html", "_blank")}
                            className="w-full sm:w-[260px] lg:w-[282px] h-[48px] sm:h-[50px] lg:h-[54px] mt-4 bg-[#C99237] cursor-pointer text-white font-[700] text-[14px] sm:text-[14.5px] lg:text-[15px] rounded-[5px] hover:bg-[#B8822F] transition-colors  s1-btn-gold"
                            style={{
                                fontFamily: "OpenSansBold",
                            }}
                        >
                            <p className="text-white">Schedule Free Consultation</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modal.open && (
                <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[16px] shadow-2xl max-w-[400px] w-[90%] mx-4 overflow-hidden">
                        {/* Modal Header */}
                        <div className={`px-6 py-4 ${modal.status === "success" ? "bg-[#10B981]" : "bg-[#EF4444]"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {modal.status === "success" ? (
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                    <h3 className="text-lg font-semibold text-white">
                                        {modal.status === "success" ? "Success" : "Error"}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setModal({ ...modal, open: false })}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="px-6 py-4">
                            <p className="text-[#374151] text-sm leading-relaxed">
                                {modal.message}
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => setModal({ ...modal, open: false })}
                                className={`px-4 py-2 rounded-[8px] font-[500] text-sm transition-colors ${modal.status === "success"
                                        ? "bg-[#10B981] text-white hover:bg-[#059669]"
                                        : "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                                    }`}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Section3;