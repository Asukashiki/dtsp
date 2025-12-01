<template>
  <div class="breeding-module-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-seedling-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.breeding.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.breeding.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
              v-model="queryData.batchId"
              :placeholder="$t('research.breeding.batch.searchPlaceholder')"
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
              :placeholder="$t('research.breeding.batch.filterByCrop')"
              class="filter-select"
              clearable
              @change="handleSearch"
          >
            <el-option :label="$t('research.breeding.batch.allCrops')" value="" />
            <el-option :label="$t('research.breeding.cropType.wheat')" value="WHEAT" />
            <el-option :label="$t('research.breeding.cropType.corn')" value="CORN" />
            <el-option :label="$t('research.breeding.cropType.rice')" value="RICE" />
            <el-option :label="$t('research.breeding.cropType.soybean')" value="SOYBEAN" />
            <el-option :label="$t('research.breeding.cropType.cotton')" value="COTTON" />
          </el-select>

          <el-select
              v-model="queryData.batchStatus"
              :placeholder="$t('research.breeding.batch.filterByStatus')"
              class="filter-select"
              clearable
              @change="handleSearch"
          >
            <el-option :label="$t('research.breeding.batch.allStatus')" value="" />
            <el-option :label="$t('research.breeding.status.ongoing')" value="01" />
            <el-option :label="$t('research.breeding.status.completed')" value="02" />
            <el-option :label="$t('research.breeding.status.terminated')" value="03" />
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
              <span class="btn-text">{{ $t('research.breeding.batch.add') }}</span>
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
        >
          <el-table-column prop="batchId" :label="$t('research.breeding.batch.columns.batchId')" width="220" fixed="left" />
          <el-table-column prop="varietyName" :label="$t('research.breeding.batch.columns.varietyName')" min-width="150" />
          <el-table-column prop="cropTypeName" :label="$t('research.breeding.batch.columns.cropType')" min-width="140" align="center" />
          <el-table-column prop="breedingMethodName" :label="'繁育方法'" min-width="140" align="center" />
          <el-table-column prop="breedingLevelName" :label="$t('research.breeding.batch.columns.breedingLevel')" width="160" align="center" />
          <el-table-column prop="startDate" :label="$t('research.breeding.batch.columns.startDate')" width="120" align="center" />
          <el-table-column prop="statusName" :label="$t('research.breeding.batch.columns.status')" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.batchStatus)" size="small">
                {{ row.statusName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="trackingCount" :label="$t('research.breeding.batch.columns.trackingCount')" min-width="140" align="center">
            <template #default="{ row }">
              <el-tag type="info" size="small">{{ row.trackingCount || 0 }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="testCount" :label="$t('research.breeding.batch.columns.testCount')" min-width="140" align="center">
            <template #default="{ row }">
              <el-tag type="info" size="small">{{ row.testCount || 0 }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" width="260" fixed="right" align="center">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleDetail(row.id)">{{ $t('common.view') }}</el-button>
              <el-button link type="primary" @click="handleEdit(row.id)">{{ $t('common.edit') }}</el-button>
              <el-button link type="danger" @click="handleDelete(row.id)">{{ $t('common.delete') }}</el-button>
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
            <!-- 添加繁育方法显示 -->
            <div class="card-row">
              <span class="label">繁育方法:</span>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedingBatchPageList, deleteBreedingBatchPage } from '@/api/breeding'

const router = useRouter()
const { t } = useI18n()

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

// 作物类型映射
const cropTypeMap = computed(() => ({
  'wheat': t('research.breeding.cropType.wheat'),
  'corn': t('research.breeding.cropType.corn'),
  'rice': t('research.breeding.cropType.rice'),
  'soybean': t('research.breeding.cropType.soybean'),
  'cotton': t('research.breeding.cropType.cotton')
}))

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
        cropTypeName: cropTypeMap.value[item.cropType] || item.cropType,
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

<style scoped lang="scss">
.breeding-module-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 8px;
  color: white;

  .header-icon-wrapper {
    font-size: 40px;
    margin-right: 20px;
  }

  .header-text {
    flex: 1;

    .page-title {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }

    .page-subtitle {
      margin: 5px 0 0 0;
      opacity: 0.9;
      font-size: 14px;
    }
  }
}

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
            color: #fff;
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
