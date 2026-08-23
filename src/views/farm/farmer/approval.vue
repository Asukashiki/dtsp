<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-checkbox-circle-line"></i>
        </div>
        <div class="header-content">
          <h1 class="page-title">{{ $t('farm.farmerApproval.title') }}</h1>
          <p class="page-subtitle">{{ $t('farm.farmerApproval.subtitle') }}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('farm.farmerApproval.pendingList') }}</span>
            </div>
          </div>
          <div class="card-body">
            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
              >
                <el-table-column
                  prop="realName"
                  :label="$t('farm.farmerApproval.columns.realName')"
                  min-width="100"
                />
                <el-table-column
                  prop="idCard"
                  :label="$t('farm.farmerApproval.columns.idCard')"
                  min-width="150"
                />
                <el-table-column
                  prop="phone"
                  :label="$t('farm.farmerApproval.columns.phone')"
                  min-width="120"
                />
                <el-table-column
                  prop="farmType"
                  :label="$t('farm.farmerApproval.columns.farmType')"
                  min-width="120"
                />
                <el-table-column
                  prop="applyTime"
                  :label="$t('farm.farmerApproval.columns.applyTime')"
                  min-width="160"
                >
                  <template #default="{ row }">
                    {{ formatDate(row.applyTime) }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  :label="$t('farm.farmerApproval.columns.status')"
                  min-width="100"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.status === 1" type="warning">
                      {{ $t('farm.farmerAuth.status.pending') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === 2" type="success">
                      {{ $t('farm.farmerAuth.status.approved') }}
                    </el-tag>
                    <el-tag v-else type="danger">
                      {{ $t('farm.farmerAuth.status.rejected') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('farm.farmerApproval.columns.actions')"
                  fixed="right"
                  min-width="300"
                >
                  <template #default="{ row }">
                    <el-button
                      type="primary"
                      link
                      @click="handleView(row)"
                    >
                      <i class="ri-eye-line"></i>
                      {{ $t('common.view') }}
                    </el-button>
                    <el-button
                      v-if="row.status === 1"
                      type="success"
                      link
                      @click="handleApprove(row)"
                    >
                      <i class="ri-check-line"></i>
                      {{ $t('farm.farmerApproval.approve') }}
                    </el-button>
                    <el-button
                      v-if="row.status === 1"
                      type="danger"
                      link
                      @click="handleReject(row)"
                    >
                      <i class="ri-close-line"></i>
                      {{ $t('farm.farmerApproval.reject') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 移动端卡片 -->
            <div class="card-list mobile-only">
              <div
                v-for="item in tableData"
                :key="item.certId"
                class="list-card"
              >
                <div class="card-info">
                  <div class="info-row">
                    <span class="label">{{ $t('farm.farmerApproval.columns.realName') }}:</span>
                    <span class="value">{{ item.realName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.farmerApproval.columns.idCard') }}:</span>
                    <span class="value">{{ item.idCard }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.farmerApproval.columns.phone') }}:</span>
                    <span class="value">{{ item.phone }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.farmerApproval.columns.farmType') }}:</span>
                    <span class="value">{{ item.farmType }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.farmerApproval.columns.applyTime') }}:</span>
                    <span class="value">{{ formatDate(item.applyTime) }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('farm.farmerApproval.columns.status') }}:</span>
                    <el-tag v-if="item.status === 1" type="warning" size="small">
                      {{ $t('farm.farmerAuth.status.pending') }}
                    </el-tag>
                    <el-tag v-else-if="item.status === 2" type="success" size="small">
                      {{ $t('farm.farmerAuth.status.approved') }}
                    </el-tag>
                    <el-tag v-else type="danger" size="small">
                      {{ $t('farm.farmerAuth.status.rejected') }}
                    </el-tag>
                  </div>
                </div>
                <div class="card-actions">
                  <el-button type="primary" plain size="small" @click="handleView(item)">
                    <i class="ri-eye-line"></i>
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button
                    v-if="item.status === 1"
                    type="success"
                    plain
                    size="small"
                    @click="handleApprove(item)"
                  >
                    <i class="ri-check-line"></i>
                    {{ $t('farm.farmerApproval.approve') }}
                  </el-button>
                  <el-button
                    v-if="item.status === 1"
                    type="danger"
                    plain
                    size="small"
                    @click="handleReject(item)"
                  >
                    <i class="ri-close-line"></i>
                    {{ $t('farm.farmerApproval.reject') }}
                  </el-button>
                </div>
              </div>
              <el-empty v-if="!loading && tableData.length === 0" :description="$t('home.noData')" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      :title="$t('farm.farmerApproval.detail')"
      width="600px"
      class="custom-dialog"
    >
      <div class="detail-content" v-if="currentItem">
        <div class="detail-section">
          <div class="section-title">{{ $t('farm.farmerApproval.applicantInfo') }}</div>
          <div class="detail-item">
            <span class="item-label">{{ $t('farm.farmerAuth.form.realName') }}:</span>
            <span class="item-value">{{ currentItem.realName }}</span>
          </div>
          <div class="detail-item">
            <span class="item-label">{{ $t('farm.farmerAuth.form.idCard') }}:</span>
            <span class="item-value">{{ currentItem.idCard }}</span>
          </div>
          <div class="detail-item">
            <span class="item-label">{{ $t('farm.farmerAuth.form.phone') }}:</span>
            <span class="item-value">{{ currentItem.phone }}</span>
          </div>
          <div class="detail-item">
            <span class="item-label">{{ $t('farm.farmerAuth.form.adCode') }}:</span>
            <span class="item-value">{{ currentItem.adCode }}</span>
          </div>
          <div class="detail-item">
            <span class="item-label">{{ $t('farm.farmerAuth.form.farmType') }}:</span>
            <span class="item-value">{{ currentItem.farmType }}</span>
          </div>
          <div class="detail-item">
            <span class="item-label">{{ $t('farm.farmerAuth.form.detailAddress') }}:</span>
            <span class="item-value">{{ currentItem.detailAddress }}</span>
          </div>
          <div class="detail-item" v-if="currentItem.remark">
            <span class="item-label">{{ $t('farm.farmerAuth.form.remark') }}:</span>
            <span class="item-value">{{ currentItem.remark }}</span>
          </div>
          <div class="detail-item">
            <span class="item-label">{{ $t('farm.farmerApproval.applyTime') }}:</span>
            <span class="item-value">{{ formatDate(currentItem.applyTime) }}</span>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 驳回对话框 -->
    <el-dialog
      v-model="rejectDialogVisible"
      :title="$t('farm.farmerApproval.reject')"
      width="500px"
      class="custom-dialog"
    >
      <el-form
        ref="rejectFormRef"
        :model="rejectForm"
        :rules="rejectRules"
        label-position="top"
      >
        <el-form-item :label="$t('farm.farmerApproval.rejectReason')" prop="reason">
          <el-input
            v-model="rejectForm.reason"
            type="textarea"
            :rows="4"
            :placeholder="$t('farm.farmerApproval.rejectReasonPlaceholder')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="rejectDialogVisible = false">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button
            type="danger"
            @click="confirmReject"
            :loading="submitLoading"
          >
            {{ $t('common.confirm') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPendingFarmerCerts, approveFarmerCert, rejectFarmerCert } from '@/api/farm'
import { useUserStore } from '@/store'

const { t } = useI18n()
const userStore = useUserStore()

// 数据
const loading = ref(false)
const tableData = ref([])
const detailDialogVisible = ref(false)
const rejectDialogVisible = ref(false)
const currentItem = ref(null)
const submitLoading = ref(false)

// 驳回表单
const rejectFormRef = ref(null)
const rejectForm = reactive({
  reason: ''
})

const rejectRules = computed(() => ({
  reason: [
    { required: true, message: t('farm.farmerApproval.rejectReasonRequired'), trigger: 'blur' }
  ]
}))

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleString()
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getPendingFarmerCerts()
    if (res.code === 200) {
      tableData.value = res.data || []
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleView = (row) => {
  currentItem.value = row
  detailDialogVisible.value = true
}

// 审批通过
const handleApprove = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('farm.farmerApproval.approveConfirm'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'success',
      }
    )

    try {
      const approverId = userStore.userInfo?.userId
      const res = await approveFarmerCert(row.certId, approverId)
      if (res.code === 200) {
        ElMessage.success(t('farm.farmerApproval.approveSuccess'))
        loadData()
      }
    } catch (error) {
      console.error(error)
    }
  } catch {
    // 用户取消
  }
}

// 驳回
const handleReject = (row) => {
  currentItem.value = row
  rejectForm.reason = ''
  rejectDialogVisible.value = true
}

// 确认驳回
const confirmReject = async () => {
  if (!rejectFormRef.value) return

  try {
    await rejectFormRef.value.validate()
    submitLoading.value = true

    try {
      const approverId = userStore.userInfo?.userId
      const res = await rejectFarmerCert(
        currentItem.value.certId,
        approverId,
        rejectForm.reason
      )
      if (res.code === 200) {
        ElMessage.success(t('farm.farmerApproval.rejectSuccess'))
        rejectDialogVisible.value = false
        loadData()
      }
    } catch (error) {
      console.error(error)
    } finally {
      submitLoading.value = false
    }
  } catch (error) {
    console.log('Validation failed', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 200px);
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
}

.page-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* Content */
.content-wrapper {
  padding-bottom: 40px;
}

.info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

/* Table */
.table-wrapper :deep(.el-table) {
  border-radius: 8px;
}

.table-wrapper :deep(.el-table__header th) {
  background-color: rgba(0, 154, 68, 0.05);
  color: #009A44;
  font-weight: 600;
}

.mobile-only {
  display: none;
}

/* 移动端卡片列表 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px;
  background: white;
  transition: all 0.3s;
}

.list-card:hover {
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.1);
  border-color: rgba(0, 154, 68, 0.3);
}

.card-info {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-weight: 600;
  color: #606266;
  min-width: 90px;
  font-size: 14px;
}

.info-row .value {
  flex: 1;
  color: #303133;
  font-size: 14px;
}

.card-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.card-actions .el-button {
  flex: 1;
  min-width: 100px;
}

/* 详情内容 */
.detail-content {
  padding: 8px 0;
}

.detail-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #009A44;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.detail-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-item:last-child {
  border-bottom: none;
}

.item-label {
  font-weight: 600;
  color: #606266;
  min-width: 140px;
}

.item-value {
  flex: 1;
  color: #303133;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 24px 20px;
    gap: 16px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .card-header {
    padding: 16px 20px;
  }

  .card-body {
    padding: 16px;
  }

  .pc-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .detail-item {
    flex-direction: column;
    gap: 4px;
  }

  .item-label {
    min-width: auto;
  }
}
</style>
