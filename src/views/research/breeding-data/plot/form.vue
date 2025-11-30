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
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          <!-- 地块基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breedingData.plot.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.batchId')" prop="batchId">
                    <el-select v-model="formData.batchId" :placeholder="$t('research.breedingData.plot.placeholder.batchId')" style="width: 100%" @change="handleBatchChange">
                      <el-option v-for="item in batchOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.trialId')" prop="trialId">
                    <el-select v-model="formData.trialId" :placeholder="$t('research.breedingData.plot.placeholder.trialId')" style="width: 100%">
                      <el-option v-for="item in trialOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.trialFieldName')" prop="trialFieldName">
                    <el-input v-model="formData.trialFieldName" :placeholder="$t('research.breedingData.plot.placeholder.trialFieldName')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.researchCenterId')" prop="researchCenterId">
                    <el-input v-model="formData.researchCenterId" :placeholder="$t('research.breedingData.plot.placeholder.researchCenterId')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.programId')" prop="programId">
                    <el-input v-model="formData.programId" :placeholder="$t('research.breedingData.plot.placeholder.programId')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.subProgramId')" prop="subProgramId">
                    <el-input v-model="formData.subProgramId" :placeholder="$t('research.breedingData.plot.placeholder.subProgramId')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.researchFieldId')" prop="researchFieldId">
                    <el-input v-model="formData.researchFieldId" :placeholder="$t('research.breedingData.plot.placeholder.researchFieldId')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 地块位置信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('research.breedingData.plot.form.locationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.region')" prop="region">
                    <el-select v-model="formData.region" :placeholder="$t('research.breedingData.plot.placeholder.region')" style="width: 100%">
                      <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.zone')" prop="zone">
                    <el-select v-model="formData.zone" :placeholder="$t('research.breedingData.plot.placeholder.zone')" style="width: 100%">
                      <el-option v-for="item in zoneOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.woreda')" prop="woreda">
                    <el-select v-model="formData.woreda" :placeholder="$t('research.breedingData.plot.placeholder.woreda')" style="width: 100%">
                      <el-option v-for="item in woredaOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.kebele')" prop="kebele">
                    <el-select v-model="formData.kebele" :placeholder="$t('research.breedingData.plot.placeholder.kebele')" style="width: 100%">
                      <el-option v-for="item in kebeleOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.agriculturalEcoZone')">
                    <el-select v-model="formData.agriculturalEcoZone" :placeholder="$t('research.breedingData.plot.placeholder.agriculturalEcoZone')" style="width: 100%" clearable>
                      <el-option v-for="item in ecoZoneOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.gpsLocation')" prop="gpsLocation">
                    <el-input v-model="formData.gpsLocation" :placeholder="$t('research.breedingData.plot.placeholder.gpsLocation')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.startDate')" prop="startDate">
                    <el-date-picker v-model="formData.startDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.season')" prop="season">
                    <el-select v-model="formData.season" :placeholder="$t('research.breedingData.plot.placeholder.season')" style="width: 100%">
                      <el-option v-for="item in seasonOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.activityCode')">
                    <el-input v-model="formData.activityCode" :placeholder="$t('research.breedingData.plot.placeholder.activityCode')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.plot.form.kpiCode')">
                    <el-input v-model="formData.kpiCode" :placeholder="$t('research.breedingData.plot.placeholder.kpiCode')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 播种信息列表 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ $t('research.breedingData.plot.form.sowingInfo') }}</span>
              </div>
              <div class="header-actions">
                <el-button type="primary" size="small" @click="handleAddSowing">
                  <i class="ri-add-line"></i>{{ $t('research.breedingData.plot.addSowing') }}
                </el-button>
              </div>
            </div>
            <div class="card-body">
              <!-- PC端表格 -->
              <div class="table-wrapper pc-only">
                <el-table :data="formData.sowingList" border>
                  <el-table-column type="index" :label="$t('common.index')" width="60" />
                  <el-table-column :label="$t('research.breedingData.plot.sowing.seedQuantity')" min-width="140">
                    <template #default="{ row }">
                      <el-input-number v-model="row.seedQuantity" :min="0" :precision="2" style="width: 100%" :placeholder="$t('research.breedingData.plot.placeholder.seedQuantity')" />
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('research.breedingData.plot.sowing.sowingMethod')" min-width="120">
                    <template #default="{ row }">
                      <el-select v-model="row.sowingMethod" :placeholder="$t('research.breedingData.plot.placeholder.sowingMethod')" style="width: 100%">
                        <el-option v-for="item in sowingMethodOptions" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('research.breedingData.plot.sowing.sowingTime')" min-width="140">
                    <template #default="{ row }">
                      <el-date-picker v-model="row.sowingTime" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('common.actions')" width="80" fixed="right">
                    <template #default="{ $index }">
                      <el-button link type="danger" @click="handleDeleteSowing($index)">
                        <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!-- 移动端卡片 -->
              <div class="mobile-card-list mobile-only">
                <div v-for="(item, index) in formData.sowingList" :key="index" class="mobile-card">
                  <div class="mobile-card-header">
                    <div class="mobile-card-title">
                      <i class="ri-seedling-line"></i>
                      <span>{{ $t('research.breedingData.plot.sowingRecord') }} {{ index + 1 }}</span>
                    </div>
                    <el-button link type="danger" @click="handleDeleteSowing(index)">
                      <i class="ri-delete-bin-line"></i>
                    </el-button>
                  </div>
                  <div class="mobile-card-body">
                    <el-form-item :label="$t('research.breedingData.plot.sowing.seedQuantity')">
                      <el-input-number v-model="item.seedQuantity" :min="0" :precision="2" style="width: 100%" :placeholder="$t('research.breedingData.plot.placeholder.seedQuantity')" />
                    </el-form-item>
                    <el-form-item :label="$t('research.breedingData.plot.sowing.sowingMethod')">
                      <el-select v-model="item.sowingMethod" :placeholder="$t('research.breedingData.plot.placeholder.sowingMethod')" style="width: 100%">
                        <el-option v-for="opt in sowingMethodOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('research.breedingData.plot.sowing.sowingTime')">
                      <el-date-picker v-model="item.sowingTime" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">{{ $t('common.save') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getPlotInfo, addPlotInfo, editPlotInfo, getBatchOptions, getTrialOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const batchOptions = ref([])
const trialOptions = ref([])

const isEdit = computed(() => !!route.params.groundId)

const formData = reactive({
  groundId: '',
  batchId: '',
  trialId: '',
  trialFieldName: '',
  researchCenterId: '',
  programId: '',
  subProgramId: '',
  researchFieldId: '',
  region: '',
  zone: '',
  woreda: '',
  kebele: '',
  agriculturalEcoZone: '',
  gpsLocation: '',
  startDate: '',
  season: '',
  activityCode: '',
  kpiCode: '',
  sowingList: []
})

const rules = {
  batchId: [{ required: true, message: t('research.breedingData.plot.placeholder.batchId'), trigger: 'change' }],
  trialId: [{ required: true, message: t('research.breedingData.plot.placeholder.trialId'), trigger: 'change' }],
  trialFieldName: [{ required: true, message: t('research.breedingData.plot.placeholder.trialFieldName'), trigger: 'blur' }],
  researchCenterId: [{ required: true, message: t('research.breedingData.plot.placeholder.researchCenterId'), trigger: 'blur' }],
  programId: [{ required: true, message: t('research.breedingData.plot.placeholder.programId'), trigger: 'blur' }],
  subProgramId: [{ required: true, message: t('research.breedingData.plot.placeholder.subProgramId'), trigger: 'blur' }],
  researchFieldId: [{ required: true, message: t('research.breedingData.plot.placeholder.researchFieldId'), trigger: 'blur' }],
  region: [{ required: true, message: t('research.breedingData.plot.placeholder.region'), trigger: 'change' }],
  zone: [{ required: true, message: t('research.breedingData.plot.placeholder.zone'), trigger: 'change' }],
  woreda: [{ required: true, message: t('research.breedingData.plot.placeholder.woreda'), trigger: 'change' }],
  kebele: [{ required: true, message: t('research.breedingData.plot.placeholder.kebele'), trigger: 'change' }],
  gpsLocation: [{ required: true, message: t('research.breedingData.plot.placeholder.gpsLocation'), trigger: 'blur' }],
  startDate: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  season: [{ required: true, message: t('research.breedingData.plot.placeholder.season'), trigger: 'change' }]
}

const regionOptions = [
  { label: 'Region 1', value: 'region1' },
  { label: 'Region 2', value: 'region2' }
]

const zoneOptions = [
  { label: 'Zone 1', value: 'zone1' },
  { label: 'Zone 2', value: 'zone2' }
]

const woredaOptions = [
  { label: 'Woreda 1', value: 'woreda1' },
  { label: 'Woreda 2', value: 'woreda2' }
]

const kebeleOptions = [
  { label: 'Kebele 1', value: 'kebele1' },
  { label: 'Kebele 2', value: 'kebele2' }
]

const ecoZoneOptions = [
  { label: 'Eco Zone 1', value: 'eco1' },
  { label: 'Eco Zone 2', value: 'eco2' }
]

const seasonOptions = [
  { label: '春季', value: 'spring' },
  { label: '夏季', value: 'summer' },
  { label: '秋季', value: 'autumn' },
  { label: '冬季', value: 'winter' }
]

const sowingMethodOptions = [
  { label: '条播', value: '条播' },
  { label: '撒播', value: '撒播' },
  { label: '点播', value: '点播' },
  { label: '移栽', value: '移栽' }
]

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const loadTrialOptions = async () => {
  try {
    const res = await getTrialOptions(formData.batchId)
    trialOptions.value = res.data || []
  } catch (error) {
    console.error('获取试验选项失败:', error)
  }
}

const handleBatchChange = () => {
  formData.trialId = ''
  loadTrialOptions()
}

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getPlotInfo(route.params.groundId)
    Object.assign(formData, res.data)
  } catch (error) {
    console.error('获取详情失败:', error)
  } finally {
    loading.value = false
  }
}

const handleAddSowing = () => {
  formData.sowingList.push({
    seedQuantity: null,
    sowingMethod: '',
    sowingTime: ''
  })
}

const handleDeleteSowing = (index) => {
  formData.sowingList.splice(index, 1)
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    const submitData = { ...formData }

    if (isEdit.value) {
      await editPlotInfo(submitData)
      ElMessage.success(t('research.breedingData.plot.editSuccess'))
    } else {
      await addPlotInfo(submitData)
      ElMessage.success(t('research.breedingData.plot.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => {
  router.push('/research/breeding-data/plot')
}

onMounted(() => {
  loadBatchOptions()
  getInfo()
  if (formData.batchId) {
    loadTrialOptions()
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}

.mobile-card-list {
  .mobile-card {
    margin-bottom: 16px;

    .el-form-item {
      margin-bottom: 12px;
    }
  }
}
</style>
