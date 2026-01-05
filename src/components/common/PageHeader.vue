<template>
  <div class="page-header">
    <div class="header-left">
      <div class="header-icon">
        <i :class="icon"></i>
      </div>
      <div class="header-content">
        <h1 class="page-title">{{ title }}</h1>
        <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
      </div>
    </div>
    <div v-if="$slots.actions" class="header-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
/**
 * 页面头部组件
 * 
 * @example
 * <PageHeader
 *   icon="ri-user-line"
 *   :title="$t('page.title')"
 *   :subtitle="$t('page.subtitle')">
 *   <template #actions>
 *     <el-button>操作按钮</el-button>
 *   </template>
 * </PageHeader>
 */
defineProps({
  /**
   * 图标类名（Remix Icon）
   */
  icon: {
    type: String,
    default: 'ri-file-list-line'
  },
  
  /**
   * 页面标题
   */
  title: {
    type: String,
    required: true
  },
  
  /**
   * 页面副标题
   */
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
// 样式已在 page-common.scss 中定义
// 这里不需要额外的样式
</style>
