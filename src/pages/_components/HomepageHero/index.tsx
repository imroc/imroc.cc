import React from 'react'
import { Variants, motion, useScroll, useTransform } from 'framer-motion' // Import motion from framer-motion

import Translate from '@docusaurus/Translate'

import HeroMain from './img/hero_main.svg'

import styles from './styles.module.scss'
import SocialLinks from '@site/src/components/SocialLinks'

import { Icon, IconProps } from '@iconify/react'

const variants: Variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

function Logos() {
  const { scrollYProgress } = useScroll()

  // 往下滚动 元素向上移动
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-500%'], {
    clamp: false,
  })

  // 往下滚动 元素向下移动
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '500%'], {
    clamp: false,
  })

  const logos: IconProps[] = [
    {
      icon: 'logos:docusaurus',
      style: { top: '30%', right: '20%' },
    },
    {
      icon: 'logos:kubernetes',
      style: { top: '20%', right: '10%' },
    },
    {
      icon: 'simple-icons:istio',
      style: { top: '20%', right: '20%', color: 'rgb(70, 107, 176)' },
    },
    {
      icon: 'skill-icons:neovim-light',
      style: { top: '20%', right: '33%' },
    },
    {
      icon: 'skill-icons:linux-light',
      style: { top: '30%', right: '32%' },
    },
    {
      icon: 'skill-icons:docker',
      style: { top: '10%', left: '32%' },
    },
    {
      icon: 'logos:yaml',
      style: { top: '10%', left: '20%' },
    },
    {
      icon: 'ri:github-fill',
      style: { top: '10%', right: '50%', color: 'black' },
    },
    {
      icon: 'logos:vim',
      style: { top: '30%', right: '10%' },
    },
    {
      icon: 'skill-icons:golang',
      style: { top: '20%', left: '1%' },
    },
    {
      icon: 'skill-icons:rust',
      style: { top: '30%', left: '1%' },
    },
  ]

  return (
    <>
      {logos.map((l, index) => {
        const yValue = index % 2 === 0 ? y1 : y2

        return (
          <motion.div
            className={styles.box}
            initial={{ opacity: 0.01, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: Math.random() * 2 + 0.5,
              delay: 0.5,
            }}
            style={{
              ...l.style,
              y: yValue,
            }}
          >
            <Icon icon={l.icon}></Icon>
          </motion.div>
        )
      })}
    </>
  )
}

function Background() {
  return (
    <>
      <motion.div className={styles.background}>
        <Logos />
        <HeroMain />
        <div className={styles.circle} />
      </motion.div>
    </>
  )
}

function Name() {
  return (
    <motion.div
      className={styles.hero_text}
      custom={1}
      initial="hidden"
      animate="visible"
      variants={variants}
      onMouseMove={e => {
        e.currentTarget.style.setProperty('--x', `${e.clientX}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY}px`)
      }}
    >
      <Translate id="homepage.hero.greet">Hi! I'm </Translate>
      <span
        className={styles.name}
        onMouseMove={e => {
          const bounding = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--positionX', `${bounding.x}px`)
          e.currentTarget.style.setProperty('--positionY', `${bounding.y}px`)
        }}
      >
        <Translate id="homepage.hero.name">roc</Translate>
      </span>
      <span className={styles.wave}></span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <motion.div className={styles.hero}>
      <div className={styles.intro}>
        <Name />
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <Translate id="homepage.hero.text">
            {`云原生老司机一枚，热爱开源和分享，欢迎一起交流。`}
          </Translate>
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <SocialLinks />
        </motion.div>

        <motion.div
          className={styles.buttonGroup}
          custom={4}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
        </motion.div>
        <motion.div
          className={styles.qrcode}
          custom={5}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <img src="/img/qrcode.png" />
        </motion.div>
      </div>
      <Background />
    </motion.div>
  )
}
