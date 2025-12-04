import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useResponsive() {
  const isMobile = ref(false)

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile)
  })

  return {
    isMobile
  }
}
