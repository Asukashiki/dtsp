<template>
  <div class="breeding-batch-form-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ isEdit ? $t('research.breeding.breedingBatch.edit') : $t('research.breeding.breedingBatch.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="breeding-batch-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('research.breeding.breedingBatch.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.breeding.breedingBatch.form.parentSeedSource')" prop="parentSeedSource" class="full-width-item">
              <el-select
                v-model="formData.parentSeedSource"
                :placeholder="$t('research.breeding.breedingBatch.form.parentSeedSourcePlaceholder')"
                filterable
                clearable
                class="full-width"
                @change="handleParentSeedSourceChange"
              >
                <el-option
                  v-for="item in breedSeedProduceList"
                  :key="item.breedSeedProduceBatchId"
                  :label="`${item.varietyName} - ${item.breedBatchId} (${item.produceSeedQuantrity} kg)`"
                  :value="item.breedSeedProduceBatchId"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.breeding.breedingBatch.form.cropType')" prop="cropType">
              <el-input v-model="formData.cropType" :placeholder="$t('research.breeding.breedingBatch.form.cropTypePlaceholder')" readonly />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.varietyName')" prop="varietyName">
              <el-input v-model="formData.varietyName" :placeholder="$t('research.breeding.breedingBatch.form.varietyNamePlaceholder')" readonly />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.breedingLevel')" prop="breedingLevel">
              <el-select v-model="formData.breedingLevel" :placeholder="$t('research.breeding.breedingBatch.form.breedingLevelPlaceholder')" class="full-width">
                <el-option label="OriginalSeed" value="OriginalSeed" />
                <el-option label="C1" value="C1" />
                <el-option label="C2" value="C2" />
              </el-select>
            </el-form-item>



            <el-form-item :label="$t('research.breeding.breedingBatch.form.startDate')" prop="startDate">
              <el-date-picker
                v-model="formData.startDate"
                type="date"
                :placeholder="$t('research.breeding.breedingBatch.form.startDatePlaceholder')"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.endDate')" prop="endDate">
              <el-date-picker
                v-model="formData.endDate"
                type="date"
                :placeholder="$t('research.breeding.breedingBatch.form.endDatePlaceholder')"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.expectedYield')" prop="expectedYield">
              <el-input v-model.number="formData.expectedYield" :placeholder="$t('research.breeding.breedingBatch.form.expectedYieldPlaceholder')" type="number" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.toMultiplyQuantity')" prop="toMultiplyQuantity">
              <el-input v-model.number="formData.toMultiplyQuantity" :placeholder="$t('research.breeding.breedingBatch.form.toMultiplyQuantityPlaceholder')" type="number" clearable />
            </el-form-item>
          </div>
        </div>

        <!-- 机构信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-building-line"></i>
            <h3>{{ $t('research.breeding.breedingBatch.form.orgInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.breeding.breedingBatch.form.orgId')" prop="orgId">
              <el-input v-model="formData.orgId" :placeholder="$t('research.breeding.breedingBatch.form.orgIdPlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.orgName')" prop="orgName">
              <el-input v-model="formData.orgName" :placeholder="$t('research.breeding.breedingBatch.form.orgNamePlaceholder')" clearable />
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
            <el-form-item :label="$t('common.remarks')" prop="remark" class="full-width-item">
              <el-input v-model="formData.remark" type="textarea" :rows="4" :placeholder="$t('research.breeding.breedingBatch.form.remarkPlaceholder')" clearable />
            </el-form-item>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBreedingBatchPageDetail, addBreedingBatchPage, updateBreedingBatchPage } from '@/api/breeding'
import { getBreedSeedProduceList } from '@/api/breedSeed'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const loading = ref(false)
const breedSeedProduceList = ref([])

const isEdit = computed(() => !!route.params.id)

const formData = ref({
  cropType: '',
  varietyName: '',
  breedingLevel: '',
  parentSeedSource: '',
  startDate: '',
  endDate: '',
  expectedYield: '',
  toMultiplyQuantity: '',
  orgId: '',
  orgName: '',
  remark: ''
})

const rules = {
  parentSeedSource: [{ required: true, message: 'Please select the parent seed source', trigger: 'change' }],
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

// 处理Parent Seed Source变化
const handleParentSeedSourceChange = (value) => {
  if (!value) {
    // 如果清空选择，则清空cropType和varietyName
    formData.value.cropType = ''
    formData.value.varietyName = ''
    return
  }

  // 根据选中的breedSeedProduceBatchId查找对应的数据
  const selectedItem = breedSeedProduceList.value.find(
    item => item.breedSeedProduceBatchId === value
  )

  if (selectedItem) {
    // 自动填充cropType和varietyName
    formData.value.cropType = selectedItem.cropType
    formData.value.varietyName = selectedItem.varietyName
  }
}

// 初始化
onMounted(async () => {
  await loadBreedSeedProduceList()
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
        const response = isEdit.value ? await updateBreedingBatchPage(data) : await addBreedingBatchPage(data)

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
.breeding-batch-form-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 8px;
  color: white;

  .header-content {
    width: 100%;
    display: flex;
    align-items: center;

    .header-left {
      margin-right: auto;
    }

    .header-center {
      flex: 1;
      text-align: center;

      .page-title {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
}

.form-wrapper {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .breeding-batch-form {
    max-width: 1000px;
    margin: 0 auto;
  }

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
</style>
