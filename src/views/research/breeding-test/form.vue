<template>
  <div class="breeding-test-form-page">
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
          <h1 class="page-title">{{ isEdit ? $t('research.breeding.breedingTest.edit') : $t('research.breeding.breedingTest.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="breeding-test-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('research.breeding.breedingTest.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.breeding.breedingTest.form.trackingId')" prop="trackingId">
              <el-input v-model="formData.trackingId" :placeholder="$t('research.breeding.breedingTest.form.trackingIdPlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.batchId')" prop="batchId">
              <el-input v-model="formData.batchId" :placeholder="$t('research.breeding.breedingTest.form.batchIdPlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.cropType')" prop="cropType">
              <el-select v-model="formData.cropType" :placeholder="$t('research.breeding.breedingTest.form.cropTypePlaceholder')" class="full-width">
                <el-option :label="$t('research.breeding.breedingTest.cropType.wheat')" value="WHEAT" />
                <el-option :label="$t('research.breeding.breedingTest.cropType.corn')" value="CORN" />
                <el-option :label="$t('research.breeding.breedingTest.cropType.rice')" value="RICE" />
                <el-option :label="$t('research.breeding.breedingTest.cropType.soybean')" value="SOYBEAN" />
                <el-option :label="$t('research.breeding.breedingTest.cropType.cotton')" value="COTTON" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.testDate')" prop="testDate">
              <el-date-picker
                v-model="formData.testDate"
                type="date"
                :placeholder="$t('research.breeding.breedingTest.form.testDatePlaceholder')"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.testOrg')" prop="testOrg">
              <el-input v-model="formData.testOrg" :placeholder="$t('research.breeding.breedingTest.form.testOrgPlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.testPerson')" prop="testPerson">
              <el-input v-model="formData.testPerson" :placeholder="$t('research.breeding.breedingTest.form.testPersonPlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.testResult')" prop="testResult">
              <el-select v-model="formData.testResult" :placeholder="$t('research.breeding.breedingTest.form.testResultPlaceholder')" class="full-width">
                <el-option :label="$t('research.breeding.breedingTest.result.qualified')" value="01" />
                <el-option :label="$t('research.breeding.breedingTest.result.unqualified')" value="02" />
                <el-option :label="$t('research.breeding.breedingTest.result.recheck')" value="03" />
              </el-select>
            </el-form-item>

            <!-- 标准化测试字段 -->
            <el-form-item :label="$t('research.c1BreedingBatch.test.seedClass')" prop="seedClass">
              <el-select v-model="formData.seedClass" :placeholder="$t('common.pleaseSelect')" class="full-width">
                <el-option label="Pre-Basic" value="Pre-Basic" />
                <el-option label="Basic" value="Basic" />
                <el-option label="C1" value="C1" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.test.lotId')">
              <el-input v-model="formData.lotId" :placeholder="$t('common.pleaseEnter')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.test.testType')">
              <el-select v-model="formData.testType" :placeholder="$t('common.pleaseSelect')" class="full-width">
                <el-option label="Germination" value="GERMINATION" />
                <el-option label="Purity" value="PURITY" />
                <el-option label="Moisture" value="MOISTURE" />
                <el-option label="Seed Health" value="SEED_HEALTH" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.test.unit')">
              <el-select v-model="formData.unit" :placeholder="$t('common.pleaseSelect')" class="full-width">
                <el-option label="%" value="%" />
                <el-option label="kg" value="kg" />
                <el-option label="g" value="g" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.c1BreedingBatch.test.passStatus')">
              <el-switch 
                v-model="formData.passStatus" 
                active-value="TRUE" 
                inactive-value="FALSE"
                :active-text="$t('research.c1BreedingBatch.test.passTrue')"
                :inactive-text="$t('research.c1BreedingBatch.test.passFalse')"
              />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.testReportUrl')" prop="testReportUrl">
              <el-input v-model="formData.testReportUrl" :placeholder="$t('research.breeding.breedingTest.form.testReportUrlPlaceholder')" clearable />
            </el-form-item>
          </div>
        </div>

        <!-- 检测指标 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-bar-chart-line"></i>
            <h3>{{ $t('research.breeding.breedingTest.form.testIndicators') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.breeding.breedingTest.form.germinationRate')" prop="germinationRate">
              <el-input v-model.number="formData.germinationRate" type="number" :placeholder="$t('research.breeding.breedingTest.form.germinationRatePlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.purity')" prop="purity">
              <el-input v-model.number="formData.purity" type="number" :placeholder="$t('research.breeding.breedingTest.form.purityPlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.moistureContent')" prop="moistureContent">
              <el-input v-model.number="formData.moistureContent" type="number" :placeholder="$t('research.breeding.breedingTest.form.moistureContentPlaceholder')" clearable />
            </el-form-item>

            <el-form-item :label="$t('research.breeding.breedingTest.form.pestDetection')" prop="pestDetection">
              <el-input v-model="formData.pestDetection" :placeholder="$t('research.breeding.breedingTest.form.pestDetectionPlaceholder')" clearable />
            </el-form-item>
          </div>
        </div>

        <!-- 备注 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-file-text-line"></i>
            <h3>{{ $t('common.remarks') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('common.remarks')" prop="remark" class="full-width-item">
              <el-input v-model="formData.remark" type="textarea" :rows="4" :placeholder="$t('research.breeding.breedingTest.form.remarkPlaceholder')" clearable />
            </el-form-item>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBreedingTestPageDetail, addBreedingTestPage, updateBreedingTestPage } from '@/api/breeding'
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const loading = ref(false)
const userStore = useUserStore()

const isEdit = computed(() => !!route.params.id)

const formData = ref({
  trackingId: '',
  batchId: '',
  cropType: '',
  testDate: '',
  testOrg: '',
  testPerson: '',
  testResult: '',
  seedClass: '',
  lotId: '',
  testType: '',
  unit: '',
  passStatus: 'FALSE',
  testReportUrl: '',
  germinationRate: '',
  purity: '',
  moistureContent: '',
  pestDetection: '',
  remark: ''
})

const rules = {
  trackingId: [{ required: true, message: '请输入跟踪编号', trigger: 'blur' }],
  batchId: [{ required: true, message: '请输入批次编号', trigger: 'blur' }],
  cropType: [{ required: true, message: '请选择作物类型', trigger: 'change' }],
  testDate: [{ required: true, message: '请选择检测日期', trigger: 'change' }],
  testResult: [{ required: true, message: '请选择检测结论', trigger: 'change' }]
}

// 初始化
onMounted(async () => {
  // 从用户信息自动填充测试机构
  const userInfo = userStore.userInfo?.user || {}
  formData.value.testOrg = userInfo.organName || userInfo.ORGAN_NAME || ''
  
  if (isEdit.value) {
    await loadDetail()
  }
})

// 加载详情
const loadDetail = async () => {
  try {
    const response = await getBreedingTestPageDetail(route.params.id)
    if (response.code === 200 && response.data) {
      formData.value = {
        ...formData.value,
        ...response.data
      }
    } else {
      ElMessage.error('加载数据失败')
    }
  } catch (error) {
    ElMessage.error('加载数据失败')
    console.error(error)
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const data = isEdit.value ? { id: route.params.id, ...formData.value } : formData.value
        const response = isEdit.value ? await updateBreedingTestPage(data) : await addBreedingTestPage(data)

        if (response.code === 200) {
          ElMessage.success(isEdit.value ? '更新成功' : '新增成功')
          router.push('/research/breeding/test')
        } else {
          ElMessage.error(response.msg || '操作失败')
        }
      } catch (error) {
        ElMessage.error('操作失败')
        console.error(error)
      } finally {
        loading.value = false
      }
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.breeding-test-form-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 8px;
  color: white;

  .header-content {
    width: 100%;
    display: flex;
    align-items: center;

    .header-left {
      margin-right: auto;
    }

    .header-center {
      flex: 1;
      text-align: center;

      .page-title {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
}

.form-wrapper {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .breeding-test-form {
    max-width: 1000px;
    margin: 0 auto;
  }

  .form-block {
    margin-bottom: 30px;

    &:last-of-type {
      margin-bottom: 0;
    }

    .block-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #009A44;

      i {
        font-size: 20px;
        color: #009A44;
        margin-right: 10px;
      }

      h3 {
        margin: 0;
        font-size: 16px;
        color: #333;
        font-weight: 600;
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .full-width-item {
        grid-column: 1 / -1;
      }

      :deep(.el-form-item) {
        margin-bottom: 0;
      }
    }
  }

  .form-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #f0f0f0;

    button {
      min-width: 120px;
    }
  }
}
</style>
