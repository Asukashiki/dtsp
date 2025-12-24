<template>
  <div class="ose-release-container">
    <!-- 查询表单 -->
    <el-card class="search-card">
      <el-form :model="queryParams" :inline="true">
        <el-form-item :label="$t('inputCirculation.releaseName')">
          <el-input v-model="queryParams.releaseName" :placeholder="$t('common.pleaseInput')" @change="handleQuery" />
        </el-form-item>
<!--        <el-form-item :label="$t('inputCirculation.inputType')">
          <el-select v-model="queryParams.inputType" :placeholder="$t('common.pleaseSelect')" @change="handleQuery" clearable>
            <el-option label="Seed" value="Seed" />
            <el-option label="Fertilizer" value="Fertilizer" />
            <el-option label="Pesticide" value="Pesticide" />
          </el-select>
        </el-form-item>       -->
        <el-form-item :label="$t('inputCirculation.timeRange')">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            :start-placeholder="$t('common.startDate')"
            :end-placeholder="$t('common.endDate')"
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

    <!-- 工具栏 -->
    <el-card class="toolbar-card">
      <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>{{ $t('common.add') }}</el-button>
      <!-- <el-button type="danger" :disabled="!selectedIds.length" @click="handleDeleteBatch"><el-icon><Delete /></el-icon>{{ $t('common.batchDelete') }}</el-button> -->
    </el-card>

    <!-- 数据表格 - 桌面端 -->
    <el-card v-if="!isMobile" class="table-card">
      <el-table :data="releaseList" v-loading="loading" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="releaseId" :label="$t('inputCirculation.releaseId')" min-width="150" />
        <el-table-column prop="releaseName" :label="$t('inputCirculation.releaseName')" min-width="200" />
        <el-table-column prop="targetId" :label="$t('inputCirculation.targetId')" min-width="150" />
        <el-table-column prop="targetContact" :label="$t('inputCirculation.targetContact')" min-width="160" />
        <el-table-column prop="releaseDate" :label="$t('inputCirculation.releaseDate')" min-width="160" />
        <el-table-column prop="status" :label="$t('inputCirculation.status')" min-width="120" />
        <el-table-column :label="$t('inputCirculation.stockStatus')" min-width="140">
          <template #default="scope">
            <el-tag :type="getStockStatusTag(scope.row.stockStatus)" size="small">
              {{ getStockStatusText(scope.row.stockStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="releaseBy" :label="$t('inputCirculation.releaseBy')" min-width="160" />
        <el-table-column prop="auditBy" :label="$t('inputCirculation.auditBy')" min-width="160" />
        <el-table-column :label="$t('common.actions')" min-width="200" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleView(scope.row)">{{ $t('common.view') }}</el-button>
            <el-button type="primary" link @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
            <el-button type="danger" link @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleQuery"
        @current-change="handleQuery"
      />
    </el-card>

    <!-- 移动端卡片列表 -->
    <div v-else class="card-list">
      <el-card v-for="item in releaseList" :key="item.id" class="data-card">
        <div class="card-row"><span class="label">{{ $t('inputCirculation.releaseId') }}:</span><span>{{ item.releaseId }}</span></div>
        <div class="card-row"><span class="label">{{ $t('inputCirculation.releaseName') }}:</span><span>{{ item.releaseName }}</span></div>
        <div class="card-row"><span class="label">{{ $t('inputCirculation.releaseDate') }}:</span><span>{{ item.releaseDate }}</span></div>
        <div class="card-actions">
          <el-button type="primary" @click="handleView(item)">{{ $t('common.view') }}</el-button>
          <el-button type="primary" @click="handleEdit(item)">{{ $t('common.edit') }}</el-button>
          <el-button type="danger" @click="handleDelete(item)">{{ $t('common.delete') }}</el-button>
        </div>
      </el-card>
      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        small
        layout="prev, pager, next"
        @size-change="handleQuery"
        @current-change="handleQuery"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOseReleaseList, deleteOseRelease, getReleaseStockStatus } from '@/api/inputCirculation'

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const releaseList = ref([])
const total = ref(0)
const isMobile = ref(false)
const selectedIds = ref([])
const dateRange = ref([])

const queryParams = reactive({
  unionName: '',
  inputType: '',
  startTime: '',
  endTime: '',
  pageNum: 1,
  pageSize: 10
})

const handleQuery = async () => {
  loading.value = true
  queryParams.releaseType = 'OSE_TO_UNION'
  if (dateRange.value && dateRange.value.length === 2) {
    queryParams.startTime = dateRange.value[0]
    queryParams.endTime = dateRange.value[1]
  } else {
    queryParams.startTime = ''
    queryParams.endTime = ''
  }
  try {
    const response = await getOseReleaseList(queryParams)
    if (response.code === 200) {
      releaseList.value = response.rows || []
      total.value = response.total || 0
      // 加载出入库状态
      await loadStockStatus()
    } else {
      ElMessage.error(response.msg || t('common.queryFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
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

const handleAdd = () => {
  router.push('/input/input-circulation/ose-release/add')
}

const handleEdit = (row) => {
  router.push(`/input/input-circulation/ose-release/edit/${row.id}`)
}

const handleView = (row) => {
  router.push(`/input/input-circulation/ose-release/detail/${row.id}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(t('common.confirmDelete'), t('common.warning'), { type: 'warning' })
    const response = await deleteOseRelease(row.id)
    if (response.code === 200) {
      ElMessage.success(t('common.deleteSuccess'))
      handleQuery()
    } else {
      ElMessage.error(response.msg || t('common.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

const handleDeleteBatch = async () => {
  if (!selectedIds.value.length) return
  try {
    await ElMessageBox.confirm(t('common.confirmDelete'), t('common.warning'), { type: 'warning' })
    const response = await deleteOseRelease(selectedIds.value.join(','))
    if (response.code === 200) {
      ElMessage.success(t('common.deleteSuccess'))
      handleQuery()
    } else {
      ElMessage.error(response.msg || t('common.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  handleQuery()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.ose-release-container { padding: 20px; }
.search-card, .toolbar-card, .table-card { margin-bottom: 20px; }
.card-list { display: flex; flex-direction: column; gap: 16px; }
.data-card { padding: 16px; }
.card-row { display: flex; margin-bottom: 8px; }
.card-row .label { font-weight: bold; margin-right: 8px; min-width: 120px; }
.card-actions { margin-top: 16px; display: flex; gap: 8px; }
</style>
