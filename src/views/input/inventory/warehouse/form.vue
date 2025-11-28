<template>
  <div class="warehouse-form-page">
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
          <h1 class="page-title">{{ isEdit ? $t('input.inventory.warehouse.edit') : $t('input.inventory.warehouse.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="warehouse-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('input.catalog.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.inventory.warehouse.form.warehouseName')" prop="warehouseName">
              <el-input v-model="formData.warehouseName" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseName')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.warehouseType')" prop="warehouseType">
              <el-select v-model="formData.warehouseType" :placeholder="$t('input.inventory.warehouse.placeholder.warehouseType')" class="full-width">
                <el-option :label="$t('input.inventory.warehouse.type.normal')" value="normal" />
                <el-option :label="$t('input.inventory.warehouse.type.cold')" value="cold" />
                <el-option :label="$t('input.inventory.warehouse.type.dangerous')" value="dangerous" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.location')" prop="location" class="full-width-item">
              <el-input v-model="formData.location" :placeholder="$t('input.inventory.warehouse.placeholder.location')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.capacity')" prop="capacity">
              <el-input v-model.number="formData.capacity" :placeholder="$t('input.inventory.warehouse.placeholder.capacity')" type="number" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.belongs')" prop="belongs">
              <el-input v-model="formData.belongs" :placeholder="$t('input.inventory.warehouse.placeholder.belongs')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.supplierId')" prop="supplierId">
              <el-select
                v-model="formData.supplierId"
                :placeholder="$t('input.inventory.warehouse.placeholder.supplierId')"
                filterable
                clearable
                class="full-width"
                :loading="supplierLoading"
              >
                <el-option
                  v-for="supplier in supplierList"
                  :key="supplier.user_id"
                  :label="supplier.org_name"
                  :value="supplier.user_id"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <!-- 联系信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-contacts-line"></i>
            <h3>{{ $t('userInfo.contactInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.inventory.warehouse.form.contactPerson')" prop="contactPerson">
              <el-input v-model="formData.contactPerson" :placeholder="$t('input.inventory.warehouse.placeholder.contactPerson')" clearable />
            </el-form-item>
            <el-form-item :label="$t('input.inventory.warehouse.form.contactPhone')" prop="contactPhone">
              <el-input v-model="formData.contactPhone" :placeholder="$t('input.inventory.warehouse.placeholder.contactPhone')" clearable />
            </el-form-item>
          </div>
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
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getWarehouseDetail, addWarehouse, updateWarehouse } from '@/api/inventory'
import { getSupplierCertList } from '@/api/supplier'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)
const isEdit = computed(() => route.path.includes('/edit/'))
const warehouseId = computed(() => route.params.id)

const formData = reactive({
  warehouseName: '',
  warehouseType: '',
  location: '',
  capacity: null,
  belongs: '',
  supplierId: null,
  contactPerson: '',
  contactPhone: ''
})

// 供应商列表
const supplierList = ref([])
const supplierLoading = ref(false)

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
      supplierList.value = res.data.list || []
    }
  } catch (error) {
    console.error('Failed to load supplier list:', error)
  } finally {
    supplierLoading.value = false
  }
}

const rules = computed(() => ({
  warehouseName: [{ required: true, message: t('input.inventory.warehouse.rules.warehouseNameRequired'), trigger: 'blur' }],
  warehouseType: [{ required: true, message: t('input.inventory.warehouse.rules.warehouseTypeRequired'), trigger: 'change' }],
  location: [{ required: true, message: t('input.inventory.warehouse.rules.locationRequired'), trigger: 'blur' }],
  capacity: [
    { required: true, message: t('input.inventory.warehouse.rules.capacityRequired'), trigger: 'blur' },
    { type: 'number', min: 1, message: t('input.inventory.warehouse.rules.capacityPositive'), trigger: 'blur' }
  ],
  belongs: [{ required: true, message: t('input.inventory.warehouse.rules.belongsRequired'), trigger: 'blur' }],
  contactPerson: [{ required: true, message: t('input.inventory.warehouse.rules.contactPersonRequired'), trigger: 'blur' }],
  contactPhone: [{ required: true, message: t('input.inventory.warehouse.rules.contactPhoneRequired'), trigger: 'blur' }]
}))

// 返回
const goBack = () => {
  router.back()
}

// 加载数据
const loadData = async () => {
  if (!isEdit.value) return

  try {
    const res = await getWarehouseDetail(warehouseId.value)
    if (res.code === 200 && res.data) {
      Object.assign(formData, {
        warehouseName: res.data.warehouse_name,
        warehouseType: res.data.warehouse_type,
        location: res.data.location,
        capacity: res.data.capacity,
        belongs: res.data.belongs,
        supplierId: res.data.supplier_id,
        contactPerson: res.data.contact_person,
        contactPhone: res.data.contact_phone
      })
    }
  } catch (error) {
    console.error('Failed to load warehouse detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true

    const data = {
      warehouseName: formData.warehouseName,
      warehouseType: formData.warehouseType,
      location: formData.location,
      capacity: formData.capacity,
      belongs: formData.belongs,
      supplierId: formData.supplierId || 0,
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone
    }

    if (isEdit.value) {
      data.warehouseId = warehouseId.value
      const res = await updateWarehouse(data)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.warehouse.editSuccess'))
        setTimeout(() => router.back(), 1000)
      }
    } else {
      const res = await addWarehouse(data)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.warehouse.addSuccess'))
        setTimeout(() => router.back(), 1000)
      }
    }
  } catch (error) {
    console.error('Form validation or submission error:', error)
  } finally {
    submitLoading.value = false
  }
}

onMounted(() => {
  loadSupplierList()
  loadData()
})
</script>

<style scoped>
.warehouse-form-page {
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

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
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
  margin-top: 24px;
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

  .header-right {
    display: none;
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

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
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
