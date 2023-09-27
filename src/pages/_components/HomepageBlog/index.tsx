import React from 'react'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BlogPost } from '@docusaurus/plugin-content-blog'
import useGlobalData from '@docusaurus/useGlobalData'
import Translate from '@docusaurus/Translate'
import Link from '@docusaurus/Link'
import Image from '@theme/IdealImage'

import styles from './styles.module.scss'
import SectionTitle from '../SectionTitle'

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )

export function BlogItem({ post }: { post: BlogPost }) {
  const {
    metadata: { permalink, frontMatter, title, description },
  } = post

  return (
    <>
      <motion.li
        className={clsx('card', 'margin-bottom--md')}
        key={permalink}
        initial={{ y: 100, opacity: 0.001 }}
        whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        viewport={{ once: true }}
      >
        {frontMatter.image && (
          <Link href={permalink} className={styles.image}>
            <Image src={frontMatter.image!} alt={title} img={''} />
          </Link>
        )}
        <div className={'card__body'}>
          <h4>
            <Link href={permalink}>{title}</Link>
          </h4>
          <p>{description}</p>
        </div>
      </motion.li>
    </>
  )
}

export default function BlogRecent(): JSX.Element {
  const globalData = useGlobalData()
  const blogPluginData = globalData?.['docusaurus-plugin-content-blog']?.[
    'default'
  ] as any

  const blogData = blogPluginData?.blogs as BlogPost[]
  const posts = chunk(blogData.slice(0, 6), 2)

  const ref = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20], {
    clamp: false,
  })

  if (blogData.length === 0) {
    return <>作者还没有写过博客哦</>
  }

  return (
    <section
      className={clsx('container padding-vert--sm', styles.blogContainer)}
    >
      <SectionTitle icon="ri:quill-pen-line" href={'/blog'}>
        <Translate id="homepage.blog.title">近期博客</Translate>
      </SectionTitle>
      <div ref={ref} className={clsx('row', styles.list)}>
        {posts.map((postGroup, index) => (
          <div className="col col-6 margin-top--sm" key={index}>
            {postGroup.map((post, i) => (
              <motion.div style={{ y: i / 2 ? y : 0 }}>
                <BlogItem key={post.id} post={post} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
