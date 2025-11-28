<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-flask-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breeding.plan.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breeding.plan.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 列表视图 -->
        <div v-if="!showForm" class="list-view">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-list-3-line"></i>
                <span>{{ $t('research.breeding.plan.list') }}</span>
              </div>

              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breeding.plan.add') }}
              </el-button>
            </div>
            <div class="card-body">
              <!-- 搜索筛选区 -->
              <div class="search-section">
                <el-input
                  v-model="searchQuery"
                  :placeholder="$t('research.breeding.plan.searchPlaceholder')"
                  clearable
                  class="search-input"
                >
                  <template #prefix>
                    <i class="ri-search-line"></i>
                  </template>
                </el-input>
                <el-select
                  v-model="filterYear"
                  :placeholder="$t('research.breeding.plan.filterByYear')"
                  clearable
                  class="filter-select"
                >
                  <el-option :label="$t('research.breeding.plan.allYears')" value="" />
                  <el-option label="2025" value="2025" />
                  <el-option label="2024" value="2024" />
                </el-select>
                <el-select
                  v-model="filterCrop"
                  :placeholder="$t('research.breeding.plan.filterByCrop')"
                  clearable
                  class="filter-select"
                >
                  <el-option :label="$t('research.breeding.plan.allCrops')" value="" />
                  <el-option v-for="crop in cropTypes" :key="crop.value" :label="crop.label" :value="crop.value" />
                </el-select>
                <el-select
                  v-model="filterStatus"
                  :placeholder="$t('research.breeding.plan.filterByStatus')"
                  clearable
                  class="filter-select"
                >
                  <el-option :label="$t('research.breeding.plan.allStatus')" value="" />
                  <el-option v-for="status in planStatusList" :key="status.value" :label="status.label" :value="status.value" />
                </el-select>
              </div>

              <!-- PC端表格 -->
              <div class="table-wrapper pc-only">
                <el-table :data="filteredList" stripe style="width: 100%" v-loading="loading">
                  <el-table-column prop="planName" :label="$t('research.breeding.plan.columns.planName')" min-width="150" />
                  <el-table-column prop="batchId" :label="$t('research.breeding.plan.columns.batchId')" min-width="150" />
                  <el-table-column prop="breedingYear" :label="$t('research.breeding.plan.columns.breedingYear')" min-width="100" />
                  <el-table-column prop="cropType" :label="$t('research.breeding.plan.columns.cropType')" min-width="100" />
                  <el-table-column prop="varietyName" :label="$t('research.breeding.plan.columns.varietyName')" min-width="150" />
                  <el-table-column prop="propagationLevel" :label="$t('research.breeding.plan.columns.propagationLevel')" min-width="130" />
                  <el-table-column prop="personInCharge" :label="$t('research.breeding.plan.columns.personInCharge')" min-width="120" />
                  <el-table-column prop="status" :label="$t('research.breeding.plan.columns.status')" min-width="100">
                    <template #default="{ row }">
                      <el-tag :type="getStatusTagType(row.status)">
                        {{ getStatusLabel(row.status) }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('research.breeding.plan.columns.actions')" width="265" fixed="right" >
                    <template #default="{ row }">
                      <div class="action-buttons">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>
                          {{ $t('common.view') }}
                        </el-button>
                        <el-button link type="primary" @click="handleEdit(row)">
                          <i class="ri-edit-line"></i>
                          {{ $t('common.edit') }}
                        </el-button>
                        <el-button link type="danger" @click="handleDelete(row)">
                          <i class="ri-delete-bin-line"></i>
                          {{ $t('common.delete') }}
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
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                  />
                </div>
              </div>

              <!-- 移动端卡片 -->
              <div class="mobile-card-list mobile-only">
                <div v-for="item in filteredList" :key="item.planId" class="mobile-card">
                  <div class="mobile-card-header">
                    <div class="mobile-card-title">
                      <i class="ri-flask-line"></i>
                      <span>{{ item.planName }}</span>
                    </div>
                    <el-tag :type="getStatusTagType(item.status)" size="small">
                      {{ getStatusLabel(item.status) }}
                    </el-tag>
                  </div>
                  <div class="mobile-card-body">
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('research.breeding.plan.columns.batchId') }}:</span>
                      <span class="value">{{ item.batchId }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('research.breeding.plan.columns.cropType') }}:</span>
                      <span class="value">{{ item.cropType }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('research.breeding.plan.columns.varietyName') }}:</span>
                      <span class="value">{{ item.varietyName }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('research.breeding.plan.columns.propagationLevel') }}:</span>
                      <span class="value">{{ item.propagationLevel }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('research.breeding.plan.columns.personInCharge') }}:</span>
                      <span class="value">{{ item.personInCharge }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('research.breeding.plan.columns.startDate') }}:</span>
                      <span class="value">{{ item.startDate }}</span>
                    </div>
                  </div>
                  <div class="mobile-card-actions">
                    <el-button type="primary" size="small" @click="handleView(item)">
                      {{ $t('common.view') }}
                    </el-button>
                    <el-button size="small" @click="handleEdit(item)">
                      {{ $t('common.edit') }}
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(item)">
                      {{ $t('common.delete') }}
                    </el-button>
                  </div>
                </div>

                <!-- 移动端分页 -->
                <div class="pagination-wrapper mobile-pagination">
                  <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50]"
                    :total="total"
                    layout="total, prev, pager, next"
                    small
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                  />
                </div>
              </div>

              <!-- 空状态 -->
              <el-empty v-if="filteredList.length === 0" :description="$t('home.noData')" />
            </div>
          </div>
        </div>

        <!-- 表单视图 -->
        <BreedingPlanForm
          v-else
          :plan-data="currentPlan"
          :is-view="isView"
          @cancel="handleCancel"
          @success="handleSuccess"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import BreedingPlanForm from './components/BreedingPlanForm.vue'
import { getBreedingPlanList, removeBreedingPlan } from '@/api/enterprise'
import { mockCropTypes, mockPlanStatus } from '@/mock/breedingData'

const { t } = useI18n()

// 数据状态
const loading = ref(false)
const planList = ref([])
const showForm = ref(false)
const isView = ref(false)
const currentPlan = ref(null)

// 筛选条件
const searchQuery = ref('')
const filterYear = ref('')
const filterCrop = ref('')
const filterStatus = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 辅助数据
const cropTypes = ref(mockCropTypes)
const planStatusList = computed(() => {
  return mockPlanStatus.map(item => ({
    value: item.value,
    label: t(`research.breeding.plan.status.${item.value}`)
  }))
})

// 过滤后的列表
const filteredList = computed(() => {
  const filtered = planList.value.filter(item => {
    const matchSearch = !searchQuery.value ||
      item.planName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.batchId.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchYear = !filterYear.value || String(item.breedingYear) === filterYear.value
    const matchCrop = !filterCrop.value || item.cropType === filterCrop.value
    const matchStatus = !filterStatus.value || item.status === filterStatus.value

    return matchSearch && matchYear && matchCrop && matchStatus
  })

  total.value = filtered.length

  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filtered.slice(start, end)
})

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page
}

// 处理每页条数变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

// 获取状态标签类型
const getStatusTagType = (status) => {
  const typeMap = {
    planning: 'info',
    ongoing: 'warning',
    completed: 'success',
    cancelled: 'danger'
  }
  return typeMap[status] || 'info'
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  return t(`research.breeding.plan.status.${status}`)
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }

    // 添加筛选条件
    if (filterYear.value) params.breedingYear = filterYear.value
    if (filterCrop.value) params.cropType = filterCrop.value

    const res = await getBreedingPlanList(params)

    if (res.code === 200) {
      planList.value = res.rows || []
      total.value = res.total || 0
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
      planList.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('Failed to load breeding plans:', error)
    ElMessage.error(t('common.loadFailed'))
    planList.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 新增
const handleAdd = () => {
  currentPlan.value = null
  isView.value = false
  showForm.value = true
}

// 查看
const handleView = (row) => {
  currentPlan.value = { ...row }
  isView.value = true
  showForm.value = true
}

// 编辑
const handleEdit = (row) => {
  currentPlan.value = { ...row }
  isView.value = false
  showForm.value = true
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.breeding.plan.deleteConfirm'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    loading.value = true
    const res = await removeBreedingPlan(row.planId)

    if (res.code === 200) {
      ElMessage.success(t('research.breeding.plan.deleteSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete breeding plan:', error)
      ElMessage.error(t('common.failed'))
    }
  } finally {
    loading.value = false
  }
}

// 取消表单
const handleCancel = () => {
  showForm.value = false
  currentPlan.value = null
}

// 表单提交成功
const handleSuccess = () => {
  showForm.value = false
  currentPlan.value = null
  loadData()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* 页面容器 */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  /* max-width: 1400px; */
  margin: 0 auto;
}

/* 页面头部 */
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

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 卡片 */
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

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 250px;
}

.filter-select {
  width: 180px;
}

/* 表格 */
.table-wrapper {
  margin-top: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
}

/* 移动端卡片列表 */
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

.mobile-card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.mobile-card-actions .el-button {
  flex: 1;
}

/* 响应式 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

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

  .search-input,
  .filter-select {
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
