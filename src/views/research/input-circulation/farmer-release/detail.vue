<template>
  <div class="ose-release-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.releaseDetail') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="detail-card">
      <h3>{{ $t('inputCirculation.basicInfo') }}</h3>
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.releaseId')">{{ detailData.main?.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerName')">{{ detailData.main?.farmerName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerPhone')">{{ detailData.main?.farmerPhone }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerAddress')">{{ detailData.main?.farmerAddress }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseYear')">{{ detailData.main?.releaseYear }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseDate')">{{ detailData.main?.releaseDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseBy')">{{ detailData.main?.releaseBy }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">{{ detailData.main?.releaseOrg }}</el-descriptions-item>
      </el-descriptions>

      <h3 style="margin-top: 24px">{{ $t('inputCirculation.demandSelectionTitle') }}</h3>
      <el-table :data="demandList" border v-loading="demandLoading">
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

      <h3 style="margin-top: 24px">{{ $t('inputCirculation.detailInfo') }}</h3>
      <el-table :data="detailData.details" border>
        <el-table-column type="index" width="50" />
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
        <el-table-column prop="quantity" :label="$t('inputCirculation.quantity')" min-width="100" />
        <el-table-column prop="unit" :label="$t('inputCirculation.unit')" min-width="100" />
        <el-table-column prop="unitPrice" :label="$t('inputCirculation.unitPrice')" min-width="100" />
        <el-table-column prop="totalPrice" :label="$t('inputCirculation.totalPrice')" min-width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFarmerReleaseDetail } from '@/api/inputCirculation'
import { getFarmerDemandByFarmerId } from '@/api/farmerDemand'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue } = useDict(['input_type', 'input_category'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({ main: {}, details: [] })
const demandList = ref([])
const demandLoading = ref(false)

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getFarmerReleaseDetail(route.params.id)
    if (response.code === 200) {
      detailData.value = response.data || { main: {}, details: [] }
      // 加载该农民的需求列表
      const farmerId = detailData.value.main?.farmerId
      if (farmerId) {
        await loadDemandList(farmerId)
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
    const response = await getFarmerDemandByFarmerId(farmerId)
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
.ose-release-detail-container { padding: 20px; }
.detail-card { margin-top: 20px; }
</style>

