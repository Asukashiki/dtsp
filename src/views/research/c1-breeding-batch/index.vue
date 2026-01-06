<template>
  <div class="c1-breeding-batch-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-left header-icon">
        <i class="ri-seedling-line"></i>
      </div>
      <div class="header-content">
        <h1 class="page-title">{{ $t('research.c1BreedingBatch.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.c1BreedingBatch.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="queryData.keyword"
            :placeholder="$t('research.c1BreedingBatch.searchPlaceholder')"
            class="search-input"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>

          <el-select
            v-model="queryData.cropType"
            :placeholder="$t('research.c1BreedingBatch.filterByCrop')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.c1BreedingBatch.allCrops')" value="" />
            <el-option label="Wheat" value="Wheat" />
            <el-option label="Maize" value="Maize" />
            <el-option label="Teff" value="Teff" />
            <el-option label="Sorghum" value="Sorghum" />
            <el-option label="Barley" value="Barley" />
          </el-select>

          <el-select
            v-model="queryData.batchStatus"
            :placeholder="$t('research.c1BreedingBatch.filterByStatus')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.c1BreedingBatch.allStatus')" value="" />
            <el-option :label="$t('research.c1BreedingBatch.status.ongoing')" value="01" />
            <el-option :label="$t('research.c1BreedingBatch.status.completed')" value="02" />
            <el-option :label="$t('research.c1BreedingBatch.status.terminated')" value="03" />
          </el-select>
        </div>

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
          </div>
          <div class="action-right">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('research.c1BreedingBatch.add') }}</span>
            </el-button>
          </div>
        </div>
      </div>

      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          table-layout="fixed"
        >
          <el-table-column prop="batchId" :label="$t('research.c1BreedingBatch.columns.batchId')" min-width="180" fixed="left" show-overflow-tooltip />
          <el-table-column prop="varietyName" :label="$t('research.c1BreedingBatch.columns.varietyName')" min-width="140" show-overflow-tooltip />
          <el-table-column prop="cropType" :label="$t('research.c1BreedingBatch.columns.cropType')" min-width="100" align="center">
            <template #default="{ row }">
              {{ getLabelByValue('crop_type', row.cropType) }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="breedingLevel" :label="$t('research.c1BreedingBatch.columns.breedingLevel')" min-width="140" align="center">
            <template #default="{ row }">
              <el-tag size="small">{{ getBreedingLevelName(row.breedingLevel) }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="startDate" :label="$t('research.c1BreedingBatch.columns.startDate')" min-width="120" align="center" />
          <el-table-column prop="batchStatus" :label="$t('research.c1BreedingBatch.columns.status')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.batchStatus)" size="small">
                {{ getStatusName(row.batchStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="trackingCount" :label="$t('research.c1BreedingBatch.columns.trackingCount')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag type="info" size="small">{{ row.trackingCount || 0 }}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column :label="$t('common.actions')" width="280" fixed="right" align="center">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleDetail(row.id, row.auditStatus === 'approved')">{{ $t('common.view') }}</el-button>
              <el-button v-if="row.auditStatus !== 'approved'" link type="primary" @click="handleEdit(row.id)">{{ $t('common.edit') }}</el-button>
              <el-tag v-if="row.auditStatus === 'approved'" type="success" size="small" style="margin-left: 8px;">{{ $t('research.c1BreedingBatch.auditApproved') }}</el-tag>
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

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view">
        <div v-if="tableData.length === 0" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('common.noData') }}</p>
        </div>
        <div v-for="item in tableData" :key="item.id" class="card" @click="handleDetail(item.id, item.auditStatus === 'approved')">
          <div class="card-header">
            <div class="card-title">{{ item.batchId }}</div>
            <el-tag :type="getStatusTagType(item.batchStatus)" size="small">
              {{ getStatusName(item.batchStatus) }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.c1BreedingBatch.columns.varietyName') }}:</span>
              <span class="value">{{ item.varietyName }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.c1BreedingBatch.columns.cropType') }}:</span>
              <span class="value">{{ getLabelByValue('crop_type', item.cropType) }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.c1BreedingBatch.columns.startDate') }}:</span>
              <span class="value">{{ item.startDate }}</span>
            </div>
          </div>
          <div class="card-footer">
            <template v-if="item.auditStatus !== 'approved'">
              <el-button text type="primary" @click.stop="handleEdit(item.id)">{{ $t('common.edit') }}</el-button>
              <el-button text type="danger" @click.stop="handleDelete(item.id)">{{ $t('common.delete') }}</el-button>
            </template>
            <el-tag v-else type="success" size="small">{{ $t('research.c1BreedingBatch.auditApproved') }}</el-tag>
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

// 繁殖级别映射
const breedingLevelMap = computed(() => ({
  '01': t('research.c1BreedingBatch.breedingLevel.parentPrep'),
  '02': t('research.c1BreedingBatch.breedingLevel.original'),
  '03': t('research.c1BreedingBatch.breedingLevel.foundation'),
  '04': t('research.c1BreedingBatch.breedingLevel.certified')
}))

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

// 获取繁殖级别名称
const getBreedingLevelName = (level) => {
  return breedingLevelMap.value[level] || level
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
</script>

<style scoped lang="scss">

.content-wrapper {
  .search-bar {
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .search-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 15px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .search-input,
      .filter-select {
        width: 100%;
      }
    }

    .action-row {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .action-left,
      .action-right {
        display: flex;
        gap: 10px;

        @media (max-width: 768px) {
          width: 100%;

          button {
            flex: 1;
          }
        }
      }
    }
  }

  .table-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .pagination-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .pc-view {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-view {
    display: none;

    @media (max-width: 768px) {
      display: block;

      .empty-state {
        padding: 60px 20px;
        text-align: center;
        color: #909399;

        i {
          font-size: 48px;
          margin-bottom: 10px;
          display: block;
        }
      }

      .card {
        background: white;
        border-radius: 8px;
        margin-bottom: 15px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #f0f0f0;

          .card-title {
            font-weight: bold;
            color: #333;
            flex: 1;
          }
        }

        .card-body {
          padding: 15px;

          .card-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f9f9f9;
            font-size: 14px;

            &:last-child {
              border-bottom: none;
            }

            .label {
              color: #909399;
              min-width: 100px;
            }

            .value {
              color: #333;
              flex: 1;
              text-align: right;
            }
          }
        }

        .card-footer {
          display: flex;
          justify-content: space-around;
          padding: 12px;
          border-top: 1px solid #f0f0f0;

          button {
            flex: 1;
            font-size: 12px;
          }
        }
      }
    }
  }
}

:deep(.el-button) {
  .btn-text {
    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>
