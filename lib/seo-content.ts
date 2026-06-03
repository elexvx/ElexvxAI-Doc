import { readLocaleYaml } from '@/lib/content-yaml';
import type { AppLocale } from '@/lib/i18n';

export type SeoPageKey = 'home' | 'blog' | 'sponsors' | 'maintenance' | 'docs' | 'about';

export type SeoEntry = {
  title: string;
  description: string;
  keywords?: string[];
  twitterCard?: 'summary' | 'summary_large_image';
  ogImage?: string;
  twitterImage?: string;
  robots?: string;
};

export type SeoSiteIcons = {
  icon: string;
  shortcut: string;
  apple: string;
};

export type SeoSiteEntry = SeoEntry & {
  icons: SeoSiteIcons;
};

type SeoContentYaml = {
  site?: Partial<Omit<SeoSiteEntry, 'icons'>> & {
    icons?: Partial<SeoSiteIcons>;
  };
  pages?: Partial<Record<SeoPageKey, Partial<SeoEntry>>>;
};

const seoContentCache = new Map<AppLocale, Promise<{
  site: SeoSiteEntry;
  pages: Record<SeoPageKey, SeoEntry>;
}>>();

const siteRobots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
const maintenanceRobots = 'noindex,nofollow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

function buildPageImagePath(locale: AppLocale, page: SeoPageKey) {
  return `/og/site/${locale}/${page}`;
}

const seoFallbacks: Record<
  AppLocale,
  {
    site: SeoSiteEntry;
    pages: Record<SeoPageKey, SeoEntry>;
  }
> = {
  zh: {
    site: {
      title: 'ElexvxAI Lab',
      description: 'ElexvxAI Lab 官方网站，聚焦 AI 研究、企业数字化、脚手架系统与产业落地。',
      keywords: ['ElexvxAI', 'AI研究', '人工智能', '企业数字化', '脚手架系统', '产业落地'],
      twitterCard: 'summary_large_image',
      robots: siteRobots,
      icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
      },
    },
    pages: {
      home: {
        title: 'AI研究与企业数字化',
        description: '访问 ElexvxAI Lab 创新产业研发中心，了解 AI 算法研究、企业后台脚手架系统、工程实践与产业落地。',
        keywords: ['AI研究', '企业数字化', '脚手架系统', '产业落地'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('zh', 'home'),
        twitterImage: buildPageImagePath('zh', 'home'),
        robots: siteRobots,
      },
      blog: {
        title: 'AI研究博客与工程实践',
        description: '浏览 ElexvxAI Lab 的最新动态、研发进展、技术文章与工程实践。',
        keywords: ['AI博客', '技术文章', '工程实践', '研发进展'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('zh', 'blog'),
        twitterImage: buildPageImagePath('zh', 'blog'),
        robots: siteRobots,
      },
      sponsors: {
        title: '合作伙伴与生态共建',
        description: '了解 ElexvxAI Lab 的合作伙伴、战略共建与开发者生态计划。',
        keywords: ['合作伙伴', '生态共建', '开发者计划'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('zh', 'sponsors'),
        twitterImage: buildPageImagePath('zh', 'sponsors'),
        robots: siteRobots,
      },
      maintenance: {
        title: '系统维护中',
        description: '页面正在维护升级，稍后将恢复 AI 研究、文档与合作内容访问。',
        keywords: ['系统维护', '升级公告'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('zh', 'maintenance'),
        twitterImage: buildPageImagePath('zh', 'maintenance'),
        robots: maintenanceRobots,
      },
      docs: {
        title: '技术文档与脚手架系统',
        description: '查看 ElexvxAI Lab 文档，了解企业后台脚手架系统、权限管理、系统配置、存储与验证能力。',
        keywords: ['技术文档', '脚手架系统', '权限管理', '系统配置', '存储', '验证'],
        robots: siteRobots,
      },
      about: {
        title: '关于我们',
        description: '认识 ElexvxAI Lab 的成立背景、AI 研发方向、产业应用场景与合作愿景。',
        keywords: ['关于我们', 'AI研发中心', '产业应用', '数字化转型'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('zh', 'about'),
        twitterImage: buildPageImagePath('zh', 'about'),
        robots: siteRobots,
      },
    },
  },
  en: {
    site: {
      title: 'ElexvxAI Lab',
      description: 'Official website of ElexvxAI Lab, focused on AI research, enterprise digitalization, scaffolding systems, and industrial deployment.',
      keywords: ['ElexvxAI', 'AI Research', 'Artificial Intelligence', 'Enterprise Digitalization', 'Scaffolding System', 'Industrial Deployment'],
      twitterCard: 'summary_large_image',
      robots: siteRobots,
      icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
      },
    },
    pages: {
      home: {
        title: 'AI Research and Enterprise Digitalization',
        description:
          "Visit ElexvxAI Lab's innovation R&D center to explore AI algorithm research, enterprise scaffolding systems, engineering practices, and industrial deployment.",
        keywords: ['AI Research', 'Enterprise Digitalization', 'Scaffolding System', 'Industrial Deployment'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('en', 'home'),
        twitterImage: buildPageImagePath('en', 'home'),
        robots: siteRobots,
      },
      blog: {
        title: 'AI Research Blog and Engineering Practices',
        description: 'Browse ElexvxAI Lab for the latest updates, research progress, technical articles, and engineering practices.',
        keywords: ['AI Blog', 'Engineering', 'Research', 'Technical Articles'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('en', 'blog'),
        twitterImage: buildPageImagePath('en', 'blog'),
        robots: siteRobots,
      },
      sponsors: {
        title: 'Partners and Ecosystem Co-creation',
        description: 'Discover ElexvxAI Lab partners, strategic co-creation, and developer ecosystem programs.',
        keywords: ['Partners', 'Ecosystem', 'Developer Program'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('en', 'sponsors'),
        twitterImage: buildPageImagePath('en', 'sponsors'),
        robots: siteRobots,
      },
      maintenance: {
        title: 'Under Maintenance',
        description: 'This page is being upgraded and will restore access to AI research, docs, and collaboration content soon.',
        keywords: ['Maintenance', 'Upgrade Notice'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('en', 'maintenance'),
        twitterImage: buildPageImagePath('en', 'maintenance'),
        robots: maintenanceRobots,
      },
      docs: {
        title: 'Technical Docs and Scaffolding System',
        description: 'Browse ElexvxAI Lab docs for the enterprise scaffolding system, permission management, configuration, storage, and verification capabilities.',
        keywords: ['Technical Docs', 'Scaffolding System', 'Permission Management', 'Configuration', 'Storage', 'Verification'],
        robots: siteRobots,
      },
      about: {
        title: 'About Us',
        description: "Learn about ElexvxAI Lab's founding context, AI R&D direction, industry applications, and collaboration vision.",
        keywords: ['About Us', 'AI Innovation Center', 'Industry Applications', 'Digital Transformation'],
        twitterCard: 'summary_large_image',
        ogImage: buildPageImagePath('en', 'about'),
        twitterImage: buildPageImagePath('en', 'about'),
        robots: siteRobots,
      },
    },
  },
};

function normalizeEntry(fallback: SeoEntry, value?: Partial<SeoEntry>): SeoEntry {
  const title = value?.title?.trim();
  const description = value?.description?.trim();
  const keywords = value?.keywords?.map((item) => item.trim()).filter((item) => item.length > 0);
  const twitterCard = value?.twitterCard ?? fallback.twitterCard;
  const ogImage = value?.ogImage?.trim();
  const twitterImage = value?.twitterImage?.trim();
  const robots = value?.robots?.trim();

  return {
    title: title && title.length > 0 ? title : fallback.title,
    description: description && description.length > 0 ? description : fallback.description,
    keywords: keywords && keywords.length > 0 ? keywords : fallback.keywords,
    twitterCard,
    ogImage: ogImage && ogImage.length > 0 ? ogImage : fallback.ogImage,
    twitterImage: twitterImage && twitterImage.length > 0 ? twitterImage : fallback.twitterImage,
    robots: robots && robots.length > 0 ? robots : fallback.robots,
  };
}

function normalizeSiteEntry(
  fallback: SeoSiteEntry,
  value?: Partial<Omit<SeoSiteEntry, 'icons'>> & { icons?: Partial<SeoSiteIcons> },
): SeoSiteEntry {
  const base = normalizeEntry(fallback, value);
  const icon = value?.icons?.icon?.trim();
  const shortcut = value?.icons?.shortcut?.trim();
  const apple = value?.icons?.apple?.trim();

  return {
    ...base,
    icons: {
      icon: icon && icon.length > 0 ? icon : fallback.icons.icon,
      shortcut: shortcut && shortcut.length > 0 ? shortcut : fallback.icons.shortcut,
      apple: apple && apple.length > 0 ? apple : fallback.icons.apple,
    },
  };
}

async function getSeoContent(locale: AppLocale) {
  const cached = seoContentCache.get(locale);
  if (cached) return cached;

  const promise = (async () => {
    const raw = await readLocaleYaml<SeoContentYaml>('seo', locale);
    const fallback = seoFallbacks[locale];

    return {
      site: normalizeSiteEntry(fallback.site, raw.site),
      pages: {
        home: normalizeEntry(fallback.pages.home, raw.pages?.home),
        blog: normalizeEntry(fallback.pages.blog, raw.pages?.blog),
        sponsors: normalizeEntry(fallback.pages.sponsors, raw.pages?.sponsors),
        maintenance: normalizeEntry(fallback.pages.maintenance, raw.pages?.maintenance),
        docs: normalizeEntry(fallback.pages.docs, raw.pages?.docs),
        about: normalizeEntry(fallback.pages.about, raw.pages?.about),
      },
    };
  })().catch((error) => {
    seoContentCache.delete(locale);
    throw error;
  });

  seoContentCache.set(locale, promise);
  return promise;
}

export async function getSeoSite(locale: AppLocale): Promise<SeoSiteEntry> {
  const content = await getSeoContent(locale);
  return content.site;
}

export async function getSeoPage(locale: AppLocale, page: SeoPageKey): Promise<SeoEntry> {
  const content = await getSeoContent(locale);
  return content.pages[page];
}
