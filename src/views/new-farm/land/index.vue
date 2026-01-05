<template>
  <div class="land-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-landscape-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('newFarm.land.title') }}</h1>
          <p class="page-subtitle">{{ $t('newFarm.land.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-row" v-if="statistics">
      <div class="stat-item">
        <div class="stat-icon-wrapper">
          <i class="ri-landscape-line"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ statistics.totalCount || 0 }}</span>
          <span class="stat-label">{{ $t('newFarm.land.stats.totalCount') }}</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon-wrapper area">
          <i class="ri-ruler-line"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ formatArea(statistics.totalArea) }}</span>
          <span class="stat-label">{{ $t('newFarm.land.stats.totalArea') }}</span>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchFilters.keyword"
            :placeholder="$t('newFarm.land.searchPlaceholder')"
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
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('common.add') }}</span>
            </el-button>
            <el-button type="primary" plain @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
            <el-button
              v-if="selectedIds.length > 0"
              type="danger"
              plain
              @click="handleBatchDelete"
            >
              <i class="ri-delete-bin-line"></i>
              <span class="btn-text">{{ $t('newFarm.land.actions.batchDelete') }} ({{ selectedIds.length }})</span>
            </el-button>
          </div>
        </div>

        <!-- 筛选条件 -->
        <div class="filter-row">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.land.form.currentStatus') }}</label>
                <el-radio-group v-model="searchFilters.currentStatus" @change="handleSearch">
                  <el-radio-button label="">{{ $t('newFarm.common.all') }}</el-radio-button>
                  <el-radio-button label="CULTIVATING">{{ $t('newFarm.land.status.CULTIVATING') }}</el-radio-button>
                  <el-radio-button label="IDLE">{{ $t('newFarm.land.status.IDLE') }}</el-radio-button>
                  <el-radio-button label="FALLOW">{{ $t('newFarm.land.status.FALLOW') }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.land.form.landType') }}</label>
                <el-select
                  v-model="searchFilters.landType"
                  :placeholder="$t('newFarm.land.placeholder.landType')"
                  clearable
                  style="width: 100%"
                  @change="handleSearch"
                >
                  <el-option value="PADDY" :label="$t('newFarm.land.landType.PADDY')" />
                  <el-option value="DRY" :label="$t('newFarm.land.landType.DRY')" />
                  <el-option value="ORCHARD" :label="$t('newFarm.land.landType.ORCHARD')" />
                  <el-option value="FOREST" :label="$t('newFarm.land.landType.FOREST')" />
                  <el-option value="OTHER" :label="$t('newFarm.land.landType.OTHER')" />
                </el-select>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.land.form.farmerName') }}</label>
                <el-input
                  v-model="searchFilters.farmerName"
                  :placeholder="$t('newFarm.farmer.placeholder.farmerName')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.farmer.form.phone') }}</label>
                <el-input
                  v-model="searchFilters.phone"
                  :placeholder="$t('newFarm.farmer.placeholder.phone')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.common.kebeleCode') }}</label>
                <el-input
                  v-model="searchFilters.kebeleCode"
                  :placeholder="$t('newFarm.common.selectKebele')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>
          </el-row>
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
          <el-table-column type="selection" width="50" />
          <el-table-column prop="landId" :label="$t('newFarm.land.columns.landId')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="landName" :label="$t('newFarm.land.columns.landName')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="landType" :label="$t('newFarm.land.columns.landType')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.landType" size="small">
                {{ $t(`newFarm.land.landType.${row.landType}`) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="areaSize" :label="$t('newFarm.land.columns.areaSize')" min-width="120" align="right">
            <template #default="{ row }">
              {{ formatArea(row.areaSize) }}
            </template>
          </el-table-column>
          <el-table-column prop="farmerName" :label="$t('newFarm.land.columns.farmerName')" min-width="150" show-overflow-tooltip>
            <template #default="{ row }">
              <span v-if="row.farmerName">{{ row.farmerName }}</span>
              <el-tag v-else type="info" size="small">{{ $t('newFarm.land.unbound') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="currentStatus" :label="$t('newFarm.land.columns.currentStatus')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getLandStatusType(row.currentStatus)" size="small">
                {{ $t(`newFarm.land.status.${row.currentStatus}`) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('newFarm.common.actions')" min-width="280" align="center" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
                {{ $t('common.view') }}
              </el-button>
              <el-button link type="primary" @click="handleEdit(row)">
                <i class="ri-edit-line"></i>
                {{ $t('common.edit') }}
              </el-button>
              <el-button v-if="!row.farmerId" link type="success" @click="handleBindFarmer(row)">
                <i class="ri-link"></i>
                {{ $t('newFarm.land.actions.bindFarmer') }}
              </el-button>
              <el-button v-else link type="warning" @click="handleUnbindFarmer(row)">
                <i class="ri-link-unlink"></i>
                {{ $t('newFarm.land.actions.unbindFarmer') }}
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
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view">
        <div class="mobile-add-btn">
          <el-button type="primary" @click="handleAdd" style="width: 100%">
            <i class="ri-add-line"></i>
            {{ $t('common.add') }}
          </el-button>
        </div>

        <div v-loading="loading" class="card-list">
          <div v-if="tableData.length === 0" class="empty-state">
            <i class="ri-inbox-line empty-icon"></i>
            <p class="empty-text">{{ $t('newFarm.common.noData') }}</p>
          </div>

          <div v-for="item in tableData" :key="item.landId" class="land-card">
            <div class="card-header">
              <div class="land-name">
                <i class="ri-landscape-line"></i>
                {{ item.landName }}
              </div>
              <el-tag :type="getLandStatusType(item.currentStatus)" size="small">
                {{ $t(`newFarm.land.status.${item.currentStatus}`) }}
              </el-tag>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">{{ $t('newFarm.land.columns.landId') }}:</span>
                <span class="value">{{ item.landId }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.land.columns.landType') }}:</span>
                <span class="value">
                  <el-tag v-if="item.landType" size="small">
                    {{ $t(`newFarm.land.landType.${item.landType}`) }}
                  </el-tag>
                </span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.land.columns.areaSize') }}:</span>
                <span class="value area">{{ formatArea(item.areaSize) }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.land.columns.farmerName') }}:</span>
                <span class="value">{{ item.farmerName || $t('newFarm.land.unbound') }}</span>
              </div>
            </div>

            <div class="card-footer">
              <el-button size="small" @click="handleView(item)">
                <i class="ri-eye-line"></i>
                {{ $t('common.view') }}
              </el-button>
              <el-button size="small" type="primary" @click="handleEdit(item)">
                <i class="ri-edit-line"></i>
                {{ $t('common.edit') }}
              </el-button>
              <el-button size="small" type="danger" plain @click="handleDelete(item)">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.delete') }}
              </el-button>
            </div>
          </div>
        </div>

        <!-- 移动端分页 -->
        <div class="mobile-pagination">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- 关联农民对话框 -->
    <el-dialog
      v-model="bindFarmerVisible"
      :title="$t('newFarm.land.actions.bindFarmer')"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form ref="bindFormRef" :model="bindForm" :rules="bindRules" label-position="top">
        <el-form-item :label="$t('newFarm.land.form.farmerId')" prop="farmerId">
          <el-select
            v-model="bindForm.farmerId"
            :placeholder="$t('newFarm.land.placeholder.farmerId')"
            filterable
            remote
            :remote-method="handleFarmerSearch"
            :loading="farmerSearchLoading"
            style="width: 100%"
          >
            <el-option
              v-for="item in farmerOptions"
              :key="item.farmerId"
              :label="`${item.farmerName} (${item.farmerId})`"
              :value="item.farmerId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="bindFarmerVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="bindLoading" @click="confirmBindFarmer">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getLandList,
  deleteLand,
  batchDeleteLand,
  bindFarmerToLand,
  unbindFarmerFromLand,
  getLandStatistics,
  getFarmerOptions
} from '@/api/newFarm'

const router = useRouter()
const { t } = useI18n()

// 搜索筛选条件
const searchFilters = reactive({
  keyword: '',
  landName: '',
  farmerId: '',
  farmerName: '',
  phone: '',
  kebeleCode: '',
  landType: '',
  currentStatus: '',
  daId: ''
})

// 分页
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 表格数据
const tableData = ref([])
const loading = ref(false)
const selectedIds = ref([])
const statistics = ref(null)

// 关联农民相关
const bindFarmerVisible = ref(false)
const bindLoading = ref(false)
const currentLandId = ref('')
const bindFormRef = ref(null)
const bindForm = reactive({ farmerId: '' })
const bindRules = {
  farmerId: [{ required: true, message: '', trigger: 'change' }]
}
const farmerOptions = ref([])
const farmerSearchLoading = ref(false)

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      kebeleCode: searchFilters.kebeleCode,
      landType: searchFilters.landType,
      currentStatus: searchFilters.currentStatus,
      daId: searchFilters.daId
    }

    // 核心逻辑：
    // 当顶部搜索框(keyword)有值时，传入 searchValue，触发后端的"多字段模糊匹配" (Name/ID/Phone)
    // 此时忽略 landName/landId 等单个字段的严格筛选
    if (searchFilters.keyword) {
      params.searchValue = searchFilters.keyword
    } else {
      // 当顶部搜索框为空时，使用具体的字段筛选
      if (searchFilters.landName) params.landName = searchFilters.landName
      if (searchFilters.farmerName) params.farmerName = searchFilters.farmerName
      if (searchFilters.phone) params.farmerPhone = searchFilters.phone
    }

    const res = await getLandList(params)
    if (res.code === 200 && res.data) {
      tableData.value = res.data.records || res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 获取统计数据
const fetchStatistics = async () => {
  try {
    const res = await getLandStatistics({})
    if (res.code === 200) {
      statistics.value = res.data
    }
  } catch (error) {
    console.error('Failed to fetch statistics:', error)
  }
}

// 搜索
const handleSearch = () => {
  pagination.pageNum = 1
  fetchData()
}

// 重置
const handleReset = () => {
  searchFilters.keyword = ''
  searchFilters.landName = ''
  searchFilters.farmerId = ''
  searchFilters.farmerName = ''
  searchFilters.phone = ''
  searchFilters.kebeleCode = ''
  searchFilters.landType = ''
  searchFilters.currentStatus = ''
  searchFilters.daId = ''
  handleSearch()
}

// 分页变化
const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.pageNum = 1
  fetchData()
}

const handleCurrentChange = (val) => {
  pagination.pageNum = val
  fetchData()
}

// 选择变化
const handleSelectionChange = (rows) => {
  selectedIds.value = rows.map(row => row.landId)
}

// 新增
const handleAdd = () => {
  router.push('/input/land/add')
}

// 查看详情
const handleView = (row) => {
  router.push(`/input/land/detail/${row.landId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/input/land/edit/${row.landId}`)
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('newFarm.land.confirmDelete'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteLand(row.landId)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.common.deleteSuccess'))
      fetchData()
      fetchStatistics()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 批量删除
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) return

  try {
    await ElMessageBox.confirm(
      t('newFarm.land.confirmBatchDelete', { count: selectedIds.value.length }),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await batchDeleteLand(selectedIds.value)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.common.deleteSuccess'))
      selectedIds.value = []
      fetchData()
      fetchStatistics()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to batch delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 关联农民
const handleBindFarmer = (row) => {
  currentLandId.value = row.landId
  bindForm.farmerId = ''
  bindFarmerVisible.value = true
  handleFarmerSearch('')
}

const handleFarmerSearch = async (keyword) => {
  farmerSearchLoading.value = true
  try {
    const res = await getFarmerOptions('', keyword)
    if (res.code === 200) {
      farmerOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to search farmers:', error)
  } finally {
    farmerSearchLoading.value = false
  }
}

const confirmBindFarmer = async () => {
  if (!bindFormRef.value) return

  await bindFormRef.value.validate(async (valid) => {
    if (valid) {
      bindLoading.value = true
      try {
        const res = await bindFarmerToLand(currentLandId.value, bindForm.farmerId)
        if (res.code === 200) {
          ElMessage.success(t('newFarm.land.messages.bindSuccess'))
          bindFarmerVisible.value = false
          fetchData()
        } else {
          ElMessage.error(res.msg || t('common.failed'))
        }
      } catch (error) {
        console.error('Failed to bind farmer:', error)
        ElMessage.error(t('common.failed'))
      } finally {
        bindLoading.value = false
      }
    }
  })
}

// 解除关联
const handleUnbindFarmer = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('newFarm.land.confirmUnbind'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await unbindFarmerFromLand(row.landId)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.land.messages.unbindSuccess'))
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to unbind farmer:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 格式化面积
const formatArea = (area) => {
  if (!area) return '0 ha'
  return `${parseFloat(area).toFixed(2)} ha`
}

// 获取土地状态类型
const getLandStatusType = (status) => {
  const typeMap = {
    CULTIVATING: 'success',
    IDLE: 'info',
    FALLOW: 'warning'
  }
  return typeMap[status] || 'info'
}

// 初始化
onMounted(() => {
  fetchData()
  fetchStatistics()
})
</script>

<style scoped>
.land-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding-bottom: 2rem;
}

.page-header { background: linear-gradient(135deg, #009A44 0%, #00b350 100%); padding: 24px 0; margin: -24px 0 24px 0; border-radius: 0 0 16px 16px; }
.header-content { max-width: 100%; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 20px; }
.header-icon-wrapper { width: 64px; height: 64px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); flex-shrink: 0; }
.header-icon { font-size: 32px; color: white; }
.header-text { flex: 1; color: white; min-width: 0; }
.page-title { font-size: 24px; font-weight: 600; margin: 0 0 4px 0; }
.page-subtitle { font-size: 14px; opacity: 0.9; margin: 0; }

/* 统计卡片 */
.stats-row { display: flex; gap: 16px; margin: 0 1rem 1.5rem; flex-wrap: wrap; }
.stat-item { flex: 1; min-width: 200px; background: white; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
.stat-icon-wrapper { width: 56px; height: 56px; background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.stat-icon-wrapper i { font-size: 28px; color: #009A44; }
.stat-icon-wrapper.area { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); }
.stat-icon-wrapper.area i { color: #f57c00; }
.stat-info { display: flex; flex-direction: column; }
.stat-value { font-size: 24px; font-weight: 700; color: #303133; }
.stat-label { font-size: 14px; color: #909399; }

.content-wrapper { margin: 0 auto; padding: 0 1rem; }

.search-bar { background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
.search-row { margin-bottom: 1rem; }
.search-input { width: 100%; }
.action-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.action-left { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.filter-row { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e8f5e9; }
.filter-item { margin-bottom: 1rem; }
.filter-label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #606266; font-size: 0.875rem; }

.table-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
.pagination-wrapper { margin-top: 1.5rem; display: flex; justify-content: center; }

.mobile-view { display: none; }
.mobile-add-btn { margin-bottom: 1rem; }
.card-list { display: flex; flex-direction: column; gap: 1rem; }

.land-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); transition: all 0.3s ease; }
.land-card:hover { box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15); transform: translateY(-2px); }

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e8f5e9; }
.land-name { font-size: 1.125rem; font-weight: 600; color: #009A44; display: flex; align-items: center; gap: 0.5rem; }

.card-body { margin-bottom: 1rem; }
.info-row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #f5f7fa; }
.info-row:last-child { border-bottom: none; }
.info-row .label { font-weight: 500; color: #606266; font-size: 0.875rem; }
.info-row .value { color: #303133; text-align: right; }
.info-row .area { color: #009A44; font-weight: 600; }

.card-footer { display: flex; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid #f5f7fa; }
.card-footer .el-button { flex: 1; }

.mobile-pagination { margin-top: 1.5rem; display: flex; justify-content: center; }

.empty-state { text-align: center; padding: 3rem 1rem; }
.empty-icon { font-size: 4rem; color: #dcdfe6; margin-bottom: 1rem; }
.empty-text { color: #909399; font-size: 0.875rem; }

@media screen and (max-width: 1024px) {
  .page-title { font-size: 1.5rem; }
  .header-icon-wrapper { width: 60px; height: 60px; }
  .header-icon { font-size: 30px; }
}

@media screen and (max-width: 768px) {
  .pc-view { display: none !important; }
  .mobile-view { display: block; }
  .stats-row { flex-direction: column; margin: 0 1rem 1rem; }
  .stat-item { min-width: 100%; }
  .page-header { padding: 1.5rem 1rem; }
  .header-content { gap: 1rem; }
  .header-icon-wrapper { width: 50px; height: 50px; }
  .header-icon { font-size: 24px; }
  .page-title { font-size: 1.25rem; }
  .page-subtitle { font-size: 0.875rem; }
  .search-bar { padding: 1rem; }
  .action-left { width: 100%; }
  .action-left .el-button { flex: 1; }
  .btn-text { display: none; }
  .filter-row :deep(.el-radio-group) { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .filter-row :deep(.el-radio-button) { flex: 0 0 auto; }
}
</style>
