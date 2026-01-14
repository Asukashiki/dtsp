<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.c1Propagation.edit') : $t('research.c1Propagation.add') }}
            </h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper" v-loading="loading">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="160px"
          label-position="right"
        >
          <!-- 机构信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-building-line"></i>
                {{ $t('research.c1Propagation.form.basicInfo') }}
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.applicantOrgType')" prop="applicantOrgType">
                    <el-select v-model="formData.applicantOrgType"
                      :placeholder="$t('research.c1Propagation.placeholder.applicantOrgType')" style="width: 100%"
                      @change="handleOrgTypeChange">
                      <el-option label="Union" value="union" />
                      <el-option label="OSE" value="ose" />
                      <el-option label="Private Multiplier" value="privateMultiplier" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.applicantOrgName')" prop="applicantOrgName">
                    <el-input v-model="formData.applicantOrgName"
                      :placeholder="$t('research.c1Propagation.placeholder.applicantOrgName')" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.applicantOrgId')" prop="applicantOrgId">
                    <el-input v-model="formData.applicantOrgId"
                      :placeholder="$t('research.c1Propagation.placeholder.applicantOrgId')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 繁殖信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-plant-line"></i>
                {{ $t('research.c1Propagation.form.propagationInfo') }}
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.propagationBatchId')" prop="propagationBatchId">
                    <BasicSeedSelector ref="seedSelectorRef" v-model="formData.propagationBatchId"
                      :placeholder="$t('research.c1Propagation.selectBasicSeed')" @seed-selected="handleSeedSelected" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.cropType')" prop="cropType">
                    <el-select v-model="formData.cropType"
                      :placeholder="$t('research.c1Propagation.placeholder.cropType')" disabled style="width: 100%">
                      <el-option v-for="item in options.crop_type" :key="item.value" :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName"
                      :placeholder="$t('research.c1Propagation.placeholder.varietyName')" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.applyDate')">
                    <el-date-picker v-model="formData.applyDate" type="date"
                      :placeholder="$t('research.c1Propagation.placeholder.applyDate')" format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD" style="width: 100%" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('research.c1Propagation.form.applyDescription')">
                    <el-input v-model="formData.applyDescription" type="textarea" :rows="4"
                      :placeholder="$t('research.c1Propagation.placeholder.applyDescription')" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.demandQuantity')" prop="demandQuantity">
                    <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <el-input-number v-model="formData.demandQuantity"
                          :placeholder="$t('research.c1Propagation.placeholder.demandQuantity')" controls-position="right"
                          style="flex: 1; min-width: 150px;" :min="1"
                          :max="selectedSeed ? maxAvailableQuantity : undefined" :disabled="!selectedSeed" />
                        <span v-if="selectedSeed"
                          style="color: #909399; font-size: 14px; white-space: nowrap;">
                          kg
                        </span>
                        <span v-else style="color: #f56c6c; font-size: 14px;">
                          {{ $t('research.c1Propagation.selectBasicSeed') }}
                        </span>
                      </div>
                      <span v-if="selectedSeed"
                        style="color: #67c23a; font-weight: 500; font-size: 13px;">
                        {{ $t('research.c1Propagation.maxAvailable') }}: {{ maxAvailableQuantity }} kg
                      </span>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.fromSeedType')" prop="fromSeedType">
                    <el-select v-model="formData.fromSeedType"
                      :placeholder="$t('research.c1Propagation.placeholder.fromSeedType')" style="width: 100%">
                      <el-option label="Pre-Basic" value="Pre-Basic" />
                      <el-option label="Basic" value="Basic" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item :label="$t('research.c1Propagation.form.toSeedType')" prop="toSeedType">
                    <el-select v-model="formData.toSeedType"
                      :placeholder="$t('research.c1Propagation.placeholder.toSeedType')" style="width: 100%">
                      <el-option label="Basic" value="Basic" />
                      <el-option label="C1" value="C1" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
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
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getC1PropagationById, addC1Propagation, updateC1Propagation } from '@/api/c1Propagation'
import { getUserOrgName, getUserOrgId } from '@/utils/auth'
import { useDict } from '@/hooks/useDict'
import BasicSeedSelector from './BasicSeedSelector.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { options } = useDict(['crop_type'])

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单状态
const formRef = ref(null)
const seedSelectorRef = ref(null)
const submitting = ref(false)
const loading = ref(false)
const selectedSeed = ref(null)
const maxAvailableQuantity = ref(999999) // 初始化为一个大值,避免 min > max 错误

// 表单数据
const formData = reactive({
  id: '',
  applicantOrgType: '',
  applicantOrgName: '',
  applicantOrgId: '',
  propagationBatchId: '',
  sourceType: '', // 新增:数据来源类型
  cropType: '',
  varietyName: '',
  varietyCode: '',
  species: '',
  applyDate: '',
  applyDescription: '',
  demandQuantity: null,
  fromSeedType: 'Basic', // 默认为 Basic
  toSeedType: 'C1' // 默认为 C1
})

// 表单验证规则
const rules = computed(() => ({
  applicantOrgType: [
    { required: true, message: t('research.c1Propagation.rules.applicantOrgTypeRequired'), trigger: 'change' }
  ],
  applicantOrgName: [
    { required: true, message: t('research.c1Propagation.rules.applicantOrgNameRequired'), trigger: 'blur' }
  ],
  applicantOrgId: [
    { required: true, message: t('research.c1Propagation.rules.applicantOrgIdRequired'), trigger: 'blur' }
  ],
  propagationBatchId: [
    { required: true, message: t('research.c1Propagation.rules.propagationBatchIdRequired'), trigger: 'change' }
  ],
  cropType: [
    { required: true, message: t('research.c1Propagation.rules.cropTypeRequired'), trigger: 'change' }
  ],
  varietyName: [
    { required: true, message: t('research.c1Propagation.rules.varietyNameRequired'), trigger: 'blur' }
  ],
  demandQuantity: [
    { required: true, message: t('research.c1Propagation.rules.demandQuantityRequired'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error(t('research.c1Propagation.rules.demandQuantityRequired')))
        } else if (value < 1) {
          callback(new Error(t('research.c1Propagation.rules.demandQuantityMinRequired')))
        } else if (selectedSeed.value && value > maxAvailableQuantity.value) {
          callback(new Error(t('research.c1Propagation.rules.demandQuantityExceedMax', { max: maxAvailableQuantity.value })))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  fromSeedType: [
    { required: true, message: t('research.c1Propagation.rules.fromSeedTypeRequired'), trigger: 'change' }
  ],
  toSeedType: [
    { required: true, message: t('research.c1Propagation.rules.toSeedTypeRequired'), trigger: 'change' }
  ]
}))

// 处理种子选择
const handleSeedSelected = (seed) => {
  selectedSeed.value = seed

  if (seed) {
    // 提取 batchId 和 sourceType
    const [batchId, sourceType] = formData.propagationBatchId.split('|')

    // 更新表单数据
    formData.propagationBatchId = batchId
    formData.sourceType = sourceType
    formData.cropType = seed.cropType || ''
    formData.varietyName = seed.varietyName || ''
    formData.varietyCode = seed.varietyCode || ''

    // 设置最大可用数量
    maxAvailableQuantity.value = seed.availableQuantity || 0

    // 如果当前需求数量超过可用数量,自动调整
    if (formData.demandQuantity && formData.demandQuantity > maxAvailableQuantity.value) {
      formData.demandQuantity = maxAvailableQuantity.value
    }
  } else {
    // 清空选择
    formData.propagationBatchId = ''
    formData.sourceType = ''
    formData.cropType = ''
    formData.varietyName = ''
    formData.varietyCode = ''
    maxAvailableQuantity.value = 999999 // 重置为大值
    formData.demandQuantity = null
  }
}

// 加载详情数据(编辑模式)
const getInfo = async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const res = await getC1PropagationById(route.params.id)
    if (res.code === 200 && res.data) {
      Object.keys(formData).forEach(key => {
        if (res.data[key] !== undefined) {
          formData[key] = res.data[key]
        }
      })

      // 如果是编辑模式,需要组合 batchId 和 sourceType
      if (res.data.propagationBatchId && res.data.sourceType) {
        formData.propagationBatchId = `${res.data.propagationBatchId}|${res.data.sourceType}`

        // 标记为已选择种子,避免输入框被禁用
        selectedSeed.value = {
          batchId: res.data.propagationBatchId,
          sourceType: res.data.sourceType
        }
      }
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = { ...formData }

    // 确保 batchId 和 sourceType 正确分离
    if (submitData.propagationBatchId && submitData.propagationBatchId.includes('|')) {
      const [batchId, sourceType] = submitData.propagationBatchId.split('|')
      submitData.propagationBatchId = batchId
      submitData.sourceType = sourceType
    }

    let res
    if (isEdit.value) {
      res = await updateC1Propagation(submitData)
    } else {
      res = await addC1Propagation(submitData)
    }

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('research.c1Propagation.updateSuccess') : t('research.c1Propagation.addSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.submitFailed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 机构类型变更时自动填充机构名称与ID(使用当前登录用户信息)
const handleOrgTypeChange = (value) => {
    formData.applicantOrgName = getUserOrgName()
    formData.applicantOrgId = getUserOrgId()
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  getInfo()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>

