<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-map-2-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.plot.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.plot.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.plot.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breedingData.plot.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <el-input
                v-model="queryParams.trialId"
                placeholder="Trial ID"
                clearable
                class="search-input"
                @change="handleQuery"
              >
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
              <el-select
                v-model="queryParams.batchId"
                placeholder="Batch ID"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
              </el-select>
              <el-input
                v-model="queryParams.varietyCode"
                placeholder="Variety Code"
                clearable
                class="search-input"
                @change="handleQuery"
              />
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="plotId" label="Plot ID" min-width="180" show-overflow-tooltip />
                <el-table-column prop="trialId" label="Trial ID" min-width="160" show-overflow-tooltip />
                <el-table-column prop="batchId" label="Batch ID" min-width="160" show-overflow-tooltip />
                <el-table-column prop="replicationNo" label="Replication No" min-width="120" />
                <el-table-column prop="rowNo" label="Row No" min-width="100" />
                <el-table-column prop="columnNo" label="Column No" min-width="110" />
                <el-table-column prop="varietyCode" label="Variety Code" min-width="130" show-overflow-tooltip />
                <el-table-column prop="sowingDate" label="Sowing Date" min-width="120" />
                <el-table-column :label="$t('research.breedingData.plot.columns.actions')" width="200" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>{{ $t('common.view') }}
                      </el-button>
                      <el-button link type="primary" @click="handleEdit(row)">
                        <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                      </el-button>
                      <el-button link type="danger" @click="handleDelete(row)">
                        <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
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
              <div v-for="item in dataList" :key="item.plotId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-map-pin-line"></i>
                    <span>{{ item.plotId }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">Trial ID:</span>
                    <span class="value">{{ item.trialId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Batch ID:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Replication No:</span>
                    <span class="value">{{ item.replicationNo }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Variety Code:</span>
                    <span class="value">{{ item.varietyCode }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Sowing Date:</span>
                    <span class="value">{{ item.sowingDate }}</span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <el-button size="small" @click="handleView(item)">
                    <i class="ri-eye-line"></i>{{ $t('common.view') }}
                  </el-button>
                  <el-button size="small" type="primary" @click="handleEdit(item)">
                    <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                  </el-button>
                  <el-button size="small" type="danger" @click="handleDelete(item)">
                    <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
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
import { getPlotInfoList, deletePlotInfo, getBatchOptions } from '@/api/breedingData'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const batchOptions = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  trialId: '',
  batchId: '',
  varietyCode: ''
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getPlotInfoList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.plotId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.plotId)) {
      selectedIds.value.push(item.plotId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.plotId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/plot/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/plot/detail/${row.plotId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/plot/edit/${row.plotId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.plot.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deletePlotInfo(row.plotId)
    ElMessage.success(t('research.breedingData.plot.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.plot.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deletePlotInfo(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.plot.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

onMounted(() => {
  loadBatchOptions()
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
