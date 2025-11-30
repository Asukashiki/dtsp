<template>
  <div class="breeding-batch-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-seedling-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.breeding.breedingBatch.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.breeding.breedingBatch.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="queryData.batchId"
            :placeholder="$t('research.breeding.breedingBatch.searchPlaceholder')"
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
            :placeholder="$t('research.breeding.breedingBatch.filterByCropType')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.breeding.breedingBatch.allTypes')" value="" />
            <el-option :label="$t('research.breeding.breedingBatch.cropType.wheat')" value="WHEAT" />
            <el-option :label="$t('research.breeding.breedingBatch.cropType.corn')" value="CORN" />
            <el-option :label="$t('research.breeding.breedingBatch.cropType.rice')" value="RICE" />
            <el-option :label="$t('research.breeding.breedingBatch.cropType.soybean')" value="SOYBEAN" />
            <el-option :label="$t('research.breeding.breedingBatch.cropType.cotton')" value="COTTON" />
          </el-select>

          <el-select
            v-model="queryData.batchStatus"
            :placeholder="$t('research.breeding.breedingBatch.filterByStatus')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.breeding.breedingBatch.allStatus')" value="" />
            <el-option :label="$t('research.breeding.breedingBatch.status.ongoing')" value="01" />
            <el-option :label="$t('research.breeding.breedingBatch.status.completed')" value="02" />
            <el-option :label="$t('research.breeding.breedingBatch.status.terminated')" value="03" />
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
              <span class="btn-text">{{ $t('research.breeding.breedingBatch.add') }}</span>
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
          <el-table-column prop="batchId" :label="$t('research.breeding.breedingBatch.form.batchId')" width="200" fixed="left" />
          <el-table-column prop="varietyName" :label="$t('research.breeding.breedingBatch.form.varietyName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="cropTypeName" :label="$t('research.breeding.breedingBatch.form.cropType')" min-width="120" align="center" />
          <el-table-column prop="breedingLevelName" :label="$t('research.breeding.breedingBatch.form.breedingLevel')" min-width="140" align="center" />
          <el-table-column prop="batchStatusName" :label="$t('research.breeding.breedingBatch.form.status')" min-width="120" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.batchStatus)" size="small">
                {{ row.batchStatusName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="startDate" :label="$t('research.breeding.breedingBatch.form.startDate')" width="120" align="center" />
          <el-table-column :label="$t('common.actions')" width="220" fixed="right" align="center">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleDetail(row.id)">{{ $t('common.view') }}</el-button>
              <el-button link type="primary" @click="handleEdit(row.id)">{{ $t('common.edit') }}</el-button>
              <el-button link type="danger" @click="handleDelete(row.id)">{{ $t('common.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
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
            <el-tag :type="getStatusTag(item.batchStatus)" size="small">
              {{ item.batchStatusName }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.breedingBatch.form.varietyName') }}:</span>
              <span class="value">{{ item.varietyName }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.breedingBatch.form.cropType') }}:</span>
              <span class="value">{{ item.cropTypeName }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.breedingBatch.form.breedingLevel') }}:</span>
              <span class="value">{{ item.breedingLevelName }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.breedingBatch.form.startDate') }}:</span>
              <span class="value">{{ item.startDate }}</span>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedingBatchPageList, deleteBreedingBatchPage } from '@/api/breeding'

const router = useRouter()

// 数据
const loading = ref(false)
const tableData = ref([])
const queryData = ref({
  batchId: '',
  cropType: '',
  batchStatus: '',
  pageNum: 1,
  pageSize: 10
})

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
      tableData.value = response.data.records || []
    } else {
      ElMessage.error(response.msg || '查询失败')
    }
  } catch (error) {
    ElMessage.error('查询失败')
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
  router.push(`/research/breeding/batch/detail/${id}`)
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm('确定删除该繁殖批次吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await deleteBreedingBatchPage([id])
      if (response.code === 200) {
        ElMessage.success('删除成功')
        handleSearch()
      } else {
        ElMessage.error(response.msg || '删除失败')
      }
    } catch (error) {
      ElMessage.error('删除失败')
      console.error(error)
    }
  }).catch(() => {})
}

// 获取状态标签类型
const getStatusTag = (status) => {
  const map = {
    '01': 'info',
    '02': 'success',
    '03': 'danger'
  }
  return map[status] || 'info'
}
</script>

<style scoped lang="scss">
.breeding-batch-page {
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
      grid-template-columns: 1fr 1fr 1fr auto;
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
