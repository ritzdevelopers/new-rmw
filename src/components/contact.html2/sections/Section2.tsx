"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import pageStyles from "./page.module.css";
import {
    CONTACT_COUNTRIES,
    DEFAULT_CONTACT_COUNTRY,
    SORTED_CONTACT_COUNTRIES,
    validateContactPhone,
    type CountryEntry,
} from "@/lib/contactPhoneValidation";

const HCAPTCHA_SITEKEY = "e4a44c7a-13c4-4534-b210-d41242d2d262";

const SERVICE_OPTIONS = [
    "Digital Marketing",
    "Creative Services",
    "Print Advertising",
    "Radio Advertising",
    "Content Marketing",
    "Web Designing & Development",
    "Celebrity Endorsements",
    "Influencer Marketing",
];

const SOCIAL_LINKS = [
    {
        src: "/varun.icon/facebook.svg",
        href: "#",
        label: "Facebook",
        color: "#1877f2",
    },
    { src: "/varun.icon/twitter.svg", href: "#", label: "X", color: "#000" },
    {
        src: "/varun.icon/instagram.svg",
        href: "#",
        label: "Instagram",
        color: "#e4405f",
    },
    {
        src: "/varun.icon/linkedin.svg",
        href: "#",
        label: "LinkedIn",
        color: "#0a66c2",
    },
    {
        src: "/varun.icon/youtube.svg",
        href: "#",
        label: "YouTube",
        color: "#ff0000",
    },
];

function Section2() {
    const captchaRef = useRef<HCaptcha>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] =
        useState<CountryEntry>(DEFAULT_CONTACT_COUNTRY);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitPopup, setSubmitPopup] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const rejectInvalidPhone = (message: string) => {
        toast.error(message, { id: "contact-phone-invalid", duration: 4500 });
        phoneInputRef.current?.focus();
    };

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

    const handleCaptchaVerify = (token: string) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (!captchaToken) {
            toast.error("Please complete the captcha");
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);
        const nationalRaw = (formData.get("phone") as string) ?? "";
        const nationalDigits = nationalRaw.replace(/\D/g, "");
        const phoneResult = validateContactPhone(nationalDigits, selectedCountry);
        if (!phoneResult.ok) {
            rejectInvalidPhone(phoneResult.error);
            return;
        }
        const phoneE164 = phoneResult.e164;

        const email = ((formData.get("email") as string) ?? "").trim();
        if (!isValidEmail(email)) {
            const msg = "Please enter a valid email address";
            toast.error(msg);
            setSubmitPopup({ type: "error", message: msg });
            return;
        }

        const service = formData.get("service") as string;
        const query = formData.get("query") as string;
        const message = `Service: ${service}\n\nQuery: ${query}`;

        const data = {
            etype: "ContactUs",
            name: formData.get("name"),
            phone: phoneE164,
            email,
            message,
        };

        try {
            setIsSubmitting(true);
            setSubmitPopup(null);
            const response = await fetch(
                "/api/system-settings/contact-enquiry",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                },
            );
            const result = await response.json();

            if (response.ok) {
                const okMsg = result.message || "Query submitted successfully!";
                toast.success(okMsg);
                setSubmitPopup({ type: "success", message: okMsg });
                form.reset();
                setSelectedCountry(DEFAULT_CONTACT_COUNTRY);
                captchaRef.current?.resetCaptcha();
                setCaptchaToken(null);
            } else {
                const errMsg = result.message || "Submission failed. Try again.";
                toast.error(errMsg);
                setSubmitPopup({ type: "error", message: errMsg });
            }
        } catch {
            const errMsg = "Server error. Please try again later.";
            toast.error(errMsg);
            setSubmitPopup({ type: "error", message: errMsg });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-white py-[35px] lg:pt-[70px]">
            {/* Centered Align Container  */}
            <div
                className={`w-full ${pageStyles.containerWidth} flex flex-col md:w-full md:items-center lg:flex-row lg:items-stretch justify-center gap-8 lg:gap-[40px] xl:gap-[80px]`}
            >
                {/* Left: circular image + Follow Us */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="relative w-full aspect-square min-h-0">
                        <div
                            className="absolute inset-0 rounded-full overflow-hidden lg:h-[450px] xl:h-[590px]"
                            style={{ borderRadius: "50%" }}
                        >
                            <Image
                                src="/varunimage/contactemployee.jpg"
                                alt="Office team at work"
                                fill
                                unoptimized
                                sizes="(max-width: 1023px) 100vw, 480px"
                                className="object-cover rounded-full"
                            /> 
                        </div>
                        <div className="absolute right-[26px] bottom-[-56px] lg:bottom-[10px] xl:bottom-[-20px] w-[170px] h-[170px] sm:w-[42%] sm:min-w-[140px] sm:min-h-[140px] sm:aspect-square sm:h-auto bg-white rounded-full  flex flex-col items-center justify-center gap-3 p-4 border-[1px] border-[#0F1640]">
                            <h3
                                className={`font-semibold text-[18px] leading-[26px] text-center text-black m-0 ${pageStyles.fontMontserrat}`}
                            >
                                Follow Us
                            </h3>
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                                {SOCIAL_LINKS.map(({ src, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={src}
                                            alt={label}
                                            width={23}
                                            height={23}
                                            className="object-contain w-[23px] h-[23px]"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: contact form */}
                <div className="w-full max-w-[560px] md:max-w-full md:w-full lg:w-1/2 lg:max-w-none">
                    <h2
                        className={`font-semibold text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px] xl:text-[40px] text-[#000000] mt-[20px]  lg:mt-0 mb-2 lg:mb-0 xl:mb-2 leading-[50px] text-center lg:text-left ${pageStyles.fontMontserrat}`}
                    >
                        Your Big Idea Starts Here
                    </h2>
                    <p
                        className={`text-[15px]  lg:text-[15px] xl:text-[15px] text-[#000000] mb-7 lg:mb-0 xl:mb-7  w-full lg:max-w-[540px]  leading-[26px] text-center lg:text-left  ${pageStyles.fontopensans}`}
                    >
                        Got a project you&apos;re thinking about? Fill out the
                        form below, & our team will reach out to you soon to
                        make your ideas happen!
                    </p>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8 lg:gap-[10px] xl:gap-8"
                    >
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640]  text-base  focus:outline-none focus:ring-0  text-[#5C5C5C]
  placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[60px] 
  placeholder:${pageStyles.fontMontserrat} ${pageStyles.fontopensans}`}
                            />
                        </div>
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-4">
                                <select
                                    aria-label="Country calling code"
                                    className={`w-full py-2 pr-6 bg-transparent border-0 border-b border-[#0F1640] text-[14px] font-medium text-[#5C5C5C] leading-[20px] focus:border-black focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:16px_9px] bg-[position:right_0.25rem_center] ${pageStyles.fontMontserrat}`}
                                    style={{
                                        backgroundImage:
                                            'url("/varun.icon/down-arrow.svg")',
                                    }}
                                    value={selectedCountry.code}
                                    onChange={(e) => {
                                        const next = CONTACT_COUNTRIES.find(
                                            (c) => c.code === e.target.value,
                                        );
                                        if (next) setSelectedCountry(next);
                                    }}
                                >
                                    {SORTED_CONTACT_COUNTRIES.map((c) => (
                                        <option key={c.code} value={c.code}>
                                            {c.flag} {c.dial_code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-8">
                                <input
                                    ref={phoneInputRef}
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                    inputMode="numeric"
                                    autoComplete="tel-national"
                                    maxLength={15}
                                    onInput={(e) => {
                                        e.currentTarget.value =
                                            e.currentTarget.value.replace(
                                                /[^0-9]/g,
                                                "",
                                            );
                                    }}
                                    className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-base focus:border-black focus:outline-none focus:ring-0 
  placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[60px] 
  placeholder:${pageStyles.fontMontserrat} ${pageStyles.fontopensans}`}
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                autoComplete="email"
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-base focus:border-black focus:outline-none focus:ring-0 
  placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[60px] 
  placeholder:${pageStyles.fontMontserrat} ${pageStyles.fontopensans}`}
                            />
                        </div>
                        <div>
                            <select
                                name="service"
                                required
                                defaultValue=""
                                className={`w-full py-2 pr-8 bg-transparent border-0 border-b border-[#0F1640] text-[14px] font-medium text-[#5C5C5C] leading-[20px] focus:border-black focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:16px_9px] bg-[position:right_0.25rem_center] ${pageStyles.fontMontserrat}`}
                                style={{
                                    backgroundImage:
                                        'url("/varun.icon/down-arrow.svg")',
                                }}
                            >
                                <option value="" disabled>
                                    Select Service
                                </option>

                                {SERVICE_OPTIONS.map((opt) => (
                                    <option
                                        key={opt}
                                        value={opt}
                                        className="text-black font-medium"
                                    >
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <textarea
                                name="query"
                                placeholder="Write Message"
                                required
                                className={`w-full py-2 px-0 bg-transparent border-0 border-b border-[#0F1640] text-[#5C5C5C] text-[14px] leading-[10px] focus:border-black focus:outline-none focus:ring-0
  placeholder:text-[#5C5C5C] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[10px] mt-0 lg:mt-5
  ${pageStyles.fontMontserrat}`}
                            />
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start mt-3">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    disabled
                                    checked
                                    readOnly
                                    className="sr-only"
                                    aria-hidden
                                />
                            </label>
                            <HCaptcha
                                sitekey={HCAPTCHA_SITEKEY}
                                onVerify={handleCaptchaVerify}
                                ref={captchaRef}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex w-fit mx-auto lg:mx-0 items-center gap-5 text-base font-semibold text-black bg-transparent border-0 cursor-pointer hover:opacity-85 transition-opacity mt-3 disabled:opacity-60 disabled:cursor-not-allowed ${pageStyles.fontMontserrat}`}
                        >
                            <span
                                className={`font-medium text-[18px] leading-[46px] text-black ${pageStyles.fontMontserrat}`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </span>
                            <span className="w-[40px] h-[40px] rounded-full bg-[#C99237] flex items-center justify-center text-white flex-shrink-0">
                                <Image
                                    src="/varun.icon/submitbuttonarrow.svg"
                                    alt="Submit arrow"
                                    width={22.07}
                                    height={7.59}
                                />
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            {isSubmitting && (
                <div className="fixed inset-0 z-[9999] bg-black/65 flex items-center justify-center px-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl">
                        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#0F1640]" />
                        <p
                            className={`text-[20px] font-semibold text-[#0F1640] ${pageStyles.fontMontserrat}`}
                        >
                            Submitting Your Query
                        </p>
                        <p
                            className={`mt-2 text-[14px] text-[#5C5C5C] ${pageStyles.fontopensans}`}
                        >
                            Please wait while we process your request.
                        </p>
                    </div>
                </div>
            )}

            {submitPopup && !isSubmitting && (
                <div className="fixed inset-0 z-[9999] bg-black/65 flex items-center justify-center px-4">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl">
                        <div
                            className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white ${
                                submitPopup.type === "success"
                                    ? "bg-green-600"
                                    : "bg-red-600"
                            }`}
                        >
                            {submitPopup.type === "success" ? "✓" : "!"}
                        </div>
                        <p
                            className={`text-[20px] font-semibold ${
                                submitPopup.type === "success"
                                    ? "text-green-700"
                                    : "text-red-700"
                            } ${pageStyles.fontMontserrat}`}
                        >
                            {submitPopup.type === "success"
                                ? "Submitted Successfully"
                                : "Submission Failed"}
                        </p>
                        <p
                            className={`mt-2 text-[14px] text-[#5C5C5C] ${pageStyles.fontopensans}`}
                        >
                            {submitPopup.message}
                        </p>
                        <button
                            type="button"
                            onClick={() => setSubmitPopup(null)}
                            className={`mt-5 inline-flex items-center justify-center rounded-full bg-[#0F1640] px-5 py-2 text-sm font-medium text-white ${pageStyles.fontMontserrat}`}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Section2;
