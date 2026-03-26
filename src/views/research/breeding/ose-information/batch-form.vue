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
            <h1 class="page-title">{{ isEdit ? $t('research.breeding.breedingBatch.edit') :
              $t('research.breeding.breedingBatch.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" v-loading="loading">

          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breeding.breedingBatch.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.distributionId')"
                    prop="distributionId">
                    <el-select v-model="formData.distributionId"
                      :placeholder="$t('research.breeding.breedingBatch.form.distributionIdPlaceholder')" filterable
                      clearable class="full-width" @change="handleDistributionIdChange">
                      <el-option v-for="item in confirmedDistributionList" :key="item.distributeId"
                        :label="item.distributeId" :value="item.distributeId" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.parentalSeedSource')"
                    prop="parentalSeedSource">
                    <el-select v-model="formData.parentalSeedSource"
                      :placeholder="$t('research.breeding.breedingBatch.form.parentalSeedSourcePlaceholder')" filterable
                      clearable class="full-width" :disabled="!formData.distributionId"
                      @change="handleParentalSeedSourceChange">
                      <el-option v-for="item in parentalSeedSourceOptions" :key="item.parentalSeedSource"
                        :label="item.produceBatchName || item.parentalSeedSource" :value="item.parentalSeedSource" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.cropType')" prop="cropType">
                    <el-input v-model="cropTypeLabel"
                      :placeholder="$t('research.breeding.breedingBatch.form.cropTypePlaceholder')" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName"
                      :placeholder="$t('research.breeding.breedingBatch.form.varietyNamePlaceholder')" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item label="Multiplication Level" prop="breedingLevel">
                    <el-input v-model="formData.breedingLevel" :placeholder="$t('common.pleaseSelect')" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.startDate')" prop="startDate">
                    <el-date-picker v-model="formData.startDate" type="date"
                      :placeholder="$t('research.breeding.breedingBatch.form.startDatePlaceholder')"
                      style="width: 100%" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.endDate')" prop="endDate">
                    <el-date-picker v-model="formData.endDate" type="date"
                      :placeholder="$t('research.breeding.breedingBatch.form.endDatePlaceholder')"
                      style="width: 100%" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.expectedYield')" prop="expectedYield">
                    <el-input v-model.number="formData.expectedYield"
                      :placeholder="$t('research.breeding.breedingBatch.form.expectedYieldPlaceholder')" type="number"
                      clearable />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.toMultiplyQuantity')"
                    prop="toMultiplyQuantity">
                    <el-input v-model.number="formData.toMultiplyQuantity"
                      :placeholder="$t('research.breeding.breedingBatch.form.toMultiplyQuantityPlaceholder')"
                      type="number" clearable />
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
                <span>{{ $t('research.breeding.breedingBatch.form.orgInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.orgId')" prop="orgId">
                    <el-input v-model="formData.orgId"
                      :placeholder="$t('research.breeding.breedingBatch.form.orgIdPlaceholder')" clearable disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.breedingBatch.form.orgName')" prop="orgName">
                    <el-input v-model="formData.orgName"
                      :placeholder="$t('research.breeding.breedingBatch.form.orgNamePlaceholder')" clearable />
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
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('common.remarks')" prop="remark">
                    <el-input v-model="formData.remark" type="textarea" :rows="4"
                      :placeholder="$t('research.breeding.breedingBatch.form.remarkPlaceholder')" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮区域 -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="loading">{{ $t('common.submit') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBreedingBatchPageDetail, addBreedingBatchPage, updateBreedingBatchPage } from '@/api/breeding'
import { getBreedSeedProduceList, getOseReceiveConfirmList } from '@/api/breedSeed'
import { useDict } from '@/hooks/useDict'
import { getUserOrgName, getUserOrgId } from '@/utils/auth'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const loading = ref(false)
const breedSeedProduceList = ref([])
const confirmedDistributionList = ref([])
const parentalSeedSourceOptions = ref([])
const { getLabelByValue } = useDict(['crop_type'])

const isEdit = computed(() => !!route.params.id)

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return formData.value.cropType ? getLabelByValue('crop_type', formData.value.cropType) : ''
})

const formData = ref({
  distributionId: '',
  cropType: '',
  varietyName: '',
  breedingLevel: '',
  parentalSeedSource: '',
  startDate: '',
  endDate: '',
  expectedYield: '',
  toMultiplyQuantity: '',
  orgId: '',
  orgName: '',
  remark: ''
})

const rules = {
  distributionId: [{ required: true, message: 'Please select the distribution ID', trigger: 'change' }],
  parentalSeedSource: [{ required: true, message: 'Please select the parental seed source', trigger: 'change' }],
  cropType: [{ required: true, message: 'Crop type is required', trigger: 'blur' }],
  varietyName: [{ required: true, message: 'Variety name is required', trigger: 'blur' }],
  breedingLevel: [{ required: true, message: 'Breeding level is required', trigger: 'change' }],
  startDate: [{ required: true, message: 'Start date is required', trigger: 'change' }],
  toMultiplyQuantity: [{ required: true, message: 'Quantity to multiply is required', trigger: 'blur' }]
}

// 加载育种家种子生产列表
const loadBreedSeedProduceList = async () => {
  try {
    const response = await getBreedSeedProduceList({
      pageNum: 1,
      pageSize: 1000,
      produceStatus: 'FINISHED' // 只获取已完成的生产数据
    })
    if (response.code === 200 && response.rows) {
      breedSeedProduceList.value = response.rows
    }
  } catch (error) {
    console.error('Failed to load breed seed produce list:', error)
  }
}

// 加载已确认的接收记录列表
const loadConfirmedDistributionList = async () => {
  try {
    const response = await getOseReceiveConfirmList({
      pageNum: 1,
      pageSize: 1000,
      receiveStatus: 'CONFIRMED' // 只获取已确认的接收记录
    })
    if (response.code === 200 && response.rows) {
      confirmedDistributionList.value = response.rows
    }
  } catch (error) {
    console.error('Failed to load confirmed distribution list:', error)
  }
}

// 处理Distribution ID变化
const handleDistributionIdChange = (value) => {
  console.log('Distribution ID changed:', value)

  // 清空parentalSeedSource相关字段
  formData.value.parentalSeedSource = ''
  formData.value.cropType = ''
  formData.value.varietyName = ''
  parentalSeedSourceOptions.value = []

  if (!value) {
    return
  }

  // 根据选中的distributeId查找对应的接收记录
  const selectedDistribution = confirmedDistributionList.value.find(
    item => item.distributeId === value
  )

  console.log('Selected distribution:', selectedDistribution)

  if (selectedDistribution && selectedDistribution.distributeDetail?.detailList) {
    // 从detailList中提取并去重parentalSeedSource选项
    // 只保留 Pre-Basic 等级的种子（Basic 等级的种子已经扩繁完成）
    const detailList = selectedDistribution.distributeDetail.detailList
    const uniqueOptions = []
    const seenBatches = new Set()

    detailList.forEach(detail => {


      // Use breedSeedProduceBatchId as the unique key and display value
      const batchId = detail.breedSeedProduceBatchId
      if (batchId && !seenBatches.has(batchId)) {
        seenBatches.add(batchId)
        uniqueOptions.push({
          parentalSeedSource: batchId, // Use batch ID as parental seed source
          varietyName: detail.varietyName,
          cropType: detail.cropType,
          seedType: detail.seedType,
          produceBatchId: batchId,
          produceBatchName: detail.produceBatchName || batchId
        })
      }
    })

    parentalSeedSourceOptions.value = uniqueOptions
    console.log('Parental seed source options:', uniqueOptions)

    // 如果只有一个选项，自动选择
    if (uniqueOptions.length === 1) {
      formData.value.parentalSeedSource = uniqueOptions[0].parentalSeedSource
      formData.value.cropType = uniqueOptions[0].cropType || ''
      formData.value.varietyName = uniqueOptions[0].varietyName || ''
      formData.value.breedingLevel = uniqueOptions[0].seedType || ''
    }
  }
}

// 处理Parental Seed Source变化
const handleParentalSeedSourceChange = (value) => {
  console.log('Parental seed source changed:', value)

  if (!value) {
    // 如果清空选择，则清空cropType、varietyName和breedingLevel
    formData.value.cropType = ''
    formData.value.varietyName = ''
    formData.value.breedingLevel = ''
    console.log('Cleared cropType, varietyName and breedingLevel')
    return
  }

  // 根据选中的parentalSeedSource查找对应的数据
  const selectedItem = parentalSeedSourceOptions.value.find(
    item => item.parentalSeedSource === value
  )

  console.log('Selected item:', selectedItem)

  if (selectedItem) {
    // 自动填充cropType、varietyName和breedingLevel
    formData.value.cropType = selectedItem.cropType || ''
    formData.value.varietyName = selectedItem.varietyName || ''
    formData.value.breedingLevel = selectedItem.seedType || ''
    console.log('Updated formData:', {
      cropType: formData.value.cropType,
      varietyName: formData.value.varietyName,
      breedingLevel: formData.value.breedingLevel
    })
  } else {
    console.warn('No matching item found for value:', value)
  }
}

// 初始化
onMounted(async () => {
  // 默认填充机构信息
  formData.value.orgName = getUserOrgName()
  formData.value.orgId = getUserOrgId()

  // 并行加载数据
  await Promise.all([loadBreedSeedProduceList(), loadConfirmedDistributionList()])

  if (isEdit.value) {
    await loadDetail()
  }
})

// 加载详情
const loadDetail = async () => {
  try {
    const response = await getBreedingBatchPageDetail(route.params.id)
    if (response.code === 200 && response.data) {
      formData.value = {
        ...formData.value,
        ...response.data
      }
      // 如果是编辑模式，需要根据 distributionId 加载 parentalSeedSourceOptions
      if (formData.value.distributionId) {
        const currentParentalSeedSource = response.data.parentSeedSource || response.data.parentalSeedSource
        handleDistributionIdChange(formData.value.distributionId)
        // handleDistributionIdChange 会清空 parentalSeedSource，需要恢复
        formData.value.parentalSeedSource = currentParentalSeedSource
      }
    } else {
      ElMessage.error('Failed to load breeding batch detail')
    }
  } catch (error) {
    ElMessage.error('Failed to load breeding batch detail')
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
        // 兼容后端字段名 parentSeedSource
        const aData = { ...data, objective: formData.value.objective || '1', parentSeedSource: formData.value.parentalSeedSource }
        const response = isEdit.value ? await updateBreedingBatchPage(aData) : await addBreedingBatchPage(aData)

        if (response.code === 200) {
          ElMessage.success(isEdit.value ? 'Update successful' : 'Add successful')
          router.back();
        } else {
          ElMessage.error(response.msg || 'Operation failed')
        }
      } catch (error) {
        ElMessage.error('Operation failed')
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
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}

.full-width {
  width: 100%;
}
</style>
