import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  Database,
  Rocket,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from 'lucide-react';

export type HeroMetric = {
  label: string;
  value: string;
};

export type HomeFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type HomeHighlight = {
  title: string;
  description: string;
};

export type HomeCase = {
  name: string;
  summary: string;
  tag: string;
  href: string;
};

export type HomeConfig = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryAction: { label: string; href: string };
    secondaryAction: { label: string; href: string };
    metrics: HeroMetric[];
  };
  features: HomeFeature[];
  highlights: HomeHighlight[];
  cases: HomeCase[];
};

export const homeConfig: HomeConfig = {
  hero: {
    badge: 'ElexvxAI R&D Documentation Hub',
    title: '构建研发中心级知识系统，驱动 AI 项目高速落地',
    subtitle:
      '聚合技术文档、标准流程、案例经验与博客洞察，形成可复用、可追溯、可演进的工程知识中台。',
    primaryAction: {
      label: '进入文档中心',
      href: '/docs',
    },
    secondaryAction: {
      label: '查看案例文档',
      href: '/docs/cases',
    },
    metrics: [
      { label: '研发知识模块', value: '128+' },
      { label: '标准化流程模板', value: '46' },
      { label: '跨团队复用率', value: '92%' },
    ],
  },
  features: [
    {
      title: '统一技术资产层',
      description: '整合架构规范、接口说明与上线手册，保障团队语义一致。',
      icon: Database,
    },
    {
      title: 'AI 协作式文档搜索',
      description: '面向研发语境的智能问答与检索，显著降低知识查询成本。',
      icon: Bot,
    },
    {
      title: '发布与审查双闭环',
      description: '从草稿到发布全程留痕，支持版本对比与质量审查。',
      icon: ShieldCheck,
    },
    {
      title: '跨域研发流程编排',
      description: '打通产品、算法、工程与运维流程，实现端到端协同。',
      icon: Waypoints,
    },
  ],
  highlights: [
    {
      title: '工程可复制',
      description: '通过模板化首页模块和参数配置，轻松扩展不同研发条线。',
    },
    {
      title: '数据可观测',
      description: '核心指标模块化展示，支持后续接入真实运营数据。',
    },
    {
      title: '体验更科技',
      description: '深色渐变、玻璃拟态卡片与光效装饰，强化研发品牌调性。',
    },
  ],
  cases: [
    {
      name: '智能客服知识检索平台',
      summary: '构建多源知识向量检索与答案生成体系，将响应时延压缩至秒级。',
      tag: 'NLP / RAG',
      href: '/docs/cases/intelligent-support',
    },
    {
      name: '预测性维护分析系统',
      summary: '结合时序模型与告警策略，提升设备异常预测准确率和处置效率。',
      tag: 'Time Series / MLOps',
      href: '/docs/cases/predictive-maintenance',
    },
  ],
};

export const homeSignalIcons = {
  sparkles: Sparkles,
  rocket: Rocket,
};
