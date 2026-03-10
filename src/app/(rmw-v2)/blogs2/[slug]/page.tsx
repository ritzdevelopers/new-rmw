import BlogInner from "@/components/blogs/inner/BlogInner"; 
function Page({ params, }: { params: { slug: string, category: string } }) {
    return (
        <>
            <BlogInner slug={params.slug} category={params.category} />
        </>
    )
}

export default Page;