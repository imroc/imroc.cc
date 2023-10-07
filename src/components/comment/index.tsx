import React from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Giscus, { GiscusProps } from '@giscus/react'
import { useLocation } from '@docusaurus/router';

const defaultConfig: GiscusProps = {
  id: 'comments',
  mapping: 'specific',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  loading: 'lazy',
  strict: '0',
}

export default function Comment(): JSX.Element {
  // const themeConfig = useThemeConfig() as CustomThemeConfig
  const { i18n } = useDocusaurusContext()

  // merge default config
  const giscus = { ...defaultConfig }

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

  switch (topPath) {
    case "kubernetes":
      giscus.repo = 'imroc/kubernetes-guide'
      giscus.repoId = 'R_kgDOG-4vhA'
      giscus.category = 'General'
      giscus.categoryId = 'DIC_kwDOG-4vhM4COPpN'
      break;
    case "istio":
      giscus.repo = 'imroc/istio-guide'
      giscus.repoId = 'R_kgDOHFP9XQ'
      giscus.category = 'General'
      giscus.categoryId = 'DIC_kwDOHFP9Xc4COUDN'
      break;
  }

  if (!giscus.repo) {
    return (<BrowserOnly></BrowserOnly>)
  }

  if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
    throw new Error(
      'You must provide `repo`, `repoId`, and `categoryId` to `themeConfig.giscus`.',
    )
  }

  giscus.term = subPath
  // giscus.inputPosition = 'top'
  // giscus.emitMetadata = '0'
  // giscus.reactionsEnabled = '1'
  // giscus.id = "comments"
  // giscus.mapping = 'specific'
  // giscus.loading = 'lazy'
  // giscus.strict = '0'
  giscus.theme =
    useColorMode().colorMode === 'dark' ? 'transparent_dark' : 'light'
  giscus.lang = i18n.currentLocale

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => <Giscus {...giscus} />}
    </BrowserOnly>
  )
}

// import React, { forwardRef, useEffect, useState } from 'react';
// import BrowserOnly from '@docusaurus/BrowserOnly';
// import Giscus from '@giscus/react';
// import { useColorMode } from '@docusaurus/theme-common';
// import { useLocation } from '@docusaurus/router';
//
// export const Comment = forwardRef<HTMLDivElement>((_props, ref) => {
//   const { colorMode } = useColorMode();
//   const giscusTheme = colorMode === 'dark' ? 'transparent_dark' : 'light';
//   const [routeDidUpdate, setRouteDidUpdate] = useState(false);
//
//   useEffect(() => {
//     function eventHandler(e) {
//       setRouteDidUpdate(true);
//     }
//
//     window.emitter.on('onRouteDidUpdate', eventHandler);
//
//     return () => {
//       window.emitter.off('onRouteDidUpdate', eventHandler);
//     };
//   }, []);
//
//   if (!routeDidUpdate) {
//     return null;
//   }
//
//   const path = useLocation().pathname.replace(/^\/|\/$/g, '');
//   const firstSlashIndex = path.indexOf('/');
//   var topPath: string = ""
//   var subPath: string = ""
//   if (firstSlashIndex !== -1) {
//     topPath = path.substring(0, firstSlashIndex)
//     subPath = path.substring(firstSlashIndex + 1)
//   } else {
//     topPath = path
//     subPath = "index"
//   }
//
//   var repo: string = ""
//   var repoId: string = ""
//   var category: string = ""
//   var categoryId: string = ""
//   switch (topPath) {
//     case "kubernetes":
//       repo = 'imroc/kubernetes-guide'
//       repoId = 'R_kgDOG-4vhA'
//       category = 'General'
//       categoryId = 'DIC_kwDOG-4vhM4COPpN'
//       break;
//     case "istio":
//       repo = 'imroc/istio-guide'
//       repoId = 'R_kgDOHFP9XQ'
//       category = 'General'
//       categoryId = 'DIC_kwDOHFP9Xc4COUDN'
//       break;
//   }
//
//   if (repo === "") {
//     return ("<div id='test'>{topPath}/{subPath}</div>")
//   }
//
//   return (
//     <BrowserOnly fallback={<div>Loading Comments...</div>}>
//       {() => (
//         <div ref={ref} id="comment" style={{ paddingTop: 50 }}>
//           <Giscus
//             id="comments"
//             mapping="specific"
//             strict="0"
//             reactionsEnabled="1"
//             emitMetadata="0"
//             inputPosition="bottom"
//             lang="zh-CN"
//             loading="lazy"
//             term={subPath}
//             repo={repo}
//             repoId={repoId}
//             category={category}
//             categoryId={categoryId}
//             theme={giscusTheme}
//           />
//         </div>
//       )}
//     </BrowserOnly>
//   );
// });
//
// export default Comment;
