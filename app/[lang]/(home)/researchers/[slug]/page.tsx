import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { HomeFooter } from '../../_components/home-footer';
import { i18n, isLocale, type AppLocale } from '@/lib/i18n';
import { getResearcherBySlug, getResearchersPageCopy, getResearcherSlugs } from '@/lib/researchers';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';

export default async function ResearcherDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as AppLocale;
  const copy = await getResearchersPageCopy(locale);
  const researcher = await getResearcherBySlug(slug, locale);

  if (!researcher) notFound();

  return (
    <>
      <DocsPage
        toc={[]}
        breadcrumb={{ enabled: false }}
        footer={{ enabled: false }}
        tableOfContent={{ enabled: false }}
        tableOfContentPopover={{ enabled: false }}
      >
        <div className="text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{researcher.role}</p>
          <DocsTitle className="mx-auto mt-3 max-w-[20ch] text-center text-[clamp(1.9rem,6.2vw,4.2rem)] leading-[1.08] [text-wrap:balance]">
            {researcher.name}
          </DocsTitle>
          <DocsDescription className="mx-auto mt-4 mb-0 max-w-3xl text-center text-base !text-black dark:!text-white md:text-lg">
            {researcher.summary}
          </DocsDescription>
        </div>

        <div className={`relative mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br ${researcher.accent} p-5 dark:border-zinc-800`}>
          <div className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-lg border border-zinc-200 bg-white/85 px-4 py-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.experienceLabel}</p>
              <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{researcher.experience}</p>
            </article>
            <article className="rounded-lg border border-zinc-200 bg-white/85 px-4 py-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.joinedLabel}</p>
              <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{researcher.joined}</p>
            </article>
            <article className="rounded-lg border border-zinc-200 bg-white/85 px-4 py-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{copy.expertiseLabel}</p>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{researcher.expertise.join(' · ')}</p>
            </article>
          </div>
        </div>

        <DocsBody>
          <section>
            <h2>{copy.sectionQualification}</h2>
            <p>{researcher.education}</p>
          </section>

          <section>
            <h2>{copy.sectionAchievements}</h2>
            <ul>
              {researcher.achievements.map((item, index) => (
                <li key={`${researcher.slug}-achievement-${index}`}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{copy.sectionProjects}</h2>
            <ul>
              {researcher.projects.map((item, index) => (
                <li key={`${researcher.slug}-project-${index}`}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{copy.sectionContact}</h2>
            <p>{researcher.location}</p>
            <p>{researcher.email}</p>
          </section>
        </DocsBody>
      </DocsPage>
      <HomeFooter lang={locale} />
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getResearcherSlugs();
  return i18n.languages.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const researcher = await getResearcherBySlug(slug, lang);
  if (!researcher) notFound();
  const canonical = buildAbsoluteUrl(buildLocalePath(lang, `/researchers/${slug}`));

  return {
    title: researcher.name,
    description: researcher.summary,
    alternates: {
      canonical,
      languages: buildLocaleAlternates(`/researchers/${slug}`),
    },
    openGraph: {
      type: 'profile',
      url: canonical,
      title: researcher.name,
      description: researcher.summary,
    },
    twitter: {
      card: 'summary',
      title: researcher.name,
      description: researcher.summary,
    },
  };
}

export const dynamicParams = false;
