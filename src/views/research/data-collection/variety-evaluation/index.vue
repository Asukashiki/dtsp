<template>
  <div class="variety-evaluation-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon">
        <i class="ri-bar-chart-box-line"></i>
      </div>
      <div class="header-content">
        <h1 class="page-title">{{ $t('research.dataCollection.varietyEvaluation.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.dataCollection.varietyEvaluation.subtitle') }}</p>
      </div>
    </div>

    <!-- PC端视图 -->
    <div class="table-card pc-view">
      <!-- 搜索区域 -->
      <div class="search-section">
        <el-form :inline="true" :model="searchForm" class="search-form">
          <el-form-item :label="$t('research.dataCollection.varietyEvaluation.form.plotId')">
            <el-input
              v-model="searchForm.plotId"
              :placeholder="$t('common.pleaseEnter')"
              clearable
              @clear="handleSearch"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <i class="ri-search-line"></i>
              {{ $t('common.search') }}
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-refresh-line"></i>
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-form>
        <div class="action-buttons">
          <el-button type="primary" @click="handleAdd">
            <i class="ri-add-line"></i>
            {{ $t('common.add') }}
          </el-button>
        </div>
      </div>

      <!-- 表格 -->
      <el-table v-loading="loading" :data="tableData" stripe>
        <el-table-column
          prop="plotId"
          :label="$t('research.dataCollection.varietyEvaluation.form.plotId')"
          min-width="120"
        />
        <el-table-column
          prop="plotAreaM2"
          :label="$t('research.dataCollection.varietyEvaluation.form.plotAreaM2')"
          min-width="140"
        >
          <template #default="{ row }">
            {{ row.plotAreaM2 }} m²
          </template>
        </el-table-column>
        <el-table-column
          prop="grainWeightKg"
          :label="$t('research.dataCollection.varietyEvaluation.form.grainWeightKg')"
          min-width="140"
        >
          <template #default="{ row }">
            {{ row.grainWeightKg }} kg
          </template>
        </el-table-column>
        <el-table-column
          prop="yieldQtPerHa"
          :label="$t('research.dataCollection.varietyEvaluation.form.yieldQtPerHa')"
          min-width="160"
        >
          <template #default="{ row }">
            {{ row.yieldQtPerHa }} qt/ha
          </template>
        </el-table-column>
        <el-table-column
          prop="moistureContent"
          :label="$t('research.dataCollection.varietyEvaluation.form.moistureContent')"
          min-width="120"
        >
          <template #default="{ row }">
            {{ row.moistureContent }}%
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.actions')" fixed="right" width="200">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleView(row)">
              <i class="ri-eye-line"></i>
              {{ $t('common.view') }}
            </el-button>
            <el-button link type="primary" @click="handleEdit(row)">
              <i class="ri-edit-line"></i>
              {{ $t('common.edit') }}
            </el-button>
            <el-button link type="danger" @click="handleDelete(row)">
              <i class="ri-delete-bin-line"></i>
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 移动端视图 -->
    <div class="mobile-view">
      <!-- 搜索区域 -->
      <div class="mobile-search">
        <el-input
          v-model="searchForm.plotId"
          :placeholder="$t('research.dataCollection.varietyEvaluation.form.plotId')"
          clearable
          @clear="handleSearch"
        >
          <template #suffix>
            <i class="ri-search-line" @click="handleSearch"></i>
          </template>
        </el-input>
      </div>

      <!-- 卡片列表 -->
      <div v-loading="loading" class="card-list">
        <div v-for="item in tableData" :key="item.dataId" class="evaluation-card">
          <div class="card-header">
            <div class="plot-id">
              <i class="ri-map-pin-line"></i>
              {{ item.plotId }}
            </div>
            <div class="card-actions">
              <el-button link type="primary" @click="handleView(item)">
                <i class="ri-eye-line"></i>
              </el-button>
              <el-button link type="primary" @click="handleEdit(item)">
                <i class="ri-edit-line"></i>
              </el-button>
              <el-button link type="danger" @click="handleDelete(item)">
                <i class="ri-delete-bin-line"></i>
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <div class="info-row">
              <div class="info-item">
                <span class="label">{{ $t('research.dataCollection.varietyEvaluation.form.plotAreaM2') }}:</span>
                <span class="value">{{ item.plotAreaM2 }} m²</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('research.dataCollection.varietyEvaluation.form.grainWeightKg') }}:</span>
                <span class="value">{{ item.grainWeightKg }} kg</span>
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <span class="label">{{ $t('research.dataCollection.varietyEvaluation.form.yieldQtPerHa') }}:</span>
                <span class="value highlight">{{ item.yieldQtPerHa }} qt/ha</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('research.dataCollection.varietyEvaluation.form.moistureContent') }}:</span>
                <span class="value">{{ item.moistureContent }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="mobile-pagination">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          layout="prev, pager, next"
          small
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 悬浮按钮 -->
      <div class="mobile-fab" @click="handleAdd">
        <i class="ri-add-line"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getVarietyEvaluationList, deleteVarietyEvaluation } from '@/api/breeding'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  plotId: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getVarietyEvaluationList({
      plotId: searchForm.plotId,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.plotId = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push('/research/data-collection/variety-evaluation/add')
}

// 查看
const handleView = (row) => {
  router.push(`/research/data-collection/variety-evaluation/detail/${row.dataId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/research/data-collection/variety-evaluation/edit/${row.dataId}`)
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('common.deleteConfirm'),
    t('common.warning'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteVarietyEvaluation(row.dataId)
      if (res.code === 200) {
        ElMessage.success(t('common.deleteSuccess'))
        loadData()
      } else {
        ElMessage.error(res.msg || t('common.deleteFailed'))
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }).catch(() => {})
}

// 分页
const handleSizeChange = () => {
  pagination.currentPage = 1
  loadData()
}

const handleCurrentChange = () => {
  loadData()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.variety-evaluation-container {
  padding: 24px;
  min-height: calc(100vh - 120px);
}

/* ==================== 页面头部 ==================== */
.page-header {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(0, 154, 68, 0.2);
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

/* ==================== PC端表格卡片 ==================== */
.table-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 16px;
}

.search-form {
  flex: 1;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* ==================== 移动端视图 ==================== */
.mobile-view {
  display: none;
}

.mobile-search {
  margin-bottom: 16px;
}

.mobile-search :deep(.el-input__suffix) {
  cursor: pointer;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 80px;
}

.evaluation-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.evaluation-card:active {
  transform: scale(0.98);
}

.card-header {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.08) 0%, rgba(254, 221, 0, 0.08) 100%);
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 154, 68, 0.1);
}

.plot-id {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 6px;
}

.plot-id i {
  font-size: 18px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.card-actions .el-button {
  font-size: 18px;
  padding: 4px;
}

.card-body {
  padding: 16px;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item .label {
  font-size: 12px;
  color: #6b7280;
}

.info-item .value {
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
}

.info-item .value.highlight {
  color: #009A44;
  font-weight: 600;
  font-size: 16px;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}

.mobile-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.mobile-fab i {
  font-size: 28px;
  color: white;
}

.mobile-fab:active {
  transform: scale(0.95);
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .variety-evaluation-container {
    padding: 16px;
  }

  .page-header {
    padding: 24px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .variety-evaluation-container {
    padding: 12px;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .page-header {
    padding: 20px 16px;
    border-radius: 12px;
    margin-bottom: 16px;
  }

  .header-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
    border-radius: 12px;
  }

  .page-title {
    font-size: 18px;
  }

  .page-subtitle {
    font-size: 13px;
  }
}

@media screen and (max-width: 480px) {
  .variety-evaluation-container {
    padding: 8px;
  }

  .page-header {
    padding: 16px 12px;
    gap: 16px;
  }

  .header-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
    border-radius: 10px;
  }

  .page-title {
    font-size: 16px;
  }

  .page-subtitle {
    font-size: 12px;
  }

  .mobile-fab {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }

  .mobile-fab i {
    font-size: 24px;
  }
}
</style>
