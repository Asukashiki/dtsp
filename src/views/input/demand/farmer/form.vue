<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-edit-box-line"></i>
          </div>
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
            class="demand-form"
        >
          <!-- 农民信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-user-line"></i>
              {{ $t('farmerDemand.form.farmerInfo') }}
            </div>
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

          <!-- 投入品明细 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-list-check"></i>
              {{ $t('farmerDemand.form.itemsInfo') }}
              <el-button type="primary" size="small" @click="handleAddItem">
                <i class="ri-add-line"></i>
                {{ $t('farmerDemand.form.addItem') }}
              </el-button>
            </div>

            <!-- 显示季节耕地面积汇总和警告 -->
            <div v-if="formData.inputItems.length > 0 && formData.landArea" class="crop-land-summary-wrapper">
              <div class="summary-header">
                <span class="summary-label">{{ $t('farmerDemand.realtime.totalLandArea') }}:</span>
                <span class="summary-value">{{ formData.landArea }} {{ $t('farmerDemand.realtime.hectares') }}</span>
              </div>

              <!-- 按季节显示耕地面积汇总 -->
              <div v-if="Object.keys(seasonSummaries).length > 0" class="season-summaries-list">
                <div v-for="(sum, season) in seasonSummaries" :key="season"
                     class="season-summary-item"
                     :class="{ 'exceeded': sum > formData.landArea }">
                  <span class="season-name">{{ getSeasonName(season) }}</span>
                  <span class="season-sum">{{ sum.toFixed(2) }} {{ $t('farmerDemand.realtime.hectares') }}</span>
                  <i v-if="sum > formData.landArea" class="ri-error-warning-line warning-icon"></i>
                </div>
              </div>

              <!-- 超出警告（汇总显示） -->
              <div v-if="isSeasonCropLandExceeded" class="error-message">
                <i class="ri-error-warning-line"></i>
                <span>{{ getSeasonName(isSeasonCropLandExceeded.season) }}: {{ $t('farmerDemand.messages.cropLandExceedsLandArea', { totalCropLand: isSeasonCropLandExceeded.sum.toFixed(2), landArea: formData.landArea }) }}</span>
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
                <!-- 投入品大类：级联选择器 -->
                <el-row :gutter="20" style="margin-bottom: 16px;">
                  <el-col :xs="24">
                    <el-form-item
                        :label="$t('farmerDemand.form.inputCategory')"
                        :prop="`inputItems.${index}.cascadeValue`"
                        :rules="rules.cascadeValue"
                    >
                      <div v-loading="dictLoading">
                        <el-cascader
                            v-model="item.cascadeValue"
                            :options="cascaderOptions"
                            :placeholder="$t('farmerDemand.placeholder.inputCategory')"
                            style="width: 100%"
                            :props="{
                            expandTrigger: 'click',
                            label: 'label',
                            value: 'value',
                            checkStrictly: false,
                            emitPath: true
                          }"
                            @change="(val) => handleCascaderChange(val, index)"
                        ></el-cascader>
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
import { useDict, clearDictCache } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

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
const daId = ref('')

// 当前年份
const currentYear = new Date().getFullYear()

// 清除字典缓存
clearDictCache('input_type')
clearDictCache('input_category')

// 初始化字典
const {
  options: dictOptions,
  options,
  loading: dictLoading,
  refresh: refreshDict
} = useDict([
  'input_type',
  'input_category',
  'agri_unit',
  'agri_season'
], {
  immediate: true,
  cache: true
})

// 构建级联选项（适配字典）
const cascaderOptions = computed(() => {
  const typeList = dictOptions.value.input_type || []
  const categoryList = dictOptions.value.input_category || []

  // 过滤掉不需要的类型（如IN03）
  const filteredTypeList = typeList.filter(item => !['IN03'].includes(item.value))

  return filteredTypeList.map(type => {
    // 匹配当前类型下的子分类（值以类型值开头）
    const children = categoryList.filter(category => {
      const typeValue = (type.value || '').trim().toUpperCase()
      const categoryValue = (category.value || '').trim().toUpperCase()
      return categoryValue.startsWith(typeValue)
    }).map(category => ({
      value: category.value,
      label: category.label || category.value
    }))

    return {
      value: type.value,
      label: type.label || type.value,
      children: children.length > 0 ? children : [{ value: '', label: t('common.noData') }]
    }
  })
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

// 检查是否有任何季节的耕地面积超出土地面积
const isSeasonCropLandExceeded = computed(() => {
  if (!formData.landArea) return null

  // 按季节分组检查
  const seasonGroups = {}
  formData.inputItems.forEach(item => {
    if (item.season) {
      if (!seasonGroups[item.season]) {
        seasonGroups[item.season] = 0
      }
      seasonGroups[item.season] += (item.cropLand || 0)
    }
  })

  // 返回第一个超出限制的季节和对应的总和
  for (const [season, sum] of Object.entries(seasonGroups)) {
    if (sum > formData.landArea) {
      return { season, sum }
    }
  }
  return null
})

// 按季节分组汇总（用于显示）
const seasonSummaries = computed(() => {
  const result = {}
  formData.inputItems.forEach(item => {
    if (item.season) {
      if (!result[item.season]) {
        result[item.season] = 0
      }
      result[item.season] += (item.cropLand || 0)
    }
  })
  return result
})

// 获取季节名称（从字典中查找）
const getSeasonName = (seasonValue) => {
  if (!seasonValue) return ''
  const agriSeason = options.agri_season || dictOptions.value.agri_season || []
  const season = agriSeason.find(item => item.value === seasonValue)
  return season ? season.label : seasonValue
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
  cascadeValue: [{
    required: true,
    message: t('farmerDemand.rules.inputCategoryRequired'),
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

// 级联选择器change事件（适配字典值）
const handleCascaderChange = (val, index) => {
  if (val && val.length === 2 && val[1]) {
    formData.inputItems[index].inputType = val[0]
    formData.inputItems[index].inputCategory = val[1]
  } else {
    formData.inputItems[index].inputType = ''
    formData.inputItems[index].inputCategory = ''
  }
}

// 农民搜索方法
const handleSearchFarmer = async (query) => {
  if (!daId.value) {
    farmerList.value = []
    return
  }

  farmerLoading.value = true
  try {
    const requestParams = {
      daId: daId.value,
      farmerName: query.trim() || '',
      pageNum: 1,
      pageSize: 40
    }

    const res = await getFarmerList(requestParams)
    farmerList.value = res.data?.records || res.data?.rows || []

    if (farmerList.value.length === 0) {
      ElMessage.info(t('farmerDemand.tips.noFarmerFound', { daId: daId.value, query: query }))
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
  formData.inputItems.push({
    cascadeValue: [],
    inputType: '',
    inputCategory: '',
    season: '',
    cropLand: null,
    unit: '',
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

      // 适配编辑态的级联选择器值
      if (formData.inputItems && formData.inputItems.length > 0) {
        formData.inputItems.forEach(item => {
          item.cascadeValue = item.inputType && item.inputCategory
              ? [item.inputType, item.inputCategory]
              : []
        })
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
            const listRes = await getFarmerList({ daId: daId.value, farmerId: formData.farmerId, pageSize: 1 })
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

    // 验证按季节分组的耕地面积是否超过土地总面积
    const exceeded = isSeasonCropLandExceeded.value
    if (exceeded) {
      const seasonName = getSeasonName(exceeded.season)
      ElMessage.error(`${seasonName}: ${t('farmerDemand.messages.cropLandExceedsLandArea', {
        totalCropLand: exceeded.sum.toFixed(2),
        landArea: formData.landArea
      })}`)
      return
    }

    const user = JSON.parse(localStorage.getItem('userInfo')).user
    formData.daUserId = user.ID;
    formData.daUserName = user.NAME;
    // 处理提交数据
    const submitData = {
      ...formData,
      inputItems: formData.inputItems.map(item => ({
        inputType: item.inputType,
        inputCategory: item.inputCategory,
        season: item.season,
        cropLand: item.cropLand,
        unit: item.unit,
        quantity: item.quantity
      }))
    }

    submitting.value = true
    const apiFunc = isEdit.value ? updateFarmerDemand : addFarmerDemand
    const params = { ...submitData, daId: daId.value }

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

// 初始化
onMounted(async () => {
  // 监听窗口大小变化，适配标签宽度
  window.addEventListener('resize', () => {
    labelWidth.value
  })

  // 获取用户DA ID
  try {
    const userInfoStr = localStorage.getItem('userInfo')
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr)
      daId.value = userInfo.daId || 'DA202401001'
    } else {
      ElMessage.warning(t('common.tips.noUserInfo'))
    }
  } catch (e) {
    ElMessage.error(t('common.tips.parseUserInfoFailed'))
  }

  // 加载字典和数据
  await refreshDict()
  loadData()

  // 初始化农民列表
  if (daId.value) {
    handleSearchFarmer('')
  }
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.demand-form {
  max-width: 100%;
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e8f5e9;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 22px;
}

/* 耕地面积汇总提示 - 新版 */
.crop-land-summary-wrapper {
  margin-bottom: 16px;
  padding: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.summary-header {
  padding: 10px 12px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 30%, #FEDD00 100%);
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
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
  gap: 6px;
  margin-bottom: 8px;
}

.season-summary-item {
  padding: 10px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: all 0.2s;
}

.season-summary-item:hover {
  border-color: #009A44;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.season-summary-item.exceeded {
  background: #fef2f2;
  border-color: #dc2626;
  border-width: 2px;
}

.season-name {
  font-weight: 600;
  color: #1f2937;
  flex-shrink: 0;
}

.season-sum {
  font-weight: 600;
  color: #009A44;
  margin-left: auto;
}

.warning-icon {
  color: #dc2626;
  font-size: 18px;
  flex-shrink: 0;
}

.error-message {
  padding: 10px 12px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: #dc2626;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

.error-message i {
  font-size: 16px;
}

.no-items {
  text-align: center;
  padding: 40px 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  background: #fafafa;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.item-index {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

:deep(.el-cascader .el-input__inner) {
  padding: 0 15px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .content-wrapper {
    padding: 20px;
    border-radius: 12px;
  }

  .item-card {
    padding: 16px;
  }

  :deep(.el-form-item__label) {
    font-size: 14px !important;
  }

  :deep(.el-input__inner), :deep(.el-input-number__input) {
    font-size: 14px !important;
    padding: 8px 15px !important;
  }

  .crop-land-summary-wrapper {
    padding: 10px;
    margin-bottom: 12px;
  }

  .summary-header {
    padding: 8px 10px;
    font-size: 13px;
  }

  .summary-header .summary-value {
    font-size: 14px;
  }

  .season-summary-item {
    padding: 8px 10px;
    font-size: 13px;
  }

  .season-name,
  .season-sum {
    font-size: 13px;
  }

  .error-message {
    font-size: 12px;
    padding: 8px 10px;
  }

}
</style>
