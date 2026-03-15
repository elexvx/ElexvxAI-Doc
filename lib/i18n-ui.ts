import type { AppLocale } from '@/lib/i18n';
import { readLocaleYaml } from '@/lib/content-yaml';

export type I18nUIText = {
  displayName: string;
  search: string;
  searchNoResult: string;
  chooseLanguage: string;
  toc: string;
  tocNoHeadings: string;
  nextPage: string;
  previousPage: string;
};

type I18nUIYaml = I18nUIText;

async function readI18nUIYaml(locale: AppLocale): Promise<I18nUIYaml> {
  return readLocaleYaml<I18nUIYaml>('i18n', locale);
}

export async function getI18nUIText(locale: AppLocale): Promise<I18nUIText> {
  return readI18nUIYaml(locale);
}
