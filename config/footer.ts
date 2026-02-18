export type FooterLinkGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

export type FooterConfig = {
  brand: {
    name: string;
    slogan: string;
    description: string;
  };
  linkGroups: FooterLinkGroup[];
  complianceText: string;
};

export const footerConfig: FooterConfig = {
  brand: {
    name: 'ElexvxAI 研发中心',
    slogan: 'Engineering the Future with AI',
    description:
      '面向研发团队的一体化文档中枢，沉淀架构方案、实践案例与协作标准，帮助团队快速复制成功。',
  },
  linkGroups: [
    {
      title: '文档入口',
      links: [
        { label: '文档总览', href: '/docs' },
        { label: '案例文档', href: '/docs/cases' },
        { label: '博客文章', href: '/docs/blog' },
      ],
    },
    {
      title: '研发能力',
      links: [
        { label: '快速开始', href: '/docs/getting-started' },
        { label: '部署规范', href: '/docs/getting-started/installation' },
        { label: '常见问题', href: '/docs/getting-started/faq' },
      ],
    },
  ],
  complianceText: '© 2026 ElexvxAI Lab · All Rights Reserved',
};
