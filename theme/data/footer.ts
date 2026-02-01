export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterSocial = {
  label: string;
  href: string;
};

export type FooterData = {
  brand: string;
  description: string;
  columns: FooterColumn[];
  social: FooterSocial[];
  legal: {
    licenseLabel: string;
    licenseLink: string;
    statusLabel: string;
    statusValue: string;
    copyright: string;
    company: string;
    companyLink: string;
    icpLabel: string;
    icpLink: string;
  };
};

export const footerData: FooterData = {
  brand: 'ElexvxAI Lab',
  description:
    'Elexvx 用人工智能驱动创新、知识、人才、供应链，面向全球企业提供数字化增长动力。',
  columns: [
    {
      title: '文档',
      links: [
        { label: '创客指南', href: '/Scaffolding-System/' },
        { label: '规范文档', href: '/innovation/' },
      ],
    },
    {
      title: '访问',
      links: [
        { label: '博客', href: '/blog/' },
        { label: '更新日志', href: '/changelog/' },
        { label: '赞助商', href: '/sponsors/' },
      ],
    },
  ],
  social: [
    { label: 'X', href: 'https://x.com' },
    { label: 'GitHub', href: 'https://github.com/elexvx' },
    { label: 'Discord', href: 'https://discord.com' },
  ],
  legal: {
    licenseLabel: '本站遵循 CC BY-NC-ND 4.0 协议',
    licenseLink: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    statusLabel: '网站状态',
    statusValue: '正常',
    copyright: 'Copyright © 2024 ElexvxAI Lab',
    company: '隶属于 宏翔智道（南京）科技发展有限公司',
    companyLink: 'https://www.elexvx.com/',
    icpLabel: '苏ICP备2025160017号',
    icpLink: 'https://beian.miit.gov.cn/',
  },
};
