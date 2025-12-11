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
</style>
