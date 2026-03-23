import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { getSeoPage } from '@/lib/seo-content';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { HomeFooter } from '../_components/home-footer';
import { PageHeader } from '../_components/page-header';
import { getSponsorItems, getSponsorsPageCopy } from '@/lib/sponsors';
import { SITE_SECTION_MAIN_CLASS } from '@/lib/responsive-layout';

export default async function SponsorsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as AppLocale;
  const [copy, sponsorItems] = await Promise.all([
    getSponsorsPageCopy(locale),
    getSponsorItems(locale),
  ]);

  return (
    <>
      <main className={SITE_SECTION_MAIN_CLASS}>
        <PageHeader 
          title={copy.title} 
          description={copy.description}
        />

        <section className="mt-8">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-400">{copy.sectionTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {sponsorItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition group-hover:opacity-100`} />
                <div className="relative">
                  <span className="inline-flex rounded-full border border-zinc-300/80 px-2.5 py-1 text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                    {item.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-zinc-500 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </a>
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
  const seo = await getSeoPage(lang, 'sponsors');
  const canonical = buildAbsoluteUrl(buildLocalePath(lang, '/sponsors'));

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots,
    alternates: {
      canonical,
      languages: buildLocaleAlternates('/sponsors'),
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
