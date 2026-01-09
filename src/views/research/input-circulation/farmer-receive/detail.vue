<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('inputCirculation.receiveDetail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('inputCirculation.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('inputCirculation.releaseId')">
                {{ mainData.releaseId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.farmerName')">
                {{ mainData.farmerName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.farmerId')">
                {{ mainData.farmerId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.farmerPhone')">
                {{ mainData.farmerPhone || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.farmerAddress')">
                {{ mainData.farmerAddress || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseDate')">
                {{ mainData.releaseDate || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseBy')">
                {{ mainData.releaseBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">
                {{ mainData.releaseOrg || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 需求选择卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check-line"></i>
              <span>{{ $t('inputCirculation.demandSelectionTitle') }}</span>
            </div>
          </div>
          <div class="card-body">
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
          </div>
        </div>

        <!-- 分发明细卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-line"></i>
              <span>{{ $t('inputCirculation.detailInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-table :data="detailData" border>
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
          </div>
        </div>
      </div>
    </div>
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
