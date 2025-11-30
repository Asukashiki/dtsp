<template>
  <div class="iot-sensor-form-page">
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
          <h1 class="page-title">{{ isEdit ? $t('research.iotSensor.edit') : $t('research.iotSensor.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="sensor-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('input.catalog.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.iotSensor.form.iotId')" prop="iotId">
              <el-input v-model="formData.iotId" :placeholder="$t('research.iotSensor.placeholder.iotId')" clearable maxlength="32" />
            </el-form-item>
            <el-form-item :label="$t('research.iotSensor.form.iotName')" prop="iotName">
              <el-input v-model="formData.iotName" :placeholder="$t('research.iotSensor.placeholder.iotName')" clearable maxlength="100" />
            </el-form-item>
            <el-form-item :label="$t('research.iotSensor.form.iotType')" prop="iotType">
              <el-select v-model="formData.iotType" :placeholder="$t('research.iotSensor.placeholder.iotType')" class="full-width">
                <el-option :label="$t('research.iotSensor.type.temperature')" value="01" />
                <el-option :label="$t('research.iotSensor.type.humidity')" value="02" />
                <el-option :label="$t('research.iotSensor.type.light')" value="03" />
                <el-option :label="$t('research.iotSensor.type.soil')" value="04" />
                <el-option :label="$t('research.iotSensor.type.gas')" value="05" />
                <el-option :label="$t('research.iotSensor.type.other')" value="99" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.iotSensor.form.manufacturer')" prop="manufacturer">
              <el-input v-model="formData.manufacturer" :placeholder="$t('research.iotSensor.placeholder.manufacturer')" clearable maxlength="32" />
            </el-form-item>
            <el-form-item :label="$t('research.iotSensor.form.firmwareVersion')" prop="firmwareVersion">
              <el-input v-model="formData.firmwareVersion" :placeholder="$t('research.iotSensor.placeholder.firmwareVersion')" clearable maxlength="32" />
            </el-form-item>
            <el-form-item :label="$t('research.iotSensor.form.calibrationDate')" prop="calibrationDate">
              <el-date-picker
                v-model="formData.calibrationDate"
                type="datetime"
                :placeholder="$t('research.iotSensor.placeholder.calibrationDate')"
                class="full-width"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item :label="$t('research.iotSensor.form.batteryStatus')" prop="batteryStatus">
              <el-input v-model="formData.batteryStatus" :placeholder="$t('research.iotSensor.placeholder.batteryStatus')" clearable maxlength="64" />
            </el-form-item>
            <el-form-item :label="$t('research.iotSensor.form.remark')" prop="remark" class="full-width-item">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="3"
                :placeholder="$t('research.iotSensor.placeholder.remark')"
                clearable
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getIotSensorDetail, addIotSensor, updateIotSensor } from '@/api/iot-sensor'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)
const isEdit = computed(() => route.path.includes('/edit/'))
const dataId = computed(() => route.params.id)

const formData = reactive({
  iotId: '',
  iotName: '',
  iotType: '',
  manufacturer: '',
  firmwareVersion: '',
  calibrationDate: '',
  batteryStatus: '',
  remark: ''
})

const rules = computed(() => ({
  iotId: [
    { required: true, message: t('research.iotSensor.rules.iotIdRequired'), trigger: 'blur' },
    { max: 32, message: t('research.iotSensor.rules.iotIdLength'), trigger: 'blur' }
  ],
  iotName: [
    { required: true, message: t('research.iotSensor.rules.iotNameRequired'), trigger: 'blur' },
    { max: 100, message: t('research.iotSensor.rules.iotNameLength'), trigger: 'blur' }
  ],
  iotType: [
    { required: true, message: t('research.iotSensor.rules.iotTypeRequired'), trigger: 'change' }
  ],
  manufacturer: [
    { required: true, message: t('research.iotSensor.rules.manufacturerRequired'), trigger: 'blur' },
    { max: 32, message: t('research.iotSensor.rules.manufacturerLength'), trigger: 'blur' }
  ],
  firmwareVersion: [
    { required: true, message: t('research.iotSensor.rules.firmwareVersionRequired'), trigger: 'blur' },
    { max: 32, message: t('research.iotSensor.rules.firmwareVersionLength'), trigger: 'blur' }
  ],
  calibrationDate: [
    { required: true, message: t('research.iotSensor.rules.calibrationDateRequired'), trigger: 'change' }
  ],
  batteryStatus: [
    { max: 64, message: t('research.iotSensor.rules.batteryStatusLength'), trigger: 'blur' }
  ],
  remark: [
    { max: 500, message: t('research.iotSensor.rules.remarkLength'), trigger: 'blur' }
  ]
}))

// 返回
const goBack = () => {
  router.back()
}

// 加载数据
const loadData = async () => {
  if (!isEdit.value) return

  try {
    const res = await getIotSensorDetail(dataId.value)
    if (res.code === 200 && res.data) {
      Object.assign(formData, {
        iotId: res.data.iotId,
        iotName: res.data.iotName,
        iotType: res.data.iotType,
        manufacturer: res.data.manufacturer,
        firmwareVersion: res.data.firmwareVersion,
        calibrationDate: res.data.calibrationDate,
        batteryStatus: res.data.batteryStatus,
        remark: res.data.remark
      })
    }
  } catch (error) {
    console.error('Failed to load sensor detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true

    const data = {
      iotId: formData.iotId,
      iotName: formData.iotName,
      iotType: formData.iotType,
      manufacturer: formData.manufacturer,
      firmwareVersion: formData.firmwareVersion,
      calibrationDate: formData.calibrationDate,
      batteryStatus: formData.batteryStatus,
      remark: formData.remark
    }

    if (isEdit.value) {
      data.dataId = dataId.value
      const res = await updateIotSensor(data)
      if (res.code === 200) {
        ElMessage.success(t('research.iotSensor.editSuccess'))
        setTimeout(() => router.back(), 1000)
      }
    } else {
      const res = await addIotSensor(data)
      if (res.code === 200) {
        ElMessage.success(t('research.iotSensor.addSuccess'))
        setTimeout(() => router.back(), 1000)
      }
    }
  } catch (error) {
    console.error('Form validation or submission error:', error)
  } finally {
    submitLoading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.iot-sensor-form-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  padding: 16px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 表单区域 */
.form-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-block {
  margin-bottom: 32px;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

.block-header i {
  font-size: 20px;
  color: #009A44;
}

.block-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.full-width-item {
  grid-column: 1 / -1;
}

.full-width {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
  margin-top: 24px;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-right {
    display: none;
  }

  .header-center {
    text-align: left;
  }

  .page-title {
    font-size: 18px;
  }

  .form-wrapper {
    padding: 16px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 0 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .form-wrapper {
    padding: 12px;
  }
}
</style>
