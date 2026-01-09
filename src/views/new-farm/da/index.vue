<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-user-star-line"
        :title="$t('newFarm.da.title')"
        :subtitle="$t('newFarm.da.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('newFarm.da.searchPlaceholder')">
              <el-input
                v-model="searchFilters.keyword"
                :placeholder="$t('newFarm.da.searchPlaceholder')"
                class="search-input"
                clearable
                @clear="handleSearch"
                @keyup.enter="handleSearch">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('newFarm.da.form.accountStatus')">
              <el-radio-group v-model="searchFilters.accountStatus" @change="handleSearch">
                <el-radio-button label="">{{ $t('newFarm.common.all') }}</el-radio-button>
                <el-radio-button label="1">{{ $t('newFarm.da.status.enabled') }}</el-radio-button>
                <el-radio-button label="0">{{ $t('newFarm.da.status.disabled') }}</el-radio-button>
              </el-radio-group>
            </SearchItem>

            <SearchItem :label="$t('newFarm.da.form.daName')">
              <el-input
                v-model="searchFilters.daName"
                :placeholder="$t('newFarm.da.placeholder.daName')"
                class="search-input"
                clearable
                @clear="handleSearch" />
            </SearchItem>

            <SearchItem :label="$t('newFarm.da.form.phone')">
              <el-input
                v-model="searchFilters.phone"
                :placeholder="$t('newFarm.da.placeholder.phone')"
                class="search-input"
                clearable
                @clear="handleSearch" />
            </SearchItem>

            <SearchItem :label="$t('newFarm.common.woredaCode')">
              <el-cascader
                v-model="regionCodePath"
                :options="regionTreeOptions"
                :placeholder="$t('newFarm.common.selectWoreda')"
                :props="cascaderProps"
                filterable
                clearable
                class="filter-select"
                v-loading="regionTreeLoading"
                @change="handleRegionChange" />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('newFarm.da.title')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <!-- PC端：数据表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
              <el-table-column prop="daId" :label="$t('newFarm.da.columns.daId')" min-width="150" show-overflow-tooltip />
              <el-table-column prop="daName" :label="$t('newFarm.da.columns.daName')" min-width="150" show-overflow-tooltip />
              <el-table-column prop="phone" :label="$t('newFarm.da.columns.phone')" min-width="130" />
              <el-table-column prop="account" :label="$t('newFarm.da.columns.account')" min-width="150" show-overflow-tooltip />
              <el-table-column :label="$t('newFarm.da.columns.woredaCode')" min-width="150" show-overflow-tooltip>
                <template #default="{ row }">
                  {{ getWoredaName(row.woredaCode) }}
                </template>
              </el-table-column>
              <el-table-column prop="accountStatus" :label="$t('newFarm.da.columns.accountStatus')" min-width="120" align="center">
                <template #default="{ row }">
                  <el-tag :type="row.accountStatus === '1' ? 'success' : 'danger'" effect="plain">
                    {{ row.accountStatus === '1' ? $t('newFarm.da.status.enabled') : $t('newFarm.da.status.disabled') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('newFarm.common.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="'S0'"
                    mode="list"
                    :show-audit="false"
                    :custom-buttons="getRowActionButtons(row)"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.pageNum"
                v-model:page-size="pagination.pageSize"
                :total="pagination.total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端：卡片列表 -->
        <div class="mobile-card-list mobile-only" v-loading="loading">
          <div v-for="item in tableData" :key="item.daId" class="mobile-card" @click="handleView(item)">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-user-star-line"></i>
                <span>{{ item.daName }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('newFarm.da.columns.daId') }}:</span>
                <span class="value">{{ item.daId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('newFarm.da.columns.phone') }}:</span>
                <span class="value">{{ item.phone || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('newFarm.da.columns.account') }}:</span>
                <span class="value">{{ item.account || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('newFarm.da.columns.woredaCode') }}:</span>
                <span class="value">{{ getWoredaName(item.woredaCode) }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('newFarm.da.columns.accountStatus') }}:</span>
                <el-tag :type="item.accountStatus === '1' ? 'success' : 'danger'" effect="plain" size="small">
                  {{ item.accountStatus === '1' ? $t('newFarm.da.status.enabled') : $t('newFarm.da.status.disabled') }}
                </el-tag>
              </div>
            </div>
            <div class="mobile-card-footer" @click.stop>
              <ActionButtons
                :workflow-status="'S0'"
                mode="list"
                :show-audit="false"
                :custom-buttons="getRowActionButtons(item)"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div v-if="tableData.length === 0 && !loading" class="workflow-empty-state">
            <div class="empty-icon"><i class="ri-inbox-line"></i></div>
            <div class="empty-title">{{ $t('newFarm.common.noData') }}</div>
          </div>

          <!-- 移动端分页 -->
          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="pagination.pageNum"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              layout="prev, pager, next"
              small
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>

      <!-- 重置密码对话框（保留原业务逻辑） -->
      <el-dialog
        v-model="resetPasswordVisible"
        :title="$t('newFarm.da.actions.resetPassword')"
        width="400px"
        :close-on-click-modal="false">
        <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-position="top">
          <el-form-item :label="$t('newFarm.da.form.newPassword')" prop="newPassword">
            <el-input
              v-model="passwordForm.newPassword"
              type="password"
              :placeholder="$t('newFarm.da.placeholder.newPassword')"
              show-password />
          </el-form-item>
          <el-form-item :label="$t('newFarm.da.form.confirmPassword')" prop="confirmPassword">
            <el-input
              v-model="passwordForm.confirmPassword"
              type="password"
              :placeholder="$t('newFarm.da.placeholder.confirmPassword')"
              show-password />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="resetPasswordVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="resetPasswordLoading" @click="confirmResetPassword">
            {{ $t('common.confirm') }}
          </el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getDaList,
  deleteDa,
  updateDaStatus,
  resetDaPassword
} from '@/api/newFarm'
import { getRegionTree } from '@/api/orgRegistration'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

// 搜索筛选条件
const searchFilters = reactive({
  keyword: '',
  daName: '',
  phone: '',
  woredaCode: '',
  kebeleCode: '',
  accountStatus: ''
})

// 分页
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 表格数据
const tableData = ref([])
const loading = ref(false)

// 区域相关状态
const regionTreeOptions = ref([])
const regionTreeLoading = ref(false)
const regionCodePath = ref(null)

// 级联选择器配置 - 只允许选择Woreda级别 (orgType='1' && orgGrade=4)
const cascaderProps = {
  checkStrictly: true,
  emitPath: false,
  disabled: (data) => {
    return !(data.orgType === '1' && data.orgGrade === 4)
  }
}

// 重置密码相关
const resetPasswordVisible = ref(false)
const resetPasswordLoading = ref(false)
const currentDaId = ref('')
const passwordFormRef = ref(null)
const passwordForm = reactive({
  newPassword: '',
  confirmPassword: ''
})

// 密码验证规则
const passwordRules = computed(() => ({
  newPassword: [
    { required: true, message: t('newFarm.da.rules.passwordRequired'), trigger: 'blur' },
    { min: 6, max: 20, message: t('newFarm.da.rules.passwordLength'), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: t('newFarm.da.rules.confirmPasswordRequired'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error(t('newFarm.da.rules.passwordNotMatch')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// 列表操作按钮（统一按钮 UI：图标 + 文字 + 背景色）
const getRowActionButtons = (row) => ([
  { type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' },
  { type: 'primary', action: 'edit', label: 'edit', icon: 'ri-edit-line' },
  {
    type: row?.accountStatus === '1' ? 'warning' : 'success',
    action: 'toggleStatus',
    label: 'view', // 占位：实际显示使用 text（不改国际化结构）
    text: row?.accountStatus === '1' ? t('newFarm.da.actions.disable') : t('newFarm.da.actions.enable'),
    icon: row?.accountStatus === '1' ? 'ri-forbid-line' : 'ri-checkbox-circle-line'
  },
  { type: 'danger', action: 'delete', label: 'delete', icon: 'ri-delete-bin-line' }
])

// 统一动作处理（仅做 UI 事件聚合，不改变业务方法）
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'toggleStatus':
      handleToggleStatus(row)
      break
    case 'delete':
      handleDelete(row)
      break
  }
}

// 加载区域树
const loadRegionTree = async () => {
  regionTreeLoading.value = true
  try {
    const res = await getRegionTree()
    if (res.code === 200 && res.data) {
      regionTreeOptions.value = res.data
    }
  } catch (error) {
    console.error('Failed to load region tree:', error)
  } finally {
    regionTreeLoading.value = false
  }
}

// 处理区域选择变化
const handleRegionChange = (value) => {
  searchFilters.woredaCode = value || ''
  handleSearch()
}

// 递归查找区域节点
const findRegionNode = (tree, code) => {
  for (const node of tree) {
    if (node.value === code || node.code === code) {
      return node
    }
    if (node.children && node.children.length > 0) {
      const found = findRegionNode(node.children, code)
      if (found) return found
    }
  }
  return null
}

// 获取 Woreda 名称
const getWoredaName = (woredaCode) => {
  if (!woredaCode || regionTreeOptions.value.length === 0) return '-'
  const node = findRegionNode(regionTreeOptions.value, woredaCode)
  return node?.label || node?.name || woredaCode
}

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      woredaCode: searchFilters.woredaCode,
      kebeleCode: searchFilters.kebeleCode,
      accountStatus: searchFilters.accountStatus
    }

    // 核心逻辑：
    // 当顶部搜索框(keyword)有值时，传入 searchValue，触发后端的"多字段模糊匹配" (Name/ID/Phone)
    // 此时忽略 daName/phone 等单个字段的严格筛选
    if (searchFilters.keyword) {
      params.searchValue = searchFilters.keyword
    } else {
      // 当顶部搜索框为空时，使用具体的字段筛选
      if (searchFilters.daName) params.daName = searchFilters.daName
      if (searchFilters.phone) params.phone = searchFilters.phone
    }

    const res = await getDaList(params)
    if (res.code === 200 && res.data) {
      tableData.value = res.data.records || res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.pageNum = 1
  fetchData()
}

// 重置
const handleReset = () => {
  searchFilters.keyword = ''
  searchFilters.daName = ''
  searchFilters.phone = ''
  searchFilters.woredaCode = ''
  searchFilters.kebeleCode = ''
  searchFilters.accountStatus = ''
  searchFilters.searchValue = ''
  regionCodePath.value = null
  handleSearch()
}

// 分页变化
const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.pageNum = 1
  fetchData()
}

const handleCurrentChange = (val) => {
  pagination.pageNum = val
  fetchData()
}

// 新增
const handleAdd = () => {
  router.push('/input/da/add')
}

// 查看详情
const handleView = (row) => {
  router.push(`/input/da/detail/${row.daId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/input/da/edit/${row.daId}`)
}

// 启用/禁用
const handleToggleStatus = async (row) => {
  const newStatus = row.accountStatus === '1' ? '0' : '1'
  const action = newStatus === '1' ? t('newFarm.da.actions.enable') : t('newFarm.da.actions.disable')

  try {
    await ElMessageBox.confirm(
      t('newFarm.da.confirmToggleStatus', { action }),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await updateDaStatus(row.daId, newStatus)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.common.operationSuccess'))
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to toggle status:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 重置密码
const handleResetPassword = (row) => {
  currentDaId.value = row.daId
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  resetPasswordVisible.value = true
}

const confirmResetPassword = async () => {
  if (!passwordFormRef.value) return

  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      resetPasswordLoading.value = true
      try {
        const res = await resetDaPassword(currentDaId.value, passwordForm.newPassword)
        if (res.code === 200) {
          ElMessage.success(t('newFarm.da.messages.resetPasswordSuccess'))
          resetPasswordVisible.value = false
        } else {
          ElMessage.error(res.msg || t('common.failed'))
        }
      } catch (error) {
        console.error('Failed to reset password:', error)
        ElMessage.error(t('common.failed'))
      } finally {
        resetPasswordLoading.value = false
      }
    }
  })
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('newFarm.da.confirmDelete'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteDa(row.daId)
    if (res.code === 200) {
      ElMessage.success(t('newFarm.common.deleteSuccess'))
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 初始化
onMounted(async () => {
  await loadRegionTree()
  fetchData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
