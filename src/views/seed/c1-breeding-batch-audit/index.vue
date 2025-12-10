<template>
  <div class="c1-batch-audit-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-audit-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('seed.c1BatchAudit.title') }}</h1>
          <p class="page-subtitle">{{ $t('seed.c1BatchAudit.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchParams.keyword"
            :placeholder="$t('seed.c1BatchAudit.searchPlaceholder')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>

          <el-select
            v-model="searchParams.cropType"
            :placeholder="$t('seed.c1BatchAudit.filterByCrop')"
            class="type-filter"
            clearable
            @change="handleSearch"
          >
            <el-option label="Wheat" value="Wheat" />
            <el-option label="Maize" value="Maize" />
            <el-option label="Teff" value="Teff" />
            <el-option label="Sorghum" value="Sorghum" />
            <el-option label="Barley" value="Barley" />
          </el-select>

          <el-date-picker
            v-model="dateRange"
            type="daterange"
            :range-separator="$t('common.to')"
            :start-placeholder="$t('common.startDate')"
            :end-placeholder="$t('common.endDate')"
            class="date-range-picker"
            clearable
            value-format="YYYY-MM-DD"
            @change="handleDateChange"
          />
        </div>

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
          </div>
        </div>
      </div>

      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="batchId" :label="$t('seed.c1BatchAudit.columns.batchId')" min-width="180" fixed="left" show-overflow-tooltip />
          <el-table-column prop="varietyName" :label="$t('seed.c1BatchAudit.columns.varietyName')" min-width="140" show-overflow-tooltip />
          <el-table-column prop="cropType" :label="$t('seed.c1BatchAudit.columns.cropType')" min-width="100" align="center" />
          <el-table-column prop="orgName" :label="$t('seed.c1BatchAudit.columns.orgName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="startDate" :label="$t('seed.c1BatchAudit.columns.startDate')" min-width="120" align="center" />
          <el-table-column prop="batchStatus" :label="$t('seed.c1BatchAudit.columns.batchStatus')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.batchStatus)" size="small">
                {{ getStatusName(row.batchStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="auditStatus" :label="$t('seed.c1BatchAudit.columns.auditStatus')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="row.auditStatus === 'pending' ? 'warning' : row.auditStatus === 'approved' ? 'success' : 'danger'" size="small">
                {{ $t(`seed.c1BatchAudit.auditStatus.${row.auditStatus}`) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" width="200" fixed="right" align="center">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i> {{ $t('common.view') }}
              </el-button>
              <el-button
                v-if="row.auditStatus === 'pending'"
                link
                type="warning"
                @click="handleAudit(row)"
              >
                <i class="ri-audit-line"></i> {{ $t('seed.c1BatchAudit.audit') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
        </div>
      </div>

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view" v-loading="loading">
        <div class="card-list">
          <div v-for="item in tableData" :key="item.id" class="audit-card" @click="handleView(item)">
            <div class="card-header">
              <el-tag :type="getStatusTagType(item.batchStatus)" size="small">{{ getStatusName(item.batchStatus) }}</el-tag>
              <el-tag :type="item.auditStatus === 'pending' ? 'warning' : item.auditStatus === 'approved' ? 'success' : 'danger'" size="small">
                {{ $t(`seed.c1BatchAudit.auditStatus.${item.auditStatus}`) }}
              </el-tag>
            </div>
            <h3 class="card-title">{{ item.batchId }}</h3>
            <div class="card-info">
              <div class="info-item">
                <span class="info-label">{{ $t('seed.c1BatchAudit.columns.varietyName') }}</span>
                <span class="info-value">{{ item.varietyName }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('seed.c1BatchAudit.columns.cropType') }}</span>
                <span class="info-value">{{ item.cropType }}</span>
              </div>
              <div class="info-item full">
                <span class="info-label">{{ $t('seed.c1BatchAudit.columns.orgName') }}</span>
                <span class="info-value">{{ item.orgName }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('seed.c1BatchAudit.columns.startDate') }}</span>
                <span class="info-value">{{ item.startDate }}</span>
              </div>
            </div>
            <div class="card-footer">
              <span class="create-time">{{ item.createdTime }}</span>
              <div class="card-actions" @click.stop>
                <el-button
                  v-if="item.auditStatus === 'pending'"
                  link
                  type="warning"
                  size="small"
                  @click="handleAudit(item)"
                >
                  <i class="ri-audit-line"></i> {{ $t('seed.c1BatchAudit.audit') }}
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="tableData.length === 0 && !loading" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('seed.c1BatchAudit.noData') }}</p>
        </div>

        <div class="mobile-pagination">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            layout="prev, pager, next"
            small
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- 审核弹窗 -->
    <el-dialog
      v-model="auditDialogVisible"
      :title="$t('seed.c1BatchAudit.auditDialog')"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form ref="auditFormRef" :model="auditForm" :rules="auditRules" label-width="100px">
        <el-form-item :label="$t('seed.c1BatchAudit.auditResult')" prop="result">
          <el-radio-group v-model="auditForm.result">
            <el-radio value="approved">{{ $t('seed.c1BatchAudit.approve') }}</el-radio>
            <el-radio value="rejected">{{ $t('seed.c1BatchAudit.reject') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('seed.c1BatchAudit.auditComment')" prop="comment">
          <el-input
            v-model="auditForm.comment"
            type="textarea"
            :rows="4"
            :placeholder="$t('seed.c1BatchAudit.auditCommentPlaceholder')"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="auditDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="auditSubmitting" @click="handleAuditSubmit">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  getC1BreedingBatchList,
  approveC1Batch,
  rejectC1Batch
} from '@/api/c1BreedingBatch'

const router = useRouter()
const { t } = useI18n()

const searchParams = reactive({
  keyword: '',
  cropType: '',
  auditStatus: 'pending', // 固定为待审核状态
  startDateBegin: '',
  startDateEnd: ''
})

const dateRange = ref([])

const loading = ref(false)
const tableData = ref([])

const pagination = reactive({ pageNum: 1, pageSize: 10, total: 0 })

// 审核弹窗相关
const auditDialogVisible = ref(false)
const auditFormRef = ref()
const auditSubmitting = ref(false)
const currentAuditRow = ref(null)
const auditForm = reactive({
  result: 'approved',
  comment: ''
})

const auditRules = computed(() => ({
  result: [
    { required: true, message: t('seed.c1BatchAudit.resultRequired'), trigger: 'change' }
  ],
  comment: [
    { required: true, message: t('seed.c1BatchAudit.commentRequired'), trigger: 'blur' }
  ]
}))

// 状态映射
const statusMap = computed(() => ({
  '01': t('seed.c1BatchAudit.status.ongoing'),
  '02': t('seed.c1BatchAudit.status.completed'),
  '03': t('seed.c1BatchAudit.status.terminated')
}))

const loadData = async () => {
  loading.value = true
  try {
    const res = await getC1BreedingBatchList({
      ...searchParams,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      pagination.total = res.data?.total || 0
    }
  } catch (error) {
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

const handleDateChange = (dates) => {
  if (dates && dates.length === 2) {
    searchParams.startDateBegin = dates[0]
    searchParams.startDateEnd = dates[1]
  } else {
    searchParams.startDateBegin = ''
    searchParams.startDateEnd = ''
  }
  handleSearch()
}

const handleSearch = () => { pagination.pageNum = 1; loadData() }
const handleReset = () => {
  Object.assign(searchParams, {
    keyword: '',
    cropType: '',
    auditStatus: 'pending',
    startDateBegin: '',
    startDateEnd: ''
  })
  dateRange.value = []
  pagination.pageNum = 1
  loadData()
}

const handleView = (row) => router.push(`/research/c1-breeding-batch/detail/${row.id}?readonly=true`)

const handleSizeChange = () => { pagination.pageNum = 1; loadData() }
const handlePageChange = () => { loadData() }

// 获取状态名称
const getStatusName = (status) => statusMap.value[status] || status

// 获取状态标签类型
const getStatusTagType = (status) => {
  const map = { '01': 'primary', '02': 'success', '03': 'info' }
  return map[status] || 'info'
}

// 打开审核弹窗
const handleAudit = (row) => {
  currentAuditRow.value = row
  auditForm.result = 'approved'
  auditForm.comment = ''
  auditDialogVisible.value = true
}

// 提交审核结果
const handleAuditSubmit = async () => {
  try {
    await auditFormRef.value.validate()

    auditSubmitting.value = true

    const data = {
      id: currentAuditRow.value.id,
      auditComment: auditForm.comment
    }

    let res
    if (auditForm.result === 'approved') {
      res = await approveC1Batch(data)
    } else {
      res = await rejectC1Batch(data)
    }

    if (res.code === 200) {
      ElMessage.success(t('seed.c1BatchAudit.auditSuccess'))
      auditDialogVisible.value = false
      loadData()
    }
  } catch (error) {
    console.error('Audit validation failed:', error)
  } finally {
    auditSubmitting.value = false
  }
}

onMounted(() => loadData())
</script>

<style scoped>
.c1-batch-audit-container { min-height: calc(100vh - 120px); position: relative; }

/* 页面头部 */
.page-header { background: linear-gradient(135deg, #009A44 0%, #00b350 100%); padding: 24px 0; margin: -24px 0 24px 0; border-radius: 0 0 16px 16px; }
.header-content { max-width: 100%; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 20px; }
.header-icon-wrapper { width: 64px; height: 64px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); flex-shrink: 0; }
.header-icon { font-size: 32px; color: white; }
.header-text { flex: 1; color: white; min-width: 0; }
.page-title { font-size: 24px; font-weight: 600; margin: 0 0 4px 0; }
.page-subtitle { font-size: 14px; opacity: 0.9; margin: 0; }

/* 搜索栏 */
.search-bar { background: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); margin-bottom: 16px; }
.search-row { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.search-input { flex: 1; min-width: 200px; }
.type-filter { width: 180px; flex-shrink: 0; }
.date-range-picker { width: 300px; flex-shrink: 0; }
.action-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.action-left { display: flex; gap: 8px; }

/* PC端表格 */
.table-card { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); padding: 16px; }
.pagination-wrapper { margin-top: 16px; display: flex; justify-content: flex-end; }

/* 移动端默认隐藏 */
.mobile-view { display: none; }

/* 移动端卡片样式 */
.card-list { display: flex; flex-direction: column; gap: 12px; }
.audit-card { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); transition: all 0.3s ease; cursor: pointer; }
.audit-card:active { transform: scale(0.98); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08); }
.card-header { display: flex; gap: 8px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 600; color: #303133; margin: 0 0 12px 0; line-height: 1.4; }
.card-info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
.info-item { display: flex; flex-direction: column; gap: 2px; }
.info-item.full { grid-column: 1 / -1; }
.info-label { font-size: 12px; color: #909399; }
.info-value { font-size: 14px; color: #606266; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid rgba(0, 0, 0, 0.06); }
.create-time { font-size: 12px; color: #909399; }
.card-actions { display: flex; gap: 8px; }
.empty-state { text-align: center; padding: 60px 20px; color: #909399; }
.empty-state i { font-size: 48px; margin-bottom: 12px; display: block; }
.mobile-pagination { display: flex; justify-content: center; padding: 16px 0; }

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 768px) {
  .page-header { margin: -12px -12px 12px -12px; padding: 16px 0; }
  .header-content { padding: 0 12px; gap: 12px; }
  .header-icon-wrapper { width: 48px; height: 48px; border-radius: 10px; }
  .header-icon { font-size: 24px; }
  .page-title { font-size: 18px; }
  .page-subtitle { display: none; }

  .search-row { flex-direction: column; }
  .type-filter, .date-range-picker { width: 100%; }
  .action-row { flex-direction: column; align-items: stretch; }
  .action-left { justify-content: stretch; }
  .action-left .el-button { flex: 1; }

  .pc-view { display: none; }
  .mobile-view { display: block; }
}
</style>
