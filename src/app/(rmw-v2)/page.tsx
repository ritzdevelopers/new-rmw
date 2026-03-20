import { Suspense } from "react";
import HomePage from "@/components/home-v3/HomePage";
import LoadingLinesAndDots from "@/components/ui/LoadingLinesAndDots";

export const revalidate = 300;
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="relative">
      <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center"><LoadingLinesAndDots /></div>}>
        <HomePage />
      </Suspense>
    </div>
  );
}