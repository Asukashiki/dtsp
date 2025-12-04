<template>
  <div class="land-detail-page">
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
          <h1 class="page-title">{{ $t('newFarm.land.detail') }}</h1>
        </div>
      </div>
    </div>

    <!-- 详情内容 -->
    <div class="detail-wrapper" v-loading="loading">
      <div v-if="detail" class="detail-content">
        <!-- 基本信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-landscape-line"></i>
            {{ $t('newFarm.land.sections.basicInfo') }}
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('newFarm.land.form.landId') }}:</span>
              <span class="value">{{ detail.landId }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.land.form.landName') }}:</span>
              <span class="value">{{ detail.landName }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.land.form.ownerType') }}:</span>
              <span class="value">
                <el-tag v-if="detail.ownerType" size="small">
                  {{ $t(`newFarm.land.ownerType.${detail.ownerType}`) }}
                </el-tag>
                <span v-else>-</span>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.land.form.landType') }}:</span>
              <span class="value">
                <el-tag v-if="detail.landType" size="small">
                  {{ $t(`newFarm.land.landType.${detail.landType}`) }}
                </el-tag>
                <span v-else>-</span>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.land.form.areaSize') }}:</span>
              <span class="value area">{{ formatArea(detail.areaSize) }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.land.form.currentStatus') }}:</span>
              <span class="value">
                <el-tag :type="getLandStatusType(detail.currentStatus)" size="small">
                  {{ $t(`newFarm.land.status.${detail.currentStatus}`) }}
                </el-tag>
              </span>
            </div>
          </div>
        </div>

        <!-- 位置信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('newFarm.land.sections.locationInfo') }}
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('newFarm.common.zoneName') }}:</span>
              <span class="value">{{ detail.zoneName || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.common.woredaName') }}:</span>
              <span class="value">{{ detail.woredaName || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.common.kebeleName') }}:</span>
              <span class="value">{{ detail.kebeleName || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.land.form.latitude') }}:</span>
              <span class="value">{{ detail.latitude || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.land.form.longitude') }}:</span>
              <span class="value">{{ detail.longitude || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('newFarm.land.form.address') }}:</span>
              <span class="value">{{ detail.address || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 农民信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('newFarm.land.sections.farmerInfo') }}
          </h3>
          <div v-if="detail.farmerId" class="farmer-info-wrapper">
            <div class="info-grid">
              <div class="info-item">
                <span class="label">{{ $t('newFarm.land.form.farmerId') }}:</span>
                <span class="value">{{ detail.farmerId }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('newFarm.land.form.farmerName') }}:</span>
                <span class="value">{{ detail.farmerName }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('newFarm.land.form.farmerIdCard') }}:</span>
                <span class="value">{{ detail.farmerIdCard || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('newFarm.land.form.farmerPhone') }}:</span>
                <span class="value">{{ detail.farmerPhone || '-' }}</span>
              </div>
            </div>
            <div class="farmer-actions">
              <el-button type="primary" @click="handleViewFarmerDetail">
                <i class="ri-user-line"></i>
                {{ $t('newFarm.farmer.actions.viewDetail') }}
              </el-button>
            </div>
          </div>
          <div v-else class="unbound-info">
            <i class="ri-link-unlink"></i>
            <span>{{ $t('newFarm.land.unbound') }}</span>
          </div>
        </div>

        <!-- 估算用量 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-calculator-line"></i>
            {{ $t('newFarm.land.sections.estimatedUsage') }}
          </h3>
          <div class="stats-grid">
            <div class="stat-card">
              <i class="ri-seedling-line stat-icon seed"></i>
              <div class="stat-content">
                <span class="stat-value">{{ formatAmount(detail.maxSeedAmount) }}</span>
                <span class="stat-label">{{ $t('newFarm.land.stats.maxSeedAmount') }}</span>
              </div>
            </div>
            <div class="stat-card">
              <i class="ri-flask-line stat-icon fertilizer"></i>
              <div class="stat-content">
                <span class="stat-value">{{ formatAmount(detail.maxFertilizerAmount) }}</span>
                <span class="stat-label">{{ $t('newFarm.land.stats.maxFertilizerAmount') }}</span>
              </div>
            </div>
          </div>
          <div class="usage-note">
            <i class="ri-information-line"></i>
            {{ $t('newFarm.land.tips.usageCalculation') }}
          </div>
        </div>

        <!-- 系统信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('newFarm.common.systemInfo') }}
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('newFarm.common.createBy') }}:</span>
              <span class="value">{{ detail.createBy || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.common.createTime') }}:</span>
              <span class="value">{{ detail.createTime || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.common.updateBy') }}:</span>
              <span class="value">{{ detail.updateBy || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.common.updateTime') }}:</span>
              <span class="value">{{ detail.updateTime || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('newFarm.common.remark') }}:</span>
              <span class="value">{{ detail.remark || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="detail-actions">
          <el-button @click="goBack">{{ $t('common.back') }}</el-button>
          <el-button type="primary" @click="handleEdit">{{ $t('common.edit') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getLandDetail } from '@/api/newFarm'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detail = ref(null)

const goBack = () => {
  router.back()
}

const handleEdit = () => {
  router.push(`/new-farm/land/edit/${route.params.id}`)
}

const formatArea = (area) => {
  if (!area) return '0 ha'
  return `${parseFloat(area).toFixed(2)} ha`
}

const formatAmount = (amount) => {
  if (!amount) return '0 kg'
  return `${parseFloat(amount).toFixed(2)} kg`
}

const getLandStatusType = (status) => {
  const typeMap = {
    CULTIVATING: 'success',
    IDLE: 'info',
    FALLOW: 'warning'
  }
  return typeMap[status] || 'info'
}

const handleViewFarmerDetail = () => {
  if (detail.value?.farmerId) {
    router.push(`/new-farm/farmer/detail/${detail.value.farmerId}`)
  }
}

const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getLandDetail(route.params.id)
    if (res.code === 200) {
      detail.value = res.data
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.land-detail-page { min-height: calc(100vh - 120px); }

.page-header { background: white; padding: 16px 0; margin: -24px 0 24px 0; border-radius: 0 0 12px 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); }
.header-content { max-width: 100%; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
.header-left { display: flex; align-items: center; }
.header-center { text-align: center; }
.page-title { font-size: 20px; font-weight: 600; color: #303133; margin: 0; }

.detail-wrapper { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); }
.detail-section { background: #f5f7fa; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
.section-title { font-size: 18px; font-weight: 600; color: #009A44; margin: 0 0 20px 0; padding-bottom: 12px; border-bottom: 2px solid #009A44; display: flex; align-items: center; gap: 8px; }
.section-title i { font-size: 20px; }

.info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.info-item { display: flex; flex-direction: column; gap: 8px; }
.info-item.full-width { grid-column: 1 / -1; }
.info-item .label { font-weight: 500; color: #606266; font-size: 14px; }
.info-item .value { color: #303133; font-size: 15px; }
.info-item .area { color: #009A44; font-weight: 600; font-size: 18px; }

.farmer-info-wrapper { display: flex; flex-direction: column; gap: 16px; }
.farmer-actions { display: flex; justify-content: flex-end; padding-top: 12px; border-top: 1px solid #e4e7ed; }

.unbound-info { display: flex; align-items: center; gap: 8px; color: #909399; font-size: 14px; padding: 16px; background: white; border-radius: 8px; }
.unbound-info i { font-size: 20px; }

.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 16px; }
.stat-card { background: white; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); }
.stat-icon { font-size: 36px; }
.stat-icon.seed { color: #009A44; }
.stat-icon.fertilizer { color: #f57c00; }
.stat-content { display: flex; flex-direction: column; }
.stat-value { font-size: 24px; font-weight: 700; color: #303133; }
.stat-label { font-size: 14px; color: #909399; }

.usage-note { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #909399; padding: 12px; background: white; border-radius: 8px; }

.detail-actions { display: flex; justify-content: flex-end; gap: 16px; padding-top: 24px; border-top: 1px solid #f0f2f5; }

@media screen and (max-width: 768px) {
  .info-grid, .stats-grid { grid-template-columns: 1fr; }
  .page-header { margin: -16px -16px 16px -16px; }
  .header-content { padding: 0 16px; grid-template-columns: auto 1fr; gap: 16px; }
  .header-center { text-align: left; }
  .detail-wrapper, .detail-section { padding: 16px; }
  .detail-actions { flex-direction: column; }
  .detail-actions .el-button { width: 100%; }
  .farmer-actions { justify-content: stretch; }
  .farmer-actions .el-button { width: 100%; }
}
</style>
