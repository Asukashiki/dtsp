<template>
  <div class="certification-form-container">
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
            {{ isEdit ? $t('seed.breedingCertification.edit') : $t('seed.breedingCertification.add') }}
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
        <!-- 认证申请信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-file-text-line"></i>
            {{ $t('seed.breedingCertification.form.certificationInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.authId')"
                prop="authId"
              >
                <el-input
                  v-model="formData.authId"
                  :placeholder="$t('seed.breedingCertification.placeholder.authId')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.breedingBatchId')"
                prop="breedingBatchId"
              >
                <el-input
                  v-model="formData.breedingBatchId"
                  :placeholder="$t('seed.breedingCertification.placeholder.breedingBatchId')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.applyOrgName')"
                prop="applyOrgName"
              >
                <el-input
                  v-model="formData.applyOrgName"
                  :placeholder="$t('seed.breedingCertification.placeholder.applyOrgName')"
                  maxlength="200"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.applyOrgId')"
                prop="applyOrgId"
              >
                <el-input
                  v-model="formData.applyOrgId"
                  :placeholder="$t('seed.breedingCertification.placeholder.applyOrgId')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.recordDate')"
                prop="recordDate"
              >
                <el-date-picker
                  v-model="formData.recordDate"
                  type="date"
                  :placeholder="$t('seed.breedingCertification.placeholder.recordDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.cropType')"
                prop="cropType"
              >
                <el-select
                  v-model="formData.cropType"
                  :placeholder="$t('seed.breedingCertification.placeholder.cropType')"
                  style="width: 100%"
                >
                  <el-option :label="$t('seed.breedingCertification.cropTypes.wheat')" value="wheat" />
                  <el-option :label="$t('seed.breedingCertification.cropTypes.rice')" value="rice" />
                  <el-option :label="$t('seed.breedingCertification.cropTypes.corn')" value="corn" />
                  <el-option :label="$t('seed.breedingCertification.cropTypes.soybean')" value="soybean" />
                  <el-option :label="$t('seed.breedingCertification.cropTypes.cotton')" value="cotton" />
                  <el-option :label="$t('seed.breedingCertification.cropTypes.other')" value="other" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.varietyName')"
                prop="varietyName"
              >
                <el-input
                  v-model="formData.varietyName"
                  :placeholder="$t('seed.breedingCertification.placeholder.varietyName')"
                  maxlength="200"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.recordStatus')"
                prop="recordStatus"
              >
                <el-select
                  v-model="formData.recordStatus"
                  :placeholder="$t('seed.breedingCertification.placeholder.recordStatus')"
                  style="width: 100%"
                >
                  <el-option :label="$t('seed.breedingCertification.recordStatus.draft')" value="draft" />
                  <el-option :label="$t('seed.breedingCertification.recordStatus.pending')" value="pending" />
                  <el-option :label="$t('seed.breedingCertification.recordStatus.approved')" value="approved" />
                  <el-option :label="$t('seed.breedingCertification.recordStatus.rejected')" value="rejected" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 品种信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-seedling-line"></i>
            {{ $t('seed.breedingCertification.form.varietyInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.varietyCode')"
                prop="varietyInfo.varietyCode"
              >
                <el-input
                  v-model="formData.varietyInfo.varietyCode"
                  :placeholder="$t('seed.breedingCertification.placeholder.varietyCode')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.species')"
                prop="varietyInfo.species"
              >
                <el-input
                  v-model="formData.varietyInfo.species"
                  :placeholder="$t('seed.breedingCertification.placeholder.species')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.genus')"
                prop="varietyInfo.genus"
              >
                <el-input
                  v-model="formData.varietyInfo.genus"
                  :placeholder="$t('seed.breedingCertification.placeholder.genus')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.family')"
                prop="varietyInfo.family"
              >
                <el-input
                  v-model="formData.varietyInfo.family"
                  :placeholder="$t('seed.breedingCertification.placeholder.family')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.breedingMethod')"
                prop="varietyInfo.breedingMethod"
              >
                <el-select
                  v-model="formData.varietyInfo.breedingMethod"
                  :placeholder="$t('seed.breedingCertification.placeholder.breedingMethod')"
                  style="width: 100%"
                >
                  <el-option :label="$t('seed.breedingCertification.breedingMethods.hybridization')" value="hybridization" />
                  <el-option :label="$t('seed.breedingCertification.breedingMethods.mutation')" value="mutation" />
                  <el-option :label="$t('seed.breedingCertification.breedingMethods.selection')" value="selection" />
                  <el-option :label="$t('seed.breedingCertification.breedingMethods.biotechnology')" value="biotechnology" />
                  <el-option :label="$t('seed.breedingCertification.breedingMethods.other')" value="other" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.breedingYear')"
                prop="varietyInfo.breedingYear"
              >
                <el-input-number
                  v-model="formData.varietyInfo.breedingYear"
                  :min="1900"
                  :max="new Date().getFullYear()"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item
                :label="$t('seed.breedingCertification.form.pedigree')"
                prop="varietyInfo.pedigree"
              >
                <el-input
                  v-model="formData.varietyInfo.pedigree"
                  type="textarea"
                  :rows="2"
                  :placeholder="$t('seed.breedingCertification.placeholder.pedigree')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 技术性状信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('seed.breedingCertification.form.technicalTrait') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.minYieldPotential')"
                prop="technicalTrait.minYieldPotential"
              >
                <el-input-number
                  v-model="formData.technicalTrait.minYieldPotential"
                  :min="0"
                  :precision="2"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.maxYieldPotential')"
                prop="technicalTrait.maxYieldPotential"
              >
                <el-input-number
                  v-model="formData.technicalTrait.maxYieldPotential"
                  :min="0"
                  :precision="2"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.maturityPeriod')"
                prop="technicalTrait.maturityPeriod"
              >
                <el-input-number
                  v-model="formData.technicalTrait.maturityPeriod"
                  :min="0"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.plantHeight')"
                prop="technicalTrait.plantHeight"
              >
                <el-input-number
                  v-model="formData.technicalTrait.plantHeight"
                  :min="0"
                  :precision="2"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.diseaseResistance')"
                prop="technicalTrait.diseaseResistance"
              >
                <el-input
                  v-model="formData.technicalTrait.diseaseResistance"
                  :placeholder="$t('seed.breedingCertification.placeholder.diseaseResistance')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.stressResistance')"
                prop="technicalTrait.stressResistance"
              >
                <el-input
                  v-model="formData.technicalTrait.stressResistance"
                  :placeholder="$t('seed.breedingCertification.placeholder.stressResistance')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item
                :label="$t('seed.breedingCertification.form.grainQualityTrait')"
                prop="technicalTrait.grainQualityTrait"
              >
                <el-input
                  v-model="formData.technicalTrait.grainQualityTrait"
                  type="textarea"
                  :rows="2"
                  :placeholder="$t('seed.breedingCertification.placeholder.grainQualityTrait')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 试验与性能信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-flask-line"></i>
            {{ $t('seed.breedingCertification.form.trialPerformance') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.trialLocation')"
                prop="trialPerformance.trialLocation"
              >
                <el-input
                  v-model="formData.trialPerformance.trialLocation"
                  :placeholder="$t('seed.breedingCertification.placeholder.trialLocation')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.trialYear')"
                prop="trialPerformance.trialYear"
              >
                <el-input-number
                  v-model="formData.trialPerformance.trialYear"
                  :min="1900"
                  :max="new Date().getFullYear()"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.averageYield')"
                prop="trialPerformance.averageYield"
              >
                <el-input-number
                  v-model="formData.trialPerformance.averageYield"
                  :min="0"
                  :precision="2"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.stabilityScore')"
                prop="trialPerformance.stabilityScore"
              >
                <el-input-number
                  v-model="formData.trialPerformance.stabilityScore"
                  :min="0"
                  :max="10"
                  :precision="2"
                  style="width: 100%"
                  controls-position="right"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.trialReport')"
                prop="trialPerformance.trialReport"
              >
                <el-upload
                  class="doc-upload"
                  :http-request="(options) => handleUploadFile(options, 'trialReport')"
                  :file-list="formData.trialPerformance.trialReport"
                  :on-remove="() => handleRemove('trialReport')"
                  :on-preview="handlePreviewFile"
                  :limit="1"
                  accept=".pdf,.doc,.docx"
                >
                  <el-button type="primary" link>
                    <i class="ri-upload-2-line"></i>
                    {{ $t('seed.breedingCertification.placeholder.trialReport') }}
                  </el-button>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.photo')"
                prop="trialPerformance.photo"
              >
                <el-upload
                  class="doc-upload"
                  :http-request="(options) => handleUploadFile(options, 'photo')"
                  :file-list="formData.trialPerformance.photo"
                  :on-remove="() => handleRemove('photo')"
                  :on-preview="handlePreviewImage"
                  :limit="1"
                  accept=".jpg,.jpeg,.png,.gif"
                  list-type="picture"
                >
                  <el-button type="primary" link>
                    <i class="ri-image-add-line"></i>
                    {{ $t('seed.breedingCertification.placeholder.photo') }}
                  </el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 监管信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('seed.breedingCertification.form.supervision') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.approvalNumber')"
                prop="supervision.approvalNumber"
              >
                <el-input
                  v-model="formData.supervision.approvalNumber"
                  :placeholder="$t('seed.breedingCertification.placeholder.approvalNumber')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.approvalOrganization')"
                prop="supervision.approvalOrganization"
              >
                <el-input
                  v-model="formData.supervision.approvalOrganization"
                  :placeholder="$t('seed.breedingCertification.placeholder.approvalOrganization')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.approvalDate')"
                prop="supervision.approvalDate"
              >
                <el-date-picker
                  v-model="formData.supervision.approvalDate"
                  type="date"
                  :placeholder="$t('seed.breedingCertification.placeholder.approvalDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('seed.breedingCertification.form.certificationDocument')"
                prop="supervision.certificationDocument"
              >
                <el-upload
                  class="doc-upload"
                  :http-request="(options) => handleUploadFile(options, 'certificationDocument')"
                  :file-list="formData.supervision.certificationDocument"
                  :on-remove="() => handleRemove('certificationDocument')"
                  :on-preview="handlePreviewFile"
                  :limit="1"
                  accept=".pdf,.doc,.docx"
                >
                  <el-button type="primary" link>
                    <i class="ri-upload-2-line"></i>
                    {{ $t('seed.breedingCertification.placeholder.certificationDocument') }}
                  </el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
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

    <!-- 图片预览对话框 -->
    <el-dialog
      v-model="imagePreviewVisible"
      :title="$t('common.preview')"
      width="80%"
      append-to-body
    >
      <div class="image-preview-container">
        <img :src="previewImageUrl" alt="Preview" class="preview-image" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  getBreedingCertificationDetail,
  addBreedingCertification,
  updateBreedingCertification,
  uploadFile,
  getFileDownloadUrl
} from '@/api/seed'

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

// 图片预览
const imagePreviewVisible = ref(false)
const previewImageUrl = ref('')

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单数据
const formData = reactive({
  breedingBatchId: '',
  authId: '',
  applyOrgName: '',
  applyOrgId: '',
  recordDate: '',
  cropType: '',
  varietyName: '',
  recordStatus: 'draft',
  varietyInfo: {
    varietyName: '',
    varietyCode: '',
    cropType: '',
    species: '',
    genus: '',
    family: '',
    breedingMethod: '',
    pedigree: '',
    breedingYear: new Date().getFullYear()
  },
  technicalTrait: {
    minYieldPotential: 0,
    maxYieldPotential: 0,
    diseaseResistance: '',
    stressResistance: '',
    maturityPeriod: 0,
    plantHeight: 0,
    grainQualityTrait: ''
  },
  trialPerformance: {
    trialLocation: '',
    trialYear: new Date().getFullYear(),
    averageYield: 0,
    stabilityScore: 0,
    trialReport: [],
    photo: []
  },
  supervision: {
    approvalNumber: '',
    approvalOrganization: '',
    approvalDate: '',
    certificationDocument: []
  }
})

// 表单验证规则
const rules = computed(() => ({
  authId: [
    { required: true, message: t('seed.breedingCertification.rules.authIdRequired'), trigger: 'blur' }
  ],
  cropType: [
    { required: true, message: t('seed.breedingCertification.rules.cropTypeRequired'), trigger: 'change' }
  ],
  varietyName: [
    { required: true, message: t('seed.breedingCertification.rules.varietyNameRequired'), trigger: 'blur' }
  ],
  recordStatus: [
    { required: true, message: t('seed.breedingCertification.rules.recordStatusRequired'), trigger: 'change' }
  ],
  'varietyInfo.varietyCode': [
    { required: true, message: t('seed.breedingCertification.rules.varietyCodeRequired'), trigger: 'blur' }
  ],
  'varietyInfo.species': [
    { required: true, message: t('seed.breedingCertification.rules.speciesRequired'), trigger: 'blur' }
  ],
  'varietyInfo.genus': [
    { required: true, message: t('seed.breedingCertification.rules.genusRequired'), trigger: 'blur' }
  ],
  'varietyInfo.family': [
    { required: true, message: t('seed.breedingCertification.rules.familyRequired'), trigger: 'blur' }
  ],
  'varietyInfo.breedingMethod': [
    { required: true, message: t('seed.breedingCertification.rules.breedingMethodRequired'), trigger: 'change' }
  ],
  'varietyInfo.pedigree': [
    { required: true, message: t('seed.breedingCertification.rules.pedigreeRequired'), trigger: 'blur' }
  ],
  'varietyInfo.breedingYear': [
    { required: true, message: t('seed.breedingCertification.rules.breedingYearRequired'), trigger: 'blur' }
  ],
  'technicalTrait.minYieldPotential': [
    { required: true, message: t('seed.breedingCertification.rules.minYieldPotentialRequired'), trigger: 'blur' }
  ],
  'technicalTrait.maxYieldPotential': [
    { required: true, message: t('seed.breedingCertification.rules.maxYieldPotentialRequired'), trigger: 'blur' }
  ],
  'technicalTrait.diseaseResistance': [
    { required: true, message: t('seed.breedingCertification.rules.diseaseResistanceRequired'), trigger: 'blur' }
  ],
  'technicalTrait.stressResistance': [
    { required: true, message: t('seed.breedingCertification.rules.stressResistanceRequired'), trigger: 'blur' }
  ],
  'technicalTrait.maturityPeriod': [
    { required: true, message: t('seed.breedingCertification.rules.maturityPeriodRequired'), trigger: 'blur' }
  ],
  'technicalTrait.plantHeight': [
    { required: true, message: t('seed.breedingCertification.rules.plantHeightRequired'), trigger: 'blur' }
  ],
  'technicalTrait.grainQualityTrait': [
    { required: true, message: t('seed.breedingCertification.rules.grainQualityTraitRequired'), trigger: 'blur' }
  ],
  'trialPerformance.trialLocation': [
    { required: true, message: t('seed.breedingCertification.rules.trialLocationRequired'), trigger: 'blur' }
  ],
  'trialPerformance.trialYear': [
    { required: true, message: t('seed.breedingCertification.rules.trialYearRequired'), trigger: 'blur' }
  ],
  'trialPerformance.averageYield': [
    { required: true, message: t('seed.breedingCertification.rules.averageYieldRequired'), trigger: 'blur' }
  ],
  'trialPerformance.stabilityScore': [
    { required: true, message: t('seed.breedingCertification.rules.stabilityScoreRequired'), trigger: 'blur' }
  ],
  'trialPerformance.trialReport': [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error(t('seed.breedingCertification.rules.trialReportRequired')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  'trialPerformance.photo': [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error(t('seed.breedingCertification.rules.photoRequired')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  'supervision.approvalNumber': [
    { required: true, message: t('seed.breedingCertification.rules.approvalNumberRequired'), trigger: 'blur' }
  ],
  'supervision.approvalOrganization': [
    { required: true, message: t('seed.breedingCertification.rules.approvalOrganizationRequired'), trigger: 'blur' }
  ],
  'supervision.approvalDate': [
    { required: true, message: t('seed.breedingCertification.rules.approvalDateRequired'), trigger: 'blur' }
  ],
  'supervision.certificationDocument': [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error(t('seed.breedingCertification.rules.certificationDocumentRequired')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}))

// 文件上传处理
const handleUploadFile = async (options, fieldName) => {
  const { file } = options
  const uploadFormData = new FormData()
  uploadFormData.append('file', file)

  try {
    const res = await uploadFile(uploadFormData)
    if (res.code === 200) {
      const fileObj = {
        name: file.name,
        url: res.data.url,
        uid: file.uid,
        fileId: res.data.fileId || res.data.id // 保存文件ID用于下载
      }

      // 根据字段名更新对应的文件列表
      if (fieldName === 'trialReport') {
        formData.trialPerformance.trialReport = [fileObj]
      } else if (fieldName === 'photo') {
        formData.trialPerformance.photo = [fileObj]
      } else if (fieldName === 'certificationDocument') {
        formData.supervision.certificationDocument = [fileObj]
      }

      ElMessage.success(t('common.uploadSuccess'))
    } else {
      ElMessage.error(t('common.uploadFailed'))
    }
  } catch (error) {
    console.error('Upload error:', error)
    ElMessage.error(t('common.uploadFailed'))
  }
}

// 文件移除处理
const handleRemove = (fieldName) => {
  if (fieldName === 'trialReport') {
    formData.trialPerformance.trialReport = []
  } else if (fieldName === 'photo') {
    formData.trialPerformance.photo = []
  } else if (fieldName === 'certificationDocument') {
    formData.supervision.certificationDocument = []
  }
}

// 文件预览/下载处理
const handlePreviewFile = (file) => {
  // 如果有fileId，使用下载接口
  if (file.fileId) {
    const downloadUrl = getFileDownloadUrl(file.fileId)
    window.open(downloadUrl, '_blank')
  } else if (file.url) {
    // 否则使用url直接下载
    window.open(file.url, '_blank')
  }
}

// 图片预览处理
const handlePreviewImage = (file) => {
  if (file.fileId) {
    previewImageUrl.value = getFileDownloadUrl(file.fileId)
  } else if (file.url) {
    previewImageUrl.value = file.url
  }
  imagePreviewVisible.value = true
}

// 加载详情数据
const loadDetail = async () => {
  try {
    const res = await getBreedingCertificationDetail(route.params.id)
    if (res.code === 200) {
      Object.assign(formData, res.data)

      // 确保嵌套对象存在
      if (!formData.varietyInfo) formData.varietyInfo = {}
      if (!formData.technicalTrait) formData.technicalTrait = {}
      if (!formData.trialPerformance) formData.trialPerformance = {}
      if (!formData.supervision) formData.supervision = {}

      // 将文件URL字符串或对象转换为文件数组格式
      if (formData.trialPerformance.trialReport) {
        if (typeof formData.trialPerformance.trialReport === 'string') {
          formData.trialPerformance.trialReport = [{
            name: formData.trialPerformance.trialReport.split('/').pop(),
            url: formData.trialPerformance.trialReport,
            uid: Date.now() + '-trialReport',
            fileId: res.data.trialPerformance?.trialReportId || ''
          }]
        } else if (!Array.isArray(formData.trialPerformance.trialReport)) {
          formData.trialPerformance.trialReport = []
        }
      } else {
        formData.trialPerformance.trialReport = []
      }

      if (formData.trialPerformance.photo) {
        if (typeof formData.trialPerformance.photo === 'string') {
          formData.trialPerformance.photo = [{
            name: formData.trialPerformance.photo.split('/').pop(),
            url: formData.trialPerformance.photo,
            uid: Date.now() + '-photo',
            fileId: res.data.trialPerformance?.photoId || ''
          }]
        } else if (!Array.isArray(formData.trialPerformance.photo)) {
          formData.trialPerformance.photo = []
        }
      } else {
        formData.trialPerformance.photo = []
      }

      if (formData.supervision.certificationDocument) {
        if (typeof formData.supervision.certificationDocument === 'string') {
          formData.supervision.certificationDocument = [{
            name: formData.supervision.certificationDocument.split('/').pop(),
            url: formData.supervision.certificationDocument,
            uid: Date.now() + '-certificationDocument',
            fileId: res.data.supervision?.certificationDocumentId || ''
          }]
        } else if (!Array.isArray(formData.supervision.certificationDocument)) {
          formData.supervision.certificationDocument = []
        }
      } else {
        formData.supervision.certificationDocument = []
      }
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    submitting.value = true

    // 准备提交数据，将文件数组转换为URL字符串
    const submitData = {
      ...formData,
      trialPerformance: {
        ...formData.trialPerformance,
        trialReport: formData.trialPerformance.trialReport.length > 0 ? formData.trialPerformance.trialReport[0].url : '',
        photo: formData.trialPerformance.photo.length > 0 ? formData.trialPerformance.photo[0].url : ''
      },
      supervision: {
        ...formData.supervision,
        certificationDocument: formData.supervision.certificationDocument.length > 0 ? formData.supervision.certificationDocument[0].url : ''
      }
    }

    let res
    if (isEdit.value) {
      res = await updateBreedingCertification({ ...submitData, dataId: route.params.id })
      if (res.code === 200) {
        ElMessage.success(t('seed.breedingCertification.editSuccess'))
        router.push('/research/seed/breeding-certification')
      }
    } else {
      res = await addBreedingCertification(submitData)
      if (res.code === 200) {
        ElMessage.success(t('seed.breedingCertification.addSuccess'))
        router.push('/research/seed/breeding-certification')
      }
    }
  } catch (error) {
    console.error('Form validation failed or submit error:', error)
  } finally {
    submitting.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.certification-form-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
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

.header-left,
.header-right {
  flex: 1;
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

/* 表单区域 */
.form-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 表单分节 */
.form-section {
  margin-bottom: 32px;
}

.form-section:last-of-type {
  margin-bottom: 0;
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

.section-title i {
  font-size: 20px;
}

/* 操作按钮 */
.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .form-wrapper {
    padding: 24px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
  }

  .header-left .el-button {
    font-size: 14px;
  }

  .page-title {
    font-size: 16px;
  }

  .header-right {
    display: none;
  }

  .form-wrapper {
    padding: 16px 12px;
    border-radius: 0;
    box-shadow: none;
  }

  .form-section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  /* 单列布局 */
  :deep(.el-row) {
    display: block !important;
  }

  :deep(.el-col) {
    max-width: 100% !important;
    margin-bottom: 0 !important;
  }

  :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  :deep(.el-form-item__label) {
    text-align: left !important;
    padding: 0 0 8px 0 !important;
    line-height: 1.4 !important;
    font-size: 14px;
  }

  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  :deep(.el-input),
  :deep(.el-select),
  :deep(.el-textarea),
  :deep(.el-input-number),
  :deep(.el-date-picker) {
    width: 100% !important;
  }

  .form-actions {
    margin-top: 24px;
    padding-top: 20px;
    flex-direction: column;
    gap: 12px;
  }

  .form-actions .el-button {
    width: 100%;
    margin: 0;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
  }

  .header-content {
    padding: 10px 8px;
  }

  .page-title {
    font-size: 15px;
  }

  .form-wrapper {
    padding: 12px 8px;
  }

  .form-section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  :deep(.el-form-item__label) {
    font-size: 13px;
  }
}

/* 文件上传组件样式 */
.doc-upload {
  width: 100%;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-list) {
  margin-top: 8px;
}

:deep(.el-upload-list__item) {
  transition: all 0.3s;
  cursor: pointer;
}

:deep(.el-upload-list__item:hover) {
  background-color: #f5f7fa;
}

:deep(.el-upload-list__item-name) {
  color: #009A44;
  text-decoration: none;
}

:deep(.el-upload-list__item-name:hover) {
  color: #007a36;
  text-decoration: underline;
}

/* 图片预览对话框样式 */
.image-preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
}

.preview-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

@media screen and (max-width: 768px) {
  .image-preview-container {
    min-height: 300px;
    padding: 10px;
  }

  .preview-image {
    max-height: 50vh;
  }
}
</style>
