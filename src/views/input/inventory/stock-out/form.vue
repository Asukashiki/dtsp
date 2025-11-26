<template>
  <div class="stock-out-form-page">
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
          <h1 class="page-title">{{ $t('input.inventory.stockOut.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="stock-out-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('input.catalog.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.inventory.stockOut.form.warehouseId')" prop="warehouseId">
              <el-select
                v-model="formData.warehouseId"
                :placeholder="$t('input.inventory.stockOut.placeholder.warehouseId')"
                filterable
                clearable
                class="full-width"
                :loading="warehouseLoading"
                @change="handleWarehouseChange"
              >
                <el-option
                  v-for="warehouse in warehouseList"
                  :key="warehouse.warehouse_id"
                  :label="`${warehouse.warehouse_name} (${warehouse.warehouse_code})`"
                  :value="warehouse.warehouse_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockOut.form.customer')" prop="customer">
              <el-input v-model="formData.customer" :placeholder="$t('input.inventory.stockOut.placeholder.customer')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockOut.form.type')" prop="type">
              <el-select v-model="formData.type" :placeholder="$t('input.inventory.stockOut.placeholder.type')" class="full-width">
                <el-option :label="$t('input.inventory.stockOut.type.sale')" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockOut.form.operator')" prop="operator">
              <el-input v-model="formData.operator" :placeholder="$t('input.inventory.stockOut.placeholder.operator')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.stockOut.form.remark')" prop="remark" class="full-width-item">
              <el-input v-model="formData.remark" :placeholder="$t('input.inventory.stockOut.placeholder.remark')" type="textarea" :rows="2" />
            </el-form-item>
          </div>
        </div>

        <!-- 出库商品明细 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-archive-line"></i>
            <h3>{{ $t('input.inventory.stockOut.form.items') }}</h3>
          </div>

          <div class="items-list">
            <div v-for="(item, index) in formData.items" :key="index" class="item-row">
              <div class="item-fields">
                <el-form-item :label="$t('input.inventory.stockOut.form.inputId')" :prop="`items.${index}.inputId`" :rules="itemRules.inputId">
                  <el-select
                    v-model="item.inputId"
                    :placeholder="$t('input.inventory.stockOut.placeholder.inputId')"
                    filterable
                    clearable
                    class="full-width"
                    :loading="inputLoading"
                    :disabled="!formData.warehouseId"
                    @change="handleInputChange(index)"
                  >
                    <el-option
                      v-for="input in inputList"
                      :key="input.input_id"
                      :label="`${input.input_name} (${input.input_sku})`"
                      :value="input.input_id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockOut.form.batchNo')" :prop="`items.${index}.batchNo`" :rules="itemRules.batchNo">
                  <el-select
                    v-model="item.batchNo"
                    :placeholder="$t('input.inventory.stockOut.placeholder.batchNo')"
                    filterable
                    class="full-width"
                    :loading="item.batchLoading"
                    :disabled="!item.inputId"
                    @change="handleBatchChange(index)"
                  >
                    <el-option
                      v-for="batch in item.batchList"
                      :key="batch.batch_no"
                      :label="`${batch.batch_no} (${$t('input.inventory.stockOut.form.availableQuantity')}: ${batch.current_quantity})`"
                      :value="batch.batch_no"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockOut.form.quantity')" :prop="`items.${index}.quantity`" :rules="itemRules.quantity">
                  <el-input v-model.number="item.quantity" :placeholder="$t('input.inventory.stockOut.placeholder.quantity')" type="number" />
                  <template #append v-if="item.availableQuantity">
                    <span>{{ $t('input.inventory.stockOut.form.availableQuantity') }}: {{ item.availableQuantity }}</span>
                  </template>
                </el-form-item>
                <el-form-item :label="$t('input.inventory.stockOut.form.itemRemarks')" :prop="`items.${index}.remarks`">
                  <el-input v-model="item.remarks" :placeholder="$t('input.inventory.stockOut.placeholder.itemRemarks')" />
                </el-form-item>
              </div>
              <div class="item-actions">
                <el-button type="danger" link @click="removeItem(index)">
                  <i class="ri-delete-bin-line"></i>
                  <span class="btn-text">{{ $t('input.inventory.stockOut.actions.removeItem') }}</span>
                </el-button>
              </div>
            </div>
          </div>

          <el-button type="primary" plain @click="addItem" class="add-item-btn">
            <i class="ri-add-line"></i>
            {{ $t('input.inventory.stockOut.actions.addItem') }}
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
import { createStockOut, getBatchList, getWarehouseList, getInventoryList } from '@/api/inventory'

const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)

// 仓库列表
const warehouseList = ref([])
const warehouseLoading = ref(false)

// 投入品列表 (该仓库中有库存的投入品)
const inputList = ref([])
const inputLoading = ref(false)

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

// 根据仓库加载有库存的投入品列表
const loadInputListByWarehouse = async (warehouseId) => {
  if (!warehouseId) {
    inputList.value = []
    return
  }

  inputLoading.value = true
  try {
    // 通过库存API获取该仓库中有库存的投入品
    const res = await getInventoryList({
      warehouseId: warehouseId,
      page: 1,
      pageSize: 1000
    })

    if (res.code === 200 && res.data && res.data.list) {
      // 去重,提取唯一的投入品
      const inputMap = new Map()
      res.data.list.forEach(item => {
        if (item.current_quantity > 0 && !inputMap.has(item.input_id)) {
          inputMap.set(item.input_id, {
            input_id: item.input_id,
            input_name: item.input_name,
            input_sku: item.input_sku || ''
          })
        }
      })
      inputList.value = Array.from(inputMap.values())

      if (inputList.value.length === 0) {
        ElMessage.warning(t('input.inventory.stockOut.messages.noStockInWarehouse') || '该仓库暂无可用库存')
      }
    }
  } catch (error) {
    console.error('Failed to load input list by warehouse:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    inputLoading.value = false
  }
}

const formData = reactive({
  warehouseId: '',
  customer: '',
  type: '0',
  operator: '',
  remark: '',
  items: [
    {
      inputId: '',
      batchNo: '',
      quantity: null,
      availableQuantity: 0,
      batchList: [],
      batchLoading: false,
      remarks: ''
    }
  ]
})

const rules = computed(() => ({
  warehouseId: [{ required: true, message: t('input.inventory.stockOut.rules.warehouseIdRequired'), trigger: 'change' }],
  customer: [{ required: true, message: t('input.inventory.stockOut.rules.customerRequired'), trigger: 'blur' }],
  type: [{ required: true, message: t('input.inventory.stockOut.rules.typeRequired'), trigger: 'change' }],
  operator: [{ required: true, message: t('input.inventory.stockOut.rules.operatorRequired'), trigger: 'blur' }]
}))

const itemRules = computed(() => ({
  inputId: [{ required: true, message: t('input.inventory.stockOut.rules.inputIdRequired'), trigger: 'change' }],
  batchNo: [{ required: true, message: t('input.inventory.stockOut.rules.batchNoRequired'), trigger: 'change' }],
  quantity: [
    { required: true, message: t('input.inventory.stockOut.rules.quantityRequired'), trigger: 'blur' },
    { type: 'number', min: 1, message: t('input.inventory.stockOut.rules.quantityPositive'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const index = parseInt(rule.field.split('.')[1])
        const item = formData.items[index]
        if (value && item.availableQuantity && value > item.availableQuantity) {
          callback(new Error(t('input.inventory.stockOut.rules.quantityExceeds')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// 返回
const goBack = () => {
  router.back()
}

// 仓库变更时,清空所有商品的选择,并重新加载该仓库的投入品
const handleWarehouseChange = () => {
  // 清空所有商品选择
  formData.items.forEach(item => {
    item.inputId = ''
    item.batchNo = ''
    item.batchList = []
    item.quantity = null
    item.availableQuantity = 0
  })

  // 重新加载该仓库有库存的投入品
  if (formData.warehouseId) {
    loadInputListByWarehouse(formData.warehouseId)
  } else {
    inputList.value = []
  }
}

// 投入品变更时,加载该投入品在该仓库的批次列表
const handleInputChange = async (index) => {
  const item = formData.items[index]
  item.batchNo = ''
  item.batchList = []
  item.quantity = null
  item.availableQuantity = 0

  if (!item.inputId || !formData.warehouseId) {
    return
  }

  item.batchLoading = true
  try {
    const res = await getBatchList({
      warehouseId: formData.warehouseId,
      inputId: item.inputId
    })
    if (res.code === 200) {
      item.batchList = res.data || []
      if (item.batchList.length === 0) {
        ElMessage.warning(t('input.inventory.stockOut.messages.insufficientStock'))
      }
    }
  } catch (error) {
    console.error('Failed to load batch list:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    item.batchLoading = false
  }
}

// 批次变更时,更新可用库存数量
const handleBatchChange = (index) => {
  const item = formData.items[index]
  const selectedBatch = item.batchList.find(b => b.batch_no === item.batchNo)
  if (selectedBatch) {
    item.availableQuantity = selectedBatch.current_quantity
  } else {
    item.availableQuantity = 0
  }
}

// 添加商品
const addItem = () => {
  formData.items.push({
    inputId: '',
    batchNo: '',
    quantity: null,
    availableQuantity: 0,
    batchList: [],
    batchLoading: false,
    remarks: ''
  })
}

// 移除商品
const removeItem = (index) => {
  if (formData.items.length > 1) {
    formData.items.splice(index, 1)
  } else {
    ElMessage.warning(t('input.inventory.stockOut.rules.itemsRequired'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (formData.items.length === 0) {
      ElMessage.warning(t('input.inventory.stockOut.rules.itemsRequired'))
      return
    }

    submitLoading.value = true

    const data = {
      warehouseId: parseInt(formData.warehouseId),
      customer: formData.customer,
      type: formData.type,
      operator: formData.operator,
      remark: formData.remark,
      items: formData.items.map(item => ({
        inputId: parseInt(item.inputId),
        batchNo: item.batchNo,
        quantity: item.quantity,
        remarks: item.remarks
      }))
    }

    const res = await createStockOut(data)
    if (res.code === 200) {
      ElMessage.success(t('input.inventory.stockOut.addSuccess'))
      setTimeout(() => router.back(), 1000)
    }
  } catch (error) {
    console.error('Form validation or submission error:', error)
  } finally {
    submitLoading.value = false
  }
}

onMounted(() => {
  loadWarehouseList()
})
</script>

<style scoped>
.stock-out-form-page {
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
