<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('input.inventory.productManage.detail') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <div class="info-card">
            <div class="card-header"><div class="card-title"><i class="ri-information-line"></i><span>{{ $t('input.catalog.form.basicInfo') }}</span></div></div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.productCode')">{{ detailData.product_code || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.productName')">{{ detailData.product_name || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.categoryName')">{{ detailData.category_name || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.mainCategory')"><el-tag :type="getMainCategoryTag(detailData.main_category)">{{ getLabel(mainCategoryOptions, detailData.main_category) }}</el-tag></el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.subCategory')">{{ detailData.sub_category || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.brand')">{{ detailData.brand || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.model')">{{ detailData.model || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.unit')">{{ detailData.unit || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.price')">{{ formatPrice(detailData.price) }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.licenseNo')">{{ detailData.license_no || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.status')"><el-tag :type="detailData.status === '0' ? 'success' : 'info'">{{ detailData.status === '0' ? $t('input.inventory.productManage.status.enabled') : $t('input.inventory.productManage.status.disabled') }}</el-tag></el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.remark')" :span="2">{{ detailData.remark || '-' }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header"><div class="card-title"><i class="ri-time-line"></i><span>{{ $t('input.inventory.productManage.systemInfo') }}</span></div></div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.createPeople')">{{ detailData.create_by || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.createTime')">{{ formatDateTime(detailData.create_time) }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.updatePeople')">{{ detailData.update_by || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.productManage.form.updateTime')">{{ formatDateTime(detailData.update_time) }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getProductManage } from '@/api/productManage'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

const mainCategoryOptions = [
  { value: 'FERTILIZER', label: 'input.inventory.productManage.mainCategoryOptions.fertilizer' },
  { value: 'SEED', label: 'input.inventory.productManage.mainCategoryOptions.seed' },
  { value: 'AGRICULTURAL_PRODUCT', label: 'input.inventory.productManage.mainCategoryOptions.agriculturalProduct' },
  { value: 'PESTICIDE', label: 'input.inventory.productManage.mainCategoryOptions.pesticide' },
  { value: 'OTHER', label: 'input.inventory.productManage.mainCategoryOptions.other' }
]

const getLabel = (options, value) => {
  const match = options.find(item => item.value === value)
  return match ? t(match.label) : value || '-'
}

const getMainCategoryTag = value => {
  if (value === 'SEED') return 'success'
  if (value === 'FERTILIZER') return 'warning'
  if (value === 'PESTICIDE') return 'danger'
  if (value === 'AGRICULTURAL_PRODUCT') return 'info'
  return ''
}

const formatPrice = value => {
  if (value === null || value === undefined || value === '') return '-'
  return Number(value).toFixed(2)
}

const formatDateTime = value => {
  if (!value) return '-'
  return `${value}`.replace('T', ' ').split('.')[0]
}

const goBack = () => {
  router.back()
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await getProductManage(route.params.id)
    if (res.code === 200) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load product detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
