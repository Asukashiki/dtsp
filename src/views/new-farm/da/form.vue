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
    <div class="form-wrapper" v-loading="pageLoading">
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
              />
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

            <el-form-item :label="$t('newFarm.da.form.kebeleCodes')" prop="kebeleCodes" class="full-width-item">
              <el-input
                v-model="formData.kebeleCodes"
                :placeholder="$t('newFarm.da.placeholder.kebeleCodes')"
                maxlength="500"
              />
              <div class="form-tip">{{ $t('newFarm.da.tips.kebeleCodes') }}</div>
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
import {
  getDaDetail,
  addDa,
  updateDa
} from '@/api/newFarm'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const saveLoading = ref(false)
const pageLoading = ref(false)
const isEdit = computed(() => !!route.params.id)

// 表单数据
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
  zoneCode: '',
  woredaCode: '',
  kebeleCodes: '',
  remark: ''
})

// 表单验证规则
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
    { pattern: /^[0-9+\-\s]+$/, message: t('newFarm.da.rules.phoneFormat'), trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: t('newFarm.da.rules.emailFormat'), trigger: 'blur' }
  ],
  woredaCode: [
    { required: true, message: t('newFarm.da.rules.woredaCodeRequired'), trigger: 'blur' }
  ]
}))

// 返回
const goBack = () => {
  router.back()
}

// 加载详情(编辑模式)
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
      formData.kebeleCodes = data.kebeleCodes || ''
      formData.remark = data.remark || ''
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    pageLoading.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      saveLoading.value = true
      try {
        const data = {
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

        if (!isEdit.value) {
          data.password = formData.password
        }

        let res
        if (isEdit.value) {
          res = await updateDa(route.params.id, data)
        } else {
          res = await addDa(data)
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

onMounted(() => {
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.da-form-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
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

/* 表单区域 */
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

/* 响应式设计 */
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
