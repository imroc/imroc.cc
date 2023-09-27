import React from 'react'
import { useThemeConfig } from '@docusaurus/theme-common'
import { ThemeConfig } from '@docusaurus/preset-classic'
import { Icon } from '@iconify/react'

import styles from './styles.module.scss'

function SocialLink({
  href,
  icon,
  ...prop
}: {
  href: string
  icon: string | JSX.Element
}) {
  return (
    <a href={href} target="_blank" {...prop}>
      {typeof icon === 'string' ? <Icon icon={icon} /> : icon}
    </a>
  )
}

export default function SocialLinks({ ...prop }) {
  const themeConfig = useThemeConfig() as ThemeConfig

  const socials = themeConfig.socials as {
    github: string
    twitter: string
    qq: string
    zhihu: string
    email: string
  }

  return (
    <div className={styles.social__links} {...prop}>
      <SocialLink href={socials.github} icon="ri:github-line" />
      <SocialLink href={socials.twitter} icon="ri:twitter-line" />
      <SocialLink href={socials.qq} icon="ri:qq-line" />
      <SocialLink href={socials.zhihu} icon="ri:zhihu-line" />
      <SocialLink href={socials.email} icon="ri:mail-line" />
      <SocialLink href="/blog/rss.xml" icon="ri:rss-line" />
    </div>
  )
}
