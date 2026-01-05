<template>
  <div class="info-card">
    <div v-if="title || $slots.header || $slots.actions || $slots['header-extra']" class="card-header">
      <slot name="header">
        <div class="card-title">
          <i v-if="icon" :class="icon"></i>
          <span>{{ title }}</span>
        </div>
      </slot>
      <div v-if="$slots['header-extra']" class="header-extra">
        <slot name="header-extra"></slot>
      </div>
      <div v-if="$slots.actions" class="header-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="card-body" :class="{ 'no-padding': noPadding }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
/**
 * 信息卡片组件
 * 
 * @example
 * <InfoCard
 *   title="卡片标题"
 *   icon="ri-file-list-3-line">
 *   <template #actions>
 *     <el-button>操作</el-button>
 *   </template>
 *   
 *   <!-- 卡片内容 -->
 * </InfoCard>
 */
defineProps({
  /**
   * 卡片标题
   */
  title: {
    type: String,
    default: ''
  },
  
  /**
   * 标题图标
   */
  icon: {
    type: String,
    default: ''
  },
  
  /**
   * 是否移除内边距
   */
  noPadding: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss' as *;

.card-body.no-padding {
  padding: 0;
}

.header-extra {
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>
