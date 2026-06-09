import { GET_ALL_BLOGS } from "@/app/api/get_all_blogs/route";
import Section2 from "./Section2";

async function BlogList() {
    const all_blogs = await GET_ALL_BLOGS();
    return <Section2 all_blogs={all_blogs?.data ?? []} />;
}

export default BlogList;
