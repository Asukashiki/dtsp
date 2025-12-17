<template>
  <div class="environment-new-data-form-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">
            {{ isEdit ? $t('research.environmentNewData.edit') : $t('research.environmentNewData.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-position="right"
        label-width="160px"
        class="data-form"
        v-loading="loading"
      >
        <!-- 地块信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('research.environmentNewData.form.plotInfo') || 'Plot Information' }}
          </div>

          <el-form-item :label="$t('research.environmentNewData.form.plotId')" prop="plotId">
            <el-select
              v-model="formData.plotId"
              :placeholder="$t('research.environmentNewData.placeholder.plotId')"
              filterable
              clearable
              style="width: 100%"
              :loading="plotLoading"
              @change="handlePlotChange"
            >
              <el-option
                v-for="item in plotOptions"
                :key="item.plotId"
                :label="item.plotId"
                :value="item.plotId"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('research.environmentNewData.form.batchId')" prop="batchId">
            <el-input
              v-model="formData.batchId"
              :placeholder="$t('research.environmentNewData.placeholder.batchId')"
              disabled
            />
          </el-form-item>

          <el-form-item :label="$t('research.environmentNewData.form.trialId')" prop="trialId">
            <el-input
              v-model="formData.trialId"
              :placeholder="$t('research.environmentNewData.placeholder.trialId')"
              disabled
            />
          </el-form-item>
        </div>

        <!-- 监测站信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-base-station-line"></i>
            {{ $t('research.environmentNewData.form.stationInfo') || 'Station Information' }}
          </div>

          <el-form-item :label="$t('research.environmentNewData.form.stationId')" prop="stationId">
            <el-input
              v-model="formData.stationId"
              :placeholder="$t('research.environmentNewData.placeholder.stationId')"
              maxlength="50"
            />
          </el-form-item>

          <el-form-item :label="$t('research.environmentNewData.form.timestamp')" prop="timestamp">
            <el-date-picker
              v-model="formData.timestamp"
              type="datetime"
              :placeholder="$t('research.environmentNewData.placeholder.timestamp')"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              style="width: 100%"
            />
          </el-form-item>

          <!-- Observer ID (disabled, default to current user id) -->
          <el-form-item :label="$t('research.environmentNewData.form.observerId')">
            <el-input v-model="formData.observerId" disabled />
          </el-form-item>
        </div>

        <!-- 测量信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-dashboard-3-line"></i>
            {{ $t('research.environmentNewData.form.measurementInfo') }}
          </div>

          <el-form-item :label="$t('research.environmentNewData.form.parameterCode')" prop="parameterCode">
            <el-select
              v-model="formData.parameterCode"
              :placeholder="$t('research.environmentNewData.placeholder.parameterCode')"
              style="width: 100%"
            >
              <el-option :label="$t('research.environmentNewData.parameterCode.RAIN_DAILY')" value="RAIN_DAILY" />
              <el-option :label="$t('research.environmentNewData.parameterCode.TMAX')" value="TMAX" />
              <el-option :label="$t('research.environmentNewData.parameterCode.TMIN')" value="TMIN" />
              <el-option :label="$t('research.environmentNewData.parameterCode.HUMIDITY')" value="HUMIDITY" />
              <el-option :label="$t('research.environmentNewData.parameterCode.WIND_SPEED')" value="WIND_SPEED" />
              <el-option :label="$t('research.environmentNewData.parameterCode.SOLAR_RAD')" value="SOLAR_RAD" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('research.environmentNewData.form.value')" prop="value">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.value"
                :placeholder="$t('research.environmentNewData.placeholder.value')"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">{{ formData.unit || '-' }}</span>
            </div>
          </el-form-item>

          <el-form-item :label="$t('research.environmentNewData.form.unit')" prop="unit">
            <el-input
              v-model="formData.unit"
              :placeholder="$t('research.environmentNewData.placeholder.unit')"
              maxlength="20"
            />
          </el-form-item>

          <el-form-item :label="$t('research.environmentNewData.form.source')" prop="source">
            <el-input
              v-model="formData.source"
              :placeholder="$t('research.environmentNewData.placeholder.source')"
              maxlength="100"
            />
          </el-form-item>

          <el-form-item :label="$t('research.environmentNewData.form.remark')" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.environmentNewData.placeholder.remark')"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="handleCancel">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            <i class="ri-save-line"></i>
            {{ $t('common.save') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getEnvironmentNewDataDetail, addEnvironmentNewData, updateEnvironmentNewData } from '@/api/environment-new-data'
import { getPlotInfoList } from '@/api/breedingData'
import { getUserInfo } from '@/utils/auth'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const plotLoading = ref(false)
const plotOptions = ref([])

const isEdit = computed(() => !!route.params.envRecordId)

const formData = reactive({
  envRecordId: '',
  batchId: '',
  trialId: '',
  plotId: '',
  stationId: '',
  timestamp: '',
  parameterCode: '',
  value: null,
  unit: '',
  source: '',
  remark: '',
  observerId: ''
})

const rules = reactive({
  plotId: [
    { required: true, message: t('research.environmentNewData.rules.plotIdRequired') || 'Please select a plot', trigger: 'change' }
  ],
  stationId: [
    { required: true, message: t('research.environmentNewData.rules.stationIdRequired'), trigger: 'blur' },
    { max: 50, message: t('research.environmentNewData.rules.stationIdLength'), trigger: 'blur' }
  ],
  timestamp: [
    { required: true, message: t('research.environmentNewData.rules.timestampRequired'), trigger: 'change' }
  ],
  parameterCode: [
    { required: true, message: t('research.environmentNewData.rules.parameterCodeRequired'), trigger: 'change' }
  ],
  value: [
    { required: true, message: t('research.environmentNewData.rules.valueRequired'), trigger: 'blur' }
  ],
  unit: [
    { required: true, message: t('research.environmentNewData.rules.unitRequired'), trigger: 'blur' },
    { max: 20, message: t('research.environmentNewData.rules.unitLength'), trigger: 'blur' }
  ]
})

// 加载地块选项
const loadPlotOptions = async () => {
  plotLoading.value = true
  try {
    const res = await getPlotInfoList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      plotOptions.value = res.rows || []
    }
  } catch (error) {
    console.error('Failed to load plot options:', error)
  } finally {
    plotLoading.value = false
  }
}

// 地块选择变化时，自动填充批次ID和试验ID
const handlePlotChange = (plotId) => {
  if (!plotId) {
    formData.batchId = ''
    formData.trialId = ''
    return
  }
  const selectedPlot = plotOptions.value.find(item => item.plotId === plotId)
  if (selectedPlot) {
    formData.batchId = selectedPlot.batchId || ''
    formData.trialId = selectedPlot.trialId || ''
  }
}

// 加载详情数据
const loadDetail = async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const res = await getEnvironmentNewDataDetail(route.params.envRecordId)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

// 提交
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    submitting.value = true
    const submitData = { ...formData }

    let res
    if (isEdit.value) {
      res = await updateEnvironmentNewData(submitData)
    } else {
      res = await addEnvironmentNewData(submitData)
    }

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('research.environmentNewData.editSuccess') : t('research.environmentNewData.addSuccess'))
      router.back()
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.failed'))
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadPlotOptions()
  loadDetail()
  // 设置 Observer ID 为当前登录用户（仅新增时，且为空时）
  try {
    const u = getUserInfo()
    if (!isEdit.value && !formData.observerId && u && u.user && u.user.id) {
      formData.observerId = u.user.id
    }
  } catch (e) {
    // ignore
  }
})
</script>

<style scoped>
.environment-new-data-form-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

/* 表单区域 */
.form-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.data-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 表单分节 */
.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

/* 带单位的输入框容器 */
.input-with-unit {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.input-with-unit .el-input-number {
  flex: 1;
}

/* 单位提示 */
.unit-hint {
  color: #6b7280;
  font-size: 14px;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 40px;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.form-actions .el-button {
  min-width: 120px;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .data-form {
    padding: 16px 12px;
    border-radius: 8px;
  }

  .data-form :deep(.el-form-item) {
    margin-bottom: 20px;
  }

  .data-form :deep(.el-form-item__label) {
    text-align: left;
    display: block;
    line-height: 1.5;
    margin-bottom: 8px;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  .data-form :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .form-actions {
    flex-direction: column;
    padding-top: 20px;
  }

  .form-actions .el-button {
    width: 100%;
    min-width: auto;
  }

  .form-actions .el-button:first-child {
    order: 2;
  }

  .form-actions .el-button:last-child {
    order: 1;
  }
}
</style>
