<template>
  <div class="inbound-form-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ isEdit ? $t('input.inventory.stockIn.edit') : $t('input.inventory.stockIn.create') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="inbound-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('input.catalog.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.inventory.stockIn.columns.type')" prop="inboundType">
              <el-select v-model="formData.inboundType" :placeholder="$t('input.inventory.stockIn.placeholder.type')" class="full-width">
                <el-option :label="$t('input.inventory.stockIn.type.production')" :value="0" />
                <el-option :label="$t('input.inventory.stockIn.type.purchase')" :value="1" />
                <el-option :label="$t('input.inventory.stockIn.type.transfer')" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.columns.warehouse')" prop="warehouseId">
              <el-select
                v-model="formData.warehouseId"
                :placeholder="$t('input.inventory.stockIn.placeholder.warehouse')"
                filterable
                clearable
                class="full-width"
                :loading="warehouseLoading"
              >
                <el-option
                  v-for="warehouse in warehouseList"
                  :key="warehouse.warehouse_id"
                  :label="`${warehouse.warehouse_name} (${warehouse.warehouse_code})`"
                  :value="warehouse.warehouse_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.relatedOrderNo')" prop="relatedOrderNo">
              <el-input v-model="formData.relatedOrderNo" :placeholder="$t('input.inventory.stockIn.placeholder.relatedOrderNo')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.supplierName')" prop="supplierName">
              <el-input v-model="formData.supplierName" :placeholder="$t('input.inventory.stockIn.placeholder.supplierName')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.supplierContact')" prop="supplierContact">
              <el-input v-model="formData.supplierContact" :placeholder="$t('input.inventory.stockIn.placeholder.supplierContact')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.supplierPhone')" prop="supplierPhone">
              <el-input v-model="formData.supplierPhone" :placeholder="$t('input.inventory.stockIn.placeholder.supplierPhone')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.columns.operator')" prop="operator">
              <el-input v-model="formData.operator" :placeholder="$t('input.inventory.stockIn.placeholder.operator')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.remark')" prop="remark" class="full-width-item">
              <el-input v-model="formData.remark" :placeholder="$t('input.inventory.stockIn.placeholder.remark')" type="textarea" :rows="2" />
            </el-form-item>
          </div>
        </div>

        <!-- 入库投入品明细 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-archive-line"></i>
            <h3>{{ $t('input.inventory.stockIn.inputDetails') }}</h3>
          </div>

          <div class="items-list">
            <div v-for="(item, index) in formData.details" :key="index" class="item-row">
              <div class="item-fields">
                <el-form-item :label="$t('input.inventory.stockIn.inputName')" :prop="`details.${index}.inputId`" :rules="detailRules.inputId">
                  <el-select
                    v-model="item.inputId"
                    :placeholder="$t('input.inventory.stockIn.placeholder.inputName')"
                    filterable
                    clearable
                    class="full-width"
                    :loading="inputLoading"
                    @change="handleInputChange(item, index)"
                  >
                    <el-option
                      v-for="input in inputList"
                      :key="input.input_id"
                      :label="input.input_name"
                      :value="input.input_id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.inputId')" :prop="`details.${index}.inputCode`">
                  <el-input v-model="item.inputCode" disabled :placeholder="$t('input.inventory.stockIn.placeholder.inputId')" />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.inputBatchId')" :prop="`details.${index}.inputBatchId`">
                  <el-input v-model="item.inputBatchId" :placeholder="$t('input.inventory.stockIn.placeholder.inputBatchId')" clearable />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.inputType')" :prop="`details.${index}.inputType`">
                  <el-input v-model="item.inputType" disabled :placeholder="$t('input.inventory.stockIn.placeholder.inputType')" />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.specification')" :prop="`details.${index}.specification`">
                  <el-input v-model="item.specification" :placeholder="$t('input.inventory.stockIn.placeholder.specification')" clearable />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.unit')" :prop="`details.${index}.unit`" :rules="detailRules.unit">
                  <el-input v-model="item.unit" :placeholder="$t('input.inventory.stockIn.placeholder.unit')" clearable />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.columns.quantity')" :prop="`details.${index}.quantity`" :rules="detailRules.quantity">
                  <el-input-number v-model="item.quantity" :min="0.01" :step="1" :precision="2" :placeholder="$t('input.inventory.stockIn.placeholder.quantity')" class="full-width" />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.expiryDate')" :prop="`details.${index}.expiryDate`">
                  <el-date-picker v-model="item.expiryDate" type="date" :placeholder="$t('input.inventory.stockIn.placeholder.expiryDate')" class="full-width" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.qrCode')" :prop="`details.${index}.qrCode`">
                  <el-input v-model="item.qrCode" disabled :placeholder="$t('input.inventory.stockIn.placeholder.qrCode')" />
                </el-form-item>
              </div>
              <div class="item-actions">
                <el-button type="danger" link @click="removeDetail(index)" :disabled="formData.details.length === 1">
                  <i class="ri-delete-bin-line"></i>
                  <span class="btn-text">{{ $t('common.delete') }}</span>
                </el-button>
              </div>
            </div>
          </div>

          <el-button type="primary" plain @click="addDetail" class="add-item-btn">
            <i class="ri-add-line"></i>
            {{ $t('input.inventory.stockIn.addInput') }}
          </el-button>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { createInboundOrder, getInboundOrderDetail } from '@/api/inbound'
import { getWarehouseList } from '@/api/inventory'
import { getInputList } from '@/api/input'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)
const warehouseLoading = ref(false)
const inputLoading = ref(false)

const isEdit = computed(() => !!route.params.id)
const inboundOrderId = route.params.id

// 仓库列表
const warehouseList = ref([])
// 投入品列表
const inputList = ref([])

// 加载仓库列表
const loadWarehouseList = async () => {
  warehouseLoading.value = true
  try {
    const res = await getWarehouseList({
      page: 1,
      pageSize: 1000,
      status: '1' // 只获取启用的仓库
    })
    if (res.code === 200) {
      warehouseList.value = res.data.list || []
    }
  } catch (error) {
    console.error('Failed to load warehouse list:', error)
  } finally {
    warehouseLoading.value = false
  }
}

// 加载投入品列表
const loadInputList = async () => {
  inputLoading.value = true
  try {
    const res = await getInputList({
      page: 1,
      pageSize: 1000,
      status: 'active' // 只获取启用的投入品
    })
    if (res.code === 200) {
      inputList.value = res.data.list || []
    }
  } catch (error) {
    console.error('Failed to load input list:', error)
  } finally {
    inputLoading.value = false
  }
}

// 投入品选择变化时自动填充信息
const handleInputChange = (item, index) => {
  if (!item.inputId) {
    item.inputCode = ''
    item.inputType = ''
    item.qrCode = ''
    return
  }

  const selectedInput = inputList.value.find(input => input.input_id === item.inputId)
  if (selectedInput) {
    item.inputCode = selectedInput.input_sku || ''
    item.inputType = getInputTypeText(selectedInput.type)
    item.qrCode = selectedInput.qr_code || ''
  }
}

// 获取投入品类型文本
const getInputTypeText = (type) => {
  const typeMap = {
    'pesticide': t('input.catalog.type.pesticide'),
    'fertilizer': t('input.catalog.type.fertilizer'),
    'seed': t('input.catalog.type.seed'),
    'other': t('input.catalog.type.other')
  }
  return typeMap[type] || type
}

const formData = reactive({
  inboundType: 0,
  warehouseId: '',
  relatedOrderNo: '',
  supplierName: '',
  supplierContact: '',
  supplierPhone: '',
  operator: '',
  remark: '',
  details: [
    {
      inputId: '',
      inputCode: '',
      inputBatchId: '',
      inputType: '',
      specification: '',
      unit: '',
      quantity: null,
      expiryDate: '',
      qrCode: ''
    }
  ]
})

const rules = computed(() => ({
  inboundType: [{ required: true, message: t('input.inventory.stockIn.rules.typeRequired'), trigger: 'change' }],
  warehouseId: [{ required: true, message: t('input.inventory.stockIn.rules.warehouseRequired'), trigger: 'change' }],
  operator: [{ required: true, message: t('input.inventory.stockIn.rules.operatorRequired'), trigger: 'blur' }]
}))

const detailRules = computed(() => ({
  inputId: [{ required: true, message: t('input.inventory.stockIn.rules.inputIdRequired'), trigger: 'change' }],
  unit: [{ required: true, message: t('input.inventory.stockIn.rules.unitRequired'), trigger: 'blur' }],
  quantity: [
    { required: true, message: t('input.inventory.stockIn.rules.quantityRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('input.inventory.stockIn.rules.quantityPositive'), trigger: 'blur' }
  ]
}))

// 返回
const goBack = () => {
  router.back()
}

// 添加投入品明细
const addDetail = () => {
  formData.details.push({
    inputId: '',
    inputCode: '',
    inputBatchId: '',
    inputType: '',
    specification: '',
    unit: '',
    quantity: null,
    expiryDate: '',
    qrCode: ''
  })
}

// 移除投入品明细
const removeDetail = (index) => {
  if (formData.details.length > 1) {
    formData.details.splice(index, 1)
  } else {
    ElMessage.warning(t('input.inventory.stockIn.rules.detailsRequired'))
  }
}

// 加载详情数据
const loadData = async () => {
  if (!isEdit.value) return

  try {
    const res = await getInboundOrderDetail(inboundOrderId)
    if (res.code === 200) {
      const data = res.data
      formData.inboundType = data.inbound_type
      formData.warehouseId = data.warehouse_id
      formData.relatedOrderNo = data.related_order_no || ''
      formData.supplierName = data.supplier_name || ''
      formData.supplierContact = data.supplier_contact || ''
      formData.supplierPhone = data.supplier_phone || ''
      formData.operator = data.operator || ''
      formData.remark = data.remark || ''

      if (data.details && data.details.length > 0) {
        formData.details = data.details.map(item => ({
          inputId: item.input_id,
          inputCode: item.input_code || '',
          inputBatchId: item.input_batch_id || '',
          inputType: item.input_type || '',
          specification: item.specification || '',
          unit: item.unit,
          quantity: item.quantity,
          expiryDate: item.expiry_date || '',
          qrCode: item.qr_code || ''
        }))
      }
    }
  } catch (error) {
    console.error('Failed to load inbound order detail:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (formData.details.length === 0) {
      ElMessage.warning(t('input.inventory.stockIn.rules.detailsRequired'))
      return
    }

    // 验证所有明细
    const hasEmptyDetail = formData.details.some(item =>
      !item.inputId || !item.unit || !item.quantity
    )
    if (hasEmptyDetail) {
      ElMessage.warning(t('input.inventory.stockIn.rules.detailsComplete'))
      return
    }

    submitLoading.value = true

    const data = {
      inboundType: formData.inboundType,
      warehouseId: formData.warehouseId,
      relatedOrderNo: formData.relatedOrderNo,
      supplierName: formData.supplierName,
      supplierContact: formData.supplierContact,
      supplierPhone: formData.supplierPhone,
      operator: formData.operator,
      remark: formData.remark,
      details: formData.details.map(item => {
        const selectedInput = inputList.value.find(input => input.input_id === item.inputId)
        return {
          materialId: item.inputId,
          materialName: selectedInput ? selectedInput.input_name : '',
          materialType: item.inputType,
          materialBatchId: item.inputBatchId,
          specModel: item.specification,
          unitOfMeasure: item.unit,
          quantity: item.quantity,
          expiryDate: item.expiryDate,
          qrCode: item.qrCode
        }
      })
    }

    const res = await createInboundOrder(data)
    if (res.code === 200) {
      ElMessage.success(t('input.inventory.stockIn.createSuccess'))
      setTimeout(() => router.back(), 1000)
    }
  } catch (error) {
    console.error('Form validation or submission error:', error)
  } finally {
    submitLoading.value = false
  }
}

onMounted(async () => {
  await loadWarehouseList()
  await loadInputList()
  await loadData()
})
</script>

<style scoped>
.inbound-form-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  padding: 16px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 表单区域 */
.form-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-block {
  margin-bottom: 32px;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

.block-header i {
  font-size: 20px;
  color: #009A44;
}

.block-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.full-width-item {
  grid-column: 1 / -1;
}

.full-width {
  width: 100%;
}

/* 投入品明细 */
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
  margin-bottom: 12px;
}

.item-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

.add-item-btn {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
  margin-top: 24px;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .item-fields {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-center {
    text-align: left;
  }

  .page-title {
    font-size: 18px;
  }

  .form-wrapper {
    padding: 16px;
  }

  .item-fields {
    grid-template-columns: 1fr;
  }

  .item-row {
    padding: 12px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }

  .btn-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 0 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .form-wrapper {
    padding: 12px;
  }
}
</style>
