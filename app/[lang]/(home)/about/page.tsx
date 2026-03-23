import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { getSeoPage } from '@/lib/seo-content';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { HomeFooter } from '../_components/home-footer';
import { PageHeader } from '../_components/page-header';
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

const emeraldBadgeClasses = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30';

const badgeColorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
  black: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
  green: emeraldBadgeClasses,
  emerald: emeraldBadgeClasses,
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border-orange-200 dark:border-orange-500/30',
};

const aboutCardAccentClasses = [
  'from-indigo-500/20 via-sky-400/15 to-cyan-300/20',
  'from-blue-500/20 via-indigo-300/15 to-purple-300/15',
  'from-emerald-500/25 via-teal-400/15 to-cyan-300/15',
  'from-violet-500/25 via-fuchsia-400/15 to-indigo-300/20',
  'from-orange-500/20 via-amber-300/15 to-rose-300/15',
  'from-lime-500/20 via-emerald-300/15 to-teal-300/15',
];

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as AppLocale;
  const data = await getAboutData(locale);

  return (
    <>
      <main className={SITE_SECTION_MAIN_CLASS}>
        {/* Header */}
        <PageHeader 
          title={data.header.title} 
          description={data.header.subtitle}
        >
          {data.header.badges.map((badge, i) => (
            <span 
              key={i} 
              className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${badgeColorMap[badge.color] || badgeColorMap.black}`}
            >
              {badge.label}
            </span>
          ))}
        </PageHeader>

        <div className="space-y-16">
          {/* About Us */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">{data.about.title}</h2>
              <FormattedContent text={data.about.content} />
            </section>

            {/* What We Do */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">{data.whatWeDo.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.whatWeDo.items.map((item, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${aboutCardAccentClasses[i % aboutCardAccentClasses.length]} opacity-0 transition group-hover:opacity-100`} />
                    <div className="relative">
                      <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                      <p className="mt-2 text-sm leading-5 text-zinc-500 dark:text-zinc-400 whitespace-pre-line">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mission & Vision */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">{data.valuesTitle}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-300/15 to-purple-300/15 opacity-0 transition group-hover:opacity-100" />
                  <div className="relative">
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">{data.mission.title}</h3>
                    <div className="mt-2 text-sm leading-5 text-zinc-500 dark:text-zinc-400 whitespace-pre-line">
                      {data.mission.content}
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/25 via-teal-400/15 to-cyan-300/15 opacity-0 transition group-hover:opacity-100" />
                  <div className="relative">
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">{data.vision.title}</h3>
                    <div className="mt-2 text-sm leading-5 text-zinc-500 dark:text-zinc-400 whitespace-pre-line">
                      {data.vision.content}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Values */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">{data.coreValues.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.coreValues.items.map((item, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-900">
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${aboutCardAccentClasses[i % aboutCardAccentClasses.length]} opacity-0 transition group-hover:opacity-100`} />
                    <div className="relative">
                      <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                      <p className="mt-2 text-sm leading-5 text-zinc-500 dark:text-zinc-400 whitespace-pre-line">{item.description}</p>
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
    keywords: seo.keywords,
    robots: seo.robots,
    alternates: {
      canonical,
      languages: buildLocaleAlternates('/about'),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    twitter: {
      card: seo.twitterCard ?? 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
}
