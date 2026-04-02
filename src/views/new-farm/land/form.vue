<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('newFarm.land.edit') : $t('newFarm.land.add') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <el-form
          ref="formRef"
          v-loading="pageLoading"
          :model="formData"
          :rules="formRules"
          label-width="140px"
        >
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-landscape-line"></i>
                <span>{{ $t('newFarm.land.sections.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.farmerId')" prop="farmerId">
                    <el-select
                      v-model="formData.farmerId"
                      :placeholder="$t('newFarm.land.placeholder.farmerId')"
                      filterable
                      remote
                      :remote-method="handleFarmerSearch"
                      :loading="farmerSearchLoading"
                      clearable
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in farmerOptions"
                        :key="item.farmerId"
                        :label="`${item.farmerName} (${item.farmerId})`"
                        :value="item.farmerId"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.areaTa')" prop="areaTa">
                    <el-input-number
                      v-model="formData.areaTa"
                      :min="0"
                      :precision="4"
                      :step="0.1"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('newFarm.land.sections.locationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.common.zoneCode')" prop="zoneCode">
                    <el-select
                      v-model="formData.zoneCode"
                      :placeholder="$t('newFarm.common.selectZone')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleZoneChange"
                      :loading="zoneLoading"
                    >
                      <el-option v-for="item in zoneOptions" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.common.woredaCode')" prop="woredaCode">
                    <el-select
                      v-model="formData.woredaCode"
                      :placeholder="$t('newFarm.common.selectWoreda')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleWoredaChange"
                      :loading="woredaLoading"
                      :disabled="!formData.zoneCode"
                    >
                      <el-option v-for="item in woredaOptions" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.common.kebeleCode')" prop="kebeleId">
                    <el-select
                      v-model="formData.kebeleId"
                      :placeholder="$t('newFarm.common.selectKebele')"
                      filterable
                      clearable
                      style="width: 100%"
                      :loading="kebeleLoading"
                      :disabled="!formData.woredaCode"
                    >
                      <el-option v-for="item in kebeleOptions" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.gpsLat')" prop="gpsLat">
                    <el-input-number
                      v-model="formData.gpsLat"
                      :precision="6"
                      :step="0.000001"
                      :min="-90"
                      :max="90"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.gpsLong')" prop="gpsLong">
                    <el-input-number
                      v-model="formData.gpsLong"
                      :precision="6"
                      :step="0.000001"
                      :min="-180"
                      :max="180"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('newFarm.land.form.gpsPolygon')" prop="gpsPolygon">
                    <el-input
                      v-model="formData.gpsPolygon"
                      type="textarea"
                      :rows="4"
                      :placeholder="$t('newFarm.land.placeholder.gpsPolygon')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('newFarm.common.remark') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-form-item :label="$t('newFarm.common.remark')" prop="remark">
                <el-input
                  v-model="formData.remark"
                  type="textarea"
                  :rows="4"
                  :placeholder="$t('newFarm.land.placeholder.remark')"
                  maxlength="500"
                  show-word-limit
                />
              </el-form-item>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" :loading="saveLoading" @click="handleSubmit">
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
import { getLandDetail, addLand, updateLand, getFarmerOptions } from '@/api/newFarm'
import { listSubRegionByCode } from '@/api/application'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const saveLoading = ref(false)
const pageLoading = ref(false)
const isEdit = computed(() => !!route.params.id)
const landId = computed(() => route.params.id)
const farmerOptions = ref([])
const farmerSearchLoading = ref(false)

const zoneOptions = ref([])
const woredaOptions = ref([])
const kebeleOptions = ref([])
const zoneLoading = ref(false)
const woredaLoading = ref(false)
const kebeleLoading = ref(false)
const ORomiaRegionCode = '000000000000'

const formData = reactive({
  status: '0',
  farmerId: '',
  zoneCode: '',
  woredaCode: '',
  kebeleId: '',
  gpsLat: null,
  gpsLong: null,
  gpsPolygon: '',
  areaTa: null,
  soilCode: '',
  irrigationCode: '',
  slopeClass: '',
  landUseType: '',
  remark: ''
})

const formRules = computed(() => ({
  farmerId: [{ required: true, message: t('newFarm.land.rules.farmerIdRequired'), trigger: 'change' }],
  kebeleId: [{ required: true, message: t('newFarm.land.rules.kebeleCodeRequired'), trigger: 'change' }],
  areaTa: [{ required: true, message: t('newFarm.land.rules.areaTaRequired'), trigger: 'blur' }]
}))

const goBack = () => {
  router.back()
}

const loadZoneOptions = async () => {
  zoneLoading.value = true
  try {
    const res = await listSubRegionByCode({ regionCode: ORomiaRegionCode })
    if (res.code === 200) {
      zoneOptions.value = res.data || []
    }
  } catch (error) {
    ElMessage.error(t('newFarm.common.loadZoneFailed'))
  } finally {
    zoneLoading.value = false
  }
}

const loadRegionDisplay = async (regionId) => {
  if (!regionId) return
  try {
    const res = await listRegionNameById({ regionId })
    if (res.code === 200 && res.data) {
      regionDisplay.kebeleName = res.data.kebeleName || ''
    }
  } catch (error) {
    console.error('Failed to load region display:', error)
  }
}

const handleZoneChange = async (zoneCode) => {
  formData.woredaCode = ''
  formData.kebeleId = ''
  woredaOptions.value = []
  kebeleOptions.value = []

  if (!zoneCode) return

  woredaLoading.value = true
  try {
    const res = await listSubRegionByCode({ regionCode: zoneCode })
    if (res.code === 200) {
      woredaOptions.value = res.data || []
    }
  } catch (error) {
    ElMessage.error(t('newFarm.common.loadWoredaFailed'))
  } finally {
    woredaLoading.value = false
  }
}

const handleWoredaChange = async (woredaCode) => {
  formData.kebeleId = ''
  kebeleOptions.value = []

  if (!woredaCode) return

  kebeleLoading.value = true
  try {
    const res = await listSubRegionByCode({ regionCode: woredaCode })
    if (res.code === 200) {
      kebeleOptions.value = res.data || []
    }
  } catch (error) {
    ElMessage.error(t('newFarm.common.loadKebeleFailed'))
  } finally {
    kebeleLoading.value = false
  }
}

const handleFarmerSearch = async (keyword) => {
  farmerSearchLoading.value = true
  try {
    const res = await getFarmerOptions(formData.kebeleId, keyword)
    if (res.code === 200) {
      farmerOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to search farmers:', error)
  } finally {
    farmerSearchLoading.value = false
  }
}

const loadDetail = async () => {
  if (!landId.value) {
    ElMessage.error(t('common.failed'))
    router.back()
    return
  }

  pageLoading.value = true
  try {
    const res = await getLandDetail(landId.value)
    if (res.code === 200 && res.data) {
      const data = res.data
      formData.status = data.status || '0'
      formData.farmerId = data.farmerId || ''
      formData.kebeleId = data.kebeleId || data.kebeleCode || ''
      formData.gpsLat = data.gpsLat ?? data.latitude ?? null
      formData.gpsLong = data.gpsLong ?? data.longitude ?? null
      formData.gpsPolygon = data.gpsPolygon || data.plotBoundary || ''
      formData.areaTa = data.areaTa ?? data.areaSize ?? null
      formData.soilCode = data.soilCode || ''
      formData.irrigationCode = data.irrigationCode || ''
      formData.slopeClass = data.slopeClass || ''
      formData.landUseType = data.landUseType || ''
      formData.remark = data.remark || ''
      await loadRegionDisplay(formData.kebeleId)

      if (data.farmerId) {
        farmerOptions.value = [{
          farmerId: data.farmerId,
          farmerName: data.farmerName || data.farmerId
        }]
      }
    } else {
      ElMessage.error(res.msg || t('common.failed'))
      router.back()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
    router.back()
  } finally {
    pageLoading.value = false
  }
}

const buildSubmitPayload = () => {
  return {
    status: formData.status,
    farmerId: formData.farmerId,
    kebeleId: formData.kebeleId,
    gpsLat: formData.gpsLat,
    gpsLong: formData.gpsLong,
    gpsPolygon: formData.gpsPolygon,
    areaTa: formData.areaTa,
    soilCode: formData.soilCode,
    irrigationCode: formData.irrigationCode,
    slopeClass: formData.slopeClass,
    landUseType: formData.landUseType,
    remark: formData.remark
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    saveLoading.value = true
    try {
      const payload = buildSubmitPayload()
      console.log('Land submit payload:', payload)

      const res = isEdit.value
        ? await updateLand(landId.value, payload)
        : await addLand(payload)

      if (res.code === 200) {
        ElMessage.success(isEdit.value ? t('newFarm.land.messages.editSuccess') : t('newFarm.land.messages.addSuccess'))
        setTimeout(() => router.back(), 1000)
      } else {
        ElMessage.error(res.msg || t('common.failed'))
      }
    } catch (error) {
      console.error('Failed to save:', error)
      ElMessage.error(t('common.failed'))
    } finally {
      saveLoading.value = false
    }
  })
}

onMounted(async () => {
  await loadZoneOptions()
  await handleFarmerSearch('')
  if (isEdit.value) {
    await loadDetail()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}
</style>
