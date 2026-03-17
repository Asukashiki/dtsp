<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ pageTitle }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="submitLoading">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12"><el-form-item :label="$t('input.inventory.productManage.form.productCode')" prop="productCode"><el-input v-model="formData.productCode" maxlength="64" clearable disabled /></el-form-item></el-col>
                <el-col :xs="24" :sm="12"><el-form-item :label="$t('input.inventory.productManage.form.productName')" prop="productName"><el-input v-model="formData.productName" :placeholder="$t('input.inventory.productManage.placeholder.productName')" maxlength="100" clearable /></el-form-item></el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.productManage.form.mainCategory')" prop="mainCategoryId">
                    <el-select
                      v-model="formData.mainCategoryId"
                      :placeholder="$t('input.inventory.productManage.placeholder.mainCategory')"
                      style="width: 100%"
                      filterable
                      @change="handleMainCategoryChange">
                      <el-option
                        v-for="item in mainCategoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.inventory.productManage.form.subCategory')" prop="subCategoryId">
                    <el-select
                      v-model="formData.subCategoryId"
                      :placeholder="$t('input.inventory.productManage.placeholder.subCategory')"
                      style="width: 100%"
                      filterable
                      :disabled="!formData.mainCategoryId"
                      @change="handleSubCategoryChange">
                      <el-option
                        v-for="item in filteredSubCategoryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12"><el-form-item :label="$t('input.inventory.productManage.form.brand')"><el-input v-model="formData.brand" :placeholder="$t('input.inventory.productManage.placeholder.brand')" maxlength="100" clearable /></el-form-item></el-col>
                <el-col :xs="24" :sm="12"><el-form-item :label="$t('input.inventory.productManage.form.model')"><el-input v-model="formData.model" :placeholder="$t('input.inventory.productManage.placeholder.model')" maxlength="100" clearable /></el-form-item></el-col>
                <el-col :xs="24" :sm="12"><el-form-item :label="$t('input.inventory.productManage.form.unit')" prop="unit"><el-input v-model="formData.unit" :placeholder="$t('input.inventory.productManage.placeholder.unit')" maxlength="20" clearable /></el-form-item></el-col>
                <el-col :xs="24" :sm="12"><el-form-item :label="$t('input.inventory.productManage.form.price')" prop="price"><el-input-number v-model="formData.price" :min="0" :precision="2" style="width: 100%" /></el-form-item></el-col>
                <el-col :xs="24" :sm="12"><el-form-item :label="$t('input.inventory.productManage.form.licenseNo')"><el-input v-model="formData.licenseNo" :placeholder="$t('input.inventory.productManage.placeholder.licenseNo')" maxlength="100" clearable /></el-form-item></el-col>
                <el-col :xs="24" :sm="12"><el-form-item :label="$t('input.inventory.productManage.form.status')" prop="status"><el-radio-group v-model="formData.status"><el-radio label="0">{{ $t('input.inventory.productManage.status.enabled') }}</el-radio><el-radio label="1">{{ $t('input.inventory.productManage.status.disabled') }}</el-radio></el-radio-group></el-form-item></el-col>
                <el-col :xs="24" :sm="24"><el-form-item :label="$t('input.inventory.productManage.form.remark')"><el-input v-model="formData.remark" type="textarea" :rows="3" maxlength="500" show-word-limit :placeholder="$t('input.inventory.productManage.placeholder.remark')" /></el-form-item></el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{ $t('common.save') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addProductManage, getProductManage, updateProductManage } from '@/api/productManage'
import { getDicts } from '@/api/system/dict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)

const isEdit = computed(() => route.path.includes('/edit/'))
const productId = computed(() => route.params.id)
const pageTitle = computed(() => isEdit.value ? t('input.inventory.productManage.edit') : t('input.inventory.productManage.add'))

const mainCategoryOptions = ref([])
const subCategoryOptions = ref([])

const formData = reactive({
  id: undefined,
  productCode: '',
  productName: '',
  categoryId: undefined,
  categoryName: '',
  mainCategoryId: '',
  mainCategory: '',
  parentId: null,
  subCategoryId: '',
  subCategory: '',
  brand: '',
  model: '',
  unit: '',
  price: 0,
  licenseNo: '',
  status: '0',
  remark: ''
})

const rules = computed(() => ({
  productCode: [{ required: true, message: t('input.inventory.productManage.rules.productCodeRequired'), trigger: 'blur' }],
  productName: [{ required: true, message: t('input.inventory.productManage.rules.productNameRequired'), trigger: 'blur' }],
  mainCategoryId: [{ required: true, message: t('input.inventory.productManage.rules.mainCategoryRequired'), trigger: 'change' }],
  subCategoryId: [{ required: true, message: t('input.inventory.productManage.rules.subCategoryRequired'), trigger: 'change' }],
  unit: [{ required: true, message: t('input.inventory.productManage.rules.unitRequired'), trigger: 'blur' }],
  price: [{ required: true, message: t('input.inventory.productManage.rules.priceRequired'), trigger: 'change' }],
  status: [{ required: true, message: t('input.inventory.productManage.rules.statusRequired'), trigger: 'change' }]
}))

const filteredSubCategoryOptions = computed(() => {
  if (!formData.mainCategoryId) return []
  const mainValue = String(formData.mainCategoryId)
  return subCategoryOptions.value.filter(item => String(item.parentValue) === mainValue)
})

const goBack = () => {
  router.back()
}

const loadDetail = async () => {
  if (!isEdit.value) return
  try {
    const res = await getProductManage(productId.value)
    if (res.code === 200 && res.data) {
      const parentIdValue = res.data.parent_id ?? null
      const mainCategoryIdValue = resolveDictValue(mainCategoryOptions.value, res.data.main_category)
      const subCategoryIdValue = resolveDictValue(subCategoryOptions.value, res.data.sub_category)
      Object.assign(formData, {
        id: res.data.id,
        productCode: res.data.product_code || '',
        productName: res.data.product_name || '',
        categoryId: res.data.category_id || undefined,
        categoryName: res.data.category_name || '',
        mainCategoryId: mainCategoryIdValue,
        mainCategory: res.data.main_category || '',
        parentId: parentIdValue,
        subCategoryId: subCategoryIdValue,
        subCategory: res.data.sub_category || '',
        brand: res.data.brand || '',
        model: res.data.model || '',
        unit: res.data.unit || '',
        price: Number(res.data.price || 0),
        licenseNo: res.data.license_no || '',
        status: res.data.status || '0',
        remark: res.data.remark || ''
      })
    }
  } catch (error) {
    console.error('Failed to load product detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true

    const mainCategoryId = formData.mainCategoryId
    const selectedMain = mainCategoryOptions.value.find(item => String(item.value) === String(mainCategoryId))
    const mainCategoryName = selectedMain ? selectedMain.label : ''
    const selectedSub = subCategoryOptions.value.find(item => String(item.value) === String(formData.subCategoryId))
    const subCategoryValue = selectedSub ? selectedSub.label : ''

    const parentIdValue = toLongValue(mainCategoryId) ?? 0

    const payload = {
      ...(isEdit.value ? { id: Number(productId.value) } : {}),
      productCode: isEdit.value ? formData.productCode.trim() : formData.productCode.trim(),
      productName: formData.productName.trim(),
      categoryId: formData.categoryId || null,
      categoryName: '',
      mainCategory: mainCategoryName,
      subCategory: subCategoryValue,
      parentId: parentIdValue,
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      unit: formData.unit.trim(),
      price: formData.price,
      licenseNo: formData.licenseNo.trim(),
      status: formData.status,
      remark: formData.remark.trim()
    }

    const res = isEdit.value ? await updateProductManage(payload) : await addProductManage(payload)
    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('input.inventory.productManage.editSuccess') : t('input.inventory.productManage.addSuccess'))
      setTimeout(() => {
        router.push('/inventory/product-manage')
      }, 300)
    }
  } catch (error) {
    console.error('Failed to submit product form:', error)
  } finally {
    submitLoading.value = false
  }
}

const handleMainCategoryChange = (value) => {
  const selectedCategory = mainCategoryOptions.value.find(item => String(item.value) === String(value))
  formData.mainCategory = selectedCategory ? selectedCategory.label : ''
  formData.parentId = null
  formData.subCategoryId = ''
  formData.subCategory = ''
  updateProductCode()
}

const handleSubCategoryChange = (value) => {
  const selectedCategory = subCategoryOptions.value.find(item => String(item.value) === String(value))
  formData.subCategory = selectedCategory ? selectedCategory.label : ''
  updateProductCode()
}

const getAbbreviation = (options, value) => {
  if (!value) return ''
  const match = options.find(item => String(item.value) === String(value))
  if (match && match.value) return String(match.value).trim()
  if (match && match.label) return String(match.label).trim()
  return String(value).trim()
}

const toLongValue = (value) => {
  if (value === null || value === undefined) return null
  const trimmed = String(value).trim()
  if (!trimmed) return null
  const num = Number(trimmed)
  if (Number.isNaN(num)) return null
  return num
}

const formatDateStamp = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

const generateRandomCode = (length = 4) => {
  const max = Math.pow(10, length) - 1
  const num = Math.floor(Math.random() * (max + 1))
  return String(num).padStart(length, '0')
}

const updateProductCode = () => {
  if (isEdit.value) return
  if (!formData.mainCategoryId || !formData.subCategoryId) {
    formData.productCode = ''
    return
  }
  const mainAbbr = getAbbreviation(mainCategoryOptions.value, formData.mainCategoryId)
  const subAbbr = getAbbreviation(subCategoryOptions.value, formData.subCategoryId)
  if (!mainAbbr || !subAbbr) {
    formData.productCode = ''
    return
  }
  const datePart = formatDateStamp()
  const randomPart = generateRandomCode(4)
  formData.productCode = `${mainAbbr}_${subAbbr}_${datePart}_${randomPart}`
}

const resolveDictValue = (options, value) => {
  if (!value) return ''
  const match = options.find(item => String(item.value) === String(value) || String(item.label) === String(value))
  return match ? match.value : ''
}

const loadCategories = async () => {
  try {
    const mainRes = await getDicts('inventory_main_category')
    mainCategoryOptions.value = (mainRes.data || []).map(item => ({
      label: item.dictLabel,
      value: item.dictValue
    }))

    const subRes = await getDicts('inventory_sub_category')
    subCategoryOptions.value = (subRes.data || []).map(item => ({
      label: item.dictLabel,
      value: item.dictValue,
      parentValue: item.remark
    }))
  } catch (error) {
    console.error('Failed to load main categories:', error)
  }
}

onMounted(() => {
  loadCategories().then(() => {
    loadDetail()
  })
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
