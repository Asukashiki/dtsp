<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('input.catalog.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading || dictLoading">
      <!-- 无数据兜底 -->
      <div v-if="!loading && !dictLoading && !detailData" class="empty-state">
        <i class="ri-inbox-line"></i>
        <p>{{ $t('common.noData') }}</p>
      </div>

        <!-- 有数据时渲染 -->
        <div v-if="!loading && !dictLoading && detailData">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.catalog.form.inputName')">
                  {{ detailData.inputName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.inputType')">
                  <el-tag :type="getTypeTagType">
                    {{ getTypeLabel }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.agriculturalInputType')">
                  {{ getAgriculturalInputTypeLabel }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.inputSku')">
                  {{ detailData.inputSku || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.inputBizId')">
                  {{ detailData.inputBizId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.trademark')">
                  {{ detailData.trademark || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.specificationModel')">
                  {{ detailData.specificationModel || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.unit')">
                  {{ detailData.unit || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.referencePrice')">
                  {{ detailData.referencePrice || 0 }} Br
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.isImport')">
                  <el-tag :type="detailData.isImport === 1 ? 'primary' : 'info'">
                    {{ detailData.isImport === 1 ? $t('input.catalog.isImport.yes') : $t('input.catalog.isImport.no') }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.status')">
                  <el-tag :type="detailData.status === 'active' ? 'success' : 'info'">
                    {{ $t(`input.catalog.statusOptions.${detailData.status}`) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.description')" :span="2">
                  {{ detailData.description || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.createTime')">
                  {{ detailData.createTime || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.createPeople')">
                  {{ detailData.createPeople || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 法规与许可信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-shield-check-line"></i>
                <span>{{ $t('input.catalog.form.regulatoryInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.catalog.form.registerCode')">
                  {{ detailData.registerCode || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.productionLicense')">
                  {{ detailData.productionLicense || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.productionStandard')">
                  {{ detailData.productionStandard || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 生产与责任信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('input.catalog.form.productionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.catalog.form.producerName')" :span="2">
                  {{ detailData.producerName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.form.producerAddress')" :span="2">
                  {{ detailData.producerAddress || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 种子特性信息（IN01=种子） -->
          <div v-if="detailData.type === 'IN01'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ $t('input.catalog.seed.title') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.catalog.seed.breeder')">
                  {{ detailData.breeder || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.catalog.seed.varietySource')" :span="2">
                  {{ detailData.varietySource || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 化肥特性信息（IN02=化肥） -->
          <div v-if="detailData.type === 'IN02'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-plant-line"></i>
                <span>{{ $t('input.catalog.fertilizer.title') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="text-center text-gray-500">
                {{ $t('input.catalog.fertilizer.emptyTip') }}
              </div>
            </div>
          </div>

          <!-- 其他类型信息（IN09=其他） -->
          <div v-if="detailData.type === 'IN09'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-more-line"></i>
                <span>{{ $t('input.catalog.other.title') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="text-center text-gray-500">
                {{ $t('input.catalog.other.emptyTip') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getInputDetail } from '@/api/input'
import { useDict, clearDictCache } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

// 清除字典缓存并初始化
clearDictCache('input_type')
clearDictCache('input_category')

const {
  options,
  loading: dictLoading,
  refresh: refreshDict
} = useDict([
  'input_type',
  'input_category'
], {
  immediate: true,
  cache: true
})

// 根据type值获取对应的字典标签文本
const getTypeLabel = computed(() => {
  if (!detailData.value || !options.value.input_type) return '-'
  const typeItem = options.value.input_type.find(item => item.value === detailData.value.type)
  return typeItem ? typeItem.label : '-'
})

// 获取类型标签颜色（适配新的type值 IN01/IN02/IN09）
const getTypeTagType = computed(() => {
  if (!detailData.value) return ''
  const typeMap = {
    IN01: 'success', // 种子
    IN02: 'warning', // 化肥
    IN09: ''         // 其他
  }
  return typeMap[detailData.value.type] || ''
})

// 根据agriculturalInputType值获取对应的字典标签文本
const getAgriculturalInputTypeLabel = computed(() => {
  if (!detailData.value || !detailData.value.agriculturalInputType || !options.value.input_category) return '-'
  const categoryItem = options.value.input_category.find(item => item.value === detailData.value.agriculturalInputType)
  return categoryItem ? categoryItem.label : '-'
})

// 加载详情数据
const loadDetail = async () => {
  const id = Number(route.params.id)
  if (isNaN(id) || id <= 0) {
    ElMessage.error(t('common.invalidId'))
    goBack()
    return
  }

  // 先刷新字典，确保字典数据加载完成
  await refreshDict()

  loading.value = true
  try {
    const res = await getInputDetail(id)
    if (res && res.code === 200 && res.data) {
      detailData.value = res.data
      // 适配旧的type值映射（与录入页保持一致）
      if (detailData.value.type === 'seed') detailData.value.type = 'IN01'
      if (detailData.value.type === 'fertilizer') detailData.value.type = 'IN02'
      if (detailData.value.type === 'other') detailData.value.type = 'IN09'
      // 农药类型已移除，置空处理
      if (detailData.value.type === 'pesticide') detailData.value.type = ''
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

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.text-gray-500 {
  color: #909399;
}
</style>
