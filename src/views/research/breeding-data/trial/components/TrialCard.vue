<template>
  <el-card class="trial-card" shadow="hover" @click="handleClick">
    <div class="card-header">
      <div class="title">{{ trial.trialName }}</div>
      <StatusTag :status="trial.trialStatus || trial.workflowStatus || 'S0'" />
    </div>

    <div class="card-content">
      <div class="info-row">
        <span class="label">{{ t('trialBasicAudit.list.trialId') }}:</span>
        <span class="value">{{ trial.trialId }}</span>
      </div>
      <div class="info-row">
        <span class="label">{{ t('trialBasicAudit.list.batchName') }}:</span>
        <span class="value">{{ trial.batchId }}</span>
      </div>
      <div class="info-row">
        <span class="label">{{ t('trialBasicAudit.list.cropType') }}:</span>
        <span class="value">{{ trial.cropType }}</span>
      </div>
      <div class="info-row">
        <span class="label">{{ t('trialBasicAudit.list.createdBy') }}:</span>
        <span class="value">{{ trial.createdName || trial.createBy }}</span>
      </div>
      <div class="info-row">
        <span class="label">{{ t('trialBasicAudit.list.createdTime') }}:</span>
        <span class="value">{{ formatDate(trial.createTime) }}</span>
      </div>
    </div>

    <div class="card-actions">
      <el-button
        v-for="btn in actionButtons"
        :key="btn.type"
        :type="btn.buttonType"
        :icon="btn.icon"
        size="small"
        @click.stop="handleAction(btn.type)"
      >
        {{ btn.label }}
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StatusTag from './StatusTag.vue'
import { Edit, View, Delete, Upload, FolderOpened, CloseBold } from '@element-plus/icons-vue'

const props = defineProps({
  trial: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view', 'edit', 'submit', 'cancel', 'archive', 'delete'])

const { t } = useI18n()

// 格式化日期
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 操作按钮配置
const actionButtons = computed(() => {
  const status = props.trial.trialStatus || props.trial.workflowStatus || 'S0'
  const buttons = []

  if (status === 'S0' || status === 'S3') {
    // 草稿或已退回: 编辑、作废、提交
    buttons.push(
      { type: 'edit', label: t('trialBasicAudit.action.edit'), buttonType: 'primary', icon: Edit },
      { type: 'cancel', label: t('trialBasicAudit.action.cancel'), buttonType: 'danger', icon: CloseBold },
      { type: 'submit', label: t('trialBasicAudit.action.submit'), buttonType: 'success', icon: Upload }
    )
  } else if (status === 'S1') {
    // 待审批: 查看
    buttons.push(
      { type: 'view', label: t('trialBasicAudit.action.view'), buttonType: 'info', icon: View }
    )
  } else if (status === 'S2') {
    // 已审批: 查看、归档
    buttons.push(
      { type: 'view', label: t('trialBasicAudit.action.view'), buttonType: 'info', icon: View },
      { type: 'archive', label: t('trialBasicAudit.action.archive'), buttonType: 'warning', icon: FolderOpened }
    )
  } else {
    // 已归档、作废: 查看
    buttons.push(
      { type: 'view', label: t('trialBasicAudit.action.view'), buttonType: 'info', icon: View }
    )
  }

  return buttons
})

// 处理卡片点击
const handleClick = () => {
  emit('view', props.trial)
}

// 处理操作
const handleAction = (type) => {
  emit(type, props.trial)
}
</script>

<style scoped lang="scss">
.trial-card {
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #ebeef5;

    .title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 12px;
    }
  }

  .card-content {
    margin-bottom: 16px;

    .info-row {
      display: flex;
      margin-bottom: 8px;
      font-size: 14px;

      .label {
        color: #909399;
        min-width: 100px;
        flex-shrink: 0;
      }

      .value {
        color: #606266;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .card-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}
</style>
