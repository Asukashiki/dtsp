<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-file-text-line" :title="$t('research.breeding.seed.ose.detail')" shadow show-back
        @back="handleBack" />

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <InfoCard :title="$t('research.breeding.seed.ose.form.basicInfo')" icon="ri-information-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.breeding.seed.ose.columns.oseCode')">
              <span class="highlight-text">{{ detailData.oseCode || '-' }}</span>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.ose.columns.oseName')">
              {{ detailData.oseName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.ose.columns.regionName')">
              {{ detailData.regionName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.ose.columns.oseStatus')">
              <el-tag :type="detailData.oseStatus === 'ENABLED' ? 'success' : 'info'" size="small">
                {{ detailData.oseStatus ? $t(`research.breeding.seed.ose.status.${detailData.oseStatus}`) : '-' }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.ose.columns.location')" :span="2">
              {{ detailData.location || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 联系信息 -->
        <InfoCard :title="$t('research.breeding.seed.ose.form.contactInfo')" icon="ri-contacts-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.breeding.seed.ose.columns.contactName')">
              {{ detailData.contactName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breeding.seed.ose.columns.contactNumber')">
              {{ detailData.contactNumber ? '+' + detailData.contactNumber : '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 系统信息 -->
        <InfoCard :title="$t('common.systemInfo')" icon="ri-time-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('common.createTime')">
              {{ detailData.createTime || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('common.updateTime')">
              {{ detailData.updateTime || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <div class="form-actions">
          <el-button @click="handleBack">{{ $t('common.back') }}</el-button>
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
import { getOseDetail } from '@/api/breedSeed'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref({})

const loadDetail = async () => {
  const id = route.params.id
  if (!id) return
  loading.value = true
  try {
    const res = await getOseDetail(id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load OSE detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.highlight-text {
  color: #009A44;
  font-weight: 600;
}
</style>
