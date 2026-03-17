<template>
  <div class="system-page">
    <!-- Header Card -->
    <div class="page-card fade-in">
      <div class="page-card__header">
        <div class="page-card__title">
          <i class="ri-menu-2-line"></i>
          <span>{{ $t('system.menus.title') }}</span>
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
        <div v-if="!loading && menuList.length === 0" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('common.noData') }}</p>
        </div>

        <!-- Tree Container -->
        <div v-else class="tree-container">
          <template v-for="item in menuList" :key="item.menuId">
            <MenuTreeNode 
              :item="item" 
              :level="0"
              :ref="el => { if (el) treeRefs[item.menuId] = el }"
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
      width="680px"
      destroy-on-close
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('system.dept.parentDept')" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="menuOptions"
            :props="{ label: 'label', value: 'value', children: 'children' }"
            check-strictly
            :placeholder="$t('common.pleaseSelect')"
            style="width: 100%"
          />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('system.menus.menuType')" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio-button value="M">{{ $t('system.menus.typeDir') }}</el-radio-button>
                <el-radio-button value="C">{{ $t('system.menus.typeMenu') }}</el-radio-button>
                <el-radio-button value="F">{{ $t('system.menus.typeBtn') }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType !== 'F'" :label="$t('system.menus.icon')">
              <el-input v-model="form.icon" :placeholder="$t('common.pleaseInput')">
                <template #prefix>
                  <i :class="form.icon || 'ri-menu-line'"></i>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('system.menus.menuName')" prop="menuName">
              <I18nInput v-model="form.menuNameI18n" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.menus.orderNum')" prop="orderNum">
              <el-input-number v-model="form.orderNum" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.menuType !== 'F'" :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('system.menus.isFrame')">
              <el-radio-group v-model="form.isFrame" @change="handleFrameChange">
                <el-radio-button value="1">{{ $t('system.menus.innerLink') }}</el-radio-button>
                <el-radio-button value="0">{{ $t('system.menus.externalLink') }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.menuType !== 'F'" :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('system.menus.path')" prop="path">
              <el-input v-model="form.path" :placeholder="form.isFrame === '0' ? $t('system.menus.pathPlaceholderExternal') : $t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType === 'C' && form.isFrame !== '0'">
            <el-form-item :label="$t('system.menus.component')" prop="component">
              <el-input v-model="form.component" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" v-if="form.menuType !== 'M'">
            <el-form-item :label="$t('system.menus.perms')" prop="perms">
              <el-input v-model="form.perms" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType !== 'F'">
            <el-form-item :label="$t('system.menus.status')">
              <el-radio-group v-model="form.visible">
                <el-radio-button value="0">{{ $t('system.menus.visible') }}</el-radio-button>
                <el-radio-button value="1">{{ $t('system.menus.hidden') }}</el-radio-button>
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
import { ref, onMounted, computed, h, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { listMenu, getMenu, addMenu, updateMenu, delMenu } from '@/api/system/menu'
import { getI18nText, toI18nJson } from '@/utils/i18n'
import I18nInput from '@/components/I18nInput/index.vue'
import MenuTreeNode from './components/MenuTreeNode.vue'

const { t } = useI18n()

const loading = ref(false)
const menuList = ref([])
const menuOptions = ref([])
const dialogVisible = ref(false)
const allExpanded = ref(false)
const treeRefs = reactive({})

const form = ref({
  menuId: undefined,
  parentId: '0',
  menuType: 'M',
  menuName: '',
  menuNameI18n: { zh_CN: '', en_US: '' },
  icon: '',
  orderNum: 0,
  isFrame: '1',
  path: '',
  component: '',
  perms: '',
  visible: '0'
})

const formRef = ref(null)

const dialogTitle = computed(() => {
  return form.value.menuId ? t('system.menus.edit') : t('system.menus.add')
})

const rules = {
  menuType: [{ required: true, message: () => t('common.pleaseSelect'), trigger: 'change' }],
  orderNum: [{ required: true, message: () => t('common.pleaseInput'), trigger: 'blur' }]
}

// Convert flat list to tree
const listToTree = (list, parentId = '0') => {
  const result = []
  for (const item of list) {
    if (String(item.parentId) === String(parentId)) {
      const children = listToTree(list, item.menuId)
      if (children.length > 0) {
        item.children = children
      }
      result.push(item)
    }
  }
  return result.sort((a, b) => (a.orderNum || 0) - (b.orderNum || 0))
}

// Build menu options for tree select
const buildMenuOptions = (treeList) => {
  const result = []
  result.push({ value: '0', label: t('common.rootNode'), children: [] })
  
  const buildChildren = (items) => {
    return items.map(item => ({
      value: item.menuId,
      label: getI18nText(item.menuName),
      children: item.children && item.children.length > 0 ? buildChildren(item.children) : undefined
    }))
  }
  
  if (treeList && treeList.length > 0) {
    result[0].children = buildChildren(treeList)
  }
  
  return result
}

// Get menu list
const getList = async () => {
  loading.value = true
  try {
    const res = await listMenu()
    const flatList = res.data || []
    const treeData = listToTree(flatList)
    menuList.value = treeData
    menuOptions.value = buildMenuOptions(treeData)
  } catch (error) {
    console.error('Failed to fetch menus:', error)
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
    menuId: undefined,
    parentId: parentItem ? parentItem.menuId : '0',
    menuType: parentItem ? 'C' : 'M',
    menuName: '',
    menuNameI18n: { zh_CN: '', en_US: '' },
    icon: '',
    orderNum: 0,
    isFrame: '1',
    path: '',
    component: '',
    perms: '',
    visible: '0'
  }
  dialogVisible.value = true
}

// 切换外链时清空组件路径
const handleFrameChange = (val) => {
  if (val === '0') {
    form.value.component = ''
  }
}

// Edit
const handleEdit = async (item) => {
  try {
    const res = await getMenu(item.menuId)
    const data = res.data
    let menuNameI18n = { zh_CN: '', en_US: '' }
    try {
      menuNameI18n = typeof data.menuName === 'string' ? JSON.parse(data.menuName) : data.menuName
    } catch {
      menuNameI18n = { zh_CN: data.menuName || '', en_US: '' }
    }
    form.value = { ...data, menuNameI18n, parentId: data.parentId || '0', isFrame: data.isFrame || '1' }
    dialogVisible.value = true
  } catch (error) {
    console.error('Failed to fetch menu:', error)
  }
}

// Submit form
const submitForm = async () => {
  try {
    await formRef.value?.validate()
    const submitData = {
      ...form.value,
      menuName: toI18nJson(form.value.menuNameI18n)
    }
    
    if (form.value.menuId) {
      await updateMenu(submitData)
    } else {
      await addMenu(submitData)
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
    await delMenu(item.menuId)
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
