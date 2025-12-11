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
        <el-form-item :label="$t('inputCirculation.farmerName')" prop="farmerId">
          <el-select v-model="formData.farmerId" :placeholder="$t('common.pleaseSelect')" filterable clearable @change="getFarmerInfo">
            <el-option v-for="item in farmerList" :key="item.farmerId" :label="item.farmerName" :value="item.farmerId" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.farmerPhone')">
          <el-input v-model="formData.farmerPhone" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.farmerAddress')">
          <el-input v-model="formData.farmerAddress" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.releaseYear')">
          <el-date-picker v-model="formData.releaseYear" type="year" value-format="YYYY" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.releaseDate')" prop="releaseDate">
          <el-date-picker v-model="formData.releaseDate" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>
<!--        <el-form-item :label="$t('inputCirculation.releaseBy')">-->
<!--          <el-input v-model="formData.releaseBy" :placeholder="$t('common.pleaseInput')" />-->
<!--        </el-form-item>-->
        <el-form-item :label="$t('inputCirculation.auditBy')">
          <el-input v-model="formData.auditBy" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.auditDate')" prop="auditDate">
          <el-date-picker v-model="formData.auditDate" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>
<!--        <el-form-item :label="$t('inputCirculation.releaseOrg')">-->
<!--          <el-input v-model="formData.releaseOrg" :placeholder="$t('common.pleaseInput')" />-->
<!--        </el-form-item>-->
        <el-form-item :label="$t('inputCirculation.receiveStatus')">
          <el-select v-model="formData.receiveStatus" :placeholder="$t('common.pleaseSelect')">
            <el-option label="pending" value="pending" />
            <el-option label="received" value="received" />
            <el-option label="noReceived" value="noReceived" />
          </el-select>
        </el-form-item>

        <h3>{{ $t('inputCirculation.detailInfo') }}</h3>
        <el-button type="primary" @click="addDetail" style="float: right;margin-bottom: 12px">{{ $t('inputCirculation.addDetail') }}</el-button>
        <el-table
            :data="formData.details"
            border
            style="margin-top: 16px"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }">
          <el-table-column :label="$t('inputCirculation.releaseDetailId')" type="index" width="100" />
          <el-table-column :label="$t('inputCirculation.cropType')" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.cropType" :placeholder="$t('common.pleaseInput')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.variety')" width="180">
            <template #default="scope">
              <el-input v-model="scope.row.variety" :placeholder="$t('common.pleaseInput')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.inputId')" width="360">
            <template #default="scope">
              <el-select v-model="scope.row.inputId" :placeholder="$t('common.pleaseSelect')" filterable clearable collapse-tags-tooltip>
                <el-option v-for="item in inputList" :key="item.inputId" :label="item.inputName" :value="item.inputId" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.required')" width="200">
            <template #default="scope">
              <el-input-number v-model="scope.row.required" :min="0" :precision="2" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.quantity')" width="200">
            <template #default="scope">
              <el-input-number v-model="scope.row.quantity" :min="0" :precision="2" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.unit')" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.unit" :placeholder="$t('common.pleaseInput')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.unitPrice')" width="200">
            <template #default="scope">
              <el-input-number v-model="scope.row.unitPrice" :min="0" :precision="2" />
            </template>
          </el-table-column>
<!--          <el-table-column :label="$t('inputCirculation.releaseTime')" width="180">-->
<!--            <template #default="scope">-->
<!--              <el-date-picker v-model="scope.row.releaseTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column :label="$t('inputCirculation.warehouseId')" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.warehouseId" :placeholder="$t('common.pleaseInput')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.batchId')" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.batchId" :placeholder="$t('common.pleaseInput')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('inputCirculation.totalPrice')" width="200">
            <template #default="scope">
              <el-input-number v-model="scope.row.totalPrice" :min="0" :precision="2" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.actions')" width="80" fixed="right">
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
import { getFarmerReleaseDetail, addFarmerRelease, editFarmerRelease } from '@/api/inputCirculation'
import {getAllInputList} from "../../../../api/input.js";
import {getAllFarmerList, getFarmerDetail} from "../../../../api/newFarm.js";

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

const formData = reactive({
  id: '',
  farmerId: '',
  farmerName: '',
  farmerPhone: '',
  farmerAddress: '',
  releaseYear: new Date().getFullYear().toString(),
  releaseDate: '',
  releaseBy: '',
  auditDate: '',
  auditBy: '',
  releaseOrg: '',
  receiveStatus: 'pending',
  details: []
})

const inputList = ref([])
const farmerList = ref([])

const rules = {
  farmerId: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  releaseDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

const getFarmerList = async () => {
  loading.value = true
  try {
    const response = await getAllFarmerList()
    if (response.code === 200) {
      farmerList.value = response.data
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryInputListFailed'))
  } finally {
    loading.value = false
  }
}

const getFarmerInfo = async (value) => {
  if (!value || value.length === 0) return
  loading.value = true
  try {
    const response = await getFarmerDetail(value)
    if (response.code === 200 && response.data) {
      formData.farmerPhone = response.data.phone
      formData.farmerAddress = response.data.address
    }
  } catch (error) {
    ElMessage.error(t('union.getUnionInfoFailed'))

  } finally {
    loading.value = false
  }
}

const getInputList = async () => {
  loading.value = true
  try {
    const response = await getAllInputList()
    if (response.code === 200) {
      inputList.value = response.data
      console.log(inputList.value)
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryInputListFailed'))
  } finally {
    loading.value = false
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
    required: 0,
    quantity: 0,
    unit: 'Kg',
    unitPrice: 0,
    releaseTime: '',
    warehouseId: '',
    batchId: '',
    totalPrice: 0
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
        releaseDate: formatDateTime(formData.releaseDate),
        auditDate: formatDateTime(formData.auditDate),
        details: formData.details.map(detail => ({
          ...detail,
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

onMounted(() => {
  if (isEdit.value) {
    fetchDetail()
  } else{
    getInputList()
    getFarmerList()
  }
})
</script>

<style scoped>
.ose-release-form-container { padding: 20px; }
.form-card { margin-top: 20px; }
</style>
