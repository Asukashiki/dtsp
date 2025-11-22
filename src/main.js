import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './i18n'
import './style.css'
// 引入Remix Icon
import 'remixicon/fonts/remixicon.css'
// 引入Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enUs from 'element-plus/es/locale/lang/en'
// 引入ECharts
import * as echarts from 'echarts'
import { useLocaleStore } from './store'

const app = createApp(App)
const pinia = createPinia()

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 将echarts挂载到全局属性
app.config.globalProperties.$echarts = echarts

app.use(pinia)
app.use(router)
app.use(i18n)

// 获取当前语言设置并应用到 Element Plus
const localeStore = useLocaleStore()
const elementLocale = localeStore.currentLocale === 'zh-CN' ? zhCn : enUs
app.use(ElementPlus, { locale: elementLocale })

app.mount('#app')
