<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader icon="ri-home-gear-line" :title="pageTitle" shadow show-back @back="goBack" />

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" v-loading="submitLoading || optionLoading || dictLoading">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- 仓库编码 - 自动生成，只读 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.warehouseCode')" prop="warehouseCode">
                    <el-input 
                      v-model="formData.warehouseCode" 
                      disabled 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.warehouseCode')"
                    />
                  </el-form-item>
                </el-col>

                <!-- 仓库名称 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.warehouseName')" prop="warehouseName">
                    <el-input 
                      v-model="formData.warehouseName" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.warehouseName')" 
                      maxlength="100" 
                      clearable 
                    />
                  </el-form-item>
                </el-col>

                <!-- 仓库类型 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.type')" prop="type">
                    <el-select 
                      v-model="formData.type" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.type')" 
                      style="width: 100%"
                      @change="handleWarehouseTypeChange"
                    >
                      <el-option 
                        v-for="item in warehouseTypeOptions" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 存储类型 - 多选 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.storeType')" prop="storeType">
                    <el-select 
                      v-model="formData.storeType" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.storeType')" 
                      style="width: 100%"
                      multiple
                      collapse-tags
                    >
                      <el-option 
                        v-for="item in storeTypeOptions" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 所属机构 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.orgName')" prop="orgName">
                    <el-select 
                      v-model="formData.orgName" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.orgName')" 
                      style="width: 100%"
                    >
                      <el-option 
                        v-for="item in orgTypeOptions" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 行政层级 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.adminLevel')" prop="adminLevel">
                    <el-select 
                      v-model="formData.adminLevel" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.adminLevel')" 
                      style="width: 100%"
                    >
                      <el-option 
                        v-for="item in adminLevelOptions" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 上级仓库 - 条件显示 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item 
                    :label="$t('input.inventory.warehouseManage.form.parentId')"
                    prop="parentId"
                    :rules="isUnionOrCoopWarehouse ? [{ required: true, message: $t('input.inventory.warehouseManage.rules.parentIdRequired'), trigger: 'change' }] : []"
                  >
                    <el-select 
                      v-model="formData.parentId" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.parentId')" 
                      clearable 
                      filterable 
                      style="width: 100%"
                    >
                      <el-option 
                        v-for="item in parentWarehouseOptions" 
                        :key="item.id" 
                        :label="`${item.warehouse_name} (${item.warehouse_code})`" 
                        :value="item.id" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 运营状态 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.status')" prop="status">
                    <el-radio-group v-model="formData.status">
                      <el-radio 
                        v-for="item in operatingStatusOptions" 
                        :key="item.value" 
                        :label="item.value"
                      >
                        {{ item.label }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <!-- 存储容量 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.capacity')" prop="capacity">
                    <el-input
                      v-model="capacityDisplay"
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.capacity')"
                      type="number"
                      @input="handleCapacityInput">
                      <template #append>KG</template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <!-- 地理位置 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.location')" prop="location">
                    <el-input 
                      v-model="formData.location" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.location')" 
                      maxlength="200" 
                      clearable 
                    />
                  </el-form-item>
                </el-col>

                <!-- 地址 -->
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.address')">
                    <el-input 
                      v-model="formData.address" 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.address')" 
                      maxlength="255" 
                      clearable 
                    />
                  </el-form-item>
                </el-col>

                <!-- 备注 -->
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('input.inventory.warehouseManage.form.remark')">
                    <el-input 
                      v-model="formData.remark" 
                      type="textarea" 
                      :rows="3" 
                      maxlength="500" 
                      show-word-limit 
                      :placeholder="$t('input.inventory.warehouseManage.placeholder.remark')" 
                    />
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
import { addWarehouseManage, getWarehouseManage, listWarehouseManage, updateWarehouseManage, generateWarehouseCode } from '@/api/warehouseManage'
import { useDict } from '@/hooks/useDict'
import { PageHeader } from '@/components/common'

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

const warehouseTypeValueMap = {
  CENTRAL: 'ZY',
  ALLIANCE: 'LM',
  COOPERATIVE: 'HZS',
  ENTERPRISE: 'QY'
}

const normalizeWarehouseTypeValue = (item) => item.actualValue || warehouseTypeValueMap[item.value] || item.value

// 仓库类型选项从字典获取
const warehouseTypeOptions = computed(() => (dictOptions.value.warehouse_type || []).map(item => ({
  ...item,
  value: normalizeWarehouseTypeValue(item)
})))

// 存储类型选项
const storeTypeOptions = [
  { value: 'fertilizer', label: t('input.inventory.warehouseManage.storageTypeOptions.fertilizer') },
  { value: 'pesticide', label: t('input.inventory.warehouseManage.storageTypeOptions.pesticide') },
  { value: 'seed', label: t('input.inventory.warehouseManage.storageTypeOptions.seed') },
  { value: 'agricultural_product', label: t('input.inventory.warehouseManage.storageTypeOptions.agriculturalProduct') }
]

// 所属机构选项
const orgTypeOptions = [
  { value: 'OAB', label: t('input.inventory.warehouseManage.ownerEntityOptions.oab') },
  { value: 'UNION', label: t('input.inventory.warehouseManage.ownerEntityOptions.union') },
  { value: 'COOP', label: t('input.inventory.warehouseManage.ownerEntityOptions.cooperative') },
  { value: 'OSE', label: t('input.inventory.warehouseManage.ownerEntityOptions.ose') }
]

// 行政层级选项
const adminLevelOptions = [
  { value: 'province', label: t('input.inventory.warehouseManage.adminLevelOptions.province') },
  { value: 'city', label: t('input.inventory.warehouseManage.adminLevelOptions.city') },
  { value: 'county', label: t('input.inventory.warehouseManage.adminLevelOptions.county') }
]

// 运营状态选项
const operatingStatusOptions = [
  { value: '0', label: t('input.inventory.warehouseManage.operatingStatusOptions.active') },
  { value: '1', label: t('input.inventory.warehouseManage.operatingStatusOptions.inactive') },
  { value: '2', label: t('input.inventory.warehouseManage.operatingStatusOptions.maintenance') }
]

// 是否为联盟或合作社仓库
const isUnionOrCoopWarehouse = computed(() => {
  return formData.type === 'LM' || formData.type === 'HZS' || formData.type === 'QY'
})

// 存储容量显示值
const capacityDisplay = ref('')

// 处理存储容量输入
const handleCapacityInput = (value) => {
  const numValue = parseFloat(value)
  if (!isNaN(numValue)) {
    formData.capacity = Math.round(numValue * 100) / 100
    capacityDisplay.value = formData.capacity.toString()
  } else {
    formData.capacity = null
    capacityDisplay.value = ''
  }
}

const formData = reactive({
  id: undefined,
  warehouseCode: '',
  warehouseName: '',
  type: '',
  storeType: [],
  orgName: '',
  adminLevel: '',
  parentId: undefined,
  location: '',
  capacity: null,
  address: '',
  status: '0',
  remark: ''
})

const rules = computed(() => ({
  warehouseCode: [{ required: true, message: t('input.inventory.warehouseManage.rules.warehouseCodeRequired'), trigger: 'blur' }],
  warehouseName: [{ required: true, message: t('input.inventory.warehouseManage.rules.warehouseNameRequired'), trigger: 'blur' }],
  type: [{ required: true, message: t('input.inventory.warehouseManage.rules.typeRequired'), trigger: 'change' }],
  storeType: [{ required: true, message: t('input.inventory.warehouseManage.rules.storeTypeRequired'), trigger: 'change' }],
  orgName: [{ required: true, message: t('input.inventory.warehouseManage.rules.orgNameRequired'), trigger: 'change' }],
  adminLevel: [{ required: true, message: t('input.inventory.warehouseManage.rules.adminLevelRequired'), trigger: 'change' }],
  parentId: [],  // 动态规则
  status: [{ required: true, message: t('input.inventory.warehouseManage.rules.statusRequired'), trigger: 'change' }]
}))

const goBack = () => {
  router.back()
}

// 仓库类型变更时生成编码
const handleWarehouseTypeChange = async () => {
  if (!formData.type) {
    formData.warehouseCode = ''
    return
  }

  try {
    const res = await generateWarehouseCode({ warehouseType: formData.type })
    if (res.code === 200) {
      formData.warehouseCode = res.data.warehouseCode
    }
  } catch (error) {
    console.error('Failed to generate warehouse code:', error)
    ElMessage.error(t('input.inventory.warehouseManage.generateCodeFailed'))
  }
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
        storeType: res.data.store_type ? res.data.store_type.split(',') : [],
        orgName: res.data.org_name || '',
        adminLevel: res.data.admin_level || '',
        parentId: res.data.parent_id || undefined,
        location: res.data.location || '',
        capacity: res.data.capacity === null || res.data.capacity === undefined || res.data.capacity === ''
          ? null
          : Number(res.data.capacity),
        address: res.data.address || '',
        status: res.data.status || '0',
        remark: res.data.remark || ''
      })
      if (formData.capacity === null || formData.capacity === undefined || formData.capacity === '') {
        capacityDisplay.value = ''
      } else {
        capacityDisplay.value = formData.capacity.toString()
      }
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
      storeType: Array.isArray(formData.storeType) ? formData.storeType.join(',') : formData.storeType,
      orgName: formData.orgName,
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
        router.push('/inventory/warehouse-manage')
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
