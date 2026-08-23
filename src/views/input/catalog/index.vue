<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-list-check"
        :title="$t('input.catalog.title')"
        :subtitle="$t('input.catalog.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('input.catalog.searchPlaceholder')">
              <el-input
                  v-model="searchKeyword"
                  :placeholder="$t('input.catalog.searchPlaceholder')"
                  clearable
                  @clear="handleSearch"
                  @keyup.enter="handleSearch"
                  class="search-input">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('input.catalog.filterByType')">
              <el-select
                  v-model="selectedType"
                  :placeholder="$t('input.catalog.filterByType')"
                  @change="handleSearch"
                  v-loading="dictLoading"
                  class="filter-select">
                <el-option :label="$t('input.catalog.type.all')" value="all" />
                <!-- 从字典动态生成类型选项（移除农药） -->
                <el-option
                    v-for="item in inputTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('input.catalog.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table
                v-loading="loading"
                :data="tableData"
                stripe
                style="width: 100%"
                class="catalog-table"
                @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="inputName" :label="$t('input.catalog.columns.inputName')" min-width="180" show-overflow-tooltip />
              <el-table-column :label="$t('input.catalog.columns.inputType')" width="150" align="center">
                <template #default="{ row }">
                  <el-tag :type="getTypeTag(row.type)" size="small">{{ getTypeLabel(row.type) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="inputSku" :label="$t('input.catalog.columns.inputSku')" width="150" show-overflow-tooltip />
              <el-table-column prop="trademark" :label="$t('input.catalog.columns.trademark')" width="120" />
              <el-table-column prop="registerCode" :label="$t('input.catalog.columns.registerCode')" width="140" />
              <el-table-column prop="producerName" :label="$t('input.catalog.columns.producerName')" min-width="200" show-overflow-tooltip />
              <el-table-column prop="createTime" :label="$t('input.catalog.columns.createTime')" width="160" />
              <el-table-column
                prop="status"
                :label="$t('input.catalog.columns.status')"
                width="140"
                align="center"
                header-align="center"
                class-name="status-column"
              >
                <template #default="{ row }">
                  <el-tag class="status-tag" :type="row.status === 'active' ? 'success' : 'info'" size="small">
                    {{ $t(`input.catalog.statusOptions.${row.status}`) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('input.catalog.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button 
                      class="action-btn action-btn-view" 
                      size="small"
                      @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                    <el-button 
                      class="action-btn action-btn-edit" 
                      type="primary"
                      size="small"
                      @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>
                      <span class="btn-text">{{ $t('common.edit') }}</span>
                    </el-button>
                    <el-button 
                      class="action-btn action-btn-delete" 
                      type="danger"
                      size="small"
                      @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i>
                      <span class="btn-text">{{ $t('common.delete') }}</span>
                    </el-button>
                  </div>
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
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only" v-loading="loading">
          <div v-for="item in tableData" :key="item.inputId" class="input-card" @click="handleView(item)">
            <div class="card-header">
              <el-tag :type="getTypeTag(item.type)" size="small">{{ getTypeLabel(item.type) }}</el-tag>
              <el-tag :type="item.status === 'active' ? 'success' : 'info'" size="small">{{ $t(`input.catalog.statusOptions.${item.status}`) }}</el-tag>
            </div>
            <h3 class="card-title">{{ item.inputName }}</h3>
            <div class="card-info">
              <div class="info-item">
                <span class="info-label">{{ $t('input.catalog.columns.trademark') }}</span>
                <span class="info-value">{{ item.trademark }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('input.catalog.columns.registerCode') }}</span>
                <span class="info-value">{{ item.registerCode }}</span>
              </div>
              <div class="info-item full">
                <span class="info-label">{{ $t('input.catalog.columns.producerName') }}</span>
                <span class="info-value">{{ item.producerName }}</span>
              </div>
            </div>
            <div class="card-footer">
              <span class="create-time">{{ item.createTime }}</span>
              <div class="card-actions" @click.stop>
                <el-button 
                  class="action-btn action-btn-view" 
                  size="small"
                  @click="handleView(item)">
                  <i class="ri-eye-line"></i>
                  <span class="btn-text">{{ $t('common.view') }}</span>
                </el-button>
                <el-button 
                  class="action-btn action-btn-edit" 
                  type="primary"
                  size="small"
                  @click="handleEdit(item)">
                  <i class="ri-edit-line"></i>
                  <span class="btn-text">{{ $t('common.edit') }}</span>
                </el-button>
                <el-button 
                  class="action-btn action-btn-delete" 
                  type="danger"
                  size="small"
                  @click="handleDelete(item)">
                  <i class="ri-delete-bin-line"></i>
                  <span class="btn-text">{{ $t('common.delete') }}</span>
                </el-button>
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getInputList, deleteInput } from '@/api/input'
import { useDict, clearDictCache } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

// 字典相关配置
clearDictCache('input_type')
const {
  options,
  loading: dictLoading,
  refresh: refreshDict
} = useDict(['input_type'], {
  immediate: true,
  cache: true
})

// 筛选条件
const searchKeyword = ref('')
const selectedType = ref('all')
const loading = ref(false)
const tableData = ref([])
const selectedRows = ref([])

// 分页配置
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })

// 过滤后的投入品类型选项（移除农药）
const inputTypeOptions = computed(() => {
  return (options.value.input_type || []).filter(item =>
      ['IN01', 'IN02', 'IN09'].includes(item.value) // 只保留种子、化肥、其他
  )
})

// 获取类型标签样式（适配新编码 IN01/IN02/IN09）
const getTypeTag = (type) => {
  const typeMap = {
    IN01: 'success',  // 种子
    IN02: 'warning',  // 化肥
    IN09: ''          // 其他
  }
  return typeMap[type] || ''
}

// 根据类型编码获取字典中的显示文本
const getTypeLabel = (type) => {
  if (!type || !options.value.input_type) return '-'
  const typeItem = options.value.input_type.find(item => item.value === type)
  return typeItem ? typeItem.label : '-'
}

// 加载列表数据
const loadData = async () => {
  // 确保字典加载完成
  await refreshDict()

  loading.value = true
  try {
    const requestParams = {
      keyword: searchKeyword.value.trim(),
      type: selectedType.value === 'all' ? '' : selectedType.value,
      page: pagination.page,
      pageSize: pagination.pageSize
    }
    const res = await getInputList(requestParams)

    if (res && res.code === 200 && res.data) {
      // 适配旧数据的类型编码转换
      const list = (res.data.list || []).map(item => {
        let type = item.type
        // 旧值映射为新编码
        if (type === 'seed') type = 'IN01'
        if (type === 'fertilizer') type = 'IN02'
        if (type === 'other') type = 'IN09'
        // 农药类型置空（已移除）
        if (type === 'pesticide') type = ''
        return { ...item, type }
      })

      tableData.value = list
      pagination.total = res.data.total || 0
    } else {
      ElMessage.error(res?.msg || t('common.dataLoadFailed'))
      tableData.value = []
      pagination.total = 0
    }
  } catch (error) {
    console.error('加载数据失败：', error)
    ElMessage.error(t('common.failed') + '：' + (error.message || ''))
    tableData.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 重置筛选条件
const handleReset = () => {
  searchKeyword.value = ''
  selectedType.value = 'all'
  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => router.push('/input/catalog/add')

// 查看详情
const handleView = (row) => router.push(`/input/catalog/detail/${row.inputId}`)

// 编辑
const handleEdit = (row) => router.push(`/input/catalog/edit/${row.inputId}`)

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
      t('input.catalog.deleteConfirm'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
  ).then(async () => {
    try {
      const res = await deleteInput(row.inputId)
      if (res.code === 200) {
        ElMessage.success(t('input.catalog.deleteSuccess'))
        loadData()
      } else {
        ElMessage.error(res.msg || t('input.catalog.deleteFailed'))
      }
    } catch (error) {
      console.error('删除失败：', error)
      ElMessage.error(t('input.catalog.deleteFailed') + '：' + (error.message || ''))
    }
  }).catch(() => {})
}

// 表格选择事件
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 分页大小变更
const handleSizeChange = () => {
  pagination.page = 1
  loadData()
}

// 页码变更
const handlePageChange = () => {
  loadData()
}

// 初始化加载
onMounted(async () => {
  await refreshDict()
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/table-enhanced.scss';

:deep(.catalog-table .status-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.catalog-table .status-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}
/* 操作按钮样式 */
.action-buttons {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
  padding: 4px 0;
}

.action-btn {
  min-width: auto;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  margin: 0 !important;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  border-radius: 4px;

  i {
    font-size: 13px;
    margin-right: 0;
  }

  .btn-text {
    white-space: nowrap;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
}

/* VIEW 按钮 - 绿色背景 */
.action-btn-view {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-color: #009A44;
  color: white;

  &:hover {
    background: linear-gradient(135deg, #00b350 0%, #009A44 100%);
    border-color: #00b350;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 154, 68, 0.3);
  }

  &:active {
    background: #008038;
    border-color: #008038;
  }

  &:focus {
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-color: #009A44;
    color: white;
  }
}

/* EDIT 按钮 - 使用默认 primary 样式 */
.action-btn-edit {
  // 使用 Element Plus 默认的 primary 样式
}

/* DELETE 按钮 - 使用默认 danger 样式 */
.action-btn-delete {
  // 使用 Element Plus 默认的 danger 样式
}

/* 移动端卡片样式 */
.mobile-card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.input-card:active {
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

.info-item.full {
  grid-column: 1 / -1;
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
</style>
