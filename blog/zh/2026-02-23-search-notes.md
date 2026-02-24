---
title: 本地搜索的设计笔记
description: 为什么选 Pagefind、如何过滤 Docs/Blog、以及中文检索注意事项。
pubDate: 2026-02-23
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
author: "Sarah Wu"
authorImg: "https://i.pravatar.cc/150?u=b"
readTime: "8 min read"
category: "Research"
tags: [search, pagefind, performance]
---

## 为什么选 Pagefind

- 纯静态：构建后生成索引，不需要后端服务
- 性能好：分片索引、按需加载
- 易接入：默认 UI 可直接使用

## 过滤维度

本站给每个内容页打了过滤标签：

- `Type=Docs` 或 `Type=Blog`
- `Language=zh/en`
- `Version=v1/v2`（仅 Docs）

这样在搜索页可以：

1. 只搜文档或只搜博客
2. 只看某个语言
3. 在文档中按版本缩小范围

## 中文检索注意

Pagefind 对中文不做词干匹配（stemming），但仍可正常检索。

实践建议：

- 用更明确的关键词（例如“幂等”“限流”“游标分页”）
- 在标题中放关键术语（更容易被命中）

## 示例：可搜索的关键词

你可以在搜索页尝试：

- “cursor”
- “rate_limited”
- “webhook”
