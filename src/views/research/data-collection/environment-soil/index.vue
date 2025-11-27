<template>
  <div class="environment-soil-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-global-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('research.dataCollection.environmentSoil.title') }}</h1>
          <p class="page-subtitle">{{ $t('research.dataCollection.environmentSoil.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-select
            v-model="selectedTopography"
            :placeholder="$t('research.dataCollection.environmentSoil.filterByTopography')"
            class="topography-filter"
            @change="handleSearch"
          >
            <el-option :label="$t('research.dataCollection.environmentSoil.allTopography')" value="" />
            <el-option :label="$t('research.dataCollection.environmentSoil.topography.plain')" value="plain" />
            <el-option :label="$t('research.dataCollection.environmentSoil.topography.hill')" value="hill" />
            <el-option :label="$t('research.dataCollection.environmentSoil.topography.mountain')" value="mountain" />
            <el-option :label="$t('research.dataCollection.environmentSoil.topography.valley')" value="valley" />
          </el-select>

          <el-input
            v-model="searchWaterSource"
            :placeholder="$t('research.dataCollection.environmentSoil.searchWaterSource')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>
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
              <span class="btn-text">{{ $t('research.dataCollection.environmentSoil.add') }}</span>
            </el-button>
          </div>
        </div>
      </div>

      <!-- PC端:数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            prop="topography"
            :label="$t('research.dataCollection.environmentSoil.columns.topography')"
            min-width="180"
            align="center"
          >
            <template #default="{ row }">
              <el-tag size="small">
                {{ $t(`research.dataCollection.environmentSoil.topography.${row.topography}`) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="waterSource"
            :label="$t('research.dataCollection.environmentSoil.columns.waterSource')"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="soilPh"
            :label="$t('research.dataCollection.environmentSoil.columns.soilPh')"
            min-width="180"
            align="right"
          />
          <el-table-column
            prop="soilTemperatureC"
            :label="$t('research.dataCollection.environmentSoil.form.soilTemperatureC')"
            min-width="180"
            align="right"
          >
            <template #default="{ row }">
              {{ row.soilTemperatureC }}°C
            </template>
          </el-table-column>
          <el-table-column
            prop="airTemperatureC"
            :label="$t('research.dataCollection.environmentSoil.columns.airTemperatureC')"
            min-width="180"
            align="right"
          >
            <template #default="{ row }">
              {{ row.airTemperatureC }}°C
            </template>
          </el-table-column>
          <el-table-column
            prop="timestamp"
            :label="$t('research.dataCollection.environmentSoil.columns.timestamp')"
            min-width="160"
          />
          <el-table-column
            :label="$t('common.actions')"
            width="220"
            fixed="right"
          >
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
              </el-button>
              <el-button link type="primary" @click="handleEdit(row)">
                <i class="ri-edit-line"></i>
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">
                <i class="ri-delete-bin-line"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
        </div>
      </div>

      <!-- 移动端:卡片列表 -->
      <div class="mobile-view" v-loading="loading">
        <div class="card-list">
          <div
            v-for="item in tableData"
            :key="item.dataId"
            class="env-card"
            @click="handleView(item)"
          >
            <div class="card-header">
              <el-tag size="small">
                {{ $t(`research.dataCollection.environmentSoil.topography.${item.topography}`) }}
              </el-tag>
              <span class="timestamp">{{ item.timestamp }}</span>
            </div>
            <div class="card-info">
              <div class="info-row">
                <div class="info-item">
                  <span class="info-label">{{ $t('research.dataCollection.environmentSoil.form.waterSource') }}</span>
                  <span class="info-value">{{ item.waterSource }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">{{ $t('research.dataCollection.environmentSoil.form.soilPh') }}</span>
                  <span class="info-value">{{ item.soilPh }}</span>
                </div>
              </div>
              <div class="info-row">
                <div class="info-item">
                  <span class="info-label">{{ $t('research.dataCollection.environmentSoil.form.soilTemperatureC') }}</span>
                  <span class="info-value">{{ item.soilTemperatureC }}°C</span>
                </div>
                <div class="info-item">
                  <span class="info-label">{{ $t('research.dataCollection.environmentSoil.form.airTemperatureC') }}</span>
                  <span class="info-value">{{ item.airTemperatureC }}°C</span>
                </div>
              </div>
              <div class="info-row">
                <div class="info-item">
                  <span class="info-label">{{ $t('research.dataCollection.environmentSoil.form.humidityPercent') }}</span>
                  <span class="info-value">{{ item.humidityPercent }}%</span>
                </div>
                <div class="info-item">
                  <span class="info-label">{{ $t('research.dataCollection.environmentSoil.form.windSpeedMs') }}</span>
                  <span class="info-value">{{ item.windSpeedMs }} m/s</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
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
            v-model:current-page="pagination.page"
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
import { getEnvironmentSoilList, deleteEnvironmentSoil } from '@/api/breeding'

const router = useRouter()
const { t } = useI18n()

const selectedTopography = ref('')
const searchWaterSource = ref('')
const loading = ref(false)
const tableData = ref([])
const selectedRows = ref([])

const pagination = reactive({ page: 1, pageSize: 10, total: 0 })

const loadData = async () => {
  loading.value = true
  try {
    const params = {
      topography: selectedTopography.value,
      waterSource: searchWaterSource.value,
      pageNum: pagination.page,
      pageSize: pagination.pageSize
    }
    const res = await getEnvironmentSoilList(params)
    if (res.code === 200) {
      tableData.value = res.data || []
      pagination.total = res.total || 0
    }
  } catch (error) {
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadData()
}

const handleReset = () => {
  selectedTopography.value = ''
  searchWaterSource.value = ''
  pagination.page = 1
  loadData()
}

const handleAdd = () => {
  router.push('/research/data-collection/environment-soil/add')
}

const handleView = (row) => {
  router.push(`/research/data-collection/environment-soil/detail/${row.dataId}`)
}

const handleEdit = (row) => {
  router.push(`/research/data-collection/environment-soil/edit/${row.dataId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.dataCollection.environmentSoil.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    const res = await deleteEnvironmentSoil([row.dataId])
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.environmentSoil.deleteSuccess'))
      loadData()
    }
  }).catch(() => {})
}

const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

const handleSizeChange = () => {
  pagination.page = 1
  loadData()
}

const handlePageChange = () => {
  loadData()
}

onMounted(() => loadData())
</script>

<style scoped>
.environment-soil-container {
  min-height: calc(100vh - 120px);
  position: relative;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 24px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.header-icon {
  font-size: 32px;
  color: white;
}

.header-text {
  flex: 1;
  color: white;
  min-width: 0;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

/* 搜索栏 */
.search-bar {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.topography-filter {
  width: 180px;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  min-width: 0;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.action-left,
.action-right {
  display: flex;
  gap: 8px;
}

/* PC端表格 */
.table-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 移动端默认隐藏 */
.mobile-view,
.mobile-fab {
  display: none;
}

/* 移动端卡片样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.env-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.env-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.timestamp {
  font-size: 12px;
  color: #909399;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  color: #909399;
}

.info-value {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.card-footer {
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.card-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 12px;
  display: block;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
    padding: 20px 0;
  }

  .header-content {
    padding: 0 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
    padding: 16px 0;
  }

  .header-content {
    padding: 0 12px;
    gap: 12px;
  }

  .header-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 10px;
  }

  .header-icon {
    font-size: 24px;
  }

  .page-title {
    font-size: 18px;
  }

  .page-subtitle {
    display: none;
  }

  .search-row {
    flex-direction: column;
  }

  .topography-filter {
    width: 100%;
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
  }

  .action-left,
  .action-right {
    justify-content: stretch;
  }

  .action-left .el-button,
  .action-right .el-button {
    flex: 1;
  }

  .action-right {
    display: none;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .mobile-fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    cursor: pointer;
    z-index: 50;
    transition: all 0.3s ease;
  }

  .mobile-fab:active {
    transform: scale(0.9);
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
    padding: 12px 0;
  }

  .header-content {
    padding: 0 8px;
  }

  .header-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .header-icon {
    font-size: 20px;
  }

  .page-title {
    font-size: 16px;
  }

  .search-bar {
    padding: 12px;
  }

  .env-card {
    padding: 12px;
  }

  .mobile-fab {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
}
</style>
