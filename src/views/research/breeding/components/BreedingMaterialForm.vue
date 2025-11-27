<template>
  <div class="form-container">
    <div class="form-header">
      <div class="form-title">
        <i class="ri-archive-line"></i>
        <span>{{ isView ? $t('research.breeding.material.detail') : (materialData ? $t('research.breeding.material.edit') : $t('research.breeding.material.add')) }}</span>
      </div>
      <el-button @click="handleCancel">
        <i class="ri-close-line"></i>
        {{ $t('common.back') }}
      </el-button>
    </div>

    <div class="form-body">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="160px"
        :disabled="isView"
      >
        <!-- 基础关联信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-link-line"></i>
            {{ $t('research.breeding.material.form.basicInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.registrationCode')" prop="registrationCode">
                <el-input v-model="formData.registrationCode" :placeholder="$t('research.breeding.material.placeholder.registrationCode')" disabled />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.batchId')" prop="batchId">
                <el-select v-model="formData.batchId" :placeholder="$t('research.breeding.material.placeholder.batchId')" style="width: 100%">
                  <el-option v-for="batch in batchList" :key="batch.batchId" :label="batch.batchName" :value="batch.batchId" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.warehouseInId')" prop="warehouseInId">
                <el-input v-model="formData.warehouseInId" :placeholder="$t('research.breeding.material.placeholder.warehouseInId')" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.receiveDate')" prop="receiveDate">
                <el-date-picker
                  v-model="formData.receiveDate"
                  type="date"
                  :placeholder="$t('research.breeding.material.placeholder.receiveDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 材料信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-seedling-line"></i>
            {{ $t('research.breeding.material.form.materialInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.seedType')" prop="seedType">
                <el-input v-model="formData.seedType" :placeholder="$t('research.breeding.material.placeholder.seedType')" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.quantity')" prop="quantity">
                <el-input v-model.number="formData.quantity" :placeholder="$t('research.breeding.material.placeholder.quantity')" type="number" step="0.1" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.sourceEntity')" prop="sourceEntity">
                <el-input v-model="formData.sourceEntity" :placeholder="$t('research.breeding.material.placeholder.sourceEntity')" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item :label="$t('research.breeding.material.form.labTestReport')">
            <el-upload
              v-model:file-list="fileList"
              :action="uploadAction"
              :disabled="isView"
              :limit="1"
              accept=".pdf,.jpg,.jpeg,.png"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
            >
              <el-button type="primary" :disabled="isView">
                <i class="ri-upload-2-line"></i>
                {{ $t('common.upload') }}
              </el-button>
              <template #tip>
                <div class="el-upload__tip">
                  {{ $t('research.breeding.material.messages.uploadTip') }}
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </div>

        <!-- 操作信息 -->
        <div v-if="isView && materialData" class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            操作信息
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.operator')">
                <el-input v-model="formData.operator" disabled />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.operationOrg')">
                <el-input v-model="formData.operationOrg" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.material.form.operationTime')">
                <el-input v-model="formData.operationTime" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 操作按钮 -->
        <div v-if="!isView" class="form-actions">
          <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ $t('research.breeding.material.actions.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addBreedingMaterial, editBreedingMaterial } from '@/api/enterprise'
import { mockBatchList } from '@/mock/breedingData'

const { t } = useI18n()
const emit = defineEmits(['cancel', 'success'])

const props = defineProps({
  materialData: {
    type: Object,
    default: null
  },
  isView: {
    type: Boolean,
    default: false
  }
})

// 表单引用
const formRef = ref(null)
const submitting = ref(false)

// 辅助数据
const batchList = ref(mockBatchList)
const fileList = ref([])
const uploadAction = ref('/api/upload') // TODO: 替换为实际上传地址

// 表单数据
const formData = reactive({
  registrationCode: 'REG-' + new Date().getTime(),
  batchId: '',
  warehouseInId: '',
  seedType: '',
  quantity: null,
  sourceEntity: '',
  receiveDate: '',
  labTestReportUrl: '',
  operator: '',
  operationOrg: '',
  operationTime: ''
})

// 自定义验证器 - 数量格式
const validateQuantity = (rule, value, callback) => {
  if (value && (value <= 0 || isNaN(value))) {
    callback(new Error(t('research.breeding.material.rules.quantityFormat')))
  } else {
    callback()
  }
}

// 表单验证规则
const formRules = computed(() => ({
  batchId: [
    { required: true, message: t('research.breeding.material.rules.batchIdRequired'), trigger: 'change' }
  ],
  warehouseInId: [
    { required: true, message: t('research.breeding.material.rules.warehouseInIdRequired'), trigger: 'blur' }
  ],
  seedType: [
    { required: true, message: t('research.breeding.material.rules.seedTypeRequired'), trigger: 'blur' }
  ],
  quantity: [
    { required: true, message: t('research.breeding.material.rules.quantityRequired'), trigger: 'blur' },
    { validator: validateQuantity, trigger: 'blur' }
  ],
  sourceEntity: [
    { required: true, message: t('research.breeding.material.rules.sourceEntityRequired'), trigger: 'blur' }
  ],
  receiveDate: [
    { required: true, message: t('research.breeding.material.rules.receiveDateRequired'), trigger: 'change' }
  ]
}))

// 初始化表单数据
const initFormData = () => {
  if (props.materialData) {
    Object.assign(formData, props.materialData)
    // 初始化文件列表
    if (props.materialData.labTestReportUrl) {
      fileList.value = [{
        name: '实验室检测报告.pdf',
        url: props.materialData.labTestReportUrl
      }]
    }
  }
}

// 文件上传成功
const handleUploadSuccess = (response, file) => {
  ElMessage.success(t('common.uploadSuccess'))
  formData.labTestReportUrl = response.url // 假设返回的数据结构
}

// 文件上传失败
const handleUploadError = () => {
  ElMessage.error(t('common.failed'))
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = { ...formData }

    // 调用API保存数据
    let res
    if (props.materialData && props.materialData.materialId) {
      // 编辑模式
      submitData.materialId = props.materialData.materialId
      res = await editBreedingMaterial(submitData)
    } else {
      // 新增模式
      res = await addBreedingMaterial(submitData)
    }

    if (res.code === 200) {
      ElMessage.success(props.materialData ? t('research.breeding.material.editSuccess') : t('research.breeding.material.addSuccess'))
      emit('success')
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    console.error('Form submission failed:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  emit('cancel')
}

// 初始化
onMounted(() => {
  initFormData()
})
</script>

<style scoped>
.form-container {
  background: white;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8f5e9;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
}

.form-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-title i {
  font-size: 22px;
}

.form-body {
  padding: 24px;
}

.form-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8f5e9;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .form-header {
    padding: 16px;
  }

  .form-body {
    padding: 16px;
  }

  :deep(.el-form-item__label) {
    width: 100% !important;
    text-align: left;
    margin-bottom: 8px;
  }

  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions .el-button {
    width: 100%;
  }
}
</style>
