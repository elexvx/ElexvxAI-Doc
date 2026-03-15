import type { AppLocale } from '@/lib/i18n';
import { readLocaleYaml } from '@/lib/content-yaml';

export type SponsorsPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  subline: string;
  stats: {
    totalLabel: string;
    totalValue: string;
    yearlyLabel: string;
    yearlyValue: string;
    openSourceLabel: string;
    openSourceValue: string;
  };
  sectionTitle: string;
};

export type SponsorItem = {
  name: string;
  category: string;
  description: string;
  href: string;
  accent: string;
};

type SponsorsYaml = {
  copy: Omit<SponsorsPageCopy, 'stats'> & {
    stats: Omit<SponsorsPageCopy['stats'], 'totalValue'> & {
      totalValue?: string;
      totalSuffix?: string;
    };
  };
  items: SponsorItem[];
};

type SponsorsData = {
  copy: SponsorsPageCopy;
  items: SponsorItem[];
};

async function readSponsorsYaml(locale: AppLocale): Promise<SponsorsData> {
  const parsed = await readLocaleYaml<SponsorsYaml>('sponsors', locale);
  const suffix = parsed.copy.stats.totalSuffix ?? parsed.copy.stats.totalValue?.replace(/^\s*\d+/, '') ?? '+';
  const totalValue = `${parsed.items.length}${suffix}`;

  return {
    copy: {
      ...parsed.copy,
      stats: {
        ...parsed.copy.stats,
        totalValue,
      },
    },
    items: parsed.items,
  };
}

export async function getSponsorsPageCopy(locale: AppLocale): Promise<SponsorsPageCopy> {
  const data = await readSponsorsYaml(locale);
  return data.copy;
}

export async function getSponsorItems(locale: AppLocale): Promise<SponsorItem[]> {
  const data = await readSponsorsYaml(locale);
  return data.items;
}
