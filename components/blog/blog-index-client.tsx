'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { BlogPostListItem } from '@/lib/blog';
import { cn } from '@/lib/cn';
import { isSvgImage } from '@/lib/image-utils';

type BlogIndexClientProps = {
  lang: string;
  allPosts: BlogPostListItem[];
  categories: string[];
  featuredLabel: string;
  allLabel: string;
  tabsAriaLabel: string;
};

function FeaturedPostCard({ post, lang, badgeLabel }: { post: BlogPostListItem; lang: string; badgeLabel: string }) {
  const href = `/${lang}/blog/${post.slug}`;
  const categoryText = post.categories.join(' | ');
  const coverIsSvg = isSvgImage(post.cover);

  return (
    <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 2xl:grid-cols-[1fr_1fr]">
      <div className="order-1">
        <p className="text-[22px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">{badgeLabel}</p>
        <h1 className="mt-5 max-w-[540px] text-[clamp(2rem,4vw,2.5rem)] leading-[1.14] font-semibold tracking-[-0.015em] text-zinc-950 xl:text-[44px] dark:text-zinc-100">
          <Link href={href} className="transition hover:opacity-80">
            {post.title}
          </Link>
        </h1>
        <p className="mt-7 text-[13px] text-zinc-500 dark:text-zinc-400">
          {post.formattedDate} | {categoryText}
        </p>
      </div>
      <div className="order-2 relative aspect-[16/8.8] overflow-hidden rounded-[1.1rem] bg-zinc-100 lg:ml-auto lg:w-full lg:max-w-[760px] 2xl:max-w-[680px] dark:bg-zinc-900">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          unoptimized={coverIsSvg}
          className="object-cover object-center"
          sizes="(min-width: 1920px) 680px, (min-width: 1280px) 42vw, (min-width: 1024px) 46vw, 100vw"
        />
      </div>
    </section>
  );
}

function BlogPostCard({ post, lang }: { post: BlogPostListItem; lang: string }) {
  const href = `/${lang}/blog/${post.slug}`;
  const categoryText = post.categories.join(' | ');
  const coverIsSvg = isSvgImage(post.cover);

  return (
    <article className="flex items-center justify-between gap-5 border-b border-zinc-200 py-7 dark:border-zinc-800 sm:gap-6">
      <div className="min-w-0 max-w-[68%] flex-1 md:flex md:h-[132px] md:flex-col md:justify-between">
        <h2 className="text-[clamp(1.5rem,3.2vw,1.875rem)] leading-[1.14] font-semibold tracking-[-0.015em] text-zinc-900 xl:text-[32px] dark:text-zinc-100">
          <Link href={href} className="transition hover:opacity-80">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-[13px] text-zinc-500 dark:text-zinc-400">
          {post.formattedDate} | {categoryText}
        </p>
      </div>
      <div className="relative h-[124px] w-[124px] shrink-0 overflow-hidden rounded-2xl bg-black sm:h-[132px] sm:w-[132px]">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          unoptimized={coverIsSvg}
          className="object-cover object-center"
          sizes="132px"
        />
      </div>
    </article>
  );
}

export function BlogIndexClient({
  lang,
  allPosts,
  categories,
  featuredLabel,
  allLabel,
  tabsAriaLabel,
}: BlogIndexClientProps) {
  const searchParams = useSearchParams();
  const activeCategoryFromQuery = searchParams.get('category');
  const activeCategory =
    activeCategoryFromQuery && categories.includes(activeCategoryFromQuery) ? activeCategoryFromQuery : null;
  const featuredPost = allPosts.find((post) => post.featured);
  const displayFeatured = featuredPost ?? allPosts[0];

  const postsByCategory = useMemo(() => {
    if (activeCategory == null) return allPosts;
    return allPosts.filter((post) => post.categories.includes(activeCategory));
  }, [activeCategory, allPosts]);

  const listPosts = useMemo(() => {
    if (!featuredPost) return postsByCategory;
    return postsByCategory.filter((post) => post.slug !== featuredPost.slug);
  }, [featuredPost, postsByCategory]);

  const tabs = [allLabel, ...categories];

  return (
    <>
      {displayFeatured ? <FeaturedPostCard post={displayFeatured} lang={lang} badgeLabel={featuredLabel} /> : null}

      <nav className="mt-14 border-b border-zinc-200 dark:border-zinc-800" aria-label={tabsAriaLabel}>
        <ul className="flex items-center gap-7 overflow-x-auto">
          {tabs.map((tab) => {
            const isAllTab = tab === allLabel;
            const href = isAllTab ? `/${lang}/blog` : `/${lang}/blog?category=${encodeURIComponent(tab)}`;
            const isActive = isAllTab ? activeCategory == null : tab === activeCategory;

            return (
              <li key={tab}>
                <Link
                  href={href}
                  className={cn(
                    'inline-flex h-10 items-center border-b-2 border-transparent text-[14px] text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
                    isActive && 'border-blue-500 text-zinc-900 dark:border-blue-400 dark:text-zinc-100',
                  )}
                >
                  {tab}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="mt-2 grid gap-x-10 md:grid-cols-2">
        {listPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} lang={lang} />
        ))}
      </section>
    </>
  );
}
