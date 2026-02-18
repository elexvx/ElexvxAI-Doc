export type Sponsor = {
  name: string;
  role: string;
  intro: string;
  website: string;
  image: string;
};

export const sponsorsConfig = {
  title: '赞助商',
  subtitle: '感谢以下合作伙伴对研发中心建设与开放生态的长期支持。',
  items: [
    {
      name: 'Elexvx Inc',
      role: '发起公司 · 主要投资方',
      intro: '长期支持 AI 研发基础设施与开源生态建设。',
      website: 'https://ai.elexvx.com',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: '全国大学生创新创业实践大赛',
      role: '战略合作伙伴',
      intro: '联合推动高校创新实践与产业项目孵化。',
      website: 'https://new.saikr.com',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: '南京市建邺区留华工坊',
      role: '合作伙伴 · 省级大学生创业示范园',
      intro: '提供场地与产业资源支持，加速科研成果转化。',
      website: 'https://www.njyj.gov.cn',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    },
  ] satisfies Sponsor[],
};
