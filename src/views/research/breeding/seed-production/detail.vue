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
            <h1 class="page-title">{{ $t('research.breeding.seed.production.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 基本信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('research.breeding.seed.production.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.produceBatchId')">
                {{ data.produceBatchId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.produceBatchName')">
                {{ data.produceBatchName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.breedBatchName')">
                {{ data.breedBatchName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.trialName')">
                {{ data.trialName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.varietyName')">
                {{ data.varietyName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.cropType')">
                {{ getCropTypeDisplay(data.cropType) }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.time')">
                {{ data.time }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.landName')">
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
              <span>{{ $t('research.breeding.seed.production.form.productionInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.inputSeedQuantity')">
                {{ data.inputSeedQuantity }} kg
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.fromSeedLevel')">
                {{ data.fromSeedLevel }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.toSeedLevel')">
                {{ data.toSeedLevel }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.operatorName')">
                {{ data.operatorName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.produceStatus')">
                <el-tag type="success">
                  {{ data.produceStatus }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.createTime')">
                {{ data.createTime }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.production.form.updateTime')">
                {{ data.updateTime }}
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
import { useDict } from '@/hooks/useDict'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back'])

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])
const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
