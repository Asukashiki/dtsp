<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('farmerDemand.detail') }}</h1>
            <p class="page-subtitle">{{ $t('farmerDemand.subtitle') }}</p>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="handleEdit"
                     v-if="detailData.status === '0' || detailData.status === '3'">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <InfoCard :title="$t('farmerDemand.detailSections.basicInfo')" icon="ri-information-line">
          <div class="card-body">
            <div class="info-grid">
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.batchNo') }}</div>
                <div class="value">{{ detailData.batchNo || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.status') }}</div>
                <div class="value">
                  <el-tag :type="getStatusType(detailData.status)">
                    {{ detailData.statusName || getStatusLabel(detailData.status) }}
                  </el-tag>
                </div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.daUserName') }}</div>
                <div class="value">{{ detailData.daUserName || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.createdTime') }}</div>
                <div class="value">{{ detailData.createdTime || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('Year') }}</div>
                <div class="value">{{ detailData.year || '-' }}</div>
              </div>
            </div>
          </div>
        </InfoCard>

        <!-- 农民信息 -->
        <InfoCard :title="$t('farmerDemand.detailSections.farmerInfo')" icon="ri-user-line">
          <div class="card-body">
            <div class="info-grid">
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.farmerName') }}</div>
                <div class="value">{{ detailData.farmerName || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.farmerIdNumber') }}</div>
                <div class="value">{{ detailData.farmerIdNumber || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.landArea') }}</div>
                <div class="value">{{ detailData.landArea || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.zone') }}</div>
                <div class="value">{{ detailData.zoneName || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.woreda') }}</div>
                <div class="value">{{ detailData.woredaName || '-' }}</div>
              </div>
              <div class="info-item">
                <div class="label">{{ $t('farmerDemand.form.kebele') }}</div>
                <div class="value">{{ detailData.kebeleName || '-' }}</div>
              </div>
              <div class="info-item full-width" v-if="detailData.remark">
                <div class="label">{{ $t('farmerDemand.form.remark') }}</div>
                <div class="value">{{ detailData.remark }}</div>
              </div>
            </div>
          </div>
        </InfoCard>

        <!-- 投入品明细 -->
        <InfoCard :title="$t('farmerDemand.detailSections.itemsInfo')" icon="ri-list-check">
          <div class="card-body">
            <div v-if="!detailData.inputItems || detailData.inputItems.length === 0" class="no-data">
              <el-empty :description="$t('farmerDemand.form.noItems')" />
            </div>
            <template v-else>
              <div class="table-wrapper pc-only">
                <el-table :data="detailData.inputItems" stripe border>
                  <el-table-column type="index" :label="'#'" width="60" />
                  <el-table-column prop="inputCategory" :label="$t('farmerDemand.form.inputCategory')" min-width="180">
                    <template #default="{ row }">
                      {{ getInputCategoryLabel(row.inputCategory) || row.inputCategory || '-' }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('farmerDemand.form.variety')" min-width="180">
                    <template #default="{ row }">
                      {{ getInputTypeLabel(row.inputType) || row.inputType || '-' }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="unit" :label="$t('farmerDemand.form.unit')" width="180">
                    <template #default="{ row }">
                      {{ getLabelByValue('agri_unit', row.unit) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="season" :label="$t('season')" width="100" >
                    <template #default="{ row }">
                      {{ getLabelByValue('agri_season', row.season) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="cropLand" :label="$t('crop land')" width="100" />
                  <el-table-column prop="quantity" :label="$t('farmerDemand.form.quantity')" width="120">
                    <template #default="{ row }">
                      {{ row.quantity || '-' }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="fertilizerAmount" :label="$t('Specific fertilization amount')" width="120">
                    <template #default="{ row }">
                      {{ row.fertilizerAmount || '-' }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="items-cards mobile-only">
                <div v-for="(item, index) in detailData.inputItems" :key="index" class="item-card">
                  <div class="item-index">{{ index + 1 }}</div>
                  <div class="item-info">
                    <div class="item-row">
                      <span class="label">{{ $t('farmerDemand.form.inputCategory') }}:</span>
                      <span class="value">{{ getInputCategoryLabel(item.inputCategory) || item.inputCategory || '-' }}</span>
                    </div>
                    <div class="item-row">
                      <span class="label">{{ $t('farmerDemand.form.variety') }}:</span>
                      <span class="value">{{ item.variety || '-' }}</span>
                    </div>
                    <div class="item-row" v-if="item.specification">
                      <span class="label">{{ $t('farmerDemand.form.specification') }}:</span>
                      <span class="value">{{ item.specification }}</span>
                    </div>
                    <div class="item-row">
                      <span class="label">{{ $t('farmerDemand.form.unit') }}:</span>
                      <span class="value">{{ item.unit || '-' }}</span>
                    </div>
                    <div class="item-row">
                      <span class="label">{{ $t('farmerDemand.form.quantity') }}:</span>
                      <span class="value">{{ item.quantity || '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFarmerDemandDetail } from '@/api/farmerDemand'
import { useDict, clearDictCache } from '@/hooks/useDict'
import { InfoCard } from '@/components/common'

const { getLabelByValue, options } = useDict(['agri_season', 'agri_unit'])

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref({})

// 清除字典缓存并加载
clearDictCache('input_type')
clearDictCache('input_category')
clearDictCache('farmer_demand_status')

const {
  options: dictOptions,
  loading: dictLoading
} = useDict([
  'input_type',
  'input_category',
  'farmer_demand_status'
], {
  immediate: true,
  cache: true
})

// 状态标签（从字典获取）
const getStatusLabel = (status) => {
  const statusDict = dictOptions.value.farmer_demand_status || {}
  const statusMap = {
    '0': statusDict['0'] || t('farmerDemand.status.draft'),
    '1': statusDict['1'] || t('farmerDemand.status.submitted'),
    '2': statusDict['2'] || t('farmerDemand.status.approved'),
    '3': statusDict['3'] || t('farmerDemand.status.rejected'),
    '4': statusDict['4'] || t('farmerDemand.status.locked'),
  }
  return statusMap[status] || statusDict[status] || status || '-'
}

// 状态标签类型
const getStatusType = (status) => {
  const typeMap = {
    '0': 'info',
    '1': 'warning',
    '2': 'success',
    '3': 'danger',
    '4': '',
  }
  return typeMap[status] || 'info'
}

// 投入品大类标签
const getInputCategoryLabel = (categoryValue) => {
  if (!categoryValue) return '-'
  const typeDict = dictOptions.value.input_type || []
  const typeItem = typeDict.find(item => item.value === categoryValue)
  if (typeItem) return typeItem.label

  const categoryDict = dictOptions.value.input_category || []
  const categoryItem = categoryDict.find(item => item.value === categoryValue)
  if (categoryItem) return categoryItem.label

  const legacyMap = {
    seed: t('farmerDemand.inputCategory.seed'),
    fertilizer: t('farmerDemand.inputCategory.fertilizer'),
    pesticide: t('farmerDemand.inputCategory.pesticide')
  }
  return legacyMap[categoryValue] || categoryValue
}

// 投入品小类标签
const getInputTypeLabel = (typeValue) => {
  if (!typeValue) return '-'
  const categoryDict = dictOptions.value.input_category || []
  const categoryItem = categoryDict.find(item => item.value === typeValue)
  return categoryItem ? categoryItem.label : typeValue
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getFarmerDemandDetail(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 返回
const handleBack = () => {
  router.back()
}

// 编辑
const handleEdit = () => {
  router.push({ name: 'FarmerDemandEdit', params: { id: route.params.id } })
}

// 初始化
onMounted(async () => {
  await new Promise(resolve => {
    const checkDict = () => {
      if (!dictLoading.value) {
        resolve()
      } else {
        setTimeout(checkDict, 100)
      }
    }
    checkDict()
  })
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label {
    font-size: 13px;
    color: var(--text-color-secondary);
    font-weight: 500;
  }

  .value {
    font-size: 15px;
    color: var(--text-color-primary);
    font-weight: 500;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}

.no-data {
  text-align: center;
  padding: 32px 0;
}

.items-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item-card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px;
  background: var(--bg-color-overlay);
}

.item-index {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-color-primary);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-row {
  display: flex;
  font-size: 14px;
  line-height: 1.6;

  .label {
    color: var(--text-color-secondary);
    min-width: 120px;
    flex-shrink: 0;
  }

  .value {
    color: var(--text-color-primary);
    font-weight: 500;
  }
}

// Mobile adaptation
@media screen and (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
