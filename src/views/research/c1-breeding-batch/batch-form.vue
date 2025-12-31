<template>
  <div class="batch-form-page">
    <!-- 页面头部 -->
    <div class="page-header">
        <div class="header-left">
        <div class="back-btn" link @click="goBack">
            <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </div>
      </div>
      <div class="header-content">
        <h1 class="page-title">{{ isEdit ? $t('research.c1BreedingBatch.edit') : $t('research.c1BreedingBatch.add') }}
        </h1>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="batch-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('research.c1BreedingBatch.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <!-- 批次号选择 -->
            <el-form-item :label="$t('research.c1BreedingBatch.form.linkedBatchNo')" prop="propagationId" class="full-width-item">
              <el-select 
                v-model="formData.propagationId" 
                :placeholder="$t('research.c1BreedingBatch.placeholder.linkedBatchNo')"
                class="full-width"
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

            <el-form-item :label="$t('research.c1BreedingBatch.form.cropType')" prop="cropType">
              <el-select v-model="formData.cropType" :placeholder="$t('research.c1BreedingBatch.placeholder.cropType')" class="full-width" disabled>
                <el-option
                  v-for="item in options.crop_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.form.varietyName')" prop="varietyName">
              <el-input v-model="formData.varietyName" :placeholder="$t('research.c1BreedingBatch.placeholder.varietyName')" clearable  disabled/>
            </el-form-item>

            <!-- <el-form-item :label="$t('research.c1BreedingBatch.form.breedingMethod')">
              <el-select v-model="formData.breedingMethod" :placeholder="$t('research.c1BreedingBatch.placeholder.breedingMethod')" class="full-width">
                <el-option label="Hybridization" value="hybridization" />
                <el-option label="Selection" value="selection" />
                <el-option label="Mutation" value="mutation" />
                <el-option label="Other" value="other" />
              </el-select>
            </el-form-item> -->

            <!-- <el-form-item :label="$t('research.c1BreedingBatch.form.parentSeedSource')" class="full-width-item">
              <el-input v-model="formData.parentSeedSource" :placeholder="$t('research.c1BreedingBatch.placeholder.parentSeedSource')" clearable />
            </el-form-item> -->

              <el-form-item :label="$t('research.c1BreedingBatch.form.plantingArea')">
              <el-input v-model.number="formData.plantingArea" :placeholder="$t('research.c1BreedingBatch.placeholder.plantingArea')" type="number" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.form.startDate')" prop="startDate">
              <el-date-picker
                v-model="formData.startDate"
                type="date"
                :placeholder="$t('research.c1BreedingBatch.placeholder.startDate')"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.form.endDate')">
              <el-date-picker
                v-model="formData.endDate"
                type="date"
                :placeholder="$t('research.c1BreedingBatch.placeholder.endDate')"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.form.expectedYield')">
              <el-input v-model.number="formData.expectedYield" :placeholder="$t('research.c1BreedingBatch.placeholder.expectedYield')" type="number" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.form.quantityToMultiply')">
              <el-input v-model.number="formData.quantityToMultiply" :placeholder="$t('common.pleaseEnter')" type="number" clearable />
            </el-form-item>


            <!-- <el-form-item :label="$t('research.c1BreedingBatch.form.location')" class="full-width-item">
              <el-input v-model="formData.location" :placeholder="$t('research.c1BreedingBatch.placeholder.location')" clearable />
            </el-form-item> -->
          </div>
        </div>

        <!-- 机构信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-building-line"></i>
            <h3>{{ $t('research.c1BreedingBatch.form.orgInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.c1BreedingBatch.form.orgType')">
              <el-select v-model="formData.orgType" :placeholder="$t('common.pleaseSelect')" class="full-width">
                <el-option label="Union" value="union" />
                <el-option label="OSE" value="ose" />
                <el-option label="Cooperative" value="cooperative" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.form.orgName')">
              <el-input v-model="formData.orgName" :placeholder="$t('research.c1BreedingBatch.placeholder.orgName')" disabled />
            </el-form-item>
          </div>
        </div>

        <!-- 备注 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-file-text-line"></i>
            <h3>{{ $t('common.remarks') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('common.remarks')" class="full-width-item">
              <el-input v-model="formData.remark" type="textarea" :rows="4" :placeholder="$t('research.c1BreedingBatch.placeholder.remark')" clearable />
            </el-form-item>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="loading" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </div>
      </el-form>
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
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { options } = useDict(['crop_type'])

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
  formData.value.orgId = userInfo.organCode || userInfo.ORGAN_CODE || ''
  formData.value.orgName = userInfo.organName || userInfo.ORGAN_NAME || ''
  
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
    formData.value.cropType = selected.cropType || formData.value.cropType
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
        ...response.data
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
        const data = isEdit.value ? { id: route.params.id, ...formData.value } : formData.value
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

<style scoped lang="scss">

.form-wrapper {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .form-block {
    margin-bottom: 30px;

    &:last-of-type {
      margin-bottom: 0;
    }

    .block-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #009A44;

      i {
        font-size: 20px;
        color: #009A44;
        margin-right: 10px;
      }

      h3 {
        margin: 0;
        font-size: 16px;
        color: #333;
        font-weight: 600;
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .full-width-item {
        grid-column: 1 / -1;
      }

      :deep(.el-form-item) {
        margin-bottom: 0;
      }
    }
  }

  .form-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #f0f0f0;

    button {
      min-width: 120px;
    }
  }
}

.full-width {
  width: 100%;
}
</style>
