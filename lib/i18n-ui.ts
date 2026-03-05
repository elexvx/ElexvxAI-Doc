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

async function readI18nUIYaml(locale: AppLocale): Promise<I18nUIYaml> {
  const file = await readFile(getI18nUIYamlPath(locale), 'utf8');
  return parse(file) as I18nUIYaml;
}

export async function getI18nUIText(locale: AppLocale): Promise<I18nUIText> {
  return readI18nUIYaml(locale);
}
