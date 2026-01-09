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
            <h1 class="page-title">
              {{ isEdit ? $t('research.dataCollection.yieldData.edit') : $t('research.dataCollection.yieldData.add') }}
            </h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          v-loading="loading"
          :model="formData"
          :rules="rules"
          label-position="right"
          label-width="200px"
          class="yield-form"
        >
          <!-- 地块信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('research.dataCollection.yieldData.form.plotInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.plotId')" prop="plotId">
                    <el-select
                      v-model="formData.plotId"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.plotId')"
                      filterable
                      clearable
                      style="width: 100%"
                      :loading="plotLoading"
                      @change="handlePlotChange"
                    >
                      <el-option
                        v-for="item in plotOptions"
                        :key="item.plotId"
                        :label="item.plotId"
                        :value="item.plotId"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 基础信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.dataCollection.yieldData.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.batchId')" prop="batchId">
                    <el-input
                      v-model="formData.batchId"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.batchId')"
                      disabled
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.trialId')" prop="trialId">
                    <el-input
                      v-model="formData.trialId"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.trialId')"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 检验信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-search-line"></i>
                <span>{{ $t('research.dataCollection.yieldData.form.inspectionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.inspectionDate')">
                    <el-date-picker
                      v-model="formData.inspectionDate"
                      type="date"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.inspectionDate')"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.inspectionType')" prop="inspectionType">
                    <el-select
                      v-model="formData.inspectionType"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.inspectionType')"
                      clearable
                      filterable
                      style="width: 100%"
                      @change="onInspectionTypeChange"
                    >
                      <el-option
                        v-for="item in inspectionTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.scoreCode')" prop="scoreCode">
                    <el-select
                      v-model="formData.scoreCode"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.scoreCode')"
                      :disabled="!formData.inspectionType"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="onScoreCodeChange"
                    >
                      <el-option
                        v-for="opt in scoreCodeOptions"
                        :key="opt.code"
                        :label="opt.label"
                        :value="opt.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.scoreValue')" prop="scoreValue">
                    <!-- 数字类型（天 / cm / 计数） -->
                    <template v-if="currentCodeMeta && currentCodeMeta.type === 'number'">
                      <div class="input-with-unit">
                        <el-input-number
                          v-model="formData.scoreValue"
                          :min="0"
                          :precision="currentCodeMeta.precision ?? 0"
                          :controls="false"
                          style="width: 100%"
                        />
                        <span class="unit-hint">{{ currentCodeMeta.unit || '' }}</span>
                      </div>
                    </template>

                    <!-- 百分比类型 -->
                    <template v-else-if="currentCodeMeta && currentCodeMeta.type === 'percent'">
                      <div class="input-with-unit">
                        <el-input-number
                          v-model="formData.scoreValue"
                          :min="0"
                          :max="100"
                          :precision="2"
                          :controls="false"
                          style="width: 100%"
                        />
                        <span class="unit-hint">%</span>
                      </div>
                    </template>

                    <!-- 等级分（1-5、1-9） -->
                    <template v-else-if="currentCodeMeta && currentCodeMeta.type === 'scale'">
                      <el-input-number
                        v-model="formData.scoreValue"
                        :min="currentCodeMeta.min || 1"
                        :max="currentCodeMeta.max || 5"
                        :controls="false"
                        style="width: 100%"
                      />
                    </template>

                    <!-- 分类（下拉） -->
                    <template v-else-if="currentCodeMeta && currentCodeMeta.type === 'category'">
                      <el-select
                        v-model="formData.scoreValue"
                        :placeholder="$t('common.pleaseSelect')"
                        filterable
                        clearable
                        style="width: 100%"
                      >
                        <el-option
                          v-for="c in (currentCodeMeta.options || [])"
                          :key="c.value"
                          :label="c.label"
                          :value="c.value"
                        />
                      </el-select>
                    </template>

                    <!-- 未选择评分代码时的占位提示 -->
                    <template v-else>
                      <el-input v-model="dummy" disabled :placeholder="$t('research.dataCollection.yieldData.placeholder.scoreValue')" />
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('research.dataCollection.yieldData.form.operatorInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.recorderName')" prop="recorderName">
                    <el-input
                      v-model="formData.recorderName"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.recorderName')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('research.dataCollection.yieldData.form.remark')">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="3"
                      :placeholder="$t('research.dataCollection.yieldData.placeholder.remark')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="goBack">
              {{ $t('common.cancel') }}
            </el-button>
            <el-button type="primary" @click="handleSubmit">
              <i class="ri-save-line"></i>
              {{ $t('common.save') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getYieldDataDetail, addYieldData, updateYieldData } from '@/api/yieldData'
import { getPlotInfoList } from '@/api/breedingData'
import { useUserStore } from '@/store'
import { getUserInfo } from '@/utils/auth'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const plotLoading = ref(false)
const plotOptions = ref([])
const isEdit = computed(() => !!route.params.id)

// 当前登录用户信息（用于默认记录人员）
const currentUser = getUserInfo && typeof getUserInfo === 'function' ? getUserInfo() : null
const defaultRecorderName = currentUser?.user?.name || ''

const formData = reactive({
  id: null,
  batchId: '',
  trialId: '',
  plotId: '',
  // plotAreaM2: null,
  // grainWeightKg: null,
  // yieldQtPerHa: null,
  // moistureContent: null,
  // harvestDate: '',
  inspectionDate: '',
  inspectionType: '',
  scoreCode: '',
  scoreValue: null,
  recorderName: defaultRecorderName,
  remark: '',
  status: '0',
  createdBy: ''
})

// 本地静态映射（根据业务规则进行动态渲染）
const INSPECTION_SCHEMA = {
  'Germination / Early Establishment': [
    { code: 'DTE', label: 'DTE', type: 'number', unit: 'Days', precision: 0 },
    { code: 'Emergence %', label: 'Emergence %', type: 'percent' },
    { code: 'Vigor Score', label: 'Vigor Score', type: 'scale', min: 1, max: 5 }
  ],
  'Vegetative Growth': [
    { code: 'Plant Height', label: 'Plant Height', type: 'number', unit: 'cm', precision: 2 },
    { code: 'Tillers', label: 'Tillers', type: 'number', unit: 'count', precision: 0 },
    { code: 'Leaf Color', label: 'Leaf Color', type: 'scale', min: 1, max: 9 },
    { code: 'Vigor', label: 'Vigor', type: 'scale', min: 1, max: 5 }
  ],
  'Disease Assessment': [
    { code: 'Disease Severity', label: 'Disease Severity', type: 'scale', min: 1, max: 9 },
    { code: 'Disease Incidence', label: 'Disease Incidence', type: 'percent' },
    { code: 'Pest Damage', label: 'Pest Damage', type: 'scale', min: 1, max: 9 }
  ],
  'Reproductive Stage': [
    { code: 'Days to Heading', label: 'Days to Heading', type: 'number', unit: 'Days', precision: 0 },
    { code: 'Days to Anthesis', label: 'Days to Anthesis', type: 'number', unit: 'Days', precision: 0 },
    { code: 'Panicle Traits', label: 'Panicle Traits', type: 'category', options: [
      { label: 'Compact', value: 'compact' },
      { label: 'Intermediate', value: 'intermediate' },
      { label: 'Loose', value: 'loose' }
    ] }
  ],
  'Maturity Inspection': [
    { code: 'Days to Maturity', label: 'Days to Maturity', type: 'number', unit: 'Days', precision: 0 },
    { code: 'Lodging Score', label: 'Lodging Score', type: 'scale', min: 1, max: 9 },
    { code: 'Grain Filling', label: 'Grain Filling', type: 'scale', min: 1, max: 5 }
  ],
  'PVS (Participatory Variety Selection)': [
    { code: 'Farmer Preference', label: 'Farmer Preference', type: 'scale', min: 1, max: 5 },
    { code: 'Grain Color', label: 'Grain Color', type: 'category', options: [
      { label: 'White', value: 'white' },
      { label: 'Red', value: 'red' },
      { label: 'Brown', value: 'brown' },
      { label: 'Black', value: 'black' }
    ] },
    { code: 'Panicle Size', label: 'Panicle Size', type: 'category', options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' }
    ] },
    { code: 'Acceptability', label: 'Acceptability', type: 'scale', min: 1, max: 5 }
  ]
}

// 检验类型选项（来自本地映射）
const inspectionTypeOptions = computed(() => Object.keys(INSPECTION_SCHEMA).map(k => ({ value: k, label: k })))

// 评分代码选项（随所选检验类型变化）
const scoreCodeOptions = computed(() => {
  if (!formData.inspectionType) return []
  return INSPECTION_SCHEMA[formData.inspectionType] || []
})

// 当前评分代码元数据
const currentCodeMeta = computed(() => {
  if (!formData.inspectionType || !formData.scoreCode) return null
  return (INSPECTION_SCHEMA[formData.inspectionType] || []).find(c => c.code === formData.scoreCode) || null
})

// 选择变化处理
const onInspectionTypeChange = () => {
  formData.scoreCode = ''
  formData.scoreValue = null
}

const onScoreCodeChange = () => {
  formData.scoreValue = null
}

const validateScoreValue = (rule, value, callback) => {
  const meta = currentCodeMeta.value
  if (!meta) return callback(new Error(t('research.dataCollection.yieldData.pleaseSelectCodeFirst') || '请先选择评分代码'))
  if (value === null || value === '' || value === undefined) return callback(new Error(t('common.required') || '必填项'))
  if (meta.type === 'percent') {
    if (typeof value !== 'number' || value < 0 || value > 100) return callback(new Error(t('research.dataCollection.yieldData.percentRange') || '百分比范围为 0 - 100'))
  }
  if (meta.type === 'scale') {
    const min = meta.min ?? 1
    const max = meta.max ?? 5
    if (typeof value !== 'number' || value < min || value > max) return callback(new Error((t('research.dataCollection.yieldData.scaleRange') || '评分范围为') + ` ${min}-${max}`))
  }
  if (meta.type === 'number') {
    if (typeof value !== 'number' || value < 0) return callback(new Error(t('research.dataCollection.yieldData.numberNonNegative') || '请输入非负数字'))
  }
  if (meta.type === 'category') {
    if (!value) return callback(new Error(t('common.required') || '必填项'))
  }
  callback()
}

const rules = computed(() => ({
  plotId: [
    { required: true, message: t('research.dataCollection.yieldData.rules.plotIdRequired'), trigger: 'change' }
  ],
  inspectionType: [
    { required: true, message: t('research.dataCollection.yieldData.rules.inspectionTypeRequired') || '请选择检验类型', trigger: 'change' }
  ],
  scoreCode: [
    { required: true, message: t('research.dataCollection.yieldData.rules.scoreCodeRequired') || '请选择评分代码', trigger: 'change' }
  ],
  scoreValue: [
    { validator: validateScoreValue, trigger: ['blur', 'change'] }
  ],
  recorderName: [
    { required: true, message: t('research.dataCollection.yieldData.rules.recorderNameRequired'), trigger: 'blur' }
  ],
  harvestDate: [
    { required: true, message: t('research.dataCollection.yieldData.rules.harvestDateRequired'), trigger: 'change' }
  ],
  plotAreaM2: [
    { required: true, message: t('research.dataCollection.yieldData.rules.plotAreaM2Required'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('research.dataCollection.yieldData.rules.plotAreaM2Min'), trigger: 'blur' }
  ],
  grainWeightKg: [
    { required: true, message: t('research.dataCollection.yieldData.rules.grainWeightKgRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('research.dataCollection.yieldData.rules.grainWeightKgMin'), trigger: 'blur' }
  ],
  yieldQtPerHa: [
    { required: true, message: t('research.dataCollection.yieldData.rules.yieldQtPerHaRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('research.dataCollection.yieldData.rules.yieldQtPerHaMin'), trigger: 'blur' }
  ]
}))

const dummy = ref('')

// 加载地块选项
const loadPlotOptions = async () => {
  plotLoading.value = true
  try {
    const res = await getPlotInfoList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      plotOptions.value = res.rows || []
    }
  } catch (error) {
    console.error('Failed to load plot options:', error)
  } finally {
    plotLoading.value = false
  }
}

// 地块选择变化时，自动填充批次ID、试验ID和地块面积
const handlePlotChange = (plotId) => {
  if (!plotId) {
    formData.batchId = ''
    formData.trialId = ''
    return
  }
  const selectedPlot = plotOptions.value.find(item => item.plotId === plotId)
  if (selectedPlot) {
    formData.batchId = selectedPlot.batchId || ''
    formData.trialId = selectedPlot.trialId || ''
  }
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getYieldDataDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      // 获取用户信息并设置 createdBy
      const userInfo = userStore.userInfo
      if (!isEdit.value) {
        // 新增时设置创建人,优先使用 userId,其次 username,最后使用 loginName
        formData.createdBy = userInfo.userId || userInfo.username || userInfo.loginName || 'system'
      }

      const apiFunc = isEdit.value ? updateYieldData : addYieldData
      const res = await apiFunc(formData)
      if (res.code === 200) {
        ElMessage.success(t(isEdit.value ? 'research.dataCollection.yieldData.editSuccess' : 'research.dataCollection.yieldData.addSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.operationFailed'))
    } finally {
      loading.value = false
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadPlotOptions()
  if (isEdit.value) {
    loadDetail()
  }
  // 兜底赋值：若无记录人员则设置为当前用户
  if (!formData.recorderName && defaultRecorderName) {
    formData.recorderName = defaultRecorderName
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

/* 带单位的输入框容器 */
.input-with-unit {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.input-with-unit :deep(.el-input-number) {
  flex: 1;
}

/* 单位提示 */
.unit-hint {
  color: #6b7280;
  font-size: 14px;
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
