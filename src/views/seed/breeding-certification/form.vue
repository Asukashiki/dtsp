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
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  getBreedingCertificationDetail,
  addBreedingCertification,
  updateBreedingCertification,
  uploadFile
} from '@/api/seed'
import { getFilePreviewUrl } from '@/api/file'

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
    if (res.code === 200 && res.data) {
      // 获取后端返回的文件信息
      const fileData = res.data
      // 使用 dataId 作为文件路径（与 auth.vue 保持一致）
      const dataId = fileData.id || fileData.dataId

      console.log('Upload response:', fileData) // 调试用，查看后端返回的数据结构

      // 创建文件对象，保存所有必要信息
      const fileObj = {
        name: file.name,
        uid: file.uid,
        dataId: dataId, // 保存 dataId，用于提交到后端
        fileId: dataId  // 保持兼容性
      }

      // 如果是照片，使用本地临时URL作为缩略图（避免立即请求预览接口导致失败）
      if (fieldName === 'photo') {
        // 使用 createObjectURL 创建本地预览URL（更高效）
        fileObj.url = URL.createObjectURL(file)
      } else {
        // 非图片文件使用 dataId 作为 url，用于列表显示
        fileObj.url = dataId
      }

      // 根据字段名更新对应的文件列表
      if (fieldName === 'trialReport') {
        formData.trialPerformance.trialReport = [fileObj]
        console.log('Trial report uploaded:', fileObj)
      } else if (fieldName === 'photo') {
        formData.trialPerformance.photo = [fileObj]
        console.log('Photo uploaded:', fileObj)
      } else if (fieldName === 'certificationDocument') {
        formData.supervision.certificationDocument = [fileObj]
        console.log('Certification document uploaded:', fileObj)
      }

      ElMessage.success(t('common.uploadSuccess'))
    } else {
      ElMessage.error(res.msg || t('common.uploadFailed'))
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
const handlePreviewFile = async (file) => {
  if (!file.url && !file.dataId && !file.fileId) return

  try {
    let previewUrl = ''

    // 优先使用 dataId（与 auth.vue 保持一致）
    const pathToPreview = file.dataId || file.fileId || file.url

    // 如果 url 已经是完整的 HTTP URL，直接使用
    if (file.url && file.url.startsWith('http')) {
      previewUrl = file.url
    } else if (pathToPreview) {
      // 否则通过接口获取预览 URL
      const res = await getFilePreviewUrl(pathToPreview)
      previewUrl = res.code === 200 ? res.msg : ''
    }

    if (previewUrl) {
      window.open(previewUrl, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview file:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 图片预览处理
const handlePreviewImage = async (file) => {
  if (!file.url && !file.dataId && !file.fileId) return

  try {
    let previewUrl = ''

    // 如果 url 是 blob URL（本地临时文件），直接使用
    if (file.url && file.url.startsWith('blob:')) {
      previewUrl = file.url
    }
    // 如果 url 已经是完整的 HTTP URL，直接使用
    else if (file.url && file.url.startsWith('http')) {
      previewUrl = file.url
    }
    // 否则需要通过接口获取预览 URL
    else {
      const pathToPreview = file.dataId || file.fileId || file.url
      if (pathToPreview) {
        const res = await getFilePreviewUrl(pathToPreview)
        previewUrl = res.code === 200 ? res.msg : ''
      }
    }

    if (previewUrl) {
      previewImageUrl.value = previewUrl
      imagePreviewVisible.value = true
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview image:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 加载详情数据
const loadDetail = async () => {
  try {
    const res = await getBreedingCertificationDetail(route.params.id)
    if (res.code === 200) {
      const data = res.data

      // 先赋值基础字段
      formData.breedingBatchId = data.breedingBatchId || ''
      formData.authId = data.authId || ''
      formData.applyOrgName = data.applyOrgName || ''
      formData.applyOrgId = data.applyOrgId || ''
      formData.recordDate = data.recordDate || ''
      formData.cropType = data.cropType || ''
      formData.varietyName = data.varietyName || ''
      formData.recordStatus = data.recordStatus || 'draft'

      // 处理嵌套对象 - 品种信息
      if (data.varietyInfo) {
        Object.assign(formData.varietyInfo, data.varietyInfo)
      }

      // 处理嵌套对象 - 技术性状
      if (data.technicalTrait) {
        Object.assign(formData.technicalTrait, data.technicalTrait)
      }

      // 处理嵌套对象 - 试验性能（不包括文件字段）
      if (data.trialPerformance) {
        formData.trialPerformance.trialLocation = data.trialPerformance.trialLocation || ''
        formData.trialPerformance.trialYear = data.trialPerformance.trialYear || new Date().getFullYear()
        formData.trialPerformance.averageYield = data.trialPerformance.averageYield || 0
        formData.trialPerformance.stabilityScore = data.trialPerformance.stabilityScore || 0
      }

      // 处理嵌套对象 - 监管信息（不包括文件字段）
      if (data.supervision) {
        formData.supervision.approvalNumber = data.supervision.approvalNumber || ''
        formData.supervision.approvalOrganization = data.supervision.approvalOrganization || ''
        formData.supervision.approvalDate = data.supervision.approvalDate || ''
      }

      // 将文件 dataId 字符串转换为文件数组格式
      // 处理试验报告
      if (data.trialPerformance && data.trialPerformance.trialReport) {
        const trialReportId = data.trialPerformance.trialReport
        if (typeof trialReportId === 'string' && trialReportId) {
          formData.trialPerformance.trialReport = [{
            name: 'trial_report',
            url: trialReportId,
            dataId: trialReportId,
            fileId: trialReportId,
            uid: Date.now() + '-trialReport'
          }]
        }
      } else {
        formData.trialPerformance.trialReport = []
      }

      // 处理照片（参考 auth.vue 的处理方式）
      if (data.trialPerformance && data.trialPerformance.photo) {
        const photoId = data.trialPerformance.photo
        if (typeof photoId === 'string' && photoId) {
          // 获取照片预览URL用于缩略图显示
          try {
            const previewRes = await getFilePreviewUrl(photoId)
            const previewUrl = previewRes.code === 200 ? previewRes.msg : ''
            formData.trialPerformance.photo = [{
              name: 'photo',
              url: previewUrl, // 使用预览URL
              dataId: photoId, // 保存原始文件ID用于提交
              fileId: photoId,
              uid: photoId // 使用文件ID作为uid（参考 auth.vue）
            }]
          } catch (error) {
            console.error('Failed to load photo preview:', error)
            // 如果获取预览失败，url 留空，只保存 dataId
            formData.trialPerformance.photo = [{
              name: 'photo',
              url: '',
              dataId: photoId,
              fileId: photoId,
              uid: photoId
            }]
          }
        }
      } else {
        formData.trialPerformance.photo = []
      }

      // 处理认证文件
      if (data.supervision && data.supervision.certificationDocument) {
        const certDocId = data.supervision.certificationDocument
        if (typeof certDocId === 'string' && certDocId) {
          formData.supervision.certificationDocument = [{
            name: 'certification_document',
            url: certDocId,
            dataId: certDocId,
            fileId: certDocId,
            uid: Date.now() + '-certificationDocument'
          }]
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

    // 准备提交数据，将文件数组转换为 dataId
    const submitData = {
      ...formData,
      trialPerformance: {
        ...formData.trialPerformance,
        // 试验报告使用 dataId（与 auth.vue 保持一致）
        trialReport: formData.trialPerformance.trialReport.length > 0
          ? (formData.trialPerformance.trialReport[0].dataId || formData.trialPerformance.trialReport[0].fileId || '')
          : '',
        // 照片使用 dataId
        photo: formData.trialPerformance.photo.length > 0
          ? (formData.trialPerformance.photo[0].dataId || formData.trialPerformance.photo[0].fileId || '')
          : ''
      },
      supervision: {
        ...formData.supervision,
        // 认证文件使用 dataId
        certificationDocument: formData.supervision.certificationDocument.length > 0
          ? (formData.supervision.certificationDocument[0].dataId || formData.supervision.certificationDocument[0].fileId || '')
          : ''
      }
    }

    // 详细调试日志
    console.log('=== 提交数据调试 ===')
    console.log('原始文件数组 - trialReport:', formData.trialPerformance.trialReport)
    console.log('原始文件数组 - photo:', formData.trialPerformance.photo)
    console.log('原始文件数组 - certificationDocument:', formData.supervision.certificationDocument)
    console.log('---')
    console.log('提交数据 - trialReport:', submitData.trialPerformance.trialReport)
    console.log('提交数据 - photo:', submitData.trialPerformance.photo)
    console.log('提交数据 - certificationDocument:', submitData.supervision.certificationDocument)
    console.log('---')
    console.log('完整提交对象:', JSON.stringify(submitData, null, 2))
    console.log('===================')

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

// 组件卸载前清理 ObjectURL
onBeforeUnmount(() => {
  // 清理照片的 ObjectURL
  if (formData.trialPerformance.photo.length > 0) {
    const photo = formData.trialPerformance.photo[0]
    if (photo.url && photo.url.startsWith('blob:')) {
      URL.revokeObjectURL(photo.url)
    }
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
