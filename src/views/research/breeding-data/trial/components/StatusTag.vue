<template>
  <el-tag :type="tagType" :effect="effect">
    {{ statusText }}
  </el-tag>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'workflow', // 'workflow' 或 'business'
    validator: (value) => ['workflow', 'business'].includes(value)
  },
  effect: {
    type: String,
    default: 'light'
  }
})

const { t } = useI18n()

// 状态文本
const statusText = computed(() => {
  if (props.type === 'workflow') {
    return t(`research.trialBasicAudit.workflowStatus.${props.status}`)
  } else {
    return t(`research.trialBasicAudit.status.${props.status}`)
  }
})

// 标签类型
const tagType = computed(() => {
  if (props.type === 'workflow') {
    // 审核状态的颜色映射
    const workflowTypeMap = {
      S0: 'info',      // 草稿 - 灰色
      S1: 'warning',   // 待审批 - 橙色
      S2: 'success',   // 已审批 - 绿色
      S3: 'danger',    // 已退回 - 红色
      S4: 'info',      // 已作废 - 灰色
      S9: '',          // 已归档 - 默认色
      S10: 'info'      // 作废 - 灰色
    }
    return workflowTypeMap[props.status] || ''
  } else {
    // 业务状态的颜色映射
    const businessTypeMap = {
      '01': 'warning', // 进行中 - 橙色
      '02': 'success'  // 已完成 - 绿色
    }
    return businessTypeMap[props.status] || ''
  }
})
</script>
