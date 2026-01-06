<template>
  <div class="action-buttons">
    <!-- 编辑 -->
    <el-button
      v-if="showEdit"
      type="primary"
      :size="size"
      :link="link"
      @click="handleEdit"
    >
      {{ t('research.trialBasicAudit.action.edit') }}
    </el-button>

    <!-- 查看 -->
    <el-button
      v-if="showView"
      type="info"
      :size="size"
      :link="link"
      @click="handleView"
    >
      <i class="ri-eye-line"></i> {{ t('research.trialBasicAudit.action.view') }}
    </el-button>

    <!-- 提交 -->
    <el-button
      v-if="showSubmit"
      type="success"
      :size="size"
      :link="link"
      @click="handleSubmit"
    >
      {{ t('research.trialBasicAudit.action.submit') }}
    </el-button>

    <!-- 作废 -->
    <el-button
      v-if="showCancel"
      type="danger"
      :size="size"
      :link="link"
      @click="handleCancel"
    >
      {{ t('research.trialBasicAudit.action.void') }}
    </el-button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  trial: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    default: 'small'
  },
  link: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['edit', 'view', 'submit', 'cancel'])

const { t } = useI18n()

// 根据状态显示不同按钮（兼容 workflowStatus 字段）
const status = computed(() => props.trial.trialStatus || props.trial.workflowStatus || 'S0')

const showEdit = computed(() => status.value === 'S0' || status.value === 'S3')
const showView = computed(() => status.value === 'S0' ||status.value === 'S1' || status.value === 'S2' || status.value === 'S3' || status.value === 'S9' || status.value === 'S10')
const showSubmit = computed(() => status.value === 'S0' || status.value === 'S3')
// 只有草稿(S0)和待审批(S1)状态显示作废按钮
const showCancel = computed(() => status.value === 'S0' || status.value === 'S1')

const handleEdit = () => emit('edit', props.trial)
const handleView = () => emit('view', props.trial)
const handleSubmit = () => emit('submit', props.trial)
const handleCancel = () => emit('cancel', props.trial)
</script>

<style scoped lang="scss">
.action-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
</style>
