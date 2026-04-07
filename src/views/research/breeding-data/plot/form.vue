<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.plot.edit') : $t('research.breedingData.plot.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px" v-loading="loading">
          <!-- Plot Basic Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>Plot Basic Information</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Trial ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Trial ID" prop="trialId">
                    <el-select v-model="formData.trialId" placeholder="Please select Trial ID" filterable style="width: 100%" @change="handleTrialChange">
                      <el-option 
                        v-for="item in trialOptions" 
                        :key="item.trialId" 
                        :label="`${item.trialName} (${item.trialId})`" 
                        :value="item.trialId"
                      >
                        <span style="float: left">{{ item.trialName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px; margin-left: 20px;">{{ item.trialId }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Plot ID (auto-generated, read-only) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Plot ID">
                    <el-input v-model="formData.plotId" disabled placeholder="{trial_id}-P{replication_no}{row_no}{column_no}" />
                  </el-form-item>
                </el-col>
                <!-- Batch ID (read-only, auto-filled from Trial) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Batch ID">
                    <el-input v-model="formData.batchId" disabled placeholder="Auto-filled from Trial ID" />
                  </el-form-item>
                </el-col>
                <!-- Replication No -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Replication No" prop="replicationNo">
                    <el-input-number v-model="formData.replicationNo" :min="1" :max="99" style="width: 100%" placeholder="1-99" />
                  </el-form-item>
                </el-col>
                <!-- Row No -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Row No" prop="rowNo">
                    <el-input-number v-model="formData.rowNo" :min="1" :max="99" style="width: 100%" placeholder="1-99" />
                  </el-form-item>
                </el-col>
                <!-- Column No -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Column No" prop="columnNo">
                    <el-input-number v-model="formData.columnNo" :min="1" :max="99" style="width: 100%" placeholder="1-99" />
                  </el-form-item>
                </el-col>
                <!-- Variety Code (read-only, auto-filled from Trial) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Variety Code">
                    <el-input v-model="formData.varietyCode" disabled placeholder="Auto-filled from Trial ID" />
                  </el-form-item>
                </el-col>
                <!-- Plot Area (m²) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Plot Area (m²)">
                    <el-input-number v-model="formData.plotAreaM2" :min="0" :precision="2" style="width: 100%" placeholder="Area in square meters" />
                  </el-form-item>
                </el-col>
                <!-- GPS -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="GPS" prop="gps">
                    <div class="location-field-group">
                      <el-input v-model="formData.gps" placeholder="Select GPS from map" readonly clearable />
                      <el-button type="primary" @click="openLocationDialog">
                        <i class="ri-map-pin-add-line"></i>
                        Select
                      </el-button>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Sowing Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-seedling-line"></i>
                <span>Sowing Information</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Seed Quantity (kg) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Seed Quantity (g)">
                    <el-input-number v-model="formData.seedQuantity" :min="0" :precision="2" style="width: 100%" placeholder="Enter seed quantity in g" />
                  </el-form-item>
                </el-col>
                <!-- Sowing Method -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Sowing Method">
                    <el-select v-model="formData.sowingMethod" placeholder="Select sowing method" style="width: 100%">
                      <el-option label="Direct Seeding" value="direct_seeding" />
                      <el-option label="Transplanting" value="transplanting" />
                      <el-option label="Broadcasting" value="broadcasting" />
                      <el-option label="Drilling" value="drilling" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Sowing Date -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Sowing Date">
                    <el-date-picker v-model="formData.sowingTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" placeholder="Select sowing time" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Audit Information (仅编辑模式显示) -->
          <div class="info-card" v-if="isEdit">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-info-line"></i>
                <span>Audit Information</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.columns.createdBy')">
                    <el-input v-model="formData.createdName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.columns.createTime')">
                    <el-input v-model="formData.createTime" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">{{ $t('common.save') }}</el-button>
          </div>
        </el-form>

        <el-dialog
          v-model="locationDialogVisible"
          title="Select GPS"
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
              <span>Click on the map to select GPS coordinates</span>
            </div>

            <div class="location-result">
              <div class="location-result-label">Selected GPS</div>
              <el-input v-model="tempLocationValue" readonly placeholder="Longitude, Latitude" />
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
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPlotInfo, addPlotInfo, editPlotInfo, getTrialOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const trialOptions = ref([])
const mapContainerRef = ref(null)
const mapInstance = ref(null)
const mapMarker = ref(null)
const locationDialogVisible = ref(false)
const tempLocationValue = ref('')
const tempLocationPosition = ref(null)

const isEdit = computed(() => !!route.params.plotId)

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'
const ETHIOPIA_CENTER = { lat: 9.145, lng: 40.489673 }
const ETHIOPIA_ZOOM = 6

const formData = reactive({
  plotId: '',
  trialId: '',
  batchId: '',
  replicationNo: null,
  rowNo: null,
  columnNo: null,
  varietyCode: '',
  seedQuantity: null,
  sowingMethod: '',
  sowingTime: '',
  plotAreaM2: null,
  gps: '',
  gpsLat: null,
  gpsLong: null
})

const rules = {
  trialId: [{ required: true, message: 'Please select Trial ID', trigger: 'change' }],
  replicationNo: [{ required: true, message: 'Please enter Replication No', trigger: 'blur' }],
  rowNo: [{ required: true, message: 'Please enter Row No', trigger: 'blur' }],
  columnNo: [{ required: true, message: 'Please enter Column No', trigger: 'blur' }],
  gps: [{
    validator: (rule, value, callback) => {
      if (!value) {
        callback()
        return
      }
      const parts = value.split(',').map(item => item.trim())
      if (parts.length !== 2 || parts.some(item => item === '' || Number.isNaN(Number(item)))) {
        callback(new Error('Please enter GPS as Latitude, Longitude'))
        return
      }
      const [lat, lng] = parts.map(Number)
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        callback(new Error('GPS is out of valid latitude/longitude range'))
        return
      }
      callback()
    },
    trigger: 'blur'
  }]
}

const formatNow = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const formatLocationValue = (lng, lat) => `${Number(lng).toFixed(6)},${Number(lat).toFixed(6)}`

const parseLocationValue = (value) => {
  if (!value || typeof value !== 'string') return null
  const [lngStr, latStr] = value.split(',').map(item => item?.trim())
  const lng = Number(lngStr)
  const lat = Number(latStr)
  if (Number.isNaN(lng) || Number.isNaN(lat)) return null
  return { lng, lat }
}

const syncGpsField = () => {
  if (formData.gpsLat == null || formData.gpsLong == null) {
    formData.gps = ''
    return
  }
  formData.gps = formatLocationValue(formData.gpsLong, formData.gpsLat)
}

const syncGpsParts = () => {
  if (!formData.gps) {
    formData.gpsLat = null
    formData.gpsLong = null
    return true
  }
  const parts = formData.gps.split(',').map(item => item.trim())
  if (parts.length !== 2) {
    return false
  }
  const [lat, lng] = parts.map(Number)
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return false
  }
  formData.gpsLat = lat
  formData.gpsLong = lng
  return true
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

  const savedLocation = tempLocationPosition.value || parseLocationValue(formData.gps)
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
    ElMessage.error(error?.message === 'Google Maps API key is not configured' ? 'Google Maps API key is not configured' : 'Failed to load map')
  }
}

const openLocationDialog = () => {
  const savedLocation = parseLocationValue(formData.gps)
  tempLocationValue.value = formData.gps || ''
  tempLocationPosition.value = savedLocation ? { lat: savedLocation.lat, lng: savedLocation.lng } : null
  locationDialogVisible.value = true
}

const handleLocationDialogOpened = async () => {
  mapMarker.value = null
  mapInstance.value = null
  await setupLocationMap()
}

const confirmLocationSelection = () => {
  if (!tempLocationValue.value || !tempLocationPosition.value) {
    ElMessage.warning('Please select GPS on map')
    return
  }

  formData.gps = tempLocationValue.value
  formData.gpsLat = tempLocationPosition.value.lat
  formData.gpsLong = tempLocationPosition.value.lng
  locationDialogVisible.value = false
}

const loadTrialOptions = async () => {
  try {
    const res = await getTrialOptions()
    trialOptions.value = (res.data || []).filter(item =>
      item.workflowStatus === "S2"
    )
  } catch (error) {
    console.error('Failed to load trial options:', error)
  }
}

const handleTrialChange = (trialId) => {
  // Auto-fill batchId and varietyCode from selected trial
  const selectedTrial = trialOptions.value.find(item => item.trialId === trialId)
  if (selectedTrial) {
    formData.batchId = selectedTrial.batchId || ''
    formData.varietyCode = selectedTrial.varietyCode || ''
  }
}

const getInfo = async () => {
  if (!isEdit.value) {
    formData.sowingTime = formatNow()
    return
  }
  loading.value = true
  try {
    const res = await getPlotInfo(route.params.plotId)
    Object.assign(formData, res.data)
    syncGpsField()
  } catch (error) {
    console.error('Failed to load plot info:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (!syncGpsParts()) {
      ElMessage.error('Please enter GPS as Latitude, Longitude')
      return
    }
    const submitData = { ...formData }
    delete submitData.gps

    if (isEdit.value) {
      await editPlotInfo(submitData)
      ElMessage.success('Plot updated successfully')
    } else {
      await addPlotInfo(submitData)
      ElMessage.success('Plot added successfully')
    }
    goBack()
  } catch (error) {
    console.error('Submit failed:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => {
  router.push('/research/breeding-data/plot')
}

onMounted(() => {
  loadTrialOptions()
  getInfo()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.location-field-group {
  display: flex;
  gap: 8px;
  width: 100%;
}

.location-dialog-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.location-map {
  width: 100%;
  height: 420px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #dcdfe6;
}

.location-map-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  font-size: 14px;
}

.location-result {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location-result-label {
  font-size: 14px;
  color: #606266;
}
</style>
