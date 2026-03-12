import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";

function Blog({ all_blogs }: { all_blogs: any[] }) {
    return (
        <>
            <Banner />
            <Section2 all_blogs={all_blogs} />
            <Section3 />
        </>
    )
}


export default Blog;