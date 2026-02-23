import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection — all markdown files in root docs/blog/
const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './docs/blog' }),
});

// Core docs collection — all markdown files in root docs/core/
const docs = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './docs/core' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        order: z.number().optional(),
        section: z.string().optional(),
    }),
});

export const collections = { blog, docs };
