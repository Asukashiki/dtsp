<template>
  <div class="test-list-component">
    <!-- 列表视图 -->
    <div v-if="currentView === 'list'" class="list-view">
      <!-- 操作栏 -->
      <div class="action-bar" v-if="!readonly">
        <el-button type="primary" @click="handleAdd">
          <i class="ri-add-line"></i>
          {{ $t('research.c1BreedingBatch.test.add') }}
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
        <el-table-column prop="testId" :label="t('research.c1BreedingBatch.test.testId')" min-width="180" show-overflow-tooltip />
        <el-table-column prop="seedClass" :label="t('research.c1BreedingBatch.test.seedClass')" min-width="100" align="center" />
        <el-table-column prop="lotId" :label="t('research.c1BreedingBatch.test.lotId')" min-width="140" show-overflow-tooltip />
        <el-table-column prop="testType" :label="t('research.c1BreedingBatch.test.testType')" min-width="120" align="center" />
        <el-table-column prop="testItem" :label="t('research.c1BreedingBatch.test.testItem')" min-width="140" show-overflow-tooltip />
        <el-table-column prop="testDate" :label="t('research.c1BreedingBatch.test.testDate')" min-width="120" align="center" />
        <el-table-column prop="testValue" :label="t('research.c1BreedingBatch.test.testValue')" min-width="100" align="center" />
        <el-table-column prop="unit" :label="t('research.c1BreedingBatch.test.unit')" min-width="80" align="center" />
        <el-table-column prop="testResult" :label="t('research.c1BreedingBatch.test.testResult')" min-width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getResultTagType(row.testResult)" size="small">
              {{ getResultText(row.testResult) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tester" :label="t('research.c1BreedingBatch.test.tester')" min-width="100" align="center" />
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
        <h3 class="view-title">{{ isEdit ? t('research.c1BreedingBatch.test.edit') : t('research.c1BreedingBatch.test.add') }}</h3>
      </div>

      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="test-form">
        <div class="form-grid">
          <el-form-item :label="t('research.c1BreedingBatch.test.seedClass')" prop="seedClass">
            <el-select v-model="formData.seedClass" :placeholder="t('common.pleaseSelect')" class="full-width">
              <el-option label="Pre-Basic" value="Pre-Basic" />
              <el-option label="Basic" value="Basic" />
              <el-option label="C1" value="C1" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.lotId')">
            <el-input v-model="formData.lotId" disabled />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.testType')">
            <el-select v-model="formData.testType" :placeholder="t('common.pleaseSelect')" class="full-width">
              <el-option label="Germination" value="GERMINATION" />
              <el-option label="Purity" value="PURITY" />
              <el-option label="Moisture" value="MOISTURE" />
              <el-option label="Seed Health" value="SEED_HEALTH" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.testItem')" prop="testItem">
            <el-select v-model="formData.testItem" :placeholder="t('common.pleaseSelect')" class="full-width">
              <el-option 
                v-for="item in testItemOptions" 
                :key="item.value" 
                :label="item.label" 
                :value="item.value" 
              />
            </el-select>
          </el-form-item>

 

          <el-form-item :label="t('research.c1BreedingBatch.test.testValue')">
            <el-input v-model="formData.testValue" :placeholder="t('common.pleaseEnter')" @blur="checkRuleOnBlur" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.unit')">
            <el-select v-model="formData.unit" :placeholder="t('common.pleaseSelect')" class="full-width">
              <el-option label="%" value="%" />
              <el-option label="kg" value="kg" />
              <el-option label="g" value="g" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.testResult')" prop="testResult">
            <el-select v-model="formData.testResult" :placeholder="t('common.pleaseSelect')" class="full-width">
              <el-option :label="t('research.c1BreedingBatch.test.resultPass')" value="01" />
              <el-option :label="t('research.c1BreedingBatch.test.resultFail')" value="02" />
              <el-option :label="t('research.c1BreedingBatch.test.resultRetest')" value="03" />
            </el-select>
          </el-form-item>

         <el-form-item :label="t('research.c1BreedingBatch.test.testDate')" prop="testDate">
            <el-date-picker v-model="formData.testDate" type="date" :placeholder="t('common.pleaseSelect')" value-format="YYYY-MM-DD" style="width: 100%" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.tester')">
            <el-input v-model="formData.tester" :placeholder="t('common.pleaseEnter')" disabled />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.testOrg')">
            <el-input v-model="formData.testOrg" :placeholder="t('common.pleaseEnter')" disabled />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.description')" class="full-width-item">
            <el-input v-model="formData.testDesc" type="textarea" :rows="3" :placeholder="t('common.pleaseEnter')" />
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
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTestList, getTestById, addTest, updateTest, deleteTest, checkRule } from '@/api/detection'
import { useUserStore } from '@/store/user'

const props = defineProps({
  batchId: { type: String, required: false },  // 改为可选
  seedClass: { type: String, default: 'C1' },  // 新增seedClass prop
  readonly: { type: Boolean, default: false }
})

const emit = defineEmits(['refresh'])
const { t } = useI18n()
const userStore = useUserStore()

// TestType与TestItem的映射关系
const testTypeItemMap = {
  'GERMINATION': [
    { label: 'DTE', value: 'DTE' },
    { label: 'Emergence', value: 'Emergence' },
    { label: 'Vigor Score', value: 'Vigor Score' }
  ],
  'PURITY': [
    { label: 'Purity', value: 'PURITY' }
  ],
  'MOISTURE': [
    { label: 'Moisture', value: 'MOISTURE' }
  ],
  'SEED_HEALTH': [
    { label: 'Health Test', value: 'HEALTH_TEST' }
  ]
}

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
  testType: '',
  testItem: '',
  testDate: '',
  testValue: '',
  unit: '',
  passStatus: 'FALSE',
  testResult: '',
  testDesc: '',
  tester: '',
  testOrg: ''
})

// 根据testType获取可选的testItem选项
const testItemOptions = computed(() => {
  const testType = formData.value.testType
  return testTypeItemMap[testType] || []
})

const rules = {
  testItem: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  testDate: [{ required: true, message: t('common.required'), trigger: 'change' }],
  testResult: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

// 监听batchId变化，重新加载列表
watch(() => props.batchId, (newBatchId) => {
  if (newBatchId) {
    loadList()
  }
})

onMounted(() => loadList())

const loadList = async () => {
  if (!props.batchId) return  // 如果没有batchId，不加载
  loading.value = true
  try {
    const response = await getTestList({
      batchId: props.batchId,
      seedClass: props.seedClass,  // 传递seedClass
      pageNum: 1,
      pageSize: 100
    })
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
  // 从用户信息自动填充检测员和检测机构
  const userInfo = userStore.userInfo?.user || {}
  const testerName = userInfo.name || userInfo.NAME || userInfo.username || userInfo.USERNAME || ''
  const testOrgName = userInfo.organName || userInfo.ORGAN_NAME || ''
  // 自动生成lotId，直接使用批次号
  const lotId = props.batchId || ''
  formData.value = {
    seedClass: props.seedClass,  // 使用传入的seedClass
    lotId: lotId,
    testType: '',
    testItem: '',
    testDate: '',
    testValue: '',
    unit: '%',
    passStatus: 'FALSE',
    testResult: '',
    testDesc: '',
    tester: testerName,
    testOrg: testOrgName
  }
  currentView.value = 'form'
}

const handleEdit = async (row) => {
  isEdit.value = true
  editingId.value = row.id
  const response = await getTestById(row.id)
  if (response.code === 200 && response.data) {
    formData.value = { ...response.data }
  }
  currentView.value = 'form'
}

const handleBack = () => {
  currentView.value = 'list'
  editingId.value = null
}

// 失焦时检查规则
const checkRuleOnBlur = async () => {
  const newValue = formData.value.testValue
  const testItem = formData.value.testItem
  // 只有当testValue和testItem都有值时才进行检查
  if (newValue && testItem) {
    try {
      // 调用checkRule接口，传入testItem作为dictCode，testValue作为value
      const response = await checkRule(testItem, parseFloat(newValue))
      if (response.code === 200) {
        // 根据返回结果自动设置Test Result
        // true表示正常(01)，false表示异常(02)
        formData.value.testResult = response.data ? '01' : '02'
      }
    } catch (error) {
      console.error('检查规则失败:', error)
      ElMessage.error(t('common.error.operationFailed'))
    }
  }
}

const handleDelete = (id) => {
  ElMessageBox.confirm(t('research.c1BreedingBatch.test.deleteConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    const response = await deleteTest([id])
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
        const data = {
          ...formData.value,
          batchId: props.batchId,
          seedClass: props.seedClass  // 确保传递seedClass
        }
        if (isEdit.value) data.id = editingId.value
        const response = isEdit.value ? await updateTest(data) : await addTest(data)
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

const getResultText = (result) => ({ 
  '01': t('research.c1BreedingBatch.test.resultPass'), 
  '02': t('research.c1BreedingBatch.test.resultFail'), 
  '03': t('research.c1BreedingBatch.test.resultRetest') 
}[result] || result)
const getResultTagType = (result) => ({ '01': 'success', '02': 'danger', '03': 'warning' }[result] || 'info')
</script>

<style scoped lang="scss">
.test-list-component {
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

  .test-form {

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
  .test-list-component .test-form .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
