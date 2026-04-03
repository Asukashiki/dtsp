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
            <h1 class="page-title">{{ $t('research.detection.labTesting.detail') }}</h1>
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
              <span>{{ $t('research.detection.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.testId')">
                {{ detailData.testId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.detection.batchId')">
                {{ detailData.batchId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.detection.seedClass')">
                <el-tag v-if="detailData.seedClass" :type="detailData.seedClass === 'Basic' ? 'success' : 'warning'" size="small">
                  {{ detailData.seedClass }}
                </el-tag>
                <span v-else>-</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.lotId')">
                {{ detailData.lotId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.testType')">
                {{ detailData.testType || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.testValue')">
                {{ detailData.testValue }}{{ detailData.unit || '' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.passStatus')">
                <el-tag v-if="detailData.passStatus" :type="detailData.passStatus === 'TRUE' ? 'success' : 'danger'" size="small">
                  {{ detailData.passStatus === 'TRUE' ? $t('research.c1BreedingBatch.test.passed') : $t('research.c1BreedingBatch.test.failed') }}
                </el-tag>
                <span v-else>-</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.testDate')">
                {{ detailData.testDate || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.tester')">
                {{ detailData.tester || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.testLocation')">
                {{ detailData.testLocation || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1BreedingBatch.test.remarks')" :span="2">
                {{ detailData.remarks || '-' }}
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
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getTestById } from '@/api/detection'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref({})

// 加载详情数据
const getInfo = async () => {
  loading.value = true
  try {
    const res = await getTestById(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/research/detection-management?tab=lab')
}

onMounted(() => {
  getInfo()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
