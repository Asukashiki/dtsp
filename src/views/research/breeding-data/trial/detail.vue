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
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.trial.form.basicInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.trialId')">{{ detailData.trialId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.trialName')">{{ detailData.trialName }}</el-descriptions-item>
              <el-descriptions-item label="Batch Id">{{ detailData.batchId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.cropType')">{{ detailData.cropType }}</el-descriptions-item>
              <el-descriptions-item label="Variety Code">{{ detailData.varietyCode }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.varietyName')">{{ detailData.varietyName }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.locationId')">{{ detailData.locationId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.year')">{{ detailData.year }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.season')">{{ detailData.season }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.gpsLocation')">{{ detailData.gpsLocation }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.designType')">{{ detailData.designType }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.replications')">{{ detailData.replications }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.createdName')">{{ detailData.createdName || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.createTime')">{{ detailData.createTime || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.modifiedName')">{{ detailData.modifiedName || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.updateTime')">{{ detailData.updateTime || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.approvedName')">{{ detailData.approvedName || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trial.form.approvedTime')">{{ detailData.approvedTime || '-' }}</el-descriptions-item>
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
import { getTrialBasicInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getTrialBasicInfo(route.params.trialId)
    detailData.value = res.data || {}
  } finally {
    loading.value = false
  }
}

const goBack = () => router.push('/research/breeding-data/trial')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
