import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { AppLocale } from '@/lib/i18n';
import { parse } from 'yaml';

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

function getI18nUIYamlPath(locale: AppLocale) {
  return path.join(process.cwd(), 'data', 'yaml', 'i18n', `ui_${locale}.yaml`);
}

const i18nUIYamlCache = new Map<AppLocale, Promise<I18nUIYaml>>();
const useI18nUIYamlCache = process.env.NODE_ENV === 'production';

async function readI18nUIYaml(locale: AppLocale): Promise<I18nUIYaml> {
  if (!useI18nUIYamlCache) {
    const file = await readFile(getI18nUIYamlPath(locale), 'utf8');
    return parse(file) as I18nUIYaml;
  }

  let cached = i18nUIYamlCache.get(locale);
  if (!cached) {
    cached = readFile(getI18nUIYamlPath(locale), 'utf8')
      .then((file) => parse(file) as I18nUIYaml)
      .catch((error) => {
        i18nUIYamlCache.delete(locale);
        throw error;
      });
    i18nUIYamlCache.set(locale, cached);
  }

  return cached;
}

export async function getI18nUIText(locale: AppLocale): Promise<I18nUIText> {
  return readI18nUIYaml(locale);
}
