<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        :title="isEdit ? $t('inventory.inbound.edit') : $t('inventory.inbound.add')"
        :show-back="true"
        @back="handleBack" />

      <div class="content-wrapper">
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="responsive-form">
          <InfoCard :title="$t('common.basicInfo')" icon="ri-file-info-line">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.inbound.no')" prop="inboundNo">
                  <el-input v-model="form.inboundNo" :placeholder="$t('inventory.inbound.no')" disabled />
                </el-form-item>
              </el-col>

              <!-- 入库类型：前端隐藏，后端自动设置为GENERAL -->
              <!-- <el-form-item :label="$t('inventory.inbound.types')" prop="type"> -->
              <!-- 后端自动设置为GENERAL -->

              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.inbound.warehouse')" prop="warehouseCode">
                  <el-select 
                    v-model="form.warehouseCode" 
                    :placeholder="$t('inventory.inbound.warehouse')" 
                    style="width: 100%" 
                    filterable 
                    :disabled="isWarehouseReadonly"
                    @change="handleWarehouseChange">
                    <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode" />
                  </el-select>

                </el-form-item>
              </el-col>

              <!-- 关联业务单号：前端隐藏，后端自动保存 -->
              <!-- <el-form-item :label="$t('inventory.inbound.bizNo')" prop="bizNo"> -->
              <!-- 后端自动处理 -->

              <!-- 操作人：前端隐藏，后端自动设置为当前用户 -->
              <!-- <el-form-item :label="$t('inventory.inbound.operator')" prop="operator"> -->
              <!-- 后端自动设置为当前用户 -->

              <!-- 入库时间：前端隐藏，后端自动设置为当前时间 -->
              <!-- <el-form-item :label="$t('inventory.inbound.orderDate')" prop="orderDate"> -->
              <!-- 后端自动设置为当前时间 -->

            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.remark')" prop="remark">
                  <el-input v-model="form.remark" type="textarea" :rows="3" :placeholder="$t('common.remark')" />
                </el-form-item>

              </el-col>
            </el-row>

          </InfoCard>


          <InfoCard :title="$t('inventory.inbound.detailList')" icon="ri-list-check">
            <div class="items-list">
              <div v-for="(item, index) in form.detailList" :key="index" class="item-row">
                <div class="item-fields">
                  <el-form-item :label="$t('inventory.inbound.detail.mainCategory')" :prop="`detailList.${index}.mainCategoryId`" :rules="detailRules.mainCategoryId">
                    <el-select v-model="item.mainCategoryId" :placeholder="$t('inventory.inbound.detail.mainCategory')" style="width: 100%" @change="(val) => handleMainCategoryChange(val, item)">
                      <el-option v-for="dict in mainCategoryOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>

                  </el-form-item>

                  <el-form-item :label="$t('inventory.inbound.detail.subCategory')" :prop="`detailList.${index}.subCategoryId`" :rules="detailRules.subCategoryId">
                    <el-select v-model="item.subCategoryId" :placeholder="$t('inventory.inbound.detail.subCategory')" style="width: 100%" :disabled="!item.mainCategoryId" @change="(val) => handleSubCategoryChange(val, item)">
                      <el-option v-for="dict in getSubCategoryOptions(item.mainCategoryId)" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>

                  </el-form-item>

                  <el-form-item :label="$t('inventory.inbound.detail.productName')" :prop="`detailList.${index}.productId`" :rules="detailRules.productName">
                    <el-select v-model="item.productId" :placeholder="$t('inventory.inbound.detail.productName')" style="width: 100%" :disabled="!item.subCategoryId" @change="(val) => handleProductNameChange(val, item)">
                      <el-option v-for="dict in getProductNameOptions(item.mainCategoryId, item.subCategoryId)" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>

                  </el-form-item>

                  <el-form-item :label="$t('inventory.inbound.detail.batchNo')" :prop="`detailList.${index}.batchNo`" :rules="detailRules.batchNo">
                    <!-- 批次号自动生成，置灰不让手填 -->
                    <el-input v-model="item.batchNo" :placeholder="$t('inventory.inbound.detail.batchNo')" disabled />
                  </el-form-item>

                  <el-form-item :label="$t('inventory.inbound.detail.supplier')" :prop="`detailList.${index}.supplier`">
                    <el-input v-model="item.supplier" :placeholder="$t('inventory.inbound.detail.supplier')" clearable />
                  </el-form-item>

                  <el-form-item :label="$t('inventory.inbound.detail.qty')" :prop="`detailList.${index}.qty`" :rules="detailRules.qty">
                    <el-input-number v-model="item.qty" :min="0" :precision="2" :placeholder="$t('inventory.inbound.detail.qty')" style="width: 100%" />
                  </el-form-item>

                  <el-form-item :label="$t('inventory.inbound.detail.unit')" :prop="`detailList.${index}.unit`" :rules="detailRules.unit">
                    <el-select v-model="item.unit" :placeholder="$t('inventory.inbound.detail.unit')" style="width: 100%">
                      <el-option v-for="dict in unitOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                    </el-select>

                  </el-form-item>

                  <el-form-item :label="$t('inventory.inbound.detail.expireDate')" :prop="`detailList.${index}.expireDate`" :rules="detailRules.expireDate">
                    <el-date-picker v-model="item.expireDate" type="date" :placeholder="$t('inventory.inbound.detail.expireDate')" style="width: 100%" value-format="YYYY-MM-DD" />
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
              {{ $t('inventory.inbound.addDetail') }}
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
import { addInbound, getInboundDetail, updateInbound, getWarehouseOptions, getInventoryProductList } from '@/api/inventory'
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
const productNameOptionsMap = ref(new Map())
const productMap = ref(new Map())
const unitOptions = ref([])
const isWarehouseReadonly = ref(false)

const isEdit = computed(() => !!route.params.id)

// 生成入库单号
const generateInboundNo = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `IN${year}${month}${day}${random}`
}

const generateBatchNo = () => {
  const timestamp = Date.now()
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomStr = ''
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `BATCH-${timestamp}-${randomStr}`
}

const form = reactive({
  id: null,
  inboundNo: '',
  type: 'GENERAL', // 后端自动设置为GENERAL
  warehouseCode: '',
  warehouseName: '',
  bizNo: '', // 关联业务单号，后端自动处理
  operator: '', // 操作人，后端自动设置为当前用户
  orderDate: new Date(), // 入库时间，后端自动设置为当前时间
  remark: '',
  detailList: [
    {
      productId: '',
      productName: '',
      mainCategory: '',
      mainCategoryId: '',
      subCategory: '',
      subCategoryId: '',
      batchNo: '', // 批次号由后端自动生成
      supplier: '',
      qty: null,
      unit: '',
      expireDate: ''
    }
  ]
})

const rules = {
  warehouseCode: [{ required: true, message: t('common.required'), trigger: 'change' }]
  // type, bizNo, operator, orderDate 已隐藏，不再需要验证
}

const detailRules = {
  mainCategoryId: [{ required: true, message: t('common.required'), trigger: 'change' }],
  subCategoryId: [{ required: true, message: t('common.required'), trigger: 'change' }],
  productName: [{ required: true, message: t('common.required'), trigger: 'change' }],
  batchNo: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  qty: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  unit: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  expireDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

const getSubCategoryOptions = (mainCategoryId) => {
  if (!mainCategoryId) return []
  return subCategoryOptions.value.filter(item => item.mainCategory === mainCategoryId)
}

const getProductNameOptions = (mainCategoryId, subCategoryId) => {
  if (!mainCategoryId || !subCategoryId) return []
  const key = mainCategoryId + '|' + subCategoryId
  return productNameOptionsMap.value.get(key) || []
}

const handleMainCategoryChange = (val, row) => {
  row.subCategoryId = ''
  row.subCategory = ''
  row.productId = ''
  row.productName = ''
  row.unit = ''
  row.batchNo = generateBatchNo()
  row.mainCategory = val
}

const handleSubCategoryChange = (val, row) => {
  row.productId = ''
  row.productName = ''
  row.subCategory = val
  if (!row.batchNo) {
    row.batchNo = generateBatchNo()
  }
}

const handleProductNameChange = (val, row) => {
  const product = productMap.value.get(val)
  if (product) {
    row.productName = product.productName || ''
    row.unit = product.unit || row.unit
  }
  if (!row.batchNo) {
    row.batchNo = generateBatchNo()
  }
}

const handleBack = () => {
  router.back()
}

const handleAddDetail = () => {
  form.detailList.push({
    productId: '',
    productName: '',
    mainCategory: '',
    mainCategoryId: '',
    subCategory: '',
    subCategoryId: '',
    batchNo: generateBatchNo(), // 新增明细时自动生成批次号
    supplier: '',
    qty: null,
    unit: '',
    expireDate: ''
  })
}

const handleDeleteDetail = (index) => {
  form.detailList.splice(index, 1)
}

const handleWarehouseChange = (val) => {
  const warehouse = warehouseOptions.value.find(item => item.warehouseCode === val)
  if (warehouse) {
    form.warehouseName = warehouse.warehouseName
  }
}

const loadWarehouses = async () => {
  try {
    const res = await getWarehouseOptions({ status: '0' })
    warehouseOptions.value = res.data || []
    
    // 新增模式：自动选择用户有权限的最新仓库
    if (!isEdit.value && warehouseOptions.value.length > 0) {
      // 按创建时间降序排序，取最新创建的仓库
      const sortedWarehouses = [...warehouseOptions.value].sort((a, b) => {
        const timeA = a.createTime || a.create_time || 0
        const timeB = b.createTime || b.create_time || 0
        return new Date(timeB) - new Date(timeA)
      })
      
      const latestWarehouse = sortedWarehouses[0]
      if (latestWarehouse) {
        form.warehouseCode = latestWarehouse.warehouseCode
        form.warehouseName = latestWarehouse.warehouseName
        isWarehouseReadonly.value = true
      }
    }
  } catch (error) {
    console.error('Failed to load warehouses', error)
    warehouseOptions.value = []
  }
}

const loadDictionaries = async () => {
  try {
    const unitRes = await getDicts('inventory_unit_new')
    unitOptions.value = (unitRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue
    }))
  } catch (e) {
    console.error('Failed to load dictionaries', e)
  }
}

const syncDetailProductRefs = () => {
  if (!form.detailList || form.detailList.length === 0) return
  const map = productMap.value
  const normalize = (val) => (val || '').toString().trim().toLowerCase()
  const findMainByName = (name) => mainCategoryOptions.value.find(opt => normalize(opt.label) === normalize(name))
  const findSubByName = (name) => subCategoryOptions.value.find(opt => normalize(opt.label) === normalize(name))
  form.detailList = form.detailList.map(item => {
    const next = { ...item }
    if (next.productId && map.has(next.productId)) {
      const subProduct = map.get(next.productId)
      next.subCategoryId = subProduct.id
      next.subCategory = subProduct.subCategory || subProduct.productName || next.subCategory
      next.unit = next.unit || subProduct.unit || ''
      if (subProduct.parentId && map.has(subProduct.parentId)) {
        const mainProduct = map.get(subProduct.parentId)
        next.mainCategoryId = subProduct.parentId
        next.mainCategory = mainProduct.mainCategory || mainProduct.productName || next.mainCategory
      }
    } else if (next.subCategoryId && map.has(next.subCategoryId)) {
      const subProduct = map.get(next.subCategoryId)
      next.productId = subProduct.id
      next.subCategory = subProduct.subCategory || subProduct.productName || next.subCategory
      next.unit = next.unit || subProduct.unit || ''
      if (subProduct.parentId && map.has(subProduct.parentId)) {
        const mainProduct = map.get(subProduct.parentId)
        next.mainCategoryId = subProduct.parentId
        next.mainCategory = mainProduct.mainCategory || mainProduct.productName || next.mainCategory
      }
    } else if (!next.subCategoryId && next.subCategory) {
      const subOpt = findSubByName(next.subCategory)
      if (subOpt) {
        next.subCategoryId = subOpt.value
        next.productId = subOpt.value
        next.unit = next.unit || subOpt.unit || ''
        if (subOpt.parentId && map.has(subOpt.parentId)) {
          const mainProduct = map.get(subOpt.parentId)
          next.mainCategoryId = subOpt.parentId
          next.mainCategory = mainProduct.mainCategory || mainProduct.productName || next.mainCategory
        }
      }
    } else if (next.mainCategoryId && map.has(next.mainCategoryId)) {
      const mainProduct = map.get(next.mainCategoryId)
      next.mainCategory = mainProduct.mainCategory || mainProduct.productName || next.mainCategory
    } else if (!next.mainCategoryId && next.mainCategory) {
      const mainOpt = findMainByName(next.mainCategory)
      if (mainOpt && map.has(mainOpt.value)) {
        const mainProduct = map.get(mainOpt.value)
        next.mainCategoryId = mainOpt.value
        next.mainCategory = mainProduct.mainCategory || mainProduct.productName || next.mainCategory
      }
    }
    return next
  })
}

const loadProducts = async () => {
  try {
    const res = await getInventoryProductList({ pageNum: 1, pageSize: 10000, status: '0' })
    const list = res.rows || res.data?.list || res.data || []
    const map = new Map()
    const mainCategorySet = new Set()
    const subCategoryMap = new Map()
    const productNameMap = new Map()
    list.forEach(item => {
      if (!item || !item.id) return
      map.set(item.id, item)
      const mainCategory = (item.mainCategory || '').trim()
      const subCategory = (item.subCategory || '').trim()
      const productName = (item.productName || '').trim()
      if (mainCategory) {
        mainCategorySet.add(mainCategory)
      }
      if (mainCategory && subCategory) {
        const key = mainCategory + '|' + subCategory
        if (!subCategoryMap.has(key)) {
          subCategoryMap.set(key, { label: subCategory, value: subCategory, mainCategory, subCategory })
        }
        if (!productNameMap.has(key)) {
          productNameMap.set(key, [])
        }
        productNameMap.get(key).push({ label: productName, value: item.id })
      }
    })
    productMap.value = map
    mainCategoryOptions.value = Array.from(mainCategorySet).map(label => ({ label, value: label }))
    subCategoryOptions.value = Array.from(subCategoryMap.values())
    productNameOptionsMap.value = productNameMap
    syncDetailProductRefs()
  } catch (e) {
    console.error('Failed to load products', e)
    mainCategoryOptions.value = []
    subCategoryOptions.value = []
    productNameOptionsMap.value = new Map()
    productMap.value = new Map()
  }
}

const loadInboundData = async (id) => {
  try {
    const res = await getInboundDetail(id)
    if (res.data) {
      const data = res.data
      form.id = data.id
      form.inboundNo = data.inboundNo
      form.type = data.type || 'GENERAL'
      form.warehouseCode = data.warehouseCode
      form.warehouseName = data.warehouseName
      form.bizNo = data.bizNo
      form.operator = data.operator
      form.orderDate = data.orderDate ? new Date(data.orderDate) : new Date()
      form.remark = data.remark
      if (data.detailList && data.detailList.length > 0) {
        form.detailList = data.detailList.map(item => ({
          id: item.id,
          productId: item.productId,
          mainCategory: item.mainCategory,
          mainCategoryId: '',
          subCategory: item.subCategory,
          subCategoryId: '',
          batchNo: item.batchNo, // 编辑时保留原有的批次号
          supplier: item.supplier,
          qty: item.qty,
          unit: item.unit,
          expireDate: item.expireDate
        }))
        syncDetailProductRefs()
      }
    }
  } catch (e) {
    console.error('Failed to load inbound data', e)
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
        ElMessage.warning(t('inventory.inbound.detailRequired'))
        return
      }
      const hasEmptyDetail = form.detailList.some(item => !item.mainCategoryId || !item.subCategoryId || !item.productId || !item.batchNo || !item.expireDate || !item.unit || item.qty === null || item.qty === undefined)
      if (hasEmptyDetail) {
        ElMessage.warning(t('inventory.inbound.detailRequired'))
        return
      }
      submitting.value = true
      const mappedDetailList = form.detailList.map(item => {
        const product = productMap.value.get(item.productId)
        return {
          ...item,
          productId: item.productId,
          productName: item.productName,
          mainCategory: item.mainCategory,
          subCategory: item.subCategory,
          unit: item.unit || product?.unit || ''
        }
      })
      const { orderDate, ...formWithoutOrderDate } = form
      const submitData = {
        ...formWithoutOrderDate,
        detailList: mappedDetailList
        // type: 'GENERAL' - 后端自动设置
        // bizNo: 后端自动处理
        // operator: 后端自动设置为当前用户
        // orderDate: 后端自动设置为当前时间
      }
      const apiCall = isEdit.value ? updateInbound(form.id, submitData) : addInbound(submitData)
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
  // 重置仓库只读状态
  isWarehouseReadonly.value = false
  
  await loadWarehouses()
  await loadProducts()
  await loadDictionaries()

  if (isEdit.value) {
    await loadInboundData(route.params.id)
    // 编辑模式下，仓库不可编辑
    isWarehouseReadonly.value = true
  } else {
    form.inboundNo = generateInboundNo()
    // 新增时为每个明细自动生成批次号
    form.detailList.forEach(item => {
      if (!item.batchNo) {
        item.batchNo = generateBatchNo()
      }
    })
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
