import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getBlogUrl, parseBlogId, sortBlog } from "../lib/blog";

function escapeXml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = async ({ site, url }) => {
  const base = site ?? new URL(url.origin);
  const blogEntries = (await getCollection("blog"))
    .filter((entry) => !entry.data.draft)
    .sort(sortBlog);

  const items = blogEntries
    .map((entry) => {
      const { lang, slug } = parseBlogId(entry.id);
      const link = new URL(getBlogUrl({ lang, slug }), base).toString();
      const title = escapeXml(entry.data.title);
      const description = escapeXml(entry.data.description ?? "");
      const pubDate = entry.data.pubDate.toUTCString();
      const guid = escapeXml(link);

      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${guid}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<description>${description}</description>`,
        "</item>",
      ].join("");
    })
    .join("");

  const feedLink = new URL("/rss.xml", base).toString();
  const homeLink = new URL("/", base).toString();
  const lastBuildDate = new Date().toUTCString();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    "<title>ElexvxAI Docs Blog</title>",
    "<description>ElexvxAI latest blog posts</description>",
    `<link>${escapeXml(homeLink)}</link>`,
    `<atom:link href="${escapeXml(feedLink)}" rel="self" type="application/rss+xml" />`,
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, must-revalidate, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
