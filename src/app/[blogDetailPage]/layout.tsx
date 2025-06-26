// app/[blog]/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/core-css.css";
import "../styles/unit-css.css";
import "../styles/spacing.css";
import "../styles/magnific-popup-css.css";
import "../styles/elementor-css.css";
import "../styles/animation-css.css";
import Header from "@/components/header/Header";
// import { TrackPageView } from "@/components/trackView/TrackPageView";

import { getMetaOrThrow, getAllSlugs } from '@/lib/meta'
import { notFound } from 'next/navigation'
// import  notFound  from '@/app/404'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { blogDetailPage: string } }): Promise<Metadata> {
  try {
    const allSlug = await params;
    const blog = await getMetaOrThrow(allSlug.blogDetailPage, 'blog')
    return {
      title: blog.meta_title,
      description: blog.meta_description,
      keywords: blog.meta_keywords?.split(','),
    }
  } catch {
    notFound()
  }
}

export async function generateStaticParams() {
  const slugs = (await getAllSlugs('blog')) as { slug: string }[]
  return slugs.map(({ slug }) => ({ blogDetailPage: slug }))
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { blogDetailPage: string }
}) {
  try {
    const allSlug = await params;
    await getMetaOrThrow(allSlug.blogDetailPage, 'blog')
    return <>
    <Header />
    {children}</>
  } catch {
    notFound()
  }
}
