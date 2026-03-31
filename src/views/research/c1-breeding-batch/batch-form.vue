<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.c1BreedingBatch.edit') : $t('research.c1BreedingBatch.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="200px" v-loading="loading">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.c1BreedingBatch.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- 批次号选择 - 全宽 -->
                <el-col :span="24">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.linkedBatchNo')" prop="propagationId">
                    <el-select 
                      v-model="formData.propagationId" 
                      :placeholder="$t('research.c1BreedingBatch.placeholder.linkedBatchNo')"
                      style="width: 100%"
                      filterable
                      @change="handlePropagationChange"
                    >
                      <el-option 
                        v-for="item in propagationList" 
                        :key="item.id" 
                        :label="`${item.authId} - ${item.varietyName} (${item.applicantOrgName})`"
                        :value="item.authId"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.cropType')" prop="cropType">
                    <el-select v-model="formData.cropType" :placeholder="$t('research.c1BreedingBatch.placeholder.cropType')" style="width: 100%" disabled>
                      <el-option
                        v-for="item in cropTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" :placeholder="$t('research.c1BreedingBatch.placeholder.varietyName')" clearable disabled/>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.plantingArea')">
                    <el-input v-model.number="formData.plantingArea" :placeholder="$t('research.c1BreedingBatch.placeholder.plantingArea')" type="number" clearable />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.startDate')" prop="startDate">
                    <el-date-picker
                      v-model="formData.startDate"
                      type="date"
                      :placeholder="$t('research.c1BreedingBatch.placeholder.startDate')"
                      value-format="YYYY-MM-DD"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.endDate')">
                    <el-date-picker
                      v-model="formData.endDate"
                      type="date"
                      :placeholder="$t('research.c1BreedingBatch.placeholder.endDate')"
                      value-format="YYYY-MM-DD"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.expectedYield')">
                    <el-input v-model.number="formData.expectedYield" :placeholder="$t('research.c1BreedingBatch.placeholder.expectedYield')" type="number" clearable />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.quantityToMultiply')">
                    <el-input v-model.number="formData.quantityToMultiply" :placeholder="$t('common.pleaseEnter')" type="number" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 机构信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('research.c1BreedingBatch.form.orgInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.orgType')">
                    <el-select v-model="formData.orgType" :placeholder="$t('common.pleaseSelect')" style="width: 100%">
                      <el-option label="Union" value="union" />
                      <el-option label="OSE" value="ose" />
                      <el-option label="Cooperative" value="cooperative" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.form.orgName')">
                    <el-input v-model="formData.orgName" :placeholder="$t('research.c1BreedingBatch.placeholder.orgName')" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 备注卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('common.remarks') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item :label="$t('common.remarks')">
                    <el-input v-model="formData.remark" type="textarea" :rows="4" :placeholder="$t('research.c1BreedingBatch.placeholder.remark')" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮区域 -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" :loading="loading" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getC1BreedingBatchById, addC1BreedingBatch, updateC1BreedingBatch, getApprovedPropagations } from '@/api/c1BreedingBatch'
import { useUserStore } from '@/store/user'
import { getUserOrgName, getUserOrgId } from '@/utils/auth'
import { loadSeedCropTypeOptions, resolveCropTypeValue, resolveCropTypeLabel } from '@/utils/researchCropType'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()

const cropTypeOptions = ref([])

const formRef = ref(null)
const loading = ref(false)
const propagationList = ref([])
const userStore = useUserStore()

const isEdit = computed(() => !!route.params.id)

const formData = ref({
  propagationId: '',
  cropType: '',
  varietyName: '',
  varietyCode: '',
  breedingLevel: '',
  breedingMethod: '',
  parentSeedSource: '',
  startDate: '',
  endDate: '',
  expectedYield: '',
  actualYield: '',
  quantityToMultiply: '',
  plantingArea: '',
  orgId: '',
  orgName: '',
  orgType: '',
  location: '',
  remark: ''
})

const rules = computed(() => ({
  cropType: [{ required: true, message: t('research.c1BreedingBatch.rules.cropTypeRequired'), trigger: 'change' }],
  varietyName: [{ required: true, message: t('research.c1BreedingBatch.rules.varietyNameRequired'), trigger: 'blur' }],
  breedingLevel: [{ required: true, message: t('research.c1BreedingBatch.rules.breedingLevelRequired'), trigger: 'change' }],
  startDate: [{ required: true, message: t('research.c1BreedingBatch.rules.startDateRequired'), trigger: 'change' }]
}))

// 初始化
onMounted(async () => {
  // 从用户信息自动填充组织信息
  const userInfo = userStore.userInfo?.user || {}
  formData.value.orgId = getUserOrgId()
  formData.value.orgName = getUserOrgName()
  
  cropTypeOptions.value = await loadSeedCropTypeOptions(locale.value).catch(() => [])
  await loadPropagations()
  if (isEdit.value) {
    await loadDetail()
  }
})

// 加载已审核通过的申请列表
const loadPropagations = async () => {
  try {
    const response = await getApprovedPropagations()
    if (response.code === 200 && response.data) {
      propagationList.value = response.data
    }
  } catch (error) {
    console.error('Failed to load propagations:', error)
  }
}

// 当选择批次号时自动填充信息
const handlePropagationChange = (authId) => {
  const selected = propagationList.value.find(item => item.authId === authId)
  if (selected) {
    formData.value.cropType = resolveCropTypeValue(cropTypeOptions.value, selected.cropType || formData.value.cropType)
    formData.value.varietyName = selected.varietyName || formData.value.varietyName
    formData.value.varietyCode = selected.varietyCode || formData.value.varietyCode
    formData.value.orgName = selected.applicantOrgName || formData.value.orgName
    formData.value.orgId = selected.applicantOrgId || formData.value.orgId
    formData.value.orgType = selected.applicantOrgType || formData.value.orgType
  }
}

// 加载详情
const loadDetail = async () => {
  try {
    const response = await getC1BreedingBatchById(route.params.id)
    if (response.code === 200 && response.data) {
      formData.value = {
        ...formData.value,
        ...response.data,
        cropType: resolveCropTypeValue(cropTypeOptions.value, response.data.cropType)
      }
    } else {
      ElMessage.error(t('research.c1BreedingBatch.messages.loadError'))
    }
  } catch (error) {
    ElMessage.error(t('research.c1BreedingBatch.messages.loadError'))
    console.error(error)
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const data = {
          ...(isEdit.value ? { id: route.params.id } : {}),
          ...formData.value,
          cropType: resolveCropTypeLabel(cropTypeOptions.value, formData.value.cropType)
        }
        const response = isEdit.value ? await updateC1BreedingBatch(data) : await addC1BreedingBatch(data)

        if (response.code === 200) {
          ElMessage.success(isEdit.value ? t('research.c1BreedingBatch.messages.updateSuccess') : t('research.c1BreedingBatch.messages.addSuccess'))
          router.back()
        } else {
          ElMessage.error(response.msg || t('common.submitFailed'))
        }
      } catch (error) {
        ElMessage.error(t('common.submitFailed'))
        console.error(error)
      } finally {
        loading.value = false
      }
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}
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
