<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleClose">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breeding.seed.production.result.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 生产批次信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-seedling-line"></i>
              <span>{{ $t('research.breeding.seed.production.result.section.productionBatchSelection') }}</span>
            </div>
          </div>
          <div class="card-body">
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
        </div>
        
        <!-- 采集数据卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-scales-3-line"></i>
              <span>{{ $t('research.breeding.seed.production.result.section.collectionData') }}</span>
            </div>
          </div>
          <div class="card-body">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBreedSeedProduceResult } from '@/api/breedSeed'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const detail = ref({})

const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getBreedSeedProduceResult(route.params.id)
    if (res.code === 200) {
      detail.value = res.data
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
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
