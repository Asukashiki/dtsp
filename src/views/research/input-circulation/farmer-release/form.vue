<template>
  <div class="ose-release-form-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content>
        <span>{{ isEdit ? $t('inputCirculation.editRelease') : $t('inputCirculation.addRelease') }}</span>
      </template>
    </el-page-header>

    <el-card v-loading="loading" class="form-card">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="190px">
        <h3>{{ $t('inputCirculation.basicInfo') }}</h3>
        <!-- 农民选择 - 改为下拉框 -->
        <el-form-item :label="$t('inputCirculation.farmerName')" prop="farmerId">
          <el-select v-model="formData.farmerId" :placeholder="$t('common.pleaseSelect')" filterable
            @change="handleFarmerChange" style="width: 100%">
            <el-option v-for="farmer in farmerList" :key="farmer.farmerId" :label="farmer.farmerName"
              :value="farmer.farmerId" />
          </el-select>
        </el-form-item>

        <!-- 农民联系电话 - 自动带出 -->
        <el-form-item :label="$t('inputCirculation.farmerPhone')">
          <el-input v-model="formData.farmerPhone" :placeholder="$t('common.pleaseInput')" readonly />
        </el-form-item>

        <!-- 农民联系地址 - 自动带出 -->
        <el-form-item :label="$t('inputCirculation.farmerAddress')">
          <el-input v-model="formData.farmerAddress" :placeholder="$t('common.pleaseInput')" readonly />
        </el-form-item>

        <el-form-item :label="$t('inputCirculation.releaseYear')">
          <el-date-picker v-model="formData.releaseYear" type="year" value-format="YYYY" style="width: 100%" @change="handleYearChange" />
        </el-form-item>

        <el-form-item :label="$t('inputCirculation.releaseDate')" prop="releaseDate">
          <el-date-picker v-model="formData.releaseDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>

        <!-- 分发人 - 自动带出当前登录人 -->
        <el-form-item :label="$t('inputCirculation.releaseBy')">
          <el-input v-model="formData.releaseBy" :placeholder="$t('common.pleaseInput')" readonly />
        </el-form-item>

        <el-form-item :label="$t('inputCirculation.releaseOrg')">
          <el-input v-model="formData.releaseOrg" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>

        <!-- 需求列表 -->
        <h3>{{ $t('inputCirculation.demandSelectionTitle') }}</h3>
        <el-table :data="demandList" border v-loading="demandLoading" style="margin-bottom: 16px">
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
          <el-table-column :label="$t('districtAggregation.detailDialog.columns.totalQuantity')" prop="totalQuantity"
            min-width="120" />
        </el-table>

        <div class="flex justify-between">
          <h3>{{ $t('inputCirculation.detailInfo') }}</h3>
          <el-button type="primary" @click="addDetail">{{ $t('inputCirculation.addDetail') }}</el-button>
        </div>
        <el-table :data="formData.details" border style="margin-top: 16px">
          <el-table-column type="index" width="50" />

          <!-- 投入品类型选择 -->
          <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="150">
            <template #default="scope">
              <el-select v-model="scope.row.inputType" :placeholder="$t('common.pleaseSelect')"
                @change="handleInputTypeChange(scope.$index)" style="width: 100%">
                <el-option v-for="item in inputTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>

          <!-- 投入品类别选择 -->
          <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
            <template #default="scope">
              <el-select v-model="scope.row.inputCategory" :placeholder="$t('common.pleaseSelect')"
                @change="handleInputCategoryChange(scope.$index)" style="width: 100%">
                <el-option v-for="item in getFilteredCategories(scope.row.inputType)" :key="item.value"
                  :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>

          <!-- 需求数量 -->
          <el-table-column :label="$t('inputCirculation.demandQuantity')" min-width="100">
            <template #default="scope">
              {{ getDemandQuantity(scope.row.inputType, scope.row.inputCategory) }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.quantity')" min-width="120">
            <template #default="scope">
              <el-input-number v-model="scope.row.quantity" :min="0" :max="scope.row.maxQuantity || 999999"
                :precision="2" @change="validateQuantity(scope.$index)" />
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.unit')" min-width="100">
            <template #default="scope">
              <el-input v-model="scope.row.unit" :placeholder="$t('common.pleaseInput')" />
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.unitPrice')" min-width="120">
            <template #default="scope">
              <el-input-number v-model="scope.row.unitPrice" :min="0" :precision="2"
                @change="calculateTotalPrice(scope.$index)" />
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.totalPrice')" min-width="120">
            <template #default="scope">
              <el-input-number v-model="scope.row.totalPrice" :min="0" :precision="2" readonly />
            </template>
          </el-table-column>

          <el-table-column :label="$t('common.actions')" width="80" fixed="right">
            <template #default="scope">
              <el-button type="danger" link @click="removeDetail(scope.$index)">{{ $t('common.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 24px" class="flex justify-center">
          <el-button type="primary" @click="handleSubmit">{{ $t('common.save') }}</el-button>
          <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFarmerReleaseDetail, addFarmerRelease, editFarmerRelease, getAvailableStock } from '@/api/inputCirculation'
import { getFarmerList } from '@/api/newFarm'
import { useUserStore } from '@/store/user'
import { getFarmerDemandByFarmerId } from '@/api/farmerDemand'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue, options } = useDict(['input_type', 'input_category'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

// 农民列表
const farmerList = ref([])
// 需求列表
const demandList = ref([])
const demandLoading = ref(false)

// 显示所有投入品类型
const inputTypeOptions = computed(() => {
  return options.value.input_type || []
})

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
  receiveStatus: 'pending',
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
  if (!inputType || !options.value.input_category) return []
  // 根据 inputCategory 的前缀匹配 inputType
  // 例如 IN01 对应 IN0101, IN0102, IN0103
  return options.value.input_category.filter(item => item.value.startsWith(inputType))
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
}

// 获取需求数量
const getDemandQuantity = (inputType, inputCategory) => {
  const item = demandList.value.find(d => d.inputType === inputType && d.inputCategory === inputCategory)
  return item ? item.totalQuantity : '-'
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
    const organCode = userStore.userInfo?.user?.organCode
    const stockRes = await getAvailableStock(detail.inputType, detail.inputCategory, organCode)
    if (stockRes.code === 200 && stockRes.data) {
      const available = stockRes.data.availableStock || 0
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
  formData.details.push({
    inputType: '',
    inputCategory: '',
    quantity: 0,
    unit: 'kg',
    unitPrice: 0,
    totalPrice: 0,
    maxQuantity: null,
    releaseTime: new Date().toISOString()
  })
}

const removeDetail = (index) => {
  formData.details.splice(index, 1)
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
          releaseTime: formatDateTime(detail.releaseTime)
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

onMounted(async () => {
  await fetchFarmerList()

  if (!isEdit.value) {
    const userInfo = userStore.userInfo
    formData.releaseBy = userInfo.userName || userInfo.nickName || userInfo.name ||
      userInfo.user?.userName || userInfo.user?.nickName ||
      userInfo.user?.name || ''
  }

  if (isEdit.value) {
    await fetchDetail()
  }
})
</script>

<style scoped>
.ose-release-form-container {
  padding: 20px;
}

.form-card {
  margin-top: 20px;
}
</style>
