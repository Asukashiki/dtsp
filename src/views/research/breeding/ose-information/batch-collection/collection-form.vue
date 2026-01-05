<template>
  <div class="breeding-batch-form-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-left">
        <div class="back-btn" @click="handleCancel">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </div>
      </div>
      <div class="header-content">
        <h1 class="page-title">{{ $t('batchCollection.add') }}</h1>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="breeding-batch-form">
        <!-- 批次信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-seedling-line"></i>
            <h3>{{ $t('batchCollection.form.batchInfo') }}</h3>
          </div>
          <div class="form-grid">
            <!-- Breeding Batch ID -->
            <el-form-item
              :label="$t('batchCollection.form.breedingBatchId')"
              prop="breedingBatchId"
              class="full-width-item"
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

            <!-- Variety Name -->
            <el-form-item :label="$t('batchCollection.form.varietyName')" prop="varietyName">
              <el-input v-model="formData.varietyName" disabled />
            </el-form-item>

            <!-- Crop Type -->
            <el-form-item :label="$t('batchCollection.form.cropType')" prop="cropType">
              <el-input v-model="cropTypeLabel" disabled />
            </el-form-item>

            <!-- Breeding Level -->
            <el-form-item :label="$t('batchCollection.form.breedingLevel')" prop="breedingLevel">
              <el-input v-model="formData.breedingLevel" disabled />
            </el-form-item>

            <!-- Parental Seed Source -->
            <el-form-item
              :label="$t('batchCollection.form.parentalSeedSource')"
              prop="parentalSeedSource"
              class="full-width-item"
            >
              <el-input v-model="formData.parentalSeedSource" disabled />
            </el-form-item>
          </div>
        </div>

        <!-- 采集数据 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-scales-3-line"></i>
            <h3>{{ $t('batchCollection.form.collectionInfo') }}</h3>
          </div>
          <div class="form-grid">
            <!-- To Multiply Quantity -->
            <el-form-item :label="$t('batchCollection.form.toMultiplyQuantity')" prop="toMultiplyQuantity">
              <el-input-number
                v-model="formData.toMultiplyQuantity"
                :min="0"
                :precision="2"
                style="width: 100%"
                :placeholder="$t('batchCollection.placeholder.toMultiplyQuantity')"
              />
            </el-form-item>

            <!-- Operator -->
            <el-form-item :label="$t('batchCollection.form.operator')">
              <el-input v-model="operatorName" disabled />
            </el-form-item>

            <!-- Collection Date -->
            <el-form-item :label="$t('batchCollection.form.collectionDate')" prop="collectionDate">
              <el-date-picker
                v-model="formData.collectionDate"
                type="datetime"
                :placeholder="$t('batchCollection.placeholder.collectionDate')"
                style="width: 100%"
              />
            </el-form-item>

            <!-- Remarks -->
            <el-form-item :label="$t('common.remarks')" prop="remark" class="full-width-item">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="4"
                :placeholder="$t('batchCollection.placeholder.remark')"
              />
            </el-form-item>
          </div>
        </div>

        <!-- 表单操作 -->
        <div class="form-actions">
          <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
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
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

// 使用 useDict 获取作物类型字典
const { getLabelByValue } = useDict(['crop_type'])

const operatorName = computed(() => {
  const info = userStore.userInfo
  const user = info.user || info
  return user?.nickName || user?.userName || user?.name || '-'
})

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return formData.cropType ? getLabelByValue('crop_type', formData.cropType) : ''
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
      breedingBatchList.value = allRecords.filter(batch => batch.breedingLevel === 'Pre-Basic')
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
    formData.cropType = selectedBatch.cropType || ''
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
      cropType: formData.cropType,
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
  loadBreedingBatchList()
})
</script>

<style scoped lang="scss">
/* ========== 表单区域 ========== */
.form-wrapper {
  margin: 0 auto;
  padding: 0 32px 32px;
  background: white;
  border-radius: 16px;
}

.breeding-batch-form {
  padding: 32px 0;
}

/* ========== 表单块 ========== */
.form-block {
  margin-bottom: 32px;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.block-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  border-left: 4px solid #009A44;
  border-radius: 4px;

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
  gap: 24px;

  .full-width-item {
    grid-column: 1 / -1;
  }

  :deep(.el-form-item) {
    margin-bottom: 0;
  }

  :deep(.el-form-item__label) {
    font-weight: 500;
    color: #606266;
    margin-bottom: 8px;
  }
}

.full-width {
  width: 100%;
}

/* ========== 表单操作 ========== */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  button {
    min-width: 120px;
    height: 40px;
  }
}

/* ========== 响应式设计 ========== */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 16px;
    margin-bottom: 16px;
    flex-direction: column;
    align-items: flex-start;
  }

  .header-left {
    width: 100%;
  }

  .header-content {
    text-align: left;
    padding-top: 12px;
  }

  .page-title {
    font-size: 20px;
  }

  .form-wrapper {
    padding: 0 16px 16px;
    margin: 0 16px;
    border-radius: 12px;
  }

  .breeding-batch-form {
    padding: 20px 0;
  }

  .form-block {
    margin-bottom: 24px;
  }

  .block-header {
    padding: 10px 12px;

    h3 {
      font-size: 15px;
    }
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .form-actions {
    flex-direction: column-reverse;
    padding-top: 20px;

    button {
      width: 100%;
    }
  }
}
</style>
