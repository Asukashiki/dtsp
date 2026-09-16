<template>
  <div class="page-container organization-registration-page">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-checkbox-multiple-line" :title="$t('orgRegistration.audit.title')"
        :subtitle="$t('orgRegistration.audit.subtitle')" shadow />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('orgRegistration.columns.orgName')">
              <el-input v-model="searchForm.keyword" :placeholder="$t('orgRegistration.list.searchPlaceholder')"
                clearable @clear="handleSearch" @keyup.enter="handleSearch">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('orgRegistration.columns.orgType')">
              <el-select v-model="searchForm.orgType" :placeholder="$t('orgRegistration.list.filterByType')" clearable
                @change="handleSearch" class="filter-select">
                <el-option value="UNION" :label="$t('orgRegistration.orgType.UNION')" />
                <el-option value="COOPERATIVE" :label="$t('orgRegistration.orgType.COOPERATIVE')" />
                <el-option value="PRIVATE" :label="$t('orgRegistration.orgType.PRIVATE')" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表区域 -->
        <InfoCard icon="ri-list-check" :title="$t('orgRegistration.audit.listTitle')" :no-padding="true">
          <!-- 状态标签页 -->
          <StatusTabs v-model="activeStatus" :tabs="tabConfig" @tab-change="handleStatusChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe border class="registration-table"
              @header-dragend="handleHeaderDragend">
              <el-table-column prop="orgName" column-key="orgName" :label="$t('orgRegistration.columns.orgName')"
                :width="columnWidths.orgName" :min-width="columnMinimums.orgName" show-overflow-tooltip resizable />
              <el-table-column prop="orgType" column-key="orgType" :label="$t('orgRegistration.columns.orgType')"
                :width="columnWidths.orgType" :min-width="columnMinimums.orgType" resizable>
                <template #default="{ row }">
                  <el-tag class="registration-data-tag" :type="row.orgType === 'UNION' ? 'primary' : 'success'"
                    size="small" effect="plain">
                    {{ $t(`orgRegistration.orgType.${row.orgType}`) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="licenseNumber" column-key="licenseNumber"
                :label="$t('orgRegistration.columns.licenseNumber')" :width="columnWidths.licenseNumber"
                :min-width="columnMinimums.licenseNumber" show-overflow-tooltip resizable />
              <el-table-column prop="regionName" column-key="regionName"
                :label="$t('orgRegistration.columns.regionCode')" :width="columnWidths.regionName"
                :min-width="columnMinimums.regionName" show-overflow-tooltip resizable>
                <template #default="{ row }">
                  <span>{{ formatRegionName(row.regionName) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" column-key="createTime" :label="$t('common.createTime')"
                :width="columnWidths.createTime" :min-width="columnMinimums.createTime" resizable />
              <el-table-column prop="auditStatus" column-key="auditStatus"
                :label="$t('orgRegistration.columns.auditStatus')" :width="columnWidths.auditStatus"
                :min-width="columnMinimums.auditStatus" align="center" resizable>
                <template #default="{ row }">
                  <el-tag class="registration-data-tag" :type="getStatusType(row.auditStatus)" size="small"
                    effect="plain">
                    {{ getStatusLabel(row.auditStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column column-key="actions" :label="$t('common.actions')"
                :width="columnWidths.actions" :min-width="columnMinimums.actions" resizable>
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small" type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>{{ $t('common.view') }}
                    </el-button>
                    <el-button size="small" type="primary" v-if="row.auditStatus === 0" @click="handleAudit(row)">
                      <i class="ri-check-line"></i>{{ $t('orgRegistration.actions.audit') }}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:currentPage="pagination.currentPage" v-model:pageSize="pagination.pageSize"
                :total="pagination.total" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>

          <!-- 移动端卡片列表 -->
          <div class="mobile-card-list mobile-only">
            <div v-for="item in tableData" :key="item.id" class="mobile-card" @click="handleView(item)">
              <div class="mobile-card-header">
                <div class="mobile-card-title">
                  <i class="ri-building-line"></i>
                  <span>{{ item.orgName }}</span>
                </div>
                <el-tag class="registration-data-tag" :type="getStatusType(item.auditStatus)" size="small"
                  effect="plain">
                  {{ getStatusLabel(item.auditStatus) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('orgRegistration.columns.orgType') }}:</span>
                  <span class="value">{{ $t(`orgRegistration.orgType.${item.orgType}`) }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('orgRegistration.columns.licenseNumber') }}:</span>
                  <span class="value">{{ item.licenseNumber }}</span>
                </div>
              </div>
              <div class="mobile-card-footer" v-if="item.auditStatus === 0">
                <el-button link type="primary" size="small" @click.stop="handleAudit(item)">
                  <i class="ri-check-line"></i> {{ $t('orgRegistration.actions.audit') }}
                </el-button>
              </div>
            </div>
            <div v-if="tableData.length === 0 && !loading" class="empty-status">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('common.noData') }}</p>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getRegistrationList } from '@/api/breedingOrgRegistration'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import { StatusTabs } from '@/components/workflow'
import { useTableColumnWidths } from '@/hooks/useTableColumnWidths'

const router = useRouter()
const { t } = useI18n()

// 状态标签配置
const activeStatus = ref('0')
const tabConfig = computed(() => [
  { label: 'orgRegistration.status.pending', name: '0', icon: 'ri-time-line' },
  { label: 'orgRegistration.status.approved', name: '1', icon: 'ri-checkbox-circle-line' },
  { label: 'orgRegistration.status.rejected', name: '2', icon: 'ri-close-circle-line' }
])

const loading = ref(false)
const tableData = ref([])

const columnMinimums = Object.freeze({
  orgName: 140,
  orgType: 120,
  licenseNumber: 150,
  regionName: 150,
  createTime: 140,
  auditStatus: 130,
  actions: 150
})

const { widths: columnWidths, handleHeaderDragend } = useTableColumnWidths(
  'organization-registration-approval',
  {
    orgName: 220,
    orgType: 180,
    licenseNumber: 200,
    regionName: 220,
    createTime: 180,
    auditStatus: 160,
    actions: 220
  },
  columnMinimums
)

const searchForm = reactive({
  keyword: '',
  orgType: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const getStatusLabel = (status) => {
  const map = {
    0: t('orgRegistration.status.pending'),
    1: t('orgRegistration.status.approved'),
    2: t('orgRegistration.status.rejected')
  }
  return map[status] || status
}

const getStatusType = (status) => {
  const map = { 0: 'warning', 1: 'success', 2: 'danger' }
  return map[status] || 'info'
}

const formatRegionName = (name) => {
  if (!name) return '-'
  return name.split('#').join(' > ')
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await getRegistrationList({
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      orgName: searchForm.keyword,
      orgType: searchForm.orgType,
      auditStatus: activeStatus.value
    })

    if (res.code === 200) {
      const data = res.data || res
      tableData.value = data.list || data.rows || (Array.isArray(data) ? data : [])
      pagination.total = data.total || 0
    }
  } catch (error) {
    console.error('Failed to load approval list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleStatusChange = () => {
  pagination.currentPage = 1
  loadData()
}

const handleSearch = () => {
  pagination.currentPage = 1
  loadData()
}

const handleReset = () => {
  searchForm.keyword = ''
  searchForm.orgType = ''
  handleSearch()
}

const handleView = (row) => {
  router.push({ name: 'RegistrationDetail', params: { id: row.id } })
}

const handleAudit = (row) => {
  router.push({ name: 'RegistrationAudit', params: { id: row.id } })
}

const handleSizeChange = () => {
  pagination.currentPage = 1
  loadData()
}

const handleCurrentChange = (val) => {
  pagination.currentPage = val
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.filter-select {
  width: 100%;
}

.action-buttons button {
  margin-left: 0;
}
</style>
