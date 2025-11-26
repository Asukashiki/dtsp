<template>
  <div class="stock-in-form-page">
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
          <h1 class="page-title">{{ $t('input.inventory.stockIn.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="stock-in-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('input.catalog.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.inventory.stockIn.form.supplierId')" prop="supplierId">
              <el-select
                v-model="formData.supplierId"
                :placeholder="$t('input.inventory.stockIn.placeholder.supplierId')"
                filterable
                clearable
                class="full-width"
                :loading="supplierLoading"
                @change="handleSupplierChange"
              >
                <el-option
                  v-for="supplier in supplierList"
                  :key="supplier.user_id"
                  :label="supplier.org_name"
                  :value="supplier.user_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.form.warehouseId')" prop="warehouseId">
              <el-select
                v-model="formData.warehouseId"
                :placeholder="$t('input.inventory.stockIn.placeholder.warehouseId')"
                filterable
                clearable
                class="full-width"
                :loading="warehouseLoading"
                :disabled="!formData.supplierId"
              >
                <el-option
                  v-for="warehouse in warehouseList"
                  :key="warehouse.warehouse_id"
                  :label="`${warehouse.warehouse_name} (${warehouse.warehouse_code})`"
                  :value="warehouse.warehouse_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.form.type')" prop="type">
              <el-select v-model="formData.type" :placeholder="$t('input.inventory.stockIn.placeholder.type')" class="full-width">
                <el-option :label="$t('input.inventory.stockIn.type.purchase')" value="0" />
                <el-option :label="$t('input.inventory.stockIn.type.return')" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.form.operator')" prop="operator">
              <el-input v-model="formData.operator" :placeholder="$t('input.inventory.stockIn.placeholder.operator')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockIn.form.remarks')" prop="remarks" class="full-width-item">
              <el-input v-model="formData.remarks" :placeholder="$t('input.inventory.stockIn.placeholder.remarks')" type="textarea" :rows="2" />
            </el-form-item>
          </div>
        </div>

        <!-- 入库商品明细 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-archive-line"></i>
            <h3>{{ $t('input.inventory.stockIn.form.items') }}</h3>
          </div>

          <div class="items-list">
            <div v-for="(item, index) in formData.items" :key="index" class="item-row">
              <div class="item-fields">
                <el-form-item :label="$t('input.inventory.stockIn.form.inputId')" :prop="`items.${index}.inputId`" :rules="itemRules.inputId">
                  <el-select
                    v-model="item.inputId"
                    :placeholder="$t('input.inventory.stockIn.placeholder.inputId')"
                    filterable
                    clearable
                    class="full-width"
                    :loading="inputLoading"
                    :disabled="!formData.supplierId"
                  >
                    <el-option
                      v-for="input in inputList"
                      :key="input.input_id"
                      :label="`${input.input_name}${input.input_sku ? ' (' + input.input_sku + ')' : ''}`"
                      :value="input.input_id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.form.quantity')" :prop="`items.${index}.quantity`" :rules="itemRules.quantity">
                  <el-input v-model.number="item.quantity" :placeholder="$t('input.inventory.stockIn.placeholder.quantity')" type="number" />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.form.expiryDate')" :prop="`items.${index}.expiryDate`" :rules="itemRules.expiryDate">
                  <el-date-picker v-model="item.expiryDate" type="date" :placeholder="$t('input.inventory.stockIn.placeholder.expiryDate')" class="full-width" />
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockIn.form.itemRemarks')" :prop="`items.${index}.remarks`">
                  <el-input v-model="item.remarks" :placeholder="$t('input.inventory.stockIn.placeholder.itemRemarks')" />
                </el-form-item>
              </div>
              <div class="item-actions">
                <el-button type="danger" link @click="removeItem(index)">
                  <i class="ri-delete-bin-line"></i>
                  <span class="btn-text">{{ $t('input.inventory.stockIn.actions.removeItem') }}</span>
                </el-button>
              </div>
            </div>
          </div>

          <el-button type="primary" plain @click="addItem" class="add-item-btn">
            <i class="ri-add-line"></i>
            {{ $t('input.inventory.stockIn.actions.addItem') }}
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { createStockIn } from '@/api/inventory'
import { getWarehouseList } from '@/api/inventory'
import { getSupplierCertList, getSupplierProductList } from '@/api/supplier'

const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)

// 仓库列表 - 存储当前供应商的仓库
const warehouseList = ref([])
const warehouseLoading = ref(false)

// 供应商列表
const supplierList = ref([])
const supplierLoading = ref(false)

// 投入品列表 - 存储供应商的投入品
const inputList = ref([])
const inputLoading = ref(false)

// 加载供应商的仓库列表
const loadWarehouseList = async (supplierId) => {
  if (!supplierId) {
    warehouseList.value = []
    return
  }

  warehouseLoading.value = true
  try {
    const res = await getWarehouseList({
      supplierId: supplierId,
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

// 加载供应商列表
const loadSupplierList = async () => {
  supplierLoading.value = true
  try {
    const res = await getSupplierCertList({
      page: 1,
      pageSize: 1000,
      status: '2' // 只获取已通过审核的供应商
    })
    if (res.code === 200) {
      // 过滤掉没有 user_id 的记录
      supplierList.value = (res.data.list || []).filter(item => item.user_id != null)
    }
  } catch (error) {
    console.error('Failed to load supplier list:', error)
  } finally {
    supplierLoading.value = false
  }
}

// 加载供应商的投入品列表
const loadSupplierInputList = async (supplierId) => {
  if (!supplierId) {
    inputList.value = []
    return
  }

  inputLoading.value = true
  try {
    const res = await getSupplierProductList({
      supplierId: supplierId,
      page: 1,
      pageSize: 1000
    })
    if (res.code === 200) {
      inputList.value = res.data.list || []
    }
  } catch (error) {
    console.error('Failed to load supplier input list:', error)
  } finally {
    inputLoading.value = false
  }
}

// 供应商改变时的处理
const handleSupplierChange = (supplierId) => {
  // 清空仓库和投入品选择
  formData.warehouseId = ''
  formData.items.forEach(item => {
    item.inputId = ''
  })

  // 加载该供应商的仓库和投入品
  if (supplierId) {
    loadWarehouseList(supplierId)
    loadSupplierInputList(supplierId)
  } else {
    warehouseList.value = []
    inputList.value = []
  }
}

const formData = reactive({
  warehouseId: '',
  supplierId: '',
  type: '',
  operator: '',
  remarks: '',
  items: [
    {
      inputId: '',
      quantity: null,
      expiryDate: '',
      remarks: ''
    }
  ]
})

const rules = computed(() => ({
  warehouseId: [{ required: true, message: t('input.inventory.stockIn.rules.warehouseIdRequired'), trigger: 'change' }],
  supplierId: [{ required: true, message: t('input.inventory.stockIn.rules.supplierIdRequired'), trigger: 'change' }],
  type: [{ required: true, message: t('input.inventory.stockIn.rules.typeRequired'), trigger: 'change' }],
  operator: [{ required: true, message: t('input.inventory.stockIn.rules.operatorRequired'), trigger: 'blur' }]
}))

const itemRules = computed(() => ({
  inputId: [{ required: true, message: t('input.inventory.stockIn.rules.inputIdRequired'), trigger: 'change' }],
  quantity: [
    { required: true, message: t('input.inventory.stockIn.rules.quantityRequired'), trigger: 'blur' },
    { type: 'number', min: 1, message: t('input.inventory.stockIn.rules.quantityPositive'), trigger: 'blur' }
  ],
  expiryDate: [{ required: true, message: t('input.inventory.stockIn.rules.expiryDateRequired'), trigger: 'change' }]
}))

// 返回
const goBack = () => {
  router.back()
}

// 添加商品
const addItem = () => {
  formData.items.push({
    inputId: '',
    quantity: null,
    expiryDate: '',
    remarks: ''
  })
}

// 移除商品
const removeItem = (index) => {
  if (formData.items.length > 1) {
    formData.items.splice(index, 1)
  } else {
    ElMessage.warning(t('input.inventory.stockIn.rules.itemsRequired'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (formData.items.length === 0) {
      ElMessage.warning(t('input.inventory.stockIn.rules.itemsRequired'))
      return
    }

    submitLoading.value = true

    const data = {
      warehouseId: parseInt(formData.warehouseId),
      supplierId: formData.supplierId,
      type: formData.type,
      operator: formData.operator,
      remarks: formData.remarks,
      items: formData.items.map(item => ({
        inputId: parseInt(item.inputId),
        quantity: item.quantity,
        expiryDate: item.expiryDate instanceof Date
          ? item.expiryDate.toISOString().split('T')[0]
          : (item.expiryDate || ''),
        remarks: item.remarks || ''
      }))
    }

    const res = await createStockIn(data)
    if (res.code === 200) {
      ElMessage.success(t('input.inventory.stockIn.addSuccess'))
      setTimeout(() => router.back(), 1000)
    }
  } catch (error) {
    console.error('Form validation or submission error:', error)
  } finally {
    submitLoading.value = false
  }
}

onMounted(async () => {
  await loadSupplierList()
})
</script>

<style scoped>
.stock-in-form-page {
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

/* 商品明细 */
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
  grid-template-columns: repeat(2, 1fr);
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
  .form-grid,
  .item-fields {
    grid-template-columns: 1fr;
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
