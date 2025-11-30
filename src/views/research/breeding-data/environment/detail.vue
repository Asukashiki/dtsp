<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.environment.detail') }}</h1>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="handleEdit"><i class="ri-edit-line"></i>{{ $t('common.edit') }}</el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.environment.form.basicInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.batchId')">{{ detailData.batchId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.trialId')">{{ detailData.trialId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.groundId')">{{ detailData.groundId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.dataType')">{{ detailData.dataType }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.collectTime')">{{ detailData.collectTime }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.dataSource')">{{ detailData.dataSource }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card" v-if="detailData.dataType === 'soil'">
          <div class="card-header">
            <div class="card-title"><i class="ri-landscape-line"></i><span>{{ $t('research.breedingData.environment.form.soilData') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.soilPh')">{{ detailData.soilPh }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.soilTemperature')">{{ detailData.soilTemperature }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.soilMoisture')">{{ detailData.soilMoisture }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card" v-if="detailData.dataType === 'climate'">
          <div class="card-header">
            <div class="card-title"><i class="ri-temp-hot-line"></i><span>{{ $t('research.breedingData.environment.form.climateData') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.airTemperature')">{{ detailData.airTemperature }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.airHumidity')">{{ detailData.airHumidity }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.rainfall')">{{ detailData.rainfall }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card" v-if="detailData.dataType === 'water'">
          <div class="card-header">
            <div class="card-title"><i class="ri-drop-line"></i><span>{{ $t('research.breedingData.environment.form.waterData') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.environment.form.waterPh')">{{ detailData.waterPh }}</el-descriptions-item>
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
import { getEnvironmentDataInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getEnvironmentDataInfo(route.params.envId)
    detailData.value = res.data || {}
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/environment/edit/${route.params.envId}`)
const goBack = () => router.push('/research/breeding-data/environment')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@import '@/assets/styles/page-common.scss';
</style>
