<template>
  <div class="farmer-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-user-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('newFarm.farmer.title') }}</h1>
          <p class="page-subtitle">{{ $t('newFarm.farmer.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索栏 -->
      <div class="search-bar">
<!--
        <div class="search-row">
          <el-input
            v-model="searchFilters.keyword"
            :placeholder="$t('newFarm.farmer.searchPlaceholder')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>
        </div>
-->



        <!-- 筛选条件 -->
        <div class="filter-row">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.farmer.form.gender') }}</label>
                <el-radio-group v-model="searchFilters.gender" @change="handleSearch">
                  <el-radio-button label="">{{ $t('newFarm.common.all') }}</el-radio-button>
                  <el-radio-button label="MALE">{{ $t('newFarm.common.male') }}</el-radio-button>
                  <el-radio-button label="FEMALE">{{ $t('newFarm.common.female') }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.farmer.form.farmerName') }}</label>
                <el-input
                  v-model="searchFilters.farmerName"
                  :placeholder="$t('newFarm.farmer.placeholder.farmerName')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.farmer.form.phone') }}</label>
                <el-input
                  v-model="searchFilters.phone"
                  :placeholder="$t('newFarm.farmer.placeholder.phone')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.common.kebeleName') }}</label>
                <el-input
                  v-model="searchFilters.kebeleName"
                  :placeholder="$t('newFarm.common.selectKebele')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('common.add') }}</span>
            </el-button>
            <el-button type="success" plain @click="handleImport">
              <i class="ri-upload-2-line"></i>
              <span class="btn-text">{{ $t('newFarm.farmer.actions.import') }}</span>
            </el-button>
            <el-button type="primary" plain @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
            <el-button
                v-if="selectedIds.length > 0"
                type="danger"
                plain
                @click="handleBatchDelete"
            >
              <i class="ri-delete-bin-line"></i>
              <span class="btn-text">{{ $t('newFarm.farmer.actions.batchDelete') }} ({{ selectedIds.length }})</span>
            </el-button>
          </div>
        </div>


      </div>



      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column prop="farmerId" :label="$t('newFarm.farmer.columns.farmerId')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="farmerName" :label="$t('newFarm.farmer.columns.farmerName')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="gender" :label="$t('newFarm.farmer.columns.gender')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.gender" size="small" :type="row.gender === 'MALE' ? 'primary' : 'danger'">
                {{ row.gender === 'MALE' ? $t('newFarm.common.male') : $t('newFarm.common.female') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" :label="$t('newFarm.farmer.columns.phone')" min-width="130" />
          <el-table-column prop="kebeleName" :label="$t('newFarm.farmer.columns.kebeleName')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="landCount" :label="$t('newFarm.farmer.columns.landCount')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag type="info" size="small">{{ row.landCount || 0 }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="totalLandArea" :label="$t('newFarm.farmer.columns.totalLandArea')" min-width="120" align="right">
            <template #default="{ row }">
              {{ formatArea(row.totalLandArea) }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('newFarm.common.actions')" min-width="200" align="center" fixed="right">
            <template #default="{ row }">
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
                {{ $t('common.void') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view">
        <div class="mobile-add-btn">
          <el-button type="primary" @click="handleAdd" style="width: 100%">
            <i class="ri-add-line"></i>
            {{ $t('common.add') }}
          </el-button>
        </div>

        <div v-loading="loading" class="card-list">
          <div v-if="tableData.length === 0" class="empty-state">
            <i class="ri-inbox-line empty-icon"></i>
            <p class="empty-text">{{ $t('newFarm.common.noData') }}</p>
          </div>

          <div v-for="item in tableData" :key="item.farmerId" class="farmer-card">
            <div class="card-header">
              <div class="farmer-name">
                <i class="ri-user-line"></i>
                {{ item.farmerName }}
              </div>
              <el-tag v-if="item.gender" size="small" :type="item.gender === 'MALE' ? 'primary' : 'danger'">
                {{ item.gender === 'MALE' ? $t('newFarm.common.male') : $t('newFarm.common.female') }}
              </el-tag>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">{{ $t('newFarm.farmer.columns.farmerId') }}:</span>
                <span class="value">{{ item.farmerId }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.farmer.columns.phone') }}:</span>
                <span class="value">{{ item.phone || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.farmer.columns.kebeleName') }}:</span>
                <span class="value">{{ item.kebeleName || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.farmer.columns.landCount') }}:</span>
                <span class="value">{{ item.landCount || 0 }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.farmer.columns.totalLandArea') }}:</span>
                <span class="value area">{{ formatArea(item.totalLandArea) }}</span>
              </div>
            </div>

            <div class="card-footer">
              <el-button size="small" @click="handleView(item)">
                <i class="ri-eye-line"></i>
                {{ $t('common.view') }}
              </el-button>
              <el-button size="small" type="primary" @click="handleEdit(item)">
                <i class="ri-edit-line"></i>
                {{ $t('common.edit') }}
              </el-button>
              <el-button size="small" type="danger" plain @click="handleDelete(item)">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.delete') }}
              </el-button>
            </div>
          </div>
        </div>

        <!-- 移动端分页 -->
        <div class="mobile-pagination">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- 导入对话框 -->
    <el-dialog
      v-model="importDialogVisible"
      :title="$t('newFarm.farmer.actions.import')"
      width="500px"
      :close-on-click-modal="false"
    >
      <div class="import-content">
        <el-upload
          ref="uploadRef"
          class="upload-area"
          drag
          action="#"
          :auto-upload="false"
          :limit="1"
          accept=".xlsx,.xls"
          :on-change="handleFileChange"
          :on-exceed="handleExceed"
        >
          <i class="ri-upload-cloud-2-line upload-icon"></i>
          <div class="el-upload__text">
            {{ $t('newFarm.farmer.import.dragText') }}
            <em>{{ $t('newFarm.farmer.import.clickText') }}</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              {{ $t('newFarm.farmer.import.tip') }}
            </div>
          </template>
        </el-upload>

        <div class="import-options">
          <el-checkbox v-model="updateSupport">
            {{ $t('newFarm.farmer.import.updateSupport') }}
          </el-checkbox>
        </div>

        <div class="template-download">
          <el-button link type="primary" @click="handleDownloadTemplate">
            <i class="ri-download-line"></i>
            {{ $t('newFarm.farmer.import.downloadTemplate') }}
          </el-button>
        </div>
      </div>

      <template #footer>
        <el-button @click="importDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="importLoading" @click="submitImport">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store'
import {
  getFarmerList,
  deleteFarmer,
  batchDeleteFarmer,
  downloadFarmerImportTemplate,
  importFarmerData
} from '@/api/newFarm'

const router = useRouter()
const { t } = useI18n()

// 搜索筛选条件
const searchFilters = reactive({
  keyword: '',
  farmerName: '',
  phone: '',
  idCard: '',
  gender: '',
  kebeleName: '',
  daId: ''
})

// 分页
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 表格数据
const tableData = ref([])
const loading = ref(false)
const selectedIds = ref([])

// 导入相关
const importDialogVisible = ref(false)
const importLoading = ref(false)
const updateSupport = ref(false)
const uploadRef = ref(null)
const importFile = ref(null)

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      kebeleCode: searchFilters.kebeleCode,
      daId: searchFilters.daId,
      searchValue: searchFilters.keyword
    }

    // 核心逻辑：
    // 当顶部搜索框(keyword)有值时，传入 searchValue，触发后端的"多字段模糊匹配" (Name/ID/Phone)
    // 此时忽略 farmerName/phone/idCard 等单个字段的严格筛选
    if (searchFilters.keyword) {
      params.searchValue = searchFilters.keyword
    } else {
      // 当顶部搜索框为空时，使用具体的字段筛选
      if (searchFilters.farmerName) params.farmerName = searchFilters.farmerName
      if (searchFilters.phone) params.phone = searchFilters.phone
      if (searchFilters.idCard) params.idCard = searchFilters.idCard
    }

    const res = await getFarmerList(params)
    if (res.code === 200 && res.data) {
      tableData.value = res.data.records || res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.pageNum = 1
  fetchData()
}

// 重置
const handleReset = () => {
  searchFilters.keyword = ''
  searchFilters.farmerName = ''
  searchFilters.phone = ''
  searchFilters.idCard = ''
  searchFilters.gender = ''
  searchFilters.kebeleName = ''
  searchFilters.daId = ''
  handleSearch()
}

// 分页变化
const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.pageNum = 1
  fetchData()
}

const handleCurrentChange = (val) => {
  pagination.pageNum = val
  fetchData()
}

// 选择变化
const handleSelectionChange = (rows) => {
  selectedIds.value = rows.map(row => row.farmerId)
}

// 新增
const handleAdd = () => {
  router.push('/input/farmer/add')
}

// 查看详情
const handleView = (row) => {
  router.push(`/input/farmer/detail/${row.farmerId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/input/farmer/edit/${row.farmerId}`)
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('newFarm.farmer.confirmDelete'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteFarmer(row.farmerId)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.common.deleteSuccess'))
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 批量删除
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) return

  try {
    await ElMessageBox.confirm(
      t('newFarm.farmer.confirmBatchDelete', { count: selectedIds.value.length }),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await batchDeleteFarmer(selectedIds.value)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.common.deleteSuccess'))
      selectedIds.value = []
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to batch delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 格式化面积
const formatArea = (area) => {
  if (!area) return '0 ha'
  return `${parseFloat(area).toFixed(2)} ha`
}

// 打开导入对话框
const handleImport = () => {
  importDialogVisible.value = true
  updateSupport.value = false
  importFile.value = null
  if (uploadRef.value) {
    uploadRef.value.clearFiles()
  }
}

// 文件变化
const handleFileChange = (file) => {
  importFile.value = file.raw
}

// 文件超出限制
const handleExceed = () => {
  ElMessage.warning(t('newFarm.farmer.import.exceedLimit'))
}

// 下载模板
const handleDownloadTemplate = async () => {
  try {
    const res = await downloadFarmerImportTemplate()
    
    // res 现在应该是 Blob 对象
    const blob = res instanceof Blob ? res : new Blob([res], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Farmer_Import_Template.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    ElMessage.success(t('common.downloadSuccess') || 'Download successful')
  } catch (error) {
    console.error('Download template failed:', error)
    ElMessage.error(t('common.downloadFailed') || 'Download failed')
  }
}

// 提交导入
const submitImport = async () => {
  if (!importFile.value) {
    ElMessage.warning(t('newFarm.farmer.import.selectFile'))
    return
  }

  importLoading.value = true
  try {
    const formData = new FormData()
    formData.append('file', importFile.value)
    formData.append('updateSupport', updateSupport.value)

    const res = await importFarmerData(formData)
    if (res.code === 200) {
      const data = res.data || {}
      ElMessage.success(
        t('newFarm.farmer.import.success', {
          success: data.successCount || 0,
          update: data.updateCount || 0,
          fail: data.failCount || 0
        })
      )
      importDialogVisible.value = false
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    console.error('Import failed:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    importLoading.value = false
  }
}

// 初始化
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.farmer-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding-bottom: 2rem;
}

.page-header { background: linear-gradient(135deg, #009A44 0%, #00b350 100%); padding: 24px 0; margin: -24px 0 24px 0; border-radius: 0 0 16px 16px; }
.header-content { max-width: 100%; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 20px; }
.header-icon-wrapper { width: 64px; height: 64px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); flex-shrink: 0; }
.header-icon { font-size: 32px; color: white; }
.header-text { flex: 1; color: white; min-width: 0; }
.page-title { font-size: 24px; font-weight: 600; margin: 0 0 4px 0; }
.page-subtitle { font-size: 14px; opacity: 0.9; margin: 0; }

.content-wrapper { margin: 0 auto; padding: 0 1rem; }

.search-bar { background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
.search-row { margin-bottom: 1rem; }
.search-input { width: 100%; }
.action-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.action-left { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.filter-row { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e8f5e9; }
.filter-item { margin-bottom: 1rem; }
.filter-label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #606266; font-size: 0.875rem; }

.table-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
.pagination-wrapper { margin-top: 1.5rem; display: flex; justify-content: center; }

.mobile-view { display: none; }
.mobile-add-btn { margin-bottom: 1rem; }
.card-list { display: flex; flex-direction: column; gap: 1rem; }

.farmer-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); transition: all 0.3s ease; }
.farmer-card:hover { box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15); transform: translateY(-2px); }

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e8f5e9; }
.farmer-name { font-size: 1.125rem; font-weight: 600; color: #009A44; display: flex; align-items: center; gap: 0.5rem; }

.card-body { margin-bottom: 1rem; }
.info-row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #f5f7fa; }
.info-row:last-child { border-bottom: none; }
.info-row .label { font-weight: 500; color: #606266; font-size: 0.875rem; }
.info-row .value { color: #303133; text-align: right; }
.info-row .area { color: #009A44; font-weight: 600; }

.card-footer { display: flex; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid #f5f7fa; }
.card-footer .el-button { flex: 1; }

.mobile-pagination { margin-top: 1.5rem; display: flex; justify-content: center; }

.empty-state { text-align: center; padding: 3rem 1rem; }
.empty-icon { font-size: 4rem; color: #dcdfe6; margin-bottom: 1rem; }
.empty-text { color: #909399; font-size: 0.875rem; }

@media screen and (max-width: 1024px) {
  .page-title { font-size: 1.5rem; }
  .header-icon-wrapper { width: 60px; height: 60px; }
  .header-icon { font-size: 30px; }
}

@media screen and (max-width: 768px) {
  .pc-view { display: none !important; }
  .mobile-view { display: block; }
  .page-header { padding: 1.5rem 1rem; }
  .header-content { gap: 1rem; }
  .header-icon-wrapper { width: 50px; height: 50px; }
  .header-icon { font-size: 24px; }
  .page-title { font-size: 1.25rem; }
  .page-subtitle { font-size: 0.875rem; }
  .search-bar { padding: 1rem; }
  .action-left { width: 100%; }
  .action-left .el-button { flex: 1; }
  .btn-text { display: none; }
  .filter-row :deep(.el-radio-group) { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .filter-row :deep(.el-radio-button) { flex: 0 0 auto; }
}

/* 导入对话框样式 */
.import-content { padding: 0 10px; }
.upload-area { width: 100%; }
.upload-area :deep(.el-upload) { width: 100%; }
.upload-area :deep(.el-upload-dragger) { width: 100%; padding: 40px 20px; }
.upload-icon { font-size: 48px; color: #009A44; margin-bottom: 16px; }
.import-options { margin-top: 16px; padding: 12px; background: #f5f7fa; border-radius: 8px; }
.template-download { margin-top: 16px; text-align: center; }
.template-download i { margin-right: 4px; }
</style>
