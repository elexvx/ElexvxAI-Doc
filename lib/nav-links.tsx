import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import type { AppLocale } from '@/lib/i18n';
import { Github, Globe } from 'lucide-react';
import { NavLanguageToggle } from '@/components/nav/nav-language-toggle';
import { parse } from 'yaml';

type NavMainItem = {
  text: string;
  url: string;
  active: 'url' | 'nested-url';
  on: 'nav';
};

type NavIconItem = {
  text: string;
  label: string;
  url: string;
  icon: 'Github' | 'Globe';
  external: boolean;
  active: 'none';
};

type NavLinksYaml = {
  main: NavMainItem[];
  icons: NavIconItem[];
};

function getNavLinksYamlPath(locale: AppLocale) {
  return path.join(process.cwd(), 'data', 'yaml', 'navigation', `nav-links_${locale}.yaml`);
}

async function readNavLinksYaml(locale: AppLocale): Promise<NavLinksYaml> {
  const file = await readFile(getNavLinksYamlPath(locale), 'utf8');
  return parse(file) as NavLinksYaml;
}

function getIcon(icon: NavIconItem['icon']) {
  if (icon === 'Github') return <Github />;
  return <Globe />;
}

export async function getNavLinks(
  lang: AppLocale,
  { includeLanguageToggle = false }: { includeLanguageToggle?: boolean } = {},
): Promise<LinkItemType[]> {
  const navData = await readNavLinksYaml(lang);

  return [
    ...navData.main.map((item) => ({
      text: item.text,
      url: item.url.replace('{lang}', lang),
      active: item.active,
      on: item.on,
    })),
    ...(includeLanguageToggle
      ? ([
          {
            type: 'custom',
            secondary: true,
            children: <NavLanguageToggle lang={lang} showText showChevron className="-mx-1 first:ms-0 last:me-0" />,
          },
        ] as LinkItemType[])
      : []),
    ...navData.icons.map((item) => ({
      type: 'icon' as const,
      text: item.text,
      label: item.label,
      url: item.url,
      icon: getIcon(item.icon),
      external: item.external,
      active: item.active,
    })),
  ];
}
