export type BlogPost = {
  title: string;
  summary: string;
  author: string;
  date: string;
  coverTitle: string;
  coverSubtitle: string;
  link: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: '版权与许可证声明',
    summary: '本文档的版权与许可证声明',
    author: 'ElexvxAI Lab Team',
    date: '2025/09/01',
    coverTitle: 'AstriDocs',
    coverSubtitle: 'V1.0',
    link: '/blog/posts/license-notice',
  },
  {
    title: 'AstriDocs 今天诞生啦',
    summary: '结合典型应用场景，总结 AI Agent 产品的需求建模、架构拆分与交互要点。',
    author: 'ElexvxAI Lab Team',
    date: '2025/08/31',
    coverTitle: 'AstriDocs',
    coverSubtitle: 'V1.0',
    link: '/blog/posts/astridocs-v1',
  },
];
