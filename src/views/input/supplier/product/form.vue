<template>
  <div class="supplier-product-form-page">
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
          <h1 class="page-title">{{ isEdit ? $t('input.supplier.product.edit') : $t('input.supplier.product.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-position="top" class="product-form">
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('input.catalog.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.supplier.product.form.supplierId')" prop="supplierId">
              <el-select
                v-model="formData.supplierId"
                :placeholder="$t('input.supplier.product.placeholder.supplierId')"
                filterable
                class="full-width"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in supplierOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('input.supplier.product.form.inputId')" prop="inputId">
              <el-select
                v-model="formData.inputId"
                :placeholder="$t('input.supplier.product.placeholder.inputId')"
                filterable
                remote
                :remote-method="handleInputSearch"
                :loading="inputSearchLoading"
                class="full-width"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in inputOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('input.supplier.product.form.supplierProductCode')" prop="supplierProductCode">
              <el-input
                v-model="formData.supplierProductCode"
                :placeholder="$t('input.supplier.product.placeholder.supplierProductCode')"
                maxlength="100"
                show-word-limit
              />
            </el-form-item>

            <el-form-item :label="$t('input.supplier.product.form.supplierProductName')" prop="supplierProductName">
              <el-input
                v-model="formData.supplierProductName"
                :placeholder="$t('input.supplier.product.placeholder.supplierProductName')"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>

            <el-form-item :label="$t('input.supplier.product.form.qualityRating')" prop="qualityRating">
              <el-select
                v-model="formData.qualityRating"
                :placeholder="$t('input.supplier.product.placeholder.qualityRating')"
                class="full-width"
              >
                <el-option label="A" value="A">
                  <span>A - {{ $t('input.supplier.product.qualityRating.A') }}</span>
                </el-option>
                <el-option label="B" value="B">
                  <span>B - {{ $t('input.supplier.product.qualityRating.B') }}</span>
                </el-option>
                <el-option label="C" value="C">
                  <span>C - {{ $t('input.supplier.product.qualityRating.C') }}</span>
                </el-option>
                <el-option label="D" value="D">
                  <span>D - {{ $t('input.supplier.product.qualityRating.D') }}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('input.supplier.product.form.notes')" prop="notes" class="full-width-item">
              <el-input
                v-model="formData.notes"
                type="textarea"
                :rows="4"
                :placeholder="$t('input.supplier.product.placeholder.notes')"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="saveLoading" @click="handleSubmit">
            {{ $t('common.save') }}
          </el-button>
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
import {
  getSupplierCertList,
  getSupplierProductDetail,
  addSupplierProduct,
  updateSupplierProduct
} from '@/api/supplier'
import { getInputList } from '@/api/input'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const saveLoading = ref(false)
const isEdit = computed(() => !!route.params.id)

// 供应商选项
const supplierOptions = ref([])
// 投入品选项
const inputOptions = ref([])
// 投入品搜索加载状态
const inputSearchLoading = ref(false)

// 表单数据
const formData = reactive({
  supplierId: '',
  inputId: '',
  supplierProductCode: '',
  supplierProductName: '',
  qualityRating: '',
  notes: ''
})

// 表单验证规则
const formRules = computed(() => ({
  supplierId: [
    { required: true, message: t('input.supplier.product.rules.supplierIdRequired'), trigger: 'change' }
  ],
  inputId: [
    { required: true, message: t('input.supplier.product.rules.inputIdRequired'), trigger: 'change' }
  ],
  supplierProductCode: [
    { max: 100, message: t('input.supplier.product.rules.supplierProductCodeLength'), trigger: 'blur' }
  ],
  supplierProductName: [
    { max: 200, message: t('input.supplier.product.rules.supplierProductNameLength'), trigger: 'blur' }
  ],
  notes: [
    { max: 500, message: t('input.supplier.product.rules.notesLength'), trigger: 'blur' }
  ]
}))

// 返回
const goBack = () => {
  router.back()
}

// 获取供应商列表
const fetchSuppliers = async () => {
  try {
    const res = await getSupplierCertList({ status: 2, pageSize: 1000 })
    if (res.code === 200 && res.data) {
      supplierOptions.value = (res.data.list || []).map(item => ({
        label: item.org_name,
        value: String(item.user_id)
      }))
    }
  } catch (error) {
    console.error('Failed to fetch suppliers:', error)
  }
}

// 获取投入品列表
const fetchInputs = async (keyword = '') => {
  try {
    const res = await getInputList({
      keyword,
      pageSize: 1000,
      status: 'active'
    })
    if (res.code === 200 && res.data) {
      inputOptions.value = (res.data.list || []).map(item => ({
        label: `${item.input_name}${item.input_sku ? ' (' + item.input_sku + ')' : ''}`,
        value: String(item.input_id),
        type: item.type
      }))
    }
  } catch (error) {
    console.error('Failed to fetch inputs:', error)
  }
}

// 投入品远程搜索
const handleInputSearch = async (query) => {
  if (query) {
    inputSearchLoading.value = true
    try {
      await fetchInputs(query)
    } finally {
      inputSearchLoading.value = false
    }
  } else {
    fetchInputs()
  }
}

// 加载详情(编辑模式)
const loadDetail = async () => {
  try {
    const res = await getSupplierProductDetail(route.params.id)
    if (res.code === 200 && res.data) {
      formData.supplierId = String(res.data.supplier_id)
      formData.inputId = String(res.data.input_id)
      formData.supplierProductCode = res.data.supplier_product_code || ''
      formData.supplierProductName = res.data.supplier_product_name || ''
      formData.qualityRating = res.data.quality_rating || ''
      formData.notes = res.data.notes || ''
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      saveLoading.value = true
      try {
        const data = {
          supplierId: formData.supplierId,
          inputId: formData.inputId,
          supplierProductCode: formData.supplierProductCode,
          supplierProductName: formData.supplierProductName,
          qualityRating: formData.qualityRating,
          notes: formData.notes
        }

        let res
        if (isEdit.value) {
          res = await updateSupplierProduct(route.params.id, data)
        } else {
          res = await addSupplierProduct(data)
        }

        if (res.code === 200) {
          ElMessage.success(isEdit.value ? t('input.supplier.product.editSuccess') : t('input.supplier.product.addSuccess'))
          setTimeout(() => router.back(), 1000)
        } else {
          ElMessage.error(res.msg || t('common.failed'))
        }
      } catch (error) {
        console.error('Failed to save:', error)
        ElMessage.error(t('common.failed'))
      } finally {
        saveLoading.value = false
      }
    }
  })
}

onMounted(async () => {
  await fetchSuppliers()
  await fetchInputs()
  if (isEdit.value) {
    await loadDetail()
  }
})
</script>

<style scoped>
.supplier-product-form-page {
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .form-grid {
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

  .form-wrapper {
    padding: 16px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }
}
</style>
