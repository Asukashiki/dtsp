<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.multiplierReport.edit') : $t('research.multiplierReport.add') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <!-- 批次选择区（暂时隐藏） -->
        <div v-if="false" class="batch-selector-section">
          <div class="section-title">
            <i class="ri-folder-line"></i>
            <span>{{ $t('research.multiplierReport.selectBatch') }}</span>
          </div>
          <p class="section-hint">{{ $t('research.multiplierReport.selectBatchHint') }}</p>
          <el-select v-model="selectedBatchId" filterable clearable
            :placeholder="$t('research.multiplierReport.searchBatchPlaceholder')"
            :loading="batchLoading" class="batch-select" @change="handleBatchChange">
            <el-option v-for="batch in approvedBatches" :key="batch.id"
              :label="`${batch.batchId} - ${batch.varietyName || ''} (${batch.cropType || ''})`"
              :value="batch.id">
              <span class="batch-option">
                <span class="batch-name">{{ batch.batchId }}</span>
                <span class="batch-variety">{{ batch.varietyName }}</span>
                <el-tag size="small" type="success">{{ batch.breedingLevel || 'C1' }}</el-tag>
              </span>
            </el-option>
          </el-select>
        </div>

        <el-form ref="formRef" :model="formData" :rules="rules" label-width="220px" v-loading="loading">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.multiplierReport.basicInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.reportDate')" prop="reportDate">
                    <el-date-picker v-model="formData.reportDate" type="date" value-format="YYYY-MM-DD" :placeholder="$t('common.pleaseSelect')" style="width:100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.multiplierId')" prop="multiplierId">
                    <el-select v-model="formData.multiplierId" filterable clearable
                      :placeholder="$t('common.pleaseSelect')" style="width:100%"
                      :loading="orgLoading" @change="handleOrgChange">
                      <el-option v-for="org in organizationList" :key="org.id"
                        :label="`${org.orgName} (${org.orgCode || ''})`" :value="String(org.id)" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.distributionId')" prop="distributionId">
                    <el-select v-model="formData.distributionId" filterable clearable
                      :placeholder="$t('common.pleaseSelect')" style="width:100%"
                      :loading="distLoading">
                      <el-option v-for="dist in distributionList" :key="dist.distributeId"
                        :label="`${dist.distributeId} - ${dist.distributeName || ''}`" :value="dist.distributeId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.certificateId')">
                    <el-select v-model="formData.certificateId" filterable clearable
                      :placeholder="$t('common.pleaseSelect')" style="width:100%"
                      :loading="certLoading" allow-create>
                      <el-option v-for="cert in certificationList" :key="cert.dataId"
                        :label="`${cert.authId || cert.dataId} - ${cert.varietyName || ''}`" :value="cert.authId || cert.dataId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.seedClassReceived')" prop="seedClassReceived">
                    <el-select v-model="formData.seedClassReceived" :placeholder="$t('common.pleaseSelect')" style="width:100%">
                      <el-option label="Breeder" value="Breeder" />
                      <el-option label="Pre-Basic" value="Pre-Basic" />
                      <el-option label="Basic" value="Basic" />
                      <el-option label="C1" value="C1" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.farmId')">
                    <el-select v-model="formData.farmId" filterable clearable
                      :placeholder="$t('common.pleaseSelect')" style="width:100%">
                      <el-option v-for="org in organizationList" :key="'farm-'+org.id"
                        :label="`${org.orgName} (${org.orgCode || ''})`" :value="String(org.id)" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.cropType')" prop="cropType">
                    <el-select v-model="formData.cropType" :placeholder="$t('common.pleaseSelect')" filterable style="width:100%">
                      <el-option v-for="item in cropTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 生产信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-plant-line"></i><span>{{ $t('research.multiplierReport.productionInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.areaPlantedHa')" prop="areaPlantedHa">
                    <el-input-number v-model="formData.areaPlantedHa" :min="0" :precision="2" controls-position="right" style="width:100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.plantingDate')" prop="plantingDate">
                    <el-date-picker v-model="formData.plantingDate" type="date" value-format="YYYY-MM-DD" :placeholder="$t('common.pleaseSelect')" style="width:100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.harvestDate')">
                    <el-date-picker v-model="formData.harvestDate" type="date" value-format="YYYY-MM-DD" :placeholder="$t('common.pleaseSelect')" style="width:100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.producedSeedQuantity')">
                    <el-input-number v-model="formData.producedSeedQuantity" :min="0" :precision="2" controls-position="right" style="width:100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.rejectedQuantity')">
                    <el-input-number v-model="formData.rejectedQuantity" :min="0" :precision="2" controls-position="right" style="width:100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 质量信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-test-tube-line"></i><span>{{ $t('research.multiplierReport.qualityInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.germinationRate')">
                    <el-input-number v-model="formData.germinationRate" :min="0" :max="100" :precision="2" controls-position="right" style="width:100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.moistureContent')">
                    <el-input-number v-model="formData.moistureContent" :min="0" :max="100" :precision="2" controls-position="right" style="width:100%" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item :label="$t('common.remarks')">
                    <el-input v-model="formData.remark" type="textarea" :rows="3" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">{{ $t('common.submit') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getMultiplierReport, addMultiplierReport, updateMultiplierReport } from '@/api/multiplierReport'
import { getApprovedC1BatchList, getC1BreedingBatchById } from '@/api/c1BreedingBatch'
import { getBreedSeedDistributeList } from '@/api/breedSeed'
import { getOrganizationList } from '@/api/organization'
import { getBreedingCertificationList } from '@/api/seed'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { options: dictOptions } = useDict(['crop_type'])

const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const isEdit = computed(() => !!route.params.id)
const cropTypeOptions = computed(() => dictOptions.value.crop_type || [])

// 选择数据源
const selectedBatchId = ref(null)
const approvedBatches = ref([])
const batchLoading = ref(false)
const organizationList = ref([])
const orgLoading = ref(false)
const distributionList = ref([])
const distLoading = ref(false)
const certificationList = ref([])
const certLoading = ref(false)

const formData = ref({
  reportDate: '', multiplierId: '', distributionId: '', certificateId: '',
  seedClassReceived: '', farmId: '', cropType: '', varietyName: '',
  areaPlantedHa: null, plantingDate: '', harvestDate: '',
  producedSeedQuantity: null, rejectedQuantity: null,
  germinationRate: null, moistureContent: null, remark: ''
})

const rules = computed(() => ({
  reportDate: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  multiplierId: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  seedClassReceived: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  cropType: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  varietyName: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
  areaPlantedHa: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
  plantingDate: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }]
}))

// 通用提取列表数据（兼容多种返回格式）
const extractList = (res) => {
  if (!res) return []
  // AjaxResult.success(map) → { code: 0, data: { list: [...] } }
  if (res.data?.list) return res.data.list
  // TableDataInfo → { code: 200, rows: [...] }
  if (res.rows) return res.rows
  // AjaxResult.success(list) → { code: 0, data: [...] }
  if (Array.isArray(res.data)) return res.data
  return []
}

// 加载已审核通过的C1批次
const loadApprovedBatches = async () => {
  batchLoading.value = true
  try {
    const res = await getApprovedC1BatchList({ pageNum: 1, pageSize: 999 })
    approvedBatches.value = extractList(res)
  } catch (e) { console.error(e) }
  finally { batchLoading.value = false }
}

// 加载组织列表
const loadOrganizations = async () => {
  orgLoading.value = true
  try {
    const res = await getOrganizationList({ pageNum: 1, pageSize: 999 })
    organizationList.value = extractList(res)
  } catch (e) { console.error(e) }
  finally { orgLoading.value = false }
}

// 加载分发记录
const loadDistributions = async () => {
  distLoading.value = true
  try {
    const res = await getBreedSeedDistributeList({ pageNum: 1, pageSize: 999 })
    distributionList.value = extractList(res)
  } catch (e) { console.error(e) }
  finally { distLoading.value = false }
}

// 加载证书列表
const loadCertifications = async () => {
  certLoading.value = true
  try {
    const res = await getBreedingCertificationList({ auditResult: 'approved' })
    certificationList.value = extractList(res)
  } catch (e) { console.error(e) }
  finally { certLoading.value = false }
}

// 从批次数据填充表单
const fillFromBatch = (batch) => {
  formData.value.cropType = batch.cropType || ''
  formData.value.varietyName = batch.varietyName || ''
  formData.value.areaPlantedHa = batch.plantingArea || null
  formData.value.plantingDate = batch.startDate || ''
  formData.value.harvestDate = batch.endDate || ''
  formData.value.producedSeedQuantity = batch.expectedYield || batch.actualYield || null
  formData.value.seedClassReceived = batch.breedingLevel || 'C1'
  formData.value.certificateId = batch.batchId || ''
  formData.value.multiplierId = batch.orgId || ''
  formData.value.farmId = batch.orgId || ''
}

// 选择批次后自动填充
const handleBatchChange = async (batchId) => {
  if (!batchId) return
  const batch = approvedBatches.value.find(b => b.id === batchId)
  if (!batch) return

  // 尝试获取详情以取得更完整的数据
  try {
    const res = await getC1BreedingBatchById(batchId)
    if (res.data) {
      fillFromBatch(res.data)
      return
    }
  } catch (e) { console.error(e) }

  // fallback 用列表中的数据
  fillFromBatch(batch)
}

// 选择组织后联动 farmId
const handleOrgChange = (orgId) => {
  formData.value.farmId = orgId || ''
}

const loadDetail = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getMultiplierReport(route.params.id)
    if (res.code === 200 && res.data) {
      Object.keys(formData.value).forEach(key => {
        if (res.data[key] !== undefined) formData.value[key] = res.data[key]
      })
    }
  } catch (e) {
    ElMessage.error(t('research.multiplierReport.loadError'))
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  submitting.value = true
  try {
    if (isEdit.value) {
      await updateMultiplierReport({ ...formData.value, id: route.params.id })
      ElMessage.success(t('research.multiplierReport.updateSuccess'))
    } else {
      await addMultiplierReport(formData.value)
      ElMessage.success(t('research.multiplierReport.addSuccess'))
    }
    goBack()
  } catch (e) {
    ElMessage.error(t('common.submitFailed'))
  } finally {
    submitting.value = false
  }
}

const goBack = () => router.back()

onMounted(() => {
  loadOrganizations()
  loadDistributions()
  loadCertifications()
  if (!isEdit.value) {
    loadApprovedBatches()
  }
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

:deep(.el-form-item__label) {
  white-space: normal !important;
  line-height: 1.2 !important;
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
}

.batch-selector-section {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  border-radius: 12px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-hint {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
}

.batch-select {
  width: 100%;
}

.batch-option {
  display: flex;
  align-items: center;
  gap: 8px;

  .batch-name {
    font-weight: 600;
    color: #303133;
  }

  .batch-variety {
    color: #606266;
    font-size: 13px;
  }

  .el-tag {
    margin-left: auto;
  }
}
</style>
