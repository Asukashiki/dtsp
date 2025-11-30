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
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.farming.form.basicInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.batchId')">{{ detailData.batchId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.trialId')">{{ detailData.trialId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.operationType')">{{ detailData.operationType }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.operationTime')">{{ detailData.operationTime }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card" v-if="detailData.operationType === 'fertilizer'">
          <div class="card-header">
            <div class="card-title"><i class="ri-flask-line"></i><span>{{ $t('research.breedingData.farming.form.fertilizerInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.fertilizerType')">{{ detailData.fertilizerType }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.fertilizerAmount')">{{ detailData.fertilizerAmount }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card" v-if="detailData.operationType === 'irrigation'">
          <div class="card-header">
            <div class="card-title"><i class="ri-water-flash-line"></i><span>{{ $t('research.breedingData.farming.form.irrigationInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.irrigationMethod')">{{ detailData.irrigationMethod }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card" v-if="detailData.operationType === 'pest_control'">
          <div class="card-header">
            <div class="card-title"><i class="ri-bug-line"></i><span>{{ $t('research.breedingData.farming.form.pesticideInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.pesticideType')">{{ detailData.pesticideType }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.pesticideDosage')">{{ detailData.pesticideDosage }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card" v-if="detailData.operationDesc">
          <div class="card-header">
            <div class="card-title"><i class="ri-file-text-line"></i><span>{{ $t('research.breedingData.farming.form.descInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="1" border>
              <el-descriptions-item :label="$t('research.breedingData.farming.form.operationDesc')">{{ detailData.operationDesc }}</el-descriptions-item>
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
@import '@/assets/styles/page-common.scss';
</style>
