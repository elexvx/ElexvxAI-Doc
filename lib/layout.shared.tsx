import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'ElexvxAI Lab',
    },
    links: [
      {
        text: '文档',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: '博客',
        url: 'https://blog.elexvxai.com',
        external: true,
      },
      {
        text: 'GitHub',
        url: 'https://github.com/elexvxai/lab',
        external: true,
      },
      {
        text: '社区',
        url: 'https://discord.gg/elexvxai',
        external: true,
      },
    ],
  };
}
