<template>
  <div class="field-inspection-audit-container">
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
          <h1 class="page-title">{{ $t('research.dataCollection.fieldInspectionAudit.title') }}</h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 审核表单区域 -->
    <div class="form-wrapper">
      <el-form
        ref="formRef"
        v-loading="loading"
        :model="formData"
        label-position="right"
        label-width="200px"
        class="audit-form"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.dataCollection.fieldInspectionAudit.form.basicInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('research.dataCollection.yieldData.form.batchId')">
                <el-input v-model="detailData.batchId" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('research.dataCollection.yieldData.form.trialId')">
                <el-input v-model="detailData.trialId" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('research.dataCollection.yieldData.form.plotId')">
                <el-input v-model="detailData.plotId" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 检验信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-file-search-line"></i>
            {{ $t('research.dataCollection.fieldInspectionAudit.form.inspectionInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('research.dataCollection.yieldData.form.inspectionDate')">
                <el-date-picker
                  v-model="detailData.inspectionDate"
                  type="date"
                  :placeholder="$t('research.dataCollection.yieldData.placeholder.inspectionDate')"
                  style="width: 100%"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('research.dataCollection.yieldData.form.inspectionType')">
                <el-input v-model="detailData.inspectionType" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('research.dataCollection.yieldData.form.scoreCode')">
                <el-input v-model="detailData.scoreCode" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('research.dataCollection.yieldData.form.scoreValue')">
                <el-input v-model="detailData.scoreValue" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 审核信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.dataCollection.fieldInspectionAudit.form.auditInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.fieldInspectionAudit.form.auditComment')" prop="remark" :rules="[{ required: true, message: $t('research.dataCollection.fieldInspectionAudit.rules.auditCommentRequired'), trigger: 'blur' }]">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="4"
              :placeholder="$t('research.dataCollection.fieldInspectionAudit.form.auditComment')"
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('research.dataCollection.fieldInspectionAudit.form.auditor')">
                <el-input v-model="formData.auditBy" :placeholder="$t('research.dataCollection.fieldInspectionAudit.placeholder.auditor')" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item :label="$t('research.dataCollection.fieldInspectionAudit.form.approvalTime')">
            <el-date-picker
              v-model="formData.auditTime"
              type="datetime"
              :placeholder="$t('research.dataCollection.fieldInspectionAudit.placeholder.approvalTime')"
              style="width: 100%"
              disabled
            />
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button type="danger" @click="handleReject">
            {{ $t('research.dataCollection.fieldInspectionAudit.reject') }}
          </el-button>
          <el-button type="primary" @click="handleApprove">
            {{ $t('research.dataCollection.fieldInspectionAudit.approve') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getFieldInspectionAuditInfo, approveFieldInspection, rejectFieldInspection } from '@/api/fieldInspectionAudit'
import { useUserStore } from '@/store'
import { getUserInfo } from '@/utils/auth'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const detailData = ref({})

// 当前登录用户信息
const currentUser = getUserInfo()
const defaultAuditor = currentUser?.user?.name || currentUser?.user?.REALNAME || currentUser?.user?.USERNAME || ''
const defaultAuditDepartment = currentUser?.user?.organName || currentUser?.user?.ORGANNAME || ''

const formData = reactive({
  remark: '',
  auditBy: defaultAuditor,
  auditTime: null // 审批时间自动设置为当前时间
})

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getFieldInspectionAuditInfo(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
      // 自动带出当前时间作为审批时间
      formData.auditTime = new Date()
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

// 同意审核
const handleApprove = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    try {
      await ElMessageBox.confirm(
        t('research.dataCollection.fieldInspectionAudit.confirmApprove'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
      )

      // 自动设置审批时间为当前时间
      formData.auditTime = new Date()

      const submitData = {
        ...detailData.value,
        ...formData
      }

      const res = await approveFieldInspection(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.fieldInspectionAudit.approveSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('Failed to approve:', error)
        ElMessage.error(t('common.operationFailed'))
      }
    }
  })
}

// 不同意审核
const handleReject = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    try {
      await ElMessageBox.confirm(
        t('research.dataCollection.fieldInspectionAudit.confirmReject'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
      )

      // 自动审批时间为当前时间
      formData.auditTime = new Date()

      const submitData = {
        ...detailData.value,
        ...formData
      }

      const res = await rejectFieldInspection(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.fieldInspectionAudit.rejectSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('Failed to reject:', error)
        ElMessage.error(t('common.operationFailed'))
      }
    }
  })
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
@use '@/assets/styles/page-common.scss' as *;

.field-inspection-audit-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 - 使用项目统一的渐变绿色主题 */
.page-header {
  background: linear-gradient(135deg, $primary-green 0%, #00b350 100%);
  padding: 24px 32px;
  margin: -24px -24px 24px -24px;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;

  .el-button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-weight: 500;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      color: white;
    }
  }
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: white;
}

.header-right {
  flex: 1;
}

/* 表单区域 - 使用卡片式设计 */
.form-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.audit-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 表单分节 */
.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: $primary-green;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid $primary-green;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    font-size: 20px;
  }
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid $color-border-light;

  .el-button {
    min-width: 120px;
  }
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    padding: 20px 24px;
  }

  .header-content {
    gap: 12px;
  }

  .page-title {
    font-size: 18px;
  }

  .audit-form {
    padding: 20px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    padding: 16px 20px;
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .header-left,
  .header-right {
    width: 100%;
  }

  .header-center {
    width: 100%;
    text-align: left;
  }

  .page-title {
    font-size: 16px;
  }

  .audit-form {
    padding: 16px 12px;
    border-radius: 8px;
  }

  .audit-form :deep(.el-form-item) {
    margin-bottom: 20px;
  }

  .audit-form :deep(.el-form-item__label) {
    text-align: left;
    display: block;
    line-height: 1.5;
    margin-bottom: 8px;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: $color-text-regular;
  }

  .audit-form :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  .form-actions {
    flex-direction: column;
    padding-top: 20px;
    gap: 12px;
  }

  .form-actions .el-button {
    width: 100%;
    min-width: auto;
  }

  .form-actions .el-button:first-child {
    order: 3;
  }

  .form-actions .el-button:nth-child(2) {
    order: 2;
  }

  .form-actions .el-button:last-child {
    order: 1;
    margin-bottom: 8px;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 12px 16px;
    margin: -12px -12px 12px -12px;
  }

  .page-title {
    font-size: 15px;
  }

  .audit-form {
    padding: 12px 8px;
  }

  .audit-form :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  .audit-form :deep(.el-form-item__label) {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .form-actions {
    padding-top: 16px;
  }
}
</style>
