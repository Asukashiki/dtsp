<template>
  <div class="page-container">
    <div class="page-card">
      <!-- Header -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-plant-line"></i>
        </div>
        <h1 class="header-title">{{ $t('identity.farmerTitle') }}</h1>
        <p class="header-subtitle">{{ $t('identity.farmerSubtitle') }}</p>
      </div>

      <!-- Form -->
      <el-form ref="formRef" :model="form" :rules="rules" label-width="140px" class="form-body" status-icon>
        <div class="form-section">
          <div class="section-title">
            <i class="ri-user-3-line"></i>
            <span>{{ $t('identity.form.name') }}</span>
          </div>

          <el-row :gutter="24">
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.name')" prop="name">
                <el-input v-model.trim="form.name" :placeholder="$t('identity.placeholder.name')" clearable>
                  <template #prefix>
                    <i class="ri-user-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.idNo')" prop="idNo">
                <el-input v-model.trim="form.idNo" :placeholder="$t('identity.placeholder.idNo')" clearable>
                  <template #prefix>
                    <i class="ri-id-card-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.mobile')" prop="mobile">
                <el-input v-model.trim="form.mobile" :placeholder="$t('identity.placeholder.mobile')" clearable>
                  <template #prefix>
                    <i class="ri-phone-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.region')" prop="region">
                <el-cascader
                  v-model="form.region"
                  :options="regionOptions"
                  :placeholder="$t('identity.placeholder.region')"
                  filterable
                  clearable
                  class="full-width"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <div class="section-title">
            <i class="ri-seedling-line"></i>
            <span>{{ $t('identity.form.cropTypes') }}</span>
          </div>

          <el-row :gutter="24">
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.cropTypes')" prop="cropTypes">
                <el-select
                  v-model="form.cropTypes"
                  :placeholder="$t('identity.placeholder.cropTypes')"
                  multiple
                  clearable
                  collapse-tags
                  collapse-tags-tooltip
                  class="full-width"
                >
                  <el-option v-for="o in cropTypeOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.attachments')" prop="attachments">
                <el-upload
                  class="upload-block"
                  action="#"
                  :auto-upload="false"
                  :on-change="handleFileChange"
                  :limit="5"
                  :file-list="form.attachments"
                  accept=".jpg,.jpeg,.png,.pdf"
                >
                  <el-button type="primary" plain class="upload-btn">
                    <i class="ri-upload-2-line"></i>
                    {{ $t('identity.form.attachments') }}
                  </el-button>
                  <template #tip>
                    <div class="upload-tip">{{ $t('identity.uploadTip', { count: 5 }) }}</div>
                  </template>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item :label="$t('identity.form.address')" prop="address">
                <el-input
                  v-model.trim="form.address"
                  :placeholder="$t('identity.placeholder.address')"
                >
                  <template #prefix>
                    <i class="ri-map-pin-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('identity.form.remark')" prop="remark">
                <el-input
                  type="textarea"
                  v-model.trim="form.remark"
                  :placeholder="$t('identity.placeholder.remark')"
                  :rows="3"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- Audit Section (Review Mode) -->
        <template v-if="isReview">
          <div class="form-section audit-section">
            <div class="section-title audit-title">
              <i class="ri-checkbox-circle-line"></i>
              <span>{{ $t('identity.form.auditResult') }}</span>
            </div>

            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item :label="$t('identity.form.auditOpinion')" prop="auditOpinion">
                  <el-input
                    type="textarea"
                    v-model.trim="form.auditOpinion"
                    :placeholder="$t('identity.placeholder.auditOpinion')"
                    :rows="3"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('identity.form.auditResult')" prop="auditResult">
                  <el-radio-group v-model="form.auditResult" class="audit-radio-group">
                    <el-radio-button label="pass" class="pass-btn">
                      <i class="ri-checkbox-circle-line"></i>
                      {{ $t('identity.form.pass') }}
                    </el-radio-button>
                    <el-radio-button label="reject" class="reject-btn">
                      <i class="ri-close-circle-line"></i>
                      {{ $t('identity.form.reject') }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </template>

        <!-- Actions -->
        <div class="actions">
          <el-button class="back-btn" @click="$router.back()">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
          <el-button type="primary" class="submit-btn" :loading="submitting" @click="handleSubmit">
            <i class="ri-check-line"></i>
            {{ isReview ? $t('common.submit') : $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const route = useRoute()
const { t } = useI18n()
const isReview = computed(() => route.query.mode === 'review')

const formRef = ref()
const submitting = ref(false)

const form = reactive({
  name: '',
  idNo: '',
  mobile: '',
  region: [],
  cropTypes: [],
  attachments: [],
  address: '',
  remark: '',
  auditOpinion: '',
  auditResult: ''
})

// Region and crop type options (replace with API data)
const regionOptions = ref([
  { value: 'ethiopia', label: 'Ethiopia', children: [
    { value: 'oromia', label: 'Oromia' },
    { value: 'amhara', label: 'Amhara' },
    { value: 'tigray', label: 'Tigray' },
    { value: 'snnpr', label: 'SNNPR' }
  ]}
])

const cropTypeOptions = ref([
  { value: 'coffee', label: 'Coffee' },
  { value: 'teff', label: 'Teff' },
  { value: 'maize', label: 'Maize' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'barley', label: 'Barley' },
  { value: 'sorghum', label: 'Sorghum' }
])

// Validation
const isIdCard = (val) => /^[0-9A-Za-z]{6,20}$/.test(val)
const isPhone = (val) => /^[0-9\-+()\s]{7,18}$/.test(val)

const rules = computed(() => ({
  name: [{ required: true, message: t('identity.placeholder.name'), trigger: 'blur' }],
  idNo: [
    { required: true, message: t('identity.placeholder.idNo'), trigger: 'blur' },
    { validator: (_r, v, cb) => isIdCard(v) ? cb() : cb(new Error(t('identity.placeholder.idNo'))), trigger: ['blur', 'change'] }
  ],
  mobile: [
    { required: true, message: t('identity.placeholder.mobile'), trigger: 'blur' },
    { validator: (_r, v, cb) => isPhone(v) ? cb() : cb(new Error(t('identity.placeholder.mobile'))), trigger: ['blur', 'change'] }
  ],
  region: [{ required: true, message: t('identity.placeholder.region'), trigger: 'change' }],
  cropTypes: [{ required: true, message: t('identity.placeholder.cropTypes'), trigger: 'change' }],
  attachments: [{ required: false }],
  address: [{ required: true, message: t('identity.placeholder.address'), trigger: 'blur' }],
  remark: [{ required: false }],
  auditOpinion: [
    { required: isReview.value, message: t('identity.placeholder.auditOpinion'), trigger: 'blur' }
  ],
  auditResult: [
    { required: isReview.value, message: t('identity.form.auditResult'), trigger: 'change' }
  ]
}))

const handleFileChange = (file, fileList) => {
  form.attachments = fileList
}

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      submitting.value = true
      // TODO: Connect to API
      ElMessage.success(t('common.success'))
    } catch (e) {
      ElMessage.error(t('common.failed'))
    } finally {
      submitting.value = false
    }
  })
}

onMounted(() => {
  // TODO: Load detail data if in review mode
})
</script>

<style scoped>
.page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px;
  min-height: calc(100vh - 200px);
}

.page-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.header-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 154, 68, 0.25);
}

.header-icon i {
  font-size: 36px;
  color: white;
}

.header-title {
  font-size: 28px;
  font-weight: 700;
  color: #009A44;
  margin: 0 0 10px 0;
}

.header-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* Form Sections */
.form-section {
  margin-bottom: 32px;
  padding: 24px;
  background: rgba(0, 154, 68, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(0, 154, 68, 0.08);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 154, 68, 0.12);
}

.section-title i {
  font-size: 20px;
}

/* Audit Section */
.audit-section {
  background: rgba(254, 221, 0, 0.05);
  border-color: rgba(254, 221, 0, 0.2);
}

.audit-title {
  color: #B8860B;
  border-bottom-color: rgba(254, 221, 0, 0.2);
}

/* Form Items */
.form-body :deep(.el-form-item__label) {
  color: #606266;
  font-weight: 500;
}

.form-body :deep(.el-input__wrapper),
.form-body :deep(.el-textarea__inner) {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-body :deep(.el-input__wrapper:hover),
.form-body :deep(.el-textarea__inner:hover) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

.form-body :deep(.el-input__wrapper.is-focus),
.form-body :deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

.form-body :deep(.el-input__prefix) {
  color: #909399;
}

.full-width {
  width: 100%;
}

/* Upload */
.upload-block {
  width: 100%;
}

.upload-btn {
  border-color: #009A44;
  color: #009A44;
}

.upload-btn:hover {
  background: rgba(0, 154, 68, 0.08);
}

.upload-btn i {
  margin-right: 6px;
}

.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 6px;
}

/* Audit Radio Group */
.audit-radio-group {
  display: flex;
  gap: 16px;
}

.audit-radio-group :deep(.el-radio-button__inner) {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}

.audit-radio-group :deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-radius: 8px;
}

.audit-radio-group :deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 8px;
}

.audit-radio-group :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: #009A44;
  border-color: #009A44;
}

/* Actions */
.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.back-btn {
  min-width: 120px;
  height: 44px;
  border-radius: 8px;
  font-weight: 600;
}

.back-btn i {
  margin-right: 6px;
}

.submit-btn {
  min-width: 140px;
  height: 44px;
  border-radius: 8px;
  font-weight: 600;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%);
}

.submit-btn i {
  margin-right: 6px;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 16px;
  }

  .page-card {
    padding: 24px 16px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
  }

  .header-icon i {
    font-size: 30px;
  }

  .header-title {
    font-size: 24px;
  }

  .form-section {
    padding: 16px;
  }

  .actions {
    flex-direction: column;
  }

  .back-btn,
  .submit-btn {
    width: 100%;
  }
}
</style>
