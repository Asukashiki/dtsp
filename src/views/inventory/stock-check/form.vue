<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        :icon="isEdit ? 'ri-edit-line' : 'ri-file-add-line'"
        :title="isEdit ? $t('stockCheck.editTitle') : $t('stockCheck.addTitle')"
        class="page-header-green"
      />

      <div class="content-wrapper padding-bottom mb-16">
        <InfoCard :title="$t('stockCheck.sections.basicInfo')" icon="ri-information-line">
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-width="140px"
            class="max-w-4xl stock-check-form"
          >
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item :label="$t('stockCheck.fields.checkDate')" prop="checkDate">
                  <el-date-picker
                    v-model="form.checkDate"
                    type="date"
                    value-format="YYYY-MM-DD"
                    style="width: 100%"
                    :disabled="isEdit"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('stockCheck.fields.warehouseName')" prop="warehouseId">
                  <el-select
                    v-model="form.warehouseId"
                    style="width: 100%"
                    :disabled="isEdit"
                    @change="handleWarehouseChange"
                  >
                    <el-option
                      v-for="item in warehouseOptions"
                      :key="item.id"
                      :label="item.warehouseName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('stockCheck.fields.checkRemark')" prop="checkRemark">
                  <el-input
                    v-model="form.checkRemark"
                    type="textarea"
                    rows="2"
                    maxlength="500"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </InfoCard>

        <InfoCard :title="$t('stockCheck.sections.checkDetail')" icon="ri-list-check" class="mt-4">
          <div v-loading="loadingDetails">
            <el-empty v-if="!form.warehouseId" :description="$t('stockCheck.messages.selectWarehouseToLoad')" />
            <el-empty v-else-if="form.details.length === 0" :description="$t('stockCheck.messages.noInventoryItems')" />
            <template v-else>
              <el-table
                :data="form.details"
                border
                stripe
                table-layout="fixed"
                style="width: 100%"
                class="hide-last-col-border stock-check-details-table"
              >
                <el-table-column
                  prop="productName"
                  :label="$t('stockCheck.fields.productName')"
                  width="180"
                  fixed="left"
                  show-overflow-tooltip
                  class-name="stock-check-ellipsis"
                />
                <el-table-column
                  prop="categoryMajor"
                  :label="$t('stockCheck.fields.categoryMajor')"
                  width="100"
                  show-overflow-tooltip
                  class-name="stock-check-ellipsis"
                />
                <el-table-column
                  prop="categoryMinor"
                  :label="$t('stockCheck.fields.categoryMinor')"
                  width="100"
                  show-overflow-tooltip
                  class-name="stock-check-ellipsis"
                />
                <el-table-column
                  prop="batchNo"
                  :label="$t('stockCheck.fields.batchNo')"
                  width="120"
                  show-overflow-tooltip
                  class-name="stock-check-ellipsis"
                />
                <el-table-column
                  prop="unit"
                  :label="$t('stockCheck.fields.unit')"
                  width="80"
                  show-overflow-tooltip
                  class-name="stock-check-ellipsis"
                />
                
                <el-table-column prop="systemQty" :label="$t('stockCheck.fields.systemQty')" width="100">
                  <template #default="{ row }">
                    <span class="text-blue-700 font-bold">{{ row.systemQty }}</span>
                  </template>
                </el-table-column>
                
                <el-table-column :label="$t('stockCheck.fields.actualQty')" width="140" align="center" fixed="right">
                  <template #default="{ row }">
                    <el-input-number
                      v-model="row.actualQty"
                      :min="0"
                      :precision="3"
                      :controls="false"
                      style="width: 100%"
                      @change="calcDiff(row)"
                    />
                  </template>
                </el-table-column>

                <el-table-column :label="$t('stockCheck.fields.diffQty')" width="100" align="center" fixed="right">
                  <template #default="{ row }">
                    <span :class="{'text-[#F59E0B] font-bold': row.diffType === 'SURPLUS', 'text-[#DA121A] font-bold': row.diffType === 'LOSS'}">
                      <span v-if="row.diffQty > 0">+</span>{{ row.diffQty }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  :label="$t('stockCheck.fields.diffType')"
                  width="140"
                  align="center"
                  header-align="center"
                  fixed="right"
                  class-name="diff-type-column"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.diffType === 'SURPLUS'" class="diff-type-tag border-[#F59E0B] text-[#F59E0B]" type="warning" color="#FFF7ED">
                      {{ $t('stockCheck.diffType.SURPLUS') }}
                    </el-tag>
                    <el-tag v-else-if="row.diffType === 'LOSS'" class="diff-type-tag border-[#DA121A] text-[#DA121A]" type="danger" color="#FEF2F2">
                      {{ $t('stockCheck.diffType.LOSS') }}
                    </el-tag>
                    <span v-else class="text-gray-400">{{ $t('stockCheck.diffType.NONE') }}</span>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('stockCheck.fields.itemRemark')" min-width="150" fixed="right">
                  <template #default="{ row }">
                    <el-input
                      v-model="row.itemRemark"
                      :placeholder="row.diffType !== 'NONE' && row.diffType
                        ? $t('stockCheck.placeholders.required')
                        : $t('stockCheck.placeholders.optional')"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </InfoCard>
      </div>

      <div class="form-actions">
        <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">
          {{ $t('stockCheck.actions.submitReview') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import { getWarehouseInventory, createStockCheck, updateStockCheck, getStockCheckDetail } from '@/api/stockCheck'
import { getWarehouseManageList } from '@/api/inventory'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const isEdit = computed(() => !!route.params.id)
const checkId = computed(() => route.params.id)

const formRef = ref(null)
const loadingDetails = ref(false)
const saving = ref(false)
const submitting = ref(false)

const warehouseOptions = ref([])

const form = reactive({
  checkDate: dayjs().format('YYYY-MM-DD'),
  warehouseId: '',
  checkRemark: '',
  details: []
})

const rules = computed(() => ({
  checkDate: [{ required: true, message: t('stockCheck.validation.checkDateRequired'), trigger: 'change' }],
  warehouseId: [{ required: true, message: t('stockCheck.validation.warehouseRequired'), trigger: 'change' }]
}))


const loadWarehouses = async () => {
  try {
    const res = await getWarehouseManageList({ page: 1, pageSize: 1000 })
    const list = res.data?.list || res.data?.records || res.rows || res.records || []
    warehouseOptions.value = list
      .map(item => ({
        ...item,
        id: item.id ?? item.warehouseId ?? item.warehouse_id,
        warehouseName: item.warehouseName ?? item.warehouse_name ?? item.name
      }))
      .filter(item => item.id && item.warehouseName)
  } catch (error) {
    console.error('Failed to load warehouses', error)
  }
}

const extractInventoryItems = (payload) => {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.rows)) return payload.rows
  const candidates = [
    payload.items,
    payload.list,
    payload.records,
    payload.details,
    payload.data,
    payload.rows
  ]
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate
    if (candidate && Array.isArray(candidate.list)) return candidate.list
    if (candidate && Array.isArray(candidate.records)) return candidate.records
  }
  for (const value of Object.values(payload)) {
    if (Array.isArray(value)) return value
    if (value && Array.isArray(value.list)) return value.list
    if (value && Array.isArray(value.records)) return value.records
  }
  return []
}

const handleWarehouseChange = async (newId) => {
  if (!newId) {
    form.details = []
    return
  }
  loadingDetails.value = true
  try {
    const res = await getWarehouseInventory(newId)
    const items = extractInventoryItems(res)
    if (!items.length) {
      console.warn('No inventory items parsed', res)
    }
    form.details = items.map(item => ({
      ...item,
      productName: item.productName || item.material_name || item.input_name || item.materialName || item.name || '',
      categoryMajor: item.mainCategory || item.material_type || item.category_major || item.categoryMajor || item.agricultural_input_type || '',
      categoryMinor: item.subCategory || item.agricultural_input_type || item.category_minor || item.categoryMinor || '',
      batchNo: item.material_batch_id || item.batch_no || item.batchNo || '',
      unit: item.unit || item.material_unit || item.unitName || item.skuUnit || '',
      systemQty: item.availableQty ?? item.available_qty ?? item.quantity ?? item.current_quantity ?? item.currentQty ?? item.systemQty ?? 0,
      actualQty: null,
      diffType: 'NONE',
      diffQty: 0,
      itemRemark: ''
    }))
  } catch (error) {
    console.error('Failed to load warehouse inventory', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loadingDetails.value = false
  }
}

const loadDetail = async () => {
  if (!isEdit.value) return
  try {
    const res = await getStockCheckDetail(checkId.value)
    if (res.data) {
      Object.assign(form, {
        checkDate: res.data.checkDate,
        warehouseId: res.data.warehouseId,
        checkRemark: res.data.checkRemark || '',
        details: res.data.details || []
      })
    }
  } catch (error) {
    console.error('Failed to load detail', error)
  }
}

const calcDiff = (row) => {
  if (row.actualQty === null || row.actualQty === '') {
    row.diffType = 'NONE'
    row.diffQty = 0
    return
  }
  row.diffQty = Number((row.actualQty - row.systemQty).toFixed(3))
  if (row.diffQty > 0) row.diffType = 'SURPLUS'
  else if (row.diffQty < 0) row.diffType = 'LOSS'
  else row.diffType = 'NONE'
}

const validateDetails = () => {
  if (form.details.length === 0) {
    ElMessage.warning(t('stockCheck.messages.noItemsForCheck'))
    return false
  }
  if (form.details.some(r => r.actualQty === null || r.actualQty === '')) {
    ElMessage.warning(t('stockCheck.validation.actualQtyRequired'))
    return false
  }
  if (form.details.some(r => r.actualQty < 0)) {
    ElMessage.warning(t('stockCheck.validation.actualQtyMin'))
    return false
  }
  if (form.details.some(r => r.diffType !== 'NONE' && !r.itemRemark)) {
    ElMessage.warning(t('stockCheck.validation.itemRemarkRequired'))
    return false
  }
  return true
}

const processSubmit = async (status) => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  
  if (status === 'PENDING' && !validateDetails()) {
    return
  }

  const payload = { ...form, checkStatus: status }

  try {
    if (status === 'PENDING') {
      saving.value = true
    } else {
      submitting.value = true
    }

    if (isEdit.value) {
      await updateStockCheck(checkId.value, payload)
    } else {
      await createStockCheck(payload)
    }

    if (status === 'PENDING') {
      ElMessage.success(t('stockCheck.messages.submitSuccess'))
    } else {
      ElMessage.success(t('stockCheck.messages.createSuccess'))
    }
    
    router.replace('/inventory/stock-check')
  } catch (error) {
    console.error('Submit failed', error)
  } finally {
    saving.value = false
    submitting.value = false
  }
}

const handleSaveDraft = () => processSubmit('DRAFT')
const handleSubmit = async () => {
  await ElMessageBox.confirm(
    t('stockCheck.messages.submitConfirm'),
    t('common.warning'),
    { type: 'warning' }
  )
  processSubmit('PENDING')
}

const handleBack = () => {
  router.push('/inventory/stock-check')
}

onMounted(async () => {
  await loadWarehouses()
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

:deep(.page-header-green) {
  background-color: #009A44 !important;
  color: white !important;

  .title, .subtitle, .ri-icon {
    color: white !important;
  }
}

.padding-bottom {
  padding-bottom: 60px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin: 24px 20px 12px;
}

:deep(.stock-check-form .el-form-item__label) {
  line-height: 1.4;
  white-space: normal;
  word-break: break-word;
}

@media screen and (max-width: 768px) {
  :deep(.stock-check-form .el-form-item__label) {
    width: 110px !important;
  }
}

@media screen and (max-width: 768px) {
  .pc-summary {
    .flex {
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
    }
  }
}

:deep(.el-table .el-table__row) {
  &.surplus-row {
    background-color: #FFF7ED;
  }
  &.loss-row {
    background-color: #FEF2F2;
  }
}

:deep(.stock-check-details-table .el-table__body .cell) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.stock-check-details-table .diff-type-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  text-overflow: clip;
}

:deep(.stock-check-details-table .diff-type-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}

:deep(.stock-check-details-table .el-input__inner),
:deep(.stock-check-details-table .el-input-number__input) {
  white-space: nowrap;
}
</style>
