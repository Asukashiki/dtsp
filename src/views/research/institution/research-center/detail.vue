<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.researchCenter.detail') }}</h1>
          </div>
        </div>
        <!-- <div class="header-actions">
          <el-button type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i>{{ $t('common.edit') }}
          </el-button>
        </div> -->
      </div>

      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('research.breedingData.researchCenter.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.researchCenter.form.locationId')">
                {{ detailData.locationId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.researchCenter.form.locationName')">
                {{ detailData.locationName || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 位置信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-map-pin-line"></i>
              <span>{{ $t('research.breedingData.researchCenter.form.locationInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.researchCenter.form.region')">
                {{ detailData.region || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.researchCenter.form.zone')">
                {{ detailData.zone || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.researchCenter.form.woneda')">
                {{ detailData.woneda || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 地理坐标 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-map-2-line"></i>
              <span>{{ $t('research.breedingData.researchCenter.form.geoInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.researchCenter.form.latitude')">
                {{ detailData.latitude || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.researchCenter.form.longitude')">
                {{ detailData.longitude || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 备注信息 -->
        <div class="info-card" v-if="detailData.remark">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-text-line"></i>
              <span>{{ $t('research.breedingData.researchCenter.form.remark') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="1" border>
              <el-descriptions-item :label="$t('research.breedingData.researchCenter.form.remark')">
                {{ detailData.remark || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审计信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-time-line"></i>
              <span>{{ $t('common.auditInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('common.createBy')">
                {{ detailData.createBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('common.createTime')">
                {{ detailData.createTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('common.updateBy')">
                {{ detailData.updateBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('common.updateTime')">
                {{ detailData.updateTime || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getLocationMasterInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getLocationMasterInfo(route.params.locationId)
    detailData.value = res.data || {}
  } catch (error) {
    console.error('Failed to load research center info:', error)
  } finally {
    loading.value = false
  }
}

const handleEdit = () => {
  router.push(`/research/institution/research-center/edit/${route.params.locationId}`)
}

const goBack = () => {
  router.push('/research/institution/research-center')
}

onMounted(() => {
  getInfo()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
