<script setup>
import { computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import enUs from 'element-plus/es/locale/lang/en'
import { useLocaleStore } from './store'

const localeStore = useLocaleStore()

const elementLocale = computed(() => {
  return localeStore.currentLocale === 'zh-CN' ? zhCn : enUs
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
</template>

<style>
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} */

html, body {
  height: 100%;
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
