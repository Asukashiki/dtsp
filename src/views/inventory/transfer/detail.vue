<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        :title="$t('inventory.transfer.detail')"
        :show-back="true"
        @back="handleBack" />

      <div class="content-wrapper">
        <InfoCard :title="$t('common.basicInfo')" icon="ri-file-info-line">
          <el-descriptions :column="3" border>
            <el-descriptions-item :label="$t('inventory.transfer.no')">
              {{ detail.transferNo }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.type')">
              <el-tag :type="getTypeTag(detail.transferType)" size="small">
                {{ getTypeText(detail.transferType) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.status')">
              <el-tag :type="getStatusTag(detail.status)" size="small">
                {{ getStatusText(detail.status) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.applyDate')">
              {{ formatDateTime(detail.applyDate) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.expectedDate')">
              {{ detail.expectedDate || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.applicant')">
              {{ detail.applicant }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.department')">
              {{ detail.department || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.outWarehouse')">
              {{ detail.outWarehouseName }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.outTime')">
              {{ formatDateTime(detail.outTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.inWarehouse')">
              {{ detail.inWarehouseName }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.inTime')">
              {{ formatDateTime(detail.inTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.remark')">
              {{ detail.remark || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <InfoCard :title="$t('inventory.transfer.detailList')" icon="ri-list-check">
          <el-table :data="detail.detailList" stripe border>
            <el-table-column type="index" width="50" />
            <el-table-column prop="productName" :label="$t('inventory.transfer.detail.product')" min-width="150" />
            <el-table-column prop="batchNo" :label="$t('inventory.transfer.detail.batchNo')" min-width="120" />
            <el-table-column prop="supplier" :label="$t('inventory.transfer.detail.supplier')" min-width="120" />
            <el-table-column prop="applyQty" :label="$t('inventory.transfer.detail.applyQty')" min-width="100" />
            <el-table-column prop="realQty" :label="$t('inventory.transfer.detail.realQty')" min-width="100" />
            <el-table-column prop="unit" :label="$t('inventory.transfer.detail.unit')" min-width="80" />
          </el-table>
        </InfoCard>

        <InfoCard v-if="detail.auditBy || detail.status === 'APPROVED' || detail.status === 'REJECTED'" :title="$t('inventory.transfer.auditComment')" icon="ri-user-voice-line">
          <el-descriptions :column="3" border>
            <el-descriptions-item :label="$t('inventory.transfer.auditBy')">
              {{ detail.auditBy || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.auditTime')">
              {{ formatDateTime(detail.auditTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.transfer.auditComment')">
              {{ detail.auditComment || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <div class="form-actions">
          <el-button @click="handleBack">{{ $t('common.back') }}</el-button>
          <el-button v-if="detail.status === 'SUBMITTED' && isAuditMode" type="success" @click="handleAudit(true)">
            {{ $t('inventory.transfer.approve') }}
          </el-button>
          <el-button v-if="detail.status === 'SUBMITTED' && isAuditMode" type="danger" @click="handleAudit(false)">
            {{ $t('inventory.transfer.reject') }}
          </el-button>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="auditDialogVisible"
      :title="$t('inventory.transfer.approve')"
      width="500px"
    >
      <el-form :model="auditForm" label-width="100px">
        <el-form-item :label="$t('inventory.transfer.auditComment')">
          <el-input
            v-model="auditForm.auditComment"
            type="textarea"
            :rows="3"
            :placeholder="$t('inventory.transfer.auditComment')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="auditDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="danger" @click="submitAudit(false)">{{ $t('inventory.transfer.reject') }}</el-button>
        <el-button type="success" @click="submitAudit(true)">{{ $t('inventory.transfer.approve') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getTransferDetail, auditTransfer } from '@/api/inventory'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const detail = ref({
  transferNo: '',
  transferType: '',
  applyDate: '',
  expectedDate: '',
  applicant: '',
  department: '',
  outWarehouseId: '',
  outWarehouseName: '',
  outTime: '',
  inWarehouseId: '',
  inWarehouseName: '',
  inTime: '',
  status: '',
  remark: '',
  auditBy: '',
  auditTime: '',
  auditComment: '',
  detailList: []
})

const auditDialogVisible = ref(false)
const auditApproved = ref(false)
const auditForm = reactive({
  auditComment: ''
})

const isAuditMode = computed(() => route.query.mode === 'audit')

const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '-'
  if (dateTimeStr.includes('T')) {
    return dateTimeStr.replace('T', ' ')
  }
  return dateTimeStr
}

const handleBack = () => {
  router.back()
}

const handleAudit = (approved) => {
  auditApproved.value = approved
  auditForm.auditComment = ''
  auditDialogVisible.value = true
}

const submitAudit = async (approved) => {
  try {
    await auditTransfer(detail.value.id, approved, auditForm.auditComment)
    ElMessage.success(t('common.submitSuccess'))
    auditDialogVisible.value = false
    router.back()
  } catch (error) {
    ElMessage.error(t('common.submitFailed'))
  }
}

const loadDetail = async () => {
  const id = route.params.id
  if (!id) return

  try {
    const res = await getTransferDetail(id)
    if (res.data) {
      detail.value = res.data
    }
  } catch (error) {
    console.error('Failed to load transfer detail:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

const getStatusTag = (status) => {
  const map = {
    'DRAFT': 'info',
    'SUBMITTED': 'warning',
    'APPROVED': 'success',
    'REJECTED': 'danger'
  }
  return map[status] || ''
}

const getStatusText = (status) => {
  return t(`inventory.transfer.status.${status.toLowerCase()}`)
}

const getTypeTag = (type) => {
  const map = {
    'STOCK_WARNING': 'warning',
    'FULL_TRANSFER': 'primary'
  }
  return map[type] || ''
}

const getTypeText = (type) => {
  if (type === 'STOCK_WARNING') {
    return t('inventory.transfer.type.stockWarning')
  } else if (type === 'FULL_TRANSFER') {
    return t('inventory.transfer.type.fullTransfer')
  }
  return type
}

onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
}
</style>
