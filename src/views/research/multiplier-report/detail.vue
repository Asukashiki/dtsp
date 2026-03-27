<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.multiplierReport.detail') }}</h1>
          </div>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit" v-if="detailData">
            <i class="ri-edit-line"></i> {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.multiplierReport.basicInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.multiplierReport.reportDate')">{{ detailData.reportDate || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.multiplierId')">{{ detailData.multiplierId || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.distributionId')">{{ detailData.distributionId || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.certificateId')">{{ detailData.certificateId || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.seedClassReceived')">
                  <el-tag size="small">{{ detailData.seedClassReceived || '-' }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.farmId')">{{ detailData.farmId || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.cropType')">{{ getLabelByValue('crop_type', detailData.cropType) }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.varietyName')">{{ detailData.varietyName || '-' }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-plant-line"></i><span>{{ $t('research.multiplierReport.productionInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.multiplierReport.areaPlantedHa')">{{ detailData.areaPlantedHa || '-' }} ha</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.plantingDate')">{{ detailData.plantingDate || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.harvestDate')">{{ detailData.harvestDate || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.producedSeedQuantity')">{{ detailData.producedSeedQuantity || '-' }} qt</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.rejectedQuantity')">{{ detailData.rejectedQuantity || '-' }} qt</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-test-tube-line"></i><span>{{ $t('research.multiplierReport.qualityInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.multiplierReport.germinationRate')">{{ detailData.germinationRate != null ? detailData.germinationRate + '%' : '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.multiplierReport.moistureContent')">{{ detailData.moistureContent != null ? detailData.moistureContent + '%' : '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('common.remarks')" :span="2">{{ detailData.remark || '-' }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getMultiplierReport } from '@/api/multiplierReport'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { getLabelByValue } = useDict(['crop_type'])

const loading = ref(false)
const detailData = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const res = await getMultiplierReport(route.params.id)
    if (res.code === 200 && res.data) detailData.value = res.data
  } catch (e) {
    ElMessage.error(t('research.multiplierReport.loadError'))
  } finally {
    loading.value = false
  }
})

const goBack = () => router.back()
const handleEdit = () => router.push(`/research/multiplier-report/edit/${route.params.id}`)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
