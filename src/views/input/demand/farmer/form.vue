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
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" class="demand-form">
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
              <!-- 年份列：使用年份选择器，允许用户选择年份 -->
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
                <!-- 投入品大类：级联选择器（新增change事件） -->
                <el-row :gutter="20" style="margin-bottom: 16px;">
                  <el-col :xs="24">
                    <el-form-item
                        :label="$t('farmerDemand.form.inputCategory')"
                        :prop="`inputItems.${index}.inputCategory`"
                        :rules="rules.inputCategory"
                    >
                      <el-cascader
                          v-model="item.inputCategory"
                          :options="cascaderOptions"
                          :placeholder="$t('farmerDemand.placeholder.inputCategory')"
                          style="width: 100%"
                          :props="{ expandTrigger: 'click', label: 'label', value: 'value' }"
                          @change="(val) => handleCascaderChange(val, index)"
                      ></el-cascader>
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
                      <el-input v-model="item.unit" :placeholder="$t('farmerDemand.placeholder.unit')"></el-input>
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
import { getFarmerList } from '@/api/newFarm'
import { getFarmerDetail } from '@/api/newFarm'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

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

// 投入品级联选择器数据源（原有逻辑不变）
const cascaderOptions = computed(() => [
  {
    value: 'pesticide',
    label: t('farmerDemand.cascader.pesticide'),
    children: [
      { value: 'insecticide', label: t('farmerDemand.cascader.insecticide') },
      { value: 'fungicide', label: t('farmerDemand.cascader.fungicide') },
      { value: 'herbicide', label: t('farmerDemand.cascader.herbicide') }
    ]
  },
  {
    value: 'seed',
    label: t('farmerDemand.cascader.seed'),
    children: [
      { value: 'coffee', label: t('farmerDemand.cascader.coffee') },
      { value: 'apple', label: t('farmerDemand.cascader.apple') },
      { value: 'wheat', label: t('farmerDemand.cascader.wheat') }
    ]
  },
  {
    value: 'fertilizer',
    label: t('farmerDemand.cascader.fertilizer'),
    children: [
      { value: 'nitrogen', label: t('farmerDemand.cascader.nitrogen') },
      { value: 'phosphorus', label: t('farmerDemand.cascader.phosphorus') },
      { value: 'potassium', label: t('farmerDemand.cascader.potassium') }
    ]
  }
])

// 表单数据（新增variety字段）
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
  landArea: null,
  year: currentYear.toString(),
  inputItems: []
})

// 表单验证规则（原有逻辑不变）
const rules = reactive({
  farmerName: [
    { required: true, message: t('farmerDemand.rules.farmerNameRequired'), trigger: 'change' },
    { max: 100, message: t('farmerDemand.rules.farmerNameLength'), trigger: 'change' }
  ],
  farmerIdNumber: [
    { max: 50, message: t('farmerDemand.rules.farmerIdNumberLength'), trigger: 'blur' }
  ],
  inputCategory: [{
    required: true,
    message: t('farmerDemand.rules.inputCategoryRequired'),
    trigger: 'change'
  }],
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

// 新增：级联选择器change事件，拆分一级/二级值
const handleCascaderChange = (val, index) => {
  if (val && val.length >= 1) {
    formData.inputItems[index].variety = val[1] || '';
  } else {
    formData.inputItems[index].variety = '';
  }
}

// 农民搜索方法（原有逻辑不变）
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

// 选中农民后填充字段（原有逻辑不变）
const handleSelectFarmer = (farmer) => {
  console.log('farmer',farmer)
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

  // 填充基础字段
  formData.farmerId = farmer.farmerId || ''
  formData.farmerName = farmer.farmerName || ''
  formData.farmerIdNumber = farmer.idCard || ''

  // 填充禁用字段
  formData.zone = farmer.zoneCode|| ''
  formData.woreda = farmer.woredaCode  || ''
  formData.kebele = farmer.kebeleCode  || ''
  formData.zoneName = farmer.zoneName || ''
  formData.woredaName = farmer.woredaName || ''
  formData.kebeleName = farmer.kebeleName || ''
  formData.landArea = farmer.totalLandArea || null

}

// 添加投入品明细（新增variety默认值）
const handleAddItem = () => {
  formData.inputItems.push({
    inputCategory: [],
    variety: '', // 新增
    unit: '',
    quantity: null
  })
}

// 移除投入品明细（原有逻辑不变）
const handleRemoveItem = (index) => {
  formData.inputItems.splice(index, 1)
}

// 加载编辑态数据（适配级联回显逻辑）
const loadData = async () => {
  if (!isEdit.value) return
  try {
    const res = await getFarmerDemandDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
      // 保留后端返回的年份，允许用户修改
      // 如果后端没有返回年份，则使用当前年
      if (!formData.year) {
        formData.year = currentYear.toString()
      }

      // 适配级联字段格式（拼接一级+二级为数组）
      if (formData.inputItems && formData.inputItems.length > 0) {
        formData.inputItems.forEach(item => {
          const cascadeVal = []
          // 一级值（后端枚举）
          if (item.inputCategory) {
            cascadeVal.push(item.inputCategory)
          }
          // 二级值（可选）
          if (item.variety) {
            cascadeVal.push(item.variety)
          }
          item.inputCategory = cascadeVal
          item.variety = item.variety || ''
        })
      } else {
        formData.inputItems = []
      }

      // 回显农民信息（原有逻辑不变）
      if (formData.farmerId) {
        farmerLoading.value = true
        try {
          const farmerRes = await getFarmerDetail(formData.farmerId)
          console.log('farmerRes',farmerRes)
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

// 提交表单（核心修改：仅传一级值给inputCategory，新增时区划提交code）
const handleSubmit = async () => {
  console.log('selectedFarmer.value',selectedFarmer.value)
  if (!formRef.value) return



  try {
    await formRef.value.validate()

    if (formData.inputItems.length === 0) {
      ElMessage.warning(t('farmerDemand.rules.itemsRequired'))
      return
    }

    // 处理级联字段提交格式
    const submitData = {
      ...formData,
      inputItems: formData.inputItems.map(item => ({
        ...item,
        inputCategory: item.inputCategory[0] || '',
        variety: item.variety || '',
        inputType: 'UNKNOWN'
      }))
    }

    submitting.value = true
    const apiFunc = isEdit.value ? updateFarmerDemand : addFarmerDemand
    const params = { ...submitData, daId: daId.value }
    console.log('submitData',submitData)

    if (isEdit.value) {
      params.id = route.params.id
    }

    // ========== 新增：打印参数，确认farmerId是否存在且有值 ==========
    console.log('最终提交的参数：', params)

    const res = await apiFunc(params)
    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('farmerDemand.editSuccess') : t('farmerDemand.addSuccess'))
      router.push({ name: 'FarmerDemand' })
    } else {
      ElMessage.error(res.msg || t('farmerDemand.messages.saveFailed'))
    }
  } catch (error) {
    ElMessage.error(t('farmerDemand.messages.saveFailed'))
  } finally {
    submitting.value = false
  }
}

// 取消操作（原有逻辑不变）
const handleCancel = () => {
  router.back()
}

// 初始化（原有逻辑不变）
onMounted(() => {
  // 解析用户ID（生产环境逻辑）
  try {
    const userInfoStr = localStorage.getItem('userInfo')
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr)
      // daId.value = userInfo.daId || ''
      daId.value = 'DA202401001'
      // 测试环境可临时启用
    } else {
      ElMessage.warning(t('common.tips.noUserInfo'))
    }
  } catch (e) {
    ElMessage.error(t('common.tips.parseUserInfoFailed'))
  }

  loadData()
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

.form-section:last-of-type {
  border-bottom: none;
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

/* 级联选择器样式适配 */
:deep(.el-cascader .el-input__inner) {
  padding: 0 15px;
}

/* 下拉框样式适配 */
:deep(.el-select .el-input__inner) {
  padding: 0 15px;
}

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

  .page-subtitle {
    font-size: 14px;
  }

  .content-wrapper {
    padding: 20px;
    border-radius: 12px;
  }

  .demand-form {
    :deep(.el-form-item__label) {
      font-size: 14px;
    }
  }

  .item-card {
    padding: 16px;
  }
}
</style>