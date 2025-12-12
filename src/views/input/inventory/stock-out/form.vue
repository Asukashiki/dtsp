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

            <el-form-item :label="$t('input.inventory.stockOut.form.relatedOrderNo')" prop="related_order_no">
              <el-select
                v-model="formData.related_order_no"
                :placeholder="$t('input.inventory.stockOut.placeholder.relatedOrderNo')"
                filterable
                clearable
                class="full-width"
                :loading="distributionLoading"
                @focus="handleDistributionFocus"
                @change="handleDistributionChange"
              >
                <el-option
                  v-for="distribution in distributionList"
                  :key="distribution.id"
                  :label="distribution.releaseName"
                  :value="distribution.id"
                />
              </el-select>
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
                  :label="$t('input.inventory.stockIn.form.inputId')"
                  :prop="`details.${index}.material_id`"
                  :rules="detailRules.material_id"
                >
                  <el-select
                    v-model="item.material_id"
                    :placeholder="$t('input.inventory.stockIn.placeholder.inputId')"
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
                  :label="$t('input.inventory.stockIn.inputType')"
                  :prop="`details.${index}.material_type`"
                  :rules="detailRules.material_type"
                >
                  <el-input
                    v-model="item.material_type"
                    :placeholder="$t('input.inventory.stockIn.placeholder.inputType')"
                    readonly
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockIn.agriculturalInputType')"
                  :prop="`details.${index}.agricultural_input_type`"
                >
                  <el-input
                    v-model="item.agricultural_input_type"
                    :placeholder="$t('input.inventory.stockIn.placeholder.agriculturalInputType')"
                    readonly
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockIn.variety')"
                  :prop="`details.${index}.variety`"
                >
                  <el-input
                    v-model="item.variety"
                    :placeholder="$t('input.inventory.stockIn.placeholder.variety')"
                    readonly
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.batchNo')"
                  :prop="`details.${index}.material_batch_id`"
                >
                  <el-input
                    v-model="item.material_batch_id"
                    :placeholder="$t('input.inventory.stockOut.placeholder.batchNo')"
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { createOutboundOrder, validateStock } from '@/api/outbound'
import { getWarehouseList } from '@/api/inventory'
import { getStockList } from '@/api/stock'
import { getDistributionList, getDistributionDetail } from '@/api/distribution'

const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)

// 仓库列表
const warehouseList = ref([])
const warehouseLoading = ref(false)

// 投入品列表 (该仓库中有库存的投入品)
const materialList = ref([])
const materialLoading = ref(false)

// 分发单列表
const distributionList = ref([])
const distributionLoading = ref(false)

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

// 根据仓库加载有库存的投入品列表
const loadMaterialListByWarehouse = async (warehouseId) => {
  if (!warehouseId) {
    materialList.value = []
    return
  }

  materialLoading.value = true
  try {
    // 通过库存API获取该仓库中有库存的投入品
    const res = await getStockList({
      warehouseId: warehouseId,
      page: 1,
      pageSize: 1000
    })

    if (res.code === 200 && res.data && res.data.items) {
      // 去重,提取唯一的投入品及其库存信息（包含批次号、农资类型、品种）
      const materialMap = new Map()
      res.data.items.forEach(item => {
        if (item.quantity > 0) {
          const existingMaterial = materialMap.get(item.material_id)
          if (existingMaterial) {
            // 累加同一投入品的库存
            existingMaterial.available_quantity += item.quantity
            // 如果有批次号，优先使用第一个批次号
            if (!existingMaterial.material_batch_id && item.material_batch_id) {
              existingMaterial.material_batch_id = item.material_batch_id
            }
            // 如果有农资类型和品种，优先使用第一个
            if (!existingMaterial.agricultural_input_type && item.agricultural_input_type) {
              existingMaterial.agricultural_input_type = item.agricultural_input_type
            }
            if (!existingMaterial.variety && item.variety) {
              existingMaterial.variety = item.variety
            }
          } else {
            materialMap.set(item.material_id, {
              material_id: item.material_id,
              material_name: item.material_name,
              material_type: item.material_type || '',
              material_batch_id: item.material_batch_id || '',
              agricultural_input_type: item.agricultural_input_type || '',
              variety: item.variety || '',
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
  } finally{
    materialLoading.value = false
  }
}

const formData = reactive({
  outbound_type: 1,
  warehouse_id: '',
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
      agricultural_input_type: '',
      variety: '',
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

// 加载分发单列表
const loadDistributionList = async () => {
  distributionLoading.value = true
  try {
    const res = await getDistributionList()
    if (res.code === 200) {
      // 合并OSE→Union和Union→Woreda的分发单
      distributionList.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load distribution list:', error)
    ElMessage.error('加载分发单列表失败')
  } finally {
    distributionLoading.value = false
  }
}

// 分发单下拉框获取焦点时，检查是否选择了仓库
const handleDistributionFocus = () => {
  if (!formData.warehouse_id) {
    ElMessage.warning('请先选择出库仓库')
    return
  }
}

// 选择分发单后，自动带入明细
const handleDistributionChange = async (distributionId) => {
  if (!distributionId) {
    return
  }

  if (!formData.warehouse_id) {
   /* 请先选择出库仓库*/
    ElMessage.warning('Please select the outbound warehouse first')
    formData.related_order_no = ''
    return
  }

  try {
    // 获取分发单详情
    const res = await getDistributionDetail(distributionId)
    if (res.code === 200 && res.data) {
      const details = res.data.details || []

      if (details.length === 0) {
        /*该分发单没有明细信息 请手动录入*/
        ElMessage.warning('This distribution form does not contain detailed information. Please enter it manually')
        return
      }

      // 校验当前仓库是否有这些投入品的库存
      const insufficientItems = []
      const newDetails = []

      for (const detail of details) {
        // 从投入品列表中查找对应的投入品信息
        const material = materialList.value.find(m => m.material_id === detail.inputId)

        if (!material || material.available_quantity <= 0) {
          insufficientItems.push({
            name: detail.variety || detail.cropType || detail.inputId,
            required: detail.required || detail.quantity
          })
        } else {
          // 创建出库明细
          newDetails.push({
            material_id: detail.inputId || '',
            material_name: material.material_name || '',
            material_type: material.material_type || '',
            agricultural_input_type: detail.cropType || '',
            variety: detail.variety || '',
            material_batch_id: material.material_batch_id || '',
            quantity: detail.required || detail.quantity || null,
            spec_model: '',
            unit_of_measure: detail.unit || '',
            available_quantity: material.available_quantity || 0
          })
        }
      }

      // 如果有库存不足的投入品，提示用户
      if (insufficientItems.length > 0) {
        debugger;
        const itemNames = insufficientItems.map(item => `${item.name}(Demand：${item.required})`).join('、')

        ElMessageBox.confirm(
          `The following inputs are currently in insufficient stock in the warehouse：${itemNames}。Whether to continue？`,
          'Insufficient stock prompt',
          {
            confirmButtonText: 'continue',
            cancelButtonText: 'cancel',
            type: 'warning'
          }
        ).then(() => {
          // 用户选择继续，使用有库存的明细
          if (newDetails.length > 0) {
            formData.details = newDetails
            ElMessage.success(`Automatically brought in${newDetails.length}Itemized details`)
          } else {
            ElMessage.warning('There is no inventory of any of the inputs listed in this distribution order in the current warehouse')
          }
        }).catch(() => {
          // 用户取消，清空关联单号选择
          formData.related_order_no = ''
        })
      } else {
        // 全部有库存，直接替换明细
        formData.details = newDetails
        ElMessage.success(`Automatically brought in${newDetails.length}Itemized details`)
      }
    }
  } catch (error) {
    console.error('Failed to load distribution detail:', error)
    ElMessage.error('Failed to load the distribution sheet details')
    formData.related_order_no = ''
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 仓库变更时,清空所有明细的选择,并重新加载该仓库的投入品
const handleWarehouseChange = () => {
  // 清空所有明细选择
  formData.details.forEach(detail => {
    detail.material_id = ''
    detail.material_name = ''
    detail.material_type = ''
    detail.agricultural_input_type = ''
    detail.variety = ''
    detail.material_batch_id = ''
    detail.quantity = null
    detail.available_quantity = 0
  })

  // 重新加载该仓库有库存的投入品
  if (formData.warehouse_id) {
    loadMaterialListByWarehouse(formData.warehouse_id)
  } else {
    materialList.value = []
  }
}

// 投入品变更时,自动填充投入品名称、类型、农资类型、品种、批次号和可用库存
const handleMaterialChange = (index) => {
  const detail = formData.details[index]
  const selectedMaterial = materialList.value.find(m => m.material_id === detail.material_id)

  if (selectedMaterial) {
    detail.material_name = selectedMaterial.material_name
    detail.material_type = selectedMaterial.material_type
    detail.agricultural_input_type = selectedMaterial.agricultural_input_type
    detail.variety = selectedMaterial.variety
    detail.material_batch_id = selectedMaterial.material_batch_id
    detail.available_quantity = selectedMaterial.available_quantity
  } else {
    detail.material_name = ''
    detail.material_type = ''
    detail.agricultural_input_type = ''
    detail.variety = ''
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
    agricultural_input_type: '',
    variety: '',
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

    // 提交前校验库存是否充足
    try {
      const validateRes = await validateStock({
        warehouseId: formData.warehouse_id,
        details: formData.details.map(detail => ({
          materialId: detail.material_id,
          materialName: detail.material_name,
          quantity: detail.quantity
        }))
      })

      // 如果库存不足，提示用户
      if (!validateRes.data.valid) {
        const insufficientItems = validateRes.data.insufficient_items || []
        if (insufficientItems.length > 0) {
          const itemList = insufficientItems.map(item =>
            `${item.material_name}(需求：${item.required_quantity}，可用：${item.available_quantity}，缺少：${item.shortage})`
          ).join('<br/>')

          await ElMessageBox.confirm(
            `<div>以下投入品库存不足：<br/>${itemList}<br/><br/>是否仍要提交出库单？</div>`,
            '库存不足警告',
            {
              confirmButtonText: '仍要提交',
              cancelButtonText: '返回修改',
              type: 'warning',
              dangerouslyUseHTMLString: true
            }
          )
        } else {
          ElMessage.error(validateRes.data.message || '库存校验失败')
          submitLoading.value = false
          return
        }
      }
    } catch (validateError) {
      // 如果用户点击了取消，或者校验失败，中止提交
      if (validateError === 'cancel') {
        submitLoading.value = false
        return
      }
      console.error('Stock validation error:', validateError)
      // 校验失败不中断提交流程，继续提交
    }

    // 转换为驼峰形式
    const data = {
      outboundType: formData.outbound_type,
      warehouseId: formData.warehouse_id,
      relatedOrderNo: formData.related_order_no || undefined,
      outboundObjectId: formData.outbound_type === 1 ? 'CUSTOMER_DEFAULT' : formData.warehouse_id,
      outboundObjectName: formData.outbound_type === 1 ? 'Default account' : warehouseList.value.find(w => w.warehouse_id === formData.warehouse_id)?.warehouse_name || '',
      outboundUser: formData.outbound_user || undefined,
      outboundDept: formData.outbound_dept || undefined,
      operator: formData.operator,
      remark: formData.remark || undefined,
      details: formData.details.map(detail => ({
        materialId: detail.material_id,
        materialName: detail.material_name,
        materialType: detail.material_type,
        agriculturalInputType: detail.agricultural_input_type || undefined,
        variety: detail.variety || undefined,
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
  loadDistributionList()
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
