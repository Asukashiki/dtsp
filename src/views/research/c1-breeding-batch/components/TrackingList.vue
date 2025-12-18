<template>
  <div class="tracking-list-component">
    <!-- 列表视图 -->
    <div v-if="currentView === 'list'" class="list-view">
      <!-- 操作栏 -->
      <div class="action-bar" v-if="!readonly">
        <el-button type="primary" @click="handleAdd">
          <i class="ri-add-line"></i>
          {{ $t('research.c1BreedingBatch.tracking.add') }}
        </el-button>
        <el-button @click="loadList">
          <i class="ri-refresh-line"></i>
          {{ $t('common.refresh') }}
        </el-button>
      </div>
      <div class="action-bar" v-else>
        <el-button @click="loadList">
          <i class="ri-refresh-line"></i>
          {{ $t('common.refresh') }}
        </el-button>
      </div>
      <!-- 数据表格 -->
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="trackingId" :label="t('research.c1BreedingBatch.tracking.trackingId')" min-width="180"
          show-overflow-tooltip />
        <el-table-column prop="seedClass" :label="t('research.c1BreedingBatch.tracking.seedClass')" min-width="100" align="center" />
        <el-table-column prop="lotId" :label="t('research.c1BreedingBatch.tracking.lotId')" min-width="140" show-overflow-tooltip />
        <el-table-column prop="stage" :label="t('research.c1BreedingBatch.tracking.stage')" min-width="120" align="center" />
        <el-table-column prop="inspectionValue" :label="t('research.c1BreedingBatch.tracking.inspectionValue')" min-width="100" align="center" />
        <el-table-column prop="location" :label="t('research.c1BreedingBatch.tracking.location')" min-width="150"
          show-overflow-tooltip />
        <el-table-column prop="trackingResult" :label="t('research.c1BreedingBatch.tracking.result')" min-width="100"
          align="center">
          <template #default="{ row }">
            <el-tag :type="getResultTagType(row.trackingResult)" size="small">
              {{ getResultText(row.trackingResult) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" :label="t('research.c1BreedingBatch.tracking.startDate')" min-width="120"
          align="center" />
        <el-table-column :label="t('common.actions')" width="200" align="center" fixed="right" v-if="!readonly">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">{{ $t('common.edit') }}</el-button>
            <el-button link type="danger" @click="handleDelete(row.id)">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表单视图 -->
    <div v-else-if="currentView === 'form'" class="form-view">
      <div class="view-header">
        <el-button @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
        <h3 class="view-title">{{ isEdit ? t('research.c1BreedingBatch.tracking.edit') :
          t('research.c1BreedingBatch.tracking.add') }}</h3>
      </div>

      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="tracking-form">
        <div class="form-grid">
          <el-form-item :label="t('research.c1BreedingBatch.tracking.seedClass')" prop="seedClass">
            <el-select v-model="formData.seedClass" :placeholder="t('common.pleaseSelect')" class="full-width">
              <el-option label="Pre-Basic" value="Pre-Basic" />
              <el-option label="Basic" value="Basic" />
              <el-option label="C1" value="C1" />
              <el-option label="C2" value="C2" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.lotId')">
            <el-input v-model="formData.lotId" disabled />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.stage')">
            <el-select v-model="formData.stage" :placeholder="t('common.pleaseSelect')" class="full-width" @change="handleStageChange">
              <el-option label="Planting" value="PLANTING" />
              <el-option label="Vegetative" value="VEGETATIVE" />
              <el-option label="Flowering" value="FLOWERING" />
              <el-option label="Purity" value="PURITY" />
              <el-option label="Harvest" value="HARVEST" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.score')">
            <el-select v-model="formData.score" :placeholder="t('common.pleaseSelect')" class="full-width" :disabled="!formData.stage">
              <el-option 
                v-for="item in scoreOptions" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value" 
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.inspectionValue')">
            <el-input v-model="formData.inspectionValue" :placeholder="t('common.pleaseEnter')">
              <template #append>{{ currentUnit }}</template>
            </el-input>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.result')" prop="trackingResult">
            <el-select v-model="formData.trackingResult" :placeholder="t('common.pleaseSelect')" class="full-width">
              <el-option :label="t('research.c1BreedingBatch.tracking.resultNormal')" value="01" />
              <el-option :label="t('research.c1BreedingBatch.tracking.resultAbnormal')" value="02" />
              <el-option :label="t('research.c1BreedingBatch.tracking.resultObserving')" value="03" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.location')" prop="location"
            class="full-width-item">
            <el-input v-model="formData.location" :placeholder="t('common.pleaseEnter')" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.startDate')" prop="startDate">
            <el-date-picker v-model="formData.startDate" type="date" :placeholder="t('common.pleaseSelect')"
              value-format="YYYY-MM-DD" style="width: 100%" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.endDate')">
            <el-date-picker v-model="formData.endDate" type="date" :placeholder="t('common.pleaseSelect')"
              value-format="YYYY-MM-DD" style="width: 100%" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.operator')">
            <el-input v-model="formData.operator" :placeholder="t('common.pleaseEnter')" disabled />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.tracking.description')" class="full-width-item">
            <el-input v-model="formData.trackingDesc" type="textarea" :rows="3"
              :placeholder="t('common.pleaseEnter')" />
          </el-form-item>
        </div>

        <div class="form-actions">
          <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getC1TrackingList, getC1TrackingById, addC1Tracking, updateC1Tracking, deleteC1Tracking } from '@/api/c1BreedingBatch'
import { useUserStore } from '@/store/user'

// Stage与Score的映射关系
const stageScoreMap = {
  'PURITY': [
    { label: 'Purity', value: 'PURITY' },
    { label: 'Insect Damage', value: 'INSECT_DAMAGE' },
    { label: 'Disease', value: 'DISEASE' }
  ],
  'VEGETATIVE': [
    { label: 'Plant Height', value: 'PLANT_HEIGHT' },
    { label: 'Vigor', value: 'VIGOR' }
  ],
  'HARVEST': [
    { label: 'Yield', value: 'YIELD' },
    { label: 'Moisture', value: 'MOISTURE' }
  ],
  'LAND_PREPARATION': [],
  'PLANTING': [],
  'FLOWERING': []
}

// Score对应的单位
const scoreUnitMap = {
  'PURITY': '%',
  'INSECT_DAMAGE': '%',
  'DISEASE': '%',
  'PLANT_HEIGHT': 'cm',
  'VIGOR': '',
  'YIELD': 'kg/ha',
  'MOISTURE': '%'
}
const props = defineProps({
  batchId: { type: String, required: true },
  readonly: { type: Boolean, default: false }
})
const emit = defineEmits(['refresh'])
const { t } = useI18n()
const userStore = useUserStore()
const loading = ref(false)
const submitLoading = ref(false)
const tableData = ref([])
const currentView = ref('list')
const isEdit = ref(false)
const editingId = ref(null)
const formRef = ref(null)
const formData = ref({
  seedClass: '',
  lotId: '',
  stage: '',
  score: '',
  inspectionValue: '',
  location: '',
  startDate: '',
  endDate: '',
  trackingResult: '',
  trackingDesc: '',
  operator: ''
})
const rules = {
  location: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  trackingResult: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

// 根据Stage获取可选的Score选项
const scoreOptions = computed(() => {
  const stage = formData.value.stage
  return stageScoreMap[stage] || []
})

// 根据Score获取对应的单位
const currentUnit = computed(() => {
  const score = formData.value.score
  return scoreUnitMap[score] || ''
})
onMounted(() => loadList())
const loadList = async () => {
  loading.value = true
  try {
    const response = await getC1TrackingList({ batchId: props.batchId, pageNum: 1, pageSize: 100 })
    if (response.code === 200) {
      tableData.value = response.data?.records || []
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
const handleAdd = () => {
  isEdit.value = false
  editingId.value = null
  // 从用户信息自动填充操作人
  const userInfo = userStore.userInfo?.user || {}
  const operatorName = userInfo.name || userInfo.NAME || userInfo.username || userInfo.USERNAME || ''
  // 自动生成lotId，格式: {batchId} (直接使用批次号作为lot_id)
  const lotId = props.batchId || ''
  formData.value = { seedClass: '', lotId: lotId, stage: '', score: '', inspectionValue: '', location: '', startDate: '', endDate: '', trackingResult: '', trackingDesc: '', operator: operatorName }
  currentView.value = 'form'
}

// 当stage变化时，清空score并自动选中第一个选项
const handleStageChange = (val) => {
  formData.value.score = ''
  const options = stageScoreMap[val] || []
  if (options.length > 0) {
    formData.value.score = options[0].value
  }
}
const handleEdit = async (row) => {
  isEdit.value = true
  editingId.value = row.id
  const response = await getC1TrackingById(row.id)
  if (response.code === 200 && response.data) {
    formData.value = { ...response.data }
  }
  currentView.value = 'form'
}
const handleBack = () => {
  currentView.value = 'list'
  editingId.value = null
}
const handleDelete = (id) => {
  ElMessageBox.confirm(t('research.c1BreedingBatch.tracking.deleteConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    const response = await deleteC1Tracking([id])
    if (response.code === 200) {
      ElMessage.success(t('common.deleteSuccess'))
      loadList()
      emit('refresh')
    }
  }).catch(() => { })
}
const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true
      try {
        const data = { ...formData.value, batchId: props.batchId }
        if (isEdit.value) data.id = editingId.value
        const response = isEdit.value ? await updateC1Tracking(data) : await addC1Tracking(data)
        if (response.code === 200) {
          ElMessage.success(isEdit.value ? t('common.updateSuccess') : t('common.addSuccess'))
          handleBack()
          loadList()
          emit('refresh')
        }
      } finally {
        submitLoading.value = false
      }
    }
  })
}
const getResultText = (result) => ({ '01': t('research.c1BreedingBatch.tracking.resultNormal'), '02': t('research.c1BreedingBatch.tracking.resultAbnormal'), '03': t('research.c1BreedingBatch.tracking.resultObserving') }[result] || result)
const getResultTagType = (result) => ({ '01': 'success', '02': 'danger', '03': 'warning' }[result] || 'info')
</script>
<style scoped lang="scss">
.tracking-list-component {
  .action-bar {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
  }

  .view-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e4e7ed;

    .view-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
  }

  .tracking-form {

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .full-width-item {
      grid-column: 1 / -1;
    }

    .form-actions {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      gap: 12px;
    }
  }

  .full-width {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .tracking-list-component .tracking-form .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
