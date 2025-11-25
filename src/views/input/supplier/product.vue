<template>
  <div class="supplier-product-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-stack-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('input.supplier.product.title') }}</h1>
          <p class="page-subtitle">{{ $t('input.supplier.product.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchFilters.keyword"
            :placeholder="$t('input.supplier.product.searchPlaceholder')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>
        </div>

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('common.add') }}</span>
            </el-button>
            <el-button type="primary" plain @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
          </div>
        </div>

        <!-- 筛选条件 -->
        <div class="filter-row">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('input.supplier.product.form.inputType') }}</label>
                <el-radio-group v-model="searchFilters.inputType" @change="handleSearch">
                  <el-radio-button label="">{{ $t('input.supplier.product.inputType.all') }}</el-radio-button>
                  <el-radio-button label="pesticide">{{ $t('input.supplier.product.inputType.pesticide') }}</el-radio-button>
                  <el-radio-button label="fertilizer">{{ $t('input.supplier.product.inputType.fertilizer') }}</el-radio-button>
                  <el-radio-button label="seed">{{ $t('input.supplier.product.inputType.seed') }}</el-radio-button>
                  <el-radio-button label="other">{{ $t('input.supplier.product.inputType.other') }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('input.supplier.product.form.inputName') }}</label>
                <el-input
                  v-model="searchFilters.inputName"
                  :placeholder="$t('input.supplier.product.placeholder.inputName')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('input.supplier.product.form.inputSku') }}</label>
                <el-input
                  v-model="searchFilters.inputSku"
                  :placeholder="$t('input.supplier.product.placeholder.inputSku')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('input.supplier.product.form.qualityRating') }}</label>
                <el-select
                  v-model="searchFilters.qualityRating"
                  :placeholder="$t('input.supplier.product.filterByQuality')"
                  clearable
                  style="width: 100%"
                  @change="handleSearch"
                >
                  <el-option label="A" value="A" />
                  <el-option label="B" value="B" />
                  <el-option label="C" value="C" />
                  <el-option label="D" value="D" />
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="input_name" :label="$t('input.supplier.product.columns.inputName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="input_type" :label="$t('input.supplier.product.columns.inputType')" min-width="120">
            <template #default="{ row }">
              <el-tag v-if="row.input_type" size="small">
                {{ $t(`input.supplier.product.inputType.${row.input_type}`) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="supplier_name" :label="$t('input.supplier.product.columns.supplierName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="supplier_product_code" :label="$t('input.supplier.product.columns.supplierProductCode')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="current_price" :label="$t('input.supplier.product.columns.currentPrice')" min-width="120" align="right">
            <template #default="{ row }">
              <span v-if="row.current_price">{{ formatPrice(row.current_price) }}</span>
              <span v-else class="text-muted">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="quality_rating" :label="$t('input.supplier.product.columns.qualityRating')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.quality_rating" :type="getQualityTagType(row.quality_rating)" size="small">
                {{ row.quality_rating }}
              </el-tag>
              <span v-else class="text-muted">-</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.supplier.product.columns.actions')" min-width="200" align="center" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
                {{ $t('input.supplier.product.actions.view') }}
              </el-button>
              <el-button link type="primary" @click="handleEdit(row)">
                <i class="ri-edit-line"></i>
                {{ $t('input.supplier.product.actions.edit') }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">
                <i class="ri-delete-bin-line"></i>
                {{ $t('input.supplier.product.actions.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view">
        <div class="mobile-add-btn">
          <el-button type="primary" @click="handleAdd" style="width: 100%">
            <i class="ri-add-line"></i>
            {{ $t('common.add') }}
          </el-button>
        </div>

        <div v-loading="loading" class="card-list">
          <div v-if="tableData.length === 0" class="empty-state">
            <i class="ri-inbox-line empty-icon"></i>
            <p class="empty-text">{{ $t('input.supplier.product.messages.noData') }}</p>
          </div>

          <div v-for="item in tableData" :key="item.supplier_product_id" class="product-card">
            <div class="card-header">
              <div class="product-name">
                <i class="ri-product-hunt-line"></i>
                {{ item.input_name }}
              </div>
              <el-tag v-if="item.input_type" size="small">
                {{ $t(`input.supplier.product.inputType.${item.input_type}`) }}
              </el-tag>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">{{ $t('input.supplier.product.columns.supplierName') }}:</span>
                <span class="value">{{ item.supplier_name }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('input.supplier.product.columns.supplierProductCode') }}:</span>
                <span class="value">{{ item.supplier_product_code || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('input.supplier.product.columns.currentPrice') }}:</span>
                <span class="value price">{{ item.current_price ? formatPrice(item.current_price) : '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('input.supplier.product.columns.qualityRating') }}:</span>
                <el-tag v-if="item.quality_rating" :type="getQualityTagType(item.quality_rating)" size="small">
                  {{ item.quality_rating }}
                </el-tag>
                <span v-else class="value">-</span>
              </div>
            </div>

            <div class="card-footer">
              <el-button size="small" @click="handleView(item)">
                <i class="ri-eye-line"></i>
                {{ $t('input.supplier.product.actions.view') }}
              </el-button>
              <el-button size="small" type="primary" @click="handleEdit(item)">
                <i class="ri-edit-line"></i>
                {{ $t('input.supplier.product.actions.edit') }}
              </el-button>
              <el-button size="small" type="danger" plain @click="handleDelete(item)">
                <i class="ri-delete-bin-line"></i>
                {{ $t('input.supplier.product.actions.delete') }}
              </el-button>
            </div>
          </div>
        </div>

        <!-- 移动端分页 -->
        <div class="mobile-pagination">
          <el-pagination
            v-model:current-page="pagination.page"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <el-dialog
      v-model="detailDialogVisible"
      :title="$t('input.supplier.product.detail')"
      width="90%"
      :close-on-click-modal="false"
      class="detail-dialog"
    >
      <div v-if="currentDetail" class="detail-content">
        <div class="detail-section">
          <h3 class="section-title">{{ $t('input.supplier.product.detailSections.basicInfo') }}</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.inputName') }}:</span>
              <span class="value">{{ currentDetail.input_name }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.inputType') }}:</span>
              <span class="value">
                <el-tag v-if="currentDetail.input_type" size="small">
                  {{ $t(`input.supplier.product.inputType.${currentDetail.input_type}`) }}
                </el-tag>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.inputSku') }}:</span>
              <span class="value">{{ currentDetail.input_sku || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.supplierName') }}:</span>
              <span class="value">{{ currentDetail.supplier_name }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.supplierProductCode') }}:</span>
              <span class="value">{{ currentDetail.supplier_product_code || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.supplierProductName') }}:</span>
              <span class="value">{{ currentDetail.supplier_product_name || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.currentPrice') }}:</span>
              <span class="value price">{{ currentDetail.current_price ? formatPrice(currentDetail.current_price) : '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.qualityRating') }}:</span>
              <span class="value">
                <el-tag v-if="currentDetail.quality_rating" :type="getQualityTagType(currentDetail.quality_rating)" size="small">
                  {{ currentDetail.quality_rating }} - {{ $t(`input.supplier.product.qualityRating.${currentDetail.quality_rating}`) }}
                </el-tag>
                <span v-else>-</span>
              </span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('input.supplier.product.form.notes') }}:</span>
              <span class="value">{{ currentDetail.notes || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.createTime') }}:</span>
              <span class="value">{{ currentDetail.create_time || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('input.supplier.product.form.updateTime') }}:</span>
              <span class="value">{{ currentDetail.update_time || '-' }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="formDialogVisible"
      :title="isEdit ? $t('input.supplier.product.edit') : $t('input.supplier.product.add')"
      width="800px"
      :close-on-click-modal="false"
      class="form-dialog"
    >
      <el-form :model="formData" :rules="formRules" ref="formRef" label-width="140px" label-position="top" >
        <el-form-item :label="$t('input.supplier.product.form.supplierId')" prop="supplierId">
          <el-select
            v-model="formData.supplierId"
            :placeholder="$t('input.supplier.product.placeholder.supplierId')"
            filterable
            style="width: 100%"
            :disabled="isEdit"
            @change="handleSupplierChange"
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
            style="width: 100%"
            :disabled="isEdit"
            @change="handleInputChange"
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
            style="width: 100%"
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

        <el-form-item :label="$t('input.supplier.product.form.notes')" prop="notes">
          <el-input
            v-model="formData.notes"
            type="textarea"
            :rows="4"
            :placeholder="$t('input.supplier.product.placeholder.notes')"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="formDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="saveLoading">
          {{ $t('common.save') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getSupplierProductList,
  getSupplierProductDetail,
  addSupplierProduct,
  updateSupplierProduct,
  deleteSupplierProduct,
  getSupplierCertList
} from '@/api/supplier'
import { getInputList } from '@/api/input'

const { t } = useI18n()

// 搜索筛选条件
const searchFilters = reactive({
  keyword: '',
  inputType: '',
  inputName: '',
  inputSku: '',
  qualityRating: ''
})

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 表格数据
const tableData = ref([])
const loading = ref(false)

// 详情弹窗
const detailDialogVisible = ref(false)
const currentDetail = ref(null)

// 新增/编辑弹窗
const formDialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const saveLoading = ref(false)

// 表单数据
const formData = reactive({
  supplierId: '',
  inputId: '',
  supplierProductCode: '',
  supplierProductName: '',
  qualityRating: '',
  notes: ''
})

// 当前编辑的记录ID
const currentEditId = ref(null)

// 供应商选项
const supplierOptions = ref([])
// 投入品选项
const inputOptions = ref([])
// 投入品搜索加载状态
const inputSearchLoading = ref(false)

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

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchFilters
    }

    const res = await getSupplierProductList(params)
    if (res.code === 200 && res.data) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 获取供应商列表
const fetchSuppliers = async () => {
  try {
    const res = await getSupplierCertList({ status: 2, pageSize: 1000 })
    if (res.code === 200 && res.data) {
      supplierOptions.value = (res.data.list || []).map(item => ({
        label: item.org_name,
        value: String(item.user_id) // 转换为字符串避免大数精度丢失
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
      status: 'active' // 只获取启用状态的投入品
    })
    if (res.code === 200 && res.data) {
      inputOptions.value = (res.data.list || []).map(item => ({
        label: `${item.input_name}${item.input_sku ? ' (' + item.input_sku + ')' : ''}`,
        value: String(item.input_id), // 转换为字符串避免大数精度丢失
        type: item.type
      }))
    }
  } catch (error) {
    console.error('Failed to fetch inputs:', error)
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

// 重置
const handleReset = () => {
  searchFilters.keyword = ''
  searchFilters.inputType = ''
  searchFilters.inputName = ''
  searchFilters.inputSku = ''
  searchFilters.qualityRating = ''
  handleSearch()
}

// 分页变化
const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.page = 1
  fetchData()
}

const handleCurrentChange = (val) => {
  pagination.page = val
  fetchData()
}

// 新增
const handleAdd = () => {
  isEdit.value = false
  currentEditId.value = null
  // 重置表单
  formData.supplierId = ''
  formData.inputId = ''
  formData.supplierProductCode = ''
  formData.supplierProductName = ''
  formData.qualityRating = ''
  formData.notes = ''

  formDialogVisible.value = true
  // 重置表单验证
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 编辑
const handleEdit = async (row) => {
  try {
    const res = await getSupplierProductDetail(row.supplier_product_id)
    if (res.code === 200 && res.data) {
      isEdit.value = true
      currentEditId.value = row.supplier_product_id

      // 填充表单数据 - 转换为字符串避免大数精度丢失
      formData.supplierId = String(res.data.supplier_id)
      formData.inputId = String(res.data.input_id)
      formData.supplierProductCode = res.data.supplier_product_code || ''
      formData.supplierProductName = res.data.supplier_product_name || ''
      formData.qualityRating = res.data.quality_rating || ''
      formData.notes = res.data.notes || ''

      formDialogVisible.value = true
    }
  } catch (error) {
    console.error('Failed to fetch detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 查看详情
const handleView = async (row) => {
  try {
    const res = await getSupplierProductDetail(row.supplier_product_id)
    if (res.code === 200 && res.data) {
      currentDetail.value = res.data
      detailDialogVisible.value = true
    }
  } catch (error) {
    console.error('Failed to fetch detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 供应商改变
const handleSupplierChange = (val) => {
  console.log('Supplier changed:', val)
}

// 投入品改变
const handleInputChange = (val) => {
  console.log('Input changed:', val)
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
    // 如果搜索为空,加载默认列表
    fetchInputs()
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
          res = await updateSupplierProduct(currentEditId.value, data)
        } else {
          res = await addSupplierProduct(data)
        }

        if (res.code === 200) {
          ElMessage.success(isEdit.value ? t('input.supplier.product.editSuccess') : t('input.supplier.product.addSuccess'))
          formDialogVisible.value = false
          fetchData()
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

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('input.supplier.product.deleteConfirm'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteSupplierProduct(row.supplier_product_id)
    if (res.code === 200) {
      ElMessage.success(t('input.supplier.product.deleteSuccess'))
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 格式化价格
const formatPrice = (price) => {
  return `ETB ${parseFloat(price).toFixed(2)}`
}

// 获取质量评级标签类型
const getQualityTagType = (rating) => {
  const typeMap = {
    A: 'success',
    B: 'primary',
    C: 'warning',
    D: 'danger'
  }
  return typeMap[rating] || 'info'
}

// 初始化
onMounted(() => {
  fetchData()
  fetchSuppliers()
  fetchInputs()
})
</script>

<style scoped>
.supplier-product-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding-bottom: 2rem;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 24px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1rem;
}

.header-icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.header-icon {
  font-size: 40px;
  color: white;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  margin: 0 auto;
  padding: 0 1rem;
}

/* 搜索栏 */
.search-bar {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-row {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.action-left {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-row {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e8f5e9;
}

.filter-item {
  margin-bottom: 1rem;
}

.filter-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #606266;
  font-size: 0.875rem;
}

/* 表格卡片 */
.table-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.pagination-wrapper {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

/* 移动端 */
.mobile-view {
  display: none;
}

.mobile-add-btn {
  margin-bottom: 1rem;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8f5e9;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-body {
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f7fa;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-weight: 500;
  color: #606266;
  font-size: 0.875rem;
}

.info-row .value {
  color: #303133;
  text-align: right;
}

.info-row .price {
  color: #009A44;
  font-weight: 600;
}

.card-footer {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f5f7fa;
}

.card-footer .el-button {
  flex: 1;
}

.mobile-pagination {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  font-size: 4rem;
  color: #dcdfe6;
  margin-bottom: 1rem;
}

.empty-text {
  color: #909399;
  font-size: 0.875rem;
}

/* 详情弹窗 */
.detail-content {
  padding: 1rem 0;
}

.detail-section {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #009A44;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #009A44;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item .label {
  font-weight: 500;
  color: #606266;
  font-size: 0.875rem;
}

.info-item .value {
  color: #303133;
  font-size: 0.938rem;
}

.info-item .price {
  color: #009A44;
  font-weight: 600;
  font-size: 1.125rem;
}

/* 响应式 - 平板 */
@media screen and (max-width: 1024px) {
  .page-title {
    font-size: 1.5rem;
  }

  .header-icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .header-icon {
    font-size: 30px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

/* 响应式 - 移动端 */
@media screen and (max-width: 768px) {
  .pc-view {
    display: none !important;
  }

  .mobile-view {
    display: block;
  }

  .page-header {
    padding: 1.5rem 1rem;
  }

  .header-content {
    gap: 1rem;
  }

  .header-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .header-icon {
    font-size: 24px;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }

  .search-bar {
    padding: 1rem;
  }

  .action-left {
    width: 100%;
  }

  .action-left .el-button {
    flex: 1;
  }

  .btn-text {
    display: none;
  }

  .filter-row :deep(.el-radio-group) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-row :deep(.el-radio-button) {
    flex: 0 0 auto;
  }

  .detail-dialog {
    width: 95% !important;
  }

  .detail-content {
    padding: 0;
  }

  .detail-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .form-dialog {
    width: 95% !important;
  }

  .form-dialog :deep(.el-form-item__label) {
    width: 100% !important;
    text-align: left !important;
  }

  .form-dialog :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
}

.text-muted {
  color: #909399;
}
</style>
