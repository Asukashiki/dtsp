<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('basicSeedProduction.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('basicSeedProduction.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.produceBatchId')">
                {{ data.produceBatchId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.produceBatchName')">
                {{ data.produceBatchName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.prebasicSeedBatchName')">
                {{ data.prebasicSeedBatchName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.breedBatchName')">
                {{ data.breedBatchName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.trialName')">
                {{ data.trialName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.varietyName')">
                {{ data.varietyName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.cropType')">
                {{ getCropTypeDisplay(data.cropType) }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.landName')">
                {{ data.landName }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 生产信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-plant-line"></i>
              <span>{{ $t('basicSeedProduction.form.productionInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.inputSeedQuantity')">
                {{ data.inputSeedQuantity }} kg
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.produceSeedQuantity')">
                {{ data.produceSeedQuantity ? data.produceSeedQuantity + ' kg' : '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.fromSeedLevel')">
                {{ data.fromSeedLevel }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.toSeedLevel')">
                {{ data.toSeedLevel }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.produceStatus')">
                <el-tag 
                  :type="data.produceStatus === 'Finished' ? 'success' : data.produceStatus === 'Ongoing' ? 'warning' : 'info'">
                  {{ data.produceStatus }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.createTime')">
                {{ data.createTime }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('basicSeedProduction.columns.updateTime')">
                {{ data.updateTime }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 生产结果卡片 -->
        <div class="info-card" v-if="data.produceStatus === 'Finished'">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-bar-chart-line"></i>
              <span>{{ $t('basicSeedProductionResult.title') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div v-if="resultData">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('basicSeedProductionResult.columns.collectionDate')">
                  {{ resultData.collectionDate }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('basicSeedProductionResult.form.outputQuantity')">
                  {{ resultData.outputQuantity }} kg
                </el-descriptions-item>
                <el-descriptions-item :label="$t('basicSeedProductionResult.form.operator')">
                  {{ resultData.operator }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div v-else class="no-result">
              <el-empty :description="$t('common.noData')" />
            </div>
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

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])
const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

const loading = ref(false)
const resultData = ref(null)

// 加载生产结果
const loadResult = async () => {
  if (props.data.produceStatus !== 'Finished') {
    return
  }

  loading.value = true
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
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  emit('back')
}

onMounted(() => {
  loadResult()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

.no-result {
  padding: 20px;
  text-align: center;
}
</style>
