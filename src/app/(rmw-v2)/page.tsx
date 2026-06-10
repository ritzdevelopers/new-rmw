import { Suspense } from "react";
import HomePage from "@/components/home-v3/HomePage";
import LoadingLinesAndDots from "@/components/ui/LoadingLinesAndDots";

const HOME_CANONICAL_URL = "https://ritzmediaworld.com/";

export const revalidate = 300;
export const dynamic = "force-static";

export default function Page() {
  return (
    <>
      <link rel="canonical" href={HOME_CANONICAL_URL} />
      <div className="relative">
        <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center"><LoadingLinesAndDots /></div>}>
          <HomePage />
        </Suspense>
      </div>
    </>
  );
}