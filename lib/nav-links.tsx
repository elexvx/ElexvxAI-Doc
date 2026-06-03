import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import type { SVGProps } from 'react';
import type { AppLocale } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import { NavLanguageToggle } from '@/components/nav/nav-language-toggle';
import { readLocaleYaml } from '@/lib/content-yaml';

type NavMainItem = {
  text: string;
  url: string;
  active: 'url' | 'nested-url';
  on?: 'menu' | 'nav' | 'all';
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

const navLinksCache = new Map<string, Promise<LinkItemType[]>>();

async function readNavLinksYaml(locale: AppLocale): Promise<NavLinksYaml> {
  return readLocaleYaml<NavLinksYaml>('navigation', locale);
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0.297C5.372 0.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.206 11.385.6.111.82-.26.82-.577v-2.03c-3.338.727-4.043-1.61-4.043-1.61-.547-1.387-1.334-1.756-1.334-1.756-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 0 1 6.002 0c2.29-1.552 3.298-1.23 3.298-1.23.653 1.652.24 2.873.117 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.624-5.48 5.921.43.372.823 1.103.823 2.222v3.293c0 .319.217.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.628-5.373-12-12-12Z" />
    </svg>
  );
}

function getIcon(icon: NavIconItem['icon']) {
  if (icon === 'Github') return <GithubIcon />;
  return <Globe />;
}

export async function getNavLinks(
  lang: AppLocale,
  { includeLanguageToggle = false }: { includeLanguageToggle?: boolean } = {},
): Promise<LinkItemType[]> {
  const cacheKey = `${lang}:${includeLanguageToggle ? '1' : '0'}`;
  let cached = navLinksCache.get(cacheKey);
  if (!cached) {
    cached = readNavLinksYaml(lang).then((navData) => [
      ...navData.main.map((item) => ({
        text: item.text,
        url: item.url.replace('{lang}', lang),
        active: item.active,
        on: item.on ?? 'all',
      })),
      ...(includeLanguageToggle
        ? ([
            {
              type: 'custom',
              secondary: true,
              children: (
                <li className="list-none">
                  <NavLanguageToggle lang={lang} showText showChevron className="-mx-1 first:ms-0 last:me-0" />
                </li>
              ),
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
    ]);
    navLinksCache.set(cacheKey, cached);
  }

  return cached;
}
