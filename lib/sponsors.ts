import type { AppLocale } from '@/lib/i18n';
import { readLocaleYaml } from '@/lib/content-yaml';

export type SponsorsPageCopy = {
  title: string;
  description: string;
  cta: string;
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
  copy: SponsorsPageCopy;
  items: SponsorItem[];
};

type SponsorsData = {
  copy: SponsorsPageCopy;
  items: SponsorItem[];
};

async function readSponsorsYaml(locale: AppLocale): Promise<SponsorsData> {
  const parsed = await readLocaleYaml<SponsorsYaml>('sponsors', locale);

  return {
    copy: parsed.copy,
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
