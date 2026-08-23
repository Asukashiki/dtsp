<template>
  <div class="test-list-component">
    <!-- 列表视图 -->
    <div v-if="currentView === 'list'" class="list-view">
      <!-- 操作栏 -->
      <div class="action-bar" v-if="trackingId">
        <el-button type="primary" @click="handleAdd" :size="compact ? 'small' : 'default'">
          <i class="ri-add-line"></i>
          {{ $t('research.breeding.test.add') }}
        </el-button>
        <el-button @click="loadList" :size="compact ? 'small' : 'default'">
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
        :size="compact ? 'small' : 'default'"
        class="desktop-table"
      >
        <el-table-column prop="testId" :label="$t('research.breeding.test.form.testId')" min-width="180" show-overflow-tooltip />
        <el-table-column prop="trackingId" :label="$t('research.breeding.test.form.trackingId')" min-width="180" show-overflow-tooltip v-if="!trackingId" />
        <el-table-column prop="cropTypeName" :label="$t('research.breeding.test.form.cropType')" min-width="120" align="center" />
        <el-table-column prop="testDate" :label="$t('research.breeding.test.form.testDate')" min-width="120" align="center" />
        <el-table-column prop="testResultName" :label="$t('research.breeding.test.form.testResult')" min-width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getResultTagType(row.testResult)" size="small">
              {{ row.testResultName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.actions')" width="220" align="center" fixed="right" v-if="!compact">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDetail(row)">{{ $t('common.view') }}</el-button>
            <el-button link type="primary" @click="handleEdit(row)" v-if="trackingId">{{ $t('common.edit') }}</el-button>
            <el-button link type="danger" @click="handleDelete(row.id)" v-if="trackingId">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.actions')" width="240" align="center" v-if="compact">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleDetail(row)">{{ $t('common.view') }}</el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)" v-if="trackingId">{{ $t('common.edit') }}</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row.id)" v-if="trackingId">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 移动端：卡片视图 -->
      <div v-loading="loading" class="mobile-cards">
        <div v-if="tableData.length === 0" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('common.noData') }}</p>
        </div>
        <div v-for="item in tableData" :key="item.id" class="test-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-test-tube-line"></i>
              <span>{{ item.testId }}</span>
            </div>
            <el-tag :type="getResultTagType(item.testResult)" size="small">
              {{ item.testResultName }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row" v-if="!trackingId">
              <span class="label">{{ $t('research.breeding.test.form.trackingId') }}:</span>
              <span class="value">{{ item.trackingId }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.test.form.cropType') }}:</span>
              <span class="value">{{ item.cropTypeName }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.breeding.test.form.testDate') }}:</span>
              <span class="value">{{ item.testDate }}</span>
            </div>
          </div>
          <div class="card-actions">
            <el-button type="primary" size="small" @click="handleDetail(item)">
              {{ $t('common.view') }}
            </el-button>
            <el-button type="primary" size="small" plain @click="handleEdit(item)" v-if="trackingId">
              {{ $t('common.edit') }}
            </el-button>
            <el-button type="danger" size="small" plain @click="handleDelete(item.id)" v-if="trackingId">
              {{ $t('common.delete') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情视图 -->
    <div v-else-if="currentView === 'detail'" class="detail-view">
      <div class="view-header">
        <el-button @click="handleBack" class="back-button" :size="compact ? 'small' : 'default'">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
        <h3 class="view-title">{{ $t('research.breeding.test.detail') }}</h3>
      </div>
      <TestDetail v-if="currentTest" :test-data="currentTest" />
    </div>

    <!-- 表单视图 -->
    <div v-else-if="currentView === 'form'" class="form-view">
      <div class="view-header">
        <el-button @click="handleBack" class="back-button" :size="compact ? 'small' : 'default'">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
        <h3 class="view-title">{{ isEdit ? $t('research.breeding.test.edit') : $t('research.breeding.test.add') }}</h3>
      </div>
      <TestForm
        :batch-id="batchId"
        :tracking-id="trackingId"
        :test-id="editingId"
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
import { getBreedingTestPageList, deleteBreedingTestPage } from '@/api/breeding'
import TestDetail from './TestDetail.vue'
import TestForm from './TestForm.vue'

const props = defineProps({
  batchId: String,
  trackingId: String,
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh'])

const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const currentView = ref('list') // 'list' | 'detail' | 'form'
const isEdit = ref(false)
const editingId = ref(null)
const currentTest = ref(null)

// 作物类型映射
const cropTypeMap = computed(() => ({
  'WHEAT': t('research.breeding.cropType.wheat'),
  'CORN': t('research.breeding.cropType.corn'),
  'RICE': t('research.breeding.cropType.rice'),
  'SOYBEAN': t('research.breeding.cropType.soybean'),
  'COTTON': t('research.breeding.cropType.cotton')
}))

// 检测结论映射
const testResultMap = computed(() => ({
  '01': t('research.breeding.test.result.qualified'),
  '02': t('research.breeding.test.result.unqualified'),
  '03': t('research.breeding.test.result.toBeRetested')
}))

// 初始化
onMounted(() => {
  loadList()
})

// 加载列表
const loadList = async () => {
  loading.value = true
  try {
    const params = { pageNum: 1, pageSize: 100 }
    if (props.batchId) params.batchId = props.batchId
    if (props.trackingId) params.trackingId = props.trackingId

    const response = await getBreedingTestPageList(params)
    if (response.code === 200) {
      const records = response.data.records || []
      tableData.value = records.map(item => ({
        ...item,
        cropTypeName: cropTypeMap.value[item.cropType] || item.cropType,
        testResultName: testResultMap.value[item.testResult] || item.testResult
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
  currentTest.value = row
  currentView.value = 'detail'
}

// 返回列表
const handleBack = () => {
  currentView.value = 'list'
  editingId.value = null
  currentTest.value = null
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(
    t('research.breeding.test.deleteConfirm'),
    t('common.warning'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const response = await deleteBreedingTestPage([id])
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
.test-list-component {
  .list-view {
    .action-bar {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
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

        .test-card {
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

              i {
                color: #009A44;
                font-size: 18px;
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
