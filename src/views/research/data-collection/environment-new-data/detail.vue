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
            <h1 class="page-title">{{ $t('research.environmentNewData.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('research.environmentNewData.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.envRecordId')">
                {{ detailData.envRecordId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.stationId')">
                {{ detailData.stationId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.parameterCode')">
                <el-tag :type="getParameterTag(detailData.parameterCode)" size="small">
                  {{ getParameterName(detailData.parameterCode) }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.value')">
                {{ detailData.value }} {{ detailData.unit }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.timestamp')">
                {{ detailData.timestamp || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.source')">
                {{ detailData.source || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.batchId')">
                {{ detailData.batchName || detailData.batchId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.trialId')">
                {{ detailData.trialName || detailData.trialId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.plotId')">
                {{ detailData.plotName || detailData.plotId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.form.remark')" :span="2">
                {{ detailData.remark || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 元数据信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('common.systemInfo') || 'System Information' }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.createBy')">
                {{ detailData.createBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.createTime')">
                {{ detailData.createTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.updateBy')">
                {{ detailData.updateBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.updateTime')">
                {{ detailData.updateTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.auditBy')">
                {{ detailData.auditBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.environmentNewData.columns.auditTime')">
                {{ detailData.auditTime || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getEnvironmentNewDataDetail } from '@/api/environment-new-data'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const { getLabelByValue } = useDict(['env_parameter_code'])

const loading = ref(false)
const detailData = reactive({
  envRecordId: '',
  trialId: '',
  trialName: '',
  batchId: '',
  batchName: '',
  plotId: '',
  plotName: '',
  stationId: '',
  timestamp: '',
  parameterCode: '',
  value: null,
  unit: '',
  source: '',
  remark: '',
  createBy: '',
  createTime: '',
  updateTime: '',
  updateBy: '',
  auditBy: '',
  auditTime: '',
  workflowStatus: ''
})

// 获取参数类型标签
const getParameterTag = (code) => {
  const tagMap = {
    'RAIN_DAILY': 'primary',
    'TMAX': 'danger',
    'TMIN': 'info',
    'HUMIDITY': '',
    'WIND_SPEED': 'warning',
    'SOLAR_RAD': 'success'
  }
  return tagMap[code] || ''
}

// 获取参数名称（使用字典）
const getParameterName = (code) => {
  return getLabelByValue('env_parameter_code', code) || code || '-'
}

// 加载详情
const loadDetail = async () => {
  const id = route.params.envRecordId
  if (!id) return

  loading.value = true
  try {
    const res = await getEnvironmentNewDataDetail(id)
    if (res.code === 200 && res.data) {
      Object.assign(detailData, res.data)
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 返回
const handleBack = () => {
  router.back()
}

onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
