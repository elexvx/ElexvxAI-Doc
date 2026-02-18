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
  copyright: {
    license: string;
    siteStatus: string;
    company: string;
    icp: string;
    year: string;
  };
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
      title: '站点导航',
      links: [
        { label: '首页', href: '/' },
        { label: '博客', href: '/blog' },
        { label: '更新日志', href: '/changelog' },
        { label: '赞助商', href: '/sponsors' },
      ],
    },
    {
      title: '文档入口',
      links: [
        { label: '文档总览', href: '/docs' },
        { label: '快速开始', href: '/docs/getting-started' },
        { label: '案例文档', href: '/docs/cases' },
      ],
    },
  ],
  copyright: {
    license: 'CC BY-NC-ND 4.0',
    siteStatus: '正常',
    company: '羿娅通道（南京）科技发展有限公司',
    icp: '苏ICP备2025160017号',
    year: '2026',
  },
};
