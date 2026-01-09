<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-scales-3-line"
        :title="$t('research.breeding.seed.production.result.list')"
        :subtitle="$t('research.breeding.seed.production.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="resetQuery">
            <SearchItem :label="$t('research.breeding.seed.production.columns.produceBatchName')">
              <el-input
                v-model="queryParams.produceBatchName"
                :placeholder="$t('research.breeding.seed.production.columns.produceBatchName')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.breeding.seed.production.columns.varietyName')">
              <el-input
                v-model="queryParams.varietyName"
                :placeholder="$t('research.breeding.seed.production.columns.varietyName')"
                clearable
                class="search-input" />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.breeding.seed.production.result.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="resultList" stripe v-loading="loading">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                prop="produceBatchId"
                :label="$t('research.breeding.seed.production.columns.produceBatchId')"
                min-width="200"
                show-overflow-tooltip />
              <el-table-column
                prop="produceBatchName"
                :label="$t('research.breeding.seed.production.columns.produceBatchName')"
                min-width="180"
                show-overflow-tooltip />
              <el-table-column
                prop="varietyName"
                :label="$t('research.breeding.seed.production.columns.varietyName')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="breedBatchName"
                :label="$t('research.breeding.seed.production.columns.breedBatchName')"
                min-width="180"
                show-overflow-tooltip />
              <el-table-column
                prop="producedAmount"
                :label="$t('research.breeding.seed.production.columns.produceSeedQuantrity')"
                min-width="150"
                align="right">
                <template #default="{ row }">
                  {{ row.producedAmount }} kg
                </template>
              </el-table-column>
              <el-table-column
                prop="collectionDate"
                :label="$t('research.breeding.seed.production.form.time')"
                min-width="160" />
              <el-table-column
                prop="operator"
                :label="$t('research.breeding.seed.production.columns.operatorName')"
                min-width="120" />
              <el-table-column
                :label="$t('common.actions')"
                width="240"
                fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button type="primary" size="small" @click="handleDetail(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="getList"
                @current-change="getList" />
            </div>
          </div>

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only">
            <div
              v-for="item in resultList"
              :key="item.resultId"
              class="mobile-card"
              @click="handleDetail(item)">
              <div class="mobile-card-header">
                <div class="mobile-card-title">
                  <i class="ri-scales-3-line"></i>
                  <span>{{ item.produceBatchName }}</span>
                </div>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breeding.seed.production.columns.varietyName') }}:</span>
                  <span class="value">{{ item.varietyName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breeding.seed.production.columns.produceSeedQuantrity') }}:</span>
                  <span class="value">{{ item.producedAmount }} kg</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breeding.seed.production.form.time') }}:</span>
                  <span class="value">{{ item.collectionDate }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.breeding.seed.production.columns.operatorName') }}:</span>
                  <span class="value">{{ item.operator }}</span>
                </div>
              </div>
            </div>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :page-sizes="[10, 20, 50]"
                :total="total"
                layout="total, prev, pager, next"
                small
                @size-change="getList"
                @current-change="getList" />
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedSeedProduceResultList, deleteBreedSeedProduceResult } from '@/api/breedSeed'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const loading = ref(true)
const resultList = ref([])
const total = ref(0)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  produceBatchName: undefined,
  varietyName: undefined
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getBreedSeedProduceResultList(queryParams)
    resultList.value = res.rows
    total.value = res.total
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const resetQuery = () => {
  queryParams.produceBatchName = undefined
  queryParams.varietyName = undefined
  handleQuery()
}

const handleAdd = () => {
  router.push({ name: 'SeedProductionResultAdd' })
}

const handleDetail = (row) => {
  router.push({ 
    name: 'SeedProductionResultDetail', 
    params: { id: row.resultId } 
  })
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('common.confirmDelete'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    await deleteBreedSeedProduceResult(row.resultId)
    ElMessage.success(t('common.deleteSuccess'))
    getList()
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

// 操作按钮样式 - 匹配 ActionButtons 组件的样式
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;

  :deep(.el-button) {
    min-width: auto;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 500;
    margin: 0 !important;

    i {
      margin-right: 4px;
      font-size: 13px;
      vertical-align: middle;
    }

    .btn-text {
      white-space: nowrap;
    }
  }
}
</style>
