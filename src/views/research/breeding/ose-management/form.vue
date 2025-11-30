<template>
  <div class="ose-form-container">
    <div class="form-header">
      <div class="header-left">
        <el-button link @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>
      <h2 class="form-title">{{ isEditMode ? $t('research.breeding.seed.ose.edit') : $t('research.breeding.seed.ose.add') }}</h2>
    </div>

    <div class="form-content">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="180px"
        class="ose-form"
      >
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.breeding.seed.ose.form.basicInfo') }}
          </div>

          <el-form-item :label="$t('research.breeding.seed.ose.form.oseCode')" prop="oseCode">
            <el-input
              v-model="formData.oseCode"
              :placeholder="$t('research.breeding.seed.ose.placeholder.oseCode')"
              clearable
              maxlength="50"
            />
            <div class="help-text">{{ $t('research.breeding.seed.ose.help.oseCode') }}</div>
          </el-form-item>

          <el-form-item :label="$t('research.breeding.seed.ose.form.oseName')" prop="oseName">
            <el-input
              v-model="formData.oseName"
              :placeholder="$t('research.breeding.seed.ose.placeholder.oseName')"
              clearable
              maxlength="100"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breeding.seed.ose.form.regionCode')" prop="regionCode">
            <el-select
              v-model="formData.regionCode"
              :placeholder="$t('research.breeding.seed.ose.placeholder.regionCode')"
              filterable
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="region in regionList"
                :key="region.regionCode"
                :label="region.regionName"
                :value="region.regionCode"
              />
            </el-select>
            <div class="help-text">{{ $t('research.breeding.seed.ose.help.regionCode') }}</div>
          </el-form-item>

          <el-form-item :label="$t('research.breeding.seed.ose.form.location')" prop="location">
            <el-input
              v-model="formData.location"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.breeding.seed.ose.placeholder.location')"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <div class="section-title">
            <i class="ri-contacts-line"></i>
            {{ $t('research.breeding.seed.ose.form.contactInfo') }}
          </div>

          <el-form-item :label="$t('research.breeding.seed.ose.form.contactName')" prop="contactName">
            <el-input
              v-model="formData.contactName"
              :placeholder="$t('research.breeding.seed.ose.placeholder.contactName')"
              clearable
              maxlength="50"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breeding.seed.ose.form.contactNumber')" prop="contactNumber">
            <el-input
              v-model="formData.contactNumber"
              :placeholder="$t('research.breeding.seed.ose.placeholder.contactNumber')"
              clearable
              maxlength="12"
            >
            </el-input>
            <div class="help-text">{{ $t('research.breeding.seed.ose.help.contactNumber') }}</div>
          </el-form-item>
        </div>

        <div class="form-footer">
          <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addOse, updateOse } from '@/api/breedSeed'

const props = defineProps({
  editData: {
    type: Object,
    default: null
  }
})

const { t } = useI18n()
const emit = defineEmits(['cancel', 'success'])

const formRef = ref(null)
const submitting = ref(false)
const isEditMode = computed(() => !!props.editData)

const regionList = ref([
  { regionCode: 'REG001', regionName: 'Addis Ababa' },
  { regionCode: 'REG002', regionName: 'Oromia' },
  { regionCode: 'REG003', regionName: 'Amhara' },
  { regionCode: 'REG004', regionName: 'Tigray' },
  { regionCode: 'REG005', regionName: 'Somali' },
  { regionCode: 'REG006', regionName: 'Southern Nations' },
  { regionCode: 'REG007', regionName: 'Afar' },
  { regionCode: 'REG008', regionName: 'Benishangul-Gumuz' },
  { regionCode: 'REG009', regionName: 'Gambela' },
  { regionCode: 'REG010', regionName: 'Harari' },
  { regionCode: 'REG011', regionName: 'Dire Dawa' }
])

const formData = reactive({
  oseCode: '',
  oseName: '',
  location: '',
  regionCode: '',
  contactName: '',
  contactNumber: '251'
})

// 监听编辑数据变化，填充表单
watch(() => props.editData, (newVal) => {
  if (newVal) {
    formData.oseCode = newVal.oseCode || ''
    formData.oseName = newVal.oseName || ''
    formData.location = newVal.location || ''
    formData.regionCode = newVal.regionCode || ''
    formData.contactName = newVal.contactName || ''
    formData.contactNumber = newVal.contactNumber || ''
  }
}, { immediate: true })

const phoneValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t('research.breeding.seed.ose.rules.contactNumber')))
  } else {
    // 埃塞俄比亚手机号格式: 251开头，总共12位
    const phoneRegex = /^251\d{9}$/
    if (!phoneRegex.test(value)) {
      callback(new Error(t('research.breeding.seed.ose.rules.contactNumberFormat')))
    } else {
      callback()
    }
  }
}

const rules = computed(() => ({
  oseCode: [
    { required: true, message: t('research.breeding.seed.ose.rules.oseCode'), trigger: 'blur' }
  ],
  oseName: [
    { required: true, message: t('research.breeding.seed.ose.rules.oseName'), trigger: 'blur' }
  ],
  location: [
    { required: true, message: t('research.breeding.seed.ose.rules.location'), trigger: 'blur' }
  ],
  regionCode: [
    { required: true, message: t('research.breeding.seed.ose.rules.regionCode'), trigger: 'change' }
  ],
  contactName: [
    { required: true, message: t('research.breeding.seed.ose.rules.contactName'), trigger: 'blur' }
  ],
  contactNumber: [
    { required: true, validator: phoneValidator, trigger: 'blur' }
  ]
}))

// 返回列表
const handleBack = () => {
  emit('cancel')
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    submitting.value = true

    let res
    if (isEditMode.value) {
      // 编辑模式：调用更新接口
      res = await updateOse(props.editData.oseId, formData)
    } else {
      // 新增模式：调用添加接口
      res = await addOse(formData)
    }

    if (res.code === 200) {
      ElMessage.success(
        isEditMode.value
          ? t('research.breeding.seed.ose.updateSuccess')
          : t('research.breeding.seed.ose.addSuccess')
      )
      emit('success')
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Submit error:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  // 可以在这里加载区域列表
})
</script>

<style scoped>
.ose-form-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.form-header {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.header-left {
  margin-bottom: 8px;
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: #009A44;
  margin: 0;
}

.form-content {
  padding: 24px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
}

.section-title i {
  font-size: 18px;
  color: #009A44;
}

.help-text {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

@media screen and (max-width: 768px) {
  .form-content {
    padding: 16px;
  }

  .ose-form {
    :deep(.el-form-item__label) {
      width: 100% !important;
      text-align: left;
      margin-bottom: 8px;
    }

    :deep(.el-form-item__content) {
      margin-left: 0 !important;
    }
  }

  .form-footer {
    flex-direction: column-reverse;
  }

  .form-footer .el-button {
    width: 100%;
  }
}
</style>
