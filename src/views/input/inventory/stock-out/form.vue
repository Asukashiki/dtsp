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
                  :label="$t('input.inventory.stockOut.form.inputId')"
                  :prop="`details.${index}.inputId`"
                  :rules="detailRules.inputId"
                >
                  <el-select
                    v-model="item.inputId"
                    :placeholder="$t('input.inventory.stockOut.placeholder.inputId')"
                    filterable
                    clearable
                    class="full-width"
                    :loading="inputLoading"
                    @change="handleMaterialChange(index)"
                  >
                    <el-option
                      v-for="input in inputList"
                      :key="input.inputId"
                      :label="`${input.inputName} (${input.inputId})`"
                      :value="input.inputId"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockIn.form.inputType')"
                  :prop="`details.${index}.inputType`"
                  :rules="detailRules.inputType"
                >
                  <el-input
                    v-model="item.inputType"
                    :placeholder="$t('input.inventory.stockIn.placeholder.inputType')"
                    readonly
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.inputCategory')"
                  :prop="`details.${index}.agriculturalInputType`"
                >
                  <el-input
                    v-model="item.agriculturalInputType"
                    :placeholder="$t('input.inventory.stockOut.placeholder.inputCategory')"
                    readonly
                  />
                </el-form-item>

<!--                <el-form-item
                  :label="$t('input.inventory.stockOut.form.variety')"
                  :prop="`details.${index}.variety`"
                >
                  <el-input
                    v-model="item.variety"
                    :placeholder="$t('input.inventory.stockOut.placeholder.variety')"
                    readonly
                  />
                </el-form-item>-->

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.batchNo')"
                  :prop="`details.${index}.materialBatchId`"
                >
                  <el-input
                    v-model="item.materialBatchId"
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
                  :prop="`details.${index}.specModel`"
                >
                  <el-input
                    v-model="item.specModel"
                    :placeholder="$t('input.inventory.stockOut.placeholder.specModel')"
                    clearable
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('input.inventory.stockOut.form.unitOfMeasure')"
                  :prop="`details.${index}.unitOfMeasure`"
                >
                  <el-input
                    v-model="item.unitOfMeasure"
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
import { getInputList } from '@/api/input'
import { getDistributionList, getDistributionDetail } from '@/api/distribution'

const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)

// 当前用户部门ID
const currentUserOrganCode = ref('')

// 获取当前用户部门ID
const getCurrentUserOrganCode = () => {
  const userInfoStr = localStorage.getItem('userInfo')
  if (userInfoStr) {
    const userInfo = JSON.parse(userInfoStr)
    const user = userInfo.user || userInfo
    return user.ORGANCODE || ''
  }
  return ''
}

// 仓库列表
const warehouseList = ref([])
const warehouseLoading = ref(false)

// 投入品列表 (该仓库中有库存的投入品)
const materialList = ref([])
const materialLoading = ref(false)

// 所有投入品列表
const inputList = ref([])
const inputLoading = ref(false)

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
      status: '1', // 只获取启用的仓库
      organCode: currentUserOrganCode.value // 按部门过滤
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
          // 使用material_id作为键，因为API返回的是material_id而不是inputId
          const materialId = item.material_id;
          const existingMaterial = materialMap.get(materialId)
          if (existingMaterial) {
            // 累加同一投入品的库存
            existingMaterial.available_quantity += item.quantity
            // 如果有批次号，优先使用第一个批次号
            if (!existingMaterial.materialBatchId && item.material_batch_id) {
              existingMaterial.materialBatchId = item.material_batch_id
            }
            // 如果有农资类型和品种，优先使用第一个
            if (!existingMaterial.agriculturalInputType && item.agricultural_input_type) {
              existingMaterial.agriculturalInputType = item.agricultural_input_type
            }
            if (!existingMaterial.variety && item.variety) {
              existingMaterial.variety = item.variety
            }
          } else {
            materialMap.set(materialId, {
              inputId: materialId, // 使用material_id作为inputId
              inputName: item.material_name, // 使用material_name作为inputName
              inputType: item.material_type || '', // 使用material_type作为inputType
              materialBatchId: item.material_batch_id || '', // 使用material_batch_id
              // 确保agriculturalInputType字段被正确设置
              agriculturalInputType: item.agricultural_input_type || '',
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
  } finally {
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
      inputId: '',
      inputName: '',
      inputType: '',
      agriculturalInputType: '',
      variety: '',
      materialBatchId: '',
      quantity: null,
      specModel: '',
      unitOfMeasure: '',
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
  inputId: [
    { required: true, message: t('input.inventory.stockOut.rules.materialIdRequired'), trigger: 'change' }
  ],
  inputType: [
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

// 加载所有投入品列表
const loadInputList = async () => {
  inputLoading.value = true
  try {
    const res = await getInputList({
      page: 1,
      pageSize: 1000,
      status: 'active' // 只获取启用的投入品
    })
    if (res.code === 200) {
      // 确保每个投入品都有agriculturalInputType字段
      inputList.value = (res.data.list || []).map(item => ({
        ...item,
        // 确保agriculturalInputType字段存在，如果不存在则使用空字符串
        agriculturalInputType: item.agriculturalInputType || item.agricultural_input_type || ''
      }))
    }
  } catch (error) {
    console.error('Failed to load input list:', error)
  } finally {
    inputLoading.value = false
  }
}

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
      // 获取分发单中的明细列表，如果没有则设为空数组
      const details = res.data.details || []

      // 检查分发单是否有明细信息
      if (details.length === 0) {
        // 如果没有明细信息，显示警告提示并退出函数
        /*该分发单没有明细信息 请手动录入*/
        ElMessage.warning('This distribution form does not contain detailed information. Please enter it manually')
        return
      }

      // 初始化两个数组：一个用于存储库存不足的投入品，一个用于存储可以出库的投入品明细
      const insufficientItems = [] // 存储库存不足的投入品信息
      const newDetails = [] // 存储可以正常出库的投入品明细

      // 遍历分发单中的每个投入品明细
      for (const detail of details) {
        // 从当前仓库的投入品列表中查找对应的投入品信息

        console.log(materialList);
        console.log('detail.inputId:', detail.inputId, 'type:', typeof detail.inputId);

        // 使用更灵活的匹配方式，处理可能的类型不匹配问题
        const material = materialList.value.find(m => {
          // 确保两边都是字符串进行比较
          const materialId = String(m.inputId);
          const inputId = String(detail.inputId);
          console.log('Comparing:', materialId, 'with', inputId, 'result:', materialId === inputId);
          return materialId === inputId;
        });

        // 检查投入品是否存在或库存是否充足
        if (!material || material.available_quantity <= 0) {
          // 如果投入品不存在或库存不足，将其添加到库存不足列表
          insufficientItems.push({
            name: detail.variety || detail.cropType || detail.inputId, // 投入品名称，优先使用品种，其次是作物类型，最后是ID
            required: detail.required || detail.quantity // 所需数量
          })
        } else {
          // 如果库存充足，创建出库明细并添加到新明细列表
          newDetails.push({
            inputId: detail.inputId || '', // 投入品ID
            inputName: material.inputName || '', // 投入品名称
            inputType: material.inputType || '', // 投入品类型
            agriculturalInputType: detail.cropType || '', // 农资类型（来自分发单的作物类型）
            variety: detail.variety || '', // 品种
            materialBatchId: material.materialBatchId || '', // 物料批次号
            quantity: detail.required || detail.quantity || null, // 出库数量
            specModel: '', // 规格型号
            unitOfMeasure: detail.unit || '', // 计量单位
            available_quantity: material.available_quantity || 0 // 可用库存数量
          })
        }
      }

      // 检查是否有库存不足的投入品
      if (insufficientItems.length > 0) {
        // 将库存不足的投入品名称和需求量组合成字符串
        const itemNames = insufficientItems.map(item => `${item.name}(Demand：${item.required})`).join('、')

        // 显示确认对话框，询问用户是否继续处理有库存不足的出库单
        ElMessageBox.confirm(
            `The following inputs are currently in insufficient stock in the warehouse：${itemNames}。Whether to continue？`,
            'Insufficient stock prompt',
            {
              confirmButtonText: 'continue', // 确认按钮文本
              cancelButtonText: 'cancel', // 取消按钮文本
              type: 'warning' // 消息类型为警告
            }
        ).then(() => {
          // 用户选择继续处理
          if (newDetails.length > 0) {
            // 如果有可以出库的投入品，更新表单明细
            formData.details = newDetails
            ElMessage.success(`Automatically brought in${newDetails.length}Itemized details`) // 显示成功消息
          } else {
            // 如果没有任何投入品可以出库，显示警告消息
            ElMessage.warning('There is no inventory of any of the inputs listed in this distribution order in the current warehouse')
          }
        }).catch(() => {
          // 用户取消操作，清空关联单号选择
          formData.related_order_no = ''
        })
      } else {
        // 所有投入品库存都充足，直接替换表单明细
        formData.details = newDetails
        ElMessage.success(`Automatically brought in${newDetails.length}Itemized details`) // 显示成功消息
      }
    }
  } catch (error) {
    // 捕获并处理获取分发单详情时的错误
    console.error('Failed to load distribution detail:', error)
    ElMessage.error('Failed to load the distribution sheet details') // 显示错误消息
    formData.related_order_no = '' // 清空关联单号选择
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 仓库变更时,清空所有明细的库存信息,并重新加载已选择投入品的库存
const handleWarehouseChange = (warehouseId) => {
  // 清空所有明细的库存信息
  formData.details.forEach(detail => {
    detail.materialBatchId = ''
    detail.available_quantity = 0

    // 如果已选择投入品，则重新加载其库存信息
    if (detail.inputId) {
      loadStockForMaterial(detail)
    }
  })

  // 加载该仓库中有库存的投入品列表
  loadMaterialListByWarehouse(warehouseId)
}

// 投入品变更时,自动填充投入品名称、类型、农资类型、品种
const handleMaterialChange = (index) => {
  const detail = formData.details[index]
  const selectedInput = inputList.value.find(i => i.inputId === detail.inputId)

  if (selectedInput) {
    detail.inputName = selectedInput.inputName
    detail.inputType = getInputTypeText(selectedInput.type)
    // 确保agriculturalInputType字段被正确设置
    detail.agriculturalInputType = selectedInput.agriculturalInputType || selectedInput.agricultural_input_type || ''
    detail.variety = selectedInput.variety || ''
  } else {
    detail.inputName = ''
    detail.inputType = ''
    detail.agriculturalInputType = ''
    detail.variety = ''
  }

  // 如果已选择仓库，则加载该投入品的库存信息
  if (formData.warehouse_id && detail.inputId) {
    loadStockForMaterial(detail)
  } else {
    detail.materialBatchId = ''
    detail.available_quantity = 0
  }
}

// 加载特定投入品的库存信息
const loadStockForMaterial = async (detail) => {
  if (!formData.warehouse_id || !detail.inputId) {
    detail.materialBatchId = ''
    detail.available_quantity = 0
    return
  }

  try {
    const res = await getStockList({
      warehouseId: formData.warehouse_id,
      materialId: detail.inputId, // 使用materialId而不是inputId
      page: 1,
      pageSize: 1000
    })

    if (res.code === 200 && res.data && res.data.items) {
      // 计算总库存
      let totalQuantity = 0
      let materialBatchId = ''
      let agriculturalInputType = '' // 用于存储农资类型

      res.data.items.forEach(item => {
        if (item.quantity > 0) {
          totalQuantity += item.quantity
          // 使用第一个有库存的批次号，注意API返回的是material_batch_id
          if (!materialBatchId && item.material_batch_id) {
            materialBatchId = item.material_batch_id
          }
          // 如果还没有农资类型，则使用第一个有库存的农资类型
          if (!agriculturalInputType && item.agricultural_input_type) {
            agriculturalInputType = item.agricultural_input_type
          }
        }
      })

      detail.materialBatchId = materialBatchId
      detail.available_quantity = totalQuantity
      // 设置农资类型
      if (agriculturalInputType && !detail.agriculturalInputType) {
        detail.agriculturalInputType = agriculturalInputType
      }
    }
  } catch (error) {
    console.error('Failed to load stock for material:', error)
    detail.materialBatchId = ''
    detail.available_quantity = 0
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

// 添加明细
const addDetail = () => {
  formData.details.push({
    inputId: '',
    inputName: '',
    inputType: '',
    agriculturalInputType: '',
    variety: '',
    materialBatchId: '',
    quantity: null,
    specModel: '',
    unitOfMeasure: '',
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
      detail => !detail.inputId || !detail.inputType || !detail.quantity
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
          materialId: detail.inputId,
          materialName: detail.inputName,
          quantity: detail.quantity
        }))
      })

      // 如果库存不足，提示用户
      if (!validateRes.data.valid) {
        const insufficientItems = validateRes.data.insufficient_items || []
        if (insufficientItems.length > 0) {
          const itemList = insufficientItems.map(item =>
            `${item.material_name}(Demand：${item.required_quantity}，Available：${item.available_quantity}，Lacking：${item.shortage})`
          ).join('<br/>')

          await ElMessageBox.confirm(
            `<div>The inventory of the following inputs is insufficient：<br/>${itemList}<br/><br/>Is it still necessary to submit the outbound order？</div>`,
            '库存不足警告',
            {
              confirmButtonText: 'Still need to be submitted',
              cancelButtonText: 'Return to modify',
              type: 'warning',
              dangerouslyUseHTMLString: true
            }
          )
        } else {
          ElMessage.error(validateRes.data.message || 'Inventory verification failed')
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
  debugger;
    // 转换为驼峰形式
    const data = {
      outboundType: formData.outbound_type,
      warehouseId: formData.warehouse_id,
      relatedOrderNo: formData.related_order_no || undefined,
      outboundObjectId: formData.outbound_type === 1 ? '' : formData.warehouse_id,
      outboundObjectName: formData.outbound_type === 1 ? 'Default account' : warehouseList.value.find(w => w.warehouse_id === formData.warehouse_id)?.warehouse_name || '',
      outboundUser: formData.outbound_user || undefined,
      outboundDept: formData.outbound_dept || undefined,
      operator: formData.operator,
      remark: formData.remark || undefined,
      details: formData.details.map(detail => ({
        materialId: detail.inputId,
        materialName: detail.inputName,
        materialType: detail.inputType,
        agriculturalInputType: detail.agriculturalInputType || undefined,
        variety: detail.variety || undefined,
        materialBatchId: detail.materialBatchId || undefined,
        quantity: detail.quantity,
        specModel: detail.specModel || undefined,
        unitOfMeasure: detail.unitOfMeasure || undefined
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
  currentUserOrganCode.value = getCurrentUserOrganCode()
  loadWarehouseList()
  loadInputList() // 加载所有投入品列表
  loadDistributionList()

  // 获取用户信息并自动填充出库员和出库部门
  const userInfoStr = localStorage.getItem('userInfo')
  if (userInfoStr) {
    const userInfo = JSON.parse(userInfoStr)
    const user = userInfo.user || userInfo
    console.log(user)

    // 自动填充出库员（优先使用USERNAME，其次使用REALNAME）
    formData.outbound_user = user.USERNAME || user.REALNAME || user.username || user.realName || ''

    // 自动填充出库部门
    formData.outbound_dept = user.ORGANNAME || ''
  }
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
