import Section1 from '@/components/home-v3/services/Section1'
import Section2 from '@/components/home-v3/services/Section2'
import Section3 from '@/components/home-v3/services/Section3';

async function callServicesData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`, {
            cache: 'force-cache',
            next: { revalidate: 60 }
        });

        if (!res.ok) throw new Error("Failed to fetch");

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default async function ServicePage1() {
    const {data} = await callServicesData();

    return (
        <>
            <Section1 />
            <Section2 />
            <Section3 servicesData={data}></Section3>
        </>
    )
}
