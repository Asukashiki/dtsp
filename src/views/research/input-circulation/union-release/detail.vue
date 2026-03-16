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
            <h1 class="page-title">{{ $t('inputCirculation.releaseDetail') }}</h1>
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
                {{ detailData.main?.releaseId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseName')">
                {{ detailData.main?.releaseName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.targetId')">
                {{ detailData.main?.targetId || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.targetContact')">
                {{ detailData.main?.targetContact || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseDate')">
                {{ detailData.main?.releaseDate || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.auditBy')">
                {{ detailData.main?.auditBy || '-' }}
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
              <el-table-column prop="outWarehouseName" :label="$t('inputCirculation.outWarehouse')" min-width="140" />
              <el-table-column prop="inWarehouseName" :label="$t('inputCirculation.inWarehouse')" min-width="140" />
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
import { getUnionReleaseDetail } from '@/api/inputCirculation'
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
    const response = await getUnionReleaseDetail(route.params.id)
    if (response.code === 200) {
      detailData.value = response.data || { main: {}, details: [] }
      // 加载需求列表
      const regionCode = detailData.value.main?.zoneId || detailData.value.main?.zone_id
      if (regionCode) {
        await loadDemandList(regionCode)
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
