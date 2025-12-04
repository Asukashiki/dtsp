<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.batch.detail') }}</h1>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="handleEdit"><i class="ri-edit-line"></i>{{ $t('common.edit') }}</el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.batch.form.basicInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.batchId')">{{ detailData.batchId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.cropType')">{{ detailData.cropType }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.varietyCode')">{{ detailData.varietyCode }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.varietyName')">{{ detailData.varietyName }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.breedingMethod')">{{ detailData.breedingMethod }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.batchName')">{{ detailData.batchName }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.year')">{{ detailData.year }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.status')">{{ detailData.status }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.remarks')" :span="2">{{ detailData.remarks || '-' }}</el-descriptions-item>
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
import { getBreedingBatchInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getBreedingBatchInfo(route.params.dataId)
    detailData.value = res.data || {}
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/batch/edit/${route.params.dataId}`)
const goBack = () => router.push('/research/breeding-data/batch')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
