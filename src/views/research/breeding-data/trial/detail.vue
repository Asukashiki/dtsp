<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.trial.detail') }}</h1>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="handleEdit"><i class="ri-edit-line"></i>{{ $t('common.edit') }}</el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.trial.form.basicInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.batchId')">{{ detailData.batchId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.trialName')">{{ detailData.trialName }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.cropType')">{{ detailData.cropType }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.varietyName')">{{ detailData.varietyName }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.startDate')">{{ detailData.startDate }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.season')">{{ detailData.season }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-building-line"></i><span>{{ $t('research.breedingData.trial.form.organizationInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.researchCenterId')">{{ detailData.researchCenterId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.projectId')">{{ detailData.projectId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.subProjectId')">{{ detailData.subProjectId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.themeFieldId')">{{ detailData.themeFieldId }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-map-pin-line"></i><span>{{ $t('research.breedingData.trial.form.locationInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.region')">{{ detailData.region }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.zone')">{{ detailData.zone }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.woreda')">{{ detailData.woreda }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.kebele')">{{ detailData.kebele }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.agriculturalEcoZone')" :span="2">{{ detailData.agriculturalEcoZone || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.gpsLocation')" :span="2">{{ detailData.gpsLocation }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-file-code-line"></i><span>{{ $t('research.breedingData.trial.form.codeInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.activityCode')">{{ detailData.activityCode || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.kpiCode')">{{ detailData.kpiCode || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card" v-if="detailData.plotList && detailData.plotList.length > 0">
          <div class="card-header">
            <div class="card-title"><i class="ri-map-2-line"></i><span>{{ $t('research.breedingData.trial.form.plotList') }}</span></div>
          </div>
          <div class="card-body">
            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="detailData.plotList" border>
                <el-table-column type="index" :label="$t('common.index')" width="60" />
                <el-table-column prop="trialFieldName" :label="$t('research.breedingData.plot.form.trialFieldName')" min-width="140" />
                <el-table-column prop="gpsLocation" :label="$t('research.breedingData.plot.form.gpsLocation')" min-width="160" />
                <el-table-column prop="region" :label="$t('research.breedingData.plot.form.region')" min-width="100" />
              </el-table>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="(item, index) in detailData.plotList" :key="index" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-map-pin-line"></i>
                    <span>{{ item.trialFieldName }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.form.gpsLocation') }}:</span>
                    <span class="value">{{ item.gpsLocation }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.form.region') }}:</span>
                    <span class="value">{{ item.region }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTrialBasicInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({ plotList: [] })

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getTrialBasicInfo(route.params.trialId)
    detailData.value = res.data || { plotList: [] }
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/trial/edit/${route.params.trialId}`)
const goBack = () => router.push('/research/breeding-data/trial')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@import '@/assets/styles/page-common.scss';

.mobile-card-list {
  .mobile-card {
    margin-bottom: 16px;
  }
}
</style>
