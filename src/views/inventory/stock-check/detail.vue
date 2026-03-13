<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-survey-line"
        :title="$t('stockCheck.detailTitle')"
        class="page-header-green"
      >
        <template #actions>
          <el-button @click="handleBack">{{ $t('stockCheck.actions.backToList') }}</el-button>
          <el-button
            v-if="['DRAFT', 'REJECTED'].includes(detail.checkStatus)"
            type="primary"
            @click="handleEdit"
          >
            {{ $t('stockCheck.actions.edit') }}
          </el-button>
        </template>
      </PageHeader>

      <div class="content-wrapper">
        <!-- 基本信息 -->
        <InfoCard :title="$t('stockCheck.sections.basicInfo')" icon="ri-information-line">
          <el-descriptions :column="3" border>
            <el-descriptions-item :label="$t('stockCheck.fields.checkId')">
              {{ detail.checkId }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.checkDate')">
              {{ detail.checkDate }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.warehouseName')">
              {{ detail.warehouseName }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.checkerName')">
              {{ detail.checkerName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.checkStatus')">
              <el-tag :type="getStatusTag(detail.checkStatus)">
                {{ getStatusText(detail.checkStatus) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.checkRemark')" :span="3">
              {{ detail.checkRemark || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 审核信息 -->
        <InfoCard
          v-if="['APPROVED', 'REJECTED', 'ADJUSTED'].includes(detail.checkStatus)"
          :title="$t('stockCheck.sections.reviewInfo')"
          icon="ri-shield-check-line"
          class="mt-4"
        >
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('stockCheck.fields.reviewerName')">
              {{ detail.reviewerName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.reviewDate')">
              {{ detail.reviewDate || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('stockCheck.fields.reviewOpinion')" :span="2">
              <span :class="detail.checkStatus === 'REJECTED' ? 'text-red-500 font-bold' : ''">
                {{ detail.reviewOpinion || '-' }}
              </span>
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 盘点明细列表 -->
        <InfoCard :title="$t('stockCheck.sections.checkDetail')" icon="ri-list-check" class="mt-4 mb-4">
          <el-table
            :data="detail.details"
            style="width: 100%"
            border
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="productName" :label="$t('stockCheck.fields.productName')" min-width="150" />
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

            <el-table-column :label="$t('stockCheck.fields.diffType')" width="100" align="center">
              <template #default="{ row }">
                <el-tag v-if="row.diffType === 'SURPLUS'" type="warning" color="#FFF7ED" class="border-[#F59E0B] text-[#F59E0B]">
                  {{ $t('stockCheck.diffType.SURPLUS') }}
                </el-tag>
                <el-tag v-else-if="row.diffType === 'LOSS'" type="danger" color="#FEF2F2" class="border-[#DA121A] text-[#DA121A]">
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getStockCheckDetail } from '@/api/stockCheck'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const detail = ref({
  checkId: '',
  checkDate: '',
  warehouseName: '',
  checkerName: '',
  checkStatus: '',
  checkRemark: '',
  reviewerName: '',
  reviewDate: '',
  reviewOpinion: '',
  details: []
})

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

const fetchDetail = async () => {
  const id = route.params.id
  if (!id) return
  
  try {
    const res = await getStockCheckDetail(id)
    if (res.data) {
      detail.value = res.data
    }
  } catch (error) {
    console.error('Failed to load detail', error)
  }
}

const handleBack = () => {
  router.push('/inventory/stock-check')
}

const handleEdit = () => {
  router.push(`/inventory/stock-check/form/${detail.value.checkId}`)
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
</style>
