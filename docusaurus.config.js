// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const beian = '蜀ICP备2021009081号-1'
const path = require('path')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'roc 云原生',
  tagline: 'roc 云原生',
  favicon: 'img/logo.png',

  // Set the production url of your site here
  url: 'https://imroc.cc',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'imroc', // Usually your GitHub org/user name.
  projectName: 'imroc.cc', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },

  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    [
      '@docusaurus/plugin-ideal-image',
      {
        disableInDev: false,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          { tagName: 'meta', name: 'theme-color', content: '#12affa' },
        ],
      },
    ],
    [
      path.resolve(__dirname, './src/plugin/plugin-content-blog'), // 为了实现全局 blog 数据，必须改写 plugin-content-blog 插件
      {
        showReadingTime: true,
        blogTitle: '博客',
        blogDescription: "roc 的博客",
        blogSidebarCount: 'ALL',
        blogSidebarTitle: "文章列表",
        routeBasePath: 'blog',
        feedOptions: {
          type: 'all',
          title: 'roc',
          copyright: `Copyright ${new Date().getFullYear()} roc | All Right Reserved | <a href="http://beian.miit.gov.cn/">${beian}</a>`,
        },
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        editUrl: ({ blogPath }) =>
          `https://github.com/imroc/blog/edit/master/${blogPath}`
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: 'note',
        path: 'note',
        exclude: ['_codeblock/**'],
        routeBasePath: '/note',
        sidebarPath: require.resolve('./note/sidebars.js'),
        remarkPlugins: [
          [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
        ],
        editUrl: ({ docPath }) =>
          `https://github.com/imroc/note/edit/master/${docPath}`,
      }),
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss')
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'ZYXQ3PWXL9',
        apiKey: '69800e3da186c48e981785d47ee09e6e',
        indexName: 'imroc',
        contextualSearch: true,
      },
      navbar: {
        title: 'roc 云原生',
        logo: {
          alt: '',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'dropdown',
            position: 'right',
            label: '电子书',
            items: [
              {
                label: 'Kubernetes 实践指南',
                href: 'https://imroc.cc/kubernetes',
              },
              {
                label: 'istio 实践指南',
                href: 'https://imroc.cc/istio',
              },
            ]
          },
          { to: '/blog', label: '博客', position: 'right' },
          {
            label: '开源项目',
            position: 'right',
            to: '/project',
          },
          {
            label: '技术笔记',
            position: 'right',
            to: '/note',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '电子书',
            items: [
              {
                label: 'Kubernetes 实践指南',
                href: 'https://imroc.cc/kubernetes',
              },
              {
                label: 'istio 实践指南',
                href: 'https://imroc.cc/istio',
              },
            ],
          },
          {
            title: '联系我',
            items: [
              {
                label: 'Email',
                href: 'mailto:roc@imroc.cc',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/imrocchan',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客归档',
                to: '/blog/archive',
              },
              {
                label: '技术笔记',
                to: '/note',
              },
              {
                label: 'GitHub 主页',
                href: 'https://github.com/imroc',
              },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} roc | All Right Reserved | <a href="http://beian.miit.gov.cn/">${beian}</a>`,
      },
      socials: {
        github: 'https://github.com/imroc',
        twitter: 'https://twitter.com/imrocchan',
        qq: 'https://wpa.qq.com/msgrd?v=3&amp;uin=245671051&amp;site=qq',
        zhihu: 'https://www.zhihu.com/people/cpwl',
        email: 'mailto:roc@imroc.cc',
      },
      prism: {
        theme: require('prism-react-renderer/themes/vsDark'),
        magicComments: [
          {
            className: 'code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' }
          },
          {
            className: 'code-block-add-line',
            line: 'highlight-add-line',
            block: { start: 'highlight-add-start', end: 'highlight-add-end' }
          },
          {
            className: 'code-block-update-line',
            line: 'highlight-update-line',
            block: { start: 'highlight-update-start', end: 'highlight-update-end' }
          },
          {
            className: 'code-block-error-line',
            line: 'highlight-error-line',
            block: { start: 'highlight-error-start', end: 'highlight-error-end' }
          },
        ],
        // languages enabled by default: https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts#L9-L23
        // prism supported languages: https://prismjs.com/#supported-languages
        additionalLanguages: [
          'java',
          'json',
          'hcl',
        ],
      },
    }),
};

module.exports = config;
