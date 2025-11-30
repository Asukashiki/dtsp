<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.plot.detail') }}</h1>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="handleEdit"><i class="ri-edit-line"></i>{{ $t('common.edit') }}</el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.plot.form.basicInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.trialFieldName')">{{ detailData.trialFieldName }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.batchId')">{{ detailData.batchId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.trialId')">{{ detailData.trialId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.startDate')">{{ detailData.startDate }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.season')">{{ detailData.season }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.gpsLocation')">{{ detailData.gpsLocation }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-building-line"></i><span>{{ $t('research.breedingData.plot.form.organizationInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.researchCenterId')">{{ detailData.researchCenterId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.programId')">{{ detailData.programId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.subProgramId')">{{ detailData.subProgramId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.researchFieldId')">{{ detailData.researchFieldId }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-map-pin-line"></i><span>{{ $t('research.breedingData.plot.form.locationInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.region')">{{ detailData.region }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.zone')">{{ detailData.zone }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.woreda')">{{ detailData.woreda }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.kebele')">{{ detailData.kebele }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.agriculturalEcoZone')" :span="2">{{ detailData.agriculturalEcoZone || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-file-code-line"></i><span>{{ $t('research.breedingData.plot.form.codeInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.activityCode')">{{ detailData.activityCode || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.plot.form.kpiCode')">{{ detailData.kpiCode || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-seedling-line"></i><span>{{ $t('research.breedingData.plot.form.sowingInfo') }}</span></div>
          </div>
          <div class="card-body">
            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="detailData.sowingList" border>
                <el-table-column type="index" :label="$t('common.index')" width="60" />
                <el-table-column prop="seedQuantity" :label="$t('research.breedingData.plot.sowing.seedQuantity')" min-width="120" />
                <el-table-column prop="sowingMethod" :label="$t('research.breedingData.plot.sowing.sowingMethod')" min-width="120" />
                <el-table-column prop="sowingTime" :label="$t('research.breedingData.plot.sowing.sowingTime')" min-width="160" />
              </el-table>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="(item, index) in detailData.sowingList" :key="index" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-seedling-line"></i>
                    <span>{{ $t('research.breedingData.plot.sowingRecord') }} {{ index + 1 }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.sowing.seedQuantity') }}:</span>
                    <span class="value">{{ item.seedQuantity }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.sowing.sowingMethod') }}:</span>
                    <span class="value">{{ item.sowingMethod }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.sowing.sowingTime') }}:</span>
                    <span class="value">{{ item.sowingTime }}</span>
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
import { getPlotInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({ sowingList: [] })

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getPlotInfo(route.params.groundId)
    detailData.value = res.data || { sowingList: [] }
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/plot/edit/${route.params.groundId}`)
const goBack = () => router.push('/research/breeding-data/plot')

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
