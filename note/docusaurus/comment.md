# 添加 giscus 评论功能

## 解决 Docusaurus 的 Bug

由于 `Docusaurus` bug 导致 `Giscus` 有时获取的仍然是上一篇文章的评论，需要做一点魔改来解决这个问题。

安装依赖：

```bash npm2yarn
npm install --save @giscus/react mitt
```

创建一个 `clientModule`:

```ts title="src/clientModules/routeModules.ts" showLineNumbers
import mitt from 'mitt';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const emitter = mitt();

if (ExecutionEnvironment.canUseDOM) {
  window.emitter = emitter;
}

export function onRouteDidUpdate() {
  if (ExecutionEnvironment.canUseDOM) {
    setTimeout(() => {
      window.emitter.emit('onRouteDidUpdate');
    });
  }
  // https://github.com/facebook/docusaurus/issues/8278
}
```

:::info
相关 [issue](https://github.com/facebook/docusaurus/issues/8278)
:::

修改配置:

```js title="docusaurus.config.js"
module.exports = {
  clientModules: [require.resolve('./src/clientModules/routeModules.ts')]
};
```

## 创建评论组件

```ts title="src/components/comment/index.tsx" showLineNumbers
import React, { forwardRef, useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
import { useLocation } from '@docusaurus/router';

export const Comment = forwardRef<HTMLDivElement>((_props, ref) => {
  const { colorMode } = useColorMode();
  const giscusTheme = colorMode === 'dark' ? 'transparent_dark' : 'light';
  const [routeDidUpdate, setRouteDidUpdate] = useState(false);

  useEffect(() => {
    function eventHandler(e) {
      setRouteDidUpdate(true);
    }

    window.emitter.on('onRouteDidUpdate', eventHandler);

    return () => {
      window.emitter.off('onRouteDidUpdate', eventHandler);
    };
  }, []);

  if (!routeDidUpdate) {
    return null;
  }

  const path = useLocation().pathname.replace(/^\/|\/$/g, '');
  const firstSlashIndex = path.indexOf('/');
  var topPath: string = ""
  var subPath: string = ""
  if (firstSlashIndex !== -1) {
    topPath = path.substring(0, firstSlashIndex)
    subPath = path.substring(firstSlashIndex + 1)
  } else {
    topPath = path
    subPath = "index"
  }

  var repo: string = ""
  var repoId: string = ""
  var category: string = ""
  var categoryId: string = ""
  switch (topPath) {
    case "kubernetes":
      repo = 'imroc/kubernetes-guide'
      repoId = 'R_kgDOG-4vhA'
      category = 'General'
      categoryId = 'DIC_kwDOG-4vhM4COPpN'
      break;
    case "istio":
      repo = 'imroc/istio-guide'
      repoId = 'R_kgDOHFP9XQ'
      category = 'General'
      categoryId = 'DIC_kwDOHFP9Xc4COUDN'
      break;
  }

  if (repo === "") {
    return ("")
  }

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => (
        <div ref={ref} id="comment" style={{ paddingTop: 50 }}>
          <Giscus
            id="comments"
            mapping="specific"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            lang="zh-CN"
            loading="lazy"
            term={subPath}
            repo={repo}
            repoId={repoId}
            category={category}
            categoryId={categoryId}
            theme={giscusTheme}
          />
        </div>
      )}
    </BrowserOnly>
  );
});

export default Comment;
```

## 文档页面支持评论

### swizzle DocItem

```bash npm2yarn
npm run swizzle @docusaurus/theme-classic DocItem/Layout -- --eject --typescript
```

### 修改 DocItem

修改以下自动生成的源码文件（高亮的行为增加的内容）:

```ts title="src/theme/DocItem/Layout/index.tsx" showLineNumbers
import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import type { Props } from '@theme/DocItem/Layout';

import styles from './styles.module.css';
// highlight-add-line
import Comment from '../../../components/comment';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({ children }: Props): JSX.Element {
  const docTOC = useDocTOC();
  // highlight-add-start
  const { frontMatter } = useDoc();
  const { hide_comment: hideComment } = frontMatter;
  // highlight-add-end
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
        // highlight-add-line
        {!hideComment && <Comment />}
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
```

## 隐藏评论

对于不需要启用评论的文章，在 markdown 文件前面加上 `hide_comment: true` 即可，示例：

```markdown title="intro.md"
---
hide_comment: true
---
```
