<template>
  <div class="farmer-receive-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.receiveDetail') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="main-card">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.releaseId')">{{ mainData.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerName')">{{ mainData.farmerName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerId')">{{ mainData.farmerId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerPhone')">{{ mainData.farmerPhone }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerAddress')">{{ mainData.farmerAddress }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseDate')">{{ mainData.releaseDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseBy')">{{ mainData.releaseBy }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">{{ mainData.releaseOrg }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card v-loading="demandLoading" class="main-card">
      <h3>{{ $t('inputCirculation.demandSelectionTitle') }}</h3>
      <el-table :data="demandList" border style="margin-top: 16px">
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.totalQuantity')" prop="totalQuantity" min-width="120" />
      </el-table>
    </el-card>

    <el-card v-loading="loading" class="main-card">
      <h3>{{ $t('inputCirculation.detailInfo') }}</h3>
      <el-table :data="detailData" border style="margin-top: 16px">
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_type', row.inputType) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
          <template #default="{ row }">
            {{ getLabelByValue('input_category', row.inputCategory) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('inputCirculation.quantity')" prop="quantity" min-width="120" />
        <el-table-column :label="$t('inputCirculation.unit')" prop="unit" min-width="100" />
        <el-table-column :label="$t('inputCirculation.unitPrice')" prop="unitPrice" min-width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFarmerReceiveDetail } from '@/api/inputCirculation'
import { getFarmerDemandByFarmerId } from '@/api/farmerDemand'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue } = useDict(['input_type', 'input_category'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const mainData = ref({})
const detailData = ref([])
const demandList = ref([])
const demandLoading = ref(false)

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getFarmerReceiveDetail(route.params.id)
    if (response.code === 200) {
      mainData.value = response.data?.main || {}
      detailData.value = response.data?.details || []
      
      // 加载农民需求列表
      if (mainData.value.farmerId) {
        await loadDemandList(mainData.value.farmerId)
      }
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const loadDemandList = async (farmerId) => {
  demandLoading.value = true
  try {
    const year = mainData.value.releaseYear || mainData.value.release_year || new Date().getFullYear().toString()
    const response = await getFarmerDemandByFarmerId(farmerId, { year })
    if (response.code === 200) {
      demandList.value = response.data || []
    }
  } catch (error) {
    console.error('Failed to load demand list:', error)
  } finally {
    demandLoading.value = false
  }
}

const handleBack = () => router.back()
onMounted(() => fetchDetail())
</script>

<style scoped>
.farmer-receive-detail-container { padding: 20px; }
.main-card { margin-top: 20px; }
</style>
