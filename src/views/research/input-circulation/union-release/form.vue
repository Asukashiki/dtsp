<template>
  <div class="ose-release-form-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content>
        <span>{{ isEdit ? $t('inputCirculation.editRelease') : $t('inputCirculation.addRelease') }}</span>
      </template>
    </el-page-header>

    <el-card v-loading="loading" class="form-card">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="150px">
        <h3>{{ $t('inputCirculation.basicInfo') }}</h3>
        <el-form-item :label="$t('inputCirculation.releaseName')" prop="releaseName">
          <el-input v-model="formData.releaseName" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.worId')" prop="zoneId">
          <el-select v-model="formData.zoneId" :placeholder="$t('common.pleaseSelect')" @change="handleZoneChange">
            <el-option v-for="item in worList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.targetId')" prop="targetId">
          <el-select v-model="formData.targetId" :placeholder="$t('common.pleaseSelect')" @change="getCoorInfo">
            <el-option v-for="item in coorList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.targetAddress')">
          <el-input v-model="formData.targetAddress" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.targetContact')">
          <el-input v-model="formData.targetContact" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.releaseYear')">
          <el-date-picker v-model="formData.releaseYear" type="year" value-format="YYYY" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.releaseDate')" prop="releaseDate">
          <el-date-picker v-model="formData.releaseDate" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <!-- <el-form-item :label="$t('inputCirculation.auditBy')">
          <el-input v-model="formData.auditBy" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.auditDate')" prop="auditDate">
          <el-date-picker v-model="formData.auditDate" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item> -->

        <!-- 需求列表 -->
        <h3>{{ $t('inputCirculation.demandSelectionTitle') }}</h3>
        <el-table :data="demandList" border v-loading="demandLoading" style="margin-bottom: 20px">
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

        <!-- 分发明细 -->
        <h3>{{ $t('inputCirculation.detailInfo') }}</h3>
        <el-button type="primary" @click="addDetail" style="float: right;margin-bottom: 12px">{{ $t('inputCirculation.addDetail') }}</el-button>
        <el-table
            :data="formData.details"
            border
            style="margin-top: 16px;"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }">
          <el-table-column :label="$t('inputCirculation.releaseDetailId')" type="index" width="80" />
          <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="150">
            <template #default="scope">
              <el-select v-model="scope.row.inputType"
                         :placeholder="$t('common.pleaseSelect')"
                         @change="handleInputTypeChange(scope.$index)"
                         style="width: 100%">
                <el-option v-for="item in inputTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
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
          <el-table-column :label="$t('inputCirculation.demandQuantity')" min-width="120">
            <template #default="scope">
              <span>{{ getDemandQuantity(scope.row.inputType, scope.row.inputCategory) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.quantity')" min-width="180">
            <template #default="scope">
              <el-input-number 
                v-model="scope.row.quantity" 
                :min="0" 
                :max="getDemandQuantity(scope.row.inputType, scope.row.inputCategory)"
                :precision="2"
                @change="validateQuantity(scope.$index)" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.unit')" min-width="100">
            <template #default="scope">
              <el-input v-model="scope.row.unit" :placeholder="$t('common.pleaseInput')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.unitPrice')" min-width="150">
            <template #default="scope">
              <el-input-number v-model="scope.row.unitPrice" :min="0" :precision="2" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" min-width="100" fixed="right">
            <template #default="scope">
              <el-button type="danger" link @click="removeDetail(scope.$index)">{{ $t('common.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 24px; text-align: center">
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
import { getUnionReleaseDetail, addUnionRelease, editUnionRelease, getAvailableStock } from '@/api/inputCirculation'
import { getUnionDetailByUnionId } from '@/api/union'
import { getCurrentUserInfo } from '@/api/user'
import { getOrgansRegionByCode, listSubRegionByCode } from '@/api/application'
import { getTownAggregationDetail } from '@/api/villageAggregation'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store/user'

const { getLabelByValue, options } = useDict(['input_type', 'input_category'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

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

// Zone变化处理
const handleZoneChange = async (value) => {
  await getAllCoorList(value)
  await loadDemandList(value)
}

const getAllCoorList = async (value) => {
  loading.value = true
  try {
    const response = await getOrgansRegionByCode({regionCode: value})
    if (response.code === 200) {
      coorList.value = response.data
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryCoorListFailed'))
  } finally {
    loading.value = false
  }
}

// 加载需求列表
const loadDemandList = async (regionCode) => {
  demandLoading.value = true
  try {
    const response = await getTownAggregationDetail({ sourceCode: regionCode })
    if (response.code === 200) {
      demandList.value = response.data || []
    }
  } catch (error) {
    console.error('Failed to load demand list:', error)
  } finally {
    demandLoading.value = false
  }
}

const getCoorInfo = async (value) => {
  if (!value || value.length === 0) return
  loading.value = true
  try {
    const response = await getUnionDetailByUnionId(value)
    if (response.code === 200 && response.data) {
      formData.targetAddress = response.data.fullAddress
      formData.targetContact = response.data.operator
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
  formData.details.push({
    inputType: '',
    inputCategory: '',
    quantity: 0,
    unit: 'Kg',
    unitPrice: 0,
    maxQuantity: 0
  })
}

const removeDetail = (index) => {
  formData.details.splice(index, 1)
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

const handleBack = () => {
  router.back()
}

onMounted(() => {
  getUserInfo()
  if (isEdit.value) {
    fetchDetail()
  }
})
</script>

<style scoped>
.ose-release-form-container { padding: 20px; }
.form-card { margin-top: 20px; }
</style>
