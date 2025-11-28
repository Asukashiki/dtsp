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
      <!-- 状态提示 -->
      <el-alert
        v-if="certInfo"
        :title="getStatusText"
        :type="getStatusType"
        :closable="false"
        style="margin-bottom: 16px"
      >
        <template v-if="certInfo.status === 0 && certInfo.audit_opinion">
          <p style="margin: 8px 0 0 0">{{ $t('input.supplier.approval.form.auditOpinion') }}: {{ certInfo.audit_opinion }}</p>
        </template>
      </el-alert>

      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-position="top"
        class="auth-form"
        v-loading="loading"
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
              :disabled="isFormDisabled"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.creditCode')" prop="creditCode">
            <el-input
              v-model="formData.creditCode"
              :placeholder="$t('input.supplier.auth.placeholder.creditCode')"
              :disabled="isFormDisabled"
              show-word-limit
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.legalPerson')" prop="legalPerson">
            <el-input
              v-model="formData.legalPerson"
              :placeholder="$t('input.supplier.auth.placeholder.legalPerson')"
              :disabled="isFormDisabled"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.legalId')" prop="legalId">
            <el-input
              v-model="formData.legalId"
              :placeholder="$t('input.supplier.auth.placeholder.legalId')"
              :disabled="isFormDisabled"
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
              :disabled="isFormDisabled"
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
              :disabled="isFormDisabled"
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
              :http-request="handleUploadRequest"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeUpload"
              :file-list="fileList"
              :disabled="isFormDisabled"
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
              :disabled="isFormDisabled"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('input.supplier.auth.form.contactPhone')" prop="contactPhone">
            <el-input
              v-model="formData.contactPhone"
              :placeholder="$t('input.supplier.auth.placeholder.contactPhone')"
              :disabled="isFormDisabled"
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
          <el-button
            v-if="!isFormDisabled"
            type="primary"
            :loading="submitting"
            @click="handleSubmit"
          >
            <i class="ri-check-line"></i>
            {{ isEdit ? $t('common.update') : $t('common.submit') }}
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
import { applySupplierCert, updateSupplierCert, getSupplierCertByUser, getAdCodeList } from '@/api/supplier'
import { uploadFile, getFilePreviewUrl } from '@/api/file'
import { useUserStore } from '@/store'

const router = useRouter()
const { t, locale } = useI18n()
const userStore = useUserStore()
const formRef = ref(null)
const submitting = ref(false)
const loading = ref(false)

// 认证信息
const certInfo = ref(null)
const isEdit = ref(false) // 是否为编辑模式

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

// 计算表单是否可编辑
const isFormDisabled = computed(() => {
  if (!certInfo.value) return false
  // status: 0-未通过(可编辑), 1-审核中(不可编辑), 2-已通过(不可编辑)
  return certInfo.value.status === 1 || certInfo.value.status === 2
})

// 获取状态文本
const getStatusText = computed(() => {
  if (!certInfo.value) return ''
  const statusMap = {
    0: t('input.supplier.approval.status.rejected'),
    1: t('input.supplier.approval.status.pending'),
    2: t('input.supplier.approval.status.approved')
  }
  return statusMap[certInfo.value.status] || ''
})

// 获取状态类型
const getStatusType = computed(() => {
  if (!certInfo.value) return ''
  const typeMap = { 0: 'danger', 1: 'warning', 2: 'success' }
  return typeMap[certInfo.value.status] || ''
})

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

// 加载用户认证信息
const loadUserCertInfo = async () => {
  const userId = userStore.userInfo?.user?.id

  loading.value = true
  try {
    const res = await getSupplierCertByUser(userId)
    if (res.code === 200 && res.data) {
      certInfo.value = res.data
      isEdit.value = true

      // 回显表单数据
      formData.orgName = res.data.org_name || ''
      formData.creditCode = res.data.credit_code || ''
      formData.legalPerson = res.data.legal_person || ''
      formData.legalId = res.data.legal_id || ''
      formData.adCode = res.data.ad_code || ''
      formData.adCodePath = res.data.ad_code || null
      formData.businessScope = res.data.business_scope || ''
      formData.licensePath = res.data.license_path || ''
      formData.contactName = res.data.contact_name || ''
      formData.contactPhone = res.data.contact_phone || ''

      // 回显文件
      if (res.data.license_path) {
        try {
          const previewRes = await getFilePreviewUrl(res.data.license_path)
          const previewUrl = previewRes.code === 200 ? previewRes.msg : ''
          fileList.value = [{
            name: res.data.org_name || 'license',
            url: previewUrl,
            uid: res.data.license_path
          }]
        } catch (error) {
          console.error('Failed to load file preview:', error)
        }
      }
    }
  } catch (error) {
    console.error('Failed to load user cert info:', error)
  } finally {
    loading.value = false
  }
}

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

// 自定义上传请求
const handleUploadRequest = async (options) => {
  try {
    const res = await uploadFile(options.file)
    if (res.code === 200 && res.data) {
      options.onSuccess(res)
    } else {
      options.onError(new Error(res.msg || t('common.uploadFailed')))
    }
  } catch (error) {
    options.onError(error)
  }
}

// 上传成功
const handleUploadSuccess = async (response) => {
  if (response.code === 200 && response.data) {
    // 保存文件的 dataId 作为 licensePath
    formData.licensePath = response.data.id

    // 获取预览URL用于显示
    try {
      const previewRes = await getFilePreviewUrl(response.data.id)
      const previewUrl = previewRes.code === 200 ? previewRes.msg : ''

      fileList.value = [{
        name: response.data.originalFileName || response.data.fileName || 'file',
        url: previewUrl,
        uid: response.data.id
      }]
    } catch (error) {
      console.error('Failed to get preview URL:', error)
      // 如果获取预览失败，也显示文件已上传
      fileList.value = [{
        name: response.data.originalFileName || response.data.fileName || 'file',
        uid: response.data.id
      }]
    }

    ElMessage.success(t('common.uploadSuccess'))
  } else {
    ElMessage.error(response.msg || t('common.uploadFailed'))
  }
}

// 上传失败
const handleUploadError = (error) => {
  console.error('Upload failed:', error)
  ElMessage.error(error?.message || t('common.uploadFailed'))
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  // 检查是否可以提交
  if (isFormDisabled.value) {
    ElMessage.warning(t('input.supplier.auth.cannotEdit'))
    return
  }

  try {
    await formRef.value.validate()
    submitting.value = true

    let res
    if (isEdit.value && certInfo.value) {
      // 更新模式
      const updateData = {
        certId: certInfo.value.cert_id,
        ...formData
      }
      res = await updateSupplierCert(updateData)
    } else {
      // 新增模式
      const submitData = {
        userId: userStore.userInfo?.user?.userId || 0,
        ...formData
      }
      res = await applySupplierCert(submitData)
    }

    if (res.code === 200) {
      ElMessage.success(
        isEdit.value
          ? t('input.supplier.auth.updateSuccess')
          : t('input.supplier.auth.applySuccess')
      )
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

onMounted(async () => {
  await loadAdCodeList()
  await loadUserCertInfo()
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
