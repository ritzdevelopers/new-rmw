import Banner from "./sections/Banner";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";


function BlogInner({ slug , category }: { slug: string, category: string }) {

    const dummyBlogs = [
        {
            blogTitle: "Rise and Fall of Micromax: A Case Study in the Indian..",
            blogBanner: "/inner-demo-img.jpg",
            blogSlug: "rise-and-fall-of-micromax-a-case-study-in-the-indian",
            createdAt: new Date(),
        },
        {
            blogTitle: "Rise and Fall of Micromax: A Case Study in the Indian..",
            blogBanner: "/inner-demo-img.jpg",
            blogSlug: "rise-and-fall-of-micromax-a-case-study-in-the-indian",
            createdAt: new Date(),
        },
        {
            blogTitle: "Rise and Fall of Micromax: A Case Study in the Indian..",
            blogBanner: "/inner-demo-img.jpg",
            blogSlug: "rise-and-fall-of-micromax-a-case-study-in-the-indian",
            createdAt: new Date(),
        },
    ];
   
    return (
        <>
            <Banner title="260° Audio Branding Strategy" />
            <Section2 slug={slug} category={category} />
            <Section3 blogs={dummyBlogs} blogsLoading={false} />
        </>
    )
  }

export default BlogInner;