<template>
  <div class="union-receive-container">
    <el-card class="search-card">
      <el-form :model="queryParams" :inline="true">
        <el-form-item :label="$t('inputCirculation.releaseBy')">
          <el-input v-model="queryParams.releaseBy" @change="handleQuery" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.receiveStatus')">
          <el-select v-model="queryParams.receiveStatus" @change="handleQuery" clearable>
            <el-option label="Pending" value="Pending" />
            <el-option label="Confirmed" value="Confirmed" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.timeRange')">
          <el-date-picker v-model="dateRange" type="daterange" value-format="YYYY-MM-DD" @change="handleQuery" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="!isMobile" class="table-card">
      <el-table :data="receiveList" v-loading="loading" border>
        <el-table-column prop="releaseId" :label="$t('inputCirculation.releaseId')" min-width="200" />
        <el-table-column prop="releaseName" :label="$t('inputCirculation.releaseName')" min-width="200" />
        <el-table-column prop="releaseOrg" :label="$t('inputCirculation.releaseOrg')" min-width="150" />
        <el-table-column prop="releaseDate" :label="$t('inputCirculation.releaseDate')" min-width="160" />
        <el-table-column prop="receiveStatus" :label="$t('inputCirculation.status')" min-width="120" />
        <el-table-column prop="confirmBy" :label="$t('inputCirculation.confirmBy')" min-width="120" />
        <el-table-column prop="confirmTime" :label="$t('inputCirculation.confirmTime')" min-width="160" />
        <el-table-column :label="$t('common.actions')" min-width="200" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleView(scope.row)">{{ $t('common.view') }}</el-button>
            <el-button v-if="scope.row.receiveStatus === 'Pending'" type="success" link @click="handleConfirm(scope.row)">{{ $t('inputCirculation.confirmReceive') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleQuery"
        @current-change="handleQuery"
      />
    </el-card>

    <div v-else class="card-list">
      <el-card v-for="item in receiveList" :key="item.id" class="data-card">
        <div class="card-row"><span class="label">{{ $t('inputCirculation.releaseName') }}:</span><span>{{ item.releaseName }}</span></div>
        <div class="card-row"><span class="label">{{ $t('inputCirculation.releaseStatus') }}:</span><span>{{ item.receiveStatus }}</span></div>
        <div class="card-actions">
          <el-button type="primary" @click="handleView(item)">{{ $t('common.view') }}</el-button>
          <el-button v-if="item.receiveStatus === 'Pending'" type="success" @click="handleConfirm(item)">{{ $t('inputCirculation.confirmReceive') }}</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getUnionReceiveList } from '@/api/inputCirculation'

const { t } = useI18n()
const router = useRouter()
const loading = ref(false)
const receiveList = ref([])
const total = ref(0)
const isMobile = ref(false)
const dateRange = ref([])

const queryParams = reactive({
  releaseBy: '',
  batchId: '',
  cropType: '',
  varietyName: '',
  startTime: '',
  endTime: '',
  receiveStatus: '',
  pageNum: 1,
  pageSize: 10
})

const handleQuery = async () => {
  loading.value = true
  if (dateRange.value?.length === 2) {
    queryParams.startTime = dateRange.value[0]
    queryParams.endTime = dateRange.value[1]
  }
  try {
    const response = await getUnionReceiveList(queryParams)
    if (response.code === 200) {
      receiveList.value = response.rows || []
      total.value = response.total || 0
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const handleView = (row) => {
  router.push(`/input/input-circulation/union-receive/detail/${row.id}`)
}

const handleConfirm = (row) => {
  router.push(`/input/input-circulation/union-receive/confirm/${row.id}`)
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  handleQuery()
})

onBeforeUnmount(() => window.removeEventListener('resize', checkMobile))
</script>

<style scoped>
.union-receive-container { padding: 20px; }
.search-card, .table-card { margin-bottom: 20px; }
.card-list { display: flex; flex-direction: column; gap: 16px; }
.data-card { padding: 16px; }
.card-row { display: flex; margin-bottom: 8px; }
.card-row .label { font-weight: bold; margin-right: 8px; min-width: 120px; }
.card-actions { margin-top: 16px; display: flex; gap: 8px; }
</style>
