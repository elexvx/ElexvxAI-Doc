export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  readingTime: string;
  content: string[];
};

export const blogConfig = {
  title: 'ElexvxAI 技术博客',
  subtitle: '研发中心在 AI 工程、文档治理与系统演进中的实践与思考。',
  posts: [
    {
      slug: 'ai-docs-ops',
      title: '从文档到工程资产：AI DocsOps 实践',
      description: '让文档成为研发流程中的第一公民。',
      date: '2026-01-12',
      tag: 'DocsOps',
      readingTime: '6 min',
      content: [
        '很多团队把文档当作“交付后补充品”，导致知识更新滞后、重复踩坑。',
        '我们将文档模板嵌入需求评审、方案评审和上线复盘，并对核心文档建立质量检查清单和版本追踪。',
        '当文档接入 AI 搜索和问答后，团队能够快速找到可执行结论，而不是只看到分散信息。',
      ],
    },
    {
      slug: 'rag-governance',
      title: 'RAG 系统治理：从可用到可控',
      description: '企业级 RAG 的评估、监控与迭代策略。',
      date: '2026-01-26',
      tag: 'RAG',
      readingTime: '8 min',
      content: [
        'RAG 在 PoC 阶段容易成功，但生产环境常遇到数据漂移和质量波动。',
        '治理的关键是建立统一评估：数据时效、检索召回、答案事实性与线上反馈闭环。',
        '将 RAG 当作持续运营系统，而不是一次性交付的模型项目，才能稳定释放业务价值。',
      ],
    },
  ] satisfies BlogPost[],
};
