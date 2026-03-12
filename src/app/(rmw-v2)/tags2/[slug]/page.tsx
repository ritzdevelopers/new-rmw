import BlogsFetchByTags from "@/components/tags/BlogsFetchByTags";
import { FIND_BLOGS_BY_KEYWORD } from "@/app/api/get_all_blogs/route";

async function Tags2Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = await FIND_BLOGS_BY_KEYWORD(slug);
    const data = result.data ?? [];
    console.log("Blog By Tag", data);
    return (
        <BlogsFetchByTags />
    )
}