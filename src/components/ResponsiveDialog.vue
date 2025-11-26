<template>
  <!-- PC端使用 el-dialog -->
  <el-dialog
    v-if="!isMobile"
    v-model="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    class="responsive-dialog-pc"
    @close="handleClose"
  >
    <div class="pc-body-wrapper">
      <slot></slot>
    </div>
    <template #footer v-if="showFooter">
      <div class="pc-footer-wrapper">
        <slot name="footer">
          <el-button @click="handleCancel">
            {{ cancelText || $t('common.cancel') }}
          </el-button>
          <el-button type="primary" @click="handleConfirm" :loading="confirmLoading">
            {{ confirmText || $t('common.confirm') }}
          </el-button>
        </slot>
      </div>
    </template>
  </el-dialog>

  <!-- 移动端使用自定义全屏弹窗 -->
  <Teleport to="body" v-if="isMobile">
    <Transition name="mobile-dialog">
      <div v-if="visible" class="mobile-dialog-overlay" @click="handleOverlayClick">
        <div class="mobile-dialog-container" @click.stop>
          <!-- Header -->
          <div class="mobile-dialog-header">
            <span class="mobile-dialog-title">{{ title }}</span>
            <button class="mobile-dialog-close" @click="handleCancel">
              <i class="ri-close-line"></i>
            </button>
          </div>

          <!-- Body - 可滚动区域 -->
          <div class="mobile-dialog-body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="showFooter" class="mobile-dialog-footer">
            <slot name="footer">
              <el-button @click="handleCancel" style="flex: 1">
                {{ cancelText || $t('common.cancel') }}
              </el-button>
              <el-button type="primary" @click="handleConfirm" :loading="confirmLoading" style="flex: 1">
                {{ confirmText || $t('common.confirm') }}
              </el-button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '600px'
  },
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  confirmText: {
    type: String,
    default: ''
  },
  cancelText: {
    type: String,
    default: ''
  },
  confirmLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

// 移动端判断
const isMobile = ref(false)

// 检测是否为移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 控制弹窗显示
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 处理确认
const handleConfirm = () => {
  emit('confirm')
}

// 处理取消
const handleCancel = () => {
  emit('cancel')
  visible.value = false
}

// 处理关闭
const handleClose = () => {
  emit('close')
}

// 处理遮罩点击
const handleOverlayClick = () => {
  if (props.closeOnClickModal) {
    visible.value = false
  }
}

// 防止背景滚动
watch(visible, (newVal) => {
  if (isMobile.value) {
    if (newVal) {
      // 打开弹窗时禁止body滚动
      document.body.style.overflow = 'hidden'
    } else {
      // 关闭弹窗时恢复body滚动
      document.body.style.overflow = ''
    }
  }
})

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
  // 清理时恢复body滚动
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ==================== PC端样式 ==================== */
.responsive-dialog-pc :deep(.el-dialog__body) {
  padding: 20px;
  overflow: hidden;
}

.responsive-dialog-pc :deep(.el-dialog__footer) {
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.pc-body-wrapper {
  width: 100%;
  max-height: calc(100vh - 240px);
  overflow-y: auto;
  overflow-x: hidden;
}

.pc-footer-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* ==================== 移动端样式 ==================== */
.mobile-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: flex-end;
}

.mobile-dialog-container {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header - 固定顶部 */
.mobile-dialog-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  z-index: 1;
}

.mobile-dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  flex: 1;
}

.mobile-dialog-close {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
  padding: 0;
  flex-shrink: 0;
  margin-left: 12px;
}

.mobile-dialog-close:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.mobile-dialog-close i {
  font-size: 24px;
  color: #606266;
}

/* Body - 可滚动区域 */
.mobile-dialog-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 20px;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* Footer - 固定底部 */
.mobile-dialog-footer {
  flex-shrink: 0;
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  display: flex;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.mobile-dialog-footer :deep(.el-button) {
  flex: 1;
}

/* ==================== 过渡动画 ==================== */
.mobile-dialog-enter-active,
.mobile-dialog-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-dialog-enter-active .mobile-dialog-container,
.mobile-dialog-leave-active .mobile-dialog-container {
  transition: transform 0.3s ease;
}

.mobile-dialog-enter-from,
.mobile-dialog-leave-to {
  opacity: 0;
}

.mobile-dialog-enter-from .mobile-dialog-container {
  transform: translateY(100%);
}

.mobile-dialog-leave-to .mobile-dialog-container {
  transform: translateY(100%);
}

/* ==================== 防止背景滚动 ==================== */
.mobile-dialog-overlay {
  touch-action: none;
}
</style>
