import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import type { AppLocale } from '@/lib/i18n';
import { Github, Globe } from 'lucide-react';
import { NavLanguageToggle } from '@/components/nav/nav-language-toggle';
import { parse } from 'yaml';

type LocalizedText = {
  zh: string;
  en: string;
};

type NavMainItem = {
  text: LocalizedText;
  url: string;
  active: 'url' | 'nested-url';
  on: 'nav';
};

type NavIconItem = {
  text: LocalizedText;
  label: LocalizedText;
  url: string;
  icon: 'Github' | 'Globe';
  external: boolean;
  active: 'none';
};

type NavLinksYaml = {
  main: NavMainItem[];
  icons: NavIconItem[];
};

function getNavLinksYamlPath() {
  return path.join(process.cwd(), 'data', 'yaml', 'navigation', 'nav-links.yaml');
}

async function readNavLinksYaml(): Promise<NavLinksYaml> {
  const file = await readFile(getNavLinksYamlPath(), 'utf8');
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
  const navData = await readNavLinksYaml();

  return [
    ...navData.main.map((item) => ({
      text: item.text[lang],
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
      text: item.text[lang],
      label: item.label[lang],
      url: item.url,
      icon: getIcon(item.icon),
      external: item.external,
      active: item.active,
    })),
  ];
}
