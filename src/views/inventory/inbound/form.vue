<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        :title="$t('inventory.inbound.add')"
        :show-back="true"
        @back="handleBack" />

      <div class="content-wrapper">
        <InfoCard :title="$t('common.basicInfo')" icon="ri-file-info-line">
          <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="responsive-form">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.inbound.no')" prop="inboundNo">
                  <el-input v-model="form.inboundNo" :placeholder="$t('inventory.inbound.no')" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.inbound.types')" prop="type">
                  <el-select v-model="form.type" :placeholder="$t('inventory.inbound.types')" style="width: 100%">
                    <el-option :label="$t('inventory.inbound.type.general')" value="GENERAL" />
                    <el-option :label="$t('inventory.inbound.type.transfer')" value="TRANSFER" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.inbound.warehouse')" prop="warehouseId">
                  <el-select v-model="form.warehouseId" :placeholder="$t('inventory.inbound.warehouse')" style="width: 100%">
                    <el-option v-for="item in warehouseOptions" :key="item.id" :label="item.warehouseName" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.inbound.bizNo')" prop="bizNo">
                  <el-input v-model="form.bizNo" :placeholder="$t('inventory.inbound.bizNo')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.inbound.operator')" prop="operator">
                  <el-input v-model="form.operator" :placeholder="$t('inventory.inbound.operator')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item :label="$t('inventory.inbound.orderDate')" prop="orderDate">
                  <el-date-picker v-model="form.orderDate" type="datetime" :placeholder="$t('inventory.inbound.orderDate')" style="width: 100%" />
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

        <InfoCard :title="$t('inventory.inbound.detailList')" icon="ri-list-check">
          <div class="items-list">
            <div v-for="(item, index) in form.detailList" :key="index" class="item-row">
              <div class="item-fields">
                <el-form-item :label="$t('inventory.inbound.detail.product')" :prop="`detailList.${index}.inputId`" :rules="detailRules.inputId">
                  <el-select
                    v-model="item.inputId"
                    :placeholder="$t('inventory.inbound.detail.product')"
                    filterable
                    clearable
                    style="width: 100%"
                    @change="(val) => handleInputChange(val, item)">
                    <el-option
                      v-for="input in inputList"
                      :key="input.inputId"
                      :label="input.inputName"
                      :value="input.inputId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('inventory.inbound.detail.batchNo')" :prop="`detailList.${index}.batchNo`">
                  <el-input v-model="item.batchNo" :placeholder="$t('inventory.inbound.detail.batchNo')" clearable />
                </el-form-item>
                <el-form-item :label="$t('inventory.inbound.detail.supplier')" :prop="`detailList.${index}.supplier`">
                  <el-input v-model="item.supplier" :placeholder="$t('inventory.inbound.detail.supplier')" clearable />
                </el-form-item>
                <el-form-item :label="$t('inventory.inbound.detail.planQty')" :prop="`detailList.${index}.planQty`" :rules="detailRules.planQty">
                  <el-input-number v-model="item.planQty" :min="0" :precision="2" :placeholder="$t('inventory.inbound.detail.planQty')" style="width: 100%" />
                </el-form-item>
                <el-form-item :label="$t('inventory.inbound.detail.realQty')" :prop="`detailList.${index}.realQty`" :rules="detailRules.realQty">
                  <el-input-number v-model="item.realQty" :min="0" :precision="2" :placeholder="$t('inventory.inbound.detail.realQty')" style="width: 100%" />
                </el-form-item>
                <el-form-item :label="$t('inventory.inbound.detail.unit')" :prop="`detailList.${index}.unit`" :rules="detailRules.unit">
                  <el-input v-model="item.unit" :placeholder="$t('inventory.inbound.detail.unit')" clearable />
                </el-form-item>
                <el-form-item :label="$t('inventory.inbound.detail.expireDate')" :prop="`detailList.${index}.expireDate`">
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

        <div class="form-actions">
          <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addInbound, getWarehouseList, getProductList } from '@/api/inventory'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const submitting = ref(false)
const warehouseOptions = ref([])
const inputList = ref([])

const generateInboundNo = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `IN${year}${month}${day}${random}`
}

const form = reactive({
  inboundNo: '',
  type: '',
  warehouseId: '',
  bizNo: '',
  operator: '',
  orderDate: new Date(),
  remark: '',
  detailList: [
    {
      inputId: '',
      inputCode: '',
      batchNo: '',
      supplier: '',
      planQty: 0,
      realQty: 0,
      unit: '',
      expireDate: ''
    }
  ]
})

const rules = {
  type: [{ required: true, message: t('common.required'), trigger: 'change' }],
  warehouseId: [{ required: true, message: t('common.required'), trigger: 'change' }],
  orderDate: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

const detailRules = {
  inputId: [{ required: true, message: t('common.required'), trigger: 'change' }],
  planQty: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  realQty: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  unit: [{ required: true, message: t('common.required'), trigger: 'blur' }]
}

const handleBack = () => {
  router.back()
}

const handleAddDetail = () => {
  form.detailList.push({
    inputId: '',
    inputCode: '',
    batchNo: '',
    supplier: '',
    planQty: 0,
    realQty: 0,
    unit: '',
    expireDate: ''
  })
}

const handleDeleteDetail = (index) => {
  form.detailList.splice(index, 1)
}

const handleInputChange = (inputId, row) => {
  const input = inputList.value.find(item => item.inputId === inputId)
  if (input) {
    row.inputId = input.inputId
    row.inputCode = input.inputSku || ''
    row.unit = input.unit || '件'
  } else {
    row.inputCode = ''
    row.unit = ''
  }
}

const loadWarehouses = () => {
  getWarehouseList({ pageSize: 1000 }).then(res => {
    warehouseOptions.value = res.rows || []
  }).catch(() => {
    warehouseOptions.value = []
  })
}

const loadProducts = () => {
  getProductList({ pageSize: 1000 }).then(res => {
    inputList.value = res.rows || []
  }).catch(() => {
    inputList.value = []
  })
}

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (form.detailList.length === 0) {
        ElMessage.warning(t('inventory.inbound.detailRequired'))
        return
      }
      const hasEmptyDetail = form.detailList.some(item => !item.inputId || !item.unit)
      if (hasEmptyDetail) {
        ElMessage.warning(t('inventory.inbound.detailRequired'))
        return
      }
      submitting.value = true
      addInbound(form).then(() => {
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

onMounted(() => {
  form.inboundNo = generateInboundNo()
  loadWarehouses()
  loadProducts()
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
