<template>
  <div class="quota-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content>
        <span class="page-title">{{ $t('inputCirculation.quotaDetail') }}</span>
      </template>
    </el-page-header>

    <el-card v-loading="loading" class="detail-card">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.year')">
          {{ detailData.year }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.adminOrg')">
          {{ detailData.adminOrg }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.zone')">
          {{ detailData.zone }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.inputType')">
          {{ detailData.inputType }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.totalQuota')">
          {{ detailData.totalQuota }} {{ detailData.unit }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.unit')">
          {{ detailData.unit }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerId')">
          {{ detailData.farmerId || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.farmerName')">
          {{ detailData.farmerName || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.receiveStatus')">
          {{ detailData.receiveStatus || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('common.createTime')">
          {{ detailData.createTime }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('common.createBy')">
          {{ detailData.createBy }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('common.updateTime')">
          {{ detailData.updateTime || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getInputQuotaDetail } from '@/api/inputCirculation'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const detailData = ref({})

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getInputQuotaDetail(route.params.id)
    if (response.code === 200) {
      detailData.value = response.data || {}
    } else {
      ElMessage.error(response.msg || t('common.queryFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
    console.error('Fetch detail error:', error)
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.quota-detail-container {
  padding: 20px;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
}

.detail-card {
  margin-top: 20px;
}
</style>
