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
        <!-- 农民选择 - 改为下拉框 -->
        <el-form-item :label="$t('inputCirculation.farmerName')" prop="farmerId">
          <el-select
            v-model="formData.farmerId"
            :placeholder="$t('common.pleaseSelect')"
            filterable
            @change="handleFarmerChange"
            style="width: 100%"
          >
            <el-option
              v-for="farmer in farmerList"
              :key="farmer.farmerId"
              :label="farmer.farmerName"
              :value="farmer.farmerId"
            />
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
          <el-date-picker v-model="formData.releaseYear" type="year" value-format="YYYY" style="width: 100%" />
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

        <h3>{{ $t('inputCirculation.detailInfo') }}</h3>
        <el-button type="primary" @click="addDetail">{{ $t('inputCirculation.addDetail') }}</el-button>
        <el-table :data="formData.details" border style="margin-top: 16px">
          <el-table-column type="index" width="50" />

          <!-- 投入品选择 - 改为下拉框 -->
          <el-table-column :label="$t('inputCirculation.inputName')" width="200">
            <template #default="scope">
              <el-select
                v-model="scope.row.inputId"
                :placeholder="$t('common.pleaseSelect')"
                filterable
                @change="handleInputChange(scope.$index)"
                style="width: 100%"
              >
                <el-option
                  v-for="input in inputList"
                  :key="input.inputId"
                  :label="input.inputName"
                  :value="input.inputId"
                />
              </el-select>
            </template>
          </el-table-column>

          <!-- 品种 - 自动带出 -->
          <el-table-column :label="$t('inputCirculation.variety')" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.variety" :placeholder="$t('common.pleaseInput')" readonly />
            </template>
          </el-table-column>

          <!-- 作物种类（农资类型） - 自动带出 -->
          <el-table-column :label="$t('inputCirculation.cropType')" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.cropType" :placeholder="$t('common.pleaseInput')" readonly />
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.quantity')" width="120">
            <template #default="scope">
              <el-input-number v-model="scope.row.quantity" :min="0" :precision="2" @change="calculateTotalPrice(scope.$index)" />
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.unit')" width="100">
            <template #default="scope">
              <el-input v-model="scope.row.unit" :placeholder="$t('common.pleaseInput')" />
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.unitPrice')" width="120">
            <template #default="scope">
              <el-input-number v-model="scope.row.unitPrice" :min="0" :precision="2" @change="calculateTotalPrice(scope.$index)" />
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.totalPrice')" width="120">
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

        <el-form-item style="margin-top: 24px">
          <el-button type="primary" @click="handleSubmit">{{ $t('common.save') }}</el-button>
          <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFarmerReleaseDetail, addFarmerRelease, editFarmerRelease } from '@/api/inputCirculation'
import { getFarmerList } from '@/api/newFarm'
import { getAllInputList } from '@/api/input'
import { useUserStore } from '@/store/user'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

// 农民列表
const farmerList = ref([])
// 投入品列表
const inputList = ref([])

const formData = reactive({
  id: '',
  farmerId: '',
  farmerName: '',
  farmerPhone: '',
  farmerAddress: '',
  releaseYear: new Date().getFullYear().toString(),
  releaseDate: '',
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
    console.log('农民列表API返回:', response)
    if (response.code === 200 && response.data && response.data.records) {
      farmerList.value = response.data.records
      console.log('农民列表:', farmerList.value)
    }
  } catch (error) {
    console.error('Failed to fetch farmer list:', error)
  }
}

// 获取投入品列表
const fetchInputList = async () => {
  try {
    const response = await getAllInputList()
    console.log('投入品列表API返回:', response)
    if (response.code === 200 && response.data) {
      inputList.value = response.data.map(item => {
        console.log('投入品项:', item)
        return {
          inputId: item.inputId,
          inputName: item.inputName,
          // 尝试多种可能的字段名
          variety: item.variety || '',
          agriculturalInputType: item.agriculturalInputType || item.agricultural_input_type ||
                                 item.inputType || item.type || ''
        }
      })
      console.log('处理后的投入品列表:', inputList.value)
    }
  } catch (error) {
    console.error('Failed to fetch input list:', error)
  }
}

// 农民选择变化处理
const handleFarmerChange = (farmerId) => {
  console.log('选择的农民ID:', farmerId)
  console.log('当前农民列表:', farmerList.value)
  const selectedFarmer = farmerList.value.find(f => f.farmerId === farmerId)
  console.log('找到的农民:', selectedFarmer)
  if (selectedFarmer) {
    formData.farmerName = selectedFarmer.farmerName
    formData.farmerPhone = selectedFarmer.phone || ''
    formData.farmerAddress = selectedFarmer.address || ''
    console.log('已设置 - 姓名:', formData.farmerName, '电话:', formData.farmerPhone, '地址:', formData.farmerAddress)
  } else {
    console.warn('未找到对应的农民信息')
  }
}

// 投入品选择变化处理
const handleInputChange = (index) => {
  const detail = formData.details[index]
  console.log('选择的投入品ID:', detail.inputId)
  console.log('当前投入品列表:', inputList.value)
  const selectedInput = inputList.value.find(i => i.inputId === detail.inputId)
  console.log('找到的投入品:', selectedInput)
  if (selectedInput) {
    detail.variety = selectedInput.variety
    detail.cropType = selectedInput.agriculturalInputType
    detail.inputName = selectedInput.inputName
    console.log('已设置 - 品种:', detail.variety, '作物种类:', detail.cropType)
  } else {
    console.warn('未找到对应的投入品信息')
  }
}

// 计算总价
const calculateTotalPrice = (index) => {
  const detail = formData.details[index]
  if (detail.quantity && detail.unitPrice) {
    detail.totalPrice = (detail.quantity * detail.unitPrice).toFixed(2)
  }
}

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getFarmerReleaseDetail(route.params.id)
    if (response.code === 200 && response.data) {
      Object.assign(formData, response.data.main)
      // Convert releaseYear from Integer to String for date picker
      if (formData.releaseYear) {
        formData.releaseYear = String(formData.releaseYear)
      }
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
    cropType: '',
    variety: '',
    inputId: '',
    inputName: '',
    quantity: 0,
    unit: 'Kilograms',
    unitPrice: 0,
    totalPrice: 0,
    releaseTime: new Date().toISOString(),
    warehouseId: '',
    batchId: '0'
  })
}

const removeDetail = (index) => {
  formData.details.splice(index, 1)
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return null
  // If already in correct format, return as-is
  if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateStr)) {
    return dateStr
  }
  // If ISO format or Date object, convert to required format
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
    loading.value = true
    try {
      // Deep clone and format dates
      const submitData = {
        ...formData,
        releaseYear: formData.releaseYear ? parseInt(formData.releaseYear, 10) : null,
        releaseDate: formData.releaseDate, // 已经是 YYYY-MM-DD 格式，直接使用
        details: formData.details.map(detail => ({
          cropType: detail.cropType,
          variety: detail.variety,
          inputId: detail.inputId,
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
  // 获取农民列表和投入品列表
  await Promise.all([fetchFarmerList(), fetchInputList()])

  // 设置当前登录用户为分发人
  if (!isEdit.value) {
    const userInfo = userStore.userInfo
    console.log('当前登录用户信息:', userInfo)
    // 尝试多个可能的字段名
    formData.releaseBy = userInfo.userName || userInfo.nickName || userInfo.name ||
                         userInfo.user?.userName || userInfo.user?.nickName ||
                         userInfo.user?.name || ''
  }

  // 编辑模式下加载详情
  if (isEdit.value) {
    await fetchDetail()
  }
})
</script>

<style scoped>
.ose-release-form-container { padding: 20px; }
.form-card { margin-top: 20px; }
</style>
