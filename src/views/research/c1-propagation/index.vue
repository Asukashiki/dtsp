<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-seedling-line"
        :title="$t('research.menu.c1SeedPropagationApplication')"
        :subtitle="$t('research.menu.c1SeedPropagationApplicationSubtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="loadData" @reset="handleReset">
            <SearchItem :label="$t('research.c1Propagation.searchPlaceholder')">
              <el-input
                v-model="searchQuery"
                :placeholder="$t('research.c1Propagation.searchPlaceholder')"
                clearable
                @keyup.enter="loadData">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.c1Propagation.form.applyStatus')">
              <el-select
                v-model="statusFilter"
                :placeholder="$t('research.c1Propagation.form.applyStatus')"
                clearable
                @change="loadData">
                <el-option label="Pending" value="pending" />
                <el-option label="Approved" value="approved" />
                <el-option label="Rejected" value="rejected" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('common.dateRange')">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('common.startDate')"
                :end-placeholder="$t('common.endDate')"
                style="width: 100%"
                clearable
                value-format="YYYY-MM-DD"
                @change="loadData"
              />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.c1Propagation.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.c1Propagation.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe style="width: 100%" v-loading="loading" table-layout="fixed">
              <el-table-column
                prop="applicantOrgName"
                :label="$t('research.c1Propagation.columns.applicantOrgName')"
                min-width="180"
                show-overflow-tooltip
              />
              <el-table-column
                prop="authId"
                :label="$t('research.c1Propagation.columns.authId')"
                min-width="140"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  {{ row.authId || '-' }}
                </template>
              </el-table-column>
              <el-table-column
                prop="cropType"
                :label="$t('research.c1Propagation.columns.cropType')"
                min-width="160"
                align="center"
              >
                <template #default="{ row }">
                  {{ getCropTypeDisplay(row.cropType) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="varietyName"
                :label="$t('research.c1Propagation.columns.varietyName')"
                min-width="140"
                show-overflow-tooltip
              />
              <el-table-column
                prop="applyDate"
                :label="$t('research.c1Propagation.columns.applyDate')"
                min-width="160"
                align="center"
              />
              <el-table-column
                prop="applyStatus"
                :label="$t('research.c1Propagation.columns.applyStatus')"
                min-width="160"
                align="center"
              >
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.applyStatus)" size="small">
                    {{ $t(`research.c1Propagation.status.${row.applyStatus}`) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('common.actions')"
                width="240"
                fixed="right"
                align="center"
              >
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small"  type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                    <el-button size="small"  type="primary" @click="handleEdit(row)" v-if="row.applyStatus === 'pending'">
                      <i class="ri-edit-line"></i>
                      <span class="btn-text">{{ $t('common.edit') }}</span>
                    </el-button>
                    <el-button  size="small"  type="danger" @click="handleDelete(row)" v-if="row.applyStatus === 'pending'">
                      <i class="ri-delete-bin-line"></i>
                      <span class="btn-text">{{ $t('common.delete') }}</span>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
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

          <!-- 移动端卡片列表 -->
          <div class="mobile-card-list mobile-only">
            <div v-if="dataList.length === 0 && !loading" class="empty-state">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('common.noData') }}</p>
            </div>
            <div v-for="item in dataList" :key="item.id" class="card">
              <div class="card-header">
                <el-tag :type="getStatusType(item.applyStatus)" size="small">
                  {{ $t(`research.c1Propagation.status.${item.applyStatus}`) }}
                </el-tag>
                <el-tag type="info" size="small">{{ getCropTypeDisplay(item.cropType) }}</el-tag>
                <el-tag v-if="item.authId" type="success" size="small">{{ item.authId }}</el-tag>
              </div>
              <h3 class="card-title">{{ item.applicantOrgName }}</h3>
              <div class="card-body">
                <div class="card-row">
                  <span class="label">{{ $t('research.c1Propagation.columns.varietyName') }}:</span>
                  <span class="value">{{ item.varietyName }}</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('research.c1Propagation.columns.applyDate') }}:</span>
                  <span class="value">{{ item.applyDate }}</span>
                </div>
              </div>
              <div class="card-footer">
                <el-button text type="primary" @click="handleView(item)">{{ $t('common.view') }}</el-button>
                <el-button text type="primary" @click="handleEdit(item)" v-if="item.applyStatus === 'pending'">{{ $t('common.edit') }}</el-button>
                <el-button text type="danger" @click="handleDelete(item)" v-if="item.applyStatus === 'pending'">{{ $t('common.delete') }}</el-button>
              </div>
            </div>

            <!-- 移动端分页 -->
            <div v-if="total > pageSize" class="mobile-pagination">
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
        </InfoCard>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getC1PropagationList, deleteC1Propagation } from '@/api/c1Propagation'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])

const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

// 数据状态
const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return types[status] || 'info'
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value,
      applyStatus: statusFilter.value
    }

    if (dateRange.value && dateRange.value.length === 2) {
      params.queryDateStart = dateRange.value[0]
      params.queryDateEnd = dateRange.value[1]
    }

    const res = await getC1PropagationList(params)
    if (res.code === 200) {
      dataList.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 处理重置
const handleReset = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  dateRange.value = []
  currentPage.value = 1
  loadData()
}

// 处理分页
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  loadData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

// CRUD 操作
const handleAdd = () => {
  router.push('/research/c1-propagation/add')
}

const handleEdit = (row) => {
  router.push(`/research/c1-propagation/edit/${row.id}`)
}

const handleView = (row) => {
  router.push(`/research/c1-propagation/detail/${row.id}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.c1Propagation.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  )
    .then(async () => {
      try {
        const res = await deleteC1Propagation([row.id])
        if (res.code === 200) {
          ElMessage.success(t('research.c1Propagation.deleteSuccess'))
          loadData()
        } else {
          ElMessage.error(res.msg || t('common.deleteFailed'))
        }
      } catch (error) {
        console.error('Failed to delete:', error)
        ElMessage.error(t('common.deleteFailed'))
      }
    })
    .catch(() => {})
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

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;

  :deep(.el-button) {
    min-width: auto;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 500;
    margin: 0 !important;

    i {
      margin-right: 4px;
      font-size: 13px;
      vertical-align: middle;
    }

    .btn-text {
      white-space: nowrap;
    }
  }
}
</style>
