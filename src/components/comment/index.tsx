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
