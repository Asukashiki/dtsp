<template>
  <div class="breeding-license-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="icon-wrapper">
          <i class="ri-shield-check-line"></i>
        </div>
        <div class="header-text">
          <h1>{{ $t('research.breedingLicense.title') }}</h1>
          <p class="subtitle">{{ $t('research.breedingLicense.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="filter-section">
      <div class="filter-row">
        <el-input
          v-model="queryParams.keyword"
          :placeholder="$t('research.breedingLicense.searchPlaceholder')"
          clearable
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>

        <el-select
          v-model="queryParams.licenseStatus"
          :placeholder="$t('research.breedingLicense.filterByStatus')"
          clearable
          class="filter-select"
          @change="handleSearch"
        >
          <el-option :label="$t('research.breedingLicense.allStatus')" value="" />
          <el-option :label="$t('research.breedingLicense.status.valid')" value="valid" />
          <el-option :label="$t('research.breedingLicense.status.expired')" value="expired" />
          <el-option :label="$t('research.breedingLicense.status.revoked')" value="revoked" />
        </el-select>

        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('research.breedingLicense.filterByApprovalDate')"
          :end-placeholder="$t('research.breedingLicense.filterByApprovalDate')"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="handleDateChange"
          class="date-picker"
        />

        <el-button type="primary" @click="handleSearch" class="search-btn">
          <i class="ri-search-line"></i>
          {{ $t('research.breedingLicense.actions.search') }}
        </el-button>

        <el-button @click="handleReset" class="reset-btn">
          <i class="ri-refresh-line"></i>
          {{ $t('research.breedingLicense.actions.reset') }}
        </el-button>

        <el-button type="success" @click="handleAdd" class="add-btn">
          <i class="ri-add-line"></i>
          {{ $t('research.breedingLicense.actions.add') }}
        </el-button>
      </div>
    </div>

    <!-- PC Table View -->
    <div class="table-container desktop-only">
      <el-table
        :data="licenseList"
        v-loading="loading"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          prop="licenseNo"
          :label="$t('research.breedingLicense.columns.licenseNo')"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="batchName"
          :label="$t('research.breedingLicense.columns.batchName')"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="cropType"
          :label="$t('research.breedingLicense.columns.cropType')"
          min-width="120"
        />
        <el-table-column
          prop="varietyName"
          :label="$t('research.breedingLicense.columns.varietyName')"
          min-width="130"
          show-overflow-tooltip
        />
        <el-table-column
          prop="approvalOrg"
          :label="$t('research.breedingLicense.columns.approvalOrg')"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="approvalDate"
          :label="$t('research.breedingLicense.columns.approvalDate')"
          min-width="120"
        />
        <el-table-column
          :label="$t('research.breedingLicense.columns.licenseStatus')"
          min-width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag
              :type="getStatusType(row.licenseStatus)"
              effect="dark"
            >
              {{ getStatusText(row.licenseStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdTime"
          :label="$t('research.breedingLicense.columns.createTime')"
          min-width="160"
        />
        <el-table-column
          :label="$t('research.breedingLicense.columns.actions')"
          fixed="right"
          width="200"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              @click="handleDetail(row.id)"
            >
              <i class="ri-eye-line"></i>
              {{ $t('research.breedingLicense.actions.detail') }}
            </el-button>
            <el-button
              link
              type="primary"
              @click="handleEdit(row.id)"
            >
              <i class="ri-edit-line"></i>
              {{ $t('research.breedingLicense.actions.edit') }}
            </el-button>
            <el-button
              link
              type="danger"
              @click="handleDelete(row.id)"
            >
              <i class="ri-delete-bin-line"></i>
              {{ $t('research.breedingLicense.actions.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Batch Operations -->
      <div class="batch-operations" v-if="selectedIds.length > 0">
        <el-button type="danger" @click="handleBatchDelete">
          <i class="ri-delete-bin-line"></i>
          {{ $t('research.breedingLicense.actions.delete') }} ({{ selectedIds.length }})
        </el-button>
      </div>

      <!-- Pagination -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="mobile-only">
      <div v-loading="loading" class="card-list">
        <div
          v-for="item in licenseList"
          :key="item.id"
          class="license-card"
          @click="handleDetail(item.id)"
        >
          <div class="card-header">
            <h3>{{ item.licenseNo }}</h3>
            <el-tag
              :type="getStatusType(item.licenseStatus)"
              effect="dark"
              size="small"
            >
              {{ getStatusText(item.licenseStatus) }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="info-row">
              <span class="label">{{ $t('research.breedingLicense.columns.batchName') }}:</span>
              <span class="value">{{ item.batchName }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('research.breedingLicense.columns.cropType') }}:</span>
              <span class="value">{{ item.cropType }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('research.breedingLicense.columns.varietyName') }}:</span>
              <span class="value">{{ item.varietyName }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('research.breedingLicense.columns.approvalDate') }}:</span>
              <span class="value">{{ item.approvalDate }}</span>
            </div>
          </div>
          <div class="card-actions">
            <el-button size="small" @click.stop="handleEdit(item.id)">
              <i class="ri-edit-line"></i>
              {{ $t('research.breedingLicense.actions.edit') }}
            </el-button>
            <el-button size="small" type="danger" @click.stop="handleDelete(item.id)">
              <i class="ri-delete-bin-line"></i>
              {{ $t('research.breedingLicense.actions.delete') }}
            </el-button>
          </div>
        </div>

        <!-- Empty State -->
        <el-empty v-if="!loading && licenseList.length === 0" :description="$t('research.breedingLicense.message.noData')" />
      </div>

      <!-- Mobile Pagination -->
      <div class="mobile-pagination" v-if="total > 0">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          :total="total"
          layout="prev, pager, next"
          @current-change="handlePageChange"
          small
        />
      </div>

      <!-- Floating Add Button -->
      <el-button class="fab" type="success" circle @click="handleAdd">
        <i class="ri-add-line"></i>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getLicenseList, deleteLicense } from '@/api/breedingLicense'

const router = useRouter()
const { t } = useI18n()

// State
const loading = ref(false)
const licenseList = ref([])
const total = ref(0)
const selectedIds = ref([])
const dateRange = ref([])

// Query Parameters
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  licenseStatus: '',
  approvalDateStart: '',
  approvalDateEnd: ''
})

// Get Status Type for Tag
const getStatusType = (status) => {
  const typeMap = {
    valid: 'success',
    expired: 'warning',
    revoked: 'danger'
  }
  return typeMap[status] || 'info'
}

// Get Status Text
const getStatusText = (status) => {
  return t(`research.breedingLicense.status.${status}`) || status
}

// Fetch License List
const fetchLicenseList = async () => {
  loading.value = true
  try {
    const res = await getLicenseList(queryParams)
    if (res.code === 200) {
      licenseList.value = res.data.list || []
      total.value = res.data.total || 0
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to fetch license list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// Handle Search
const handleSearch = () => {
  queryParams.pageNum = 1
  fetchLicenseList()
}

// Handle Reset
const handleReset = () => {
  queryParams.keyword = ''
  queryParams.licenseStatus = ''
  queryParams.approvalDateStart = ''
  queryParams.approvalDateEnd = ''
  dateRange.value = []
  handleSearch()
}

// Handle Date Change
const handleDateChange = (value) => {
  if (value && value.length === 2) {
    queryParams.approvalDateStart = value[0]
    queryParams.approvalDateEnd = value[1]
  } else {
    queryParams.approvalDateStart = ''
    queryParams.approvalDateEnd = ''
  }
  handleSearch()
}

// Handle Page Size Change
const handleSizeChange = (val) => {
  queryParams.pageSize = val
  queryParams.pageNum = 1
  fetchLicenseList()
}

// Handle Page Change
const handlePageChange = (val) => {
  queryParams.pageNum = val
  fetchLicenseList()
}

// Handle Selection Change
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

// Handle Add
const handleAdd = () => {
  router.push({ name: 'BreedingLicenseAdd' })
}

// Handle Edit
const handleEdit = (id) => {
  router.push({ name: 'BreedingLicenseEdit', params: { id } })
}

// Handle Detail
const handleDetail = (id) => {
  router.push({ name: 'BreedingLicenseDetail', params: { id } })
}

// Handle Delete
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm(
      t('research.breedingLicense.message.confirmDelete'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteLicense([id])
    if (res.code === 200) {
      ElMessage.success(t('research.breedingLicense.message.deleteSuccess'))
      fetchLicenseList()
    } else {
      ElMessage.error(res.msg || t('common.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete license:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

// Handle Batch Delete
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning(t('research.breedingLicense.message.selectAtLeastOne'))
    return
  }

  try {
    await ElMessageBox.confirm(
      t('research.breedingLicense.message.confirmDelete'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteLicense(selectedIds.value)
    if (res.code === 200) {
      ElMessage.success(t('research.breedingLicense.message.deleteSuccess'))
      selectedIds.value = []
      fetchLicenseList()
    } else {
      ElMessage.error(res.msg || t('common.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to batch delete licenses:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

// Initialize
onMounted(() => {
  fetchLicenseList()
})
</script>

<style scoped>
.breeding-license-container {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 50%, #FEDD00 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.icon-wrapper i {
  font-size: 48px;
  color: white;
}

.header-text h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  margin: 8px 0 0 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);
}

/* Filter Section */
.filter-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.filter-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 180px;
}

.date-picker {
  width: 280px;
}

.search-btn,
.reset-btn,
.add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Table Container */
.table-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.batch-operations {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* Mobile View */
.mobile-only {
  display: none;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.license-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s;
}

.license-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.info-row .label {
  color: #909399;
  font-weight: 500;
}

.info-row .value {
  color: #303133;
  text-align: right;
  flex: 1;
  margin-left: 12px;
}

.card-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.mobile-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.3);
  z-index: 1000;
}

/* Responsive */
.desktop-only {
  display: block;
}

@media screen and (max-width: 768px) {
  .breeding-license-container {
    padding: 16px;
  }

  .page-header {
    padding: 20px;
  }

  .header-content {
    gap: 12px;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .icon-wrapper i {
    font-size: 32px;
  }

  .header-text h1 {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .filter-row {
    flex-direction: column;
  }

  .search-input,
  .filter-select,
  .date-picker {
    width: 100%;
  }
}
</style>
