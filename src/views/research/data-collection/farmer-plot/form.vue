<template>
  <div class="farmer-plot-form-container">
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
          <h1 class="page-title">
            {{ isEdit ? $t('research.dataCollection.farmerPlot.edit') : $t('research.dataCollection.farmerPlot.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-width="labelWidth"
        :label-position="labelPosition"
      >
        <!-- 农民基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.dataCollection.farmerPlot.form.farmerInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmerPlot.form.farmerName')"
                prop="farmerName"
              >
                <el-input
                  v-model="formData.farmerName"
                  :placeholder="$t('research.dataCollection.farmerPlot.placeholder.farmerName')"
                  maxlength="100"
                  show-word-limit
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmerPlot.form.gender')"
                prop="gender"
              >
                <el-radio-group v-model="formData.gender">
                  <el-radio value="male">{{ $t('research.dataCollection.farmerPlot.gender.male') }}</el-radio>
                  <el-radio value="female">{{ $t('research.dataCollection.farmerPlot.gender.female') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmerPlot.form.youthCategory')"
                prop="youthCategory"
              >
                <el-select
                  v-model="formData.youthCategory"
                  :placeholder="$t('research.dataCollection.farmerPlot.placeholder.youthCategory')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('research.dataCollection.farmerPlot.youthCategory.youth')"
                    value="youth"
                  />
                  <el-option
                    :label="$t('research.dataCollection.farmerPlot.youthCategory.adult')"
                    value="adult"
                  />
                  <el-option
                    :label="$t('research.dataCollection.farmerPlot.youthCategory.elderly')"
                    value="elderly"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmerPlot.form.cooperativeMembership')"
                prop="cooperativeMembership"
              >
                <el-input
                  v-model="formData.cooperativeMembership"
                  :placeholder="$t('research.dataCollection.farmerPlot.placeholder.cooperativeMembership')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmerPlot.form.householdId')"
                prop="householdId"
              >
                <el-input
                  v-model="formData.householdId"
                  :placeholder="$t('research.dataCollection.farmerPlot.placeholder.householdId')"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmerPlot.form.contactPhone')"
                prop="contactPhone"
              >
                <el-input
                  v-model="formData.contactPhone"
                  :placeholder="$t('research.dataCollection.farmerPlot.placeholder.contactPhone')"
                  maxlength="20"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 地块信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('research.dataCollection.farmerPlot.form.plotInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmerPlot.form.plotSizeM2')"
                prop="plotSizeM2"
              >
                <el-input-number
                  v-model="formData.plotSizeM2"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.farmerPlot.placeholder.plotSizeM2')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button
            type="primary"
            :loading="submitting"
            @click="handleSubmit"
          >
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFarmerPlotDetail, addFarmerPlot, editFarmerPlot } from '@/api/breeding'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 响应式表单布局
const isMobile = ref(window.innerWidth <= 768)
const labelWidth = computed(() => isMobile.value ? '100%' : '180px')
const labelPosition = computed(() => isMobile.value ? 'top' : 'right')

// 监听窗口大小变化
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

const formRef = ref()
const submitting = ref(false)

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单数据
const formData = reactive({
  farmerName: '',
  gender: 'male',
  youthCategory: '',
  cooperativeMembership: '',
  plotSizeM2: null,
  householdId: '',
  contactPhone: ''
})

// 表单验证规则
const rules = computed(() => ({
  farmerName: [
    { required: true, message: t('research.dataCollection.farmerPlot.rules.farmerNameRequired'), trigger: 'blur' },
    { min: 2, max: 100, message: t('research.dataCollection.farmerPlot.rules.farmerNameLength'), trigger: 'blur' }
  ],
  gender: [
    { required: true, message: t('research.dataCollection.farmerPlot.rules.genderRequired'), trigger: 'change' }
  ],
  youthCategory: [
    { required: true, message: t('research.dataCollection.farmerPlot.rules.youthCategoryRequired'), trigger: 'change' }
  ],
  cooperativeMembership: [
    { required: true, message: t('research.dataCollection.farmerPlot.rules.cooperativeMembershipRequired'), trigger: 'blur' }
  ],
  plotSizeM2: [
    { required: true, message: t('research.dataCollection.farmerPlot.rules.plotSizeM2Required'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('research.dataCollection.farmerPlot.rules.plotSizeM2Min'), trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: t('research.dataCollection.farmerPlot.rules.contactPhoneRequired'), trigger: 'blur' },
    { pattern: /^[0-9+\-\s()]+$/, message: t('research.dataCollection.farmerPlot.rules.contactPhoneFormat'), trigger: 'blur' }
  ]
}))

// 加载详情数据
const loadDetail = async () => {
  try {
    const res = await getFarmerPlotDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    submitting.value = true

    const submitData = { ...formData }

    let res
    if (isEdit.value) {
      submitData.dataId = route.params.id
      res = await editFarmerPlot(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.farmerPlot.editSuccess'))
        router.push('/research/data-collection/farmer-plot')
      }
    } else {
      res = await addFarmerPlot(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.farmerPlot.addSuccess'))
        router.push('/research/data-collection/farmer-plot')
      }
    }
  } catch (error) {
    console.error('Form validation failed or submit error:', error)
  } finally {
    submitting.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.farmer-plot-form-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

/* 表单区域 */
.form-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 表单分节 */
.form-section {
  margin-bottom: 32px;
}

.form-section:last-of-type {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

/* 操作按钮 */
.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .form-wrapper {
    padding: 24px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
  }

  .header-left .el-button {
    font-size: 14px;
  }

  .page-title {
    font-size: 16px;
  }

  .header-right {
    display: none;
  }

  .form-wrapper {
    padding: 16px 12px;
    border-radius: 0;
    box-shadow: none;
  }

  .form-section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  /* 单列布局 */
  :deep(.el-row) {
    display: block !important;
  }

  :deep(.el-col) {
    max-width: 100% !important;
    margin-bottom: 0 !important;
  }

  :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  :deep(.el-form-item__label) {
    text-align: left !important;
    padding: 0 0 8px 0 !important;
    line-height: 1.4 !important;
    font-size: 14px;
  }

  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  :deep(.el-input),
  :deep(.el-select),
  :deep(.el-textarea),
  :deep(.el-input-number) {
    width: 100% !important;
  }

  :deep(.el-radio-group) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-actions {
    margin-top: 24px;
    padding-top: 20px;
    flex-direction: column;
    gap: 12px;
  }

  .form-actions .el-button {
    width: 100%;
    margin: 0;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
  }

  .header-content {
    padding: 10px 8px;
  }

  .page-title {
    font-size: 15px;
  }

  .form-wrapper {
    padding: 12px 8px;
  }

  .form-section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  :deep(.el-form-item__label) {
    font-size: 13px;
  }
}
</style>
