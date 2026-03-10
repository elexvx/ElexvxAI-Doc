import { blog as blogEntries } from 'fumadocs-mdx:collections/server';
import type { ReactNode } from 'react';

type BlogCategory = string | string[];

type BlogEntriesExport =
  | Array<{
      info: { path: string };
      title: string;
      date: string;
      category: BlogCategory;
      summary: string;
      cover: string;
      featured: boolean;
      body: unknown;
      toc: unknown;
    }>
  | {
      docs: Array<{
        info: { path: string };
        title: string;
        date: string;
        category: BlogCategory;
        summary: string;
        cover: string;
        featured: boolean;
        body: unknown;
        toc: unknown;
      }>;
    };

type BlogCollectionEntry = {
  info: { path: string };
  title: string;
  date: string;
  category: BlogCategory;
  summary: string;
  cover: string;
  featured: boolean;
  body: unknown;
  toc: unknown;
};

type BlogPostBase = {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  category: string;
  categories: string[];
  summary: string;
  cover: string;
  featured: boolean;
  timestamp: number;
};

export type BlogPostListItem = BlogPostBase;

export type BlogPost = BlogPostBase & {
  body: (props: Record<string, unknown>) => ReactNode;
  toc: BlogCollectionEntry['toc'];
};

function getSlugFromPath(path: string): string {
  return path.replace(/\.(md|mdx)$/i, '');
}

function toTimestamp(date: string): number {
  const parsed = new Date(date).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatBlogDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function normalizeCategories(input: BlogCategory): string[] {
  const raw = Array.isArray(input) ? input : [input];
  const categories = raw.map((item) => item.trim()).filter((item) => item.length > 0);

  if (categories.length === 0) return ['Uncategorized'];

  return [...new Set(categories)];
}

function mapToListItem(entry: BlogCollectionEntry): BlogPostListItem {
  const slug = getSlugFromPath(entry.info.path);
  const categories = normalizeCategories(entry.category);

  return {
    slug,
    title: entry.title,
    date: entry.date,
    formattedDate: formatBlogDate(entry.date),
    category: categories[0],
    categories,
    summary: entry.summary,
    cover: entry.cover,
    featured: entry.featured,
    timestamp: toTimestamp(entry.date),
  };
}

const useBlogCache = process.env.NODE_ENV === 'production';
let blogEntriesCache: Promise<BlogCollectionEntry[]> | null = null;
let allPostsCache: Promise<BlogPostListItem[]> | null = null;
let featuredPostCache: Promise<BlogPostListItem | undefined> | null = null;
let blogCategoriesCache: Promise<string[]> | null = null;
const blogPostBySlugCache = new Map<string, Promise<BlogPost | undefined>>();

async function readBlogEntriesUncached(): Promise<BlogCollectionEntry[]> {
  const resolved = (await Promise.resolve(blogEntries as unknown)) as BlogEntriesExport | undefined;

  if (Array.isArray(resolved)) return resolved as BlogCollectionEntry[];
  if (resolved && Array.isArray(resolved.docs)) return resolved.docs as BlogCollectionEntry[];
  return [];
}

async function resolveBlogEntries(): Promise<BlogCollectionEntry[]> {
  if (!useBlogCache) {
    return readBlogEntriesUncached();
  }

  if (!blogEntriesCache) {
    blogEntriesCache = readBlogEntriesUncached().catch((error) => {
      blogEntriesCache = null;
      throw error;
    });
  }

  return blogEntriesCache;
}

async function buildAllPosts(): Promise<BlogPostListItem[]> {
  const entries = await resolveBlogEntries();

  return entries
    .map(mapToListItem)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  if (!useBlogCache) {
    return buildAllPosts();
  }

  if (!allPostsCache) {
    allPostsCache = buildAllPosts().catch((error) => {
      allPostsCache = null;
      throw error;
    });
  }

  return allPostsCache;
}

export async function getFeaturedPost(): Promise<BlogPostListItem | undefined> {
  if (!useBlogCache) {
    return (await getAllPosts()).find((post) => post.featured);
  }

  if (!featuredPostCache) {
    featuredPostCache = getAllPosts()
      .then((posts) => posts.find((post) => post.featured))
      .catch((error) => {
        featuredPostCache = null;
        throw error;
      });
  }

  return featuredPostCache;
}

export async function getPostsByCategory(category: string): Promise<BlogPostListItem[]> {
  const allPosts = await getAllPosts();

  if (!category || category.toLowerCase() === 'all') {
    return allPosts;
  }

  return allPosts.filter((post) => post.categories.includes(category));
}

export async function getBlogCategories(): Promise<string[]> {
  if (!useBlogCache) {
    const categories = new Set((await getAllPosts()).flatMap((post) => post.categories));
    return [...categories].sort((a, b) => a.localeCompare(b));
  }

  if (!blogCategoriesCache) {
    blogCategoriesCache = getAllPosts()
      .then((posts) => {
        const categories = new Set(posts.flatMap((post) => post.categories));
        return [...categories].sort((a, b) => a.localeCompare(b));
      })
      .catch((error) => {
        blogCategoriesCache = null;
        throw error;
      });
  }

  return blogCategoriesCache;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!useBlogCache) {
    const entries = await resolveBlogEntries();
    const entry = entries.find((item) => getSlugFromPath(item.info.path) === slug);
    if (!entry) return undefined;

    const listItem = mapToListItem(entry);

    return {
      ...listItem,
      body: entry.body as (props: Record<string, unknown>) => ReactNode,
      toc: entry.toc,
    };
  }

  let cached = blogPostBySlugCache.get(slug);
  if (!cached) {
    cached = resolveBlogEntries()
      .then((entries) => {
        const entry = entries.find((item) => getSlugFromPath(item.info.path) === slug);
        if (!entry) return undefined;
        const listItem = mapToListItem(entry);

        return {
          ...listItem,
          body: entry.body as (props: Record<string, unknown>) => ReactNode,
          toc: entry.toc,
        };
      })
      .catch((error) => {
        blogPostBySlugCache.delete(slug);
        throw error;
      });
    blogPostBySlugCache.set(slug, cached);
  }

  return cached;
}
