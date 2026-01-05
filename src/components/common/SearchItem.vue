<template>
  <div class="search-item">
    <label v-if="label" class="search-label">{{ label }}:</label>
    <slot></slot>
  </div>
</template>

<script setup>
/**
 * 搜索项组件
 * 
 * @example
 * <SearchItem label="名称">
 *   <el-input v-model="name" class="search-input" />
 * </SearchItem>
 */
defineProps({
  /**
   * 标签文本
   */
  label: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
// 样式已在 page-common.scss 中定义
</style>
