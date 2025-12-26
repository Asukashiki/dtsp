<template>
  <div class="breeding-batch-form-page">
    <!-- 页面头部 -->
    <div class="page-header">
        <div class="header-left">
        <div class="back-btn" link @click="goBack">
            <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </div>
      </div>
      <div class="header-content">
        <h1 class="page-title">{{ isEdit ? $t('research.breeding.breedingBatch.edit') :
          $t('research.breeding.breedingBatch.add') }}</h1>
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
            <el-form-item :label="$t('research.breeding.breedingBatch.form.cropType')" prop="cropType">
              <el-select v-model="formData.cropType" :placeholder="$t('research.breeding.breedingBatch.form.cropTypePlaceholder')" class="full-width" @change="handleCropTypeChange">
                <el-option :label="$t('research.breeding.breedingBatch.cropType.wheat')" value="WHEAT" />
                <el-option :label="$t('research.breeding.breedingBatch.cropType.corn')" value="CORN" />
                <el-option :label="$t('research.breeding.breedingBatch.cropType.rice')" value="RICE" />
                <el-option :label="$t('research.breeding.breedingBatch.cropType.soybean')" value="SOYBEAN" />
                <el-option :label="$t('research.breeding.breedingBatch.cropType.cotton')" value="COTTON" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.varietyName')" prop="varietyName">
              <el-input v-model="formData.varietyName" :placeholder="$t('research.breeding.breedingBatch.form.varietyNamePlaceholder')" clearable @blur="generateVarietyCode" />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.varietyCode')" prop="varietyCode">
              <el-input v-model="formData.varietyCode" :placeholder="$t('research.breeding.breedingBatch.form.varietyCodePlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.breedingLevel')" prop="breedingLevel">
              <el-select v-model="formData.breedingLevel" :placeholder="$t('research.breeding.breedingBatch.form.breedingLevelPlaceholder')" class="full-width">
                <el-option label="Basic" value="Basic" />
                <el-option label="C1" value="C1" />
                <!-- <el-option label="C2" value="C2" /> -->
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.parentSeedSource')" prop="parentSeedSource" class="full-width-item">
              <el-input v-model="formData.parentSeedSource" :placeholder="$t('research.breeding.breedingBatch.form.parentSeedSourcePlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.startDate')" prop="startDate">
              <el-date-picker
                v-model="formData.startDate"
                type="date"
                :placeholder="$t('research.breeding.breedingBatch.form.startDatePlaceholder')"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.expectedYield')" prop="expectedYield">
              <el-input v-model.number="formData.expectedYield" :placeholder="$t('research.breeding.breedingBatch.form.expectedYieldPlaceholder')" type="number" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingBatch.form.quantityToMultiply')">
              <el-input v-model.number="formData.quantityToMultiply" :placeholder="$t('common.pleaseEnter')" type="number" clearable />
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
              <el-input v-model="formData.orgName" :placeholder="$t('research.breeding.breedingBatch.form.orgNamePlaceholder')" disabled />
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
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const loading = ref(false)
const userStore = useUserStore()

const isEdit = computed(() => !!route.params.id)

const formData = ref({
  cropType: '',
  varietyName: '',
  breedingLevel: '',
  parentSeedSource: '',
  startDate: '',
  expectedYield: '',
  quantityToMultiply: '',
  orgId: '',
  orgName: '',
  remark: ''
})

const rules = {
  cropType: [{ required: true, message: '请选择作物类型', trigger: 'change' }],
  varietyName: [{ required: true, message: '请输入品种名称', trigger: 'blur' }],
  breedingLevel: [{ required: true, message: '请选择繁殖级别', trigger: 'change' }],
  parentSeedSource: [{ required: true, message: '请输入亲本种子来源', trigger: 'blur' }],
  startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }]
}

// 初始化
onMounted(async () => {
  // 从用户信息自动填充组织信息
  const userInfo = userStore.userInfo?.user || {}
  formData.value.orgId = userInfo.organCode || userInfo.ORGAN_CODE || ''
  formData.value.orgName = userInfo.organName || userInfo.ORGAN_NAME || ''
  
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
      ElMessage.error('加载数据失败')
    }
  } catch (error) {
    ElMessage.error('加载数据失败')
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
          ElMessage.success(isEdit.value ? '更新成功' : '新增成功')
          router.push('/research/breeding/batch')
        } else {
          ElMessage.error(response.msg || '操作失败')
        }
      } catch (error) {
        ElMessage.error('操作失败')
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
</style>
