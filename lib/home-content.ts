import { readLocaleYaml } from '@/lib/content-yaml';
import type { AppLocale } from '@/lib/i18n';

export type HomeCapabilityItem = {
  title: string;
  description: string;
  icon: string;
  hoverGradient: string;
  hoverGlow: string;
};

export type HomeExploreItem = {
  title: string;
  icon: string;
  tint: string;
  href: string;
};

export type HomeHeroCopy = {
  headline: string;
  description: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  promoTitle: string;
  promoDescription: string;
  promoHref: string;
};

export type HomePageCopy = {
  hero: HomeHeroCopy;
  news: {
    title: string;
    viewAll: string;
  };
  explore: {
    title: string;
  };
};

export type HomeFooterColumn = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export type HomeFooterContent = {
  title: string;
  description: string;
  copyright: string;
  columns: HomeFooterColumn[];
};

type HomeContentYaml = {
  copy: Omit<HomePageCopy, 'hero'> & {
    hero: Omit<HomeHeroCopy, 'primaryCtaHref' | 'secondaryCtaHref' | 'promoHref'> &
      Partial<Pick<HomeHeroCopy, 'primaryCtaHref' | 'secondaryCtaHref' | 'promoHref'>>;
  };
  capabilities: HomeCapabilityItem[];
  exploreItems: HomeExploreItem[];
  footer: HomeFooterContent;
};

async function readHomeYaml(locale: AppLocale): Promise<HomeContentYaml> {
  return readLocaleYaml<HomeContentYaml>('home', locale);
}

export async function getHomePageCopy(locale: AppLocale): Promise<HomePageCopy> {
  const data = await readHomeYaml(locale);
  return {
    ...data.copy,
    hero: {
      ...data.copy.hero,
      primaryCtaHref: (data.copy.hero.primaryCtaHref ?? '/{lang}/docs').replace('{lang}', locale),
      secondaryCtaHref: (data.copy.hero.secondaryCtaHref ?? '/{lang}/docs').replace('{lang}', locale),
      promoHref: (data.copy.hero.promoHref ?? '/{lang}/docs').replace('{lang}', locale),
    },
  };
}

export async function getHomeCapabilities(locale: AppLocale): Promise<HomeCapabilityItem[]> {
  const data = await readHomeYaml(locale);
  return data.capabilities;
}

export async function getHomeExploreItems(locale: AppLocale): Promise<HomeExploreItem[]> {
  const data = await readHomeYaml(locale);
  return data.exploreItems.map((item) => ({
    title: item.title,
    icon: item.icon,
    tint: item.tint,
    href: item.href.replace('{lang}', locale),
  }));
}

export async function getHomeFooterContent(locale: AppLocale): Promise<HomeFooterContent> {
  const data = await readHomeYaml(locale);
  const content = data.footer;
  return {
    ...content,
    columns: content.columns.map((column) => ({
      ...column,
      links: column.links.map((item) => ({
        ...item,
        href: item.href.replace('{lang}', locale),
      })),
    })),
  };
}
