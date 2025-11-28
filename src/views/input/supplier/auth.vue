<template>
  <div class="supplier-auth-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-user-add-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('input.supplier.auth.title') }}</h1>
          <p class="page-subtitle">{{ $t('input.supplier.auth.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-position="top"
        class="auth-form"
        @submit.prevent="handleSubmit"
      >
        <!-- 企业基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-building-line"></i>
            {{ $t('research.enterprise.form.identityInfo') }}
          </div>

          <el-form-item :label="$t('input.supplier.auth.form.orgName')" prop="orgName">
            <el-input
              v-model="formData.orgName"
              :placeholder="$t('input.supplier.auth.placeholder.orgName')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.creditCode')" prop="creditCode">
            <el-input
              v-model="formData.creditCode"
              :placeholder="$t('input.supplier.auth.placeholder.creditCode')"
              show-word-limit
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.legalPerson')" prop="legalPerson">
            <el-input
              v-model="formData.legalPerson"
              :placeholder="$t('input.supplier.auth.placeholder.legalPerson')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.legalId')" prop="legalId">
            <el-input
              v-model="formData.legalId"
              :placeholder="$t('input.supplier.auth.placeholder.legalId')"
              show-word-limit
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.adCode')" prop="adCode">
            <el-cascader
              v-model="formData.adCodePath"
              :options="adCodeOptions"
              :placeholder="$t('input.supplier.auth.placeholder.adCode')"
              :props="{ checkStrictly: true, emitPath: false }"
              filterable
              clearable
              style="width: 100%"
              @change="handleAdCodeChange"
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.businessScope')" prop="businessScope">
            <el-input
              v-model="formData.businessScope"
              type="textarea"
              :placeholder="$t('input.supplier.auth.placeholder.businessScope')"
              :rows="3"
              maxlength="255"
              show-word-limit
            />
          </el-form-item>
        </div>

        <!-- 营业执照 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-file-text-line"></i>
            {{ $t('input.supplier.auth.form.licensePath') }}
          </div>

          <el-form-item :label="$t('input.supplier.auth.form.licensePath')" prop="licensePath">
            <el-upload
              class="upload-demo"
              :action="uploadAction"
              :headers="uploadHeaders"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeUpload"
              :file-list="fileList"
              list-type="picture-card"
              :limit="1"
              accept=".jpg,.jpeg,.png,.pdf"
            >
              <i class="ri-upload-cloud-line"></i>
              <div class="upload-text">{{ $t('common.upload') }}</div>
            </el-upload>
            <div class="upload-tip">{{ $t('input.supplier.auth.uploadTip') }}</div>
          </el-form-item>
        </div>

        <!-- 联系人信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-contacts-line"></i>
            {{ $t('identity.form.contactName') }}
          </div>

          <el-form-item :label="$t('input.supplier.auth.form.contactName')" prop="contactName">
            <el-input
              v-model="formData.contactName"
              :placeholder="$t('input.supplier.auth.placeholder.contactName')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.contactPhone')" prop="contactPhone">
            <el-input
              v-model="formData.contactPhone"
              :placeholder="$t('input.supplier.auth.placeholder.contactPhone')"
              clearable
            />
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">
            <i class="ri-check-line"></i>
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { applySupplierCert, getAdCodeList } from '@/api/supplier'
import { useUserStore } from '@/store'
import { getToken } from '@/utils/auth'

const router = useRouter()
const { t, locale } = useI18n()
const userStore = useUserStore()
const formRef = ref(null)
const submitting = ref(false)

// 表单数据
const formData = reactive({
  orgName: '',
  creditCode: '',
  legalPerson: '',
  legalId: '',
  adCode: '',
  adCodePath: null,
  businessScope: '',
  licensePath: '',
  contactName: '',
  contactPhone: ''
})

// 行政区划选项
const adCodeOptions = ref([])

// 文件列表
const fileList = ref([])

// 上传配置
const uploadAction = computed(() => `${import.meta.env.VITE_APP_API_URL}/auth/file/upload`)
const uploadHeaders = computed(() => ({
  Authorization: getToken()
}))

// 表单验证规则
const rules = computed(() => ({
  orgName: [
    { required: true, message: t('input.supplier.auth.rules.orgNameRequired'), trigger: 'blur' }
  ],
  creditCode: [
    { required: true, message: t('input.supplier.auth.rules.creditCodeRequired'), trigger: 'blur' }
  ],
  legalPerson: [
    { required: true, message: t('input.supplier.auth.rules.legalPersonRequired'), trigger: 'blur' }
  ],
  legalId: [
    { required: true, message: t('input.supplier.auth.rules.legalIdRequired'), trigger: 'blur' }
  ],
  adCode: [
    { required: true, message: t('input.supplier.auth.rules.adCodeRequired'), trigger: 'change' }
  ],
  businessScope: [
    { required: true, message: t('input.supplier.auth.rules.businessScopeRequired'), trigger: 'blur' }
  ],
  licensePath: [
    { required: true, message: t('input.supplier.auth.rules.licensePathRequired'), trigger: 'change' }
  ],
  contactName: [
    { required: true, message: t('input.supplier.auth.rules.contactNameRequired'), trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: t('input.supplier.auth.rules.contactPhoneRequired'), trigger: 'blur' }
  ]
}))

// 加载行政区划数据
const loadAdCodeList = async () => {
  try {
    const res = await getAdCodeList()
    if (res.code === 200 && res.data) {
      adCodeOptions.value = res.data
    }
  } catch (error) {
    console.error('Failed to load ad code list:', error)
  }
}

// 处理行政区划选择变化
const handleAdCodeChange = (value) => {
  formData.adCode = value || ''
}

// 上传前验证
const beforeUpload = (file) => {
  const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isValidType) {
    ElMessage.error(t('input.supplier.auth.uploadTip'))
    return false
  }
  if (!isLt2M) {
    ElMessage.error(t('input.supplier.auth.uploadTip'))
    return false
  }
  return true
}

// 上传成功
const handleUploadSuccess = (response) => {
  if (response.code === 200) {
    formData.licensePath = response.data.path
    fileList.value = [{
      name: response.data.name,
      url: response.data.url
    }]
    ElMessage.success(t('common.uploadSuccess'))
  } else {
    ElMessage.error(response.msg || t('common.failed'))
  }
}

// 上传失败
const handleUploadError = () => {
  ElMessage.error(t('common.failed'))
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = {
      userId: userStore.userInfo?.userId || 0,
      ...formData
    }

    const res = await applySupplierCert(submitData)
    if (res.code === 200) {
      ElMessage.success(t('input.supplier.auth.applySuccess'))
      setTimeout(() => {
        router.back()
      }, 1500)
    } else {
      ElMessage.error(res.msg || t('input.supplier.auth.applyFailed'))
    }
  } catch (error) {
    console.error('Form validation failed:', error)
  } finally {
    submitting.value = false
  }
}

// 返回
const handleBack = () => {
  router.back()
}

onMounted(() => {
  loadAdCodeList()
})
</script>

<style scoped>
.supplier-auth-container {
  min-height: calc(100vh - 120px);
  position: relative;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 24px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.header-icon {
  font-size: 32px;
  color: white;
}

.header-text {
  flex: 1;
  color: white;
  min-width: 0;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

/* 表单区域 */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

.auth-form {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 32px;
}

.auth-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: #303133;
  margin-bottom: 8px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section:last-of-type {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 18px;
  color: #009A44;
}

/* 上传组件 */
.upload-demo :deep(.el-upload) {
  width: 120px;
  height: 120px;
}

.upload-demo :deep(.el-upload-list__item) {
  width: 120px;
  height: 120px;
}

.upload-text {
  font-size: 12px;
  color: #606266;
  margin-top: 4px;
}

.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.form-actions .el-button {
  min-width: 120px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
    padding: 20px 0;
  }

  .header-content {
    padding: 0 16px;
  }

  .content-wrapper {
    max-width: 100%;
  }

  .auth-form {
    padding: 24px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
    padding: 16px 0;
  }

  .header-content {
    padding: 0 12px;
    gap: 12px;
  }

  .header-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 10px;
  }

  .header-icon {
    font-size: 24px;
  }

  .page-title {
    font-size: 18px;
  }

  .page-subtitle {
    display: none;
  }

  .auth-form {
    padding: 16px;
  }

  .auth-form :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }
}
</style>
