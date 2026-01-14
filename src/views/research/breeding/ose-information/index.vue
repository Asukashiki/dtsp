<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-seedling-line"
        :title="$t('research.menu.oseBatchCollection')"
        :subtitle="$t('research.menu.oseBatchCollectionSubtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.breeding.batch.searchPlaceholder')">
              <el-input
                v-model="queryData.batchId"
                :placeholder="$t('research.breeding.batch.searchPlaceholder')"
                clearable
                @keyup.enter="handleSearch">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.breeding.batch.filterByCrop')">
              <el-select
                v-model="queryData.cropType"
                :placeholder="$t('research.breeding.batch.filterByCrop')"
                clearable
                @change="handleSearch">
                <el-option :label="$t('research.breeding.batch.allCrops')" value="" />
                <el-option
                  v-for="item in options.crop_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.breeding.batch.filterByStatus')">
              <el-select
                v-model="queryData.batchStatus"
                :placeholder="$t('research.breeding.batch.filterByStatus')"
                clearable
                @change="handleSearch">
                <el-option :label="$t('research.breeding.batch.allStatus')" value="" />
                <el-option :label="$t('research.breeding.status.ongoing')" value="01" />
                <el-option :label="$t('research.breeding.status.completed')" value="02" />
                <el-option :label="$t('research.breeding.status.terminated')" value="03" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.breeding.batch.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.breeding.batch.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading">
              <el-table-column prop="batchId" :label="$t('research.breeding.batch.columns.batchId')" width="220" fixed="left" />
              <el-table-column prop="varietyName" :label="$t('research.breeding.batch.columns.varietyName')" min-width="150" />
              <el-table-column prop="cropTypeName" :label="$t('research.breeding.batch.columns.cropType')" min-width="140" align="center">
                <template #default="{ row }">
                  <span>{{ getLabelByValue('crop_type', row.cropType) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="breedingLevelName" :label="$t('research.breeding.breedingBatch.form.breedingLevel')" width="160" align="center" />
              <el-table-column prop="startDate" :label="$t('research.breeding.batch.columns.startDate')" width="120" align="center" />
              <el-table-column prop="statusName" :label="$t('research.breeding.batch.columns.status')" width="100" align="center">
                <template #default="{ row }">
                  <el-tag :type="getStatusTagType(row.batchStatus)" size="small">
                    {{ row.statusName }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="260" fixed="right" align="center">
                <template #default="{ row }">
                  <el-button  size="small" type="primary" @click="handleDetail(row.id)">{{ $t('common.view') }}</el-button>
                  <el-button  size="small" type="primary" @click="handleEdit(row.id)">{{ $t('common.edit') }}</el-button>
                  <el-button  size="small" type="danger" @click="handleDelete(row.id)">{{ $t('common.delete') }}</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryData.pageNum"
                v-model:page-size="queryData.pageSize"
                :total="total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSearch"
                @current-change="handleSearch"
              />
            </div>
          </div>

          <!-- 移动端卡片列表 -->
          <div class="mobile-card-list mobile-only">
            <div v-if="tableData.length === 0" class="empty-state">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('common.noData') }}</p>
            </div>
            <div v-for="item in tableData" :key="item.id" class="card">
              <div class="card-header">
                <div class="card-title">{{ item.batchId }}</div>
                <el-tag :type="getStatusTagType(item.batchStatus)" size="small">
                  {{ item.statusName }}
                </el-tag>
              </div>
              <div class="card-body">
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.batch.columns.varietyName') }}:</span>
                  <span class="value">{{ item.varietyName }}</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.batch.columns.cropType') }}:</span>
                  <span class="value">{{ item.cropTypeName }}</span>
                </div>
                <div class="card-row">
                  <span class="label">Breeding methods:</span>
                  <span class="value">{{ item.breedingMethodName }}</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.batch.columns.startDate') }}:</span>
                  <span class="value">{{ item.startDate }}</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.batch.columns.trackingCount') }}:</span>
                  <span class="value">
                    <el-tag type="info" size="small">{{ item.trackingCount || 0 }}</el-tag>
                  </span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('research.breeding.batch.columns.testCount') }}:</span>
                  <span class="value">
                    <el-tag type="info" size="small">{{ item.testCount || 0 }}</el-tag>
                  </span>
                </div>
              </div>
              <div class="card-footer">
                <el-button text type="primary" @click="handleDetail(item.id)">{{ $t('common.view') }}</el-button>
                <el-button text type="primary" @click="handleEdit(item.id)">{{ $t('common.edit') }}</el-button>
                <el-button text type="danger" @click="handleDelete(item.id)">{{ $t('common.delete') }}</el-button>
              </div>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedingBatchPageList, deleteBreedingBatchPage } from '@/api/breeding'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const { getLabelByValue } = useDict(['crop_type']);

const router = useRouter()
const { t } = useI18n()

// 使用字典获取作物类型
const { options } = useDict(['crop_type'])

// 数据
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryData = ref({
  batchId: '',
  cropType: '',
  batchStatus: '',
  pageNum: 1,
  pageSize: 10
})

// 繁育方法映射
const breedingMethodMap = computed(() => ({
  'hybridization': t('research.breeding.breedingMethod.hybridization'),
  'mutagenesis': t('research.breeding.breedingMethod.mutagenesis'),
  'molecular': t('research.breeding.breedingMethod.molecular'),
  'selection': t('research.breeding.breedingMethod.selection'),
  'wide_cross': t('research.breeding.breedingMethod.wideCross'),
  'mutation': t('research.breeding.breedingMethod.mutation'),
  'biotechnology': t('research.breeding.breedingMethod.biotechnology'),
  'other': t('research.breeding.breedingMethod.other')
}))

// 繁殖级别映射
const breedingLevelMap = computed(() => ({
  '01': t('research.breeding.breedingLevel.parentPrep'),
  '02': t('research.breeding.breedingLevel.original'),
  '03': t('research.breeding.breedingLevel.foundation'),
  '04': t('research.breeding.breedingLevel.certified')
}))

// 状态映射
const statusMap = computed(() => ({
  '01': t('research.breeding.status.ongoing'),
  '02': t('research.breeding.status.completed'),
  '03': t('research.breeding.status.terminated')
}))

// 初始化
onMounted(() => {
  handleSearch()
})

// 搜索
const handleSearch = async () => {
  loading.value = true
  try {
    const response = await getBreedingBatchPageList(queryData.value)
    if (response.code === 200) {
      const records = response.data.records || []
      // 添加显示名称
      tableData.value = records.map(item => ({
        ...item,
        cropTypeName: getLabelByValue('crop_type', item.cropType) || item.cropType,
        breedingMethodName: breedingMethodMap.value[item.breedingMethod] || item.breedingMethod,
        breedingLevelName: breedingLevelMap.value[item.breedingLevel] || item.breedingLevel,
        statusName: statusMap.value[item.batchStatus] || item.batchStatus
      }))
      total.value = response.data.total || 0
    } else {
      ElMessage.error(response.msg || t('research.breeding.messages.queryError'))
    }
  } catch (error) {
    ElMessage.error(t('research.breeding.messages.queryError'))
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 重置
const handleReset = () => {
  queryData.value = {
    batchId: '',
    cropType: '',
    batchStatus: '',
    pageNum: 1,
    pageSize: 10
  }
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push('/research/breeding/batch/add')
}

// 编辑
const handleEdit = (id) => {
  router.push(`/research/breeding/batch/edit/${id}`)
}

// 详情
const handleDetail = (id) => {
  router.push(`/research/breeding/detail/${id}`)
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(
    t('research.breeding.batch.deleteConfirm'),
    t('common.warning'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const response = await deleteBreedingBatchPage([id])
      if (response.code === 200) {
        ElMessage.success(t('research.breeding.messages.deleteSuccess'))
        handleSearch()
      } else {
        ElMessage.error(response.msg || t('research.breeding.messages.deleteError'))
      }
    } catch (error) {
      ElMessage.error(t('research.breeding.messages.deleteError'))
      console.error(error)
    }
  }).catch(() => {})
}

// 获取状态标签类型
const getStatusTagType = (status) => {
  const map = {
    '01': 'primary',    // 进行中
    '02': 'success',    // 已完成
    '03': 'info'        // 已中止
  }
  return map[status] || 'info'
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
