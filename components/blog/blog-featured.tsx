import Link from 'next/link';
import type { BlogPostListItem } from '@/lib/blog';

export function BlogFeatured({ post, lang }: { post: BlogPostListItem; lang: string }) {
  const href = `/${lang}/blog/${post.slug}`;
  const categoryText = post.categories.join(' · ');

  return (
    <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
      <div className="order-1">
        <p className="text-[22px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">Featured</p>
        <h1 className="mt-5 max-w-[540px] text-[clamp(2rem,4vw,2.5rem)] leading-[1.14] font-semibold tracking-[-0.015em] text-zinc-950 xl:text-[44px] dark:text-zinc-100">
          <Link href={href} className="transition hover:opacity-80">
            {post.title}
          </Link>
        </h1>
        <p className="mt-7 text-[13px] text-zinc-500 dark:text-zinc-400">
          {post.formattedDate} · {categoryText}
        </p>
      </div>
      <div className="order-2 overflow-hidden rounded-[1.1rem] bg-zinc-100 dark:bg-zinc-900">
        <img src={post.cover} alt={post.title} className="aspect-[16/8.8] h-full w-full object-cover" />
      </div>
    </section>
  );
}
