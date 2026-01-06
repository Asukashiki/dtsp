<template>
  <div class="da-form-page">
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
          <h1 class="page-title">{{ isEdit ? $t('newFarm.da.edit') : $t('newFarm.da.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper" v-loading="pageLoading || regionLoading">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-position="top" class="da-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-user-star-line"></i>
            <h3>{{ $t('newFarm.da.sections.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('newFarm.da.form.daName')" prop="daName">
              <el-input
                  v-model="formData.daName"
                  :placeholder="$t('newFarm.da.placeholder.daName')"
                  maxlength="100"
                  show-word-limit
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.da.form.idCard')" prop="idCard">
              <el-input
                  v-model="formData.idCard"
                  :placeholder="$t('newFarm.da.placeholder.idCard')"
                  maxlength="50"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.da.form.gender')" prop="gender">
              <el-radio-group v-model="formData.gender">
                <el-radio label="MALE">{{ $t('newFarm.common.male') }}</el-radio>
                <el-radio label="FEMALE">{{ $t('newFarm.common.female') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('newFarm.da.form.phone')" prop="phone">
              <el-input
                  v-model="formData.phone"
                  :placeholder="$t('newFarm.da.placeholder.phone')"
                  maxlength="20"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.da.form.email')" prop="email">
              <el-input
                  v-model="formData.email"
                  :placeholder="$t('newFarm.da.placeholder.email')"
                  maxlength="100"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.da.form.address')" prop="address" class="full-width-item">
              <el-input
                  v-model="formData.address"
                  :placeholder="$t('newFarm.da.placeholder.address')"
                  maxlength="200"
                  show-word-limit
              />
            </el-form-item>
          </div>
        </div>

        <!-- 账号信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-account-circle-line"></i>
            <h3>{{ $t('newFarm.da.sections.accountInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('newFarm.da.form.account')" prop="account">
              <el-input
                  v-model="formData.account"
                  :placeholder="$t('newFarm.da.placeholder.account')"
                  :disabled="isEdit"
                  maxlength="50"
                  @blur="checkAccount"
              >
                <template #append v-if="!isEdit && accountCheckResult !== null">
                  <i :class="accountCheckResult ? 'ri-check-line' : 'ri-close-line'" 
                     :style="{ color: accountCheckResult ? '#67c23a' : '#f56c6c' }"></i>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item v-if="!isEdit" :label="$t('newFarm.da.form.password')" prop="password">
              <el-input
                  v-model="formData.password"
                  type="password"
                  :placeholder="$t('newFarm.da.placeholder.password')"
                  show-password
                  maxlength="20"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.da.form.accountStatus')" prop="accountStatus">
              <el-switch
                  v-model="formData.accountStatus"
                  active-value="1"
                  inactive-value="0"
                  :active-text="$t('newFarm.da.status.enabled')"
                  :inactive-text="$t('newFarm.da.status.disabled')"
              />
            </el-form-item>
          </div>
        </div>

        <!-- 区划信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-map-pin-line"></i>
            <h3>{{ $t('newFarm.da.sections.regionInfo') }}</h3>
          </div>
          <div class="form-grid">
            <!-- 行政区划级联选择 (只能选择Woreda级别: orgType='1' && orgGrade=4) -->
            <el-form-item :label="$t('newFarm.common.woredaCode')" prop="woredaCode">
              <el-cascader
                v-model="regionCodePath"
                :options="regionTreeOptions"
                :placeholder="$t('newFarm.common.selectWoreda')"
                :props="cascaderProps"
                filterable
                clearable
                style="width: 100%"
                v-loading="regionTreeLoading"
                @change="handleRegionChange"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.da.form.kebeleCodes')" prop="kebeleCodes">
              <el-select
                  v-model="formData.kebeleCodes"
                  :placeholder="$t('newFarm.da.placeholder.kebeleCodes')"
                  :disabled="kebeleOptions.length === 0">
                <el-option
                    v-for="item in kebeleOptions"
                    :key="item.code || item.id"
                    :label="item.name"
                    :value="item.code || item.id"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <!-- 备注 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-file-text-line"></i>
            <h3>{{ $t('newFarm.common.remark') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('newFarm.common.remark')" prop="remark" class="full-width-item">
              <el-input
                  v-model="formData.remark"
                  type="textarea"
                  :rows="4"
                  :placeholder="$t('newFarm.da.placeholder.remark')"
                  maxlength="500"
                  show-word-limit
              />
            </el-form-item>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="saveLoading" @click="handleSubmit">
            {{ $t('common.save') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
import { getDaDetail, addDa, updateDa, checkDaAccountUnique } from '@/api/newFarm'
import { listSubRegionByCode } from '@/api/application'
import { getRegionTree, buildRegionPath } from '@/api/orgRegistration'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const isRegionDisabled = ref(false) // 控制地区元素禁用
// AES encryption key
const keyStr = 'ab489fe897hh78ha';

// Form related references
const formRef = ref(null)
const saveLoading = ref(false)
const pageLoading = ref(false)
const isEdit = computed(() => !!route.params.id)

// 账号唯一性检查
const accountCheckResult = ref(null)

// User info storage
const userInfo = ref(null)

// Region related state
const regionLoading = ref(false)
const regionTreeOptions = ref([]) // 区域树结构
const regionTreeLoading = ref(false)
const regionCodePath = ref(null) // 级联选择器的值
const kebeleOptions = ref([]) // Kebele下拉选项

// 级联选择器配置 - 只允许选择Woreda级别 (orgType='1' && orgGrade=4)
const cascaderProps = {
  checkStrictly: true,
  emitPath: false,
  // 禁用非Woreda级别的节点选择
  disabled: (data) => {
    // 只有 orgType='1' 且 orgGrade=4 的节点可以被选择
    return !(data.orgType === '1' && data.orgGrade === 4)
  }
}

// Form data
const formData = reactive({
  daName: '',
  idCard: '',
  gender: 'MALE',
  phone: '',
  email: '',
  address: '',
  account: '',
  password: '',
  accountStatus: '1',
  zoneCode: '', // Zone code (hidden storage)
  woredaCode: '', // Woreda code (hidden storage)
  kebeleCodes: '', // Kebele code (single selection)
  remark: ''
})

// Form validation rules (including mandatory field validation for registration API)
const formRules = computed(() => ({
  daName: [
    { required: true, message: t('newFarm.da.rules.daNameRequired'), trigger: 'blur' },
    { max: 100, message: t('newFarm.da.rules.daNameLength'), trigger: 'blur' }
  ],
  idCard: [
    { required: true, message: t('newFarm.da.rules.idCardRequired'), trigger: 'blur' }
  ],
  account: [
    { required: true, message: t('newFarm.da.rules.accountRequired'), trigger: 'blur' },
    { max: 50, message: t('newFarm.da.rules.accountLength'), trigger: 'blur' }
  ],
  password: [
    { required: !isEdit.value, message: t('newFarm.da.rules.passwordRequired'), trigger: 'blur' },
    { min: 6, max: 20, message: t('newFarm.da.rules.passwordLength'), trigger: 'blur' }
  ],
  phone: [
    { required: true, message: t('newFarm.da.rules.phoneRequired'), trigger: 'blur' },
    { pattern: /^[0-9+\-\s]+$/, message: t('newFarm.da.rules.phoneFormat'), trigger: 'blur' }
  ],
  email: [
    { required: true, message: t('newFarm.da.rules.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('newFarm.da.rules.emailFormat'), trigger: 'blur' }
  ],
  woredaCode: [
    { required: true, message: t('newFarm.da.rules.woredaCodeRequired'), trigger: 'blur' }
  ],
  zoneCode: [
    { required: true, message: t('newFarm.da.rules.zoneCodeRequired'), trigger: ['blur', 'change'] }
  ],
  kebeleCodes: [
    { required: true, message: t('newFarm.da.rules.kebeleCodesRequired'), trigger: 'change' }
  ]
}))

// Go back to previous page
const goBack = () => {
  router.back()
}

// 检查账号唯一性
const checkAccount = async () => {
  if (!formData.account || isEdit.value) {
    accountCheckResult.value = null
    return
  }
  try {
    const res = await checkDaAccountUnique(formData.account, '')
    if (res.code === 200) {
      accountCheckResult.value = res.data
      if (!res.data) {
        ElMessage.warning(t('newFarm.da.messages.accountUnavailable'))
      }
    }
  } catch (error) {
    console.error('Check account failed:', error)
  }
}

// AES encrypt password
const encryptPassword = (password) => {
  if (!password) return ''
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const encrypted = CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// Load detail (edit mode)
const loadDetail = async () => {
  pageLoading.value = true
  try {
    const res = await getDaDetail(route.params.id)
    if (res.code === 200 && res.data) {
      const data = res.data
      formData.daName = data.daName || ''
      formData.idCard = data.idCard || ''
      formData.gender = data.gender || 'MALE'
      formData.phone = data.phone || ''
      formData.email = data.email || ''
      formData.address = data.address || ''
      formData.account = data.account || ''
      formData.accountStatus = data.accountStatus || '1'
      formData.zoneCode = data.zoneCode || ''
      formData.woredaCode = data.woredaCode || ''

      // 设置级联选择器的值
      if (formData.woredaCode) {
        regionCodePath.value = formData.woredaCode
        // 加载Kebele列表
        try {
          const kebeleRes = await listSubRegionByCode({ regionCode: formData.woredaCode })
          if (kebeleRes.code === 200) {
            kebeleOptions.value = kebeleRes.data || []
          }
        } catch (error) {
          console.error('Failed to load kebele list:', error)
        }
      }

      // Adapt Kebele single selection
      if (data.kebeleCodes) {
        formData.kebeleCodes = Array.isArray(data.kebeleCodes)
            ? data.kebeleCodes[0] || ''
            : data.kebeleCodes.split(',')[0] || ''
      }
      formData.remark = data.remark || ''
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    pageLoading.value = false
  }
}

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
const handleRegionChange = async (value) => {
  if (value) {
    const { regionCode, regionName } = buildRegionPath(regionTreeOptions.value, value)
    formData.woredaCode = regionCode
    formData.zoneCode = '' // 从选中节点父级解析
    
    // 加载Kebele列表
    try {
      const kebeleRes = await listSubRegionByCode({ regionCode: regionCode })
      if (kebeleRes.code === 200) {
        kebeleOptions.value = kebeleRes.data || []
        // 清空已选Kebele
        formData.kebeleCodes = ''
      }
    } catch (error) {
      console.error('Failed to load kebele list:', error)
      kebeleOptions.value = []
    }
  } else {
    formData.woredaCode = ''
    formData.zoneCode = ''
    kebeleOptions.value = []
    formData.kebeleCodes = ''
  }
}

// Parse user info
const parseUserInfo = () => {
  const userInfoStr = localStorage.getItem('userInfo')
  if (userInfoStr) {
    try {
      const parsedUserInfo = JSON.parse(userInfoStr)
      userInfo.value = parsedUserInfo
    } catch (error) {
      console.error('Failed to parse user info:', error)
    }
  }
}

// Submit form
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      // 检查账号唯一性
      if (!isEdit.value && accountCheckResult.value === false) {
        ElMessage.warning(t('newFarm.da.messages.accountUnavailable'))
        return
      }

      saveLoading.value = true
      try {
        const submitData = {
          daName: formData.daName,
          idCard: formData.idCard,
          gender: formData.gender,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          account: formData.account,
          accountStatus: formData.accountStatus,
          zoneCode: formData.zoneCode,
          woredaCode: formData.woredaCode,
          kebeleCodes: formData.kebeleCodes,
          remark: formData.remark
        }

        // Add password in add mode
        if (!isEdit.value) {
          submitData.password = formData.password
        }

        let res
        if (isEdit.value) {
          // Edit DA info
          res = await updateDa(route.params.id, submitData)
        } else {
          // Add DA info (后端会自动同步到用户中心)
          res = await addDa(submitData)
        }

        if (res.code === 200) {
          ElMessage.success(isEdit.value ? t('newFarm.da.messages.editSuccess') : t('newFarm.da.messages.addSuccess'))
          setTimeout(() => router.back(), 1000)
        } else {
          ElMessage.error(res.msg || t('common.failed'))
        }
      } catch (error) {
        console.error('Failed to save:', error)
        ElMessage.error(t('common.failed'))
      } finally {
        saveLoading.value = false
      }
    }
  })
}

// Page mount logic
onMounted(async () => {
  // 加载区域树
  await loadRegionTree()
  
  parseUserInfo()
  
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.da-form-page {
  min-height: calc(100vh - 120px);
}

/* Page header */
.page-header {
  background: white;
  padding: 16px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* Form area */
.form-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-block {
  margin-bottom: 32px;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

.block-header i {
  font-size: 20px;
  color: #009A44;
}

.block-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.full-width-item {
  grid-column: 1 / -1;
}

.full-width {
  width: 100%;
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
}

/* Responsive design */
@media screen and (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-center {
    text-align: left;
  }

  .form-wrapper {
    padding: 16px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }
}
</style>