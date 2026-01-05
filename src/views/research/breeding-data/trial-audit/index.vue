<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-list-check-2"
        :title="t('research.trialBasicAudit.audit.title')"
        :subtitle="t('research.trialBasicAudit.audit.subtitle1')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="resetQuery">
            <SearchItem :label="t('research.trialBasicAudit.audit.list.trialName')">
              <el-input
                v-model="queryParams.trialName"
                :placeholder="t('research.trialBasicAudit.list.searchPlaceholder')"
                clearable
                @keyup.enter="handleQuery"
              />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="t('research.trialBasicAudit.list.title')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          
          <!-- 状态标签页 -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />
          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table
              v-loading="loading"
              :data="auditList"
              stripe
            >
              <el-table-column
                prop="trialId"
                :label="t('research.trialBasicAudit.list.trialId')"
                min-width="180"
                show-overflow-tooltip
              />
              <el-table-column
                prop="trialName"
                :label="t('research.trialBasicAudit.audit.list.trialName')"
                min-width="200"
                show-overflow-tooltip
              />
              <el-table-column
                prop="batchId"
                :label="t('research.trialBasicAudit.audit.list.batchName')"
                min-width="150"
                show-overflow-tooltip
              />
              <el-table-column
                :label="t('research.trialBasicAudit.list.cropType')"
                min-width="120"
              >
                <template #default="{ row }">
                  {{ getLabelByValue('crop_type', row.cropType) || row.cropType || '-' }}
                </template>
              </el-table-column>
              <el-table-column
                prop="varietyName"
                :label="t('research.trialBasicAudit.list.varietyName')"
                min-width="150"
                show-overflow-tooltip
              />
              <el-table-column
                prop="createdName"
                :label="t('research.trialBasicAudit.list.createdBy')"
                min-width="120"
              />
              <el-table-column
                prop="createTime"
                :label="t('research.trialBasicAudit.list.createdTime')"
                min-width="180"
              >
                <template #default="{ row }">
                  {{ formatDate(row.createTime) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="submitterName"
                :label="t('research.trialBasicAudit.audit.list.submitter')"
                min-width="120"
              />
              <el-table-column
                prop="submitTime"
                :label="t('research.trialBasicAudit.audit.list.submitTime')"
                min-width="180"
              >
                <template #default="{ row }">
                  {{ formatDate(row.submitTime) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="auditStatusDesc"
                :label="t('research.trialBasicAudit.audit.list.workflowStatus')"
                min-width="120"
                align="center"
              >
                <template #default="{ row }">
                  <StatusTag :status="row.workflowStatus || row.auditStatus" type="workflow" />
                </template>
              </el-table-column>
              <el-table-column
                :label="t('research.trialBasicAudit.list.operation')"
                width="240"
                fixed="right"
                align="center"
              >
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus || row.auditStatus"
                    mode="list"
                    :is-voided-tab="activeTab === 'voided'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-if="total > 0"
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :total="total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="getList"
                @current-change="getList"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <AuditCard
            v-for="item in auditList"
            :key="item.auditId"
            :audit="item"
            :show-audit-button="activeTab === 'pendingApproval'"
            @audit="handleAudit"
            @view="handleView"
            @void="handleVoid"
          />
          <el-empty v-if="!loading && auditList.length === 0" :description="t('common.noData')" />

          <div class="pagination-wrapper">
            <el-pagination
              v-if="total > 0"
              v-model:current-page="queryParams.pageNum"
              v-model:page-size="queryParams.pageSize"
              :total="total"
              layout="prev, pager, next"
              small
              @current-change="getList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAuditList, voidAudit } from '@/api/research/trialBasicAudit'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import StatusTag from '../trial/components/StatusTag.vue'
import AuditCard from './components/AuditCard.vue'
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()
const router = useRouter()

// 数据
const loading = ref(false)
const activeTab = ref('pendingApproval')
const auditList = ref([])
const total = ref(0)

// Tab configuration
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'research.trialBasicAudit.audit.tabs.pending',
    icon: 'ri-time-line'
  },
  {
    name: 'audited',
    label: 'research.trialBasicAudit.audit.tabs.audited',
    icon: 'ri-check-line'
  }
]

// 使用 useDict hook 获取字典数据
const { options, getLabelByValue, loading: dictLoading } = useDict([
  'crop_type'
])
const queryParams = reactive({
  auditStatus: 'S1',
  trialName: '',
  pageNum: 1,
  pageSize: 10
})

// 格式化日期
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取列表
const getList = async () => {
  loading.value = true
  try {
    const res = await getAuditList(queryParams)
    const records = res.data.records || []

    // 处理数据，从 trialDataSnapshot 中提取创建人和修改人信息
    auditList.value = records.map(item => {
      let createdName = item.createdName
      let modifiedName = item.modifiedName

      // 如果 createdName 或 modifiedName 为空，尝试从 trialDataSnapshot 中解析
      if ((!createdName || !modifiedName) && item.trialDataSnapshot) {
        try {
          const snapshot = JSON.parse(item.trialDataSnapshot)
          // 从快照中获取创建人信息
          if (!createdName) {
            createdName = snapshot.createBy || snapshot.createdBy || snapshot.createByName || snapshot.createdName
          }
          // 从快照中获取修改人信息
          if (!modifiedName) {
            // 优先使用带Name后缀的字段，避免使用ID字段
            modifiedName = snapshot.updateByName || snapshot.modifiedByName || snapshot.modifiedName || snapshot.submittedName

            // 如果快照中没有修改人名称，使用提交人名称作为后备（提交人通常是最后修改人）
            if (!modifiedName) {
              modifiedName = item.submitterName || item.submitByName
            }

            // 如果还是没有，检查updateBy是否是用户名（非UUID格式）
            if (!modifiedName && snapshot.updateBy) {
              // 判断是否为32位UUID格式的ID，如果不是则认为是用户名
              const isUUID = /^[A-F0-9]{32}$/i.test(snapshot.updateBy)
              if (!isUUID) {
                modifiedName = snapshot.updateBy
              }
            }
          }
        } catch (error) {
          console.error('解析 trialDataSnapshot 失败:', error)
        }
      }

      return {
        ...item,
        // 设置创建人（优先使用已有值，否则使用从快照中解析的值）
        createdName: createdName || '-',
        // 设置修改人（优先使用已有值，否则使用从快照中解析的值）
        modifiedName: modifiedName || '-',
        // 确保提交人名称存在
        submitterName: item.submitterName || item.submitByName || item.submitter || item.submitBy || '-',
        // 确保审核人名称存在
        auditorName: item.auditorName || item.auditByName || item.auditor || item.auditBy || '-'
      }
    })

    total.value = res.data.total || 0
  } catch (error) {
    console.error('获取审核列表失败:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 查询
const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

// 重置
const resetQuery = () => {
  queryParams.trialName = ''
  handleQuery()
}

// Tab切换
const handleTabChange = (tab) => {
  if (tab === 'pendingApproval') {
    queryParams.auditStatus = 'S1'
  } else if (tab === 'audited') {
    queryParams.auditStatus = 'S2'
  }
  handleQuery()
}

// 处理操作
const handleAction = (row, action) => {
  switch (action) {
    case 'audit':
      handleAudit(row)
      break
    case 'view':
      handleView(row)
      break
  }
}

// 审核
const handleAudit = (row) => {
  router.push({
    name: 'TrialBasicAuditReview',
    params: { id: row.auditId }
  })
}

// 查看
const handleView = (row) => {
  router.push({
    name: 'TrialBasicAuditReview',
    params: { id: row.auditId },
    query: { readonly: true }
  })
}

// 作废
const handleVoid = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.trialBasicAudit.action.voidConfirm'),
      t('research.trialBasicAudit.action.void'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    await voidAudit(row.auditId, 'Voided by user')
    ElMessage.success(t('research.trialBasicAudit.action.voidSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('作废审核记录失败:', error)
      ElMessage.error(t('research.trialBasicAudit.action.voidFailed'))
    }
  }
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
