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
            <h1 class="page-title">{{ $t('input.feedback.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.feedback.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.feedback.columns.feedbackNo')">
                  {{ detailData.feedbackNo }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.feedback.form.feedbackType')">
                  <el-tag :type="getTypeTag(detailData.feedbackType)" effect="plain">
                    {{ getFeedbackTypeText(detailData.feedbackType) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.feedback.form.priority')">
                  <el-tag :type="getPriorityTag(detailData.priority)" effect="plain">
                    {{ getPriorityText(detailData.priority) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.feedback.columns.status')">
                  <el-tag :type="getStatusTag(detailData.status)" effect="plain">
                    {{ getStatusText(detailData.status) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.feedback.form.title')" :span="2">
                  {{ detailData.title }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.feedback.form.content')" :span="2">
                  <div class="whitespace-pre-wrap break-words leading-6">{{ detailData.content }}</div>
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.inputName" :label="$t('input.feedback.form.inputName')">
                  {{ detailData.inputName }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.supplierName" :label="$t('input.feedback.form.supplierName')">
                  {{ detailData.supplierName }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.remark" :label="$t('input.feedback.form.remark')" :span="2">
                  <div class="whitespace-pre-wrap break-words leading-6">{{ detailData.remark }}</div>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.feedback.columns.createTime')">
                  {{ detailData.createTime || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 联系信息 -->
          <div class="info-card" v-if="detailData.contactName || detailData.contactPhone || detailData.contactEmail">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-contacts-line"></i>
                <span>{{ $t('input.feedback.form.contactInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item v-if="detailData.contactName" :label="$t('input.feedback.form.contactName')">
                  {{ detailData.contactName }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.contactPhone" :label="$t('input.feedback.form.contactPhone')">
                  {{ detailData.contactPhone }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.contactEmail" :label="$t('input.feedback.form.contactEmail')" :span="2">
                  {{ detailData.contactEmail }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 处理信息 -->
          <div class="info-card" v-if="detailData.status !== '0'">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-edit-line"></i>
                <span>{{ $t('input.feedback.form.processingInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item v-if="detailData.handlerName" :label="$t('input.feedback.form.handlerName')">
                  {{ detailData.handlerName }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.handleTime" :label="$t('input.feedback.form.handleTime')">
                  {{ detailData.handleTime }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.processingHours !== null && detailData.processingHours !== undefined" :label="$t('input.feedback.form.processingHours')">
                  {{ detailData.processingHours }} {{ $t('common.hours', '小时') }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.handleResult" :label="$t('input.feedback.form.handleResult')" :span="2">
                  <div class="whitespace-pre-wrap break-words leading-6">{{ detailData.handleResult }}</div>
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.handleRemark" :label="$t('input.feedback.form.handleRemark')" :span="2">
                  <div class="whitespace-pre-wrap break-words leading-6">{{ detailData.handleRemark }}</div>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 评价信息 -->
          <div class="info-card" v-if="detailData.satisfaction">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-star-line"></i>
                <span>{{ $t('input.feedback.form.evaluationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.feedback.form.satisfaction')">
                  <div class="flex items-center gap-3">
                    <el-rate :model-value="detailData.satisfaction" disabled show-score text-color="#ff9900" />
                    <span class="text-sm text-gray-600">{{ getSatisfactionText(detailData.satisfaction) }}</span>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.evaluationTime" :label="$t('input.feedback.form.evaluationTime')">
                  {{ detailData.evaluationTime }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.evaluation" :label="$t('input.feedback.form.evaluation')" :span="2">
                  <div class="whitespace-pre-wrap break-words leading-6">{{ detailData.evaluation }}</div>
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
import { getFeedbackDetail } from '@/api/feedback'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const feedbackId = route.params.id

// 获取反馈类型标签
const getTypeTag = (type) => {
  const typeMap = {
    '0': 'danger',   // 投诉
    '1': 'success',  // 建议
    '2': 'info',     // 咨询
    '3': 'warning',  // 故障报告
    '4': ''          // 其他
  }
  return typeMap[type] || ''
}

// 获取反馈类型文本
const getFeedbackTypeText = (type) => {
  const typeMap = {
    '0': t('input.feedback.type.complaint'),
    '1': t('input.feedback.type.suggestion'),
    '2': t('input.feedback.type.inquiry'),
    '3': t('input.feedback.type.fault'),
    '4': t('input.feedback.type.other')
  }
  return typeMap[type] || ''
}

// 获取优先级标签
const getPriorityTag = (priority) => {
  const priorityMap = {
    '0': 'info',     // 低
    '1': '',         // 中
    '2': 'warning',  // 高
    '3': 'danger'    // 紧急
  }
  return priorityMap[priority] || ''
}

// 获取优先级文本
const getPriorityText = (priority) => {
  const priorityMap = {
    '0': t('input.feedback.priority.low'),
    '1': t('input.feedback.priority.medium'),
    '2': t('input.feedback.priority.high'),
    '3': t('input.feedback.priority.urgent')
  }
  return priorityMap[priority] || ''
}

// 获取状态标签
const getStatusTag = (status) => {
  const statusMap = {
    '0': 'info',     // 待处理
    '1': 'warning',  // 处理中
    '2': 'success',  // 已完成
    '3': ''          // 已关闭
  }
  return statusMap[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    '0': t('input.feedback.status.pending'),
    '1': t('input.feedback.status.processing'),
    '2': t('input.feedback.status.completed'),
    '3': t('input.feedback.status.closed')
  }
  return statusMap[status] || ''
}

// 获取满意度文本
const getSatisfactionText = (score) => {
  return t(`input.feedback.satisfactionLevel.${score}`, '')
}

// 返回
const goBack = () => {
  router.back()
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getFeedbackDetail(feedbackId)
    if (res.code === 200) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load feedback detail:', error)
    ElMessage.error(t('common.loadFailed'))
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
@use '@/assets/styles/workflow-common.scss';
</style>
