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
            <h1 class="page-title">{{ $t('trait-audit.title') }}</h1>
            <p class="page-subtitle">{{ $t('trait-audit.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('trait-audit.listName') }}</span>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <div class="search-item">
                <span class="search-label">{{ $t('trait.growthStage') }}:</span>
                <el-select
                    v-model="queryParams.growthStage"
                    :placeholder="$t('trait-audit.pleaseSelect')"
                    clearable
                    class="filter-select"
                >
                  <el-option v-for="item in options.growth_cycle || []" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">{{ $t('trait-audit.auditStatusLabel') }}:</span>
                <el-select
                    v-model="queryParams.auditStatus"
                    :placeholder="$t('trait-audit.pleaseSelect')"
                    clearable
                    class="filter-select"
                >
                  <el-option :label="$t('trait-audit.status.pending')" value="pending" />
                  <el-option :label="$t('trait-audit.status.approved')" value="approved" />
                  <!-- 删除已驳回选项，避免误选 -->
                  <!-- <el-option :label="$t('trait-audit.status.rejected')" value="rejected" /> -->
                </el-select>
              </div>
              <div class="search-actions">
                <el-button type="primary" @click="handleQuery">
                  <i class="ri-search-line"></i>{{ $t('trait-audit.queryBtn') }}
                </el-button>
                <el-button @click="handleReset">
                  <i class="ri-refresh-line"></i>{{ $t('trait-audit.resetBtn') }}
                </el-button>
              </div>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading">
                <el-table-column prop="plotId" :label="$t('trait-audit.plotId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" :label="$t('trait-audit.trialId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('trait-audit.batchId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="observationDate" :label="$t('trait-audit.observationDate')" min-width="160" />
                <el-table-column prop="growthStage" :label="$t('trait-audit.growthStage')" min-width="120">
                  <template #default="{ row }">
                    {{ getLabelByValue('growth_cycle', row.growthStage) || row.growthStage }}
                  </template>
                </el-table-column>
                <!-- 性状数量列 -->
                <el-table-column :label="$t('trait-audit.traitCount')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag type="success" v-loading="detailLoading[row.recordId || row.traitId]">
                      {{ row.traitDetailLength || 0 }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('trait-audit.auditStatus')" min-width="140">
                  <template #default="{ row }">
                    <el-tag :type="getAuditStatusType(row.auditStatus)">
                      {{ row.auditStatus === 'pending' ? $t('trait-audit.status.pending') : row.auditStatus === 'approved' ? $t('trait-audit.status.approved') : $t('trait-audit.status.rejected') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="createBy" :label="$t('trait-audit.submitter')" min-width="120" show-overflow-tooltip />
                <el-table-column prop="createTime" :label="$t('trait-audit.submitTime')" min-width="160" />
                <el-table-column :label="$t('trait-audit.operations')" width="200" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button
                          link
                          type="primary"
                          @click="handleView(row)"
                      >
                        <i class="ri-eye-line"></i>{{ $t('trait-audit.viewBtn') }}
                      </el-button>
                      <el-button
                          v-if="row.auditStatus === 'pending'"
                          link
                          type="success"
                          @click="handleAudit(row)"
                      >
                        <i class="ri-check-line"></i>{{ $t('trait-audit.auditBtn') }}
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
                    {{ item.auditStatus === 'pending' ? $t('trait-audit.status.pending') : item.auditStatus === 'approved' ? $t('trait-audit.status.approved') : $t('trait-audit.status.rejected') }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('trait-audit.mobileLabels.plotId') }}:</span>
                    <span class="value">{{ item.plotId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('trait-audit.mobileLabels.observationDate') }}:</span>
                    <span class="value">{{ item.observationDate }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('trait-audit.mobileLabels.growthStage') }}:</span>
                    <span class="value">{{ getLabelByValue('growth_cycle', item.growthStage) || item.growthStage }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('trait-audit.mobileLabels.traitCount') }}:</span>
                    <span class="value" v-loading="detailLoading[item.recordId || item.traitId]">
                      {{ item.traitDetailLength || 0 }}
                    </span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <el-button
                      size="small"
                      type="primary"
                      @click="handleView(item)"
                  >
                    <i class="ri-eye-line"></i>{{ $t('trait-audit.viewBtn') }}
                  </el-button>
                  <el-button
                      v-if="item.auditStatus === 'pending'"
                      size="small"
                      type="success"
                      @click="handleAudit(item)"
                  >
                    <i class="ri-check-line"></i>{{ $t('trait-audit.auditBtn') }}
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
            <el-empty v-if="dataList.length === 0 && !loading" :description="$t('trait-audit.emptyData')" />
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
import { getAgronomicTraitAuditList, getBatchOptions, getTrialOptions, getTraitRecordInfo } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const { options, getLabelByValue } = useDict(['growth_cycle'])

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const batchOptions = ref([])
const trialOptions = ref([])
const detailLoading = ref({})
const traitDetailLengthCache = ref({})

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  batchId: '',
  trialId: '',
  growthStage: '',
  auditStatus: ''
})

// 审核状态标签类型映射
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
    dataList.value = res.data?.list || [];
    total.value = res.data?.total || 0;

    for (const item of dataList.value) {
      const recordUniqueId = item.recordId || item.traitId
      if (traitDetailLengthCache.value[recordUniqueId] !== undefined) {
        item.traitDetailLength = traitDetailLengthCache.value[recordUniqueId]
        continue
      }

      detailLoading.value[recordUniqueId] = true
      try {
        const traitDetailRes = await getTraitRecordInfo(recordUniqueId)
        if (traitDetailRes.code === 200 && traitDetailRes.data) {
          item.traitDetailLength = traitDetailRes.data.detailList?.length || 0
          traitDetailLengthCache.value[recordUniqueId] = item.traitDetailLength
        } else {
          item.traitDetailLength = 0
          traitDetailLengthCache.value[recordUniqueId] = 0
        }
      } catch (error) {
        console.error(`加载性状记录【${recordUniqueId}】明细失败:`, error)
        item.traitDetailLength = 0
        traitDetailLengthCache.value[recordUniqueId] = 0
      } finally {
        detailLoading.value[recordUniqueId] = false
      }
    }
  } catch (error) {
    console.error('获取性状审核列表失败:', error)
    ElMessage.error(t('trait-audit.message.loadFailed'))
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

// 进入审核页面
const handleAudit = (row) => {
  router.push({
    name: 'AgronomicTraitDataAuditReview',
    params: { traitId: row.traitId || row.recordId }
  })
}

// 查看详情
const handleView = (row) => {
  router.push({
    name: 'AgronomicTraitDataAuditReview',
    params: { traitId: row.traitId || row.recordId }
  })
}

onMounted(() => {
  loadBatchOptions()
  loadTrialOptions()
  getList()
})
</script>

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

/* 搜索区域样式 */
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
  margin-left: auto;
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

/* 响应式适配 */
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