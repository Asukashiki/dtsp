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
            <h1 class="page-title">{{ pageTitle }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="submitLoading">
          
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- 两列布局 -->
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouse.form.warehouseCode')" prop="warehouseCode">
                    <el-input v-model="formData.warehouseCode" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseCode')" readonly clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouse.form.warehouseName')" prop="warehouseName">
                    <el-input v-model="formData.warehouseName" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseName')" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouse.form.warehouseType')" prop="warehouseType">
                    <el-select v-model="formData.warehouseType" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseType')" style="width: 100%">
                      <el-option :label="$t('input.inventory.warehouse.type.normal')" value="normal" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('input.inventory.warehouse.form.location')" prop="location">
                    <el-input v-model="formData.location" :placeholder="$t('input.inventory.warehouse.placeholder.location')" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouse.form.capacity')" prop="capacity">
                    <el-input
                      v-model="capacityDisplay"
                      :placeholder="$t('input.inventory.warehouse.placeholder.capacity')"
                      type="number"
                      @input="handleCapacityInput">
                      <template #append>KG</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouse.form.warehouseArea')" prop="warehouseArea">
                    <el-input
                      v-model="warehouseAreaDisplay"
                      :placeholder="$t('input.inventory.warehouse.placeholder.warehouseArea')"
                      type="number"
                      @input="handleWarehouseAreaInput">
                      <template #append>L</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouse.form.organName')" prop="organName">
                    <el-input v-model="formData.organName" :placeholder="$t('input.inventory.warehouse.placeholder.organName')" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('input.inventory.warehouse.form.siteCertificate')">
                    <el-upload
                      v-model:file-list="fileList"
                      :action="uploadUrl"
                      :headers="uploadHeaders"
                      :on-success="handleUploadSuccess"
                      :on-remove="handleRemove"
                      :before-upload="beforeUpload"
                      :limit="1"
                      accept=".jpg,.jpeg,.png,.pdf"
                      list-type="text">
                      <el-button type="primary" size="small">
                        <i class="ri-upload-line"></i>
                        {{ $t('input.inventory.warehouse.uploadFile') }}
                      </el-button>
                      <template #tip>
                        <div class="el-upload__tip">
                          {{ $t('input.inventory.warehouse.uploadTip') }}
                        </div>
                      </template>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('input.inventory.warehouse.form.remark')">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="3"
                      :placeholder="$t('input.inventory.warehouse.placeholder.remark')"
                      maxlength="500"
                      show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 联系信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-contacts-line"></i>
                <span>{{ $t('userInfo.contactInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouse.form.contactPerson')" prop="contactPerson">
                    <el-input v-model="formData.contactPerson" :placeholder="$t('input.inventory.warehouse.placeholder.contactPerson')" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouse.form.contactPhone')" prop="contactPhone">
                    <el-input v-model="formData.contactPhone" :placeholder="$t('input.inventory.warehouse.placeholder.contactPhone')" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮区域（固定在底部） -->
          <div class="form-actions">
            <el-button v-for="button in getActionButtons()" :key="button.action"
              :type="button.type" @click="handleAction(button.action)"
              :loading="submitLoading && button.action === 'save'">
              {{ $t(`common.${button.label}`) }}
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
import { getWarehouseDetail, addWarehouse, updateWarehouse } from '@/api/inventory'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)
const isEdit = computed(() => route.path.includes('/edit/'))
const warehouseId = computed(() => route.params.id)

// 页面模式判断
const pageMode = computed(() => {
  return isEdit.value ? 'edit' : 'add'
})

// 页面标题
const pageTitle = computed(() => {
  return isEdit.value ? t('input.inventory.warehouse.edit') : t('input.inventory.warehouse.add')
})

// 根据页面模式返回不同的按钮
const getActionButtons = () => {
  return [
    { type: '', label: 'cancel', action: 'cancel' },
    { type: 'primary', label: 'save', action: 'save' }
  ]
}

// 统一的动作处理方法
const handleAction = (action) => {
  switch (action) {
    case 'cancel':
      goBack()
      break
    case 'save':
      handleSubmit()
      break
  }
}

// 容量显示值
const capacityDisplay = ref('')

// 处理容量输入
const handleCapacityInput = (value) => {
  // 将输入值转换为数字并保留两位小数
  const numValue = parseFloat(value)
  if (!isNaN(numValue)) {
    formData.capacity = Math.round(numValue * 100) / 100
    capacityDisplay.value = formData.capacity.toString()
  } else {
    formData.capacity = null
    capacityDisplay.value = ''
  }
}

// 仓库面积显示值
const warehouseAreaDisplay = ref('')

// 处理仓库面积输入
const handleWarehouseAreaInput = (value) => {
  // 将输入值转换为数字并保留两位小数
  const numValue = parseFloat(value)
  if (!isNaN(numValue)) {
    formData.warehouseArea = Math.round(numValue * 100) / 100
    warehouseAreaDisplay.value = formData.warehouseArea.toString()
  } else {
    formData.warehouseArea = null
    warehouseAreaDisplay.value = ''
  }
}

const formData = reactive({
  warehouseCode: '',
  warehouseName: '',
  warehouseType: 'normal', // 默认选中第一个选项
  location: '',
  capacity: null,
  warehouseArea: null,
  organName: '',
  organCode: '', // 部门ID
  contactPerson: '',
  contactPhone: '',
  siteCertificate: '',
  remark: ''
})

// 文件上传相关
const fileList = ref([])
const uploadUrl = ref(import.meta.env.VITE_APP_API_URL + '/auth/file/upload')
const uploadHeaders = ref({
  Authorization: localStorage.getItem('token') || ''
})

const rules = computed(() => ({
  warehouseCode: [{ required: true, message: t('input.inventory.warehouse.rules.warehouseCodeRequired'), trigger: 'blur' }],
  warehouseName: [{ required: true, message: t('input.inventory.warehouse.rules.warehouseNameRequired'), trigger: 'blur' }],
  warehouseType: [{ required: true, message: t('input.inventory.warehouse.rules.warehouseTypeRequired'), trigger: 'change' }],
  location: [{ required: true, message: t('input.inventory.warehouse.rules.locationRequired'), trigger: 'blur' }],
  capacity: [
    { required: true, message: t('input.inventory.warehouse.rules.capacityRequired'), trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (!value || value <= 0) {
          callback(new Error(t('input.inventory.warehouse.rules.capacityPositive')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  warehouseArea: [
    {
      validator: (rule, value, callback) => {
        if (value !== null && value !== undefined && value < 0) {
          callback(new Error(t('input.inventory.warehouse.rules.warehouseAreaPositive')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  organName: [{ required: true, message: t('input.inventory.warehouse.rules.organNameRequired'), trigger: 'blur' }],
  contactPerson: [{ required: true, message: t('input.inventory.warehouse.rules.contactPersonRequired'), trigger: 'blur' }],
  contactPhone: [{ required: true, message: t('input.inventory.warehouse.rules.contactPhoneRequired'), trigger: 'blur' }]
}))

// 文件上传前校验
const beforeUpload = (file) => {
  const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isValidType) {
    ElMessage.error(t('input.inventory.warehouse.uploadFormatError'))
    return false
  }
  if (!isLt2M) {
    ElMessage.error(t('input.inventory.warehouse.uploadSizeError'))
    return false
  }
  return true
}

// 文件上传成功
const handleUploadSuccess = (response) => {
  if (response.code === 200) {
    formData.siteCertificate = response.data.url || response.data.path || response.data
    ElMessage.success(t('input.inventory.warehouse.uploadSuccess'))
  } else {
    ElMessage.error(response.msg || t('input.inventory.warehouse.uploadFailed'))
  }
}

// 文件移除
const handleRemove = () => {
  formData.siteCertificate = ''
}

// 返回
const goBack = () => {
  router.back()
}

// 加载数据
const loadData = async () => {
  if (!isEdit.value) return

  try {
    const res = await getWarehouseDetail(warehouseId.value)
    if (res.code === 200 && res.data) {
      Object.assign(formData, {
        warehouseCode: res.data.warehouse_code || '',
        warehouseName: res.data.warehouse_name,
        warehouseType: res.data.warehouse_type,
        location: res.data.location,
        capacity: res.data.capacity,
        warehouseArea: res.data.warehouse_area || null,
        organName: res.data.organ_name || '',
        organCode: res.data.organ_code || '',
        contactPerson: res.data.contact_person,
        contactPhone: res.data.contact_phone,
        siteCertificate: res.data.site_certificate || '',
        remark: res.data.remark || ''
      })
      // 设置容量显示值
      if (res.data.capacity) {
        capacityDisplay.value = res.data.capacity.toString()
      }

      // 设置仓库面积显示值
      if (res.data.warehouse_area) {
        warehouseAreaDisplay.value = res.data.warehouse_area.toString()
      }

      // 如果有文件，设置文件列表
      if (res.data.site_certificate) {
        fileList.value = [{
          name: t('input.inventory.warehouse.siteCertificateFile'),
          url: res.data.site_certificate
        }]
      }
    }
  } catch (error) {
    console.error('Failed to load warehouse detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true

    const data = {
      warehouseCode: formData.warehouseCode,
      warehouseName: formData.warehouseName,
      warehouseType: formData.warehouseType,
      location: formData.location,
      capacity: formData.capacity,
      warehouseArea: formData.warehouseArea || 0,
      organName: formData.organName,
      organCode: formData.organCode,
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      siteCertificate: formData.siteCertificate || '',
      remark: formData.remark || ''
    }

    if (isEdit.value) {
      data.warehouseId = warehouseId.value
      const res = await updateWarehouse(data)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.warehouse.editSuccess'))
        setTimeout(() => router.back(), 1000)
      }
    } else {
      const res = await addWarehouse(data)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.warehouse.addSuccess'))
        setTimeout(() => router.back(), 1000)
      }
    }
  } catch (error) {
    console.error('Form validation or submission error:', error)
  } finally {
    submitLoading.value = false
  }
}

// 获取用户信息
const getUserInfo = () => {
  const userInfoStr = localStorage.getItem('userInfo')
  return userInfoStr ? JSON.parse(userInfoStr) : {}
}

onMounted(() => {
  loadData()
  formData.warehouseCode = generateSku()

  // 只在新增模式下自动填充部门名称
  if (!isEdit.value) {
    // 获取用户信息并自动填充部门名称

    const userInfoStr = localStorage.getItem('userInfo')

    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr)
      const user = userInfo.user || userInfo
      console.log(user);
      formData.organName = user.ORGANNAME
      formData.organCode = user.ORGANCODE // 同时填充部门ID
    }
    /*const user = getUserInfo()
    if (user ) {
      console.log('user', user)

    }*/
  }
})

// 仓库编号
const generateSku = () => {
  // 生成格式: ZZ-XM-XXXXXX (6位随机数字)
  const randomNumber = Math.floor(100000 + Math.random() * 900000)
  // 获取当前日期并格式化为YYYYMMDD
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const dateStr = `${year}${month}${day}`
  // 仓库编号格式: WH-YYYYMMDD-XXXXXX
  return `WH-${dateStr}-${randomNumber}`
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
