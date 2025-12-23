<template>
  <div class="result-container">
    <div v-show="!showForm && !showDetail" class="list-view">
       <div class="page-header">
       
            <div class="header-left header-icon">
            <i class="ri-file-list-3-line "></i>
            </div>
             <div class="header-content">
            <div class="header-text">
            <h1 class="page-title">{{ $t('research.breeding.seed.production.result.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breeding.seed.production.subtitle') }}</p>
            </div>
        </div>
       </div>

       <div class="content-wrapper">
          <!-- Search -->
          <el-form :model="queryParams" ref="queryRef" :inline="true" class="search-form">
            <el-form-item :label="$t('research.breeding.seed.production.form.produceBatchName')" prop="produceBatchName">
              <el-input
                v-model="queryParams.produceBatchName"
                :placeholder="$t('research.breeding.seed.production.placeholder.produceBatchName')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
             <el-form-item :label="$t('research.breeding.seed.production.form.varietyName')" prop="varietyName">
              <el-input
                v-model="queryParams.varietyName"
                :placeholder="$t('research.breeding.seed.production.placeholder.varietyName')"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('common.search') }}</el-button>
              <el-button icon="Refresh" @click="resetQuery">{{ $t('common.reset') }}</el-button>
            </el-form-item>
          </el-form>

          <!-- Toolbar -->
          <div class="table-toolbar">
            <el-button type="primary" icon="Plus" @click="handleAdd">
              {{ $t('common.add') }}
            </el-button>
          </div>

          <!-- Table -->
          <el-table v-loading="loading" :data="resultList" style="width: 100%">
             <el-table-column type="index" width="50" align="center" />
             <el-table-column :label="$t('research.breeding.seed.production.columns.produceBatchId')" prop="produceBatchId" min-width="150" show-overflow-tooltip />
             <el-table-column :label="$t('research.breeding.seed.production.columns.produceBatchName')" prop="produceBatchName" min-width="150" show-overflow-tooltip />
             <el-table-column :label="$t('research.breeding.seed.production.columns.varietyName')" prop="varietyName" min-width="120" show-overflow-tooltip />
             <el-table-column :label="$t('research.breeding.seed.production.columns.breedBatchName')" prop="breedBatchName" min-width="150" show-overflow-tooltip />
             <el-table-column :label="$t('research.breeding.seed.production.columns.produceSeedQuantrity')" prop="producedAmount" min-width="120" align="right">
                <template #default="{ row }">
                   {{ row.producedAmount }} kg
                </template>
             </el-table-column>
             <el-table-column :label="$t('research.breeding.seed.production.form.time')" prop="collectionDate" width="160" align="center" />
             <el-table-column :label="$t('common.createTime')" prop="createTime" width="160" align="center" />
             <el-table-column :label="$t('research.breeding.seed.production.columns.operatorName')" prop="operator" width="120" align="center" />
             <el-table-column :label="$t('common.action')" align="center" width="150" fixed="right">
              <template #default="scope">
                <el-button link type="primary" icon="View" @click="handleDetail(scope.row)">
                  {{ $t('common.view') }}
                </el-button>
                <!-- <el-button link type="danger" icon="Delete" @click="handleDelete(scope.row)">
                  {{ $t('common.delete') }}
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
          
          <pagination
            v-show="total>0"
            :total="total"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            @pagination="getList"
          />
       </div>
    </div>

    <ResultForm 
        v-if="showForm"
        @cancel="showForm = false"
        @success="handleSuccess"
    />
    
    <ResultDetail
      v-if="showDetail"
      :result-id="currentResultId"
      @close="showDetail = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedSeedProduceResultList, deleteBreedSeedProduceResult } from '@/api/breedSeed'
import ResultForm from './form.vue'
import ResultDetail from './detail.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loading = ref(true)
const showForm = ref(false)
const showDetail = ref(false)
const resultList = ref([])
const total = ref(0)
const currentResultId = ref(null)

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
    showForm.value = true
}

const handleDetail = (row) => {
    currentResultId.value = row.resultId
    showDetail.value = true
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

const handleSuccess = () => {
    showForm.value = false
    getList()
}

onMounted(() => {
  getList()
})
</script>

<style scoped>

.search-form {
  margin-bottom: 20px;
}

.table-toolbar {
  margin-bottom: 16px;
}
</style>
