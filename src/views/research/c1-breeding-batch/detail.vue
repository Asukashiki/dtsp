<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.c1BreedingBatch.detail.title') }}</h1>
            <p class="batch-id" v-if="batchInfo">{{ batchInfo.batchId }}</p>
          </div>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit" v-if="batchInfo && !isReadonly">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="!batchInfo">
        <template v-if="batchInfo">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.c1BreedingBatch.detail.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.batchId')">
                  {{ batchInfo.batchId }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.columns.status')">
                  <el-tag :type="getStatusTagType(batchInfo.batchStatus)">
                    {{ getStatusName(batchInfo.batchStatus) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.varietyName')">
                  {{ batchInfo.varietyName }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.cropType')">
                  <el-tag size="small">{{ getCropTypeDisplay(batchInfo.cropType) }}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 时间和产量信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-calendar-line"></i>
                <span>{{ $t('research.c1BreedingBatch.detail.timeline') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.startDate')">
                  {{ batchInfo.startDate || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.endDate')">
                  {{ batchInfo.endDate || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.expectedYield')">
                  {{ batchInfo.expectedYield || '-' }} <span v-if="batchInfo.expectedYield">kg</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.plantingArea')">
                  {{ batchInfo.plantingArea || '-' }} <span v-if="batchInfo.plantingArea">ha</span>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 机构信息卡片 -->
          <div class="info-card" v-if="batchInfo.orgId || batchInfo.orgName">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('research.c1BreedingBatch.detail.orgInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.orgType')">
                  {{ batchInfo.orgType || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.c1BreedingBatch.form.orgName')">
                  {{ batchInfo.orgName || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 备注卡片 -->
          <div class="info-card" v-if="batchInfo.remark">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('common.remarks') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="remark-content">
                {{ batchInfo.remark }}
              </div>
            </div>
          </div>

        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getC1BreedingBatchById } from '@/api/c1BreedingBatch'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])

const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

const batchInfo = ref(null)

// 是否只读模式（从审核页面进入）
const isReadonly = computed(() => route.query.readonly === 'true')

// 状态映射
const statusMap = computed(() => ({
  '01': t('research.c1BreedingBatch.status.ongoing'),
  '02': t('research.c1BreedingBatch.status.completed'),
  '03': t('research.c1BreedingBatch.status.terminated')
}))

// 初始化
onMounted(async () => {
  await loadBatchDetail()
})

// 加载批次详情
const loadBatchDetail = async () => {
  try {
    const response = await getC1BreedingBatchById(route.params.id)
    if (response.code === 200 && response.data) {
      batchInfo.value = response.data
    } else {
      ElMessage.error(t('research.c1BreedingBatch.messages.loadError'))
    }
  } catch (error) {
    ElMessage.error(t('research.c1BreedingBatch.messages.loadError'))
    console.error(error)
  }
}

// 获取状态名称
const getStatusName = (status) => {
  return statusMap.value[status] || status
}

// 获取状态标签类型
const getStatusTagType = (status) => {
  const map = {
    '01': 'primary',
    '02': 'success',
    '03': 'info'
  }
  return map[status] || 'info'
}

// 编辑
const handleEdit = () => {
  router.push(`/research/c1-breeding-batch/edit/${route.params.id}`)
}

// 返回
const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

.remark-content {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  line-height: 1.6;
  color: #606266;
}
</style>
