import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'
// 引入Remix Icon
import 'remixicon/fonts/remixicon.css'
// 引入Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入ECharts
import * as echarts from 'echarts'

const app = createApp(App)
const pinia = createPinia()

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 将echarts挂载到全局属性
app.config.globalProperties.$echarts = echarts

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
