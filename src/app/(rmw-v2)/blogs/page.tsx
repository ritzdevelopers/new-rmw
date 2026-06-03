import Blog from "@/components/blogs/Blog";
import { GET_ALL_BLOGS } from "@/app/api/get_all_blogs/route";

/** Refetch listing from Mongo/MySQL periodically (production was serving a stale build). */
export const revalidate = 60;

async function Page() {
    const all_blogs = await GET_ALL_BLOGS();
    return (
        <>
            <Blog all_blogs={all_blogs?.data ?? []} />
        </>
    )
}


export default Page;