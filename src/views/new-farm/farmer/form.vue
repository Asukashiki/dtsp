<template>
  <div class="farmer-form-page">
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
          <h1 class="page-title">{{ isEdit ? $t('newFarm.farmer.edit') : $t('newFarm.farmer.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper" v-loading="pageLoading">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-position="top" class="farmer-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-user-line"></i>
            <h3>{{ $t('newFarm.farmer.sections.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('newFarm.farmer.form.farmerName')" prop="farmerName">
              <el-input
                  v-model="formData.farmerName"
                  :placeholder="$t('newFarm.farmer.placeholder.farmerName')"
                  maxlength="100"
                  show-word-limit
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.farmer.form.idCard')" prop="idCard">
              <el-input
                  v-model="formData.idCard"
                  :placeholder="$t('newFarm.farmer.placeholder.idCard')"
                  maxlength="50"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.farmer.form.gender')" prop="gender">
              <el-radio-group v-model="formData.gender">
                <el-radio label="MALE">{{ $t('newFarm.common.male') }}</el-radio>
                <el-radio label="FEMALE">{{ $t('newFarm.common.female') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('newFarm.farmer.form.birthDate')" prop="birthDate">
              <el-date-picker
                  v-model="formData.birthDate"
                  type="date"
                  :placeholder="$t('newFarm.farmer.placeholder.birthDate')"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.farmer.form.youthCategory')" prop="youthCategory">
              <el-radio-group v-model="formData.youthCategory">
                <el-radio label="1">{{ $t('common.yes') }}</el-radio>
                <el-radio label="0">{{ $t('common.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('newFarm.farmer.form.phone')" prop="phone">
              <el-input
                  v-model="formData.phone"
                  :placeholder="$t('newFarm.farmer.placeholder.phone')"
                  maxlength="20"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.farmer.form.email')" prop="email">
              <el-input
                  v-model="formData.email"
                  :placeholder="$t('newFarm.farmer.placeholder.email')"
                  maxlength="100"
              />
            </el-form-item>

            <el-form-item :label="`${$t('newFarm.common.createTime')}`" prop="createTime">
              <el-input
                  v-model="formData.createTime"
                  readonly
                  :placeholder="$t('newFarm.common.createTime')"
                  style="cursor: default;"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.farmer.form.address')" prop="address" class="full-width-item">
              <el-input
                  v-model="formData.address"
                  :placeholder="$t('newFarm.farmer.placeholder.address')"
                  maxlength="200"
                  show-word-limit
              />
            </el-form-item>
          </div>
        </div>

        <!-- 组织信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-building-line"></i>
            <h3>{{ $t('newFarm.farmer.sections.orgInfo') }}</h3>
          </div>

          <div class="form-grid">
            <el-form-item
                :label="$t('newFarm.farmer.form.daId')"
                prop="daId"
                :error="daMatchError"
            >
              <el-select
                  v-model="formData.daId"
                  :placeholder="daPlaceholder"
                  filterable
                  clearable
                  style="width: 100%"
              >
                <el-option
                    v-for="item in daOptions"
                    :key="item.daId"
                    :label="item.daName"
                    :value="item.daId"
                />
              </el-select>
            </el-form-item>
            <div></div>
          </div>

          <div class="form-grid">
            <el-form-item :label="$t('newFarm.common.zoneCode')" prop="zoneCode">
              <el-input
                  v-model="formData.zoneCode"
                  :placeholder="$t('newFarm.common.selectZone')"
                  maxlength="50"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.common.woredaCode')" prop="woredaCode">
              <el-input
                  v-model="formData.woredaCode"
                  :placeholder="$t('newFarm.common.selectWoreda')"
                  maxlength="50"
              />
            </el-form-item>
          </div>

          <div class="form-grid">
            <el-form-item :label="$t('newFarm.farmer.form.cooperativeId')" prop="cooperativeId">
              <el-input
                  v-model="formData.cooperativeId"
                  :placeholder="$t('newFarm.farmer.placeholder.cooperativeId')"
                  maxlength="50"
              />
            </el-form-item>

            <el-form-item :label="$t('newFarm.common.kebeleCode')" prop="kebeleCode">
              <el-input
                  v-model="formData.kebeleCode"
                  :placeholder="$t('newFarm.common.selectKebele')"
                  maxlength="50"
              />
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
                  :placeholder="$t('newFarm.farmer.placeholder.remark')"
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  getFarmerDetail,
  addFarmer,
  updateFarmer,
  getDaOptions
} from '@/api/newFarm'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const saveLoading = ref(false)
const pageLoading = ref(false)
const isEdit = computed(() => !!route.params.id)
const daOptions = ref([])

const daMatchError = computed(() => {
  if (defaultDaName.value) {
    const targetDa = daOptions.value.find(item => item.daName === defaultDaName.value)
    if (!targetDa) {
      return t('newFarm.farmer.tips.daNotInOptions', { name: defaultDaName.value })
    }
  }
  return ''
})
const defaultDaName = ref('')
const daPlaceholder = computed(() => {
  if (defaultDaName.value && daMatchError.value) {
    return t('newFarm.farmer.tips.daReadedNotInOptions', { name: defaultDaName.value })
  }
  return t('newFarm.farmer.placeholder.daId')
})

// 表单数据
const formData = reactive({
  farmerName: '',
  idCard: '',
  gender: 'MALE',
  birthDate: '',
  createTime: '',
  youthCategory: '',
  phone: '',
  email: '',
  address: '',
  unionId: '',
  cooperativeId: '',
  daId: '',
  zoneCode: '',
  woredaCode: '',
  kebeleCode: '',
  remark: ''
})

// 表单验证规则
const formRules = computed(() => ({
  farmerName: [
    { required: true, message: t('newFarm.farmer.rules.farmerNameRequired'), trigger: 'blur' },
    { max: 100, message: t('newFarm.farmer.rules.farmerNameLength'), trigger: 'blur' }
  ],
  idCard: [
    { required: true, message: t('newFarm.farmer.rules.idCardRequired'), trigger: 'blur' }
  ],
  phone: [
    { pattern: /^[0-9+\-\s]+$/, message: t('newFarm.farmer.rules.phoneFormat'), trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: t('newFarm.farmer.rules.emailFormat'), trigger: 'blur' }
  ],
  kebeleCode: [
    { required: true, message: t('newFarm.farmer.rules.kebeleCodeRequired'), trigger: 'blur' }
  ]
}))

const goBack = () => {
  router.back()
}

const loadDaOptions = async () => {
  try {
    const res = await getDaOptions(formData.kebeleCode)
    if (res.code === 200) {
      daOptions.value = res.data || []
      const userInfoStr = localStorage.getItem('userInfo')
      if (userInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr)
          defaultDaName.value = userInfo.user.NAME || ''
          if (defaultDaName.value) {
            const targetDa = daOptions.value.find(item => item.daName === defaultDaName.value)
            if (targetDa) {
              formData.daId = targetDa.daId
              daMatchError.value = ''
            } else {
              daMatchError.value = t('newFarm.farmer.tips.daNotInOptions', { name: defaultDaName.value })
            }
          }
        } catch (e) {
          console.error('解析userInfo失败:', e)
          daMatchError.value = ''
        }
      }
    }
  } catch (error) {
    console.error('Failed to load DA options:', error)
    daMatchError.value = ''
  }
}

const loadDetail = async () => {
  pageLoading.value = true
  try {
    const res = await getFarmerDetail(route.params.id)
    if (res.code === 200 && res.data) {
      const data = res.data
      formData.farmerName = data.farmerName || ''
      formData.idCard = data.idCard || ''
      formData.gender = data.gender || 'MALE'
      formData.birthDate = data.birthDate || ''
      formData.createTime = data.createTime ? data.createTime.split(' ')[0] : formData.createTime
      formData.youthCategory = data.youthCategory || ''
      formData.phone = data.phone || ''
      formData.email = data.email || ''
      formData.address = data.address || ''
      formData.unionId = data.unionId || ''
      formData.cooperativeId = data.cooperativeId || ''
      formData.daId = data.daId || ''
      formData.zoneCode = data.zoneCode || ''
      formData.woredaCode = data.woredaCode || ''
      formData.kebeleCode = data.kebeleCode || ''
      formData.remark = data.remark || ''
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    pageLoading.value = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  if (daMatchError.value && !formData.daId) {
    ElMessage.error(t('newFarm.farmer.tips.selectValidDa'))
    return
  }

  await formRef.value.validate(async (valid) => {
    if (valid) {
      saveLoading.value = true
      try {
        const data = { ...formData }
        let res
        if (isEdit.value) {
          res = await updateFarmer(route.params.id, data)
        } else {
          res = await addFarmer(data)
        }
        if (res.code === 200) {
          ElMessage.success(isEdit.value ? t('newFarm.farmer.messages.editSuccess') : t('newFarm.farmer.messages.addSuccess'))
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

watch(
    () => formData.daId,
    (newVal) => {
      if (newVal) {
        daMatchError.value = ''
      }
    },
    { immediate: true }
)

onMounted(async () => {
  // 初始化创建时间
  const formatCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  formData.createTime = formatCurrentDate()

  await loadDaOptions()
  if (isEdit.value) {
    await loadDetail()
    const draftStr = sessionStorage.getItem('farmerFormDraft')
  }
})
</script>

<style scoped>
.farmer-form-page { min-height: calc(100vh - 120px); }

.page-header { background: white; padding: 16px 0; margin: -24px 0 24px 0; border-radius: 0 0 12px 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); }
.header-content { max-width: 100%; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
.header-left { display: flex; align-items: center; }
.header-center { text-align: center; }
.page-title { font-size: 20px; font-weight: 600; color: #303133; margin: 0; }

.form-wrapper { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); }
.form-block { margin-bottom: 32px; }
.block-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #f0f2f5; }
.block-header i { font-size: 20px; color: #009A44; }
.block-header h3 { font-size: 16px; font-weight: 600; color: #303133; margin: 0; }

.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.full-width-item { grid-column: 1 / -1; }

.form-actions { display: flex; justify-content: flex-end; gap: 16px; padding-top: 24px; border-top: 1px solid #f0f2f5; }

@media screen and (max-width: 1024px) {
  .form-grid { grid-template-columns: 1fr; }
}

@media screen and (max-width: 768px) {
  .page-header { margin: -16px -16px 16px -16px; }
  .header-content { padding: 0 16px; grid-template-columns: auto 1fr; gap: 16px; }
  .header-center { text-align: left; }
  .form-wrapper { padding: 16px; }
  .form-actions { flex-direction: column; }
  .form-actions .el-button { width: 100%; }
}
</style>