// 自动导入当前目录下所有 .js 文件（排除 index.js）
const modules = import.meta.glob('./*.js', { eager: true })

const messages = {}

// 解析导入的模块
Object.keys(modules).forEach((key) => {
  // 从路径中提取模块名 './common.js' -> 'common'
  const moduleName = key.replace(/^\.\/(.*?)\.js$/, '$1')

  // 排除 index.js 本身
  if (moduleName !== 'index') {
    messages[moduleName] = modules[key].default
  }
})

export default messages
