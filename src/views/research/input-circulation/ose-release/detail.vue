<template>
  <div class="ose-release-detail-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content><span>{{ $t('inputCirculation.releaseDetail') }}</span></template>
    </el-page-header>

    <el-card v-loading="loading" class="detail-card">
      <h3>{{ $t('inputCirculation.basicInfo') }}</h3>
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('inputCirculation.releaseId')">{{ detailData.main?.releaseId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.releaseName')">{{ detailData.main?.releaseName }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.targetId')">{{ detailData.main?.targetId }}</el-descriptions-item>
        <el-descriptions-item :label="$t('inputCirculation.targetContact')">{{ detailData.main?.targetContact }}</el-descriptions-item>
<!--        <el-descriptions-item :label="$t('inputCirculation.targetPhone')">{{ detailData.main?.targetPhone }}</el-descriptions-item>-->
        <el-descriptions-item :label="$t('inputCirculation.releaseDate')">{{ detailData.main?.releaseDate }}</el-descriptions-item>
<!--        <el-descriptions-item :label="$t('inputCirculation.releaseBy')">{{ detailData.main?.releaseBy }}</el-descriptions-item>-->
        <el-descriptions-item :label="$t('inputCirculation.auditBy')">{{ detailData.main?.auditBy }}</el-descriptions-item>
<!--        <el-descriptions-item :label="$t('inputCirculation.releaseOrg')">{{ detailData.main?.releaseOrg }}</el-descriptions-item>-->
      </el-descriptions>

      <h3 style="margin-top: 24px">{{ $t('inputCirculation.detailInfo') }}</h3>
      <el-table :data="detailData.details" border>
        <el-table-column type="index" width="50" />
        <el-table-column prop="cropType" :label="$t('inputCirculation.cropType')" />
        <el-table-column prop="variety" :label="$t('inputCirculation.variety')" />
        <el-table-column prop="inputName" :label="$t('inputCirculation.inputId')" />
        <el-table-column prop="required" :label="$t('inputCirculation.required')" />
        <el-table-column prop="quantity" :label="$t('inputCirculation.quantity')" />
        <el-table-column prop="unit" :label="$t('inputCirculation.unit')" />
        <el-table-column prop="unitPrice" :label="$t('inputCirculation.unitPrice')" />
<!--        <el-table-column prop="releaseTime" :label="$t('inputCirculation.releaseTime')" />-->
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOseReleaseDetail } from '@/api/inputCirculation'
import {getInputDetail} from "../../../../api/input.js";

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({ main: {}, details: [] })

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getOseReleaseDetail(route.params.id)
    if (response.code === 200) {
      detailData.value = response.data || { main: {}, details: [] }
      // 为每个detail项添加inputName属性
      const details = detailData.value.details
      for (let i = 0; i < details.length; i++) {
        let detail = details[i]
        if (detail.inputId) {
          const inputInfo = await getInputInfo(detail.inputId)
          console.log('inputInfo:', inputInfo)
          if (inputInfo) {
            detail.inputName = inputInfo.input_name || detail.inputId
          }
        }
      }
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const getInputInfo = async (id) => {
  try {
    const response = await getInputDetail(id)
    if (response.code === 200 && response.data) {
      return response.data
    }
  } catch (error) {
    console.error('获取input信息失败:', error)
  }
}

const handleBack = () => router.back()
onMounted(() => fetchDetail())
</script>

<style scoped>
.ose-release-detail-container { padding: 20px; }
.detail-card { margin-top: 20px; }
</style>
