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
                <el-descriptions-item :label="$t('newFarm.land.form.id')">
                  {{ detail.landId || detail.id || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.farmerId')">
                  {{ detail.farmerId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.kebeleId')">
                  {{ detail.kebeleId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.status')">
                  <el-tag :type="getLandStatusType(detail.status)" size="small">
                    {{ getLandStatusLabel(detail.status) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.areaTa')">
                  {{ formatArea(detail.areaTa) }}
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
                <el-descriptions-item :label="$t('newFarm.land.form.gpsLat')">
                  {{ detail.gpsLat || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.gpsLong')">
                  {{ detail.gpsLong || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('newFarm.land.form.gpsPolygon')" :span="2">
                  {{ detail.gpsPolygon || '-' }}
                </el-descriptions-item>
              </el-descriptions>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getLandDetail } from '@/api/newFarm'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const landId = computed(() => route.params.id)

const loading = ref(false)
const detail = ref(null)

const goBack = () => {
  router.back()
}

const formatArea = (area) => {
  if (area === null || area === undefined || area === '') return '0.00 ha'
  return `${parseFloat(area).toFixed(2)} ha`
}

const getLandStatusType = (status) => {
  const typeMap = {
    '0': 'info',
    '1': 'success',
    '2': 'danger'
  }
  return typeMap[String(status)] || 'info'
}

const getLandStatusLabel = (status) => {
  const labelMap = {
    '0': t('newFarm.land.status.0'),
    '1': t('newFarm.land.status.1'),
    '2': t('newFarm.land.status.2')
  }
  return labelMap[String(status)] || '-'
}

const loadDetail = async () => {
  if (!landId.value) {
    ElMessage.error(t('common.failed'))
    router.back()
    return
  }

  loading.value = true
  try {
    const res = await getLandDetail(landId.value)
    if (res.code === 200) {
      detail.value = res.data
    } else {
      ElMessage.error(res.msg || t('common.failed'))
      router.back()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
    router.back()
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
</style>
