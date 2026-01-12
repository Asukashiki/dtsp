import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isRouteLoading = ref(false)

  const setRouteLoading = (loading) => {
    isRouteLoading.value = loading
  }

  return {
    isRouteLoading,
    setRouteLoading
  }
})
