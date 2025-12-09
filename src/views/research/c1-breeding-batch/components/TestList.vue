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
        <el-table-column prop="testItem" :label="t('research.c1BreedingBatch.test.testItem')" min-width="140" show-overflow-tooltip />
        <el-table-column prop="testDate" :label="t('research.c1BreedingBatch.test.testDate')" min-width="120" align="center" />
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
          <el-form-item :label="t('research.c1BreedingBatch.test.testItem')" prop="testItem">
            <el-input v-model="formData.testItem" :placeholder="t('common.pleaseEnter')" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.testDate')" prop="testDate">
            <el-date-picker v-model="formData.testDate" type="date" :placeholder="t('common.pleaseSelect')" value-format="YYYY-MM-DD" style="width: 100%" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.testValue')">
            <el-input v-model="formData.testValue" :placeholder="t('common.pleaseEnter')" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.testResult')" prop="testResult">
            <el-select v-model="formData.testResult" :placeholder="t('common.pleaseSelect')" class="full-width">
              <el-option :label="t('research.c1BreedingBatch.test.resultPass')" value="01" />
              <el-option :label="t('research.c1BreedingBatch.test.resultFail')" value="02" />
              <el-option :label="t('research.c1BreedingBatch.test.resultRetest')" value="03" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.tester')">
            <el-input v-model="formData.tester" :placeholder="t('common.pleaseEnter')" />
          </el-form-item>

          <el-form-item :label="t('research.c1BreedingBatch.test.testOrg')">
            <el-input v-model="formData.testOrg" :placeholder="t('common.pleaseEnter')" />
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
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getC1TestList, getC1TestById, addC1Test, updateC1Test, deleteC1Test } from '@/api/c1BreedingBatch'

const props = defineProps({
  batchId: { type: String, required: true },
  readonly: { type: Boolean, default: false }
})

const emit = defineEmits(['refresh'])
const { t } = useI18n()

const loading = ref(false)
const submitLoading = ref(false)
const tableData = ref([])
const currentView = ref('list')
const isEdit = ref(false)
const editingId = ref(null)
const formRef = ref(null)

const formData = ref({
  testItem: '',
  testDate: '',
  testValue: '',
  testResult: '',
  testDesc: '',
  tester: '',
  testOrg: ''
})

const rules = {
  testItem: [{ required: true, message: t('common.required'), trigger: 'blur' }],
  testDate: [{ required: true, message: t('common.required'), trigger: 'change' }],
  testResult: [{ required: true, message: t('common.required'), trigger: 'change' }]
}

onMounted(() => loadList())

const loadList = async () => {
  loading.value = true
  try {
    const response = await getC1TestList({ batchId: props.batchId, pageNum: 1, pageSize: 100 })
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
  formData.value = { testItem: '', testDate: '', testValue: '', testResult: '', testDesc: '', tester: '', testOrg: '' }
  currentView.value = 'form'
}

const handleEdit = async (row) => {
  isEdit.value = true
  editingId.value = row.id
  const response = await getC1TestById(row.id)
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
  ElMessageBox.confirm(t('research.c1BreedingBatch.test.deleteConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    const response = await deleteC1Test([id])
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
        const response = isEdit.value ? await updateC1Test(data) : await addC1Test(data)
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
    max-width: 800px;

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
