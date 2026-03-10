import { type InferPageType } from 'fumadocs-core/source';
import { source } from '@/lib/source';

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}\n\n${processed}`;
}

const useLLMTextCache = process.env.NODE_ENV === 'production';
const llmFullTextCache = new Map<string, Promise<string>>();

export async function getLLMFullText(locale?: string) {
  if (!useLLMTextCache) {
    const scanned = await Promise.all(source.getPages(locale).map(getLLMText));
    return scanned.join('\n\n');
  }

  const cacheKey = locale ?? '__default__';
  let cached = llmFullTextCache.get(cacheKey);
  if (!cached) {
    cached = Promise.all(source.getPages(locale).map(getLLMText))
      .then((scanned) => scanned.join('\n\n'))
      .catch((error) => {
        llmFullTextCache.delete(cacheKey);
        throw error;
      });
    llmFullTextCache.set(cacheKey, cached);
  }

  return cached;
}
