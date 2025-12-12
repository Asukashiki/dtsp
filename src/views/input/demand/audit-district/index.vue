<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-task-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('districtAggregationAudit.title') }}</h1>
            <p class="page-subtitle">{{ $t('districtAggregationAudit.subtitle') }}</p>
          </div>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('demandAudit.actions.back') }}
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check"></i>
              <span>{{ $t('districtAggregationAudit.listTitle') }}</span>
            </div>
            <div class="header-actions">
              <!-- 预留右侧操作区，目前为空,保持布局一致 -->
            </div>
          </div>

          <div class="card-body">
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
                  :label="$t('districtAggregationAudit.columns.sourceCode')"
                  min-width="140"
                />
                <el-table-column
                  prop="sourceName"
                  :label="$t('districtAggregationAudit.columns.sourceName')"
                  min-width="140"
                />
                <el-table-column
                  prop="targetCode"
                  :label="$t('districtAggregationAudit.columns.targetCode')"
                  min-width="140"
                />
                <el-table-column
                  prop="targetName"
                  :label="$t('districtAggregationAudit.columns.targetName')"
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
                  width="340"
                >
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="info" @click="handleViewDetail(row)">
                        <i class="ri-file-list-line"></i>
                        {{ $t('districtAggregationAudit.actions.viewDetail') }}
                      </el-button>
                      <el-button v-if="row.status === '1'" link type="success" @click="handleApprove(row)">
                        <i class="ri-check-line"></i>
                        {{ $t('demandAudit.actions.approve') }}
                      </el-button>
                      <el-button v-if="row.status === '1'" link type="danger" @click="handleReject(row)">
                        <i class="ri-close-line"></i>
                        {{ $t('demandAudit.actions.reject') }}
                      </el-button>
                    </div>
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
          </div>
        </div>
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
        />
        <el-table-column
          prop="inputType"
          :label="$t('villageAggregation.detailDialog.columns.inputType')"
          min-width="150"
        />
        <el-table-column
          prop="totalQuantity"
          :label="$t('villageAggregation.detailDialog.columns.totalQuantity')"
          min-width="120"
        />
        <el-table-column
          prop="totalCount"
          :label="$t('villageAggregation.detailDialog.columns.totalCount')"
          min-width="100"
        />
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
import { getVillageDemandSummaryMainList, getSummaryDetail, updateVillageDemandSummaryMain } from '@/api/villageAggregation'

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
    const stateCode = JSON.parse(localStorage.getItem('userInfo')).user.regionCode
    const params = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      targetCode: stateCode, // 州级regionCode
      year: yearParam.value
    }
    const res = await getVillageDemandSummaryMainList(params)

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

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.page-container {
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  max-width: 1400px;
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
}

.header-right {
  flex-shrink: 0;
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

.content-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.info-card {
  background: white;
}

.card-header {
  padding: 24px;
  border-bottom: 1px solid #e8f5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.card-body {
  padding: 24px;
}

.table-wrapper {
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .header-left {
    width: 100%;
  }

  .header-right {
    width: 100%;
  }

  .content-wrapper {
    padding: 0;
  }

  .card-body {
    padding: 16px;
  }
}
</style>
