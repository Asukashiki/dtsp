<template>
  <div class="warehouse-detail-page">
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
          <h1 class="page-title">{{ $t('input.inventory.warehouse.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i>
            <span class="btn-text">{{ $t('common.edit') }}</span>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 详情区域 -->
    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData">
        <!-- 基本信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('input.catalog.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.warehouseCode') }}:</span>
              <span class="value">{{ detailData.warehouse_code }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.warehouseName') }}:</span>
              <span class="value">{{ detailData.warehouse_name }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.warehouseType') }}:</span>
              <el-tag :type="getTypeTag(detailData.warehouse_type)">
                {{ $t(`input.inventory.warehouse.type.${detailData.warehouse_type}`) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.status') }}:</span>
              <el-tag :type="detailData.status === '1' ? 'success' : 'info'">
                {{ detailData.status === '1' ? $t('input.inventory.warehouse.status.enabled') : $t('input.inventory.warehouse.status.disabled') }}
              </el-tag>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.inventory.warehouse.form.location') }}:</span>
              <span class="value">{{ detailData.location }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.organName') }}:</span>
              <span class="value">{{ detailData.organ_name || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.capacity') }}:</span>
              <span class="value">{{ detailData.capacity }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.warehouseArea') }}:</span>
              <span class="value">{{ detailData.warehouse_area ? detailData.warehouse_area + ' m²' : '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.usedCapacity') }}:</span>
              <span class="value">{{ detailData.used_capacity || 0 }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.availableCapacity') }}:</span>
              <span class="value">{{ detailData.available_capacity || (detailData.capacity - (detailData.used_capacity || 0)) }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.inventory.warehouse.columns.usageRate') }}:</span>
              <el-progress :percentage="getUsageRate(detailData)" :color="getProgressColor(detailData)" />
            </div>
            <div class="detail-item full-width" v-if="detailData.site_certificate">
              <span class="label">{{ $t('input.inventory.warehouse.form.siteCertificate') }}:</span>
              <span class="value">
                <el-link :href="detailData.site_certificate" target="_blank" type="primary">
                  <i class="ri-file-line"></i>
                  {{ $t('input.inventory.warehouse.viewFile') }}
                </el-link>
              </span>
            </div>
            <div class="detail-item full-width" v-if="detailData.remark">
              <span class="label">{{ $t('input.inventory.warehouse.form.remark') }}:</span>
              <span class="value">{{ detailData.remark }}</span>
            </div>
          </div>
        </div>

        <!-- 联系信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-contacts-line"></i>
            {{ $t('userInfo.contactInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.contactPerson') }}:</span>
              <span class="value">{{ detailData.contact_person }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.contactPhone') }}:</span>
              <span class="value">{{ detailData.contact_phone }}</span>
            </div>
          </div>
        </div>

        <!-- 系统信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-time-line"></i>
            {{ $t('input.inventory.warehouse.systemInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.createPeople') }}:</span>
              <span class="value">{{ detailData.create_people || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.createTime') }}:</span>
              <span class="value">{{ detailData.create_time || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.updatePeople') }}:</span>
              <span class="value">{{ detailData.update_people || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.warehouse.form.updateTime') }}:</span>
              <span class="value">{{ detailData.update_time || '-' }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getWarehouseDetail } from '@/api/inventory'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const warehouseId = route.params.id

// 获取仓库类型标签
const getTypeTag = (type) => {
  const typeMap = {
    normal: '',
    cold: 'info',
    dangerous: 'danger'
  }
  return typeMap[type] || ''
}

// 计算使用率
const getUsageRate = (row) => {
  if (!row.capacity || row.capacity === 0) return 0
  return Math.round(((row.used_capacity || 0) / row.capacity) * 100)
}

// 获取进度条颜色
const getProgressColor = (row) => {
  const rate = getUsageRate(row)
  if (rate >= 90) return '#f56c6c'
  if (rate >= 70) return '#e6a23c'
  return '#67c23a'
}

// 返回
const goBack = () => {
  router.back()
}

// 编辑
const handleEdit = () => {
  router.push(`/input/inventory/warehouse/edit/${warehouseId}`)
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getWarehouseDetail(warehouseId)
    if (res.code === 200) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load warehouse detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.warehouse-detail-page {
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

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
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

/* 详情区域 */
.detail-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.detail-section {
  margin-bottom: 32px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

.section-title i {
  font-size: 20px;
  color: #009A44;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item .label {
  font-size: 14px;
  color: #909399;
  flex-shrink: 0;
  min-width: 100px;
}

.detail-item .value {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  flex: 1;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-item.full-width {
    grid-column: auto;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-right {
    display: none;
  }

  .header-center {
    text-align: left;
  }

  .page-title {
    font-size: 18px;
  }

  .detail-wrapper {
    padding: 16px;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .detail-item .label {
    min-width: auto;
  }

  .btn-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 0 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .detail-wrapper {
    padding: 12px;
  }
}
</style>
