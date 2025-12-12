<template>
  <div class="farmer-detail-page">
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
          <h1 class="page-title">{{ $t('newFarm.farmer.detail') }}</h1>
        </div>
      </div>
    </div>

    <!-- 详情内容 -->
    <div class="detail-wrapper" v-loading="loading">
      <div v-if="detail" class="detail-content">
        <!-- 基本信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('newFarm.farmer.sections.basicInfo') }}
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.farmerId') }}:</span>
              <span class="value">{{ detail.farmerId }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.farmerName') }}:</span>
              <span class="value">{{ detail.farmerName }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.idCard') }}:</span>
              <span class="value">{{ detail.idCard || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.gender') }}:</span>
              <span class="value">
                <el-tag v-if="detail.gender" size="small" :type="detail.gender === 'MALE' ? 'primary' : 'danger'">
                  {{ detail.gender === 'MALE' ? $t('newFarm.common.male') : $t('newFarm.common.female') }}
                </el-tag>
                <span v-else>-</span>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.birthDate') }}:</span>
              <span class="value">{{ detail.birthday || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.youthCategory') }}:</span>
              <span class="value">
                <el-tag v-if="detail.youthCategory === '1'" size="small" type="success">
                  {{ $t('common.yes') }}
                </el-tag>
                <el-tag v-else-if="detail.youthCategory === '0'" size="small" type="info">
                  {{ $t('common.no') }}
                </el-tag>
                <span v-else>-</span>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.phone') }}:</span>
              <span class="value">{{ detail.phone || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.email') }}:</span>
              <span class="value">{{ detail.email || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('newFarm.farmer.form.address') }}:</span>
              <span class="value">{{ detail.address || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 组织信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-building-line"></i>
            {{ $t('newFarm.farmer.sections.orgInfo') }}
          </h3>
          <div class="info-grid">

            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.cooperativeId') }}:</span>
              <span class="value">{{ detail.cooperativeName || detail.cooperativeId || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.farmer.form.daId') }}:</span>
              <span class="value">{{ detail.daName || detail.daId || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 区划信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('newFarm.farmer.sections.regionInfo') }}
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
          </div>
        </div>

        <!-- 土地统计 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-landscape-line"></i>
            {{ $t('newFarm.farmer.sections.landStatistics') }}
          </h3>
          <div class="stats-grid">
            <div class="stat-card">
              <i class="ri-landscape-line stat-icon"></i>
              <div class="stat-content">
                <span class="stat-value">{{ detail.landCount || 0 }}</span>
                <span class="stat-label">{{ $t('newFarm.farmer.stats.landCount') }}</span>
              </div>
            </div>
            <div class="stat-card">
              <i class="ri-ruler-line stat-icon"></i>
              <div class="stat-content">
                <span class="stat-value">{{ formatArea(detail.totalLandArea) }}</span>
                <span class="stat-label">{{ $t('newFarm.farmer.stats.totalLandArea') }}</span>
              </div>
            </div>
          </div>

          <!-- 关联土地列表 -->
          <div v-if="landList.length > 0" class="land-list">
            <h4 class="list-title">{{ $t('newFarm.farmer.sections.landList') }}</h4>
            <div class="land-cards">
              <div v-for="land in landList" :key="land.landId" class="land-card">
                <div class="land-header">
                  <span class="land-name">{{ land.landName }}</span>
                  <el-tag size="small" :type="getLandStatusType(land.currentStatus)">
                    {{ $t(`newFarm.land.status.${land.currentStatus}`) }}
                  </el-tag>
                </div>
                <div class="land-info">
                  <span>{{ $t('newFarm.land.form.landId') }}: {{ land.landId }}</span>
                  <span>{{ $t('newFarm.land.form.areaSize') }}: {{ formatArea(land.areaSize) }}</span>
                </div>
                <div class="land-actions">
                  <el-button size="small" type="primary" link @click="handleViewLandDetail(land.landId)">
                    <i class="ri-eye-line"></i>
                    {{ $t('newFarm.land.actions.viewDetail') }}
                  </el-button>
                  <el-button size="small" type="danger" link @click="handleRemoveLand(land)">
                    <i class="ri-link-unlink"></i>
                    {{ $t('newFarm.land.actions.removeFarmer') }}
                  </el-button>
                </div>
              </div>
            </div>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { getFarmerDetail, getLandsByFarmer, unbindFarmerFromLand } from '@/api/newFarm'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detail = ref(null)
const landList = ref([])

const goBack = () => {
  router.back()
}

const handleEdit = () => {
  router.push(`/input/farmer/edit/${route.params.id}`)
}

const formatArea = (area) => {
  if (!area) return '0 ha'
  return `${parseFloat(area).toFixed(2)} ha`
}

const getLandStatusType = (status) => {
  const typeMap = {
    CULTIVATING: 'success',
    IDLE: 'info',
    FALLOW: 'warning'
  }
  return typeMap[status] || 'info'
}

const handleViewLandDetail = (landId) => {
  router.push(`/input/land/detail/${landId}`)
}

const handleRemoveLand = async (land) => {
  try {
    await ElMessageBox.confirm(
      t('newFarm.land.confirmRemove'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await unbindFarmerFromLand(land.landId)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.land.messages.removeSuccess'))
      // 重新加载数据
      await loadDetail()
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to remove land:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

const loadDetail = async () => {
  loading.value = true
  try {
    const [detailRes, landsRes] = await Promise.all([
      getFarmerDetail(route.params.id),
      getLandsByFarmer(route.params.id)
    ])

    if (detailRes.code === 200) {
      detail.value = detailRes.data
    }

    if (landsRes.code === 200) {
      landList.value = landsRes.data || []
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
.farmer-detail-page { min-height: calc(100vh - 120px); }

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

.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }
.stat-card { background: white; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); }
.stat-icon { font-size: 36px; color: #009A44; }
.stat-content { display: flex; flex-direction: column; }
.stat-value { font-size: 24px; font-weight: 700; color: #303133; }
.stat-label { font-size: 14px; color: #909399; }

.land-list { margin-top: 20px; }
.list-title { font-size: 16px; font-weight: 600; color: #303133; margin: 0 0 16px 0; }
.land-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.land-card { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); transition: box-shadow 0.3s ease; }
.land-card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
.land-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.land-name { font-weight: 600; color: #303133; }
.land-info { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #606266; margin-bottom: 12px; }
.land-actions { display: flex; gap: 8px; padding-top: 12px; border-top: 1px solid #f0f2f5; }
.land-actions .el-button { flex: 1; justify-content: center; }

.detail-actions { display: flex; justify-content: flex-end; gap: 16px; padding-top: 24px; border-top: 1px solid #f0f2f5; }

@media screen and (max-width: 768px) {
  .info-grid, .stats-grid { grid-template-columns: 1fr; }
  .page-header { margin: -16px -16px 16px -16px; }
  .header-content { padding: 0 16px; grid-template-columns: auto 1fr; gap: 16px; }
  .header-center { text-align: left; }
  .detail-wrapper, .detail-section { padding: 16px; }
  .detail-actions { flex-direction: column; }
  .detail-actions .el-button { width: 100%; }
  .land-cards { grid-template-columns: 1fr; }
  .land-actions { flex-direction: column; }
  .land-actions .el-button { width: 100%; }
}
</style>
