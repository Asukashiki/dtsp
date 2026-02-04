<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-feedback-line"
        :title="$t('input.feedback.title')"
        :subtitle="$t('input.feedback.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('common.search')">
              <el-input
                v-model="searchKeyword"
                :placeholder="$t('input.feedback.searchPlaceholder')"
                class="search-input"
                clearable
                @clear="handleSearch"
                @keyup.enter="handleSearch">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('input.feedback.filterByType')">
              <el-select
                v-model="filterType"
                :placeholder="$t('input.feedback.filterByType')"
                class="filter-select"
                clearable
                @change="handleSearch">
                <el-option :label="$t('input.feedback.allTypes')" value="" />
                <el-option :label="$t('input.feedback.type.complaint')" value="0" />
                <el-option :label="$t('input.feedback.type.suggestion')" value="1" />
                <el-option :label="$t('input.feedback.type.inquiry')" value="2" />
                <el-option :label="$t('input.feedback.type.fault')" value="3" />
                <el-option :label="$t('input.feedback.type.other')" value="4" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('input.feedback.filterByStatus')">
              <el-select
                v-model="filterStatus"
                :placeholder="$t('input.feedback.filterByStatus')"
                class="filter-select"
                clearable
                @change="handleSearch">
                <el-option :label="$t('input.feedback.allStatus')" value="" />
                <el-option :label="$t('input.feedback.status.pending')" value="0" />
                <el-option :label="$t('input.feedback.status.processing')" value="1" />
                <el-option :label="$t('input.feedback.status.completed')" value="2" />
                <el-option :label="$t('input.feedback.status.closed')" value="3" />
              </el-select>
            </SearchItem>


          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('input.feedback.title')"
          icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('input.feedback.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
              <el-table-column prop="feedbackNo" :label="$t('input.feedback.columns.feedbackNo')" width="180" fixed="left" />
              <el-table-column prop="feedbackType" :label="$t('input.feedback.columns.feedbackType')" width="120" align="center">
                <template #default="{ row }">
                  <el-tag :type="getTypeTag(row.feedbackType)" size="small">
                    {{ getFeedbackTypeText(row.feedbackType) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="title" :label="$t('input.feedback.columns.title')" min-width="200" show-overflow-tooltip />
              <el-table-column prop="inputName" :label="$t('input.feedback.columns.inputName')" width="150" show-overflow-tooltip />
              <el-table-column prop="supplierName" :label="$t('input.feedback.columns.supplierName')" width="150" show-overflow-tooltip />

              <el-table-column prop="contactName" :label="$t('input.feedback.columns.contactName')" width="120" />
              <el-table-column prop="createTime" :label="$t('input.feedback.columns.createTime')" width="160" />
              <el-table-column :label="$t('input.feedback.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="getRowWorkflowStatus(row)"
                    mode="list"
                    :show-audit="false"
                    :custom-buttons="getRowActionButtons(row)"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.page"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片列表 -->
        <div class="mobile-card-list mobile-only" v-loading="loading">
          <div v-for="item in tableData" :key="item.feedbackId" class="mobile-card" @click="handleView(item)">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-feedback-line"></i>
                <span>{{ item.title }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.feedback.columns.feedbackNo') }}:</span>
                <span class="value">{{ item.feedbackNo }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.feedback.columns.feedbackType') }}:</span>
                <el-tag :type="getTypeTag(item.feedbackType)" effect="plain" size="small">
                  {{ getFeedbackTypeText(item.feedbackType) }}
                </el-tag>
              </div>

              <div class="mobile-card-row">
                <span class="label">{{ $t('input.feedback.columns.contactName') }}:</span>
                <span class="value">{{ item.contactName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.feedback.columns.createTime') }}:</span>
                <span class="value">{{ item.createTime }}</span>
              </div>
            </div>
            <div class="mobile-card-footer" @click.stop>
              <ActionButtons
                :workflow-status="getRowWorkflowStatus(item)"
                mode="list"
                :show-audit="false"
                :custom-buttons="getRowActionButtons(item)"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="pagination.page"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              layout="prev, pager, next"
              small
              @current-change="handlePageChange"
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
import { getFeedbackList, deleteFeedback } from '@/api/feedback'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

const searchKeyword = ref('')
const filterType = ref('')
const filterStatus = ref('')

const loading = ref(false)
const tableData = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 仅用于 ActionButtons 的展示（不影响业务）
const getRowWorkflowStatus = (row) => (row?.status === '0' ? 'S0' : 'S2')

// 列表操作按钮（替换为统一按钮样式：图标 + 文字）
const getRowActionButtons = (row) => {
  const buttons = [
    { type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' }
  ]
  if (row?.status === '0') {
    buttons.push({ type: 'primary', action: 'edit', label: 'edit', icon: 'ri-edit-line' })
    buttons.push({ type: 'danger', action: 'delete', label: 'delete', icon: 'ri-delete-bin-line' })
  }
  return buttons
}

// 获取反馈类型标签
const getTypeTag = (type) => {
  const typeMap = {
    '0': 'danger',   // 投诉
    '1': 'success',  // 建议
    '2': 'info',     // 咨询
    '3': 'warning',  // 故障报告
    '4': ''          // 其他
  }
  return typeMap[type] || ''
}

// 获取反馈类型文本
const getFeedbackTypeText = (type) => {
  const typeMap = {
    '0': t('input.feedback.type.complaint'),
    '1': t('input.feedback.type.suggestion'),
    '2': t('input.feedback.type.inquiry'),
    '3': t('input.feedback.type.fault'),
    '4': t('input.feedback.type.other')
  }
  return typeMap[type] || ''
}



// 获取状态标签
const getStatusTag = (status) => {
  const statusMap = {
    '0': 'info',     // 待处理
    '1': 'warning',  // 处理中
    '2': 'success',  // 已完成
    '3': ''          // 已关闭
  }
  return statusMap[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    '0': t('input.feedback.status.pending'),
    '1': t('input.feedback.status.processing'),
    '2': t('input.feedback.status.completed'),
    '3': t('input.feedback.status.closed')
  }
  return statusMap[status] || ''
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getFeedbackList({
      contentKeyword: searchKeyword.value,
      feedbackType: filterType.value,
      status: filterStatus.value,

      pageNum: pagination.page,
      pageSize: pagination.pageSize
    })

    if (res.code === 200) {
      tableData.value = res.rows || []
      pagination.total = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load feedback list:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchKeyword.value = ''
  filterType.value = ''
  filterStatus.value = ''

  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => {
  router.push('/input/feedback/add')
}

// 查看
const handleView = (row) => {
  router.push(`/input/feedback/detail/${row.feedbackId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/input/feedback/edit/${row.feedbackId}`)
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('input.feedback.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteFeedback(row.feedbackId)
      if (res.code === 200) {
        ElMessage.success(t('input.feedback.deleteSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete feedback:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
}

// 统一动作处理（仅做 UI 事件聚合，不改变原有业务方法）
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'delete':
      handleDelete(row)
      break
  }
}

// 切换每页条数
const handleSizeChange = () => {
  pagination.page = 1
  loadData()
}

// 切换页码
const handlePageChange = () => {
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
