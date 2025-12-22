<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-leaf-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">性状审核</h1>
            <p class="page-subtitle">对提交的性状数据进行审核管理</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>性状审核列表</span>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <div class="search-item">
                <span class="search-label">批次ID:</span>
                <el-select
                    v-model="queryParams.batchId"
                    placeholder="请选择"
                    clearable
                    class="filter-select"
                >
                  <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">试验ID:</span>
                <el-select
                    v-model="queryParams.trialId"
                    placeholder="请选择"
                    clearable
                    class="filter-select"
                >
                  <el-option v-for="item in trialOptions" :key="item.trialId" :label="item.trialId" :value="item.trialId" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">生育期:</span>
                <el-select
                    v-model="queryParams.growthStage"
                    placeholder="请选择"
                    clearable
                    class="filter-select"
                >
                  <el-option v-for="item in options.growth_cycle || []" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">审核状态:</span>
                <el-select
                    v-model="queryParams.auditStatus"
                    placeholder="请选择"
                    clearable
                    class="filter-select"
                >
                  <el-option label="待审核" value="pending" />
                  <el-option label="已通过" value="approved" />
                  <el-option label="已驳回" value="rejected" />
                </el-select>
              </div>
              <div class="search-actions">
                <el-button type="primary" @click="handleQuery">
                  <i class="ri-search-line"></i>查询
                </el-button>
                <el-button @click="handleReset">
                  <i class="ri-refresh-line"></i>重置
                </el-button>
              </div>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading">
                <el-table-column prop="recordId" label="记录ID" min-width="160" show-overflow-tooltip />
                <el-table-column prop="plotId" label="地块ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" label="试验ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="batchId" label="批次ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="observationDate" label="观测日期" min-width="160" />
                <el-table-column prop="growthStage" label="生育期" min-width="120">
                  <template #default="{ row }">
                    {{ getLabelByValue('growth_cycle', row.growthStage) || row.growthStage }}
                  </template>
                </el-table-column>
                <el-table-column prop="traitCount" label="性状数量" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag type="success">{{ row.traitCount || 0 }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="审核状态" min-width="140">
                  <template #default="{ row }">
                    <el-tag :type="getAuditStatusType(row.auditStatus)">
                      {{ row.auditStatus === 'pending' ? '待审核' : row.auditStatus === 'approved' ? '已通过' : '已驳回' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="createBy" label="提交人" min-width="120" show-overflow-tooltip />
                <el-table-column prop="createTime" label="提交时间" min-width="160" />
                <el-table-column label="操作" width="200" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>查看
                      </el-button>
                      <el-button
                          v-if="row.auditStatus === 'pending'"
                          link
                          type="success"
                          @click="handleAudit(row)"
                      >
                        <i class="ri-check-line"></i>审核
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-wrapper">
                <el-pagination
                    v-model:current-page="queryParams.pageNum"
                    v-model:page-size="queryParams.pageSize"
                    :page-sizes="[10, 20, 50]"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="getList"
                    @current-change="getList"
                />
              </div>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in dataList" :key="item.recordId" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-plant-line"></i>
                    <span>{{ item.recordId }}</span>
                  </div>
                  <el-tag :type="getAuditStatusType(item.auditStatus)" size="small">
                    {{ item.auditStatus === 'pending' ? '待审核' : item.auditStatus === 'approved' ? '已通过' : '已驳回' }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">地块ID:</span>
                    <span class="value">{{ item.plotId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">观测日期:</span>
                    <span class="value">{{ item.observationDate }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">生育期:</span>
                    <span class="value">{{ getLabelByValue('growth_cycle', item.growthStage) || item.growthStage }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">性状数量:</span>
                    <span class="value">{{ item.traitCount || 0 }}</span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <el-button size="small" @click="handleView(item)">
                    <i class="ri-eye-line"></i>查看
                  </el-button>
                  <el-button
                      v-if="item.auditStatus === 'pending'"
                      size="small"
                      type="success"
                      @click="handleAudit(item)"
                  >
                    <i class="ri-check-line"></i>审核
                  </el-button>
                </div>
              </div>

              <div class="pagination-wrapper">
                <el-pagination
                    v-model:current-page="queryParams.pageNum"
                    v-model:page-size="queryParams.pageSize"
                    :total="total"
                    layout="prev, pager, next"
                    small
                    @current-change="getList"
                />
              </div>
            </div>

            <!-- 空状态 -->
            <el-empty v-if="dataList.length === 0 && !loading" description="暂无数据" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 替换为你的性状审核接口（需自行实现）
import { getAgronomicTraitAuditList, getBatchOptions, getTrialOptions } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { options, getLabelByValue } = useDict(['growth_cycle'])

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const batchOptions = ref([])
const trialOptions = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  batchId: '',
  trialId: '',
  growthStage: '',
  auditStatus: '' // 审核状态：pending(待审核)、approved(已通过)、rejected(已驳回)
})

// 审核状态标签类型映射（和数据集审核页面一致）
const getAuditStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 获取性状审核列表
const getList = async () => {
  loading.value = true
  try {
    const res = await getAgronomicTraitAuditList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('获取性状审核列表失败:', error)
    ElMessage.error('加载数据失败，请重试')
  } finally {
    loading.value = false
  }
}

// 获取批次选项
const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

// 获取试验选项
const loadTrialOptions = async () => {
  try {
    const res = await getTrialOptions()
    trialOptions.value = res.data || []
  } catch (error) {
    console.error('获取试验选项失败:', error)
  }
}

// 搜索查询
const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

// 重置筛选条件
const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.batchId = ''
  queryParams.trialId = ''
  queryParams.growthStage = ''
  queryParams.auditStatus = ''
  getList()
}

// 查看详情
const handleView = (row) => {
  router.push({
    name: 'TraitAuditDetail', // 替换为你的性状审核详情页路由名称
    params: { id: row.recordId }
  })
}

// 进入审核页面
const handleAudit = (row) => {
  router.push({
    name: 'TraitAuditReview', // 替换为你的性状审核操作页路由名称
    params: { id: row.recordId }
  })
}

onMounted(() => {
  loadBatchOptions()
  loadTrialOptions()
  getList()
})
</script>

<!-- 完全复用数据集审核页面的原生CSS，去掉SCSS相关配置 -->
<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.info-card {
  background: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8f5e9;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

/* 搜索区域样式（适配性状审核的搜索项结构，样式和前者一致） */
.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.search-label {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  font-weight: 500;
}

.filter-select {
  width: 180px;
  flex-shrink: 0;
}

.search-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.table-wrapper {
  margin-top: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
}

.mobile-card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.mobile-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.mobile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  flex: 1;
}

.mobile-card-title i {
  font-size: 20px;
  flex-shrink: 0;
}

.mobile-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-card-row {
  display: flex;
  font-size: 14px;
  line-height: 1.6;
}

.mobile-card-row .label {
  color: #666;
  min-width: 100px;
  flex-shrink: 0;
}

.mobile-card-row .value {
  color: #333;
  font-weight: 500;
}

.mobile-card-footer {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.mobile-card-footer .el-button {
  flex: 1;
}

.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

/* 响应式适配（完全和数据集审核页面一致） */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .content-wrapper {
    border-radius: 12px;
  }

  .card-header {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .card-body {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-item {
    width: 100%;
  }

  .filter-select {
    width: 100%;
    flex: 1;
  }

  .search-actions {
    width: 100%;
  }

  .search-actions .el-button {
    flex: 1;
    width: 100%;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>