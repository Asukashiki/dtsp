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
        <el-form-item :label="$t('inputCirculation.targetId')" prop="targetId">
          <el-cascader v-model="formData.targetId" :options="regionList"
                       :props="{ expandTrigger: 'hover' }" :placeholder="$t('common.pleaseInput')"
          @change="getUnionInfo"></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.targetAddress')">
          <el-input v-model="formData.targetAddress" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.targetContact')">
          <el-input v-model="formData.targetContact" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
<!--        <el-form-item :label="$t('inputCirculation.targetPhone')">-->
<!--          <el-input v-model="formData.targetPhone" :placeholder="$t('common.pleaseInput')" />-->
<!--        </el-form-item>-->
        <el-form-item :label="$t('inputCirculation.releaseYear')">
          <el-date-picker v-model="formData.releaseYear" type="year" value-format="YYYY" />
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.releaseDate')" prop="releaseDate">
          <el-date-picker v-model="formData.releaseDate" type="date" value-format="YYYY-MM-DD" />
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

        <h3>{{ $t('inputCirculation.detailInfo') }}</h3>
        <el-button type="primary" @click="addDetail" style="float: right;margin-bottom: 12px">{{ $t('inputCirculation.addDetail') }}</el-button>
        <el-table :data="formData.details" border style="margin-top: 16px;" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">>
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
<!--          <el-table-column :label="$t('inputCirculation.releaseTime')" width="260">-->
<!--            <template #default="scope">-->
<!--              <el-date-picker v-model="scope.row.releaseTime" type="date" value-format="YYYY-MM-DD"/>-->
<!--            </template>-->
<!--          </el-table-column>-->
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
import { getOseReleaseDetail, addOseRelease, editOseRelease } from '@/api/inputCirculation'
import {getAllInputList} from "../../../../api/input.js";
import {getUnionDetailByUnionId} from "../../../../api/union.js";

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

const formData = reactive({
  id: '',
  releaseName: '',
  targetId: '',
  targetAddress: '',
  targetContact: '',
  targetPhone: '',
  releaseYear: new Date().getFullYear().toString(),
  releaseDate: '',
  releaseBy: '',
  auditDate: '',
  auditBy: '',
  releaseOrg: '',
  releaseType: 'OSE_TO_UNION', // OSE分发到Union
  details: []
})

const regionList = []
const inputList = ref([])

const rules = {
  releaseName: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  targetId: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  releaseDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

const getRegionList = async () => {
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

const getUnionInfo = async (value) => {
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

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getOseReleaseDetail(route.params.id)
    if (response.code === 200 && response.data) {
      Object.assign(formData, response.data.main)
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
    releaseTime: ''
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
      const apiFunc = isEdit.value ? editOseRelease : addOseRelease
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
  if (isEdit.value) {
    fetchDetail()
  } else{
    getInputList()
  }
})
</script>

<style scoped>
.ose-release-form-container { padding: 20px; }
.form-card { margin-top: 20px; }
</style>
