<template>
  <div class="zone-allocation-form-container">
    <el-page-header @back="handleBack" :title="$t('common.back')">
      <template #content>
        <span>{{ isEdit ? $t('allocation.editAllocation') : $t('allocation.addAllocation') }}</span>
      </template>
    </el-page-header>

    <el-card v-loading="loading" class="form-card">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="150px">
        <!-- Basic Information -->
        <h3>{{ $t('allocation.basicInfo') }}</h3>
        <el-form-item :label="$t('allocation.allocationName')" prop="allocationName">
          <el-input v-model="formData.allocationName" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('allocation.year')" prop="year">
          <el-date-picker 
            v-model="formData.year" 
            type="year" 
            value-format="YYYY" 
            @change="handleYearOrZoneChange" />
        </el-form-item>
        <el-form-item :label="$t('allocation.zone')" prop="zone">
  <el-select 
    v-model="formData.zone" 
    :placeholder="$t('common.pleaseSelect')" 
    @change="handleZoneChange">
    <el-option 
      v-for="item in zoneOptions" 
      :key="item.code" 
      :label="item.name" 
      :value="item.code" />
  </el-select>
</el-form-item>

        <!-- Demand Section (根据Year和zone带出，不可编辑) -->
        <h3>{{ $t('allocation.demand') }}</h3>
        <el-table
          :data="demandList"
          border
          style="margin-top: 16px; margin-bottom: 24px;"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
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

        <!-- Quota Section (根据Demand数据一样，Input Type和Input Category不可编辑，Total Quantity可以编辑) -->
        <h3>{{ $t('allocation.quota') }}</h3>
        <el-table
          :data="quotaList"
          border
          style="margin-top: 16px; margin-bottom: 24px;"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
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
                style="width: 120px" />
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
import { getZoneAllocationDetail, addZoneAllocation, editZoneAllocation } from '@/api/allocation'
import { getVillageDemandSummaryMainList, getTownAggregationDetail } from '@/api/villageAggregation'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store/user'

const { getLabelByValue, options } = useDict(['input_type', 'input_category'])

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const demandLoading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

const zoneOptions = ref([]) // 区域选项

const formData = reactive({
  id: '',
  allocationName: '',
  year: new Date().getFullYear().toString(),
  zone: '',
  zoneName: '' // 添加zoneName字段
})

const demandList = ref([]) // 需求列表（不可编辑）
const quotaList = ref([]) // 配额列表（可编辑数量）

// 验证规则
const rules = {
  allocationName: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  year: [{ required: true, message: t('common.required'), trigger: 'change' }],
  zone: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

// 获取区域选项数据
const getZoneOptions = async () => {
  loading.value = true
  try {
    const response = await getVillageDemandSummaryMainList({
      page: 1,
      pageSize: 100,
      year: formData.year,
      targetCode: userStore.userInfo?.user?.REGION_CODE || ''
    })
    if (response.code === 200) {
      // 将返回的list映射为zoneOptions需要的格式
      zoneOptions.value = response.data.list.map(item => ({
        code: item.sourceCode,
        name: item.sourceName
      }))
    }
  } catch (error) {
    console.error('Error fetching zone options:', error)
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

// 处理zone选择变化
const handleZoneChange = (value) => {
  // 查找选中的zone对象
  const selectedZone = zoneOptions.value.find(item => item.code === value)
  if (selectedZone) {
    // 保存zone的name
    formData.zoneName = selectedZone.name
  } else {
    formData.zoneName = ''
  }
  
  // 调用加载需求数据的函数
  handleYearOrZoneChange()
}

// 当年份或区域改变时，加载需求数据
const handleYearOrZoneChange = async () => {
  if (!formData.year || !formData.zone) {
    demandList.value = []
    quotaList.value = []
    return
  }
  
  demandLoading.value = true
  try {
    // 调用API获取需求数据
    const response = await getTownAggregationDetail({
      sourceCode: formData.zone,
      year: formData.year
    })
    
    if (response.code === 200 && response.data) {
      // 将返回的数据映射为需求列表需要的格式
      demandList.value = response.data.map(item => ({
        inputType: item.inputType,
        inputCategory: item.inputCategory,
        totalQuantity: item.totalQuantity
      }))
      
      // 初始化配额列表为需求列表的数据
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
    const response = await getZoneAllocationDetail(route.params.id)
    if (response.code === 200 && response.data) {
      Object.assign(formData, response.data.main)
      
      // 设置需求列表和配额列表
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
    
    // 校验配额数量不能超过需求数量
    const isValid = validateQuotaVsDemand()
    if (!isValid) return
    
    loading.value = true
    
    // 准备提交数据
    const submitData = {
      ...formData,
      demandList: demandList.value,
      quotaList: quotaList.value
    }
    
    try {
      const apiFunc = isEdit.value ? editZoneAllocation : addZoneAllocation
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

// 校验配额数量不能超过需求数量
const validateQuotaVsDemand = () => {
  // 确保两个列表长度相同
  if (demandList.value.length !== quotaList.value.length) {
    ElMessage.error(t('allocation.demandAndQuotaMismatch'))
    return false
  }
  
  // 检查每个配额项的数量是否超过对应的需求项数量
  for (let i = 0; i < demandList.value.length; i++) {
    const demandItem = demandList.value[i]
    const quotaItem = quotaList.value[i]
    
    // 确保是同一项（通过inputType和inputCategory匹配）
    if (demandItem.inputType !== quotaItem.inputType || 
        demandItem.inputCategory !== quotaItem.inputCategory) {
      ElMessage.error(t('allocation.demandAndQuotaMismatch'))
      return false
    }
    
    // 检查配额数量是否超过需求数量
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
  await getZoneOptions()
  if (isEdit.value) {
    await fetchDetail()
  }
})
</script>

<style scoped>
.zone-allocation-form-container {
  padding: 20px;
}
.form-card {
  margin-top: 20px;
}
</style>