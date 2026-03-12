import Blog from "@/components/blogs/Blog";
import { GET_ALL_BLOGS } from "@/app/api/get_all_blogs/route";

async function Page() {
    const all_blogs = await GET_ALL_BLOGS();
    return (
        <>
            <Blog all_blogs={all_blogs?.data ?? null} />
        </>
    )
}


export default Page;