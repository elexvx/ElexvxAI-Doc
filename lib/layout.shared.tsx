import Link from 'next/link';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SiteLogo } from '@/components/branding/site-logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600">
          <SiteLogo className="h-8 w-auto" />
          <span className="sr-only">ElexvxAI</span>
        </Link>
      ),
    },
    links: [
      {
        text: '首页',
        url: '/',
      },
      {
        text: '文档',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: '博客',
        url: '/blog',
        active: 'nested-url',
      },
      {
        text: '更新日志',
        url: '/changelog',
        active: 'nested-url',
      },
      {
        text: '赞助商',
        url: '/sponsors',
        active: 'nested-url',
      },
      {
        text: 'GitHub',
        url: 'https://github.com/elexvxai/lab',
        external: true,
      },
    ],
  };
}
