<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-user-settings-line"
        :title="$t('system.user.title')"
        :subtitle="$t('system.user.title')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('system.user.username')">
              <el-input
                v-model="queryParams.userName"
                :placeholder="$t('common.pleaseInput')"
                clearable
                class="search-input" />
            </SearchItem>

            <SearchItem :label="$t('system.user.phone')">
              <el-input
                v-model="queryParams.phoneNumber"
                :placeholder="$t('common.pleaseInput')"
                clearable
                class="search-input" />
            </SearchItem>

            <SearchItem :label="$t('system.user.status')">
              <el-select
                v-model="queryParams.status"
                :placeholder="$t('common.pleaseSelect')"
                clearable
                class="filter-select">
                <el-option :label="$t('system.user.normal')" value="0" />
                <el-option :label="$t('system.user.disable')" value="1" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('system.user.list')" icon="ri-user-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('system.common.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="userList" stripe v-loading="loading">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="userName" :label="$t('system.user.username')" min-width="120" />
              <el-table-column prop="nickName" :label="$t('system.user.nickname')" min-width="120" />
              <el-table-column :label="$t('system.user.dept')" min-width="200" show-overflow-tooltip>
                <template #default="{ row }">
                  {{ getDeptFullPath(row.deptId) || resolveI18nLabel(row.deptName) }}
                </template>
              </el-table-column>
              <el-table-column prop="phoneNumber" :label="$t('system.user.phone')" min-width="130" />
              <el-table-column :label="$t('system.user.status')" width="100" align="center">
                <template #default="{ row }">
                  <el-switch
                    v-model="row.status"
                    active-value="0"
                    inactive-value="1"
                    @change="handleStatusChange(row)"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('system.user.createTime')" width="160" />
              <el-table-column :label="$t('system.common.operate')" width="320" fixed="right" align="center">
                <template #default="{ row }">
                  <el-button type="primary" size="small"  @click="handleEdit(row)">
                    {{ $t('system.common.edit') }}
                  </el-button>
                  <el-button type="warning" size="small"  @click="handleResetPwd(row)">
                    {{ $t('system.user.resetPwd') }}
                  </el-button>
                  <el-button type="danger" size="small"  @click="handleDelete(row)">
                    {{ $t('system.common.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="getList"
                @current-change="getList"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in userList" :key="item.userId" class="mobile-card">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-user-line"></i>
                <span>{{ item.userName }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('system.user.nickname') }}:</span>
                <span class="value">{{ item.nickName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('system.user.phone') }}:</span>
                <span class="value">{{ item.phoneNumber }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('system.user.status') }}:</span>
                <span class="value">
                  <el-tag :type="item.status === '0' ? 'success' : 'danger'" effect="plain">
                    {{ item.status === '0' ? $t('system.user.normal') : $t('system.user.disable') }}
                  </el-tag>
                </span>
              </div>
            </div>
            <div class="mobile-card-actions">
              <el-button type="primary" size="small" @click="handleEdit(item)">
                {{ $t('system.common.edit') }}
              </el-button>
              <el-button type="warning" size="small" @click="handleResetPwd(item)">
                {{ $t('system.user.resetPwd') }}
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(item)">
                {{ $t('system.common.delete') }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <el-form-item :label="$t('system.user.username')" prop="userName">
              <el-input v-model="form.userName" :placeholder="$t('common.pleaseInput')" :disabled="!!form.userId" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.user.nickname')" prop="nickName">
              <el-input v-model="form.nickName" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" v-if="!form.userId">
            <el-form-item :label="$t('login.password')" prop="password">
              <el-input v-model="form.password" type="password" :placeholder="$t('common.pleaseInput')" show-password />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.user.dept')" prop="deptId">
              <el-tree-select
                v-model="form.deptId"
                :data="deptOptions"
                :props="{ label: 'label', value: 'id', children: 'children' }"
                check-strictly
                :placeholder="$t('common.pleaseSelect')"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.user.phone')" prop="phoneNumber">
              <el-input v-model="form.phoneNumber" :placeholder="$t('common.pleaseInput')" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('system.user.email')" prop="email">
              <el-input v-model="form.email" :placeholder="$t('common.pleaseInput')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24">
            <el-form-item :label="$t('system.user.assignRole')" prop="roleIds">
              <el-select
                v-model="form.roleIds"
                multiple
                :placeholder="$t('common.pleaseSelect')"
                style="width: 100%"
              >
                <el-option
                  v-for="role in roleOptions"
                  :key="role.roleId"
                  :label="role.roleName"
                  :value="role.roleId"
                  :disabled="role.status === '1'"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('system.user.status')">
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

    <!-- Reset Password Dialog -->
    <el-dialog v-model="resetPwdDialogVisible" :title="$t('system.user.resetPwd')" width="420px">
      <el-form ref="resetPwdFormRef" :model="resetPwdForm" :rules="resetPwdRules" label-width="100px">
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input v-model="resetPwdForm.password" type="password" :placeholder="$t('common.pleaseInput')" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetPwdDialogVisible = false">{{ $t('system.common.cancel') }}</el-button>
        <el-button type="primary" @click="submitResetPwd">{{ $t('system.common.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { listUser, getUser, addUser, updateUser, delUser, resetUserPwd, changeUserStatus, deptTreeSelect } from '@/api/system/user'
import { rsaEncrypt } from '@/utils/rsaEncrypt'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import '@/assets/styles/page-common.scss'
import '@/assets/styles/workflow-common.scss'
import '@/assets/styles/table-enhanced.scss'

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
const userList = ref([])
const total = ref(0)
const dialogVisible = ref(false)
const resetPwdDialogVisible = ref(false)
const deptOptions = ref([])
const roleOptions = ref([])
const rawDeptList = ref([]) // 保存原始部门数据用于构建路径
const deptMap = ref({}) // deptId -> dept 的映射

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  userName: '',
  phoneNumber: '',
  status: ''
})

const form = ref({
  userId: undefined,
  userName: '',
  nickName: '',
  password: '',
  deptId: undefined,
  phoneNumber: '',
  email: '',
  status: '0',
  roleIds: []
})

const resetPwdForm = ref({
  userId: undefined,
  password: ''
})

const formRef = ref(null)
const resetPwdFormRef = ref(null)

const dialogTitle = computed(() => {
  return form.value.userId ? t('system.user.edit') : t('system.user.add')
})

const rules = {
  userName: [{ required: true, message: () => t('common.pleaseInput') + t('system.user.username'), trigger: 'blur' }],
  nickName: [{ required: true, message: () => t('common.pleaseInput') + t('system.user.nickname'), trigger: 'blur' }],
  password: [{ required: true, message: () => t('common.pleaseInput') + t('login.password'), trigger: 'blur' }]
}

const resetPwdRules = {
  password: [{ required: true, message: () => t('common.pleaseInput') + t('login.password'), trigger: 'blur' }]
}

const getList = async () => {
  loading.value = true
  try {
    const res = await listUser(queryParams)
    userList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    loading.value = false
  }
}

const getDeptTree = async () => {
  try {
    const res = await deptTreeSelect()
    const data = res.data || []
    // 保存原始数据并构建映射
    rawDeptList.value = data
    deptMap.value = flattenDeptTree(data)
    // 处理部门树的国际化标签
    deptOptions.value = processTreeLabels(data)
  } catch (error) {
    console.error('Failed to fetch dept tree:', error)
  }
}

// 将部门树扁平化为 id -> dept 的映射
const flattenDeptTree = (nodes, parentLabel = '') => {
  const map = {}
  const flatten = (items) => {
    for (const item of items) {
      map[item.id] = {
        id: item.id,
        label: item.label,
        parentId: item.parentId || null
      }
      if (item.children && item.children.length > 0) {
        flatten(item.children)
      }
    }
  }
  flatten(nodes)
  return map
}

// 根据 deptId 构建完整路径
const getDeptFullPath = (deptId) => {
  if (!deptId || Object.keys(deptMap.value).length === 0) {
    return ''
  }
  const path = []
  let currentId = deptId
  while (currentId && deptMap.value[currentId]) {
    const dept = deptMap.value[currentId]
    path.unshift(resolveI18nLabel(dept.label))
    currentId = dept.parentId
  }
  return path.join(' / ')
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.userName = ''
  queryParams.phoneNumber = ''
  queryParams.status = ''
  handleQuery()
}

const handleAdd = async () => {
  form.value = {
    userId: undefined,
    userName: '',
    nickName: '',
    password: '',
    deptId: undefined,
    phoneNumber: '',
    email: '',
    status: '0',
    roleIds: []
  }
  // 加载角色列表（调用 getUser 接口不传 userId 可获取角色列表）
  try {
    const res = await getUser()
    roleOptions.value = res.roles || []
  } catch (error) {
    console.error('Failed to fetch roles:', error)
  }
  dialogVisible.value = true
}

const handleEdit = async (row) => {
  try {
    const res = await getUser(row.userId)
    form.value = { ...res.data, password: '', roleIds: res.roleIds || [] }
    roleOptions.value = res.roles || []
    dialogVisible.value = true
  } catch (error) {
    console.error('Failed to fetch user:', error)
  }
}

const submitForm = async () => {
  try {
    await formRef.value?.validate()
    if (form.value.userId) {
      await updateUser(form.value)
    } else {
      await addUser(form.value)
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
    await delUser(row.userId)
    ElMessage.success(t('system.common.success'))
    getList()
  }).catch(() => {})
}

const handleStatusChange = async (row) => {
  try {
    await changeUserStatus(row.userId, row.status)
    ElMessage.success(t('system.common.success'))
  } catch (error) {
    row.status = row.status === '0' ? '1' : '0'
  }
}

const handleResetPwd = (row) => {
  resetPwdForm.value.userId = row.userId
  resetPwdForm.value.password = ''
  resetPwdDialogVisible.value = true
}

const submitResetPwd = async () => {
  try {
    await resetPwdFormRef.value?.validate()
    await resetUserPwd(resetPwdForm.value.userId, rsaEncrypt(resetPwdForm.value.password))
    ElMessage.success(t('system.common.success'))
    resetPwdDialogVisible.value = false
  } catch (error) {
    console.error('Reset password failed:', error)
  }
}

onMounted(() => {
  getList()
  getDeptTree()
})
</script>

<style scoped>
/* 页面样式由标准样式文件提供 */
</style>
