<template>
  <div class="system-page">
    <!-- Header Card -->
    <div class="page-card fade-in">
      <div class="page-card__header">
        <div class="page-card__title">
          <i class="ri-building-2-line"></i>
          <span>{{ $t('system.dept.title') }}</span>
        </div>
        <div class="page-card__actions">
          <el-button @click="toggleAll">
            <i :class="allExpanded ? 'ri-contract-up-down-line' : 'ri-expand-up-down-line'"></i>
            {{ allExpanded ? $t('common.collapseAll') : $t('common.expandAll') }}
          </el-button>
          <el-button type="primary" @click="handleAdd()">
            <i class="ri-add-line"></i>
            {{ $t('system.common.add') }}
          </el-button>
        </div>
      </div>

      <div class="page-card__body" v-loading="loading">
        <!-- Empty state -->
        <div v-if="!loading && deptList.length === 0" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('common.noData') }}</p>
        </div>

        <!-- Tree Container -->
        <div v-else class="tree-container">
          <template v-for="item in deptList" :key="item.deptId">
            <DeptTreeNode 
              :item="item" 
              :level="0"
              :ref="el => { if (el) treeRefs[item.deptId] = el }"
              @add="handleAdd"
              @edit="handleEdit"
              @delete="handleDelete"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- Add/Edit Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('system.dept.parentDept')" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="deptOptions"
            :props="{ label: 'label', value: 'value', children: 'children' }"
            check-strictly
            :placeholder="$t('common.pleaseSelect')"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item :label="$t('system.dept.deptType')" prop="deptType">
          <el-radio-group v-model="form.deptType">
            <el-radio value="D">{{ $t('system.dept.typeDept') }}</el-radio>
            <el-radio value="A">{{ $t('system.dept.typeArea') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('system.dept.deptName')" prop="deptName">
          <I18nInput v-model="form.deptNameI18n" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('system.dept.orderNum')" prop="orderNum">
              <el-input-number v-model="form.orderNum" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.dept.leader')">
              <el-input v-model="form.leader" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('system.dept.phone')">
              <el-input v-model="form.phone" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.dept.email')">
              <el-input v-model="form.email" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('system.dept.status')">
          <el-radio-group v-model="form.status">
            <el-radio value="0">{{ $t('system.user.normal') }}</el-radio>
            <el-radio value="1">{{ $t('system.user.disable') }}</el-radio>
          </el-radio-group>
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
import { ref, onMounted, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { listDept, getDept, addDept, updateDept, delDept } from '@/api/system/dept'
import { getI18nText, toI18nJson } from '@/utils/i18n'
import I18nInput from '@/components/I18nInput/index.vue'
import DeptTreeNode from './components/DeptTreeNode.vue'

const { t } = useI18n()

const loading = ref(false)
const deptList = ref([])
const deptOptions = ref([])
const dialogVisible = ref(false)
const allExpanded = ref(false)
const treeRefs = reactive({})

const form = ref({
  deptId: undefined,
  parentId: '0',
  deptName: '',
  deptNameI18n: { zh_CN: '', en_US: '' },
  deptType: 'D',
  orderNum: 0,
  leader: '',
  phone: '',
  email: '',
  status: '0'
})

const formRef = ref(null)

const dialogTitle = computed(() => {
  return form.value.deptId ? t('system.dept.edit') : t('system.dept.add')
})

const rules = {
  orderNum: [{ required: true, message: () => t('common.pleaseInput'), trigger: 'blur' }]
}

// Convert flat list to tree
const listToTree = (list, parentId = '0') => {
  const result = []
  for (const item of list) {
    if (String(item.parentId) === String(parentId)) {
      const children = listToTree(list, item.deptId)
      if (children.length > 0) {
        item.children = children
      }
      result.push(item)
    }
  }
  return result.sort((a, b) => (a.orderNum || 0) - (b.orderNum || 0))
}

// Build dept options for tree select
const buildDeptOptions = (treeList) => {
  const result = []
  result.push({ value: '0', label: t('common.rootNode'), children: [] })
  
  const buildChildren = (items) => {
    return items.map(item => ({
      value: item.deptId,
      label: getI18nText(item.deptName),
      children: item.children && item.children.length > 0 ? buildChildren(item.children) : undefined
    }))
  }
  
  if (treeList && treeList.length > 0) {
    result[0].children = buildChildren(treeList)
  }
  
  return result
}

// Get dept list
const getList = async () => {
  loading.value = true
  try {
    const res = await listDept()
    const flatList = res.data || []
    const treeData = listToTree(flatList)
    deptList.value = treeData
    deptOptions.value = buildDeptOptions(treeData)
  } catch (error) {
    console.error('Failed to fetch depts:', error)
  } finally {
    loading.value = false
  }
}

// Toggle all expand/collapse
const toggleAll = () => {
  allExpanded.value = !allExpanded.value
  Object.values(treeRefs).forEach(ref => {
    if (ref && ref.setExpanded) {
      ref.setExpanded(allExpanded.value)
    }
  })
}

// Add
const handleAdd = (parentItem) => {
  form.value = {
    deptId: undefined,
    parentId: parentItem ? parentItem.deptId : '0',
    deptName: '',
    deptNameI18n: { zh_CN: '', en_US: '' },
    deptType: 'D',
    orderNum: 0,
    leader: '',
    phone: '',
    email: '',
    status: '0'
  }
  dialogVisible.value = true
}

// Edit
const handleEdit = async (item) => {
  try {
    const res = await getDept(item.deptId)
    const data = res.data
    let deptNameI18n = { zh_CN: '', en_US: '' }
    try {
      deptNameI18n = typeof data.deptName === 'string' ? JSON.parse(data.deptName) : data.deptName
    } catch {
      deptNameI18n = { zh_CN: data.deptName || '', en_US: '' }
    }
    form.value = { ...data, deptNameI18n, parentId: data.parentId || '0' }
    dialogVisible.value = true
  } catch (error) {
    console.error('Failed to fetch dept:', error)
  }
}

// Submit form
const submitForm = async () => {
  try {
    await formRef.value?.validate()
    const submitData = {
      ...form.value,
      deptName: toI18nJson(form.value.deptNameI18n)
    }
    
    if (form.value.deptId) {
      await updateDept(submitData)
    } else {
      await addDept(submitData)
    }
    ElMessage.success(t('system.common.success'))
    dialogVisible.value = false
    getList()
  } catch (error) {
    console.error('Submit failed:', error)
  }
}

// Delete
const handleDelete = (item) => {
  ElMessageBox.confirm(t('system.common.confirmDelete'), t('common.tip'), {
    confirmButtonText: t('system.common.confirm'),
    cancelButtonText: t('system.common.cancel'),
    type: 'warning'
  }).then(async () => {
    await delDept(item.deptId)
    ElMessage.success(t('system.common.success'))
    getList()
  }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
.system-page {
  padding: 20px;
  min-height: calc(100vh - 120px);
}

.page-card {
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.page-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.06) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 1px solid rgba(0, 154, 68, 0.1);
}

.page-card__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #009A44;
}

.page-card__title i {
  font-size: 24px;
}

.page-card__actions {
  display: flex;
  gap: 10px;
}

.page-card__body {
  padding: 24px;
  min-height: 300px;
}

.tree-container {
  max-width: 100%;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9ca3af;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 16px;
  color: #e5e7eb;
}

.empty-state p {
  font-size: 14px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
