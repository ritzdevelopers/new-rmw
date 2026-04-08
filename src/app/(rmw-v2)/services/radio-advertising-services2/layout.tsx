import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FM Radio Advertising for Brand Recall & Engagement",
    description: "Maximize Brand Reach & Recognition with FM Radio Advertising Services. Reach millions of people & leave a lasting impression with our planned radio campaigns.",
    keywords: [
        "Radio Advertising",
        "Radio Campaigns",
        "Radio Ad Campaigns",
        "Radio Advertising Solutions",
        "brand recall",
        "radio advertising agency",
        "brand awareness",
        "Scriptwriting",
    ],
    openGraph: {
        title: "FM Radio Advertising for Brand Recall & Engagement",
        description: "Maximize Brand Reach & Recognition with FM Radio Advertising Services. Reach millions of people & leave a lasting impression with our planned radio campaigns.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "FM Radio Advertising for Brand Recall & Engagement",
        description: "Maximize Brand Reach & Recognition with FM Radio Advertising Services. Reach millions of people & leave a lasting impression with our planned radio campaigns.",
    },
};

export default function RadioAdvertisingPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}