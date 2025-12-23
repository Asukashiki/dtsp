<template>
  <div class="detail-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-file-list-3-line"></i>
          <span>{{ $t('research.breeding.seed.production.result.title') }}</span>
        </div>
        <el-button @click="$emit('close')">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <div class="card-body" v-loading="loading">
        <div class="section">
          <h3 class="section-title">{{ $t('research.breeding.seed.production.section.productionBatchSelection') }}</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.breeding.seed.production.columns.produceBatchId')">
              {{ detail.produceBatchId || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.production.columns.produceBatchName')">
              {{ detail.produceBatchName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.production.columns.varietyName')">
              {{ detail.varietyName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.production.columns.breedBatchName')">
              {{ detail.breedBatchName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.production.form.trialName')">
              {{ detail.trialName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.production.form.fromSeedLevel')">
              {{ detail.fromSeedLevel || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.production.form.toSeedLevel')">
              {{ detail.toSeedLevel || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        
        <div class="section" style="margin-top: 24px;">
          <h3 class="section-title">{{ $t('research.breeding.seed.production.section.collectionData') }}</h3>
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.breeding.seed.production.columns.produceSeedQuantrity')">
              {{ detail.producedAmount }} kg
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.production.form.time')">
              {{ detail.collectionDate }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.production.columns.operatorName')">
              {{ detail.operator }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.createTime')">
              {{ detail.createTime }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBreedSeedProduceResult } from '@/api/breedSeed'

const props = defineProps({
  resultId: {
    type: String,
    required: true
  }
})

defineEmits(['close'])

const loading = ref(true)
const detail = ref({})

const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getBreedSeedProduceResult(props.resultId)
    if (res.code === 200) {
      detail.value = res.data
    }
  } catch (error) {
    console.error(error)
  } finally {
     loading.value = false
  }
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.detail-container {
  padding: 20px 0;
}

.info-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
}

.card-title i {
  font-size: 20px;
}

.card-body {
  padding: 30px 24px;
}

.section-title {
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
</style>
