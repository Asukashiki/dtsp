<template>
  <div class="system-page">
    <!-- Main Content Card -->
    <el-card class="fade-in" shadow="hover">
      <template #header>
        <div class="page-header">
          <span class="title">
            <el-button text @click="goBack" style="margin-right: 8px;">
              <i class="ri-arrow-left-line"></i>
            </el-button>
            <i class="ri-list-check-2"></i>
            {{ $t('system.dict.dataTitle') }}: {{ dictType }}
          </span>
          <div class="actions">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('system.common.add') }}
            </el-button>
          </div>
        </div>
      </template>

      <el-table v-loading="loading" :data="dataList" stripe>
        <el-table-column prop="dictCode" label="ID" width="80" />
        <el-table-column :label="$t('system.dict.dataLabel')" min-width="200">
          <template #default="{ row }">
            {{ getDictLabel(row.dictLabel) }}
          </template>
        </el-table-column>
        <el-table-column prop="dictValue" :label="$t('system.dict.dataValue')" min-width="150">
          <template #default="{ row }">
            <el-tag type="info" size="small">{{ row.dictValue }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dictSort" :label="$t('system.dict.dataSort')" width="100" align="center" />
        <el-table-column :label="$t('system.dict.status')" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '0' ? 'success' : 'danger'" size="small">
              {{ row.status === '0' ? $t('system.user.normal') : $t('system.user.disable') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('system.common.operate')" width="220" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              {{ $t('system.common.edit') }}
            </el-button>
            <el-button type="danger" link @click="handleDelete(row)">
              {{ $t('system.common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        class="modern-pagination"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="getList"
        @current-change="getList"
      />
    </el-card>

    <!-- Add/Edit Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="560px"
      destroy-on-close
      class="responsive-dialog"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-position="top">
        <el-form-item :label="$t('system.dict.dictType')">
          <el-input v-model="form.dictType" disabled />
        </el-form-item>
        <el-form-item :label="$t('system.dict.dataLabel')" prop="dictLabel">
          <I18nInput v-model="form.dictLabelI18n" />
        </el-form-item>
        <el-form-item :label="$t('system.dict.dataValue')" prop="dictValue">
          <el-input v-model="form.dictValue" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.dict.dataSort')" prop="dictSort">
              <el-input-number v-model="form.dictSort" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.dict.status')">
              <el-radio-group v-model="form.status">
                <el-radio value="0">{{ $t('system.user.normal') }}</el-radio>
                <el-radio value="1">{{ $t('system.user.disable') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">{{ $t('system.common.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm">{{ $t('system.common.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { listData, getData, addData, updateData, delData } from '@/api/system/dict'
import { getI18nText, toI18nJson } from '@/utils/i18n'
import { extractI18nValues } from '@/utils/i18nHelper'
import I18nInput from '@/components/I18nInput/index.vue'
import '@/styles/system.css'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const dictType = computed(() => route.params.dictType)

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const dialogVisible = ref(false)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  dictType: ''
})

// 使用 extractI18nValues 初始化空的国际化值
const form = ref({
  dictCode: undefined,
  dictType: '',
  dictLabel: '',
  dictLabelI18n: extractI18nValues(''),
  dictValue: '',
  dictSort: 0,
  status: '0'
})

const formRef = ref(null)

const dialogTitle = computed(() => {
  return form.value.dictCode ? t('system.dict.editData') : t('system.dict.addData')
})

const rules = {
  dictValue: [{ required: true, message: () => t('common.pleaseInput') + t('system.dict.dataValue'), trigger: 'blur' }]
}

const getDictLabel = (dictLabel) => {
  return getI18nText(dictLabel)
}

const getList = async () => {
  loading.value = true
  queryParams.dictType = dictType.value
  try {
    const res = await listData(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch dict data:', error)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/system/dict')
}

const handleAdd = () => {
  form.value = {
    dictCode: undefined,
    dictType: dictType.value,
    dictLabel: '',
    dictLabelI18n: extractI18nValues(''),
    dictValue: '',
    dictSort: 0,
    status: '0'
  }
  dialogVisible.value = true
}

const handleEdit = async (row) => {
  try {
    const res = await getData(row.dictCode)
    const data = res.data
    // 使用统一工具提取国际化值
    const dictLabelI18n = extractI18nValues(data.dictLabel)
    form.value = { ...data, dictLabelI18n }
    dialogVisible.value = true
  } catch (error) {
    console.error('Failed to fetch dict data:', error)
  }
}

const submitForm = async () => {
  try {
    await formRef.value?.validate()
    const submitData = {
      ...form.value,
      dictLabel: toI18nJson(form.value.dictLabelI18n)
    }
    
    if (form.value.dictCode) {
      await updateData(submitData)
    } else {
      await addData(submitData)
    }
    ElMessage.success(t('system.common.success'))
    dialogVisible.value = false
    getList()
  } catch (error) {
    console.error('Submit failed:', error)
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('system.common.confirmDelete'), t('common.tip'), {
    confirmButtonText: t('system.common.confirm'),
    cancelButtonText: t('system.common.cancel'),
    type: 'warning'
  }).then(async () => {
    await delData(row.dictCode)
    ElMessage.success(t('system.common.success'))
    getList()
  }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
@import '@/styles/system.css';
</style>
