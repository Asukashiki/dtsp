import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    currentLocale: localStorage.getItem('locale') || 'zh-CN',
  }),

  getters: {
    locale() {
      return this.currentLocale
    },
    isZhCN() {
      return this.currentLocale === 'zh-CN'
    },
    isEnUS() {
      return this.currentLocale === 'en-US'
    },
  },

  actions: {
    setLocale(locale) {
      this.currentLocale = locale
      localStorage.setItem('locale', locale)
    },

    toggleLocale() {
      const newLocale = this.currentLocale === 'zh-CN' ? 'en-US' : 'zh-CN'
      this.setLocale(newLocale)
      return newLocale
    },
  },
})
