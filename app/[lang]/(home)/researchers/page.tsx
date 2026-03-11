import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomeFooter } from '../_components/home-footer';
import { ResearcherCard } from '@/components/researchers/researcher-card';
import { ResearcherFeatured } from '@/components/researchers/researcher-featured';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { getAllResearchers, getResearchersPageCopy } from '@/lib/researchers';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';

export default async function ResearchersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as AppLocale;
  const [copy, researchers] = await Promise.all([
    getResearchersPageCopy(locale),
    getAllResearchers(locale),
  ]);
  const [featuredResearcher, ...others] = researchers;

  return (
    <>
      <main className="mx-auto w-full max-w-[1460px] px-6 pb-10 pt-6 md:px-12 md:pb-12 md:pt-10 lg:px-20">
        <header className="mb-7">
          <h1 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-zinc-900 sm:text-4xl dark:text-zinc-100">{copy.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500 sm:text-base dark:text-zinc-400">{copy.description}</p>
        </header>

        {featuredResearcher ? (
          <ResearcherFeatured
            researcher={featuredResearcher}
            lang={lang}
            badgeLabel={copy.featuredLabel}
            detailCta={copy.detailCta}
            expertiseLabel={copy.expertiseLabel}
          />
        ) : null}

        <section className="mt-8">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-400">{copy.listTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((researcher) => (
              <ResearcherCard
                key={researcher.slug}
                researcher={researcher}
                lang={lang}
                detailCta={copy.detailCta}
                expertiseLabel={copy.expertiseLabel}
                experienceLabel={copy.experienceLabel}
                joinedLabel={copy.joinedLabel}
              />
            ))}
          </div>
        </section>
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
  const copy = await getResearchersPageCopy(lang);
  const canonical = buildAbsoluteUrl(buildLocalePath(lang, '/researchers'));

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates('/researchers'),
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
