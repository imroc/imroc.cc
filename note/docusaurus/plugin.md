# 插件

## docusaurus-plugin-sass

要想使用 sass 格式 (`.scss`) 来写样式表就需要安装此插件。

安装方法：

```bash npm2yarn
npm install --save docusaurus-plugin-sass sass
```

在 `docusaurus.config.js` 中添加插件名称：

```js title="docusaurus.config.js"
  plugins: [
    'docusaurus-plugin-sass'
  ],
```

> 参考官方文档：https://docusaurus.io/zh-CN/docs/styling-layout#sassscss

## plugin-image-zoom

单击图片放大插件，效果：

![](https://raw.githubusercontent.com/flexanalytics/plugin-image-zoom/master/img/zoom_example.gif)

安装：

```bash npm2yarn
npm install --save flexanalytics/plugin-image-zoom
```

在 `docusaurus.config.js` 中添加插件名称：

```js title="docusaurus.config.js"
  plugins: [
    'plugin-image-zoom'
  ],
```

然后就可以了。

项目地址: https://github.com/flexanalytics/plugin-image-zoom

## plugin-pwa

安装插件:

```bash npm2yarn
npm install --save @docusaurus/plugin-pwa
```

创建[PWA manifest](https://web.dev/add-manifest/):

```json title="./static/manifest.json"
{
  "name": "roc 云原生",
  "short_name": "roc 云原生",
  "theme_color": "#12affa",
  "background_color": "#424242",
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "related_applications": [
    {
      "platform": "webapp",
      "url": "https://imroc.cc/manifest.json"
    }
  ],
  "icons": [
    {
      "src": "img/logo-32.pnag",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "img/logo-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "img/logo-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "img/logo-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

在 `docusaurus.config.js` 中添加插件配置：


```js title="docusaurus.config.js"
  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
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
  ],
```

> 参考官方文档: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa

## remark-plugin-npm2yarn

将 `npm install` 的命令自动转换为 yarn 和 pnpm 的等效命令，方便不同环境和安装偏好的人使用。

安装插件：

```bash npm2yarn
npm install @docusaurus/remark-plugin-npm2yarn
```

> 命令展示效果也如上所示

:::info
参考 [官方文档](https://docusaurus.io/docs/markdown-features/code-blocks#npm2yarn-remark-plugin)
:::
