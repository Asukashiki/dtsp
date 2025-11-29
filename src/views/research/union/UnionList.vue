<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="content-wrapper">
        <!-- 页面头部 -->
        <div class="page-header">
          <div class="header-icon">
            <i class="ri-community-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('union.list') }}</h1>
            <p class="page-subtitle">{{ $t('union.subtitle') }}</p>
          </div>
        </div>

        <!-- 内容卡片 -->
        <div class="info-card">
          <div class="card-body">
            <!-- 查询条件区 -->
            <el-form
              ref="queryFormRef"
              :model="queryParams"
              :inline="true"
              class="query-form"
            >
              <el-form-item :label="$t('union.form.enterpriseName')" prop="enterpriseName">
                <el-input
                  v-model="queryParams.enterpriseName"
                  :placeholder="$t('union.placeholder.enterpriseName')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('union.form.enterpriseRegistrationId')" prop="enterpriseRegistrationId">
                <el-input
                  v-model="queryParams.enterpriseRegistrationId"
                  :placeholder="$t('union.placeholder.enterpriseRegistrationId')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('union.form.unifiedSocialCreditCode')" prop="unifiedSocialCreditCode">
                <el-input
                  v-model="queryParams.unifiedSocialCreditCode"
                  :placeholder="$t('union.placeholder.unifiedSocialCreditCode')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('union.form.seedEnterpriseLicenseNumber')" prop="seedEnterpriseLicenseNumber">
                <el-input
                  v-model="queryParams.seedEnterpriseLicenseNumber"
                  :placeholder="$t('union.placeholder.seedEnterpriseLicenseNumber')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('union.form.enterpriseType')" prop="enterpriseType">
                <el-select
                  v-model="queryParams.enterpriseType"
                  :placeholder="$t('union.placeholder.enterpriseType')"
                  clearable
                >
                  <el-option :label="$t('union.type.production')" value="production" />
                  <el-option :label="$t('union.type.trade')" value="trade" />
                  <el-option :label="$t('union.type.integrated')" value="integrated" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQuery">
                  <i class="ri-search-line"></i>
                  {{ $t('union.search') }}
                </el-button>
                <el-button @click="handleReset">
                  <i class="ri-refresh-line"></i>
                  {{ $t('union.reset') }}
                </el-button>
              </el-form-item>
            </el-form>

            <!-- 操作按钮区 -->
            <div class="toolbar">
              <div class="toolbar-left">
                <el-button type="primary" @click="handleAdd">
                  <i class="ri-add-line"></i>
                  {{ $t('union.add') }}
                </el-button>
                <el-button
                  type="danger"
                  :disabled="selectedIds.length === 0"
                  @click="handleBatchDelete"
                >
                  <i class="ri-delete-bin-line"></i>
                  {{ $t('union.batchDelete') }}
                </el-button>
              </div>
              <div class="toolbar-right">
                <el-button @click="handleExport">
                  <i class="ri-download-line"></i>
                  {{ $t('union.export') }}
                </el-button>
              </div>
            </div>

            <!-- 数据列表区 -->
            <el-table
              v-loading="loading"
              :data="dataList"
              @selection-change="handleSelectionChange"
              stripe
              border
              style="width: 100%"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                :label="$t('union.table.enterpriseName')"
                prop="enterpriseName"
                min-width="150"
                show-overflow-tooltip
              />
              <el-table-column
                :label="$t('union.table.enterpriseRegistrationId')"
                prop="enterpriseRegistrationId"
                min-width="150"
                show-overflow-tooltip
              />
              <el-table-column
                :label="$t('union.table.seedEnterpriseLicenseNumber')"
                prop="seedEnterpriseLicenseNumber"
                min-width="180"
                show-overflow-tooltip
              />
              <el-table-column
                :label="$t('union.table.enterpriseType')"
                prop="enterpriseType"
                width="120"
                align="center"
              >
                <template #default="{ row }">
                  {{ getEnterpriseTypeLabel(row.enterpriseType) }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('union.table.certificationStatus')"
                prop="certificationStatus"
                width="120"
                align="center"
              >
                <template #default="{ row }">
                  <el-tag :type="getStatusTag(row.certificationStatus)">
                    {{ getStatusLabel(row.certificationStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('union.table.operator')"
                prop="operator"
                width="120"
                align="center"
              />
              <el-table-column
                :label="$t('union.table.operationTime')"
                prop="operationTime"
                width="160"
                align="center"
              />
              <el-table-column
                :label="$t('union.table.actions')"
                fixed="right"
                width="180"
                align="center"
              >
                <template #default="{ row }">
                  <el-button
                    type="primary"
                    link
                    @click="handleView(row)"
                  >
                    <i class="ri-eye-line"></i>
                    {{ $t('union.viewDetail') }}
                  </el-button>
                  <el-button
                    type="danger"
                    link
                    @click="handleDelete(row)"
                  >
                    <i class="ri-delete-bin-line"></i>
                    {{ $t('union.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              v-model:current-page="queryParams.pageNum"
              v-model:page-size="queryParams.pageSize"
              :total="total"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleQuery"
              @current-change="handleQuery"
              class="pagination"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUnionList, deleteUnionRegistration } from '@/api/union'

const router = useRouter()
const { t } = useI18n()

const queryFormRef = ref(null)
const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  enterpriseName: '',
  enterpriseRegistrationId: '',
  unifiedSocialCreditCode: '',
  seedEnterpriseLicenseNumber: '',
  enterpriseType: ''
})

// 获取企业类型标签
const getEnterpriseTypeLabel = (type) => {
  const typeMap = {
    production: t('union.type.production'),
    trade: t('union.type.trade'),
    integrated: t('union.type.integrated')
  }
  return typeMap[type] || type
}

// 获取状态标签样式
const getStatusTag = (status) => {
  const tagMap = { '-1': 'info', 0: 'warning', 1: 'success', 2: 'danger' }
  return tagMap[status] || 'info'
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  const labelMap = {
    '-1': t('union.status.draft'),
    0: t('union.status.pending'),
    1: t('union.status.approved'),
    2: t('union.status.rejected')
  }
  return labelMap[status] || '未申请'
}

// 查询列表
const handleQuery = async () => {
  loading.value = true
  try {
    const response = await getUnionList(queryParams)
    if (response.code === 200) {
      dataList.value = response.rows || []
      total.value = response.total || 0
    } else {
      ElMessage.error(response.msg || t('union.messages.loadFailed'))
    }
  } catch (error) {
    ElMessage.error(t('union.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 重置查询
const handleReset = () => {
  queryFormRef.value?.resetFields()
  queryParams.pageNum = 1
  handleQuery()
}

// 新增
const handleAdd = () => {
  router.push('/research/union/registration')
}

// 查看详情
const handleView = (row) => {
  router.push({
    path: '/research/union/registration',
    query: { id: row.enterpriseId }
  })
}

// 删除单条
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('union.messages.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const response = await deleteUnionRegistration(row.enterpriseId)
    if (response.code === 200) {
      ElMessage.success(t('union.messages.deleteSuccess'))
      handleQuery()
    } else {
      ElMessage.error(response.msg || t('union.messages.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('union.messages.deleteFailed'))
    }
  }
}

// 批量删除
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning(t('union.messages.noDataSelected'))
    return
  }

  try {
    await ElMessageBox.confirm(
      t('union.messages.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    // 这里需要后端提供批量删除接口
    // const response = await batchDeleteUnionRegistration(selectedIds.value)
    // if (response.code === 200) {
    //   ElMessage.success(t('union.messages.deleteSuccess'))
    //   handleQuery()
    // }
    
    // 临时方案：逐个删除
    for (const id of selectedIds.value) {
      await deleteUnionRegistration(id)
    }
    ElMessage.success(t('union.messages.deleteSuccess'))
    handleQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('union.messages.deleteFailed'))
    }
  }
}

// 导出
const handleExport = () => {
  ElMessage.info('导出功能开发中...')
}

// 选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.enterpriseId)
}

// 初始化
onMounted(() => {
  handleQuery()
})
</script>

<style scoped lang="scss">
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.page-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  flex: 1;
  overflow: auto;
  padding: 40px;
  padding-bottom: 40px;
}

.info-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 24px;
}

.query-form {
  margin-bottom: 20px;
  
  :deep(.el-form-item) {
    margin-bottom: 16px;
  }
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;

  .toolbar-left,
  .toolbar-right {
    display: flex;
    gap: 12px;
  }
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table) {
  .el-button.is-link {
    padding: 0;
    height: auto;
    margin-right: 8px;
  }
}
</style>
