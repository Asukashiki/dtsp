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
        <!-- Plot Basic Information -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>Plot Basic Information</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="Plot ID">{{ detailData.plotId }}</el-descriptions-item>
              <el-descriptions-item label="Trial ID">{{ detailData.trialId }}</el-descriptions-item>
              <el-descriptions-item label="Batch ID">{{ detailData.batchId }}</el-descriptions-item>
              <el-descriptions-item label="Replication No">{{ detailData.replicationNo }}</el-descriptions-item>
              <el-descriptions-item label="Row No">{{ detailData.rowNo }}</el-descriptions-item>
              <el-descriptions-item label="Column No">{{ detailData.columnNo }}</el-descriptions-item>
              <el-descriptions-item label="Variety Code">{{ detailData.varietyCode }}</el-descriptions-item>
              <el-descriptions-item label="Plot Area (m²)">{{ detailData.plotAreaM2 || '-' }}</el-descriptions-item>
              <el-descriptions-item label="GPS Latitude">{{ detailData.gpsLat || '-' }}</el-descriptions-item>
              <el-descriptions-item label="GPS Longitude">{{ detailData.gpsLong || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Sowing Information -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-seedling-line"></i><span>Sowing Information</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="Seed Quantity (kg)">{{ detailData.seedQuantity || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Sowing Method">{{ detailData.sowingMethod || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Sowing Time">{{ detailData.sowingTime || '-' }}</el-descriptions-item>
            </el-descriptions>
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
const detailData = ref({})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getPlotInfo(route.params.plotId)
    detailData.value = res.data || {}
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/plot/edit/${route.params.plotId}`)
const goBack = () => router.push('/research/breeding-data/plot')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
