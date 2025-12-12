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
        <el-form-item :label="$t('inputCirculation.zoneId')" prop="zoneId">
        <el-select v-model="formData.zoneId" :placeholder="$t('common.pleaseSelect')" @change="getAllUnionList">
          <el-option v-for="item in zoneList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('inputCirculation.targetId')" prop="targetId">
          <el-select v-model="formData.targetId" :placeholder="$t('common.pleaseSelect')" @change="getUnionInfo">
            <el-option v-for="item in unionList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
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
        <el-table
            :data="formData.details"
            border
            style="margin-top: 16px;"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }">>
          <el-table-column :label="$t('inputCirculation.releaseDetailId')" type="index" width="100" />
          <el-table-column :label="$t('inputCirculation.inputId')" width="360">
            <template #default="scope">
              <el-select v-model="scope.row.inputId"
                         :placeholder="$t('common.pleaseSelect')"
                         filterable
                         clearable
                         @change="handleInputChange(scope.$index)"
                         style="width: 100%">
                <el-option v-for="item in inputList" :key="item.inputId" :label="item.inputName" :value="item.inputId" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.variety')" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.variety" :placeholder="$t('common.pleaseInput')" readonly />
            </template>
          </el-table-column>

          <el-table-column :label="$t('inputCirculation.cropType')" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.cropType" :placeholder="$t('common.pleaseInput')" readonly />
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
import {getOrgansRegionByCode, listSubRegionByCode} from "../../../../api/application.js";
import {getCurrentUserInfo} from "../../../../api/user.js";

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const formRef = ref(null)
const isEdit = computed(() => !!route.params.id)

const formData = reactive({
  id: '',
  releaseName: '',
  zoneId: '',
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

const zoneList = ref([])
const unionList = ref([])
const inputList = ref([])

const rules = {
  releaseName: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  zoneId: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  targetId: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  releaseDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

const getUserInfo = async () => {
  loading.value = true
  try {
    const response = await getCurrentUserInfo()
    if (response.code === 200 && response.data) {
      console.log(response.data)
     formData.releaseBy = response.data.user.name
      formData.releaseOrg = response.data.user.organName
      console.log(formData.releaseBy)
    }
  } catch (error) {
    ElMessage.error(t('common.queryUserInfoFailed'))
  } finally {
    loading.value = false
  }
}

const getAllZoneList = async () => {
  loading.value = true
  try {
    const response = await listSubRegionByCode({regionCode: 102000000})
    if (response.code === 200) {
      zoneList.value = response.data
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryZoneListFailed'))
  } finally {
    loading.value = false
  }
}

const getAllUnionList = async (value) => {
  loading.value = true
  try {
    const response = await getOrgansRegionByCode({regionCode: value})
    if (response.code === 200) {
      unionList.value = response.data
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryUnionListFailed'))
  } finally {
    loading.value = false
  }
}

const getInputList = async () => {
  loading.value = true
  try {
    const response = await getAllInputList()
    if (response.code === 200) {
      inputList.value = response.data.map(item => {
        return {
          inputId: item.inputId,
          inputName: item.inputName,
          // 尝试多种可能的字段名
          variety: item.variety || '',
          agriculturalInputType: item.agriculturalInputType || item.agricultural_input_type ||
              item.inputType || item.type || ''
        }
      })
    }
  } catch (error) {
    ElMessage.error(t('inputCirculation.queryInputListFailed'))
  } finally {
    loading.value = false
  }
}

// 投入品选择变化处理
const handleInputChange = (index) => {
  const detail = formData.details[index]
  const selectedInput = inputList.value.find(i => i.inputId === detail.inputId)
  if (selectedInput) {
    detail.variety = selectedInput.variety
    detail.cropType = selectedInput.agriculturalInputType
    detail.inputName = selectedInput.inputName
  } else {
    console.warn('未找到对应的投入品信息')
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
    const submitData = { ...formData }
    // 提取级联选择器的最后一级ID用于提交
    if (Array.isArray(formData.targetId) && formData.targetId.length > 0) {
      submitData.targetId = formData.targetId[formData.targetId.length - 1]
    }
    try {
      const apiFunc = isEdit.value ? editOseRelease : addOseRelease
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
  await getUserInfo()
  await getInputList()
  if (isEdit.value) {
    await fetchDetail()
  } else {
    await getAllZoneList()
  }
})
</script>

<style scoped>
.ose-release-form-container { padding: 20px; }
.form-card { margin-top: 20px; }
</style>
