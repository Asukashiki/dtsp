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
                  <el-form-item :label="$t('inputCirculation.worId')" prop="zoneId">
                    <el-select v-model="formData.zoneId" :placeholder="$t('common.pleaseSelect')" @change="handleZoneChange" style="width: 100%">
                      <el-option v-for="item in worList" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.targetId')" prop="targetId">
                    <el-select v-model="formData.targetId" :placeholder="$t('common.pleaseSelect')" @change="getCoorInfo" style="width: 100%">
                      <el-option v-for="item in coorList" :key="item.code" :label="item.name" :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.targetAddress')">
                    <el-input v-model="formData.targetAddress" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('inputCirculation.targetContact')">
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
                    {{ getLabelByValue('input_type', row.inputType) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
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
                      <el-option v-for="item in inputTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
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
                <el-table-column :label="$t('inputCirculation.unitPrice')" min-width="150">
                  <template #default="scope">
                    <el-input-number v-model="scope.row.unitPrice" :min="0" :precision="2" style="width: 100%" />
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
import { getUnionReleaseDetail, addUnionRelease, editUnionRelease, getAvailableStock, getDeptCategoryStock } from '@/api/inputCirculation'
import { getInventoryWarehouseList } from '@/api/inventory'
import { getRegistrationList } from '@/api/orgRegistration'
import { getUnionDetailByUnionId } from '@/api/union'
import { getCurrentUserInfo } from '@/api/user'
import { getOrgansRegionByCode, listSubRegionByCode } from '@/api/application'
import { getTownAggregationDetail } from '@/api/villageAggregation'
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

// 只显示化肥和农药类型 (IN02, IN03)
// 显示所有投入品类型
const inputTypeOptions = computed(() => {
  return options.value.input_type || []
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
  releaseType: 'UNION_TO_WOREDA',
  details: []
})

const worList = ref([])
const coorList = ref([])
const demandList = ref([])
const demandLoading = ref(false)
const warehouseOptions = ref([])

const rules = {
  releaseName: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  zoneId: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  targetId: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  releaseDate: [{ required: true, message: t('common.required'), trigger: 'change' }],
}

const getUserInfo = async () => {
  loading.value = true
  try {
    const response = await getCurrentUserInfo()
    if (response.code === 200 && response.data) {
      formData.releaseBy = response.data.user.name
      formData.releaseOrg = response.data.user.organName
      let userParentCode = 102010000
      await getSubRegionByCode(userParentCode)
    }
  } catch (error) {
    ElMessage.error(t('common.queryUserInfoFailed'))
  } finally {
    loading.value = false
  }
}

const getSubRegionByCode = async (code) => {
  if (!code || code.length === 0) return
  loading.value = true
  try {
    const response = await listSubRegionByCode({regionCode: code})
    if (response.code === 200 && response.data) {
      worList.value = response.data
    }
  } catch (error) {
    ElMessage.error(t('common.querySubRegionFailed'))
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

// Zone变化处理
const handleZoneChange = async (value) => {
  // 清空目标相关字段
  formData.targetId = ''
  formData.targetAddress = ''
  formData.targetContact = ''
  formData.targetPhone = ''
  await getAllCoopList(value)
  await loadDemandList(value)
}

// This method is now consolidated into getAllCoopList below

// 加载需求列表
const loadDemandList = async (code) => {
  demandLoading.value = true
  try {
    const response = await getTownAggregationDetail({
      sourceCode: code,
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
  if (formData.zoneId) {
    loadDemandList(formData.zoneId)
  }
}

const getCoorInfo = async (value) => {
  if (!value || value.length === 0) return
  loading.value = true
  try {
    const response = await getUnionDetailByUnionId(value)
    if (response.code === 200 && response.data) {
      formData.targetAddress = response.data.baseInfo?.fullAddress || response.data.fullAddress
      formData.targetContact = response.data.baseInfo?.contactName || response.data.operator
    }
  } catch (error) {
    ElMessage.error(t('union.getUnionInfoFailed'))
  } finally {
    loading.value = false
  }
}

// 投入品类型变化处理
const handleInputTypeChange = (index) => {
  const detail = formData.details[index]
  detail.inputCategory = ''
  detail.quantity = 0
}

// 投入品类别变化处理
const handleInputCategoryChange = (index) => {
  const detail = formData.details[index]
  const demandQty = getDemandQuantity(detail.inputType, detail.inputCategory)
  detail.quantity = 0
  detail.maxQuantity = demandQty
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

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getUnionReleaseDetail(route.params.id)
    if (response.code === 200 && response.data) {
      Object.assign(formData, response.data.main)
      formData.details = response.data.details || []
      if (formData.zoneId) {
        await handleZoneChange(formData.zoneId)
      }
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const addDetail = () => {
  // 检查是否有需求数据
  if (!demandList.value || demandList.value.length === 0) {
    ElMessage.warning(t('inputCirculation.noDemandCannotAdd'))
    return
  }
  // 默认选择第一个单位
  const defaultUnit = options.value.agri_unit?.[0]?.value || ''
  formData.details.push({
    inputType: '',
    inputCategory: '',
    quantity: 0,
    unit: defaultUnit,
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

    // 验证分发数量不能为0
    const zeroQuantityDetail = formData.details.find(d => !d.quantity || d.quantity <= 0)
    if (zeroQuantityDetail) {
      ElMessage.warning(t('inputCirculation.quantityCannotBeZero'))
      return
    }

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
        const stockRes = await getAvailableStock(item.inputType, item.inputCategory, userStore.userInfo.user.organCode)
        if (stockRes.code === 200 && stockRes.data) {
          const available = stockRes.data.availableStock || 0
          if (item.quantity > available) {
            ElMessage.error(t('inputCirculation.stockInsufficient', { available: available, requested: item.quantity }))
            loading.value = false
            return
          }
        }
      }

      const apiFunc = isEdit.value ? editUnionRelease : addUnionRelease
      const response = await apiFunc(formData)
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

const regionCode = ref('')

const getAllCoopList = async (value) => {
  loading.value = true
  regionCode.value = value
  try {
    const response = await getRegistrationList({
      regionCode: value,
      orgType: 'COOPERATIVE',
      auditStatus: 1,
      page: 1,
      pageSize: 10000
    })
    console.log('Cooperative List Response:', response)
    if (response.code === 200) {
      const list = response.data.records || response.data.rows || response.data.list || []
      coorList.value = list.map(item => ({
        code: item.id,
        name: item.orgName
      }))
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryCoorListFailed'))
  } finally {
    loading.value = false
  }
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

onMounted(() => {
  getUserInfo()
  loadWarehouses()
  if (isEdit.value) {
    fetchDetail()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
