import { z, defineCollection } from 'astro:content';

const docsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string(),
        order: z.number().default(0),
        version: z.string().optional(),
        status: z.string().optional(),
    }),
});

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        date: z.string(),
        category: z.string(),
        author: z.string(),
        image: z.string(),
        readTime: z.string(),
    }),
});

export const collections = {
    'docs': docsCollection,
    'blog': blogCollection,
};
