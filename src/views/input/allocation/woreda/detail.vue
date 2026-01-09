<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('allocation.woredaAllocationDetail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 业务状态信息 -->
        <WorkflowInfo
          v-if="detailData.main?.workflowStatus"
          :status="detailData.main.workflowStatus"
          :audit-time="detailData.main.auditTime"
          :audit-user="detailData.main.auditUser"
          :audit-opinion="detailData.main.auditOpinion" />

        <!-- 基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('allocation.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('allocation.allocationName')">
                {{ detailData.main?.allocationName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('allocation.year')">
                <el-tag effect="plain">{{ detailData.main?.year }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('allocation.woreda')">
                {{ detailData.main?.zoneName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('common.createTime')">
                {{ detailData.main?.createTime }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 需求区域 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-survey-line"></i>
              <span>{{ $t('allocation.demand') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-table :data="detailData.demandList" border stripe>
              <el-table-column :label="$t('allocation.inputType')" min-width="150">
                <template #default="{ row }">
                  {{ getLabelByValue('input_type', row.inputType) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('allocation.inputCategory')" min-width="150">
                <template #default="{ row }">
                  {{ getLabelByValue('input_category', row.inputCategory) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('allocation.totalQuantity')" prop="totalQuantity" min-width="120" />
            </el-table>
          </div>
        </div>

        <!-- 配额区域 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-pie-chart-line"></i>
              <span>{{ $t('allocation.quota') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-table :data="detailData.quotaList" border stripe>
              <el-table-column :label="$t('allocation.inputType')" min-width="150">
                <template #default="{ row }">
                  {{ getLabelByValue('input_type', row.inputType) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('allocation.inputCategory')" min-width="150">
                <template #default="{ row }">
                  {{ getLabelByValue('input_category', row.inputCategory) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('allocation.totalQuantity')" prop="totalQuantity" min-width="120" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getWoredaAllocationDetail } from '@/api/allocation'
import { useDict } from '@/hooks/useDict'
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'

const { getLabelByValue } = useDict(['input_type', 'input_category'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const detailData = ref({ main: {}, demandList: [], quotaList: [] })

// 获取详情数据
const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getWoredaAllocationDetail(route.params.id)
    if (response.code === 200 && response.data) {
      detailData.value = response.data || { main: {}, demandList: [], quotaList: [] }
    } else {
      ElMessage.error(response.msg || t('common.queryFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>