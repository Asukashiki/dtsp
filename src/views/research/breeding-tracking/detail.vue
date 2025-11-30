<template>
  <div class="breeding-tracking-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('research.breeding.breedingTracking.detail') }}</h1>
        </div>
      </div>
    </div>

    <!-- 详情内容 -->
    <div class="detail-wrapper" v-if="detail">
      <div class="detail-content">
        <!-- 基本信息 -->
        <div class="detail-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('research.breeding.breedingTracking.form.basicInfo') }}</h3>
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.trackingId') }}:</span>
              <span class="value">{{ detail.trackingId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.batchId') }}:</span>
              <span class="value">{{ detail.batchId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.cropType') }}:</span>
              <span class="value">{{ detail.cropTypeName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.stageName') }}:</span>
              <span class="value">{{ detail.stageNameText }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.trackingResult') }}:</span>
              <span class="value">
                <el-tag :type="getResultTagType(detail.trackingResult)">{{ detail.resultText }}</el-tag>
              </span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.location') }}:</span>
              <span class="value">{{ detail.location }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.startDate') }}:</span>
              <span class="value">{{ formatDate(detail.startDate) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.completeDate') }}:</span>
              <span class="value">{{ formatDate(detail.completeDate) }}</span>
            </div>
          </div>
        </div>

        <!-- 产量信息 -->
        <div class="detail-block">
          <div class="block-header">
            <i class="ri-bar-chart-line"></i>
            <h3>{{ $t('research.breeding.breedingTracking.form.yieldInfo') }}</h3>
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.expectedYield') }}:</span>
              <span class="value">{{ detail.expectedYield }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.actualYield') }}:</span>
              <span class="value">{{ detail.actualYield }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.fieldInspectionScore') }}:</span>
              <span class="value">{{ detail.fieldInspectionScore }}</span>
            </div>
          </div>
        </div>

        <!-- GPS坐标 -->
        <div class="detail-block">
          <div class="block-header">
            <i class="ri-map-pin-line"></i>
            <h3>{{ $t('research.breeding.breedingTracking.form.gpsInfo') }}</h3>
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.gpsLongitude') }}:</span>
              <span class="value">{{ detail.gpsLongitude }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.gpsLatitude') }}:</span>
              <span class="value">{{ detail.gpsLatitude }}</span>
            </div>
          </div>
        </div>

        <!-- 病害观察 -->
        <div class="detail-block">
          <div class="block-header">
            <i class="ri-file-text-line"></i>
            <h3>{{ $t('research.breeding.breedingTracking.form.diseaseInfo') }}</h3>
          </div>
          <div class="detail-text">
            {{ detail.diseaseObservation || $t('common.noData') }}
          </div>
        </div>

        <!-- 机构信息 -->
        <div class="detail-block">
          <div class="block-header">
            <i class="ri-building-line"></i>
            <h3>{{ $t('research.breeding.breedingTracking.form.orgInfo') }}</h3>
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.orgId') }}:</span>
              <span class="value">{{ detail.orgId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTracking.form.orgName') }}:</span>
              <span class="value">{{ detail.orgName }}</span>
            </div>
          </div>
        </div>

        <!-- 备注 -->
        <div class="detail-block" v-if="detail.remark">
          <div class="block-header">
            <i class="ri-file-text-line"></i>
            <h3>{{ $t('common.remarks') }}</h3>
          </div>
          <div class="detail-text">
            {{ detail.remark }}
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="detail-actions">
          <el-button @click="goBack">{{ $t('common.back') }}</el-button>
          <el-button type="primary" @click="handleEdit">{{ $t('common.edit') }}</el-button>
        </div>
      </div>
    </div>

    <!-- 加载中 -->
    <div v-else class="loading-wrapper">
      <el-skeleton :rows="5" animated />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBreedingTrackingPageDetail } from '@/api/breeding'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const detail = ref(null)

const stageNameMap = computed(() => ({
  '01': t('research.breeding.breedingTracking.stage.parentPrep'),
  '02': t('research.breeding.breedingTracking.stage.original'),
  '03': t('research.breeding.breedingTracking.stage.foundation'),
  '04': t('research.breeding.breedingTracking.stage.certified')
}))

const resultMap = computed(() => ({
  '01': t('research.breeding.breedingTracking.result.normal'),
  '02': t('research.breeding.breedingTracking.result.abnormal'),
  '03': t('research.breeding.breedingTracking.result.observing')
}))

const resultTypeMap = {
  '01': 'success',
  '02': 'danger',
  '03': 'warning'
}

const cropTypeMap = computed(() => ({
  'WHEAT': t('research.breeding.breedingTracking.cropType.wheat'),
  'CORN': t('research.breeding.breedingTracking.cropType.corn'),
  'RICE': t('research.breeding.breedingTracking.cropType.rice'),
  'SOYBEAN': t('research.breeding.breedingTracking.cropType.soybean'),
  'COTTON': t('research.breeding.breedingTracking.cropType.cotton')
}))

onMounted(async () => {
  await loadDetail()
})

const loadDetail = async () => {
  try {
    const response = await getBreedingTrackingPageDetail(route.params.id)
    if (response.code === 200 && response.data) {
      const data = response.data
      detail.value = {
        ...data,
        stageNameText: stageNameMap.value[data.stageName] || data.stageName,
        resultText: resultMap.value[data.trackingResult] || data.trackingResult,
        cropTypeName: cropTypeMap.value[data.cropType] || data.cropType
      }
    } else {
      ElMessage.error(t('research.breeding.breedingTracking.loadError'))
    }
  } catch (error) {
    ElMessage.error(t('research.breeding.breedingTracking.loadError'))
    console.error(error)
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString()
}

const getResultTagType = (result) => {
  return resultTypeMap[result] || 'info'
}

const handleEdit = () => {
  router.push({
    name: 'BreedingTrackingEdit',
    params: { id: route.params.id }
  })
}

const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.breeding-tracking-detail-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 8px;
  color: white;

  .header-content {
    width: 100%;
    display: flex;
    align-items: center;

    .header-left {
      margin-right: auto;
    }

    .header-center {
      flex: 1;
      text-align: center;

      .page-title {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
}

.detail-wrapper {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .detail-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .detail-block {
    margin-bottom: 30px;

    &:last-of-type {
      margin-bottom: 0;
    }

    .block-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #009A44;

      i {
        font-size: 20px;
        color: #009A44;
        margin-right: 10px;
      }

      h3 {
        margin: 0;
        font-size: 16px;
        color: #333;
        font-weight: 600;
      }
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .detail-item {
        display: flex;
        flex-direction: column;

        .label {
          font-weight: 600;
          color: #666;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .value {
          color: #333;
          font-size: 15px;
          line-height: 1.5;
          word-break: break-word;
        }
      }
    }

    .detail-text {
      padding: 15px;
      background: #f9f9f9;
      border-left: 3px solid #009A44;
      color: #333;
      font-size: 15px;
      line-height: 1.6;
      word-break: break-word;
      white-space: pre-wrap;
    }
  }

  .detail-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #f0f0f0;

    button {
      min-width: 120px;
    }
  }
}

.loading-wrapper {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
