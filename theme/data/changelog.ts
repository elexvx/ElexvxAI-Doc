export type ChangelogEntry = {
  date: string;
  version: string;
  type: string;
  summary: string;
  details: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    date: '2025/09/20',
    version: 'AstriDocs V1.7',
    type: '更新',
    summary: '加快构建速度并优化商业计划书文档',
    details: [
      'next.config.mjs 启用 experimental.optimizePackageImports，减少三方包体积',
      'src/lib/sources.ts 仅按需引入图标并注册，提高加载效率',
    ],
  },
  {
    date: '2025/09/08',
    version: 'AstriDocs V1.6',
    type: '更新',
    summary: '新增 404 页面并优化文档结构和样式',
    details: [
      '新增 404 页面，优化页面结构和样式',
      '修复文档目录页渲染问题并优化交互',
    ],
  },
  {
    date: '2025/09/05',
    version: 'AstriDocs V1.5',
    type: '更新',
    summary: '完善布局与交互组件',
    details: [
      '引入 Footer 组件并优化底部信息展示',
      '添加 BackToHomeButton 返回顶部功能',
      '优化全局 CSS 与主题配色',
    ],
  },
  {
    date: '2025/09/03',
    version: 'AstriDocs V1.4',
    type: '更新',
    summary: '完善商业计划书模板与自动化生成',
    details: [
      '新增自动化生成脚本并完善模板目录结构',
      '优化首页展示内容与统计数据',
    ],
  },
  {
    date: '2025/09/02',
    version: 'AstriDocs V1.2',
    type: '优化',
    summary: '优化内容组织与交互体验',
    details: [
      '添加 Tabs 组件并支持文档内容切换',
      '改善表格渲染和目录可读性',
      '更新视觉样式，突出 AI 赋能理念',
    ],
  },
];
