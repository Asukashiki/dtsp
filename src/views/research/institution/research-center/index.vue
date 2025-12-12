<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-building-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.researchCenter.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.researchCenter.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.researchCenter.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breedingData.researchCenter.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <div class="search-item">
                <span class="search-label">{{ $t('research.breedingData.researchCenter.form.locationName') }}:</span>
                <el-input
                  v-model="queryParams.locationName"
                  :placeholder="$t('research.breedingData.researchCenter.placeholder.locationName')"
                  clearable
                  class="search-input"
                >
                  <template #prefix><i class="ri-search-line"></i></template>
                </el-input>
              </div>
              <div class="search-item">
                <span class="search-label">{{ $t('research.breedingData.researchCenter.form.region') }}:</span>
                <el-input
                  v-model="queryParams.region"
                  :placeholder="$t('research.breedingData.researchCenter.placeholder.region')"
                  clearable
                  class="search-input"
                />
              </div>
              <div class="search-item">
                <span class="search-label">{{ $t('research.breedingData.researchCenter.form.zone') }}:</span>
                <el-input
                  v-model="queryParams.zone"
                  :placeholder="$t('research.breedingData.researchCenter.placeholder.zone')"
                  clearable
                  class="search-input"
                />
              </div>
              <div class="search-actions">
                <el-button type="primary" @click="handleQuery">
                  <i class="ri-search-line"></i>{{ $t('common.search') }}
                </el-button>
                <el-button @click="handleReset">
                  <i class="ri-refresh-line"></i>{{ $t('common.reset') }}
                </el-button>
              </div>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column
                  prop="locationId"
                  :label="$t('research.breedingData.researchCenter.columns.locationId')"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="locationName"
                  :label="$t('research.breedingData.researchCenter.columns.locationName')"
                  min-width="180"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="region"
                  :label="$t('research.breedingData.researchCenter.columns.region')"
                  min-width="120"
                />
                <el-table-column
                  prop="zone"
                  :label="$t('research.breedingData.researchCenter.columns.zone')"
                  min-width="120"
                />
                <el-table-column
                  prop="woneda"
                  :label="$t('research.breedingData.researchCenter.columns.woneda')"
                  min-width="120"
                />
                <el-table-column
                  prop="latitude"
                  :label="$t('research.breedingData.researchCenter.columns.latitude')"
                  min-width="100"
                />
                <el-table-column
                  prop="longitude"
                  :label="$t('research.breedingData.researchCenter.columns.longitude')"
                  min-width="110"
                />
                <el-table-column
                  prop="createTime"
                  :label="$t('research.breedingData.researchCenter.columns.createTime')"
                  min-width="160"
                />
                <el-table-column
                  :label="$t('research.breedingData.researchCenter.columns.actions')"
                  width="200"
                  fixed="right"
                >
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
                  :current-page="queryParams.pageNum"
                  :page-size="queryParams.pageSize"
                  :page-sizes="[10, 20, 50]"
                  :total="total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in dataList" :key="item.locationId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-building-line"></i>
                    <span>{{ item.locationName }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.researchCenter.columns.locationId') }}:</span>
                    <span class="value">{{ item.locationId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.researchCenter.columns.region') }}:</span>
                    <span class="value">{{ item.region || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.researchCenter.columns.zone') }}:</span>
                    <span class="value">{{ item.zone || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.researchCenter.columns.woneda') }}:</span>
                    <span class="value">{{ item.woneda || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.researchCenter.columns.latitude') }}:</span>
                    <span class="value">{{ item.latitude || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.researchCenter.columns.longitude') }}:</span>
                    <span class="value">{{ item.longitude || '-' }}</span>
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
                  :current-page="queryParams.pageNum"
                  :page-size="queryParams.pageSize"
                  :total="total"
                  layout="prev, pager, next"
                  small
                  @current-change="handleCurrentChange"
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
import { getLocationMasterList, deleteLocationMaster } from '@/api/breedingData'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  locationName: '',
  region: '',
  zone: ''
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getLocationMasterList(queryParams)
    // 后端返回的数据在 data 对象中
    dataList.value = res.data?.records || []
    total.value = res.data?.total || 0
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.locationName = ''
  queryParams.region = ''
  queryParams.zone = ''
  getList()
}

const handleSizeChange = (val) => {
  queryParams.pageSize = val
  queryParams.pageNum = 1
  getList()
}

const handleCurrentChange = (val) => {
  queryParams.pageNum = val
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.locationId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.locationId)) {
      selectedIds.value.push(item.locationId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.locationId)
  }
}

const handleAdd = () => {
  router.push('/research/institution/research-center/add')
}

const handleView = (row) => {
  router.push(`/research/institution/research-center/detail/${row.locationId}`)
}

const handleEdit = (row) => {
  router.push(`/research/institution/research-center/edit/${row.locationId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.researchCenter.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteLocationMaster(row.locationId)
    ElMessage.success(t('research.breedingData.researchCenter.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.researchCenter.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteLocationMaster(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.researchCenter.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.search-section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;

  .search-item {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;

    .search-label {
      font-size: 14px;
      color: #606266;
      white-space: nowrap;
      font-weight: 500;
    }

    .search-input {
      width: 200px;
    }
  }

  .search-actions {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }
}

@media (max-width: 768px) {
  .search-section {
    .search-item {
      width: 100%;

      .search-label {
        min-width: 100px;
      }

      .search-input {
        flex: 1;
        width: auto;
      }
    }

    .search-actions {
      margin-left: 0;
      width: 100%;

      .el-button {
        flex: 1;
      }
    }
  }
}
</style>
