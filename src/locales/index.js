// 自动导入所有语言目录下的 index.js
const modules = import.meta.glob('./*/index.js', { eager: true })

const messages = {}

// 解析导入的模块
Object.keys(modules).forEach((key) => {
  // 从路径中提取语言代码 './zh-CN/index.js' -> 'zh-CN'
  const locale = key.replace(/^\.\/(.*?)\/index\.js$/, '$1')
  messages[locale] = modules[key].default
})

export default messages
