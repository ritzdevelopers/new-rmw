import { getMetaOrThrow, getAllSlugs } from '@/lib/meta'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { categorypage: string } }): Promise<Metadata> {
  try {
    const getParam = await params;
    console.log(getParam.categorypage);
    const data = await getMetaOrThrow(getParam.categorypage, 'category')
    debugger
    return {
      title: data.meta_title,
      description: data.meta_description,
      keywords: data.meta_keywords
    }
  } catch {
    notFound()
  }
}

export async function generateStaticParams() {
  const slugs = (await getAllSlugs('category')) as { slug: string }[]
  return slugs.map(({ slug }) => ({ categorypage: slug }))
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { categorypage: string }
}) {
  try {
    const getParam = await params;
    await getMetaOrThrow(getParam.categorypage, 'category')
    return <>{children}</>
  } catch {
    notFound()
  }
}
