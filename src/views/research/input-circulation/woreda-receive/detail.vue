<template>
  <div class="union-receive-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.receiveDetail') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="main-card">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.releaseId')">{{ mainData.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseName')">{{ mainData.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseBy')">{{ mainData.releaseBy }}</el-descriptions-item>
<!--        <el-descriptions-item :label="$t('inputCirculation.targetPhone')">{{ mainData.targetPhone }}</el-descriptions-item>-->
        <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">{{ mainData.releaseOrg }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseDate')">{{ mainData.releaseDate }}</el-descriptions-item>

        <el-descriptions-item :label="$t('inputCirculation.receiveId')">{{ mainData.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.receiveName')">{{ mainData.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.status')">{{ mainData.receiveStatus }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmBy')">{{ mainData.confirmBy || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmOrg')">{{ mainData.confirmOrg || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmTime')">{{ mainData.confirmTime || '-' }}</el-descriptions-item>
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
        <el-table-column :label="$t('inputCirculation.unit')" min-width="100">
          <template #default="{ row }">
            {{ getLabelByValue('agri_unit', row.unit) }}
          </template>
        </el-table-column>
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
import { getWoredaReceiveDetail, getUnionReleaseDetailByReleaseId } from '@/api/inputCirculation'
import { getTownAggregationDetail } from '@/api/villageAggregation'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue } = useDict(['input_type', 'input_category', 'agri_unit'])

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
    const response = await getWoredaReceiveDetail(route.params.id)
    if (response.code === 200) {
      // 后端返回的数据结构：{ main: {...}, details: [...] }
      mainData.value = response.data?.main || {}
      detailData.value = response.data?.details || []

      // 加载需求列表 - 通过分发单获取 zoneId
      if (mainData.value.releaseId) {
        await loadDemandListByReleaseId(mainData.value.releaseId)
      }
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

// 通过分发单ID加载需求列表
const loadDemandListByReleaseId = async (releaseId) => {
  demandLoading.value = true
  try {
    // 先获取分发单详情来获取 zoneId
    const releaseResponse = await getUnionReleaseDetailByReleaseId(releaseId)
    const releaseMain = releaseResponse.data?.main || {}
    const regionCode = releaseMain.zoneId || releaseMain.zone_id
    const year = releaseMain.releaseYear || releaseMain.release_year || new Date().getFullYear().toString()

    if (releaseResponse.code === 200 && regionCode) {
      const response = await getTownAggregationDetail({ sourceCode: regionCode, year })
      if (response.code === 200) {
        demandList.value = response.data || []
      }
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
.union-receive-detail-container { padding: 20px; }
.main-card { margin-top: 20px; }
</style>
