import Link from 'next/link';
import type { ResearcherListItem } from '@/lib/researchers';

export function ResearcherFeatured({
  researcher,
  lang,
  badgeLabel,
  detailCta,
  expertiseLabel,
}: {
  researcher: ResearcherListItem;
  lang: string;
  badgeLabel: string;
  detailCta: string;
  expertiseLabel: string;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 px-5 py-6 sm:px-7 sm:py-8 dark:border-zinc-800">
      <div className="grid gap-6 md:grid-cols-[1fr_minmax(260px,320px)] md:items-center md:gap-10">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">{badgeLabel}</p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-[-0.02em] text-zinc-900 sm:text-4xl dark:text-zinc-100">
            {researcher.name}
          </h2>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base dark:text-zinc-400">{researcher.role}</p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base dark:text-zinc-300">{researcher.summary}</p>
          <Link
            href={`/${lang}/researchers/${researcher.slug}`}
            className="mt-5 inline-flex items-center rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            {detailCta}
          </Link>
        </div>

        <div className={`relative overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br ${researcher.accent} p-5 dark:border-zinc-800`}>
          <div className="rounded-lg bg-white/80 px-4 py-3 backdrop-blur-sm dark:bg-zinc-900/70">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{expertiseLabel}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {researcher.expertise.map((item, index) => (
                <span
                  key={`${researcher.slug}-featured-${item}-${index}`}
                  className="rounded-full border border-zinc-300/70 px-2.5 py-1 text-[11px] text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-white/80 px-4 py-3 text-sm text-zinc-600 backdrop-blur-sm dark:bg-zinc-900/70 dark:text-zinc-300">
            {researcher.experience}
          </div>
        </div>
      </div>
    </section>
  );
}
