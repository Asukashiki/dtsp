<template>
  <div class="farmer-action-buttons workflow-action-buttons is-table-mode">
    <el-button
      v-for="btn in visibleButtons"
      :key="btn.action"
      :type="btn.type"
      size="small"
      @click="$emit('action', btn.action)"
    >
      <i :class="btn.icon"></i>
      <span class="btn-text">{{ $t(btn.label) }}</span>
    </el-button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * 状态: 0-草稿, 1-已提交, 2-已通过, 3-驳回, 4-已锁定
   */
  status: {
    type: [String, Number],
    required: true
  }
})

defineEmits(['action'])

// 按钮配置
const buttonConfig = {
  view: { type: 'primary', action: 'view', label: 'common.view', icon: 'ri-eye-line' },
  edit: { type: 'primary', action: 'edit', label: 'common.edit', icon: 'ri-edit-line' },
  submit: { type: 'success', action: 'submit', label: 'common.submit', icon: 'ri-send-plane-line' },
  delete: { type: 'danger', action: 'delete', label: 'common.delete', icon: 'ri-delete-bin-line' }
}

// 根据状态返回可见按钮
const visibleButtons = computed(() => {
  const status = String(props.status)
  const buttons = [buttonConfig.view, buttonConfig.edit]

  // 草稿状态额外显示提交和删除
  if (status === '0') {
    buttons.push(buttonConfig.submit, buttonConfig.delete)
  }

  return buttons
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/workflow-common.scss';

.farmer-action-buttons {
  // 保持原有布局特性作为基础，样式由 workflow-common.scss 覆盖
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
