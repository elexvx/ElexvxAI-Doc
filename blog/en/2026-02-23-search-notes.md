---
title: Notes on Local Search
description: Why Pagefind, how we filter Docs/Blog, and what to expect for Chinese.
pubDate: 2026-02-23
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
author: "Sarah Wu"
authorImg: "https://i.pravatar.cc/150?u=b"
readTime: "8 min read"
category: "Research"
tags: [search, pagefind, performance]
---

## Why Pagefind

- Static output: index is generated after build
- Fast: shard-based index, loads on demand
- Simple: default UI works out of the box

## Filters

Each content page includes filter labels:

- `Type=Docs` or `Type=Blog`
- `Language=zh/en`
- `Version=v1/v2` (Docs only)

That lets the search UI narrow results by type and language, and by version for docs.

## Try searching these keywords

- “cursor”
- “rate_limited”
- “webhook”
