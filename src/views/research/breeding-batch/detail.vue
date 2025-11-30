<template>
  <div class="breeding-batch-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <el-button link @click="goBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
        <h1 class="page-title">{{ $t('research.breeding.breedingBatch.detail') }}</h1>
        <div style="flex: 1"></div>
        <el-button type="primary" @click="handleEdit">{{ $t('common.edit') }}</el-button>
      </div>
    </div>

    <!-- 详情区域 -->
    <div class="detail-wrapper" v-loading="loading">
      <!-- 基本信息 -->
      <div class="detail-block">
        <div class="block-header">
          <i class="ri-information-line"></i>
          <h3>{{ $t('research.breeding.breedingBatch.form.basicInfo') }}</h3>
        </div>
        <div class="detail-grid">
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.batchId') }}:</span>
            <span class="value">{{ detailData.batchId }}</span>
          </div>
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.cropType') }}:</span>
            <span class="value">{{ detailData.cropTypeName }}</span>
          </div>
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.varietyName') }}:</span>
            <span class="value">{{ detailData.varietyName }}</span>
          </div>
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.breedingLevel') }}:</span>
            <span class="value">{{ detailData.breedingLevelName }}</span>
          </div>
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.parentSeedSource') }}:</span>
            <span class="value">{{ detailData.parentSeedSource }}</span>
          </div>
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.startDate') }}:</span>
            <span class="value">{{ detailData.startDate }}</span>
          </div>
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.status') }}:</span>
            <span class="value">
              <el-tag :type="getStatusTag(detailData.batchStatus)" size="small">
                {{ detailData.batchStatusName }}
              </el-tag>
            </span>
          </div>
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.expectedYield') }}:</span>
            <span class="value">{{ detailData.expectedYield }} kg</span>
          </div>
        </div>
      </div>

      <!-- 机构信息 -->
      <div class="detail-block">
        <div class="block-header">
          <i class="ri-building-line"></i>
          <h3>{{ $t('research.breeding.breedingBatch.form.orgInfo') }}</h3>
        </div>
        <div class="detail-grid">
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.orgId') }}:</span>
            <span class="value">{{ detailData.orgId }}</span>
          </div>
          <div class="detail-row">
            <span class="label">{{ $t('research.breeding.breedingBatch.form.orgName') }}:</span>
            <span class="value">{{ detailData.orgName }}</span>
          </div>
        </div>
      </div>

      <!-- 备注 -->
      <div class="detail-block" v-if="detailData.remark">
        <div class="block-header">
          <i class="ri-file-text-line"></i>
          <h3>{{ $t('common.remarks') }}</h3>
        </div>
        <div class="remark-content">
          {{ detailData.remark }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBreedingBatchPageDetail } from '@/api/breeding'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const detailData = ref({})

// 初始化
onMounted(async () => {
  await loadDetail()
})

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const response = await getBreedingBatchPageDetail(route.params.id)
    if (response.code === 200 && response.data) {
      detailData.value = response.data
    } else {
      ElMessage.error('加载数据失败')
    }
  } catch (error) {
    ElMessage.error('加载数据失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 编辑
const handleEdit = () => {
  router.push(`/research/breeding/batch/edit/${route.params.id}`)
}

// 返回
const goBack = () => {
  router.back()
}

// 获取状态标签类型
const getStatusTag = (status) => {
  const map = {
    '01': 'info',
    '02': 'success',
    '03': 'danger'
  }
  return map[status] || 'info'
}
</script>

<style scoped lang="scss">
.breeding-batch-detail-page {
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
    gap: 15px;

    .page-title {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
  }
}

.detail-wrapper {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

      .detail-row {
        display: flex;
        flex-direction: column;

        .label {
          color: #909399;
          font-size: 14px;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .value {
          color: #333;
          font-size: 15px;
          word-break: break-word;
        }
      }
    }

    .remark-content {
      padding: 15px;
      background: #f5f7fa;
      border-radius: 4px;
      line-height: 1.6;
      color: #333;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
}
</style>
