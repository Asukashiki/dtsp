<template>
  <div class="yield-data-form-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">
            {{ isEdit ? $t('research.dataCollection.yieldData.edit') : $t('research.dataCollection.yieldData.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form
        ref="formRef"
        v-loading="loading"
        :model="formData"
        :rules="rules"
        label-position="right"
        label-width="200px"
        class="yield-form"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.dataCollection.yieldData.form.basicInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.batchId')" prop="batchId">
            <el-input
              v-model="formData.batchId"
              :placeholder="$t('research.dataCollection.yieldData.placeholder.batchId')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.trialId')" prop="trialId">
            <el-input
              v-model="formData.trialId"
              :placeholder="$t('research.dataCollection.yieldData.placeholder.trialId')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.harvestDate')" prop="harvestDate">
            <el-date-picker
              v-model="formData.harvestDate"
              type="date"
              :placeholder="$t('research.dataCollection.yieldData.placeholder.harvestDate')"
              style="width: 100%"
            />
          </el-form-item>
        </div>

        <!-- 地块信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('research.dataCollection.yieldData.form.plotInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.plotId')" prop="plotId">
            <el-input
              v-model="formData.plotId"
              :placeholder="$t('research.dataCollection.yieldData.placeholder.plotId')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.plotAreaM2')" prop="plotAreaM2">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.plotAreaM2"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.plotAreaM2')"
                :min="0"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">m²</span>
            </div>
          </el-form-item>
        </div>

        <!-- 产量信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-bar-chart-box-line"></i>
            {{ $t('research.dataCollection.yieldData.form.yieldInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.grainWeightKg')" prop="grainWeightKg">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.grainWeightKg"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.grainWeightKg')"
                :min="0"
                :precision="3"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">kg</span>
            </div>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.yieldQtPerHa')" prop="yieldQtPerHa">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.yieldQtPerHa"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.yieldQtPerHa')"
                :min="0"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">qt/ha</span>
            </div>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.moistureContent')">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.moistureContent"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.moistureContent')"
                :min="0"
                :max="100"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">%</span>
            </div>
          </el-form-item>
        </div>

        <!-- 操作信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.dataCollection.yieldData.form.operatorInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.recorderName')">
            <el-input
              v-model="formData.recorderName"
              :placeholder="$t('research.dataCollection.yieldData.placeholder.recorderName')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.yieldData.form.remark')">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.dataCollection.yieldData.placeholder.remark')"
            />
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button type="primary" @click="handleSubmit">
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
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getYieldDataDetail, addYieldData, updateYieldData } from '@/api/yieldData'
import { useUserStore } from '@/store'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)

const formData = reactive({
  id: null,
  batchId: '',
  trialId: '',
  plotId: '',
  plotAreaM2: null,
  grainWeightKg: null,
  yieldQtPerHa: null,
  moistureContent: null,
  harvestDate: '',
  recorderName: '',
  remark: '',
  status: '0',
  createdBy: ''
})

const rules = computed(() => ({
  batchId: [
    { required: true, message: t('research.dataCollection.yieldData.rules.batchIdRequired'), trigger: 'blur' }
  ],
  trialId: [
    { required: true, message: t('research.dataCollection.yieldData.rules.trialIdRequired'), trigger: 'blur' }
  ],
  harvestDate: [
    { required: true, message: t('research.dataCollection.yieldData.rules.harvestDateRequired'), trigger: 'change' }
  ],
  plotId: [
    { required: true, message: t('research.dataCollection.yieldData.rules.plotIdRequired'), trigger: 'blur' }
  ],
  plotAreaM2: [
    { required: true, message: t('research.dataCollection.yieldData.rules.plotAreaM2Required'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('research.dataCollection.yieldData.rules.plotAreaM2Min'), trigger: 'blur' }
  ],
  grainWeightKg: [
    { required: true, message: t('research.dataCollection.yieldData.rules.grainWeightKgRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('research.dataCollection.yieldData.rules.grainWeightKgMin'), trigger: 'blur' }
  ],
  yieldQtPerHa: [
    { required: true, message: t('research.dataCollection.yieldData.rules.yieldQtPerHaRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('research.dataCollection.yieldData.rules.yieldQtPerHaMin'), trigger: 'blur' }
  ]
}))

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getYieldDataDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      // 获取用户信息并设置 createdBy
      const userInfo = userStore.userInfo
      if (!isEdit.value) {
        // 新增时设置创建人,优先使用 userId,其次 username,最后使用 loginName
        formData.createdBy = userInfo.userId || userInfo.username || userInfo.loginName || 'system'
      }

      const apiFunc = isEdit.value ? updateYieldData : addYieldData
      const res = await apiFunc(formData)
      if (res.code === 200) {
        ElMessage.success(t(isEdit.value ? 'research.dataCollection.yieldData.editSuccess' : 'research.dataCollection.yieldData.addSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.operationFailed'))
    } finally {
      loading.value = false
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.yield-data-form-container {
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

.yield-form {
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

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .yield-form {
    padding: 20px 16px;
  }
}

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

  .yield-form {
    padding: 16px 12px;
    border-radius: 8px;
  }

  .yield-form :deep(.el-form-item) {
    margin-bottom: 20px;
  }

  .yield-form :deep(.el-form-item__label) {
    text-align: left;
    display: block;
    line-height: 1.5;
    margin-bottom: 8px;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  .yield-form :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  .unit-hint {
    font-size: 13px;
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

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
  }

  .header-content {
    padding: 10px 8px;
  }

  .page-title {
    font-size: 15px;
  }

  .yield-form {
    padding: 12px 8px;
  }

  .yield-form :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  .yield-form :deep(.el-form-item__label) {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .unit-hint {
    font-size: 12px;
  }
}
</style>
