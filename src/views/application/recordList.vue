<template>
  <div class="record-container">
    <div class="record-header">
      <h1>应用申请记录</h1>
      <p>查看您的应用申请历史记录</p>
    </div>

    <!-- 搜索区域 -->
    <div class="search-section">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="应用名称">
          <el-input 
            v-model="searchForm.appName" 
            placeholder="请输入应用名称" 
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" :icon="Search" color="#1C59E2" >查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div class="table-section">
      <div class="table-header">
        <span class="table-title">申请记录列表</span>
        <el-button type="primary" @click="handleAdd" :icon="Plus" color="#1C59E2" >新增</el-button>
      </div>

      <div class="table-wrapper">
        <el-table 
          :data="tableData" 
          v-loading="loading"
          border
          stripe
          class="responsive-table"
          style="width: 100%"
          :height="'100%'"
          :header-cell-style="{ background: '#f5f7fa', color: '#333', fontWeight: '600' }"
        >
        <el-table-column prop="code" label="应用编码" min-width="120" show-overflow-tooltip />
        <el-table-column prop="name" label="应用名称" min-width="140" show-overflow-tooltip />
        <el-table-column prop="shortName" label="应用简称" min-width="180" show-overflow-tooltip />
        <el-table-column prop="type" label="应用类型" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.appType === '0' ? 'primary' : 'success'" size="small">
              {{ row.appType === '0' ? '内部' : '外部' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="应用地址" min-width="180" show-overflow-tooltip />
        <el-table-column prop="classfyName" label="应用分类" width="120" align="center" />
        <el-table-column prop="potocal" label="协议类型" width="100" align="center" />
        <el-table-column prop="status" label="审核状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag 
              :type="row.status === '1' ? 'success' : row.status === '2' ? 'warning' : 'danger'" 
              size="small"
            >
              {{ getAuditStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="auditOpinion" label="审核意见" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDetail(row.id)">详情</el-button>
          </template>
        </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, prev, pager, next, sizes"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { getAppRecordList } from '@/api/application'

const router = useRouter()
const loading = ref(false)

// 搜索表单
const searchForm = reactive({
  appName: ''
})

// 表格数据
const tableData = ref([])

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 获取审核状态文本
const getAuditStatusText = (status) => {
  const statusMap = {
    '1': '已通过',
    '2': '待审核',
    '3': '审核驳回'
  }
  return statusMap[status] || '未知'
}

// 获取列表数据
const fetchTableData = async () => {
  loading.value = true
  try {
    const params = {
      limit: pagination.pageSize,
      page: pagination.currentPage,
      name: searchForm.appName || '',
    }
    const res = await getAppRecordList(params)
    if(res.code === 200) {
      tableData.value =  res.data?.data || []
      pagination.total = res.data?.count
    }
  } catch (error) {
    console.error('获取列表失败:', error)
    ElMessage.error('获取列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  fetchTableData()
}

// 重置
const handleReset = () => {
  searchForm.appName = ''
  pagination.currentPage = 1
  fetchTableData()
}

// 新增
const handleAdd = () => {
  router.push('/application/register')
}

// 查看详情
const handleDetail = (id) => {
  router.push({
    path: '/application/register',
    query: { id, mode: 'detail' }
  })
}

// 分页大小变化
const handleSizeChange = (val) => {
  pagination.pageSize = val
  fetchTableData()
}

// 当前页变化
const handleCurrentChange = (val) => {
  pagination.currentPage = val
  fetchTableData()
}

onMounted(() => {
  fetchTableData()
})
</script>

<style scoped>
.record-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  box-sizing: border-box;
  height: calc(100vh - 64px - 161px);
  /* 使用内层表格滚动，不在外层产生滚动条 */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.record-header {
  text-align: center;
  margin-bottom: 24px;
}

.record-header h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.record-header p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.search-section {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-form {
  margin: 0;
}

.table-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

.table-wrapper {
  width: 100%;
  flex: 1 1 auto;
  min-height: 0; 
  overflow: hidden; 
}

.responsive-table {
  min-width: 1000px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.pagination-section {
  display: flex;
  justify-content: right;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

/* 覆盖分页按钮主色为 #1C59E2，仅作用于本组件 */
:deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: #1C59E2;
  border-color: #1C59E2;
  color: #fff;
}
/* :deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
  color: #1C59E2;
}
:deep(.el-pagination .btn-prev:hover),
:deep(.el-pagination .btn-next:hover) {
  color: #1C59E2;
} */

/* 响应式适配 */
@media screen and (max-width: 1440px) {
  .record-container {
    max-width: 1000px;
  }
}

@media screen and (max-width: 1024px) {
  .record-container {
    padding: 15px 20px;
  }
  
  .search-section {
    padding: 15px;
  }
  
  .table-section {
    padding: 15px;
  }
  .responsive-table {
    min-width: 900px;
  }
}

@media screen and (max-width: 768px) {
  .table-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .search-form {
    display: flex;
    flex-direction: column;
  }
  
  :deep(.el-form-item) {
    margin-right: 0;
  }
  /* inline 表单在小屏下换行展示更友好 */
  :deep(.el-form--inline) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
  }
  .responsive-table {
    min-width: 800px;
  }
}

/* 大屏优化：1441px 以上移除横向滚动与最小宽度，避免出现滚动条 */
@media screen and (min-width: 1441px) {
  .table-wrapper {
    overflow-x: visible;
  }
  .responsive-table {
    min-width: auto;
  }
}
</style>
