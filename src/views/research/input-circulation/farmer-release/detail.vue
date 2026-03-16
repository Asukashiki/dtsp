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
              <el-descriptions-item :label="$t('inputCirculation.farmerName')">
                {{ detailData.main?.farmerName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.farmerPhone')">
                {{ detailData.main?.farmerPhone || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.farmerAddress')">
                {{ detailData.main?.farmerAddress || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseYear')">
                {{ detailData.main?.releaseYear || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseDate')">
                {{ detailData.main?.releaseDate || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseBy')">
                {{ detailData.main?.releaseBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">
                {{ detailData.main?.releaseOrg || '-' }}
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
                    {{ getInputTypeLabel(row.inputType) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
                  <template #default="{ row }">
                    {{ getInputCategoryLabel(row.inputType, row.inputCategory) }}
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
                  {{ getInputTypeLabel(row.inputType) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
                <template #default="{ row }">
                  {{ getInputCategoryLabel(row.inputType, row.inputCategory) }}
                </template>
              </el-table-column>
              <el-table-column prop="quantity" :label="$t('inputCirculation.quantity')" min-width="100" />
              <el-table-column :label="$t('inputCirculation.unit')" min-width="100">
                <template #default="{ row }">
                  {{ getLabelByValue('agri_unit', row.unit) }}
                </template>
              </el-table-column>
              <el-table-column prop="unitPrice" :label="$t('inputCirculation.unitPrice')" min-width="100" />
              <el-table-column prop="outWarehouseName" :label="$t('inputCirculation.outWarehouse')" min-width="140" />
              <el-table-column prop="inWarehouseName" :label="$t('inputCirculation.inWarehouse')" min-width="140" />
              <el-table-column prop="totalPrice" :label="$t('inputCirculation.totalPrice')" min-width="120" />
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
import { getFarmerReleaseDetail } from '@/api/inputCirculation'
import { getFarmerDemandByFarmerId } from '@/api/farmerDemand'
import { useDict } from '@/hooks/useDict'
import { getInventoryProductCategoryTree } from '@/api/inventory'

const { getLabelByValue } = useDict(['agri_unit'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({ main: {}, details: [] })
const demandList = ref([])
const demandLoading = ref(false)
const categoryTree = ref([])

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getFarmerReleaseDetail(route.params.id)
    if (response.code === 200) {
      const data = response.data || {}
      const rawDetails = data.details || data.detailList || []
      detailData.value = {
        ...data,
        details: normalizeDetails(rawDetails)
      }
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
    const year = detailData.value.main?.releaseYear || detailData.value.main?.release_year || new Date().getFullYear().toString()
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

const loadCategoryTree = async () => {
  try {
    const res = await getInventoryProductCategoryTree()
    if (res.code === 200 && Array.isArray(res.data)) {
      categoryTree.value = res.data.map(item => ({
        ...item,
        children: Array.isArray(item.children) && item.children.length > 0
          ? item.children
          : []
      }))
    }
  } catch (error) {
    console.error('Failed to load product category tree:', error)
  }
}

const getInputTypeLabel = (value) => {
  const match = categoryTree.value.find(item => item.value === value)
  return match ? match.label : value || '-'
}

const getInputCategoryLabel = (typeValue, categoryValue) => {
  const parent = categoryTree.value.find(item => item.value === typeValue)
  const match = parent?.children?.find(child => child.value === categoryValue)
  return match ? match.label : categoryValue || '-'
}

const normalizeDetails = (list) => {
  if (!Array.isArray(list)) return []
  return list.map(item => ({
    ...item,
    inputType: item.inputType ?? item.input_type,
    inputCategory: item.inputCategory ?? item.input_category,
    unitPrice: item.unitPrice ?? item.unit_price,
    currentStock: item.currentStock ?? item.current_stock,
    maxQuantity: item.maxQuantity ?? item.max_quantity,
    outWarehouseCode: item.outWarehouseCode ?? item.out_warehouse_code,
    outWarehouseName: item.outWarehouseName ?? item.out_warehouse_name,
    inWarehouseCode: item.inWarehouseCode ?? item.in_warehouse_code,
    inWarehouseName: item.inWarehouseName ?? item.in_warehouse_name
  }))
}

const handleBack = () => router.back()
onMounted(async () => {
  await loadCategoryTree()
  await fetchDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
