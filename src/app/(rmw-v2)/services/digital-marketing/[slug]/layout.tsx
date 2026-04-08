import type { Metadata } from "next";
import data from "../../../../../../servive-layer-2.json";

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
};

function getServiceDataBySlug(slug: string) {
    return data.find((item: any) => item.link?.split("/").pop() === slug);
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { slug } = await params;
    const serviceData = getServiceDataBySlug(slug);
    
    if (!serviceData) {
        return {};
    }

    return {
        title: serviceData.meta_titles,
        description: serviceData.meta_description,
        keywords: serviceData.meta_keywords,
    };
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            {children}
        </>
    )
}