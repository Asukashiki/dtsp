<template>
  <el-dialog
    v-model="dialogVisible"
    :title="''"
    :fullscreen="isMobile"
    :before-close="handleClose"
    append-to-body
    :close-on-click-modal="false"
    class="announcement-detail-dialog"
    destroy-on-close
  >
    <template #header>
      <div class="dialog-header flex items-center gap-4">
        <div class="header-icon w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
          <i :class="headerIcon" class="text-2xl text-white"></i>
        </div>
        <div class="header-title text-xl font-bold text-[#009A44]">
          {{ dialogTitle }}
        </div>
      </div>
    </template>

    <div class="announcement-detail p-6">
      <!-- 标题区域 -->
      <div class="detail-header mb-6 pb-5 border-b-2 border-[rgba(0,154,68,0.1)]">
        <h2 class="detail-title text-2xl font-bold text-[#303133] mb-5 text-center leading-relaxed">
          {{ announcement.content }}
        </h2>
        <div class="detail-meta flex items-center justify-center gap-6 flex-wrap">
          <span class="meta-item flex items-center gap-2 text-sm text-[#606266] bg-[rgba(0,154,68,0.06)] px-4 py-2 rounded-full">
            <i class="ri-time-line text-[#009A44] text-base"></i>
            <span class="font-medium">{{ timeLabel }}:</span>
            <span>{{ announcement.publicTime || announcement.createTime }}</span>
          </span>
          <span v-if="announcement.orgName" class="meta-item flex items-center gap-2 text-sm text-[#606266] bg-[rgba(0,154,68,0.06)] px-4 py-2 rounded-full">
            <i class="ri-user-line text-[#009A44] text-base"></i>
            <span class="font-medium">{{ $t('dataList.publisher') }}:</span>
            <span>{{ announcement.orgName }}</span>
          </span>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="detail-content">
        <div class="content-body min-h-[500px] text-base leading-8 text-[#303133] whitespace-pre-wrap text-justify px-2 tracking-wide">
          {{ announcement.content }}
        </div>
      </div>

      <!-- 附件区域（如果有） -->
      <div v-if="announcement.attachments?.length" class="attachment-section mt-6 p-5 bg-[rgba(0,154,68,0.04)] rounded-xl border border-[rgba(0,154,68,0.1)]">
        <div class="attachment-title flex items-center gap-2 text-base font-semibold text-[#009A44] mb-4">
          <i class="ri-attachment-2 text-lg"></i>
          <span>附件列表</span>
        </div>
        <div class="attachment-list space-y-3">
          <div
            v-for="(file, index) in announcement.attachments"
            :key="index"
            class="attachment-item flex items-center gap-3 p-3 bg-white rounded-lg border border-[rgba(0,0,0,0.06)] hover:border-[#009A44] hover:shadow-sm transition-all cursor-pointer"
          >
            <i class="ri-file-text-line text-[#009A44] text-xl"></i>
            <span class="flex-1 text-sm text-[#606266] truncate">{{ file.name }}</span>
            <el-button type="primary" link size="small" class="text-[#009A44]">
              <i class="ri-download-line mr-1"></i>
              下载
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer flex justify-center">
        <el-button
          type="primary"
          size="large"
          @click="handleClose"
          class="confirm-btn min-w-[140px]"
        >
          <i class="ri-check-line mr-1"></i>
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const handleClose = () => {
  emit('update:visible', false)
}

// 响应式判断是否为移动端
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const route = useRoute()
const name = computed(() => route.query.name || 'systemAnnouncement')

// 配置映射
const configMap = {
  systemAnnouncement: {
    titleKey: 'dataList.systemAnnouncement',
    timeKey: 'dataList.systemTime',
    icon: 'ri-notification-3-line'
  },
  alreadyDone: {
    titleKey: 'dataList.myDone',
    timeKey: 'dataList.doneTime',
    icon: 'ri-checkbox-circle-line'
  },
  representative: {
    titleKey: 'dataList.myTodo',
    timeKey: 'dataList.publishTime',
    icon: 'ri-time-line'
  }
}

const currentConfig = computed(() => configMap[name.value] || configMap.systemAnnouncement)
const dialogTitle = computed(() => t(currentConfig.value.titleKey))
const timeLabel = computed(() => t(currentConfig.value.timeKey))
const headerIcon = computed(() => currentConfig.value.icon)
</script>

<style scoped>
/* Dialog 头部样式 */
:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

:deep(.el-dialog__header) {
  padding: 20px 24px;
  margin: 0;
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-icon {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.3);
}

:deep(.el-dialog__headerbtn) {
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

:deep(.el-dialog__headerbtn:hover) {
  background: rgba(0, 154, 68, 0.1);
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  font-size: 18px;
  color: #909399;
  transition: color 0.2s;
}

:deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  color: #009A44;
}

/* Dialog 内容区样式 */
:deep(.el-dialog__body) {
  padding: 0;
  background: white;
}

/* Dialog 底部样式 */
:deep(.el-dialog__footer) {
  padding: 16px 24px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, rgba(0, 154, 68, 0.02) 0%, white 100%);
}

/* 确认按钮样式 */
.confirm-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%) !important;
  border: none !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  height: 44px !important;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.25);
  transition: all 0.3s ease !important;
}

.confirm-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%) !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 154, 68, 0.35);
}

/* 内容区域样式增强 */
.detail-header {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.02) 100%);
  margin: -24px -24px 24px -24px;
  padding: 28px 24px 24px;
  border-radius: 0;
}

.detail-title {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Meta 标签悬浮效果 */
.meta-item {
  transition: all 0.3s ease;
}

.meta-item:hover {
  background: rgba(0, 154, 68, 0.12);
  transform: translateY(-1px);
}

/* 附件项悬浮效果 */
.attachment-item:hover {
  border-color: rgba(0, 154, 68, 0.3);
  box-shadow: 0 2px 8px rgba(0, 154, 68, 0.1);
}

/* 响应式设计 - 移动端全屏 */
@media screen and (max-width: 768px) {
  :deep(.el-dialog) {
    display: flex;
    flex-direction: column;
  }

  :deep(.el-dialog__header) {
    padding: 16px;
    flex-shrink: 0;
    /* 适配 iOS 顶部安全区 */
    padding-top: calc(16px + env(safe-area-inset-top));
  }

  :deep(.el-dialog__body) {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  :deep(.el-dialog__footer) {
    flex-shrink: 0;
    padding: 12px 16px 20px;
    /* 适配 iOS 底部安全区 */
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
  }

  .announcement-detail {
    padding: 16px !important;
  }

  .detail-header {
    margin: -16px -16px 20px -16px;
    padding: 20px 16px;
  }

  .detail-title {
    font-size: 18px !important;
  }

  .detail-meta {
    flex-direction: column;
    gap: 12px;
  }

  .meta-item {
    width: 100%;
    justify-content: center;
  }

  .content-body {
    font-size: 15px;
    line-height: 1.8;
    min-height: auto !important;
  }

  .confirm-btn {
    width: 100% !important;
  }

  .header-icon {
    width: 40px !important;
    height: 40px !important;
  }

  .header-icon i {
    font-size: 20px !important;
  }

  .header-title {
    font-size: 18px !important;
  }
}
</style>

<style>
/* 全局样式覆盖 - 移除焦点轮廓 */
.announcement-detail-dialog .el-dialog__headerbtn:focus,
.announcement-detail-dialog .el-dialog__headerbtn:focus-visible {
  outline: none !important;
}

/* 移动端全屏对话框样式 */
@media screen and (max-width: 768px) {
  .announcement-detail-dialog .el-dialog {
    display: flex !important;
    flex-direction: column !important;
  }

  .announcement-detail-dialog .el-dialog.is-fullscreen {
    border-radius: 0 !important;
  }

  .announcement-detail-dialog .el-dialog__body {
    flex: 1 !important;
    overflow-y: auto !important;
  }
}
</style>
