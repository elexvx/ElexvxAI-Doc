import type { AppLocale } from '@/lib/i18n';
import { readLocaleYaml } from '@/lib/content-yaml';

export type AboutBadge = {
  label: string;
  color: string;
};

export type AboutItem = {
  title: string;
  description: string;
};

export type AboutData = {
  header: {
    title: string;
    subtitle: string;
    badges: AboutBadge[];
  };
  about: {
    title: string;
    content: string;
  };
  whatWeDo: {
    title: string;
    items: AboutItem[];
  };
  valuesTitle: string;
  mission: {
    title: string;
    content: string;
  };
  vision: {
    title: string;
    content: string;
  };
  coreValues: {
    title: string;
    items: AboutItem[];
  };
  collaboration: {
    title: string;
    content: string;
  };
  lookingAhead: {
    title: string;
    content: string;
  };
  footer: {
    title: string;
    subtitle: string;
  };
};

export async function getAboutData(locale: AppLocale): Promise<AboutData> {
  return readLocaleYaml<AboutData>('about', locale);
}
