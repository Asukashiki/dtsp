<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('trait.edit') : $t('trait.add') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px" v-loading="loading">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('trait.cards.basicInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- 记录ID (只读，自动生成) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('trait.recordId')">
                    <el-input v-model="formData.recordId" disabled :placeholder="$t('common.autoGenerate')" />
                  </el-form-item>
                </el-col>
                <!-- 地块ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('trait.plotId')" prop="plotId">
                    <el-select v-model="formData.plotId" :placeholder="$t('trait.selectPlot')" filterable style="width: 100%" @change="handlePlotChange">
                      <el-option v-for="item in plotOptions" :key="item.plotId" :label="item.plotId" :value="item.plotId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 试验ID (只读，自动填充) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('trait.trialId')">
                    <el-input v-model="formData.trialId" disabled :placeholder="$t('common.autoFill')" />
                  </el-form-item>
                </el-col>
                <!-- 批次ID (只读，自动填充) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('trait.batchId')">
                    <el-input v-model="formData.batchId" disabled :placeholder="$t('common.autoFill')" />
                  </el-form-item>
                </el-col>
                <!-- 观测日期 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('trait.observationDate')" prop="observationDate">
                    <el-date-picker v-model="formData.observationDate" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :placeholder="$t('common.pleaseSelect')" />
                  </el-form-item>
                </el-col>
                <!-- 生长阶段 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('trait.growthStage')" prop="growthStage">
                    <el-select v-model="formData.growthStage" :placeholder="$t('trait.selectGrowthStage')" style="width: 100%">
                      <el-option v-for="item in dictOptions.growth_cycle || []" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 照片上传 -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('trait.photoUrl')">
                    <el-upload
                      class="photo-upload"
                      :http-request="handleUploadPhoto"
                      :file-list="photoFileList"
                      :on-remove="handleRemovePhoto"
                      :on-preview="handlePreviewPhoto"
                      :limit="1"
                      accept="image/*"
                      list-type="picture"
                    >
                      <el-button type="primary" link>
                        <i class="ri-upload-2-line"></i>
                        {{ $t('common.upload') }}
                      </el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <!-- 备注 -->
                <el-col :xs="24">
                  <el-form-item :label="$t('trait.remarks')">
                    <el-input v-model="formData.remarks" type="textarea" :rows="3" :placeholder="$t('common.pleaseEnter')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 性状明细 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-list-check"></i><span>{{ $t('trait.cards.traitDetails') }}</span></div>
              <div class="header-actions">
                <el-button type="primary" @click="handleAddTrait">
                  <i class="ri-add-line"></i>{{ $t('trait.addTrait') }}
                </el-button>
              </div>
            </div>
            <div class="card-body">
              <!-- PC端表格 -->
              <div class="pc-only">
                <el-table :data="detailList" border stripe v-if="detailList.length > 0">
                  <el-table-column type="index" label="#" width="60" align="center" />
                  <el-table-column :label="$t('trait.traitName')" min-width="200">
                    <template #default="{ row }">
                      <el-select v-model="row.traitCode" :placeholder="$t('trait.selectTrait')" filterable @change="handleTraitChange(row)" style="width: 100%">
                        <el-option
                          v-for="item in dictOptions.agronomic_trait_name || []"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <div style="display: flex; justify-content: space-between;">
                            <span>{{ item.label }}</span>
                            <span style="color: #8492a6; font-size: 12px;">{{ item.actualValue }}</span>
                          </div>
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('trait.traitValue')" min-width="150">
                    <template #default="{ row }">
                      <el-input-number v-model="row.traitValue" :precision="2" :controls="false" style="width: 100%" :placeholder="$t('trait.enterValue')" />
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('trait.unit')" min-width="120">
                    <template #default="{ row }">
                      <el-input v-model="row.unit" disabled style="width: 100%" />
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('common.actions')" width="160" align="center">
                    <template #default="{ $index }">
                      <el-button link type="danger" @click="handleRemoveTrait($index)">
                        <i class="ri-delete-bin-line"></i>{{ $t('trait.removeTrait') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-empty v-else :description="$t('trait.noTraits')" />
              </div>

              <!-- 移动端卡片 -->
              <div class="mobile-only">
                <div v-if="detailList.length > 0" class="trait-card-list">
                  <div v-for="(item, index) in detailList" :key="index" class="trait-card">
                    <div class="trait-card-header">
                      <span class="trait-number">#{{ index + 1 }}</span>
                      <el-button link type="danger" size="small" @click="handleRemoveTrait(index)">
                        <i class="ri-delete-bin-line"></i>{{ $t('trait.removeTrait') }}
                      </el-button>
                    </div>
                    <div class="trait-card-body">
                      <el-form-item :label="$t('trait.traitName')">
                        <el-select v-model="item.traitCode" :placeholder="$t('trait.selectTrait')" filterable @change="handleTraitChange(item)" style="width: 100%">
                          <el-option
                            v-for="option in dictOptions.agronomic_trait_name || []"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item :label="$t('trait.traitValue')">
                        <el-input-number v-model="item.traitValue" :precision="2" :controls="false" style="width: 100%" :placeholder="$t('trait.enterValue')" />
                      </el-form-item>
                      <el-form-item :label="$t('trait.unit')">
                        <el-input v-model="item.unit" disabled style="width: 100%" />
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <el-empty v-else :description="$t('trait.noTraits')" />
              </div>
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
import { getTraitRecordInfo, addTraitRecord, editTraitRecord, getPlotOptions } from '@/api/breedingData'
import { uploadFile } from '@/api/seed'
import { getFilePreviewUrl } from '@/api/file'
import { useDict } from '@/hooks/useDict'
import { getUserInfo } from '@/utils/auth'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 使用字典获取性状选项和生长阶段
const { options: dictOptions, getActualValueByValue } = useDict(['agronomic_trait_name', 'growth_cycle'])

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const plotOptions = ref([])
const photoFileList = ref([])
const detailList = ref([])

const isEdit = computed(() => !!route.params.traitId)

// 获取当前登录用户信息
const currentUser = getUserInfo()
const defaultObserverId = currentUser?.userId || ''

const formData = reactive({
  recordId: '',
  plotId: '',
  trialId: '',
  batchId: '',
  observationDate: getCurrentDateTime(),
  growthStage: '',
  observerId: defaultObserverId,
  photoUrl: '',
  remarks: '',
  status: 'draft'
})

const rules = {
  plotId: [{ required: true, message: t('trait.selectPlot'), trigger: 'change' }],
  observationDate: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  growthStage: [{ required: true, message: t('trait.selectGrowthStage'), trigger: 'change' }],
  observerId: [{ required: true, message: t('trait.selectObserver'), trigger: 'change' }]
}

// 获取当前日期时间
function getCurrentDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 加载地块选项
const loadPlotOptions = async () => {
  try {
    const res = await getPlotOptions()
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('Failed to load plot options:', error)
  }
}

// 地块变更处理 - 自动填充试验ID和批次ID
const handlePlotChange = (plotId) => {
  const selectedPlot = plotOptions.value.find(item => item.plotId === plotId)
  if (selectedPlot) {
    formData.trialId = selectedPlot.trialId || ''
    formData.batchId = selectedPlot.batchId || ''
    // 生成记录ID（前端预览，后端会重新生成）
    formData.recordId = `${plotId}-TR***`
  } else {
    formData.trialId = ''
    formData.batchId = ''
    formData.recordId = ''
  }
}

// 添加性状行
const handleAddTrait = () => {
  detailList.value.push({
    traitCode: '',
    traitName: '',
    traitValue: null,
    unit: '',
    sortOrder: detailList.value.length + 1
  })
}

// 性状选择变更 - 自动填充单位（traitCode 是字典值，traitName 不再单独保存）
const handleTraitChange = (row) => {
  const selectedOption = dictOptions.value.agronomic_trait_name?.find(
    opt => opt.value === row.traitCode
  )
  if (selectedOption) {
    // traitCode 已是字典值，显示时使用 getLabelByValue 获取国际化标签
    row.unit = selectedOption.actualValue // 单位从 actualValue 获取
  }
}

// 移除性状行
const handleRemoveTrait = (index) => {
  detailList.value.splice(index, 1)
}

// 照片上传处理
const handleUploadPhoto = async (options) => {
  const { file } = options
  const uploadFormData = new FormData()
  uploadFormData.append('file', file)

  try {
    const res = await uploadFile(uploadFormData)
    if (res.code === 200 && res.data) {
      const fileData = res.data
      const dataId = fileData.id || fileData.dataId

      // 获取预览 URL
      let previewUrl = ''
      try {
        const previewRes = await getFilePreviewUrl(dataId)
        previewUrl = previewRes.code === 200 ? previewRes.msg : ''
      } catch (error) {
        console.warn('Failed to get preview URL:', error)
      }

      const fileObj = {
        name: file.name,
        uid: file.uid,
        dataId: dataId,
        fileId: dataId,
        url: previewUrl || dataId // 使用预览 URL 或 dataId
      }

      photoFileList.value = [fileObj]
      formData.photoUrl = dataId

      ElMessage.success(t('trait.uploadSuccess'))
    } else {
      ElMessage.error(res.msg || t('trait.uploadFailed'))
    }
  } catch (error) {
    console.error('Upload error:', error)
    ElMessage.error(t('trait.uploadFailed'))
  }
}

// 照片移除处理
const handleRemovePhoto = () => {
  photoFileList.value = []
  formData.photoUrl = ''
}

// 照片预览处理
const handlePreviewPhoto = async (file) => {
  if (!file.url && !file.dataId && !file.fileId) return

  try {
    let previewUrl = ''
    const pathToPreview = file.dataId || file.fileId || file.url

    if (file.url && file.url.startsWith('http')) {
      previewUrl = file.url
    } else if (pathToPreview) {
      const res = await getFilePreviewUrl(pathToPreview)
      previewUrl = res.code === 200 ? res.msg : ''
    }

    if (previewUrl) {
      window.open(previewUrl, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview photo:', error)
    ElMessage.error(t('common.failed'))
  }
}

const getInfo = async () => {
  if (!isEdit.value) return
  
  // 同时支持params和query两种方式获取traitId（路由参数名为traitId）
  const recordId = route.params.traitId || route.query.traitId
  
  if (!recordId) {
    console.error('No traitId found in route params or query')
    ElMessage.error('Missing record ID parameter')
    return
  }
  
  console.log('Loading trait record for edit, recordId:', recordId)
  
  loading.value = true
  try {
    const res = await getTraitRecordInfo(recordId)
    Object.assign(formData, res.data)

    // 处理明细列表
    if (res.data.detailList && res.data.detailList.length > 0) {
      detailList.value = res.data.detailList.map(detail => ({
        detailId: detail.detailId,
        traitCode: detail.traitCode,
        traitName: detail.traitName,
        traitValue: detail.traitValue,
        unit: detail.unit,
        sortOrder: detail.sortOrder
      }))
    }

    // 处理照片
    if (res.data.photoUrl) {
      const fileId = res.data.photoUrl
      
      // 获取预览 URL
      let previewUrl = ''
      try {
        const previewRes = await getFilePreviewUrl(fileId)
        previewUrl = previewRes.code === 200 ? previewRes.msg : ''
      } catch (error) {
        console.warn('Failed to get preview URL:', error)
      }
      
      photoFileList.value = [{
        name: t('trait.photoUrl'),
        url: previewUrl || fileId, // 使用预览 URL 或 fileId
        dataId: fileId,
        fileId: fileId,
        uid: Date.now() + '-photo'
      }]
    }
  } catch (error) {
    console.error('Failed to load record info:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  // 验证至少有一条性状数据
  if (detailList.value.length === 0) {
    ElMessage.warning(t('trait.addAtLeastOneTrait'))
    return
  }

  // 验证每条性状数据完整性
  for (let i = 0; i < detailList.value.length; i++) {
    const detail = detailList.value[i]
    if (!detail.traitCode || detail.traitValue === null || detail.traitValue === '') {
      ElMessage.warning(`${t('trait.traitDetails')} ${i + 1}: ${t('common.pleaseComplete')}`)
      return
    }
  }

  submitLoading.value = true
  try {
    if (!formData.observerId) {
      formData.observerId = getUserInfo()?.userId || ''
    }

    const submitData = {
      ...formData,
      detailList: detailList.value
    }

    if (isEdit.value) {
      await editTraitRecord(submitData)
      ElMessage.success(t('trait.editSuccess'))
    } else {
      await addTraitRecord(submitData)
      ElMessage.success(t('trait.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('Submit failed:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => router.push('/research/breeding-data/trait')

onMounted(() => {
  loadPlotOptions()
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

.photo-upload {
  width: 100%;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-list) {
  margin-top: 8px;
}

// 移动端性状卡片
.trait-card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trait-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  background: #f9fafb;

  .trait-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e4e7ed;

    .trait-number {
      font-weight: 600;
      color: #009A44;
      font-size: 16px;
    }
  }

  .trait-card-body {
    :deep(.el-form-item) {
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .card-body {
    padding: 16px;
  }
}
</style>
