<template>
  <div class="woreda-allocation-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content>
        <span>{{ $t('allocation.woredaAllocationDetail') }}</span>
      </template>
    </el-page-header>

    <el-card v-loading="loading" class="detail-card">
      <!-- Basic Information -->
      <h3>{{ $t('allocation.basicInfo') }}</h3>
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('allocation.allocationName')">{{ detailData.main?.allocationName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('allocation.year')">{{ detailData.main?.year }}</el-descriptions-item>
        <el-descriptions-item :label="$t('allocation.zone')">{{ detailData.main?.zoneName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('common.createTime')">{{ detailData.main?.createTime }}</el-descriptions-item>
      </el-descriptions>

      <!-- Demand Section -->
      <h3 style="margin-top: 24px">{{ $t('allocation.demand') }}</h3>
      <el-table :data="detailData.demandList" border>
        <el-table-column :label="$t('allocation.inputType')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('allocation.inputCategory')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('allocation.totalQuantity')" prop="totalQuantity" min-width="120" />
      </el-table>

      <!-- Quota Section -->
      <h3 style="margin-top: 24px">{{ $t('allocation.quota') }}</h3>
      <el-table :data="detailData.quotaList" border>
        <el-table-column :label="$t('allocation.inputType')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('allocation.inputCategory')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('allocation.totalQuantity')" prop="totalQuantity" min-width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
// 假设会有相应的API接口
import { getWoredaAllocationDetail } from '@/api/allocation'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue } = useDict(['input_type', 'input_category'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const detailData = ref({ main: {}, demandList: [], quotaList: [] })

// 获取详情数据
const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getWoredaAllocationDetail(route.params.id)
    if (response.code === 200 && response.data) {
      detailData.value = response.data || { main: {}, demandList: [], quotaList: [] }
    } else {
      ElMessage.error(response.msg || t('common.queryFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.woreda-allocation-detail-container {
  padding: 20px;
}
.detail-card {
  margin-top: 20px;
}
</style>