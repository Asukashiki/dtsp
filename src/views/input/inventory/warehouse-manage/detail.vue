<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('input.inventory.warehouseManage.detail') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.warehouseCode')">{{ detailData.warehouse_code || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.warehouseName')">{{ detailData.warehouse_name || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.type')">
                  <el-tag :type="getWarehouseTypeTag(detailData.type)">{{ getWarehouseTypeLabel(detailData.type) }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.storeType')">{{ getLabel(storeTypeOptions, detailData.store_type) }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.orgName')">{{ detailData.org_name || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.adminLevel')">{{ getLabel(adminLevelOptions, detailData.admin_level) }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.parentWarehouseName')">{{ detailData.parent_warehouse_name || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.capacity')">
                  {{ detailData.capacity === null || detailData.capacity === undefined || detailData.capacity === '' ? '-' : detailData.capacity + ' KG' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.location')">{{ detailData.location || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.address')" :span="2">{{ detailData.address || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.authenticationMaterial')" :span="2">
                  <span
                    v-if="detailData.authentication_material"
                    class="file-link"
                    @click="handlePreviewFile(detailData.authentication_material)"
                  >
                    {{ detailData.authentication_material_name || $t('input.inventory.warehouseManage.form.authenticationMaterial') }}
                  </span>
                  <span v-else>-</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.remark')" :span="2">{{ detailData.remark || '-' }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-time-line"></i>
                <span>{{ $t('input.inventory.warehouseManage.systemInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.createPeople')">{{ detailData.create_by || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.createTime')">{{ formatDateTime(detailData.create_time) }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.updatePeople')">{{ detailData.update_by || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.warehouseManage.form.updateTime')">{{ formatDateTime(detailData.update_time) }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getWarehouseManage } from '@/api/warehouseManage'
import { getFilePreviewUrl } from '@/api/file'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { options: dictOptions } = useDict(['warehouse_type'])

const loading = ref(false)
const detailData = ref(null)

const warehouseTypeOptions = computed(() => dictOptions.value.warehouse_type || [])

const storeTypeOptions = [
  { value: 'PHYSICAL', label: 'input.inventory.warehouseManage.storeTypeOptions.physical' },
  { value: 'VIRTUAL', label: 'input.inventory.warehouseManage.storeTypeOptions.virtual' }
]

const adminLevelOptions = [
  { value: 'PROVINCE', label: 'input.inventory.warehouseManage.adminLevelOptions.province' },
  { value: 'CITY', label: 'input.inventory.warehouseManage.adminLevelOptions.city' },
  { value: 'COUNTY', label: 'input.inventory.warehouseManage.adminLevelOptions.county' },
  { value: 'TOWN', label: 'input.inventory.warehouseManage.adminLevelOptions.town' },
  { value: 'VILLAGE', label: 'input.inventory.warehouseManage.adminLevelOptions.village' }
]

const getLabel = (options, value) => {
  const match = options.find(item => item.value === value)
  return match ? t(match.label) : value || '-'
}

const getWarehouseTypeLabel = (value) => {
  const match = warehouseTypeOptions.value.find(item => item.value === value)
  return match ? match.label : value || '-'
}

const getWarehouseTypeTag = value => {
  const match = warehouseTypeOptions.value.find(item => item.value === value)
  return match?.raw?.listClass || 'info'
}

const formatDateTime = value => {
  if (!value) return '-'
  return `${value}`.replace('T', ' ').split('.')[0]
}

const goBack = () => {
  router.back()
}

const handlePreviewFile = async (fileId) => {
  if (!fileId) return

  try {
    const res = await getFilePreviewUrl(fileId)
    const previewUrl = res.code === 200 ? (res.data || res.msg) : ''
    if (previewUrl) {
      window.open(previewUrl, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview authentication material:', error)
    ElMessage.error(t('common.failed'))
  }
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await getWarehouseManage(route.params.id)
    if (res.code === 200) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load warehouse detail:', error)
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

.file-link {
  color: var(--el-color-primary);
  cursor: pointer;
}

.file-link:hover {
  text-decoration: underline;
}
</style>
