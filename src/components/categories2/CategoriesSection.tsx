import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";

function CategoriesSection({ slug, blogs }: { slug: string, blogs: any[] }) {
    return (
        <>
            <Banner slug={slug} />
            <Section2 all_blogs={blogs} />
            <Section3 />
        </>
    )
}

export default CategoriesSection;