<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-task-line"
        :title="$t('districtAggregationAudit.title')"
        :subtitle="$t('districtAggregationAudit.subtitle')"
      >
        <template #actions>
          <el-button type="primary" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('demandAudit.actions.back') }}
          </el-button>
        </template>
      </PageHeader>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <InfoCard 
          :title="$t('districtAggregationAudit.listTitle')" 
          icon="ri-list-check"
          :no-padding="true"
        >
          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table
              v-loading="loading"
              :data="tableData"
              stripe
              empty-text=""
            >
              <el-table-column
                prop="sourceCode"
                :label="$t('woredaCode')"
                min-width="140"
              />
              <el-table-column
                prop="sourceName"
                :label="$t('woredaName')"
                min-width="140"
              />
              <el-table-column
                prop="targetCode"
                :label="$t('zoneCode')"
                min-width="140"
              />
              <el-table-column
                prop="targetName"
                :label="$t('zoneName')"
                min-width="140"
              />
              <el-table-column
                prop="status"
                :label="$t('districtAggregationAudit.columns.status')"
                min-width="100"
              >
                <template #default="{ row }">
                  <el-tag v-if="row.status === '0'" type="info">
                    {{ $t('districtAggregationAudit.status.draft') }}
                  </el-tag>
                  <el-tag v-else-if="row.status === '1'" type="warning">
                    {{ $t('districtAggregationAudit.status.pending') }}
                  </el-tag>
                  <el-tag v-else-if="row.status === '2'" type="success">
                    {{ $t('districtAggregationAudit.status.approved') }}
                  </el-tag>
                  <el-tag v-else-if="row.status === '3'" type="danger">
                    {{ $t('districtAggregationAudit.status.rejected') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('common.actions')"
                fixed="right"
                width="300"
              >
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="mapWorkflowStatus(row.status)"
                    mode="list"
                    :show-audit="false"
                    :custom-buttons="getTableButtons(row)"
                    @action="(action) => handleTableAction(row, action)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 分页 -->
          <div v-if="pagination.total > 0" class="pagination-wrapper">
            <el-pagination
              :current-page="pagination.currentPage"
              :page-size="pagination.pageSize"
              :page-sizes="[10, 20, 50]"
              :total="pagination.total"
              layout="total, sizes, prev, pager, next"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @update:current-page="pagination.currentPage = $event"
              @update:page-size="pagination.pageSize = $event"
            />
          </div>

          <el-empty
            v-if="tableData.length === 0 && !loading"
            :description="$t('districtAggregationAudit.messages.noData')"
          />
        </InfoCard>
      </div>
    </div>

    <!-- 查看明细对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      :title="$t('districtAggregationAudit.detailDialog.title')"
      width="80%"
      top="5vh"
    >
      <el-table
        v-loading="detailLoading"
        :data="detailData"
        stripe
        max-height="500px"
      >
        <el-table-column
          prop="inputCategory"
          :label="$t('villageAggregation.detailDialog.columns.inputCategory')"
          min-width="150"
        >
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="inputType"
          :label="$t('villageAggregation.detailDialog.columns.inputType')"
          min-width="150"
        >
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalQuantity"
          :label="$t('villageAggregation.detailDialog.columns.totalQuantity')"
          min-width="120"
        />
<!--        <el-table-column-->
<!--          prop="totalCount"-->
<!--          :label="$t('villageAggregation.detailDialog.columns.totalCount')"-->
<!--          min-width="100"-->
<!--        />-->
      </el-table>

      <el-empty
        v-if="detailData.length === 0 && !detailLoading"
        :description="$t('districtAggregationAudit.detailDialog.noData')"
      />

      <template #footer>
        <el-button @click="detailDialogVisible = false">
          {{ $t('common.close') }}
        </el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getSummaryDetail,
  updateVillageDemandSummaryMain,
  getVillageDemandSummaryMainListSub
} from '@/api/villageAggregation'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const { getLabelByValue, options } = useDict(['input_type', 'input_category'])
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const yearParam = ref(route.params.year || '')

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 查看明细对话框
const detailDialogVisible = ref(false)
const detailLoading = ref(false)
const detailData = ref([])

// 加载列表数据
const loadData = async () => {
  loading.value = true
  try {
    const stateCode = JSON.parse(localStorage.getItem('userInfo')).deptId
    const params = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      targetCode: stateCode, // 州级regionCode
      year: yearParam.value
    }
    const res = await getVillageDemandSummaryMainListSub(params)

    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('districtAggregationAudit.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 驳回
const handleReject = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('districtAggregationAudit.rejectDialog.confirmMessage'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await updateVillageDemandSummaryMain({
      id: row.id,
      sourceCode: row.sourceCode,
      status: '3' // 审批驳回
    })

    if (res.code === 200) {
      ElMessage.success(t('districtAggregationAudit.messages.rejectSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('districtAggregationAudit.messages.rejectFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to reject:', error)
      ElMessage.error(t('districtAggregationAudit.messages.rejectFailed'))
    }
  }
}

// 查看明细
const handleViewDetail = async (row) => {
  detailDialogVisible.value = true
  detailLoading.value = true
  try {
    const res = await getSummaryDetail({
      summaryId: row.id
    })

    if (res.code === 200) {
      detailData.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load detail data:', error)
    ElMessage.error(t('districtAggregationAudit.messages.detailLoadFailed'))
  } finally {
    detailLoading.value = false
  }
}

// 审批
const handleApprove = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('districtAggregationAudit.approveDialog.confirmMessage'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await updateVillageDemandSummaryMain({
      id: row.id,
      sourceCode: row.sourceCode,
      status: '2' // 审批通过
    })

    if (res.code === 200) {
      ElMessage.success(t('districtAggregationAudit.messages.approveSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('districtAggregationAudit.messages.approveFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to approve:', error)
      ElMessage.error(t('districtAggregationAudit.messages.approveFailed'))
    }
  }
}

// 返回
const handleBack = () => {
  router.push({ name: 'DistrictAggregation' })
}

// 分页变化
const handleSizeChange = () => {
  pagination.currentPage = 1
  loadData()
}

const handleCurrentChange = () => {
  loadData()
}

// Workflow Handlers
const mapWorkflowStatus = (status) => {
  const map = {
    '0': 'S0',
    '1': 'S1',
    '2': 'S2',
    '3': 'S3'
  }
  return map[status] || 'S0'
}

const getTableButtons = (row) => {
  const buttons = []
  
  // Unified view button
  buttons.push({ 
    type: 'primary', 
    action: 'view', 
    label: 'common.view', 
    icon: 'ri-eye-line' 
  })
  
  if (row.status === '1') {
    buttons.push({ 
      type: 'success', 
      action: 'approve', 
      label: 'demandAudit.actions.approve', 
      icon: 'ri-check-line' 
    })
    buttons.push({ 
      type: 'danger', 
      action: 'reject', 
      label: 'demandAudit.actions.reject', 
      icon: 'ri-close-line' 
    })
  }
  
  return buttons
}

const handleTableAction = (row, action) => {
  switch (action) {
    case 'view':
      handleViewDetail(row)
      break
    case 'approve':
      handleApprove(row)
      break
    case 'reject':
      handleReject(row)
      break
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
