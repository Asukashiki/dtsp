<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.c1Propagation.audit') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.c1Propagation.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.applicantOrgType')">
                    <el-input
                      :value="data.applicantOrgType ? $t(`research.c1Propagation.orgType.${data.applicantOrgType}`) : '-'"
                      disabled
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.applicantOrgName')">
                    <el-input :value="data.applicantOrgName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.applicantOrgId')">
                    <el-input :value="data.applicantOrgId" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" v-if="data.authId">
                  <el-form-item :label="$t('research.c1Propagation.columns.authId')">
                    <el-input :value="data.authId" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 繁殖信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-plant-line"></i>
                <span>{{ $t('research.c1Propagation.form.propagationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.propagationBatchId')">
                    <el-input :value="data.propagationBatchId" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" v-if="data.sourceType">
                  <el-form-item :label="$t('research.c1Propagation.sourceType')">
                    <el-tag :type="data.sourceType === 'OSE_RECEIVE' ? 'success' : 'primary'" size="default">
                      {{ data.sourceType === 'OSE_RECEIVE' ? $t('research.c1Propagation.sourceOseReceive') : $t('research.c1Propagation.sourceOseBatch') }}
                    </el-tag>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.cropType')">
                    <el-input :value="getLabelByValue('crop_type', data.cropType)" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.varietyName')">
                    <el-input :value="data.varietyName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.applyDate')">
                    <el-input :value="data.applyDate" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.demandQuantity')">
                    <el-input :value="data.demandQuantity ? `${data.demandQuantity} kg` : '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.fromSeedType')">
                    <el-input :value="data.fromSeedType || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.toSeedType')">
                    <el-input :value="data.toSeedType || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('research.c1Propagation.form.applyDescription')">
                    <el-input
                      :value="data.applyDescription || '-'"
                      type="textarea"
                      :rows="3"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 审核信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-checkbox-circle-line"></i>
                <span>{{ $t('research.c1Propagation.form.auditInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.auditResult')" prop="auditResult">
                    <el-radio-group v-model="formData.auditResult">
                      <el-radio value="approved">
                        <i class="ri-checkbox-circle-line"></i>
                        {{ $t('research.c1Propagation.auditResult.approved') }}
                      </el-radio>
                      <el-radio value="rejected">
                        <i class="ri-close-circle-line"></i>
                        {{ $t('research.c1Propagation.auditResult.rejected') }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1Propagation.form.auditOrg')">
                    <el-input
                      v-model="formData.auditOrg"
                      disabled
                      placeholder="OIA"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('research.c1Propagation.form.auditOpinion')" prop="auditOpinion">
                    <el-input
                      v-model="formData.auditOpinion"
                      type="textarea"
                      :rows="4"
                      :placeholder="$t('research.c1Propagation.placeholder.auditOpinion')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮区域（固定在底部） -->
          <div class="form-actions">
            <el-button @click="handleCancel">
              {{ $t('common.cancel') }}
            </el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">
              {{ $t('common.submit') }}
            </el-button>
          </div>
        </el-form>
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
const loading = ref(false)

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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>
