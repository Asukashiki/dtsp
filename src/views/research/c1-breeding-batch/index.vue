<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-seedling-line" :title="$t('research.c1BreedingBatch.title')"
        :subtitle="$t('research.c1BreedingBatch.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.c1BreedingBatch.searchPlaceholder')">
              <el-input v-model="queryData.keyword" :placeholder="$t('research.c1BreedingBatch.searchPlaceholder')"
                clearable
@keyup.enter="handleSearch">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.c1BreedingBatch.filterByCrop')">
              <el-select v-model="queryData.cropType" :placeholder="$t('research.c1BreedingBatch.filterByCrop')"
                clearable
@change="handleSearch">
                <el-option :label="$t('research.c1BreedingBatch.allCrops')" value="" />
                <el-option label="Wheat" value="Wheat" />
                <el-option label="Maize" value="Maize" />
                <el-option label="Teff" value="Teff" />
                <el-option label="Sorghum" value="Sorghum" />
                <el-option label="Barley" value="Barley" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.c1BreedingBatch.filterByStatus')">
              <el-select v-model="queryData.batchStatus" :placeholder="$t('research.c1BreedingBatch.filterByStatus')"
                clearable
@change="handleSearch">
                <el-option :label="$t('research.c1BreedingBatch.allStatus')" value="" />
                <el-option :label="$t('research.c1BreedingBatch.status.ongoing')" value="01" />
                <el-option :label="$t('research.c1BreedingBatch.status.completed')" value="02" />
                <el-option :label="$t('research.c1BreedingBatch.status.terminated')" value="03" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.c1BreedingBatch.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.c1BreedingBatch.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading">
              <el-table-column prop="batchId" :label="$t('research.c1BreedingBatch.columns.batchId')" min-width="180"
                fixed="left" show-overflow-tooltip />
              <el-table-column prop="varietyName" :label="$t('research.c1BreedingBatch.columns.varietyName')"
                min-width="140" show-overflow-tooltip />
              <el-table-column prop="cropType" :label="$t('research.c1BreedingBatch.columns.cropType')" min-width="100"
                align="center">
                <template #default="{ row }">
                  {{ getLabelByValue('crop_type', row.cropType) }}
                </template>
              </el-table-column>
              <el-table-column prop="startDate" :label="$t('research.c1BreedingBatch.columns.startDate')"
                min-width="120" align="center" />
              <el-table-column prop="batchStatus" :label="$t('research.c1BreedingBatch.columns.status')" min-width="100"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="getStatusTagType(row.batchStatus)" size="small">
                    {{ getStatusName(row.batchStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons workflow-status="S0" mode="list" :custom-buttons="getActionButtons(row)"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="queryData.pageNum" v-model:page-size="queryData.pageSize"
                :total="total" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSearch" @current-change="handleSearch" />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only" v-loading="loading">
          <div v-for="item in tableData" :key="item.id" class="mobile-card"
            @click="handleDetail(item.id, item.auditStatus === 'approved')">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ item.batchId }}</span>
              </div>
              <el-tag :type="getStatusTagType(item.batchStatus)" size="small">
                {{ getStatusName(item.batchStatus) }}
              </el-tag>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.c1BreedingBatch.columns.varietyName') }}</span>
                <span class="value">{{ item.varietyName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.c1BreedingBatch.columns.cropType') }}</span>
                <span class="value">{{ getLabelByValue('crop_type', item.cropType) }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.c1BreedingBatch.columns.startDate') }}</span>
                <span class="value">{{ item.startDate }}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <template v-if="item.auditStatus !== 'approved'">
                <el-button text type="primary" @click.stop="handleEdit(item.id)">
                  {{ $t('common.edit') }}
                </el-button>
                <el-button text type="danger" @click.stop="handleDelete(item.id)">
                  {{ $t('common.delete') }}
                </el-button>
              </template>
              <el-tag v-else type="success" size="small">
                {{ $t('research.c1BreedingBatch.auditApproved') }}
              </el-tag>
            </div>
          </div>

          <div v-if="tableData.length === 0 && !loading" class="empty-state">
            <i class="ri-inbox-line"></i>
            <p>{{ $t('common.noData') }}</p>
          </div>

          <div class="pagination-wrapper">
            <el-pagination v-model:current-page="queryData.pageNum" :total="total" :page-size="queryData.pageSize"
              layout="prev, pager, next" small @current-change="handleSearch" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getC1BreedingBatchList, deleteC1BreedingBatch } from '@/api/c1BreedingBatch'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])

// 数据
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const queryData = ref({
  keyword: '',
  cropType: '',
  batchStatus: '',
  pageNum: 1,
  pageSize: 10
})

// 状态映射
const statusMap = computed(() => ({
  '01': t('research.c1BreedingBatch.status.ongoing'),
  '02': t('research.c1BreedingBatch.status.completed'),
  '03': t('research.c1BreedingBatch.status.terminated')
}))

// 初始化
onMounted(() => {
  handleSearch()
})

// 搜索
const handleSearch = async () => {
  loading.value = true
  try {
    const response = await getC1BreedingBatchList(queryData.value)
    if (response.code === 200) {
      tableData.value = response.data?.list || []
      total.value = response.data?.total || 0
    } else {
      ElMessage.error(response.msg || t('research.c1BreedingBatch.messages.loadError'))
    }
  } catch (error) {
    ElMessage.error(t('research.c1BreedingBatch.messages.loadError'))
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 重置
const handleReset = () => {
  queryData.value = {
    keyword: '',
    cropType: '',
    batchStatus: '',
    pageNum: 1,
    pageSize: 10
  }
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push('/research/c1-breeding-batch/add')
}

// 编辑
const handleEdit = (id) => {
  router.push(`/research/c1-breeding-batch/edit/${id}`)
}

// 详情
const handleDetail = (id, readonly) => {
  router.push(`/research/c1-breeding-batch/detail/${id}?readonly=${readonly}`)
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(
    t('research.c1BreedingBatch.messages.deleteConfirm'),
    t('common.warning'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const response = await deleteC1BreedingBatch([id])
      if (response.code === 200) {
        ElMessage.success(t('research.c1BreedingBatch.messages.deleteSuccess'))
        handleSearch()
      } else {
        ElMessage.error(response.msg || t('common.deleteFailed'))
      }
    } catch (error) {
      ElMessage.error(t('common.deleteFailed'))
      console.error(error)
    }
  }).catch(() => {})
}

// 操作处理
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleDetail(row.id, row.auditStatus === 'approved')
      break
    case 'edit':
      handleEdit(row.id)
      break
    case 'delete':
      handleDelete(row.id)
      break
  }
}

// 获取状态名称
const getStatusName = (status) => {
  return statusMap.value[status] || status
}

// 获取状态标签类型
const getStatusTagType = (status) => {
  const map = {
    '01': 'primary',
    '02': 'success',
    '03': 'info'
  }
  return map[status] || 'info'
}

// 获取操作按钮配置
const getActionButtons = (row) => {
  const buttons = []

  // 查看按钮始终显示
  buttons.push({ type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' })

  // 如果未审核通过,显示编辑和删除按钮
  if (row.auditStatus !== 'approved') {
    buttons.push({ type: '', action: 'edit', label: 'edit', icon: 'ri-edit-line' })
    buttons.push({ type: 'danger', action: 'delete', label: 'delete', icon: 'ri-delete-bin-line' })
  }

  return buttons
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.mobile-card-title {
  display: flex;
  align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  
    i {
      color: #009A44;
    }
    }

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 12px;
    display: block;
}
</style>
