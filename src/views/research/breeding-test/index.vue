<template>
  <div class="breeding-test-list-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('research.breeding.breedingTest.list') }}</h1>
        </div>
      </div>
    </div>

    <!-- 搜索和操作区域 -->
    <div class="search-wrapper">
      <div class="search-left">
        <el-input
          v-model="queryParams.testId"
          :placeholder="$t('research.breeding.breedingTest.form.testIdPlaceholder')"
          clearable
          @change="handleSearch"
        />
        <el-select
          v-model="queryParams.cropType"
          :placeholder="$t('research.breeding.breedingTest.form.cropTypePlaceholder')"
          clearable
          @change="handleSearch"
        >
          <el-option :label="$t('research.breeding.breedingTest.cropType.wheat')" value="WHEAT" />
          <el-option :label="$t('research.breeding.breedingTest.cropType.corn')" value="CORN" />
          <el-option :label="$t('research.breeding.breedingTest.cropType.rice')" value="RICE" />
          <el-option :label="$t('research.breeding.breedingTest.cropType.soybean')" value="SOYBEAN" />
          <el-option :label="$t('research.breeding.breedingTest.cropType.cotton')" value="COTTON" />
        </el-select>
        <el-select
          v-model="queryParams.testResult"
          :placeholder="$t('research.breeding.breedingTest.form.testResultPlaceholder')"
          clearable
          @change="handleSearch"
        >
          <el-option :label="$t('research.breeding.breedingTest.result.qualified')" value="01" />
          <el-option :label="$t('research.breeding.breedingTest.result.unqualified')" value="02" />
          <el-option :label="$t('research.breeding.breedingTest.result.recheck')" value="03" />
        </el-select>
      </div>
      <div class="search-right">
        <el-button type="primary" @click="handleAdd">
          <i class="ri-add-line"></i>
          <span class="btn-text">{{ $t('common.add') }}</span>
        </el-button>
      </div>
    </div>

    <!-- PC表格视图 -->
    <div class="table-wrapper pc-view">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="testId" :label="$t('research.breeding.breedingTest.form.testId')" width="150" />
        <el-table-column prop="trackingId" :label="$t('research.breeding.breedingTest.form.trackingId')" width="150" />
        <el-table-column prop="seedClass" :label="$t('research.c1BreedingBatch.test.seedClass')" width="100" />
        <el-table-column prop="lotId" :label="$t('research.c1BreedingBatch.test.lotId')" width="140" />
        <el-table-column prop="testType" :label="$t('research.c1BreedingBatch.test.testType')" width="120" />
        <el-table-column prop="cropTypeName" :label="$t('research.breeding.breedingTest.form.cropType')" width="100" />
        <el-table-column prop="germinationRate" :label="$t('research.breeding.breedingTest.form.germinationRate')" width="120" />
        <el-table-column prop="testDate" :label="$t('research.breeding.breedingTest.form.testDate')" width="120">
          <template #default="{ row }">{{ formatDate(row.testDate) }}</template>
        </el-table-column>
        <el-table-column :label="$t('research.c1BreedingBatch.test.passStatus')" width="100">
          <template #default="{ row }">
            <el-tag :type="row.passStatus === 'TRUE' ? 'success' : 'danger'">
              {{ row.passStatus === 'TRUE' ? $t('research.c1BreedingBatch.test.passTrue') : $t('research.c1BreedingBatch.test.passFalse') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('research.breeding.breedingTest.form.testResult')" width="100">
          <template #default="{ row }">
            <el-tag :type="getResultTagType(row.testResult)">{{ row.resultText }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.actions')" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row.id)">
              {{ $t('common.view') }}
            </el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row.id)">
              {{ $t('common.edit') }}
            </el-button>
            <el-popconfirm
              :title="$t('common.deleteConfirm')"
              @confirm="handleDelete(row.id)"
            >
              <template #reference>
                <el-button link type="danger" size="small">
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @change="handleSearch"
        />
      </div>
    </div>

    <!-- 移动端卡片视图 -->
    <div class="card-wrapper mobile-view">
      <div v-if="tableData.length === 0" class="empty-state">
        <i class="ri-inbox-line"></i>
        <p>{{ $t('common.noData') }}</p>
      </div>
      <div v-for="item in tableData" :key="item.id" class="card">
        <div class="card-header">
          <span class="title">{{ item.testId }}</span>
          <el-tag :type="getResultTagType(item.testResult)">{{ item.resultText }}</el-tag>
        </div>
        <div class="card-body">
          <div class="card-row">
            <span class="label">{{ $t('research.breeding.breedingTest.form.trackingId') }}:</span>
            <span class="value">{{ item.trackingId }}</span>
          </div>
          <div class="card-row">
            <span class="label">{{ $t('research.breeding.breedingTest.form.cropType') }}:</span>
            <span class="value">{{ item.cropTypeName }}</span>
          </div>
          <div class="card-row">
            <span class="label">{{ $t('research.breeding.breedingTest.form.germinationRate') }}:</span>
            <span class="value">{{ item.germinationRate }}</span>
          </div>
          <div class="card-row">
            <span class="label">{{ $t('research.breeding.breedingTest.form.testDate') }}:</span>
            <span class="value">{{ formatDate(item.testDate) }}</span>
          </div>
        </div>
        <div class="card-footer">
          <el-button size="small" @click="handleView(item.id)">{{ $t('common.view') }}</el-button>
          <el-button size="small" type="primary" @click="handleEdit(item.id)">{{ $t('common.edit') }}</el-button>
          <el-popconfirm
            :title="$t('common.deleteConfirm')"
            @confirm="handleDelete(item.id)"
          >
            <template #reference>
              <el-button size="small" type="danger">{{ $t('common.delete') }}</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedingTestPageList, deleteBreedingTestPage } from '@/api/breeding'

const router = useRouter()

const tableData = ref([])
const total = ref(0)
const loading = ref(false)

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  testId: '',
  cropType: '',
  testResult: ''
})

const resultMap = {
  '01': '合格',
  '02': '不合格',
  '03': '待复检'
}

const resultTypeMap = {
  '01': 'success',
  '02': 'danger',
  '03': 'warning'
}

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  loading.value = true
  try {
    const response = await getBreedingTestPageList(queryParams.value)
    if (response.code === 200 && response.data) {
      tableData.value = response.data.records.map(item => ({
        ...item,
        resultText: resultMap[item.testResult] || item.testResult
      }))
      total.value = response.data.total
    } else {
      ElMessage.error('加载数据失败')
    }
  } catch (error) {
    ElMessage.error('加载数据失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  queryParams.value.pageNum = 1
  loadData()
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('zh-CN')
}

const getResultTagType = (result) => {
  return resultTypeMap[result] || 'info'
}

const handleAdd = () => {
  router.push('/research/breeding/test/add')
}

const handleView = (id) => {
  router.push({
    name: 'BreedingTestDetail',
    params: { id }
  })
}

const handleEdit = (id) => {
  router.push({
    name: 'BreedingTestEdit',
    params: { id }
  })
}

const handleDelete = async (id) => {
  try {
    const response = await deleteBreedingTestPage([id])
    if (response.code === 200) {
      ElMessage.success('删除成功')
      loadData()
    } else {
      ElMessage.error(response.msg || '删除失败')
    }
  } catch (error) {
    ElMessage.error('删除失败')
    console.error(error)
  }
}

const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.breeding-test-list-page {
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

  .header-content {
    width: 100%;
    display: flex;
    align-items: center;

    .header-left {
      margin-right: auto;
    }

    .header-center {
      flex: 1;
      text-align: center;

      .page-title {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
}

.search-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .search-left {
    flex: 1;
    display: flex;
    gap: 10px;

    :deep(.el-input),
    :deep(.el-select) {
      min-width: 150px;
    }
  }

  .search-right {
    :deep(.el-button) {
      .btn-text {
        @media (max-width: 768px) {
          display: none;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .search-left {
      flex-direction: column;

      :deep(.el-input),
      :deep(.el-select) {
        width: 100%;
        min-width: auto;
      }
    }
  }
}

.table-wrapper {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  :deep(.el-table) {
    font-size: 14px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #f0f0f0;
  }
}

.pc-view {
  @media (max-width: 768px) {
    display: none;
  }
}

.card-wrapper {
  display: none;

  @media (max-width: 768px) {
    display: block;
  }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #999;

    i {
      font-size: 48px;
      display: block;
      margin-bottom: 10px;
    }

    p {
      margin: 0;
    }
  }

  .card {
    background: white;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background: #f9f9f9;
      border-bottom: 1px solid #f0f0f0;

      .title {
        font-weight: 600;
        color: #333;
      }
    }

    .card-body {
      padding: 12px 15px;

      .card-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 14px;

        .label {
          color: #666;
          font-weight: 500;
        }

        .value {
          color: #333;
          text-align: right;
          flex: 1;
          margin-left: 10px;
        }
      }
    }

    .card-footer {
      display: flex;
      gap: 8px;
      padding: 10px 15px;
      border-top: 1px solid #f0f0f0;
      background: #fafafa;

      :deep(.el-button) {
        flex: 1;
      }
    }
  }
}
</style>
