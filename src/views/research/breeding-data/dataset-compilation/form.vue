<template>
  <div class="dataset-form-container">
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
                        {{ isEdit ? $t('research.datasetCompilation.edit') : $t('research.datasetCompilation.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form
        ref="formRef"
        v-loading="loading"
        :model="formData"
        :rules="rules"
        label-position="right"
        label-width="200px"
        class="dataset-form"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.datasetCompilation.form.basicInfo') }}
          </div>

          <!-- 试验ID -->
          <el-form-item :label="$t('research.datasetCompilation.form.trialId')" prop="trialId">
            <el-select
              v-model="formData.trialId"
              :placeholder="$t('research.datasetCompilation.placeholder.trialId')"
              :disabled="!isEditable"
              filterable
              clearable
              @change="handleTrialChange"
            >
              <el-option
                v-for="item in trialOptions"
                :key="item.trialId"
                :label="`${item.trialId} - ${item.trialName}`"
                :value="item.trialId"
              />
            </el-select>
          </el-form-item>

          <!-- 批次ID（自动带出，只读） -->
          <el-form-item :label="$t('research.datasetCompilation.form.batchId')" prop="batchId">
            <el-input
              v-model="formData.batchId"
              :placeholder="$t('research.datasetCompilation.placeholder.batchIdAuto')"
              disabled
              readonly
            >
              <template #suffix>
                <el-tooltip content="批次ID将根据试验ID自动填充" placement="top">
                  <i class="ri-information-line" style="color: #909399"></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>

          <!-- 版本号 -->
          <!-- <el-form-item :label="$t('research.datasetCompilation.form.versionNo')" prop="versionNo">
            <el-input
              v-model="formData.versionNo"
              :placeholder="$t('research.datasetCompilation.placeholder.versionNo')"
              :disabled="!isEditable"
              clearable
            />
          </el-form-item> -->

          <!-- 编制人（自动获取当前用户，只读） -->
          <el-form-item :label="$t('research.datasetCompilation.form.compiledBy')" prop="compiledBy">
            <el-input
              v-model="formData.compiledByName"
              :placeholder="$t('research.datasetCompilation.placeholder.compiledBy')"
              disabled
              readonly
            >
              <template #suffix>
                <el-tooltip content="自动获取当前登录用户" placement="top">
                  <i class="ri-user-line" style="color: #909399"></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>

          <!-- 编制时间 -->
          <el-form-item :label="$t('research.datasetCompilation.form.compiledAt')" prop="compiledAt">
            <el-date-picker
              v-model="formData.compiledAt"
              type="datetime"
              :placeholder="$t('research.datasetCompilation.placeholder.compiledAt')"
              :disabled="!isEditable"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>

          <!-- 记录数量（自动计算） -->
          <el-form-item :label="$t('research.datasetCompilation.form.recordCount')" prop="recordCount">
            <el-input-number
              v-model="recordCountComputed"
              :min="0"
              :placeholder="$t('research.datasetCompilation.placeholder.recordCount')"
              disabled
              readonly
              style="width: 100%"
            />
            <template #extra>
              <div style="font-size: 12px; color: #909399; margin-top: 4px;">
                <i class="ri-information-line"></i>
                {{ $t('research.datasetCompilation.placeholder.recordCountAutoCalculate') }}
              </div>
            </template>
          </el-form-item>

          <!-- 状态（新增时默认草稿，不可编辑） -->
          <el-form-item :label="$t('research.datasetCompilation.form.status')" prop="status">
            <el-select
              v-model="formData.status"
              :placeholder="$t('research.datasetCompilation.placeholder.status')"
              disabled
              style="width: 100%"
            >
              <el-option label="Draft" value="Draft" />
              <el-option label="Submitted" value="Submitted" />
              <el-option label="Approved" value="Approved" />
              <el-option label="Rejected" value="Rejected" />
            </el-select>
          </el-form-item>

          <!-- 作物类型（自动带出，只读） -->
          <el-form-item :label="$t('research.datasetCompilation.form.cropType')" prop="cropType">
            <el-input
              v-model="formData.cropType"
              :placeholder="$t('research.datasetCompilation.placeholder.cropType')"
              disabled
              readonly
            >
              <template #suffix>
                <el-tooltip content="作物类型从试验信息自动获取" placement="top">
                  <i class="ri-information-line" style="color: #909399"></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>

          <!-- 品种名称（自动带出，只读） -->
          <el-form-item :label="$t('research.datasetCompilation.form.varietyName')" prop="varietyName">
            <el-input
              v-model="formData.varietyName"
              :placeholder="$t('research.datasetCompilation.placeholder.varietyName')"
              disabled
              readonly
            >
              <template #suffix>
                <el-tooltip content="品种名称从试验信息自动获取" placement="top">
                  <i class="ri-information-line" style="color: #909399"></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="$t('research.datasetCompilation.form.remark')" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.datasetCompilation.placeholder.remark')"
              :disabled="!isEditable"
            />
          </el-form-item>
        </div>

        <!-- 数据统计 -->
        <div v-if="isEdit" class="form-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
                        {{ $t('research.datasetCompilation.form.statisticsInfo') }}
          </div>

          <div class="statistics-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-flask-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.trialCount') }}</div>
                <div class="stat-value">{{ formData.trialCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-plant-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.fieldDataCount') }}</div>
                <div class="stat-value">{{ formData.fieldDataCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-temp-hot-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.envDataCount') }}</div>
                <div class="stat-value">{{ formData.envDataCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-test-tube-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.labTestCount') }}</div>
                <div class="stat-value">{{ formData.labTestCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-bar-chart-box-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.yieldDataCount') }}</div>
                <div class="stat-value">{{ formData.yieldDataCount || 0 }}</div>
              </div>
            </div>
          </div>

          <!-- 提交提示 -->
          <el-alert
            v-if="formData.datasetStatus === 'draft'"
            :title="$t('research.datasetCompilation.message.submitRequirement')"
            type="info"
            :closable="false"
            show-icon
            style="margin-top: 16px"
          />
        </div>

        <!-- 状态提示 -->
        <div v-if="isEdit && !isEditable" class="form-section">
          <el-alert
            :title="$t('research.datasetCompilation.message.cannotEditApproved')"
            type="warning"
            :closable="false"
            show-icon
          />
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button v-if="isEditable" type="primary" @click="handleSubmit">
            <i class="ri-save-line"></i>
            {{ isEdit ? $t('common.save') : $t('research.datasetCompilation.compile') }}
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
import { getDatasetById, addDataset, updateDataset } from '@/api/dataset'
import { getTrialBasicList, getTrialBasicInfo, getAgronomicTraitList } from '@/api/breedingData'
import { getLabTestList } from '@/api/labTest'
import { getYieldDataList } from '@/api/yieldData'
import { getEnvironmentNewDataPage } from '@/api/environment-new-data'
import { useUserStore } from '@/store'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)
const trialOptions = ref([])

const formData = reactive({
  id: '',
  trialId: '',
  batchId: '',
  versionNo: null, // 版本号由后端自动管理，不需要前端提供
  compiledBy: '',
  compiledByName: '',
  compiledAt: '',
  recordCount: 0,
  status: 'Draft',
  cropType: '',
  varietyName: '',
  remark: '',
  datasetStatus: 'draft',
  trialCount: 0,
  fieldDataCount: 0,
  envDataCount: 0,
  labTestCount: 0,
  yieldDataCount: 0
})

// 判断是否可编辑：新增、草稿或已退回状态可编辑，审核通过不可编辑
const isEditable = computed(() => {
  if (!isEdit.value) return true
  return formData.datasetStatus === 'draft' || formData.datasetStatus === 'rejected'
})

// 自动计算记录数量：田间数据 + 环境数据 + 实验室测试 + 产量数据
const recordCountComputed = computed({
  get() {
    const total = (formData.fieldDataCount || 0) +
                  (formData.envDataCount || 0) +
                  (formData.labTestCount || 0) +
                  (formData.yieldDataCount || 0)
    // 同步到 formData
    formData.recordCount = total
    return total
  },
  set(value) {
    // 只读，不允许手动设置
  }
})

const rules = computed(() => ({
  trialId: [
    { required: true, message: t('research.datasetCompilation.rules.trialIdRequired'), trigger: 'change' }
  ],
  batchId: [
    { required: true, message: t('research.datasetCompilation.rules.batchIdRequired'), trigger: 'blur' }
  ],
  compiledBy: [
    { required: true, message: t('research.datasetCompilation.rules.compiledByRequired'), trigger: 'blur' }
  ],
  compiledAt: [
    { required: true, message: t('research.datasetCompilation.rules.compiledAtRequired'), trigger: 'change' }
  ],
  cropType: [
    { required: true, message: t('research.datasetCompilation.rules.cropTypeRequired'), trigger: 'blur' }
  ],
  varietyName: [
    { required: true, message: t('research.datasetCompilation.rules.varietyNameRequired'), trigger: 'blur' }
  ]
}))

// 加载试验选项
const loadTrialOptions = async () => {
  try {
    const res = await getTrialBasicList({ pageNum: 1, pageSize: 1000 })
    if (res && res.rows) {
      trialOptions.value = res.rows
    }
  } catch (error) {
    console.error('Failed to load trial options:', error)
  }
}

// 处理试验ID变化 - 自动带出批次ID和其他信息
const handleTrialChange = async (trialId) => {
  if (!trialId) {
    formData.batchId = ''
    formData.cropType = ''
    formData.varietyName = ''
    return
  }

  try {
    console.log('获取试验信息，trialId:', trialId)
    const res = await getTrialBasicInfo(trialId)
    console.log('试验信息API响应:', res)

    if (res && res.data) {
      console.log('试验详细数据:', res.data)

      // 自动填充批次ID
      formData.batchId = res.data.batchId || ''

      // 自动填充作物类型（如果试验信息中有）
      if (res.data.cropType) {
        formData.cropType = res.data.cropType
      }

      // 自动填充品种名称（如果试验信息中有）
      if (res.data.varietyName) {
        formData.varietyName = res.data.varietyName
      }

      // 如果有批次ID，总是尝试从批次API获取完整的批次信息（确保批次名称等字段准确）
      if (res.data.batchId) {
        console.log('检测到批次ID，尝试获取批次详细信息')
        await loadBatchInfo(res.data.batchId)
      } else {
        console.warn('试验信息中没有批次ID')
      }

      // 根据试验ID统计各数据表的记录数
      await loadStatisticsData(trialId)

      // 可选：填充其他关联信息
      if (res.data.locationId) {
        console.log('试验地点:', res.data.locationId)
      }
      if (res.data.year) {
        console.log('试验年份:', res.data.year)
      }
      if (res.data.season) {
        console.log('试验季节:', res.data.season)
      }
    }
  } catch (error) {
    console.error('Failed to get trial info:', error)
    ElMessage.warning('Failed to obtain experimental information, please manually fill in')
  }
}

// 根据批次ID加载批次信息
const loadBatchInfo = async (batchId) => {
  try {
    console.log('开始获取批次信息，batchId:', batchId)
    const { getBreedingBatchInfo } = await import('@/api/breedingData')
    const res = await getBreedingBatchInfo(batchId)
    console.log('批次信息API响应:', res)

    if (res && res.data) {
      console.log('批次详细数据:', res.data)

      // 自动填充作物类型（只在空时填充）
      if (res.data.cropType && !formData.cropType) {
        formData.cropType = res.data.cropType
        console.log('作物类型已填充:', res.data.cropType)
      }

      // 自动填充品种名称（只在空时填充）
      if (res.data.varietyName && !formData.varietyName) {
        formData.varietyName = res.data.varietyName
        console.log('品种名称已填充:', res.data.varietyName)
      }
    } else {
      console.warn('批次信息响应无数据')
    }
  } catch (error) {
    console.error('获取批次信息失败:', error)
    // 不显示错误提示，因为这是可选的自动填充
  }
}

// 根据试验ID加载统计数据
const loadStatisticsData = async (trialId) => {
  if (!trialId) {
    console.warn('试验ID为空，无法加载统计数据')
    return
  }

  try {
    console.log('开始统计数据，trialId:', trialId)

    // 并行调用4个列表接口，根据试验ID统计
    const [fieldRes, envRes, labRes, yieldRes] = await Promise.all([
      // 1. 田间数据（农艺性状数据）
      getAgronomicTraitList({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error('获取田间数据失败:', err)
        return { total: 0 }
      }),

      // 2. 环境数据
      getEnvironmentNewDataPage({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error('获取环境数据失败:', err)
        return { total: 0 }
      }),

      // 3. 实验室测试数据
      getLabTestList({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error('获取实验室测试数据失败:', err)
        return { total: 0 }
      }),

      // 4. 产量数据
      getYieldDataList({
        pageNum: 1,
        pageSize: 9999,
        trialId: trialId
      }).catch(err => {
        console.error('获取产量数据失败:', err)
        return { total: 0 }
      })
    ])

    console.log('API返回结果:', {
      fieldRes,
      envRes,
      labRes,
      yieldRes
    })

    // 提取总数（兼容不同的返回格式）
    const fieldDataCount = fieldRes?.total || fieldRes?.data?.total || 0
    const envDataCount = envRes?.total || envRes?.data?.total || 0
    const labTestCount = labRes?.total || labRes?.data?.total || 0
    const yieldDataCount = yieldRes?.total || yieldRes?.data?.total || 0

    // 更新统计字段
    formData.fieldDataCount = fieldDataCount
    formData.envDataCount = envDataCount
    formData.labTestCount = labTestCount
    formData.yieldDataCount = yieldDataCount
    formData.trialCount = 1 // 当前选择了一个试验

    console.log('统计数据已更新:', {
      trialCount: formData.trialCount,
      fieldDataCount: formData.fieldDataCount,
      envDataCount: formData.envDataCount,
      labTestCount: formData.labTestCount,
      yieldDataCount: formData.yieldDataCount,
      recordCount: formData.recordCount
    })

  } catch (error) {
    console.error('统计数据加载失败:', error)
    ElMessage.warning(t('research.datasetCompilation.message.statisticsFailed'))
    // 重置统计字段为0
    formData.trialCount = 0
    formData.fieldDataCount = 0
    formData.envDataCount = 0
    formData.labTestCount = 0
    formData.yieldDataCount = 0
  }
}

// 初始化当前用户信息
const initCurrentUser = async () => {
  // 直接从 localStorage 读取用户信息
  try {
    const userInfoStr = localStorage.getItem('userInfo')
    console.log('从localStorage读取userInfo:', userInfoStr)

    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr)
      console.log('解析后的userInfo:', userInfo)

      // 支持嵌套结构：userInfo.user
      const user = userInfo.user || userInfo
      console.log('提取的user对象:', user)

      formData.compiledBy = user.userId || user.id || user.user_id || user.USER_ID || ''
      formData.compiledByName = user.userName || user.name || user.nickName || user.realName || user.USER_NAME || ''
      console.log('编制人信息已填充:', formData.compiledBy, formData.compiledByName)
    } else {
      console.warn('localStorage中没有userInfo')

      // 如果localStorage没有，尝试从 store 获取
      if (!userStore.hasUserInfo) {
        await userStore.fetchUserInfo()
      }

      const userInfo = userStore.userInfo
      if (userInfo && Object.keys(userInfo).length > 0) {
        const user = userInfo.user || userInfo
        formData.compiledBy = user.userId || user.id || user.user_id || user.USER_ID || ''
        formData.compiledByName = user.userName || user.name || user.nickName || user.realName || user.USER_NAME || ''
        console.log('从store获取编制人信息:', formData.compiledBy, formData.compiledByName)
      }
    }
  } catch (error) {
    console.error('初始化用户信息失败:', error)
  }

  // 设置默认编制时间为当前时间
  if (!isEdit.value) {
    const now = new Date();
    
    // 获取本地时间的各个部分
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 格式化为 YYYY-MM-DD HH:mm:ss
    formData.compiledAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getDatasetById(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      const apiFunc = isEdit.value ? updateDataset : addDataset
      // 构建提交数据，确保所有字段都正确映射
      // 注意：versionNo 由后端自动管理，不需要前端提交
      const submitData = {
        trialId: formData.trialId,
        batchId: formData.batchId,
        // versionNo 不提交，由后端自动生成
        compiledBy: formData.compiledBy,
        compiledByName: formData.compiledByName,
        compiledAt: formData.compiledAt,
        recordCount: formData.recordCount || 0,
        status: formData.status,
        datasetStatus: formData.datasetStatus,
        cropType: formData.cropType,
        varietyName: formData.varietyName,
        remark: formData.remark
      }

      // 编辑模式需要带上ID
      if (isEdit.value) {
        submitData.id = formData.id
      }

      console.log('提交数据:', submitData)
      const res = await apiFunc(submitData)
      if (res.code === 200) {
        ElMessage.success(t(isEdit.value ? 'common.updateSuccess' : 'common.addSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.operationFailed'))
    } finally {
      loading.value = false
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(async () => {
  // 加载试验选项
  loadTrialOptions()

  // 初始化当前用户信息（仅新增时）
  if (!isEdit.value) {
    await initCurrentUser()
  }

  // 编辑模式加载详情
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.dataset-form-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1000px;
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
  max-width: 1000px;
  margin: 0 auto;
}

.dataset-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 表单分节 */
.form-section {
  margin-bottom: 32px;
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

/* 统计卡片网格 */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.stat-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #86efac;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 24px;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #009A44;
  line-height: 1;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.form-actions .el-button {
  min-width: 120px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .dataset-form {
    padding: 20px 16px;
  }

  .statistics-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .dataset-form {
    padding: 16px 12px;
    border-radius: 8px;
  }

  .dataset-form :deep(.el-form-item) {
    margin-bottom: 20px;
  }

  .dataset-form :deep(.el-form-item__label) {
    text-align: left;
    display: block;
    line-height: 1.5;
    margin-bottom: 8px;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  .dataset-form :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  .statistics-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 12px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
  }

  .stat-icon i {
    font-size: 20px;
  }

  .stat-label {
    font-size: 12px;
  }

  .stat-value {
    font-size: 20px;
  }

  .form-actions {
    flex-direction: column;
    padding-top: 20px;
  }

  .form-actions .el-button {
    width: 100%;
    min-width: auto;
  }

  .form-actions .el-button:first-child {
    order: 2;
  }

  .form-actions .el-button:last-child {
    order: 1;
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

  .dataset-form {
    padding: 12px 8px;
  }

  .dataset-form :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  .dataset-form :deep(.el-form-item__label) {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .stat-card {
    padding: 10px;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
  }

  .stat-icon i {
    font-size: 18px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-value {
    font-size: 18px;
  }
}
</style>
