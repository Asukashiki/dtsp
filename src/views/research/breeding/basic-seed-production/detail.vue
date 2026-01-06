<template>
  <div class="detail-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-file-info-line"></i>
          <span>{{ $t('basicSeedProduction.detail') }}</span>
        </div>
        <el-button @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <div class="card-body">
        <!-- 鍩虹淇℃伅 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('basicSeedProduction.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.produceBatchId') }}:</span>
              <span class="value">{{ data.produceBatchId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.produceBatchName') }}:</span>
              <span class="value">{{ data.produceBatchName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.prebasicSeedBatchName') }}:</span>
              <span class="value">{{ data.prebasicSeedBatchName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.breedBatchName') }}:</span>
              <span class="value">{{ data.breedBatchName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.trialName') }}:</span>
              <span class="value">{{ data.trialName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.varietyName') }}:</span>
              <span class="value">{{ data.varietyName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.cropType') }}:</span>
              <span class="value">{{ getLabelByValue('crop_type', data.cropType) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.time') }}:</span>
              <span class="value">{{ data.time }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.landName') }}:</span>
              <span class="value">{{ data.landName }}</span>
            </div>
          </div>
        </div>

        <!-- 鐢熶骇淇℃伅 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('basicSeedProduction.form.productionInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.inputSeedQuantity') }}:</span>
              <span class="value">{{ data.inputSeedQuantity }} kg</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.produceSeedQuantity') }}:</span>
              <span class="value">{{ data.produceSeedQuantity ? data.produceSeedQuantity + ' kg' : '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.fromSeedLevel') }}:</span>
              <span class="value">{{ data.fromSeedLevel }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.toSeedLevel') }}:</span>
              <span class="value">{{ data.toSeedLevel }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.operatorName') }}:</span>
              <span class="value">{{ data.operatorName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.produceStatus') }}:</span>
              <el-tag 
                :type="data.produceStatus === 'Finished' ? 'success' : data.produceStatus === 'Ongoing' ? 'warning' : 'info'"
              >
                {{ data.produceStatus }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.createTime') }}:</span>
              <span class="value">{{ data.createTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProduction.columns.updateTime') }}:</span>
              <span class="value">{{ data.updateTime }}</span>
            </div>
          </div>
        </div>

        <!-- 鐢熶骇缁撴灉 -->
        <div class="detail-section" v-if="data.produceStatus === 'Finished'">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('basicSeedProductionResult.title') }}
          </div>
          <div v-if="resultData" class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.columns.collectionDate') }}:</span>
              <span class="value">{{ resultData.collectionDate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.form.outputQuantity') }}:</span>
              <span class="value">{{ resultData.outputQuantity }} kg</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.form.operator') }}:</span>
              <span class="value">{{ resultData.operator }}</span>
            </div>
          </div>
          <div v-else class="no-result">
            <el-empty :description="$t('common.noData')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDict } from '@/hooks/useDict'
import { getBasicSeedProduceResultList } from '@/api/basicSeed'

const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'refresh'])

// 浣跨敤 useDict hook 鑾峰彇瀛楀吀鏁版嵁
const { getLabelByValue } = useDict(['crop_type'])

const resultData = ref(null)

// 鍔犺浇鐢熶骇缁撴灉
const loadResult = async () => {
  if (props.data.produceStatus !== 'Finished') {
    return
  }

  try {
    const res = await getBasicSeedProduceResultList({
      produceBatchId: props.data.produceBatchId,
      pageNum: 1,
      pageSize: 1
    })
    if (res.code === 200 && res.rows && res.rows.length > 0) {
      resultData.value = res.rows[0]
    }
  } catch (error) {
    console.error('Failed to load result:', error)
  }
}

const handleBack = () => {
  emit('back')
}

onMounted(() => {
  loadResult()
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

.detail-section {
  margin-bottom: 30px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  border-left: 4px solid #009A44;
  margin-bottom: 20px;
  border-radius: 4px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item .label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.detail-item .value {
  font-size: 15px;
  color: #333;
}

.no-result {
  padding: 20px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
