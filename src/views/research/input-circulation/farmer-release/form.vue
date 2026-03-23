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
                  <el-form-item :label="$t('inputCirculation.farmerName')" prop="farmerId">
                    <el-select v-model="formData.farmerId" :placeholder="$t('common.pleaseSelect')" filterable
                      @change="handleFarmerChange" style="width: 100%">
                      <el-option v-for="farmer in farmerList" :key="farmer.farmerId" :label="farmer.farmerName"
                        :value="farmer.farmerId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.farmerPhone')">
                    <el-input v-model="formData.farmerPhone" :placeholder="$t('common.pleaseInput')" readonly />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.farmerAddress')">
                    <el-input v-model="formData.farmerAddress" :placeholder="$t('common.pleaseInput')" readonly />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.releaseYear')">
                    <el-date-picker v-model="formData.releaseYear" type="year" value-format="YYYY" style="width: 100%" @change="handleYearChange" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.releaseDate')" prop="releaseDate">
                    <el-date-picker v-model="formData.releaseDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.releaseBy')">
                    <el-input v-model="formData.releaseBy" :placeholder="$t('common.pleaseInput')" readonly />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.releaseOrg')">
                    <el-input v-model="formData.releaseOrg" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 需求选择卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-list-check-line"></i>
                <span>{{ $t('inputCirculation.demandSelectionTitle') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-table :data="demandList" border v-loading="demandLoading">
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="150">
                  <template #default="{ row }">
                    {{ getInputTypeLabel(row.inputType) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
                  <template #default="{ row }">
                    {{ getInputCategoryLabel(row.inputType, row.inputCategory) }}
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
              <el-table :data="formData.details" border>
                <el-table-column type="index" width="50" />
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="180">
                  <template #default="scope">
                      <el-select v-model="scope.row.inputType" :placeholder="$t('common.pleaseSelect')"
                        @change="handleInputTypeChange(scope.$index)" style="width: 100%">
                      <el-option v-for="item in inputTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="180">
                  <template #default="scope">
                      <el-select v-model="scope.row.inputCategory" :placeholder="$t('common.pleaseSelect')"
                        @change="handleInputCategoryChange(scope.$index)" style="width: 100%">
                      <el-option v-for="item in getFilteredCategories(scope.row.inputType)" :key="item.value"
                        :label="item.label" :value="item.value" />
                      </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.demandQuantity')" min-width="140">
                  <template #default="scope">
                    {{ getDemandQuantity(scope.row.inputType, scope.row.inputCategory) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.currentStock')" min-width="140">
                  <template #default="scope">
                    <span>{{ scope.row.currentStock }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.quantity')" min-width="160">
                  <template #default="scope">
                    <el-input-number v-model="scope.row.quantity" :min="0" :max="scope.row.maxQuantity || 999999"
                      :precision="2" @change="validateQuantity(scope.$index)" style="width: 100%" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.unit')" min-width="140">
                  <template #default="scope">
                    <el-select v-model="scope.row.unit" :placeholder="$t('common.pleaseSelect')" style="width: 100%">
                      <el-option v-for="item in options.agri_unit" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.unitPrice')" min-width="140">
                  <template #default="scope">
                    <el-input-number v-model="scope.row.unitPrice" :min="0" :precision="2"
                      @change="calculateTotalPrice(scope.$index)" style="width: 100%" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.outWarehouse')" min-width="180">
                  <template #default="scope">
                    <el-select v-model="scope.row.outWarehouseCode" :placeholder="$t('common.pleaseSelect')" style="width: 100%"
                      @change="(val) => handleDetailOutWarehouseChange(scope.row, val)">
                      <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="`${item.warehouseCode} ${item.warehouseName}`" :value="item.warehouseCode" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.inWarehouse')" min-width="180">
                  <template #default="scope">
                    <el-select v-model="scope.row.inWarehouseCode" :placeholder="$t('common.pleaseSelect')" style="width: 100%"
                      :disabled="isWarehouseReadonly"
                      @change="(val) => handleDetailInWarehouseChange(scope.row, val)">
                      <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="`${item.warehouseCode} ${item.warehouseName}`" :value="item.warehouseCode" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('inputCirculation.totalPrice')" min-width="140">
                  <template #default="scope">
                    <el-input-number v-model="scope.row.totalPrice" :min="0" :precision="2" readonly style="width: 100%" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('common.actions')" width="80" fixed="right">
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
import { getFarmerReleaseDetail, addFarmerRelease, editFarmerRelease, getAvailableStock, getDeptCategoryStock } from '@/api/inputCirculation'
import { getInventoryWarehouseList } from '@/api/inventory'
import { getFarmerList } from '@/api/newFarm'
import { useUserStore } from '@/store/user'
import { getFarmerDemandByFarmerId } from '@/api/farmerDemand'
import { useDict } from '@/hooks/useDict'
import { getInventoryProductCategoryTree } from '@/api/inventory'

const { options } = useDict(['agri_unit'])

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

// 农民列表
const farmerList = ref([])
// 需求列表
const demandList = ref([])
const demandLoading = ref(false)
const warehouseOptions = ref([])
const isWarehouseReadonly = ref(false)

const categoryTree = ref([])
const inputTypeOptions = computed(() => categoryTree.value || [])

const formData = reactive({
  id: '',
  farmerId: '',
  farmerName: '',
  farmerPhone: '',
  farmerAddress: '',
  releaseYear: new Date().getFullYear().toString(),
  releaseDate: new Date().toISOString().split('T')[0],
  releaseBy: '',
  releaseOrg: '',
  receiveStatus: 'completed',
  details: []
})

const rules = {
  farmerId: [{ required: true, message: t('common.required'), trigger: 'change' }],
  releaseDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

// 获取农民列表
const fetchFarmerList = async () => {
  try {
    const response = await getFarmerList({ pageNum: 1, pageSize: 10000 })
    if (response.code === 200 && response.data && response.data.records) {
      farmerList.value = response.data.records
    }
  } catch (error) {
    console.error('Failed to fetch farmer list:', error)
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

// 加载需求列表 - 根据farmerId获取农民需求
const loadDemandList = async (farmerId) => {
  if (!farmerId) return
  demandLoading.value = true
  try {
    const response = await getFarmerDemandByFarmerId(farmerId, {
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

// 处理年度变化 - 重新加载需求列表
const handleYearChange = () => {
  if (formData.farmerId) {
    loadDemandList(formData.farmerId)
  }
}

// 农民选择变化处理
const handleFarmerChange = (farmerId) => {
  const selectedFarmer = farmerList.value.find(f => f.farmerId === farmerId)
  if (selectedFarmer) {
    formData.farmerName = selectedFarmer.farmerName
    formData.farmerPhone = selectedFarmer.phone || ''
    formData.farmerAddress = selectedFarmer.address || ''
    // 加载该农民的需求列表
    loadDemandList(farmerId)
  }
}

// 根据类型获取过滤后的类别
const getFilteredCategories = (inputType) => {
  if (!inputType) return []
  const match = categoryTree.value.find(item => item.value === inputType)
  return match?.children || []
}

// 投入品类型变化
const handleInputTypeChange = (index) => {
  const detail = formData.details[index]
  detail.inputCategory = ''
  detail.maxQuantity = null
}

// 投入品类别变化
const handleInputCategoryChange = (index) => {
  const detail = formData.details[index]
  const maxQty = getDemandQuantity(detail.inputType, detail.inputCategory)
  detail.maxQuantity = maxQty || 999999
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

// 获取需求数量
const getDemandQuantity = (inputType, inputCategory) => {
  const item = demandList.value.find(d => d.inputType === inputType && d.inputCategory === inputCategory)
  return item ? item.totalQuantity : '-'
}

const getInputTypeLabel = (value) => {
  const match = categoryTree.value.find(item => item.value === value)
  return match ? match.label : value || '-'
}

const getInputCategoryLabel = (typeValue, categoryValue) => {
  const parent = categoryTree.value.find(item => item.value === typeValue)
  const match = parent?.children?.find(child => child.value === categoryValue)
  return match ? match.label : categoryValue || '-'
}

// 验证数量 - 同时检查需求量和库存
const validateQuantity = async (index) => {
  const detail = formData.details[index]
  if (!detail.inputType) return

  // 校验需求量
  const maxQty = getDemandQuantity(detail.inputType, detail.inputCategory)
  if (typeof maxQty === 'number' && detail.quantity > maxQty) {
    ElMessage.warning(t('inputCirculation.quantityExceedsDemand'))
    detail.quantity = maxQty
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
        const excessQty = totalFormQuantity - available
        const adjustedQty = Math.max(0, (detail.quantity || 0) - excessQty)
        detail.quantity = adjustedQty
        ElMessage.error(t('inputCirculation.stockInsufficient', { available, requested: totalFormQuantity }))
      }
    }
  } catch (error) {
    console.error('Failed to validate stock:', error)
  }

  calculateTotalPrice(index)
}

// 计算总价
const calculateTotalPrice = (index) => {
  const detail = formData.details[index]
  if (detail.quantity && detail.unitPrice) {
    detail.totalPrice = parseFloat((detail.quantity * detail.unitPrice).toFixed(2))
  }
}

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getFarmerReleaseDetail(route.params.id)
    if (response.code === 200 && response.data) {
      Object.assign(formData, response.data.main)
      if (formData.releaseYear) {
        formData.releaseYear = String(formData.releaseYear)
      }
      formData.details = response.data.details || []

      // 从农民列表填充手机号和地址
      if (formData.farmerId) {
        const farmer = farmerList.value.find(f => f.farmerId === formData.farmerId)
        if (farmer) {
          formData.farmerPhone = farmer.phone || formData.farmerPhone || ''
          formData.farmerAddress = farmer.address || formData.farmerAddress || ''
        }
        // 加载需求列表
        loadDemandList(formData.farmerId)
      }
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const addDetail = () => {
  // 获取默认入库仓库（按创建时间最新排序的仓库）
  let defaultInWarehouse = null
  if (warehouseOptions.value.length > 0) {
    const sortedWarehouses = [...warehouseOptions.value].sort((a, b) => {
      const timeA = a.createTime || a.create_time || 0
      const timeB = b.createTime || b.create_time || 0
      return new Date(timeB) - new Date(timeA)
    })
    defaultInWarehouse = sortedWarehouses[0]
  }
  
  formData.details.push({
    inputType: '',
    inputCategory: '',
    quantity: 0,
    unit: '',
    unitPrice: 0,
    totalPrice: 0,
    unitPrice: 0,
    totalPrice: 0,
    maxQuantity: null,
    currentStock: 0,
    releaseTime: new Date().toISOString(),
    outWarehouseCode: '',
    outWarehouseName: '',
    inWarehouseCode: defaultInWarehouse ? defaultInWarehouse.warehouseCode : '',
    inWarehouseName: defaultInWarehouse ? defaultInWarehouse.warehouseName : ''
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

const formatDateTime = (dateStr) => {
  if (!dateStr) return null
  if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateStr)) {
    return dateStr
  }
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return null
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return

    // 库存校验
    loading.value = true
    try {
      // 按inputType汇总数量
      const quantityByType = {}
      for (const detail of formData.details) {
        const key = `${detail.inputType}_${detail.inputCategory || ''}`
        if (!quantityByType[key]) {
          quantityByType[key] = { inputType: detail.inputType, inputCategory: detail.inputCategory, quantity: 0 }
        }
        quantityByType[key].quantity += (detail.quantity || 0)
      }

      // 检查每种类型的可用库存
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

      const submitData = {
        ...formData,
        releaseYear: formData.releaseYear ? parseInt(formData.releaseYear, 10) : null,
        releaseDate: formData.releaseDate,
        details: formData.details.map(detail => ({
          inputType: detail.inputType,
          inputCategory: detail.inputCategory,
          quantity: detail.quantity,
          unit: detail.unit,
          unitPrice: detail.unitPrice,
          totalPrice: detail.totalPrice,
          releaseTime: formatDateTime(detail.releaseTime),
          outWarehouseCode: detail.outWarehouseCode,
          outWarehouseName: detail.outWarehouseName,
          inWarehouseCode: detail.inWarehouseCode,
          inWarehouseName: detail.inWarehouseName
        }))
      }

      const apiFunc = isEdit.value ? editFarmerRelease : addFarmerRelease
      const response = await apiFunc(submitData)
      if (response.code === 200) {
        ElMessage.success(t('common.saveSuccess'))
        router.back()
      } else {
        ElMessage.error(response.msg || t('common.saveFailed'))
      }
    } catch (error) {
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
  await fetchFarmerList()
  await loadWarehouses()
  await loadCategoryTree()
  isWarehouseReadonly.value = true
  if (!isEdit.value) {
    const userInfo = userStore.userInfo
    formData.releaseBy = userInfo.userName || userInfo.nickName || userInfo.name ||
      userInfo.user?.userName || userInfo.user?.nickName ||
      userInfo.user?.name || ''
    formData.releaseOrg = userInfo.user.ORGANNAME || userInfo.organCode || ''
  }

  if (isEdit.value) {
    await fetchDetail()
  }
})

const loadCategoryTree = async () => {
  try {
    const res = await getInventoryProductCategoryTree()
    if (res.code === 200 && Array.isArray(res.data)) {
      categoryTree.value = res.data.map(item => ({
        ...item,
        children: Array.isArray(item.children) && item.children.length > 0
          ? item.children
          : []
      }))
    }
  } catch (error) {
    console.error('Failed to load product category tree:', error)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
