<template>
  <div class="search-section">
    <slot></slot>
    
    <!-- 默认的搜索按钮区域 -->
    <div v-if="showActions" class="search-actions">
      <el-button type="primary" @click="handleSearch">
        <i class="ri-search-line"></i>
        {{ searchText || $t('common.search') }}
      </el-button>
      <el-button @click="handleReset">
        <i class="ri-refresh-line"></i>
        {{ resetText || $t('common.reset') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

/**
 * 搜索表单组件
 * 
 * @example
 * <SearchForm @search="handleSearch" @reset="handleReset">
 *   <div class="search-item">
 *     <label class="search-label">名称:</label>
 *     <el-input v-model="name" class="search-input" />
 *   </div>
 * </SearchForm>
 */

const { t } = useI18n()

const props = defineProps({
  /**
   * 是否显示操作按钮
   */
  showActions: {
    type: Boolean,
    default: true
  },
  
  /**
   * 搜索按钮文本
   */
  searchText: {
    type: String,
    default: ''
  },
  
  /**
   * 重置按钮文本
   */
  resetText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search', 'reset'])

const handleSearch = () => {
  emit('search')
}

const handleReset = () => {
  emit('reset')
}
</script>

<style lang="scss" scoped>
// 样式已在 page-common.scss 中定义
</style>
