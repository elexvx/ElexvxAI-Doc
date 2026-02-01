import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

const globalNoticePath = path
  .resolve(__dirname, 'theme/GlobalNotice.tsx')
  .replace(/\\/g, '/');

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'ElexvxAI Lab',
  icon: '/rspress-icon.png',
  logo: {
    light: '/favicon.svg',
    dark: '/favicon.svg',
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/Scaffolding-System/' },
      { text: '博客', link: '/blog/' },
      { text: '更新日志', link: '/changelog/' },
      { text: '赞助商', link: '/sponsors/' },
    ],
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/elexvx',
      },
    ],
  },
  globalUIComponents: [globalNoticePath],
});
