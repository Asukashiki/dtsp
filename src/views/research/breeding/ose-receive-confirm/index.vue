<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-checkbox-circle-line"
        :title="$t('research.menu.oseReceiveConfirm')"
        :subtitle="$t('research.menu.oseReceiveConfirmSubtitle')" />

      <!-- 统计卡片区域 -->
      <div class="stats-grid" v-if="false">
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
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem>
              <el-input
                v-model="searchQuery"
                :placeholder="$t('research.breeding.seed.receiveConfirm.searchPlaceholder')"
                clearable
                @keyup.enter="handleSearch"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>
            <SearchItem>
              <el-select
                v-model="filterStatus"
                :placeholder="$t('research.breeding.seed.receiveConfirm.filterByStatus')"
                clearable
                @change="handleSearch"
              >
                <el-option :label="$t('research.breeding.seed.receiveConfirm.allStatus')" value="" />
                <el-option :label="$t('research.breeding.seed.receiveConfirm.status.PENDING')" value="PENDING" />
                <el-option :label="$t('research.breeding.seed.receiveConfirm.status.CONFIRMED')" value="CONFIRMED" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.breeding.seed.receiveConfirm.list')" icon="ri-file-list-3-line">

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
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOseReceiveConfirmList } from '@/api/breedSeed'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

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
  router.push({
    name: 'OseReceiveConfirmConfirm',
    params: { id: row.receiveConfirmId }
  })
}

const handleView = (row) => {
  router.push({
    name: 'OseReceiveConfirmDetail',
    params: { id: row.receiveConfirmId }
  })
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

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/table-enhanced.scss';

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

@media screen and (max-width: 768px) {
  .pc-only { display: none; }
}

@media screen and (min-width: 769px) {
  .mobile-only { display: none; }
}
</style>
