<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.trait.detail') }}</h1>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="handleEdit"><i class="ri-edit-line"></i>{{ $t('common.edit') }}</el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <!-- Basic Information -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>Basic Information</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="Trait Record ID">{{ detailData.traitRecordId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Plot ID">{{ detailData.plotId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Trial ID">{{ detailData.trialId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Batch ID">{{ detailData.batchId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Observation Date">{{ detailData.observationDate || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Growth Stage">{{ detailData.growthStage || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Trait Code">{{ detailData.traitCode || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Trait Name">{{ detailData.traitName || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Trait Value">{{ detailData.traitValue || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Unit">{{ detailData.unit || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Observer ID">{{ detailData.observerId || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Morphological -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-ruler-line"></i><span>{{ $t('research.breedingData.trait.form.morphological') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.trait.form.plantHeightCm')">{{ detailData.plantHeightCm || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trait.form.tillerCount')">{{ detailData.tillerCount || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trait.form.spikeLengthCm')">{{ detailData.spikeLengthCm || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Growth Period -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-calendar-line"></i><span>{{ $t('research.breedingData.trait.form.growthPeriod') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.trait.form.daysToEmergence')">{{ detailData.daysToEmergence || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trait.form.daysToTillering')">{{ detailData.daysToTillering || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.trait.form.daysToHeading')">{{ detailData.daysToHeading || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Photo Information -->
        <div class="info-card" v-if="detailData.photoUrl">
          <div class="card-header">
            <div class="card-title"><i class="ri-image-line"></i><span>{{ $t('research.breedingData.trait.form.photoInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="1" border>
              <el-descriptions-item :label="$t('research.breedingData.trait.form.photoUrl')">
                <el-image :src="detailData.photoUrl" fit="contain" style="width: 200px; height: 150px" :preview-src-list="[detailData.photoUrl]" />
              </el-descriptions-item>
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
import { getAgronomicTraitInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getAgronomicTraitInfo(route.params.traitId)
    detailData.value = res.data || {}
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/trait/edit/${route.params.traitId}`)
const goBack = () => router.push('/research/breeding-data/trait')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
