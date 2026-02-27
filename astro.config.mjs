// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import pwa from '@vite-pwa/astro';
import viteCompression from 'vite-plugin-compression';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';
import { remarkCards } from './src/plugins/remark-cards.mjs';

// https://astro.build/config
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:4321');

const versions = ['v2', 'v1'];

export default defineConfig({
  site,
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    tailwind(),
    react(),
    starlight({
      title: 'ElexvxAI Docs',
      description: 'ElexvxAI documentation and blog',
      locales: {
        zh: { label: '简体中文', lang: 'zh-CN' },
        en: { label: 'English', lang: 'en-US' },
      },
      defaultLocale: 'zh',
      sidebar: versions.map((version, index) => ({
        label: version,
        collapsed: index !== 0,
        autogenerate: { directory: version },
      })),
      customCss: ['/src/styles/tokens.css', '/src/styles/starlight-overrides.css'],
      routeMiddleware: ['./src/starlight/route-data.ts'],
      components: {
        Header: './src/components/starlight/Header.astro',
        ThemeProvider: './src/components/starlight/ThemeProvider.astro',
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
      },
    }),
    sitemap(),
    mdx(),
    pwa({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo/favicon.svg'],
      manifest: {
        name: 'ElexvxAI Docs',
        short_name: 'ElexvxAI',
        description: 'ElexvxAI documentation and blog',
        theme_color: '#0b0b0c',
        background_color: '#0b0b0c',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo/favicon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2,txt,xml}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /\/_astro\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'astro-assets',
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /\/(zh|en)\/(v1|v2|blog)\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'content-pages',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
      }),
    ],
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkCards],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
        },
      ],
    ],
  },
});
