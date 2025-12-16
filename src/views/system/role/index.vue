<template>
  <div class="system-page">
    <!-- Search Area -->
    <div class="search-area fade-in">
      <el-form :model="queryParams" inline>
        <el-form-item :label="$t('system.role.roleName')">
          <el-input
            v-model="queryParams.roleName"
            :placeholder="$t('common.pleaseInput')"
            clearable
            style="width: 180px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('system.role.roleKey')">
          <el-input
            v-model="queryParams.roleKey"
            :placeholder="$t('common.pleaseInput')"
            clearable
            style="width: 180px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item :label="$t('system.role.status')">
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
            <i class="ri-shield-user-line"></i>
            {{ $t('system.role.title') }}
          </span>
          <div class="actions">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('system.common.add') }}
            </el-button>
          </div>
        </div>
      </template>

      <el-table v-loading="loading" :data="roleList" stripe>
        <!-- <el-table-column prop="roleId" label="ID" width="80" /> -->
        <el-table-column type="index" label="No" width="80" />
        <el-table-column prop="roleName" :label="$t('system.role.roleName')" min-width="150" />
        <el-table-column prop="roleKey" :label="$t('system.role.roleKey')" min-width="150">
          <template #default="{ row }">
            <el-tag effect="plain" size="small">{{ row.roleKey }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="roleSort" :label="$t('system.role.roleSort')" width="100" align="center" />
        <el-table-column :label="$t('system.role.status')" width="100" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('system.role.createTime')" width="160" />
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
      width="600px"
      destroy-on-close
      class="responsive-dialog"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-position="top">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.role.roleName')" prop="roleName">
              <el-input v-model="form.roleName" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.role.roleKey')" prop="roleKey">
              <el-input v-model="form.roleKey" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.role.roleSort')" prop="roleSort">
              <el-input-number v-model="form.roleSort" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.role.status')">
              <el-radio-group v-model="form.status">
                <el-radio value="0">{{ $t('system.user.normal') }}</el-radio>
                <el-radio value="1">{{ $t('system.user.disable') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('system.role.menuPerms')">
          <div class="tree-actions">
            <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">{{ $t('system.role.expand') }}/{{ $t('system.role.collapse') }}</el-checkbox>
            <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">{{ $t('system.role.selectAll') }}/{{ $t('system.role.unselectAll') }}</el-checkbox>
          </div>
          <div class="form-tree-container">
            <el-tree
              ref="menuTreeRef"
              :data="menuOptions"
              show-checkbox
              node-key="id"
              :default-checked-keys="form.menuIds"
              :props="{ label: 'label', children: 'children' }"
              :default-expand-all="menuExpand"
            />
          </div>
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
import { listRole, getRole, addRole, updateRole, delRole, changeRoleStatus } from '@/api/system/role'
import { roleMenuTreeselect, treeselect } from '@/api/system/menu'
import '@/styles/system.css'

const { t, locale } = useI18n()

// 解析国际化标签
const resolveI18nLabel = (label) => {
  try {
    if (!label) return ''
    if (label.startsWith('{')) {
      const names = JSON.parse(label)
      const lang = locale.value === 'zh-CN' ? 'zh_CN' : 'en_US'
      return names[lang] || names['zh_CN'] || label
    }
    return label
  } catch (e) {
    return label
  }
}

// 递归处理树节点的 label
const processTreeLabels = (nodes) => {
  if (!nodes) return []
  return nodes.map(node => ({
    ...node,
    label: resolveI18nLabel(node.label),
    children: node.children ? processTreeLabels(node.children) : []
  }))
}

const loading = ref(false)
const roleList = ref([])
const total = ref(0)
const dialogVisible = ref(false)
const menuOptions = ref([])
const menuExpand = ref(false)
const menuNodeAll = ref(false)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: '',
  roleKey: '',
  status: ''
})

const form = ref({
  roleId: undefined,
  roleName: '',
  roleKey: '',
  roleSort: 0,
  status: '0',
  menuIds: []
})

const formRef = ref(null)
const menuTreeRef = ref(null)

const dialogTitle = computed(() => {
  return form.value.roleId ? t('system.role.edit') : t('system.role.add')
})

const rules = {
  roleName: [{ required: true, message: () => t('common.pleaseInput') + t('system.role.roleName'), trigger: 'blur' }],
  roleKey: [{ required: true, message: () => t('common.pleaseInput') + t('system.role.roleKey'), trigger: 'blur' }]
}

const getList = async () => {
  loading.value = true
  try {
    const res = await listRole(queryParams)
    roleList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch roles:', error)
  } finally {
    loading.value = false
  }
}

const getMenuTreeByRole = async (roleId) => {
  try {
    if (roleId) {
      // 编辑角色时，获取该角色的菜单权限
      const res = await roleMenuTreeselect(roleId)
      // 处理菜单树的国际化标签
      menuOptions.value = processTreeLabels(res.menus || [])
      return res.checkedKeys || []
    } else {
      // 新增角色时，只获取菜单树，不需要已选中的节点
      const res = await treeselect()
      menuOptions.value = processTreeLabels(res.data || [])
      return []
    }
  } catch (error) {
    console.error('Failed to fetch menu tree:', error)
    return []
  }
}

// 树权限（展开/折叠）
const handleCheckedTreeExpand = (value, type) => {
  if (type === 'menu') {
    const nodes = menuTreeRef.value?.store.nodesMap
    for (let i in nodes) {
      nodes[i].expanded = value
    }
  }
}

// 树权限（全选/全不选）
const handleCheckedTreeNodeAll = (value, type) => {
  if (type === 'menu') {
    menuTreeRef.value?.setCheckedNodes(value ? menuOptions.value : [])
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const resetQuery = () => {
  queryParams.roleName = ''
  queryParams.roleKey = ''
  queryParams.status = ''
  handleQuery()
}

const handleAdd = async () => {
  form.value = {
    roleId: undefined,
    roleName: '',
    roleKey: '',
    roleSort: 0,
    status: '0',
    menuIds: []
  }
  await getMenuTreeByRole()
  dialogVisible.value = true
}

const handleEdit = async (row) => {
  try {
    const res = await getRole(row.roleId)
    const checkedKeys = await getMenuTreeByRole(row.roleId)
    form.value = { ...res.data, menuIds: checkedKeys }
    dialogVisible.value = true
  } catch (error) {
    console.error('Failed to fetch role:', error)
  }
}

const submitForm = async () => {
  try {
    await formRef.value?.validate()
    const menuIds = menuTreeRef.value?.getCheckedKeys().concat(menuTreeRef.value?.getHalfCheckedKeys()) || []
    const submitData = { ...form.value, menuIds }
    
    if (form.value.roleId) {
      await updateRole(submitData)
    } else {
      await addRole(submitData)
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
    await delRole(row.roleId)
    ElMessage.success(t('system.common.success'))
    getList()
  }).catch(() => {})
}

const handleStatusChange = async (row) => {
  try {
    await changeRoleStatus(row.roleId, row.status)
    ElMessage.success(t('system.common.success'))
  } catch (error) {
    row.status = row.status === '0' ? '1' : '0'
  }
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
@import '@/styles/system.css';
</style>
