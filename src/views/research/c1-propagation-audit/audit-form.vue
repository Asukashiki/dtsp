<template>
  <div class="audit-form-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-checkbox-circle-line"></i>
          <span>{{ $t('research.c1Propagation.audit') }}</span>
        </div>
        <el-button @click="handleCancel">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <div class="card-body">
        <!-- 状态标签 -->
        <div class="status-banner status-pending">
          <el-tag type="warning" size="large">
            {{ $t('research.c1Propagation.status.pending') }}
          </el-tag>
        </div>

        <!-- 机构信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-building-line"></i>
            {{ $t('research.c1Propagation.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.applicantOrgType') }}:</span>
              <span class="value">{{ data.applicantOrgType ? $t(`research.c1Propagation.orgType.${data.applicantOrgType}`) : '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.applicantOrgName') }}:</span>
              <span class="value">{{ data.applicantOrgName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.applicantOrgId') }}:</span>
              <span class="value">{{ data.applicantOrgId }}</span>
            </div>
            <div class="detail-item" v-if="data.authId">
              <span class="label">{{ $t('research.c1Propagation.columns.authId') }}:</span>
              <span class="value">{{ data.authId }}</span>
            </div>
          </div>
        </div>

        <!-- 繁殖信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('research.c1Propagation.form.propagationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.propagationBatchId') }}:</span>
              <span class="value">{{ data.propagationBatchId }}</span>
            </div>
            <div class="detail-item" v-if="data.sourceType">
              <span class="label">{{ $t('research.c1Propagation.sourceType') }}:</span>
              <span class="value">
                <el-tag :type="data.sourceType === 'OSE_RECEIVE' ? 'success' : 'primary'" size="small">
                  {{ data.sourceType === 'OSE_RECEIVE' ? $t('research.c1Propagation.sourceOseReceive') : $t('research.c1Propagation.sourceOseBatch') }}
                </el-tag>
              </span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.cropType') }}:</span>
              <span class="value">{{ getLabelByValue('crop_type', data.cropType) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.varietyName') }}:</span>
              <span class="value">{{ data.varietyName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.applyDate') }}:</span>
              <span class="value">{{ data.applyDate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.demandQuantity') }}:</span>
              <span class="value">
                <span style="font-weight: 500; color: #009A44;">{{ data.demandQuantity || '-' }}</span>
                <span v-if="data.demandQuantity" style="margin-left: 4px; color: #909399; font-size: 13px;">kg</span>
              </span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.fromSeedType') }}:</span>
              <span class="value">{{ data.fromSeedType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.toSeedType') }}:</span>
              <span class="value">{{ data.toSeedType || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.c1Propagation.form.applyDescription') }}:</span>
              <span class="value">{{ data.applyDescription || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 审核表单 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-checkbox-circle-line"></i>
            {{ $t('research.c1Propagation.form.auditInfo') }}
          </div>

          <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-width="140px"
            label-position="right"
          >
            <el-form-item :label="$t('research.c1Propagation.form.auditResult')" prop="auditResult">
              <el-radio-group v-model="formData.auditResult" class="audit-radio-group">
                <el-radio-button value="approved" class="approve-btn">
                  <i class="ri-checkbox-circle-line"></i>
                  {{ $t('research.c1Propagation.auditResult.approved') }}
                </el-radio-button>
                <el-radio-button value="rejected" class="reject-btn">
                  <i class="ri-close-circle-line"></i>
                  {{ $t('research.c1Propagation.auditResult.rejected') }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.auditOpinion')" prop="auditOpinion">
              <el-input
                v-model="formData.auditOpinion"
                type="textarea"
                :rows="4"
                :placeholder="$t('research.c1Propagation.placeholder.auditOpinion')"
              />
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.auditOrg')">
              <el-input
                v-model="formData.auditOrg"
                :disabled="true"
                placeholder="OIA"
              />
            </el-form-item>
          </el-form>
        </div>

        <div class="form-actions">
          <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { auditC1Propagation } from '@/api/c1Propagation'
import { getUserInfo } from '@/utils/auth'
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['cancel', 'success'])

// 表单状态
const formRef = ref(null)
const submitting = ref(false)

// 表单数据
const formData = reactive({
  auditResult: '',
  auditOpinion: '',
  auditOrg: ''
})

// 表单验证规则
const rules = computed(() => ({
  auditResult: [
    { required: true, message: t('research.c1Propagation.rules.auditResultRequired'), trigger: 'change' }
  ],
  auditOpinion: [
    { required: true, message: t('research.c1Propagation.rules.auditOpinionRequired'), trigger: 'blur' }
  ]
}))

// 默认值：从当前登录用户信息中获取审核机构
onMounted(() => {
  const currentUser = getUserInfo()
  if (currentUser && currentUser.user) {
    formData.auditOrg = currentUser.user.organName || ''
  }
})

// 提交审核
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = {
      id: props.data.id,
      auditResult: formData.auditResult,
      auditOpinion: formData.auditOpinion,
      auditOrg: formData.auditOrg
    }

    const res = await auditC1Propagation(submitData)
    if (res.code === 200) {
      ElMessage.success(t('research.c1Propagation.auditSuccess'))
      emit('success')
    } else {
      ElMessage.error(res.msg || t('common.submitFailed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Failed to submit audit:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.audit-form-container {
  padding: 20px 0;
}

.info-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
}

.card-title i {
  font-size: 20px;
}

.card-body {
  padding: 30px 24px;
}

.status-banner {
  display: flex;
  justify-content: center;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  background: #f5f5f5;
}

.status-banner.status-pending {
  background: linear-gradient(135deg, rgba(230, 162, 60, 0.1) 0%, rgba(230, 162, 60, 0.05) 100%);
}

.detail-section,
.form-section {
  margin-bottom: 30px;
}

.detail-section:last-child,
.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  border-left: 4px solid #009A44;
  margin-bottom: 20px;
  border-radius: 4px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item .label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.detail-item .value {
  font-size: 15px;
  color: #333;
}

.audit-radio-group {
  display: flex;
  gap: 16px;
}

.audit-radio-group :deep(.el-radio-button__inner) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

@media screen and (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .audit-radio-group {
    flex-direction: column;
    width: 100%;
  }

  .audit-radio-group :deep(.el-radio-button) {
    width: 100%;
  }

  .audit-radio-group :deep(.el-radio-button__inner) {
    width: 100%;
    justify-content: center;
  }

  :deep(.el-form-item__label) {
    text-align: left !important;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
