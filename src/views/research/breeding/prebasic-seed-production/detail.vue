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
            <h1 class="page-title">{{ $t('prebasicSeedProduction.detail') }}</h1>
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
              <span>{{ $t('prebasicSeedProduction.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.produceBatchId')">
                {{ detail.produceBatchId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.produceBatchName')">
                {{ detail.produceBatchName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.breederSeedBatchName')">
                {{ detail.breederSeedBatchName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.breedBatchName')">
                {{ detail.breedBatchName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.trialName')">
                {{ detail.trialName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.varietyName')">
                {{ detail.varietyName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.cropType')">
                {{ getCropTypeDisplay(detail.cropType) }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.time')">
                {{ detail.time || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.landName')">
                {{ detail.landName || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 生产信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-plant-line"></i>
              <span>{{ $t('prebasicSeedProduction.form.productionInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.inputSeedQuantity')">
                {{ detail.inputSeedQuantity }} kg
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.produceSeedQuantity')">
                {{ detail.produceSeedQuantity ? detail.produceSeedQuantity + ' kg' : '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.fromSeedLevel')">
                {{ detail.fromSeedLevel || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.toSeedLevel')">
                {{ detail.toSeedLevel || '-' }}
              </el-descriptions-item>
               <el-descriptions-item :label="$t('prebasicSeedProduction.columns.produceStatus')">
                 <el-tag 
                   :type="detail.produceStatus === 'Finished' ? 'success' : detail.produceStatus === 'Ongoing' ? 'warning' : 'info'">
                  {{ detail.produceStatus || '-' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.createTime')">
                {{ detail.createTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProduction.columns.updateTime')">
                {{ detail.updateTime || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 生产结果卡片 -->
        <div class="info-card" v-if="detail.produceStatus === 'Finished'">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-bar-chart-line"></i>
              <span>{{ $t('prebasicSeedProductionResult.title') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div v-if="resultData">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('prebasicSeedProductionResult.columns.collectionDate')">
                  {{ resultData.collectionDate || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('prebasicSeedProductionResult.form.outputQuantity')">
                  {{ resultData.outputQuantity }} kg
                </el-descriptions-item>
                <el-descriptions-item :label="$t('prebasicSeedProductionResult.form.operator')">
                  {{ resultData.operator || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div v-else>
              <el-empty :description="$t('common.noData')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useDict } from '@/hooks/useDict'
import { getPrebasicSeedProduceDetail, getPrebasicSeedProduceResultList } from '@/api/prebasicSeed'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])
const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

const loading = ref(true)
const detail = ref({})
const resultData = ref(null)

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getPrebasicSeedProduceDetail(route.params.id)
    if (res.code === 200) {
      detail.value = res.data
      // 如果生产状态是已完成，加载生产结果
      if (res.data.produceStatus === 'Finished') {
        loadResult()
      }
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
      router.back()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    router.back()
  } finally {
    loading.value = false
  }
}

// 加载生产结果
const loadResult = async () => {
  try {
    const res = await getPrebasicSeedProduceResultList({
      produceBatchId: route.params.id,
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
  router.back()
}

onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
