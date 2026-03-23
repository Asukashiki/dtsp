<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('farmerDemand.edit') : $t('farmerDemand.add') }}</h1>
            <p class="page-subtitle">{{ $t('farmerDemand.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            :label-width="labelWidth"
        >
          <!-- 农民信息 -->
          <InfoCard
            :title="$t('farmerDemand.form.farmerInfo')"
            icon="ri-user-line"
          >
            <div class="card-body">
              <!-- 农民姓名 + 年份 一行两列 -->
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farmerDemand.form.farmerName')" prop="farmerName">
                    <el-select
                        v-model="selectedFarmer"
                        :placeholder="$t('farmerDemand.placeholder.farmerName')"
                        filterable
                        remote
                        :remote-method="handleSearchFarmer"
                        :loading="farmerLoading"
                        @change="handleSelectFarmer"
                        style="width: 100%"
                        value-key="farmerId"
                        clearable
                    >
                      <el-option
                          v-for="farmer in farmerList"
                          :key="farmer.farmerId"
                          :label="farmer.farmerName"
                          :value="farmer"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 年份列：使用年份选择器 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farmerDemand.form.year')" prop="year">
                    <el-date-picker
                        v-model="formData.year"
                        type="year"
                        format="YYYY"
                        value-format="YYYY"
                        :placeholder="$t('farmerDemand.placeholder.year')"
                        style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farmerDemand.form.farmerIdNumber')" prop="farmerIdNumber">
                    <el-input v-model="formData.farmerIdNumber" :placeholder="$t('farmerDemand.placeholder.farmerIdNumber')" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farmerDemand.form.landArea')" prop="landArea">
                    <el-input-number v-model="formData.landArea" :min="0" :precision="2" style="width: 100%" disabled></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farmerDemand.form.zone')" prop="zoneName">
                    <el-input v-model="formData.zoneName" :placeholder="$t('farmerDemand.placeholder.zone')" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farmerDemand.form.woreda')" prop="woredaName">
                    <el-input v-model="formData.woredaName" :placeholder="$t('farmerDemand.placeholder.woreda')" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('farmerDemand.form.kebele')" prop="kebeleName">
                    <el-input v-model="formData.kebeleName" :placeholder="$t('farmerDemand.placeholder.kebele')" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </InfoCard>

          <!-- 投入品明细 -->
          <InfoCard
            :title="$t('farmerDemand.form.itemsInfo')"
            icon="ri-list-check"
          >
            <template #actions>
              <el-button type="primary" size="small" @click="handleAddItem">
                <i class="ri-add-line"></i>
                {{ $t('farmerDemand.form.addItem') }}
              </el-button>
            </template>
            
            <div class="card-body">
              <!-- 显示季节耕地面积汇总和警告 -->
              <div v-if="formData.inputItems.length > 0 && formData.landArea" class="crop-land-summary-wrapper">
                <div class="summary-header">
                  <span class="summary-label">{{ $t('farmerDemand.realtime.totalLandArea') }}:</span>
                  <span class="summary-value">{{ formData.landArea }} {{ $t('farmerDemand.realtime.hectares') }}</span>
                </div>

                <!-- 按混合规则显示耕地面积汇总：种子按大类，化肥按小类 -->
                <div v-if="Object.keys(mixedSummaries).length > 0" class="season-summaries-list">
                  <div v-for="(data, key) in mixedSummaries" :key="key"
                       class="season-summary-item"
                       :class="{ 'exceeded': data.sum > formData.landArea }">
                    <span class="season-name">{{ getSeasonName(data.season) }} - {{ data.displayName }}</span>
                    <span class="season-sum">{{ data.sum.toFixed(2) }} {{ $t('farmerDemand.realtime.hectares') }}</span>
                    <i v-if="data.sum > formData.landArea" class="ri-error-warning-line warning-icon"></i>
                  </div>
                </div>

                <!-- 超出警告（汇总显示） -->
                <div v-if="isSeasonCropLandExceeded" class="error-message">
                  <i class="ri-error-warning-line"></i>
                  <span>{{ getSeasonName(isSeasonCropLandExceeded.season) }} - {{ isSeasonCropLandExceeded.displayName }}: {{ $t('farmerDemand.messages.cropLandExceedsLandArea', { totalCropLand: isSeasonCropLandExceeded.sum.toFixed(2), landArea: formData.landArea }) }}</span>
                </div>
              </div>

              <div v-if="formData.inputItems.length === 0" class="no-items">
                <el-empty :description="$t('farmerDemand.form.noItems')"></el-empty>
              </div>
              <div v-else class="items-list">
                <div v-for="(item, index) in formData.inputItems" :key="index" class="item-card">
                  <div class="item-header">
                    <span class="item-index">{{ index + 1 }}</span>
                    <el-button link type="danger" @click="handleRemoveItem(index)">
                      <i class="ri-delete-bin-line"></i>
                      {{ $t('farmerDemand.form.removeItem') }}
                    </el-button>
                  </div>
                  <!-- 投入品大类/小类：字典联动选择 -->
                  <el-row :gutter="20" style="margin-bottom: 16px;">
                    <el-col :xs="24" :sm="12">
                      <el-form-item
                          :label="$t('farmerDemand.form.inputType')"
                          :prop="`inputItems.${index}.inputType`"
                          :rules="rules.inputType"
                      >
                        <div v-loading="categoryLoading">
                          <el-select
                              v-model="item.inputType"
                              :placeholder="$t('farmerDemand.placeholder.inputType')"
                              style="width: 100%"
                              clearable
                              @change="(val) => handleMainCategoryChange(val, index)"
                          >
                            <el-option
                                v-for="category in mainCategoryOptions"
                                :key="category.value"
                                :label="category.label"
                                :value="category.value"
                            ></el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item
                          :label="$t('farmerDemand.form.inputCategory')"
                          :prop="`inputItems.${index}.inputCategory`"
                          :rules="rules.inputCategory"
                      >
                        <div v-loading="categoryLoading">
                          <el-select
                              v-model="item.inputCategory"
                              :placeholder="$t('farmerDemand.placeholder.inputCategory')"
                              style="width: 100%"
                              clearable
                              :disabled="!item.inputType"
                              @change="(val) => handleSubCategoryChange(val, index)"
                          >
                            <el-option
                                v-for="category in getSubCategoryOptions(item.inputType)"
                                :key="category.value"
                                :label="category.label"
                                :value="category.value"
                            ></el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" style="margin-bottom: 16px;">
                    <el-col :xs="24" :sm="12">
                      <el-form-item
                          :label="$t('farmerDemand.form.variety')"
                          :prop="`inputItems.${index}.variety`"
                          :rules="rules.variety"
                      >
                        <div v-loading="item.varietyLoading">
                          <el-select
                              v-model="item.varietyId"
                              :placeholder="$t('farmerDemand.placeholder.variety')"
                              style="width: 100%"
                              clearable
                              filterable
                              :disabled="!item.inputType || !item.inputCategory"
                              @change="(val) => handleVarietyChange(val, index)"
                          >
                            <el-option
                                v-for="variety in item.varietyOptions || []"
                                :key="variety.value"
                                :label="variety.label"
                                :value="variety.value"
                            ></el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <!-- 季节 + 耕地面积 -->
                  <el-row :gutter="20" style="margin-bottom: 16px;">
                    <el-col :xs="24" :sm="12">
                      <el-form-item
                          :label="$t('farmerDemand.form.season')"
                          :prop="`inputItems.${index}.season`"
                          :rules="rules.season"
                      >
                        <el-select v-model="item.season" :placeholder="$t('farmerDemand.placeholder.season')" style="width: 100%">
                          <el-option
                              v-for="seasonItem in options.agri_season"
                              :key="seasonItem.value"
                              :label="seasonItem.label"
                              :value="seasonItem.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item
                          :label="$t('farmerDemand.form.cropLand')"
                          :prop="`inputItems.${index}.cropLand`"
                          :rules="rules.cropLand"
                      >
                        <el-input-number
                            v-model="item.cropLand"
                            :min="0"
                            :precision="2"
                            style="width: 100%"
                            :placeholder="$t('farmerDemand.placeholder.cropLand')"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <!-- 单位 + 数量 -->
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="12">
                      <el-form-item
                          :label="$t('farmerDemand.form.unit')"
                          :prop="`inputItems.${index}.unit`"
                          :rules="rules.unit"
                      >
                        <el-select v-model="item.unit" :placeholder="$t('farmerDemand.placeholder.unit')" style="width: 100%">
                          <el-option
                              v-for="unitItem in options.agri_unit"
                              :key="unitItem.value"
                              :label="unitItem.label"
                              :value="unitItem.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                      <el-form-item
                          :label="$t('farmerDemand.form.quantity')"
                          :prop="`inputItems.${index}.quantity`"
                          :rules="rules.quantity"
                      >
                        <el-input-number v-model="item.quantity" :min="0" :precision="2" style="width: 100%"></el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </InfoCard>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">
              {{ $t('common.submit') }}
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
import { addFarmerDemand, updateFarmerDemand, getFarmerDemandDetail } from '@/api/farmerDemand'
import { getFarmerList, getFarmerDetail } from '@/api/newFarm'
import { getDicts } from '@/api/system/dict'
import { listProductManage } from '@/api/productManage'
import { useDict, clearDictCache } from '@/hooks/useDict'
import { parseI18nValue } from '@/utils/i18nHelper'
import { InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()

// 响应式标签宽度（适配移动端）
const labelWidth = computed(() => {
  const isMobile = window.innerWidth <= 768
  return isMobile ? '120px' : '180px'
})

// 表单相关
const formRef = ref(null)
const submitting = ref(false)
const isEdit = computed(() => !!route.params.id)

// 农民下拉框相关
const farmerList = ref([])
const farmerLoading = ref(false)
const selectedFarmer = ref(null)
const userId = ref('')

// 当前年份
const currentYear = new Date().getFullYear()

// 初始化字典
const {
  options: dictOptions,
  options,
  loading: dictLoading,
  refresh: refreshDict
} = useDict([
  'agri_unit',
  'agri_season'
], {
  immediate: true,
  cache: true
})

const categoryLoading = ref(false)
const mainCategoryOptions = ref([])
const subCategoryOptions = ref([])

const createVarietyState = () => ({
  varietyId: '',
  variety: '',
  varietyOptions: [],
  varietyLoading: false
})

// 表单数据
const formData = reactive({
  farmerId: '',
  farmerName: '',
  farmerIdNumber: '',
  region: '',
  zone: '',
  woreda: '',
  kebele: '',
  zoneName: '',
  woredaName: '',
  kebeleName: '',
  village: '',
  daUserId: '',
  daUserName: '',
  landArea: null,
  year: currentYear.toString(),
  inputItems: []
})

// 混合分组汇总逻辑：
// - 种子(IN01)：按季节+大类(inputType)汇总，同一季节所有种子加在一起判断
// - 化肥(IN02)：按季节+小类(inputCategory)分别判断，每种化肥单独判断
const mixedSummaries = computed(() => {
  const result = {}
  formData.inputItems.forEach(item => {
    if (item.season && item.inputType) {
      let key, displayName
      
      if (item.inputType === 'IN01') {
        // 种子：按季节+大类分组
        key = `${item.season}_${item.inputType}`
        displayName = getInputTypeName(item.inputType)
      } else {
        // 化肥及其他：按季节+小类分组
        if (!item.inputCategory) return
        key = `${item.season}_${item.inputCategory}`
        displayName = getInputCategoryName(item.inputCategory)
      }
      
      if (!result[key]) {
        result[key] = { 
          season: item.season, 
          inputType: item.inputType,
          inputCategory: item.inputCategory,
          displayName: displayName,
          sum: 0 
        }
      }
      result[key].sum += (item.cropLand || 0)
    }
  })
  return result
})

// 检查是否有任何分组的耕地面积超出土地面积
const isSeasonCropLandExceeded = computed(() => {
  if (!formData.landArea) return null

  for (const [key, data] of Object.entries(mixedSummaries.value)) {
    if (data.sum > formData.landArea) {
      return { 
        season: data.season, 
        displayName: data.displayName,
        sum: data.sum 
      }
    }
  }
  return null
})

// 获取季节名称（从字典中查找）
const getSeasonName = (seasonValue) => {
  if (!seasonValue) return ''
  const agriSeason = options.agri_season || dictOptions.value.agri_season || []
  const season = agriSeason.find(item => item.value === seasonValue)
  return season ? season.label : seasonValue
}

// 获取投入品类型名称（从级联选项中查找，大类）
const getInputTypeName = (typeValue) => {
  if (!typeValue) return ''
  const match = mainCategoryOptions.value.find(item => String(item.value) === String(typeValue))
  return match ? match.label : typeValue
}

// 获取投入品小类名称
const getInputCategoryName = (categoryValue) => {
  if (!categoryValue) return ''
  const match = subCategoryOptions.value.find(item => String(item.value) === String(categoryValue))
  if (match) return match.label
  return categoryValue
}

const getSubCategoryOptions = (mainCategoryValue) => {
  if (!mainCategoryValue) return []
  return subCategoryOptions.value.filter(item => String(item.parentValue) === String(mainCategoryValue))
}

// 表单验证规则
const rules = reactive({
  farmerName: [
    { required: true, message: t('farmerDemand.rules.farmerNameRequired'), trigger: 'change' },
    { max: 100, message: t('farmerDemand.rules.farmerNameLength'), trigger: 'change' }
  ],
  farmerIdNumber: [
    { max: 50, message: t('farmerDemand.rules.farmerIdNumberLength'), trigger: 'blur' }
  ],
  inputType: [{
    required: true,
    message: t('farmerDemand.rules.inputTypeRequired'),
    trigger: 'change'
  }],
  inputCategory: [{
    required: true,
    message: t('farmerDemand.rules.inputCategoryRequired'),
    trigger: 'change'
  }],
  variety: [{
    required: true,
    message: t('farmerDemand.rules.varietyRequired'),
    trigger: 'change'
  }],
  season: [{
    required: true,
    message: t('farmerDemand.rules.seasonRequired'),
    trigger: 'change'
  }],
  // cropLand: [{
  //   required: true,
  //   message: t('farmerDemand.rules.cropLandRequired'),
  //   trigger: 'blur'
  // }],
  unit: [{
    required: true,
    message: t('farmerDemand.rules.unitRequired'),
    trigger: 'blur'
  }],
  quantity: [{
    required: true,
    message: t('farmerDemand.rules.quantityRequired'),
    trigger: 'blur'
  }]
})

const handleMainCategoryChange = (value, index) => {
  const currentItem = formData.inputItems[index]
  if (!currentItem) return
  currentItem.inputType = value || ''
  currentItem.inputCategory = ''
  currentItem.varietyId = ''
  currentItem.variety = ''
  currentItem.varietyOptions = []
  currentItem.varietyLoading = false
}

const handleSubCategoryChange = async (value, index, preserveSelection = false) => {
  const currentItem = formData.inputItems[index]
  if (!currentItem) return

  const existingVarietyId = currentItem.varietyId
  const existingVarietyName = currentItem.variety

  currentItem.inputCategory = value || ''
  currentItem.varietyId = preserveSelection ? (existingVarietyId || '') : ''
  currentItem.variety = preserveSelection ? (existingVarietyName || '') : ''
  currentItem.varietyOptions = []

  if (!currentItem.inputType || !currentItem.inputCategory) {
    currentItem.varietyLoading = false
    return
  }

  currentItem.varietyLoading = true
  try {
    const mainCategoryLabel = getInputTypeName(currentItem.inputType)
    const subCategoryLabel = getInputCategoryName(currentItem.inputCategory)

    const res = await listProductManage({
      pageNum: 1,
      pageSize: 1000,
      mainCategory: mainCategoryLabel,
      subCategory: subCategoryLabel,
      status: '0'
    })

    const list = res.data?.list || []
    currentItem.varietyOptions = list
      .map(product => ({
        id: product.id || product.product_id || '',
        label: product.product_name || product.product_code || '-',
        value: product.id || product.product_id || '',
        productName: product.product_name || product.product_code || ''
      }))
      .filter(option => option.value)

    if (currentItem.varietyId) {
      const matchedById = currentItem.varietyOptions.find(option => String(option.value) === String(currentItem.varietyId))
      if (matchedById) {
        currentItem.variety = matchedById.productName
      }
    } else if (currentItem.variety) {
      const matchedOption = currentItem.varietyOptions.find(option => option.productName === currentItem.variety)
      if (matchedOption) {
        currentItem.varietyId = matchedOption.value
      }
    }
  } catch (error) {
    currentItem.varietyOptions = []
    ElMessage.error(t('common.loadFailed'))
  } finally {
    currentItem.varietyLoading = false
  }
}

const handleVarietyChange = (value, index) => {
  const currentItem = formData.inputItems[index]
  if (!currentItem) return
  currentItem.varietyId = value || ''
  const matchedOption = (currentItem.varietyOptions || []).find(option => String(option.value) === String(value))
  currentItem.variety = matchedOption?.productName || ''
}

// 农民搜索方法
const handleSearchFarmer = async (query) => {
  farmerLoading.value = true
  try {
    const requestParams = {
      farmerName: query.trim() || '',
      pageNum: 1,
      pageSize: 9999999
    }

    const res = await getFarmerList(requestParams)
    farmerList.value = res.data?.records || res.data?.rows || []

    if (farmerList.value.length === 0) {
      ElMessage.info(t('farmerDemand.tips.noFarmerFound', { query: query }))
    }
  } catch (e) {
    ElMessage.error(t('common.loadFailed'))
    farmerList.value = []
  } finally {
    farmerLoading.value = false
  }
}

// 选中农民后填充字段
const handleSelectFarmer = (farmer) => {
  if (!farmer) {
    formData.farmerId = ''
    formData.farmerName = ''
    formData.farmerIdNumber = ''
    formData.zone = ''
    formData.woreda = ''
    formData.kebele = ''
    formData.zoneName = ''
    formData.woredaName = ''
    formData.kebeleName = ''
    formData.landArea = null
    return
  }

  // 检查土地面积
  const landArea = farmer.totalLandArea || farmer.landArea || 0
  if (!landArea || landArea <= 0) {
    ElMessage.warning(t('farmerDemand.messages.farmerNoLand'))
    // 清空已选择的农民
    selectedFarmer.value = null
    return
  }

  formData.farmerId = farmer.farmerId || ''
  formData.farmerName = farmer.farmerName || ''
  formData.farmerIdNumber = farmer.idCard || ''
  formData.zone = farmer.zoneCode || ''
  formData.woreda = farmer.woredaCode || ''
  formData.kebele = farmer.kebeleCode || ''
  formData.zoneName = farmer.zoneName || ''
  formData.woredaName = farmer.woredaName || ''
  formData.kebeleName = farmer.kebeleName || ''
  formData.landArea = landArea
}

// 添加投入品明细
const handleAddItem = () => {
  // 获取 Unit 字典的第一个选项作为默认值
  const unitOptions = options.agri_unit || dictOptions.value.agri_unit || []
  const defaultUnit = unitOptions.length > 0 ? unitOptions[0].value : ''
  
  formData.inputItems.push({
    inputType: '',
    inputCategory: '',
    ...createVarietyState(),
    season: '',
    cropLand: null,
    unit: defaultUnit,
    quantity: null
  })
}

// 移除投入品明细
const handleRemoveItem = (index) => {
  formData.inputItems.splice(index, 1)
}

// 加载编辑态数据
const loadData = async () => {
  if (!isEdit.value) return
  try {
    const res = await getFarmerDemandDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
      if (!formData.year) {
        formData.year = currentYear.toString()
      }

      if (formData.inputItems && formData.inputItems.length > 0) {
        formData.inputItems = formData.inputItems.map(item => ({
          ...createVarietyState(),
          ...item
        }))

        await Promise.all(formData.inputItems.map((item, index) => {
          if (item.inputType && item.inputCategory) {
            return handleSubCategoryChange(item.inputCategory, index, true)
          }
          return Promise.resolve()
        }))
      } else {
        formData.inputItems = []
      }

      // 加载农民详情
      if (formData.farmerId) {
        farmerLoading.value = true
        try {
          const farmerRes = await getFarmerDetail(formData.farmerId)
          if (farmerRes.code === 200) {
            selectedFarmer.value = farmerRes.data
            formData.zone = farmerRes.data.zoneCode
            formData.woreda = farmerRes.data.woredaCode
            formData.kebele = farmerRes.data.kebeleCode
            formData.zoneName = farmerRes.data.zoneName
            formData.woredaName = farmerRes.data.woredaName
            formData.kebeleName = farmerRes.data.kebeleName
            formData.landArea = farmerRes.data.totalLandArea || farmerRes.data.landArea || formData.landArea
          } else {
            const listRes = await getFarmerList({ farmerId: formData.farmerId, pageSize: 1 })
            if (listRes.data?.records?.length) {
              selectedFarmer.value = listRes.data.records[0]
            }
          }
        } catch (e) {
          ElMessage.error(t('common.loadFailed'))
        } finally {
          farmerLoading.value = false
        }
      }
    }
  } catch (error) {
    ElMessage.error(t('common.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    // 检查农民是否已选择且有土地产权
    if (!formData.farmerId) {
      ElMessage.warning(t('farmerDemand.rules.farmerNameRequired'))
      return
    }

    // 再次验证土地面积（防止绕过选择检查）
    if (!formData.landArea || formData.landArea <= 0) {
      ElMessage.warning(t('farmerDemand.messages.farmerNoLand'))
      return
    }

    await formRef.value.validate()

    if (formData.inputItems.length === 0) {
      ElMessage.warning(t('farmerDemand.rules.itemsRequired'))
      return
    }

    // 验证混合分组的耕地面积是否超过土地总面积
    const exceeded = isSeasonCropLandExceeded.value
    if (exceeded) {
      const seasonName = getSeasonName(exceeded.season)
      ElMessage.error(`${seasonName} - ${exceeded.displayName}: ${t('farmerDemand.messages.cropLandExceedsLandArea', {
        totalCropLand: exceeded.sum.toFixed(2),
        landArea: formData.landArea
      })}`)
      return
    }

    // 获取用户信息
    const userInfoStr = localStorage.getItem('userInfo')
    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr)
        // userInfo 直接就是 user 对象，不需要再 .user
        formData.daUserId = userInfo.userId || userInfo.id || ''
        formData.daUserName = userInfo.nickName || userInfo.userName || ''
      } catch (e) {
        console.error('解析用户信息失败:', e)
        ElMessage.error(t('common.tips.parseUserInfoFailed'))
        return
      }
    } else {
      ElMessage.warning(t('common.tips.noUserInfo'))
      return
    }
    // 处理提交数据
    const submitData = {
      ...formData,
      inputItems: formData.inputItems.map(item => ({
        inputType: getInputTypeName(item.inputType),
        inputCategory: getInputCategoryName(item.inputCategory),
        productId: item.varietyId,
        variety: item.variety,
        season: item.season,
        cropLand: item.cropLand,
        unit: item.unit,
        quantity: item.quantity
      }))
    }

    submitting.value = true
    const apiFunc = isEdit.value ? updateFarmerDemand : addFarmerDemand
    const params = { ...submitData }

    if (isEdit.value) {
      params.id = route.params.id
    }

    const res = await apiFunc(params)
    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('farmerDemand.editSuccess') : t('farmerDemand.addSuccess'))
      router.push({ name: 'FarmerDemand' })
    } else {
      // 检测农民需求已存在的错误
      if (res.msg && res.msg.includes('Farmer demand already exists')) {
        ElMessage.warning(t('farmerDemand.messages.farmerDemandExists'))
      } else {
        ElMessage.error(res.msg || t('farmerDemand.messages.saveFailed'))
      }
    }
  } catch (error) {
    // 检测农民需求已存在的错误（来自异常）
    const errorMsg = error?.response?.data?.msg || error?.message || ''
    if (errorMsg.includes('Farmer demand already exists')) {
      ElMessage.warning(t('farmerDemand.messages.farmerDemandExists'))
    } else {
      ElMessage.error(t('farmerDemand.messages.saveFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 取消操作
const handleCancel = () => {
  router.back()
}

// 初始化分类字典
const loadCategoryOptions = async () => {
  try {
    categoryLoading.value = true
    const [mainRes, subRes] = await Promise.all([
      getDicts('inventory_main_category'),
      getDicts('inventory_sub_category')
    ])

    mainCategoryOptions.value = (mainRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue
    }))

    subCategoryOptions.value = (subRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue,
      parentValue: item.remark
    }))
  } catch (error) {
    console.error('Failed to load category options:', error)
  } finally {
    categoryLoading.value = false
  }
}

onMounted(async () => {
  // 监听窗口大小变化，适配标签宽度
  window.addEventListener('resize', () => {
    labelWidth.value
  })

  // 获取用户ID
  try {
    const userInfoStr = localStorage.getItem('userInfo')
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr)
      // 从 userInfo.userInfo.user.id 获取用户ID
      userId.value = userInfo?.userInfo?.user?.id || userInfo?.user?.id || ''
    } else {
      ElMessage.warning(t('common.tips.noUserInfo'))
    }
  } catch (e) {
    ElMessage.error(t('common.tips.parseUserInfoFailed'))
  }

  // 加载字典和数据
  await refreshDict()
  await loadCategoryOptions()
  loadData()

  // 初始化农民列表
  handleSearchFarmer('')
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

// 自定义样式
:deep(.el-select .el-input__inner) {
  padding: 0 15px;
}

// 耕地面积汇总提示 - 新版
.crop-land-summary-wrapper {
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg-color-page);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.summary-header {
  padding: 12px 16px;
  background: linear-gradient(135deg, var(--el-color-primary) 0%, #00b350 30%, #FEDD00 100%);
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-header .summary-label {
  color: white;
  font-weight: 600;
}

.summary-header .summary-value {
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.season-summaries-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.season-summary-item {
  padding: 12px 16px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: all 0.2s;
}

.season-summary-item:hover {
  border-color: var(--el-color-primary);
  box-shadow: var(--el-box-shadow-light);
}

.season-summary-item.exceeded {
  background: var(--el-color-danger-light-9);
  border-color: var(--el-color-danger);
  border-width: 1px;
}

.season-name {
  font-weight: 600;
  color: var(--text-color-primary);
  flex-shrink: 0;
}

.season-sum {
  font-weight: 600;
  color: var(--el-color-primary);
  margin-left: auto;
}

.warning-icon {
  color: var(--el-color-danger);
  font-size: 18px;
  flex-shrink: 0;
}

.error-message {
  padding: 12px 16px;
  background: var(--el-color-danger-light-9);
  border: 1px solid var(--el-color-danger-light-7);
  border-radius: 6px;
  color: var(--el-color-danger);
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.error-message i {
  font-size: 16px;
}

.item-card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  background: var(--bg-color-overlay);
  margin-bottom: 16px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.item-index {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-color-primary);
}

// 移动端适配
@media screen and (max-width: 768px) {
  .crop-land-summary-wrapper {
    padding: 12px;
    margin-bottom: 16px;
  }
}
</style>
