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
            <h1 class="page-title">{{ $t('newFarm.farmer.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <div v-if="detail">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('newFarm.farmer.sections.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.farmer.form.farmerId')">
                  {{ detail.farmerId }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.form.farmerName')">
                  {{ detail.farmerName }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.form.idCard')">
                  {{ detail.idCard || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.form.gender')">
                  <el-tag v-if="detail.gender" size="small" :type="detail.gender === 'MALE' ? 'primary' : 'danger'">
                    {{ detail.gender === 'MALE' ? $t('newFarm.common.male') : $t('newFarm.common.female') }}
                  </el-tag>
                  <span v-else>-</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('common.birthDate')">
                  {{ detail.birthday || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.form.youthCategory')">
                  <el-tag v-if="detail.youthCategory === '1'" size="small" type="success">
                    {{ $t('common.yes') }}
                  </el-tag>
                  <el-tag v-else-if="detail.youthCategory === '0'" size="small" type="info">
                    {{ $t('common.no') }}
                  </el-tag>
                  <span v-else>-</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.form.phone')">
                  {{ detail.phone || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.form.email')">
                  {{ detail.email || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.form.address')" :span="2">
                  {{ detail.address || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 组织信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('newFarm.farmer.sections.orgInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.farmer.form.cooperativeId')">
                  {{ detail.cooperativeName || detail.cooperativeId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.form.daId')">
                  {{ detail.daName || detail.daId || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 区划信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('newFarm.farmer.sections.regionInfo') }}</span>
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
              </el-descriptions>
            </div>
          </div>

          <!-- 土地统计 & 关联土地 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-landscape-line"></i>
                <span>{{ $t('newFarm.farmer.sections.landStatistics') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('newFarm.farmer.stats.landCount')">
                  {{ detail.landCount || 0 }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.farmer.stats.totalLandArea')">
                  {{ formatArea(detail.totalLandArea) }}
                </el-descriptions-item>
              </el-descriptions>

              <div style="margin-top: 16px" v-if="landList.length > 0">
                <div style="margin-bottom: 12px; font-weight: 600;">
                  {{ $t('newFarm.farmer.sections.landList') }}
                </div>
                <el-table :data="landList" border stripe>
                  <el-table-column prop="landName" :label="$t('newFarm.land.form.landName')" min-width="160" show-overflow-tooltip />
                  <el-table-column prop="landId" :label="$t('newFarm.land.form.landId')" min-width="140" show-overflow-tooltip />
                  <el-table-column :label="$t('newFarm.land.form.areaSize')" min-width="120">
                    <template #default="{ row }">
                      {{ formatArea(row.areaSize) }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('newFarm.land.form.currentStatus')" min-width="140" align="center">
                    <template #default="{ row }">
                      <el-tag size="small" :type="getLandStatusType(row.currentStatus)">
                        {{ $t(`newFarm.land.status.${row.currentStatus}`) }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('newFarm.common.actions')" width="300" fixed="right">
                    <template #default="{ row }">
                      <el-button type="success" size="small" @click="handleViewLandDetail(row.landId)">
                        <i class="ri-eye-line"></i>
                        {{ $t('newFarm.land.actions.viewDetail') }}
                      </el-button>
                      <el-button type="danger" size="small" @click="handleRemoveLand(row)">
                        <i class="ri-link-unlink"></i>
                        {{ $t('newFarm.land.actions.removeFarmer') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
