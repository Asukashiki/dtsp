<template>
  <div class="warehouse-form-page">
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
          <h1 class="page-title">{{ isEdit ? $t('input.inventory.warehouse.edit') : $t('input.inventory.warehouse.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="warehouse-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('input.catalog.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.inventory.warehouse.form.warehouseCode')" prop="warehouseCode">
              <el-input v-model="formData.warehouseCode" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseCode')" readonly clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.warehouseName')" prop="warehouseName">
              <el-input v-model="formData.warehouseName" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseName')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.warehouseType')" prop="warehouseType">
              <el-select v-model="formData.warehouseType" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseType')" class="full-width">
                <el-option :label="$t('input.inventory.warehouse.type.normal')" value="normal" />
<!--                <el-option :label="$t('input.inventory.warehouse.type.cold')" value="cold" />
                <el-option :label="$t('input.inventory.warehouse.type.dangerous')" value="dangerous" />-->
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.location')" prop="location" class="full-width-item">
              <el-input v-model="formData.location" :placeholder="$t('input.inventory.warehouse.placeholder.location')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.capacity')" prop="capacity">
              <el-input-number v-model="formData.capacity" :placeholder="$t('input.inventory.warehouse.placeholder.capacity')" :min="1" :precision="2" class="full-width" />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.warehouseArea')" prop="warehouseArea">
              <el-input-number v-model="formData.warehouseArea" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseArea')" :min="0" :precision="2" class="full-width">
                <template #append>m²</template>
              </el-input-number>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.organName')" prop="organName">
              <el-input v-model="formData.organName" :placeholder="$t('input.inventory.warehouse.placeholder.organName')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.status')" prop="status">
              <el-select v-model="formData.status" :placeholder="$t('input.inventory.warehouse.placeholder.status')" class="full-width">
                <el-option :label="$t('input.inventory.warehouse.status.enabled')" value="1" />
                <el-option :label="$t('input.inventory.warehouse.status.disabled')" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.siteCertificate')" class="full-width-item">
              <el-upload
                v-model:file-list="fileList"
                :action="uploadUrl"
                :headers="uploadHeaders"
                :on-success="handleUploadSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :limit="1"
                accept=".jpg,.jpeg,.png,.pdf"
                list-type="text"
              >
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
            <el-form-item :label="$t('input.inventory.warehouse.form.remark')" class="full-width-item">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="3"
                :placeholder="$t('input.inventory.warehouse.placeholder.remark')"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
          </div>
        </div>

        <!-- 联系信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-contacts-line"></i>
            <h3>{{ $t('userInfo.contactInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.inventory.warehouse.form.contactPerson')" prop="contactPerson">
              <el-input v-model="formData.contactPerson" :placeholder="$t('input.inventory.warehouse.placeholder.contactPerson')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.contactPhone')" prop="contactPhone">
              <el-input v-model="formData.contactPhone" :placeholder="$t('input.inventory.warehouse.placeholder.contactPhone')" clearable />
            </el-form-item>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
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
import { getWarehouseDetail, addWarehouse, updateWarehouse } from '@/api/inventory'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)
const isEdit = computed(() => route.path.includes('/edit/'))
const warehouseId = computed(() => route.params.id)

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
  remark: '',
  status: '1' // 默认启用
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
        remark: res.data.remark || '',
        status: res.data.status || '1'
      })

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
      remark: formData.remark || '',
      status: formData.status
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
    // 仓库编号格式: WH-YYYYMMDD-XXXXXX
  return `WH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomNumber}`
}
</script>

<style scoped>
.warehouse-form-page {
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

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
  margin-top: 24px;
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

  .header-right {
    display: none;
  }

  .header-center {
    text-align: left;
  }

  .page-title {
    font-size: 18px;
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

@media screen and (max-width: 480px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 0 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .form-wrapper {
    padding: 12px;
  }
}
</style>
