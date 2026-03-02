import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { AppLocale } from '@/lib/i18n';
import type { ReactNode } from 'react';
import { getNavLinks } from '@/lib/nav-links';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as AppLocale;

  return (
    <DocsLayout tree={source.getPageTree(locale)} {...baseOptions(locale)} links={getNavLinks(locale, { includeLanguageToggle: false })}>
      {children}
    </DocsLayout>
  );
}
