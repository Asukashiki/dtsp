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
            <h1 class="page-title">{{ $t('research.breeding.seed.production.result.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="180px"
        >
          <!-- 生产批次选择卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ $t('research.breeding.seed.production.result.section.productionBatchSelection') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.columns.produceBatchName')" prop="produceBatchId">
                    <el-select
                      v-model="formData.produceBatchId"
                      :placeholder="$t('research.breeding.seed.production.columns.produceBatchName')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleBatchChange"
                    >
                      <el-option
                        v-for="batch in batchList"
                        :key="batch.produceBatchId"
                        :label="batch.produceBatchName"
                        :value="batch.produceBatchId"
                      >
                        <div style="display: flex; align-items: center;">
                          <span>{{ batch.produceBatchName }}</span>
                          <span style="color: #909399; font-size: 13px; margin-left: 8px;">(ID: {{ batch.produceBatchId }})</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.columns.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.columns.breedBatchName')" prop="breedBatchName">
                    <el-input v-model="formData.breedBatchName" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.form.trialName')" prop="trialName">
                    <el-input v-model="formData.trialName" disabled />
                  </el-form-item>
                </el-col>
                
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.form.fromSeedLevel')" prop="fromSeedLevel">
                    <el-input v-model="formData.fromSeedLevel" disabled />
                  </el-form-item>
                </el-col>
                
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.form.toSeedLevel')" prop="toSeedLevel">
                    <el-input v-model="formData.toSeedLevel" disabled />
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
                <span>{{ $t('research.breeding.seed.production.result.section.collectionData') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.form.producedAmount') + ' (kg)'" prop="producedAmount">
                    <el-input-number
                      v-model="formData.producedAmount"
                      :min="0"
                      :precision="2"
                      :placeholder="$t('research.breeding.seed.production.form.producedAmount')"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.form.operator')">
                    <el-input v-model="operatorName" disabled />
                  </el-form-item>
                </el-col>
                
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breeding.seed.production.form.collectionDate')" prop="collectionDate">
                    <el-date-picker
                      v-model="formData.collectionDate"
                      type="datetime"
                      :placeholder="$t('research.breeding.seed.production.form.collectionDate')"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBreedSeedProduceList, addBreedSeedProduceResult } from '@/api/breedSeed'
import { useUserStore } from '@/store'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const operatorName = computed(() => {
  const info = userStore.userInfo
  const user = info.user || info
  return user?.nickName || user?.userName || user?.name || '-'
})

// 获取当前时间（格式：YYYY-MM-DD HH:mm:ss）
const getCurrentDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const formRef = ref(null)
const submitting = ref(false)
const batchList = ref([])

const formData = reactive({
  produceBatchId: '',
  producedAmount: null,
  collectionDate: getCurrentDateTime(),
  // Auto-filled for display
  produceBatchName: '',
  varietyName: '',
  breedBatchName: '',
  trialName: '',
  fromSeedLevel: '',
  toSeedLevel: ''
})

const rules = computed(() => ({
  produceBatchId: [
    { required: true, message: t('research.breeding.seed.production.rules.produceBatchIdRequired'), trigger: 'change' }
  ],
  producedAmount: [
    { required: true, message: t('research.breeding.seed.production.rules.producedAmountRequired'), trigger: 'blur' },
    { type: 'number', min: 0, message: t('research.breeding.seed.production.rules.producedAmountMin'), trigger: 'blur' }
  ],
  collectionDate: [
    { required: true, message: t('research.breeding.seed.production.rules.collectionDateRequired'), trigger: 'change' }
  ]
}))

const loadBatches = async () => {
  try {
    const res = await getBreedSeedProduceList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      // Filter out batches with produceStatus === 'Finished'
      batchList.value = (res.rows || []).filter(batch => batch.produceStatus !== 'Finished')
    }
  } catch (error) {
    console.error('Failed to load batches:', error)
  }
}

const handleBatchChange = (batchId) => {
  if (!batchId) {
    formData.produceBatchName = ''
    formData.varietyName = ''
    formData.breedBatchName = ''
    formData.trialName = ''
    formData.fromSeedLevel = ''
    formData.toSeedLevel = ''
    return
  }

  const batch = batchList.value.find(b => b.produceBatchId === batchId)
  if (batch) {
    formData.produceBatchName = batch.produceBatchName
    formData.varietyName = batch.varietyName
    formData.breedBatchName = batch.breedBatchName
    formData.trialName = batch.trialName
    formData.fromSeedLevel = batch.fromSeedLevel
    formData.toSeedLevel = batch.toSeedLevel
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = {
      produceBatchId: formData.produceBatchId,
      producedAmount: formData.producedAmount,
      collectionDate: formData.collectionDate,
      operator: operatorName.value
    }

    const res = await addBreedSeedProduceResult(submitData)
    if (res.code === 200) {
      ElMessage.success(t('common.submitSuccess'))
      router.back()
    }
  } catch (error) {
    console.error('Submit failed', error)
    if (error !== false) {
      ElMessage.error(t('common.submitFailed'))
    }
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  router.back()
}

onMounted(() => {
  loadBatches()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
