<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="isMobile ? '90%' : '500px'"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item :label="label" prop="reason">
        <el-input
          v-model="form.reason"
          type="textarea"
          :rows="5"
          :placeholder="placeholder"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">
        {{ t('research.trialBasicAudit.action.close') }}
      </el-button>
      <el-button type="primary" :loading="loading" @click="handleConfirm">
        {{ t('research.trialBasicAudit.action.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResponsive } from '@/hooks/useResponsive'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const { t } = useI18n()
const { isMobile } = useResponsive()

const formRef = ref()
const visible = ref(false)
const form = reactive({
  reason: ''
})

const rules = {
  reason: [
    { required: true, message: t('common.pleaseInput'), trigger: 'blur' },
    { min: 1, max: 500, message: t('common.lengthLimit', { min: 1, max: 500 }), trigger: 'blur' }
  ]
}

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    form.reason = ''
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const handleClose = () => {
  visible.value = false
  formRef.value?.resetFields()
}

const handleConfirm = async () => {
  try {
    await formRef.value.validate()
    emit('confirm', form.reason)
  } catch (error) {
    // 验证失败
  }
}
</script>
