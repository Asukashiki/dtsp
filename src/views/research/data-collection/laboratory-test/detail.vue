<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.dataCollection.laboratoryTest.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading" v-if="detailData">
        <!-- 基础信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('research.dataCollection.laboratoryTest.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.batchId')">
                {{ detailData.batchId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.trialId')">
                {{ detailData.trialId }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 样本信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-test-tube-line"></i>
              <span>{{ $t('research.dataCollection.laboratoryTest.form.sampleInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.sampleId')">
                {{ detailData.sampleId }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 实验参数信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-flask-line"></i>
              <span>{{ $t('research.dataCollection.laboratoryTest.form.paramInfo') || '实验参数' }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.sampleType')">
                {{ detailData.sampleType || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.labParameter')">
                {{ detailData.labParameter || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.expectedRange') || '预期范围'">
                {{ expectedRangeText }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.resultValue')">
                {{ detailData.resultValue || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.testStatus')">
                <el-tag :type="passFlag === true ? 'success' : (passFlag === false ? 'danger' : 'info')">
                  {{ passFlag === true ? 'Pass' : (passFlag === false ? 'Fail' : '-') }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 测试数据 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-bar-chart-line"></i>
              <span>{{ $t('research.dataCollection.laboratoryTest.form.testInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.germinationRate')">
                <span class="highlight">{{ detailData.germinationRate }}%</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.purityPercent')">
                {{ detailData.purityPercent }}%
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.moistureContentPercent')">
                {{ detailData.moistureContentPercent }}%
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.proteinPercent')">
                {{ detailData.proteinPercent }}%
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.toxinLevelPpm')">
                {{ detailData.toxinLevelPpm || '-' }} PPM
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 健康与追溯 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-heart-pulse-line"></i>
              <span>{{ $t('research.dataCollection.laboratoryTest.form.qualityInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.seedHealthFindings')" :span="2">
                {{ detailData.seedHealthFindings || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.traceabilityLink')">
                {{ detailData.traceabilityLink || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.labReportFile')">
                <span v-if="detailData.labReportFile" class="file-link" @click="handlePreviewFile(detailData.labReportFile)">
                  <i class="ri-file-pdf-line"></i>
                  {{ detailData.labReportFileName || $t('research.dataCollection.laboratoryTest.form.labReportFile') }}
                </span>
                <span v-else>-</span>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 检测信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-calendar-check-line"></i>
              <span>{{ $t('research.dataCollection.laboratoryTest.form.testingInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.testDate')">
                {{ detailData.testDate || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.testOrganization')">
                {{ detailData.testOrganization || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.testerName')">
                {{ detailData.testerName || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 工作流信息 -->
        <WorkflowInfo
          :workflow-status="detailData.workflowStatus"
          mode="view"
          :approval-history="approvalHistory"
          :hide-for-states="['S0', 'S10']" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'
import { getLabTestDetail } from '@/api/labTest'
import { getFilePreviewUrl } from '@/api/file'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const approvalHistory = ref([])

const PARAM_RULES = {
  'pH': { key: 'pH', type: 'range', min: 5.5, max: 7.5 },
  'moisture': { key: 'moisture', type: 'lt', max: 13, unit: '%' },
  'protein': { key: 'protein', type: 'percent', unit: '%' },
  'EC': { key: 'EC', type: 'number', unit: 'mS/cm' },
  'mycotoxin': { key: 'mycotoxin', type: 'number', unit: 'PPM' },
  'NPK': { key: 'NPK', type: 'text' }
}

const expectedRangeText = computed(() => {
  if (!detailData.value) return '-'
  const rule = PARAM_RULES[detailData.value.labParameter]
  if (!rule) return '-'
  if (rule.type === 'range') return `${rule.min} - ${rule.max}`
  if (rule.type === 'lt') return `< ${rule.max}${rule.unit || ''}`
  return '-'
})

const passFlag = computed(() => {
  if (!detailData.value) return null
  const rule = PARAM_RULES[detailData.value.labParameter]
  const raw = detailData.value.resultValue
  if (!rule || raw === undefined || raw === null || raw === '') return null
  const v = Number(raw)
  if (isNaN(v)) return null
  if (rule.type === 'range') return v >= rule.min && v <= rule.max
  if (rule.type === 'lt') return v < rule.max
  return null
})

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getLabTestDetail(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
      // 加载审批历史（如果有的话）
      if (res.data.approvalHistory) {
        approvalHistory.value = res.data.approvalHistory
      }
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 文件预览处理
const handlePreviewFile = async (fileId) => {
  if (!fileId) return

  try {
    const res = await getFilePreviewUrl(fileId)
    if (res.code === 200 && res.msg) {
      window.open(res.msg, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview file:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadDetail()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

/* 高亮样式 */
.highlight {
  color: #009A44;
  font-weight: 600;
  font-size: 16px;
}

/* 文件链接样式 */
.file-link {
  color: #009A44 !important;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
}

.file-link:hover {
  color: #007a36 !important;
  text-decoration: underline;
}

.file-link i {
  font-size: 16px;
}
</style>
