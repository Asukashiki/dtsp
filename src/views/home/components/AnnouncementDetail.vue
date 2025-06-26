<template>
  <el-dialog
    v-model="dialogVisible"
    :title="''"
    width="800px"
    :before-close="handleClose"
    append-to-body
    :close-on-click-modal="false"
    class="announcement-detail-dialog"
    destroy-on-close
  >
    <template #header>
      <div class="dialog-header">
        <div class="title-icon">
          <img src="@/assets/Title.svg" alt="系统公告" />
        </div>
        <span>系统公告</span>
      </div>
    </template>
    <div class="announcement-detail">
      <div class="detail-header">
        <div class="detail-title">{{ announcement.title }}</div>
        <div class="detail-meta">
          <span class="detail-time">
            <i class="ri-time-line"></i> 
            公告时间: {{ announcement.time }}
          </span>
          <span class="detail-publisher" v-if="announcement.publisher">
            <i class="ri-user-line"></i> 
            发布者: {{ announcement.publisher || 'HCM' }}
          </span>
        </div>
      </div>
      <div class="detail-content">
        <div class="content-body">
          {{ announcement.content }}
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  announcement: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
      time: '',
      publisher: 'HCM',
      attachments: [],
      important: false
    })
  }
});

const emit = defineEmits(['update:visible']);

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
});

const handleClose = () => {
  emit('update:visible', false);
};
</script>

<style scoped>
.announcement-detail {
  padding: 20px 30px 10px;
}

.detail-header {
  margin-bottom: 24px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
  text-align: center;
}

.detail-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.detail-meta {
  display: flex;
  font-size: 14px;
  color: #909399;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.detail-time, .detail-publisher {
  display: flex;
  align-items: center;
}

.detail-time {
  margin-right: 0;
}

.detail-meta i {
  margin-right: 5px;
  font-size: 16px;
}

.detail-content {
  font-size: 16px;
  line-height: 1.8;
  color: #303133;
  white-space: pre-wrap;
}

.content-body {
  margin-bottom: 30px;
  min-height: 80px;
  text-align: justify;
  padding: 0 10px;
  letter-spacing: 0.5px;
}

.attachment-list {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.attachment-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #606266;
  display: flex;
  align-items: center;
}

.attachment-title i {
  margin-right: 6px;
  color: #1c59e2;
}

.attachment-items {
  padding-left: 8px;
}

.attachment-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.attachment-item i {
  color: #1c59e2;
  margin-right: 6px;
}

.file-name {
  flex: 1;
  font-size: 14px;
  color: #606266;
}

.detail-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.important-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background-color: #fef0f0;
  color: #f56c6c;
  border-radius: 4px;
  font-size: 14px;
}

.important-tag i {
  margin-right: 4px;
}

/* Dialog样式自定义 */
:deep(.el-dialog) {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid #ebeef5;
  padding: 16px 20px;
  position: relative;
  background-color: #ffffff;
}

.dialog-header {
  display: flex;
  align-items: center;
  height: 24px;
  line-height: 24px;
}

.title-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
  height: 100%;
}

.title-icon img {
  width: 12px;
  height: 12px;
  transform: rotate(-10deg);
}

.dialog-header span {
  font-weight: 600;
  color: #303133;
  font-size: 18px;
  line-height: 1;
  position: relative;
  top: 1px;
}

:deep(.el-dialog__headerbtn) {
  position: absolute;
  top: 16px;
  right: 20px;
  outline: none;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  font-size: 20px;
  color: #909399;
  transition: color 0.2s;
}

:deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  color: #1c59e2;
}

:deep(.el-dialog__headerbtn:focus),
:deep(.el-dialog__headerbtn:focus-visible),
:deep(.el-dialog__headerbtn:active) {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

:deep(.el-dialog__headerbtn .el-dialog__close:focus),
:deep(.el-dialog__headerbtn .el-dialog__close:focus-visible),
:deep(.el-dialog__headerbtn .el-dialog__close:active) {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

:deep(.el-dialog__close:focus-visible) {
  outline: 0 !important;
}

:deep(.el-dialog__body) {
  padding: 0;
  background-color: #ffffff;
}

:deep(.el-dialog__footer) {
  border-top: 1px solid #ebeef5;
  padding: 15px 20px;
  background-color: #ffffff;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

:deep(.el-button--primary) {
  min-width: 80px;
  background-color: #1c59e2;
  border-color: #1c59e2;
  border-radius: 4px;
  padding: 8px 20px;
  font-weight: 500;
}

:deep(.el-button--primary):hover {
  background-color: #4075e6;
  border-color: #4075e6;
}
</style>

<style>
/* 全局样式覆盖
.announcement-detail-dialog .el-dialog__headerbtn:focus,
.announcement-detail-dialog .el-dialog__headerbtn:focus-visible,
.announcement-detail-dialog .el-dialog__headerbtn:active,
.announcement-detail-dialog .el-dialog__headerbtn .el-dialog__close:focus,
.announcement-detail-dialog .el-dialog__headerbtn .el-dialog__close:focus-visible,
.announcement-detail-dialog .el-dialog__headerbtn .el-dialog__close:active,
.announcement-detail-dialog .el-dialog__close:focus-visible {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
} */

.announcement-detail-dialog .el-dialog__headerbtn {
  outline: none !important;
}

.announcement-detail-dialog .el-dialog__headerbtn:focus-visible {
  outline: none !important;
}

/* 移除关闭按钮的焦点样式 */
/* .announcement-detail-dialog button:focus,
.announcement-detail-dialog button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
  border-color: transparent !important;
} */
</style> 