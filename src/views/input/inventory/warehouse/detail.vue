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
            <h1 class="page-title">{{ $t('input.inventory.warehouse.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.warehouseCode')">
                  {{ detailData.warehouse_code || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.warehouseName')">
                  {{ detailData.warehouse_name || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.warehouseType')">
                  <el-tag :type="getTypeTag(detailData.warehouse_type)">
                    {{ $t(`input.inventory.warehouse.type.${detailData.warehouse_type}`) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.status')">
                  <el-tag :type="detailData.status === '1' ? 'success' : 'info'">
                    {{ detailData.status === '1' ? $t('input.inventory.warehouse.status.enabled') : $t('input.inventory.warehouse.status.disabled') }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.location')" :span="2">
                  {{ detailData.location || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.organName')" :span="2">
                  {{ detailData.organ_name || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.capacity')">
                  {{ detailData.capacity ? detailData.capacity + ' KG' : '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.usedCapacity')">
                  {{ detailData.used_capacity || 0 }} KG
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.availableCapacity')">
                  {{ detailData.available_capacity || (detailData.capacity - (detailData.used_capacity || 0)) }} KG
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.columns.usageRate')">
                  <el-progress :percentage="getUsageRate(detailData)" :color="getProgressColor(detailData)" />
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.warehouseArea')">
                  {{ detailData.warehouse_area ? detailData.warehouse_area + ' L' : '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.usedWarehouseArea')">
                  {{ detailData.used_warehouse_area || 0 }} L
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.columns.usageRate')">
                  <el-progress :percentage="getWarehouseArea(detailData)" :color="getWarehouseAreaColor(detailData)" />
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.siteCertificate')" :span="2" v-if="detailData.site_certificate">
                  <el-link :href="detailData.site_certificate" target="_blank" type="primary">
                    <i class="ri-file-line"></i>
                    {{ $t('input.inventory.warehouse.viewFile') }}
                  </el-link>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.remark')" :span="2" v-if="detailData.remark">
                  {{ detailData.remark }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 联系信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-contacts-line"></i>
                <span>{{ $t('userInfo.contactInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.contactPerson')">
                  {{ detailData.contact_person || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.contactPhone')">
                  {{ detailData.contact_phone || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 系统信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-time-line"></i>
                <span>{{ $t('input.inventory.warehouse.systemInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.createPeople')">
                  {{ detailData.create_people || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.createTime')">
                  {{ formatDateTime(detailData.create_time) }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.updatePeople')">
                  {{ detailData.update_people || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouse.form.updateTime')">
                  {{ formatDateTime(detailData.update_time) }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </template>
      </div>
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

// 格式化日期时间
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '-'

  // 处理带时区信息的日期格式，如: 2025-12-14 11:00:27.000+08:00
  if (dateTimeStr.includes('+') && dateTimeStr.includes('.')) {
    // 提取日期部分和时间部分，去掉毫秒和时区信息
    const datePart = dateTimeStr.split(' ')[0]
    const timePart = dateTimeStr.split(' ')[1].split('.')[0]
    return `${datePart} ${timePart}`
  }

  // 处理ISO格式日期，如: 2025-12-14T11:00:27
  if (dateTimeStr.includes('T')) {
    return dateTimeStr.replace('T', ' ')
  }

  return dateTimeStr
}

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

// 计算使用率
const getWarehouseArea = (row) => {
  if (!row.warehouse_area || row.warehouse_area === 0) return 0
  return Math.round(((row.used_warehouse_area || 0) / row.warehouse_area) * 100)
}




// 获取进度条颜色
const getProgressColor = (row) => {
  const rate = getUsageRate(row)
  if (rate >= 90) return '#f56c6c'
  if (rate >= 70) return '#e6a23c'
  return '#67c23a'
}

// 获取进度条颜色
const getWarehouseAreaColor = (row) => {
  const rate = getWarehouseArea(row)
  if (rate >= 90) return '#f56c6c'
  if (rate >= 70) return '#e6a23c'
  return '#67c23a'
}

// 返回
const goBack = () => {
  router.back()
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
