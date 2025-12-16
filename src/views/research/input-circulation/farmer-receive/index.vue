<template>
  <div class="farmer-receive-container">
    <el-card class="search-card">
      <el-form :model="queryParams" :inline="true">
        <el-form-item :label="$t('inputCirculation.farmerName')">
          <el-input v-model="queryParams.farmerName" @change="handleQuery" clearable />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.farmerId')">
          <el-input v-model="queryParams.farmerId" @change="handleQuery" clearable />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.releaseYear')">
          <el-date-picker v-model="queryParams.year" type="year" value-format="YYYY" @change="handleQuery" clearable />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.timeRange')">
          <el-date-picker v-model="dateRange" type="daterange" value-format="YYYY-MM-DD" @change="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">{{ $t('common.search') }}</el-button>
          <el-button @click="handleReset">{{ $t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="!isMobile" class="table-card">
      <el-table :data="receiveList" v-loading="loading" border>
        <el-table-column prop="releaseId" :label="$t('inputCirculation.releaseId')" min-width="150" />
        <el-table-column prop="farmerName" :label="$t('inputCirculation.farmerName')" min-width="120" />
        <el-table-column prop="farmerId" :label="$t('inputCirculation.farmerId')" min-width="120" />
        <el-table-column prop="farmerPhone" :label="$t('inputCirculation.farmerPhone')" min-width="130" />
        <el-table-column prop="releaseDate" :label="$t('inputCirculation.releaseDate')" min-width="160" />
        <el-table-column prop="releaseBy" :label="$t('inputCirculation.releaseBy')" min-width="120" />
        <el-table-column prop="releaseOrg" :label="$t('inputCirculation.releaseOrg')" min-width="150" />
        <el-table-column :label="$t('common.actions')" min-width="120" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleView(scope.row)">{{ $t('common.view') }}</el-button>
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
        <div class="card-row"><span class="label">{{ $t('inputCirculation.farmerName') }}:</span><span>{{ item.farmerName }}</span></div>
        <div class="card-row"><span class="label">{{ $t('inputCirculation.releaseDate') }}:</span><span>{{ item.releaseDate }}</span></div>
        <div class="card-row"><span class="label">{{ $t('inputCirculation.releaseBy') }}:</span><span>{{ item.releaseBy }}</span></div>
        <div class="card-actions">
          <el-button type="primary" @click="handleView(item)">{{ $t('common.view') }}</el-button>
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
import { getFarmerReceiveList } from '@/api/inputCirculation'

const { t } = useI18n()
const router = useRouter()
const loading = ref(false)
const receiveList = ref([])
const total = ref(0)
const isMobile = ref(false)
const dateRange = ref([])

const queryParams = reactive({
  farmerId: '',
  farmerName: '',
  year: '',
  startTime: '',
  endTime: '',
  pageNum: 1,
  pageSize: 10
})

const handleQuery = async () => {
  loading.value = true
  if (dateRange.value?.length === 2) {
    queryParams.startTime = dateRange.value[0]
    queryParams.endTime = dateRange.value[1]
  } else {
    queryParams.startTime = ''
    queryParams.endTime = ''
  }
  try {
    const response = await getFarmerReceiveList(queryParams)
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

const handleReset = () => {
  Object.assign(queryParams, {
    farmerId: '',
    farmerName: '',
    year: '',
    startTime: '',
    endTime: '',
    pageNum: 1
  })
  dateRange.value = []
  handleQuery()
}

const handleView = (row) => {
  router.push(`/input/input-circulation/farmer-receive/detail/${row.id}`)
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
.farmer-receive-container { padding: 20px; }
.search-card, .table-card { margin-bottom: 20px; }
.card-list { display: flex; flex-direction: column; gap: 16px; }
.data-card { padding: 16px; }
.card-row { display: flex; margin-bottom: 8px; }
.card-row .label { font-weight: bold; margin-right: 8px; min-width: 120px; }
.card-actions { margin-top: 16px; display: flex; gap: 8px; }
</style>
