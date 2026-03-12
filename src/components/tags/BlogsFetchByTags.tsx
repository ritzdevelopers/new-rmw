import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";


function BlogsFetchByTags() {
    return (
        <>
            <Banner title="Tags" />
            <Section2 all_blogs={[]} />
            <Section3 />
        </>
    )
}


export default BlogsFetchByTags;