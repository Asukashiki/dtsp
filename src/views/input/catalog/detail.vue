<template>
  <div class="input-detail-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('input.catalog.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 详情区域 -->
    <div v-loading="loading" class="detail-wrapper">
      <!-- 无数据兜底 -->
      <div v-if="!loading && !detailData" class="empty-state">
        <i class="ri-inbox-line"></i>
        <p>{{ $t('common.noData') }}</p>
      </div>

      <!-- 有数据时渲染 -->
      <div v-if="loading === false && detailData">
        <!-- 基本信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('input.catalog.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.inputName') }}:</span>
              <span class="value">{{ detailData.inputName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.inputType') }}:</span>
              <el-tag :type="getTypeTag(detailData.type)">
                {{ $t(`input.catalog.type.${detailData.type}`) }}
              </el-tag>
            </div>

            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.agriculturalInputType') }}:</span>
              <span class="value">{{ detailData.agriculturalInputType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.variety') }}:</span>
              <span class="value">{{ detailData.variety || '-' }}</span>
            </div>

            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.inputSku') }}:</span>
              <span class="value">{{ detailData.inputSku || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.inputBizId') }}:</span>
              <span class="value">{{ detailData.inputBizId || '-' }}</span>
            </div>

            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.trademark') }}:</span>
              <span class="value">{{ detailData.trademark || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.specificationModel') }}:</span>
              <span class="value">{{ detailData.specificationModel || '-' }}</span>
            </div>

            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.unit') }}:</span>
              <span class="value">{{ detailData.unit || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.referencePrice') }}:</span>
              <span class="value">{{ detailData.referencePrice || 0 }} Br</span>
            </div>

            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.isImport') }}:</span>
              <el-tag :type="detailData.isImport === 1 ? 'primary' : 'info'">
                {{ detailData.isImport === 1 ? $t('input.catalog.isImport.yes') : $t('input.catalog.isImport.no') }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.status') }}:</span>
              <el-tag :type="detailData.status === 'active' ? 'success' : 'info'">
                {{ $t(`input.catalog.statusOptions.${detailData.status}`) }}
              </el-tag>
            </div>

            <div class="detail-item full-width">
              <span class="label">{{ $t('input.catalog.form.description') }}:</span>
              <span class="value text-block">{{ detailData.description || '-' }}</span>
            </div>

            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.createTime') }}:</span>
              <span class="value">{{ detailData.createTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.createPeople') }}:</span>
              <span class="value">{{ detailData.createPeople || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 法规与许可信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('input.catalog.form.regulatoryInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.registerCode') }}:</span>
              <span class="value">{{ detailData.registerCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.productionLicense') }}:</span>
              <span class="value">{{ detailData.productionLicense || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.productionStandard') }}:</span>
              <span class="value">{{ detailData.productionStandard || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 生产与责任信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-building-line"></i>
            {{ $t('input.catalog.form.productionInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.catalog.form.producerName') }}:</span>
              <span class="value">{{ detailData.producerName || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.catalog.form.producerAddress') }}:</span>
              <span class="value">{{ detailData.producerAddress || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 农药特性信息 -->
        <div v-if="detailData.type === 'pesticide'" class="detail-section">
          <div class="section-title">
            <i class="ri-flask-line"></i>
            {{ $t('input.catalog.pesticide.title') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.catalog.pesticide.cropControlObject') }}:</span>
              <span class="value text-block">{{ detailData.cropControlObject || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 种子特性信息 -->
        <div v-if="detailData.type === 'seed'" class="detail-section">
          <div class="section-title">
            <i class="ri-seedling-line"></i>
            {{ $t('input.catalog.seed.title') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.seed.breeder') }}:</span>
              <span class="value">{{ detailData.breeder || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.catalog.seed.varietySource') }}:</span>
              <span class="value">{{ detailData.varietySource || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 化肥特性信息 -->
        <div v-if="detailData.type === 'fertilizer'" class="detail-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('input.catalog.fertilizer.title') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item full-width text-center text-gray-500">
              {{ $t('input.catalog.fertilizer.emptyTip') }}
            </div>
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
import { getInputDetail } from '@/api/input'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

// 获取类型标签颜色
const getTypeTag = (type) => {
  const typeMap = {
    pesticide: 'danger',
    fertilizer: 'warning',
    seed: 'success',
    other: ''
  }
  return typeMap[type] || ''
}

// 加载详情数据
const loadDetail = async () => {
  const id = Number(route.params.id)
  if (isNaN(id) || id <= 0) {
    ElMessage.error(t('common.invalidId'))
    goBack()
    return
  }

  loading.value = true
  try {
    const res = await getInputDetail(id)
    if (res && res.code === 200 && res.data) {
      detailData.value = res.data
    } else {
      ElMessage.error(res?.msg || t('input.catalog.noDataFound'))
      detailData.value = null
    }
  } catch (error) {
    console.error('加载详情失败：', error)
    ElMessage.error(t('common.failed') + '：' + (error.message || ''))
    detailData.value = null
  } finally {
    loading.value = false
  }
}

// 编辑
const handleEdit = () => {
  const id = Number(route.params.id)
  if (id && id > 0) {
    router.push(`/input/catalog/edit/${id}`)
  } else {
    ElMessage.error(t('input.catalog.invalidIdEdit'))
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.input-detail-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

/* 详情区域 */
.detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* 无数据状态 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #909399;
}
.empty-state i {
  font-size: 64px;
  margin-bottom: 16px;
  display: block;
}
.empty-state p {
  font-size: 16px;
  margin: 0;
}

/* 详情分节 */
.detail-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

/* 详情网格 */
.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item .label {
  font-weight: 500;
  color: #6b7280;
  min-width: 140px;
  flex-shrink: 0;
}

.detail-item .value {
  color: #1f2937;
  flex: 1;
}

.detail-item .value.text-block {
  white-space: pre-wrap;
  line-height: 1.6;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .detail-section {
    padding: 20px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
    flex-wrap: wrap;
  }

  .header-left,
  .header-center,
  .header-right {
    flex: auto;
  }

  .header-left {
    order: 1;
  }

  .header-center {
    order: 2;
    width: 100%;
    margin-top: 8px;
    text-align: left;
  }

  .header-right {
    order: 3;
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 50;
  }

  .header-right .el-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border: none;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-right .el-button i {
    font-size: 24px;
    margin-right: 0;
  }

  .header-right .el-button span {
    display: none;
  }

  .header-left .el-button {
    font-size: 14px;
  }

  .page-title {
    font-size: 16px;
  }

  .detail-section {
    padding: 16px 12px;
    margin-bottom: 12px;
    border-radius: 8px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  /* 单列布局 */
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .detail-item.full-width {
    grid-column: 1;
  }

  .detail-item {
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    background: rgba(0, 154, 68, 0.02);
    border-radius: 8px;
    border-left: 3px solid #009A44;
  }

  .detail-item .label {
    min-width: auto;
    font-size: 13px;
    color: #009A44;
    font-weight: 600;
  }

  .detail-item .value {
    font-size: 14px;
    color: #303133;
  }

  .detail-item .value.text-block {
    font-size: 13px;
    line-height: 1.6;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
  }

  .header-content {
    padding: 10px 8px;
  }

  .page-title {
    font-size: 15px;
  }

  .header-right .el-button {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }

  .header-right .el-button i {
    font-size: 20px;
  }

  .detail-section {
    padding: 12px 8px;
    margin-bottom: 8px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .detail-grid {
    gap: 12px;
  }

  .detail-item {
    padding: 10px;
  }

  .detail-item .label {
    font-size: 12px;
  }

  .detail-item .value {
    font-size: 13px;
  }

  .detail-item .value.text-block {
    font-size: 12px;
  }
}
</style>