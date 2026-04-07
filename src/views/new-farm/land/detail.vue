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
            <h1 class="page-title">{{ $t('newFarm.land.detail') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div v-if="detail">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-landscape-line"></i>
                <span>{{ $t('newFarm.land.sections.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.land.form.landId')">
                  {{ detail.landId }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.landName')">
                  {{ detail.landName }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.ownerType')">
                  <el-tag v-if="detail.ownerType" size="small">
                    {{ $t(`newFarm.land.ownerType.${detail.ownerType}`) }}
                  </el-tag>
                  <span v-else>-</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.landType')">
                  <el-tag v-if="detail.landType" size="small">
                    {{ $t(`newFarm.land.landType.${detail.landType}`) }}
                  </el-tag>
                  <span v-else>-</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.areaSize')">
                  {{ formatArea(detail.areaSize) }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.currentStatus')">
                  <el-tag :type="getLandStatusType(detail.currentStatus)" size="small">
                    {{ $t(`newFarm.land.status.${detail.currentStatus}`) }}
                  </el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 位置信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('newFarm.land.sections.locationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.common.zoneName')">
                  {{ detail.zoneName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.woredaName')">
                  {{ detail.woredaName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.kebeleName')">
                  {{ detail.kebeleName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.latitude')">
                  {{ detail.latitude || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.longitude')">
                  {{ detail.longitude || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.address')" :span="2">
                  {{ detail.address || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 农民信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('newFarm.land.sections.farmerInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div v-if="detail.farmerId">
                <el-descriptions :column="2" border>
                  <el-descriptions-item :label="$t('newFarm.land.form.farmerId')">
                    {{ detail.farmerId }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="$t('newFarm.land.form.farmerName')">
                    {{ detail.farmerName }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="$t('newFarm.land.form.farmerIdCard')">
                    {{ detail.farmerIdCard || '-' }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="$t('newFarm.land.form.farmerPhone')">
                    {{ detail.farmerPhone || '-' }}
                  </el-descriptions-item>
                </el-descriptions>
                <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
                  <el-button type="primary" @click="handleViewFarmerDetail">
                    <i class="ri-user-line"></i>
                    {{ $t('newFarm.farmer.actions.viewDetail') }}
                  </el-button>
                </div>
              </div>
              <div v-else style="display: flex; align-items: center; gap: 8px; color: #909399;">
                <i class="ri-link-unlink"></i>
                <span>{{ $t('newFarm.land.unbound') }}</span>
              </div>
            </div>
          </div>

          <!-- 估算用量 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-calculator-line"></i>
                <span>{{ $t('newFarm.land.sections.estimatedUsage') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.land.stats.maxSeedAmount')">
                  {{ formatAmount(detail.maxSeedAmount) }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.stats.maxFertilizerAmount')">
                  {{ formatAmount(detail.maxFertilizerAmount) }}
                </el-descriptions-item>
              </el-descriptions>
              <div class="usage-note">
                <i class="ri-information-line"></i>
                <span>{{ $t('newFarm.land.tips.usageCalculation') }}</span>
              </div>
            </div>
          </div>

          <!-- 系统信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('newFarm.common.systemInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.common.createBy')">
                  {{ detail.createBy || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.createTime')">
                  {{ detail.createTime || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.updateBy')">
                  {{ detail.updateBy || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.updateTime')">
                  {{ detail.updateTime || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.common.remark')" :span="2">
                  {{ detail.remark || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- ⚠️ 注意：详情页不显示底部操作按钮 -->
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
    router.push(`/input/farmer/detail/${detail.value.farmerId}`)
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.usage-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #909399;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 12px;

  i {
    font-size: 14px;
    color: #009a44;
    margin-top: 2px;
  }
}
</style>
