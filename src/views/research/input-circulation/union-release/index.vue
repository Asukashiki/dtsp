<template>
  <div class="union-release-container">
    <!-- 查询表单 -->
    <el-card class="search-card">
      <el-form :model="queryParams" :inline="true">
        <el-form-item :label="t('releaseName')">
          <el-input
            v-model="queryParams.releaseName"
            :placeholder="t('common.pleaseInput')"
            clearable
            @change="handleQuery"
          />
        </el-form-item>
<!--        <el-form-item :label="t('inputType')">
          <el-select
            v-model="queryParams.inputType"
            :placeholder="t('pleaseSelectInputType')"
            clearable
            @change="handleQuery"
          >
            <el-option label="化肥" value="化肥" />
            <el-option label="农药" value="农药" />
          </el-select>
        </el-form-item>-->
        <el-form-item :label="t('timeRange')">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            :start-placeholder="t('startDate')"
            :end-placeholder="t('endDate')"
            value-format="YYYY-MM-DD"
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">{{ t('search') }}</el-button>
          <el-button @click="handleReset">{{ t('reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮 -->
    <el-card class="toolbar-card">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        {{ t('add') }}
      </el-button>
      <!-- <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
        <el-icon><Delete /></el-icon>
        {{ t('batchDelete') }}
      </el-button> -->
    </el-card>

    <!-- 桌面端表格 -->
    <el-card v-if="!isMobile" class="table-card">
      <el-table
        :data="releaseList"
        v-loading="loading"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="releaseId" :label="t('releaseId')" min-width="150" />
        <el-table-column prop="releaseName" :label="t('releaseName')" min-width="180" />
        <el-table-column prop="targetId" :label="t('targetWoreda')" min-width="150" />
<!--        <el-table-column prop="releaseYear" :label="t('releaseYear')" width="150" />-->
        <el-table-column prop="releaseDate" :label="t('releaseDate')" width="180">
          <template #default="{ row }">
            {{ formatDateTime(row.releaseDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('inputCirculation.status')" width="120" />
        <el-table-column :label="$t('inputCirculation.stockStatus')" min-width="140">
          <template #default="scope">
            <el-tag :type="getStockStatusTag(scope.row.stockStatus)" size="small">
              {{ getStockStatusText(scope.row.stockStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="releaseBy" :label="t('releaseBy')" width="120" />
        <el-table-column :label="t('actions')" width="280" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDetail(row.id)">{{ t('common.view') }}</el-button>
            <el-button link type="primary" @click="handleEdit(row.id)">{{ t('common.edit') }}</el-button>
            <el-button link type="danger" @click="handleDelete(row.id)">{{ t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleQuery"
        @current-change="handleQuery"
      />
    </el-card>

    <!-- 移动端卡片列表 -->
    <div v-else class="card-list">
      <el-card v-for="item in releaseList" :key="item.id" class="mobile-card">
        <div class="card-header">
          <span class="card-title">{{ item.releaseName }}</span>
          <el-tag type="success">{{ item.releaseYear }}</el-tag>
        </div>
        <div class="card-content">
          <div class="info-row">
            <span class="label">{{ t('releaseId') }}:</span>
            <span>{{ item.releaseId }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ t('targetWoreda') }}:</span>
            <span>{{ item.targetId }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ t('releaseDate') }}:</span>
            <span>{{ formatDateTime(item.releaseDate) }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ t('releaseBy') }}:</span>
            <span>{{ item.releaseBy }}</span>
          </div>
        </div>
        <div class="card-actions">
          <el-button size="small" @click="handleDetail(item.id)">{{ t('detail') }}</el-button>
          <el-button size="small" type="primary" @click="handleEdit(item.id)">{{ t('edit') }}</el-button>
          <el-button size="small" type="danger" @click="handleDelete(item.id)">{{ t('delete') }}</el-button>
        </div>
      </el-card>

      <!-- 移动端分页 -->
      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, prev, pager, next"
        @size-change="handleQuery"
        @current-change="handleQuery"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import { getUnionReleaseList, deleteUnionRelease, getReleaseStockStatus } from '@/api/inputCirculation'
import { useResponsive } from '@/hooks/useResponsive'

const router = useRouter()
const { t } = useI18n()
const { isMobile } = useResponsive()

const loading = ref(false)
const releaseList = ref([])
const total = ref(0)
const selectedIds = ref([])
const dateRange = ref([])

const queryParams = reactive({
  woredaName: '',
  inputType: '',
  startTime: '',
  endTime: '',
  pageNum: 1,
  pageSize: 10
})

// 查询列表
const handleQuery = () => {
  queryParams.releaseType = 'UNION_TO_WOREDA'
  if (dateRange.value && dateRange.value.length === 2) {
    queryParams.startTime = dateRange.value[0]
    queryParams.endTime = dateRange.value[1]
  } else {
    queryParams.startTime = ''
    queryParams.endTime = ''
  }

  loading.value = true
  getUnionReleaseList(queryParams)
    .then(async response => {
      releaseList.value = response.rows || []
      total.value = response.total || 0
      // 加载出入库状态
      await loadStockStatus()
    })
    .finally(() => {
      loading.value = false
    })
}

// 加载出入库状态
const loadStockStatus = async () => {
  if (releaseList.value.length === 0) return
  const releaseIds = releaseList.value.map(item => item.releaseId).join(',')
  try {
    const response = await getReleaseStockStatus(releaseIds)
    if (response.code === 200 && response.data) {
      releaseList.value.forEach(item => {
        item.stockStatus = response.data[item.releaseId] || 'notProcessed'
      })
    }
  } catch (error) {
    console.error('Failed to load stock status:', error)
  }
}

// 获取出入库状态样式
const getStockStatusTag = (status) => {
  const map = {
    notProcessed: 'info',
    outPending: 'warning',
    outCompleted: 'success',
    notFound: 'danger'
  }
  return map[status] || 'info'
}

// 获取出入库状态文本
const getStockStatusText = (status) => {
  return t(`inputCirculation.stockStatus_${status || 'notProcessed'}`)
}

// 重置查询
const handleReset = () => {
  queryParams.releaseName = ''
  queryParams.inputType = ''
  dateRange.value = []
  queryParams.pageNum = 1
  handleQuery()
}

// 新增
const handleAdd = () => {
  router.push('/input/input-circulation/union-release/add')
}

// 编辑
const handleEdit = (id) => {
  router.push(`/input/input-circulation/union-release/edit/${id}`)
}

// 详情
const handleDetail = (id) => {
  router.push(`/input/input-circulation/union-release/detail/${id}`)
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(t('common.deleteConfirm'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning'
  }).then(() => {
    deleteUnionRelease(id).then(() => {
      ElMessage.success(t('deleteSuccess'))
      handleQuery()
    })
  })
}

// 批量删除
const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning(t('pleaseSelectData'))
    return
  }
  ElMessageBox.confirm(t('batchDeleteConfirm'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning'
  }).then(() => {
    deleteUnionRelease(selectedIds.value.join(',')).then(() => {
      ElMessage.success(t('deleteSuccess'))
      handleQuery()
    })
  })
}

// 表格选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

// 格式化日期时间
const formatDateTime = (dateTime) => {
  if (!dateTime) return ''
  return dateTime.replace('T', ' ')
}

onMounted(() => {
  handleQuery()
})
</script>

<style scoped lang="scss">
.union-release-container {
  padding: 20px;

  .search-card,
  .toolbar-card,
  .table-card {
    margin-bottom: 20px;
  }

  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  // 移动端样式
  .card-list {
    .mobile-card {
      margin-bottom: 16px;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid #ebeef5;

        .card-title {
          font-weight: bold;
          font-size: 16px;
        }
      }

      .card-content {
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px dashed #ebeef5;

          .label {
            color: #909399;
            font-weight: 500;
          }
        }
      }

      .card-actions {
        margin-top: 12px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    }

    .el-pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
