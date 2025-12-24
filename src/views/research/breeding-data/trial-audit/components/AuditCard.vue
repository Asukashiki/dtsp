<template>
  <el-card class="audit-card" shadow="hover">
    <div class="card-header">
      <div class="title">{{ audit.trialName }}</div>
      <StatusTag :status="audit.workflowStatus || audit.auditStatus" />
    </div>

    <div class="card-content">
      <div class="info-row">
        <span class="label">{{ t('trialBasicAudit.audit.list.batchName') }}:</span>
        <span class="value">{{ audit.batchId }}</span>
      </div>
      <div class="info-row">
        <span class="label">{{ t('trialBasicAudit.audit.list.submitter') }}:</span>
        <span class="value">{{ audit.submitterName }}</span>
      </div>
      <div class="info-row">
        <span class="label">{{ t('trialBasicAudit.audit.list.submitTime') }}:</span>
        <span class="value">{{ formatDate(audit.submitTime) }}</span>
      </div>
      <div v-if="audit.auditorName" class="info-row">
        <span class="label">{{ t('trialBasicAudit.audit.list.auditor') }}:</span>
        <span class="value">{{ audit.auditorName }}</span>
      </div>
      <div v-if="audit.auditTime" class="info-row">
        <span class="label">{{ t('trialBasicAudit.audit.list.auditTime') }}:</span>
        <span class="value">{{ formatDate(audit.auditTime) }}</span>
      </div>
    </div>

    <div class="card-actions">
      <el-button
        v-if="showAuditButton"
        type="primary"
        size="small"
        @click="handleAudit"
      >
        {{ t('trialBasicAudit.action.audit') }}
      </el-button>
      <template v-else>
        <el-button
          type="info"
          size="small"
          @click="handleView"
        >
          {{ t('trialBasicAudit.action.view') }}
        </el-button>
        <el-button
          v-if="audit.auditStatus === 'S2' && showVoidButton"
          type="danger"
          size="small"
          @click="handleVoid"
        >
          {{ t('trialBasicAudit.action.void') }}
        </el-button>
      </template>
    </div>
  </el-card>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import StatusTag from '../../trial/components/StatusTag.vue'

const props = defineProps({
  audit: {
    type: Object,
    required: true
  },
  showAuditButton: {
    type: Boolean,
    default: true
  },
  showVoidButton: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['audit', 'view', 'void'])

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

const handleAudit = () => {
  emit('audit', props.audit)
}

const handleView = () => {
  emit('view', props.audit)
}

const handleVoid = () => {
  emit('void', props.audit)
}
</script>

<style scoped lang="scss">
.audit-card {
  margin-bottom: 16px;

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
  }
}
</style>
