import Section1 from "@/components/home-v3/services/layer-1/Section1";
import Section2 from "@/components/home-v3/services/layer-1/Section2";
import Section3 from "@/components/home-v3/services/layer-1/Section3";
import Section4 from "@/components/home-v3/services/layer-1/Section4";
import Section5 from "@/components/home-v3/services/layer-1/Section5";
import Section6 from "@/components/home-v3/services/layer-1/Section6";
import Section7 from "@/components/home-v3/services/layer-1/Section7";
import Section8 from "@/components/home-v3/services/layer-1/Section8";
import type { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    
    try {
        // Read service meta JSON file
        const filePath = join(process.cwd(), 'service_meta.json');
        const fileContents = readFileSync(filePath, 'utf8');
        const serviceMeta = JSON.parse(fileContents);
        
        // Find the service meta data matching the slug
        const serviceData = serviceMeta.find((service: any) => service.slug === slug);
        
        if (!serviceData || !serviceData.meta) {
            // Return default metadata if slug not found
            return {
                title: "Services | Ritz Media World",
                description: "Explore our comprehensive range of digital marketing and media services.",
                keywords: "digital marketing, media services, Ritz Media World",
            };
        }

        const { title, description, keywords } = serviceData.meta;
        
        // Combine primary and secondary keywords
        const allKeywords = [
            keywords.primary,
            ...keywords.secondary
        ].join(', ');

        return {
            title,
            description,
            keywords: allKeywords,
            openGraph: {
                title,
                description,
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
            },
        };
    } catch (error) {
        // Return default metadata if file read fails
        console.error('Error reading service meta:', error);
        return {
            title: "Services | Ritz Media World",
            description: "Explore our comprehensive range of digital marketing and media services.",
            keywords: "digital marketing, media services, Ritz Media World",
        };
    }
}

function Page() {
    return (
        <>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
        </>
    )
}

export default Page;