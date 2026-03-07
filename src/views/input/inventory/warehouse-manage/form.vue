<template>
  <div class="page-container">
    <div class="page-wrapper">
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

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="submitLoading || optionLoading || dictLoading">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.warehouseCode')" prop="warehouseCode">
                    <el-input v-model="formData.warehouseCode" :placeholder="$t('input.inventory.warehouseManage.placeholder.warehouseCode')" maxlength="64" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.warehouseName')" prop="warehouseName">
                    <el-input v-model="formData.warehouseName" :placeholder="$t('input.inventory.warehouseManage.placeholder.warehouseName')" maxlength="100" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.type')" prop="type">
                    <el-select v-model="formData.type" :placeholder="$t('input.inventory.warehouseManage.placeholder.type')" style="width: 100%">
                      <el-option v-for="item in warehouseTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.storeType')" prop="storeType">
                    <el-select v-model="formData.storeType" :placeholder="$t('input.inventory.warehouseManage.placeholder.storeType')" style="width: 100%">
                      <el-option v-for="item in storeTypeOptions" :key="item.value" :label="$t(item.label)" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.orgName')" prop="orgName">
                    <el-input v-model="formData.orgName" :placeholder="$t('input.inventory.warehouseManage.placeholder.orgName')" maxlength="100" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.adminLevel')" prop="adminLevel">
                    <el-select v-model="formData.adminLevel" :placeholder="$t('input.inventory.warehouseManage.placeholder.adminLevel')" style="width: 100%">
                      <el-option v-for="item in adminLevelOptions" :key="item.value" :label="$t(item.label)" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.parentId')">
                    <el-select v-model="formData.parentId" :placeholder="$t('input.inventory.warehouseManage.placeholder.parentId')" clearable filterable style="width: 100%">
                      <el-option v-for="item in parentWarehouseOptions" :key="item.id" :label="`${item.warehouse_name} (${item.warehouse_code})`" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.status')" prop="status">
                    <el-radio-group v-model="formData.status">
                      <el-radio label="1">{{ $t('input.inventory.warehouseManage.status.enabled') }}</el-radio>
                      <el-radio label="0">{{ $t('input.inventory.warehouseManage.status.disabled') }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.capacity')" prop="capacity">
                    <el-input-number v-model="formData.capacity" :min="0" :precision="2" style="width: 100%" :placeholder="$t('input.inventory.warehouseManage.placeholder.capacity')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.location')" prop="location">
                    <el-input v-model="formData.location" :placeholder="$t('input.inventory.warehouseManage.placeholder.location')" maxlength="200" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.address')">
                    <el-input v-model="formData.address" :placeholder="$t('input.inventory.warehouseManage.placeholder.address')" maxlength="255" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.remark')">
                    <el-input v-model="formData.remark" type="textarea" :rows="3" maxlength="500" show-word-limit :placeholder="$t('input.inventory.warehouseManage.placeholder.remark')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{ $t('common.save') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addWarehouseManage, getWarehouseManage, listWarehouseManage, updateWarehouseManage } from '@/api/warehouseManage'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 使用字典 - 仅仓库类型使用字典
const { options: dictOptions, loading: dictLoading } = useDict(['warehouse_type'])

const formRef = ref(null)
const submitLoading = ref(false)
const optionLoading = ref(false)
const parentWarehouseOptions = ref([])

const isEdit = computed(() => route.path.includes('/edit/'))
const warehouseId = computed(() => route.params.id)
const pageTitle = computed(() => isEdit.value ? t('input.inventory.warehouseManage.edit') : t('input.inventory.warehouseManage.add'))

// 仓库类型选项从字典获取 (中央仓库、联盟仓库、合作社仓库、企业仓库)
const warehouseTypeOptions = computed(() => dictOptions.value.warehouse_type || [])

// 存储形态选项 - 静态数据
const storeTypeOptions = [
  { value: 'PHYSICAL', label: 'input.inventory.warehouseManage.storeTypeOptions.physical' },
  { value: 'VIRTUAL', label: 'input.inventory.warehouseManage.storeTypeOptions.virtual' }
]

// 状态选项 - 静态数据
const statusOptions = [
  { value: '1', label: 'input.inventory.warehouseManage.status.enabled' },
  { value: '0', label: 'input.inventory.warehouseManage.status.disabled' }
]

// 行政层级选项 (省、市、县)
const adminLevelOptions = [
  { value: 'PROVINCE', label: 'input.inventory.warehouseManage.adminLevelOptions.province' },
  { value: 'CITY', label: 'input.inventory.warehouseManage.adminLevelOptions.city' },
  { value: 'COUNTY', label: 'input.inventory.warehouseManage.adminLevelOptions.county' }
]

const formData = reactive({
  id: undefined,
  warehouseCode: '',
  warehouseName: '',
  type: '',
  storeType: 'PHYSICAL',
  orgName: '',
  adminLevel: '',
  parentId: undefined,
  location: '',
  capacity: 0,
  address: '',
  status: '1',
  remark: ''
})

const rules = computed(() => ({
  warehouseCode: [{ required: true, message: t('input.inventory.warehouseManage.rules.warehouseCodeRequired'), trigger: 'blur' }],
  warehouseName: [{ required: true, message: t('input.inventory.warehouseManage.rules.warehouseNameRequired'), trigger: 'blur' }],
  type: [{ required: true, message: t('input.inventory.warehouseManage.rules.typeRequired'), trigger: 'change' }],
  storeType: [{ required: true, message: t('input.inventory.warehouseManage.rules.storeTypeRequired'), trigger: 'change' }],
  orgName: [{ required: true, message: t('input.inventory.warehouseManage.rules.orgNameRequired'), trigger: 'blur' }],
  adminLevel: [{ required: true, message: t('input.inventory.warehouseManage.rules.adminLevelRequired'), trigger: 'change' }],
  location: [{ required: true, message: t('input.inventory.warehouseManage.rules.locationRequired'), trigger: 'blur' }],
  capacity: [{ required: true, message: t('input.inventory.warehouseManage.rules.capacityRequired'), trigger: 'change' }],
  status: [{ required: true, message: t('input.inventory.warehouseManage.rules.statusRequired'), trigger: 'change' }]
}))

const goBack = () => {
  router.back()
}

const loadParentOptions = async () => {
  optionLoading.value = true
  try {
    const res = await listWarehouseManage({ pageNum: 1, pageSize: 200 })
    if (res.code === 200 && res.data) {
      parentWarehouseOptions.value = (res.data.list || []).filter(item => item.id !== Number(warehouseId.value))
    }
  } catch (error) {
    console.error('Failed to load warehouse options:', error)
  } finally {
    optionLoading.value = false
  }
}

const loadDetail = async () => {
  if (!isEdit.value) return
  try {
    const res = await getWarehouseManage(warehouseId.value)
    if (res.code === 200 && res.data) {
      Object.assign(formData, {
        id: res.data.id,
        warehouseCode: res.data.warehouse_code || '',
        warehouseName: res.data.warehouse_name || '',
        type: res.data.type || '',
        storeType: res.data.store_type || 'PHYSICAL',
        orgName: res.data.org_name || '',
        adminLevel: res.data.admin_level || '',
        parentId: res.data.parent_id || undefined,
        location: res.data.location || '',
        capacity: Number(res.data.capacity || 0),
        address: res.data.address || '',
        status: res.data.status || '1',
        remark: res.data.remark || ''
      })
    }
  } catch (error) {
    console.error('Failed to load warehouse detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true

    const payload = {
      ...(isEdit.value ? { id: Number(warehouseId.value) } : {}),
      warehouseCode: formData.warehouseCode.trim(),
      warehouseName: formData.warehouseName.trim(),
      type: formData.type,
      storeType: formData.storeType,
      orgName: formData.orgName.trim(),
      adminLevel: formData.adminLevel,
      parentId: formData.parentId || null,
      location: formData.location.trim(),
      capacity: formData.capacity,
      address: formData.address.trim(),
      status: formData.status,
      remark: formData.remark.trim()
    }

    const res = isEdit.value
      ? await updateWarehouseManage(payload)
      : await addWarehouseManage(payload)

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('input.inventory.warehouseManage.editSuccess') : t('input.inventory.warehouseManage.addSuccess'))
      setTimeout(() => {
        router.push('/input/inventory/warehouse-manage')
      }, 300)
    }
  } catch (error) {
    console.error('Failed to submit warehouse form:', error)
  } finally {
    submitLoading.value = false
  }
}

onMounted(async () => {
  await loadParentOptions()
  await loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
