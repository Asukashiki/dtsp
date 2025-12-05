<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-edit-box-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('farmerDemand.edit') : $t('farmerDemand.add') }}</h1>
            <p class="page-subtitle">{{ $t('farmerDemand.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" class="demand-form">
          <!-- 农民信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-user-line"></i>
              {{ $t('farmerDemand.form.farmerInfo') }}
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('farmerDemand.form.farmerId')" prop="farmerId">
                  <el-input v-model="formData.farmerId" :placeholder="$t('farmerDemand.placeholder.farmerId')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('farmerDemand.form.farmerName')" prop="farmerName">
                  <el-input v-model="formData.farmerName" :placeholder="$t('farmerDemand.placeholder.farmerName')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('farmerDemand.form.farmerIdNumber')" prop="farmerIdNumber">
                  <el-input v-model="formData.farmerIdNumber" :placeholder="$t('farmerDemand.placeholder.farmerIdNumber')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('farmerDemand.form.landArea')" prop="landArea">
                  <el-input-number v-model="formData.landArea" :min="0" :precision="2" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('farmerDemand.form.zone')" prop="zone">
                  <el-input v-model="formData.zone" :placeholder="$t('farmerDemand.placeholder.zone')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('farmerDemand.form.woreda')" prop="woreda">
                  <el-input v-model="formData.woreda" :placeholder="$t('farmerDemand.placeholder.woreda')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('farmerDemand.form.kebele')" prop="kebele">
                  <el-input v-model="formData.kebele" :placeholder="$t('farmerDemand.placeholder.kebele')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('farmerDemand.form.village')" prop="village">
                  <el-input v-model="formData.village" :placeholder="$t('farmerDemand.placeholder.village')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="$t('farmerDemand.form.remark')">
              <el-input v-model="formData.remark" type="textarea" :rows="3" :placeholder="$t('farmerDemand.placeholder.remark')" />
            </el-form-item>
          </div>

          <!-- 投入品明细 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-list-check"></i>
              {{ $t('farmerDemand.form.itemsInfo') }}
              <el-button type="primary" size="small" @click="handleAddItem" style="margin-left: auto;">
                <i class="ri-add-line"></i>
                {{ $t('farmerDemand.form.addItem') }}
              </el-button>
            </div>
            <div v-if="formData.inputItems.length === 0" class="no-items">
              <el-empty :description="$t('farmerDemand.form.noItems')" />
            </div>
            <div v-else class="items-list">
              <div v-for="(item, index) in formData.inputItems" :key="index" class="item-card">
                <div class="item-header">
                  <span class="item-index">{{ index + 1 }}</span>
                  <el-button link type="danger" @click="handleRemoveItem(index)">
                    <i class="ri-delete-bin-line"></i>
                    {{ $t('farmerDemand.form.removeItem') }}
                  </el-button>
                </div>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="12">
                    <el-form-item
                      :label="$t('farmerDemand.form.inputCategory')"
                      :prop="`inputItems.${index}.inputCategory`"
                      :rules="rules.inputCategory"
                    >
                      <el-select v-model="item.inputCategory" :placeholder="$t('farmerDemand.placeholder.inputCategory')" style="width: 100%">
                        <el-option
                          v-for="(label, value) in inputCategoryOptions"
                          :key="value"
                          :label="label"
                          :value="value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item
                      :label="$t('farmerDemand.form.inputType')"
                      :prop="`inputItems.${index}.inputType`"
                      :rules="rules.inputType"
                    >
                      <el-input v-model="item.inputType" :placeholder="$t('farmerDemand.placeholder.inputType')" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="12">
                    <el-form-item
                      :label="$t('farmerDemand.form.variety')"
                      :prop="`inputItems.${index}.variety`"
                      :rules="rules.variety"
                    >
                      <el-input v-model="item.variety" :placeholder="$t('farmerDemand.placeholder.variety')" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('farmerDemand.form.specification')">
                      <el-input v-model="item.specification" :placeholder="$t('farmerDemand.placeholder.specification')" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="12">
                    <el-form-item
                      :label="$t('farmerDemand.form.unit')"
                      :prop="`inputItems.${index}.unit`"
                      :rules="rules.unit"
                    >
                      <el-input v-model="item.unit" :placeholder="$t('farmerDemand.placeholder.unit')" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item
                      :label="$t('farmerDemand.form.quantity')"
                      :prop="`inputItems.${index}.quantity`"
                      :rules="rules.quantity"
                    >
                      <el-input-number v-model="item.quantity" :min="0" :precision="2" style="width: 100%" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">
              {{ $t('common.submit') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addFarmerDemand, updateFarmerDemand, getFarmerDemandDetail } from '@/api/farmerDemand'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitting = ref(false)
const isEdit = computed(() => !!route.params.id)

const formData = reactive({
  farmerId: '',
  farmerName: '',
  farmerIdNumber: '',
  region: '',
  zone: '',
  woreda: '',
  kebele: '',
  village: '',
  landArea: null,
  remark: '',
  inputItems: []
})

// 投入品类型选项
const inputCategoryOptions = computed(() => ({
  seed: t('farmerDemand.inputCategory.seed'),
  fertilizer: t('farmerDemand.inputCategory.fertilizer'),
  pesticide: t('farmerDemand.inputCategory.pesticide')
}))

// 表单验证规则
const rules = reactive({
  farmerId: [{ required: true, message: t('farmerDemand.rules.farmerIdRequired'), trigger: 'blur' }],
  farmerName: [
    { required: true, message: t('farmerDemand.rules.farmerNameRequired'), trigger: 'blur' },
    { max: 100, message: t('farmerDemand.rules.farmerNameLength'), trigger: 'blur' }
  ],
  farmerIdNumber: [
    { required: true, message: t('farmerDemand.rules.farmerIdNumberRequired'), trigger: 'blur' },
    { max: 50, message: t('farmerDemand.rules.farmerIdNumberLength'), trigger: 'blur' }
  ],
  woreda: [{ required: true, message: t('farmerDemand.rules.woredaRequired'), trigger: 'blur' }],
  kebele: [{ required: true, message: t('farmerDemand.rules.kebeleRequired'), trigger: 'blur' }],
  village: [{ required: true, message: t('farmerDemand.rules.villageRequired'), trigger: 'blur' }],
  inputCategory: [{ required: true, message: t('farmerDemand.rules.inputCategoryRequired'), trigger: 'change' }],
  inputType: [{ required: true, message: t('farmerDemand.rules.inputTypeRequired'), trigger: 'blur' }],
  variety: [{ required: true, message: t('farmerDemand.rules.varietyRequired'), trigger: 'blur' }],
  unit: [{ required: true, message: t('farmerDemand.rules.unitRequired'), trigger: 'blur' }],
  quantity: [{ required: true, message: t('farmerDemand.rules.quantityRequired'), trigger: 'blur' }]
})

// 添加投入品明细
const handleAddItem = () => {
  formData.inputItems.push({
    inputCategory: '',
    inputType: '',
    variety: '',
    specification: '',
    unit: '',
    quantity: null
  })
}

// 移除投入品明细
const handleRemoveItem = (index) => {
  formData.inputItems.splice(index, 1)
}

// 加载数据
const loadData = async () => {
  if (!isEdit.value) return
  try {
    const res = await getFarmerDemandDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
      if (!formData.inputItems) {
        formData.inputItems = []
      }
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    // 验证至少有一条投入品明细
    if (formData.inputItems.length === 0) {
      ElMessage.warning(t('farmerDemand.rules.itemsRequired'))
      return
    }

    submitting.value = true
    const apiFunc = isEdit.value ? updateFarmerDemand : addFarmerDemand
    const params = { ...formData }

    if (isEdit.value) {
      params.id = route.params.id
    }

    const res = await apiFunc(params)
    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('farmerDemand.editSuccess') : t('farmerDemand.addSuccess'))
      router.push({ name: 'FarmerDemand' })
    } else {
      ElMessage.error(res.msg || t('farmerDemand.messages.saveFailed'))
    }
  } catch (error) {
    console.error('Failed to submit:', error)
    if (error !== false) {
      ElMessage.error(t('farmerDemand.messages.saveFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.demand-form {
  max-width: 100%;
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e8f5e9;
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 22px;
}

.no-items {
  text-align: center;
  padding: 40px 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  background: #fafafa;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.item-index {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .content-wrapper {
    padding: 20px;
    border-radius: 12px;
  }

  .demand-form {
    :deep(.el-form-item__label) {
      font-size: 14px;
    }
  }

  .item-card {
    padding: 16px;
  }
}
</style>
