export const projects: Project[] = [
  {
    title: 'req',
    description: '简单易用还带黑魔法的 Go HTTP 客户端',
    preview: '/img/project/req.png',
    website: 'https://req.cool',
    source: 'https://github.com/imroc/req',
    tags: ['golang', 'favorite'],
    type: '我创建的',
  },
  {
    title: 'Kubernetes 实践指南',
    description: 'Kubernetes 相关实战经验与总结',
    preview: '/img/project/book.svg',
    website: 'https://imroc.cc/kubernetes',
    source: 'https://github.com/imroc/kubernetes-guide',
    tags: ['book'],
    type: '我创建的',
  },
  {
    title: 'Istio 实践指南',
    description: 'Istio 相关实战经验与总结',
    preview: '/img/project/book.svg',
    website: 'https://imroc.cc/istio',
    source: 'https://github.com/imroc/istio-guide',
    tags: ['book'],
    type: '我创建的',
  },
  {
    title: 'cert-manager-webhook-dnspod',
    description: 'cert-manager 的 dnspod webhook 实现',
    preview: '/img/project/cert-manager.svg',
    website: 'https://github.com/imroc/cert-manager-webhook-dnspod',
    source: 'https://github.com/imroc/cert-manager-webhook-dnspod',
    tags: ['golang'],
    type: '我创建的',
  },
  {
    title: 'kubernetes',
    description: '云原生的基石',
    preview: '/img/project/kubernetes.svg',
    website: 'https://kubernetes.io/',
    source: 'https://github.com/kubernetes/kubernetes',
    tags: ['golang', 'cloudnative'],
    type: '我参与的',
  },
  {
    title: 'istio',
    description: '服务网格',
    preview: '/img/project/istio.svg',
    website: 'https://istio.io/',
    source: 'https://github.com/istio/istio',
    tags: ['golang', 'cloudnative'],
    type: '我参与的',
  },
  {
    title: 'ztunnel',
    description: 'istio ambient 模式的 Rust 高性能数据面',
    preview: '/img/project/istio.svg',
    website: 'https://github.com/istio/ztunnel',
    source: 'https://github.com/istio/ztunnel',
    tags: ['rust', 'cloudnative'],
    type: '我参与的',
  }
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType =
  | 'favorite'
  | 'golang'
  | 'cloudnative'
  | 'rust'
  | 'book'
  | 'large'
  | 'personal'

export type ProjectType = '我创建的' | '我参与的'

export type Project = {
  title: string
  description: string
  preview?: any
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  golang: {
    label: 'Golang',
    description: 'Go 语言项目',
    color: '#39ca30',
  },
  rust: {
    label: 'Rust',
    description: 'Rust 语言项目',
    color: '#12affa',
  },
  cloudnative: {
    label: '云原生',
    description: '云原生相关项目',
    color: '#a44fb7',
  },
  book: {
    label: '电子书',
    description: '开源在线电子书',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce((group, project) => {
  const { type } = project
  group[type] = group[type] ?? []
  group[type].push(project)
  return group
}, {} as Record<ProjectType, Project[]>)
