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
            <h1 class="page-title">{{ $t('research.dataCollection.fieldInspectionAudit.detail') }}</h1>
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
              <span>{{ $t('research.dataCollection.yieldData.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.batchId')">
                {{ detailData.batchId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.trialId')">
                {{ detailData.trialId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.plotId')">
                {{ detailData.plotId || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 检验信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-search-line"></i>
              <span>{{ $t('research.dataCollection.yieldData.form.inspectionInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.inspectionDate')">
                {{ detailData.inspectionDate || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.inspectionType')">
                {{ detailData.inspectionType || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.scoreCode')">
                {{ detailData.scoreCode || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.scoreValue')">
                {{ detailData.scoreValue || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审核信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-check-line"></i>
              <span>{{ $t('research.dataCollection.fieldInspectionAudit.form.auditInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.auditBy')">
                {{ detailData.auditBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.auditTime')">
                {{ detailData.auditTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.columns.auditStatus')">
                <el-tag :type="getWorkflowStatusType(detailData.workflowStatus)" effect="plain">
                  {{ getLabelByValue('flow_status', detailData.workflowStatus) || detailData.workflowStatus || '-' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.fieldInspectionAudit.form.auditComment')" :span="2">
                {{ detailData.auditRemark || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 系统信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-settings-3-line"></i>
              <span>{{ $t('common.systemInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.createBy')">
                {{ detailData.createdBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.createTime')">
                {{ detailData.createdTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.updateBy')">
                {{ detailData.updateBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.yieldData.form.updateTime')">
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFieldInspectionAuditInfo } from '@/api/fieldInspectionAudit'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { getLabelByValue } = useDict(['flow_status'])

const loading = ref(false)
const detailData = reactive({
  id: null,
  batchId: '',
  trialId: '',
  plotId: '',
  inspectionDate: '',
  inspectionType: '',
  scoreCode: '',
  scoreValue: null,
  auditBy: '',
  auditTime: '',
  workflowStatus: '',
  auditRemark: '',
  createdBy: '',
  createdTime: '',
  updateBy: '',
  updateTime: ''
})

// 获取工作流状态标签类型
const getWorkflowStatusType = (workflowStatus) => {
  const workflowStatusMap = {
    'S0': 'info',
    'S1': 'warning',
    'S2': 'primary',
    'S3': 'danger',
    'S9': 'danger',
    'S10': 'danger'
  }
  return workflowStatusMap[workflowStatus] || 'info'
}

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getFieldInspectionAuditInfo(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(detailData, res.data)
    } else {
      ElMessage.error(t('common.loadFailed'))
      handleBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    handleBack()
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
