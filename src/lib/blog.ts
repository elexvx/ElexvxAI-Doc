import { getCollection, type CollectionEntry } from 'astro:content';

export interface BlogPost {
    slug: string;
    title: string;
    summary: string;
    date: Date;
    author: string;
    tags: string[];
    image: string;
    featured: boolean;
    body: string;
    entry: CollectionEntry<'blog'>;
}

type HeaderMap = Record<string, string>;

function normalizeKey(key: string): string {
    return key.trim().toLowerCase().replace(/\s+/g, '');
}

function parseBoolean(value: string | undefined, fallback = false): boolean {
    if (!value) return fallback;
    return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function parseDate(value: string | undefined): Date {
    if (!value) return new Date('1970-01-01');
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date('1970-01-01') : parsed;
}

function firstHeading(markdown: string): string | null {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match?.[1]?.trim() ?? null;
}

function firstImage(markdown: string): string {
    const match = markdown.match(/!\[[^\]]*]\(([^)\s]+)[^)]*\)/);
    return match?.[1] ?? '';
}

function firstParagraph(markdown: string): string {
    const blocks = markdown
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean);

    for (const block of blocks) {
        if (block.startsWith('#')) continue;
        if (block.startsWith('![')) continue;
        if (block.startsWith('```')) continue;
        return block.replace(/\s+/g, ' ').slice(0, 220);
    }

    return '';
}

function parseTags(value: string | undefined): string[] {
    if (!value) return [];
    return value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
}

function parseHeader(markdown: string): { header: HeaderMap; body: string } {
    const headerMatch = markdown.match(/^\s*<!--\s*([\s\S]*?)\s*-->\s*/);
    if (!headerMatch) {
        return { header: {}, body: markdown.trimStart() };
    }

    const header: HeaderMap = {};
    const headerLines = headerMatch[1].replace(/\r\n/g, '\n').split('\n');

    for (const line of headerLines) {
        const pair = line.match(/^([A-Za-z][A-Za-z0-9 _-]*):\s*(.+)$/);
        if (!pair) continue;
        header[normalizeKey(pair[1])] = pair[2].trim();
    }

    return {
        header,
        body: markdown.slice(headerMatch[0].length).trimStart(),
    };
}

function parsePost(entry: CollectionEntry<'blog'>): BlogPost {
    const slug = entry.id;
    const { header, body } = parseHeader(entry.body);

    return {
        slug,
        title: header.title ?? firstHeading(body) ?? slug,
        summary: header.summary ?? firstParagraph(body),
        date: parseDate(header.date),
        author: header.author ?? 'ElexvxAI Team',
        tags: parseTags(header.tags),
        image: header.image ?? firstImage(body),
        featured: parseBoolean(header.featured, false),
        body,
        entry,
    };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const entries = await getCollection('blog');
    return entries
        .map((entry) => parsePost(entry))
        .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await getAllBlogPosts();
    return posts.find((post) => post.slug === slug);
}
