<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('newFarm.farmer.edit') : $t('newFarm.farmer.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          v-loading="pageLoading"
          :model="formData"
          :rules="formRules"
          label-width="140px">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('newFarm.farmer.sections.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.farmer.form.farmerName')" prop="farmerName">
                    <el-input
                      v-model="formData.farmerName"
                      :placeholder="$t('newFarm.farmer.placeholder.farmerName')"
                      maxlength="100"
                      show-word-limit />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.farmer.form.idCard')" prop="idCard">
                    <el-input
                      v-model="formData.idCard"
                      :placeholder="$t('newFarm.farmer.placeholder.idCard')"
                      maxlength="50" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.farmer.form.gender')" prop="gender">
                    <el-radio-group v-model="formData.gender">
                      <el-radio label="MALE">{{ $t('newFarm.common.male') }}</el-radio>
                      <el-radio label="FEMALE">{{ $t('newFarm.common.female') }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('common.birthDate')" prop="birthday">
                    <el-date-picker
                      v-model="formData.birthday"
                      type="date"
                      :placeholder="$t('common.birthDate')"
                      value-format="YYYY-MM-DD"
                      style="width: 100%" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.farmer.form.youthCategory')" prop="youthCategory">
                    <el-radio-group v-model="formData.youthCategory">
                      <el-radio label="1">{{ $t('common.yes') }}</el-radio>
                      <el-radio label="0">{{ $t('common.no') }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.farmer.form.phone')" prop="phone">
                    <el-input
                      v-model="formData.phone"
                      :placeholder="$t('newFarm.farmer.placeholder.phone')"
                      maxlength="20" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.farmer.form.email')" prop="email">
                    <el-input
                      v-model="formData.email"
                      :placeholder="$t('newFarm.farmer.placeholder.email')"
                      maxlength="100" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.common.createTime')" prop="createTime">
                    <el-input
                      v-model="formData.createTime"
                      readonly
                      :placeholder="$t('newFarm.common.createTime')"
                      style="cursor: default;" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('newFarm.farmer.form.address')" prop="address">
                    <el-input
                      v-model="formData.address"
                      :placeholder="$t('newFarm.farmer.placeholder.address')"
                      maxlength="200"
                      show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 组织信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('newFarm.farmer.sections.orgInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item
                    :label="$t('newFarm.farmer.form.daId')"
                    prop="daId"
                    :error="daMatchError">
                    <el-select
                      v-model="formData.daId"
                      :placeholder="daPlaceholder"
                      filterable
                      clearable
                      style="width: 100%">
                      <el-option
                        v-for="item in daOptions"
                        :key="item.daId"
                        :label="item.daName"
                        :value="item.daId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" />

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.common.zoneCode')" prop="zoneCode">
                    <el-select
                      v-model="formData.zoneCode"
                      :placeholder="$t('newFarm.common.selectZone')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleZoneChange"
                      :loading="zoneLoading">
                      <el-option
                        v-for="item in zoneOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.common.woredaCode')" prop="woredaCode">
                    <el-select
                      v-model="formData.woredaCode"
                      :placeholder="$t('newFarm.common.selectWoreda')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleWoredaChange"
                      :loading="woredaLoading"
                      :disabled="!formData.zoneCode">
                      <el-option
                        v-for="item in woredaOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.common.kebeleCode')" prop="kebeleCode">
                    <el-select
                      v-model="formData.kebeleCode"
                      :placeholder="$t('newFarm.common.selectKebele')"
                      filterable
                      clearable
                      style="width: 100%"
                      :loading="kebeleLoading"
                      :disabled="!formData.woredaCode"
                      @change="handleKebeleChange">
                      <el-option
                        v-for="item in kebeleOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('newFarm.farmer.form.cooperativeId')" prop="cooperativeId">
                    <el-input
                      v-model="formData.cooperativeId"
                      :placeholder="$t('newFarm.farmer.placeholder.cooperativeId')"
                      maxlength="50"
                      readonly
                      :disabled="!formData.woredaCode"
                      style="cursor: default;" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 备注卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('newFarm.common.remark') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item :label="$t('newFarm.common.remark')" prop="remark">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="4"
                      :placeholder="$t('newFarm.farmer.placeholder.remark')"
                      maxlength="500"
                      show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮区域（底部） -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" :loading="saveLoading" @click="handleSubmit">
              {{ $t('common.save') }}
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
import {
  getFarmerDetail,
  addFarmer,
  updateFarmer,
  getDaOptions
} from '@/api/newFarm'
import { listSubRegionByCode, allTree } from '@/api/application'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const saveLoading = ref(false)
const pageLoading = ref(false)
const isEdit = computed(() => !!route.params.id)
const daOptions = ref([])

// 三级联动相关状态
const zoneOptions = ref([])
const woredaOptions = ref([])
const kebeleOptions = ref([])
const zoneLoading = ref(false)
const woredaLoading = ref(false)
const kebeleLoading = ref(false)
const ORomiaRegionCode = '000000000000'

// DA匹配错误提示逻辑
const daMatchError = computed(() => {
  if (formData.daId) {
    return ''
  }
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
  if (formData.daId) {
    return t('newFarm.farmer.placeholder.daId')
  }
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
  birthday: '',
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
  ],
  zoneCode: [
    { required: true, message: t('newFarm.farmer.rules.zoneCodeRequired'), trigger: 'change' }
  ],
  woredaCode: [
    { required: true, message: t('newFarm.farmer.rules.woredaCodeRequired'), trigger: 'change' }
  ]
}))

const goBack = () => {
  router.back()
}

// 加载Zone选项（奥罗米亚州下的子区划）
const loadZoneOptions = async () => {
  zoneLoading.value = true
  try {
    const res = await listSubRegionByCode({ regionCode: ORomiaRegionCode })
    if (res.code === 200) {
      zoneOptions.value = res.data || []
    }
  } catch (error) {
    ElMessage.error(t('newFarm.common.loadZoneFailed'))
  } finally {
    zoneLoading.value = false
  }
}

// Zone选择变化：清空所有下级，加载Woreda
const handleZoneChange = async (zoneCode) => {
  formData.woredaCode = ''
  formData.kebeleCode = ''
  formData.cooperativeId = ''
  woredaOptions.value = []
  kebeleOptions.value = []

  if (!zoneCode) return

  woredaLoading.value = true
  try {
    const res = await listSubRegionByCode({ regionCode: zoneCode })
    if (res.code === 200) {
      woredaOptions.value = res.data || []
    }
  } catch (error) {
    ElMessage.error(t('newFarm.common.loadWoredaFailed'))
  } finally {
    woredaLoading.value = false
  }
}

// Woreda选择变化：加载Kebele并调用allTree接口获取合作社信息
const handleWoredaChange = async (woredaCode) => {
  formData.kebeleCode = ''
  formData.cooperativeId = ''
  kebeleOptions.value = []

  if (!woredaCode) return

  woredaLoading.value = true
  try {
    // 加载Kebele选项
    const kebeleRes = await listSubRegionByCode({ regionCode: woredaCode })
    if (kebeleRes.code === 200) {
      kebeleOptions.value = kebeleRes.data || []
    }

    // 调用allTree接口获取合作社信息
    const coopRes = await allTree({ rootId: woredaCode })
    if (coopRes.code === 200) {
      // 适配接口返回格式获取合作社名称
      const orgName = Array.isArray(coopRes.data)
          ? (coopRes.data[0]?.children[0]?.orgName || '')
          : (coopRes.data?.children[0]?.orgName || '')
      formData.cooperativeId = orgName
    }
  } catch (error) {
    ElMessage.error(t('newFarm.common.loadWoredaFailed') || 'Failed to load the Woreda association information')
  } finally {
    woredaLoading.value = false
  }
}

// Kebele选择变化：刷新DA选项
const handleKebeleChange = async (kebeleCode) => {
  if (!kebeleCode) {
    await loadDaOptions()
    return
  }
  await loadDaOptions()
}

// 加载DA选项（依赖KebeleCode）
const loadDaOptions = async () => {
  try {
    const res = await getDaOptions(formData.kebeleCode)
    if (res.code === 200) {
      daOptions.value = res.data || []
      const userInfoStr = localStorage.getItem('userInfo')
      if (userInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr)
          // 兼容 userInfo.userInfo.user 和 userInfo.user 两种结构
          const user = userInfo?.userInfo?.user || userInfo?.user
          defaultDaName.value = user?.NAME || user?.name || ''
          if (defaultDaName.value) {
            const targetDa = daOptions.value.find(item => item.daName === defaultDaName.value)
            if (targetDa) {
              formData.daId = targetDa.daId
            }
          }
        } catch (e) {
          ElMessage.error(t('common.parseDataError'))
        }
      }
    }
  } catch (error) {
    ElMessage.error(t('newFarm.common.loadDaFailed'))
  }
}

// 加载详情（编辑模式）
const loadDetail = async () => {
  pageLoading.value = true
  try {
    const res = await getFarmerDetail(route.params.id)
    if (res.code === 200 && res.data) {
      const data = res.data
      
      // 先赋值基础字段
      formData.farmerName = data.farmerName || ''
      formData.idCard = data.idCard || ''
      formData.gender = data.gender || 'MALE'
      formData.birthday = data.birthday || ''
      formData.createTime = data.createTime ? data.createTime.split(' ')[0] : formData.createTime
      formData.youthCategory = data.youthCategory || ''
      formData.phone = data.phone || ''
      formData.email = data.email || ''
      formData.address = data.address || ''
      formData.unionId = data.unionId || ''
      formData.remark = data.remark || ''

      // 保存原始的三级联动值
      const savedZoneCode = data.zoneCode || ''
      const savedWoredaCode = data.woredaCode || ''
      const savedKebeleCode = data.kebeleCode || ''
      const savedDaId = data.daId || ''

      // 编辑模式回显联动数据：Zone→Woreda→Kebele
      if (savedZoneCode) {
        await loadZoneOptions()
        
        // 加载Woreda选项（不使用handleZoneChange，避免清空数据）
        woredaLoading.value = true
        try {
          const woredaRes = await listSubRegionByCode({ regionCode: savedZoneCode })
          if (woredaRes.code === 200) {
            woredaOptions.value = woredaRes.data || []
          }
        } catch (error) {
          ElMessage.error(t('newFarm.common.loadWoredaFailed'))
        } finally {
          woredaLoading.value = false
        }

        // 如果有Woreda，加载Kebele选项和Cooperative信息
        if (savedWoredaCode) {
          woredaLoading.value = true
          try {
            // 加载Kebele选项
            const kebeleRes = await listSubRegionByCode({ regionCode: savedWoredaCode })
            if (kebeleRes.code === 200) {
              kebeleOptions.value = kebeleRes.data || []
            }

            // 加载Cooperative信息
            const coopRes = await allTree({ rootId: savedWoredaCode })
            if (coopRes.code === 200) {
              const orgName = Array.isArray(coopRes.data)
                  ? (coopRes.data[0]?.children[0]?.orgName || '')
                  : (coopRes.data?.children[0]?.orgName || '')
              formData.cooperativeId = orgName || data.cooperativeId || ''
            }
          } catch (error) {
            ElMessage.error(t('newFarm.common.loadWoredaFailed'))
          } finally {
            woredaLoading.value = false
          }
        }

        // 最后恢复三级联动的值
        formData.zoneCode = savedZoneCode
        formData.woredaCode = savedWoredaCode
        formData.kebeleCode = savedKebeleCode

        // 如果有Kebele，加载DA选项
        if (savedKebeleCode) {
          await loadDaOptions()
          // 恢复DA值
          formData.daId = savedDaId
        }
      }
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

  if (daMatchError.value && !formData.daId) {
    ElMessage.error(t('newFarm.farmer.tips.selectValidDa'))
    return
  }

  await formRef.value.validate(async (valid) => {
    if (valid) {
      saveLoading.value = true
      try {
        const data = { ...formData }
        delete data.createTime;

        // 新增和编辑：提交时都同时传递 zoneCode/woredaCode/kebeleCode 及对应的 Name 字段
        const zone = zoneOptions.value.find(item => item.code === data.zoneCode)
        const woreda = woredaOptions.value.find(item => item.code === data.woredaCode)
        const kebele = kebeleOptions.value.find(item => item.code === data.kebeleCode)

        if (zone) {
          data.zoneName = zone.name
        }
        if (woreda) {
          data.woredaName = woreda.name
        }
        if (kebele) {
          data.kebeleName = kebele.name
        }

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
        ElMessage.error(t('common.failed'))
      } finally {
        saveLoading.value = false
      }
    }
  })
}

watch(
    () => formData.daId,
    (newVal) => {},
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

  // 初始化加载Zone选项
  await loadZoneOptions()
  await loadDaOptions()

  if (isEdit.value) {
    await loadDetail()
    const draftStr = sessionStorage.getItem('farmerFormDraft')
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
