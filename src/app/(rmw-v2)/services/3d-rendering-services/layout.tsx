import { Metadata } from "next";

export const metadata: Metadata = {
    title: "3D Rendering Services Company in India | 3D Rendering Services Experts",
    description: "Boost brand recall and conversions with Ritz Media World's customized print advertising. Engaging designs, strategic placement, and compelling copy to engage your audience.",
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    keywords: [
        "3D Rendering Services",
        "3D Rendering Services Company",
        "3D Rendering Services Experts",
        "3D Rendering Services Agency",
        "3D Rendering Services Agency in India",
        "3D Rendering Services Agency in Delhi",
        "3D Rendering Services Agency in Noida",
        "3D Rendering Services Agency in Greater Noida",
        "3D Rendering Services Agency in Delhi NCR",
      
    ],
    openGraph: {
        title: "3D Rendering Services Company in India | 3D Rendering Services Experts",
        description: "Experience photo-realistic 3D exterior renderings that bring your building designs to life.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "3D Rendering Services Company in India | 3D Rendering Services Experts",
        description: "Experience photo-realistic 3D exterior renderings that bring your building designs to life.",
    },
};

export default function ThreeDRenderingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}