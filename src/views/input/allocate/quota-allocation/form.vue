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
              {{ isEdit ? $t('quota.allocation.edit') : $t('quota.allocation.add') }}
            </h1>
          </div>
        </div>
      </div>

      <!-- Form Area -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" v-loading="loading">
          <!-- Basic Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('quota.allocation.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.allocation.form.year')" prop="year">
                    <el-select
                      v-model="formData.year"
                      :placeholder="$t('quota.allocation.placeholder.year')"
                      style="width: 100%"
                      :disabled="isEdit"
                    >
                      <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.allocation.form.category')" prop="categoryId">
                    <el-select
                      v-model="formData.categoryId"
                      :placeholder="$t('quota.allocation.placeholder.category')"
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
                  <el-form-item :label="$t('quota.allocation.form.fromDivisionLevel')" prop="fromDivisionLevel">
                    <el-select
                      v-model="formData.fromDivisionLevel"
                      :placeholder="$t('quota.allocation.placeholder.level')"
                      style="width: 100%"
                      :disabled="isEdit"
                    >
                      <el-option
                        v-for="item in divisionLevelOptions"
                        :key="item.value"
                        :label="$t(`quota.allocation.level.${item.label}`)"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.allocation.form.fromDivisionId')" prop="fromDivisionId">
                    <el-input
                      v-model="formData.fromDivisionId"
                      :placeholder="$t('quota.allocation.placeholder.fromDivisionId')"
                      :disabled="isEdit"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.allocation.form.toDivisionId')" prop="toDivisionId" v-if="formData.fromDivisionLevel < 4">
                    <el-input
                      v-model="formData.toDivisionId"
                      :placeholder="$t('quota.allocation.placeholder.toDivisionId')"
                      :disabled="isEdit"
                    />
                  </el-form-item>
                  <el-form-item :label="$t('quota.allocation.form.toFarmerId')" prop="toFarmerId" v-else>
                    <el-input
                      v-model="formData.toFarmerId"
                      :placeholder="$t('quota.allocation.placeholder.toFarmerId')"
                      :disabled="isEdit"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.allocation.form.allocatedQuota')" prop="allocatedQuota">
                    <el-input-number
                      v-model="formData.allocatedQuota"
                      :placeholder="$t('quota.allocation.placeholder.allocatedQuota')"
                      :min="0"
                      :precision="2"
                      :controls="false"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.allocation.form.totalReceivedQuota')" prop="totalReceivedQuota">
                    <el-input-number
                      v-model="formData.totalReceivedQuota"
                      :placeholder="$t('quota.allocation.placeholder.totalReceivedQuota')"
                      :min="0"
                      :precision="2"
                      :controls="false"
                      style="width: 100%"
                      :disabled="isEdit"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('quota.allocation.form.quotaId')" prop="quotaId">
                    <el-input
                      v-model="formData.quotaId"
                      :placeholder="$t('quota.allocation.placeholder.quotaId')"
                      :disabled="isEdit"
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  getQuotaAllocationDetail,
  addQuotaAllocation,
  updateQuotaAllocation
} from '@/api/quota'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)

const isEdit = computed(() => !!route.params.allocationId)

const formData = reactive({
  allocationId: '',
  year: null,
  categoryId: '',
  fromDivisionId: '',
  fromDivisionLevel: null,
  toDivisionId: '',
  toFarmerId: '',
  allocatedQuota: null,
  quotaId: '',
  totalReceivedQuota: null
})

const rules = {
  year: [{ required: true, message: t('quota.allocation.placeholder.year'), trigger: 'change' }],
  categoryId: [{ required: true, message: t('quota.allocation.placeholder.category'), trigger: 'change' }],
  fromDivisionLevel: [{ required: true, message: t('quota.allocation.placeholder.level'), trigger: 'change' }],
  fromDivisionId: [{ required: true, message: t('quota.allocation.placeholder.fromDivisionId'), trigger: 'blur' }],
  allocatedQuota: [{ required: true, message: t('quota.allocation.placeholder.allocatedQuota'), trigger: 'blur' }],
  quotaId: [{ required: true, message: t('quota.allocation.placeholder.quotaId'), trigger: 'blur' }],
  totalReceivedQuota: [{ required: true, message: t('quota.allocation.placeholder.totalReceivedQuota'), trigger: 'blur' }]
}

const yearOptions = ref([])
const currentYear = new Date().getFullYear()
for (let i = 0; i < 6; i++) {
  yearOptions.value.push(currentYear + i)
}

const categoryOptions = [
  { label: 'seed', value: '1' },
  { label: 'fertilizer', value: '2' },
  { label: 'pesticide', value: '3' },
  { label: 'other', value: '4' }
]

const divisionLevelOptions = [
  { label: 'region', value: 1 },
  { label: 'zone', value: 2 },
  { label: 'worede', value: 3 },
  { label: 'kebele', value: 4 }
]

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getQuotaAllocationDetail(
      route.params.allocationId,
      userStore.userInfo?.divisionId || ''
    )
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
      if (isEdit.value) {
        formData.allocatedQuota = res.data.allocatedQuota
      }
    }
  } catch (error) {
    console.error('Failed to get allocation detail:', error)
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
      submitData.newAllocatedQuota = submitData.allocatedQuota
      const res = await updateQuotaAllocation(submitData)
      if (res.code === 200) {
        ElMessage.success(t('quota.allocation.editSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.saveFailed'))
      }
    } else {
      const res = await addQuotaAllocation(submitData)
      if (res.code === 200) {
        ElMessage.success(t('quota.allocation.addSuccess'))
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
  router.push('/input/allocate/quota-allocation')
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
