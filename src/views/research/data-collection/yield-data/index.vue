<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-bar-chart-box-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.dataCollection.yieldData.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.dataCollection.yieldData.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.dataCollection.yieldData.list') }}</span>
            </div>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.dataCollection.yieldData.add') }}
            </el-button>
          </div>

          <div class="card-body">
            <!-- 搜索区域 -->
            <div class="search-section">
              <el-input
                v-model="searchForm.batchId"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.batchId')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
              <el-input
                v-model="searchForm.plotId"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.plotId')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
              <el-button type="primary" @click="handleSearch">
                <i class="ri-search-line"></i>
                {{ $t('common.search') }}
              </el-button>
              <el-button @click="handleReset">
                <i class="ri-refresh-line"></i>
                {{ $t('common.reset') }}
              </el-button>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table v-loading="loading" :data="tableData" stripe>
                <el-table-column
                  prop="batchId"
                  :label="$t('research.dataCollection.yieldData.columns.batchId')"
                  min-width="150"
                />
                <el-table-column
                  prop="trialId"
                  :label="$t('research.dataCollection.yieldData.columns.trialId')"
                  min-width="150"
                />
                <el-table-column
                  prop="plotId"
                  :label="$t('research.dataCollection.yieldData.columns.plotId')"
                  min-width="120"
                />
                <el-table-column
                  prop="plotAreaM2"
                  :label="$t('research.dataCollection.yieldData.columns.plotAreaM2')"
                  min-width="130"
                />
                <el-table-column
                  prop="grainWeightKg"
                  :label="$t('research.dataCollection.yieldData.columns.grainWeightKg')"
                  min-width="140"
                />
                <el-table-column
                  prop="yieldQtPerHa"
                  :label="$t('research.dataCollection.yieldData.columns.yieldQtPerHa')"
                  min-width="150"
                />
                <el-table-column
                  prop="harvestDate"
                  :label="$t('research.dataCollection.yieldData.columns.harvestDate')"
                  min-width="120"
                />
                <el-table-column
                  :label="$t('common.actions')"
                  fixed="right"
                  width="300"
                >
                  <template #default="{ row }">
                    <div class="action-buttons">
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
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 分页 -->
              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="pagination.currentPage"
                  v-model:page-size="pagination.pageSize"
                  :page-sizes="[10, 20, 50, 100]"
                  :total="pagination.total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in tableData" :key="item.id" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-bar-chart-box-line"></i>
                    <span>{{ item.plotId }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.batchId') }}:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.plotAreaM2') }}:</span>
                    <span class="value">{{ item.plotAreaM2 }} m²</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.yieldQtPerHa') }}:</span>
                    <span class="value">{{ item.yieldQtPerHa }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.harvestDate') }}:</span>
                    <span class="value">{{ item.harvestDate }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button type="primary" size="small" @click="handleView(item)">
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button size="small" @click="handleEdit(item)">
                    {{ $t('common.edit') }}
                  </el-button>
                  <el-button type="danger" size="small" @click="handleDelete(item)">
                    {{ $t('common.delete') }}
                  </el-button>
                </div>
              </div>

              <!-- 移动端分页 -->
              <div class="pagination-wrapper mobile-pagination">
                <el-pagination
                  v-model:current-page="pagination.currentPage"
                  v-model:page-size="pagination.pageSize"
                  :page-sizes="[10, 20, 50]"
                  :total="pagination.total"
                  layout="total, prev, pager, next"
                  small
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>

            <!-- 空状态 -->
            <el-empty v-if="tableData.length === 0 && !loading" :description="$t('home.noData')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getYieldDataList, deleteYieldData } from '@/api/yieldData'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  batchId: '',
  plotId: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 查询列表
const handleSearch = async () => {
  loading.value = true
  try {
    const res = await getYieldDataList({
      ...searchForm,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || res.data || []
      pagination.total = res.data?.total || res.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 重置
const handleReset = () => {
  searchForm.batchId = ''
  searchForm.plotId = ''
  pagination.currentPage = 1
  handleSearch()
}

// 分页处理
const handleSizeChange = () => {
  pagination.currentPage = 1
  handleSearch()
}

const handleCurrentChange = () => {
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'FieldInspectionAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'FieldInspectionDetail', params: { id: row.id } })
}

// 编辑
const handleEdit = (row) => {
  router.push({ name: 'FieldInspectionEdit', params: { id: row.id } })
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.dataCollection.yieldData.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await deleteYieldData([row.id])
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.yieldData.deleteSuccess'))
      handleSearch()
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<style scoped>
/* 页面容器 */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  margin: 0 auto;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
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

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 卡片 */
.info-card {
  background: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8f5e9;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

/* 表格 */
.table-wrapper {
  margin-top: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
}

/* 移动端卡片列表 */
.mobile-card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.mobile-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.mobile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  flex: 1;
}

.mobile-card-title i {
  font-size: 20px;
  flex-shrink: 0;
}

.mobile-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-card-row {
  display: flex;
  font-size: 14px;
  line-height: 1.6;
}

.mobile-card-row .label {
  color: #666;
  min-width: 100px;
  flex-shrink: 0;
}

.mobile-card-row .value {
  color: #333;
  font-weight: 500;
}

.mobile-card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.mobile-card-actions .el-button {
  flex: 1;
}

/* 响应式 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .content-wrapper {
    border-radius: 12px;
  }

  .card-header {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .card-body {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>
