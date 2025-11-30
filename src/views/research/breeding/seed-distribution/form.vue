<template>
  <div class="distribution-form-container">
    <div class="form-header">
      <div class="header-left">
        <el-button link @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>
      <h2 class="form-title">{{ $t('research.breeding.seed.distribution.add') }}</h2>
    </div>

    <div class="form-content">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="180px"
        class="distribution-form"
      >
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.breeding.seed.distribution.form.basicInfo') }}
          </div>

          <el-form-item :label="$t('research.breeding.seed.distribution.form.oseId')" prop="oseId">
            <el-select
              v-model="formData.oseId"
              :placeholder="$t('research.breeding.seed.distribution.placeholder.oseId')"
              filterable
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="ose in oseList"
                :key="ose.oseId"
                :label="`${ose.oseName} (${ose.oseCode})`"
                :value="ose.oseId"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('research.breeding.seed.distribution.form.time')" prop="time">
            <el-date-picker
              v-model="formData.time"
              type="datetime"
              :placeholder="$t('research.breeding.seed.distribution.placeholder.time')"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breeding.seed.distribution.form.people')" prop="people">
            <el-input
              v-model="formData.people"
              :placeholder="$t('research.breeding.seed.distribution.placeholder.people')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.breeding.seed.distribution.form.organ')" prop="organ">
            <el-input
              v-model="formData.organ"
              :placeholder="$t('research.breeding.seed.distribution.placeholder.organ')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.breeding.seed.distribution.form.remark')" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.breeding.seed.distribution.placeholder.remark')"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <div class="section-title">
            <i class="ri-list-check"></i>
            {{ $t('research.breeding.seed.distribution.form.detailList') }}
            <el-button type="primary" size="small" @click="handleAddDetail" style="margin-left: 16px">
              <i class="ri-add-line"></i>
              {{ $t('research.breeding.seed.distribution.addDetail') }}
            </el-button>
          </div>

          <div class="detail-list">
            <div
              v-for="(detail, index) in formData.detailList"
              :key="index"
              class="detail-item"
            >
              <div class="detail-header">
                <span class="detail-index">{{ $t('research.breeding.seed.distribution.detailIndex', { index: index + 1 }) }}</span>
                <el-button
                  link
                  type="danger"
                  size="small"
                  @click="handleRemoveDetail(index)"
                  :disabled="formData.detailList.length === 1"
                >
                  <i class="ri-delete-bin-line"></i>
                  {{ $t('common.delete') }}
                </el-button>
              </div>

              <el-form-item
                :label="$t('research.breeding.seed.distribution.form.breedSeedProduceBatchId')"
                :prop="`detailList.${index}.breedSeedProduceBatchId`"
                :rules="rules.breedSeedProduceBatchId"
              >
                <el-select
                  v-model="detail.breedSeedProduceBatchId"
                  :placeholder="$t('research.breeding.seed.distribution.placeholder.breedSeedProduceBatchId')"
                  filterable
                  clearable
                  style="width: 100%"
                  @change="handleBatchChange(index)"
                >
                  <el-option
                    v-for="batch in productionBatchList"
                    :key="batch.breedSeedProduceBatchId"
                    :label="`${batch.varietyName} - ${batch.cropType} (${batch.time})`"
                    :value="batch.breedSeedProduceBatchId"
                  >
                    <div style="display: flex; justify-content: space-between">
                      <span>{{ batch.varietyName }} - {{ batch.cropType }}</span>
                      <span style="color: #8492a6; font-size: 13px">
                        {{ $t('research.breeding.seed.distribution.remaining') }}: {{ batch.remainingQuantity || 0 }} kg
                      </span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                :label="$t('research.breeding.seed.distribution.form.distributeQuantity')"
                :prop="`detailList.${index}.distributeQuantity`"
                :rules="rules.distributeQuantity"
              >
                <el-input-number
                  v-model="detail.distributeQuantity"
                  :min="0"
                  :max="detail.maxQuantity || 999999"
                  :precision="2"
                  :placeholder="$t('research.breeding.seed.distribution.placeholder.distributeQuantity')"
                  style="width: 100%"
                />
                <div v-if="detail.maxQuantity" class="help-text">
                  {{ $t('research.breeding.seed.distribution.maxQuantity') }}: {{ detail.maxQuantity }} kg
                </div>
              </el-form-item>
            </div>

            <el-empty
              v-if="formData.detailList.length === 0"
              :description="$t('research.breeding.seed.distribution.noDetail')"
              :image-size="100"
            />
          </div>
        </div>

        <div class="form-footer">
          <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
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
import { ElMessage } from 'element-plus'
import { addBreedSeedDistribute } from '@/api/breedSeed'
import { getOseList } from '@/api/breedSeed'
import { getBreedSeedProduceList } from '@/api/breedSeed'

const { t } = useI18n()
const emit = defineEmits(['cancel', 'success'])

const formRef = ref(null)
const submitting = ref(false)
const oseList = ref([])
const productionBatchList = ref([])

const formData = reactive({
  oseId: '',
  time: '',
  people: '',
  organ: '',
  remark: '',
  detailList: [
    {
      breedSeedProduceBatchId: '',
      distributeQuantity: null,
      maxQuantity: null
    }
  ]
})

const rules = computed(() => ({
  oseId: [
    { required: true, message: t('research.breeding.seed.distribution.rules.oseId'), trigger: 'change' }
  ],
  time: [
    { required: true, message: t('research.breeding.seed.distribution.rules.time'), trigger: 'change' }
  ],
  people: [
    { required: true, message: t('research.breeding.seed.distribution.rules.people'), trigger: 'blur' }
  ],
  organ: [
    { required: true, message: t('research.breeding.seed.distribution.rules.organ'), trigger: 'blur' }
  ],
  breedSeedProduceBatchId: [
    { required: true, message: t('research.breeding.seed.distribution.rules.breedSeedProduceBatchId'), trigger: 'change' }
  ],
  distributeQuantity: [
    { required: true, message: t('research.breeding.seed.distribution.rules.distributeQuantity'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === null || value === undefined || value === '') {
          callback(new Error(t('research.breeding.seed.distribution.rules.distributeQuantity')))
        } else if (value <= 0) {
          callback(new Error(t('research.breeding.seed.distribution.rules.distributeQuantityMin')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// 加载OSE列表
const loadOseList = async () => {
  try {
    const res = await getOseList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      oseList.value = (res.rows || []).filter(item => item.oseStatus === 'ENABLED')
    }
  } catch (error) {
    console.error('Failed to load OSE list:', error)
  }
}

// 加载生产批次列表
const loadProductionBatchList = async () => {
  try {
    const res = await getBreedSeedProduceList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      productionBatchList.value = res.rows || []
    }
  } catch (error) {
    console.error('Failed to load production batch list:', error)
  }
}

// 添加分发明细
const handleAddDetail = () => {
  formData.detailList.push({
    breedSeedProduceBatchId: '',
    distributeQuantity: null,
    maxQuantity: null
  })
}

// 删除分发明细
const handleRemoveDetail = (index) => {
  if (formData.detailList.length > 1) {
    formData.detailList.splice(index, 1)
  }
}

// 生产批次变更时更新可分发量
const handleBatchChange = (index) => {
  const detail = formData.detailList[index]
  const batch = productionBatchList.value.find(
    item => item.breedSeedProduceBatchId === detail.breedSeedProduceBatchId
  )
  if (batch) {
    detail.maxQuantity = batch.remainingQuantity || batch.produceSeedQuantrity || 0
  } else {
    detail.maxQuantity = null
  }
}

// 返回列表
const handleBack = () => {
  emit('cancel')
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    submitting.value = true
    const res = await addBreedSeedDistribute(formData)

    if (res.code === 200) {
      ElMessage.success(t('research.breeding.seed.distribution.addSuccess'))
      emit('success')
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Submit error:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadOseList()
  loadProductionBatchList()
})
</script>

<style scoped>
.distribution-form-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.form-header {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.header-left {
  margin-bottom: 8px;
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: #009A44;
  margin: 0;
}

.form-content {
  padding: 24px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
}

.section-title i {
  font-size: 18px;
  color: #009A44;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
}

.detail-index {
  font-weight: 600;
  color: #009A44;
}

.help-text {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

@media screen and (max-width: 768px) {
  .form-content {
    padding: 16px;
  }

  .distribution-form {
    :deep(.el-form-item__label) {
      width: 100% !important;
      text-align: left;
      margin-bottom: 8px;
    }

    :deep(.el-form-item__content) {
      margin-left: 0 !important;
    }
  }

  .form-footer {
    flex-direction: column-reverse;
  }

  .form-footer .el-button {
    width: 100%;
  }
}
</style>
