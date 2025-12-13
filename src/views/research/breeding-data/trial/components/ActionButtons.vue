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
      {{ t('research.trialBasicAudit.action.view') }}
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
      {{ t('research.trialBasicAudit.action.cancel') }}
    </el-button>

    <!-- 归档 -->
    <el-button
      v-if="showArchive"
      type="warning"
      :size="size"
      :link="link"
      @click="handleArchive"
    >
      {{ t('research.trialBasicAudit.action.archive') }}
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

const emit = defineEmits(['edit', 'view', 'submit', 'cancel', 'archive'])

const { t } = useI18n()

// 根据状态显示不同按钮
const status = computed(() => props.trial.trialStatus || 'S0')

const showEdit = computed(() => status.value === 'S0' || status.value === 'S3')
const showView = computed(() => status.value === 'S1' || status.value === 'S9' || status.value === 'S10')
const showSubmit = computed(() => status.value === 'S0' || status.value === 'S3')
const showCancel = computed(() => status.value === 'S0' || status.value === 'S3')
const showArchive = computed(() => status.value === 'S2')

const handleEdit = () => emit('edit', props.trial)
const handleView = () => emit('view', props.trial)
const handleSubmit = () => emit('submit', props.trial)
const handleCancel = () => emit('cancel', props.trial)
const handleArchive = () => emit('archive', props.trial)
</script>

<style scoped lang="scss">
.action-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
</style>
