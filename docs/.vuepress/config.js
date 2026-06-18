import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  title: 'Artitalk.js',
  description: '基于 Vercel 与 Neon Postgres 的轻量级说说/微语组件',
  bundler: viteBundler(),
  clientConfigFile: path.resolve(__dirname, './client.js'),
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: 'https://cdn.jsdelivr.net/gh/drew233/cdn/atico.png',
      },
    ],
  ],
  theme: defaultTheme({
    logo: 'https://cdn.jsdelivr.net/gh/drew233/cdn/logol.png',
    repo: 'HCLonely/Artitalk',
    navbar: [
      { text: '首页', link: '/' },
      { text: '使用文档', link: '/doc/' },
      { text: '配置项', link: '/settings/' },
      { text: '从Leancloud迁移', link: '/migration/' },
      { text: '更新日志', link: '/changelogs/' },
      { text: '示例页面', link: '/demo/' },
      { text: 'FAQ', link: '/faq/' },
    ],
    sidebar: 'heading',
    sidebarDepth: 2,
    editLink: false,
    contributors: false,
    lastUpdated: false,
  }),
})
