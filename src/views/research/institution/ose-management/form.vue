<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-edit-box-line"
        :title="isEditMode ? $t('research.breeding.seed.ose.edit') : $t('research.breeding.seed.ose.add')" shadow
        show-back @back="handleBack" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" v-loading="loading">
          <!-- 基础信息 -->
          <InfoCard :title="$t('research.breeding.seed.ose.form.basicInfo')" icon="ri-information-line">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.breeding.seed.ose.form.oseCode')" prop="oseCode">
                  <el-input v-model="formData.oseCode"
                    :placeholder="$t('research.breeding.seed.ose.placeholder.oseCode')" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.breeding.seed.ose.form.oseName')" prop="oseName">
                  <el-input v-model="formData.oseName"
                    :placeholder="$t('research.breeding.seed.ose.placeholder.oseName')" clearable maxlength="100" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.breeding.seed.ose.form.regionCode')" prop="regionCode">
                  <el-select v-model="formData.regionCode"
                    :placeholder="$t('research.breeding.seed.ose.placeholder.regionCode')" filterable clearable
                    style="width: 100%">
                    <el-option v-for="region in regionList" :key="region.regionCode" :label="region.regionName"
                      :value="region.regionCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24">
                <el-form-item :label="$t('research.breeding.seed.ose.form.location')" prop="location">
                  <el-input v-model="formData.location" type="textarea" :rows="3"
                    :placeholder="$t('research.breeding.seed.ose.placeholder.location')" maxlength="200"
                    show-word-limit />
                </el-form-item>
              </el-col>
            </el-row>
          </InfoCard>

          <!-- 联系信息 -->
          <InfoCard :title="$t('research.breeding.seed.ose.form.contactInfo')" icon="ri-contacts-line">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.breeding.seed.ose.form.contactName')" prop="contactName">
                  <el-input v-model="formData.contactName"
                    :placeholder="$t('research.breeding.seed.ose.placeholder.contactName')" clearable maxlength="50" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.breeding.seed.ose.form.contactNumber')" prop="contactNumber">
                  <el-input v-model="formData.contactNumber"
                    :placeholder="$t('research.breeding.seed.ose.placeholder.contactNumber')" clearable
                    maxlength="12" />
                </el-form-item>
              </el-col>
            </el-row>
          </InfoCard>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">
              {{ $t('common.submit') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addOse, updateOse, getOseDetail } from '@/api/breedSeed'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitting = ref(false)
const loading = ref(false)

const oseId = computed(() => route.params.id)
const isEditMode = computed(() => !!oseId.value)

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
  contactNumber: ''
})

const phoneValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t('research.breeding.seed.ose.rules.contactNumber')))
  } else {
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

const loadDetail = async () => {
  if (!oseId.value) return
  loading.value = true
  try {
    const res = await getOseDetail(oseId.value)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    }
  } catch (error) {
    console.error('Failed to load OSE detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitting.value = true

    let res
    if (isEditMode.value) {
      res = await updateOse(oseId.value, formData)
    } else {
      res = await addOse(formData)
    }

    if (res.code === 200) {
      ElMessage.success(
        isEditMode.value
          ? t('research.breeding.seed.ose.updateSuccess')
          : t('research.breeding.seed.ose.addSuccess')
      )
      handleBack()
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
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
