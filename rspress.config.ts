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
