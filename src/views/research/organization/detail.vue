<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.organization.detail') }}</h1>
          </div>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i> {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-building-line"></i><span>{{ $t('research.organization.basicInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.organization.orgCode')">{{ detailData.orgCode }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.organization.orgName')">{{ detailData.orgName }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.organization.orgCategory')">
                  <el-tag size="small">{{ getCategoryLabel(detailData.orgCategory) }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.organization.status')">
                  <el-tag :type="detailData.status === '0' ? 'success' : 'danger'" size="small">
                    {{ detailData.status === '0' ? $t('common.normal') : $t('common.disabled') }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.organization.region')">{{ detailData.region || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.organization.location')">{{ detailData.location || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.organization.contactPerson')">{{ detailData.contactPerson || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('research.organization.phoneNumber')">{{ detailData.phoneNumber || '-' }}</el-descriptions-item>
                <el-descriptions-item :label="$t('common.remarks')" :span="2">{{ detailData.remark || '-' }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOrganization } from '@/api/organization'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const { getLabelByValue } = useDict(['org_category'])

const loading = ref(false)
const detailData = ref(null)

const getCategoryLabel = (val) => getLabelByValue('org_category', val)

onMounted(async () => {
  loading.value = true
  try {
    const res = await getOrganization(route.params.id)
    if (res.code === 200 && res.data) detailData.value = res.data
  } catch (e) {
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
})

const handleEdit = () => router.push(`/research/organization/edit/${route.params.id}`)
const goBack = () => router.back()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
