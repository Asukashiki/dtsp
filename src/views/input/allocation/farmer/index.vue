<template>
  <div class="farmer-allocation-container">
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
          <el-button type="primary" @click="handleQuery">{{ $t('common.search') }}</el-button>
          <el-button @click="handleReset">{{ $t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 工具栏 -->
    <el-card class="toolbar-card">
      <!-- 移除了新增和批量删除按钮 -->
    </el-card>

    <!-- 数据表格 - 桌面端 -->
    <el-card v-if="!isMobile" class="table-card">
      <el-table :data="allocationList" v-loading="loading" border>
        <el-table-column prop="allocationName" :label="$t('allocation.allocationName')" min-width="200" />
        <el-table-column prop="year" :label="$t('allocation.year')" min-width="120" />
        <el-table-column prop="zoneName" :label="$t('allocation.farmer')" min-width="150" />
        <el-table-column prop="createTime" :label="$t('common.createTime')" min-width="160" />
        <el-table-column :label="$t('common.actions')" min-width="200" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleView(scope.row)">{{ $t('common.view') }}</el-button>
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
        <div class="card-row"><span class="label">{{ $t('allocation.farmer') }}:</span><span>{{ item.zoneName }}</span></div>
        <div class="card-actions">
          <el-button type="primary" @click="handleView(item)">{{ $t('common.view') }}</el-button>
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
import { ElMessage } from 'element-plus'
import { getFarmerAllocationPage } from '@/api/allocation'

const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const allocationList = ref([])
const total = ref(0)
const isMobile = ref(false)
const zoneOptions = ref([]) // 区域选项

const queryParams = reactive({
  allocationName: '',
  year: '',
  zone: '',
  level: 'farmer', // farmer level
  pageNum: 1,
  pageSize: 10
})

// 获取区域选项数据（模拟）
const getZoneOptions = async () => {
  try {
    // 这里应该调用获取区域数据的API
    // 示例数据
    zoneOptions.value = [
      { code: 'FARMER001', name: 'Farmer 1' },
      { code: 'FARMER002', name: 'Farmer 2' },
      { code: 'FARMER003', name: 'Farmer 3' }
    ]
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  }
}

const handleQuery = async () => {
  loading.value = true
  try {
    // 调用API获取列表数据
    const response = await getFarmerAllocationPage(queryParams)
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

const handleView = (row) => {
  router.push(`/input/allocation/farmer/detail/${row.id}`)
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
.farmer-allocation-container {
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