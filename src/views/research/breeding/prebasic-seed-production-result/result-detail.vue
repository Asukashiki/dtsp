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
            <h1 class="page-title">{{ $t('prebasicSeedProductionResult.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 批次信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('prebasicSeedProductionResult.section.batchInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.columns.resultId')">
                {{ data.resultId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.columns.produceBatchId')">
                {{ data.produceBatchId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.columns.produceBatchName')">
                {{ data.produceBatchName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.columns.varietyName')">
                {{ data.varietyName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.form.breedBatchName')">
                {{ data.breedBatchName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.form.trialName')">
                {{ data.trialName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.form.fromSeedLevel')">
                {{ data.fromSeedLevel }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.form.toSeedLevel')">
                {{ data.toSeedLevel }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.columns.collectionDate')">
                {{ data.collectionDate }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 生产结果数据卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-bar-chart-line"></i>
              <span>{{ $t('prebasicSeedProductionResult.form.resultInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.form.outputQuantity')">
                {{ data.outputQuantity }} kg
              </el-descriptions-item>
              <el-descriptions-item :label="$t('prebasicSeedProductionResult.form.operator')">
                {{ data.operator }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back'])

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
