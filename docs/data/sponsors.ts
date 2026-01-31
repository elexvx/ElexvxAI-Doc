export type Sponsor = {
  name: string;
  description: string;
  tagline: string;
  link: string;
  coverTitle: string;
};

export const sponsors: Sponsor[] = [
  {
    name: 'Elexvx Inc',
    description: '发起公司，主要投资方',
    tagline: '关于我们 · 技术的价值在于让每个人都能共享数字化未来',
    link: 'https://ai.elexvx.com',
    coverTitle: '关于我们',
  },
  {
    name: '全国大学生创新创业实践大赛',
    description: '合作伙伴',
    tagline: '高校双创平台，共建创新生态',
    link: 'https://new.saikr.com',
    coverTitle: '创新创业实践',
  },
  {
    name: '南京市建邺区留创工坊',
    description: '合作伙伴 · 省级大学生创业示范园',
    tagline: '产业服务与人才支持',
    link: 'http://www.njjy.gov.cn',
    coverTitle: '产业服务',
  },
];
