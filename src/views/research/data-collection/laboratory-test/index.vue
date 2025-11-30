<template>
  <div class="laboratory-test-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon">
        <i class="ri-microscope-line"></i>
      </div>
      <div class="header-content">
        <h1 class="page-title">{{ $t('research.dataCollection.laboratoryTest.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.dataCollection.laboratoryTest.subtitle') }}</p>
      </div>
    </div>

    <!-- PC端视图 -->
    <div class="table-card pc-view">
      <!-- 搜索区域 -->
      <div class="search-section">
        <el-form :inline="true" :model="searchForm" class="search-form">
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.sampleId')">
            <el-input
              v-model="searchForm.sampleId"
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
          prop="sampleId"
          :label="$t('research.dataCollection.laboratoryTest.form.sampleId')"
          min-width="120"
        />
        <el-table-column
          prop="sampleCondition"
          :label="$t('research.dataCollection.laboratoryTest.form.sampleCondition')"
          min-width="120"
        />
        <el-table-column
          prop="germinationRate"
          :label="$t('research.dataCollection.laboratoryTest.form.germinationRate')"
          min-width="120"
        >
          <template #default="{ row }">
            {{ row.germinationRate }}%
          </template>
        </el-table-column>
        <el-table-column
          prop="purityPercent"
          :label="$t('research.dataCollection.laboratoryTest.form.purityPercent')"
          min-width="110"
        >
          <template #default="{ row }">
            {{ row.purityPercent }}%
          </template>
        </el-table-column>
        <el-table-column
          prop="moistureContentPercent"
          :label="$t('research.dataCollection.laboratoryTest.form.moistureContentPercent')"
          min-width="120"
        >
          <template #default="{ row }">
            {{ row.moistureContentPercent }}%
          </template>
        </el-table-column>
        <el-table-column
          prop="proteinPercent"
          :label="$t('research.dataCollection.laboratoryTest.form.proteinPercent')"
          min-width="120"
        >
          <template #default="{ row }">
            {{ row.proteinPercent }}%
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
          v-model="searchForm.sampleId"
          :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')"
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
        <div v-for="item in tableData" :key="item.dataId" class="lab-card">
          <div class="card-header">
            <div class="sample-id">
              <i class="ri-test-tube-line"></i>
              {{ item.sampleId }}
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
            <div class="condition-tag">
              <el-tag>{{ item.sampleCondition }}</el-tag>
            </div>

            <div class="metrics-grid">
              <div class="metric-item">
                <div class="metric-label">{{ $t('research.dataCollection.laboratoryTest.form.germinationRate') }}</div>
                <div class="metric-value highlight">{{ item.germinationRate }}%</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">{{ $t('research.dataCollection.laboratoryTest.form.purityPercent') }}</div>
                <div class="metric-value">{{ item.purityPercent }}%</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">{{ $t('research.dataCollection.laboratoryTest.form.moistureContentPercent') }}</div>
                <div class="metric-value">{{ item.moistureContentPercent }}%</div>
              </div>
              <div class="metric-item">
                <div class="metric-label">{{ $t('research.dataCollection.laboratoryTest.form.proteinPercent') }}</div>
                <div class="metric-value">{{ item.proteinPercent }}%</div>
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
import { getLaboratoryTestList, deleteLaboratoryTest } from '@/api/breeding'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  sampleId: ''
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
    const res = await getLaboratoryTestList({
      sampleId: searchForm.sampleId,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data || []
      pagination.total = res.total || 0
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
  searchForm.sampleId = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push('/research/data-collection/laboratory-test/add')
}

// 查看
const handleView = (row) => {
  router.push(`/research/data-collection/laboratory-test/detail/${row.dataId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/research/data-collection/laboratory-test/edit/${row.dataId}`)
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
      const res = await deleteLaboratoryTest(row.dataId)
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
.laboratory-test-container {
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

.lab-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.lab-card:active {
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

.sample-id {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sample-id i {
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

.condition-tag {
  margin-bottom: 12px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric-item {
  background: rgba(0, 154, 68, 0.02);
  border-radius: 8px;
  padding: 12px;
  border-left: 3px solid #009A44;
}

.metric-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.metric-value.highlight {
  color: #009A44;
  font-size: 18px;
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
  .laboratory-test-container {
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
  .laboratory-test-container {
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
  .laboratory-test-container {
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

  .metrics-grid {
    gap: 10px;
  }

  .metric-item {
    padding: 10px;
  }

  .metric-label {
    font-size: 11px;
  }

  .metric-value {
    font-size: 14px;
  }

  .metric-value.highlight {
    font-size: 16px;
  }
}
</style>
