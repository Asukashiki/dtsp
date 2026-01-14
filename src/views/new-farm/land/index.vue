<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-landscape-line"
        :title="$t('newFarm.land.title')"
        :subtitle="$t('newFarm.land.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 统计卡片（原页面已有，保留，仅做样式统一） -->
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

        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('newFarm.land.searchPlaceholder')">
              <el-input
                v-model="searchFilters.keyword"
                :placeholder="$t('newFarm.land.searchPlaceholder')"
                class="search-input"
                clearable
                @clear="handleSearch"
                @keyup.enter="handleSearch">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('newFarm.land.form.currentStatus')">
              <el-radio-group v-model="searchFilters.currentStatus" @change="handleSearch">
                <el-radio-button label="">{{ $t('newFarm.common.all') }}</el-radio-button>
                <el-radio-button label="CULTIVATING">{{ $t('newFarm.land.status.CULTIVATING') }}</el-radio-button>
                <el-radio-button label="IDLE">{{ $t('newFarm.land.status.IDLE') }}</el-radio-button>
                <el-radio-button label="FALLOW">{{ $t('newFarm.land.status.FALLOW') }}</el-radio-button>
              </el-radio-group>
            </SearchItem>

            <SearchItem :label="$t('newFarm.land.form.landType')">
              <el-select
                v-model="searchFilters.landType"
                :placeholder="$t('newFarm.land.placeholder.landType')"
                clearable
                style="width: 100%"
                @change="handleSearch">
                <el-option value="PADDY" :label="$t('newFarm.land.landType.PADDY')" />
                <el-option value="DRY" :label="$t('newFarm.land.landType.DRY')" />
                <el-option value="ORCHARD" :label="$t('newFarm.land.landType.ORCHARD')" />
                <el-option value="FOREST" :label="$t('newFarm.land.landType.FOREST')" />
                <el-option value="OTHER" :label="$t('newFarm.land.landType.OTHER')" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('newFarm.land.form.farmerName')">
              <el-input
                v-model="searchFilters.farmerName"
                :placeholder="$t('newFarm.farmer.placeholder.farmerName')"
                clearable
                class="search-input"
                @clear="handleSearch" />
            </SearchItem>

            <SearchItem :label="$t('newFarm.farmer.form.phone')">
              <el-input
                v-model="searchFilters.phone"
                :placeholder="$t('newFarm.farmer.placeholder.phone')"
                clearable
                class="search-input"
                @clear="handleSearch" />
            </SearchItem>

            <SearchItem :label="$t('newFarm.common.kebeleCode')">
              <el-input
                v-model="searchFilters.kebeleCode"
                :placeholder="$t('newFarm.common.selectKebele')"
                clearable
                class="search-input"
                @clear="handleSearch" />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('newFarm.land.title')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
            <el-button
              v-if="selectedIds.length > 0"
              type="danger"
              plain
              @click="handleBatchDelete">
              <i class="ri-delete-bin-line"></i>
              {{ $t('newFarm.land.actions.batchDelete') }} ({{ selectedIds.length }})
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table
              v-loading="loading"
              :data="tableData"
              stripe
              style="width: 100%"
              @selection-change="handleSelectionChange">
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
              <el-table-column :label="$t('newFarm.common.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="'S0'"
                    mode="list"
                    :show-audit="false"
                    :custom-buttons="getRowActionButtons(row)"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.pageNum"
                v-model:page-size="pagination.pageSize"
                :total="pagination.total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            </div>
          </div>

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only" v-loading="loading">
            <div v-if="tableData.length === 0" class="text-center" style="padding: 32px 0;">
              <i class="ri-inbox-line" style="font-size: 48px; color: #c0c4cc;"></i>
              <div style="margin-top: 8px; color: #909399;">{{ $t('newFarm.common.noData') }}</div>
            </div>

            <div v-else>
              <div v-for="item in tableData" :key="item.landId" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-landscape-line"></i>
                    <span>{{ item.landName }}</span>
                  </div>
                  <el-tag :type="getLandStatusType(item.currentStatus)" size="small">
                    {{ $t(`newFarm.land.status.${item.currentStatus}`) }}
                  </el-tag>
                </div>

                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('newFarm.land.columns.landId') }}:</span>
                    <span class="value">{{ item.landId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('newFarm.land.columns.landType') }}:</span>
                    <span class="value">
                      <el-tag v-if="item.landType" size="small">
                        {{ $t(`newFarm.land.landType.${item.landType}`) }}
                      </el-tag>
                    </span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('newFarm.land.columns.areaSize') }}:</span>
                    <span class="value">{{ formatArea(item.areaSize) }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('newFarm.land.columns.farmerName') }}:</span>
                    <span class="value">{{ item.farmerName || $t('newFarm.land.unbound') }}</span>
                  </div>
                </div>

                <div class="mobile-card-footer">
                  <ActionButtons
                    :workflow-status="'S0'"
                    mode="list"
                    :show-audit="false"
                    :custom-buttons="getRowActionButtons(item)"
                    @action="(action) => handleAction(item, action)" />
                </div>
              </div>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="pagination.pageNum"
                  :total="pagination.total"
                  :page-size="pagination.pageSize"
                  layout="prev, pager, next"
                  small
                  @current-change="handleCurrentChange" />
              </div>
            </div>
          </div>
        </InfoCard>
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
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

const getRowActionButtons = (row) => {
  const buttons = [
    { type: 'success', action: 'view', label: 'view', icon: 'ri-eye-line' },
    { type: 'primary', action: 'edit', label: 'edit', icon: 'ri-edit-line' }
  ]

  if (!row.farmerId) {
    buttons.push({
      type: 'warning',
      action: 'bind',
      label: 'bind',
      icon: 'ri-link',
      rawLabel: t('newFarm.land.actions.bindFarmer')
    })
  } else {
    buttons.push({
      type: 'warning',
      action: 'unbind',
      label: 'unbind',
      icon: 'ri-link-unlink',
      rawLabel: t('newFarm.land.actions.unbindFarmer')
    })
  }

  buttons.push({ type: 'danger', action: 'delete', label: 'delete', icon: 'ri-delete-bin-line' })
  return buttons
}

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

// 统一动作处理（仅做 UI 按钮事件转发，不修改业务逻辑）
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'bind':
      handleBindFarmer(row)
      break
    case 'unbind':
      handleUnbindFarmer(row)
      break
    case 'delete':
      handleDelete(row)
      break
  }
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.stats-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.stat-item {
  flex: 1;
  min-width: 240px;
  background: white;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f2f5;
}

.stat-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 154, 68, 0.12);

  i {
    font-size: 22px;
    color: #009a44;
  }

  &.area {
    background: rgba(245, 124, 0, 0.12);

    i {
      color: #f57c00;
    }
  }
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  line-height: 1.2;
}

.stat-label {
  font-size: 13px;
  color: #909399;
}
</style>
