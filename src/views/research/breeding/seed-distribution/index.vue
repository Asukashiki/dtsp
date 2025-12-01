<template>
  <div class="seed-distribution-container">
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-share-forward-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('research.breeding.seed.distribution.title') }}</h1>
          <p class="page-subtitle">{{ $t('research.breeding.seed.distribution.subtitle') }}</p>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 列表视图 -->
      <div v-if="!showForm && !showDetail" class="list-view">
        <div class="search-bar">
          <div class="search-row">
            <el-input
              v-model="searchQuery"
              :placeholder="$t('research.breeding.seed.distribution.searchPlaceholder')"
              class="search-input"
              clearable
              @clear="loadData"
              @keyup.enter="loadData"
            >
              <template #prefix>
                <i class="ri-search-line"></i>
              </template>
            </el-input>

            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              :start-placeholder="$t('common.startDate')"
              :end-placeholder="$t('common.endDate')"
              class="date-filter"
              clearable
              @change="loadData"
            />
          </div>

          <div class="action-row">
            <div class="action-left">
              <el-button type="primary" @click="loadData">
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
                <span class="btn-text">{{ $t('research.breeding.seed.distribution.add') }}</span>
              </el-button>
            </div>
          </div>
        </div>

        <!-- PC端表格 -->
        <div class="table-card pc-view">
          <el-table :data="filteredList" stripe style="width: 100%" v-loading="loading">
            <el-table-column
              prop="distributeId"
              :label="$t('research.breeding.seed.distribution.columns.distributeId')"
              width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oseName"
              :label="$t('research.breeding.seed.distribution.columns.oseName')"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="time"
              :label="$t('research.breeding.seed.distribution.columns.time')"
              min-width="150"
            />
            <el-table-column
              prop="people"
              :label="$t('research.breeding.seed.distribution.columns.people')"
              width="120"
            />
            <el-table-column
              prop="organ"
              :label="$t('research.breeding.seed.distribution.columns.organ')"
              min-width="150"
            />
            <el-table-column
              prop="totalDistributeQuantity"
              :label="$t('research.breeding.seed.distribution.columns.totalDistributeQuantity')"
              width="150"
              align="right"
            >
              <template #default="{ row }">
                {{ row.totalDistributeQuantity }} kg
              </template>
            </el-table-column>
            <el-table-column
              prop="distributeStatus"
              :label="$t('research.breeding.seed.distribution.columns.distributeStatus')"
              width="120"
              align="center"
            >
              <template #default="{ row }">
                <el-tag type="success" size="small">{{ $t(`research.breeding.seed.distribution.status.${row.distributeStatus}`) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('research.breeding.seed.distribution.columns.actions')"
              width="150"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button link type="primary" @click="handleView(row)">
                  <i class="ri-eye-line"></i>
                </el-button>
                <el-button link type="danger" @click="handleDelete(row)">
                  <i class="ri-delete-bin-line"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>

        <!-- 移动端卡片 -->
        <div class="mobile-view" v-loading="loading">
          <div class="card-list">
            <div
              v-for="item in filteredList"
              :key="item.distributeId"
              class="distribution-card"
              @click="handleView(item)"
            >
              <div class="card-header">
                <el-tag type="success" size="small">{{ item.oseName }}</el-tag>
                <el-tag type="warning" size="small">{{ $t(`research.breeding.seed.distribution.status.${item.distributeStatus}`) }}</el-tag>
              </div>
              <h3 class="card-title">{{ item.organ }}</h3>
              <div class="card-info">
                <div class="info-item">
                  <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.time') }}</span>
                  <span class="info-value">{{ item.time }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.people') }}</span>
                  <span class="info-value">{{ item.people }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.totalDistributeQuantity') }}</span>
                  <span class="info-value">{{ item.totalDistributeQuantity }} kg</span>
                </div>
              </div>
              <div class="card-footer">
                <span class="create-time">{{ item.createTime }}</span>
                <div class="card-actions" @click.stop>
                  <el-button link type="danger" size="small" @click="handleDelete(item)">
                    <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredList.length === 0 && !loading" class="empty-state">
            <i class="ri-inbox-line"></i>
            <p>{{ $t('home.noData') }}</p>
          </div>

          <div class="mobile-pagination">
            <el-pagination
              v-model:current-page="currentPage"
              :total="total"
              :page-size="pageSize"
              layout="prev, pager, next"
              small
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>

      <!-- 新增表单视图 -->
      <DistributionForm
        v-if="showForm"
        @cancel="showForm = false"
        @success="handleFormSuccess"
      />

      <!-- 详情视图 -->
      <DistributionDetail
        v-if="showDetail"
        :data="currentRow"
        @back="showDetail = false"
      />
    </div>

    <div class="mobile-fab" @click="handleAdd" v-if="!showForm && !showDetail">
      <i class="ri-add-line"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedSeedDistributeList } from '@/api/breedSeed'
import DistributionForm from './form.vue'
import DistributionDetail from './detail.vue'

const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 视图控制
const showForm = ref(false)
const showDetail = ref(false)
const currentRow = ref(null)

const filteredList = computed(() => {
  let list = dataList.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item => item.oseName?.toLowerCase().includes(query))
  }
  return list
})

const loadData = async () => {
  loading.value = true
  try {
    const params = { pageNum: currentPage.value, pageSize: pageSize.value }
    const res = await getBreedSeedDistributeList(params)
    if (res.code === 200) {
      dataList.value = res.rows || []
      total.value = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  searchQuery.value = ''
  dateRange.value = []
  currentPage.value = 1
  loadData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  loadData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

const handleAdd = () => {
  showForm.value = true
  showDetail.value = false
}

const handleView = (row) => {
  currentRow.value = row
  showDetail.value = true
  showForm.value = false
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.breeding.seed.distribution.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  )
    .then(() => {
      ElMessage.success(t('research.breeding.seed.distribution.deleteSuccess'))
      loadData()
    })
    .catch(() => {})
}

const handleFormSuccess = () => {
  showForm.value = false
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.seed-distribution-container {
  min-height: calc(100vh - 120px);
  position: relative;
}

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

.search-input {
  flex: 1;
  min-width: 0;
}

.date-filter {
  width: 300px;
  flex-shrink: 0;
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

.mobile-view,
.mobile-fab {
  display: none;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.distribution-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.distribution-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.card-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.create-time {
  font-size: 12px;
  color: #909399;
}

.card-actions {
  display: flex;
  gap: 8px;
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
  .date-filter {
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
  .distribution-card {
    padding: 12px;
  }
  .card-title {
    font-size: 15px;
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
