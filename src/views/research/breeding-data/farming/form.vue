<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.farming.edit') : $t('research.breedingData.farming.add') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.farming.form.basicInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.batchId')" prop="batchId">
                    <el-select v-model="formData.batchId" :placeholder="$t('research.breedingData.farming.placeholder.batchId')" style="width: 100%" @change="handleBatchChange">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchName" :value="item.batchId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.trialId')" prop="trialId">
                    <el-select v-model="formData.trialId" :placeholder="$t('research.breedingData.farming.placeholder.trialId')" style="width: 100%">
                      <el-option v-for="item in trialOptions" :key="item.trialId" :label="item.trialName" :value="item.trialId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.operationType')" prop="operationType">
                    <el-select v-model="formData.operationType" :placeholder="$t('research.breedingData.farming.placeholder.operationType')" style="width: 100%">
                      <el-option label="fertilizer" value="fertilizer" />
                      <el-option label="irrigation" value="irrigation" />
                      <el-option label="pest_control" value="pest_control" />
                      <el-option label="weeding" value="weeding" />
                      <el-option label="tillage" value="tillage" />
                      <el-option label="harvest" value="harvest" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.operationTime')" prop="operationTime">
                    <el-date-picker v-model="formData.operationTime" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card" v-if="formData.operationType === 'fertilizer'">
            <div class="card-header">
              <div class="card-title"><i class="ri-flask-line"></i><span>{{ $t('research.breedingData.farming.form.fertilizerInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.fertilizerType')" prop="fertilizerType">
                    <el-input v-model="formData.fertilizerType" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.fertilizerAmount')" prop="fertilizerAmount">
                    <el-input-number v-model="formData.fertilizerAmount" :min="0" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card" v-if="formData.operationType === 'irrigation'">
            <div class="card-header">
              <div class="card-title"><i class="ri-water-flash-line"></i><span>{{ $t('research.breedingData.farming.form.irrigationInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.irrigationMethod')" prop="irrigationMethod">
                    <el-input v-model="formData.irrigationMethod" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card" v-if="formData.operationType === 'pest_control'">
            <div class="card-header">
              <div class="card-title"><i class="ri-bug-line"></i><span>{{ $t('research.breedingData.farming.form.pesticideInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.pesticideType')" prop="pesticideType">
                    <el-input v-model="formData.pesticideType" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.farming.form.pesticideDosage')" prop="pesticideDosage">
                    <el-input v-model="formData.pesticideDosage" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-file-text-line"></i><span>{{ $t('research.breedingData.farming.form.descInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item :label="$t('research.breedingData.farming.form.operationDesc')">
                    <el-input v-model="formData.operationDesc" type="textarea" :rows="3" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">{{ $t('common.save') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFarmingRecordInfo, addFarmingRecord, editFarmingRecord, getBatchOptions, getTrialOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const batchOptions = ref([])
const trialOptions = ref([])

const isEdit = computed(() => !!route.params.farmingId)

const formData = reactive({
  farmingId: '',
  batchId: '',
  trialId: '',
  operationType: '',
  operationTime: '',
  fertilizerType: '',
  fertilizerAmount: null,
  irrigationMethod: '',
  pesticideType: '',
  pesticideDosage: '',
  operationDesc: ''
})

const rules = {
  batchId: [{ required: true, message: t('research.breedingData.farming.placeholder.batchId'), trigger: 'change' }],
  trialId: [{ required: true, message: t('research.breedingData.farming.placeholder.trialId'), trigger: 'change' }],
  operationType: [{ required: true, message: t('research.breedingData.farming.placeholder.operationType'), trigger: 'change' }],
  operationTime: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }]
}

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const loadTrialOptions = async (batchId) => {
  if (!batchId) {
    trialOptions.value = []
    return
  }
  try {
    const res = await getTrialOptions(batchId)
    trialOptions.value = res.data || []
  } catch (error) {
    console.error('获取试验选项失败:', error)
  }
}

const handleBatchChange = (value) => {
  formData.trialId = ''
  loadTrialOptions(value)
}

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getFarmingRecordInfo(route.params.farmingId)
    Object.assign(formData, res.data)
    if (formData.batchId) {
      await loadTrialOptions(formData.batchId)
    }
  } catch (error) {
    console.error('获取详情失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (isEdit.value) {
      await editFarmingRecord(formData)
      ElMessage.success(t('research.breedingData.farming.editSuccess'))
    } else {
      await addFarmingRecord(formData)
      ElMessage.success(t('research.breedingData.farming.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => router.push('/research/breeding-data/farming')

onMounted(() => {
  loadBatchOptions()
  getInfo()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>
