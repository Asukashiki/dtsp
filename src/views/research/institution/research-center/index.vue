<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-building-line" :title="$t('research.breedingData.researchCenter.title')"
        :subtitle="$t('research.breedingData.researchCenter.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('research.breedingData.researchCenter.form.locationName')">
              <el-input v-model="queryParams.locationName"
                :placeholder="$t('research.breedingData.researchCenter.placeholder.locationName')" clearable
                @clear="handleQuery" @keyup.enter="handleQuery">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.researchCenter.form.region')">
              <el-input v-model="queryParams.region"
                :placeholder="$t('research.breedingData.researchCenter.placeholder.region')" clearable
                @clear="handleQuery" @keyup.enter="handleQuery" />
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.researchCenter.form.zone')">
              <el-input v-model="queryParams.zone"
                :placeholder="$t('research.breedingData.researchCenter.placeholder.zone')" clearable
                @clear="handleQuery" @keyup.enter="handleQuery" />
            </SearchItem>

          </SearchForm>
        </div>

        <!-- 列表区域 -->
        <InfoCard :title="$t('research.breedingData.researchCenter.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
              <i class="ri-delete-bin-line"></i>
              {{ $t('common.batchDelete') }}
            </el-button>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.breedingData.researchCenter.add') }}
            </el-button>
          </template>
          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="dataList" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" />
              <el-table-column prop="locationId" :label="$t('research.breedingData.researchCenter.columns.locationId')"
                min-width="200" show-overflow-tooltip />
              <el-table-column prop="locationName"
                :label="$t('research.breedingData.researchCenter.columns.locationName')" min-width="180"
                show-overflow-tooltip />
              <el-table-column prop="region" :label="$t('research.breedingData.researchCenter.columns.region')"
                min-width="120" />
              <el-table-column prop="zone" :label="$t('research.breedingData.researchCenter.columns.zone')"
                min-width="120" />
              <el-table-column prop="woneda" :label="$t('research.breedingData.researchCenter.columns.woneda')"
                min-width="120" />
              <el-table-column prop="latitude" :label="$t('research.breedingData.researchCenter.columns.latitude')"
                min-width="100" />
              <el-table-column prop="longitude" :label="$t('research.breedingData.researchCenter.columns.longitude')"
                min-width="110" />
              <el-table-column prop="createTime" :label="$t('research.breedingData.researchCenter.columns.createTime')"
                min-width="160" />
              <el-table-column :label="$t('research.breedingData.researchCenter.columns.actions')" width="300"
                fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small" type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>{{ $t('common.view') }}
                    </el-button>
                    <el-button size="small" type="primary" @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination :current-page="queryParams.pageNum" :page-size="queryParams.pageSize"
                :page-sizes="[10, 20, 50]" :total="total" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>

          <!-- 移动端卡片列表 -->
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
                <el-button size="small" link type="primary" @click="handleView(item)">
                  <i class="ri-eye-line"></i>{{ $t('common.view') }}
                </el-button>
                <el-button size="small" link type="primary" @click="handleEdit(item)">
                  <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                </el-button>
                <el-button size="small" link type="danger" @click="handleDelete(item)">
                  <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
                </el-button>
              </div>
            </div>

            <div v-if="dataList.length === 0 && !loading" class="empty-status">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('common.noData') }}</p>
            </div>

            <div class="pagination-wrapper">
              <el-pagination :current-page="queryParams.pageNum" :page-size="queryParams.pageSize" :total="total"
                layout="prev, pager, next" small @current-change="handleCurrentChange" />
            </div>
          </div>
        </InfoCard>
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

import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

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
    try {
      const res = await deleteLocationMaster(row.locationId)
      if (res.code === 200) {
        ElMessage.success(t('common.deleteSuccess'))
        getList()
      }
    } catch (error) {
      console.error('删除失败:', error)
    }
  })
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('common.batchDeleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    try {
      const res = await deleteLocationMaster(selectedIds.value.join(','))
      if (res.code === 200) {
        ElMessage.success(t('common.deleteSuccess'))
        getList()
      }
    } catch (error) {
      console.error('批量删除失败:', error)
    }
  })
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.action-buttons button {
  margin-left: 0;
}
</style>
