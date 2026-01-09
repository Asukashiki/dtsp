<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-award-line" :title="$t('seed.c1Certificate.title')"
        :subtitle="$t('seed.c1Certificate.subtitle')" />

      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('seed.c1Certificate.columns.batchId')">
              <el-input v-model="searchParams.keyword" :placeholder="$t('common.pleaseInput')" clearable />
            </SearchItem>
            <SearchItem :label="$t('seed.c1Certificate.columns.varietyName')">
              <el-input v-model="searchParams.varietyName" :placeholder="$t('common.pleaseInput')" clearable />
            </SearchItem>
            <SearchItem :label="$t('seed.c1Certificate.columns.cropType')">
              <el-select v-model="searchParams.cropType" :placeholder="$t('common.pleaseSelect')" clearable
                :loading="dictLoading">
                <el-option v-for="item in options.crop_type" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </SearchItem>
            <SearchItem :label="$t('seed.c1Certificate.columns.startDate')">
              <el-date-picker v-model="dateRange" type="daterange" :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startDate')" :end-placeholder="$t('common.endDate')"
                value-format="YYYY-MM-DD" @change="handleDateChange" />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表区域 -->
        <InfoCard :title="$t('seed.c1Certificate.title')" icon="ri-award-line">
          <template #extra>
            <el-tag type="success">
              {{ $t('common.total') }}: {{ total }}
            </el-tag>
          </template>

          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe>
              <el-table-column type="index" :label="$t('common.index')" width="60" align="center" />
              <el-table-column prop="batchId" :label="$t('seed.c1Certificate.columns.batchId')" min-width="180"
                show-overflow-tooltip />
              <el-table-column prop="orgName" :label="$t('seed.c1Certificate.columns.orgName')" min-width="180"
                show-overflow-tooltip />
              <el-table-column prop="varietyName" :label="$t('seed.c1Certificate.columns.varietyName')"
                min-width="120" />
              <el-table-column prop="cropType" :label="$t('seed.c1Certificate.columns.cropType')" width="120"
                align="center">
                <template #default="{ row }">
                  <el-tag type="success" size="small">{{ getLabelByValue('crop_type', row.cropType) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="startDate" :label="$t('seed.c1Certificate.columns.startDate')" width="120"
                align="center" />
              <el-table-column prop="auditor" :label="$t('seed.c1Certificate.columns.auditor')" width="120"
                align="center" />
              <el-table-column prop="auditorOrgName" :label="$t('seed.c1Certificate.columns.auditorOrg')"
                min-width="150" show-overflow-tooltip />
              <el-table-column prop="auditTime" :label="$t('seed.c1Certificate.columns.auditTime')" width="160"
                align="center" />
              <el-table-column prop="printCount" :label="$t('seed.c1Certificate.columns.printCount')" width="100"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="row.printCount > 0 ? 'info' : 'success'" size="small">
                    {{ row.printCount || 0 }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="lastPrintTime" :label="$t('seed.c1Certificate.columns.lastPrintTime')" width="160"
                align="center" />
              <el-table-column :label="$t('common.action')" width="200" align="center" fixed="right">
                <template #default="{ row }">
                  <el-button link type="primary" @click="handleView(row)">
                    <i class="ri-eye-line"></i>
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button link type="success" @click="handlePrint(row)">
                    <i class="ri-printer-line"></i>
                    {{ $t('seed.c1Certificate.print') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
v-model:current-page="pagination.current" v-model:page-size="pagination.size"
                :total="total" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>

          <!-- 移动端视图 -->
          <div class="mobile-only">
            <div class="card-list" v-loading="loading">
              <div v-for="item in tableData" :key="item.id" class="data-card">
                <div class="card-header">
                  <span class="card-code">{{ item.batchId }}</span>
                  <el-tag type="success" size="small">{{ getLabelByValue('crop_type', item.cropType) }}</el-tag>
                </div>
                <div class="card-content">
                  <div class="info-row">
                    <span class="label">{{ $t('seed.c1Certificate.columns.orgName') }}</span>
                    <span class="value">{{ item.orgName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('seed.c1Certificate.columns.varietyName') }}</span>
                    <span class="value">{{ item.varietyName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('seed.c1Certificate.columns.startDate') }}</span>
                    <span class="value">{{ item.startDate }}</span>
                  </div>
                </div>
                <div class="card-footer">
                  <el-tag :type="item.printCount > 0 ? 'info' : 'success'" size="small">
                    {{ $t('seed.c1Certificate.columns.printCount') }}: {{ item.printCount || 0 }}
                  </el-tag>
                  <div class="actions">
                    <el-button link type="primary" @click="handleView(item)">
                      <i class="ri-eye-line"></i> {{ $t('common.view') }}
                    </el-button>
                    <el-button link type="success" @click="handlePrint(item)">
                      <i class="ri-printer-line"></i> {{ $t('seed.c1Certificate.print') }}
                    </el-button>
                  </div>
                </div>
              </div>
              <div v-if="hasMore" class="load-more">
                <el-button link @click="loadMore" :loading="loading">
                  {{ $t('common.loadMore') }}
                </el-button>
              </div>
              <div v-if="!loading && tableData.length === 0" class="empty-status">
                <i class="ri-inbox-line"></i>
                <p>{{ $t('common.noData') }}</p>
              </div>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getApprovedC1BatchList, recordC1BatchPrint } from '@/api/c1BreedingBatch'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { options, getLabelByValue, loading: dictLoading } = useDict(['crop_type'])

// 搜索参数
const searchParams = reactive({
  keyword: '',
  varietyName: '',
  cropType: '',
  startDateBegin: '',
  startDateEnd: ''
})

// 日期范围
const dateRange = ref([])

// 分页参数
const pagination = reactive({
  current: 1,
  size: 10
})

// 表格数据
const tableData = ref([])
const total = ref(0)
const loading = ref(false)

// 移动端筛选面板
const showFilter = ref(false)

// 是否有更多数据
const hasMore = computed(() => {
  return tableData.value.length < total.value
})

// 处理日期范围变化
const handleDateChange = (value) => {
  if (value && value.length === 2) {
    searchParams.startDateBegin = value[0]
    searchParams.startDateEnd = value[1]
  } else {
    searchParams.startDateBegin = ''
    searchParams.startDateEnd = ''
  }
}

// 加载列表数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      ...searchParams,
      pageNum: pagination.current,
      pageSize: pagination.size
    }
    const res = await getApprovedC1BatchList(params)
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
  showFilter.value = false
}

// 重置
const handleReset = () => {
  searchParams.keyword = ''
  searchParams.varietyName = ''
  searchParams.cropType = ''
  searchParams.startDateBegin = ''
  searchParams.startDateEnd = ''
  dateRange.value = []
  handleSearch()
}

// 分页
const handleSizeChange = (size) => {
  pagination.size = size
  loadData()
}

const handleCurrentChange = (current) => {
  pagination.current = current
  loadData()
}

// 加载更多（移动端）
const loadMore = () => {
  pagination.current++
  loadData()
}

// 查看详情
const handleView = (row) => {
  router.push(`/research/c1-breeding-batch/detail/${row.id}?readonly=true`)
}

// 打印证书
const handlePrint = async (row) => {
  try {
    // 记录打印次数
    await recordC1BatchPrint(row.id)
    
    // 在新窗口打开打印页面
    const isDev = import.meta.env.DEV
    const printUrlDev = `${window.location.origin}/#/print/seed/c1-breeding-certificate/${row.id}`
    const printUrl = `${window.location.origin}${import.meta.env.VITE_APP_AGRICULTURE_BASE_URL}/#/print/seed/c1-breeding-certificate/${row.id}`
    window.open(isDev ? printUrlDev : printUrl, '_blank', 'width=900,height=800')
    
    // 刷新列表更新打印次数
    loadData()
  } catch (error) {
    console.error('Print error:', error)
  }
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
