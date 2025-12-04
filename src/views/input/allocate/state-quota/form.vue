<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">
              {{ isEdit ? $t('quota.stateQuota.edit') : $t('quota.stateQuota.add') }}
            </h1>
          </div>
        </div>
      </div>

      <!-- Form Area -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px" v-loading="loading">
          <!-- Basic Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('quota.stateQuota.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.stateQuota.form.year')" prop="year">
                    <el-select
                      v-model="formData.year"
                      :placeholder="$t('quota.stateQuota.placeholder.year')"
                      style="width: 100%"
                      :disabled="isEdit"
                    >
                      <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.stateQuota.form.category')" prop="categoryId">
                    <el-select
                      v-model="formData.categoryId"
                      :placeholder="$t('quota.stateQuota.placeholder.category')"
                      style="width: 100%"
                      :disabled="isEdit"
                    >
                      <el-option
                        v-for="item in categoryOptions"
                        :key="item.value"
                        :label="$t(`quota.category.${item.label}`)"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.stateQuota.form.totalQuota')" prop="totalQuota">
                    <el-input-number
                      v-model="formData.totalQuota"
                      :placeholder="$t('quota.stateQuota.placeholder.totalQuota')"
                      :min="0"
                      :precision="2"
                      :controls="false"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.stateQuota.form.quotaName')">
                    <el-input
                      v-model="quotaNameDisplay"
                      disabled
                      :placeholder="$t('quota.stateQuota.placeholder.quotaName')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
              {{ $t('common.save') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  getStateAnnualQuotaDetail,
  addStateAnnualQuota,
  updateStateAnnualQuota
} from '@/api/quota'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)

const isEdit = computed(() => !!route.params.quotaId)

const formData = reactive({
  quotaId: '',
  year: null,
  categoryId: '',
  totalQuota: null
})

const rules = {
  year: [
    { required: true, message: t('quota.stateQuota.placeholder.year'), trigger: 'change' }
  ],
  categoryId: [
    { required: true, message: t('quota.stateQuota.placeholder.category'), trigger: 'change' }
  ],
  totalQuota: [
    { required: true, message: t('quota.stateQuota.placeholder.totalQuota'), trigger: 'blur' }
  ]
}

// Generate year options (current year and next 5 years)
const yearOptions = ref([])
const currentYear = new Date().getFullYear()
for (let i = 0; i < 6; i++) {
  yearOptions.value.push(currentYear + i)
}

// Category options
const categoryOptions = [
  { label: 'seed', value: '1' },
  { label: 'fertilizer', value: '2' },
  { label: 'pesticide', value: '3' },
  { label: 'other', value: '4' }
]

// Auto-generate quota name
const quotaNameDisplay = computed(() => {
  if (!formData.year || !formData.categoryId) return ''
  const category = categoryOptions.find(c => c.value === formData.categoryId)
  const categoryLabel = category ? t(`quota.category.${category.label}`) : ''
  return `${formData.year}_StateQuota_${categoryLabel}`
})

// Watch for changes to update quota name
watch(
  () => [formData.year, formData.categoryId],
  () => {
    // Trigger quota name computation
  }
)

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getStateAnnualQuotaDetail(
      route.params.quotaId,
      userStore.userInfo?.divisionId || ''
    )
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    }
  } catch (error) {
    console.error('Failed to get quota detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    const submitData = {
      ...formData,
      operatorId: userStore.userInfo?.userId,
      operatorDivisionId: userStore.userInfo?.divisionId
    }

    if (isEdit.value) {
      submitData.modifierId = userStore.userInfo?.userId
      submitData.modifierDivisionId = userStore.userInfo?.divisionId
      const res = await updateStateAnnualQuota(submitData)
      if (res.code === 200) {
        ElMessage.success(t('quota.stateQuota.editSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.saveFailed'))
      }
    } else {
      const res = await addStateAnnualQuota(submitData)
      if (res.code === 200) {
        ElMessage.success(t('quota.stateQuota.addSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.saveFailed'))
      }
    }
  } catch (error) {
    console.error('Submit failed:', error)
    ElMessage.error(t('common.saveFailed'))
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => {
  router.push('/input/allocate/state-quota')
}

onMounted(() => {
  getInfo()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>
