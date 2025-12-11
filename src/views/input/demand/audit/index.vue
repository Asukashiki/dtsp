<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-task-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('input.menu.KebeleAudit') }}</h1>
            <p class="page-subtitle">{{ $t('demandAudit.subtitle') }}</p>
          </div>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('demandAudit.actions.back') }}
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check"></i>
              <span>{{ $t('demandAudit.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button
                type="primary"
                @click="handleBatchApprove"
                :disabled="selectedRows.length === 0"
                v-if="activeTab === 'pending'"
              >
                <i class="ri-check-line"></i>
                {{ $t('demandAudit.actions.batchApprove') }}
              </el-button>
              <el-button
                type="danger"
                @click="handleBatchReject"
                :disabled="selectedRows.length === 0"
                v-if="activeTab === 'pending'"
              >
                <i class="ri-close-line"></i>
                {{ $t('demandAudit.actions.batchReject') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <el-tabs v-model="activeTab">
              <el-tab-pane :label="$t('demandAudit.tabs.pending')" name="pending" />
              <el-tab-pane :label="$t('demandAudit.tabs.approved')" name="approved" />
            </el-tabs>

            <div v-if="activeTab === 'pending'">
              <!-- 搜索区域 -->
              <div class="search-section">
                <el-input
                  v-model="searchForm.keyword"
                  :placeholder="$t('demandAudit.searchPlaceholder')"
                  clearable
                  class="search-input"
                >
                  <template #prefix>
                    <i class="ri-search-line"></i>
                  </template>
                </el-input>

                <el-button type="primary" @click="handleSearch">
                  <i class="ri-search-line"></i>
                  {{ $t('common.search') }}
                </el-button>
                <el-button @click="handleReset" style="margin-left: 0px;">
                  <i class="ri-refresh-line"></i>
                  {{ $t('common.reset') }}
                </el-button>
              </div>

              <!-- PC端表格 -->
              <div class="table-wrapper pc-only">
              <el-table
                v-loading="loading"
                :data="tableData"
                stripe
                @selection-change="handleSelectionChange"
                empty-text=""
              >
                <el-table-column type="selection" width="55" />
                <el-table-column
                  prop="batchNo"
                  :label="$t('demandAudit.columns.batchNo')"
                  min-width="150"
                />
                <el-table-column
                  prop="farmerName"
                  :label="$t('demandAudit.columns.farmerName')"
                  min-width="120"
                />
                <el-table-column
                  prop="farmerIdNumber"
                  :label="$t('demandAudit.columns.farmerIdNumber')"
                  min-width="150"
                />
                <el-table-column
                  prop="woreda"
                  :label="$t('demandAudit.columns.woreda')"
                  min-width="120"
                />
                <el-table-column
                  prop="kebele"
                  :label="$t('demandAudit.columns.kebele')"
                  min-width="120"
                />
                <!-- <el-table-column
                  prop="village"
                  :label="$t('demandAudit.columns.village')"
                  min-width="120"
                /> -->
                <el-table-column
                  prop="landArea"
                  :label="$t('demandAudit.columns.landArea')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    {{ row.landArea || '-' }}
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="currentAuditLevel"
                  :label="$t('demandAudit.columns.currentAuditLevel')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    {{ getAuditLevelLabel(row.currentAuditLevel) }}
                  </template>
                </el-table-column> -->
                <el-table-column
                  prop="submitTime"
                  :label="$t('demandAudit.columns.submitTime')"
                  min-width="160"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="280">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>
                        {{ $t('common.view') }}
                      </el-button>
                      <el-button link type="success" @click="handleApprove(row)">
                        <i class="ri-check-line"></i>
                        {{ $t('demandAudit.actions.approve') }}
                      </el-button>
                      <el-button link type="danger" @click="handleReject(row)">
                        <i class="ri-close-line"></i>
                        {{ $t('demandAudit.actions.reject') }}
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              </div>
              
            <!-- 移动端卡片 -->
            <div class="mobile-cards mobile-only">
              <div v-for="item in tableData" :key="item.id" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox
                    v-model="item.checked"
                    @change="handleMobileCheck(item)"
                  />
                  <div class="farmer-name">
                    <i class="ri-user-line"></i>
                    <span>{{ item.farmerName }}</span>
                  </div>
                  <el-tag type="info" size="small">
                    {{ getAuditLevelLabel(item.currentAuditLevel) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandAudit.columns.batchNo') }}:</span>
                    <span class="value">{{ item.batchNo }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandAudit.columns.farmerIdNumber') }}:</span>
                    <span class="value">{{ item.farmerIdNumber }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandAudit.columns.kebele') }}:</span>
                    <span class="value">{{ item.kebele }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandAudit.columns.woreda') }}:</span>
                    <span class="value">{{ item.woreda }}</span>
                  </div>
                  <!-- <div class="mobile-card-row">
                    <span class="label">{{ $t('demandAudit.columns.village') }}:</span>
                    <span class="value">{{ item.village }}</span>
                  </div> -->
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandAudit.columns.landArea') }}:</span>
                    <span class="value">{{ item.landArea || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('demandAudit.columns.submitTime') }}:</span>
                    <span class="value">{{ item.submitTime || '-' }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button type="primary" size="small" @click="handleView(item)">
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button type="success" size="small" @click="handleApprove(item)">
                    {{ $t('demandAudit.actions.approve') }}
                  </el-button>
                  <el-button type="danger" size="small" @click="handleReject(item)">
                    {{ $t('demandAudit.actions.reject') }}
                  </el-button>
                </div>
              </div>
            </div>
            </div>


            <!-- 分页 -->
            <div v-if="activeTab === 'pending' && pagination.total > 0" class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.currentPage"
                v-model:page-size="pagination.pageSize"
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
              v-if="activeTab === 'pending' && tableData.length === 0 && !loading"
              :description="$t('demandAudit.messages.noData')"
            />

            <!-- 已审核 Tab 内容 -->
            <div v-if="activeTab === 'approved'">
              <!-- 搜索区域 -->
              <div class="search-section">
                <el-input
                  v-model="searchForm.keyword"
                  :placeholder="$t('demandAudit.searchPlaceholder')"
                  clearable
                  class="search-input"
                >
                  <template #prefix>
                    <i class="ri-search-line"></i>
                  </template>
                </el-input>

                <el-button type="primary" @click="handleSearch">
                  <i class="ri-search-line"></i>
                  {{ $t('common.search') }}
                </el-button>
                <el-button @click="handleReset" style="margin-left: 0px;">
                  <i class="ri-refresh-line"></i>
                  {{ $t('common.reset') }}
                </el-button>
              </div>

              <!-- PC端表格 -->
              <div class="table-wrapper pc-only">
                <el-table
                  v-loading="approvedLoading"
                  :data="approvedData"
                  stripe
                  empty-text=""
                >
                  <el-table-column
                    prop="batchNo"
                    :label="$t('demandAudit.columns.batchNo')"
                    min-width="150"
                  />
                  <el-table-column
                    prop="farmerName"
                    :label="$t('demandAudit.columns.farmerName')"
                    min-width="120"
                  />
                  <el-table-column
                    prop="farmerIdNumber"
                    :label="$t('demandAudit.columns.farmerIdNumber')"
                    min-width="150"
                  />
                  <el-table-column
                    prop="woreda"
                    :label="$t('demandAudit.columns.woreda')"
                    min-width="120"
                  />
                  <el-table-column
                    prop="kebele"
                    :label="$t('demandAudit.columns.kebele')"
                    min-width="120"
                  />
                  <el-table-column
                    prop="landArea"
                    :label="$t('demandAudit.columns.landArea')"
                    min-width="120"
                  >
                    <template #default="{ row }">
                      {{ row.landArea || '-' }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="submitTime"
                    :label="$t('demandAudit.columns.submitTime')"
                    min-width="160"
                  />
                  <el-table-column :label="$t('common.actions')" fixed="right" width="150">
                    <template #default="{ row }">
                      <div class="action-buttons">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>
                          {{ $t('common.view') }}
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!-- 移动端卡片 -->
              <div class="mobile-cards mobile-only">
                <div v-for="item in approvedData" :key="item.id" class="mobile-card">
                  <div class="mobile-card-header">
                    <div class="farmer-name">
                      <i class="ri-user-line"></i>
                      <span>{{ item.farmerName }}</span>
                    </div>
                    <el-tag type="success" size="small">
                      {{ $t('demandAudit.status.approved') }}
                    </el-tag>
                  </div>
                  <div class="mobile-card-body">
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('demandAudit.columns.batchNo') }}:</span>
                      <span class="value">{{ item.batchNo }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('demandAudit.columns.farmerIdNumber') }}:</span>
                      <span class="value">{{ item.farmerIdNumber }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('demandAudit.columns.kebele') }}:</span>
                      <span class="value">{{ item.kebele }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('demandAudit.columns.woreda') }}:</span>
                      <span class="value">{{ item.woreda }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('demandAudit.columns.landArea') }}:</span>
                      <span class="value">{{ item.landArea || '-' }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('demandAudit.columns.submitTime') }}:</span>
                      <span class="value">{{ item.submitTime || '-' }}</span>
                    </div>
                  </div>
                  <div class="mobile-card-actions">
                    <el-button type="primary" size="small" @click="handleView(item)">
                      {{ $t('common.view') }}
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- 分页 -->
              <div v-if="pagination.total > 0" class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="pagination.currentPage"
                  v-model:page-size="pagination.pageSize"
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
                v-if="approvedData.length === 0 && !approvedLoading"
                :description="$t('demandAudit.messages.noData')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 审核通过对话框 -->
    <el-dialog
      v-model="approveDialogVisible"
      :title="$t('demandAudit.approveDialog.title')"
      width="500px"
    >
      <!-- <el-form :model="approveForm" label-width="100px">
        <el-form-item :label="$t('demandAudit.approveDialog.remark')">
          <el-input
            v-model="approveForm.remark"
            type="textarea"
            :rows="3"
            :placeholder="$t('demandAudit.approveDialog.remarkPlaceholder')"
          />
        </el-form-item>
      </el-form> -->
      <template #footer>
        <el-button @click="approveDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirmApprove" :loading="submitting">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 审核驳回对话框 -->
    <el-dialog
      v-model="rejectDialogVisible"
      :title="$t('demandAudit.rejectDialog.title')"
      width="500px"
    >
      <!-- <el-form :model="rejectForm" :rules="rejectRules" ref="rejectFormRef" label-width="100px">
        <el-form-item :label="$t('demandAudit.rejectDialog.auditOpinion')" prop="auditOpinion">
          <el-input
            v-model="rejectForm.auditOpinion"
            type="textarea"
            :rows="3"
            :placeholder="$t('demandAudit.rejectDialog.auditOpinionPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('demandAudit.rejectDialog.remark')">
          <el-input
            v-model="rejectForm.remark"
            type="textarea"
            :rows="3"
            :placeholder="$t('demandAudit.rejectDialog.remarkPlaceholder')"
          />
        </el-form-item>
      </el-form> -->
      <template #footer>
        <el-button @click="rejectDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="danger" @click="confirmReject" :loading="submitting">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPendingDemandPage, approveDemand, rejectDemand, getApprovedDemandPage } from '@/api/demandAudit'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 获取路由年份参数
const yearParam = ref(route.params.year || '')

const loading = ref(false)
const submitting = ref(false)
const tableData = ref([])
const selectedRows = ref([])

// Tab
const activeTab = ref('pending')

// 已审核数据
const approvedLoading = ref(false)
const approvedData = ref([])

// 搜索表单
const searchForm = reactive({
  keyword: ''
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 审核层级选项
const auditLevelOptions = computed(() => ({
  village: t('demandAudit.auditLevel.village'),
  town: t('demandAudit.auditLevel.town'),
  district: t('demandAudit.auditLevel.district'),
  state: t('demandAudit.auditLevel.state'),
  ministry: t('demandAudit.auditLevel.ministry')
}))

// 获取审核层级标签
const getAuditLevelLabel = (level) => {
  return auditLevelOptions.value[level] || level
}

// 审核通过对话框
const approveDialogVisible = ref(false)
const approveForm = reactive({
  ids: [],
  remark: ''
})

// 审核驳回对话框
const rejectDialogVisible = ref(false)
const rejectForm = reactive({
  ids: [],
  auditOpinion: '',
  remark: ''
})

const rejectFormRef = ref(null)
const rejectRules = reactive({
  auditOpinion: [
    { required: true, message: t('demandAudit.rejectDialog.auditOpinionRequired'), trigger: 'blur' }
  ]
})

// 加载待审核数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
      farmerName: searchForm.keyword || undefined,
      // kebele:JSON.parse(localStorage.getItem('userInfo')).user.regionCode,
      kebele:'huangshan',
      year: yearParam.value // 添加年份参数
    }
    const res = await getPendingDemandPage(params)
    if (res.code === 200) {
      tableData.value = res.data.records.map(item => ({
        ...item,
        checked: false
      }))
      pagination.total = res.data.total
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('demandAudit.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 加载已审核数据
const loadApprovedData = async () => {
  approvedLoading.value = true
  try {
    const params = {
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
      farmerName: searchForm.keyword || undefined,
      // kebele:JSON.parse(localStorage.getItem('userInfo')).user.regionCode,
      kebele:'huangshan',
      year: yearParam.value // 添加年份参数
    }
    const res = await getApprovedDemandPage(params)
    if (res.code === 200) {
      approvedData.value = res.data.records.map(item => ({
        ...item,
        checked: false
      }))
      pagination.total = res.data.total
    }
  } catch (error) {
    console.error('Failed to load approved data:', error)
    ElMessage.error(t('demandAudit.messages.loadFailed'))
  } finally {
    approvedLoading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  if (activeTab.value === 'pending') {
    loadData()
  } else if (activeTab.value === 'approved') {
    loadApprovedData()
  }
}

// 重置
const handleReset = () => {
  searchForm.keyword = ''
  pagination.currentPage = 1
  if (activeTab.value === 'pending') {
    loadData()
  } else if (activeTab.value === 'approved') {
    loadApprovedData()
  }
}

// 选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 移动端复选框变化
const handleMobileCheck = (item) => {
  if (item.checked) {
    if (!selectedRows.value.find(row => row.id === item.id)) {
      selectedRows.value.push(item)
    }
  } else {
    selectedRows.value = selectedRows.value.filter(row => row.id !== item.id)
  }
}

// 查看详情
const handleView = (row) => {
  router.push({ name: 'DemandAuditDetail', params: { id: row.id } })
}

// 单个审核通过
const handleApprove = (row) => {
  approveForm.ids = [row.id]
  approveForm.remark = ''
  approveDialogVisible.value = true
}

// 批量审核通过
const handleBatchApprove = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(t('demandAudit.messages.selectItems'))
    return
  }
  approveForm.ids = selectedRows.value.map(row => row.id)
  approveForm.remark = ''
  approveDialogVisible.value = true
}

// 确认审核通过
const confirmApprove = async () => {
  try {
    await ElMessageBox.confirm(
      t('demandAudit.approveDialog.confirmMessage', { count: approveForm.ids.length }),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitting.value = true
    const res = await approveDemand({
      ids: approveForm.ids,
      remark: approveForm.remark || undefined
    })

    if (res.code === 200) {
      ElMessage.success(t('demandAudit.approveDialog.success'))
      approveDialogVisible.value = false
      selectedRows.value = []
      loadData()
    } else {
      ElMessage.error(res.msg || t('demandAudit.messages.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to approve:', error)
      ElMessage.error(t('demandAudit.messages.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 单个审核驳回
const handleReject = (row) => {
  rejectForm.ids = [row.id]
  rejectForm.auditOpinion = ''
  rejectForm.remark = ''
  rejectDialogVisible.value = true
}

// 批量审核驳回
const handleBatchReject = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(t('demandAudit.messages.selectItems'))
    return
  }
  rejectForm.ids = selectedRows.value.map(row => row.id)
  rejectForm.auditOpinion = ''
  rejectForm.remark = ''
  rejectDialogVisible.value = true
}


// 确认审核驳回
const confirmReject = async () => {
  if (!rejectFormRef.value) return

  try {
    await rejectFormRef.value.validate()

    await ElMessageBox.confirm(
      t('demandAudit.rejectDialog.confirmMessage', { count: rejectForm.ids.length }),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitting.value = true
    const res = await rejectDemand({
      ids: rejectForm.ids,
      auditOpinion: rejectForm.auditOpinion,
      remark: rejectForm.remark || undefined
    })

    if (res.code === 200) {
      ElMessage.success(t('demandAudit.rejectDialog.success'))
      rejectDialogVisible.value = false
      selectedRows.value = []
      loadData()
    } else {
      ElMessage.error(res.msg || t('demandAudit.messages.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel' && error !== false) {
      console.error('Failed to reject:', error)
      ElMessage.error(t('demandAudit.messages.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 分页
const handleSizeChange = () => {
  pagination.currentPage = 1
  if (activeTab.value === 'pending') {
    loadData()
  } else if (activeTab.value === 'approved') {
    loadApprovedData()
  }
}

const handleCurrentChange = () => {
  if (activeTab.value === 'pending') {
    loadData()
  } else if (activeTab.value === 'approved') {
    loadApprovedData()
  }
}

// 监听 Tab 切换
watch(activeTab, (val) => {
  if (val === 'pending') {
    pagination.currentPage = 1
    loadData()
  } else if (val === 'approved') {
    pagination.currentPage = 1
    loadApprovedData()
  }
})

// 返回到需求汇聚页面
const handleBack = () => {
  router.push({
    name: 'VillageAggregation'
  })
}

// 初始化
onMounted(() => {
  loadData()
})
</script>
<style scoped>
.page-container {
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

/* age-wrapper {
  margin: 0 auto;
} */

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

.header-right {
  flex-shrink: 0;
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
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.info-card {
  background: white;
}

.card-header {
  padding: 24px;
  border-bottom: 1px solid #e8f5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.card-body {
  padding: 24px;
}

.search-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-input {
  width: 300px;
}

.table-wrapper {
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.mobile-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.mobile-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.mobile-card-header {
  padding: 16px;
  background: linear-gradient(135deg, #f0f9f4 0%, #e8f5e9 100%);
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.farmer-name {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  font-weight: 600;
  color: #333;
}

.mobile-card-body {
  padding: 16px;
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
  min-width: 120px;
  flex-shrink: 0;
}

.mobile-card-row .value {
  color: #333;
  font-weight: 500;
}

.mobile-card-actions {
  padding: 12px 16px;
  background: #fafafa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

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

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .el-button {
    flex: 1;
  }

  .card-body {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input {
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
