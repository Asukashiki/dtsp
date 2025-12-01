// 自动导入所有语言目录下的所有模块文件
const messages = {}

// 获取所有语言文件夹
const languageFolders = import.meta.glob('./*/**/*.js', { eager: true })

// 解析导入的模块
Object.keys(languageFolders).forEach((key) => {
  // 从路径中提取语言代码和模块路径
  // 例如: './en-US/common.js' -> {lang: 'en-US', path: 'common'}
  const match = key.match(/^\.\/([^/]+)\/(.*?)\.js$/)
  
  if (match) {
    const lang = match[1]
    const modulePath = match[2]
    
    // 初始化语言对象
    if (!messages[lang]) {
      messages[lang] = {}
    }
    
    // 排除 index.js 文件本身
    if (!modulePath.endsWith('/index')) {
      // 构建嵌套的消息结构
      const pathParts = modulePath.split('/')
      let currentLevel = messages[lang]
      
      // 处理嵌套路径
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i]
        
        // 如果是最后一个部分，设置值
        if (i === pathParts.length - 1) {
          currentLevel[part] = languageFolders[key].default
        } else {
          // 确保中间对象存在
          if (!currentLevel[part]) {
            currentLevel[part] = {}
          }
          currentLevel = currentLevel[part]
        }
      }
    }
  }
})

export default messages
