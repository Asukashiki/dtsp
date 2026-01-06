<template>
  <div class="ose-release-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.releaseDetail') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="detail-card">
      <h3>{{ $t('inputCirculation.basicInfo') }}</h3>
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.releaseId')">{{ detailData.main?.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseName')">{{ detailData.main?.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.unionId')">{{ detailData.main?.targetId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.unionContact')">{{ detailData.main?.targetContact }}</el-descriptions-item>
<!--        <el-descriptions-item :label="$t('inputCirculation.targetPhone')">{{ detailData.main?.targetPhone }}</el-descriptions-item>-->
        <el-descriptions-item :label="$t('inputCirculation.releaseDate')">{{ detailData.main?.releaseDate }}</el-descriptions-item>
<!--        <el-descriptions-item :label="$t('inputCirculation.releaseBy')">{{ detailData.main?.releaseBy }}</el-descriptions-item>-->
        <el-descriptions-item :label="$t('inputCirculation.auditBy')">{{ detailData.main?.auditBy }}</el-descriptions-item>
<!--        <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">{{ detailData.main?.releaseOrg }}</el-descriptions-item>-->
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
        <el-table-column prop="quantity" :label="$t('inputCirculation.quantity')" />
        <el-table-column :label="$t('inputCirculation.unit')">
          <template #default="{ row }">
            {{ getLabelByValue('agri_unit', row.unit) }}
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" :label="$t('inputCirculation.unitPrice')" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOseReleaseDetail } from '@/api/inputCirculation'
import { getTownAggregationDetail } from '@/api/villageAggregation'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue } = useDict(['input_type', 'input_category', 'agri_unit'])

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
    const response = await getOseReleaseDetail(route.params.id)
    if (response.code === 200) {
      detailData.value = response.data || { main: {}, details: [] }
      console.log('OSE Release Detail main:', detailData.value.main)
      // 加载需求列表 - 尝试多个字段
      const regionCode = detailData.value.main?.zoneId || detailData.value.main?.zone_id
      if (regionCode) {
        await loadDemandList(regionCode)
      } else {
        console.warn('No zoneId found in main data')
      }
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

// 加载需求列表
const loadDemandList = async (regionCode) => {
  demandLoading.value = true
  try {
    const year = detailData.value.main?.releaseYear || detailData.value.main?.release_year || new Date().getFullYear().toString()
    const response = await getTownAggregationDetail({ sourceCode: regionCode, year })
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
