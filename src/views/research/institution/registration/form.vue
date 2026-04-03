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
                  <el-select
                    v-model="formData.orgName"
                    :placeholder="$t('orgRegistration.placeholder.orgName')"
                    filterable
                    clearable
                    style="width: 100%"
                    :disabled="!formData.orgType"
                    @change="handleOrgNameChange">
                    <el-option
                      v-for="org in orgNameOptions"
                      :key="org.id"
                      :label="org.orgName"
                      :value="org.orgName" />
                  </el-select>
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
                      multiple v-loading="cropTypeLoading">
                      <el-option v-for="item in cropTypeOptions" :key="item.value" :label="item.label"
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
                  <div class="location-field-group">
                    <el-input 
                      v-model="locationDisplay" 
                      :placeholder="$t('orgRegistration.placeholder.gpsLat')" 
                      readonly 
                    />
                    <el-button type="primary" @click="openLocationDialog">
                      <i class="ri-map-pin-add-line"></i>
                      {{ $t('input.inventory.warehouseManage.map.selectLocation') }}
                    </el-button>
                  </div>
                  <div class="location-inline-tip">{{ $t('input.inventory.warehouseManage.map.selectedTip') }}</div>
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

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">
              {{ $t('common.submit') }}
            </el-button>
          </div>
        </el-form>

        <el-dialog
          v-model="locationDialogVisible"
          :title="$t('input.inventory.warehouseManage.map.dialogTitle')"
          width="860px"
          destroy-on-close
          append-to-body
          class="location-dialog"
          @opened="handleLocationDialogOpened">
          <div class="location-dialog-body">
            <div ref="mapContainerRef" class="location-map"></div>
            <div class="location-map-tip">
              <i class="ri-map-pin-line"></i>
              <span>{{ $t('input.inventory.warehouseManage.map.tip') }}</span>
            </div>

            <div class="location-result">
              <div class="location-result-label">{{ $t('input.inventory.warehouseManage.map.selectedLocation') }}</div>
              <el-input
                v-model="tempLocationValue"
                readonly
                :placeholder="$t('orgRegistration.placeholder.gpsLat')"
              />
            </div>
          </div>

          <template #footer>
            <div class="dialog-footer">
              <el-button @click="locationDialogVisible = false">{{ $t('common.cancel') }}</el-button>
              <el-button type="primary" @click="confirmLocationSelection">{{ $t('common.confirm') }}</el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  submitRegistration,
  getRegistrationDetail,
  getRegionTree,
  buildRegionPath
} from '@/api/breedingOrgRegistration'
import { uploadFile, getFilePreviewUrl } from '@/api/file'
import { getOrganizationList } from '@/api/organization'
import { PageHeader, InfoCard } from '@/components/common'
import { loadSeedCropTypeOptions, resolveCropTypeValue, resolveCropTypeLabel } from '@/utils/researchCropType'

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
const cropTypeOptions = ref([])
const cropTypeLoading = ref(false)

// 行政区划树
const regionTreeOptions = ref([])
const regionTreeLoading = ref(false)

// 组织名称下拉选择
const orgNameOptions = ref([])
const orgNameLoading = ref(false)

// 地图相关
const mapContainerRef = ref(null)
const mapInstance = ref(null)
const mapMarker = ref(null)
const locationDialogVisible = ref(false)
const tempLocationValue = ref('')
const tempLocationPosition = ref(null)
const locationDisplay = ref('')

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'
const ETHIOPIA_CENTER = { lat: 9.145, lng: 40.489673 }
const ETHIOPIA_ZOOM = 6

// 种子/作物类型数组（用于多选）
const cropTypesArray = ref([])

// 文件上传相关
const businessLicenseFileList = ref([])
const taxCertFileList = ref([])

// 监听 cropTypesArray 变化，同步到 formData.cropTypes
watch(cropTypesArray, (val) => {
  formData.cropTypes = val
    .map(item => resolveCropTypeLabel(cropTypeOptions.value, item))
    .filter(Boolean)
    .join(',')
})

const normalizeCropTypes = (cropTypes) => {
  if (!cropTypes) return []
  return String(cropTypes)
    .split(',')
    .map(item => resolveCropTypeValue(cropTypeOptions.value, item.trim()))
    .filter(Boolean)
}

const loadCropTypeOptions = async () => {
  cropTypeLoading.value = true
  try {
    cropTypeOptions.value = await loadSeedCropTypeOptions('en-US')
  } catch (error) {
    console.error('Failed to load crop type options:', error)
    cropTypeOptions.value = []
  } finally {
    cropTypeLoading.value = false
  }
}

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

// 表单验证规则
const rules = reactive({
  orgType: [{ required: true, message: t('orgRegistration.rules.orgTypeRequired'), trigger: 'change' }],
  orgName: [{ required: true, message: t('orgRegistration.rules.orgNameRequired'), trigger: 'change' }],
  licenseNumber: [{ required: true, message: t('orgRegistration.rules.licenseNumberRequired'), trigger: 'blur' }],
  licenseStart: [{ required: true, message: t('orgRegistration.rules.licenseStartRequired'), trigger: 'change' }],
  licenseEnd: [{ required: true, message: t('orgRegistration.rules.licenseEndRequired'), trigger: 'change' }],
  cropTypes: [{ required: true, message: t('research.variety.cropType'), trigger: 'change' }],
  regionCode: [{ required: true, message: t('orgRegistration.rules.regionCodeRequired'), trigger: 'change' }]
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

// 组织类型映射
const orgTypeMap = {
  'UNION': '1',
  'COOPERATIVE': '2',
  'PRIVATE': '3'
}

// 加载组织名称列表
const loadOrgNameOptions = async (orgType) => {
  if (!orgType) {
    orgNameOptions.value = []
    return
  }
  orgNameLoading.value = true
  try {
    const mappedOrgType = orgTypeMap[orgType] || orgType
    const res = await getOrganizationList({ orgCategory: mappedOrgType, status: '0', pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      orgNameOptions.value = res.rows || res.data?.records || []
    }
  } catch (error) {
    console.error('Failed to load organization list:', error)
    orgNameOptions.value = []
  } finally {
    orgNameLoading.value = false
  }
}

// 监听 orgType 变化，加载对应的组织列表
watch(() => formData.orgType, (newVal) => {
  formData.orgName = ''
  loadOrgNameOptions(newVal)
})

// 组织名称选择变更
const handleOrgNameChange = (value) => {
  const selected = orgNameOptions.value.find(org => org.orgName === value)
  if (selected) {
    formData.orgName = selected.orgName
  }
}

// 地图相关函数
const formatLocationValue = (lat, lng) => `${Number(lat).toFixed(6)},${Number(lng).toFixed(6)}`

const parseLocationValue = (value) => {
  if (!value || typeof value !== 'string') return null
  const [latStr, lngStr] = value.split(',').map(item => item?.trim())
  const lat = Number(latStr)
  const lng = Number(lngStr)
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null
  return { lat, lng }
}

const updateMapMarker = (position, shouldPan = true) => {
  if (!mapInstance.value || !window.google?.maps) return

  if (!mapMarker.value) {
    mapMarker.value = new window.google.maps.Marker({
      map: mapInstance.value,
      position
    })
  } else {
    mapMarker.value.setPosition(position)
  }

  if (shouldPan) {
    mapInstance.value.panTo(position)
  }
}

const syncLocationFromMap = (latLng) => {
  const lat = typeof latLng.lat === 'function' ? latLng.lat() : latLng.lat
  const lng = typeof latLng.lng === 'function' ? latLng.lng() : latLng.lng
  tempLocationValue.value = formatLocationValue(lat, lng)
  tempLocationPosition.value = { lat, lng }
  updateMapMarker({ lat, lng })
}

const initGoogleMap = async () => {
  await nextTick()
  if (!mapContainerRef.value || !window.google?.maps) return

  const savedLocation = tempLocationPosition.value || parseLocationValue(tempLocationValue.value) || parseLocationValue(formData.gpsLat)
  const center = savedLocation ? { lat: savedLocation.lat, lng: savedLocation.lng } : ETHIOPIA_CENTER
  const zoom = savedLocation ? 12 : ETHIOPIA_ZOOM

  mapInstance.value = new window.google.maps.Map(mapContainerRef.value, {
    center,
    zoom,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  })

  mapInstance.value.addListener('click', (event) => {
    syncLocationFromMap(event.latLng)
  })

  if (savedLocation) {
    updateMapMarker({ lat: savedLocation.lat, lng: savedLocation.lng }, false)
  }
}

const loadGoogleMapsScript = () => new Promise((resolve, reject) => {
  if (!GOOGLE_MAPS_API_KEY) {
    reject(new Error('Google Maps API key is not configured'))
    return
  }

  if (window.google?.maps) {
    resolve(window.google.maps)
    return
  }

  const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID)
  if (existingScript) {
    existingScript.addEventListener('load', () => resolve(window.google?.maps), { once: true })
    existingScript.addEventListener('error', reject, { once: true })
    return
  }

  const script = document.createElement('script')
  script.id = GOOGLE_MAPS_SCRIPT_ID
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`
  script.async = true
  script.defer = true
  script.onload = () => resolve(window.google?.maps)
  script.onerror = reject
  document.head.appendChild(script)
})

const setupLocationMap = async () => {
  try {
    await loadGoogleMapsScript()
    await initGoogleMap()
  } catch (error) {
    console.error('Failed to initialize Google Map:', error)
    const messageKey = error?.message === 'Google Maps API key is not configured'
      ? 'input.inventory.warehouseManage.map.missingKey'
      : 'input.inventory.warehouseManage.map.loadFailed'
    ElMessage.error(t(messageKey))
  }
}

const openLocationDialog = () => {
  const savedLocation = parseLocationValue(formData.gpsLat)
  tempLocationValue.value = formData.gpsLat || ''
  tempLocationPosition.value = savedLocation
  locationDialogVisible.value = true
}

const handleLocationDialogOpened = async () => {
  mapMarker.value = null
  mapInstance.value = null
  await setupLocationMap()
}

const confirmLocationSelection = () => {
  if (!tempLocationValue.value) {
    ElMessage.warning(t('input.inventory.warehouseManage.rules.locationRequired'))
    return
  }
  const parsed = parseLocationValue(tempLocationValue.value)
  if (parsed) {
    formData.gpsLat = String(parsed.lat)
    formData.gpsLng = String(parsed.lng)
    locationDisplay.value = tempLocationValue.value
  }
  locationDialogVisible.value = false
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
        cropTypesArray.value = normalizeCropTypes(baseInfo.cropTypes)
      }

      if (baseInfo.gpsLat && baseInfo.gpsLng) {
        locationDisplay.value = formatLocationValue(baseInfo.gpsLat, baseInfo.gpsLng)
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

      if (baseInfo.orgType) {
        await loadOrgNameOptions(baseInfo.orgType)
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
onMounted(async () => {
  await loadCropTypeOptions()
  loadRegionTree()
  if (isEdit.value) {
    loadData()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

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

.location-field-group {
  display: flex;
  gap: 8px;
  width: 100%;
}

.location-field-group .el-input {
  flex: 1;
}

.location-inline-tip {
  margin-top: 8px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.location-dialog-body {
  padding-top: 4px;
}

.location-map {
  width: 100%;
  height: 420px;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(135deg, #f3f7f2 0%, #eef5eb 100%);
}

.location-map-tip {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.location-result {
  margin-top: 16px;
}

.location-result-label {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

:deep(.location-dialog .el-dialog) {
  max-width: calc(100vw - 32px);
}

@media screen and (max-width: 768px) {
  .location-field-group {
    flex-direction: column;
  }

  .location-map {
    height: 320px;
  }
}
</style>
