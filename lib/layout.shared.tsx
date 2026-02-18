import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'ElexvxAI 研发中心',
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
        text: '案例',
        url: '/docs/cases',
        active: 'nested-url',
      },
      {
        text: '博客',
        url: '/blog',
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
