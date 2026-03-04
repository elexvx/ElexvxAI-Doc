import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  languages: ['zh', 'en'],
  defaultLanguage: 'zh',
  parser: 'dir',
  hideLocale: 'never',
  fallbackLanguage: null,
});

export type AppLocale = (typeof i18n.languages)[number];

export function isLocale(value: string): value is AppLocale {
  return (i18n.languages as string[]).includes(value);
}
