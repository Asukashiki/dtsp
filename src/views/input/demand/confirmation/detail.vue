<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('common.detail') }}</h1>
            <p class="page-subtitle">{{ $t('demandConfirmation.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <InfoCard :title="$t('demandConfirmation.detailSections.basicInfo')" icon="ri-information-line">
          <div class="card-body">
            <div class="info-grid">
              <div class="info-item">
                <div class="label">{{ $t('demandConfirmation.form.fromActor') }}</div>
                <div class="value">{{ detailData.fromActor || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('demandConfirmation.form.toActor') }}</div>
                <div class="value">{{ detailData.toActor || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('demandConfirmation.form.referenceId') }}</div>
                <div class="value">{{ detailData.referenceId || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('demandConfirmation.form.confirmationType') }}</div>
                <div class="value">{{ detailData.confirmationTypeDesc || detailData.confirmationType || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('demandConfirmation.form.confirmedTime') }}</div>
                <div class="value">{{ detailData.confirmedTime || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('demandConfirmation.columns.createPeople') }}</div>
                <div class="value">{{ detailData.createPeople || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('demandConfirmation.columns.createTime') }}</div>
                <div class="value">{{ detailData.createTime || '-' }}</div>
              </div>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getDemandConfirmationDetail } from '@/api/demandConfirmation'
import { InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref({})

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getDemandConfirmationDetail(route.params.id)
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

// 返回
const handleBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label {
    font-size: 13px;
    color: var(--text-color-secondary);
    font-weight: 500;
  }

  .value {
    font-size: 15px;
    color: var(--text-color-primary);
    font-weight: 500;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}

// Mobile adaptation
@media screen and (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>