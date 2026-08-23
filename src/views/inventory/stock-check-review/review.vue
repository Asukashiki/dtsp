<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-shield-check-line"
        :title="$t('stockCheckReview.reviewTitle')"
        class="page-header-green"
      >
        <template #actions>
          <el-button @click="handleBack">{{ $t('stockCheck.actions.backToList') }}</el-button>
          <el-button type="danger" plain @click="handleReject" :loading="rejecting">
            {{ $t('stockCheck.actions.reject') }}
          </el-button>
          <el-button type="success" @click="handleApprove" :loading="approving">
            {{ $t('stockCheck.actions.approve') }}
          </el-button>
        </template>
      </PageHeader>

      <div class="content-wrapper">
        <!-- 差异汇总统计卡片 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
            <div class="text-sm text-gray-500 mb-1">{{ $t('stockCheck.summary.totalItems') }}</div>
            <div class="text-2xl font-bold">{{ stats.totalItems }}</div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
            <div class="text-sm text-gray-500 mb-1">{{ $t('stockCheck.summary.diffItems') }}</div>
            <div class="text-2xl font-bold" :class="stats.diffItems > 0 ? 'text-[#DA121A]' : 'text-gray-800'">
              {{ stats.diffItems }}
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
            <div class="text-sm text-gray-500 mb-1">{{ $t('stockCheck.summary.surplusItems') }}</div>
            <div class="text-2xl font-bold text-[#F59E0B]">{{ stats.surplusItems }}</div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
            <div class="text-sm text-gray-500 mb-1">{{ $t('stockCheck.summary.lossItems') }}</div>
            <div class="text-2xl font-bold text-[#DA121A]">{{ stats.lossItems }}</div>
          </div>
        </div>

        <!-- 基本信息 -->
        <InfoCard :title="$t('stockCheck.sections.basicInfo')" icon="ri-information-line">
          <el-descriptions :column="3" border>
            <el-descriptions-item :label="$t('stockCheck.fields.checkId')">{{ detail.checkId }}</el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.checkDate')">{{ detail.checkDate }}</el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.warehouseName')">{{ detail.warehouseName }}</el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.checkerName')">{{ detail.checkerName || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.checkStatus')">
              <el-tag :type="getStatusTag(detail.checkStatus)">{{ getStatusText(detail.checkStatus) }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.checkRemark')" :span="3">
              {{ detail.checkRemark || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 审核操作区 -->
        <InfoCard :title="$t('stockCheck.sections.reviewAction')" icon="ri-edit-2-line" class="mt-4">
          <el-form label-width="100px" @submit.prevent>
            <el-form-item :label="$t('stockCheck.fields.reviewOpinion')" required>
              <el-input
                v-model="reviewOpinion"
                type="textarea"
                rows="3"
                maxlength="500"
                show-word-limit
                :placeholder="$t('stockCheck.placeholders.reviewOpinion')"
              />
            </el-form-item>
          </el-form>
        </InfoCard>

        <!-- 盘点明细 -->
        <InfoCard :title="$t('stockCheck.sections.checkDetail')" icon="ri-list-check" class="mt-4">
          <template #actions>
            <el-switch
              v-model="showOnlyDiff"
              :active-text="$t('stockCheck.actions.onlyDiff')"
              :inactive-text="$t('stockCheck.actions.showAll')"
            />
          </template>
          
          <el-table
            :data="filteredDetails"
            style="width: 100%"
            border
            :row-class-name="tableRowClassName"
            class="stock-check-review-detail-table"
          >
            <el-table-column prop="productName" :label="$t('stockCheck.fields.productName')" min-width="150" show-overflow-tooltip/>
            <el-table-column prop="categoryMajor" :label="$t('stockCheck.fields.categoryMajor')" width="100" />
            <el-table-column prop="batchNo" :label="$t('stockCheck.fields.batchNo')" width="120" />
            <el-table-column prop="unit" :label="$t('stockCheck.fields.unit')" width="80" />
            
            <el-table-column prop="systemQty" :label="$t('stockCheck.fields.systemQty')" width="100">
              <template #default="{ row }">
                <span class="text-blue-700 font-bold">{{ row.systemQty }}</span>
              </template>
            </el-table-column>
            
            <el-table-column prop="actualQty" :label="$t('stockCheck.fields.actualQty')" width="100">
              <template #default="{ row }">
                <span>{{ row.actualQty }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('stockCheck.fields.diffQty')" width="100" align="center">
              <template #default="{ row }">
                <span :class="{'text-[#F59E0B] font-bold': row.diffType === 'SURPLUS', 'text-[#DA121A] font-bold': row.diffType === 'LOSS'}">
                  <span v-if="row.diffQty > 0">+</span>{{ row.diffQty }}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('stockCheck.fields.diffType')"
              width="140"
              align="center"
              header-align="center"
              class-name="diff-type-column"
            >
              <template #default="{ row }">
                <el-tag v-if="row.diffType === 'SURPLUS'" class="diff-type-tag border-[#F59E0B] text-[#F59E0B]" type="warning" color="#FFF7ED">
                  {{ $t('stockCheck.diffType.SURPLUS') }}
                </el-tag>
                <el-tag v-else-if="row.diffType === 'LOSS'" class="diff-type-tag border-[#DA121A] text-[#DA121A]" type="danger" color="#FEF2F2">
                  {{ $t('stockCheck.diffType.LOSS') }}
                </el-tag>
                <span v-else class="text-gray-400">{{ $t('stockCheck.diffType.NONE') }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="itemRemark" :label="$t('stockCheck.fields.itemRemark')" min-width="150" />
          </el-table>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getStockCheckDetail, approveStockCheck, rejectStockCheck, submitStockCheck } from '@/api/stockCheck'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const approving = ref(false)
const rejecting = ref(false)

const detail = ref({
  checkId: '',
  checkDate: '',
  warehouseName: '',
  checkerName: '',
  checkStatus: '',
  checkRemark: '',
  details: []
})

const reviewOpinion = ref('')
const showOnlyDiff = ref(false)

const stats = computed(() => {
  const dList = detail.value.details || []
  return {
    totalItems: dList.length,
    diffItems: dList.filter(r => r.diffType !== 'NONE').length,
    surplusItems: dList.filter(r => r.diffType === 'SURPLUS').length,
    lossItems: dList.filter(r => r.diffType === 'LOSS').length
  }
})

const filteredDetails = computed(() =>
  showOnlyDiff.value
    ? (detail.value.details || []).filter(r => r.diffType !== 'NONE')
    : (detail.value.details || [])
)

const fetchDetail = async () => {
  loading.value = true
  const id = route.params.id
  if (!id) return
  
  try {
    const res = await getStockCheckDetail(id)
    if (res.data) {
      detail.value = res.data
    }
  } catch (error) {
    console.error('Failed to load detail for review', error)
  } finally {
    loading.value = false
  }
}

const getStatusTag = (status) => {
  const map = {
    'DRAFT': 'info',
    'PENDING': 'warning',
    'APPROVED': 'success',
    'REJECTED': 'danger',
    'ADJUSTED': 'success',
    'CANCELLED': 'info'
  }
  return map[status] || ''
}

const getStatusText = (status) => {
  return status ? t(`stockCheck.status.${status}`) : '-'
}

const tableRowClassName = ({ row }) => {
  if (row.diffType === 'SURPLUS') {
    return 'surplus-row'
  } else if (row.diffType === 'LOSS') {
    return 'loss-row'
  }
  return ''
}

const handleApprove = async () => {
  if (!reviewOpinion.value) {
    ElMessage.warning(t('stockCheck.validation.reviewOpinionRequired'))
    return
  }
  
  try {
    await ElMessageBox.confirm(
      t('stockCheck.messages.approveConfirm'),
      t('stockCheck.messages.approveTitle'),
      { type: 'warning' }
    )
    approving.value = true
    if (detail.value.checkStatus === 'DRAFT') {
      await submitStockCheck(detail.value.checkId)
    }
    await approveStockCheck(detail.value.checkId, { reviewOpinion: reviewOpinion.value })
    ElMessage.success(t('stockCheck.messages.approveSuccess'))
    router.push({ name: 'StockCheckReviewList' })
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Approve failed', error)
    }
  } finally {
    approving.value = false
  }
}

const handleReject = async () => {
  if (!reviewOpinion.value) {
    ElMessage.warning(t('stockCheck.validation.reviewOpinionRequired'))
    return
  }
  
  try {
    rejecting.value = true
    if (detail.value.checkStatus === 'DRAFT') {
      await submitStockCheck(detail.value.checkId)
    }
    await rejectStockCheck(detail.value.checkId, { reviewOpinion: reviewOpinion.value })
    ElMessage.success(t('stockCheck.messages.rejectSuccess'))
    router.push({ name: 'StockCheckReviewList' })
  } catch (error) {
    console.error('Reject failed', error)
  } finally {
    rejecting.value = false
  }
}

const handleBack = () => {
  router.push({ name: 'StockCheckReviewList' })
}

onMounted(() => {
  fetchDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

:deep(.page-header-green) {
  background-color: #009A44 !important;
  color: white !important;

  .title, .subtitle, .ri-icon {
    color: white !important;
  }
}

:deep(.el-table .surplus-row) {
  background-color: #FFF7ED !important;
}

:deep(.el-table .loss-row) {
  background-color: #FEF2F2 !important;
}

:deep(.stock-check-review-detail-table .diff-type-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.stock-check-review-detail-table .diff-type-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}
</style>
