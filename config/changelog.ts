export type ChangelogItem = {
  date: string;
  version: string;
  title: string;
  items: string[];
};

export const changelogConfig = {
  title: '更新日志',
  subtitle: '记录每一次值得被看见的改进。',
  entries: [
    {
      date: '2026/02/18',
      version: 'V2.3',
      title: '信息架构升级',
      items: [
        '新增独立博客、更新日志、赞助商页面，统一顶部导航。',
        '首页升级为模块化配置模板，支持参数化维护。',
        '优化站点底部信息区，增加版权与合规展示。',
      ],
    },
    {
      date: '2026/02/03',
      version: 'V2.2',
      title: '文档体验改进',
      items: [
        '新增案例专区与工程文档专题，完善研发知识结构。',
        '优化目录组织与文档跳转路径，提升查阅效率。',
      ],
    },
    {
      date: '2026/01/21',
      version: 'V2.1',
      title: '协作能力增强',
      items: [
        '引入 AI 检索与问答入口，提升跨团队知识获取效率。',
        '增加常见问题与安装文档，降低新成员上手门槛。',
      ],
    },
  ] satisfies ChangelogItem[],
};
