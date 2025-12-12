<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-file-text-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('farmerDemand.detail') }}</h1>
            <p class="page-subtitle">{{ $t('farmerDemand.subtitle') }}</p>
          </div>
        </div>
        <div class="header-actions">
          <el-button @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
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
        <div class="info-section">
          <div class="section-header">
            <i class="ri-information-line"></i>
            <span>{{ $t('farmerDemand.detailSections.basicInfo') }}</span>
          </div>
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
          </div>
        </div>

        <!-- 农民信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-user-line"></i>
            <span>{{ $t('farmerDemand.detailSections.farmerInfo') }}</span>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <div class="label">{{ $t('farmerDemand.form.farmerId') }}</div>
              <div class="value">{{ detailData.farmerId || '-' }}</div>
            </div>
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

        <!-- 投入品明细 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-list-check"></i>
            <span>{{ $t('farmerDemand.detailSections.itemsInfo') }}</span>
          </div>
          <div v-if="!detailData.inputItems || detailData.inputItems.length === 0" class="no-data">
            <el-empty :description="$t('farmerDemand.form.noItems')" />
          </div>
          <template v-else>
            <div class="items-table pc-only">
              <el-table :data="detailData.inputItems" stripe border>
                <el-table-column type="index" :label="'#'" width="60" />
                <el-table-column prop="inputCategory" :label="$t('farmerDemand.form.inputCategory')" min-width="120">
                  <template #default="{ row }">
                    {{ getInputCategoryLabel(row.inputCategory) || row.inputCategory || '-' }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('farmerDemand.form.variety')" min-width="120">
                  <template #default="{ row }">
                    {{ getInputTypeLabel(row.inputType) || row.inputType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="unit" :label="$t('farmerDemand.form.unit')" width="100">
                  <template #default="{ row }">
                    {{ row.unit || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" :label="$t('farmerDemand.form.quantity')" width="120">
                  <template #default="{ row }">
                    {{ row.quantity || '-' }}
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

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.info-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e8f5e9;
}

.info-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-header {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-header i {
  font-size: 22px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item .label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.info-item .value {
  font-size: 16px;
  color: #333;
}

.no-data {
  text-align: center;
  padding: 40px 0;
}

.items-table {
  margin-top: 16px;
}

.items-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.item-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background: #fafafa;
}

.item-index {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
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
}

.item-row .label {
  color: #666;
  min-width: 120px;
  flex-shrink: 0;
}

.item-row .value {
  color: #333;
  font-weight: 500;
}

.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .header-actions {
    width: 100%;
    display: flex;
    gap: 8px;
  }

  .header-actions .el-button {
    flex: 1;
  }

  .content-wrapper {
    padding: 20px;
    border-radius: 12px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .item-row .label {
    min-width: 100px;
    font-size: 13px;
  }

  .item-row .value {
    font-size: 14px;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>