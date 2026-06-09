import { Suspense } from "react";
import dynamic from "next/dynamic";
import Banner from "@/components/blogs/sections/Banner";
import BlogList from "@/components/blogs/sections/BlogList";
import BlogListSkeleton from "@/components/blogs/sections/BlogListSkeleton";

const BrandImpactSection1 = dynamic(
    () => import("@/components/copy/BrandImpactSection1")
);

/** Refetch listing from Mongo/MySQL periodically (production was serving a stale build). */
export const revalidate = 60;

function Page() {
    return (
        <>
            <Banner />
            <Suspense fallback={<BlogListSkeleton />}>
                <BlogList />
            </Suspense>
            <div className="w-full pb-[35px] lg:pb-[70px]">
                <BrandImpactSection1 />
            </div>
        </>
    );
}

export default Page;
