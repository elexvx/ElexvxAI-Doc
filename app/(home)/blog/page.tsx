import Link from 'next/link';
import { blogConfig } from '@/config/blog';

export default function BlogPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.12),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-16">
        <h1 className="text-4xl font-bold text-white md:text-5xl">{blogConfig.title}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">{blogConfig.subtitle}</p>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {blogConfig.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-white/10 bg-slate-900/65 p-6 transition hover:border-cyan-400/70"
            >
              <p className="text-xs font-semibold tracking-[0.15em] text-cyan-300">{post.tag}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{post.description}</p>
              <p className="mt-4 text-xs text-slate-400">{post.date} · {post.readingTime}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
