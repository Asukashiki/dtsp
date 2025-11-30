<template>
  <div class="tracking-form-component">
    <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
      <el-row :gutter="responsiveGutter">
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.tracking.form.cropType')" prop="cropType">
            <el-select v-model="formData.cropType" :placeholder="$t('research.breeding.tracking.form.cropTypePlaceholder')" style="width: 100%">
              <el-option :label="$t('research.breeding.cropType.wheat')" value="WHEAT" />
              <el-option :label="$t('research.breeding.cropType.corn')" value="CORN" />
              <el-option :label="$t('research.breeding.cropType.rice')" value="RICE" />
              <el-option :label="$t('research.breeding.cropType.soybean')" value="SOYBEAN" />
              <el-option :label="$t('research.breeding.cropType.cotton')" value="COTTON" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.tracking.form.stageName')" prop="stageName">
            <el-select v-model="formData.stageName" :placeholder="$t('research.breeding.tracking.form.stageNamePlaceholder')" style="width: 100%">
              <el-option :label="$t('research.breeding.tracking.stage.parentPrep')" value="01" />
              <el-option :label="$t('research.breeding.tracking.stage.original')" value="02" />
              <el-option :label="$t('research.breeding.tracking.stage.foundation')" value="03" />
              <el-option :label="$t('research.breeding.tracking.stage.certified')" value="04" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.tracking.form.trackingResult')" prop="trackingResult">
            <el-select v-model="formData.trackingResult" :placeholder="$t('research.breeding.tracking.form.trackingResultPlaceholder')" style="width: 100%">
              <el-option :label="$t('research.breeding.tracking.result.normal')" value="01" />
              <el-option :label="$t('research.breeding.tracking.result.abnormal')" value="02" />
              <el-option :label="$t('research.breeding.tracking.result.observing')" value="03" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.tracking.form.location')" prop="location">
            <el-input v-model="formData.location" :placeholder="$t('research.breeding.tracking.form.locationPlaceholder')" />
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.tracking.form.startDate')" prop="startDate">
            <el-date-picker v-model="formData.startDate" type="date" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.tracking.form.completeDate')">
            <el-date-picker v-model="formData.completeDate" type="date" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.tracking.form.expectedYield')">
            <el-input v-model.number="formData.expectedYield" :placeholder="$t('research.breeding.breedingBatch.form.expectedYieldPlaceholder')" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="responsiveSpan">
          <el-form-item :label="$t('research.breeding.tracking.form.actualYield')">
            <el-input v-model.number="formData.actualYield" :placeholder="$t('research.breeding.breedingBatch.form.actualYieldPlaceholder')" type="number" />
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
import { getBreedingTrackingPageDetail, addBreedingTrackingPage, updateBreedingTrackingPage } from '@/api/breeding'

const props = defineProps({
  batchId: String,
  trackingId: String,
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
  cropType: '',
  stageName: '',
  trackingResult: '',
  location: '',
  startDate: '',
  completeDate: '',
  expectedYield: '',
  actualYield: '',
  remark: ''
})

const updateResponsive = () => {
  const isMobile = window.innerWidth <= 768
  responsiveSpan.value = isMobile ? 24 : 12
  responsiveGutter.value = isMobile ? 0 : 20
}

const rules = computed(() => ({
  cropType: [{ required: true, message: t('research.breeding.tracking.validation.cropTypeRequired'), trigger: 'change' }],
  stageName: [{ required: true, message: t('research.breeding.tracking.validation.stageNameRequired'), trigger: 'change' }],
  location: [{ required: true, message: t('research.breeding.tracking.validation.locationRequired'), trigger: 'blur' }],
  startDate: [{ required: true, message: t('research.breeding.tracking.validation.startDateRequired'), trigger: 'change' }]
}))

onMounted(async () => {
  updateResponsive()
  window.addEventListener('resize', updateResponsive)
  if (props.isEdit && props.trackingId) {
    await loadDetail()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateResponsive)
})

const loadDetail = async () => {
  try {
    const response = await getBreedingTrackingPageDetail(props.trackingId)
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
        const data = props.isEdit ? { id: props.trackingId, ...formData.value } : formData.value
        const response = props.isEdit ? await updateBreedingTrackingPage(data) : await addBreedingTrackingPage(data)
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
.tracking-form-component {
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
