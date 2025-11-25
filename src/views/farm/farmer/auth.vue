<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-shield-user-line"></i>
        </div>
        <div class="header-content">
          <h1 class="page-title">{{ $t('farm.farmerAuth.title') }}</h1>
          <p class="page-subtitle">{{ $t('farm.farmerAuth.subtitle') }}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('farm.farmerAuth.title') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="top"
              class="farmer-form"
            >
              <el-row :gutter="24">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farm.farmerAuth.form.realName')" prop="realName">
                    <el-input
                      v-model="form.realName"
                      :placeholder="$t('farm.farmerAuth.placeholder.realName')"
                      size="large"
                    >
                      <template #prefix>
                        <i class="ri-user-line"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farm.farmerAuth.form.idCard')" prop="idCard">
                    <el-input
                      v-model="form.idCard"
                      :placeholder="$t('farm.farmerAuth.placeholder.idCard')"
                      size="large"
                    >
                      <template #prefix>
                        <i class="ri-id-card-line"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farm.farmerAuth.form.phone')" prop="phone">
                    <el-input
                      v-model="form.phone"
                      :placeholder="$t('farm.farmerAuth.placeholder.phone')"
                      size="large"
                    >
                      <template #prefix>
                        <i class="ri-phone-line"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farm.farmerAuth.form.adCode')" prop="adCode">
                    <el-input
                      v-model="form.adCode"
                      :placeholder="$t('farm.farmerAuth.placeholder.adCode')"
                      size="large"
                    >
                      <template #prefix>
                        <i class="ri-map-pin-line"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farm.farmerAuth.form.farmType')" prop="farmType">
                    <el-input
                      v-model="form.farmType"
                      :placeholder="$t('farm.farmerAuth.placeholder.farmType')"
                      size="large"
                    >
                      <template #prefix>
                        <i class="ri-plant-line"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farm.farmerAuth.form.certDoc')" prop="certDocPath">
                    <el-upload
                      class="cert-upload"
                      :action="uploadAction"
                      :file-list="fileList"
                      :on-success="handleUploadSuccess"
                      :on-remove="handleRemove"
                      :limit="5"
                      accept=".jpg,.png,.pdf"
                    >
                      <el-button type="primary" plain size="large">
                        <i class="ri-upload-2-line"></i>
                        {{ $t('common.upload') }}
                      </el-button>
                      <template #tip>
                        <div class="upload-tip">
                          {{ $t('farm.farmerAuth.uploadTip') }}
                        </div>
                      </template>
                    </el-upload>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item :label="$t('farm.farmerAuth.form.detailAddress')" prop="detailAddress">
                    <el-input
                      v-model="form.detailAddress"
                      :placeholder="$t('farm.farmerAuth.placeholder.detailAddress')"
                      type="textarea"
                      :rows="3"
                      size="large"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item :label="$t('farm.farmerAuth.form.remark')" prop="remark">
                    <el-input
                      v-model="form.remark"
                      :placeholder="$t('farm.farmerAuth.placeholder.remark')"
                      type="textarea"
                      :rows="3"
                      size="large"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <div class="form-actions">
                <el-button @click="handleReset" size="large">
                  {{ $t('common.reset') }}
                </el-button>
                <el-button
                  type="primary"
                  @click="handleSubmit"
                  :loading="loading"
                  class="submit-btn"
                  size="large"
                >
                  <i class="ri-send-plane-line"></i>
                  {{ $t('common.submit') }}
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { submitFarmerCert } from '@/api/farm'
import { useUserStore } from '@/store'

const { t } = useI18n()
const userStore = useUserStore()

// 表单引用
const formRef = ref(null)
const loading = ref(false)

// 表单数据
const form = reactive({
  realName: '',
  idCard: '',
  phone: '',
  adCode: '',
  farmType: '',
  certDocPath: '',
  detailAddress: '',
  remark: ''
})

// 文件列表
const fileList = ref([])

// 上传地址（需要根据实际情况配置）
const uploadAction = computed(() => {
  return `${import.meta.env.VITE_APP_API_URL}/upload`
})

// 表单验证规则
const rules = computed(() => ({
  realName: [
    { required: true, message: t('farm.farmerAuth.rules.realNameRequired'), trigger: 'blur' }
  ],
  idCard: [
    { required: true, message: t('farm.farmerAuth.rules.idCardRequired'), trigger: 'blur' },
    {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message: t('farm.farmerAuth.rules.idCardFormat'),
      trigger: 'blur'
    }
  ],
  phone: [
    { required: true, message: t('farm.farmerAuth.rules.phoneRequired'), trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: t('farm.farmerAuth.rules.phoneFormat'),
      trigger: 'blur'
    }
  ],
  adCode: [
    { required: true, message: t('farm.farmerAuth.rules.adCodeRequired'), trigger: 'blur' }
  ],
  farmType: [
    { required: true, message: t('farm.farmerAuth.rules.farmTypeRequired'), trigger: 'blur' }
  ],
  certDocPath: [
    { required: true, message: t('farm.farmerAuth.rules.certDocRequired'), trigger: 'change' }
  ],
  detailAddress: [
    { required: true, message: t('farm.farmerAuth.rules.detailAddressRequired'), trigger: 'blur' }
  ]
}))

// 文件上传成功
const handleUploadSuccess = (response, file) => {
  if (response.code === 200) {
    form.certDocPath = response.data.path
    ElMessage.success(t('common.uploadSuccess'))
  }
}

// 文件移除
const handleRemove = () => {
  form.certDocPath = ''
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    try {
      const data = {
        ...form,
        userId: userStore.userInfo?.userId
      }

      const res = await submitFarmerCert(data)
      if (res.code === 200) {
        ElMessage.success(t('farm.farmerAuth.applySuccess'))
        handleReset()
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  } catch (error) {
    console.log('Validation failed', error)
  }
}

// 重置表单
const handleReset = () => {
  formRef.value?.resetFields()
  fileList.value = []
}
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 200px);
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
}

.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* Content */
.content-wrapper {
  padding-bottom: 40px;
}

.info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 32px;
}

/* Form */
.farmer-form :deep(.el-form-item__label) {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
  padding-bottom: 10px;
}

.farmer-form :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
  transition: all 0.3s ease;
}

.farmer-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

.farmer-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

.farmer-form :deep(.el-input__prefix) {
  color: #009A44;
  font-size: 18px;
}

.farmer-form :deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.farmer-form :deep(.el-textarea__inner:hover) {
  border-color: #009A44;
}

.farmer-form :deep(.el-textarea__inner:focus) {
  border-color: #009A44;
}

/* Upload */
.cert-upload {
  width: 100%;
}

.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.form-actions :deep(.el-button) {
  min-width: 140px;
  border-radius: 8px;
  font-weight: 600;
}

.submit-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%);
}

.submit-btn i {
  margin-right: 4px;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 24px 20px;
    gap: 16px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .card-header {
    padding: 16px 20px;
  }

  .card-body {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions :deep(.el-button) {
    width: 100%;
  }
}
</style>
