<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-file-list-line"
        :title="$t('demandConfirmation.title')"
        :subtitle="$t('demandConfirmation.subtitle')"
      />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('demandConfirmation.form.fromActor')">
              <el-select
                v-model="searchForm.fromActor"
                :placeholder="$t('demandConfirmation.form.fromActor')"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="item in actorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </SearchItem>
            <SearchItem :label="$t('demandConfirmation.form.toActor')">
              <el-select
                v-model="searchForm.toActor"
                :placeholder="$t('demandConfirmation.form.toActor')"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="item in actorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </SearchItem>
            <SearchItem :label="$t('demandConfirmation.form.confirmationType')">
              <el-select
                v-model="searchForm.confirmationType"
                :placeholder="$t('demandConfirmation.form.confirmationType')"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('demandConfirmation.list')"
          icon="ri-list-check"
        >
          <template #actions>
            <el-button
              type="danger"
              @click="handleBatchDelete"
              :disabled="selectedRows.length === 0"
              v-if="selectedRows.length > 0"
            >
              <i class="ri-delete-bin-line"></i>
              {{ $t('common.delete') }} ({{ selectedRows.length }})
            </el-button>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <div class="card-body">
            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table
                v-loading="loading"
                :data="tableData"
                stripe
                @selection-change="handleSelectionChange"
                :default-sort="{ prop: 'createTime', order: 'descending' }"
              >
                <el-table-column
                  type="selection"
                  width="55"
                />
                <el-table-column
                  prop="fromActor"
                  :label="$t('demandConfirmation.columns.fromActor')"
                  min-width="120"
                />
                <el-table-column
                  prop="toActor"
                  :label="$t('demandConfirmation.columns.toActor')"
                  min-width="120"
                />
                <el-table-column
                  prop="referenceId"
                  :label="$t('demandConfirmation.columns.referenceId')"
                  min-width="150"
                />
                <el-table-column
                  prop="confirmationTypeDesc"
                  :label="$t('demandConfirmation.columns.confirmationType')"
                  min-width="120"
                />
                <el-table-column
                  prop="confirmedTime"
                  :label="$t('demandConfirmation.columns.confirmedTime')"
                  min-width="160"
                  sortable="custom"
                />
                <el-table-column
                  prop="createPeople"
                  :label="$t('demandConfirmation.columns.createPeople')"
                  min-width="120"
                />
                <el-table-column
                  prop="createTime"
                  :label="$t('demandConfirmation.columns.createTime')"
                  min-width="160"
                  sortable="custom"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="220">
                  <template #default="{ row }">
                    <el-button
                      type="primary"
                      size="small"
                      @click="handleView(row)"
                    >
                      <i class="ri-eye-line"></i>
                      {{ $t('common.view') }}
                    </el-button>
                    <el-button
                      type="danger"
                      size="small"
                      @click="handleDelete(row)"
                    >
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

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in tableData" :key="item.confirmationId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox
                    v-model="item.checked"
                    @change="handleMobileCheckChange(item)"
                  ></el-checkbox>
                  <div class="mobile-card-title">
                    <i class="ri-file-list-line"></i>
                    <span>{{ item.confirmationTypeDesc }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandConfirmation.columns.fromActor') }}:</span>
                    <span class="value">{{ item.fromActor }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandConfirmation.columns.toActor') }}:</span>
                    <span class="value">{{ item.toActor }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandConfirmation.columns.referenceId') }}:</span>
                    <span class="value">{{ item.referenceId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandConfirmation.columns.confirmedTime') }}:</span>
                    <span class="value">{{ item.confirmedTime || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandConfirmation.columns.createPeople') }}:</span>
                    <span class="value">{{ item.createPeople }}</span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <el-button
                    type="primary"
                    size="small"
                    @click="handleView(item)"
                    style="margin-right: 8px"
                  >
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="handleDelete(item)"
                  >
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
            <el-empty v-if="tableData.length === 0 && !loading" :description="$t('demandConfirmation.messages.noData')" />
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getDemandConfirmationList, deleteDemandConfirmation, batchDeleteDemandConfirmation } from '@/api/demandConfirmation'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const selectedRows = ref([])

const searchForm = reactive({
  fromActor: '',
  toActor: '',
  confirmationType: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 发送方/接收方选项
const actorOptions = [
  { value: 'DA', label: 'DA' },
  { value: 'Coop', label: 'Coop' },
  { value: 'Union', label: 'Union' },
  { value: 'District', label: 'District' },
  { value: 'Zone', label: 'Zone' },
  { value: 'Region', label: 'Region' }
]

// 确认类型选项
const typeOptions = [
  { value: 'Receipt', label: t('demandConfirmation.type.receipt') },
  { value: 'Delivery', label: t('demandConfirmation.type.delivery') }
]

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getDemandConfirmationList({
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      fromActor: searchForm.fromActor,
      toActor: searchForm.toActor,
      confirmationType: searchForm.confirmationType
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      pagination.total = res.data?.total || 0
      // 初始化移动端复选框状态
      tableData.value.forEach(item => {
        item.checked = selectedRows.value.some(r => r.confirmationId === item.confirmationId)
      })
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
  searchForm.fromActor = ''
  searchForm.toActor = ''
  searchForm.confirmationType = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'DemandConfirmationAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'DemandConfirmationDetail', params: { id: row.confirmationId } })
}

// 表格选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 移动端复选框变化
const handleMobileCheckChange = (item) => {
  if (item.checked) {
    if (!selectedRows.value.find(r => r.confirmationId === item.confirmationId)) {
      selectedRows.value.push(item)
    }
  } else {
    selectedRows.value = selectedRows.value.filter(r => r.confirmationId !== item.confirmationId)
  }
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('demandConfirmation.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await deleteDemandConfirmation(row.confirmationId)
    if (res.code === 200) {
      ElMessage.success(t('demandConfirmation.deleteSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('demandConfirmation.messages.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('demandConfirmation.messages.deleteFailed'))
    }
  }
}

// 批量删除
const handleBatchDelete = async () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(t('demandConfirmation.pleaseSelectData'))
    return
  }

  try {
    await ElMessageBox.confirm(
      t('demandConfirmation.batchDeleteConfirm', { count: selectedRows.value.length }),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const ids = selectedRows.value.map(row => row.confirmationId)
    const res = await batchDeleteDemandConfirmation(ids)

    if (res.code === 200) {
      ElMessage.success(t('demandConfirmation.batchDeleteSuccess'))
      selectedRows.value = []
      loadData()
    } else {
      ElMessage.error(res.msg || t('demandConfirmation.messages.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to batch delete:', error)
      ElMessage.error(t('demandConfirmation.messages.deleteFailed'))
    }
  }
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

// 自定义样式
.mobile-card-footer {
  padding-top: 12px;
  border-top: 1px solid var(--border-color-lighter);
}
</style>
