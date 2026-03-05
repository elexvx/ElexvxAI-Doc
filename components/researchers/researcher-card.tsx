import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getResearcherAccentOverlayClassName, type ResearcherListItem } from '@/lib/researchers';

export function ResearcherCard({
  researcher,
  lang,
  detailCta,
  expertiseLabel,
  experienceLabel,
  joinedLabel,
}: {
  researcher: ResearcherListItem;
  lang: string;
  detailCta: string;
  expertiseLabel: string;
  experienceLabel: string;
  joinedLabel: string;
}) {
  return (
    <Link
      href={`/${lang}/researchers/${researcher.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-5 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
    >
      <div className={getResearcherAccentOverlayClassName(researcher.accent)} />
      <div className="relative">
        <h3 className="text-lg font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">{researcher.name}</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{researcher.role}</p>
        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{researcher.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {researcher.expertise.map((item, index) => (
            <span
              key={`${researcher.slug}-${item}-${index}`}
              className="rounded-full border border-zinc-300/80 px-2.5 py-1 text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <dt className="text-zinc-500 dark:text-zinc-400">{experienceLabel}</dt>
            <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{researcher.experience}</dd>
          </div>
          <div className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <dt className="text-zinc-500 dark:text-zinc-400">{joinedLabel}</dt>
            <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{researcher.joined}</dd>
          </div>
        </dl>

        <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {detailCta}
          <ChevronRight className="size-4 transition group-hover:translate-x-0.5" />
        </p>
        <p className="sr-only">{expertiseLabel}</p>
      </div>
    </Link>
  );
}
