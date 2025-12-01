// 研究模块国际化主入口文件 - 自动导入所有子模块
const modules = import.meta.glob('./*.js', { eager: true })

const messages = {
  // 系统通用
  systemName: 'Research & Development Management System',
  systemDesc: 'Variety management, breeding management and seed information services',
  backToHome: 'Back to Home',
}

// 解析导入的模块
Object.keys(modules).forEach((key) => {
  // 从路径中提取模块名 './audit.js' -> 'audit'
  const moduleName = key.replace(/^\.\/(.*?)\.js$/, '$1')

  // 排除 index.js 本身
  if (moduleName !== 'index') {
    messages[moduleName] = modules[key].default
  }
})
export default messages