<template>
  <div class="page-breadcrumb-tabs">
    <div class="tabs-wrapper">
      <!-- 左侧返回按钮 -->
      <div class="nav-button back-button" @click="handleBack">
        <i class="ri-arrow-left-line"></i>
      </div>

      <!-- 左滚动按钮 -->
      <div 
        v-show="showScrollButtons && canScrollLeft" 
        class="scroll-button scroll-left" 
        @click="scrollLeft">
        <i class="ri-arrow-left-s-line"></i>
      </div>

      <!-- 标签页列表 -->
      <div class="tabs-container" ref="tabsContainerRef" @scroll="updateScrollState">
        <template v-for="(tab, index) in translatedTabs" :key="tab.path">
          <!-- 竖线分隔符 -->
          <div v-if="index > 0" class="tab-divider"></div>
          
          <!-- 标签项 -->
          <div
            class="tab-item"
            :class="{ 'is-active': isActive(tab.path) }"
            :ref="el => setTabRef(el, tab.path)"
            @click="handleTabClick(tab)">
            <span class="tab-label">{{ tab.title }}</span>
            <i
              v-if="translatedTabs.length > 1"
              class="ri-close-line tab-close"
              @click.stop="handleTabClose(tab)"></i>
          </div>
        </template>
      </div>

      <!-- 右滚动按钮 -->
      <div 
        v-show="showScrollButtons && canScrollRight" 
        class="scroll-button scroll-right" 
        @click="scrollRight">
        <i class="ri-arrow-right-s-line"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// DOM 引用
const tabsContainerRef = ref(null)
const tabRefs = ref({})

// 滚动状态
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const showScrollButtons = ref(false)

// 已访问的标签页列表
const visitedTabs = ref([])

// 计算属性：返回带有翻译标题的标签列表
const translatedTabs = computed(() => {
  return visitedTabs.value.map(tab => ({
    ...tab,
    title: t(tab.titleKey)
  }))
})

// 设置标签引用
const setTabRef = (el, path) => {
  if (el) {
    tabRefs.value[path] = el
  }
}

// 判断是否为当前激活的标签
const isActive = (path) => {
  return route.path === path
}

// 更新滚动状态
const updateScrollState = () => {
  const container = tabsContainerRef.value
  if (!container) return

  const { scrollLeft, scrollWidth, clientWidth } = container
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1
  showScrollButtons.value = scrollWidth > clientWidth
}

// 向左滚动
const scrollLeft = () => {
  const container = tabsContainerRef.value
  if (!container) return
  container.scrollBy({ left: -150, behavior: 'smooth' })
}

// 向右滚动
const scrollRight = () => {
  const container = tabsContainerRef.value
  if (!container) return
  container.scrollBy({ left: 150, behavior: 'smooth' })
}

// 滚动到激活的标签
const scrollToActiveTab = () => {
  nextTick(() => {
    const activeTabEl = tabRefs.value[route.path]
    if (activeTabEl && tabsContainerRef.value) {
      const container = tabsContainerRef.value
      const tabLeft = activeTabEl.offsetLeft
      const tabWidth = activeTabEl.offsetWidth
      const containerWidth = container.clientWidth
      const scrollLeft = container.scrollLeft

      // 如果标签在可视区域外，滚动到可见位置
      if (tabLeft < scrollLeft) {
        container.scrollTo({ left: tabLeft - 10, behavior: 'smooth' })
      } else if (tabLeft + tabWidth > scrollLeft + containerWidth) {
        container.scrollTo({ left: tabLeft + tabWidth - containerWidth + 10, behavior: 'smooth' })
      }
    }
    updateScrollState()
  })
}

// 添加标签页
const addTab = () => {
  const { path, meta } = route
  
  if (!meta || !meta.title) return
  
  const exists = visitedTabs.value.some(tab => tab.path === path)
  
  if (!exists) {
    visitedTabs.value.push({
      path: path,
      titleKey: meta.title,
      name: route.name
    })
  }
  
  scrollToActiveTab()
}

// 点击标签页
const handleTabClick = (tab) => {
  if (route.path !== tab.path) {
    router.push(tab.path)
  }
}

// 关闭标签页
const handleTabClose = (tab) => {
  const index = visitedTabs.value.findIndex(t => t.path === tab.path)
  
  if (isActive(tab.path)) {
    const nextTab = visitedTabs.value[index + 1] || visitedTabs.value[index - 1]
    if (nextTab) {
      router.push(nextTab.path)
    }
  }
  
  visitedTabs.value.splice(index, 1)
  delete tabRefs.value[tab.path]
  
  nextTick(() => {
    updateScrollState()
  })
}

// 返回按钮
const handleBack = () => {
  router.back()
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    addTab()
  },
  { immediate: true }
)

// 监听窗口大小变化
let resizeObserver = null

onMounted(() => {
  updateScrollState()
  
  // 监听容器大小变化
  if (tabsContainerRef.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateScrollState()
    })
    resizeObserver.observe(tabsContainerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss' as *;

.page-breadcrumb-tabs {
  background: transparent;
  padding: 20px 20px 0 20px;
}

.tabs-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  border-radius: 8px;
  padding: 0 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: 40px;
  position: relative;
}

.nav-button {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: $color-text-regular;
  flex-shrink: 0;

  &:hover {
    background: rgba($primary-green, 0.08);
    color: $primary-green;
  }

  i {
    font-size: 14px;
  }
}

.scroll-button {
  width: 20px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $color-text-secondary;
  flex-shrink: 0;
  transition: all 0.2s ease;
  border-radius: 4px;

  &:hover {
    background: rgba($primary-green, 0.08);
    color: $primary-green;
  }

  i {
    font-size: 16px;
  }
}

.tabs-container {
  display: flex;
  align-items: center;
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  /* 隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.tab-divider {
  width: 1px;
  height: 16px;
  background: $color-border-light;
  margin: 0 4px;
  flex-shrink: 0;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  height: 40px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  border-bottom: 2px solid transparent;
  flex-shrink: 0;

  &:hover {
    background: rgba($primary-green, 0.05);

    .tab-close {
      opacity: 1;
    }
  }

  &.is-active {
    color: $primary-green;
    font-weight: 500;
    border-bottom-color: $primary-green;

    .tab-label {
      color: $primary-green;
    }

    .tab-close {
      opacity: 1;
    }
  }
}

.tab-label {
  font-size: 13px;
  color: $color-text-regular;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-close {
  font-size: 14px;
  color: $color-text-secondary;
  transition: all 0.2s ease;
  padding: 2px;
  border-radius: 3px;
  flex-shrink: 0;
  opacity: 0.6;

  &:hover {
    background: rgba($accent-red, 0.1);
    color: $accent-red;
    opacity: 1;
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .page-breadcrumb-tabs {
    padding: 8px 12px 0 12px;
  }

  .tabs-wrapper {
    padding: 0 8px;
    gap: 4px;
    height: 36px;
  }

  .nav-button {
    width: 22px;
    height: 22px;

    i {
      font-size: 13px;
    }
  }

  .scroll-button {
    width: 18px;
    height: 24px;

    i {
      font-size: 14px;
    }
  }

  .tab-divider {
    height: 14px;
    margin: 0 2px;
  }

  .tab-item {
    padding: 0 8px;
    height: 36px;
    gap: 4px;
  }

  .tab-label {
    font-size: 12px;
    max-width: 80px;
  }

  .tab-close {
    font-size: 12px;
    padding: 1px;
  }
}

@media screen and (max-width: 480px) {
  .page-breadcrumb-tabs {
    padding: 6px 8px 0 8px;
  }

  .tabs-wrapper {
    padding: 0 6px;
    height: 34px;
  }

  .tab-label {
    max-width: 60px;
  }
}
</style>
