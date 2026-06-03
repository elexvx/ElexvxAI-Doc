import { docs } from '@/.source/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { i18n } from '@/lib/i18n';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  i18n,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

const sourcePagesCache = new Map<string, ReturnType<typeof source.getPages>>();
const sourcePageTreeCache = new Map<string, ReturnType<typeof source.getPageTree>>();

function getSourceCacheKey(locale?: string) {
  return locale ?? '__default__';
}

export function getSourcePages(locale?: string) {
  const cacheKey = getSourceCacheKey(locale);
  let cached = sourcePagesCache.get(cacheKey);
  if (!cached) {
    cached = source.getPages(locale);
    sourcePagesCache.set(cacheKey, cached);
  }

  return cached;
}

export function getSourcePageTree(locale?: string) {
  const cacheKey = getSourceCacheKey(locale);
  let cached = sourcePageTreeCache.get(cacheKey);
  if (!cached) {
    cached = source.getPageTree(locale);
    sourcePageTreeCache.set(cacheKey, cached);
  }

  return cached;
}

export function getPageImage(page: InferPageType<typeof source>) {
  const locale = page.locale ?? i18n.defaultLanguage;
  const segments = [locale, ...page.slugs, 'image.webp'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}
