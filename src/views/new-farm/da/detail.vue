<template>
  <div class="da-detail-page">
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
          <h1 class="page-title">{{ $t('newFarm.da.detail') }}</h1>
        </div>
      </div>
    </div>

    <!-- 详情内容 -->
    <div class="detail-wrapper" v-loading="loading">
      <div v-if="detail" class="detail-content">
        <!-- 基本信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-user-star-line"></i>
            {{ $t('newFarm.da.sections.basicInfo') }}
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('newFarm.da.form.daId') }}:</span>
              <span class="value">{{ detail.daId }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.da.form.daName') }}:</span>
              <span class="value">{{ detail.daName }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.da.form.idCard') }}:</span>
              <span class="value">{{ detail.idCard || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.da.form.gender') }}:</span>
              <span class="value">
                <el-tag v-if="detail.gender" size="small" :type="detail.gender === 'MALE' ? 'primary' : 'danger'">
                  {{ detail.gender === 'MALE' ? $t('newFarm.common.male') : $t('newFarm.common.female') }}
                </el-tag>
                <span v-else>-</span>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.da.form.phone') }}:</span>
              <span class="value">{{ detail.phone || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.da.form.email') }}:</span>
              <span class="value">{{ detail.email || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('newFarm.da.form.address') }}:</span>
              <span class="value">{{ detail.address || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 账号信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-account-circle-line"></i>
            {{ $t('newFarm.da.sections.accountInfo') }}
          </h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('newFarm.da.form.account') }}:</span>
              <span class="value">{{ detail.account || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('newFarm.da.form.accountStatus') }}:</span>
              <span class="value">
                <el-tag :type="detail.accountStatus === '1' ? 'success' : 'danger'" size="small">
                  {{ detail.accountStatus === '1' ? $t('newFarm.da.status.enabled') : $t('newFarm.da.status.disabled') }}
                </el-tag>
              </span>
            </div>
          </div>
        </div>

        <!-- 区划信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('newFarm.da.sections.regionInfo') }}
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
            <div class="info-item full-width">
              <span class="label">{{ $t('newFarm.da.form.kebeleCodes') }}:</span>
              <span class="value">
                <template v-if="detail.kebeleNames">
                  <el-tag
                    v-for="(name, index) in detail.kebeleNames.split(',')"
                    :key="index"
                    size="small"
                    class="kebele-tag"
                  >
                    {{ name }}
                  </el-tag>
                </template>
                <span v-else>-</span>
              </span>
            </div>
          </div>
        </div>

        <!-- 统计信息 -->
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('newFarm.da.sections.statistics') }}
          </h3>
          <div class="stats-grid">
            <div class="stat-card">
              <i class="ri-user-line stat-icon"></i>
              <div class="stat-content">
                <span class="stat-value">{{ detail.farmerCount || 0 }}</span>
                <span class="stat-label">{{ $t('newFarm.da.stats.farmerCount') }}</span>
              </div>
            </div>
            <div class="stat-card">
              <i class="ri-landscape-line stat-icon"></i>
              <div class="stat-content">
                <span class="stat-value">{{ detail.landCount || 0 }}</span>
                <span class="stat-label">{{ $t('newFarm.da.stats.landCount') }}</span>
              </div>
            </div>
            <div class="stat-card">
              <i class="ri-ruler-line stat-icon"></i>
              <div class="stat-content">
                <span class="stat-value">{{ formatArea(detail.totalLandArea) }}</span>
                <span class="stat-label">{{ $t('newFarm.da.stats.totalLandArea') }}</span>
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
import { ElMessage } from 'element-plus'
import { getDaDetail } from '@/api/newFarm'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detail = ref(null)

// 返回
const goBack = () => {
  router.back()
}

// 编辑
const handleEdit = () => {
  router.push(`/new-farm/da/edit/${route.params.id}`)
}

// 格式化面积
const formatArea = (area) => {
  if (!area) return '0'
  return `${parseFloat(area).toFixed(2)} ha`
}

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getDaDetail(route.params.id)
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
.da-detail-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  padding: 16px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 详情内容 */
.detail-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.detail-section {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item .label {
  font-weight: 500;
  color: #606266;
  font-size: 14px;
}

.info-item .value {
  color: #303133;
  font-size: 15px;
}

.kebele-tag {
  margin-right: 8px;
  margin-bottom: 4px;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  font-size: 36px;
  color: #009A44;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-center {
    text-align: left;
  }

  .detail-wrapper {
    padding: 16px;
  }

  .detail-section {
    padding: 16px;
  }

  .detail-actions {
    flex-direction: column;
  }

  .detail-actions .el-button {
    width: 100%;
  }
}
</style>
