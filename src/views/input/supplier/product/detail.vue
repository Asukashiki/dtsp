<template>
  <div class="supplier-product-detail-page">
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
          <h1 class="page-title">{{ $t('input.supplier.product.detail') }}</h1>
        </div>
      </div>
    </div>

    <!-- 详情内容 -->
    <div class="detail-wrapper" v-loading="loading">
      <div v-if="detail" class="detail-content">
        <div class="detail-section">
          <h3 class="section-title">{{ $t('input.supplier.product.detailSections.basicInfo') }}</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.inputName') }}:</span>
              <span class="value">{{ detail.input_name }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.inputType') }}:</span>
              <span class="value">
                <el-tag v-if="detail.input_type" size="small">
                  {{ $t(`input.supplier.product.inputType.${detail.input_type}`) }}
                </el-tag>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.inputSku') }}:</span>
              <span class="value">{{ detail.input_sku || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.supplierName') }}:</span>
              <span class="value">{{ detail.supplier_name }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.supplierProductCode') }}:</span>
              <span class="value">{{ detail.supplier_product_code || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.supplierProductName') }}:</span>
              <span class="value">{{ detail.supplier_product_name || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.currentPrice') }}:</span>
              <span class="value price">{{ detail.current_price ? formatPrice(detail.current_price) : '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.qualityRating') }}:</span>
              <span class="value">
                <el-tag v-if="detail.quality_rating" :type="getQualityTagType(detail.quality_rating)" size="small">
                  {{ detail.quality_rating }} - {{ $t(`input.supplier.product.qualityRating.${detail.quality_rating}`) }}
                </el-tag>
                <span v-else>-</span>
              </span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('input.supplier.product.form.notes') }}:</span>
              <span class="value">{{ detail.notes || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.createTime') }}:</span>
              <span class="value">{{ detail.create_time || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.updateTime') }}:</span>
              <span class="value">{{ detail.update_time || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="detail-actions">
          <el-button @click="goBack">{{ $t('common.back') }}</el-button>
          <el-button type="primary" @click="handleEdit">{{ $t('common.edit') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getSupplierProductDetail } from '@/api/supplier'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detail = ref(null)

// 返回
const goBack = () => {
  router.back()
}

// 编辑
const handleEdit = () => {
  router.push(`/input/supplier/product/edit/${route.params.id}`)
}

// 格式化价格
const formatPrice = (price) => {
  return `ETB ${parseFloat(price).toFixed(2)}`
}

// 获取质量评级标签类型
const getQualityTagType = (rating) => {
  const typeMap = {
    A: 'success',
    B: 'primary',
    C: 'warning',
    D: 'danger'
  }
  return typeMap[rating] || 'info'
}

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getSupplierProductDetail(route.params.id)
    if (res.code === 200) {
      detail.value = res.data
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.supplier-product-detail-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  padding: 16px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 详情内容 */
.detail-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.detail-section {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
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
  font-weight: 500;
  color: #606266;
  font-size: 14px;
}

.info-item .value {
  color: #303133;
  font-size: 15px;
}

.info-item .price {
  color: #009A44;
  font-weight: 600;
  font-size: 18px;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-center {
    text-align: left;
  }

  .detail-wrapper {
    padding: 16px;
  }

  .detail-section {
    padding: 16px;
  }

  .detail-actions {
    flex-direction: column;
  }

  .detail-actions .el-button {
    width: 100%;
  }
}
</style>
