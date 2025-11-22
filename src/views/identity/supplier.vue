<template>
  <div class="page-container">
    <div class="page-card">
      <!-- Header -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-store-2-line"></i>
        </div>
        <h1 class="header-title">{{ $t('identity.supplierTitle') }}</h1>
        <p class="header-subtitle">{{ $t('identity.supplierSubtitle') }}</p>
      </div>

      <!-- Form -->
      <el-form ref="formRef" :model="form" :rules="rules" label-width="160px" class="form-body" status-icon>
        <!-- Entity Info Section -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-building-line"></i>
            <span>{{ $t('identity.form.entityType') }}</span>
          </div>

          <el-row :gutter="24">
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.entityType')" prop="entityType">
                <el-radio-group v-model="form.entityType" class="entity-radio-group">
                  <el-radio-button label="enterprise">
                    <i class="ri-building-2-line"></i>
                    Enterprise
                  </el-radio-button>
                  <el-radio-button label="individual">
                    <i class="ri-user-line"></i>
                    Individual
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.entityName')" prop="name">
                <el-input v-model.trim="form.name" :placeholder="$t('identity.placeholder.entityName')" clearable>
                  <template #prefix>
                    <i class="ri-building-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.uscc')" prop="uscc">
                <el-input v-model.trim="form.uscc" :placeholder="$t('identity.placeholder.uscc')" clearable>
                  <template #prefix>
                    <i class="ri-barcode-line"></i>
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

        <!-- Legal Person Section -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-user-star-line"></i>
            <span>{{ $t('identity.form.legalPerson') }}</span>
          </div>

          <el-row :gutter="24">
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.legalPerson')" prop="legalPerson">
                <el-input v-model.trim="form.legalPerson" :placeholder="$t('identity.placeholder.legalPerson')" clearable>
                  <template #prefix>
                    <i class="ri-user-3-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.legalIdNo')" prop="legalIdNo">
                <el-input v-model.trim="form.legalIdNo" :placeholder="$t('identity.placeholder.legalIdNo')" clearable>
                  <template #prefix>
                    <i class="ri-id-card-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- Business Info Section -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-file-list-3-line"></i>
            <span>{{ $t('identity.form.scope') }}</span>
          </div>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item :label="$t('identity.form.scope')" prop="scope">
                <el-input
                  type="textarea"
                  :rows="3"
                  v-model.trim="form.scope"
                  :placeholder="$t('identity.placeholder.scope')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item :label="$t('identity.form.license')" prop="license">
                <el-upload
                  class="upload-block"
                  action="#"
                  :auto-upload="false"
                  :on-change="handleFileChange"
                  :file-list="form.license"
                  :limit="3"
                  accept=".jpg,.jpeg,.png,.pdf"
                  list-type="text"
                >
                  <el-button type="primary" plain class="upload-btn">
                    <i class="ri-upload-2-line"></i>
                    {{ $t('identity.form.license') }}
                  </el-button>
                  <template #tip>
                    <div class="upload-tip">{{ $t('identity.uploadTip', { count: 3 }) }}</div>
                  </template>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- Contact Section -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-contacts-line"></i>
            <span>{{ $t('identity.form.contactName') }}</span>
          </div>

          <el-row :gutter="24">
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.contactName')" prop="contactName">
                <el-input v-model.trim="form.contactName" :placeholder="$t('identity.placeholder.contactName')">
                  <template #prefix>
                    <i class="ri-user-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item :label="$t('identity.form.contactMobile')" prop="contactMobile">
                <el-input v-model.trim="form.contactMobile" :placeholder="$t('identity.placeholder.contactMobile')">
                  <template #prefix>
                    <i class="ri-phone-line"></i>
                  </template>
                </el-input>
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
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const route = useRoute()
const { t } = useI18n()
const isReview = computed(() => route.query.mode === 'review')

const formRef = ref()
const submitting = ref(false)

const form = reactive({
  entityType: 'enterprise',
  name: '',
  uscc: '',
  legalPerson: '',
  legalIdNo: '',
  region: [],
  scope: '',
  license: [],
  contactName: '',
  contactMobile: '',
  auditOpinion: '',
  auditResult: ''
})

const regionOptions = ref([
  { value: 'ethiopia', label: 'Ethiopia', children: [
    { value: 'oromia', label: 'Oromia' },
    { value: 'amhara', label: 'Amhara' },
    { value: 'tigray', label: 'Tigray' },
    { value: 'snnpr', label: 'SNNPR' }
  ]}
])

// Validators
const isUSCC = (val) => /^[0-9A-Z]{18}$/i.test(val)
const isIdCard = (val) => /^[0-9A-Za-z]{6,20}$/.test(val)
const isPhone = (val) => /^[0-9\-+()\s]{7,18}$/.test(val)

const rules = computed(() => ({
  entityType: [{ required: true, message: t('identity.form.entityType'), trigger: 'change' }],
  name: [{ required: true, message: t('identity.placeholder.entityName'), trigger: 'blur' }],
  uscc: [
    { required: true, message: t('identity.placeholder.uscc'), trigger: 'blur' },
    { validator: (_r, v, cb) => isUSCC(v) ? cb() : cb(new Error(t('identity.placeholder.uscc'))), trigger: ['blur', 'change'] }
  ],
  legalPerson: [{ required: true, message: t('identity.placeholder.legalPerson'), trigger: 'blur' }],
  legalIdNo: [
    { required: true, message: t('identity.placeholder.legalIdNo'), trigger: 'blur' },
    { validator: (_r, v, cb) => isIdCard(v) ? cb() : cb(new Error(t('identity.placeholder.legalIdNo'))), trigger: ['blur', 'change'] }
  ],
  region: [{ required: true, message: t('identity.placeholder.region'), trigger: 'change' }],
  scope: [{ required: true, message: t('identity.placeholder.scope'), trigger: 'blur' }],
  license: [{ required: true, message: t('identity.form.license'), trigger: 'change' }],
  contactName: [{ required: true, message: t('identity.placeholder.contactName'), trigger: 'blur' }],
  contactMobile: [
    { required: true, message: t('identity.placeholder.contactMobile'), trigger: 'blur' },
    { validator: (_r, v, cb) => isPhone(v) ? cb() : cb(new Error(t('identity.placeholder.contactMobile'))), trigger: ['blur', 'change'] }
  ],
  auditOpinion: [{ required: isReview.value, message: t('identity.placeholder.auditOpinion'), trigger: 'blur' }],
  auditResult: [{ required: isReview.value, message: t('identity.form.auditResult'), trigger: 'change' }]
}))

const handleFileChange = (file, fileList) => {
  form.license = fileList
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
  border-bottom: 2px solid rgba(254, 221, 0, 0.2);
}

.header-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(254, 221, 0, 0.35);
}

.header-icon i {
  font-size: 36px;
  color: #333;
}

.header-title {
  font-size: 28px;
  font-weight: 700;
  color: #B8860B;
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
  background: rgba(254, 221, 0, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(254, 221, 0, 0.15);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #B8860B;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(254, 221, 0, 0.2);
}

.section-title i {
  font-size: 20px;
}

/* Audit Section */
.audit-section {
  background: rgba(0, 154, 68, 0.03);
  border-color: rgba(0, 154, 68, 0.15);
}

.audit-title {
  color: #009A44;
  border-bottom-color: rgba(0, 154, 68, 0.15);
}

/* Entity Radio Group */
.entity-radio-group :deep(.el-radio-button__inner) {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  font-weight: 500;
}

.entity-radio-group :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: #FEDD00;
  border-color: #FEDD00;
  color: #333;
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
  box-shadow: 0 0 0 1px #FEDD00 inset;
}

.form-body :deep(.el-input__wrapper.is-focus),
.form-body :deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px #FEDD00 inset;
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
  border-color: #FEDD00;
  color: #B8860B;
}

.upload-btn:hover {
  background: rgba(254, 221, 0, 0.15);
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
  background: linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%);
  border: none;
  color: #333;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #E6C700 0%, #FEDD00 100%);
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
