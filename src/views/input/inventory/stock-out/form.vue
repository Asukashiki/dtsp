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
            <el-form-item :label="$t('input.inventory.stockOut.form.type')" prop="outbound_type">
              <el-select
                v-model="formData.outbound_type"
                :placeholder="$t('input.inventory.stockOut.placeholder.type')"
                class="full-width"
              >
                <el-option :label="$t('input.inventory.stockOut.type.sale')" :value="1" />
                <el-option :label="$t('input.inventory.stockOut.type.transfer')" :value="2" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('input.inventory.stockOut.form.warehouseId')" prop="warehouse_id">
              <el-select
                v-model="formData.warehouse_id"
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
                  :label="`${warehouse.warehouse_name} (${warehouse.warehouse_code || warehouse.warehouse_id})`"
                  :value="warehouse.warehouse_id"
                />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('input.inventory.stockOut.form.outboundObject')" prop="outbound_object_id">
              <el-select
                v-model="formData.outbound_object_id"
                :placeholder="$t('input.inventory.stockOut.placeholder.outboundObject')"
                filterable
                clearable
                class="full-width"
                :loading="warehouseLoading"
                :disabled="availableTargetWarehouses.length === 0"
                @change="handleOutboundObjectChange"
              >
                <el-option
                  v-for="warehouse in availableTargetWarehouses"
                  :key="warehouse.warehouse_id"
                  :label="`${warehouse.warehouse_name} (${warehouse.warehouse_code || warehouse.warehouse_id})`"
                  :value="warehouse.warehouse_id"
                />
                <template #empty>
                  <div style="padding: 10px; text-align: center; color: #909399; font-size: 14px;">
                    {{ $t('input.inventory.stockOut.messages.noAvailableWarehouse') }}
                  </div>
                </template>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('input.inventory.stockOut.form.relatedOrderNo')" prop="related_order_no">
              <el-input
                v-model="formData.related_order_no"
                :placeholder="$t('input.inventory.stockOut.placeholder.relatedOrderNo')"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.inventory.stockOut.form.outboundUser')" prop="outbound_user">
              <el-input
                v-model="formData.outbound_user"
                :placeholder="$t('input.inventory.stockOut.placeholder.outboundUser')"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.inventory.stockOut.form.outboundDept')" prop="outbound_dept">
              <el-input
                v-model="formData.outbound_dept"
                :placeholder="$t('input.inventory.stockOut.placeholder.outboundDept')"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.inventory.stockOut.form.operator')" prop="operator">
              <el-input
                v-model="formData.operator"
                :placeholder="$t('input.inventory.stockOut.placeholder.operator')"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.inventory.stockOut.form.remark')" prop="remark" class="full-width-item">
              <el-input
                v-model="formData.remark"
                :placeholder="$t('input.inventory.stockOut.placeholder.remark')"
                type="textarea"
                :rows="2"
              />
            </el-form-item>
          </div>
        </div>

        <!-- 出库明细 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-archive-line"></i>
            <h3>{{ $t('input.inventory.stockOut.form.details') }}</h3>
          </div>

          <div class="items-list">
            <div v-for="(item, index) in formData.details" :key="index" class="item-row">
              <div class="item-fields">
                <el-form-item
                  :label="$t('input.inventory.stockOut.form.materialId')"
                  :prop="`details.${index}.material_id`"
                  :rules="detailRules.material_id"
                >
                  <el-select
                    v-model="item.material_id"
                    :placeholder="$t('input.inventory.stockOut.placeholder.materialId')"
                    filterable
                    clearable
                    class="full-width"
                    :loading="materialLoading"
                    :disabled="!formData.warehouse_id"
                    @change="handleMaterialChange(index)"
                  >
                    <el-option
                      v-for="material in materialList"
                      :key="material.material_id"
                      :label="`${material.material_name} (${material.material_id})`"
                      :value="material.material_id"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.materialType')"
                  :prop="`details.${index}.material_type`"
                  :rules="detailRules.material_type"
                >
                  <el-input
                    v-model="item.material_type"
                    :placeholder="$t('input.inventory.stockOut.placeholder.materialType')"
                    readonly
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.materialBatchId')"
                  :prop="`details.${index}.material_batch_id`"
                >
                  <el-input
                    v-model="item.material_batch_id"
                    :placeholder="$t('input.inventory.stockOut.placeholder.materialBatchId')"
                    readonly
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.quantity')"
                  :prop="`details.${index}.quantity`"
                  :rules="detailRules.quantity"
                >
                  <el-input-number
                    v-model="item.quantity"
                    :placeholder="$t('input.inventory.stockOut.placeholder.quantity')"
                    :min="0.01"
                    :step="1"
                    :precision="2"
                    class="full-width"
                  />
                  <span v-if="item.available_quantity > 0" class="available-hint">
                    {{ $t('input.inventory.stockOut.form.availableQuantity') }}: {{ item.available_quantity }}
                  </span>
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.specModel')"
                  :prop="`details.${index}.spec_model`"
                >
                  <el-input
                    v-model="item.spec_model"
                    :placeholder="$t('input.inventory.stockOut.placeholder.specModel')"
                    clearable
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.unitOfMeasure')"
                  :prop="`details.${index}.unit_of_measure`"
                >
                  <el-input
                    v-model="item.unit_of_measure"
                    :placeholder="$t('input.inventory.stockOut.placeholder.unitOfMeasure')"
                    clearable
                  />
                </el-form-item>
              </div>
              <div class="item-actions">
                <el-button type="danger" link @click="removeDetail(index)">
                  <i class="ri-delete-bin-line"></i>
                  <span class="btn-text">{{ $t('input.inventory.stockOut.actions.removeItem') }}</span>
                </el-button>
              </div>
            </div>
          </div>

          <el-button type="primary" plain @click="addDetail" class="add-item-btn">
            <i class="ri-add-line"></i>
            {{ $t('input.inventory.stockOut.actions.addItem') }}
          </el-button>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
            {{ $t('common.submit') }}
          </el-button>
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
import { createOutboundOrder } from '@/api/outbound'
import { getWarehouseList } from '@/api/inventory'
import { getStockList } from '@/api/stock'

const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)

// 仓库列表
const warehouseList = ref([])
const warehouseLoading = ref(false)

// 可选的目标仓库列表（排除出库仓库）
const availableTargetWarehouses = computed(() => {
  if (!formData.warehouse_id) {
    return warehouseList.value
  }
  return warehouseList.value.filter(w => w.warehouse_id !== formData.warehouse_id)
})

// 物料列表 (该仓库中有库存的物料)
const materialList = ref([])
const materialLoading = ref(false)

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
      warehouseList.value = res.data.items || res.data.list || []
    }
  } catch (error) {
    console.error('Failed to load warehouse list:', error)
  } finally {
    warehouseLoading.value = false
  }
}

// 根据仓库加载有库存的物料列表
const loadMaterialListByWarehouse = async (warehouseId) => {
  if (!warehouseId) {
    materialList.value = []
    return
  }

  materialLoading.value = true
  try {
    // 通过库存API获取该仓库中有库存的物料
    const res = await getStockList({
      warehouseId: warehouseId,
      page: 1,
      pageSize: 1000
    })

    if (res.code === 200 && res.data && res.data.items) {
      // 去重,提取唯一的物料及其库存信息（包含批次号）
      const materialMap = new Map()
      res.data.items.forEach(item => {
        if (item.quantity > 0) {
          const existingMaterial = materialMap.get(item.material_id)
          if (existingMaterial) {
            // 累加同一物料的库存
            existingMaterial.available_quantity += item.quantity
            // 如果有批次号，优先使用第一个批次号
            if (!existingMaterial.material_batch_id && item.material_batch_id) {
              existingMaterial.material_batch_id = item.material_batch_id
            }
          } else {
            materialMap.set(item.material_id, {
              material_id: item.material_id,
              material_name: item.material_name,
              material_type: item.material_type || 'fertilizer',
              material_batch_id: item.material_batch_id || '',
              available_quantity: item.quantity
            })
          }
        }
      })
      materialList.value = Array.from(materialMap.values())

      if (materialList.value.length === 0) {
        ElMessage.warning(t('input.inventory.stockOut.messages.noStockInWarehouse'))
      }
    }
  } catch (error) {
    console.error('Failed to load material list by warehouse:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    materialLoading.value = false
  }
}

const formData = reactive({
  outbound_type: 1,
  warehouse_id: '',
  outbound_object_id: '',
  outbound_object_name: '',
  related_order_no: '',
  outbound_user: '',
  outbound_dept: '',
  operator: '',
  remark: '',
  details: [
    {
      material_id: '',
      material_name: '',
      material_type: '',
      material_batch_id: '',
      quantity: null,
      spec_model: '',
      unit_of_measure: '',
      available_quantity: 0
    }
  ]
})

const rules = computed(() => ({
  outbound_type: [
    { required: true, message: t('input.inventory.stockOut.rules.typeRequired'), trigger: 'change' }
  ],
  warehouse_id: [
    { required: true, message: t('input.inventory.stockOut.rules.warehouseIdRequired'), trigger: 'change' }
  ],
  outbound_object_id: [
    { required: true, message: t('input.inventory.stockOut.rules.outboundObjectIdRequired'), trigger: 'blur' }
  ],
  operator: [
    { required: true, message: t('input.inventory.stockOut.rules.operatorRequired'), trigger: 'blur' }
  ]
}))

const detailRules = computed(() => ({
  material_id: [
    { required: true, message: t('input.inventory.stockOut.rules.materialIdRequired'), trigger: 'change' }
  ],
  material_type: [
    { required: true, message: t('input.inventory.stockOut.rules.materialTypeRequired'), trigger: 'blur' }
  ],
  quantity: [
    { required: true, message: t('input.inventory.stockOut.rules.quantityRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('input.inventory.stockOut.rules.quantityPositive'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const index = parseInt(rule.field.split('.')[1])
        const detail = formData.details[index]
        if (value && detail.available_quantity > 0 && value > detail.available_quantity) {
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

// 仓库变更时,清空所有明细的选择,并重新加载该仓库的物料
const handleWarehouseChange = () => {
  // 如果出库对象选择了当前出库仓库，清空出库对象
  if (formData.outbound_object_id && formData.outbound_object_id === formData.warehouse_id) {
    formData.outbound_object_id = ''
    formData.outbound_object_name = ''
  }

  // 清空所有明细选择
  formData.details.forEach(detail => {
    detail.material_id = ''
    detail.material_name = ''
    detail.material_type = ''
    detail.material_batch_id = ''
    detail.quantity = null
    detail.available_quantity = 0
  })

  // 重新加载该仓库有库存的物料
  if (formData.warehouse_id) {
    loadMaterialListByWarehouse(formData.warehouse_id)
  } else {
    materialList.value = []
  }
}

// 出库对象变更时,自动填充出库对象名称
const handleOutboundObjectChange = () => {
  const selectedWarehouse = warehouseList.value.find(w => w.warehouse_id === formData.outbound_object_id)
  if (selectedWarehouse) {
    formData.outbound_object_name = selectedWarehouse.warehouse_name
  } else {
    formData.outbound_object_name = ''
  }
}

// 物料变更时,自动填充物料名称、类型、批次号和可用库存
const handleMaterialChange = (index) => {
  const detail = formData.details[index]
  const selectedMaterial = materialList.value.find(m => m.material_id === detail.material_id)

  if (selectedMaterial) {
    detail.material_name = selectedMaterial.material_name
    detail.material_type = selectedMaterial.material_type
    detail.material_batch_id = selectedMaterial.material_batch_id
    detail.available_quantity = selectedMaterial.available_quantity
  } else {
    detail.material_name = ''
    detail.material_type = ''
    detail.material_batch_id = ''
    detail.available_quantity = 0
  }
}

// 添加明细
const addDetail = () => {
  formData.details.push({
    material_id: '',
    material_name: '',
    material_type: '',
    material_batch_id: '',
    quantity: null,
    spec_model: '',
    unit_of_measure: '',
    available_quantity: 0
  })
}

// 移除明细
const removeDetail = (index) => {
  if (formData.details.length > 1) {
    formData.details.splice(index, 1)
  } else {
    ElMessage.warning(t('input.inventory.stockOut.rules.detailsRequired'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (formData.details.length === 0) {
      ElMessage.warning(t('input.inventory.stockOut.rules.detailsRequired'))
      return
    }

    // 检查所有明细是否完整
    const hasIncompleteDetail = formData.details.some(
      detail => !detail.material_id || !detail.material_type || !detail.quantity
    )
    if (hasIncompleteDetail) {
      ElMessage.warning(t('input.inventory.stockOut.rules.detailsRequired'))
      return
    }

    submitLoading.value = true

    // 转换为驼峰形式
    const data = {
      outboundType: formData.outbound_type,
      warehouseId: formData.warehouse_id,
      outboundObjectId: formData.outbound_object_id,
      outboundObjectName: formData.outbound_object_name,
      relatedOrderNo: formData.related_order_no || undefined,
      outboundUser: formData.outbound_user || undefined,
      outboundDept: formData.outbound_dept || undefined,
      operator: formData.operator,
      remark: formData.remark || undefined,
      details: formData.details.map(detail => ({
        materialId: detail.material_id,
        materialName: detail.material_name,
        materialType: detail.material_type,
        materialBatchId: detail.material_batch_id || undefined,
        quantity: detail.quantity,
        specModel: detail.spec_model || undefined,
        unitOfMeasure: detail.unit_of_measure || undefined
      }))
    }

    const res = await createOutboundOrder(data)
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

/* 明细列表 */
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

.available-hint {
  font-size: 12px;
  color: #909399;
  margin-left: 8px;
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
