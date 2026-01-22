<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader :title="pageTitle" :subtitle="$t('orgRegistration.subtitle')" shadow show-back @back="handleCancel" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" class="registration-form">
          <!-- 基本信息 -->
          <InfoCard :title="$t('orgRegistration.form.basicInfo')" icon="ri-information-line">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.orgType')" prop="orgType">
                  <el-select v-model="formData.orgType" :placeholder="$t('orgRegistration.placeholder.orgType')"
                    style="width: 100%">
                    <el-option value="UNION" :label="$t('orgRegistration.orgType.UNION')"></el-option>
                    <el-option value="COOPERATIVE" :label="$t('orgRegistration.orgType.COOPERATIVE')"></el-option>
                    <el-option value="PRIVATE" :label="$t('orgRegistration.orgType.PRIVATE')"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.orgName')" prop="orgName">
                  <el-input v-model="formData.orgName" :placeholder="$t('orgRegistration.placeholder.orgName')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.unifiedCode')" prop="unifiedCode">
                  <el-input v-model="formData.unifiedCode"
                    :placeholder="$t('orgRegistration.placeholder.unifiedCode')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.licenseNumber')" prop="licenseNumber">
                  <el-input v-model="formData.licenseNumber"
                    :placeholder="$t('orgRegistration.placeholder.licenseNumber')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.licenseStart')" prop="licenseStart">
                  <el-date-picker v-model="formData.licenseStart" type="date" format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD" :placeholder="$t('orgRegistration.placeholder.licenseStart')"
                    style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.licenseEnd')" prop="licenseEnd">
                  <el-date-picker v-model="formData.licenseEnd" type="date" format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD" :placeholder="$t('orgRegistration.placeholder.licenseEnd')"
                    style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.variety.cropType')" prop="cropTypes">
                  <el-select v-model="cropTypesArray" :placeholder="$t('research.variety.cropType')" style="width: 100%"
                    multiple v-loading="dictLoading">
                    <el-option v-for="item in options.crop_type" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </InfoCard>

          <!-- 位置信息 -->
          <InfoCard :title="$t('orgRegistration.form.locationInfo')" icon="ri-map-pin-line">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.regionCode')" prop="regionCode">
                  <el-cascader v-model="formData.regionCode" :options="regionTreeOptions"
                    :placeholder="$t('orgRegistration.placeholder.regionCode')"
                    :props="{ checkStrictly: true, emitPath: false }" filterable clearable style="width: 100%"
                    v-loading="regionTreeLoading" @change="handleRegionChange" />
                </el-form-item>
              </el-col>
              <el-col :xs="24">
                <el-form-item :label="$t('orgRegistration.form.fullAddress')" prop="fullAddress">
                  <el-input v-model="formData.fullAddress"
                    :placeholder="$t('orgRegistration.placeholder.fullAddress')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.gpsLat')" prop="gpsLat">
                  <el-input v-model="formData.gpsLat" :placeholder="$t('orgRegistration.placeholder.gpsLat')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.gpsLng')" prop="gpsLng">
                  <el-input v-model="formData.gpsLng" :placeholder="$t('orgRegistration.placeholder.gpsLng')" />
                </el-form-item>
              </el-col>
            </el-row>
          </InfoCard>

          <!-- 证照信息 -->
          <InfoCard :title="$t('orgRegistration.form.certificateInfo')" icon="ri-file-text-line">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.businessLicenseUrl')" prop="businessLicenseUrl">
                  <el-upload class="upload-demo" :http-request="handleBusinessLicenseUpload"
                    :on-success="handleBusinessLicenseSuccess" :on-error="handleUploadError"
                    :before-upload="beforeUpload" :file-list="businessLicenseFileList" list-type="picture-card"
                    :limit="1" accept=".jpg,.jpeg,.png">
                    <i class="ri-upload-cloud-line"></i>
                    <div class="upload-text">{{ $t('common.upload') }}</div>
                  </el-upload>
                  <div class="upload-tip">{{ $t('orgRegistration.uploadTip') }}</div>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.taxCertUrl')" prop="taxCertUrl">
                  <el-upload class="upload-demo" :http-request="handleTaxCertUpload" :on-success="handleTaxCertSuccess"
                    :on-error="handleUploadError" :before-upload="beforeUpload" :file-list="taxCertFileList"
                    list-type="picture-card" :limit="1" accept=".jpg,.jpeg,.png">
                    <i class="ri-upload-cloud-line"></i>
                    <div class="upload-text">{{ $t('common.upload') }}</div>
                  </el-upload>
                  <div class="upload-tip">{{ $t('orgRegistration.uploadTip') }}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </InfoCard>

          <!-- 联系信息 -->
          <InfoCard :title="$t('orgRegistration.form.contactInfo')" icon="ri-contacts-line">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('orgRegistration.form.contactName')" prop="contactName">
                  <el-input v-model="formData.contactName"
                    :placeholder="$t('orgRegistration.placeholder.contactName')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('orgRegistration.form.contactMobile')" prop="contactMobile">
                  <el-input v-model="formData.contactMobile"
                    :placeholder="$t('orgRegistration.placeholder.contactMobile')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('orgRegistration.form.contactEmail')" prop="contactEmail">
                  <el-input v-model="formData.contactEmail"
                    :placeholder="$t('orgRegistration.placeholder.contactEmail')" />
                </el-form-item>
              </el-col>
            </el-row>
          </InfoCard>

          <!-- 账号信息（仅新增时显示） -->
          <InfoCard v-if="!isEdit" :title="$t('orgRegistration.form.accountInfo')" icon="ri-user-settings-line">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.applyUsername')" prop="applyUsername">
                  <el-input v-model="formData.applyUsername"
                    :placeholder="$t('orgRegistration.placeholder.applyUsername')" @blur="checkUsername">
                    <template #append v-if="usernameCheckResult !== null">
                      <i :class="usernameCheckResult ? 'ri-check-line text-success' : 'ri-close-line text-danger'"></i>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.applyPassword')" prop="applyPassword">
                  <el-input v-model="formData.applyPassword" type="password" show-password
                    :placeholder="$t('orgRegistration.placeholder.applyPassword')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.confirmPassword')" prop="confirmPassword">
                  <el-input v-model="formData.confirmPassword" type="password" show-password
                    :placeholder="$t('orgRegistration.placeholder.confirmPassword')" />
                </el-form-item>
              </el-col>
            </el-row>
          </InfoCard>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  submitRegistration,
  getRegistrationDetail,
  checkUsernameUnique,
  getRegionTree,
  buildRegionPath
} from '@/api/breedingOrgRegistration'
import { useDict } from '@/hooks/useDict'
import { uploadFile, getFilePreviewUrl } from '@/api/file'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 页面模式
const isEdit = computed(() => !!route.params.id)

// 页面标题
const pageTitle = computed(() => {
  return isEdit.value ? t('orgRegistration.form.title.edit') : t('orgRegistration.form.title.add')
})

// 表单相关
const formRef = ref(null)
const submitting = ref(false)
const usernameCheckResult = ref(null)

// 行政区划树
const regionTreeOptions = ref([])
const regionTreeLoading = ref(false)

// 初始化字典
const { options, loading: dictLoading } = useDict(['crop_type'], {
  immediate: true,
  cache: true
})

// 种子/作物类型数组（用于多选）
const cropTypesArray = ref([])

// 文件上传相关
const businessLicenseFileList = ref([])
const taxCertFileList = ref([])

// 监听 cropTypesArray 变化，同步到 formData.cropTypes
watch(cropTypesArray, (val) => {
  formData.cropTypes = val.join(',')
})

// 表单数据
const formData = reactive({
  id: null,
  orgType: '',
  orgName: '',
  unifiedCode: '',
  licenseNumber: '',
  licenseStart: '',
  licenseEnd: '',
  cropTypes: '',
  regionCode: '',
  regionName: '',
  fullAddress: '',
  gpsLat: '',
  gpsLng: '',
  businessLicenseUrl: '',
  taxCertUrl: '',
  otherCertsJson: '',
  applyUsername: '',
  applyPassword: '',
  confirmPassword: '',
  contactName: '',
  contactMobile: '',
  contactEmail: ''
})

// 密码强度验证
const validatePasswordStrength = (rule, value, callback) => {
  if (!value && isEdit.value) {
    callback()
    return
  }
  if (!value) {
    callback(new Error(t('orgRegistration.rules.applyPasswordRequired')))
    return
  }
  if (value.length < 8) {
    callback(new Error(t('orgRegistration.rules.passwordMinLength')))
    return
  }
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    callback(new Error(t('orgRegistration.rules.passwordStrength')))
    return
  }
  callback()
}

// 密码确认验证
const validateConfirmPassword = (rule, value, callback) => {
  if (!isEdit.value && formData.applyPassword && value !== formData.applyPassword) {
    callback(new Error(t('orgRegistration.rules.passwordMismatch')))
  } else {
    callback()
  }
}

// 表单验证规则
const rules = reactive({
  orgType: [{ required: true, message: t('orgRegistration.rules.orgTypeRequired'), trigger: 'change' }],
  orgName: [{ required: true, message: t('orgRegistration.rules.orgNameRequired'), trigger: 'blur' }],
  licenseNumber: [{ required: true, message: t('orgRegistration.rules.licenseNumberRequired'), trigger: 'blur' }],
  licenseStart: [{ required: true, message: t('orgRegistration.rules.licenseStartRequired'), trigger: 'change' }],
  licenseEnd: [{ required: true, message: t('orgRegistration.rules.licenseEndRequired'), trigger: 'change' }],
  cropTypes: [{ required: true, message: t('research.variety.cropType'), trigger: 'change' }],
  regionCode: [{ required: true, message: t('orgRegistration.rules.regionCodeRequired'), trigger: 'change' }],
  applyUsername: [{ required: !isEdit.value, message: t('orgRegistration.rules.applyUsernameRequired'), trigger: 'blur' }],
  applyPassword: [
    { required: !isEdit.value, message: t('orgRegistration.rules.applyPasswordRequired'), trigger: 'blur' },
    { min: 8, message: t('orgRegistration.rules.passwordMinLength'), trigger: 'blur' },
    { validator: validatePasswordStrength, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: !isEdit.value, message: t('orgRegistration.rules.confirmPasswordRequired'), trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
})

// 加载行政区划树
const loadRegionTree = async () => {
  regionTreeLoading.value = true
  try {
    const res = await getRegionTree()
    if (res.code === 200 && res.data) {
      regionTreeOptions.value = res.data
    }
  } catch (error) {
    console.error('Failed to load region tree:', error)
  } finally {
    regionTreeLoading.value = false
  }
}

// 处理区域选择变化
const handleRegionChange = (value) => {
  if (value) {
    const { regionCode, regionName } = buildRegionPath(regionTreeOptions.value, value)
    formData.regionCode = regionCode
    formData.regionName = regionName
  } else {
    formData.regionCode = ''
    formData.regionName = ''
  }
}

// 上传前验证
const beforeUpload = (file) => {
  const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
  const isLt2M = file.size / 1024 / 1024 < 5

  if (!isValidType) {
    ElMessage.error(t('orgRegistration.uploadTip'))
    return false
  }
  if (!isLt2M) {
    ElMessage.error(t('orgRegistration.uploadSizeLimit'))
    return false
  }
  return true
}

// 上传错误处理
const handleUploadError = (error) => {
  console.error('Upload failed:', error)
  ElMessage.error(error?.message || t('common.uploadFailed'))
}

// 营业执照上传处理
const handleBusinessLicenseUpload = async (options) => {
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

// 营业执照上传成功
const handleBusinessLicenseSuccess = async (response) => {
  if (response.code === 200 && response.data) {
    formData.businessLicenseUrl = response.data.id
    try {
      const previewRes = await getFilePreviewUrl(response.data.id)
      const previewUrl = previewRes.code === 200 ? previewRes.msg : ''
      businessLicenseFileList.value = [{
        name: response.data.originalFileName || 'license',
        url: previewUrl,
        uid: response.data.id
      }]
    } catch (error) {
      console.error('Get preview URL failed:', error)
    }
    ElMessage.success(t('common.uploadSuccess'))
  }
}

// 税务证上传处理
const handleTaxCertUpload = async (options) => {
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

// 税务证上传成功
const handleTaxCertSuccess = async (response) => {
  if (response.code === 200 && response.data) {
    formData.taxCertUrl = response.data.id
    try {
      const previewRes = await getFilePreviewUrl(response.data.id)
      const previewUrl = previewRes.code === 200 ? previewRes.msg : ''
      taxCertFileList.value = [{
        name: response.data.originalFileName || 'tax_cert',
        url: previewUrl,
        uid: response.data.id
      }]
    } catch (error) {
      console.error('Get preview URL failed:', error)
    }
    ElMessage.success(t('common.uploadSuccess'))
  }
}

// 检查用户名唯一性
const checkUsername = async () => {
  if (!formData.applyUsername || isEdit.value) {
    usernameCheckResult.value = null
    return
  }
  try {
    const res = await checkUsernameUnique(formData.applyUsername, formData.id)
    if (res.code === 200) {
      usernameCheckResult.value = res.data
      if (!res.data) {
        ElMessage.warning(t('orgRegistration.messages.usernameUnavailable'))
      }
    }
  } catch (error) {
    console.error('Check username failed:', error)
  }
}

// 加载详情
const loadData = async () => {
  const id = route.params.id
  if (!id) return

  try {
    const res = await getRegistrationDetail(id)
    if (res.code === 200 && res.data) {
      const { baseInfo } = res.data
      Object.assign(formData, baseInfo)

      if (baseInfo.cropTypes) {
        cropTypesArray.value = baseInfo.cropTypes.split(',').filter(Boolean)
      }

      if (baseInfo.businessLicenseUrl) {
        try {
          const previewRes = await getFilePreviewUrl(baseInfo.businessLicenseUrl)
          const previewUrl = previewRes.code === 200 ? previewRes.msg : ''
          businessLicenseFileList.value = [{
            name: 'Business License',
            url: previewUrl,
            uid: baseInfo.businessLicenseUrl
          }]
        } catch (error) {
          console.error('Failed to load business license preview:', error)
        }
      }

      if (baseInfo.taxCertUrl) {
        try {
          const previewRes = await getFilePreviewUrl(baseInfo.taxCertUrl)
          const previewUrl = previewRes.code === 200 ? previewRes.msg : ''
          taxCertFileList.value = [{
            name: 'Tax Certificate',
            url: previewUrl,
            uid: baseInfo.taxCertUrl
          }]
        } catch (error) {
          console.error('Failed to load tax cert preview:', error)
        }
      }
    }
  } catch (error) {
    console.error('Load data failed:', error)
    ElMessage.error(t('orgRegistration.messages.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    if (usernameCheckResult.value === false) {
      ElMessage.warning(t('orgRegistration.rules.usernameExists'))
      return
    }

    submitting.value = true
    const submitData = { ...formData }
    delete submitData.confirmPassword
    if (isEdit.value) {
      delete submitData.applyPassword
    }

    const res = await submitRegistration(submitData)
    if (res.code === 200) {
      ElMessage.success(t('orgRegistration.messages.submitSuccess'))
      router.back()
    } else {
      ElMessage.error(res.msg || t('orgRegistration.messages.submitFailed'))
    }
  } catch (error) {
    console.error('Submit failed:', error)
    ElMessage.error(t('orgRegistration.messages.submitFailed'))
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadRegionTree()
  if (isEdit.value) {
    loadData()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

// .registration-form {
//   // max-width: 1200px;
//   margin: 0 auto;
// }

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}

.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
  line-height: 1.4;
}
</style>
