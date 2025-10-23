// app/services/[secondPage]/[thirdPage]/layout.tsx
import React from "react";
import { getMetaOrThrow } from "@/lib/meta";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Optional: generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { secondPage: string; thirdPage: string };
}): Promise<Metadata> {
  try {
    const data = await getMetaOrThrow(params.thirdPage, "serviceThird");
    return {
      title: data.meta_title,
      description: data.meta_description,
      keywords: data.meta_keywords,
    };
  } catch {
    // Use default metadata for new slugs
    return {
      title: "Default Service Title",
      description: "Default description for the service page",
      keywords: "services, advertising, default",
    };
  }
}

// Optional: if you still want static params for existing slugs
import { getAllSlugs } from "@/lib/meta"; // <-- Add missing import

export async function generateStaticParams() {
  const slugs = await getAllSlugs("serviceThird");
  return slugs as { secondPage: string; thirdPage: string }[];
}
export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { secondPage: string; thirdPage: string };
}) {
  const { secondPage, thirdPage } = params;

  try {
    // Try fetching meta for existing slugs
    await getMetaOrThrow(thirdPage, "serviceThird");
  } catch (err) {
    console.warn(
      `Meta not found for slug: ${thirdPage}. Using default meta.`,
      err
    );
    // Do not call notFound() here to allow rendering for new slugs
  }

  return <>{children}</>;
}
