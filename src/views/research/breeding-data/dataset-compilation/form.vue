<template>
  <div class="dataset-form-container">
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
                        {{ isEdit ? $t('research.datasetCompilation.edit') : $t('research.datasetCompilation.add') }}
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
        class="dataset-form"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.datasetCompilation.form.basicInfo') }}
          </div>

          <el-form-item :label="$t('research.datasetCompilation.form.batchId')" prop="batchId">
            <el-input
              v-model="formData.batchId"
              :placeholder="$t('research.datasetCompilation.placeholder.batchId')"
              :disabled="!isEditable"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.datasetCompilation.form.batchName')" prop="batchName">
            <el-input
              v-model="formData.batchName"
              :placeholder="$t('research.datasetCompilation.placeholder.batchName')"
              :disabled="!isEditable"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.datasetCompilation.form.cropType')" prop="cropType">
            <el-input
              v-model="formData.cropType"
              :placeholder="$t('research.datasetCompilation.placeholder.cropType')"
              :disabled="!isEditable"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.datasetCompilation.form.varietyName')" prop="varietyName">
            <el-input
              v-model="formData.varietyName"
              :placeholder="$t('research.datasetCompilation.placeholder.varietyName')"
              :disabled="!isEditable"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.datasetCompilation.form.remark')" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.datasetCompilation.placeholder.remark')"
              :disabled="!isEditable"
            />
          </el-form-item>
        </div>

        <!-- 数据统计 -->
        <div v-if="isEdit" class="form-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
                        {{ $t('research.datasetCompilation.form.statisticsInfo') }}
          </div>

          <div class="statistics-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-flask-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.trialCount') }}</div>
                <div class="stat-value">{{ formData.trialCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-plant-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.fieldDataCount') }}</div>
                <div class="stat-value">{{ formData.fieldDataCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-temp-hot-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.envDataCount') }}</div>
                <div class="stat-value">{{ formData.envDataCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-test-tube-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.labTestCount') }}</div>
                <div class="stat-value">{{ formData.labTestCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-bar-chart-box-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.yieldDataCount') }}</div>
                <div class="stat-value">{{ formData.yieldDataCount || 0 }}</div>
              </div>
            </div>
          </div>

          <!-- 提交提示 -->
          <el-alert
            v-if="formData.datasetStatus === 'draft'"
            :title="$t('research.datasetCompilation.message.submitRequirement')"
            type="info"
            :closable="false"
            show-icon
            style="margin-top: 16px"
          />
        </div>

        <!-- 状态提示 -->
        <div v-if="isEdit && !isEditable" class="form-section">
          <el-alert
            :title="$t('research.datasetCompilation.message.cannotEditApproved')"
            type="warning"
            :closable="false"
            show-icon
          />
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button v-if="isEditable" type="primary" @click="handleSubmit">
            <i class="ri-save-line"></i>
            {{ isEdit ? $t('common.save') : $t('common.add') }}
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
import { getDatasetById, addDataset, updateDataset } from '@/api/dataset'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)

const formData = reactive({
  id: '',
  batchId: '',
  batchName: '',
  cropType: '',
  varietyName: '',
  remark: '',
  datasetStatus: 'draft',
  trialCount: 0,
  fieldDataCount: 0,
  envDataCount: 0,
  labTestCount: 0,
  yieldDataCount: 0
})

// 判断是否可编辑：新增、草稿或已退回状态可编辑，审核通过不可编辑
const isEditable = computed(() => {
  if (!isEdit.value) return true
  return formData.datasetStatus === 'draft' || formData.datasetStatus === 'rejected'
})

const rules = computed(() => ({
  batchId: [
    { required: true, message: t('research.datasetCompilation.rules.batchIdRequired'), trigger: 'blur' }
  ],
  batchName: [
    { required: true, message: t('research.datasetCompilation.rules.batchNameRequired'), trigger: 'blur' }
  ],
  cropType: [
    { required: true, message: t('research.datasetCompilation.rules.cropTypeRequired'), trigger: 'blur' }
  ],
  varietyName: [
    { required: true, message: t('research.datasetCompilation.rules.varietyNameRequired'), trigger: 'blur' }
  ]
}))

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getDatasetById(route.params.id)
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
      const apiFunc = isEdit.value ? updateDataset : addDataset
      const submitData = isEdit.value ? { id: formData.id, ...formData } : formData
      const res = await apiFunc(submitData)
      if (res.code === 200) {
        ElMessage.success(t(isEdit.value ? 'common.updateSuccess' : 'common.addSuccess'))
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
.dataset-form-container {
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

.dataset-form {
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

/* 统计卡片网格 */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.stat-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #86efac;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 24px;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #009A44;
  line-height: 1;
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

  .dataset-form {
    padding: 20px 16px;
  }

  .statistics-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

  .dataset-form {
    padding: 16px 12px;
    border-radius: 8px;
  }

  .dataset-form :deep(.el-form-item) {
    margin-bottom: 20px;
  }

  .dataset-form :deep(.el-form-item__label) {
    text-align: left;
    display: block;
    line-height: 1.5;
    margin-bottom: 8px;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  .dataset-form :deep(.el-form-item__content) {
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

  .statistics-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 12px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
  }

  .stat-icon i {
    font-size: 20px;
  }

  .stat-label {
    font-size: 12px;
  }

  .stat-value {
    font-size: 20px;
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

  .dataset-form {
    padding: 12px 8px;
  }

  .dataset-form :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  .dataset-form :deep(.el-form-item__label) {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .stat-card {
    padding: 10px;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
  }

  .stat-icon i {
    font-size: 18px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-value {
    font-size: 18px;
  }
}
</style>
