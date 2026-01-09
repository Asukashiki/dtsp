<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
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

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          v-loading="pageLoading"
          :model="formData"
          :rules="formRules"
          label-width="140px">
          <!-- 基本信息 -->
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
                  <el-form-item :label="$t('newFarm.land.form.landName')" prop="landName">
                    <el-input
                      v-model="formData.landName"
                      :placeholder="$t('newFarm.land.placeholder.landName')"
                      maxlength="100"
                      show-word-limit />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.ownerType')" prop="ownerType">
                    <el-select
                      v-model="formData.ownerType"
                      :placeholder="$t('newFarm.land.placeholder.ownerType')"
                      style="width: 100%">
                      <el-option value="PRIVATE" :label="$t('newFarm.land.ownerType.PRIVATE')" />
                      <el-option value="CONTRACT" :label="$t('newFarm.land.ownerType.CONTRACT')" />
                      <el-option value="STATE" :label="$t('newFarm.land.ownerType.STATE')" />
                      <el-option value="LEASED" :label="$t('newFarm.land.ownerType.LEASED')" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.landType')" prop="landType">
                    <el-select
                      v-model="formData.landType"
                      :placeholder="$t('newFarm.land.placeholder.landType')"
                      style="width: 100%">
                      <el-option value="PADDY" :label="$t('newFarm.land.landType.PADDY')" />
                      <el-option value="DRY" :label="$t('newFarm.land.landType.DRY')" />
                      <el-option value="ORCHARD" :label="$t('newFarm.land.landType.ORCHARD')" />
                      <el-option value="FOREST" :label="$t('newFarm.land.landType.FOREST')" />
                      <el-option value="OTHER" :label="$t('newFarm.land.landType.OTHER')" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.areaSize')" prop="areaSize">
                    <el-input-number
                      v-model="formData.areaSize"
                      :placeholder="$t('newFarm.land.placeholder.areaSize')"
                      :min="0"
                      :precision="2"
                      :step="0.1"
                      style="width: 100%" />
                    <div class="form-tip">{{ $t('newFarm.land.tips.areaUnit') }}</div>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.currentStatus')" prop="currentStatus">
                    <el-radio-group v-model="formData.currentStatus">
                      <el-radio label="CULTIVATING">{{ $t('newFarm.land.status.CULTIVATING') }}</el-radio>
                      <el-radio label="IDLE">{{ $t('newFarm.land.status.IDLE') }}</el-radio>
                      <el-radio label="FALLOW">{{ $t('newFarm.land.status.FALLOW') }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 位置信息 -->
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
                      :loading="zoneLoading">
                      <el-option
                        v-for="item in zoneOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code" />
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
                      :disabled="!formData.zoneCode">
                      <el-option
                        v-for="item in woredaOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.common.kebeleCode')" prop="kebeleCode">
                    <el-select
                      v-model="formData.kebeleCode"
                      :placeholder="$t('newFarm.common.selectKebele')"
                      filterable
                      clearable
                      style="width: 100%"
                      :loading="kebeleLoading"
                      :disabled="!formData.woredaCode">
                      <el-option
                        v-for="item in kebeleOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.latitude')" prop="latitude">
                    <el-input-number
                      v-model="formData.latitude"
                      :placeholder="$t('newFarm.land.placeholder.latitude')"
                      :precision="6"
                      :step="0.000001"
                      :min="-90"
                      :max="90"
                      style="width: 100%" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.land.form.longitude')" prop="longitude">
                    <el-input-number
                      v-model="formData.longitude"
                      :placeholder="$t('newFarm.land.placeholder.longitude')"
                      :precision="6"
                      :step="0.000001"
                      :min="-180"
                      :max="180"
                      style="width: 100%" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('newFarm.land.form.address')" prop="address">
                    <el-input
                      v-model="formData.address"
                      :placeholder="$t('newFarm.land.placeholder.address')"
                      maxlength="200"
                      show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 农民关联 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('newFarm.land.sections.farmerInfo') }}</span>
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
                      style="width: 100%">
                      <el-option
                        v-for="item in farmerOptions"
                        :key="item.farmerId"
                        :label="`${item.farmerName} (${item.farmerId})`"
                        :value="item.farmerId" />
                    </el-select>
                    <div class="form-tip">{{ $t('newFarm.land.tips.farmerOptional') }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 备注 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('newFarm.common.remark') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item :label="$t('newFarm.common.remark')" prop="remark">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="4"
                      :placeholder="$t('newFarm.land.placeholder.remark')"
                      maxlength="500"
                      show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
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
import {
  getLandDetail,
  addLand,
  updateLand,
  getFarmerOptions
} from '@/api/newFarm'
// 引入三级联动接口（和农民表单一致）
import { listSubRegionByCode } from '@/api/application'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const saveLoading = ref(false)
const pageLoading = ref(false)
const isEdit = computed(() => !!route.params.id)
const farmerOptions = ref([])
const farmerSearchLoading = ref(false)

// 三级联动相关状态（新增）
const zoneOptions = ref([])
const woredaOptions = ref([])
const kebeleOptions = ref([])
const zoneLoading = ref(false)
const woredaLoading = ref(false)
const kebeleLoading = ref(false)
const ORomiaRegionCode = '102000000' // 奥罗米亚州编码（和农民表单一致）

// 表单数据
const formData = reactive({
  landName: '',
  ownerType: 'PRIVATE',
  landType: 'DRY',
  areaSize: null,
  areaUnit: 'HECTARE',
  currentStatus: 'IDLE',
  zoneCode: '',
  woredaCode: '',
  kebeleCode: '',
  latitude: null,
  longitude: null,
  address: '',
  farmerId: '',
  remark: ''
})

// 表单验证规则
const formRules = computed(() => ({
  landName: [
    { required: true, message: t('newFarm.land.rules.landNameRequired'), trigger: 'blur' },
    { max: 100, message: t('newFarm.land.rules.landNameLength'), trigger: 'blur' }
  ],
  ownerType: [
    { required: true, message: t('newFarm.land.rules.ownerTypeRequired'), trigger: 'change' }
  ],
  landType: [
    { required: true, message: t('newFarm.land.rules.landTypeRequired'), trigger: 'change' }
  ],
  areaSize: [
    { required: true, message: t('newFarm.land.rules.areaSizeRequired'), trigger: 'blur' }
  ],
  zoneCode: [
    { required: true, message: t('newFarm.land.rules.zoneCodeRequired'), trigger: 'change' }
  ],
  woredaCode: [
    { required: true, message: t('newFarm.land.rules.woredaCodeRequired'), trigger: 'change' }
  ],
  kebeleCode: [
    { required: true, message: t('newFarm.land.rules.kebeleCodeRequired'), trigger: 'blur' }
  ]
}))

const goBack = () => {
  router.back()
}

// 加载Zone选项（奥罗米亚州下的子区划）
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

// Zone选择变化：清空下级，加载Woreda
const handleZoneChange = async (zoneCode) => {
  // 清空下级数据
  formData.woredaCode = ''
  formData.kebeleCode = ''
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

// Woreda选择变化：清空Kebele，加载Kebele选项
const handleWoredaChange = async (woredaCode) => {
  // 清空Kebele数据
  formData.kebeleCode = ''
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

// 加载农民选项
const handleFarmerSearch = async (keyword) => {
  farmerSearchLoading.value = true
  try {
    const res = await getFarmerOptions(formData.kebeleCode, keyword)
    if (res.code === 200) {
      farmerOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to search farmers:', error)
  } finally {
    farmerSearchLoading.value = false
  }
}

// 加载详情（编辑模式下联动回显）
const loadDetail = async () => {
  pageLoading.value = true
  try {
    const res = await getLandDetail(route.params.id)
    if (res.code === 200 && res.data) {
      const data = res.data
      formData.landName = data.landName || ''
      formData.ownerType = data.ownerType || 'PRIVATE'
      formData.landType = data.landType || 'DRY'
      formData.areaSize = data.areaSize || null
      formData.areaUnit = data.areaUnit || 'HECTARE'
      formData.currentStatus = data.currentStatus || 'IDLE'
      formData.latitude = data.latitude || null
      formData.longitude = data.longitude || null
      formData.address = data.address || ''
      formData.farmerId = data.farmerId || ''
      formData.remark = data.remark || ''

      // 保存原始的三级联动值
      const savedZoneCode = data.zoneCode || ''
      const savedWoredaCode = data.woredaCode || ''
      const savedKebeleCode = data.kebeleCode || ''

      // 编辑模式下联动回显：先加载Zone，再加载Woreda，最后加载Kebele
      if (savedZoneCode) {
        await loadZoneOptions()
        
        // 加载对应Woreda选项（不使用handleZoneChange，避免清空数据）
        woredaLoading.value = true
        try {
          const woredaRes = await listSubRegionByCode({ regionCode: savedZoneCode })
          if (woredaRes.code === 200) {
            woredaOptions.value = woredaRes.data || []
          }
        } catch (error) {
          ElMessage.error(t('newFarm.common.loadWoredaFailed'))
        } finally {
          woredaLoading.value = false
        }

        // 如果有Woreda，加载Kebele选项（不使用handleWoredaChange，避免清空数据）
        if (savedWoredaCode) {
          kebeleLoading.value = true
          try {
            const kebeleRes = await listSubRegionByCode({ regionCode: savedWoredaCode })
            if (kebeleRes.code === 200) {
              kebeleOptions.value = kebeleRes.data || []
            }
          } catch (error) {
            ElMessage.error(t('newFarm.common.loadKebeleFailed'))
          } finally {
            kebeleLoading.value = false
          }
        }

        // 最后恢复三级联动的值
        formData.zoneCode = savedZoneCode
        formData.woredaCode = savedWoredaCode
        formData.kebeleCode = savedKebeleCode
      }

      // 如果有关联农民，加载农民信息
      if (data.farmerId) {
        farmerOptions.value = [{
          farmerId: data.farmerId,
          farmerName: data.farmerName
        }]
      }
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    pageLoading.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      saveLoading.value = true
      try {
        const data = { ...formData }

        // 可选：如果需要传递名称字段，可在这里补充（和农民表单一致）
        const zone = zoneOptions.value.find(item => item.code === data.zoneCode)
        const woreda = woredaOptions.value.find(item => item.code === data.woredaCode)
        const kebele = kebeleOptions.value.find(item => item.code === data.kebeleCode)
        if (zone) data.zoneName = zone.name
        if (woreda) data.woredaName = woreda.name
        if (kebele) data.kebeleName = kebele.name

        let res
        if (isEdit.value) {
          res = await updateLand(route.params.id, data)
        } else {
          res = await addLand({...data, daId: '222222222'})
        }

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
    }
  })
}

onMounted(async () => {
  // 初始化加载Zone选项
  await loadZoneOptions()
  // 初始化加载农民选项
  await handleFarmerSearch('')
  // 编辑模式加载详情
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