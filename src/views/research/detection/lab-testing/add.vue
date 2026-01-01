<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button @click="handleBack" class="back-btn">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.c1BreedingBatch.test.edit') :
              $t('research.detection.labTesting.addTitle') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 批次选择区（仅新增时显示） -->
        <div v-if="!isEdit" class="batch-selector-section">
          <div class="section-title">
            <i class="ri-folder-line"></i>
            <span>{{ $t('research.detection.selectBatch') }}</span>
          </div>
          <p class="section-hint">{{ $t('research.detection.batchSelector.selectBatchHint') }}</p>
          <BatchSelector v-model="selectedBatch" :placeholder="$t('research.detection.batchSelector.searchPlaceholder')"
            @change="handleBatchChange" />
        </div>

        <!-- 批次信息卡片 -->
        <div v-if="selectedBatch || isEdit" class="batch-info-card">
          <div class="batch-info-header">
            <i class="ri-information-line"></i>
            <span>{{ $t('research.detection.batchInfo') }}</span>
          </div>
          <div class="batch-info-content">
            <div class="info-item">
              <span class="label">{{ $t('research.detection.batchId') }}:</span>
              <span class="value">{{ selectedBatch?.name || formData.batchId }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.detection.seedClass') }}:</span>
              <el-tag :type="(selectedBatch?.seedClass || formData.seedClass) === 'Basic' ? 'success' : 'warning'">
                {{ selectedBatch?.seedClass || formData.seedClass }}
              </el-tag>
            </div>
          </div>
        </div>

        <!-- 表单区域 -->
        <div v-if="selectedBatch || isEdit" class="form-section">
          <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="test-form">
            <div class="form-grid">
              <el-form-item :label="$t('research.c1BreedingBatch.test.seedClass')" prop="seedClass">
                <el-select v-model="formData.seedClass" :placeholder="$t('common.pleaseSelect')" class="full-width"
                  disabled>
                  <el-option label="Pre-Basic" value="Pre-Basic" />
                  <el-option label="Basic" value="Basic" />
                  <el-option label="C1" value="C1" />
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('research.c1BreedingBatch.test.lotId')">
                <el-input v-model="formData.lotId" disabled />
              </el-form-item>

              <el-form-item :label="$t('research.c1BreedingBatch.test.testType')" prop="testType">
                <el-select v-model="formData.testType" :placeholder="$t('common.pleaseSelect')" class="full-width"
                  @change="handleTestTypeChange">
                  <el-option label="Germination" value="GERMINATION" />
                  <el-option label="Purity" value="PURITY" />
                  <el-option label="Moisture" value="MOISTURE" />
                  <el-option label="Vigor" value="VIGOR" />
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('research.c1BreedingBatch.test.testValue')" prop="testValue">
                <el-input v-model="formData.testValue" :placeholder="$t('common.pleaseEnter')" @blur="checkRuleOnBlur">
                  <template #append>{{ currentUnit }}</template>
                </el-input>
              </el-form-item>

              <el-form-item :label="$t('research.c1BreedingBatch.test.passStatus')" prop="passStatus">
                <el-select v-model="formData.passStatus" :placeholder="$t('common.pleaseSelect')" class="full-width">
                  <el-option :label="$t('research.c1BreedingBatch.test.passed')" value="TRUE" />
                  <el-option :label="$t('research.c1BreedingBatch.test.failed')" value="FALSE" />
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('research.c1BreedingBatch.test.testDate')" prop="testDate">
                <el-date-picker v-model="formData.testDate" type="date" :placeholder="$t('common.pleaseSelect')"
                  value-format="YYYY-MM-DD" style="width: 100%" />
              </el-form-item>

              <el-form-item :label="$t('research.c1BreedingBatch.test.tester')">
                <el-input v-model="formData.tester" :placeholder="$t('common.pleaseEnter')" disabled />
              </el-form-item>

              <el-form-item :label="$t('research.c1BreedingBatch.test.testOrg')">
                <el-input v-model="formData.testOrg" :placeholder="$t('common.pleaseEnter')" />
              </el-form-item>

              <el-form-item :label="$t('research.c1BreedingBatch.test.testDesc')" class="full-width-item">
                <el-input v-model="formData.testDesc" type="textarea" :rows="3" :placeholder="$t('common.pleaseEnter')" />
              </el-form-item>
            </div>

            <div class="form-actions">
              <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
              <el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{ $t('common.submit')
                }}</el-button>
            </div>
          </el-form>
        </div>

        <!-- 空状态 - 未选择批次 -->
        <div v-if="!selectedBatch && !isEdit" class="empty-state">
          <i class="ri-folder-add-line"></i>
          <p class="empty-hint">{{ $t('research.detection.batchSelector.selectBatchFirst') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getTestById, addTest, updateTest, checkRule } from '@/api/detection'
import { useUserStore } from '@/store/user'
import BatchSelector from '../shared/components/BatchSelector.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const selectedBatch = ref(null)
const isEdit = ref(false)
const editingId = ref(null)
const submitLoading = ref(false)
const formRef = ref(null)

// TestType对应的单位
const testTypeUnitMap = {
  'GERMINATION': '%',
  'PURITY': '%',
  'MOISTURE': '%',
  'VIGOR': ''
}

const formData = ref({
  seedClass: '',
  lotId: '',
  testType: '',
  testValue: '',
  unit: '',
  passStatus: '',
  testDate: '',
  tester: '',
  testOrg: '',
  testDesc: '',
  batchId: ''
})

const rules = {
  testType: [{ required: true, message: t('common.required'), trigger: 'change' }],
  testValue: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  passStatus: [{ required: true, message: t('common.required'), trigger: 'change' }],
  testDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

// 根据TestType获取对应的单位
const currentUnit = computed(() => {
  const testType = formData.value.testType
  return testTypeUnitMap[testType] || ''
})

// 处理批次选择变化
const handleBatchChange = (batch) => {
  selectedBatch.value = batch
  if (batch) {
    formData.value.batchId = batch.id
    formData.value.seedClass = batch.seedClass
    formData.value.lotId = batch.id
  }
}

// 当testType变化时，更新单位
const handleTestTypeChange = (val) => {
  formData.value.unit = testTypeUnitMap[val] || ''
}

// 失焦时检查规则
const checkRuleOnBlur = async () => {
  const newValue = formData.value.testValue
  if (!formData.value.testType || !newValue) return

  try {
    const response = await checkRule(formData.value.testType, parseFloat(newValue))
    if (response.code === 200) {
      formData.value.passStatus = response.data ? 'TRUE' : 'FALSE'
    }
  } catch (error) {
    console.error('检查规则失败:', error)
  }
}

// 返回列表页
const handleBack = () => {
  router.push('/research/lab-testing')
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true
      try {
        const data = {
          ...formData.value,
          batchId: selectedBatch.value?.id || formData.value.batchId,
          seedClass: selectedBatch.value?.seedClass || formData.value.seedClass,
          unit: currentUnit.value
        }
        if (isEdit.value) data.id = editingId.value
        const response = isEdit.value ? await updateTest(data) : await addTest(data)
        if (response.code === 200) {
          ElMessage.success(isEdit.value ? t('common.updateSuccess') : t('common.addSuccess'))
          handleBack()
        }
      } finally {
        submitLoading.value = false
      }
    }
  })
}

// 加载编辑数据
const loadEditData = async (id) => {
  try {
    const response = await getTestById(id)
    if (response.code === 200 && response.data) {
      formData.value = { ...response.data }
    }
  } catch (error) {
    console.error('Load edit data error:', error)
  }
}

onMounted(() => {
  const { id, batchId, seedClass } = route.query

  // 从用户信息自动填充测试人
  const userInfo = userStore.userInfo?.user || {}
  formData.value.tester = userInfo.name || userInfo.NAME || userInfo.username || userInfo.USERNAME || ''

  if (id) {
    // 编辑模式
    isEdit.value = true
    editingId.value = id
    loadEditData(id)
  } else if (batchId && seedClass) {
    // 从列表页带参数新增
    formData.value.batchId = batchId
    formData.value.seedClass = seedClass
    formData.value.lotId = batchId
    selectedBatch.value = { id: batchId, name: batchId, seedClass }
  }
})
</script>

<style scoped>

/* 批次选择区 */
.batch-selector-section {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  border-radius: 12px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-hint {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
}

/* 批次信息卡片 */
.batch-info-card {
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
  border: 2px solid #009A44;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 154, 68, 0.1);
}

.batch-info-header {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.batch-info-content {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-item .label {
  color: #666;
  font-weight: 500;
}

.info-item .value {
  color: #333;
  font-weight: 600;
}

/* 表单区域 */
.form-section {
  margin-top: 24px;
}

.test-form .form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.test-form .full-width-item {
  grid-column: 1 / -1;
}

.test-form .form-actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.full-width {
  width: 100%;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 80px;
  color: #dcdfe6;
  margin-bottom: 16px;
}

.empty-hint {
  font-size: 16px;
  color: #606266;
  margin: 0;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .content-wrapper {
    padding: 16px;
    border-radius: 12px;
  }

  .batch-selector-section {
    padding: 16px;
  }

  .batch-info-card {
    padding: 16px;
  }

  .batch-info-content {
    flex-direction: column;
    gap: 12px;
  }

  .test-form .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
