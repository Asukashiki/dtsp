<template>
  <div class="union-receive-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.receiveDetail') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="main-card">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.releaseId')">{{ mainData.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseName')">{{ mainData.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseBy')">{{ mainData.releaseBy }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.targetPhone')">{{ mainData.targetPhone }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">{{ mainData.releaseOrg }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseDate')">{{ mainData.releaseDate }}</el-descriptions-item>

        <el-descriptions-item :label="$t('inputCirculation.receiveId')">{{ mainData.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.receiveName')">{{ mainData.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.status')">{{ mainData.receiveStatus }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmBy')">{{ mainData.confirmBy || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmOrg')">{{ mainData.confirmOrg || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.confirmTime')">{{ mainData.confirmTime || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card v-loading="loading" class="main-card">
      <el-table :data="detailData" border style="margin-top: 16px">
        <el-table-column :label="$t('inputCirculation.type')" width="240">
          <template #default="scope">
          {{ scope.row.variety }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('inputCirculation.agriculturalInputType')" width="240">
          <template #default="scope">
           {{ scope.row.cropType }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('inputCirculation.quantity')" width="240">
          <template #default="scope">
            {{ scope.row.quantity }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('inputCirculation.unit')" width="150">
          <template #default="scope">
            {{ scope.row.unit }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('inputCirculation.unitPrice')" width="240">
          <template #default="scope">
            {{ scope.row.unitPrice }}
          </template>
        </el-table-column>
      </el-table>
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
const mainData = ref({})
const detailData = ref([])

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getWoredaReceiveDetail(route.params.id)
    if (response.code === 200) {
      // 后端返回的数据结构：{ main: {...}, details: [...] }
      mainData.value = response.data?.main || {}
      detailData.value = response.data?.details || []
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
.main-card { margin-top: 20px; }
</style>
