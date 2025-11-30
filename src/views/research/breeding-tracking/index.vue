<template>
  <div class="breeding-tracking-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-map-pin-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.breeding.breedingTracking.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.breeding.breedingTracking.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="queryData.trackingId"
            :placeholder="$t('research.breeding.breedingTracking.searchPlaceholder')"
            class="search-input"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>

          <el-select
            v-model="queryData.stageName"
            :placeholder="$t('research.breeding.breedingTracking.filterByStage')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.breeding.breedingTracking.allStages')" value="" />
            <el-option :label="$t('research.breeding.breedingTracking.stage.parentPrep')" value="01" />
            <el-option :label="$t('research.breeding.breedingTracking.stage.original')" value="02" />
            <el-option :label="$t('research.breeding.breedingTracking.stage.foundation')" value="03" />
            <el-option :label="$t('research.breeding.breedingTracking.stage.certified')" value="04" />
          </el-select>

          <el-select
            v-model="queryData.trackingResult"
            :placeholder="$t('research.breeding.breedingTracking.filterByResult')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.breeding.breedingTracking.allResults')" value="" />
            <el-option :label="$t('research.breeding.breedingTracking.result.normal')" value="01" />
            <el-option :label="$t('research.breeding.breedingTracking.result.abnormal')" value="02" />
            <el-option :label="$t('research.breeding.breedingTracking.result.observing')" value="03" />
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
              <span class="btn-text">{{ $t('research.breeding.breedingTracking.add') }}</span>
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
          <el-table-column prop="trackingId" :label="$t('research.breeding.breedingTracking.columns.trackingId')" width="180" fixed="left" />
          <el-table-column prop="batchId" :label="$t('research.breeding.breedingTracking.columns.batchId')" width="180" />
          <el-table-column prop="stageNameText" :label="$t('research.breeding.breedingTracking.columns.stageName')" min-width="140" align="center" />
          <el-table-column prop="location" :label="$t('research.breeding.breedingTracking.columns.location')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="trackingResultName" :label="$t('research.breeding.breedingTracking.columns.result')" min-width="120" align="center">
            <template #default="{ row }">
              <el-tag :type="getResultTag(row.trackingResult)" size="small">
                {{ row.trackingResultName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="startDate" :label="$t('research.breeding.breedingTracking.columns.startDate')" width="120" align="center" />
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
            <div class="card-title">{{ item.trackingId }}</div>
            <el-tag :type="getResultTag(item.trackingResult)" size="small">
              {{ item.trackingResultName }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.breedingTracking.columns.batchId') }}:</span>
              <span class="value">{{ item.batchId }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.breedingTracking.columns.stageName') }}:</span>
              <span class="value">{{ item.stageNameText }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.breedingTracking.columns.location') }}:</span>
              <span class="value">{{ item.location }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.breedingTracking.columns.startDate') }}:</span>
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
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedingTrackingPageList, deleteBreedingTrackingPage } from '@/api/breeding'

const router = useRouter()
const { t } = useI18n()

// 数据
const loading = ref(false)
const tableData = ref([])
const queryData = ref({
  trackingId: '',
  stageName: '',
  trackingResult: '',
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
    const response = await getBreedingTrackingPageList(queryData.value)
    if (response.code === 200) {
      tableData.value = response.data.records || []
    } else {
      ElMessage.error(response.msg || t('research.breeding.breedingTracking.queryError'))
    }
  } catch (error) {
    ElMessage.error(t('research.breeding.breedingTracking.queryError'))
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 重置
const handleReset = () => {
  queryData.value = {
    trackingId: '',
    stageName: '',
    trackingResult: '',
    pageNum: 1,
    pageSize: 10
  }
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push('/research/breeding/tracking/add')
}

// 编辑
const handleEdit = (id) => {
  router.push(`/research/breeding/tracking/edit/${id}`)
}

// 详情
const handleDetail = (id) => {
  router.push(`/research/breeding/tracking/detail/${id}`)
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(
    t('research.breeding.breedingTracking.deleteConfirm'),
    t('common.warning'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const response = await deleteBreedingTrackingPage([id])
      if (response.code === 200) {
        ElMessage.success(t('research.breeding.breedingTracking.deleteSuccess'))
        handleSearch()
      } else {
        ElMessage.error(response.msg || t('research.breeding.breedingTracking.deleteError'))
      }
    } catch (error) {
      ElMessage.error(t('research.breeding.breedingTracking.deleteError'))
      console.error(error)
    }
  }).catch(() => {})
}

// 获取结果标签类型
const getResultTag = (result) => {
  const map = {
    '01': 'success',
    '02': 'danger',
    '03': 'warning'
  }
  return map[result] || 'info'
}
</script>

<style scoped lang="scss">
.breeding-tracking-page {
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
