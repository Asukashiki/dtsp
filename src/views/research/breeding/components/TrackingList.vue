<template>
  <div class="tracking-list-component">
    <!-- 列表视图 -->
    <div v-if="currentView === 'list'" class="list-view">
      <!-- 操作栏 -->
      <div class="action-bar">
        <el-button type="primary" @click="handleAdd">
          <i class="ri-add-line"></i>
          {{ $t('research.breeding.tracking.add') }}
        </el-button>
        <el-button @click="loadList">
          <i class="ri-refresh-line"></i>
          {{ $t('common.refresh') }}
        </el-button>
      </div>

      <!-- PC端：数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
        class="tracking-table desktop-table"
      >
        <el-table-column prop="trackingId" :label="$t('research.breeding.tracking.form.trackingId')" min-width="180" show-overflow-tooltip />
        <el-table-column prop="stageNameText" :label="$t('research.breeding.tracking.form.stageName')" min-width="140" align="center" />
        <el-table-column prop="location" :label="$t('research.breeding.tracking.form.location')" min-width="150" show-overflow-tooltip />
        <el-table-column prop="trackingResultName" :label="$t('research.breeding.tracking.form.trackingResult')" min-width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getResultTagType(row.trackingResult)" size="small">
              {{ row.trackingResultName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="testCount" :label="$t('research.breeding.detail.testCount')" min-width="120" align="center">
          <template #default="{ row }">
            <el-tag type="info" size="small">{{ row.testCount || 0 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" :label="$t('research.breeding.tracking.form.startDate')" min-width="120" align="center" />
        <el-table-column :label="$t('common.actions')" width="260" align="center" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDetail(row)">{{ $t('common.view') }}</el-button>
            <el-button link type="primary" @click="handleEdit(row)">{{ $t('common.edit') }}</el-button>
            <el-button link type="danger" @click="handleDelete(row.id)">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 移动端：卡片视图 -->
      <div v-loading="loading" class="mobile-cards">
        <div v-if="tableData.length === 0" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('common.noData') }}</p>
        </div>
        <div v-for="item in tableData" :key="item.id" class="tracking-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-map-pin-line"></i>
              <span>{{ item.trackingId }}</span>
            </div>
            <el-tag :type="getResultTagType(item.trackingResult)" size="small">
              {{ item.trackingResultName }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.tracking.form.stageName') }}:</span>
              <span class="value">{{ item.stageNameText }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.tracking.form.location') }}:</span>
              <span class="value">{{ item.location }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.detail.testCount') }}:</span>
              <span class="value">
                <el-tag type="info" size="small">{{ item.testCount || 0 }}</el-tag>
              </span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.tracking.form.startDate') }}:</span>
              <span class="value">{{ item.startDate }}</span>
            </div>
          </div>
          <div class="card-actions">
            <el-button type="primary" size="small" @click="handleDetail(item)">
              {{ $t('common.view') }}
            </el-button>
            <el-button type="primary" size="small" plain @click="handleEdit(item)">
              {{ $t('common.edit') }}
            </el-button>
            <el-button type="danger" size="small" plain @click="handleDelete(item.id)">
              {{ $t('common.delete') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情视图 -->
    <div v-else-if="currentView === 'detail'" class="detail-view">
      <div class="view-header">
        <el-button @click="handleBack" class="back-button">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
        <h3 class="view-title">{{ $t('research.breeding.tracking.detail') }}</h3>
      </div>
      <TrackingDetail
        v-if="currentTracking"
        :tracking-data="currentTracking"
        @close="handleBack"
      />
    </div>

    <!-- 表单视图 -->
    <div v-else-if="currentView === 'form'" class="form-view">
      <div class="view-header">
        <el-button @click="handleBack" class="back-button">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
        <h3 class="view-title">{{ isEdit ? $t('research.breeding.tracking.edit') : $t('research.breeding.tracking.add') }}</h3>
      </div>
      <TrackingForm
        :batch-id="batchId"
        :tracking-id="editingId"
        :is-edit="isEdit"
        @success="handleFormSuccess"
        @cancel="handleBack"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedingTrackingPageList, deleteBreedingTrackingPage } from '@/api/breeding'
import TrackingDetail from './TrackingDetail.vue'
import TrackingForm from './TrackingForm.vue'

const props = defineProps({
  batchId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['refresh'])

const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const currentView = ref('list') // 'list' | 'detail' | 'form'
const isEdit = ref(false)
const editingId = ref(null)
const currentTracking = ref(null)

// 阶段名称映射
const stageNameMap = computed(() => ({
  '01': t('research.breeding.tracking.stage.parentPrep'),
  '02': t('research.breeding.tracking.stage.original'),
  '03': t('research.breeding.tracking.stage.foundation'),
  '04': t('research.breeding.tracking.stage.certified')
}))

// 跟踪结论映射
const trackingResultMap = computed(() => ({
  '01': t('research.breeding.tracking.result.normal'),
  '02': t('research.breeding.tracking.result.abnormal'),
  '03': t('research.breeding.tracking.result.observing')
}))

// 初始化
onMounted(() => {
  loadList()
})

// 加载列表
const loadList = async () => {
  loading.value = true
  try {
    const response = await getBreedingTrackingPageList({
      batchId: props.batchId,
      pageNum: 1,
      pageSize: 100
    })
    if (response.code === 200) {
      const records = response.data.records || []
      tableData.value = records.map(item => ({
        ...item,
        stageNameText: stageNameMap.value[item.stageName] || item.stageName,
        trackingResultName: trackingResultMap.value[item.trackingResult] || item.trackingResult
      }))
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

// 新增
const handleAdd = () => {
  isEdit.value = false
  editingId.value = null
  currentView.value = 'form'
}

// 编辑
const handleEdit = (row) => {
  isEdit.value = true
  editingId.value = row.id
  currentView.value = 'form'
}

// 查看详情
const handleDetail = (row) => {
  currentTracking.value = row
  currentView.value = 'detail'
}

// 返回列表
const handleBack = () => {
  currentView.value = 'list'
  editingId.value = null
  currentTracking.value = null
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(
    t('research.breeding.tracking.deleteConfirm'),
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
        ElMessage.success(t('research.breeding.messages.deleteSuccess'))
        loadList()
        emit('refresh')
      } else {
        ElMessage.error(response.msg || t('research.breeding.messages.deleteError'))
      }
    } catch (error) {
      ElMessage.error(t('research.breeding.messages.deleteError'))
      console.error(error)
    }
  }).catch(() => {})
}

// 表单成功回调
const handleFormSuccess = () => {
  currentView.value = 'list'
  editingId.value = null
  loadList()
  emit('refresh')
}

// 获取结果标签类型
const getResultTagType = (result) => {
  const map = {
    '01': 'success',
    '02': 'danger',
    '03': 'warning'
  }
  return map[result] || 'info'
}
</script>

<style scoped lang="scss">
.tracking-list-component {
  .list-view {
    .action-bar {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .tracking-table {
      margin-top: 15px;
    }

    // 移动端卡片默认隐藏
    .mobile-cards {
      display: none;
    }
  }

  .detail-view,
  .form-view {
    .view-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e4e7ed;

      .back-button {
        flex-shrink: 0;
      }

      .view-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }
  }

  // 移动端适配
  @media screen and (max-width: 768px) {
    .list-view {
      .action-bar {
        gap: 8px;

        .el-button {
          flex: 1;
          min-width: 0;

          i {
            margin-right: 4px;
          }
        }
      }

      // 隐藏PC端表格
      .desktop-table {
        display: none;
      }

      // 显示移动端卡片
      .mobile-cards {
        display: block;

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #909399;

          i {
            font-size: 48px;
            margin-bottom: 16px;
          }

          p {
            margin: 0;
            font-size: 14px;
          }
        }

        .tracking-card {
          background: #fff;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;

          &:active {
            transform: scale(0.98);
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f0f0f0;

            .card-title {
              display: flex;
              align-items: center;
              gap: 8px;
              font-weight: 600;
              font-size: 14px;
              color: #303133;
              flex: 1;
              min-width: 0;

              i {
                color: #009A44;
                font-size: 18px;
                flex-shrink: 0;
              }

              span {
                word-break: break-all;
              }
            }
          }

          .card-body {
            .card-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 0;
              font-size: 13px;

              .label {
                color: #909399;
                flex-shrink: 0;
                margin-right: 12px;
              }

              .value {
                color: #606266;
                text-align: right;
                word-break: break-all;
              }
            }
          }

          .card-actions {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #f0f0f0;
            display: flex;
            gap: 8px;

            .el-button {
              flex: 1;
            }
          }
        }
      }
    }

    .detail-view,
    .form-view {
      .view-header {
        margin-bottom: 16px;
        padding-bottom: 12px;

        .view-title {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
