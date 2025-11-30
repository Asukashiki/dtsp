<template>
  <div class="breeding-test-detail-page">
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
          <h1 class="page-title">{{ $t('research.breeding.breedingTest.detail') }}</h1>
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
            <h3>{{ $t('research.breeding.breedingTest.form.basicInfo') }}</h3>
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.testId') }}:</span>
              <span class="value">{{ detail.testId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.trackingId') }}:</span>
              <span class="value">{{ detail.trackingId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.batchId') }}:</span>
              <span class="value">{{ detail.batchId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.cropType') }}:</span>
              <span class="value">{{ detail.cropTypeName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.testDate') }}:</span>
              <span class="value">{{ formatDate(detail.testDate) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.testOrg') }}:</span>
              <span class="value">{{ detail.testOrg }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.testPerson') }}:</span>
              <span class="value">{{ detail.testPerson }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.testResult') }}:</span>
              <span class="value">
                <el-tag :type="getResultTagType(detail.testResult)">{{ detail.resultText }}</el-tag>
              </span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.testReportUrl') }}:</span>
              <span class="value">
                <a v-if="detail.testReportUrl" :href="detail.testReportUrl" target="_blank" class="link">{{ $t('common.download') }}</a>
                <span v-else>-</span>
              </span>
            </div>
          </div>
        </div>

        <!-- 检测指标 -->
        <div class="detail-block">
          <div class="block-header">
            <i class="ri-bar-chart-line"></i>
            <h3>{{ $t('research.breeding.breedingTest.form.testIndicators') }}</h3>
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.germinationRate') }}:</span>
              <span class="value">{{ detail.germinationRate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.purity') }}:</span>
              <span class="value">{{ detail.purity }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.moistureContent') }}:</span>
              <span class="value">{{ detail.moistureContent }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.breedingTest.form.pestDetection') }}:</span>
              <span class="value">{{ detail.pestDetection }}</span>
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBreedingTestPageDetail } from '@/api/breeding'

const router = useRouter()
const route = useRoute()

const detail = ref(null)

const resultMap = {
  '01': '合格',
  '02': '不合格',
  '03': '待复检'
}

const resultTypeMap = {
  '01': 'success',
  '02': 'danger',
  '03': 'warning'
}

const cropTypeMap = {
  'WHEAT': '小麦',
  'CORN': '玉米',
  'RICE': '水稻',
  'SOYBEAN': '大豆',
  'COTTON': '棉花'
}

onMounted(async () => {
  await loadDetail()
})

const loadDetail = async () => {
  try {
    const response = await getBreedingTestPageDetail(route.params.id)
    if (response.code === 200 && response.data) {
      const data = response.data
      detail.value = {
        ...data,
        resultText: resultMap[data.testResult] || data.testResult,
        cropTypeName: cropTypeMap[data.cropType] || data.cropType
      }
    } else {
      ElMessage.error('加载数据失败')
    }
  } catch (error) {
    ElMessage.error('加载数据失败')
    console.error(error)
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('zh-CN')
}

const getResultTagType = (result) => {
  return resultTypeMap[result] || 'info'
}

const handleEdit = () => {
  router.push({
    name: 'BreedingTestEdit',
    params: { id: route.params.id }
  })
}

const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.breeding-test-detail-page {
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

          .link {
            color: #009A44;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
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
