<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-edit-box-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <p class="page-subtitle">{{ $t('orgRegistration.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          :label-width="labelWidth"
          class="registration-form"
        >
          <!-- 基本信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-information-line"></i>
              {{ $t('orgRegistration.form.basicInfo') }}
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.orgType')" prop="orgType">
                  <el-select v-model="formData.orgType" :placeholder="$t('orgRegistration.placeholder.orgType')" style="width: 100%" :disabled="isView">
                    <el-option value="UNION" :label="$t('orgRegistration.orgType.UNION')"></el-option>
                    <el-option value="COOPERATIVE" :label="$t('orgRegistration.orgType.COOPERATIVE')"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.orgName')" prop="orgName">
                  <el-input v-model="formData.orgName" :placeholder="$t('orgRegistration.placeholder.orgName')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.unifiedCode')" prop="unifiedCode">
                  <el-input v-model="formData.unifiedCode" :placeholder="$t('orgRegistration.placeholder.unifiedCode')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.licenseNumber')" prop="licenseNumber">
                  <el-input v-model="formData.licenseNumber" :placeholder="$t('orgRegistration.placeholder.licenseNumber')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.licenseStart')" prop="licenseStart">
                  <el-date-picker
                    v-model="formData.licenseStart"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    :placeholder="$t('orgRegistration.placeholder.licenseStart')"
                    style="width: 100%"
                    :disabled="isView"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.licenseEnd')" prop="licenseEnd">
                  <el-date-picker
                    v-model="formData.licenseEnd"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    :placeholder="$t('orgRegistration.placeholder.licenseEnd')"
                    style="width: 100%"
                    :disabled="isView"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.inputTypes')" prop="inputTypes">
                  <el-select
                    v-model="inputTypesArray"
                    :placeholder="$t('orgRegistration.placeholder.inputTypes')"
                    style="width: 100%"
                    multiple
                    :disabled="isView"
                    v-loading="dictLoading"
                  >
                    <el-option
                      v-for="item in options.input_category"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 位置信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-map-pin-line"></i>
              {{ $t('orgRegistration.form.locationInfo') }}
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.regionCode')" prop="regionCode">
                  <el-cascader
                    v-model="regionCodePath"
                    :options="regionTreeOptions"
                    :placeholder="$t('orgRegistration.placeholder.regionCode')"
                    :props="{ checkStrictly: true, emitPath: false }"
                    filterable
                    clearable
                    style="width: 100%"
                    :disabled="isView"
                    v-loading="regionTreeLoading"
                    @change="handleRegionChange"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24">
                <el-form-item :label="$t('orgRegistration.form.fullAddress')" prop="fullAddress">
                  <el-input v-model="formData.fullAddress" :placeholder="$t('orgRegistration.placeholder.fullAddress')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.gpsLat')" prop="gpsLat">
                  <el-input v-model="formData.gpsLat" :placeholder="$t('orgRegistration.placeholder.gpsLat')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.gpsLng')" prop="gpsLng">
                  <el-input v-model="formData.gpsLng" :placeholder="$t('orgRegistration.placeholder.gpsLng')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 业务信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-building-line"></i>
              {{ $t('orgRegistration.form.businessInfo') }}
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.annualCapacity')" prop="annualCapacity">
                  <el-input-number v-model="formData.annualCapacity" :min="0" :precision="2" style="width: 100%" :disabled="isView"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 证照信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-file-text-line"></i>
              {{ $t('orgRegistration.form.certificateInfo') }}
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.businessLicenseUrl')" prop="businessLicenseUrl">
                  <el-input v-model="formData.businessLicenseUrl" :placeholder="$t('orgRegistration.placeholder.businessLicenseUrl')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.taxCertUrl')" prop="taxCertUrl">
                  <el-input v-model="formData.taxCertUrl" :placeholder="$t('orgRegistration.placeholder.taxCertUrl')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 联系信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-contacts-line"></i>
              {{ $t('orgRegistration.form.contactInfo') }}
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('orgRegistration.form.contactName')" prop="contactName">
                  <el-input v-model="formData.contactName" :placeholder="$t('orgRegistration.placeholder.contactName')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('orgRegistration.form.contactMobile')" prop="contactMobile">
                  <el-input v-model="formData.contactMobile" :placeholder="$t('orgRegistration.placeholder.contactMobile')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('orgRegistration.form.contactEmail')" prop="contactEmail">
                  <el-input v-model="formData.contactEmail" :placeholder="$t('orgRegistration.placeholder.contactEmail')" :disabled="isView"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 账号信息（仅新增时显示） -->
          <div class="form-section" v-if="!isView">
            <div class="section-title">
              <i class="ri-user-settings-line"></i>
              {{ $t('orgRegistration.form.accountInfo') }}
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.applyUsername')" prop="applyUsername">
                  <el-input 
                    v-model="formData.applyUsername" 
                    :placeholder="$t('orgRegistration.placeholder.applyUsername')"
                    @blur="checkUsername"
                  >
                    <template #append v-if="usernameCheckResult !== null">
                      <i :class="usernameCheckResult ? 'ri-check-line text-success' : 'ri-close-line text-danger'"></i>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="!isEdit">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.applyPassword')" prop="applyPassword">
                  <el-input v-model="formData.applyPassword" type="password" show-password :placeholder="$t('orgRegistration.placeholder.applyPassword')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('orgRegistration.form.confirmPassword')" prop="confirmPassword">
                  <el-input v-model="formData.confirmPassword" type="password" show-password :placeholder="$t('orgRegistration.placeholder.confirmPassword')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 审核历史（详情页显示） -->
          <div class="form-section" v-if="isView && auditLogs.length > 0">
            <div class="section-title">
              <i class="ri-history-line"></i>
              {{ $t('orgRegistration.form.auditHistory') }}
            </div>
            <el-timeline>
              <el-timeline-item
                v-for="log in auditLogs"
                :key="log.id"
                :type="log.auditResult === 1 ? 'success' : 'danger'"
                :timestamp="log.auditTime"
                placement="top"
              >
                <el-card>
                  <div class="audit-log-item">
                    <div class="audit-result">
                      <el-tag :type="log.auditResult === 1 ? 'success' : 'danger'">
                        {{ log.auditResult === 1 ? $t('orgRegistration.status.approved') : $t('orgRegistration.status.rejected') }}
                      </el-tag>
                    </div>
                    <div class="audit-info">
                      <span class="auditor">{{ $t('orgRegistration.form.auditorName') }}: {{ log.auditorName }}</span>
                    </div>
                    <div class="audit-comment" v-if="log.auditComment">
                      {{ log.auditComment }}
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting" v-if="!isView">
              {{ $t('common.submit') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { submitRegistration, getRegistrationDetail, checkUsernameUnique, getRegionTree, buildRegionPath } from '@/api/orgRegistration'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 响应式标签宽度
const labelWidth = computed(() => {
  const isMobile = window.innerWidth <= 768
  return isMobile ? '120px' : '180px'
})

// 页面模式
const isEdit = computed(() => route.name === 'OrgRegistrationEdit')
const isView = computed(() => route.name === 'OrgRegistrationDetail')

// 页面标题
const pageTitle = computed(() => {
  if (isView.value) return t('orgRegistration.form.title.view')
  if (isEdit.value) return t('orgRegistration.form.title.edit')
  return t('orgRegistration.form.title.add')
})

// 表单相关
const formRef = ref(null)
const submitting = ref(false)
const auditLogs = ref([])
const usernameCheckResult = ref(null)

// 行政区划树
const regionTreeOptions = ref([])
const regionTreeLoading = ref(false)
const regionCodePath = ref(null)

// 初始化字典
const { options, loading: dictLoading } = useDict(['input_category'], {
  immediate: true,
  cache: true
})

// 投入品类型数组（用于多选）
const inputTypesArray = ref([])

// 监听 inputTypesArray 变化，同步到 formData.inputTypes
watch(inputTypesArray, (val) => {
  formData.inputTypes = val.join(',')
})

// 表单数据
const formData = reactive({
  id: null,
  orgType: '',
  orgName: '',
  unifiedCode: '',
  licenseNumber: '',
  licenseStart: '',
  licenseEnd: '',
  inputTypes: '',
  regionCode: '',
  regionName: '',
  fullAddress: '',
  gpsLat: '',
  gpsLng: '',
  annualCapacity: null,
  businessLicenseUrl: '',
  taxCertUrl: '',
  otherCertsJson: '',
  applyUsername: '',
  applyPassword: '',
  confirmPassword: '',
  contactName: '',
  contactMobile: '',
  contactEmail: ''
})

// 密码确认验证
const validateConfirmPassword = (rule, value, callback) => {
  if (!isEdit.value && formData.applyPassword && value !== formData.applyPassword) {
    callback(new Error(t('orgRegistration.rules.passwordMismatch')))
  } else {
    callback()
  }
}

// 表单验证规则
const rules = reactive({
  orgType: [{ required: true, message: t('orgRegistration.rules.orgTypeRequired'), trigger: 'change' }],
  orgName: [{ required: true, message: t('orgRegistration.rules.orgNameRequired'), trigger: 'blur' }],
  licenseNumber: [{ required: true, message: t('orgRegistration.rules.licenseNumberRequired'), trigger: 'blur' }],
  licenseStart: [{ required: true, message: t('orgRegistration.rules.licenseStartRequired'), trigger: 'change' }],
  licenseEnd: [{ required: true, message: t('orgRegistration.rules.licenseEndRequired'), trigger: 'change' }],
  inputTypes: [{ required: true, message: t('orgRegistration.rules.inputTypesRequired'), trigger: 'change' }],
  regionCode: [{ required: true, message: t('orgRegistration.rules.regionCodeRequired'), trigger: 'change' }],
  businessLicenseUrl: [{ required: true, message: t('orgRegistration.rules.businessLicenseRequired'), trigger: 'blur' }],
  applyUsername: [{ required: true, message: t('orgRegistration.rules.applyUsernameRequired'), trigger: 'blur' }],
  applyPassword: [{ required: !isEdit.value, message: t('orgRegistration.rules.applyPasswordRequired'), trigger: 'blur' }],
  confirmPassword: [
    { required: !isEdit.value, message: t('orgRegistration.rules.confirmPasswordRequired'), trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
})

// 加载行政区划树
const loadRegionTree = async () => {
  regionTreeLoading.value = true
  try {
    const res = await getRegionTree()
    if (res.code === 200 && res.data) {
      regionTreeOptions.value = res.data
    }
  } catch (error) {
    console.error('Failed to load region tree:', error)
  } finally {
    regionTreeLoading.value = false
  }
}

// 处理区域选择变化
const handleRegionChange = (value) => {
  if (value) {
    // 使用 buildRegionPath 生成拼接格式
const { regionCode, regionName } = buildRegionPath(regionTreeOptions.value, value)
    formData.regionCode = regionCode
    formData.regionName = regionName
  } else {
    formData.regionCode = ''
    formData.regionName = ''
  }
}

// 检查用户名唯一性
const checkUsername = async () => {
  if (!formData.applyUsername) {
    usernameCheckResult.value = null
    return
  }
  try {
    const res = await checkUsernameUnique(formData.applyUsername, formData.id)
    if (res.code === 200) {
      usernameCheckResult.value = res.data
      if (!res.data) {
        ElMessage.warning(t('orgRegistration.messages.usernameUnavailable'))
      } else {
        ElMessage.success(t('orgRegistration.messages.usernameAvailable'))
      }
    }
  } catch (error) {
    console.error('Check username failed:', error)
  }
}

// 加载详情
const loadData = async () => {
  const id = route.params.id
  if (!id) return
  
  try {
    const res = await getRegistrationDetail(id)
    if (res.code === 200 && res.data) {
      const { baseInfo, auditLogs: logs } = res.data
      Object.assign(formData, baseInfo)
      formData.id = baseInfo.id
      auditLogs.value = logs || []
      
      // 解析 inputTypes 到数组
      if (baseInfo.inputTypes) {
        inputTypesArray.value = baseInfo.inputTypes.split(',').filter(Boolean)
      }
      
      // 设置区域选择器的值
      if (baseInfo.regionCode) {
        regionCodePath.value = baseInfo.regionCode
      }
    }
  } catch (error) {
    console.error('Load data failed:', error)
    ElMessage.error(t('orgRegistration.messages.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    // 用户名唯一性检查
    if (usernameCheckResult.value === false) {
      ElMessage.warning(t('orgRegistration.rules.usernameExists'))
      return
    }
    
    submitting.value = true
    
    const submitData = { ...formData }
    delete submitData.confirmPassword
    
    const res = await submitRegistration(submitData)
    if (res.code === 200) {
      ElMessage.success(t('orgRegistration.messages.submitSuccess'))
      router.push({ name: 'OrgRegistration' })
    } else {
      ElMessage.error(res.msg || t('orgRegistration.messages.submitFailed'))
    }
  } catch (error) {
    console.error('Submit failed:', error)
    ElMessage.error(t('orgRegistration.messages.submitFailed'))
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadRegionTree()
  if (isEdit.value || isView.value) {
    loadData()
  }
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.registration-form {
  max-width: 100%;
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e8f5e9;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 22px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

.audit-log-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.audit-result {
  margin-bottom: 8px;
}

.audit-info {
  color: #666;
  font-size: 14px;
}

.audit-comment {
  color: #333;
  margin-top: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}

.text-success {
  color: #67c23a;
}

.text-danger {
  color: #f56c6c;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .content-wrapper {
    padding: 20px;
    border-radius: 12px;
  }

  :deep(.el-form-item__label) {
    font-size: 14px !important;
  }
}
</style>
