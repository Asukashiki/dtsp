<template>
  <div class="woreda-allocation-container">
    <!-- 查询表单 -->
    <el-card class="search-card">
      <el-form :model="queryParams" :inline="true">
        <el-form-item :label="$t('allocation.allocationName')">
          <el-input v-model="queryParams.allocationName" :placeholder="$t('common.pleaseInput')" @change="handleQuery" />
        </el-form-item>
        <el-form-item :label="$t('allocation.year')">
          <el-date-picker
            v-model="queryParams.year"
            type="year"
            value-format="YYYY"
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
      <el-button type="danger" :disabled="!selectedIds.length" @click="handleDeleteBatch"><el-icon><Delete /></el-icon>{{ $t('common.batchDelete') }}</el-button>
    </el-card>

    <!-- 数据表格 - 桌面端 -->
    <el-card v-if="!isMobile" class="table-card">
      <el-table :data="allocationList" v-loading="loading" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="allocationName" :label="$t('allocation.allocationName')" min-width="200" />
        <el-table-column prop="year" :label="$t('allocation.year')" min-width="120" />
        <el-table-column prop="zoneName" :label="$t('allocation.woreda')" min-width="150" />
        <el-table-column prop="createTime" :label="$t('common.createTime')" min-width="160" />
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
      <el-card v-for="item in allocationList" :key="item.id" class="data-card">
        <div class="card-row"><span class="label">{{ $t('allocation.allocationName') }}:</span><span>{{ item.allocationName }}</span></div>
        <div class="card-row"><span class="label">{{ $t('allocation.year') }}:</span><span>{{ item.year }}</span></div>
        <div class="card-row"><span class="label">{{ $t('allocation.zone') }}:</span><span>{{ item.zoneName }}</span></div>
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
// 假设会有相应的API接口
import { getWoredaAllocationList, deleteWoredaAllocation } from '@/api/allocation'

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const allocationList = ref([])
const total = ref(0)
const isMobile = ref(false)
const selectedIds = ref([])
const zoneOptions = ref([]) // 区域选项

const queryParams = reactive({
  allocationName: '',
  year: '',
  zone: '',
  level: 'woreda', // woreda level
  pageNum: 1,
  pageSize: 10
})

// 获取区域选项数据（模拟）
const getZoneOptions = async () => {
  try {
    // 这里应该调用获取区域数据的API
    // 示例数据
    zoneOptions.value = [
      { code: 'ZONE001', name: 'Zone 1' },
      { code: 'ZONE002', name: 'Zone 2' },
      { code: 'ZONE003', name: 'Zone 3' }
    ]
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  }
}

const handleQuery = async () => {
  loading.value = true
  try {
    // 调用API获取列表数据
    const response = await getWoredaAllocationList(queryParams)
    if (response.code === 200) {
      allocationList.value = response.data.records || []
      total.value = response.data.total || 0
    } else {
      ElMessage.error(response.msg || t('common.queryFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

// 重置查询
const handleReset = () => {
  queryParams.allocationName = ''
  queryParams.year = ''
  queryParams.zone = ''
  queryParams.pageNum = 1
  handleQuery()
}

const handleAdd = () => {
  router.push('/input/allocation/woreda/add')
}

const handleEdit = (row) => {
  router.push(`/input/allocation/woreda/edit/${row.id}`)
}

const handleView = (row) => {
  router.push(`/input/allocation/woreda/detail/${row.id}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(t('common.confirmDelete'), t('common.warning'), { type: 'warning' })
    const response = await deleteWoredaAllocation(row.id)
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
    const response = await deleteWoredaAllocation(selectedIds.value.join(','))
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

// 检测是否为移动端
const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  handleQuery()
  getZoneOptions()
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>

<style scoped>
.woreda-allocation-container {
  padding: 20px;
}
.search-card {
  margin-bottom: 20px;
}
.toolbar-card {
  margin-bottom: 20px;
}
.table-card {
  margin-bottom: 20px;
}
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}
.data-card .card-row {
  display: flex;
  margin-bottom: 8px;
}
.data-card .card-row .label {
  font-weight: bold;
  margin-right: 8px;
  min-width: 100px;
}
.data-card .card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}
</style>