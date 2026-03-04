import { CapabilitiesSection } from './_components/capabilities-section';
import { ExploreSection } from './_components/explore-section';
import { HeroSection } from './_components/hero-section';
import { HomeFooter } from './_components/home-footer';
import { NewsSection } from './_components/news-section';
import { getHomeCapabilities, getHomeExploreItems, getHomePageCopy } from '@/lib/home-content';
import type { AppLocale } from '@/lib/i18n';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as AppLocale;
  const copy = await getHomePageCopy(locale);
  const capabilities = await getHomeCapabilities(locale);
  const exploreItems = await getHomeExploreItems(locale);

  return (
    <>
      <main className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-3 md:px-12 md:pt-6 lg:px-16">
        <HeroSection copy={copy.hero} />
        <CapabilitiesSection capabilities={capabilities} />
        <NewsSection lang={lang} copy={copy.news} />
        <ExploreSection title={copy.explore.title} exploreItems={exploreItems} />
      </main>
      <HomeFooter lang={locale} />
    </>
  );
}
