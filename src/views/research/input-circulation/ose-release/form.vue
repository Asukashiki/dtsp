<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ pageTitle }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('inputCirculation.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.releaseName')" prop="releaseName">
                    <el-input v-model="formData.releaseName" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.zoneId')" prop="zoneId">
                    <el-select v-model="formData.zoneId" :placeholder="$t('common.pleaseSelect')" @change="getAllUnionList" style="width: 100%">
                      <el-option v-for="item in zoneList" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.unionId')" prop="targetId">
                    <el-select v-model="formData.targetId" :placeholder="$t('common.pleaseSelect')" @change="getUnionInfo" style="width: 100%">
                      <el-option v-for="item in unionList" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.unionAddress')">
                    <el-input v-model="formData.targetAddress" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.unionContact')">
                    <el-input v-model="formData.targetContact" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.releaseYear')">
                    <el-date-picker v-model="formData.releaseYear" type="year" value-format="YYYY" @change="handleYearChange" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.releaseDate')" prop="releaseDate">
                    <el-date-picker v-model="formData.releaseDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-table
                :data="demandList"
                border
                :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{ textAlign: 'center' }"
                v-loading="demandLoading"
                @selection-change="handleDemandSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" prop="inputType" min-width="150">
                  <template #default="{ row }">
                    {{ getLabelByValue('input_type', row.inputType) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" prop="inputCategory" min-width="150">
                  <template #default="{ row }">
                    {{ getLabelByValue('input_category', row.inputCategory) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.totalQuantity')" prop="totalQuantity" min-width="120" />
              </el-table>
            </div>
          </div>

          <!-- 分发明细卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-list-line"></i>
                <span>{{ $t('inputCirculation.detailInfo') }}</span>
              </div>
              <div class="card-actions">
                <el-button type="primary" @click="addDetail">
                  <i class="ri-add-line"></i>
                  {{ $t('inputCirculation.addDetail') }}
                </el-button>
              </div>
            </div>
            <div class="card-body">
              <el-table
                :data="formData.details"
                border
                :header-cell-style="{ textAlign: 'center' }"
                :cell-style="{ textAlign: 'center' }">
                <el-table-column :label="$t('inputCirculation.releaseDetailId')" type="index" width="80" />
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="180">
                  <template #default="scope">
                    <el-select v-model="scope.row.inputType"
                               :placeholder="$t('common.pleaseSelect')"
                               @change="handleInputTypeChange(scope.$index)"
                               style="width: 100%">
                      <el-option v-for="item in options.input_type" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="180">
                  <template #default="scope">
                    <el-select v-model="scope.row.inputCategory"
                               :placeholder="$t('common.pleaseSelect')"
                               :disabled="!scope.row.inputType"
                               @change="handleInputCategoryChange(scope.$index)"
                               style="width: 100%">
                      <el-option v-for="item in getFilteredCategories(scope.row.inputType)" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.demandQuantity')" min-width="140">
                  <template #default="scope">
                    <span>{{ getDemandQuantity(scope.row.inputType, scope.row.inputCategory) }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.currentStock')" min-width="140">
                  <template #default="scope">
                    <span>{{ scope.row.currentStock }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.quantity')" min-width="180">
                  <template #default="scope">
                    <el-input-number
                      v-model="scope.row.quantity"
                      :min="0"
                      :max="getDemandQuantity(scope.row.inputType, scope.row.inputCategory)"
                      :precision="2"
                      @change="validateQuantity(scope.$index)"
                      style="width: 100%" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.unit')" min-width="140">
                  <template #default="scope">
                    <el-select v-model="scope.row.unit" :placeholder="$t('common.pleaseSelect')" style="width: 100%">
                      <el-option v-for="item in options.agri_unit" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.outWarehouse')" min-width="180">
                  <template #default="scope">
                    <el-select v-model="scope.row.outWarehouseCode" :placeholder="$t('common.pleaseSelect')" style="width: 100%"
                      @change="(val) => handleDetailOutWarehouseChange(scope.row, val)">
                      <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.inWarehouse')" min-width="180">
                  <template #default="scope">
                    <el-select v-model="scope.row.inWarehouseCode" :placeholder="$t('common.pleaseSelect')" style="width: 100%"
                      @change="(val) => handleDetailInWarehouseChange(scope.row, val)">
                      <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('common.actions')" min-width="100" fixed="right">
                  <template #default="scope">
                    <el-button type="danger" link @click="removeDetail(scope.$index)">{{ $t('common.delete') }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <!-- 操作按钮区域（固定在底部） -->
          <div class="form-actions">
            <el-button v-for="button in getActionButtons()" :key="button.action"
              :type="button.type" @click="handleAction(button.action)"
              :loading="loading && button.action === 'save'">
              {{ $t(`common.${button.label}`) }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOseReleaseDetail, addOseRelease, editOseRelease, getAvailableStock } from '@/api/inputCirculation'
import { getInventoryWarehouseList } from '@/api/inventory'
import { getOseReleaseDetail, addOseRelease, editOseRelease, getDeptCategoryStock } from '@/api/inputCirculation'
import {getAllInputList} from "@/api/input.js";
import {getUnionDetailByUnionId} from "@/api/union.js";
import {getOrgansRegionByCode, listSubRegionByCode} from "@/api/application.js";
import {getCurrentUserInfo} from "@/api/user.js";
import {getTownAggregationDetail} from "@/api/villageAggregation.js";
import { getRegistrationList } from '@/api/orgRegistration'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store/user'

const { getLabelByValue, options } = useDict(['input_type', 'input_category', 'agri_unit'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

// 根据路由路径和参数判断页面模式
const pageMode = computed(() => {
  // 优先使用 query 参数
  if (route.query.mode) {
    return route.query.mode
  }
  // 根据路由路径判断
  if (route.path.includes('/audit/')) {
    return 'audit'
  }
  if (route.path.includes('/detail/')) {
    return 'view'
  }
  // 默认逻辑
  return isEdit.value ? 'edit' : 'add'
})

// 页面标题
const pageTitle = computed(() => {
  switch (pageMode.value) {
    case 'edit':
      return t('inputCirculation.editRelease')
    default:
      return t('inputCirculation.addRelease')
  }
})



const formData = reactive({
  id: '',
  releaseName: '',
  zoneId: '',
  targetId: '',
  targetAddress: '',
  targetContact: '',
  targetPhone: '',
  releaseYear: new Date().getFullYear().toString(),
  releaseDate: new Date().toISOString().split('T')[0],
  releaseBy: '',
  auditDate: '',
  auditBy: '',
  releaseOrg: '',
  releaseType: 'OSE_TO_UNION', // OSE分发到Union
  details: []
})

const zoneList = ref([])
const unionList = ref([])
const inputList = ref([])
const demandList = ref([])
const demandLoading = ref(false)
const selectedDemands = ref([])
const warehouseOptions = ref([])

const rules = {
  releaseName: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  zoneId: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  targetId: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  releaseDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

const getUserInfo = async () => {
  loading.value = true
  try {
    const response = await getCurrentUserInfo()
    if (response.code === 200 && response.data) {
      console.log(response.data)
     formData.releaseBy = response.data.user.name
      formData.releaseOrg = response.data.user.organName
      console.log(formData.releaseBy)
    }
  } catch (error) {
    ElMessage.error(t('common.queryUserInfoFailed'))
  } finally {
    loading.value = false
  }
}

const getAllZoneList = async () => {
  loading.value = true
  try {
    const response = await listSubRegionByCode({regionCode: 102000000})
    if (response.code === 200) {
      zoneList.value = response.data
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryZoneListFailed'))
  } finally {
    loading.value = false
  }
}

const loadWarehouses = async () => {
  try {
    const res = await getInventoryWarehouseList({ pageNum: 1, pageSize: 10000 })
    warehouseOptions.value = res.rows || []
  } catch (error) {
    console.error('Failed to load warehouse list:', error)
    warehouseOptions.value = []
  }
}

const regionCode = ref('')

const getAllUnionList = async (value) => {
  loading.value = true
  regionCode.value = value
  try {
    const response = await getRegistrationList({
      regionCode: value,
      orgType: 'UNION',
      auditStatus: 1,
      page: 1,
      pageSize: 10000
    })
    console.log('Union List Response:', response)
    if (response.code === 200) {
      const list = response.data.records || response.data.rows || response.data.list || []
      unionList.value = list.map(item => ({
        code: item.id,
        name: item.orgName
      }))
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryUnionListFailed'))
  } finally {
    loading.value = false
  }
}

const getInputList = async () => {
  loading.value = true
  try {
    const response = await getAllInputList()
    if (response.code === 200) {
      inputList.value = response.data.map(item => {
        return {
          inputId: item.inputId,
          inputName: item.inputName,
          // 尝试多种可能的字段名
          variety: item.variety || '',
          agriculturalInputType: item.agriculturalInputType || item.agricultural_input_type ||
              item.inputType || item.type || ''
        }
      })
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryInputListFailed'))
  } finally {
    loading.value = false
  }
}

// 投入品选择变化处理
const handleInputChange = (index) => {
  const detail = formData.details[index]
  const selectedInput = inputList.value.find(i => i.inputId === detail.inputId)
  if (selectedInput) {
    detail.variety = selectedInput.variety
    detail.cropType = selectedInput.agriculturalInputType
    detail.inputName = selectedInput.inputName
  } else {
    console.warn('未找到对应的投入品信息')
  }
}

// 投入品类型变化处理
const handleInputTypeChange = (index) => {
  const detail = formData.details[index]
  // 清空投入品类别
  detail.inputCategory = ''
  detail.quantity = 0
}

// 投入品类别变化处理
const handleInputCategoryChange = (index) => {
  const detail = formData.details[index]
  // 获取需求数量作为默认值
  const demandQty = getDemandQuantity(detail.inputType, detail.inputCategory)
  detail.quantity = 0
  detail.maxQuantity = demandQty
  // 获取库存
  fetchStock(index)
}

// 获取库存
const fetchStock = async (index) => {
  const detail = formData.details[index]
  if (!detail.inputType || !detail.inputCategory) {
    detail.currentStock = 0
    return
  }

  try {
    const deptId = userStore.userInfo?.deptId || userStore.userInfo?.user?.deptId
    if (!deptId) {
      console.warn('deptId is not available in userInfo')
      detail.currentStock = 0
      return
    }

    const inputTypeLabel = getLabelByValue('input_type', detail.inputType)
    const inputCategoryLabel = getLabelByValue('input_category', detail.inputCategory)

    const res = await getDeptCategoryStock(deptId, inputTypeLabel, inputCategoryLabel)
    if (res.code === 200 && Array.isArray(res.data)) {
      const matched = res.data.find(item => item.mainCategory === inputTypeLabel && item.subCategory === inputCategoryLabel)
      detail.currentStock = matched?.availableQty ?? 0
    } else {
      detail.currentStock = 0
    }
  } catch (error) {
    console.error('Failed to fetch stock:', error)
    detail.currentStock = 0
  }
}

// 根据投入品类型过滤投入品类别
const getFilteredCategories = (inputType) => {
  if (!inputType || !options.value.input_category) return []
  // 根据 inputCategory 的前缀匹配 inputType
  // 例如 IN01 对应 IN0101, IN0102, IN0103
  return options.value.input_category.filter(item => item.value.startsWith(inputType))
}

// 获取需求数量
const getDemandQuantity = (inputType, inputCategory) => {
  if (!inputType || !inputCategory) return 0
  const demand = demandList.value.find(d => d.inputType === inputType && d.inputCategory === inputCategory)
  return demand ? demand.totalQuantity : 0
}

// 校验数量 - 同时检查需求量和库存
const validateQuantity = async (index) => {
  const detail = formData.details[index]
  if (!detail.inputType) return

  // 校验需求量
  const maxQty = getDemandQuantity(detail.inputType, detail.inputCategory)
  if (detail.quantity > maxQty) {
    detail.quantity = maxQty
    ElMessage.warning(t('inputCirculation.quantityExceedsDemand'))
    return
  }

  // 校验库存 - 计算表单中同类型的总数量
  const totalFormQuantity = formData.details
    .filter(d => d.inputType === detail.inputType &&
                (d.inputCategory === detail.inputCategory || (!d.inputCategory && !detail.inputCategory)))
    .reduce((sum, d) => sum + (d.quantity || 0), 0)

  try {
    const deptId = userStore.userInfo?.deptId || userStore.userInfo?.user?.deptId
    if (!deptId) {
      console.warn('deptId is not available for stock validation')
      return
    }

    const inputTypeLabel = getLabelByValue('input_type', detail.inputType)
    const inputCategoryLabel = getLabelByValue('input_category', detail.inputCategory)

    const stockRes = await getDeptCategoryStock(deptId, inputTypeLabel, inputCategoryLabel)
    if (stockRes.code === 200 && Array.isArray(stockRes.data)) {
      const matched = stockRes.data.find(item => item.mainCategory === inputTypeLabel && item.subCategory === inputCategoryLabel)
      const available = matched?.availableQty ?? 0
      if (totalFormQuantity > available) {
        // 超出可用库存，调整当前行数量
        const excessQty = totalFormQuantity - available
        const adjustedQty = Math.max(0, (detail.quantity || 0) - excessQty)
        detail.quantity = adjustedQty
        ElMessage.error(t('inputCirculation.stockInsufficient', { available, requested: totalFormQuantity }))
      }
    }
  } catch (error) {
    console.error('Failed to validate stock:', error)
  }
}

const getUnionInfo = async (value) => {
  if (!value || value.length === 0) return
  loading.value = true
  try {
    const response = await getUnionDetailByUnionId(value)
    if (response.code === 200 && response.data) {
      formData.targetAddress = response.data.fullAddress
      formData.targetContact = response.data.operator
    }
    // 加载需求列表
    await loadDemandList(regionCode.value)
  } catch (error) {
    ElMessage.error(t('union.getUnionInfoFailed'))
  } finally {
    loading.value = false
  }
}

// 加载需求列表
const loadDemandList = async (unionCode) => {
  demandLoading.value = true
  try {
    const response = await getTownAggregationDetail({
      sourceCode: unionCode,
      year: formData.releaseYear || new Date().getFullYear().toString()
    })
    if (response.code === 200) {
      demandList.value = response.data || []
    }
  } catch (error) {
    console.error('Failed to load demand list:', error)
  } finally {
    demandLoading.value = false
  }
}

// 处理需求选择变化
const handleDemandSelectionChange = (selection) => {
  selectedDemands.value = selection
}

// 处理年度变化 - 重新加载需求列表
const handleYearChange = () => {
  if (formData.targetId) {
    loadDemandList(regionCode.value)
  }
}

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getOseReleaseDetail(route.params.id)
    if (response.code === 200 && response.data) {
      Object.assign(formData, response.data.main)
      formData.details = response.data.details || []
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const addDetail = () => {
  formData.details.push({
    inputType: '',
    inputCategory: '',
    quantity: 0,
    unit: '',
    unitPrice: 0,
    quantity: 0,
    unit: '',
    unitPrice: 0,
    maxQuantity: 0,
    currentStock: 0,
    outWarehouseCode: '',
    outWarehouseName: '',
    inWarehouseCode: '',
    inWarehouseName: ''
  })
}

const removeDetail = (index) => {
  formData.details.splice(index, 1)
}

const handleDetailOutWarehouseChange = (row, code) => {
  const warehouse = warehouseOptions.value.find(item => item.warehouseCode === code)
  row.outWarehouseName = warehouse ? warehouse.warehouseName : ''
}

const handleDetailInWarehouseChange = (row, code) => {
  const warehouse = warehouseOptions.value.find(item => item.warehouseCode === code)
  row.inWarehouseName = warehouse ? warehouse.warehouseName : ''
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true

    try {
      // 库存校验
      const quantityByType = {}
      for (const detail of formData.details) {
        const key = `${detail.inputType}_${detail.inputCategory || ''}`
        if (!quantityByType[key]) {
          quantityByType[key] = { inputType: detail.inputType, inputCategory: detail.inputCategory, quantity: 0 }
        }
        quantityByType[key].quantity += (detail.quantity || 0)
      }

      for (const key of Object.keys(quantityByType)) {
        const item = quantityByType[key]
        const organCode = userStore.userInfo?.organCode || userStore.userInfo?.user?.organCode || userStore.userInfo?.deptId
        if (!organCode) {
          ElMessage.error(t('inputCirculation.organCodeMissing') || '无法获取机构编码')
          loading.value = false
          return
        }
        const stockRes = await getAvailableStock(item.inputType, item.inputCategory, organCode)
        if (stockRes.code === 200 && stockRes.data) {
          const available = stockRes.data.availableStock || 0
          if (item.quantity > available) {
            ElMessage.error(t('inputCirculation.stockInsufficient', { available: available, requested: item.quantity }))
            loading.value = false
            return
          }
        }
      }

      const submitData = { ...formData }
      if (Array.isArray(formData.targetId) && formData.targetId.length > 0) {
        submitData.targetId = formData.targetId[formData.targetId.length - 1]
      }
      const apiFunc = isEdit.value ? editOseRelease : addOseRelease
      const response = await apiFunc(submitData)
      if (response.code === 200) {
        ElMessage.success(t('common.saveSuccess'))
        router.back()
      } else {
        ElMessage.error(response.msg || t('common.saveFailed'))
      }
    } catch (error) {
      console.error('Failed to submit form:', error)
      ElMessage.error(t('common.saveFailed'))
    } finally {
      loading.value = false
    }
  })
}

const handleBack = () => {
  router.back()
}

// 根据页面模式返回不同的按钮
const getActionButtons = () => {
  const mode = pageMode.value

  // 新建/编辑模式
  if (mode === 'add' || mode === 'edit') {
    return [
      { type: '', label: 'cancel', action: 'cancel' },
      { type: 'primary', label: 'save', action: 'save' }
    ]
  }

  // 默认按钮
  return [
    { type: '', label: 'cancel', action: 'cancel' },
    { type: 'primary', label: 'save', action: 'save' }
  ]
}

// 统一的动作处理方法
const handleAction = (action) => {
  switch (action) {
    case 'cancel':
      handleBack()
      break
    case 'save':
      handleSubmit()
      break
  }
}

onMounted(async () => {
  await getUserInfo()
  await getInputList()
  await loadWarehouses()
  if (isEdit.value) {
    await fetchDetail()
  } else {
    await getAllZoneList()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
