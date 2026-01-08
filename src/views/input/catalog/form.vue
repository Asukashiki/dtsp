<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">
              {{ isEdit ? $t('input.catalog.edit') : $t('input.catalog.add') }}
            </h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-width="140px"
            v-loading="dictLoading"
        >
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
                  <el-form-item
                      :label="$t('input.catalog.form.inputType')"
                      prop="type"
                  >
                    <!-- 投入品类型下拉框（已移除农药选项） -->
                    <el-select
                        v-model="formData.type"
                        :placeholder="$t('input.catalog.placeholder.inputType')"
                        style="width: 100%"
                        @change="handleTypeChange"
                        v-loading="dictLoading"
                    >
                      <el-option
                          v-for="item in options.input_type"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item
                      :label="$t('input.catalog.form.agriculturalInputType')"
                      prop="agriculturalInputType"
                      :required="['IN01', 'IN02'].includes(formData.type)"
                  >
                    <!-- 投入品品类下拉框：根据类型过滤选项 -->
                    <el-select
                        v-model="formData.agriculturalInputType"
                        :placeholder="$t('input.catalog.placeholder.agriculturalInputType')"
                        style="width: 100%"
                        v-loading="dictLoading"
                    >
                      <el-option
                          v-for="item in filterCategoryOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item
                      :label="$t('input.catalog.form.inputSku')"
                      prop="inputSku"
                  >
                    <el-input
                        v-model="formData.inputSku"
                        :placeholder="$t('input.catalog.placeholder.inputSku')"
                        maxlength="50"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
          </div>

          <!-- 法规与许可信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-shield-check-line"></i>
                <span>{{ $t('input.catalog.form.regulatoryInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
          </div>

          <!-- 生产与责任信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('input.catalog.form.productionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
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
                <el-col :xs="24" :sm="12">
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
          </div>

          <!-- 种子特性信息（仅IN01=种子显示） -->
          <div v-if="formData.type === 'IN01'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ $t('input.catalog.seed.title') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.catalog.seed.breeder')">
                    <el-input
                        v-model="formData.breeder"
                        :placeholder="$t('input.catalog.placeholder.breeder')"
                        maxlength="200"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
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
          </div>

          <!-- 化肥特性信息（仅IN02=化肥显示） -->
          <div v-if="formData.type === 'IN02'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-plant-line"></i>
                <span>{{ $t('input.catalog.fertilizer.title') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="text-center text-gray-500">
                {{ $t('input.catalog.fertilizer.emptyTip') }}
              </div>
            </div>
          </div>

          <!-- 其他类型（仅IN09=其他显示） -->
          <div v-if="formData.type === 'IN09'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-more-line"></i>
                <span>{{ $t('input.catalog.other.title') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="text-center text-gray-500">
                {{ $t('input.catalog.other.emptyTip') }}
              </div>
            </div>
          </div>

          <!-- 操作按钮区域（固定在底部） -->
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
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getInputDetail, addInput, updateInput, uploadInputImage } from '@/api/input'
import { useDict, clearDictCache } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()


const formRef = ref()
const submitting = ref(false)

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 图片上传配置
const imageFileList = ref([])

// 清除字典缓存并初始化
clearDictCache('input_type')
clearDictCache('crop_type')
clearDictCache('flow_status')
clearDictCache('input_category')

const {
  options,
  loading: dictLoading,
  refresh: refreshDict
} = useDict([
  'input_type',
  'crop_type',
  'flow_status',
  'input_category'
], {
  immediate: true,
  cache: true
})

// 动态过滤投入品品类选项
const filterCategoryOptions = computed(() => {
  const categoryList = options.value.input_category || []
  if (formData.type === 'IN01') {
    return categoryList.filter(item => item.value.startsWith('IN01'))
  } else if (formData.type === 'IN02') {
    return categoryList.filter(item => item.value.startsWith('IN02'))
  }
  return []
})

// 统一投入品品类占位符（国际化）
const getCategoryPlaceholder = computed(() => {
  return t('input.catalog.placeholder.agriculturalInputType')
})

onMounted(async () => {
  await refreshDict();

  if (isEdit.value) {
    loadDetail();
  }
})

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
    {
      required: ['IN01', 'IN02'].includes(formData.type),
      message: t('input.catalog.rules.agriculturalInputTypeRequired'),
      trigger: 'change'
    },
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

// 投入品类型变化处理
const handleTypeChange = () => {
  formData.agriculturalInputType = '';
  formData.breeder = '';
  formData.varietySource = '';

  if (formData.type && formData.agriculturalInputType) {
    formData.inputBizId = generateInputBizId(formData.type, formData.agriculturalInputType);
  }
};

// 生成投入品业务ID
const generateInputBizId = (type, agriculturalInputType) => {
  const typeCodeMap = {
    IN01: 'SE',
    IN02: 'FE',
    IN09: 'OT'
  };
  const categoryCode = agriculturalInputType ? agriculturalInputType.substring(0, 2).toUpperCase() : 'NY';
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `IN_${typeCodeMap[type] || 'OT'}_${categoryCode}_${year}_${randomNum}`;
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

// 加载详情（适配旧数据）
const loadDetail = async () => {
  try {
    const res = await getInputDetail(route.params.id);
    if (res.code === 200) {
      Object.assign(formData, res.data);
      if (formData.type === 'seed') formData.type = 'IN01';
      if (formData.type === 'fertilizer') formData.type = 'IN02';
      if (formData.type === 'other') formData.type = 'IN09';

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
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.text-gray-500 {
  color: #909399;
}
</style>