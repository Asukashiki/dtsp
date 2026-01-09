<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-building-2-line"
        :title="$t('orgRegistration.title')"
        :subtitle="$t('orgRegistration.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('orgRegistration.list.searchPlaceholder')">
              <el-input
                v-model="searchForm.keyword"
                :placeholder="$t('orgRegistration.placeholder.orgName')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('orgRegistration.list.filterByType')">
              <el-select
                v-model="searchForm.orgType"
                :placeholder="$t('orgRegistration.placeholder.orgType')"
                clearable
                class="filter-select"
              >
                <el-option value="" :label="$t('orgRegistration.list.allTypes')"></el-option>
                <el-option value="UNION" :label="$t('orgRegistration.orgType.UNION')"></el-option>
                <el-option value="COOPERATIVE" :label="$t('orgRegistration.orgType.COOPERATIVE')"></el-option>
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('orgRegistration.list.filterByStatus')">
              <el-select
                v-model="searchForm.auditStatus"
                :placeholder="$t('orgRegistration.placeholder.status')"
                clearable
                class="filter-select"
              >
                <el-option value="" :label="$t('orgRegistration.list.allStatus')"></el-option>
                <el-option :value="0" :label="$t('orgRegistration.status.pending')"></el-option>
                <el-option :value="1" :label="$t('orgRegistration.status.approved')"></el-option>
                <el-option :value="2" :label="$t('orgRegistration.status.rejected')"></el-option>
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('orgRegistration.list.title')"
          icon="ri-list-check"
        >
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <div class="card-body">
            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table v-loading="loading" :data="tableData" stripe>
                <el-table-column
                  prop="orgName"
                  :label="$t('orgRegistration.columns.orgName')"
                  min-width="180"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="orgType"
                  :label="$t('orgRegistration.columns.orgType')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    <el-tag :type="row.orgType === 'UNION' ? 'primary' : 'success'">
                      {{ $t(`orgRegistration.orgType.${row.orgType}`) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="licenseNumber"
                  :label="$t('orgRegistration.columns.licenseNumber')"
                  min-width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  :label="$t('orgRegistration.columns.regionCode')"
                  min-width="200"
                  show-overflow-tooltip
                >
                  <template #default="{ row }">
                    <span class="region-path">{{ formatRegionName(row.regionName) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="applyUsername"
                  :label="$t('orgRegistration.columns.applyUsername')"
                  min-width="130"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="auditStatus"
                  :label="$t('orgRegistration.columns.auditStatus')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    <el-tag :type="getStatusType(row.auditStatus)">
                      {{ getStatusLabel(row.auditStatus) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('orgRegistration.columns.createTime')"
                  min-width="160"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="240">
                  <template #default="{ row }">
                    <ActionButtons
                      :workflow-status="mapStatusToWorkflow(row.auditStatus)"
                      mode="list"
                      :show-audit="false"
                      @action="(action) => handleAction(row, action)" />
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
              <div v-for="item in tableData" :key="item.id" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-building-2-line"></i>
                    <span>{{ item.orgName }}</span>
                  </div>
                  <el-tag :type="getStatusType(item.auditStatus)" size="small">
                    {{ getStatusLabel(item.auditStatus) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.orgType') }}:</span>
                    <span class="value">
                      <el-tag :type="item.orgType === 'UNION' ? 'primary' : 'success'" size="small">
                        {{ $t(`orgRegistration.orgType.${item.orgType}`) }}
                      </el-tag>
                    </span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.licenseNumber') }}:</span>
                    <span class="value">{{ item.licenseNumber }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.regionCode') }}:</span>
                    <span class="value">{{ formatRegionName(item.regionName) }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.applyUsername') }}:</span>
                    <span class="value">{{ item.applyUsername }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.createTime') }}:</span>
                    <span class="value">{{ item.createTime || '-' }}</span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <ActionButtons
                    :workflow-status="mapStatusToWorkflow(item.auditStatus)"
                    mode="list"
                    :show-audit="false"
                    @action="(action) => handleAction(item, action)" />
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
            <el-empty v-if="tableData.length === 0 && !loading" :description="$t('orgRegistration.list.noData')" />
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
import { ElMessage } from 'element-plus'
import { getRegistrationList } from '@/api/orgRegistration'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  keyword: '',
  orgType: '',
  auditStatus: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// Add new status mapping helper
const mapStatusToWorkflow = (status) => {
  const map = {
    0: 'S1', // Pending -> S1 (Pending Approval)
    1: 'S2', // Approved -> S2 (Approved)
    2: 'S3'  // Rejected -> S3 (Rejected)
  }
  return map[status] || 'S0'
}

// 获取状态标签
const getStatusLabel = (status) => {
  const statusMap = {
    0: t('orgRegistration.status.pending'),
    1: t('orgRegistration.status.approved'),
    2: t('orgRegistration.status.rejected')
  }
  return statusMap[status] || status
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    0: 'warning',
    1: 'success',
    2: 'danger'
  }
  return typeMap[status] || 'info'
}

// 格式化区域名称（将 # 分隔转为 > 分隔，只显示最后两级）
const formatRegionName = (regionName) => {
  if (!regionName) return '-'
  const parts = regionName.split('#')
  // 只显示最后两级，避免过长
  if (parts.length > 2) {
    return parts.slice(-2).join(' > ')
  }
  return parts.join(' > ')
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getRegistrationList({
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      orgName: searchForm.keyword,
      orgType: searchForm.orgType,
      auditStatus: searchForm.auditStatus !== '' ? searchForm.auditStatus : undefined
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      pagination.total = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('orgRegistration.messages.loadFailed'))
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
  searchForm.keyword = ''
  searchForm.orgType = ''
  searchForm.auditStatus = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'OrgRegistrationAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'OrgRegistrationDetail', params: { id: row.id } })
}

// 编辑（驳回后重新提交）
const handleEdit = (row) => {
  router.push({ name: 'OrgRegistrationEdit', params: { id: row.id } })
}

// Add handleAction to dispatch actions
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      // Reuse edit for resubmission if applicable
      handleEdit(row) 
      break
    case 'audit':
      // Not applicable
      break
    case 'cancelBatch':
      // Not implemented
      break
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
</style>
