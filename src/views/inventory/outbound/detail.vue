<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        :title="$t('inventory.outbound.details')"
        :show-back="true"
        @back="handleBack"
        class="page-header-green"
      />

      <div class="content-wrapper">
        <InfoCard :title="$t('common.basicInfo')" icon="ri-file-info-line">
          <el-descriptions :column="3" border>
            <el-descriptions-item :label="$t('inventory.outbound.no')">{{ form.outboundNo }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.types')">{{ getLabel(typeOptions, form.type) }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.warehouse')">{{ form.warehouseName }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.receiverTypes')">{{ getLabel(receiverTypeOptions, form.receiverType) }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.receiver')">{{ form.receiver }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.bizNo')">{{ form.bizNo }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.operator')">{{ form.operator }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.orderDate')">{{ formatDateTime(form.orderDate) }}</el-descriptions-item>
            <el-descriptions-item :label="$t('common.status')">
              <el-tag :type="getStatusType(form.status)">
                {{ getLabel(statusOptions, form.status) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.remark')" :span="2">{{ form.remark || '-' }}</el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <InfoCard :title="$t('inventory.outbound.detailList')" icon="ri-list-check">
          <el-table :data="form.detailList" stripe border header-cell-class-name="table-header-green">
            <el-table-column prop="mainCategory" :label="$t('inventory.outbound.detail.mainCategory')" min-width="120" show-overflow-tooltip />
            <el-table-column prop="subCategory" :label="$t('inventory.outbound.detail.subCategory')" min-width="120" show-overflow-tooltip />
            <el-table-column prop="batchNo" :label="$t('inventory.outbound.detail.batchNo')" min-width="120" />
            <el-table-column prop="supplier" :label="$t('inventory.outbound.detail.supplier')" min-width="120" show-overflow-tooltip />
            <el-table-column prop="qty" :label="$t('inventory.outbound.detail.qty')" min-width="100" align="right" />
            <el-table-column prop="unit" :label="$t('inventory.outbound.detail.unit')" min-width="80" />
            <el-table-column prop="expireDate" :label="$t('inventory.outbound.detail.expireDate')" min-width="120">
              <template #default="{ row }">
                {{ formatDate(row.expireDate) }}
              </template>
            </el-table-column>
          </el-table>
        </InfoCard>

        <InfoCard :title="$t('inventory.outbound.auditInfo')" icon="ri-chat-check-line" v-if="form.status === 'APPROVED' || form.status === 'REJECTED'">
          <el-descriptions :column="3" border>
            <el-descriptions-item :label="$t('inventory.outbound.auditBy')">{{ form.auditBy || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.auditTime')">{{ formatDateTime(form.auditTime) }}</el-descriptions-item>
            <el-descriptions-item :label="$t('inventory.outbound.auditComment')">{{ form.auditComment || '-' }}</el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <div class="audit-section" v-if="isAuditMode">
          <InfoCard :title="$t('inventory.outbound.auditComment')" icon="ri-chat-check-line">
            <el-form>
              <el-form-item>
                <el-input v-model="auditForm.comment" type="textarea" :rows="3" :placeholder="$t('inventory.outbound.auditCommentPlaceholder')" />
              </el-form-item>
              <div class="form-actions">
                <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
                <el-button type="danger" :loading="submitting" @click="handleAudit('REJECTED')">{{ $t('inventory.outbound.reject') }}</el-button>
                <el-button type="success" :loading="submitting" @click="handleAudit('APPROVED')">{{ $t('inventory.outbound.approve') }}</el-button>
              </div>
            </el-form>
          </InfoCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOutbound, auditOutbound } from '@/api/inventory'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const submitting = ref(false)
const form = reactive({
  id: '',
  outboundNo: '',
  type: '',
  warehouseName: '',
  receiverType: '',
  receiver: '',
  bizNo: '',
  operator: '',
  orderDate: '',
  status: '',
  remark: '',
  auditBy: '',
  auditTime: '',
  auditComment: '',
  detailList: []
})

const auditForm = reactive({
  comment: ''
})

const isAuditMode = computed(() => route.query.mode === 'audit')

const typeOptions = computed(() => [
  { label: t('inventory.outbound.type.general'), value: 'GENERAL' },
  { label: t('inventory.outbound.type.transfer'), value: 'TRANSFER' }
])

const receiverTypeOptions = computed(() => [
  { label: t('inventory.outbound.receiverType.farmer'), value: 'FARMER' },
  { label: t('inventory.outbound.receiverType.coop'), value: 'COOP' },
  { label: t('inventory.outbound.receiverType.other'), value: 'OTHER' }
])

const statusOptions = computed(() => [
  { label: t('inventory.outbound.status.draft'), value: 'DRAFT' },
  { label: t('inventory.outbound.status.submitted'), value: 'SUBMITTED' },
  { label: t('inventory.outbound.status.approved'), value: 'APPROVED' },
  { label: t('inventory.outbound.status.rejected'), value: 'REJECTED' }
])

const getLabel = (options, value) => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label : value
}

const getStatusType = (status) => {
  switch (status) {
    case 'APPROVED': return 'success'
    case 'SUBMITTED': return 'warning'
    case 'REJECTED': return 'danger'
    default: return 'info'
  }
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return '-'
  return dateStr.replace('T', ' ')
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return dateStr.substring(0, 10)
}

const handleBack = () => {
  router.back()
}

const loadData = () => {
  const id = route.params.id
  if (id) {
    loading.value = true
    getOutbound(id).then(res => {
      Object.assign(form, res.data)
    }).finally(() => {
      loading.value = false
    })
  }
}

const handleAudit = (status) => {
  submitting.value = true
  auditOutbound(form.id, {
    auditStatus: status,
    auditComment: auditForm.comment
  }).then(() => {
    ElMessage.success(t('common.auditSuccess'))
    handleBack()
  }).finally(() => {
    submitting.value = false
  })
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

:deep(.page-header-green) {
  background-color: #009A44 !important;
  color: white !important;

  .title, .subtitle, .ri-icon, .el-page-header__content {
    color: white !important;
  }
  .el-icon {
    color: white !important;
  }
}

:deep(.table-header-green) {
  background-color: #E8F5E9 !important;
  color: #009A44 !important;
  font-weight: bold;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}
</style>
