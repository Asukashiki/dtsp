<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.farming.detail') }}</h1>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="handleEdit"><i class="ri-edit-line"></i>{{ $t('common.edit') }}</el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>Farming Record Information</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="Farming Record ID">{{ detailData.farmingRecordId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Plot ID">{{ detailData.plotId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Trial ID">{{ detailData.trialId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Batch ID">{{ detailData.batchId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Activity Date">{{ detailData.activityDate || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Activity Type">{{ detailData.activityType || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Input Name">{{ detailData.inputName || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Quantity">{{ detailData.quantity ? `${detailData.quantity} ${detailData.unit || ''}` : '-' }}</el-descriptions-item>
              <el-descriptions-item label="Operator ID">{{ detailData.operatorId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Operation Description" :span="2">{{ detailData.operationDesc || '-' }}</el-descriptions-item>
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
import { getFarmingRecordInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getFarmingRecordInfo(route.params.farmingId)
    detailData.value = res.data || {}
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/farming/edit/${route.params.farmingId}`)
const goBack = () => router.push('/research/breeding-data/farming')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
