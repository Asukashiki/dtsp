<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-shopping-cart-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('demandInquiry.title') }}</h1>
            <p class="page-subtitle">{{ $t('demandInquiry.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 面包屑导航 -->
      <div v-if="breadcrumbItems.length > 0" class="breadcrumb-wrapper">
        <div class="breadcrumb-container">
          <!-- 所有层级 -->
          <div
              v-for="(item, index) in breadcrumbItems"
              :key="index"
              class="breadcrumb-item"
              :class="{ 'active': index === breadcrumbItems.length - 1 }"
          >
            <div class="breadcrumb-content">
              <i v-if="index === 0" class="ri-home-line breadcrumb-icon"></i>
              <i v-else-if="index === breadcrumbItems.length - 1" class="ri-folder-open-line breadcrumb-icon"></i>
              <i v-else class="ri-folder-line breadcrumb-icon"></i>
              <span class="breadcrumb-text">{{ item.name }}</span>
            </div>
            <div v-if="index < breadcrumbItems.length - 1" class="breadcrumb-separator">
              <i class="ri-arrow-right-s-line"></i>
            </div>
          </div>
        </div>

        <!-- 路径文本显示（移动端） -->
        <div v-if="isMobile" class="breadcrumb-path-text">
          {{ currentDrillPath }}
        </div>
      </div>

      <!-- 搜索区域 -->
      <div class="search-wrapper">
        <el-form :model="searchForm" inline @submit.prevent="handleSearch" class="search-form">
          <el-form-item :label="$t('demandInquiry.year')">
            <el-date-picker
                v-model="searchForm.year"
                type="year"
                :placeholder="$t('demandInquiry.selectYear')"
                value-format="YYYY"
                clearable
            />
          </el-form-item>
          <el-form-item :label="$t('demandInquiry.status')">
            <el-select
                v-model="searchForm.status"
                :placeholder="$t('demandInquiry.selectStatus')"
                clearable
            >
              <el-option :label="$t('demandInquiry.pending')" value="1" />
              <el-option :label="$t('demandInquiry.approved')" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item class="btn-group">
            <el-button type="primary" @click="handleSearch">
              <i class="ri-search-line"></i>
              {{ $t('demandInquiry.search') }}
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              {{ $t('demandInquiry.reset') }}
            </el-button>
            <!-- 返回按钮 -->
            <el-button
                v-if="showBackBtn"
                type="default"
                @click="resetDrill"
            >
              <i class="ri-arrow-left-line"></i>
              {{ $t('demandInquiry.backToUpper') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <!-- 统一表格 -->
          <div class="table-wrapper">
            <el-table
                v-loading="loading"
                :data="tableData"
                stripe
                empty-text=""
                row-key="id"
                size="small"
            >
              <el-table-column
                  prop="year"
                  :label="$t('demandInquiry.year')"
                  min-width="80"
                  align="center"
              />
              <el-table-column
                  prop="sourceName"
                  :label="$t('demandInquiry.currentUnit')"
                  min-width="120"
              >
                <template #default="{ row }">
                  <div style="display: flex; align-items: center; gap: 8px">
                    <span
                        :class="row.level === '0' ? 'unit-normal' : 'unit-link'"
                        @click="row.level !== '0' && handleUnitDrill(row.sourceCode, row.sourceName, row.year)"
                    >
      {{ row.sourceName }}
    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="status"
                  :label="$t('demandInquiry.status')"
                  min-width="100"
                  align="center"
              >
                <template #default="{ row }">
                  <el-tag :type="row.status === '1' ? 'warning' : 'success'">
                    {{ row.status === '1' ? $t('demandInquiry.pending') : $t('demandInquiry.approved') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  prop="creator"
                  :label="$t('demandInquiry.creator')"
                  min-width="100"
                  align="center"
              />
              <el-table-column
                  prop="createTime"
                  :label="$t('demandInquiry.createTime')"
                  min-width="140"
                  align="center"
              />
              <el-table-column
                  :label="$t('demandInquiry.actions')"
                  fixed="right"
                  width="100"
                  align="center"
              >
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button link type="info" @click="handleDetail(row)" size="small">
                      <i class="ri-list-check"></i>
                      {{ $t('demandInquiry.viewDetail') }}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 分页 -->
          <div v-if="pagination.total > 0" class="pagination-wrapper">
            <el-pagination
                :current-page="pagination.currentPage"
                :page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                background
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
          </div>

          <!-- 空状态 -->
          <el-empty
              v-if="tableData.length === 0 && !loading"
              :description="$t('demandInquiry.noData')"
          />
        </div>
      </div>
    </div>

    <!-- 详情对话框 -->
    <el-dialog
        v-model="detailDialogVisible"
        :title="$t('demandInquiry.detailTitle')"
        width="95%"
        top="2vh"
        draggable
    >
      <div class="detail-header" v-loading="detailLoading">
        <el-descriptions
            :column="isMobile ? 1 : 3"
            border
            :size="isMobile ? 'small' : 'default'"
            class="mb-4"
        >
          <el-descriptions-item :label="$t('demandInquiry.year')">
            {{ detailData.year || '-' }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('demandInquiry.status')">
            <el-tag :type="detailData.status === '1' ? 'warning' : 'success'">
              {{ detailData.status === '1' ? $t('demandInquiry.pending') : $t('demandInquiry.approved') }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('demandInquiry.belongArea')">
            {{ detailData.sourceName || '-' }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('demandInquiry.creator')">
            {{ detailData.creator || '-' }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('demandInquiry.createTime')" :span="isMobile ? 1 : 3">
            {{ detailData.createTime || '-' }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="detail-table-container">
          <h3 class="detail-title">{{ $t('demandInquiry.detailTableTitle') }}</h3>
          <div class="detail-table-wrapper" :class="{ 'mobile': isMobile }">
            <el-table
                :data="detailSubData"
                stripe
                empty-text=""
                size="small"
                v-loading="dictLoadStatus"
                :border="isMobile"
            >
              <el-table-column
                  prop="inputType"
                  :label="$t('demandInquiry.inputType')"
                  min-width="isMobile ? 100 : 120"
                  :formatter="(row) => getDictLabel('input_type', row.inputType)"
              />
              <el-table-column
                  prop="inputCategory"
                  :label="$t('demandInquiry.inputCategory')"
                  min-width="isMobile ? 100 : 120"
                  :formatter="(row) => getDictLabel('input_category', row.inputCategory)"
              />
              <el-table-column
                  prop="totalQuantity"
                  :label="$t('demandInquiry.totalQuantity')"
                  min-width="isMobile ? 80 : 100"
                  align="right"
                  :formatter="(row) => row.totalQuantity || 0"
              />
              <el-table-column
                  prop="units"
                  :label="$t('demandInquiry.unit')"
                  min-width="isMobile ? 80 : 100"
                  align="right"
                  :formatter="() => $t('demandInquiry.kg')"
              />
            </el-table>
          </div>
        </div>
      </div>

      <el-empty
          v-if="detailSubData.length === 0 && !detailLoading"
          :description="$t('demandInquiry.detailNoData')"
      />

      <template #footer>
        <el-button @click="detailDialogVisible = false">
          {{ $t('demandInquiry.close') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useDict, clearDictCache } from '@/hooks/useDict'
import { useI18n } from 'vue-i18n'
import { getVillageDemandSummaryMainList } from '@/api/villageAggregation'
import { getInputSummaryList } from '@/api/inputAggregation'

const { t } = useI18n()

const loading = ref(false)
const detailLoading = ref(false)
const tableData = ref([])
const detailData = ref({})
const detailSubData = ref([])
const detailDialogVisible = ref(false)
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const drillStack = ref([])
const currentSourceCode = ref('')
const currentSourceName = ref('')
const rootSourceCode = ref('')
const rootSourceName = ref('')
const drillLockYear = ref('')

const searchForm = reactive({
  year: '',
  status: ''
})

const isMobile = computed(() => window.innerWidth <= 768)

const showBackBtn = computed(() => drillStack.value.length > 0)

// 计算面包屑项目 - 修正版本
// 计算面包屑项目 - 最终正确版本（实现 reg → reg2026 预期效果）
const breadcrumbItems = computed(() => {
  const items = []

  // 1. 仅添加1次根节点（核心：根节点不绑定drillLockYear，避免名称异常）
  items.push({
    name: rootSourceName.value,
    code: rootSourceCode.value,
    lockYear: drillStack.value.length === 0 ? (searchForm.year || '') : '', // 仅未下钻时显示搜索年份
    type: 'root'
  })

  // 2. 遍历下钻栈：过滤掉与根节点重复的项（避免重复显示reg）
  drillStack.value.forEach(item => {
    if (item.code !== rootSourceCode.value) { // 跳过根节点重复项
      items.push({
        name: item.name,
        code: item.code,
        lockYear: item.lockYear,
        type: 'drill'
      })
    }
  })

  // 3. 添加当前节点：仅当当前节点不是根节点时（避免重复添加reg2026）
  if (currentSourceCode.value !== rootSourceCode.value) {
    items.push({
      name: currentSourceName.value,
      code: currentSourceCode.value,
      lockYear: drillLockYear.value,
      type: 'current'
    })
  }

  return items
})

// 计算当前下钻路径文本
const currentDrillPath = computed(() => {
  if (drillStack.value.length === 0) {
    return rootSourceName.value
  }

  const path = [rootSourceName.value]
  drillStack.value.forEach(item => {
    path.push(item.name)
  })
  path.push(currentSourceName.value)

  return path.join(' → ')
})

clearDictCache('input_type')
clearDictCache('input_category')
const {
  options: dictOptions,
  loading: dictLoadStatus,
  refresh: refreshDict,
  getLabelByValue: getDictLabel
} = useDict(['input_type', 'input_category'], {
  immediate: true,
  cache: true
})

// 面包屑点击事件 - 修正版本
const handleBreadcrumbClick = (index) => {
  // 点击的是当前节点，不执行操作
  if (index === breadcrumbItems.value.length - 1) {
    return
  }

  // 点击根节点
  if (index === 0) {
    handleReset()
    return
  }

  // 计算需要截取到的层级
  // 因为面包屑包含所有层级，我们需要截取drillStack到index-1的位置
  const targetIndex = index - 1

  // 截取drillStack到目标层级
  drillStack.value = drillStack.value.slice(0, targetIndex)

  // 获取目标层级信息
  const targetItem = breadcrumbItems.value[index]

  // 恢复状态
  if (targetIndex >= 0) {
    // 从drillStack中获取目标层级（因为它被截取了）
    const targetLevel = drillStack.value[targetIndex] || targetItem
    currentSourceCode.value = targetItem.code
    currentSourceName.value = targetItem.name
    drillLockYear.value = targetItem.lockYear || ''

    // 恢复搜索栏年份
    if (targetItem.lockYear) {
      searchForm.year = targetItem.lockYear
    }
  } else {
    // 回到根节点
    currentSourceCode.value = rootSourceCode.value
    currentSourceName.value = rootSourceName.value
    drillLockYear.value = ''
  }

  // 重新加载数据
  pagination.currentPage = 1
  loadData()

  ElMessage.success(`已跳转到 ${targetItem.name}`)
}

// 保持原有的下钻逻辑不变
const handleUnitDrill = (code, name, rowYear) => {
  if (!code) {
    ElMessage.warning(t('demandInquiry.emptyUnitCode'))
    return
  }
  if (!rowYear) {
    ElMessage.warning(t('demandInquiry.emptyYear') || '当前行无有效年份，无法下钻')
    return
  }

  // 存储下钻前的状态
  drillStack.value.push({
    code: currentSourceCode.value,
    name: currentSourceName.value,
    prevSearchYear: searchForm.year,
    lockYear: drillLockYear.value
  })

  // 设置新的下钻状态
  searchForm.year = rowYear
  drillLockYear.value = rowYear
  currentSourceCode.value = code
  currentSourceName.value = name
  pagination.currentPage = 1

  loadData()
  ElMessage.success(t('demandInquiry.drillSuccess', { name }))
}

// 保持原有的返回逻辑不变
const resetDrill = () => {
  if (drillStack.value.length > 0) {
    const prevLevel = drillStack.value.pop()

    // 恢复上一级状态
    currentSourceCode.value = prevLevel.code
    currentSourceName.value = prevLevel.name
    drillLockYear.value = prevLevel.lockYear
    searchForm.year = prevLevel.prevSearchYear

    pagination.currentPage = 1
    loadData()
    ElMessage.success(t('demandInquiry.backSuccess'))
  }
}

// 保持原有的数据加载逻辑不变
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      ...(searchForm.status && { status: searchForm.status })
    }

    // 优先级：下钻锁定年份 > 搜索栏年份
    if (drillLockYear.value) {
      params.year = drillLockYear.value
    } else if (searchForm.year) {
      params.year = searchForm.year
    }

    if (drillStack.value.length === 0) {
      params.sourceCode = currentSourceCode.value
    } else {
      params.targetCode = currentSourceCode.value
    }

    const res = await getVillageDemandSummaryMainList(params)
    if (res.code === 200) {
      let list = res.data.list || []

      list = list.sort((a, b) => {
        const yearA = a.year ? Number(a.year) : 0
        const yearB = b.year ? Number(b.year) : 0
        return yearB - yearA
      })

      tableData.value = list
      pagination.total = res.data.total || 0

      if (tableData.value.length === 0 && drillStack.value.length > 0) {
        ElMessage.error(t('demandInquiry.noLowerLevelData'))
      }
    } else {
      ElMessage.error(res.msg || t('demandInquiry.loadFailed'))
    }
  } catch (error) {
    console.error('Load data failed:', error)
    ElMessage.error(t('demandInquiry.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 保持原有的搜索和重置逻辑不变
const handleSearch = () => {
  drillStack.value = []
  drillLockYear.value = ''
  currentSourceCode.value = rootSourceCode.value
  currentSourceName.value = rootSourceName.value
  pagination.currentPage = 1
  loadData()
}

const handleReset = () => {
  searchForm.year = ''
  searchForm.status = ''
  drillStack.value = []
  drillLockYear.value = ''
  currentSourceCode.value = rootSourceCode.value
  currentSourceName.value = rootSourceName.value
  pagination.currentPage = 1
  loadData()
}

const handleSizeChange = (val) => {
  pagination.pageSize = val
  loadData()
}

const handleCurrentChange = (val) => {
  pagination.currentPage = val
  loadData()
}

const handleDetail = async (row) => {
  detailDialogVisible.value = true
  detailLoading.value = true
  try {
    const res = await getInputSummaryList({
      summaryId: row.id,
      page: 1,
      pageSize: 100
    })
    if (res.code === 200) {
      detailData.value = row
      detailSubData.value = res.data.list.sort((a, b) => a.inputType.localeCompare(b.inputType))
    }
  } catch (error) {
    console.error('Load detail failed:', error)
    ElMessage.error(t('demandInquiry.detailLoadFailed'))
  } finally {
    detailLoading.value = false
  }
}

onMounted(async () => {
  await refreshDict()
  const userInfoStr = localStorage.getItem('userInfo')
  if (userInfoStr) {
    try {
      const user = JSON.parse(userInfoStr).user
      rootSourceCode.value = user.REGIONCODE || ''
      rootSourceName.value = user.REGIONNAME || user.REGIONCODE || t('demandInquiry.root')
      currentSourceCode.value = rootSourceCode.value
      currentSourceName.value = rootSourceName.value
    } catch (error) {
      console.error('Parse user info failed:', error)
      rootSourceName.value = t('demandInquiry.root')
      currentSourceName.value = t('demandInquiry.root')
    }
  } else {
    rootSourceName.value = t('demandInquiry.root')
    currentSourceName.value = t('demandInquiry.root')
  }
  loadData()
})
</script>

<style scoped>
/* 样式保持不变 */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  max-width: 1920px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* 面包屑导航样式 */
.breadcrumb-wrapper {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  cursor: default;
  transition: all 0.2s ease;
  user-select: none;
}



.breadcrumb-item.active {
  background-color: #009A44;
  border-color: #009A44;
  color: white;
}

.breadcrumb-item.active .breadcrumb-icon,
.breadcrumb-item.active .breadcrumb-text,
.breadcrumb-item.active .breadcrumb-year {
  color: white;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-icon {
  font-size: 16px;
  color: #6c757d;
}

.breadcrumb-text {
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  white-space: nowrap;
}

.breadcrumb-year {
  font-size: 12px;
  color: #6c757d;
  background-color: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 4px;
}

.breadcrumb-separator {
  color: #adb5bd;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.breadcrumb-path-text {
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-size: 14px;
  color: #495057;
  border: 1px solid #e9ecef;
  display: none;
}

/* 搜索区域 */
.search-wrapper {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-form {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
}

:deep(.el-form--inline .el-form-item) {
  vertical-align: middle;
  margin-bottom: 0 !important;
  display: flex;
  align-items: center;
  margin-right: 16px !important;
}

:deep(.el-form-item__label) {
  line-height: normal !important;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
}

:deep(.el-form-item__content) {
  display: flex;
  align-items: center;
  flex: 1;
}

:deep(.el-date-editor--year) {
  vertical-align: middle;
}
:deep(.el-select) {
  vertical-align: middle;
}

:deep(.el-input__wrapper) {
  height: 32px !important;
  line-height: 32px !important;
}
:deep(.el-button) {
  height: 32px;
  line-height: 32px;
}

.btn-group {
  margin-left: auto !important;
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
  align-self: center;
  gap: 8px;
}

/* 表格样式 */
.unit-link {
  color: #1989fa;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}

.unit-link:hover {
  color: #0e6ecd;
}

.unit-drill-icon {
  font-size: 12px;
}

.unit-normal {
  color: #333;
  cursor: default;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.info-card {
  background: white;
  padding: 24px;
}

.table-wrapper {
  margin-bottom: 16px;
  width: 100%;
  overflow-x: auto;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.detail-header {
  margin-bottom: 16px;
}

.mb-4 {
  margin-bottom: 16px !important;
}

.detail-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.detail-table-container {
  width: 100%;
}

.detail-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.detail-table-wrapper.mobile {
  font-size: 14px;
}

/* 移动端样式 */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
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

  .breadcrumb-wrapper {
    padding: 12px;
    margin-bottom: 12px;
  }

  .breadcrumb-container {
    gap: 4px;
  }

  .breadcrumb-item {
    padding: 6px 8px;
    max-width: 120px;
    overflow: hidden;
  }

  .breadcrumb-text {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .breadcrumb-year {
    display: none;
  }

  .breadcrumb-path-text {
    display: block;
    font-size: 13px;
    line-height: 1.4;
  }

  .search-wrapper {
    padding: 16px;
  }

  .search-form {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  :deep(.el-form--inline .el-form-item) {
    width: 100%;
    margin-right: 0 !important;
    margin-bottom: 12px !important;
  }

  .btn-group {
    margin-left: 0 !important;
    width: 100%;
    justify-content: flex-end;
    margin-top: 12px !important;
  }

  .info-card {
    padding: 16px;
  }

  :deep(.el-table) {
    font-size: 14px;
  }

  :deep(.el-table__cell) {
    padding: 8px 4px !important;
  }

  :deep(.el-dialog__body) {
    padding: 12px !important;
  }

  :deep(.el-descriptions__label) {
    font-weight: 600;
    min-width: 80px !important;
  }

  :deep(.el-button) {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>