dtsp/src/views/research/breeding/seed-distribution/form.vue<template>
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

          <div class="form-row">
            <el-form-item :label="$t('research.breeding.seed.distribution.form.distributeName')" prop="distributeName">
              <el-input
                v-model="formData.distributeName"
                :placeholder="$t('research.breeding.seed.distribution.placeholder.distributeName')"
                clearable
                style="width: 100%"
              />
            </el-form-item>

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
          </div>

          <div class="form-row">
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
                readonly
              />
            </el-form-item>
          </div>

          <div class="form-row">
            <el-form-item :label="$t('research.breeding.seed.distribution.form.organ')" prop="organ">
              <el-input
                v-model="formData.organ"
                :placeholder="$t('research.breeding.seed.distribution.placeholder.organ')"
                readonly
              />
            </el-form-item>

            <!-- 占位元素，保持布局一致性 -->
            <div></div>
          </div>

          <div class="form-row">
            <el-form-item :label="$t('research.breeding.seed.distribution.form.fromSeedLevel')" prop="fromSeedLevel">
              <el-select
                v-model="formData.fromSeedLevel"
                :placeholder="$t('research.breeding.seed.distribution.placeholder.fromSeedLevel')"
                clearable
                style="width: 100%"
                @change="handleSeedLevelChange"
              >
              <el-option label="Pre-Basic" value="Pre-Basic" />
              <el-option label="Basic" value="Basic" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.breeding.seed.distribution.form.toSeedLevel')" prop="toSeedLevel">
              <el-select
                v-model="formData.toSeedLevel"
                :placeholder="$t('research.breeding.seed.distribution.placeholder.toSeedLevel')"
                clearable
                style="width: 100%"
                :disabled="!formData.fromSeedLevel"
              >
                <el-option
                  v-for="option in toSeedLevelOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
          </div>

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
                :label="$t('research.breeding.seed.distribution.form.produceBatchId')"
                :prop="`detailList.${index}.produceBatchId`"
                :rules="rules.produceBatchId"
              >
                <el-select
                  v-model="detail.produceBatchId"
                  :placeholder="$t('research.breeding.seed.distribution.placeholder.produceBatchId')"
                  filterable
                  clearable
                  style="width: 100%"
                  @change="handleBatchChange(index)"
                >
                  <el-option
                    v-for="batch in productionBatchList"
                    :key="batch.produceBatchId"
                    :label="`${batch.produceBatchId}`"
                    :value="batch.produceBatchId"
                  >
                    <div style="display: flex; justify-content: space-between">
                      <span>{{ batch.produceBatchId }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>

              

              <!-- 新增字段 -->
              <el-form-item
                :label="$t('research.breeding.seed.distribution.form.breedBatchName')"
                :prop="`detailList.${index}.breedBatchName`"
              >
                <el-input
                  v-model="detail.breedBatchName"
                  :placeholder="$t('research.breeding.seed.distribution.placeholder.breedBatchName')"
                  readonly
                  style="width: 100%"
                />
              </el-form-item>

                            <el-form-item
                :label="$t('research.breeding.seed.distribution.form.parentalSeedSource')"
                :prop="`detailList.${index}.parentalSeedSource`"
              >
                <el-input
                  v-model="detail.parentalSeedSource"
                  :placeholder="$t('research.breeding.seed.distribution.placeholder.parentalSeedSource')"
                  readonly
                  style="width: 100%"
                />
              </el-form-item>

              <el-form-item
                :label="$t('research.breeding.seed.distribution.form.varietyName')"
                :prop="`detailList.${index}.varietyName`"
              >
                <el-input
                  v-model="detail.varietyName"
                  :placeholder="$t('research.breeding.seed.distribution.placeholder.varietyName')"
                  readonly
                  style="width: 100%"
                />
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
import { useUserStore } from '@/store/user'
import { getBreedSeedProduceDetail } from '@/api/breedSeed'
import { getBreedingBatchList } from '@/api/breedingData'
import { getPrebasicSeedProduceResultList } from '@/api/prebasicSeed'
import { getBasicSeedProduceResultList } from '@/api/basicSeed'

const { t } = useI18n()
const emit = defineEmits(['cancel', 'success'])
const userStore = useUserStore()

const formRef = ref(null)
const submitting = ref(false)
const oseList = ref([])
const productionBatchList = ref([])
// 种子等级联动规则
const toSeedLevelOptions = ref([])

// 从用户信息中获取当前用户名称和组织名称
const userInfo = userStore.userInfo || {}
const currentUserName = userInfo.user?.NAME || userInfo.user?.USER_NAME || ''
const currentOrgName = userInfo.user?.ORGAN_NAME || ''

const formData = reactive({
  distributeName: '',
  oseId: '',
  time: '',
  people: currentUserName,
  organ: currentOrgName,
  remark: '',
  fromSeedLevel: '',
  toSeedLevel: '',
  detailList: [
    {
      produceBatchId: '',
      produceBatchName: '',
      breedBatchName: '',
      parentalSeedSource: '',
      varietyName: '',
      distributeQuantity: null,
      maxQuantity: null
    }
  ]
})

const rules = computed(() => ({
  distributeName: [
    { required: true, message: t('research.breeding.seed.distribution.rules.distributeName'), trigger: 'blur' }
  ],
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
  fromSeedLevel: [
    { required: true, message: t('research.breeding.seed.distribution.rules.fromSeedLevelRequired'), trigger: 'change' }
  ],
  toSeedLevel: [
    { required: true, message: t('research.breeding.seed.distribution.rules.toSeedLevelRequired'), trigger: 'change' }
  ],
  produceBatchId: [
    { required: true, message: t('research.breeding.seed.distribution.rules.produceBatchId'), trigger: 'change' }
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
    let res;
    // 根据 fromSeedLevel 的值调用不同的 API
    if (formData.fromSeedLevel === 'Pre-Basic') {
      // 当 fromSeedLevel 为 Pre-Basic 时，调用原原种生产结果列表
      res = await getPrebasicSeedProduceResultList({ pageNum: 1, pageSize: 1000 })
    } else if (formData.fromSeedLevel === 'Basic') {
      // 当 fromSeedLevel 为 Basic 时，调用原种生产结果列表
      res = await getBasicSeedProduceResultList({ pageNum: 1, pageSize: 1000 })
    } else {
      // 如果没有选择种子等级，清空列表
      productionBatchList.value = []
      return
    }
    
    if (res.code === 200) {
      productionBatchList.value = res.rows || []
      // 调试信息：打印第一条数据查看remainingQuantity是否正确返回
      if (productionBatchList.value.length > 0) {
        console.log('Production batch list loaded, sample data:', productionBatchList.value[0])
      }
    }
  } catch (error) {
    console.error('Failed to load production batch list:', error)
  }
}

// 添加分发明细
const handleAddDetail = () => {
  formData.detailList.push({
    produceBatchId: '',
    produceBatchName: '',
    breedBatchName: '',
    parentalSeedSource: '',
    varietyName: '',
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

// 种子等级联动规则
const handleSeedLevelChange = async (value) => {
  // 清空目标种子等级
  formData.toSeedLevel = ''
  
  // 根据源种子等级设置目标种子等级可选值
  if (value === 'Basic') {
    toSeedLevelOptions.value = [{ label: 'C1', value: 'C1' }]
    // 自动设置目标种子等级为 C1
    formData.toSeedLevel = 'C1'
  } else if (value === 'Pre-Basic') {
    toSeedLevelOptions.value = [{ label: 'Basic', value: 'Basic' }]
    // 自动设置目标种子等级为 Basic
    formData.toSeedLevel = 'Basic'
  } else {
    toSeedLevelOptions.value = []
  }
  
  // 根据 fromSeedLevel 的值重新加载生产批次列表
  await loadProductionBatchList()
}

// 生产批次变更时更新可分发量（使用已获取的数据）
const handleBatchChange = async (index) => {
  const detail = formData.detailList[index]
  if (!detail.produceBatchId) {
    detail.maxQuantity = null
    detail.produceBatchName = ''
    detail.breedBatchName = ''
    detail.parentalSeedSource = ''
    detail.varietyName = ''
    return
  }

  // 从已获取的生产批次列表中查找对应批次的数据
  const selectedBatch = productionBatchList.value.find(
    item => item.produceBatchId === detail.produceBatchId
  )
  
  if (selectedBatch) {
    // 使用已获取数据中的剩余量
    detail.maxQuantity = selectedBatch.remainingQuantity || 0
    // 设置生产批次名称
    detail.produceBatchName = selectedBatch.produceBatchId || ''
    // 从已获取的数据中复制 breedBatchName 和 varietyName
    detail.breedBatchName = selectedBatch.breedBatchName || ''
    detail.varietyName = selectedBatch.varietyName || ''
    // 也复制 parentalSeedSource（如果在结果列表中有这个字段）
    detail.parentalSeedSource = selectedBatch.parentalSeedSource || ''
  } else {
    // 如果在列表中找不到对应的批次，清空相关字段
    detail.maxQuantity = null
    detail.produceBatchName = ''
    detail.breedBatchName = ''
    detail.parentalSeedSource = ''
    detail.varietyName = ''
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
    // 构造提交数据，确保包含所有字段
    const submitData = {
      ...formData
    }
    const res = await addBreedSeedDistribute(submitData)

    if (res.code === 200) {
      ElMessage.success(t('research.breeding.seed.distribution.addSuccess'))

      // 提交成功后重新加载生产批次列表，以便下次使用时能看到最新的剩余量
      await loadProductionBatchList()

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
  // 初始化时不需要加载生产批次列表，因为需要先选择 fromSeedLevel
  // 生产批次列表会在用户选择 fromSeedLevel 后自动加载
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

/* 两列布局 */
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row > .el-form-item {
  flex: 1;
  margin-bottom: 0;
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
  
  /* 移动端单列布局 */
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
