<template>
  <div class="system-page">
    <!-- Search Area -->
    <div class="search-area fade-in">
      <el-form :model="queryParams" inline>
        <el-form-item :label="$t('system.dict.dictName')">
          <el-input
            v-model="queryParams.dictName"
            :placeholder="$t('common.pleaseInput')"
            clearable
            style="width: 180px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('system.dict.dictType')">
          <el-input
            v-model="queryParams.dictType"
            :placeholder="$t('common.pleaseInput')"
            clearable
            style="width: 180px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('system.dict.status')">
          <el-select v-model="queryParams.status" clearable :placeholder="$t('common.pleaseSelect')" style="width: 120px">
            <el-option :label="$t('system.user.normal')" value="0" />
            <el-option :label="$t('system.user.disable')" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item class="search-buttons">
          <el-button type="primary" @click="handleQuery">
            <i class="ri-search-line"></i>
            {{ $t('system.common.search') }}
          </el-button>
          <el-button @click="resetQuery">
            <i class="ri-refresh-line"></i>
            {{ $t('system.common.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- Main Content Card -->
    <el-card class="fade-in" shadow="hover">
      <template #header>
        <div class="page-header">
          <span class="title">
            <i class="ri-book-2-line"></i>
            {{ $t('system.dict.title') }}
          </span>
          <div class="actions">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('system.common.add') }}
            </el-button>
          </div>
        </div>
      </template>

      <el-table v-loading="loading" :data="dictList" stripe>
        <el-table-column type="index" label="No" width="80" />
        <el-table-column prop="dictName" :label="$t('system.dict.dictName')" min-width="180" />
        <el-table-column prop="dictType" :label="$t('system.dict.dictType')" min-width="220">
          <template #default="{ row }">
            <router-link :to="'/system/dict-data/' + row.dictType" class="dict-type-link">
              {{ row.dictType }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('system.dict.status')" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '0' ? 'success' : 'danger'" size="small">
              {{ row.status === '0' ? $t('system.user.normal') : $t('system.user.disable') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('system.dict.remark')" min-width="200" show-overflow-tooltip />
        <el-table-column prop="createTime" :label="$t('system.dict.createTime')" width="160" />
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
      width="520px"
      destroy-on-close
      class="responsive-dialog"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-position="top">
        <el-form-item :label="$t('system.dict.dictName')" prop="dictName">
          <el-input v-model="form.dictName" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
        <el-form-item :label="$t('system.dict.dictType')" prop="dictType">
          <el-input v-model="form.dictType" :placeholder="$t('common.pleaseInput')" :disabled="!!form.dictId" />
        </el-form-item>
        <el-form-item :label="$t('system.dict.status')">
          <el-radio-group v-model="form.status">
            <el-radio value="0">{{ $t('system.user.normal') }}</el-radio>
            <el-radio value="1">{{ $t('system.user.disable') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('system.dict.remark')">
          <el-input v-model="form.remark" type="textarea" :rows="3" :placeholder="$t('common.pleaseInput')" />
        </el-form-item>
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
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { listType, getType, addType, updateType, delType } from '@/api/system/dict'
import '@/styles/system.css'

const { t } = useI18n()

const loading = ref(false)
const dictList = ref([])
const total = ref(0)
const dialogVisible = ref(false)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  dictName: '',
  dictType: '',
  status: ''
})

const form = ref({
  dictId: undefined,
  dictName: '',
  dictType: '',
  status: '0',
  remark: ''
})

const formRef = ref(null)

const dialogTitle = computed(() => {
  return form.value.dictId ? t('system.dict.edit') : t('system.dict.add')
})

const rules = {
  dictName: [{ required: true, message: () => t('common.pleaseInput') + t('system.dict.dictName'), trigger: 'blur' }],
  dictType: [{ required: true, message: () => t('common.pleaseInput') + t('system.dict.dictType'), trigger: 'blur' }]
}

const getList = async () => {
  loading.value = true
  try {
    const res = await listType(queryParams)
    dictList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch dict types:', error)
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const resetQuery = () => {
  queryParams.dictName = ''
  queryParams.dictType = ''
  queryParams.status = ''
  handleQuery()
}

const handleAdd = () => {
  form.value = {
    dictId: undefined,
    dictName: '',
    dictType: '',
    status: '0',
    remark: ''
  }
  dialogVisible.value = true
}

const handleEdit = async (row) => {
  try {
    const res = await getType(row.dictId)
    form.value = { ...res.data }
    dialogVisible.value = true
  } catch (error) {
    console.error('Failed to fetch dict type:', error)
  }
}

const submitForm = async () => {
  try {
    await formRef.value?.validate()
    if (form.value.dictId) {
      await updateType(form.value)
    } else {
      await addType(form.value)
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
    await delType(row.dictId)
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

.dict-type-link {
  color: #009A44;
  text-decoration: none;
  font-weight: 500;
}

.dict-type-link:hover {
  text-decoration: underline;
}
</style>
