<template>
  <div class="feedback-detail-page">
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
          <h1 class="page-title">{{ $t('input.feedback.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button v-if="detailData && detailData.status === '0'" type="primary" @click="handleEdit">
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
            {{ $t('input.feedback.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.feedback.columns.feedbackNo') }}:</span>
              <span class="value">{{ detailData.feedbackNo }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.feedback.form.feedbackType') }}:</span>
              <el-tag :type="getTypeTag(detailData.feedbackType)">
                {{ getFeedbackTypeText(detailData.feedbackType) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.feedback.form.priority') }}:</span>
              <el-tag :type="getPriorityTag(detailData.priority)">
                {{ getPriorityText(detailData.priority) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.feedback.columns.status') }}:</span>
              <el-tag :type="getStatusTag(detailData.status)">
                {{ getStatusText(detailData.status) }}
              </el-tag>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.feedback.form.title') }}:</span>
              <span class="value">{{ detailData.title }}</span>
            </div>
            <div class="detail-item full-width content-item">
              <span class="label">{{ $t('input.feedback.form.content') }}:</span>
              <div class="value content-value">{{ detailData.content }}</div>
            </div>
            <div class="detail-item" v-if="detailData.inputName">
              <span class="label">{{ $t('input.feedback.form.inputName') }}:</span>
              <span class="value">{{ detailData.inputName }}</span>
            </div>
            <div class="detail-item" v-if="detailData.supplierName">
              <span class="label">{{ $t('input.feedback.form.supplierName') }}:</span>
              <span class="value">{{ detailData.supplierName }}</span>
            </div>
            <div class="detail-item full-width" v-if="detailData.remark">
              <span class="label">{{ $t('input.feedback.form.remark') }}:</span>
              <span class="value">{{ detailData.remark }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.feedback.columns.createTime') }}:</span>
              <span class="value">{{ detailData.createTime || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 联系信息 -->
        <div class="detail-section" v-if="detailData.contactName || detailData.contactPhone || detailData.contactEmail">
          <div class="section-title">
            <i class="ri-contacts-line"></i>
            {{ $t('input.feedback.form.contactInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item" v-if="detailData.contactName">
              <span class="label">{{ $t('input.feedback.form.contactName') }}:</span>
              <span class="value">{{ detailData.contactName }}</span>
            </div>
            <div class="detail-item" v-if="detailData.contactPhone">
              <span class="label">{{ $t('input.feedback.form.contactPhone') }}:</span>
              <span class="value">{{ detailData.contactPhone }}</span>
            </div>
            <div class="detail-item full-width" v-if="detailData.contactEmail">
              <span class="label">{{ $t('input.feedback.form.contactEmail') }}:</span>
              <span class="value">{{ detailData.contactEmail }}</span>
            </div>
          </div>
        </div>

        <!-- 处理信息 -->
        <div class="detail-section" v-if="detailData.status !== '0'">
          <div class="section-title">
            <i class="ri-file-edit-line"></i>
            {{ $t('input.feedback.form.processingInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item" v-if="detailData.handlerName">
              <span class="label">{{ $t('input.feedback.form.handlerName') }}:</span>
              <span class="value">{{ detailData.handlerName }}</span>
            </div>
            <div class="detail-item" v-if="detailData.handleTime">
              <span class="label">{{ $t('input.feedback.form.handleTime') }}:</span>
              <span class="value">{{ detailData.handleTime }}</span>
            </div>
            <div class="detail-item" v-if="detailData.processingHours !== null && detailData.processingHours !== undefined">
              <span class="label">{{ $t('input.feedback.form.processingHours') }}:</span>
              <span class="value">{{ detailData.processingHours }} {{ $t('common.hours', '小时') }}</span>
            </div>
            <div class="detail-item full-width" v-if="detailData.handleResult">
              <span class="label">{{ $t('input.feedback.form.handleResult') }}:</span>
              <div class="value content-value">{{ detailData.handleResult }}</div>
            </div>
            <div class="detail-item full-width" v-if="detailData.handleRemark">
              <span class="label">{{ $t('input.feedback.form.handleRemark') }}:</span>
              <span class="value">{{ detailData.handleRemark }}</span>
            </div>
          </div>
        </div>

        <!-- 评价信息 -->
        <div class="detail-section" v-if="detailData.satisfaction">
          <div class="section-title">
            <i class="ri-star-line"></i>
            {{ $t('input.feedback.form.evaluationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.feedback.form.satisfaction') }}:</span>
              <div class="value">
                <el-rate v-model="detailData.satisfaction" disabled show-score text-color="#ff9900" />
                <span class="satisfaction-text">{{ getSatisfactionText(detailData.satisfaction) }}</span>
              </div>
            </div>
            <div class="detail-item" v-if="detailData.evaluationTime">
              <span class="label">{{ $t('input.feedback.form.evaluationTime') }}:</span>
              <span class="value">{{ detailData.evaluationTime }}</span>
            </div>
            <div class="detail-item full-width" v-if="detailData.evaluation">
              <span class="label">{{ $t('input.feedback.form.evaluation') }}:</span>
              <div class="value content-value">{{ detailData.evaluation }}</div>
            </div>
          </div>
        </div>

        <!-- 回复列表 -->
        <!-- <div class="detail-section" v-if="detailData.replies && detailData.replies.length > 0">
          <div class="section-title">
            <i class="ri-chat-1-line"></i>
            {{ $t('input.feedback.replies', '回复记录') }} ({{ detailData.replies.length }})
          </div>
          <div class="reply-list">
            <div v-for="reply in detailData.replies" :key="reply.replyId" class="reply-item">
              <div class="reply-header">
                <div class="reply-user">
                  <i class="ri-user-line"></i>
                  <span class="user-name">{{ reply.replyUserName }}</span>
                  <el-tag size="small" :type="reply.replyUserType === '1' ? 'warning' : ''">
                    {{ reply.replyUserType === '1' ? $t('input.feedback.handler', '处理人员') : $t('input.feedback.user', '用户') }}
                  </el-tag>
                </div>
                <div class="reply-time">{{ reply.createTime }}</div>
              </div>
              <div class="reply-content">{{ reply.content }}</div>
              <div v-if="reply.attachmentList && reply.attachmentList.length > 0" class="reply-attachments">
                <i class="ri-attachment-line"></i>
                <span v-for="(file, index) in reply.attachmentList" :key="index" class="attachment-item">
                  {{ file }}
                </span>
              </div>
            </div>
          </div>
        </div> -->

        <!-- 无回复提示 -->
        <!-- <div class="detail-section" v-else>
          <div class="section-title">
            <i class="ri-chat-1-line"></i>
            {{ $t('input.feedback.replies', '回复记录') }}
          </div>
          <div class="empty-state">
            <i class="ri-chat-off-line"></i>
            <p>{{ $t('input.feedback.form.noReplies') }}</p>
          </div>
        </div> -->
      </template>
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

// 编辑
const handleEdit = () => {
  router.push(`/input/feedback/edit/${feedbackId}`)
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

<style scoped>
.feedback-detail-page {
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
  align-items: flex-start;
  gap: 12px;
}

.detail-item.content-item {
  align-items: flex-start;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item .label {
  font-size: 14px;
  color: #909399;
  flex-shrink: 0;
  min-width: 120px;
  padding-top: 2px;
}

.detail-item .value {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  flex: 1;
}

.content-value {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
}

.satisfaction-text {
  margin-left: 12px;
  color: #606266;
  font-size: 14px;
}

/* 回复列表 */
.reply-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reply-item {
  background: #f9fafb;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.reply-item:hover {
  border-color: #009A44;
  box-shadow: 0 2px 8px rgba(0, 154, 68, 0.1);
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.reply-user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reply-user i {
  font-size: 18px;
  color: #909399;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.reply-time {
  font-size: 13px;
  color: #909399;
}

.reply-content {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.reply-attachments {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #e4e7ed;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.reply-attachments i {
  color: #909399;
  font-size: 16px;
}

.attachment-item {
  font-size: 13px;
  color: #409eff;
  cursor: pointer;
  padding: 4px 8px;
  background: #ecf5ff;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.attachment-item:hover {
  background: #d9ecff;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 12px;
  display: block;
  opacity: 0.5;
}

.empty-state p {
  font-size: 14px;
  margin: 0;
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
    grid-template-columns: auto 1fr auto;
    gap: 12px;
  }

  .header-center {
    text-align: center;
  }

  .page-title {
    font-size: 18px;
  }

  .detail-wrapper {
    padding: 16px;
  }

  .detail-item .label {
    min-width: 80px;
  }

  .btn-text {
    display: none;
  }

  .reply-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .reply-time {
    align-self: flex-start;
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

  .detail-item {
    flex-direction: column;
    gap: 6px;
  }

  .detail-item .label {
    min-width: auto;
    padding-top: 0;
  }
}
</style>
