import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { getSeoPage } from '@/lib/seo-content';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { HomeFooter } from '../_components/home-footer';
import { getAboutData } from '@/lib/about';
import { SITE_SECTION_MAIN_CLASS } from '@/lib/responsive-layout';

// Helper to render bold text and maintain paragraphs
function FormattedContent({ text }: { text: string }) {
  const paragraphs = text.split('\n\n');
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {p.split(/(\*\*.*?\*\*)/g).map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="font-semibold text-zinc-900 dark:text-zinc-100">{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      ))}
    </div>
  );
}

const badgeColorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
  black: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as AppLocale;
  const data = await getAboutData(locale);

  return (
    <>
      <main className={SITE_SECTION_MAIN_CLASS}>
        {/* Header */}
        <section className="rounded-2xl border border-zinc-200 px-5 py-12 sm:px-7 sm:py-16 dark:border-zinc-800 mb-12 text-center bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-[var(--fd-layout-width)]">
            <h1 className="text-3xl leading-tight font-bold tracking-[-0.02em] text-zinc-900 sm:text-5xl dark:text-zinc-100">
              {data.header.title}
            </h1>
            <p className="mx-auto mt-6 max-w-[var(--fd-layout-width)] text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8 dark:text-zinc-400 whitespace-pre-line">
              {data.header.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {data.header.badges.map((badge, i) => (
                <span 
                  key={i} 
                  className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${badgeColorMap[badge.color] || badgeColorMap.black}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-16">
          {/* About Us */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">{data.about.title}</h2>
              <FormattedContent text={data.about.content} />
            </section>

            {/* Organization Info */}
            <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-5">{data.organization.title}</h2>
              <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                {data.organization.items.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-zinc-200 pb-4 sm:border-0 sm:pb-0 dark:border-zinc-800">
                    <dt className="text-zinc-500 dark:text-zinc-400">{item.label}</dt>
                    <dd className="font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* What We Do */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">{data.whatWeDo.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {data.whatWeDo.items.map((item, i) => (
                  <div key={i} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Focus Areas */}
            <section className="rounded-xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-800">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">{data.focusAreas.title}</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {data.focusAreas.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Mission & Vision */}
            <section className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
                <h2 className="text-xl font-bold tracking-tight text-blue-900 dark:text-blue-100 mb-4">{data.mission.title}</h2>
                <div className="text-blue-800/80 dark:text-blue-200/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {data.mission.content}
                </div>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-6 dark:border-emerald-900/30 dark:bg-emerald-900/10">
                <h2 className="text-xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100 mb-4">{data.vision.title}</h2>
                <div className="text-emerald-800/80 dark:text-emerald-200/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {data.vision.content}
                </div>
              </div>
            </section>

            {/* Core Values */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">{data.coreValues.title}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {data.coreValues.items.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Looking Ahead & Collaboration */}
            <section className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">{data.collaboration.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {data.collaboration.content}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">{data.lookingAhead.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {data.lookingAhead.content}
                </p>
              </div>
            </section>
        </div>
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
  const seo = await getSeoPage(lang, 'about');
  const canonical = buildAbsoluteUrl(buildLocalePath(lang, '/about'));

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates('/about'),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}
