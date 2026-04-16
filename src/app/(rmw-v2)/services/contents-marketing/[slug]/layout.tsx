import type { Metadata } from "next";
import { fetchMeta } from "@/lib/fetch_meta";

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
};

function getCanonicalUrl(link: string | undefined, fallbackPath: string) {
    if (link?.startsWith("http")) return link;

    const path = link
        ? link.startsWith("/")
            ? link
            : `/${link}`
        : fallbackPath;

    return `https://ritzmediaworld.com${path}`;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { slug } = await params;
    const serviceData = await fetchMeta(slug);
    console.log("serviceData", serviceData);
    if (!serviceData) {
        console.log(`Service data not found for slug: ${slug}`);
        return {
            alternates: {
                canonical: `https://ritzmediaworld.com/services/contents-marketing/${slug}`,
            },
        };
    }

    return {
        title: serviceData.meta_title,
        description: serviceData.meta_description,
        keywords: serviceData.meta_keywords,
        alternates: {
            canonical: getCanonicalUrl(
                serviceData.link ?? undefined,
                `/services/contents-marketing/${slug}`,
            ),
        },
    };
}

export default function Layout({ children }: LayoutProps) {
    return <>{children}</>;
}