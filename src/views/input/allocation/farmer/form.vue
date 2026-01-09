<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('allocation.editFarmerAllocation') : $t('allocation.addFarmerAllocation') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('allocation.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('allocation.allocationName')" prop="allocationName">
                    <el-input v-model="formData.allocationName" :placeholder="$t('common.pleaseInput')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('allocation.year')" prop="year">
                    <el-date-picker 
                      v-model="formData.year" 
                      type="year" 
                      value-format="YYYY" 
                      style="width: 100%"
                      @change="handleYearOrFarmerChange" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('allocation.farmer')" prop="zone">
                    <el-select 
                      v-model="formData.zone" 
                      :placeholder="$t('common.pleaseSelect')" 
                      style="width: 100%"
                      @change="handleFarmerChange">
                      <el-option 
                        v-for="item in farmerOptions" 
                        :key="item.code" 
                        :label="item.name" 
                        :value="item.code" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 需求区域 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-survey-line"></i>
                <span>{{ $t('allocation.demand') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-table
                :data="demandList"
                border
                stripe
                v-loading="demandLoading">
                <el-table-column :label="$t('allocation.inputType')" prop="inputType" min-width="150">
                  <template #default="{ row }">
                    {{ getLabelByValue('input_type', row.inputType) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('allocation.inputCategory')" prop="inputCategory" min-width="150">
                  <template #default="{ row }">
                    {{ getLabelByValue('input_category', row.inputCategory) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('allocation.totalQuantity')" prop="totalQuantity" min-width="120" />
              </el-table>
            </div>
          </div>

          <!-- 配额区域 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-pie-chart-line"></i>
                <span>{{ $t('allocation.quota') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-table
                :data="quotaList"
                border
                stripe
                v-loading="demandLoading">
                <el-table-column :label="$t('allocation.inputType')" prop="inputType" min-width="150">
                  <template #default="{ row }">
                    {{ getLabelByValue('input_type', row.inputType) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('allocation.inputCategory')" prop="inputCategory" min-width="150">
                  <template #default="{ row }">
                    {{ getLabelByValue('input_category', row.inputCategory) }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('allocation.totalQuantity')" min-width="150">
                  <template #default="{ row }">
                    <el-input-number 
                      v-model="row.totalQuantity" 
                      :min="0" 
                      :precision="2"
                      controls-position="right"
                      style="width: 100%" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <!-- 操作按钮汇总 -->
          <div class="form-actions">
            <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="loading">{{ $t('common.save') }}</el-button>
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
import { getFarmerAllocationDetail, addFarmerAllocation, editFarmerAllocation, getFarmerDemandByFarmerId } from '@/api/allocation'
import { getAllFarmerList } from '@/api/newFarm'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store/user'

const { getLabelByValue } = useDict(['input_type', 'input_category'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const demandLoading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

const farmerOptions = ref([]) // 农民选项

const formData = reactive({
  id: '',
  allocationName: '',
  year: new Date().getFullYear().toString(),
  zone: '',
  zoneName: '',
  level: 3
})

const demandList = ref([]) // 需求列表（不可编辑）
const quotaList = ref([]) // 配额列表（可编辑数量）

// 验证规则
const rules = {
  allocationName: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  year: [{ required: true, message: t('common.required'), trigger: 'change' }],
  zone: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

// 获取农民选项数据
const getFarmerOptions = async () => {
  loading.value = true
  try {
    const response = await getAllFarmerList()
    if (response.code === 200) {
      farmerOptions.value = response.data.map(item => ({
        code: item.farmerId,
        name: item.farmerName
      }))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

// 处理农民选择变化
const handleFarmerChange = (value) => {
  const selectedFarmer = farmerOptions.value.find(item => item.code === value)
  if (selectedFarmer) {
    formData.zoneName = selectedFarmer.name
  } else {
    formData.zoneName = ''
  }
  
  handleYearOrFarmerChange()
}

// 当年份或农民改变时，加载需求数据
const handleYearOrFarmerChange = async () => {
  if (!formData.year || !formData.zone) {
    demandList.value = []
    quotaList.value = []
    return
  }
  
  demandLoading.value = true
  try {
    const response = await getFarmerDemandByFarmerId(formData.zone, {
      year: formData.year
    })
    
    if (response.code === 200 && response.data) {
      demandList.value = response.data.map(item => ({
        inputType: item.inputType,
        inputCategory: item.inputCategory,
        totalQuantity: item.totalQuantity
      }))
      
      quotaList.value = demandList.value.map(item => ({
        ...item
      }))
    } else {
      demandList.value = []
      quotaList.value = []
      ElMessage.error(response.msg || t('common.queryFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
    demandList.value = []
    quotaList.value = []
  } finally {
    demandLoading.value = false
  }
}

// 获取详情数据（编辑模式）
const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getFarmerAllocationDetail(route.params.id)
    if (response.code === 200 && response.data) {
      Object.assign(formData, response.data.main)
      demandList.value = response.data.demandList || []
      quotaList.value = response.data.quotaList || []
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    const isValid = validateQuotaVsDemand()
    if (!isValid) return
    
    loading.value = true
    const submitData = {
      ...formData,
      demandList: demandList.value,
      quotaList: quotaList.value
    }
    
    try {
      const apiFunc = isEdit.value ? editFarmerAllocation : addFarmerAllocation
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

const validateQuotaVsDemand = () => {
  if (demandList.value.length !== quotaList.value.length) {
    ElMessage.error(t('allocation.demandAndQuotaMismatch'))
    return false
  }
  
  for (let i = 0; i < demandList.value.length; i++) {
    const demandItem = demandList.value[i]
    const quotaItem = quotaList.value[i]
    
    if (demandItem.inputType !== quotaItem.inputType || 
        demandItem.inputCategory !== quotaItem.inputCategory) {
      ElMessage.error(t('allocation.demandAndQuotaMismatch'))
      return false
    }
    
    const demandQuantity = parseFloat(demandItem.totalQuantity) || 0
    const quotaQuantity = parseFloat(quotaItem.totalQuantity) || 0
    
    if (quotaQuantity > demandQuantity) {
      ElMessage.error(`${t('allocation.quotaExceedsDemand')} ${getLabelByValue('input_type', demandItem.inputType)} - ${getLabelByValue('input_category', demandItem.inputCategory)}`)
      return false
    }
  }
  
  return true
}

const handleBack = () => {
  router.back()
}

onMounted(async () => {
  await getFarmerOptions()
  if (isEdit.value) {
    await fetchDetail()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>