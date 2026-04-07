<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('batchCollection.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="180px"
          class="collection-form"
          v-loading="submitting"
        >

          <!-- 批次信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ $t('batchCollection.form.batchInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24">
                  <el-form-item
                    :label="$t('batchCollection.form.breedingBatchId')"
                    prop="breedingBatchId"
                    label-width="220px"
                  >
                    <el-select
                      v-model="formData.breedingBatchId"
                      :placeholder="$t('batchCollection.placeholder.breedingBatchId')"
                      filterable
                      clearable
                      class="full-width"
                      @change="handleBatchChange"
                    >
                      <el-option
                        v-for="batch in breedingBatchList"
                        :key="batch.id"
                        :label="`${batch.batchId} - ${batch.varietyName} (${batch.breedingLevel})`"
                        :value="batch.id"
                      >
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <span>{{ batch.batchId }}</span>
                          <span style="color: #606266; font-size: 13px; margin: 0 8px;">{{ batch.varietyName }}</span>
                          <el-tag size="small" type="success">{{ batch.breedingLevel }}</el-tag>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('batchCollection.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('batchCollection.form.cropType')" prop="cropType">
                    <el-input v-model="cropTypeLabel" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24">
                  <el-form-item
                    :label="$t('batchCollection.form.breedingLevel')"
                    prop="breedingLevel"
                    label-width="220px"
                  >
                    <el-input v-model="formData.breedingLevel" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item
                    :label="$t('batchCollection.form.parentalSeedSource')"
                    prop="parentalSeedSource"
                  >
                    <el-input v-model="formData.parentalSeedSource" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 采集数据卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-scales-3-line"></i>
                <span>{{ $t('batchCollection.form.collectionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24">
                  <el-form-item
                    :label="$t('batchCollection.form.toMultiplyQuantity')"
                    prop="toMultiplyQuantity"
                    label-width="220px"
                  >
                    <el-input-number
                      v-model="formData.toMultiplyQuantity"
                      :min="0"
                      :precision="2"
                      style="width: 100%"
                      :placeholder="$t('batchCollection.placeholder.toMultiplyQuantity')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('batchCollection.form.operator')">
                    <el-input v-model="operatorName" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('batchCollection.form.collectionDate')" prop="collectionDate">
                    <el-date-picker
                      v-model="formData.collectionDate"
                      type="datetime"
                      :placeholder="$t('batchCollection.placeholder.collectionDate')"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('common.remarks')" prop="remark">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="4"
                      :placeholder="$t('batchCollection.placeholder.remark')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮区域 -->
          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
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
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { addOseBatchCollection, getBreedingBatchPageList } from '@/api/breeding'
import { useUserStore } from '@/store'
import { loadSeedCropTypeOptions, resolveCropTypeValue, resolveCropTypeLabel, getCropTypeDisplay } from '@/utils/researchCropType'

const { t, locale } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const cropTypeOptions = ref([])

const operatorName = computed(() => {
  const info = userStore.userInfo
  const user = info.user || info
  return user?.nickName || user?.userName || user?.name || '-'
})

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return getCropTypeDisplay(cropTypeOptions.value, formData.cropType)
})

const formRef = ref(null)
const submitting = ref(false)
const breedingBatchList = ref([])

const formData = reactive({
  breedingBatchId: '', // 数据库ID (用于选择)
  actualBatchId: '', // 实际的批次ID (如 BB20251231000001，用于保存)
  varietyName: '',
  cropType: '',
  breedingLevel: '',
  parentalSeedSource: '',
  toMultiplyQuantity: null,
  collectionDate: new Date(),
  remark: ''
})

const rules = computed(() => ({
  breedingBatchId: [
    { required: true, message: t('batchCollection.rules.breedingBatchIdRequired'), trigger: 'change' }
  ],
  toMultiplyQuantity: [
    { required: true, message: t('batchCollection.rules.toMultiplyQuantityRequired'), trigger: 'blur' },
    { type: 'number', min: 0, message: t('batchCollection.rules.toMultiplyQuantityMin'), trigger: 'blur' }
  ],
  collectionDate: [
    { required: true, message: t('batchCollection.rules.collectionDateRequired'), trigger: 'change' }
  ]
}))

const loadBreedingBatchList = async () => {
  try {
    const res = await getBreedingBatchPageList({
      pageNum: 1,
      pageSize: 1000
    })
    if (res.code === 200) {
      // 只保留 Pre-Basic 等级的繁殖批次（Basic 等级的种子已经扩繁完成）
      const allRecords = res.data?.records || []
      breedingBatchList.value = allRecords
    }
  } catch (error) {
    console.error('Failed to load breeding batches:', error)
  }
}

const handleBatchChange = (batchId) => {
  // 清空相关字段
  formData.varietyName = ''
  formData.cropType = ''
  formData.breedingLevel = ''
  formData.parentalSeedSource = ''

  if (!batchId) {
    return
  }

  // 根据选中的批次ID查找对应的批次信息
  const selectedBatch = breedingBatchList.value.find(
    item => item.id === batchId
  )

  if (selectedBatch) {
    formData.varietyName = selectedBatch.varietyName || ''
    formData.cropType = resolveCropTypeValue(cropTypeOptions.value, selectedBatch.cropType || '')
    formData.breedingLevel = selectedBatch.breedingLevel || ''
    formData.parentalSeedSource = selectedBatch.parentSeedSource || ''
    // 保存实际的 batchId (如 BB20251231000001) 而不是数据库id
    formData.actualBatchId = selectedBatch.batchId || ''
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    // Format date manually to YYYY-MM-DD HH:mm:ss
    const date = new Date(formData.collectionDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    const submitData = {
      breedingBatchId: formData.actualBatchId, // 使用实际的批次ID
      varietyName: formData.varietyName,
      cropType: resolveCropTypeLabel(cropTypeOptions.value, formData.cropType),
      breedingLevel: formData.breedingLevel,
      parentalSeedSource: formData.parentalSeedSource,
      toMultiplyQuantity: formData.toMultiplyQuantity,
      collectionDate: formattedDate,
      operator: operatorName.value,
      remark: formData.remark
    }

    const res = await addOseBatchCollection(submitData)
    if (res.code === 200) {
      ElMessage.success(t('common.submitSuccess'))
      router.push({ name: 'OseBatchCollection' })
    }
  } catch (error) {
    console.error('Submit failed', error)
    if (error !== false) ElMessage.error(t('common.submitFailed'))
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  loadSeedCropTypeOptions(locale.value).then((options) => {
    cropTypeOptions.value = options
    loadBreedingBatchList()
  }).catch((error) => {
    console.error('Failed to load crop type options:', error)
    loadBreedingBatchList()
  })
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';

.content-wrapper {
  padding-top: 24px;
}

.collection-form {
  .card-body {
    padding: 24px;
  }

  :deep(.el-form-item) {
    margin-bottom: 20px;
    align-items: flex-start;
  }

  :deep(.el-form-item__label-wrap) {
    margin-right: 16px;
  }

  :deep(.el-form-item__label) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 40px;
    height: auto;
    line-height: 1.4;
    white-space: nowrap;
    text-align: right;
    color: #303133;
    font-weight: 600;
  }

  :deep(.el-form-item__content) {
    flex: 1;
    min-width: 0;
    line-height: 1;
  }

  :deep(.el-input),
  :deep(.el-select),
  :deep(.el-date-editor),
  :deep(.el-input-number) {
    width: 100%;
  }

  :deep(.el-input-number .el-input__wrapper),
  :deep(.el-select .el-select__wrapper),
  :deep(.el-input__wrapper),
  :deep(.el-textarea__inner) {
    border-radius: 10px;
  }

  :deep(.el-input.is-disabled .el-input__wrapper),
  :deep(.el-textarea.is-disabled .el-textarea__inner) {
    background-color: #f7f9fc;
    color: #606266;
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 28px;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #f0f2f5;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.full-width {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .content-wrapper {
    padding: 16px;
    padding-top: 20px;
  }

  .collection-form {
    .card-body {
      padding: 16px;
    }

    :deep(.el-form-item) {
      margin-bottom: 16px;
    }

    :deep(.el-form-item__label-wrap) {
      margin-right: 12px;
      width: 160px !important;
    }

    :deep(.el-form-item__label) {
      min-height: 36px;
      font-size: 13px;
    }
  }

  .form-actions {
    padding: 20px 16px;
  }
}
</style>
