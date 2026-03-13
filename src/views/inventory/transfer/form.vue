<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
          :title="isEdit ? $t('inventory.transfer.edit') : $t('inventory.transfer.add')"
          :show-back="true"
          @back="handleBack" />

      <div class="content-wrapper">
        <InfoCard :title="$t('common.basicInfo')" icon="ri-file-info-line">
          <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="responsive-form">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.transfer.no')" prop="transferNo">
                  <el-input v-model="form.transferNo" :placeholder="$t('inventory.transfer.no')" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.transfer.types')" prop="transferType">
                  <el-select v-model="form.transferType" :placeholder="$t('inventory.transfer.types')" style="width: 100%">
                    <el-option :label="$t('inventory.transfer.type.stockWarning')" value="STOCK_WARNING" />
                    <el-option :label="$t('inventory.transfer.type.fullTransfer')" value="FULL_TRANSFER" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.transfer.applyDate')" prop="applyDate">
                  <el-date-picker v-model="form.applyDate" type="datetime" :placeholder="$t('inventory.transfer.applyDate')" style="width: 100%" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.transfer.expectedDate')" prop="expectedDate">
                  <el-date-picker v-model="form.expectedDate" type="date" :placeholder="$t('inventory.transfer.expectedDate')" style="width: 100%" value-format="YYYY-MM-DD" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.transfer.applicant')" prop="applicant">
                  <el-input v-model="form.applicant" :placeholder="$t('inventory.transfer.applicant')" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.transfer.department')" prop="department">
                  <el-input v-model="form.department" :placeholder="$t('inventory.transfer.department')" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.transfer.outWarehouse')" prop="outWarehouseCode">
                  <el-select v-model="form.outWarehouseCode" :placeholder="$t('inventory.transfer.outWarehouse')" style="width: 100%" filterable @change="handleOutWarehouseChange">
                    <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.transfer.inWarehouse')" prop="inWarehouseCode">
                  <el-select v-model="form.inWarehouseCode" :placeholder="$t('inventory.transfer.inWarehouse')" style="width: 100%" filterable @change="handleInWarehouseChange">
                    <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.remark')" prop="remark">
                  <el-input v-model="form.remark" type="textarea" :rows="3" :placeholder="$t('common.remark')" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </InfoCard>

        <InfoCard :title="$t('inventory.transfer.detailList')" icon="ri-list-check">
          <div class="items-list">
              <div v-for="(item, index) in form.detailList" :key="index" class="item-row">
                <div class="item-fields">
                  <el-form-item :label="$t('inventory.transfer.detail.batchNo')" :prop="`detailList.${index}.batchNo`" :rules="detailRules.batchNo">
                    <el-select v-model="item.batchNo" :placeholder="$t('inventory.transfer.detail.batchNo')" style="width: 100%" filterable :disabled="!form.outWarehouseCode" @change="(val) => handleBatchChange(val, item)">
                      <el-option v-for="batch in batchOptions" :key="batch.value" :label="batch.label" :value="batch.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('inventory.transfer.detail.mainCategory')" :prop="`detailList.${index}.mainCategory`" :rules="detailRules.mainCategory">
                    <el-select v-model="item.mainCategory" :placeholder="$t('inventory.transfer.detail.mainCategory')" style="width: 100%" disabled>
                      <el-option v-for="dict in mainCategoryOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('inventory.transfer.detail.subCategory')" :prop="`detailList.${index}.subCategory`" :rules="detailRules.subCategory">
                    <el-select v-model="item.subCategory" :placeholder="$t('inventory.transfer.detail.subCategory')" style="width: 100%" disabled>
                      <el-option v-for="dict in getSubCategoryOptions(item.mainCategory)" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('inventory.transfer.detail.supplier')" :prop="`detailList.${index}.supplier`">
                    <el-input v-model="item.supplier" :placeholder="$t('inventory.transfer.detail.supplier')" clearable />
                  </el-form-item>
                  <el-form-item :label="$t('inventory.transfer.detail.qty')" :prop="`detailList.${index}.qty`" :rules="detailRules.qty">
                    <el-input-number v-model="item.qty" :min="0" :precision="2" :placeholder="$t('inventory.transfer.detail.qty')" style="width: 100%" />
                  </el-form-item>
                  <el-form-item :label="$t('inventory.transfer.detail.unit')" :prop="`detailList.${index}.unit`" :rules="detailRules.unit">
                    <el-select v-model="item.unit" :placeholder="$t('inventory.transfer.detail.unit')" style="width: 100%" disabled>
                      <el-option v-for="dict in unitOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('inventory.transfer.detail.expireDate')" :prop="`detailList.${index}.expireDate`">
                    <el-date-picker v-model="item.expireDate" type="date" :placeholder="$t('inventory.transfer.detail.expireDate')" style="width: 100%" value-format="YYYY-MM-DD" disabled />
                  </el-form-item>
                </div>
              <div class="item-actions">
                <el-button type="danger" link @click="handleDeleteDetail(index)" :disabled="form.detailList.length === 1">
                  <i class="ri-delete-bin-line"></i>
                  <span class="btn-text">{{ $t('common.delete') }}</span>
                </el-button>
              </div>
            </div>
          </div>

          <el-button type="primary" plain @click="handleAddDetail" class="add-item-btn">
            <i class="ri-add-line"></i>
            {{ $t('inventory.transfer.addDetail') }}
          </el-button>
        </InfoCard>

        <div class="form-actions">
          <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { createTransfer, updateTransfer, getTransferDetail, getWarehouseOptions, getBatchesByWarehouse } from '@/api/inventory'
import { getDicts } from '@/api/system/dict'
import { PageHeader, InfoCard } from '@/components/common'
import { useUserStore } from '@/store/user'
import { getUserOrgName } from '@/utils/auth'
import { parseI18nValue } from '@/utils/i18nHelper'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const submitting = ref(false)
const warehouseOptions = ref([])
const mainCategoryOptions = ref([])
const subCategoryOptions = ref([])
const unitOptions = ref([])
const batchOptions = ref([])

const isEdit = computed(() => !!route.params.id)

const generateTransferNo = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `TF${year}${month}${day}${random}`
}

const form = reactive({
  id: null,
  transferNo: '',
  transferType: '',
  applyDate: new Date(),
  expectedDate: '',
  applicant: '',
  department: '',
  outWarehouseCode: '',
  outWarehouseName: '',
  inWarehouseCode: '',
  inWarehouseName: '',
  remark: '',
  detailList: [
    {
      productId: null, // 灏嗗湪onMounted涓敓鎴愭暟瀛桰D
      mainCategory: '',
      subCategory: '',
      batchNo: '',
      supplier: '',
      qty: null,
      unit: '',
      expireDate: ''
    }
  ]
})

const rules = {
  transferType: [{ required: true, message: 'This field is required', trigger: 'change' }],
  outWarehouseCode: [{ required: true, message: 'This field is required', trigger: 'change' }],
  inWarehouseCode: [{ required: true, message: 'This field is required', trigger: 'change' }]
}

const detailRules = {
  batchNo: [{ required: true, message: 'This field is required', trigger: 'change' }],
  mainCategory: [{ required: true, message: 'This field is required', trigger: 'change' }],
  subCategory: [{ required: true, message: 'This field is required', trigger: 'change' }],
  qty: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  unit: [{ required: true, message: 'This field is required', trigger: 'blur' }]
}

const getSubCategoryOptions = (mainCategory) => {
  if (!mainCategory) return []
  return subCategoryOptions.value.filter(item => item.parentValue === mainCategory)
}

const handleBack = () => {
  router.back()
}

const handleAddDetail = () => {
  form.detailList.push({
    productId: null, // 璋冩嫧鍦烘櫙涓笉闇€瑕佸叿浣撶殑鍟嗗搧ID
    mainCategory: '',
    subCategory: '',
    batchNo: '',
    supplier: '',
    qty: null,
    unit: '',
    expireDate: ''
  })
}

const handleDeleteDetail = (index) => {
  form.detailList.splice(index, 1)
}

const handleOutWarehouseChange = (val) => {
  const warehouse = warehouseOptions.value.find(item => item.warehouseCode === val)
  if (warehouse) {
    form.outWarehouseName = warehouse.warehouseName
  }

  form.detailList.forEach(item => {
    item.batchNo = ''
    item.mainCategory = ''
    item.subCategory = ''
    item.expireDate = ''
    item.unit = ''
    item.qty = null
    item.productId = null
  })

  loadBatchesByWarehouse(val)
}

const handleInWarehouseChange = (val) => {
  const warehouse = warehouseOptions.value.find(item => item.warehouseCode === val)
  if (warehouse) {
    form.inWarehouseName = warehouse.warehouseName
  }
}

const loadBatchesByWarehouse = async (warehouseCode) => {
  if (!warehouseCode) {
    batchOptions.value = []
    return
  }
  try {
    const res = await getBatchesByWarehouse(warehouseCode)
    batchOptions.value = (res.data || []).map(item => ({
      label: item.batchNo,
      value: item.batchNo,
      mainCategory: item.mainCategory,
      subCategory: item.subCategory,
      expireDate: item.expireDate,
      supplier: item.supplier,
      unit: item.unit,
      qty: item.qty,
      productId: item.productId
    }))
  } catch (e) {
    console.error('Failed to load batches', e)
    batchOptions.value = []
  }
}

const handleBatchChange = (batchNo, item) => {
  if (!batchNo) return
  const batchInfo = batchOptions.value.find(b => b.value === batchNo)
  if (batchInfo) {
    item.mainCategory = batchInfo.mainCategory
    item.subCategory = batchInfo.subCategory
    item.expireDate = batchInfo.expireDate
    item.supplier = batchInfo.supplier || ''
    item.unit = batchInfo.unit || ''
    item.qty = batchInfo.qty != null ? batchInfo.qty : item.qty
    item.productId = batchInfo.productId || null
  }
}

const loadWarehouses = () => {
  getWarehouseOptions({ status: '0' }).then(res => {
    warehouseOptions.value = res.data || []
  }).catch(() => {
    warehouseOptions.value = []
  })
}

const loadDictionaries = async () => {
  try {
    const mainRes = await getDicts('inventory_main_category')
    mainCategoryOptions.value = (mainRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue
    }))

    const subRes = await getDicts('inventory_sub_category')
    subCategoryOptions.value = (subRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue,
      parentValue: item.remark
    }))

    const unitRes = await getDicts('inventory_unit')
    unitOptions.value = (unitRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue
    }))
  } catch (e) {
    console.error('Failed to load dictionaries', e)
  }
}

const loadTransferData = async (id) => {
  try {
    const res = await getTransferDetail(id)
    if (res.data) {
      const data = res.data
      form.id = data.id
      form.transferNo = data.transferNo
      form.transferType = data.transferType
      form.applyDate = data.applyDate ? new Date(data.applyDate) : new Date()
      form.expectedDate = data.expectedDate
      form.applicant = data.applicant
      form.department = data.department
      form.outWarehouseCode = data.outWarehouseCode
      form.outWarehouseName = data.outWarehouseName
      form.inWarehouseCode = data.inWarehouseCode
      form.inWarehouseName = data.inWarehouseName
      form.remark = data.remark
      if (data.outWarehouseCode) {
        await loadBatchesByWarehouse(data.outWarehouseCode)
      }
      if (data.detailList && data.detailList.length > 0) {
        form.detailList = data.detailList.map(item => ({
          id: item.id,
          productId: item.productId,
          mainCategory: item.mainCategory,
          subCategory: item.subCategory,
          batchNo: item.batchNo,
          supplier: item.supplier,
          qty: item.qty,
          unit: item.unit,
          expireDate: item.expireDate
        }))
      }
    }
  } catch (e) {
    console.error('Failed to load transfer data', e)
    ElMessage.error(t('common.loadFailed'))
  }
}

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (form.detailList.length === 0) {
        ElMessage.warning(t('inventory.transfer.detailRequired'))
        return
      }
      const normalizedDetails = form.detailList.map(item => {
        if (item.batchNo) {
          const batchInfo = batchOptions.value.find(b => b.value === item.batchNo)
          if (batchInfo) {
            return {
              ...item,
              mainCategory: item.mainCategory || batchInfo.mainCategory,
              subCategory: item.subCategory || batchInfo.subCategory,
              unit: item.unit || batchInfo.unit,
              expireDate: item.expireDate || batchInfo.expireDate,
              supplier: item.supplier || batchInfo.supplier,
              productId: item.productId || batchInfo.productId,
              qty: item.qty != null ? item.qty : batchInfo.qty
            }
          }
        }
        return item
      })
      const hasEmptyDetail = normalizedDetails.some(item =>
          !item.mainCategory ||
          !item.subCategory ||
          !item.unit ||
          item.qty === null ||
          item.qty === undefined ||
          item.qty === 0
      )
      if (hasEmptyDetail) {
        ElMessage.warning(t('inventory.transfer.detailRequired'))
        return
      }
      submitting.value = true
      const payload = { ...form, detailList: normalizedDetails }
      const apiCall = isEdit.value ? updateTransfer(payload) : createTransfer(payload)
      apiCall.then(() => {
        ElMessage.success(t('common.submitSuccess'))
        handleBack()
      }).catch(() => {
        ElMessage.error(t('common.submitFailed'))
      }).finally(() => {
        submitting.value = false
      })
    }
  })
}

onMounted(async () => {
  await loadWarehouses()
  await loadDictionaries()

  if (isEdit.value) {
    await loadTransferData(route.params.id)
  } else {
    form.transferNo = generateTransferNo()
    form.applicant = userStore.userInfo?.userName || ''
    form.department = getUserOrgName() || ''
    // 璋冩嫧鍦烘櫙涓笉闇€瑕佸叿浣撶殑鍟嗗搧ID锛屼繚鎸佷负null鍗冲彲
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
}

.items-list {
  margin-bottom: 16px;
}

.item-row {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: #fafafa;
}

.item-fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.item-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
  margin-top: 12px;
}

.add-item-btn {
  width: 100%;
}

:deep(.el-input.is-disabled .el-input__inner) {
  color: #606266;
  background-color: #f5f7fa;
}

@media screen and (max-width: 1024px) {
  .item-fields {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .item-fields {
    grid-template-columns: 1fr;
  }
}
</style>



