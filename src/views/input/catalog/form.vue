<template>
  <div class="input-form-container">
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
          <h1 class="page-title">
            {{ isEdit ? $t('input.catalog.edit') : $t('input.catalog.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          :label-width="labelWidth"
          :label-position="labelPosition"
      >
        <!-- 基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('input.catalog.form.basicInfo') }}
          </div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.inputName')"
                  prop="inputName"
              >
                <el-input
                    v-model="formData.inputName"
                    :placeholder="$t('input.catalog.placeholder.inputName')"
                    maxlength="100"
                    show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.inputType')"
                  prop="type"
              >
                <el-select
                    v-model="formData.type"
                    :placeholder="$t('input.catalog.placeholder.inputType')"
                    style="width: 100%"
                    @change="handleTypeChange"
                >
                  <el-option :label="$t('input.catalog.type.pesticide')" value="pesticide" />
                  <el-option :label="$t('input.catalog.type.fertilizer')" value="fertilizer" />
                  <el-option :label="$t('input.catalog.type.seed')" value="seed" />
                  <el-option :label="$t('input.catalog.type.other')" value="other" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.agriculturalInputType')"
                  prop="agriculturalInputType"
              >
                <el-input
                    v-model="formData.agriculturalInputType"
                    :placeholder="$t('input.catalog.placeholder.agriculturalInputType')"
                    maxlength="100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.variety')"
                  prop="variety"
              >
                <el-input
                    v-model="formData.variety"
                    :placeholder="$t('input.catalog.placeholder.variety')"
                    maxlength="100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.inputSku')"
                  prop="inputSku"
              >
                <el-input
                    v-model="formData.inputSku"
                    :placeholder="$t('input.catalog.placeholder.inputSku')"
                    readonly
                    maxlength="50"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.trademark')"
                  prop="trademark"
              >
                <el-input
                    v-model="formData.trademark"
                    :placeholder="$t('input.catalog.placeholder.trademark')"
                    maxlength="100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.specificationModel')"
                  prop="specificationModel"
              >
                <el-input
                    v-model="formData.specificationModel"
                    :placeholder="$t('input.catalog.placeholder.specificationModel')"
                    maxlength="100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.unit')"
                  prop="unit"
              >
                <el-input
                    v-model="formData.unit"
                    :placeholder="$t('input.catalog.placeholder.unit')"
                    maxlength="20"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.referencePrice')"
                  prop="referencePrice"
              >
                <el-input-number
                    v-model="formData.referencePrice"
                    :placeholder="$t('input.catalog.placeholder.referencePrice')"
                    :precision="2"
                    :min="0"
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.isImport')"
                  prop="isImport"
              >
                <el-radio-group v-model="formData.isImport">
                  <el-radio :label="0">{{ $t('input.catalog.isImport.no') }}</el-radio>
                  <el-radio :label="1">{{ $t('input.catalog.isImport.yes') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.description')"
                  prop="description"
              >
                <el-input
                    v-model="formData.description"
                    :placeholder="$t('input.catalog.placeholder.description')"
                    type="textarea"
                    :rows="2"
                    maxlength="500"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.status')"
                  prop="status"
              >
                <el-radio-group v-model="formData.status">
                  <el-radio value="active">{{ $t('input.catalog.statusOptions.active') }}</el-radio>
                  <el-radio value="inactive">{{ $t('input.catalog.statusOptions.inactive') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 法规与许可信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('input.catalog.form.regulatoryInfo') }}
          </div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.registerCode')"
                  prop="registerCode"
              >
                <el-input
                    v-model="formData.registerCode"
                    :placeholder="$t('input.catalog.placeholder.registerCode')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.productionLicense')"
                  prop="productionLicense"
              >
                <el-input
                    v-model="formData.productionLicense"
                    :placeholder="$t('input.catalog.placeholder.productionLicense')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.productionStandard')"
                  prop="productionStandard"
              >
                <el-input
                    v-model="formData.productionStandard"
                    :placeholder="$t('input.catalog.placeholder.productionStandard')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 生产与责任信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-building-line"></i>
            {{ $t('input.catalog.form.productionInfo') }}
          </div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.producerName')"
                  prop="producerName"
              >
                <el-input
                    v-model="formData.producerName"
                    :placeholder="$t('input.catalog.placeholder.producerName')"
                    maxlength="200"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                  :label="$t('input.catalog.form.producerAddress')"
                  prop="producerAddress"
              >
                <el-input
                    v-model="formData.producerAddress"
                    :placeholder="$t('input.catalog.placeholder.producerAddress')"
                    maxlength="255"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 农药特性信息 -->
        <div v-if="formData.type === 'pesticide'" class="form-section">
          <div class="section-title">
            <i class="ri-flask-line"></i>
            {{ $t('input.catalog.pesticide.title') }}
          </div>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item :label="$t('input.catalog.pesticide.cropControlObject')">
                <el-input
                    v-model="formData.cropControlObject"
                    :placeholder="$t('input.catalog.placeholder.cropControlObject')"
                    type="textarea"
                    :rows="2"
                    maxlength="500"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 种子特性信息 -->
        <div v-if="formData.type === 'seed'" class="form-section">
          <div class="section-title">
            <i class="ri-seedling-line"></i>
            {{ $t('input.catalog.seed.title') }}
          </div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.breeder')">
                <el-input
                    v-model="formData.breeder"
                    :placeholder="$t('input.catalog.placeholder.breeder')"
                    maxlength="200"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.varietySource')">
                <el-input
                    v-model="formData.varietySource"
                    :placeholder="$t('input.catalog.placeholder.varietySource')"
                    maxlength="500"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 化肥特性信息 -->
        <div v-if="formData.type === 'fertilizer'" class="form-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('input.catalog.fertilizer.title') }}
          </div>
          <el-row :gutter="24">
            <el-col :span="24" class="text-center text-gray-500">
              {{ $t('input.catalog.fertilizer.emptyTip') }}
            </el-col>
          </el-row>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button
              type="primary"
              :loading="submitting"
              @click="handleSubmit"
          >
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getInputDetail, addInput, updateInput, uploadInputImage } from '@/api/input'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 响应式表单布局
const isMobile = ref(window.innerWidth <= 768)
const labelWidth = computed(() => isMobile.value ? '100%' : '180px')
const labelPosition = computed(() => isMobile.value ? 'top' : 'right')

// 监听窗口大小变化
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

const formRef = ref()
const submitting = ref(false)

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 图片上传配置
const imageFileList = ref([])

// 表单数据
const formData = reactive({
  inputId: '',
  inputBizId: '',
  inputName: '',
  type: '',
  agriculturalInputType: '',
  variety: '',
  inputSku: '',
  trademark: '',
  status: 'active',
  specificationModel: '',
  unit: '',
  referencePrice: 0,
  imageUrl: '',
  description: '',
  isImport: 0,
  registerCode: '',
  productionLicense: '',
  productionStandard: '',
  producerName: '',
  producerAddress: '',
  breeder: '',
  varietySource: '',
  cropControlObject: ''
})

// 表单验证规则
const rules = computed(() => ({
  inputName: [
    { required: true, message: t('input.catalog.rules.inputNameRequired'), trigger: 'blur' },
    { min: 2, max: 100, message: t('input.catalog.rules.inputNameLength'), trigger: 'blur' }
  ],
  type: [
    { required: true, message: t('input.catalog.rules.inputTypeRequired'), trigger: 'change' }
  ],
  agriculturalInputType: [
    { required: true, message: t('input.catalog.rules.agriculturalInputTypeRequired'), trigger: 'blur' },
  ],
  productionLicense: [
    { required: true, message: t('input.catalog.rules.productionLicenseRequired'), trigger: 'blur' },
  ],
  registerCode: [
    { required: true, message: t('input.catalog.rules.registerCodeRequired'), trigger: 'blur' }
  ],
  inputSku: [
    { required: true, message: t('input.catalog.rules.inputSkuRequired'), trigger: 'blur' },
    { min: 8, max: 50, message: t('input.catalog.rules.inputSkuLength'), trigger: 'blur' }
  ]
}));

// 生成SKU编码
const generateSku = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000)
  return `ZZ-XM-${randomNumber}`
}

// 生成投入品业务ID
const generateInputBizId = (type, agriculturalInputType) => {
  const typeCodeMap = { pesticide: 'PE', fertilizer: 'FE', seed: 'SE', other: 'OT' };
  const categoryCode = agriculturalInputType ? agriculturalInputType.substring(0, 2).toUpperCase() : 'NY';
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `IN_${typeCodeMap[type] || 'OT'}_${categoryCode}_${year}_${randomNum}`;
};

// 类型变化处理
const handleTypeChange = () => {
  if (formData.type !== 'pesticide') {
    formData.cropControlObject = '';
  }
  if (formData.type !== 'seed') {
    formData.breeder = '';
    formData.varietySource = '';
  }
  if (formData.type && formData.agriculturalInputType) {
    formData.inputBizId = generateInputBizId(formData.type, formData.agriculturalInputType);
  }
};

// 图片上传校验
const beforeImageUpload = (file) => {
  const isImage = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type);
  if (!isImage) {
    ElMessage.error(t('input.catalog.upload.imageTypeError'));
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElMessage.error(t('input.catalog.upload.imageSizeError'));
    return false;
  }
  return true;
};

// 自定义图片上传逻辑
const customUpload = async (options) => {
  const formData = new FormData();
  formData.append('file', options.file);

  try {
    const res = await uploadInputImage(formData);
    if (res.code === 200) {
      formData.imageUrl = res.data;
      imageFileList.value = [{ url: res.data }];
      ElMessage.success(t('input.catalog.upload.imageSuccess'));
    } else {
      ElMessage.error(t('input.catalog.upload.imageError', { msg: res.msg || t('common.failed') }));
    }
  } catch (err) {
    ElMessage.error(`${t('input.catalog.upload.imageError')}：${err.response?.data?.msg || err.message}`);
  }
};

// 移除图片
const handleImageRemove = () => {
  formData.imageUrl = '';
  imageFileList.value = [];
};

// 加载详情
const loadDetail = async () => {
  try {
    const res = await getInputDetail(route.params.id);
    if (res.code === 200) {
      Object.assign(formData, res.data);
      if (res.data.imageUrl) {
        imageFileList.value = [{ url: res.data.imageUrl }];
      }
    }
  } catch (error) {
    console.error('加载详情失败:', error);
    ElMessage.error(t('common.failed'));
  }
};

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    submitting.value = true;

    const submitData = { ...formData };
    let res;

    if (isEdit.value) {
      res = await updateInput(route.params.id, submitData);
    } else {
      res = await addInput(submitData);
    }

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('input.catalog.editSuccess') : t('input.catalog.addSuccess'));
      router.push('/input/catalog');
    } else {
      ElMessage.error(res.msg || t('common.submitFailed'));
    }
  } catch (error) {
    console.error('表单提交失败:', error);
    ElMessage.error(t('common.submitFailed'));
  } finally {
    submitting.value = false;
  }
};

// 返回上一页
const goBack = () => {
  router.back();
};

// 初始化
onMounted(() => {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });

  if (isEdit.value) {
    loadDetail();
  } else {
    formData.inputSku = generateSku();
  }
});
</script>

<style scoped>
.input-form-container {
  min-height: calc(100vh - 120px);
}
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left, .header-right { flex: 1; }
.header-center { flex: 2; text-align: center; }
.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}
.form-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.form-section {
  margin-bottom: 32px;
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-title i { font-size: 20px; }

/* 图片上传样式 */
.image-uploader {
  --el-upload-picture-card-size: 120px;
}
:deep(.el-upload--picture-card) {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s;
}
:deep(.el-upload--picture-card:hover) {
  border-color: #009A44;
}
:deep(.el-upload__text) {
  font-size: 14px;
  color: #606266;
  margin-top: 8px;
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 100%;
  height: 120px;
}

.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .page-header { margin: -12px -12px 12px -12px; }
  .header-content { padding: 12px; }
  .page-title { font-size: 16px; }
  .header-right { display: none; }
  .form-wrapper { padding: 24px 16px; border-radius: 0; box-shadow: none; }
  :deep(.el-row) { display: block !important; }
  :deep(.el-col) { max-width: 100% !important; }
  :deep(.el-form-item__label) { text-align: left !important; padding-bottom: 8px !important; }
  :deep(.el-form-item__content) { margin-left: 0 !important; }
  .image-uploader { --el-upload-picture-card-size: 100%; }
  :deep(.el-upload--picture-card) { height: 150px; }
  :deep(.el-upload-list--picture-card .el-upload-list__item) { height: 150px; }
  .form-actions { flex-direction: column; gap: 12px; }
  .form-actions .el-button { width: 100%; }
}
</style>