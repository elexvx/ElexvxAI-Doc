---
title: Why Blog Lives Outside Docs
description: Keeping docs versioned and stable while letting blog posts move faster.
pubDate: 2026-02-23
tags: [blog, docs, architecture]
---

## Context

A documentation site often contains two types of content:

- **Docs**: stable, structured, versioned (v1/v2)
- **Blog**: narrative, time-based, fast-moving (announcements, retros, notes)

Splitting Blog from Docs helps:

1. Keep docs navigation clean (version + sidebar)
2. Keep blog naturally chronological (pubDate + tags)
3. Improve search filtering (Type=Docs/Blog)

## When to migrate a post into docs

If a blog post becomes a long-lived reference, move it into `docs/en/v2/...` and leave a link from the blog.

## Next ideas

- Tag pages
- RSS feed
- Cover images and excerpts
