<template>
  <div class="union-receive-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.receiveDetail') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="detail-card">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.releaseId')">{{ detailData.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseName')">{{ detailData.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.targetId')">{{ detailData.targetId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.targetPhone')">{{ detailData.targetPhone }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">{{ detailData.releaseOrg }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseDate')">{{ detailData.releaseDate }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.receiveStatus')">{{ detailData.receiveStatus }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmBy')">{{ detailData.confirmBy || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmOrg')">{{ detailData.confirmOrg || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmTime')">{{ detailData.confirmTime || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getWoredaReceiveDetail } from '@/api/inputCirculation'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getWoredaReceiveDetail(route.params.id)
    if (response.code === 200) {
      // 后端返回的数据结构：{ main: {...}, details: [...] }
      detailData.value = response.data?.main || {}
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const handleBack = () => router.back()
onMounted(() => fetchDetail())
</script>

<style scoped>
.union-receive-detail-container { padding: 20px; }
.detail-card { margin-top: 20px; }
</style>
