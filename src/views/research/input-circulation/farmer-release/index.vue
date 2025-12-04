<template>
  <div class="farmer-release-container">
    <!-- 查询表单 -->
    <el-card class="search-card">
      <el-form :model="queryParams" :inline="true">
        <el-form-item :label="t('woredaName')">
          <el-input
            v-model="queryParams.woredaName"
            :placeholder="t('pleaseEnterWoredaName')"
            clearable
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="t('farmerName')">
          <el-input
            v-model="queryParams.farmerName"
            :placeholder="t('pleaseEnterFarmerName')"
            clearable
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="t('farmerId')">
          <el-input
            v-model="queryParams.farmerId"
            :placeholder="t('pleaseEnterFarmerId')"
            clearable
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="t('year')">
          <el-date-picker
            v-model="queryParams.year"
            type="year"
            :placeholder="t('pleaseSelect')"
            value-format="YYYY"
            clearable
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="t('receiveStatus')">
          <el-select
            v-model="queryParams.receiveStatus"
            :placeholder="t('pleaseSelect')"
            clearable
            @change="handleQuery"
          >
            <el-option label="pending" value="pending" />
            <el-option label="noReceived" value="noReceived" />
            <el-option label="received" value="received" />
          </el-select>
        </el-form-item>
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
      <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
        <el-icon><Delete /></el-icon>
        {{ t('batchDelete') }}
      </el-button>
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
        <el-table-column prop="farmerId" :label="t('farmerId')" width="120" />
        <el-table-column prop="farmerName" :label="t('farmerName')" width="120" />
        <el-table-column prop="farmerPhone" :label="t('farmerPhone')" width="130" />
        <el-table-column prop="receiveStatus" :label="t('receiveStatus')" width="100">
          <template #default="{ row }">
            <el-tag :type="row.receiveStatus === 'received' ? 'success' : 'warning'">
              {{ row.receiveStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="releaseYear" :label="t('releaseYear')" width="100" />
        <el-table-column prop="releaseDate" :label="t('releaseDate')" width="180">
          <template #default="{ row }">
            {{ formatDateTime(row.releaseDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="releaseBy" :label="t('releaseBy')" width="120" />
        <el-table-column prop="releaseOrg" :label="t('releaseOrg')" min-width="150" />
        <el-table-column :label="t('actions')" width="220" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDetail(row.id)">{{ t('detail') }}</el-button>
            <el-button link type="primary" @click="handleEdit(row.id)">{{ t('edit') }}</el-button>
            <el-button link type="danger" @click="handleDelete(row.id)">{{ t('delete') }}</el-button>
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
          <span class="card-title">{{ item.farmerName }}</span>
          <el-tag :type="item.receiveStatus === 'received' ? 'success' : 'warning'">
            {{ item.receiveStatus }}
          </el-tag>
        </div>
        <div class="card-content">
          <div class="info-row">
            <span class="label">{{ t('releaseId') }}:</span>
            <span>{{ item.releaseId }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ t('farmerId') }}:</span>
            <span>{{ item.farmerId }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ t('farmerPhone') }}:</span>
            <span>{{ item.farmerPhone }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ t('releaseDate') }}:</span>
            <span>{{ formatDateTime(item.releaseDate) }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ t('releaseOrg') }}:</span>
            <span>{{ item.releaseOrg }}</span>
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
import { getFarmerReleaseList, deleteFarmerRelease } from '@/api/inputCirculation'
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
  farmerName: '',
  farmerId: '',
  year: null,
  receiveStatus: '',
  startTime: '',
  endTime: '',
  pageNum: 1,
  pageSize: 10
})

// 查询列表
const handleQuery = () => {
  if (dateRange.value && dateRange.value.length === 2) {
    queryParams.startTime = dateRange.value[0]
    queryParams.endTime = dateRange.value[1]
  } else {
    queryParams.startTime = ''
    queryParams.endTime = ''
  }

  loading.value = true
  getFarmerReleaseList(queryParams)
    .then(response => {
      releaseList.value = response.rows || []
      total.value = response.total || 0
    })
    .finally(() => {
      loading.value = false
    })
}

// 重置查询
const handleReset = () => {
  queryParams.woredaName = ''
  queryParams.farmerName = ''
  queryParams.farmerId = ''
  queryParams.year = null
  queryParams.receiveStatus = ''
  dateRange.value = []
  queryParams.pageNum = 1
  handleQuery()
}

// 新增
const handleAdd = () => {
  router.push('/research/input-circulation/farmer-release/add')
}

// 编辑
const handleEdit = (id) => {
  router.push(`/research/input-circulation/farmer-release/edit/${id}`)
}

// 详情
const handleDetail = (id) => {
  router.push(`/research/input-circulation/farmer-release/detail/${id}`)
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(t('deleteConfirm'), t('warning'), {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    type: 'warning'
  }).then(() => {
    deleteFarmerRelease(id).then(() => {
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
    deleteFarmerRelease(selectedIds.value.join(',')).then(() => {
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
.farmer-release-container {
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
