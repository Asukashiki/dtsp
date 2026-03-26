<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader icon="ri-home-gear-line" :title="pageTitle" shadow show-back @back="goBack" />

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" v-loading="submitLoading || optionLoading || dictLoading || regionTreeLoading || deptTreeLoading">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- 仓库编码 - 自动生成，只读 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.warehouseCode')" prop="warehouseCode">
                    <el-input 
                      v-model="formData.warehouseCode" 
                      disabled 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.warehouseCode')"
                    />
                  </el-form-item>
                </el-col>

                <!-- 仓库名称 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.warehouseName')" prop="warehouseName">
                    <el-input 
                      v-model="formData.warehouseName" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.warehouseName')" 
                      maxlength="100" 
                      clearable 
                    />
                  </el-form-item>
                </el-col>

                <!-- 仓库类型 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.type')" prop="type">
                    <el-select 
                      v-model="formData.type" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.type')" 
                      style="width: 100%"
                      @change="handleWarehouseTypeChange"
                    >
                      <el-option 
                        v-for="item in warehouseTypeOptions" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 存储类型 - 多选 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.storeType')" prop="storeType">
                    <el-select 
                      v-model="formData.storeType" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.storeType')" 
                      style="width: 100%"
                      multiple
                      collapse-tags
                    >
                      <el-option 
                        v-for="item in storeTypeOptions" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 行政层级 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.adminLevel')" prop="adminLevel">
                    <el-cascader
                      v-model="adminLevelPath"
                      :options="regionTreeOptions"
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.adminLevel')"
                      :props="adminLevelCascaderProps"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleAdminLevelChange"
                    />
                  </el-form-item>
                </el-col>

                <!-- 地址 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.address')">
                    <el-input 
                      v-model="formData.address" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.address')" 
                      maxlength="255" 
                      clearable 
                    />
                  </el-form-item>
                </el-col>

                <!-- 所属机构 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.orgName')" prop="orgName">
                    <el-select
                      v-model="selectedOrgId"
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.orgName')"
                      style="width: 100%"
                      clearable
                      :disabled="filteredOrgOptions.length === 0"
                      @change="handleOrgChange"
                    >
                      <el-option
                        v-for="item in filteredOrgOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 上级仓库 - 条件显示 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item 
                    :label="$t('input.inventory.warehouseManage.form.parentId')"
                    prop="parentId"
                    :rules="isUnionOrCoopWarehouse ? [{ required: true, message: $t('input.inventory.warehouseManage.rules.parentIdRequired'), trigger: 'change' }] : []"
                  >
                    <el-select 
                      v-model="formData.parentId" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.parentId')" 
                      :disabled="!selectedOrgId"
                      clearable 
                      filterable 
                      style="width: 100%"
                    >
                      <el-option 
                        v-for="item in filteredParentWarehouseOptions" 
                        :key="item.id" 
                        :label="`${item.warehouse_name} (${item.warehouse_code})`" 
                        :value="item.id" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 存储容量 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.capacity')" prop="capacity">
                    <div style="display: flex; gap: 8px; width: 100%;">
                      <el-input
                        v-model="capacityDisplay"
                        :placeholder="$t('input.inventory.warehouseManage.placeholder.capacity')"
                        type="number"
                        @input="handleCapacityInput"
                      />
                      <el-select v-model="capacityUnit" style="width: 120px" @change="handleCapacityUnitChange">
                        <el-option
                          v-for="item in capacityUnitOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                </el-col>

                <!-- 地理位置 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.location')" prop="location">
                    <div class="location-field-group">
                      <el-input 
                        v-model="formData.location" 
                        :placeholder="$t('input.inventory.warehouseManage.placeholder.location')" 
                        maxlength="200" 
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

                <!-- 认证资料 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.authenticationMaterial')" prop="authenticationMaterial">
                    <el-upload
                      class="doc-upload"
                      :http-request="handleUploadAuthenticationMaterial"
                      :file-list="authenticationMaterialFileList"
                      :on-remove="handleRemoveAuthenticationMaterial"
                      :on-preview="handlePreviewAuthenticationMaterial"
                      :limit="1"
                      accept=".pdf"
                    >
                      <el-button type="primary" link>
                        <i class="ri-upload-2-line"></i>
                        {{ $t('input.inventory.warehouseManage.placeholder.authenticationMaterial') }}
                      </el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>

                <!-- 备注 -->
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.remark')">
                    <el-input 
                      v-model="formData.remark" 
                      type="textarea" 
                      :rows="3" 
                      maxlength="500" 
                      show-word-limit 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.remark')" 
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{ $t('common.save') }}</el-button>
          </div>
        </el-form>

        <el-dialog
          v-model="locationDialogVisible"
          :title="$t('input.inventory.warehouseManage.map.dialogTitle')"
          width="860px"
          destroy-on-close
          append-to-body
          class="location-dialog"
          @opened="handleLocationDialogOpened"
        >
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
                :placeholder="$t('input.inventory.warehouseManage.placeholder.location')"
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
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addWarehouseManage, getWarehouseManage, listWarehouseManage, updateWarehouseManage, generateWarehouseCode } from '@/api/warehouseManage'
import { uploadFile } from '@/api/seed'
import { getFilePreviewUrl } from '@/api/file'
import { getRegionTree, buildRegionPath } from '@/api/orgRegistration'
import { deptTreeSelect } from '@/api/system/user'
import { useDict } from '@/hooks/useDict'
import { PageHeader } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()

// 使用字典 - 仓库类型和商品大类
const { options: dictOptions, loading: dictLoading } = useDict(['warehouse_type', 'inventory_main_category'])

const formRef = ref(null)
const submitLoading = ref(false)
const optionLoading = ref(false)
const regionTreeLoading = ref(false)
const deptTreeLoading = ref(false)
const parentWarehouseOptions = ref([])
const regionTreeOptions = ref([])
const adminLevelPath = ref(null)
const deptMap = ref({})
const selectedOrgId = ref('')
const authenticationMaterialFileList = ref([])
const mapContainerRef = ref(null)
const mapInstance = ref(null)
const mapMarker = ref(null)
const locationDialogVisible = ref(false)
const tempLocationValue = ref('')
const tempLocationPosition = ref(null)

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'
const ETHIOPIA_CENTER = { lat: 9.145, lng: 40.489673 }
const ETHIOPIA_ZOOM = 6

const isEdit = computed(() => route.path.includes('/edit/'))
const warehouseId = computed(() => route.params.id)
const pageTitle = computed(() => isEdit.value ? t('input.inventory.warehouseManage.edit') : t('input.inventory.warehouseManage.add'))

// 仓库类型选项从字典获取
const warehouseTypeOptions = computed(() => dictOptions.value.warehouse_type || [])

const storeTypeOptions = computed(() => (dictOptions.value.inventory_main_category || []).map(item => ({
  label: item.label,
  value: item.value
})))

const capacityUnitOptions = [
  { label: '吨', value: 'ton' },
  { label: '公担', value: 'quintal' }
]

const capacityUnitFactorMap = {
  ton: 1000,
  quintal: 100
}

const resolveI18nLabel = (label) => {
  try {
    if (!label) return ''
    if (typeof label === 'string' && label.startsWith('{')) {
      const names = JSON.parse(label)
      const lang = locale.value === 'zh-CN' ? 'zh_CN' : 'en_US'
      return names[lang] || names.zh_CN || label
    }
    return label
  } catch (error) {
    return label
  }
}

const processDeptTree = (nodes) => {
  if (!Array.isArray(nodes)) return []
  return nodes.map(node => ({
    ...node,
    label: resolveI18nLabel(node.label),
    children: processDeptTree(node.children || [])
  }))
}

const flattenDeptTree = (nodes) => {
  const map = {}
  const walk = (items) => {
    items.forEach(item => {
      map[item.id] = item
      if (item.children?.length) {
        walk(item.children)
      }
    })
  }
  walk(nodes)
  return map
}

const findRegionNode = (tree, targetValue) => {
  for (const node of tree) {
    if (node.value === targetValue || node.orgCode === targetValue || node.regionCode === targetValue) {
      return node
    }
    if (node.children?.length) {
      const found = findRegionNode(node.children, targetValue)
      if (found) return found
    }
  }
  return null
}

const filteredOrgOptions = computed(() => {
  if (!formData.adminLevel) return []
  const regionNode = findRegionNode(regionTreeOptions.value, formData.adminLevel)
  const regionOrgCode = regionNode?.orgCode
  if (!regionOrgCode) return []

  const deptNode = deptMap.value[regionOrgCode]
  return deptNode?.children || []
})

const filteredParentWarehouseOptions = computed(() => {
  if (!selectedOrgId.value) {
    return parentWarehouseOptions.value
  }

  const selectedOrg = deptMap.value[selectedOrgId.value]
  const parentOrgId = selectedOrg?.parentId
  if (!parentOrgId) {
    return parentWarehouseOptions.value
  }

  return parentWarehouseOptions.value.filter(item => item.org_id === parentOrgId)
})

const adminLevelCascaderProps = {
  checkStrictly: true,
  emitPath: false
}

// 是否为联盟或合作社仓库
const isUnionOrCoopWarehouse = computed(() => {
  return formData.type === 'LM' || formData.type === 'HZS' || formData.type === 'QY'
})

// 存储容量显示值
const capacityDisplay = ref('')
const capacityUnit = ref('ton')

// 处理存储容量输入
const handleCapacityInput = (value) => {
  const numValue = parseFloat(value)
  if (!isNaN(numValue)) {
    const factor = capacityUnitFactorMap[capacityUnit.value] || 1000
    formData.capacity = Math.round(numValue * factor * 100) / 100
    capacityDisplay.value = value
  } else {
    formData.capacity = null
    capacityDisplay.value = ''
  }
}

const syncCapacityDisplay = () => {
  if (formData.capacity === null || formData.capacity === undefined || formData.capacity === '') {
    capacityDisplay.value = ''
    return
  }

  const factor = capacityUnitFactorMap[capacityUnit.value] || 1000
  const displayValue = Number(formData.capacity) / factor
  capacityDisplay.value = Number.isInteger(displayValue) ? String(displayValue) : String(displayValue)
}

const handleCapacityUnitChange = () => {
  syncCapacityDisplay()
}

const formData = reactive({
  id: undefined,
  warehouseCode: '',
  warehouseName: '',
  type: '',
  storeType: [],
  orgId: '',
  orgName: '',
  adminLevel: '',
  parentId: undefined,
  location: '',
  capacity: null,
  address: '',
  authenticationMaterial: '',
  authenticationMaterialName: '',
  status: '0',
  remark: ''
})

const formatLocationValue = (lng, lat) => `${Number(lng).toFixed(6)},${Number(lat).toFixed(6)}`

const parseLocationValue = (value) => {
  if (!value || typeof value !== 'string') return null
  const [lngStr, latStr] = value.split(',').map(item => item?.trim())
  const lng = Number(lngStr)
  const lat = Number(latStr)
  if (Number.isNaN(lng) || Number.isNaN(lat)) return null
  return { lng, lat }
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
  tempLocationValue.value = formatLocationValue(lng, lat)
  tempLocationPosition.value = { lat, lng }
  updateMapMarker({ lat, lng })
}

const initGoogleMap = async () => {
  await nextTick()
  if (!mapContainerRef.value || !window.google?.maps) return

  const savedLocation = tempLocationPosition.value || parseLocationValue(tempLocationValue.value) || parseLocationValue(formData.location)
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
  const savedLocation = parseLocationValue(formData.location)
  tempLocationValue.value = formData.location || ''
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
  formData.location = tempLocationValue.value
  locationDialogVisible.value = false
}

const rules = computed(() => ({
  warehouseCode: [{ required: true, message: t('input.inventory.warehouseManage.rules.warehouseCodeRequired'), trigger: 'blur' }],
  warehouseName: [{ required: true, message: t('input.inventory.warehouseManage.rules.warehouseNameRequired'), trigger: 'blur' }],
  type: [{ required: true, message: t('input.inventory.warehouseManage.rules.typeRequired'), trigger: 'change' }],
  storeType: [{ required: true, message: t('input.inventory.warehouseManage.rules.storeTypeRequired'), trigger: 'change' }],
  orgName: [{ required: true, message: t('input.inventory.warehouseManage.rules.orgNameRequired'), trigger: 'change' }],
  adminLevel: [{ required: true, message: t('input.inventory.warehouseManage.rules.adminLevelRequired'), trigger: 'change' }],
  location: [{ required: true, message: t('input.inventory.warehouseManage.rules.locationRequired'), trigger: 'change' }],
  parentId: []  // 动态规则
}))

const goBack = () => {
  router.back()
}

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

const loadDeptTree = async () => {
  deptTreeLoading.value = true
  try {
    const res = await deptTreeSelect()
    const data = processDeptTree(res.data || [])
    deptMap.value = flattenDeptTree(data)
  } catch (error) {
    console.error('Failed to load dept tree:', error)
  } finally {
    deptTreeLoading.value = false
  }
}

const handleAdminLevelChange = (value) => {
  if (!value) {
    formData.adminLevel = ''
    formData.orgId = ''
    formData.orgName = ''
    selectedOrgId.value = ''
    formData.parentId = undefined
    return
  }

  const { regionCode } = buildRegionPath(regionTreeOptions.value, value)
  formData.adminLevel = regionCode || value
  formData.orgId = ''
  formData.orgName = ''
  selectedOrgId.value = ''
  formData.parentId = undefined
}

const syncSelectedOrgByName = () => {
  if (formData.orgId && deptMap.value[formData.orgId]) {
    selectedOrgId.value = formData.orgId
    return
  }

  if (!formData.orgName) {
    selectedOrgId.value = ''
    return
  }

  const matched = filteredOrgOptions.value.find(item => item.label === formData.orgName)
  selectedOrgId.value = matched?.id || ''
  formData.orgId = matched?.id || ''
}

const handleOrgChange = (value) => {
  const selected = filteredOrgOptions.value.find(item => item.id === value)
  formData.orgId = selected?.id || ''
  formData.orgName = selected?.label || ''
  formData.parentId = undefined
}

// 仓库类型变更时生成编码
const handleWarehouseTypeChange = async () => {
  if (!formData.type) {
    formData.warehouseCode = ''
    return
  }

  try {
    const res = await generateWarehouseCode({ warehouseType: formData.type })
    if (res.code === 200) {
      formData.warehouseCode = res.data.warehouseCode
    }
  } catch (error) {
    console.error('Failed to generate warehouse code:', error)
    ElMessage.error(t('input.inventory.warehouseManage.generateCodeFailed'))
  }
}

const loadParentOptions = async () => {
  optionLoading.value = true
  try {
    const res = await listWarehouseManage({ pageNum: 1, pageSize: 200 })
    if (res.code === 200 && res.data) {
      parentWarehouseOptions.value = (res.data.list || []).filter(item => item.id !== Number(warehouseId.value))
    }
  } catch (error) {
    console.error('Failed to load warehouse options:', error)
  } finally {
    optionLoading.value = false
  }
}

const loadDetail = async () => {
  if (!isEdit.value) return
  try {
    const res = await getWarehouseManage(warehouseId.value)
    if (res.code === 200 && res.data) {
      Object.assign(formData, {
        id: res.data.id,
        warehouseCode: res.data.warehouse_code || '',
        warehouseName: res.data.warehouse_name || '',
        type: res.data.type || '',
        storeType: res.data.store_type ? res.data.store_type.split(',') : [],
        orgId: res.data.org_id || '',
        orgName: res.data.org_name || '',
        adminLevel: res.data.admin_level || '',
        parentId: res.data.parent_id || undefined,
        location: res.data.location || '',
        capacity: res.data.capacity === null || res.data.capacity === undefined || res.data.capacity === ''
          ? null
          : Number(res.data.capacity),
        address: res.data.address || '',
        authenticationMaterial: res.data.authentication_material || '',
        authenticationMaterialName: res.data.authentication_material_name || '',
        status: res.data.status || '0',
        remark: res.data.remark || ''
      })

      if (formData.authenticationMaterial) {
        const fileName = formData.authenticationMaterialName || `${t('input.inventory.warehouseManage.form.authenticationMaterial')}.pdf`
        authenticationMaterialFileList.value = [{
          name: fileName,
          url: formData.authenticationMaterial,
          dataId: formData.authenticationMaterial,
          fileId: formData.authenticationMaterial,
          uid: Date.now() + '-authenticationMaterial'
        }]
      }

      if (formData.capacity === null || formData.capacity === undefined || formData.capacity === '') {
        capacityDisplay.value = ''
      } else {
        if (Number(formData.capacity) % capacityUnitFactorMap.ton === 0) {
          capacityUnit.value = 'ton'
        } else if (Number(formData.capacity) % capacityUnitFactorMap.quintal === 0) {
          capacityUnit.value = 'quintal'
        }
        syncCapacityDisplay()
      }

      if (formData.adminLevel) {
        adminLevelPath.value = formData.adminLevel
      }

      syncSelectedOrgByName()
    }
  } catch (error) {
    console.error('Failed to load warehouse detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

const handleUploadAuthenticationMaterial = async (options) => {
  const { file } = options
  const uploadFormData = new FormData()
  uploadFormData.append('file', file)

  try {
    const res = await uploadFile(uploadFormData)
    if (res.code === 200 && res.data) {
      const fileData = res.data
      const dataId = fileData.id || fileData.dataId

      authenticationMaterialFileList.value = [{
        name: file.name,
        uid: file.uid,
        dataId,
        fileId: dataId,
        url: dataId
      }]
      formData.authenticationMaterial = dataId
      formData.authenticationMaterialName = file.name

      ElMessage.success(t('common.uploadSuccess'))
    } else {
      ElMessage.error(res.msg || t('common.uploadFailed'))
    }
  } catch (error) {
    console.error('Failed to upload authentication material:', error)
    ElMessage.error(t('common.uploadFailed'))
  }
}

const handleRemoveAuthenticationMaterial = () => {
  authenticationMaterialFileList.value = []
  formData.authenticationMaterial = ''
  formData.authenticationMaterialName = ''
}

const handlePreviewAuthenticationMaterial = async (file) => {
  if (!file.url && !file.dataId && !file.fileId) return

  try {
    let previewUrl = ''
    const pathToPreview = file.dataId || file.fileId || file.url

    if (file.url && file.url.startsWith('http')) {
      previewUrl = file.url
    } else if (pathToPreview) {
      const res = await getFilePreviewUrl(pathToPreview)
      previewUrl = res.code === 200 ? res.msg : ''
    }

    if (previewUrl) {
      window.open(previewUrl, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview authentication material:', error)
    ElMessage.error(t('common.failed'))
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true

    const payload = {
      ...(isEdit.value ? { id: Number(warehouseId.value) } : {}),
      warehouseCode: formData.warehouseCode.trim(),
      warehouseName: formData.warehouseName.trim(),
      type: formData.type,
      storeType: Array.isArray(formData.storeType) ? formData.storeType.join(',') : formData.storeType,
      orgId: formData.orgId,
      orgName: formData.orgName,
      adminLevel: formData.adminLevel,
      parentId: formData.parentId || null,
      location: formData.location.trim(),
      capacity: formData.capacity,
      address: formData.address.trim(),
      authenticationMaterial: authenticationMaterialFileList.value.length > 0
        ? (authenticationMaterialFileList.value[0].dataId || authenticationMaterialFileList.value[0].fileId || '')
        : '',
      authenticationMaterialName: authenticationMaterialFileList.value.length > 0
        ? authenticationMaterialFileList.value[0].name
        : '',
      status: formData.status,
      remark: formData.remark.trim()
    }

    const res = isEdit.value
      ? await updateWarehouseManage(payload)
      : await addWarehouseManage(payload)

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('input.inventory.warehouseManage.editSuccess') : t('input.inventory.warehouseManage.addSuccess'))
      setTimeout(() => {
        router.push('/inventory/warehouse-manage')
      }, 300)
    }
  } catch (error) {
    console.error('Failed to submit warehouse form:', error)
  } finally {
    submitLoading.value = false
  }
}

onMounted(async () => {
  await loadRegionTree()
  await loadDeptTree()
  await loadParentOptions()
  await loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.doc-upload {
  width: 100%;
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

:deep(.doc-upload .el-upload) {
  width: 100%;
}

:deep(.doc-upload .el-upload-list) {
  margin-top: 8px;
}

</style>
