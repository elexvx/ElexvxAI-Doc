import type { CollectionEntry } from 'astro:content';
import { SITE, type Lang } from '../config/site';

export type BlogEntry = CollectionEntry<'blog'>;

export function parseBlogId(id: string) {
  const parts = id.split('/');
  const lang = parts[0] ?? '';
  const rest = parts.slice(1);
  const slug = rest.join('/');
  return { lang, slug, rest };
}

export function isSupportedLang(lang: string): lang is Lang {
  return (SITE.langs as readonly string[]).includes(lang);
}

export function getBlogUrl(opts: { lang: string; slug?: string }) {
  const base = `/${opts.lang}/blog`;
  if (!opts.slug) return `${base}/`;
  return `${base}/${opts.slug}`;
}

export function sortBlog(a: BlogEntry, b: BlogEntry) {
  return b.data.pubDate.getTime() - a.data.pubDate.getTime();
}
