<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-database-2-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('townAggregation.title') }}</h1>
            <p class="page-subtitle">{{ $t('townAggregation.subtitle') }}</p>
          </div>
        </div>
<!--        <div class="header-right">-->
<!--          <el-button type="primary" size="large" @click="handleAddYear">-->
<!--            <i class="ri-add-line"></i>-->
<!--            {{ $t('townAggregation.actions.addYear') }}-->
<!--          </el-button>-->
<!--        </div>-->
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <!-- 主列表视图 -->
          <template v-if="viewMode === 'main'">
            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table
                v-loading="loading"
                :data="tableData"
                stripe
                empty-text=""
              >
                <el-table-column
                  prop="year"
                  :label="$t('townAggregation.columns.year')"
                  min-width="100"
                />
                <!-- <el-table-column
                  prop="sourceCode"
                  :label="$t('townAggregation.columns.sourceCode')"
                  min-width="140"
                /> -->
                <el-table-column
                  prop="sourceName"
                  :label="$t('WoredaName')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    <el-button link type="primary" @click="handleDrillDown(row)">
                      {{ row.sourceName }}
                    </el-button>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="targetCode"
                  :label="$t('townAggregation.columns.targetCode')"
                  min-width="140"
                />
                <el-table-column
                  prop="targetName"
                  :label="$t('townAggregation.columns.targetName')"
                  min-width="140"
                /> -->
                <el-table-column
                  prop="subQuantity"
                  :label="$t('townAggregation.columns.subQuantity')"
                  min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="unsubmitQuantity"
                    :label="$t('unsubmitQuantity')"
                    min-width="140"
                />
                <el-table-column
                    prop="submitQuantity"
                    :label="$t('submitQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="auditQuantity"
                    :label="$t('auditQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  :label="$t('townAggregation.columns.status')"
                  min-width="100"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.status === '0'" type="info">
                      {{ $t('townAggregation.status.draft') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '1'" type="warning">
                      {{ $t('townAggregation.status.pending') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '2'" type="success">
                      {{ $t('townAggregation.status.approved') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '3'" type="danger">
                      {{ $t('townAggregation.status.rejected') }}
                    </el-tag>
                  </template>
                </el-table-column>
  <!--              <el-table-column-->
  <!--                prop="creator"-->
  <!--                :label="$t('townAggregation.columns.creator')"-->
  <!--                min-width="120"-->
  <!--              />-->
                <el-table-column
                  prop="createTime"
                  :label="$t('townAggregation.columns.createTime')"
                  min-width="160"
                />
                <el-table-column
                  :label="$t('townAggregation.columns.actions')"
                  fixed="right"
                  width="340"
                >
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleApprove(row)">
                        <i class="ri-file-list-3-line"></i>
                        {{ $t('townAggregation.actions.approve') }}
                      </el-button>
                      <el-button v-if="row.status === '0'||row.status === '3'" link type="success" @click="handleSubmit(row)">
                        <i class="ri-upload-cloud-line"></i>
                        {{ $t('townAggregation.actions.submit') }}
                      </el-button>
                      <el-button link type="info" @click="handleDetail(row)">
                        <i class="ri-list-check"></i>
                        {{ $t('townAggregation.actions.detail') }}
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
                  <div class="year-badge">
                    <i class="ri-calendar-line"></i>
                    <span>{{ item.year }}</span>
                  </div>
                  <el-tag v-if="item.status === '0'" type="info" size="small">
                    {{ $t('townAggregation.status.draft') }}
                  </el-tag>
                  <el-tag v-else-if="item.status === '1'" type="warning" size="small">
                    {{ $t('townAggregation.status.pending') }}
                  </el-tag>
                  <el-tag v-else-if="item.status === '2'" type="success" size="small">
                    {{ $t('townAggregation.status.approved') }}
                  </el-tag>
                  <el-tag v-else-if="item.status === '3'" type="danger" size="small">
                    {{ $t('townAggregation.status.rejected') }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <!-- <div class="mobile-card-row">
                    <span class="label">{{ $t('townAggregation.columns.sourceCode') }}:</span>
                    <span class="value">{{ item.sourceCode }}</span>
                  </div> -->
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('townAggregation.columns.sourceName') }}:</span>
                    <span class="value">{{ item.sourceName }}</span>
                  </div>
                  <!-- <div class="mobile-card-row">
                    <span class="label">{{ $t('townAggregation.columns.targetCode') }}:</span>
                    <span class="value">{{ item.targetCode }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('townAggregation.columns.targetName') }}:</span>
                    <span class="value">{{ item.targetName }}</span>
                  </div> -->
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('townAggregation.columns.subQuantity') }}:</span>
                    <span class="value">{{ (item.approvedQuantity || 0) + '/' + (item.subQuantity || 0) }}</span>
                  </div>
  <!--                <div class="mobile-card-row">-->
  <!--                  <span class="label">{{ $t('townAggregation.columns.creator') }}:</span>-->
  <!--                  <span class="value">{{ item.creator }}</span>-->
  <!--                </div>-->
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('townAggregation.columns.createTime') }}:</span>
                    <span class="value">{{ item.createTime }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button v-if="item.status === '0'||item.status === '3'" type="primary" size="small" @click="handleApprove(item)">
                    {{ $t('townAggregation.actions.approve') }}
                  </el-button>
                  <el-button v-if="item.status === '0'||item.status === '3'" type="success" size="small" @click="handleSubmit(item)">
                    {{ $t('townAggregation.actions.submit') }}
                  </el-button>
                  <el-button type="info" size="small" @click="handleDetail(item)">
                    {{ $t('townAggregation.actions.detail') }}
                  </el-button>
                </div>
              </div>
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
                @update:current-page="pagination.currentPage = $event"
                @update:page-size="pagination.pageSize = $event"
              />
            </div>

            <!-- 空状态 -->
            <el-empty
              v-if="tableData.length === 0 && !loading"
              :description="$t('townAggregation.messages.noData')"
            />
          </template>

          <!-- 下钻列表视图 -->
          <template v-else-if="viewMode === 'drillDown'">
            <!-- 返回按钮和面包屑 -->
            <div class="drill-down-header">
              <el-button type="primary" plain @click="handleBackToMain">
                <i class="ri-arrow-left-line"></i>
                {{ $t('common.back') }}
              </el-button>
              <el-breadcrumb separator="/" class="breadcrumb">
                <el-breadcrumb-item>{{ $t('townAggregation.title') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentDrillDownRow?.sourceName }} ({{ currentDrillDownRow?.year }})</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <!-- 下钻表格 -->
            <div class="table-wrapper">
              <el-table
                v-loading="drillDownLoading"
                :data="drillDownData"
                stripe
                empty-text=""
              >
                <el-table-column
                  prop="year"
                  :label="$t('townAggregation.columns.year')"
                  min-width="100"
                />
                <el-table-column
                  prop="sourceName"
                  :label="$t('Kebele Name')"
                  min-width="140"
                />
                <el-table-column
                    prop="subQuantity"
                    :label="$t('townAggregation.columns.subQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="unsubmitQuantity"
                    :label="$t('unsubmitQuantity')"
                    min-width="140"
                />
                <el-table-column
                    prop="submitQuantity"
                    :label="$t('submitQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="auditQuantity"
                    :label="$t('auditQuantity')"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  :label="$t('townAggregation.columns.status')"
                  min-width="100"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.status === '0'" type="info">
                      {{ $t('townAggregation.status.draft') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '1'" type="warning">
                      {{ $t('townAggregation.status.pending') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '2'" type="success">
                      {{ $t('townAggregation.status.approved') }}
                    </el-tag>
                    <el-tag v-else-if="row.status === '3'" type="danger">
                      {{ $t('townAggregation.status.rejected') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('townAggregation.columns.createTime')"
                  min-width="160"
                />
                <el-table-column
                  :label="$t('townAggregation.columns.actions')"
                  fixed="right"
                  width="120"
                >
                  <template #default="{ row }">
                    <el-button link type="primary" @click="handleDrillDownDetail(row)">
                      <i class="ri-eye-line"></i>
                      {{ $t('common.view') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 下钻分页 -->
            <div v-if="drillDownPagination.total > 0" class="pagination-wrapper">
              <el-pagination
                :current-page="drillDownPagination.currentPage"
                :page-size="drillDownPagination.pageSize"
                :page-sizes="[10, 20, 50]"
                :total="drillDownPagination.total"
                layout="total, sizes, prev, pager, next"
                background
                small
                @size-change="handleDrillDownSizeChange"
                @current-change="handleDrillDownCurrentChange"
                @update:current-page="drillDownPagination.currentPage = $event"
                @update:page-size="drillDownPagination.pageSize = $event"
              />
            </div>

            <!-- 空状态 -->
            <el-empty
              v-if="drillDownData.length === 0 && !drillDownLoading"
              :description="$t('townAggregation.messages.noData')"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- 新增年度对话框 -->
    <el-dialog
      v-model="addYearDialogVisible"
      :title="$t('townAggregation.addYearDialog.title')"
      width="500px"
    >
      <el-form :model="addYearForm" :rules="addYearRules" ref="addYearFormRef" label-width="100px">
        <el-form-item :label="$t('townAggregation.addYearDialog.year')" prop="year">
          <el-date-picker
            v-model="addYearForm.year"
            type="year"
            :placeholder="$t('townAggregation.addYearDialog.yearPlaceholder')"
            style="width: 100%"
            value-format="YYYY"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addYearDialogVisible = false">
          {{ $t('townAggregation.addYearDialog.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmAddYear" :loading="submitting">
          {{ $t('townAggregation.addYearDialog.confirm') }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 汇聚明细对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      :title="$t('townAggregation.detailDialog.title')"
      width="80%"
      top="5vh"
    >
      <el-table
        v-loading="detailLoading"
        :data="detailData"
        stripe
        max-height="500px"
      >
        <el-table-column
          prop="inputCategory"
          :label="$t('townAggregation.detailDialog.columns.inputCategory')"
          min-width="150"
        >
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="inputType"
          :label="$t('townAggregation.detailDialog.columns.inputType')"
          min-width="150"
        >
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalQuantity"
          :label="$t('townAggregation.detailDialog.columns.totalQuantity')"
          min-width="120"
        />
<!--        <el-table-column-->
<!--          prop="totalCount"-->
<!--          :label="$t('townAggregation.detailDialog.columns.totalCount')"-->
<!--          min-width="120"-->
<!--        />-->
      </el-table>

      <!-- 分页 -->
      <div v-if="detailPagination.total > 0" class="pagination-wrapper" style="margin-top: 16px;">
        <el-pagination
          :current-page="detailPagination.currentPage"
          :page-size="detailPagination.pageSize"
          :page-sizes="[10, 20, 50]"
          :total="detailPagination.total"
          layout="total, sizes, prev, pager, next"
          background
          small
          @size-change="handleDetailSizeChange"
          @current-change="handleDetailCurrentChange"
          @update:current-page="detailPagination.currentPage = $event"
          @update:page-size="detailPagination.pageSize = $event"
        />
      </div>

      <el-empty
        v-if="detailData.length === 0 && !detailLoading"
        :description="$t('townAggregation.detailDialog.noData')"
      />

      <template #footer>
        <el-button @click="detailDialogVisible = false">
          {{ $t('common.close') }}
        </el-button>
      </template>
    </el-dialog>


    <!-- 下钻记录详情对话框 -->
    <el-dialog
      v-model="drillDownRecordDetailVisible"
      :title="$t('townAggregation.detailDialog.title')"
      width="70%"
      top="5vh"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('townAggregation.columns.year')">
          {{ drillDownRecordDetail.year }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Kebele Name')">
          {{ drillDownRecordDetail.sourceName }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('Kebele Code')">
          {{ drillDownRecordDetail.sourceCode }}
        </el-descriptions-item>
<!--        <el-descriptions-item :label="$t('townAggregation.columns.targetName')">-->
<!--          {{ drillDownRecordDetail.targetName }}-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item :label="$t('townAggregation.columns.targetCode')">-->
<!--          {{ drillDownRecordDetail.targetCode }}-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item :label="$t('townAggregation.columns.subQuantity')">-->
<!--          {{ drillDownRecordDetail.subQuantity }}-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item :label="$t('submitQuantity')">-->
<!--          {{ drillDownRecordDetail.submitQuantity }}-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item :label="$t('unsubmitQuantity')">-->
<!--          {{ drillDownRecordDetail.unsubmitQuantity }}-->
<!--        </el-descriptions-item>-->
<!--        <el-descriptions-item :label="$t('auditQuantity')">-->
<!--          {{ drillDownRecordDetail.auditQuantity }}-->
<!--        </el-descriptions-item>-->
        <el-descriptions-item :label="$t('townAggregation.columns.status')">
          <el-tag v-if="drillDownRecordDetail.status === '0'" type="info">
            {{ $t('townAggregation.status.draft') }}
          </el-tag>
          <el-tag v-else-if="drillDownRecordDetail.status === '1'" type="warning">
            {{ $t('townAggregation.status.pending') }}
          </el-tag>
          <el-tag v-else-if="drillDownRecordDetail.status === '2'" type="success">
            {{ $t('townAggregation.status.approved') }}
          </el-tag>
          <el-tag v-else-if="drillDownRecordDetail.status === '3'" type="danger">
            {{ $t('townAggregation.status.rejected') }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('townAggregation.columns.createTime')">
          {{ drillDownRecordDetail.createTime }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 汇聚结果列表 -->
      <div class="aggregation-result-section">
        <h4 class="section-title">{{ $t('townAggregation.detailDialog.title') }}</h4>
        <el-table
          v-loading="drillDownAggregationLoading"
          :data="drillDownAggregationData"
          stripe
          max-height="300px"
        >
          <el-table-column
            prop="inputCategory"
            :label="$t('townAggregation.detailDialog.columns.inputCategory')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ getLabelByValue('input_category', row.inputCategory) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="inputType"
            :label="$t('townAggregation.detailDialog.columns.inputType')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ getLabelByValue('input_type', row.inputType) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="totalQuantity"
            :label="$t('townAggregation.detailDialog.columns.totalQuantity')"
            min-width="120"
          />
        </el-table>
        <el-empty
          v-if="drillDownAggregationData.length === 0 && !drillDownAggregationLoading"
          :description="$t('townAggregation.detailDialog.noData')"
        />
      </div>

      <template #footer>
        <el-button @click="drillDownRecordDetailVisible = false">
          {{ $t('common.close') }}
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
import {
  createVillageDemandSummaryMain,
  getVillageDemandSummaryMainList,
  aggregateTownInputDemand,
  getTownAggregationDetail,
  updateVillageDemandSummaryMain,
  getVillageAggregationDetail
} from '@/api/villageAggregation'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue, options } = useDict(['input_type', 'input_category'])
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const submitting = ref(false)
const tableData = ref([])

// 视图模式: 'main' 主列表, 'drillDown' 下钻列表
const viewMode = ref('main')

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 新增年度对话框
const addYearDialogVisible = ref(false)
const addYearFormRef = ref(null)
const addYearForm = reactive({
  year: ''
})

const addYearRules = reactive({
  year: [
    { required: true, message: t('townAggregation.addYearDialog.yearRequired'), trigger: 'change' }
  ]
})

// 汇聚明细对话框
const detailDialogVisible = ref(false)
const detailLoading = ref(false)
const detailData = ref([])
const currentDetailRow = ref(null)

const detailPagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 下钻列表
const drillDownLoading = ref(false)
const drillDownData = ref([])
const currentDrillDownRow = ref(null)

const drillDownPagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 下钻记录详情
const drillDownRecordDetailVisible = ref(false)
const drillDownRecordDetail = ref({})
const drillDownAggregationLoading = ref(false)
const drillDownAggregationData = ref([])

// 加载某一行已审批数量（已通过村级记录数）
const loadApprovedCountForRow = async (row) => {
  try {
    const params = {
      page: 1,
      pageSize: 10000,
      targetCode: row.sourceCode,
      year: row.year,
      status: '2'
    }
    const res = await getVillageDemandSummaryMainList(params)

    if (res.code === 200) {
      const list = res.data?.list || []
      // 使用接口返回列表长度作为已审批数量
      row.approvedQuantity = list.length
    } else {
      row.approvedQuantity = 0
    }
  } catch (error) {
    console.error('Failed to load approved count for row:', error)
    row.approvedQuantity = 0
  }
}

// 加载列表数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      sourceCode:JSON.parse(localStorage.getItem('userInfo')).user.regionCode,
      level: "1"
      // sourceCode:'huangshan'
      // TODO: Add user context filters
    }
    const res = await getVillageDemandSummaryMainList(params)

    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0

      // 为每一行加载已审批数量
      await Promise.all(tableData.value.map(item => loadApprovedCountForRow(item)))
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('townAggregation.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 打开新增年度对话框
const handleAddYear = () => {
  addYearForm.year = ''
  addYearDialogVisible.value = true
}

// 确认新增年度
const confirmAddYear = async () => {
  if (!addYearFormRef.value) return

  try {
    await addYearFormRef.value.validate()

    submitting.value = true
    const res = await createVillageDemandSummaryMain({
      year: addYearForm.year,
      sourceCode: JSON.parse(localStorage.getItem('userInfo')).user.regionCode,
      // sourceCode: 'huangshan',
      status: '0',
      level: '1',
      creator: JSON.parse(localStorage.getItem('userInfo')).user.username,
      // subQuantity: 0//农民数||村的数量||
    })

    if (res.code === 200) {
      ElMessage.success(t('townAggregation.addYearDialog.success'))
      addYearDialogVisible.value = false
      loadData()
    } else {
      // ElMessage.error(res.msg || t('townAggregation.addYearDialog.failed'))
    }
  } catch (error) {
    if (error !== false) {
      // console.error('Failed to add year:', error)
      // ElMessage.error(t('townAggregation.addYearDialog.failed'))
    }
  } finally {
    submitting.value = false
  }
}

// 审批 - 跳转到审核页面
const handleApprove = (row) => {
  router.push({
    name: 'TownAuditDetail',
    params: { year: row.year }
  })
}

// 汇聚数据提交 - 调用汇聚接口
const handleSubmit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('townAggregation.submitDialog.confirmMessage'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitting.value = true
    // 镇级汇聚提交: 传递sourceCode和summaryId
    const res = await aggregateTownInputDemand({
      sourceCode: row.sourceCode,
      summaryId: row.id,
      year: row.year
    })

    if (res.code === 200) {
      ElMessage.success(t('townAggregation.submitDialog.success'))

      // 更新状态为待审核（1）
      const updateRes = await updateVillageDemandSummaryMain({
        id: row.id,
        sourceCode: row.sourceCode,
        status: '1'
      })

      if (updateRes.code === 200) {
        loadData()
      } else {
        ElMessage.error(updateRes.msg || t('townAggregation.submitDialog.failed'))
      }
    } else {
      ElMessage.error(res.msg || t('townAggregation.submitDialog.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit aggregation:', error)
      ElMessage.error(t('townAggregation.submitDialog.failed'))
    }
  } finally {
    submitting.value = false
  }
}

// 查看汇聚明细
const handleDetail = async (row) => {
  currentDetailRow.value = row
  detailDialogVisible.value = true
  detailPagination.currentPage = 1
  await loadDetailData()
}

// 加载明细数据
const loadDetailData = async () => {
  if (!currentDetailRow.value) return

  detailLoading.value = true
  try {
    // 镇级汇聚明细: 只传递sourceCode
    const res = await getTownAggregationDetail({
      sourceCode: currentDetailRow.value.sourceCode,
      year: currentDetailRow.value.year
    })

    if (res.code === 200) {
      detailData.value = res.data || []
      detailPagination.total = res.data?.length || 0
    }
  } catch (error) {
    console.error('Failed to load detail data:', error)
    ElMessage.error(t('townAggregation.detailDialog.loadFailed'))
  } finally {
    detailLoading.value = false
  }
}

// 明细分页变化
const handleDetailSizeChange = () => {
  detailPagination.currentPage = 1
  loadDetailData()
}

const handleDetailCurrentChange = () => {
  loadDetailData()
}

// 下钻 - 点击WoreName列
const handleDrillDown = async (row) => {
  currentDrillDownRow.value = row
  viewMode.value = 'drillDown'
  drillDownPagination.currentPage = 1
  await loadDrillDownData()
}

// 返回主列表
const handleBackToMain = () => {
  viewMode.value = 'main'
  currentDrillDownRow.value = null
  drillDownData.value = []
}

// 加载下钻列表数据
const loadDrillDownData = async () => {
  if (!currentDrillDownRow.value) return

  drillDownLoading.value = true
  try {
    const params = {
      page: drillDownPagination.currentPage,
      pageSize: drillDownPagination.pageSize,
      targetCode: currentDrillDownRow.value.sourceCode,
      year: currentDrillDownRow.value.year,
      level: 0
    }
    const res = await getVillageDemandSummaryMainList(params)

    if (res.code === 200) {
      drillDownData.value = res.data?.list || []
      drillDownPagination.total = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load drill down data:', error)
    ElMessage.error(t('townAggregation.messages.loadFailed'))
  } finally {
    drillDownLoading.value = false
  }
}

// 下钻分页变化
const handleDrillDownSizeChange = () => {
  drillDownPagination.currentPage = 1
  loadDrillDownData()
}

const handleDrillDownCurrentChange = () => {
  loadDrillDownData()
}

// 查看下钻记录详情
const handleDrillDownDetail = async (row) => {
  drillDownRecordDetail.value = row
  drillDownRecordDetailVisible.value = true
  drillDownAggregationData.value = []

  // 加载汇聚结果数据
  drillDownAggregationLoading.value = true
  try {
    const res = await getVillageAggregationDetail({
      sourceCode: row.sourceCode,
      year: row.year
    })
    if (res.code === 200) {
      drillDownAggregationData.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load aggregation data:', error)
    ElMessage.error(t('townAggregation.detailDialog.loadFailed排名'))
  } finally {
    drillDownAggregationLoading.value = false
  }
}

// 分页变化
const handleSizeChange = () => {
  pagination.currentPage = 1
  loadData()
}

const handleCurrentChange = () => {
  loadData()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
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
}

.drill-down-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.drill-down-header .breadcrumb {
  font-size: 14px;
}

.drill-down-header .el-button i {
  margin-right: 4px;
}

.aggregation-result-section {
  margin-top: 24px;
}

.aggregation-result-section .section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #009A44;
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
  justify-content: space-between;
}

.year-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #009A44;
  font-size: 18px;
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
  flex-wrap: wrap;
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

  .header-right {
    width: 100%;
  }

  .header-right .el-button {
    width: 100%;
  }

  .info-card {
    padding: 16px;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>
