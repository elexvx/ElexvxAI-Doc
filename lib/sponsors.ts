import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import type { AppLocale } from '@/lib/i18n';

type LocalizedText = {
  zh: string;
  en: string;
};

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
  category: LocalizedText;
  description: LocalizedText;
  href: string;
  accent: string;
};

type SponsorsYaml = {
  copy: Record<AppLocale, SponsorsPageCopy>;
  items: SponsorItem[];
};

function getSponsorsYamlPath() {
  return path.join(process.cwd(), 'data', 'yaml', 'sponsors', 'sponsors.yaml');
}

async function readSponsorsYaml(): Promise<SponsorsYaml> {
  const file = await readFile(getSponsorsYamlPath(), 'utf8');
  const parsed = parse(file) as SponsorsYaml;

  return {
    copy: parsed.copy,
    items: parsed.items,
  };
}

export async function getSponsorsPageCopy(locale: AppLocale): Promise<SponsorsPageCopy> {
  const data = await readSponsorsYaml();
  return data.copy[locale];
}

export async function getSponsorItems(): Promise<SponsorItem[]> {
  const data = await readSponsorsYaml();
  return data.items;
}
