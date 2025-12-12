<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-file-edit-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('registration.application.edit') : $t('registration.application.add') }}</h1>
            <p class="page-subtitle">{{ $t('registration.application.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="200px" label-position="top">
          <!-- 基础信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('registration.application.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.enterpriseName')" prop="enterpriseName">
                    <el-input
                      v-model="formData.enterpriseName"
                      :placeholder="$t('registration.application.placeholder.enterpriseName')"
                      maxlength="200"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.orgType')" prop="orgType">
                    <el-select v-model="formData.orgType" :placeholder="$t('registration.application.placeholder.orgType')" class="w-full">
                      <el-option value="union" :label="$t('registration.application.orgType.union')"></el-option>
                      <el-option value="cooperative" :label="$t('registration.application.orgType.cooperative')"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.enterpriseType')" prop="enterpriseType">
                    <el-input
                      v-model="formData.enterpriseType"
                      :placeholder="$t('registration.application.placeholder.enterpriseType')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.enterpriseRegistrationId')" prop="enterpriseRegistrationId">
                    <el-input
                      v-model="formData.enterpriseRegistrationId"
                      :placeholder="$t('registration.application.placeholder.enterpriseRegistrationId')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.unifiedSocialCreditCode')" prop="unifiedSocialCreditCode">
                    <el-input
                      v-model="formData.unifiedSocialCreditCode"
                      :placeholder="$t('registration.application.placeholder.unifiedSocialCreditCode')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.seedEnterpriseLicenseNumber')" prop="seedEnterpriseLicenseNumber">
                    <el-input
                      v-model="formData.seedEnterpriseLicenseNumber"
                      :placeholder="$t('registration.application.placeholder.seedEnterpriseLicenseNumber')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.licenseValidityStart')" prop="licenseValidityStart">
                    <el-date-picker
                      v-model="formData.licenseValidityStart"
                      type="date"
                      :placeholder="$t('registration.application.placeholder.licenseValidityStart')"
                      value-format="YYYY-MM-DD"
                      class="w-full"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.licenseValidityEnd')" prop="licenseValidityEnd">
                    <el-date-picker
                      v-model="formData.licenseValidityEnd"
                      type="date"
                      :placeholder="$t('registration.application.placeholder.licenseValidityEnd')"
                      value-format="YYYY-MM-DD"
                      class="w-full"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.inputTypes')" prop="inputTypes">
                    <el-select
                      v-model="formData.inputTypes"
                      multiple
                      :placeholder="$t('registration.application.placeholder.inputTypes')"
                      class="w-full"
                    >
                      <el-option value="seed" :label="$t('registration.application.inputType.seed')"></el-option>
                      <el-option value="fertilizer" :label="$t('registration.application.inputType.fertilizer')"></el-option>
                      <el-option value="pesticide" :label="$t('registration.application.inputType.pesticide')"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.salesRegions')" prop="salesRegions">
                    <el-input
                      v-model="formData.salesRegions"
                      :placeholder="$t('registration.application.placeholder.salesRegions')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('registration.application.form.remark')" prop="remark">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="3"
                      :placeholder="$t('registration.application.placeholder.remark')"
                      maxlength="500"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 位置运营信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('registration.application.form.locationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.region')" prop="location.region">
                    <el-input
                      v-model="formData.location.region"
                      :placeholder="$t('registration.application.placeholder.region')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.zone')" prop="location.zone">
                    <el-input
                      v-model="formData.location.zone"
                      :placeholder="$t('registration.application.placeholder.zone')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.woreda')" prop="location.woreda">
                    <el-input
                      v-model="formData.location.woreda"
                      :placeholder="$t('registration.application.placeholder.woreda')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.kebele')" prop="location.kebele">
                    <el-input
                      v-model="formData.location.kebele"
                      :placeholder="$t('registration.application.placeholder.kebele')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.gpsLatitude')" prop="location.gpsLatitude">
                    <el-input
                      v-model="formData.location.gpsLatitude"
                      :placeholder="$t('registration.application.placeholder.gpsLatitude')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12" :lg="8">
                  <el-form-item :label="$t('registration.application.form.gpsLongitude')" prop="location.gpsLongitude">
                    <el-input
                      v-model="formData.location.gpsLongitude"
                      :placeholder="$t('registration.application.placeholder.gpsLongitude')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('registration.application.form.fullAddress')" prop="location.fullAddress">
                    <el-input
                      v-model="formData.location.fullAddress"
                      type="textarea"
                      :rows="2"
                      :placeholder="$t('registration.application.placeholder.fullAddress')"
                      maxlength="500"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('registration.application.form.businessScope')" prop="location.businessScope">
                    <el-input
                      v-model="formData.location.businessScope"
                      type="textarea"
                      :rows="2"
                      :placeholder="$t('registration.application.placeholder.businessScope')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('registration.application.form.annualProductionCapacity')" prop="location.annualProductionCapacity">
                    <el-input
                      v-model="formData.location.annualProductionCapacity"
                      type="number"
                      :placeholder="$t('registration.application.placeholder.annualProductionCapacity')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 许可证件信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-list-2-line"></i>
                <span>{{ $t('registration.application.form.licenseInfo') }}</span>
              </div>
              <el-button type="primary" @click="handleAddLicense">
                <i class="ri-add-line"></i>
                {{ $t('registration.application.form.addLicense') }}
              </el-button>
            </div>
            <div class="card-body">
              <div v-for="(license, index) in formData.licenses" :key="index" class="license-item">
                <div class="license-header">
                  <span class="license-title">{{ $t('registration.application.form.licenses') }} {{ index + 1 }}</span>
                  <el-button type="danger" link @click="handleRemoveLicense(index)">
                    <i class="ri-delete-bin-line"></i>
                    {{ $t('registration.application.form.removeLicense') }}
                  </el-button>
                </div>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item :label="$t('registration.application.form.licenseType')" :prop="`licenses.${index}.licenseType`" :rules="rules.licenseType">
                      <el-select v-model="license.licenseType" :placeholder="$t('registration.application.placeholder.licenseType')" class="w-full">
                        <el-option value="business_license" :label="$t('registration.application.licenseType.businessLicense')"></el-option>
                        <el-option value="seed_license" :label="$t('registration.application.licenseType.seedLicense')"></el-option>
                        <el-option value="tax_certificate" :label="$t('registration.application.licenseType.taxCertificate')"></el-option>
                        <el-option value="factory_permit" :label="$t('registration.application.licenseType.factoryPermit')"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item :label="$t('registration.application.form.licenseNumber')" :prop="`licenses.${index}.licenseNumber`">
                      <el-input
                        v-model="license.licenseNumber"
                        :placeholder="$t('registration.application.placeholder.licenseNumber')"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item :label="$t('registration.application.form.issueDate')" :prop="`licenses.${index}.issueDate`">
                      <el-date-picker
                        v-model="license.issueDate"
                        type="date"
                        :placeholder="$t('registration.application.placeholder.issueDate')"
                        value-format="YYYY-MM-DD"
                        class="w-full"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24" :sm="12" :lg="6">
                    <el-form-item :label="$t('registration.application.form.expiryDate')" :prop="`licenses.${index}.expiryDate`">
                      <el-date-picker
                        v-model="license.expiryDate"
                        type="date"
                        :placeholder="$t('registration.application.placeholder.expiryDate')"
                        value-format="YYYY-MM-DD"
                        class="w-full"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :xs="24">
                    <el-form-item :label="$t('registration.application.form.licenseFile')" :prop="`licenses.${index}.licenseFileUrl`" >
                      <el-upload
                        :http-request="(options) => handleUploadFile(options, index)"
                        :on-remove="() => handleRemoveFile(index)"
                        :file-list="license.fileList || []"
                        list-type="picture-card"
                        :limit="1"
                        accept="image/jpeg,image/png,application/pdf"
                      >
                        <i class="ri-upload-cloud-line"></i>
                        <div class="upload-text">{{ $t('common.upload') }}</div>
                      </el-upload>
                      <div class="upload-tip">{{ $t('registration.application.messages.uploadTip') }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <el-empty v-if="formData.licenses.length === 0" :description="$t('registration.application.messages.noData')" />
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleCancel">
              <i class="ri-close-line"></i>
              {{ $t('common.cancel') }}
            </el-button>
            <el-button type="primary" :loading="saving" @click="handleSave">
              <i class="ri-save-line"></i>
              {{ $t('common.save') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addRegistration, updateRegistration, getRegistrationDetail } from '@/api/registration'
import { uploadFile } from '@/api/file'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const saving = ref(false)

const isEdit = computed(() => !!route.params.id)

// 表单数据
const formData = reactive({
  id: null,
  version: 1,
  enterpriseName: '',
  enterpriseRegistrationId: '',
  unifiedSocialCreditCode: '',
  seedEnterpriseLicenseNumber: '',
  licenseValidityStart: '',
  licenseValidityEnd: '',
  enterpriseType: '',
  orgType: '',
  inputTypes: [],
  salesRegions: '',
  remark: '',
  location: {
    region: '',
    zone: '',
    woreda: '',
    kebele: '',
    fullAddress: '',
    gpsLatitude: '',
    gpsLongitude: '',
    businessScope: '',
    annualProductionCapacity: ''
  },
  licenses: []
})

// 表单验证规则
const rules = {
  enterpriseName: [
    { required: true, message: t('registration.application.rules.enterpriseNameRequired'), trigger: 'blur' },
    { min: 2, max: 200, message: t('registration.application.rules.enterpriseNameLength'), trigger: 'blur' }
  ],
  orgType: [
    { required: true, message: t('registration.application.rules.orgTypeRequired'), trigger: 'change' }
  ],
  enterpriseType: [
    { required: true, message: t('registration.application.rules.enterpriseTypeRequired'), trigger: 'blur' }
  ],
  seedEnterpriseLicenseNumber: [
    { required: true, message: t('registration.application.rules.seedEnterpriseLicenseNumberRequired'), trigger: 'blur' }
  ],
  licenseValidityStart: [
    { required: true, message: t('registration.application.rules.licenseValidityStartRequired'), trigger: 'change' }
  ],
  licenseValidityEnd: [
    { required: true, message: t('registration.application.rules.licenseValidityEndRequired'), trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value && formData.licenseValidityStart && new Date(value) < new Date(formData.licenseValidityStart)) {
          callback(new Error(t('registration.application.rules.licenseValidityInvalid')))
        } else if (value && new Date(value) < new Date()) {
          callback(new Error(t('registration.application.rules.licenseExpired')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  inputTypes: [
    { required: true, message: t('registration.application.rules.inputTypesRequired'), trigger: 'change' }
  ],
  salesRegions: [
    { required: true, message: t('registration.application.rules.salesRegionsRequired'), trigger: 'blur' }
  ],
  'location.woreda': [
    { required: true, message: t('registration.application.rules.woredaRequired'), trigger: 'blur' }
  ],
  'location.kebele': [
    { required: true, message: t('registration.application.rules.kebeleRequired'), trigger: 'blur' }
  ],
  'location.fullAddress': [
    { required: true, message: t('registration.application.rules.fullAddressRequired'), trigger: 'blur' },
    { min: 5, max: 500, message: t('registration.application.rules.fullAddressLength'), trigger: 'blur' }
  ],
  'location.gpsLatitude': [
    {
      validator: (rule, value, callback) => {
        if (value && (isNaN(value) || value < -90 || value > 90)) {
          callback(new Error(t('registration.application.rules.gpsLatitudeInvalid')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  'location.gpsLongitude': [
    {
      validator: (rule, value, callback) => {
        if (value && (isNaN(value) || value < -180 || value > 180)) {
          callback(new Error(t('registration.application.rules.gpsLongitudeInvalid')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  licenseType: [
    { required: true, message: t('registration.application.rules.licenseTypeRequired'), trigger: 'change' }
  ],
  licenseFileUrl: [
    { required: true, message: t('registration.application.rules.licenseFileRequired'), trigger: 'change' }
  ]
}

// 添加许可证件
const handleAddLicense = () => {
  formData.licenses.push({
    licenseType: '',
    licenseNumber: '',
    licenseFileUrl: '',
    licenseFileName: '',
    issueDate: '',
    expiryDate: '',
    fileList: []
  })
}

// 移除许可证件
const handleRemoveLicense = (index) => {
  formData.licenses.splice(index, 1)
}

// 自定义文件上传处理
const handleUploadFile = async (options, index) => {
  const { file, onSuccess, onError } = options

  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    ElMessage.error(t('common.uploadSizeError'))
    onError && onError(new Error('File size exceeds 5MB'))
    return
  }

  try {
    // 直接传递文件对象，uploadFile函数内部会创建FormData
    const res = await uploadFile(file)
    if (res.code === 200) {
      const fileData = res.data
      const dataId = fileData.id || fileData.dataId

      // 构建预览URL用于显示图片 - 使用完整的URL路径
      const baseUrl = import.meta.env.VITE_APP_AGRICULTURE_API_URL || ''
      const previewUrl = `${baseUrl}/doc/preview/${dataId}`

      // 更新文件列表用于显示
      // 使用 URL.createObjectURL 创建本地预览
      const localPreviewUrl = URL.createObjectURL(file)

      const fileObj = {
        name: file.name,
        uid: file.uid,
        fileId: dataId,
        dataId: dataId,
        url: localPreviewUrl,  // 使用本地预览URL以立即显示
        serverUrl: previewUrl   // 保存服务器URL供后续使用
      }
      formData.licenses[index].fileList = [fileObj]

      // 存储文件ID到表单数据
      formData.licenses[index].licenseFileUrl = dataId
      formData.licenses[index].licenseFileName = file.name

      ElMessage.success(t('common.uploadSuccess'))
      onSuccess && onSuccess(res)
    } else {
      ElMessage.error(res.msg || t('common.uploadFailed'))
      onError && onError(new Error(res.msg || 'Upload failed'))
    }
  } catch (error) {
    console.error('File upload failed:', error)
    ElMessage.error(t('common.uploadFailed'))
    onError && onError(error)
  }
}

// 文件移除处理
const handleRemoveFile = (index) => {
  // 释放本地预览URL内存
  const fileList = formData.licenses[index].fileList
  if (fileList && fileList.length > 0 && fileList[0].url) {
    URL.revokeObjectURL(fileList[0].url)
  }

  formData.licenses[index].licenseFileUrl = ''
  formData.licenses[index].licenseFileName = ''
  formData.licenses[index].fileList = []
}

// 加载详情
const loadDetail = async () => {
  try {
    const res = await getRegistrationDetail(route.params.id)
    if (res.code === 200 && res.data) {
      const data = res.data
      console.log(data.inputTypes)
      // 基础信息
      formData.id = data.id
      formData.version = data.version
      formData.enterpriseName = data.enterpriseName
      formData.enterpriseRegistrationId = data.enterpriseRegistrationId
      formData.unifiedSocialCreditCode = data.unifiedSocialCreditCode
      formData.seedEnterpriseLicenseNumber = data.seedEnterpriseLicenseNumber
      formData.licenseValidityStart = data.licenseValidityStart
      formData.licenseValidityEnd = data.licenseValidityEnd
      formData.enterpriseType = data.enterpriseType
      formData.orgType = data.orgType
      formData.inputTypes = data.inputTypes
      formData.salesRegions = data.salesRegions
      formData.remark = data.remark

      // 位置信息
      if (data.location) {
        formData.location = { ...data.location }
      }

      // 许可证件
      if (data.licenses && data.licenses.length > 0) {
        // 使用Promise.all并行加载所有许可证件的文件
        const { downloadFile } = await import('@/api/file')

        const licensePromises = data.licenses.map(async (license) => {
          if (!license.licenseFileUrl) {
            return { ...license, fileList: [] }
          }

          try {
            // 通过下载接口获取文件数据
            console.log('正在加载许可证文件:', license.licenseFileUrl)
            const response = await downloadFile(license.licenseFileUrl)
            console.log('文件下载响应:', response)

            // 判断文件类型，创建对应的blob
            const contentType = response.headers?.['content-type'] || 'image/jpeg'
            const blob = new Blob([response.data], { type: contentType })
            const blobUrl = URL.createObjectURL(blob)

            console.log('创建的 Blob URL:', blobUrl, 'Content-Type:', contentType)

            return {
              ...license,
              fileList: [{
                name: license.licenseFileName || 'file',
                url: blobUrl,
                uid: license.licenseFileUrl,
                fileId: license.licenseFileUrl,
                status: 'success'
              }]
            }
          } catch (error) {
            console.error('加载许可证文件失败:', license.licenseFileUrl, error)
            ElMessage.warning(`文件 ${license.licenseFileName || license.licenseFileUrl} 加载失败`)
            // 如果下载失败，返回空文件列表
            return {
              ...license,
              fileList: []
            }
          }
        })

        formData.licenses = await Promise.all(licensePromises)
      }
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

// 保存
const handleSave = async () => {
  try {
    const valid = await formRef.value.validate()
    if (!valid) return

    // 验证至少有一个许可证件
    if (formData.licenses.length === 0) {
      ElMessage.error(t('registration.application.rules.licenseItemsRequired'))
      return
    }

    saving.value = true

    // 准备提交数据
    const submitData = {
      ...formData,
      inputTypes: formData.inputTypes.join(','),
      location: {
        ...formData.location,
        gpsLatitude: formData.location.gpsLatitude ? parseFloat(formData.location.gpsLatitude) : null,
        gpsLongitude: formData.location.gpsLongitude ? parseFloat(formData.location.gpsLongitude) : null,
        annualProductionCapacity: formData.location.annualProductionCapacity ? parseFloat(formData.location.annualProductionCapacity) : null
      },
      licenses: formData.licenses.map(({ fileList, licenseFileName, ...license }) => license)
    }

    const res = isEdit.value
      ? await updateRegistration(submitData)
      : await addRegistration(submitData)

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('registration.application.editSuccess') : t('registration.application.addSuccess'))
      router.push({ name: 'Registration' })
    } else {
      ElMessage.error(res.msg || t('common.saveFailed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Failed to save:', error)
      ElMessage.error(t('common.saveFailed'))
    }
  } finally {
    saving.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

// 初始化
onMounted(() => {
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
/* 页面容器 */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

/* 卡片 */
.info-card {
  background: white;
  border: 1px solid #e8f5e9;
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
}

.info-card:last-of-type {
  margin-bottom: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8f5e9;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

/* 许可证件 */
.license-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  background: #fafafa;
}

.license-item:last-child {
  margin-bottom: 0;
}

.license-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.license-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
}

/* 上传提示 */
.upload-text {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.upload-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

/* 工具类 */
.w-full {
  width: 100%;
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .content-wrapper {
    padding: 16px;
    border-radius: 12px;
  }

  .card-header {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .card-body {
    padding: 16px;
  }

  .license-item {
    padding: 16px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }

  :deep(.el-form-item__label) {
    font-size: 14px;
  }
}
</style>
