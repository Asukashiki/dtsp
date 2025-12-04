<template>
  <div class="da-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-user-star-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('newFarm.da.title') }}</h1>
          <p class="page-subtitle">{{ $t('newFarm.da.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchFilters.keyword"
            :placeholder="$t('newFarm.da.searchPlaceholder')"
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

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('common.add') }}</span>
            </el-button>
            <el-button type="primary" plain @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
          </div>
        </div>

        <!-- 筛选条件 -->
        <div class="filter-row">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.da.form.accountStatus') }}</label>
                <el-radio-group v-model="searchFilters.accountStatus" @change="handleSearch">
                  <el-radio-button label="">{{ $t('newFarm.common.all') }}</el-radio-button>
                  <el-radio-button label="1">{{ $t('newFarm.da.status.enabled') }}</el-radio-button>
                  <el-radio-button label="0">{{ $t('newFarm.da.status.disabled') }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.da.form.daName') }}</label>
                <el-input
                  v-model="searchFilters.daName"
                  :placeholder="$t('newFarm.da.placeholder.daName')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.da.form.phone') }}</label>
                <el-input
                  v-model="searchFilters.phone"
                  :placeholder="$t('newFarm.da.placeholder.phone')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('newFarm.common.woredaCode') }}</label>
                <el-input
                  v-model="searchFilters.woredaCode"
                  :placeholder="$t('newFarm.common.selectWoreda')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="daId" :label="$t('newFarm.da.columns.daId')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="daName" :label="$t('newFarm.da.columns.daName')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="phone" :label="$t('newFarm.da.columns.phone')" min-width="130" />
          <el-table-column prop="account" :label="$t('newFarm.da.columns.account')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="woredaName" :label="$t('newFarm.da.columns.woredaName')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="accountStatus" :label="$t('newFarm.da.columns.accountStatus')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="row.accountStatus === '1' ? 'success' : 'danger'" size="small">
                {{ row.accountStatus === '1' ? $t('newFarm.da.status.enabled') : $t('newFarm.da.status.disabled') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('newFarm.common.actions')" min-width="280" align="center" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
                {{ $t('common.view') }}
              </el-button>
              <el-button link type="primary" @click="handleEdit(row)">
                <i class="ri-edit-line"></i>
                {{ $t('common.edit') }}
              </el-button>
              <el-button link :type="row.accountStatus === '1' ? 'warning' : 'success'" @click="handleToggleStatus(row)">
                <i :class="row.accountStatus === '1' ? 'ri-forbid-line' : 'ri-checkbox-circle-line'"></i>
                {{ row.accountStatus === '1' ? $t('newFarm.da.actions.disable') : $t('newFarm.da.actions.enable') }}
              </el-button>
              <el-button link type="info" @click="handleResetPassword(row)">
                <i class="ri-lock-password-line"></i>
                {{ $t('newFarm.da.actions.resetPassword') }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.delete') }}
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

          <div v-for="item in tableData" :key="item.daId" class="da-card">
            <div class="card-header">
              <div class="da-name">
                <i class="ri-user-star-line"></i>
                {{ item.daName }}
              </div>
              <el-tag :type="item.accountStatus === '1' ? 'success' : 'danger'" size="small">
                {{ item.accountStatus === '1' ? $t('newFarm.da.status.enabled') : $t('newFarm.da.status.disabled') }}
              </el-tag>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">{{ $t('newFarm.da.columns.daId') }}:</span>
                <span class="value">{{ item.daId }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.da.columns.phone') }}:</span>
                <span class="value">{{ item.phone || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.da.columns.account') }}:</span>
                <span class="value">{{ item.account || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('newFarm.da.columns.woredaName') }}:</span>
                <span class="value">{{ item.woredaName || '-' }}</span>
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

    <!-- 重置密码对话框 -->
    <el-dialog
      v-model="resetPasswordVisible"
      :title="$t('newFarm.da.actions.resetPassword')"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-position="top">
        <el-form-item :label="$t('newFarm.da.form.newPassword')" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            :placeholder="$t('newFarm.da.placeholder.newPassword')"
            show-password
          />
        </el-form-item>
        <el-form-item :label="$t('newFarm.da.form.confirmPassword')" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            :placeholder="$t('newFarm.da.placeholder.confirmPassword')"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetPasswordVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="resetPasswordLoading" @click="confirmResetPassword">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDaList,
  deleteDa,
  updateDaStatus,
  resetDaPassword
} from '@/api/newFarm'

const router = useRouter()
const { t } = useI18n()

// 搜索筛选条件
const searchFilters = reactive({
  keyword: '',
  daName: '',
  phone: '',
  woredaCode: '',
  kebeleCode: '',
  accountStatus: ''
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

// 重置密码相关
const resetPasswordVisible = ref(false)
const resetPasswordLoading = ref(false)
const currentDaId = ref('')
const passwordFormRef = ref(null)
const passwordForm = reactive({
  newPassword: '',
  confirmPassword: ''
})

// 密码验证规则
const passwordRules = computed(() => ({
  newPassword: [
    { required: true, message: t('newFarm.da.rules.passwordRequired'), trigger: 'blur' },
    { min: 6, max: 20, message: t('newFarm.da.rules.passwordLength'), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: t('newFarm.da.rules.confirmPasswordRequired'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error(t('newFarm.da.rules.passwordNotMatch')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      daName: searchFilters.daName || searchFilters.keyword,
      phone: searchFilters.phone,
      woredaCode: searchFilters.woredaCode,
      kebeleCode: searchFilters.kebeleCode,
      accountStatus: searchFilters.accountStatus
    }

    const res = await getDaList(params)
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
  searchFilters.daName = ''
  searchFilters.phone = ''
  searchFilters.woredaCode = ''
  searchFilters.kebeleCode = ''
  searchFilters.accountStatus = ''
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

// 新增
const handleAdd = () => {
  router.push('/new-farm/da/add')
}

// 查看详情
const handleView = (row) => {
  router.push(`/new-farm/da/detail/${row.daId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/new-farm/da/edit/${row.daId}`)
}

// 启用/禁用
const handleToggleStatus = async (row) => {
  const newStatus = row.accountStatus === '1' ? '0' : '1'
  const action = newStatus === '1' ? t('newFarm.da.actions.enable') : t('newFarm.da.actions.disable')

  try {
    await ElMessageBox.confirm(
      t('newFarm.da.confirmToggleStatus', { action }),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await updateDaStatus(row.daId, newStatus)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.common.operationSuccess'))
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to toggle status:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 重置密码
const handleResetPassword = (row) => {
  currentDaId.value = row.daId
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  resetPasswordVisible.value = true
}

const confirmResetPassword = async () => {
  if (!passwordFormRef.value) return

  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      resetPasswordLoading.value = true
      try {
        const res = await resetDaPassword(currentDaId.value, passwordForm.newPassword)
        if (res.code === 200) {
          ElMessage.success(t('newFarm.da.messages.resetPasswordSuccess'))
          resetPasswordVisible.value = false
        } else {
          ElMessage.error(res.msg || t('common.failed'))
        }
      } catch (error) {
        console.error('Failed to reset password:', error)
        ElMessage.error(t('common.failed'))
      } finally {
        resetPasswordLoading.value = false
      }
    }
  })
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('newFarm.da.confirmDelete'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteDa(row.daId)
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

// 初始化
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.da-container {
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

/* 内容区域 */
.content-wrapper {
  margin: 0 auto;
  padding: 0 1rem;
}

/* 搜索栏 */
.search-bar {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-row {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.action-left {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-row {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e8f5e9;
}

.filter-item {
  margin-bottom: 1rem;
}

.filter-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #606266;
  font-size: 0.875rem;
}

/* 表格卡片 */
.table-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.pagination-wrapper {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

/* 移动端 */
.mobile-view {
  display: none;
}

.mobile-add-btn {
  margin-bottom: 1rem;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.da-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.da-card:hover {
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8f5e9;
}

.da-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-body {
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f7fa;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-weight: 500;
  color: #606266;
  font-size: 0.875rem;
}

.info-row .value {
  color: #303133;
  text-align: right;
}

.card-footer {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f5f7fa;
}

.card-footer .el-button {
  flex: 1;
}

.mobile-pagination {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  font-size: 4rem;
  color: #dcdfe6;
  margin-bottom: 1rem;
}

.empty-text {
  color: #909399;
  font-size: 0.875rem;
}

/* 响应式 - 平板 */
@media screen and (max-width: 1024px) {
  .page-title {
    font-size: 1.5rem;
  }

  .header-icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .header-icon {
    font-size: 30px;
  }
}

/* 响应式 - 移动端 */
@media screen and (max-width: 768px) {
  .pc-view {
    display: none !important;
  }

  .mobile-view {
    display: block;
  }

  .page-header {
    padding: 1.5rem 1rem;
  }

  .header-content {
    gap: 1rem;
  }

  .header-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .header-icon {
    font-size: 24px;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }

  .search-bar {
    padding: 1rem;
  }

  .action-left {
    width: 100%;
  }

  .action-left .el-button {
    flex: 1;
  }

  .btn-text {
    display: none;
  }

  .filter-row :deep(.el-radio-group) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-row :deep(.el-radio-button) {
    flex: 0 0 auto;
  }
}

.text-muted {
  color: #909399;
}
</style>
