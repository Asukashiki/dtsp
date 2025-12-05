<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">
              {{ isEdit ? $t('research.breedingData.researchCenter.edit') : $t('research.breedingData.researchCenter.add') }}
            </h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px" v-loading="loading">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breedingData.researchCenter.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Location ID (auto-generated, read-only) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.researchCenter.form.locationId')">
                    <el-input
                      v-model="formData.locationId"
                      disabled
                      :placeholder="$t('research.breedingData.researchCenter.placeholder.locationId')"
                    />
                  </el-form-item>
                </el-col>
                <!-- Location Name -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.researchCenter.form.locationName')" prop="locationName">
                    <el-input
                      v-model="formData.locationName"
                      :placeholder="$t('research.breedingData.researchCenter.placeholder.locationName')"
                      maxlength="100"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 位置信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('research.breedingData.researchCenter.form.locationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Region -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.researchCenter.form.region')">
                    <el-input
                      v-model="formData.region"
                      :placeholder="$t('research.breedingData.researchCenter.placeholder.region')"
                      maxlength="100"
                    />
                  </el-form-item>
                </el-col>
                <!-- Zone -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.researchCenter.form.zone')">
                    <el-input
                      v-model="formData.zone"
                      :placeholder="$t('research.breedingData.researchCenter.placeholder.zone')"
                      maxlength="100"
                    />
                  </el-form-item>
                </el-col>
                <!-- Woneda (Woreda) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.researchCenter.form.woneda')">
                    <el-input
                      v-model="formData.woneda"
                      :placeholder="$t('research.breedingData.researchCenter.placeholder.woneda')"
                      maxlength="100"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 地理坐标 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-2-line"></i>
                <span>{{ $t('research.breedingData.researchCenter.form.geoInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Latitude -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.researchCenter.form.latitude')" prop="latitude">
                    <el-input-number
                      v-model="formData.latitude"
                      :min="-90"
                      :max="90"
                      :precision="2"
                      style="width: 100%"
                      :placeholder="$t('research.breedingData.researchCenter.placeholder.latitude')"
                    />
                  </el-form-item>
                </el-col>
                <!-- Longitude -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.researchCenter.form.longitude')" prop="longitude">
                    <el-input-number
                      v-model="formData.longitude"
                      :min="-180"
                      :max="180"
                      :precision="2"
                      style="width: 100%"
                      :placeholder="$t('research.breedingData.researchCenter.placeholder.longitude')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 备注信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('research.breedingData.researchCenter.form.remark') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item :label="$t('research.breedingData.researchCenter.form.remark')">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="4"
                      :placeholder="$t('research.breedingData.researchCenter.placeholder.remark')"
                      maxlength="500"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
              {{ $t('common.save') }}
            </el-button>
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
import { getLocationMasterInfo, addLocationMaster, editLocationMaster } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)

const isEdit = computed(() => !!route.params.locationId)

const formData = reactive({
  locationId: '',
  locationName: '',
  region: '',
  zone: '',
  woneda: '',
  latitude: null,
  longitude: null,
  remark: ''
})

const rules = {
  locationName: [
    { required: true, message: t('research.breedingData.researchCenter.placeholder.locationName'), trigger: 'blur' },
    { min: 1, max: 100, message: t('common.lengthValidation', { min: 1, max: 100 }), trigger: 'blur' }
  ],
  latitude: [
    {
      validator: (rule, value, callback) => {
        if (value !== null && value !== undefined && value !== '') {
          if (value < -90 || value > 90) {
            callback(new Error('Latitude must be between -90 and 90'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  longitude: [
    {
      validator: (rule, value, callback) => {
        if (value !== null && value !== undefined && value !== '') {
          if (value < -180 || value > 180) {
            callback(new Error('Longitude must be between -180 and 180'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getLocationMasterInfo(route.params.locationId)
    Object.assign(formData, res.data)
  } catch (error) {
    console.error('Failed to load research center info:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    const submitData = { ...formData }

    if (isEdit.value) {
      await editLocationMaster(submitData)
      ElMessage.success(t('research.breedingData.researchCenter.editSuccess'))
    } else {
      await addLocationMaster(submitData)
      ElMessage.success(t('research.breedingData.researchCenter.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('Submit failed:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => {
  router.push('/research/breeding-data/research-center')
}

onMounted(() => {
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
