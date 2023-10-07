import React from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Giscus, { GiscusProps } from '@giscus/react'
import { useLocation } from '@docusaurus/router';

const defaultConfig: Partial<GiscusProps> = {
  id: 'comments',
  mapping: 'specific',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  loading: 'lazy',
  strict: '0',
}

export default function Comment(): JSX.Element {
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
    return ('')
  }

  if (!giscus.repo || !giscus.repoId || !giscus.categoryId) {
    throw new Error(
      'You must provide `repo`, `repoId`, and `categoryId` to `themeConfig.giscus`.',
    )
  }

  giscus.term = subPath
  giscus.theme =
    useColorMode().colorMode === 'dark' ? 'transparent_dark' : 'light'
  giscus.lang = i18n.currentLocale

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => <Giscus {...giscus} />}
    </BrowserOnly>
  )
}
