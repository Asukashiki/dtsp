<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-file-text-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('demandAudit.detail') }}</h1>
            <p class="page-subtitle">{{ $t('demandAudit.subtitle') }}</p>
          </div>
        </div>
        <div class="header-actions">
          <el-button @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
          <el-button type="success" @click="handleApprove" v-if="detailData.status === 'submitted'">
            <i class="ri-check-line"></i>
            {{ $t('demandAudit.actions.approve') }}
          </el-button>
          <el-button type="danger" @click="handleReject" v-if="detailData.status === 'submitted'">
            <i class="ri-close-line"></i>
            {{ $t('demandAudit.actions.reject') }}
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-information-line"></i>
            <span>{{ $t('demandAudit.detailSections.basicInfo') }}</span>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.batchNo') }}</div>
              <div class="value">{{ detailData.batchNo || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.status') }}</div>
              <div class="value">
                <el-tag :type="getStatusType(detailData.status)">
                  {{ getStatusLabel(detailData.status) }}
                </el-tag>
              </div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.currentAuditLevel') }}</div>
              <div class="value">{{ getAuditLevelLabel(detailData.currentAuditLevel) }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.daUserName') }}</div>
              <div class="value">{{ detailData.daUserName || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.submitTime') }}</div>
              <div class="value">{{ detailData.submitTime || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.createdTime') }}</div>
              <div class="value">{{ detailData.createdTime || '-' }}</div>
            </div>
          </div>
        </div>

        <!-- 农民信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-user-line"></i>
            <span>{{ $t('demandAudit.detailSections.farmerInfo') }}</span>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.farmerId') }}</div>
              <div class="value">{{ detailData.farmerId || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.farmerName') }}</div>
              <div class="value">{{ detailData.farmerName || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.farmerIdNumber') }}</div>
              <div class="value">{{ detailData.farmerIdNumber || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.landArea') }}</div>
              <div class="value">{{ detailData.landArea || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.zone') }}</div>
              <div class="value">{{ detailData.zone || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.woreda') }}</div>
              <div class="value">{{ detailData.woreda || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.kebele') }}</div>
              <div class="value">{{ detailData.kebele || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="label">{{ $t('demandAudit.form.village') }}</div>
              <div class="value">{{ detailData.village || '-' }}</div>
            </div>
            <div class="info-item full-width" v-if="detailData.remark">
              <div class="label">{{ $t('demandAudit.form.remark') }}</div>
              <div class="value">{{ detailData.remark }}</div>
            </div>
          </div>
        </div>

        <!-- 投入品明细 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-list-check"></i>
            <span>{{ $t('demandAudit.detailSections.itemsInfo') }}</span>
          </div>
          <div v-if="!detailData.inputItems || detailData.inputItems.length === 0" class="no-data">
            <el-empty :description="$t('demandAudit.form.noItems')" />
          </div>
          <template v-else>
            <div class="items-table pc-only">
              <el-table :data="detailData.inputItems" stripe border>
                <el-table-column type="index" :label="'#'" width="60" />
                <el-table-column prop="inputCategory" :label="$t('demandAudit.form.inputCategory')" min-width="120">
                  <template #default="{ row }">
                    {{ getInputCategoryLabel(row.inputCategory) }}
                  </template>
                </el-table-column>
                <el-table-column prop="inputType" :label="$t('demandAudit.form.inputType')" min-width="120" />
                <el-table-column prop="variety" :label="$t('demandAudit.form.variety')" min-width="120" />
                <el-table-column prop="specification" :label="$t('demandAudit.form.specification')" min-width="120" />
                <el-table-column prop="unit" :label="$t('demandAudit.form.unit')" width="100" />
                <el-table-column prop="quantity" :label="$t('demandAudit.form.quantity')" width="120" />
              </el-table>
            </div>
            <div class="items-cards mobile-only">
              <div v-for="(item, index) in detailData.inputItems" :key="index" class="item-card">
                <div class="item-index">{{ index + 1 }}</div>
                <div class="item-info">
                  <div class="item-row">
                    <span class="label">{{ $t('demandAudit.form.inputCategory') }}:</span>
                    <span class="value">{{ getInputCategoryLabel(item.inputCategory) }}</span>
                  </div>
                  <div class="item-row">
                    <span class="label">{{ $t('demandAudit.form.inputType') }}:</span>
                    <span class="value">{{ item.inputType }}</span>
                  </div>
                  <div class="item-row">
                    <span class="label">{{ $t('demandAudit.form.variety') }}:</span>
                    <span class="value">{{ item.variety }}</span>
                  </div>
                  <div class="item-row" v-if="item.specification">
                    <span class="label">{{ $t('demandAudit.form.specification') }}:</span>
                    <span class="value">{{ item.specification }}</span>
                  </div>
                  <div class="item-row">
                    <span class="label">{{ $t('demandAudit.form.unit') }}:</span>
                    <span class="value">{{ item.unit }}</span>
                  </div>
                  <div class="item-row">
                    <span class="label">{{ $t('demandAudit.form.quantity') }}:</span>
                    <span class="value">{{ item.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 审核记录 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-time-line"></i>
            <span>{{ $t('demandAudit.auditRecords.title') }}</span>
          </div>
          <div v-if="!detailData.auditRecords || detailData.auditRecords.length === 0" class="no-data">
            <el-empty :description="$t('demandAudit.auditRecords.noRecords')" />
          </div>
          <div v-else class="audit-timeline">
            <el-timeline>
              <el-timeline-item v-for="(record, index) in detailData.auditRecords" :key="index"
                :timestamp="record.auditTime" placement="top" :type="getAuditResultType(record.auditResult)">
                <div class="timeline-card">
                  <div class="timeline-header">
                    <div class="audit-level">
                      <el-tag type="info" size="small">
                        {{ getAuditLevelLabel(record.auditLevel) }}
                      </el-tag>
                    </div>
                    <div class="audit-action">
                      <el-tag :type="getAuditResultType(record.auditResult)" size="small">
                        {{ getAuditActionLabel(record.auditAction) }} - {{ getAuditResultLabel(record.auditResult) }}
                      </el-tag>
                    </div>
                  </div>
                  <div class="timeline-body">
                    <div class="timeline-row">
                      <span class="label">{{ $t('demandAudit.auditRecords.auditUserName') }}:</span>
                      <span class="value">{{ record.auditUserName || '-' }}</span>
                    </div>
                    <div class="timeline-row" v-if="record.auditOpinion">
                      <span class="label">{{ $t('demandAudit.auditRecords.auditOpinion') }}:</span>
                      <span class="value">{{ record.auditOpinion }}</span>
                    </div>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>

    <!-- 审核通过对话框 -->
    <el-dialog v-model="approveDialogVisible" :title="$t('demandAudit.approveDialog.title')" width="500px">
      <el-form :model="approveForm" label-width="100px">
        <el-form-item :label="$t('demandAudit.approveDialog.remark')">
          <el-input v-model="approveForm.remark" type="textarea" :rows="3"
            :placeholder="$t('demandAudit.approveDialog.remarkPlaceholder')" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="approveDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirmApprove" :loading="submitting">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 审核驳回对话框 -->
    <el-dialog v-model="rejectDialogVisible" :title="$t('demandAudit.rejectDialog.title')" width="500px">
      <el-form :model="rejectForm" :rules="rejectRules" ref="rejectFormRef" label-width="100px">
        <el-form-item :label="$t('demandAudit.rejectDialog.auditOpinion')" prop="auditOpinion">
          <el-input v-model="rejectForm.auditOpinion" type="textarea" :rows="3"
            :placeholder="$t('demandAudit.rejectDialog.auditOpinionPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('demandAudit.rejectDialog.remark')">
          <el-input v-model="rejectForm.remark" type="textarea" :rows="3"
            :placeholder="$t('demandAudit.rejectDialog.remarkPlaceholder')" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="rejectDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="danger" @click="confirmReject" :loading="submitting">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPendingDemandPage, approveDemand, rejectDemand } from '@/api/demandAudit'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const submitting = ref(false)
const detailData = ref({})

// 状态选项
const statusOptions = computed(() => ({
  draft: t('demandAudit.status.draft'),
  submitted: t('demandAudit.status.submitted'),
  approved: t('demandAudit.status.approved'),
  rejected: t('demandAudit.status.rejected'),
  locked: t('demandAudit.status.locked')
}))

// 审核层级选项
const auditLevelOptions = computed(() => ({
  village: t('demandAudit.auditLevel.village'),
  town: t('demandAudit.auditLevel.town'),
  district: t('demandAudit.auditLevel.district'),
  state: t('demandAudit.auditLevel.state'),
  ministry: t('demandAudit.auditLevel.ministry')
}))

// 投入品类型选项
const inputCategoryOptions = computed(() => ({
  seed: t('demandAudit.inputCategory.seed'),
  fertilizer: t('demandAudit.inputCategory.fertilizer'),
  pesticide: t('demandAudit.inputCategory.pesticide')
}))

// 审核动作选项
const auditActionOptions = computed(() => ({
  submit: t('demandAudit.auditAction.submit'),
  approve: t('demandAudit.auditAction.approve'),
  reject: t('demandAudit.auditAction.reject')
}))

// 审核结果选项
const auditResultOptions = computed(() => ({
  passed: t('demandAudit.auditResult.passed'),
  rejected: t('demandAudit.auditResult.rejected')
}))

// 获取状态标签
const getStatusLabel = (status) => {
  return statusOptions.value[status] || status
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    draft: 'info',
    submitted: 'warning',
    approved: 'success',
    rejected: 'danger',
    locked: ''
  }
  return typeMap[status] || 'info'
}

// 获取审核层级标签
const getAuditLevelLabel = (level) => {
  return auditLevelOptions.value[level] || level
}

// 获取投入品类型标签
const getInputCategoryLabel = (category) => {
  return inputCategoryOptions.value[category] || category
}

// 获取审核动作标签
const getAuditActionLabel = (action) => {
  return auditActionOptions.value[action] || action
}

// 获取审核结果标签
const getAuditResultLabel = (result) => {
  return auditResultOptions.value[result] || result
}

// 获取审核结果类型
const getAuditResultType = (result) => {
  const typeMap = {
    passed: 'success',
    rejected: 'danger'
  }
  return typeMap[result] || 'info'
}

// 审核通过对话框
const approveDialogVisible = ref(false)
const approveForm = reactive({
  ids: [],
  remark: ''
})

// 审核驳回对话框
const rejectDialogVisible = ref(false)
const rejectForm = reactive({
  ids: [],
  auditOpinion: '',
  remark: ''
})

const rejectFormRef = ref(null)
const rejectRules = reactive({
  auditOpinion: [
    { required: true, message: t('demandAudit.rejectDialog.auditOpinionRequired'), trigger: 'blur' }
  ]
})

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // 注意：这里需要调用详情接口，但API文档中没有提供详情接口
    // 暂时使用分页接口获取单条数据作为临时方案
    const res = await getPendingDemandPage({
      pageNum: 1,
      pageSize: 1,
      id: route.params.id
    })
    if (res.code === 200 && res.data.records && res.data.records.length > 0) {
      detailData.value = res.data.records[0]
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 返回
const handleBack = () => {
  router.back()
}

// 审核通过
const handleApprove = () => {
  approveForm.ids = [route.params.id]
  approveForm.remark = ''
  approveDialogVisible.value = true
}

// 确认审核通过
const confirmApprove = async () => {
  try {
    await ElMessageBox.confirm(
      t('demandAudit.approveDialog.confirmMessage', { count: 1 }),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitting.value = true
    const res = await approveDemand({
      ids: approveForm.ids,
      remark: approveForm.remark || undefined
    })

    if (res.code === 200) {
      ElMessage.success(t('demandAudit.approveDialog.success'))
      approveDialogVisible.value = false
      router.back()
    } else {
      ElMessage.error(res.msg || t('demandAudit.messages.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to approve:', error)
      ElMessage.error(t('demandAudit.messages.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 审核驳回
const handleReject = () => {
  rejectForm.ids = [route.params.id]
  rejectForm.auditOpinion = ''
  rejectForm.remark = ''
  rejectDialogVisible.value = true
}

// 确认审核驳回
const confirmReject = async () => {
  if (!rejectFormRef.value) return

  try {
    await rejectFormRef.value.validate()

    await ElMessageBox.confirm(
      t('demandAudit.rejectDialog.confirmMessage', { count: 1 }),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitting.value = true
    const res = await rejectDemand({
      ids: rejectForm.ids,
      auditOpinion: rejectForm.auditOpinion,
      remark: rejectForm.remark || undefined
    })

    if (res.code === 200) {
      ElMessage.success(t('demandAudit.rejectDialog.success'))
      rejectDialogVisible.value = false
      router.back()
    } else {
      ElMessage.error(res.msg || t('demandAudit.messages.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel' && error !== false) {
      console.error('Failed to reject:', error)
      ElMessage.error(t('demandAudit.messages.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.info-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e8f5e9;
}

.info-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-header {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-header i {
  font-size: 22px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item .label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.info-item .value {
  font-size: 16px;
  color: #333;
}

.no-data {
  text-align: center;
  padding: 40px 0;
}

.items-table {
  margin-top: 16px;
}

.items-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.item-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background: #fafafa;
}

.item-index {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-row {
  display: flex;
  font-size: 14px;
  line-height: 1.6;
}

.item-row .label {
  color: #666;
  min-width: 120px;
  flex-shrink: 0;
}

.item-row .value {
  color: #333;
  font-weight: 500;
}

.audit-timeline {
  margin-top: 16px;
}

.timeline-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}

.timeline-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.timeline-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-row {
  display: flex;
  font-size: 14px;
  line-height: 1.6;
}

.timeline-row .label {
  color: #666;
  min-width: 100px;
  flex-shrink: 0;
}

.timeline-row .value {
  color: #333;
  font-weight: 500;
}

.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .el-button {
    flex: 1;
  }

  .content-wrapper {
    padding: 20px;
    border-radius: 12px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>
