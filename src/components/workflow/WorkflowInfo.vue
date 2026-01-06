<template>
  <div class="info-card workflow-info-card" v-if="shouldShow">
    <div class="card-header">
      <div class="card-title">
        <i class="ri-git-commit-line"></i>
        <span>{{ $t('research.breedingData.batch.form.workflowInfo') }}</span>
      </div>
    </div>
    <div class="card-body">
      <!-- Approval Comment Input (only in audit mode) -->
      <div v-if="mode === 'audit'" class="approval-comment-input">
        <el-form-item
          :label="$t('research.breedingData.batch.form.approvalComment')"
          :prop="commentProp"
          :rules="commentRequired ? [
            { required: true, message: $t('research.breedingData.batch.placeholder.approvalComment'), trigger: 'blur' }
          ] : []">
          <el-textarea
            v-model="commentModel"
            :rows="4"
            :maxlength="maxLength"
            show-word-limit
            :placeholder="$t('research.breedingData.batch.placeholder.approvalComment')" />
          <div class="comment-hint">
            <i class="ri-information-line"></i>
            <span>{{ hint || $t('research.breedingData.batch.hint.approvalComment') }}</span>
          </div>
        </el-form-item>
      </div>

      <!-- Approval History Table -->
      <div class="approval-history-section">
        <h4 class="history-title">{{ $t('research.breedingData.batch.form.approvalHistory') }}</h4>
        <div class="approval-history-table">
          <el-table
            :data="approvalHistory"
            border
            stripe
            :empty-text="$t('common.noData')">
            <el-table-column
              :label="$t('research.breedingData.batch.form.approver')"
              prop="approver"
              width="200" />
            <el-table-column
              :label="$t('research.breedingData.batch.form.approvalTime')"
              prop="approvalTime"
              width="250" />
            <el-table-column
              :label="$t('research.breedingData.batch.form.comment')"
              prop="comment">
              <template #default="{ row }">
                <div class="approval-comment">{{ row.comment || '-' }}</div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="showStatus"
              :label="$t('research.breedingData.batch.form.status')"
              width="120"
              align="center">
              <template #default="{ row }">
                <div
                  class="approval-status-badge"
                  :class="{
                    'is-approved': row.status === 'approved',
                    'is-rejected': row.status === 'rejected'
                  }">
                  <i :class="row.status === 'approved' ? 'ri-check-line' : 'ri-close-line'"></i>
                  {{ row.status === 'approved' ? $t('common.approved') : $t('common.rejected') }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Current workflow status (S0, S1, S2, S3, S9, S10)
   */
  workflowStatus: {
    type: String,
    default: ''
  },

  /**
   * Page mode: 'add', 'edit', 'audit', 'view'
   */
  mode: {
    type: String,
    default: 'view'
  },

  /**
   * Approval history data
   * @example
   * [
   *   {
   *     approver: 'John Doe',
   *     approvalTime: '2024-01-15 14:30:00',
   *     comment: 'Approved',
   *     status: 'approved'
   *   }
   * ]
   */
  approvalHistory: {
    type: Array,
    default: () => []
  },

  /**
   * v-model for approval comment
   */
  modelValue: {
    type: String,
    default: ''
  },

  /**
   * Form item prop name for validation
   */
  commentProp: {
    type: String,
    default: 'approvalComment'
  },

  /**
   * Whether comment is required
   */
  commentRequired: {
    type: Boolean,
    default: true
  },

  /**
   * Max length for comment
   */
  maxLength: {
    type: Number,
    default: 500
  },

  /**
   * Hint text below comment input
   */
  hint: {
    type: String,
    default: ''
  },

  /**
   * Show status column in history table
   */
  showStatus: {
    type: Boolean,
    default: false
  },

  /**
   * Hide workflow info for certain states
   */
  hideForStates: {
    type: Array,
    default: () => ['S0', 'S10']
  }
})

const emit = defineEmits(['update:modelValue'])

const commentModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Determine if workflow info should be shown
const shouldShow = computed(() => {
  if (props.mode === 'add') return false
  return !props.hideForStates.includes(props.workflowStatus)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/workflow-common.scss';

.history-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f2f5;
}

.approval-history-section {
  margin-top: 16px;
}
</style>
