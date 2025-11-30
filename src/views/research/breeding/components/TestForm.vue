<template>
  <div class="test-form-component">
    <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
      <el-row :gutter="responsiveGutter">
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.test.form.cropType')" prop="cropType">
            <el-select v-model="formData.cropType" :placeholder="$t('research.breeding.test.form.cropTypePlaceholder')" style="width: 100%">
              <el-option :label="$t('research.breeding.cropType.wheat')" value="WHEAT" />
              <el-option :label="$t('research.breeding.cropType.corn')" value="CORN" />
              <el-option :label="$t('research.breeding.cropType.rice')" value="RICE" />
              <el-option :label="$t('research.breeding.cropType.soybean')" value="SOYBEAN" />
              <el-option :label="$t('research.breeding.cropType.cotton')" value="COTTON" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.test.form.testDate')" prop="testDate">
            <el-date-picker v-model="formData.testDate" type="date" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.test.form.testResult')" prop="testResult">
            <el-select v-model="formData.testResult" :placeholder="$t('research.breeding.test.form.testResultPlaceholder')" style="width: 100%">
              <el-option :label="$t('research.breeding.test.result.qualified')" value="01" />
              <el-option :label="$t('research.breeding.test.result.unqualified')" value="02" />
              <el-option :label="$t('research.breeding.test.result.toBeRetested')" value="03" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.test.form.germinationRate')">
            <el-input v-model.number="formData.germinationRate" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.test.form.purity')">
            <el-input v-model.number="formData.purity" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('common.remarks')">
            <el-input v-model="formData.remark" type="textarea" :rows="3" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="form-footer">
      <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="submitting">{{ $t('common.submit') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBreedingTestPageDetail, addBreedingTestPage, updateBreedingTestPage } from '@/api/breeding'

const props = defineProps({
  batchId: String,
  trackingId: String,
  testId: String,
  isEdit: Boolean
})

const emit = defineEmits(['success', 'cancel'])
const { t } = useI18n()

const formRef = ref(null)
const submitting = ref(false)
const responsiveSpan = ref(12)
const responsiveGutter = ref(20)

const formData = ref({
  batchId: props.batchId,
  trackingId: props.trackingId,
  cropType: '',
  testDate: '',
  testResult: '',
  germinationRate: '',
  purity: '',
  remark: ''
})

const updateResponsive = () => {
  const isMobile = window.innerWidth <= 768
  responsiveSpan.value = isMobile ? 24 : 12
  responsiveGutter.value = isMobile ? 0 : 20
}

const rules = computed(() => ({
  cropType: [{ required: true, message: t('research.breeding.test.validation.cropTypeRequired'), trigger: 'change' }],
  testDate: [{ required: true, message: t('research.breeding.test.validation.testDateRequired'), trigger: 'change' }],
  testResult: [{ required: true, message: t('research.breeding.test.validation.testResultRequired'), trigger: 'change' }]
}))

onMounted(async () => {
  updateResponsive()
  window.addEventListener('resize', updateResponsive)
  if (props.isEdit && props.testId) {
    await loadDetail()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateResponsive)
})

const loadDetail = async () => {
  try {
    const response = await getBreedingTestPageDetail(props.testId)
    if (response.code === 200 && response.data) {
      formData.value = { ...formData.value, ...response.data }
    }
  } catch (error) {
    console.error(error)
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        const data = props.isEdit ? { id: props.testId, ...formData.value } : formData.value
        const response = props.isEdit ? await updateBreedingTestPage(data) : await addBreedingTestPage(data)
        if (response.code === 200) {
          ElMessage.success(props.isEdit ? t('research.breeding.messages.editSuccess') : t('research.breeding.messages.addSuccess'))
          emit('success')
        } else {
          ElMessage.error(response.msg || t('research.breeding.messages.operationError'))
        }
      } catch (error) {
        ElMessage.error(t('research.breeding.messages.operationError'))
      } finally {
        submitting.value = false
      }
    }
  })
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped lang="scss">
.test-form-component {
  .form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  @media screen and (max-width: 768px) {
    .form-footer {
      flex-direction: column;
      gap: 12px;

      .el-button {
        width: 100%;
        margin: 0;
      }
    }
  }
}
</style>
