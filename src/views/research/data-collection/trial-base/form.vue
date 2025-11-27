<template>
  <div class="trial-form-container">
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
            {{ isEdit ? $t('research.dataCollection.trialBase.edit') : $t('research.dataCollection.trialBase.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <div class="form-wrapper">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-width="labelWidth"
        :label-position="labelPosition"
      >
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.dataCollection.trialBase.form.basicInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.trialId')"
                prop="trialId"
              >
                <el-input
                  v-model="formData.trialId"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.trialId')"
                  disabled
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.cropType')"
                prop="cropType"
              >
                <el-select
                  v-model="formData.cropType"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.cropType')"
                  style="width: 100%"
                >
                  <el-option label="Wheat" value="wheat" />
                  <el-option label="Maize" value="maize" />
                  <el-option label="Barley" value="barley" />
                  <el-option label="Teff" value="teff" />
                  <el-option label="Sorghum" value="sorghum" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.varietyName')"
                prop="varietyName"
              >
                <el-input
                  v-model="formData.varietyName"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.varietyName')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.researchCenterId')"
                prop="researchCenterId"
              >
                <el-input
                  v-model="formData.researchCenterId"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.researchCenterId')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.programId')"
                prop="programId"
              >
                <el-input
                  v-model="formData.programId"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.programId')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.subProgramId')"
                prop="subProgramId"
              >
                <el-input
                  v-model="formData.subProgramId"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.subProgramId')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.thematicResearchAreaId')"
                prop="thematicResearchAreaId"
              >
                <el-input
                  v-model="formData.thematicResearchAreaId"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.thematicResearchAreaId')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.season')"
                prop="season"
              >
                <el-select
                  v-model="formData.season"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.season')"
                  style="width: 100%"
                >
                  <el-option label="Spring" value="spring" />
                  <el-option label="Summer" value="summer" />
                  <el-option label="Autumn" value="autumn" />
                  <el-option label="Winter" value="winter" />
                  <el-option label="Rainy Season" value="rainy" />
                  <el-option label="Dry Season" value="dry" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.startDate')"
                prop="startDate"
              >
                <el-date-picker
                  v-model="formData.startDate"
                  type="date"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.startDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.activityCode')"
                prop="activityCode"
              >
                <el-input
                  v-model="formData.activityCode"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.activityCode')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.kpiCode')"
                prop="kpiCode"
              >
                <el-input
                  v-model="formData.kpiCode"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.kpiCode')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <div class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('research.dataCollection.trialBase.form.locationInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.region')"
                prop="region"
              >
                <el-input
                  v-model="formData.region"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.region')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.zone')"
                prop="zone"
              >
                <el-input
                  v-model="formData.zone"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.zone')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.woreda')"
                prop="woreda"
              >
                <el-input
                  v-model="formData.woreda"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.woreda')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.kebele')"
                prop="kebele"
              >
                <el-input
                  v-model="formData.kebele"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.kebele')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.agroEcologicalZone')"
                prop="agroEcologicalZone"
              >
                <el-input
                  v-model="formData.agroEcologicalZone"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.agroEcologicalZone')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12" :xs="24">
              <el-form-item
                :label="$t('research.dataCollection.trialBase.form.gpsLocation')"
                prop="gpsLocation"
              >
                <el-input
                  v-model="formData.gpsLocation"
                  :placeholder="$t('research.dataCollection.trialBase.placeholder.gpsLocation')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

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
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getTrialBaseDetail, addTrialBase, editTrialBase } from '@/api/breeding'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const isMobile = ref(window.innerWidth <= 768)
const labelWidth = computed(() => isMobile.value ? '100%' : '180px')
const labelPosition = computed(() => isMobile.value ? 'top' : 'right')

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

const formRef = ref()
const submitting = ref(false)

const isEdit = computed(() => !!route.params.trialId)

const formData = reactive({
  trialId: '',
  cropType: '',
  varietyName: '',
  researchCenterId: '',
  programId: '',
  subProgramId: '',
  thematicResearchAreaId: '',
  region: '',
  zone: '',
  woreda: '',
  kebele: '',
  agroEcologicalZone: '',
  gpsLocation: '',
  startDate: '',
  activityCode: '',
  kpiCode: '',
  season: ''
})

const rules = computed(() => ({
  cropType: [
    { required: true, message: t('research.dataCollection.trialBase.rules.cropTypeRequired'), trigger: 'change' }
  ],
  varietyName: [
    { required: true, message: t('research.dataCollection.trialBase.rules.varietyNameRequired'), trigger: 'blur' }
  ],
  researchCenterId: [
    { required: true, message: t('research.dataCollection.trialBase.rules.researchCenterIdRequired'), trigger: 'blur' }
  ],
  programId: [
    { required: true, message: t('research.dataCollection.trialBase.rules.programIdRequired'), trigger: 'blur' }
  ],
  subProgramId: [
    { required: true, message: t('research.dataCollection.trialBase.rules.subProgramIdRequired'), trigger: 'blur' }
  ],
  thematicResearchAreaId: [
    { required: true, message: t('research.dataCollection.trialBase.rules.thematicResearchAreaIdRequired'), trigger: 'blur' }
  ],
  region: [
    { required: true, message: t('research.dataCollection.trialBase.rules.regionRequired'), trigger: 'blur' }
  ],
  zone: [
    { required: true, message: t('research.dataCollection.trialBase.rules.zoneRequired'), trigger: 'blur' }
  ],
  woreda: [
    { required: true, message: t('research.dataCollection.trialBase.rules.woredaRequired'), trigger: 'blur' }
  ],
  kebele: [
    { required: true, message: t('research.dataCollection.trialBase.rules.kebeleRequired'), trigger: 'blur' }
  ],
  gpsLocation: [
    { required: true, message: t('research.dataCollection.trialBase.rules.gpsLocationRequired'), trigger: 'blur' },
    { pattern: /^-?\d+\.?\d*,-?\d+\.?\d*$/, message: t('research.dataCollection.trialBase.rules.gpsLocationFormat'), trigger: 'blur' }
  ],
  startDate: [
    { required: true, message: t('research.dataCollection.trialBase.rules.startDateRequired'), trigger: 'change' }
  ],
  season: [
    { required: true, message: t('research.dataCollection.trialBase.rules.seasonRequired'), trigger: 'change' }
  ]
}))

const loadDetail = async () => {
  try {
    const res = await getTrialBaseDetail(route.params.trialId)
    if (res.code === 200) {
      Object.assign(formData, res.data)
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    submitting.value = true

    let res
    if (isEdit.value) {
      res = await editTrialBase(formData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.trialBase.editSuccess'))
        router.push('/research/data-collection/trial-base')
      }
    } else {
      res = await addTrialBase(formData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.trialBase.addSuccess'))
        router.push('/research/data-collection/trial-base')
      }
    }
  } catch (error) {
    console.error('Form validation failed or submit error:', error)
  } finally {
    submitting.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  if (isEdit.value) {
    loadDetail()
  } else {
    formData.trialId = 'Auto-generated'
  }
})
</script>

<style scoped>
.trial-form-container {
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

.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  gap: 16px;
}

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
</style>
