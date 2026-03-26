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
                    <el-input v-model="formData.multiplierId" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.distributionId')" prop="distributionId">
                    <el-input v-model="formData.distributionId" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.multiplierReport.certificateId')">
                    <el-input v-model="formData.certificateId" :placeholder="$t('common.pleaseInput')" />
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
                    <el-input v-model="formData.farmId" :placeholder="$t('common.pleaseInput')" />
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

const formData = ref({
  reportDate: '', multiplierId: '', distributionId: '', certificateId: '',
  seedClassReceived: '', farmId: '', cropType: '', varietyName: '',
  areaPlantedHa: null, plantingDate: '', harvestDate: '',
  producedSeedQuantity: null, rejectedQuantity: null,
  germinationRate: null, moistureContent: null, remark: ''
})

const rules = computed(() => ({
  reportDate: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  multiplierId: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
  distributionId: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
  seedClassReceived: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  cropType: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  varietyName: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
  areaPlantedHa: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }],
  plantingDate: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }]
}))

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
onMounted(() => loadDetail())
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
</style>
