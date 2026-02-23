export const SITE = {
  title: 'ElexvxAI Docs',
  defaultLang: 'zh',
  langs: ['zh', 'en'] as const,
  defaultVersion: 'v2',
  versions: ['v2', 'v1'] as const,
};

export type Lang = (typeof SITE.langs)[number];
export type Version = (typeof SITE.versions)[number];
