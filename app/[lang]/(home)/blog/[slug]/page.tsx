import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { i18n } from '@/lib/i18n';
import { getMDXComponents } from '@/mdx-components';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang, slug } = await params;
  const { category: categoryParam } = await searchParams;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const MDX = post.body;
  const displayCategory =
    categoryParam && categoryParam.trim().length > 0 ? categoryParam : post.categories.join(' · ');

  return (
    <DocsPage
      toc={[]}
      breadcrumb={{ enabled: false }}
      footer={{ enabled: false }}
      tableOfContent={{ enabled: false }}
      tableOfContentPopover={{ enabled: false }}
    >
      <p className="text-xs font-medium tracking-[0.18em] text-fd-muted-foreground uppercase">{displayCategory}</p>
      <DocsTitle>{post.title}</DocsTitle>
      <DocsDescription className="mb-0">{post.formattedDate} · 文章详情</DocsDescription>
      <div className="mt-8 overflow-hidden rounded-xl border bg-fd-card">
        <img src={post.cover} alt={post.title} className="aspect-[16/9] w-full object-cover" />
      </div>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return i18n.languages.flatMap((lang) => posts.map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return {
    title: post.title,
    description: `${post.categories.join(' · ')} · ${post.formattedDate}`,
    openGraph: {
      images: post.cover,
    },
  };
}

export const dynamicParams = false;
