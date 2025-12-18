import { createI18n } from 'vue-i18n'
import messages from '../locales'

// 获取默认语言设置
const getDefaultLocale = () => {
  // 1. 优先使用用户保存的语言设置
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    return savedLocale
  }

  // 2. 检测浏览器语言
  const browserLang = navigator.language || navigator.userLanguage || ''

  // 3. 如果是中文（zh, zh-CN, zh-TW, zh-HK 等），使用中文
  if (browserLang.toLowerCase().startsWith('zh')) {
    return 'zh-CN'
  }

  // 4. 其他语言默认使用英文
  return 'en-US'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(),
  fallbackLocale: 'en-US',
  messages,
  globalInjection: true, // 全局注入 $t 函数
})

export default i18n
