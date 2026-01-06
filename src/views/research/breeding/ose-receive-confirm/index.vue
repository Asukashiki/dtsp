<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-checkbox-circle-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breeding.seed.receiveConfirm.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breeding.seed.receiveConfirm.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 统计卡片区域 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #009A44 0%, #00b350 100%);">
            <i class="ri-inbox-archive-line"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ $t('research.breeding.seed.receiveConfirm.stats.totalRecords') }}</div>
            <div class="stat-value">{{ total }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #FEDD00 0%, #FFE74C 100%);">
            <i class="ri-time-line"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ $t('research.breeding.seed.receiveConfirm.stats.pendingCount') }}</div>
            <div class="stat-value">{{ pendingCount }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);">
            <i class="ri-checkbox-circle-line"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ $t('research.breeding.seed.receiveConfirm.stats.confirmedCount') }}</div>
            <div class="stat-value">{{ confirmedCount }}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #4A90E2 0%, #6BB6FF 100%);">
            <i class="ri-archive-line"></i>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ $t('research.breeding.seed.receiveConfirm.stats.totalQuantity') }} (kg)</div>
            <div class="stat-value">{{ totalReceiveQuantity }}</div>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breeding.seed.receiveConfirm.list') }}</span>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <el-input
                v-model="searchQuery"
                :placeholder="$t('research.breeding.seed.receiveConfirm.searchPlaceholder')"
                clearable
                class="search-input"
                @keyup.enter="handleSearch"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
              <el-select
                v-model="filterStatus"
                :placeholder="$t('research.breeding.seed.receiveConfirm.filterByStatus')"
                clearable
                class="filter-select"
                @change="handleSearch"
              >
                <el-option :label="$t('research.breeding.seed.receiveConfirm.allStatus')" value="" />
                <el-option :label="$t('research.breeding.seed.receiveConfirm.status.PENDING')" value="PENDING" />
                <el-option :label="$t('research.breeding.seed.receiveConfirm.status.CONFIRMED')" value="CONFIRMED" />
              </el-select>
              <el-button type="primary" @click="handleSearch">
                <i class="ri-search-line"></i>
                {{ $t('common.search') }}
              </el-button>
              <el-button @click="handleReset">
                <i class="ri-restart-line"></i>
                {{ $t('common.reset') }}
              </el-button>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="filteredList" stripe style="width: 100%" v-loading="loading">
                <el-table-column :label="$t('research.breeding.seed.receiveConfirm.columns.distributeId')" width="200">
                  <template #default="{ row }">
                    {{ row.distributeId }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.breeding.seed.receiveConfirm.columns.seedId')" width="200">
                  <template #default="{ row }">
                    <div v-for="(item, index) in row.distributeDetail?.detailList" :key="index">
                      {{ item.breedSeedProduceBatchId }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.breeding.seed.receiveConfirm.columns.breedSeedProduceBatchId')" width="200">
                  <template #default="{ row }">
                    <div v-for="(item, index) in row.distributeDetail?.detailList" :key="index">
                      {{ item.produceBatchName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="oseName" :label="$t('research.breeding.seed.receiveConfirm.columns.oseName')" min-width="150" />
                <el-table-column :label="$t('research.breeding.seed.receiveConfirm.columns.seedType')" width="150">
                  <template #default="{ row }">
                    <div v-for="(item, index) in row.distributeDetail?.detailList" :key="index">
                      {{ item.seedType }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.breeding.seed.receiveConfirm.columns.varietyName')" width="150">
                  <template #default="{ row }">
                    <div v-for="(item, index) in row.distributeDetail?.detailList" :key="index">
                      {{ item.varietyName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.breeding.seed.receiveConfirm.columns.totalDistributeQuantity')" width="280">
                  <template #default="{ row }">
                    {{ row.distributeDetail?.totalDistributeQuantity || 0 }} kg
                  </template>
                </el-table-column>
                <el-table-column prop="confirmTime" :label="$t('research.breeding.seed.receiveConfirm.columns.confirmTime')" width="180" />
                <el-table-column prop="confirmPeople" :label="$t('research.breeding.seed.receiveConfirm.columns.confirmPeople')" width="240" />
                <el-table-column prop="receiveStatus" :label="$t('research.breeding.seed.receiveConfirm.columns.receiveStatus')" width="200">
                  <template #default="{ row }">
                    <el-tag :type="row.receiveStatus === 'CONFIRMED' ? 'success' : 'warning'">
                      {{ $t(`research.breeding.seed.receiveConfirm.status.${row.receiveStatus}`) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" :label="$t('research.breeding.seed.receiveConfirm.columns.createTime')" width="240" />
                <el-table-column :label="$t('research.breeding.seed.receiveConfirm.columns.actions')" width="150" fixed="right">
                  <template #default="{ row }">
                    <el-button
                      v-if="row.receiveStatus === 'PENDING'"
                      link
                      type="primary"
                      @click="handleConfirm(row)"
                    >
                      <i class="ri-checkbox-line"></i>
                      {{ $t('research.breeding.seed.receiveConfirm.confirm') }}
                    </el-button>
                    <el-button
                      link
                      type="primary"
                      @click="handleView(row)"
                    >
                      <i class="ri-eye-line"></i>
                      {{ $t('common.view') }}
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
            <div class="mobile-cards mobile-only">
              <div v-for="item in filteredList" :key="item.receiveConfirmId" class="mobile-card">
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.distributeId') }}:</span>
                  <span class="value">{{ item.distributeDetail?.distributeId }}</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.oseName') }}:</span>
                  <span class="value">{{ item.oseName }}</span>
                </div>
                <div class="card-row" v-for="(detailItem, index) in item.distributeDetail?.detailList" :key="index">
                  <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.breedSeedProduceBatchId') }}:</span>
                  <span class="value">{{ detailItem.breedSeedProduceBatchId }}</span>
                </div>
                <div class="card-row" v-for="(detailItem, index) in item.distributeDetail?.detailList" :key="index">
                  <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.seedType') }}:</span>
                  <span class="value">{{ detailItem.seedType }}</span>
                </div>
                <div class="card-row" v-for="(detailItem, index) in item.distributeDetail?.detailList" :key="index">
                  <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.varietyName') }}:</span>
                  <span class="value">{{ detailItem.varietyName }}</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.totalDistributeQuantity') }}:</span>
                  <span class="value">{{ item.distributeDetail?.totalDistributeQuantity || 0 }} kg</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.receiveStatus') }}:</span>
                  <el-tag :type="item.receiveStatus === 'CONFIRMED' ? 'success' : 'warning'" size="small">
                    {{ $t(`research.breeding.seed.receiveConfirm.status.${item.receiveStatus}`) }}
                  </el-tag>
                </div>
                <div class="card-actions">
                  <el-button
                    v-if="item.receiveStatus === 'PENDING'"
                    link
                    type="primary"
                    @click="handleConfirm(item)"
                  >
                    {{ $t('research.breeding.seed.receiveConfirm.confirm') }}
                  </el-button>
                  <el-button
                    link
                    type="primary"
                    @click="handleView(item)"
                  >
                    {{ $t('common.view') }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 确认对话框 -->
      <ConfirmDialog
        v-model="showConfirmDialog"
        :confirm-data="currentConfirmData"
        @success="handleConfirmSuccess"
      />

      <!-- 详情对话框 -->
      <ReceiveDetail
        v-model="showDetail"
        :data="currentDetailData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOseReceiveConfirmList } from '@/api/breedSeed'
import ConfirmDialog from './confirm-dialog.vue'
import ReceiveDetail from './detail.vue'

const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 对话框和详情控制
const showConfirmDialog = ref(false)
const currentConfirmData = ref({})
const showDetail = ref(false)
const currentDetailData = ref({})

const filteredList = computed(() => {
  let list = dataList.value

  if (filterStatus.value) {
    list = list.filter(item => item.receiveStatus === filterStatus.value)
  }

  return list
})

// 统计数据
const pendingCount = computed(() => {
  return dataList.value.filter(item => item.receiveStatus === 'PENDING').length
})

const confirmedCount = computed(() => {
  return dataList.value.filter(item => item.receiveStatus === 'CONFIRMED').length
})

const totalReceiveQuantity = computed(() => {
  return dataList.value.reduce((sum, item) => sum + (Number(item.distributeDetail?.totalDistributeQuantity) || 0), 0).toFixed(2)
})

const loadData = async () => {
  loading.value = true
  // 1. 从缓存获取 userInfo 字符串（根据实际存储位置选 localStorage/sessionStorage）
  const userInfoStr = localStorage.getItem('userInfo')
  // 若存储在 sessionStorage，替换为：
  // const userInfoStr = sessionStorage.getItem('userInfo')

  // 2. 解析 JSON（若缓存不存在，给默认空对象避免报错）
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {}

  // 3. 按层级提取 ORGAN_CODE（用可选链 ?. 防止属性缺失报错）
  const targetCode = userInfo?.user?.ORGAN_CODE || ''

  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      receiveStatus: filterStatus.value || undefined,
      searchKeyword: searchQuery.value || undefined
    }
    const res = await getOseReceiveConfirmList(params)
    if (res.code === 200) {
      dataList.value = res.rows || []
      total.value = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load receive confirm list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
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

const handleConfirm = (row) => {
  currentConfirmData.value = row
  showConfirmDialog.value = true
}

const handleView = (row) => {
  currentDetailData.value = row
  showDetail.value = true
}

const handleSearch = () => {
  currentPage.value = 1
  loadData()
}

const handleReset = () => {
  searchQuery.value = ''
  filterStatus.value = ''
  currentPage.value = 1
  loadData()
}

const handleConfirmSuccess = () => {
  showConfirmDialog.value = false
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>


/* 统计卡片区域 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.15);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #009A44;
}

.content-wrapper {
  margin-top: 24px;
}

.info-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
}

.card-body {
  padding: 24px;
}

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

.filter-select {
  width: 200px;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.mobile-cards {
  display: grid;
  gap: 16px;
}

.mobile-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e9ecef;
}

.card-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.card-row:last-child {
  border-bottom: none;
}

.card-actions {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  .pc-only { display: none; }
  .page-header { padding: 20px; }
  .header-icon { width: 60px; height: 60px; font-size: 30px; }
  .page-title { font-size: 20px; }
  .search-section { flex-direction: column; }
  .search-input, .filter-select { width: 100%; }
}

@media screen and (min-width: 769px) {
  .mobile-only { display: none; }
}
</style>
