import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      // Keep backward compatibility with legacy frontmatter during migration.
      nav: z
        .object({
          label: z.string().optional(),
          order: z.number().optional(),
        })
        .optional(),
    }),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    author: z.string().optional(),
    authorImg: z.string().optional(),
    readTime: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

const landing = defineCollection({
  type: 'data',
  schema: z.object({
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
    hero: z.object({
      headline: z.string(),
      subheadline: z.string().optional(),
      primaryCta: z.object({
        label: z.string(),
        href: z.string(),
      }),
      secondaryCta: z
        .object({
          label: z.string(),
          href: z.string(),
        })
        .optional(),
      announcement: z
        .object({
          title: z.string(),
          desc: z.string(),
          href: z.string(),
          icon: z.string().optional(),
        })
        .optional(),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
        icon: z.string(),
        href: z.string(),
      }),
    ),
    footer: z.object({
      tagline: z.string().optional(),
      wordmark: z.string().optional(),
      columns: z.array(
        z.object({
          title: z.string(),
          links: z.array(
            z.object({
              label: z.string(),
              href: z.string(),
            }),
          ),
        }),
      ),
      copyright: z.string().optional(),
    }),
  }),
});

export const collections = { docs, blog, landing };
