<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        :title="isEdit ? $t('inventory.outbound.edit') : $t('inventory.outbound.add')"
        :show-back="true"
        @back="handleBack" />

      <div class="content-wrapper">
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="responsive-form">
          <InfoCard :title="$t('common.basicInfo')" icon="ri-file-info-line">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.outbound.no')" prop="outboundNo">
                  <el-input v-model="form.outboundNo" :placeholder="$t('inventory.outbound.no')" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.outbound.types')" prop="type">
                  <el-select v-model="form.type" :placeholder="$t('inventory.outbound.types')" style="width: 100%">
                    <el-option :label="$t('inventory.outbound.type.general')" value="GENERAL" />
                    <el-option :label="$t('inventory.outbound.type.transfer')" value="TRANSFER" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.outbound.warehouse')" prop="warehouseCode">
                  <el-select v-model="form.warehouseCode" :placeholder="$t('inventory.outbound.warehouse')" style="width: 100%" filterable @change="handleWarehouseChange">
                    <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.outbound.receiverTypes')" prop="receiverType">
                  <el-select v-model="form.receiverType" :placeholder="$t('inventory.outbound.receiverTypes')" style="width: 100%">
                    <el-option :label="$t('inventory.outbound.receiverType.farmer')" value="FARMER" />
                    <el-option :label="$t('inventory.outbound.receiverType.coop')" value="COOP" />
                    <el-option :label="$t('inventory.outbound.receiverType.other')" value="OTHER" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.outbound.receiver')" prop="receiver">
                  <el-input v-model="form.receiver" :placeholder="$t('inventory.outbound.receiver')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.outbound.bizNo')" prop="bizNo">
                  <el-input v-model="form.bizNo" :placeholder="$t('inventory.outbound.bizNo')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.outbound.operator')" prop="operator">
                  <el-input v-model="form.operator" :placeholder="$t('inventory.outbound.operator')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.outbound.orderDate')" prop="orderDate">
                  <el-date-picker v-model="form.orderDate" type="datetime" :placeholder="$t('inventory.outbound.orderDate')" style="width: 100%" />
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
          </InfoCard>

          <InfoCard :title="$t('inventory.outbound.detailList')" icon="ri-list-check">
            <div class="items-list">
              <div v-for="(item, index) in form.detailList" :key="index" class="item-row">
                <div class="item-fields">
                  <el-form-item :label="$t('inventory.outbound.detail.batchNo')" :prop="`detailList.${index}.batchNo`" :rules="detailRules.batchNo">
                    <el-select v-model="item.batchNo" :placeholder="$t('inventory.outbound.detail.batchNo')" style="width: 100%" filterable :disabled="!form.warehouseCode" @change="(val) => handleBatchChange(val, item)">
                      <el-option v-for="batch in batchOptions" :key="batch.value" :label="batch.label" :value="batch.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('inventory.outbound.detail.mainCategory')" :prop="`detailList.${index}.mainCategory`">
                    <el-select v-model="item.mainCategory" :placeholder="$t('inventory.outbound.detail.mainCategory')" style="width: 100%" disabled>
                      <el-option v-for="dict in mainCategoryOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('inventory.outbound.detail.subCategory')" :prop="`detailList.${index}.subCategory`">
                    <el-select v-model="item.subCategory" :placeholder="$t('inventory.outbound.detail.subCategory')" style="width: 100%" disabled>
                      <el-option v-for="dict in getSubCategoryOptions(item.mainCategory)" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('inventory.outbound.detail.supplier')" :prop="`detailList.${index}.supplier`">
                    <el-input v-model="item.supplier" :placeholder="$t('inventory.outbound.detail.supplier')" clearable />
                  </el-form-item>
                  <el-form-item :label="$t('inventory.outbound.detail.qty')" :prop="`detailList.${index}.qty`" :rules="detailRules.qty">
                    <el-input-number v-model="item.qty" :min="0" :precision="2" :placeholder="$t('inventory.outbound.detail.qty')" style="width: 100%" />
                  </el-form-item>
                  <el-form-item :label="$t('inventory.outbound.detail.unit')" :prop="`detailList.${index}.unit`" :rules="detailRules.unit">
                    <el-select v-model="item.unit" :placeholder="$t('inventory.outbound.detail.unit')" style="width: 100%">
                      <el-option v-for="dict in unitOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('inventory.outbound.detail.expireDate')" :prop="`detailList.${index}.expireDate`">
                    <el-date-picker v-model="item.expireDate" type="date" :placeholder="$t('inventory.outbound.detail.expireDate')" style="width: 100%" value-format="YYYY-MM-DD" disabled />
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
              {{ $t('inventory.outbound.addDetail') }}
            </el-button>
          </InfoCard>
        </el-form>

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
import { addOutbound, getOutboundDetail, updateOutbound, getWarehouseOptions, getBatchesByWarehouse, getBatchDetail } from '@/api/inventory'
import { getDicts } from '@/api/system/dict'
import { PageHeader, InfoCard } from '@/components/common'
import { useUserStore } from '@/store/user'
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
const batchOptions = ref([]) // 鎵规鍙烽€夐」

const isEdit = computed(() => !!route.params.id)

const generateOutboundNo = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `OUT${year}${month}${day}${random}`
}

const form = reactive({
  id: null,
  outboundNo: '',
  type: '',
  warehouseCode: '',
  warehouseName: '',
  receiverType: '',
  receiver: '',
  bizNo: '',
  operator: '',
  orderDate: new Date(),
  remark: '',
  detailList: [
    {
      productId: '',
      batchNo: '',
      mainCategory: '',
      subCategory: '',
      supplier: '',
      qty: null,
      unit: '',
      expireDate: ''
    }
  ]
})

const rules = {
  type: [{ required: true, message: t('common.required'), trigger: 'change' }],
  warehouseCode: [{ required: true, message: t('common.required'), trigger: 'change' }],
  orderDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

const detailRules = {
  batchNo: [{ required: true, message: 'This field is required', trigger: 'change' }],
  qty: [{ required: true, message: 'This field is required', trigger: 'blur' }],
  unit: [{ required: true, message: 'This field is required', trigger: 'blur' }]
}
],
  qty: [{ required: true, message: '璇ラ」蹇呭～', trigger: 'blur' }],
  unit: [{ required: true, message: '璇ラ」蹇呭～', trigger: 'blur' }]
}

const getSubCategoryOptions = (mainCategory) => {
  if (!mainCategory) return []
  return subCategoryOptions.value.filter(item => item.parentValue === mainCategory)
}

const handleMainCategoryChange = (val, row) => {
  row.subCategory = ''
}

const handleBack = () => {
  router.back()
}

const handleAddDetail = () => {
  form.detailList.push({
    productId: '',
    batchNo: '',
    mainCategory: '',
    subCategory: '',
    supplier: '',
    qty: null,
    unit: '',
    expireDate: ''
  })
}

const handleDeleteDetail = (index) => {
  form.detailList.splice(index, 1)
}

const handleWarehouseChange = async (val) => {
  const warehouse = warehouseOptions.value.find(item => item.warehouseCode === val)
  if (warehouse) {
    form.warehouseName = warehouse.warehouseName
  }
  
  // 娓呯┖鎵€鏈夋槑缁嗙殑鎵规鍙峰拰鐩稿叧瀛楁
  form.detailList.forEach(item => {
    item.batchNo = ''
    item.mainCategory = ''
    item.subCategory = ''
    item.expireDate = ''
  })
  
  // 鍔犺浇璇ヤ粨搴撶殑鎵规鍙峰垪琛?  await loadBatchesByWarehouse(val)
}

// 鍔犺浇鎸囧畾浠撳簱鐨勬壒娆″彿鍒楄〃
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
      unit: item.unit
    }))
  } catch (e) {
    console.error('Failed to load batches', e)
    batchOptions.value = []
  }
}

// 澶勭悊鎵规鍙峰彉鏇?const handleBatchChange = async (batchNo, item) => {
  if (!batchNo || !form.warehouseCode) {
    return
  }
  
  // 浠庢壒娆￠€夐」涓煡鎵惧搴旂殑鎵规淇℃伅
  const batchInfo = batchOptions.value.find(b => b.value === batchNo)
  if (batchInfo) {
    item.mainCategory = batchInfo.mainCategory
    item.subCategory = batchInfo.subCategory
    item.expireDate = batchInfo.expireDate
    item.supplier = batchInfo.supplier || ''
    item.unit = batchInfo.unit || ''
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

const loadOutboundData = async (id) => {
  try {
    const res = await getOutboundDetail(id)
    if (res.data) {
      const data = res.data
      form.id = data.id
      form.outboundNo = data.outboundNo
      form.type = data.type
      form.warehouseCode = data.warehouseCode
      form.warehouseName = data.warehouseName
      form.receiverType = data.receiverType
      form.receiver = data.receiver
      form.bizNo = data.bizNo
      form.operator = data.operator
      form.orderDate = data.orderDate ? new Date(data.orderDate) : new Date()
      form.remark = data.remark
      
      // 鍔犺浇璇ヤ粨搴撶殑鎵规鍙峰垪琛?      if (data.warehouseCode) {
        await loadBatchesByWarehouse(data.warehouseCode)
      }
      
      if (data.detailList && data.detailList.length > 0) {
        form.detailList = data.detailList.map(item => ({
          id: item.id,
          productId: item.productId,
          batchNo: item.batchNo,
          mainCategory: item.mainCategory,
          subCategory: item.subCategory,
          supplier: item.supplier,
          qty: item.qty,
          unit: item.unit,
          expireDate: item.expireDate
        }))
      }
    }
  } catch (e) {
    console.error('Failed to load outbound data', e)
    ElMessage.error(t('common.loadFailed'))
  }
}

const formatDateTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (form.detailList.length === 0) {
        ElMessage.warning(t('inventory.outbound.detailRequired'))
        return
      }
      const hasEmptyDetail = form.detailList.some(item => !item.batchNo || !item.unit || item.qty === null || item.qty === undefined)
      if (hasEmptyDetail) {
        ElMessage.warning(t('inventory.outbound.detailRequired'))
        return
      }
      submitting.value = true
      const submitData = {
        ...form,
        orderDate: form.orderDate ? formatDateTime(form.orderDate) : ''
      }
      const apiCall = isEdit.value ? updateOutbound(form.id, submitData) : addOutbound(submitData)
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
    await loadOutboundData(route.params.id)
  } else {
    form.outboundNo = generateOutboundNo()
    form.operator = userStore.userInfo?.nickName || userStore.userInfo?.userName || ''
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



