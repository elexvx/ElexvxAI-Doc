import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogConfig } from '@/config/blog';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogConfig.posts.find((item) => item.slug === params.slug);

  if (!post) notFound();

  return (
    <article className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.12),transparent_35%)]" />
      <div className="relative mx-auto w-full max-w-3xl px-6 pb-20 pt-16">
        <Link href="/blog" className="text-sm text-cyan-300 hover:text-cyan-200">
          ← 返回博客列表
        </Link>
        <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-cyan-300">{post.tag}</p>
        <h1 className="mt-3 text-4xl font-bold text-white">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-400">{post.date} · {post.readingTime}</p>

        <div className="mt-8 space-y-4 text-base leading-8 text-slate-300">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
