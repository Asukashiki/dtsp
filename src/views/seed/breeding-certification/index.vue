<template>
  <div class="breeding-certification-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-seedling-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('seed.breedingCertification.title') }}</h1>
          <p class="page-subtitle">{{ $t('seed.breedingCertification.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchParams.applyOrgName"
            :placeholder="$t('seed.breedingCertification.searchPlaceholder')"
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
            :placeholder="$t('seed.breedingCertification.filterByCrop')"
            class="type-filter"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('seed.breedingCertification.cropTypes.wheat')" value="wheat" />
            <el-option :label="$t('seed.breedingCertification.cropTypes.rice')" value="rice" />
            <el-option :label="$t('seed.breedingCertification.cropTypes.corn')" value="corn" />
            <el-option :label="$t('seed.breedingCertification.cropTypes.soybean')" value="soybean" />
            <el-option :label="$t('seed.breedingCertification.cropTypes.cotton')" value="cotton" />
            <el-option :label="$t('seed.breedingCertification.cropTypes.other')" value="other" />
          </el-select>

          <el-select
            v-model="searchParams.recordStatus"
            :placeholder="$t('seed.breedingCertification.filterByStatus')"
            class="type-filter"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('seed.breedingCertification.recordStatus.pending')" value="pending" />
            <el-option :label="$t('seed.breedingCertification.recordStatus.approved')" value="approved" />
            <el-option :label="$t('seed.breedingCertification.recordStatus.rejected')" value="rejected" />
            <el-option :label="$t('seed.breedingCertification.recordStatus.draft')" value="draft" />
          </el-select>
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
          <div class="action-right">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('seed.breedingCertification.add') }}</span>
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="applyOrgName" :label="$t('seed.breedingCertification.columns.applyOrgName')" min-width="200" show-overflow-tooltip />
          <el-table-column prop="cropType" :label="$t('seed.breedingCertification.columns.cropType')" width="120" align="center">
            <template #default="{ row }">
              <el-tag type="success" size="small">{{ $t(`seed.breedingCertification.cropTypes.${row.cropType}`) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="varietyName" :label="$t('seed.breedingCertification.columns.varietyName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="recordDate" :label="$t('seed.breedingCertification.columns.recordDate')" width="120" />
          <el-table-column prop="recordStatus" :label="$t('seed.breedingCertification.columns.recordStatus')" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.recordStatus)" size="small">{{ $t(`seed.breedingCertification.recordStatus.${row.recordStatus}`) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('seed.breedingCertification.columns.createTime')" width="160" />
          <el-table-column :label="$t('seed.breedingCertification.columns.actions')" width="220" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)"><i class="ri-eye-line"></i></el-button>
              <el-button link type="primary" @click="handleEdit(row)"><i class="ri-edit-line"></i></el-button>
              <el-button link type="danger" @click="handleDelete(row)"><i class="ri-delete-bin-line"></i></el-button>
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
          <div v-for="item in tableData" :key="item.dataId" class="certification-card" @click="handleView(item)">
            <div class="card-header">
              <el-tag type="success" size="small">{{ $t(`seed.breedingCertification.cropTypes.${item.cropType}`) }}</el-tag>
              <el-tag :type="getStatusTag(item.recordStatus)" size="small">{{ $t(`seed.breedingCertification.recordStatus.${item.recordStatus}`) }}</el-tag>
            </div>
            <h3 class="card-title">{{ item.varietyName }}</h3>
            <div class="card-info">
              <div class="info-item full">
                <span class="info-label">{{ $t('seed.breedingCertification.columns.applyOrgName') }}</span>
                <span class="info-value">{{ item.applyOrgName }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('seed.breedingCertification.columns.recordDate') }}</span>
                <span class="info-value">{{ item.recordDate }}</span>
              </div>
              <div class="info-item" v-if="item.supervision && item.supervision.approvalNumber">
                <span class="info-label">{{ $t('seed.breedingCertification.columns.approvalNumber') }}</span>
                <span class="info-value">{{ item.supervision.approvalNumber }}</span>
              </div>
            </div>
            <div class="card-footer">
              <span class="create-time">{{ item.createTime }}</span>
              <div class="card-actions" @click.stop>
                <el-button link type="primary" size="small" @click="handleEdit(item)">
                  <i class="ri-edit-line"></i> {{ $t('common.edit') }}
                </el-button>
                <el-button link type="danger" size="small" @click="handleDelete(item)">
                  <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="tableData.length === 0 && !loading" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('home.noData') }}</p>
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

    <!-- 移动端浮动添加按钮 -->
    <div class="mobile-fab" @click="handleAdd">
      <i class="ri-add-line"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedingCertificationPage, deleteBreedingCertification } from '@/api/seed'

const router = useRouter()
const { t } = useI18n()

const searchParams = reactive({
  applyOrgName: '',
  cropType: '',
  varietyName: '',
  recordDate: '',
  recordStatus: ''
})

const loading = ref(false)
const tableData = ref([])
const selectedRows = ref([])

const pagination = reactive({ pageNum: 1, pageSize: 10, total: 0 })

const getStatusTag = (status) => {
  const statusMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    draft: 'info'
  }
  return statusMap[status] || 'info'
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await getBreedingCertificationPage({
      ...searchParams,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data.records || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.pageNum = 1; loadData() }
const handleReset = () => {
  Object.assign(searchParams, {
    applyOrgName: '',
    cropType: '',
    varietyName: '',
    recordDate: '',
    recordStatus: ''
  })
  pagination.pageNum = 1
  loadData()
}

const handleAdd = () => router.push('/research/seed/breeding-certification/add')
const handleView = (row) => router.push(`/research/seed/breeding-certification/detail/${row.dataId}`)
const handleEdit = (row) => router.push(`/research/seed/breeding-certification/edit/${row.dataId}`)

const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('seed.breedingCertification.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    const res = await deleteBreedingCertification([row.dataId])
    if (res.code === 200) {
      ElMessage.success(t('seed.breedingCertification.deleteSuccess'))
      loadData()
    }
  }).catch(() => {})
}

const handleSelectionChange = (selection) => { selectedRows.value = selection }
const handleSizeChange = () => { pagination.pageNum = 1; loadData() }
const handlePageChange = () => { loadData() }

onMounted(() => loadData())
</script>

<style scoped>
.breeding-certification-container { min-height: calc(100vh - 120px); position: relative; }

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
.search-row { display: flex; gap: 12px; margin-bottom: 12px; }
.search-input { flex: 1; min-width: 0; }
.type-filter { width: 180px; flex-shrink: 0; }
.action-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.action-left, .action-right { display: flex; gap: 8px; }

/* PC端表格 */
.table-card { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); padding: 16px; }
.pagination-wrapper { margin-top: 16px; display: flex; justify-content: flex-end; }

/* 移动端默认隐藏 */
.mobile-view, .mobile-fab { display: none; }

/* 移动端卡片样式 */
.card-list { display: flex; flex-direction: column; gap: 12px; }
.certification-card { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); transition: all 0.3s ease; cursor: pointer; }
.certification-card:active { transform: scale(0.98); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08); }
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
@media screen and (max-width: 1024px) {
  .page-header { margin: -16px -16px 16px -16px; padding: 20px 0; }
  .header-content { padding: 0 16px; }
  .type-filter { width: 160px; }
}

@media screen and (max-width: 768px) {
  .page-header { margin: -12px -12px 12px -12px; padding: 16px 0; }
  .header-content { padding: 0 12px; gap: 12px; }
  .header-icon-wrapper { width: 48px; height: 48px; border-radius: 10px; }
  .header-icon { font-size: 24px; }
  .page-title { font-size: 18px; }
  .page-subtitle { display: none; }

  .search-row { flex-direction: column; }
  .type-filter { width: 100%; }
  .action-row { flex-direction: column; align-items: stretch; }
  .action-left, .action-right { justify-content: stretch; }
  .action-left .el-button, .action-right .el-button { flex: 1; }
  .action-right { display: none; }

  .pc-view { display: none; }
  .mobile-view { display: block; }

  .mobile-fab {
    display: flex; position: fixed; bottom: 24px; right: 24px; width: 56px; height: 56px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%); border-radius: 50%;
    align-items: center; justify-content: center; color: white; font-size: 24px;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3); cursor: pointer; z-index: 50; transition: all 0.3s ease;
  }
  .mobile-fab:active { transform: scale(0.9); }
}

@media screen and (max-width: 480px) {
  .page-header { margin: -8px -8px 8px -8px; padding: 12px 0; }
  .header-content { padding: 0 8px; }
  .header-icon-wrapper { width: 40px; height: 40px; }
  .header-icon { font-size: 20px; }
  .page-title { font-size: 16px; }
  .search-bar { padding: 12px; }
  .certification-card { padding: 12px; }
  .card-title { font-size: 15px; }
  .mobile-fab { bottom: 16px; right: 16px; width: 48px; height: 48px; font-size: 20px; }
}
</style>
