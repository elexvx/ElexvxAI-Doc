import { BlogIndexClient } from '@/components/blog/blog-index-client';
import { getAllPosts } from '@/lib/blog';
import { isLocale, type AppLocale } from '@/lib/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { HomeFooter } from '../_components/home-footer';
import { SITE_BLOG_MAIN_CLASS } from '@/lib/responsive-layout';
import { Suspense } from 'react';

const blogPageCopy: Record<AppLocale, { featuredLabel: string; allLabel: string; tabsAriaLabel: string; title: string; description: string }> = {
  zh: {
    featuredLabel: '精选内容',
    allLabel: '全部',
    tabsAriaLabel: '博客分类',
    title: '博客',
    description: 'ElexvxAI Lab 的最新动态、研究进展与工程实践。',
  },
  en: {
    featuredLabel: 'Featured',
    allLabel: 'All',
    tabsAriaLabel: 'Blog categories',
    title: 'Blog',
    description: 'Latest updates, research progress, and engineering practices from ElexvxAI Lab.',
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as AppLocale;
  const copy = blogPageCopy[locale];

  const allPosts = await getAllPosts();
  const categories = [...new Set(allPosts.flatMap((post) => post.categories))].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <main className={SITE_BLOG_MAIN_CLASS}>
        <Suspense>
          <BlogIndexClient
            lang={lang}
            allPosts={allPosts}
            categories={categories}
            featuredLabel={copy.featuredLabel}
            allLabel={copy.allLabel}
            tabsAriaLabel={copy.tabsAriaLabel}
          />
        </Suspense>
      </main>
      <HomeFooter lang={locale} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = blogPageCopy[lang];
  const canonical = buildAbsoluteUrl(buildLocalePath(lang, '/blog'));

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates('/blog'),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
    },
  };
}
