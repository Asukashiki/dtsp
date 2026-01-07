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
            <h1 class="page-title">{{ t('research.breedingData.plot.auditReviewTitle') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 地块信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-map-pin-line"></i>
              <span>{{ t('research.breedingData.plot.plotInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="Plot ID">
                {{ plotData.plotId }}
              </el-descriptions-item>
              <el-descriptions-item label="Trial ID">
                {{ plotData.trialId }}
              </el-descriptions-item>
              <el-descriptions-item label="Batch ID">
                {{ plotData.batchId }}
              </el-descriptions-item>
              <el-descriptions-item label="Variety Code">
                {{ plotData.varietyCode }}
              </el-descriptions-item>
              <el-descriptions-item label="Replication No">
                {{ plotData.replicationNo }}
              </el-descriptions-item>
              <el-descriptions-item label="Row No">
                {{ plotData.rowNo }}
              </el-descriptions-item>
              <el-descriptions-item label="Column No">
                {{ plotData.columnNo }}
              </el-descriptions-item>
              <el-descriptions-item label="Sowing Date">
                {{ formatDateTime(plotData.sowingTime) }}
              </el-descriptions-item>
              <el-descriptions-item label="Seed Quantity">
                {{ plotData.seedQuantity }} kg
              </el-descriptions-item>
              <el-descriptions-item :label="t('research.breedingData.plot.columns.auditStatus')">
                <el-tag :type="plotData.auditStatus === 'S2' ? 'success' : (plotData.auditStatus === 'S10' ? 'danger' : 'warning')">
                  {{ getStatusLabel(plotData.auditStatus) }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 提交信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-user-line"></i>
              <span>{{ t('research.breedingData.plot.submitInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="t('research.breedingData.plot.columns.createdBy')">
                {{ plotData.createdName }}
              </el-descriptions-item>
              <el-descriptions-item :label="t('research.breedingData.plot.columns.createTime')">
                {{ formatDateTime(plotData.createTime) }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审核信息卡片(如果已审核) -->
        <div v-if="plotData.auditedName" class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-checkbox-circle-line"></i>
              <span>{{ t('research.breedingData.plot.auditInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="t('research.breedingData.plot.columns.auditedBy')">
                {{ plotData.auditedName }}
              </el-descriptions-item>
              <el-descriptions-item :label="t('research.breedingData.plot.columns.auditTime')">
                {{ formatDateTime(plotData.auditTime) }}
              </el-descriptions-item>
              <el-descriptions-item
                v-if="plotData.auditOpinion"
                :label="t('research.breedingData.plot.auditOpinion')"
                :span="2"
              >
                {{ plotData.auditOpinion }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审核操作卡片(仅待审核状态且非只读) -->
        <div v-if="plotData.auditStatus === 'S1' && !isReadonly" class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-edit-line"></i>
              <span>{{ t('research.breedingData.plot.auditAction') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-form ref="auditFormRef" :model="auditForm" label-width="140px">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="t('research.breedingData.plot.auditOpinion')" prop="auditOpinion">
                    <el-input
                      v-model="auditForm.auditOpinion"
                      type="textarea"
                      :rows="4"
                      :placeholder="t('research.breedingData.plot.placeholder.auditOpinion')"
                      maxlength="1000"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <!-- 操作按钮区域（仅审核模式显示） -->
        <div v-if="plotData.auditStatus === 'S1' && !isReadonly" class="form-actions">
          <el-button @click="goBack">
            {{ t('common.back') }}
          </el-button>
          <el-button type="success" @click="handleApprove">
            {{ t('research.breedingData.plot.approve') }}
          </el-button>
          <el-button type="danger" @click="handleReject">
            {{ t('research.breedingData.plot.reject') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPlotInfo, approvePlot, rejectPlot } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { options: dictOptions } = useDict('flow_status')

// 数据
const loading = ref(false)
const auditFormRef = ref()
const plotData = ref({})
const isReadonly = computed(() => route.query.readonly === 'true')

const auditForm = reactive({
  auditOpinion: ''
})

// 统一日期时间格式化
const formatDateTime = (val) => {
  if (!val) return '-'
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return val
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
  }
  const d = new Date(val)
  if (isNaN(d.getTime())) return val || '-'
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`)
  const Y = d.getFullYear()
  const M = pad(d.getMonth() + 1)
  const D = pad(d.getDate())
  const h = pad(d.getHours())
  const m = pad(d.getMinutes())
  const s = pad(d.getSeconds())
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

// 获取状态标签
const getStatusLabel = (status) => {
  const list = (dictOptions.value && dictOptions.value.flow_status) ? dictOptions.value.flow_status : []
  const dict = list.find(d => String(d.value) === String(status))
  return dict ? dict.label : status
}

// 获取地块详情
const getDetail = async () => {
  loading.value = true
  try {
    const res = await getPlotInfo(route.params.plotId)
    plotData.value = res.data || {}
  } catch (error) {
    console.error('获取地块详情失败:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 审核通过
const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(
      t('research.breedingData.plot.approveConfirm'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    loading.value = true
    await approvePlot({ plotId: plotData.value.plotId, auditOpinion: auditForm.auditOpinion })

    ElMessage.success(t('research.breedingData.plot.approveSuccess'))
    router.back()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('审核失败:', error)
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  } finally {
    loading.value = false
  }
}

// 审核退回
const handleReject = async () => {
  if (!auditForm.auditOpinion || !auditForm.auditOpinion.trim()) {
    ElMessage.warning(t('research.breedingData.plot.rejectOpinionRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
      t('research.breedingData.plot.rejectConfirm'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    loading.value = true
    await rejectPlot({ plotId: plotData.value.plotId, auditOpinion: auditForm.auditOpinion })

    ElMessage.success(t('research.breedingData.plot.rejectSuccess'))
    router.back()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('审核失败:', error)
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  } finally {
    loading.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

onMounted(() => {
  getDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
