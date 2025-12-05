<template>
  <div class="input-quota-container">
    <!-- 查询表单 -->
    <el-card class="search-card">
      <el-form :model="queryParams" :inline="true" label-width="100px">
        <el-form-item :label="$t('inputCirculation.year')">
          <el-date-picker
            v-model="queryParams.year"
            type="year"
            :placeholder="$t('common.pleaseSelect')"
            value-format="YYYY"
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.adminOrg')">
          <el-input
            v-model="queryParams.adminOrg"
            :placeholder="$t('common.pleaseInput')"
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.zone')">
          <el-input
            v-model="queryParams.zone"
            :placeholder="$t('common.pleaseInput')"
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.inputType')">
          <el-select
            v-model="queryParams.inputType"
            :placeholder="$t('common.pleaseSelect')"
            @change="handleQuery"
            clearable
          >
            <el-option label="Seed" value="Seed" />
            <el-option label="Fertilizer" value="Fertilizer" />
            <el-option label="Pesticide" value="Pesticide" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.farmerId')">
          <el-input
            v-model="queryParams.farmerId"
            :placeholder="$t('common.pleaseInput')"
            @change="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.receiveStatus')">
          <el-select
            v-model="queryParams.receiveStatus"
            :placeholder="$t('common.pleaseSelect')"
            @change="handleQuery"
            clearable
          >
            <el-option :label="$t('inputCirculation.notReceived')" value="notReceived" />
            <el-option :label="$t('inputCirculation.partialReceived')" value="partialReceived" />
            <el-option :label="$t('inputCirculation.received')" value="received" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 - 桌面端 -->
    <el-card v-if="!isMobile" class="table-card">
      <el-table :data="quotaList" v-loading="loading" border>
        <el-table-column prop="year" :label="$t('inputCirculation.year')" width="100" />
        <el-table-column prop="adminOrg" :label="$t('inputCirculation.adminOrg')" width="180" />
        <el-table-column prop="zone" :label="$t('inputCirculation.zone')" width="120" />
        <el-table-column prop="inputType" :label="$t('inputCirculation.inputType')" width="120" />
        <el-table-column prop="totalQuota" :label="$t('inputCirculation.totalQuota')" width="120" />
        <el-table-column prop="unit" :label="$t('inputCirculation.unit')" width="100" />
        <el-table-column prop="farmerId" :label="$t('inputCirculation.farmerId')" width="150" />
        <el-table-column prop="farmerName" :label="$t('inputCirculation.farmerName')" width="120" />
        <el-table-column prop="receiveStatus" :label="$t('inputCirculation.receiveStatus')" width="120" />
        <el-table-column prop="createTime" :label="$t('common.createTime')" width="160" />
        <el-table-column :label="$t('common.actions')" width="120" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleView(scope.row)">
              {{ $t('common.view') }}
            </el-button>
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

    <!-- 数据卡片 - 移动端 -->
    <div v-else class="card-list">
      <el-card v-for="item in quotaList" :key="item.id" class="data-card">
        <div class="card-row">
          <span class="label">{{ $t('inputCirculation.year') }}:</span>
          <span class="value">{{ item.year }}</span>
        </div>
        <div class="card-row">
          <span class="label">{{ $t('inputCirculation.adminOrg') }}:</span>
          <span class="value">{{ item.adminOrg }}</span>
        </div>
        <div class="card-row">
          <span class="label">{{ $t('inputCirculation.zone') }}:</span>
          <span class="value">{{ item.zone }}</span>
        </div>
        <div class="card-row">
          <span class="label">{{ $t('inputCirculation.inputType') }}:</span>
          <span class="value">{{ item.inputType }}</span>
        </div>
        <div class="card-row">
          <span class="label">{{ $t('inputCirculation.totalQuota') }}:</span>
          <span class="value">{{ item.totalQuota }} {{ item.unit }}</span>
        </div>
        <div class="card-row">
          <span class="label">{{ $t('inputCirculation.receiveStatus') }}:</span>
          <span class="value">{{ item.receiveStatus }}</span>
        </div>
        <div class="card-actions">
          <el-button type="primary" @click="handleView(item)">
            {{ $t('common.view') }}
          </el-button>
        </div>
      </el-card>
      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        small
        layout="prev, pager, next"
        @size-change="handleQuery"
        @current-change="handleQuery"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getInputQuotaList } from '@/api/inputCirculation'

const { t } = useI18n()
const router = useRouter()

// 响应式数据
const loading = ref(false)
const quotaList = ref([])
const total = ref(0)
const isMobile = ref(false)

const queryParams = reactive({
  year: new Date().getFullYear(),
  adminOrg: '',
  zone: '',
  inputType: '',
  farmerId: '',
  receiveStatus: '',
  pageNum: 1,
  pageSize: 10
})

// 查询列表
const handleQuery = async () => {
  loading.value = true
  try {
    const response = await getInputQuotaList(queryParams)
    if (response.code === 200) {
      quotaList.value = response.rows || []
      total.value = response.total || 0
    } else {
      ElMessage.error(response.msg || t('common.queryFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
    console.error('Query error:', error)
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleView = (row) => {
  router.push(`/input/input-circulation/quota/detail/${row.id}`)
}

// 检测屏幕大小
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  handleQuery()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.input-quota-container {
  padding: 20px;
}

.search-card,
.table-card {
  margin-bottom: 20px;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.data-card {
  padding: 16px;
}

.card-row {
  display: flex;
  margin-bottom: 8px;
}

.card-row .label {
  font-weight: bold;
  margin-right: 8px;
  min-width: 120px;
}

.card-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>
