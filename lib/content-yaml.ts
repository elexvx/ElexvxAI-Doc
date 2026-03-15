import { stat } from 'node:fs/promises';
import { parse } from 'yaml';
import type { AppLocale } from '@/lib/i18n';
import { joinPath, readTextFile } from '@/lib/server-node';

type DevCacheEntry = {
  mtimeMs: number;
  value: unknown;
};

const prodPromiseCache = new Map<string, Promise<unknown>>();
const devCache = new Map<string, DevCacheEntry>();
const isProduction = process.env.NODE_ENV === 'production';

function getLocaleYamlPath(domain: string, locale: AppLocale) {
  return joinPath(process.cwd(), 'data', 'content', domain, `${locale}.yaml`);
}

async function readAndParseYaml<T>(filePath: string): Promise<T> {
  const fileContent = await readTextFile(filePath);
  return parse(fileContent) as T;
}

export async function readLocaleYaml<T>(domain: string, locale: AppLocale): Promise<T> {
  const filePath = getLocaleYamlPath(domain, locale);

  if (isProduction) {
    let cached = prodPromiseCache.get(filePath) as Promise<T> | undefined;
    if (!cached) {
      cached = readAndParseYaml<T>(filePath).catch((error) => {
        prodPromiseCache.delete(filePath);
        throw error;
      });
      prodPromiseCache.set(filePath, cached);
    }

    return cached;
  }

  const fileStat = await stat(filePath);
  const cached = devCache.get(filePath) as DevCacheEntry | undefined;
  if (cached && cached.mtimeMs === fileStat.mtimeMs) {
    return cached.value as T;
  }

  const parsed = await readAndParseYaml<T>(filePath);
  devCache.set(filePath, {
    mtimeMs: fileStat.mtimeMs,
    value: parsed,
  });

  return parsed;
}
